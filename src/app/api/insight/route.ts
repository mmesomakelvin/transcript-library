import { NextResponse } from "next/server";
import fs from "node:fs";
import {
  analysisPath,
  atomicWriteJson,
  isProcessAlive,
  isValidVideoId,
  readStatus,
  statusPath,
} from "@/modules/analysis";
import {
  getInsightArtifacts,
  hasBlockedLegacyInsight,
  readCuratedInsight,
  readInsightMarkdown,
  readRunMetadata,
} from "@/modules/insights";

export const runtime = "nodejs";

/**
 * GET /api/insight
 * Returns the full insight state for a video: derived status, markdown content,
 * curated structured data, artifact file list, and run metadata.
 * Reconciles a stale "running" status by writing a "failed" tombstone when the
 * worker process is no longer alive.
 *
 * @param req - Incoming request. Expects `?videoId=` query param.
 * @returns JSON with `{ status, error?, insight, curated, artifacts, run }`, or a
 *   400 if the videoId is invalid. Always served with `Cache-Control: no-store`.
 */
export async function GET(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!isValidVideoId(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const insight = readInsightMarkdown(videoId).markdown;
  const curated = readCuratedInsight(videoId);
  const status = readStatus(videoId);
  const blockedLegacyInsight = hasBlockedLegacyInsight(videoId);

  let state: "idle" | "running" | "complete" | "failed" = insight ? "complete" : "idle";
  let error: string | undefined = curated.error ?? undefined;

  if (blockedLegacyInsight) {
    state = "failed";
    error =
      "Legacy insight requires one-time migration. Run node scripts/migrate-legacy-insights-to-json.ts --check, then rerun without --check to upgrade remaining artifacts.";
  } else if (curated.error) {
    state = "failed";
  } else if (status?.status === "running") {
    if (!isProcessAlive(status.pid)) {
      const updated = {
        ...status,
        status: "failed" as const,
        completedAt: new Date().toISOString(),
        error: "process died unexpectedly",
      };
      atomicWriteJson(statusPath(videoId), updated);
      state = "failed";
      error = updated.error;
    } else {
      state = "running";
    }
  } else if (status?.status === "failed") {
    state = "failed";
    error = status.error;
  } else if (!insight) {
    try {
      fs.accessSync(analysisPath(videoId));
      state = "complete";
    } catch {
      state = "idle";
    }
  }

  return NextResponse.json(
    {
      status: state,
      error,
      insight,
      curated: curated.curated,
      artifacts: getInsightArtifacts(videoId),
      run: readRunMetadata(videoId),
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
