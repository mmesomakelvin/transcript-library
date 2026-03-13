import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterEach, describe, expect, it, vi } from "vitest";
import type { SourceRefreshRecord } from "@/lib/source-refresh";
import type { HistoricalArtifactRepairReport } from "../../../scripts/repair-historical-artifacts";
import { runDailyOperationalSweep } from "@/lib/daily-operational-sweep";

const originalInsightsBaseDir = process.env.INSIGHTS_BASE_DIR;

function makeRefreshRecord(overrides: Partial<SourceRefreshRecord> = {}): SourceRefreshRecord {
  return {
    schemaVersion: 1,
    trigger: "cli",
    outcome: "noop",
    phase: "completed",
    startedAt: "2026-03-13T00:00:00.000Z",
    completedAt: "2026-03-13T00:00:01.000Z",
    repo: {
      remote: "origin",
      branch: "master",
      currentBranch: "master",
      headBefore: "abc123",
      headAfter: "abc123",
      upstreamHead: "abc123",
    },
    catalog: {
      version: "catalog-v1",
      videoCount: 1,
      partCount: 1,
      checkOnly: false,
      preservedLastKnownGood: false,
    },
    ...overrides,
  };
}

function makeRepairReport(
  overrides: Partial<HistoricalArtifactRepairReport> = {},
): HistoricalArtifactRepairReport {
  return {
    schemaVersion: 1,
    checkedAt: "2026-03-13T00:00:02.000Z",
    repairedCount: 0,
    rerunNeededCount: 0,
    skippedCount: 0,
    errorCount: 0,
    mismatchClassCounts: {
      "missing-run-record": 0,
      "missing-status-record": 0,
      "status-run-id-mismatch": 0,
      "status-lifecycle-mismatch": 0,
      "missing-canonical-analysis": 0,
      "missing-structured-analysis": 0,
      "invalid-structured-analysis": 0,
      "artifacts-without-run": 0,
    },
    results: [],
    ...overrides,
  };
}

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function writeHistoricalArtifactsWithoutRun(baseDir: string, videoId = "abc123xy999") {
  const dir = path.join(baseDir, videoId);
  fs.mkdirSync(dir, { recursive: true });

  const markdown = [
    "---",
    'title: "Sweep Manual Follow-up Test"',
    "---",
    "",
    "## Summary",
    "Leave this for a manual rerun.",
  ].join("\n");

  fs.writeFileSync(path.join(dir, "analysis.md"), markdown);
  fs.writeFileSync(path.join(dir, "sweep-manual-follow-up-test.md"), markdown);
  fs.writeFileSync(
    path.join(dir, "video-metadata.json"),
    JSON.stringify(
      {
        videoId,
        title: "Sweep Manual Follow-up Test",
      },
      null,
      2,
    ),
  );

  return { dir, videoId };
}

afterEach(() => {
  vi.restoreAllMocks();

  if (originalInsightsBaseDir === undefined) {
    delete process.env.INSIGHTS_BASE_DIR;
  } else {
    process.env.INSIGHTS_BASE_DIR = originalInsightsBaseDir;
  }
});

