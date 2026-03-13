import { afterEach, describe, expect, it, vi } from "vitest";

const mockIsHosted = vi.fn();
vi.mock("@/lib/hosted-config", () => ({
  isHosted: () => mockIsHosted(),
  isLocalDev: () => !mockIsHosted(),
  getHostedAccessConfig: () => ({
    cloudflareAccessAud: process.env.CLOUDFLARE_ACCESS_AUD?.trim() || null,
    cloudflareAccessTeamDomain: process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN?.trim() || null,
    cloudflareJwtHeader: "cf-access-jwt-assertion",
    cloudflareEmailHeader: "cf-access-authenticated-user-email",
  }),
}));

type RequestOptions = {
  token?: string;
  headers?: Record<string, string>;
};

function makeAccessJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.signature`;
}

function makeReq(options: RequestOptions = {}): Request {
  const headers = new Headers(options.headers);
  if (options.token) headers.set("authorization", `Bearer ${options.token}`);
  return new Request("http://localhost/api/test", { headers });
}

async function loadGuard() {
  return await import("@/lib/private-api-guard");
}

describe("private-api-guard", () => {
  const originalEnv = { ...process.env };

  afterEach(() => {
    process.env = { ...originalEnv };
    mockIsHosted.mockReset();
    vi.resetModules();
  });

  it("allows requests in local dev without any token", async () => {
    mockIsHosted.mockReturnValue(false);
    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(makeReq());
    expect(result.allowed).toBe(true);
    if (result.allowed) expect(result.reason).toBe("local-dev");
  });

  it("allows hosted browser requests with trusted Cloudflare Access identity", async () => {
    mockIsHosted.mockReturnValue(true);
    process.env.PRIVATE_API_TOKEN = "machine-secret";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";

    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(
      makeReq({
        headers: {
          "cf-access-jwt-assertion": makeAccessJwt({ aud: ["aud-123"], sub: "user-1" }),
          "cf-access-authenticated-user-email": "friend@example.com",
        },
      }),
    );

    expect(result.allowed).toBe(true);
    if (result.allowed) expect(result.reason).toBe("cloudflare-access");
  });

  it("allows requests with the correct token in hosted mode", async () => {
    mockIsHosted.mockReturnValue(true);
    process.env.PRIVATE_API_TOKEN = "correct-secret";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";

    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(makeReq({ token: "correct-secret" }));

    expect(result.allowed).toBe(true);
    if (result.allowed) expect(result.reason).toBe("valid-token");
  });

  it("rejects hosted anonymous requests with a sanitized reason", async () => {
    mockIsHosted.mockReturnValue(true);
    process.env.PRIVATE_API_TOKEN = "secret";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";

    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(makeReq());

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response.status).toBe(401);
      await expect(result.response.json()).resolves.toEqual({
        ok: false,
        error: "unauthorized",
        reason: "missing-browser-identity",
      });
    }
  });

  it("rejects hosted requests with the wrong token using a sanitized machine-auth reason", async () => {
    mockIsHosted.mockReturnValue(true);
    process.env.PRIVATE_API_TOKEN = "correct-secret";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";

    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(makeReq({ token: "wrong-secret" }));

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response.status).toBe(401);
      await expect(result.response.json()).resolves.toEqual({
        ok: false,
        error: "unauthorized",
        reason: "invalid-machine-token",
      });
    }
  });

  it("rejects malformed Cloudflare identity with a sanitized reason", async () => {
    mockIsHosted.mockReturnValue(true);
    process.env.PRIVATE_API_TOKEN = "correct-secret";
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";

    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(
      makeReq({
        headers: {
          "cf-access-jwt-assertion": "not-a-jwt",
          "cf-access-authenticated-user-email": "friend@example.com",
        },
      }),
    );

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response.status).toBe(401);
      await expect(result.response.json()).resolves.toEqual({
        ok: false,
        error: "unauthorized",
        reason: "invalid-browser-identity",
      });
    }
  });

  it("returns 503 in hosted mode when PRIVATE_API_TOKEN is not configured for a machine caller", async () => {
    mockIsHosted.mockReturnValue(true);
    process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
    delete process.env.PRIVATE_API_TOKEN;

    const { requirePrivateApi } = await loadGuard();
    const result = requirePrivateApi(makeReq({ token: "any-token" }));

    expect(result.allowed).toBe(false);
    if (!result.allowed) {
      expect(result.response.status).toBe(503);
      await expect(result.response.json()).resolves.toEqual({
        ok: false,
        error: "private API not configured",
        reason: "machine-token-not-configured",
      });
    }
  });

  it("strips sensitive keys in hosted mode", async () => {
    mockIsHosted.mockReturnValue(true);
    const { sanitizePayload } = await loadGuard();
    const input = {
      videoId: "abc123",
      absPath: "/secret/path",
      provider: "claude",
      nested: {
        filePath: "/nested/secret",
        title: "keep this",
      },
      items: [{ workerPid: 1234, name: "item1" }],
    };
    const result = sanitizePayload(input);
    expect(result).toEqual({
      videoId: "abc123",
      nested: { title: "keep this" },
      items: [{ name: "item1" }],
    });
  });

  it("passes through everything in local dev", async () => {
    mockIsHosted.mockReturnValue(false);
    const { sanitizePayload } = await loadGuard();
    const input = { absPath: "/secret/path", videoId: "abc" };
    const result = sanitizePayload(input);
    expect(result).toEqual(input);
  });
});
