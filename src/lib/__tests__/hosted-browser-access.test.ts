import fs from "node:fs";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";

const mockIsHosted = vi.fn();
const mockGetVideo = vi.fn();
const mockAbsTranscriptPath = vi.fn();
const mockIsValidVideoId = vi.fn();
const mockGetAnalyzeStartEligibility = vi.fn();
const mockReadRuntimeSnapshot = vi.fn();
const mockSpawnAnalysis = vi.fn();
const mockReconcileRuntimeArtifacts = vi.fn();
const mockReadRuntimeStreamEvent = vi.fn();
const mockReadInsightMarkdown = vi.fn();
const mockReadCuratedInsight = vi.fn();
const mockGetInsightArtifacts = vi.fn();
const mockHasBlockedLegacyInsight = vi.fn();

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
  getVideo: mockGetVideo,
  absTranscriptPath: mockAbsTranscriptPath,
}));

vi.mock("@/modules/analysis", () => ({
  isValidVideoId: mockIsValidVideoId,
  getAnalyzeStartEligibility: mockGetAnalyzeStartEligibility,
  readRuntimeSnapshot: mockReadRuntimeSnapshot,
  spawnAnalysis: mockSpawnAnalysis,
}));

vi.mock("@/lib/runtime-reconciliation", () => ({
  reconcileRuntimeArtifacts: mockReconcileRuntimeArtifacts,
}));

vi.mock("@/lib/runtime-stream", () => ({
  readRuntimeStreamEvent: mockReadRuntimeStreamEvent,
}));

vi.mock("@/modules/insights", () => ({
  readInsightMarkdown: mockReadInsightMarkdown,
  readCuratedInsight: mockReadCuratedInsight,
  getInsightArtifacts: mockGetInsightArtifacts,
  hasBlockedLegacyInsight: mockHasBlockedLegacyInsight,
}));

function makeAccessJwt(payload: Record<string, unknown>): string {
  const header = Buffer.from(JSON.stringify({ alg: "none", typ: "JWT" })).toString("base64url");
  const body = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `${header}.${body}.signature`;
}

function browserHeaders() {
  return {
    "cf-access-jwt-assertion": makeAccessJwt({ aud: ["aud-123"], sub: "friend-1" }),
    "cf-access-authenticated-user-email": "friend@example.com",
  };
}

function resetRouteMocks() {
  mockIsHosted.mockReturnValue(true);
  process.env.PRIVATE_API_TOKEN = "machine-secret";
  process.env.CLOUDFLARE_ACCESS_AUD = "aud-123";
  process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN = "aojdev.cloudflareaccess.com";

  mockIsValidVideoId.mockReturnValue(true);
  mockGetAnalyzeStartEligibility.mockReturnValue({
    canStart: true,
    outcome: "started",
    retryable: false,
    message: null,
    snapshot: { lifecycle: null },
  });
  mockReadRuntimeSnapshot.mockReturnValue({
    status: "idle",
    lifecycle: null,
    error: null,
    run: null,
  });
  mockReconcileRuntimeArtifacts.mockReturnValue({
    status: "ok",
    resolution: "none",
    retryable: false,
    reasons: [],
  });
  mockReadRuntimeStreamEvent.mockReturnValue({
    event: "snapshot",
    version: "stream-v1",
    payload: {
      status: "idle",
      lifecycle: null,
      stage: { key: "idle", label: "Idle" },
      startedAt: null,
      completedAt: null,
      error: null,
      logs: { stdout: "", stderr: "" },
      recentLogs: [],
      retryGuidance: {
        canRetry: true,
        nextAction: "rerun-analysis",
        message: "Ready to start analysis.",
      },
      reconciliation: {
        status: "ok",
        resolution: "none",
        retryable: false,
        reasons: [],
      },
      artifacts: {
        canonicalFileName: "analysis.md",
        displayFileName: null,
        metadataFileName: "video-metadata.json",
        runFileName: "run.json",
        stdoutFileName: "worker-stdout.txt",
        stderrFileName: "worker-stderr.txt",
      },
      run: null,
    },
  });
  mockReadInsightMarkdown.mockReturnValue({ markdown: null });
  mockReadCuratedInsight.mockReturnValue({ curated: null, error: null });
  mockGetInsightArtifacts.mockReturnValue({
    canonicalFileName: "analysis.md",
    displayFileName: null,
    metadataFileName: "video-metadata.json",
    runFileName: "run.json",
    stdoutFileName: "worker-stdout.txt",
    stderrFileName: "worker-stderr.txt",
  });
  mockHasBlockedLegacyInsight.mockReturnValue(false);
  mockGetVideo.mockReturnValue({
    videoId: "abc123xyz89",
    title: "Hosted browser video",
    channel: "Channel",
    topic: "Topic",
    publishedDate: "2026-03-12",
    parts: [{ chunk: 1, wordCount: 8, filePath: "topics/ai/video.md" }],
  });
  mockAbsTranscriptPath.mockReturnValue(path.join(process.cwd(), "README.md"));
  mockSpawnAnalysis.mockReturnValue(true);
}

