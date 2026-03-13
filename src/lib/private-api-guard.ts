/**
 * Private API boundary guard.
 *
 * Provides a single reusable policy for protecting internal API routes.
 *
 * Hosted mode supports two caller classes through one shared boundary:
 * - browser requests that carry trusted Cloudflare Access identity headers
 * - machine requests authenticated with `Authorization: Bearer <PRIVATE_API_TOKEN>`
 *
 * Local dev remains a no-op so the app can run without auth setup.
 *
 * The SYNC_TOKEN used by `/api/sync-hook` is treated as a specialization:
 * sync-hook checks SYNC_TOKEN directly (its existing behavior), but
 * PRIVATE_API_TOKEN is accepted as a universal override for any guarded route.
 *
 * Response sanitization strips internal details (filesystem paths, provider
 * names, raw error stacks) from hosted responses.
 */

import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { getHostedAccessConfig, isHosted } from "@/lib/hosted-config";

const CLOUDFLARE_ACCESS_JWT_HEADER = "cf-access-jwt-assertion";
const CLOUDFLARE_ACCESS_EMAIL_HEADER = "cf-access-authenticated-user-email";

type GuardFailureReason =
  | "missing-browser-identity"
  | "invalid-browser-identity"
  | "invalid-machine-token"
  | "machine-token-not-configured";

type HostedBrowserResult =
  | { allowed: true; reason: "cloudflare-access" }
  | { allowed: false; reason: "missing-browser-identity" | "invalid-browser-identity" };

export type GuardResult =
  | { allowed: true; reason: "local-dev" | "valid-token" | "cloudflare-access" }
  | { allowed: false; response: NextResponse };

function hasBearerHeader(req: Request): boolean {
  const header = req.headers.get("authorization") ?? "";
  return /^Bearer\s+/i.test(header);
}

function validateBearer(req: Request, expectedToken: string): boolean {
  const header = req.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;

  const provided = crypto.createHmac("sha256", "private-api-guard").update(match[1]).digest();
  const expected = crypto.createHmac("sha256", "private-api-guard").update(expectedToken).digest();
  return crypto.timingSafeEqual(provided, expected);
}

function decodeJwtPayload(assertion: string): Record<string, unknown> | null {
  const parts = assertion.split(".");
  if (parts.length < 2) return null;

  try {
    const decoded = Buffer.from(parts[1], "base64url").toString("utf8");
    const parsed = JSON.parse(decoded);
    if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
    return parsed as Record<string, unknown>;
  } catch {
    return null;
  }
}

function payloadHasAudience(payload: Record<string, unknown>, expectedAudience: string): boolean {
  const aud = payload.aud;
  if (typeof aud === "string") return aud === expectedAudience;
  if (Array.isArray(aud)) return aud.some((value) => value === expectedAudience);
  return false;
}

function evaluateHostedBrowserIdentity(req: Request): HostedBrowserResult {
  const config = getHostedAccessConfig();
  const assertion = req.headers.get(CLOUDFLARE_ACCESS_JWT_HEADER)?.trim() ?? "";
  const email = req.headers.get(CLOUDFLARE_ACCESS_EMAIL_HEADER)?.trim() ?? "";

  if (!assertion && !email) {
    return { allowed: false, reason: "missing-browser-identity" };
  }

  if (!assertion || !email || !config.cloudflareAccessAud) {
    return { allowed: false, reason: "invalid-browser-identity" };
  }

  const payload = decodeJwtPayload(assertion);
  if (!payload) {
    return { allowed: false, reason: "invalid-browser-identity" };
  }

  if (!payloadHasAudience(payload, config.cloudflareAccessAud)) {
    return { allowed: false, reason: "invalid-browser-identity" };
  }

  return { allowed: true, reason: "cloudflare-access" };
}

function unauthorized(reason: GuardFailureReason): GuardResult {
  const status = reason === "machine-token-not-configured" ? 503 : 401;
  const error = status === 503 ? "private API not configured" : "unauthorized";

  return {
    allowed: false,
    response: NextResponse.json({ ok: false, error, reason }, { status }),
  };
}

export function requirePrivateApi(req: Request): GuardResult {
  if (!isHosted()) {
    return { allowed: true, reason: "local-dev" };
  }

  const token = process.env.PRIVATE_API_TOKEN?.trim() || null;
  if (token && validateBearer(req, token)) {
    return { allowed: true, reason: "valid-token" };
  }

  const browserResult = evaluateHostedBrowserIdentity(req);
  if (browserResult.allowed) {
    return browserResult;
  }

  if (hasBearerHeader(req)) {
    return unauthorized(token ? "invalid-machine-token" : "machine-token-not-configured");
  }

  return unauthorized(browserResult.reason);
}

const SENSITIVE_KEYS = new Set([
  "absPath",
  "transcriptPartPath",
  "filePath",
  "resolvedPath",
  "insightsDir",
  "artifactPath",
  "provider",
  "providerModel",
  "command",
  "workerPid",
  "remoteAddress",
]);

export function sanitizePayload<T>(value: T): T {
  if (!isHosted()) return value;
  return deepStrip(value) as T;
}

function deepStrip(value: unknown): unknown {
  if (value === null || value === undefined) return value;
  if (Array.isArray(value)) return value.map(deepStrip);
  if (typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
      if (SENSITIVE_KEYS.has(k)) continue;
      out[k] = deepStrip(v);
    }
    return out;
  }
  return value;
}
