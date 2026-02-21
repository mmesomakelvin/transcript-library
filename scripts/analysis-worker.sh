#!/usr/bin/env bash
set -euo pipefail

APP_DIR="/Users/aojdevstudio/projects/clawd/apps/transcript-library"
DATA_DIR="$APP_DIR/data"
QUEUE_DIR="$DATA_DIR/queue"
PROCESSING_DIR="$QUEUE_DIR/processing"
DONE_DIR="$QUEUE_DIR/done"
FAILED_DIR="$QUEUE_DIR/failed"
INSIGHTS_DIR="$DATA_DIR/insights"

mkdir -p "$PROCESSING_DIR" "$DONE_DIR" "$FAILED_DIR" "$INSIGHTS_DIR"

job_file="$(ls -1 "$QUEUE_DIR"/*.json 2>/dev/null | head -n 1 || true)"
if [[ -z "${job_file}" ]]; then
  exit 0
fi

base="$(basename "$job_file")"
locked="$PROCESSING_DIR/$base"

# Atomic lock: move into processing
mv "$job_file" "$locked"

# Extract fields (Node one-liners to avoid jq dependency)
videoId="$(node -e 'const j=require(process.argv[1]); process.stdout.write(j.video.videoId)' "$locked")"
outDir="$(node -e 'const j=require(process.argv[1]); process.stdout.write(j.output.outDir)' "$locked")"
outPath="$(node -e 'const j=require(process.argv[1]); process.stdout.write(j.output.outPath)' "$locked")"
root="$(node -e 'const j=require(process.argv[1]); process.stdout.write(j.transcripts.root)' "$locked")"

# Collect transcript parts absPaths
mapfile -t parts < <(node -e 'const j=require(process.argv[1]); for (const p of j.transcripts.parts) console.log(p.absPath)' "$locked")

# Safety: ensure paths are inside transcript repo
for p in "${parts[@]}"; do
  if [[ "$p" != "$root"/* ]]; then
    echo "Forbidden transcript path: $p" >&2
    mv "$locked" "$FAILED_DIR/$base"
    exit 1
  fi
done

mkdir -p "$outDir"

# Build a combined transcript file for Claude input
combined="$outDir/transcript-combined.md"
: > "$combined"
for p in "${parts[@]}"; do
  echo "\n\n---\nSOURCE: $p\n---\n" >> "$combined"
  cat "$p" >> "$combined"
done

prompt=$(cat <<PROMPT
/YouTubeAnalyzer
Run a FULL analysis of the YouTube transcript below.

Rules:
- Do not ask me questions; pick sensible defaults.
- Produce a single Markdown report with: Summary, Key takeaways, Notable points, Action items.
- Save the final report to: $outPath

Transcript begins below:
PROMPT
)

# Run Claude Code in print mode.
# --add-dir so the session trusts the dirs it needs.
# Note: output is whatever Claude prints; we rely on it writing the file to outPath as instructed.
cat "$combined" | claude -p \
  --add-dir "$APP_DIR" \
  --add-dir "$root" \
  "$prompt" \
  > "$outDir/claude-stdout.txt" 2> "$outDir/claude-stderr.txt" || {
    mv "$locked" "$FAILED_DIR/$base"
    exit 1
  }

# Verify output file exists
if [[ ! -s "$outPath" ]]; then
  echo "Expected output not written: $outPath" >&2
  mv "$locked" "$FAILED_DIR/$base"
  exit 1
fi

mv "$locked" "$DONE_DIR/$base"