describe("hosted browser access proof", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.resetModules();
    delete process.env.PRIVATE_API_TOKEN;
    delete process.env.CLOUDFLARE_ACCESS_AUD;
    delete process.env.CLOUDFLARE_ACCESS_TEAM_DOMAIN;
  });

  it("documents the hosted verification harness in the repo", () => {
    expect(fs.existsSync(path.join(process.cwd(), "scripts", "verify-s05-hosted-access.sh"))).toBe(
      true,
    );
  });

  it("allows hosted browser callers to load insight state without a bearer token", async () => {
    resetRouteMocks();

    const { GET } = await import("@/app/api/insight/route");
    const response = await GET(
      new Request("http://localhost/api/insight?videoId=abc123xyz89", {
        headers: browserHeaders(),
      }),
    );
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body).toMatchObject({
      status: "idle",
      analyzeOutcome: "started",
      retryable: false,
      insight: null,
    });
  });

  it("allows hosted browser callers to start analysis without a bearer token", async () => {
    resetRouteMocks();

    const { POST } = await import("@/app/api/analyze/route");
    const response = await POST(
      new Request("http://localhost/api/analyze?videoId=abc123xyz89", {
        method: "POST",
        headers: browserHeaders(),
      }),
    );
    const body = (await response.json()) as Record<string, unknown>;

    expect(response.status).toBe(200);
    expect(body).toMatchObject({ ok: true, status: "running", outcome: "started" });
    expect(mockSpawnAnalysis).toHaveBeenCalledTimes(1);
  });

  it("allows hosted browser callers to connect to the insight stream without a bearer token", async () => {
    resetRouteMocks();
    mockReadRuntimeStreamEvent.mockReturnValue({
      event: "snapshot",
      version: "stream-v2",
      payload: {
        status: "running",
        lifecycle: "running",
        stage: { key: "running", label: "Running" },
        startedAt: "2026-03-13T10:00:00.000Z",
        completedAt: null,
        error: null,
        logs: { stdout: "worker ready", stderr: "" },
        recentLogs: ["worker ready"],
        retryGuidance: {
          canRetry: false,
          nextAction: "wait",
          message: "Analysis is running.",
        },
        reconciliation: {
          status: "ok",
          resolution: "none",
          retryable: false,
          reasons: [],
        },
        artifacts: {
          canonicalFileName: "analysis.md",
          displayFileName: null,
          metadataFileName: "video-metadata.json",
          runFileName: "run.json",
          stdoutFileName: "worker-stdout.txt",
          stderrFileName: "worker-stderr.txt",
        },
        run: null,
      },
    });

    const { GET } = await import("@/app/api/insight/stream/route");
    const response = await GET(
      new Request("http://localhost/api/insight/stream?videoId=abc123xyz89", {
        headers: browserHeaders(),
      }),
    );

    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toContain("text/event-stream");

    const reader = response.body?.getReader();
    const chunk = await reader?.read();
    const text = new TextDecoder().decode(chunk?.value);
    await reader?.cancel();

    expect(text).toContain('"event":"snapshot"');
    expect(text).toContain('"status":"running"');
    expect(text).toContain('"recentLogs":["worker ready"]');
  });

  it("keeps anonymous hosted callers outside the browser path with a sanitized reason", async () => {
    resetRouteMocks();

    const { GET } = await import("@/app/api/insight/route");
    const response = await GET(new Request("http://localhost/api/insight?videoId=abc123xyz89"));

    expect(response.status).toBe(401);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      error: "unauthorized",
      reason: "missing-browser-identity",
    });
  });
});
