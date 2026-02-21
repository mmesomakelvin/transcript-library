import { NextResponse } from "next/server";
import fs from "node:fs";

export const runtime = "nodejs";

export async function GET(req: Request) {
  const url = new URL(req.url);
  const p = url.searchParams.get("path");
  if (!p) return NextResponse.json({ error: "missing path" }, { status: 400 });

  // Minimal safety: only allow reading inside the playlist-transcripts repo.
  const root = process.env.PLAYLIST_TRANSCRIPTS_REPO || "/Users/aojdevstudio/projects/clawd/playlist-transcripts";
  if (!p.startsWith(root)) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  try {
    const content = fs.readFileSync(p, "utf8");
    return new NextResponse(content, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: "read failed", detail: msg }, { status: 500 });
  }
}
