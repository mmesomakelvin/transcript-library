#!/usr/bin/env bash
set -euo pipefail

VIDEO_ID="${1:-}"
if [[ -z "$VIDEO_ID" ]]; then
  echo "usage: bash scripts/verify-s01-analysis-recovery.sh <videoId>" >&2
  exit 64
fi

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [[ -f .env.local ]]; then
  set -a
  # shellcheck disable=SC1091
  source .env.local
  set +a
fi

export ANALYSIS_PROVIDER="${ANALYSIS_PROVIDER:-codex-cli}"
export HOSTED="${HOSTED:-}"
PORT="${VERIFY_PORT:-3123}"
BASE_URL="http://127.0.0.1:${PORT}"
LOG_DIR="$ROOT_DIR/.gsd/tmp"
SERVER_LOG="$LOG_DIR/verify-s01-analysis-recovery.${VIDEO_ID}.server.log"
mkdir -p "$LOG_DIR"

SERVER_PID=""
cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

json_get() {
  local file="$1"
  local expr="$2"
  node -e 'const fs=require("fs"); const payload=JSON.parse(fs.readFileSync(process.argv[1], "utf8")); const value=Function("payload", `return (${process.argv[2]});`)(payload); if (typeof value === "object") { console.log(JSON.stringify(value)); } else if (value !== undefined && value !== null) { console.log(String(value)); }' "$file" "$expr"
}

request_json() {
  local method="$1"
  local url="$2"
  local body_file="$3"
  local status
  status=$(curl -sS -o "$body_file" -w '%{http_code}' -X "$method" "$url")
  echo "$status"
}

echo "==> validating catalog snapshot"
if ! npx tsx scripts/rebuild-catalog.ts --check >/tmp/verify-s01-catalog-check.json 2>/tmp/verify-s01-catalog-check.err; then
  cat /tmp/verify-s01-catalog-check.err >&2 || true
  cat /tmp/verify-s01-catalog-check.json >&2 || true
  echo "==> catalog check failed; rebuilding"
  npx tsx scripts/rebuild-catalog.ts
fi


echo "==> clearing canonical artifacts for rerun"
VIDEO_ID="$VIDEO_ID" node <<'NODE'
const fs = require('fs');
const path = require('path');
const videoId = process.env.VIDEO_ID;
const dir = path.join(process.cwd(), 'data', 'insights', videoId);
const removable = ['analysis.json', 'analysis.md'];
try {
  const run = JSON.parse(fs.readFileSync(path.join(dir, 'run.json'), 'utf8'));
  const display = run?.artifacts?.displayFileName;
  if (typeof display === 'string' && display.endsWith('.md')) removable.push(display);
} catch {}
for (const name of removable) {
  try {
    fs.rmSync(path.join(dir, name), { force: true });
  } catch {}
}
NODE


echo "==> starting local app server on ${BASE_URL} with provider ${ANALYSIS_PROVIDER}"
NEXT_TELEMETRY_DISABLED=1 npx next dev --hostname 127.0.0.1 --port "$PORT" >"$SERVER_LOG" 2>&1 &
SERVER_PID=$!

READY=0
for _ in $(seq 1 90); do
  if curl -fsS "$BASE_URL/api/analyze/status?videoId=$VIDEO_ID" >/tmp/verify-s01-ready.json 2>/dev/null; then
    READY=1
    break
  fi
  sleep 2
done

if [[ "$READY" != "1" ]]; then
  echo "server did not become ready; recent log tail:" >&2
  tail -n 80 "$SERVER_LOG" >&2 || true
  exit 1
fi


echo "==> triggering analysis for ${VIDEO_ID}"
START_BODY="$(mktemp)"
START_STATUS=$(request_json POST "$BASE_URL/api/analyze?videoId=$VIDEO_ID" "$START_BODY")
cat "$START_BODY"
printf '\n'

if [[ "$START_STATUS" != "200" ]]; then
  echo "analyze start failed with HTTP ${START_STATUS}" >&2
  exit 1
fi