describe("runDailyOperationalSweep", () => {
  it("writes stable latest and archived records for a clean sweep while preserving phase evidence", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-operational-sweep-"));
    process.env.INSIGHTS_BASE_DIR = path.join(tmpDir, "data", "insights");

    const refresh = makeRefreshRecord();
    const repair = makeRepairReport({ skippedCount: 2 });

    const result = await runDailyOperationalSweep({
      refreshSourceCatalog: () => refresh,
      repairHistoricalArtifacts: () => repair,
    });

    expect(result.record.outcome).toBe("clean");
    expect(result.record.failingPhase).toBe(null);
    expect(result.record.manualFollowUpVideoIds).toEqual([]);
    expect(result.record.refresh).toEqual({ status: "completed", record: refresh });
    expect(result.record.repair).toEqual({ status: "clean", report: repair });
    expect(result.record.paths.latest).toBe(result.latestRecordPath);
    expect(result.record.paths.archive).toBe(result.archiveRecordPath);

    expect(readJson(result.latestRecordPath)).toEqual(result.record);
    expect(readJson(result.archiveRecordPath)).toEqual(result.record);
  });

  it("reports a repaired sweep when safe in-place repairs were applied", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-operational-sweep-"));
    process.env.INSIGHTS_BASE_DIR = path.join(tmpDir, "data", "insights");

    const baselineRefresh = makeRefreshRecord();
    const refresh = makeRefreshRecord({
      outcome: "updated",
      repo: { ...baselineRefresh.repo, headAfter: "def456", upstreamHead: "def456" },
    });
    const repair = makeRepairReport({
      repairedCount: 1,
      results: [
        {
          videoId: "repair123xyz",
          runId: "run-1",
          action: "repaired",
          reasonCodes: ["missing-structured-analysis"],
          reconciliationBefore: "mismatch",
          reconciliationAfter: "resolved",
          displayArtifact: "/tmp/display.md",
          operatorEvidence: {
            retryable: false,
            analyzeOutcome: "resolved",
            resolution: "resolved",
            primaryReasonCode: "missing-structured-analysis",
          },
        },
      ],
    });

    const result = await runDailyOperationalSweep({
      refreshSourceCatalog: () => refresh,
      repairHistoricalArtifacts: () => repair,
    });

    expect(result.record.outcome).toBe("repaired");
    expect(result.record.repair.status).toBe("repaired");
    expect(result.record.refresh).toEqual({ status: "completed", record: refresh });
    expect(result.record.manualFollowUpVideoIds).toEqual([]);
  });

  it("keeps rerun-only mismatches as manual follow-up and does not invent run history", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-operational-sweep-"));
    const insightsBaseDir = path.join(tmpDir, "data", "insights");
    process.env.INSIGHTS_BASE_DIR = insightsBaseDir;

    const { videoId, dir } = writeHistoricalArtifactsWithoutRun(insightsBaseDir);
    const refresh = makeRefreshRecord();
    const { repairHistoricalArtifacts } =
      await import("../../../scripts/repair-historical-artifacts");

    const result = await runDailyOperationalSweep({
      refreshSourceCatalog: () => refresh,
      repairHistoricalArtifacts,
    });

    expect(result.record.outcome).toBe("manual-follow-up");
    expect(result.record.repair.status).toBe("manual-follow-up");
    expect(result.record.manualFollowUpVideoIds).toEqual([videoId]);
    expect(result.record.refresh).toEqual({ status: "completed", record: refresh });
    expect(result.record.repair.report.results[0]).toMatchObject({
      videoId,
      action: "rerun-needed",
      runId: null,
      reasonCodes: ["artifacts-without-run"],
      operatorEvidence: {
        analyzeOutcome: "retry-needed",
        retryable: true,
      },
    });
    expect(fs.existsSync(path.join(dir, "run.json"))).toBe(false);
  });

  it("marks the sweep failed when either phase reports a failure while preserving both phase records", async () => {
    const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), "daily-operational-sweep-"));
    process.env.INSIGHTS_BASE_DIR = path.join(tmpDir, "data", "insights");

    const refresh = makeRefreshRecord({
      outcome: "failed",
      phase: "git-fetch",
      error: { message: "fetch failed" },
    });
    const repair = makeRepairReport({
      errorCount: 1,
      results: [
        {
          videoId: "error123xyz",
          runId: "run-2",
          action: "error",
          reasonCodes: ["missing-structured-analysis"],
          reconciliationBefore: "mismatch",
          reconciliationAfter: null,
          displayArtifact: null,
          operatorEvidence: {
            retryable: true,
            analyzeOutcome: "retry-needed",
            resolution: "rerun-ready",
            primaryReasonCode: "missing-structured-analysis",
          },
          error: "could not write analysis.json",
        },
      ],
    });

    const result = await runDailyOperationalSweep({
      refreshSourceCatalog: () => refresh,
      repairHistoricalArtifacts: () => repair,
    });

    expect(result.record.outcome).toBe("failed");
    expect(result.record.failingPhase).toBe("refresh");
    expect(result.record.refresh).toEqual({ status: "failed", record: refresh });
    expect(result.record.repair.report.errorCount).toBe(1);
    expect(result.record.repair.status).toBe("failed");
  });
});
