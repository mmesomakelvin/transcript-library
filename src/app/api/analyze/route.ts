import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { absTranscriptPath, getVideo } from "@/lib/catalog";

export const runtime = "nodejs";

function atomicWriteJson(filePath: string, obj: unknown) {
  const dir = path.dirname(filePath);
  fs.mkdirSync(dir, { recursive: true });
  const tmp = `${filePath}.tmp_${crypto.randomBytes(6).toString("hex")}`;
  fs.writeFileSync(tmp, JSON.stringify(obj, null, 2));
  fs.renameSync(tmp, filePath);
}

function makeJobId() {
  return `analyze_${new Date().toISOString().replace(/[:.]/g, "-")}_${crypto
    .randomBytes(4)
    .toString("hex")}`;
}

export async function POST(req: Request) {
  const url = new URL(req.url);
  const videoId = url.searchParams.get("videoId") || "";

  if (!/^[a-zA-Z0-9_-]{6,}$/.test(videoId)) {
    return NextResponse.json({ ok: false, error: "invalid videoId" }, { status: 400 });
  }

  const video = getVideo(videoId);
  if (!video) {
    return NextResponse.json({ ok: false, error: "not found" }, { status: 404 });
  }

  const appDir = process.cwd();
  const dataDir = path.join(appDir, "data");
  const queueDir = path.join(dataDir, "queue");

  const outDir = path.join(dataDir, "insights", videoId);
  const outPath = path.join(outDir, "analysis.md");

  const parts = video.parts.map((p) => ({
    chunk: p.chunk,
    wordCount: p.wordCount,
    filePath: p.filePath,
    absPath: absTranscriptPath(p.filePath),
  }));

  const jobId = makeJobId();
  const jobPath = path.join(queueDir, `${jobId}.json`);

  const job = {
    jobId,
    type: "video_analysis_v1",
    status: "queued",
    createdAt: new Date().toISOString(),
    video: {
      videoId: video.videoId,
      title: video.title,
      channel: video.channel,
      topic: video.topic,
      publishedDate: video.publishedDate,
    },
    transcripts: {
      root:
        process.env.PLAYLIST_TRANSCRIPTS_REPO ||
        "/Users/aojdevstudio/projects/clawd/playlist-transcripts",
      parts,
    },
    output: {
      outDir,
      outPath,
    },
    options: {
      runner: "claude-p",
      skill: "YouTubeAnalyzer",
      depth: "full",
    },
    attempts: 0,
    maxAttempts: 3,
  };

  atomicWriteJson(jobPath, job);

  // Redirect back to the video page (simple UX for <form method="post">)
  return NextResponse.redirect(new URL(`/video/${encodeURIComponent(videoId)}`, url), 303);
}