echo "==> polling terminal runtime state"
STATUS_BODY="$(mktemp)"
TERMINAL=0
for _ in $(seq 1 180); do
  STATUS_CODE=$(request_json GET "$BASE_URL/api/analyze/status?videoId=$VIDEO_ID" "$STATUS_BODY")
  if [[ "$STATUS_CODE" != "200" ]]; then
    echo "status route failed with HTTP ${STATUS_CODE}" >&2
    cat "$STATUS_BODY" >&2 || true
    exit 1
  fi

  STATUS_VALUE=$(json_get "$STATUS_BODY" 'payload.status')
  LIFECYCLE_VALUE=$(json_get "$STATUS_BODY" 'payload.lifecycle ?? ""')
  ERROR_VALUE=$(json_get "$STATUS_BODY" 'payload.error ?? ""')
  echo "status=${STATUS_VALUE} lifecycle=${LIFECYCLE_VALUE} error=${ERROR_VALUE}"

  if [[ "$STATUS_VALUE" == "complete" || "$STATUS_VALUE" == "failed" ]]; then
    TERMINAL=1
    break
  fi
  sleep 5
done

if [[ "$TERMINAL" != "1" ]]; then
  echo "analysis did not reach terminal state in time" >&2
  tail -n 80 "$SERVER_LOG" >&2 || true
  exit 1
fi

if [[ "$(json_get "$STATUS_BODY" 'payload.status')" != "complete" ]]; then
  echo "analysis finished in failure state" >&2
  cat "$STATUS_BODY" >&2
  if [[ -f "data/insights/$VIDEO_ID/run.json" ]]; then
    echo "--- run.json ---" >&2
    cat "data/insights/$VIDEO_ID/run.json" >&2
  fi
  if [[ -f "data/insights/$VIDEO_ID/status.json" ]]; then
    echo "--- status.json ---" >&2
    cat "data/insights/$VIDEO_ID/status.json" >&2
  fi
  if [[ -f "data/insights/$VIDEO_ID/worker-stdout.txt" ]]; then
    echo "--- worker-stdout.txt ---" >&2
    tail -n 80 "data/insights/$VIDEO_ID/worker-stdout.txt" >&2 || true
  fi
  if [[ -f "data/insights/$VIDEO_ID/worker-stderr.txt" ]]; then
    echo "--- worker-stderr.txt ---" >&2
    tail -n 80 "data/insights/$VIDEO_ID/worker-stderr.txt" >&2 || true
  fi
  exit 1
fi


echo "==> validating canonical artifacts"
VIDEO_ID="$VIDEO_ID" node <<'NODE'
const fs = require('fs');
const path = require('path');
const videoId = process.env.VIDEO_ID;
const dir = path.join(process.cwd(), 'data', 'insights', videoId);
function readJson(name) {
  return JSON.parse(fs.readFileSync(path.join(dir, name), 'utf8'));
}
function assert(cond, message) {
  if (!cond) {
    throw new Error(message);
  }
}
const run = readJson('run.json');
const status = readJson('status.json');
const analysis = readJson('analysis.json');
const analysisMarkdown = fs.readFileSync(path.join(dir, 'analysis.md'), 'utf8');
const displayPath = path.join(dir, run.artifacts.displayFileName);
assert(run.provider === 'codex-cli', `expected codex-cli provider, got ${run.provider}`);
assert(run.status === 'complete', `expected run.json status complete, got ${run.status}`);
assert(run.lifecycle === 'completed', `expected lifecycle completed, got ${run.lifecycle}`);
assert(status.status === 'complete', `expected status.json status complete, got ${status.status}`);
assert(status.lifecycle === 'completed', `expected status.json lifecycle completed, got ${status.lifecycle}`);
assert(analysis.schemaVersion === 1, `expected analysis schemaVersion 1, got ${analysis.schemaVersion}`);
assert(Array.isArray(analysis.takeaways) && analysis.takeaways.length > 0, 'analysis takeaways missing');
assert(Array.isArray(analysis.actionItems) && analysis.actionItems.length > 0, 'analysis actionItems missing');
assert(Array.isArray(analysis.notablePoints) && analysis.notablePoints.length > 0, 'analysis notablePoints missing');
assert(typeof analysis.reportMarkdown === 'string' && analysis.reportMarkdown.trim().length > 0, 'reportMarkdown missing');
assert(analysisMarkdown.trim().length > 0, 'analysis.md empty');
assert(fs.existsSync(displayPath), `missing display markdown artifact ${run.artifacts.displayFileName}`);
assert(fs.readFileSync(displayPath, 'utf8').trim().length > 0, 'display markdown artifact empty');
console.log(JSON.stringify({
  ok: true,
  videoId,
  provider: run.provider,
  runId: run.runId,
  lifecycle: run.lifecycle,
  displayArtifact: run.artifacts.displayFileName,
  summaryPreview: String(analysis.summary || '').slice(0, 160)
}, null, 2));
NODE

echo "==> recovery verification passed"
