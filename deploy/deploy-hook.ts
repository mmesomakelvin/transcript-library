/**
 * Transcript Library — Deploy Hook Listener
 *
 * Standalone HTTP server that receives GitHub push webhooks on port 9000,
 * verifies HMAC-SHA256 signatures, and triggers deploy.sh for pushes to main.
 *
 * Designed to run under systemd (deploy-hook.service) with no framework deps.
 *
 * Diagnostics:
 *   journalctl -u deploy-hook          — webhook history
 *   ls /tmp/transcript-library-deploy.lock  — active deploy check
 */

import { createServer, type IncomingMessage, type ServerResponse } from "node:http";
import { createHmac, timingSafeEqual } from "node:crypto";
import { spawn } from "node:child_process";
import { existsSync, writeFileSync, unlinkSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const PORT = Number(process.env.DEPLOY_HOOK_PORT) || 9000;
const LOCK_FILE = "/tmp/transcript-library-deploy.lock";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const DEPLOY_SCRIPT = resolve(__dirname, "deploy.sh");

// ---------------------------------------------------------------------------
// Logging — structured, never leaks secrets
// ---------------------------------------------------------------------------

function log(level: "info" | "warn" | "error", msg: string, meta?: Record<string, unknown>): void {
  const entry = {
    ts: new Date().toISOString(),
    level,
    component: "deploy-hook",
    msg,
    ...meta,
  };
  const stream = level === "error" ? process.stderr : process.stdout;
  stream.write(JSON.stringify(entry) + "\n");
}

// ---------------------------------------------------------------------------
// HMAC-SHA256 signature verification
// ---------------------------------------------------------------------------

export function verifySignature(secret: string, payload: Buffer, signatureHeader: string): boolean {
  const expected = "sha256=" + createHmac("sha256", secret).update(payload).digest("hex");

  // Length check before timingSafeEqual — required since it throws on mismatched lengths
  if (expected.length !== signatureHeader.length) {
    return false;
  }

  return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(signatureHeader, "utf8"));
}

// ---------------------------------------------------------------------------
// Lock file — simple concurrency guard
// ---------------------------------------------------------------------------

export function acquireLock(): boolean {
  if (existsSync(LOCK_FILE)) {
    return false;
  }
  try {
    writeFileSync(LOCK_FILE, JSON.stringify({ pid: process.pid, ts: new Date().toISOString() }), {
      flag: "wx", // exclusive create — fails if exists (race-safe)
    });
    return true;
  } catch {
    // Another process created it between our check and write
    return false;
  }
}

export function releaseLock(): void {
  try {
    unlinkSync(LOCK_FILE);
  } catch {
    // Already removed — fine
  }
}

// ---------------------------------------------------------------------------
// Deploy execution
// ---------------------------------------------------------------------------

function runDeploy(): void {
  log("info", "Starting deploy", { script: DEPLOY_SCRIPT });

  const child = spawn("bash", [DEPLOY_SCRIPT], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env },
  });

  child.stdout.on("data", (data: Buffer) => {
    for (const line of data.toString().split("\n").filter(Boolean)) {
      log("info", `[deploy.sh] ${line}`);
    }
  });

  child.stderr.on("data", (data: Buffer) => {
    for (const line of data.toString().split("\n").filter(Boolean)) {
      log("error", `[deploy.sh] ${line}`);
    }
  });

  child.on("close", (code) => {
    releaseLock();
    if (code === 0) {
      log("info", "Deploy completed successfully", { exitCode: 0 });
    } else {
      log("error", "Deploy failed", { exitCode: code });
    }
  });

  child.on("error", (err) => {
    releaseLock();
    log("error", "Deploy process error", { error: err.message });
  });
}

// ---------------------------------------------------------------------------
// Request handler
// ---------------------------------------------------------------------------

function bufferBody(req: IncomingMessage): Promise<Buffer> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    let size = 0;
    const MAX_BODY = 1024 * 1024; // 1 MB — generous for webhook payloads

    req.on("data", (chunk: Buffer) => {
      size += chunk.length;
      if (size > MAX_BODY) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks)));
    req.on("error", reject);
  });
}

function sendJSON(res: ServerResponse, status: number, body: Record<string, unknown>): void {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

export async function handleWebhook(
  req: IncomingMessage,
  res: ServerResponse,
  secret: string,
): Promise<void> {
  // Only accept POST
  if (req.method !== "POST") {
    sendJSON(res, 405, { error: "method-not-allowed" });
    return;
  }

  const event = req.headers["x-github-event"] as string | undefined;
  const signatureHeader = req.headers["x-hub-signature-256"] as string | undefined;

  log("info", "Webhook received", { event: event ?? "none", hasSignature: !!signatureHeader });

  // Buffer body
  let body: Buffer;
  try {
    body = await bufferBody(req);
  } catch (err) {
    log("error", "Failed to read body", { error: (err as Error).message });
    sendJSON(res, 400, { error: "bad-request" });
    return;
  }

  // Verify signature
  if (!signatureHeader || !verifySignature(secret, body, signatureHeader)) {
    log("warn", "Signature verification failed", { event: event ?? "none" });
    sendJSON(res, 403, { error: "invalid-signature" });
    return;
  }

  // Filter: only push events
  if (event !== "push") {
    log("info", "Ignoring non-push event", { event });
    sendJSON(res, 200, { status: "ignored", reason: `event-type-${event}` });
    return;
  }

  // Filter: only refs/heads/main
  let ref: string | undefined;
  try {
    const payload = JSON.parse(body.toString("utf8"));
    ref = payload.ref;
  } catch {
    log("error", "Failed to parse webhook payload");
    sendJSON(res, 400, { error: "invalid-json" });
    return;
  }

  if (ref !== "refs/heads/main") {
    log("info", "Ignoring push to non-main branch", { ref });
    sendJSON(res, 200, { status: "ignored", reason: `branch-${ref}` });
    return;
  }

  // Concurrency guard
  if (!acquireLock()) {
    log("warn", "Deploy already in progress, rejecting concurrent request");
    sendJSON(res, 409, { error: "deploy-in-progress" });
    return;
  }

  // Trigger deploy — return 202 immediately, deploy runs async
  sendJSON(res, 202, { status: "accepted", message: "Deploy started" });
  runDeploy();
}

// ---------------------------------------------------------------------------
// Server bootstrap
// ---------------------------------------------------------------------------

export function startServer(secret: string): ReturnType<typeof createServer> {
  const server = createServer((req, res) => {
    handleWebhook(req, res, secret).catch((err) => {
      log("error", "Unhandled error in webhook handler", { error: (err as Error).message });
      if (!res.headersSent) {
        sendJSON(res, 500, { error: "internal-error" });
      }
    });
  });

  server.listen(PORT, () => {
    log("info", "Deploy hook listener started", { port: PORT });
  });

  return server;
}

// ---------------------------------------------------------------------------
// Main — only runs when executed directly (not when imported by tests)
// ---------------------------------------------------------------------------

// Detect if this module is the entry point
const isMain = process.argv[1] && resolve(process.argv[1]) === __filename;

if (isMain) {
  const secret = process.env.DEPLOY_WEBHOOK_SECRET;
  if (!secret) {
    log(
      "error",
      "DEPLOY_WEBHOOK_SECRET is not set — refusing to start without signature verification",
    );
    process.exit(1);
  }
  // Intentionally never log the secret value
  log("info", "DEPLOY_WEBHOOK_SECRET is configured", { keyLength: secret.length });
  startServer(secret);
}
