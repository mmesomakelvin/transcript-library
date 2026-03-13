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

vi.mock("@/modules/catalog", () => ({
  getVideo: vi.fn().mockReturnValue(null),
  listVideosByChannel: vi.fn().mockReturnValue([]),
  listChannels: vi.fn().mockReturnValue([]),
  absTranscriptPath: vi.fn().mockReturnValue("/tmp/fake"),
}));

vi.mock("@/modules/analysis", () => ({
  isValidVideoId: vi.fn().mockReturnValue(true),
  getAnalyzeStartEligibility: vi.fn().mockReturnValue({
    canStart: false,
    outcome: "already-analyzed",
    message: "done",
    retryable: false,
    snapshot: { lifecycle: "complete" },
  }),
  readRuntimeSnapshot: vi.fn().mockReturnValue({
    status: "idle",
    run: null,
    lifecycle: null,
  }),
  spawnAnalysis: vi.fn().mockReturnValue(true),
}));

vi.mock("@/lib/runtime-reconciliation", () => ({
  reconcileRuntimeArtifacts: vi.fn().mockReturnValue({
    status: "consistent",
    reasons: [],
  }),
}));

vi.mock("@/lib/runtime-stream", () => ({
  readRuntimeStreamEvent: vi.fn().mockReturnValue({
    version: "v1",
    payload: { stage: null, logs: [], recentLogs: [], retryGuidance: null },
  }),
}));

vi.mock("@/modules/insights", () => ({
  readInsightMarkdown: vi.fn().mockReturnValue({ markdown: null }),
  readCuratedInsight: vi.fn().mockReturnValue({ curated: null, error: null }),
  getInsightArtifacts: vi.fn().mockReturnValue([]),
  hasBlockedLegacyInsight: vi.fn().mockReturnValue(false),
}));

function makeAccessJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.signature`;
}

describe("route access control", () => {
  afterEach(() => {
    mockIsHosted.mockReset();
    vi.clearAllMocks();
    delete process.env.PRIVATE_API_TOKEN;
    delete process.env.PLAYLIST_TRANSCRIPTS_REPO;
    delete process.env.CLOUDFLARE_ACCESS_AUD;
  });

  function setRawEnv() {
    process.env.PLAYLIST_TRANSCRIPTS_REPO = "/tmp/fake-transcripts";
  }

  const guardedRoutes = [
    { name: "/api/channels", importPath: "@/app/api/channels/route", method: "GET" },
    {
      name: "/api/channel",
      importPath: "@/app/api/channel/route",
      method: "GET",
      query: "?channel=test",
    },
    {
      name: "/api/video",
      importPath: "@/app/api/video/route",
      method: "GET",
      query: "?videoId=abc123",
    },
    { name: "/api/raw", importPath: "@/app/api/raw/route", method: "GET", query: "?path=test.txt" },
    {
      name: "/api/analyze",
      importPath: "@/app/api/analyze/route",
      method: "POST",
      query: "?videoId=abc123",
    },
    {
      name: "/api/analyze/status",
      importPath: "@/app/api/analyze/status/route",
      method: "GET",
      query: "?videoId=abc123",
    },
    {
      name: "/api/insight",
      importPath: "@/app/api/insight/route",
      method: "GET",
      query: "?videoId=abc123",
    },
    {
      name: "/api/insight/stream",
      importPath: "@/app/api/insight/stream/route",
      method: "GET",
      query: "?videoId=abc123",
    },
  ];

  for (const route of guardedRoutes) {
    it(`${route.name} rejects anonymous hosted requests with a sanitized reason`, async () => {
      mockIsHosted.mockReturnValue(true);
      process.env.PRIVATE_API_TOKEN = "test-secret";
      process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
      setRawEnv();

      const mod = await import(route.importPath);
      const handler = mod[route.method];
      const url = `http://localhost${route.name}${route.query ?? ""}`;
      const response = await handler(new Request(url, { method: route.method }));

      expect(response.status).toBe(401);
      await expect(response.json()).resolves.toMatchObject({
        ok: false,
        error: "unauthorized",
        reason: "missing-browser-identity",
      });
    });

    it(`${route.name} allows hosted browser requests with Cloudflare Access identity`, async () => {
      mockIsHosted.mockReturnValue(true);
      process.env.PRIVATE_API_TOKEN = "test-secret";
      process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
      setRawEnv();

      const mod = await import(route.importPath);
      const handler = mod[route.method];
      const url = `http://localhost${route.name}${route.query ?? ""}`;
      const response = await handler(
        new Request(url, {
          method: route.method,
          headers: {
            "cf-access-jwt-assertion": makeAccessJwt({ aud: ["aud-123"], sub: "user-1" }),
            "cf-access-authenticated-user-email": "friend@example.com",
          },
        }),
      );

      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(503);
    });

    it(`${route.name} allows authenticated machine requests in hosted mode`, async () => {
      mockIsHosted.mockReturnValue(true);
      process.env.PRIVATE_API_TOKEN = "test-secret";
      process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
      setRawEnv();

      const mod = await import(route.importPath);
      const handler = mod[route.method];
      const url = `http://localhost${route.name}${route.query ?? ""}`;
      const response = await handler(
        new Request(url, {
          method: route.method,
          headers: { authorization: "Bearer test-secret" },
        }),
      );

      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(503);
    });

    it(`${route.name} allows requests in local dev without token`, async () => {
      mockIsHosted.mockReturnValue(false);
      setRawEnv();

      const mod = await import(route.importPath);
      const handler = mod[route.method];
      const url = `http://localhost${route.name}${route.query ?? ""}`;
      const response = await handler(new Request(url, { method: route.method }));

      expect(response.status).not.toBe(401);
      expect(response.status).not.toBe(503);
    });
  }
});
