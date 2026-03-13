#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)
HOST=${HOST:-127.0.0.1}
PORT=${PORT:-3123}
BASE_URL="http://${HOST}:${PORT}"
VERIFY_PRIVATE_API_TOKEN=${VERIFY_PRIVATE_API_TOKEN:-verify-s05-private-token}
VERIFY_SYNC_TOKEN=${VERIFY_SYNC_TOKEN:-verify-s05-sync-token}
VERIFY_CLOUDFLARE_ACCESS_AUD=${VERIFY_CLOUDFLARE_ACCESS_AUD:-verify-s05-aud}
VERIFY_CLOUDFLARE_ACCESS_TEAM_DOMAIN=${VERIFY_CLOUDFLARE_ACCESS_TEAM_DOMAIN:-verify-s05.cloudflareaccess.test}
SERVER_LOG=${SERVER_LOG:-"$ROOT_DIR/.tmp/verify-s05-hosted-access.server.log"}

mkdir -p "$(dirname "$SERVER_LOG")"

resolve_playlist_repo() {
  if [[ -n "${PLAYLIST_TRANSCRIPTS_REPO:-}" ]]; then
    printf '%s\n' "$PLAYLIST_TRANSCRIPTS_REPO"
    return 0
  fi

  if [[ -f "$ROOT_DIR/.env.local" ]]; then
    python3 - "$ROOT_DIR/.env.local" <<'PY'
import pathlib, sys
for line in pathlib.Path(sys.argv[1]).read_text().splitlines():
    if line.startswith('PLAYLIST_TRANSCRIPTS_REPO='):
        print(line.split('=', 1)[1].strip())
        break
PY
    return 0
  fi

  return 1
}

PLAYLIST_REPO=$(resolve_playlist_repo || true)
if [[ -z "$PLAYLIST_REPO" ]]; then
  echo "[verify-s05] unable to resolve PLAYLIST_TRANSCRIPTS_REPO from env or .env.local" >&2
  exit 1
fi

if [[ ! -d "$PLAYLIST_REPO" ]]; then
  echo "[verify-s05] PLAYLIST_TRANSCRIPTS_REPO does not exist: $PLAYLIST_REPO" >&2
  exit 1
fi

CATALOG_DB_PATH=${CATALOG_DB_PATH:-"$ROOT_DIR/data/catalog/catalog.db"}
if [[ ! -f "$CATALOG_DB_PATH" ]]; then
  echo "[verify-s05] missing catalog db at $CATALOG_DB_PATH" >&2
  exit 1
fi

VIDEO_ID=${VIDEO_ID:-$(python3 - "$ROOT_DIR" "$CATALOG_DB_PATH" <<'PY'
import os, sqlite3, sys
root_dir, db_path = sys.argv[1], sys.argv[2]
conn = sqlite3.connect(db_path)
cur = conn.cursor()
rows = cur.execute('select video_id from catalog_videos order by published_date desc, video_id asc').fetchall()
for (video_id,) in rows:
    if not os.path.exists(os.path.join(root_dir, 'data', 'insights', video_id)):
        print(video_id)
        break
else:
    if rows:
        print(rows[0][0])
PY
)}

if [[ -z "$VIDEO_ID" ]]; then
  echo "[verify-s05] unable to select a video id from $CATALOG_DB_PATH" >&2
  exit 1
fi

make_access_jwt() {
  python3 - "$1" <<'PY'
import base64, json, sys

def b64(data):
    return base64.urlsafe_b64encode(json.dumps(data, separators=(',', ':')).encode()).decode().rstrip('=')

aud = sys.argv[1]
print(f"{b64({'alg':'none','typ':'JWT'})}.{b64({'aud':[aud],'sub':'verify-s05-browser'})}.signature")
PY
}

ACCESS_JWT=$(make_access_jwt "$VERIFY_CLOUDFLARE_ACCESS_AUD")
ACCESS_EMAIL=${ACCESS_EMAIL:-friend@example.com}
SERVER_PID=""

cleanup() {
  if [[ -n "$SERVER_PID" ]] && kill -0 "$SERVER_PID" 2>/dev/null; then
    kill "$SERVER_PID" 2>/dev/null || true
    wait "$SERVER_PID" 2>/dev/null || true
  fi
}
trap cleanup EXIT

wait_for_server() {
  local attempt
  for attempt in $(seq 1 90); do
    if curl -sS -o /dev/null "$BASE_URL/" 2>/dev/null; then
      return 0
    fi
    sleep 1
  done
  return 1
}

parse_json_field() {
  local body=$1
  local expr=$2
  python3 - "$body" "$expr" <<'PY'
import json, sys
body, expr = sys.argv[1], sys.argv[2]
data = json.loads(body)
value = data
for part in expr.split('.'):
    if not part:
        continue
    if isinstance(value, dict):
        value = value.get(part)
    else:
        value = None
        break
if isinstance(value, bool):
    print('true' if value else 'false')
elif value is None:
    print('')
else:
    print(value)
PY
}

request_json() {
  local __status_var=$1
  local __body_var=$2
  shift 2
  local response body status
  response=$(curl -sS "$@" -w $'\n%{http_code}')
  status=${response##*$'\n'}
  body=${response%$'\n'*}
  printf -v "$__status_var" '%s' "$status"
  printf -v "$__body_var" '%s' "$body"
}

assert_eq() {
  local actual=$1
  local expected=$2
  local context=$3
  if [[ "$actual" != "$expected" ]]; then
    echo "[verify-s05] FAIL ${context}: expected ${expected}, got ${actual}" >&2
    exit 1
  fi
}

assert_contains() {
  local haystack=$1
  local needle=$2
  local context=$3
  if [[ "$haystack" != *"$needle"* ]]; then
    echo "[verify-s05] FAIL ${context}: missing ${needle}" >&2
    exit 1
  fi
}

echo "[verify-s05] using PLAYLIST_TRANSCRIPTS_REPO=$PLAYLIST_REPO"
echo "[verify-s05] using videoId=$VIDEO_ID"

echo "[verify-s05] starting hosted app on $BASE_URL"
(
  cd "$ROOT_DIR"
  HOSTED=true \
  PLAYLIST_TRANSCRIPTS_REPO="$PLAYLIST_REPO" \
  CATALOG_DB_PATH="$CATALOG_DB_PATH" \
  PRIVATE_API_TOKEN="$VERIFY_PRIVATE_API_TOKEN" \
  SYNC_TOKEN="$VERIFY_SYNC_TOKEN" \
  CLOUDFLARE_ACCESS_AUD="$VERIFY_CLOUDFLARE_ACCESS_AUD" \
  CLOUDFLARE_ACCESS_TEAM_DOMAIN="$VERIFY_CLOUDFLARE_ACCESS_TEAM_DOMAIN" \
  npm run dev -- --hostname "$HOST" --port "$PORT" >"$SERVER_LOG" 2>&1
) &
SERVER_PID=$!

if ! wait_for_server; then
  echo "[verify-s05] FAIL server did not become ready; tailing log" >&2
  tail -n 60 "$SERVER_LOG" >&2 || true
  exit 1
fi

echo "[verify-s05] checking browser callers stay secret-free in client code"
if rg -n "PRIVATE_API_TOKEN|Authorization:" "$ROOT_DIR/src/components/VideoAnalysisWorkspace.tsx" "$ROOT_DIR/src/components/AnalysisPanel.tsx" >/dev/null; then
  echo "[verify-s05] FAIL client code references app-managed bearer auth" >&2
  exit 1
fi
echo "[verify-s05] client-auth-surface status=pass reason=no-app-managed-bearer-found"

request_json insight_status insight_body \
  -H "cf-access-jwt-assertion: $ACCESS_JWT" \
  -H "cf-access-authenticated-user-email: $ACCESS_EMAIL" \
  "$BASE_URL/api/insight?videoId=$VIDEO_ID"
assert_eq "$insight_status" "200" "insight browser status"
assert_contains "$insight_body" '"status"' "insight browser body"
echo "[verify-s05] route=insight caller=browser status=$insight_status reason=ok"

request_json analyze_status analyze_body \
  -X POST \
  -H "cf-access-jwt-assertion: $ACCESS_JWT" \
  -H "cf-access-authenticated-user-email: $ACCESS_EMAIL" \
  "$BASE_URL/api/analyze?videoId=$VIDEO_ID"
assert_eq "$analyze_status" "200" "analyze browser status"
assert_contains "$analyze_body" '"outcome":"started"' "analyze browser outcome"
echo "[verify-s05] route=analyze caller=browser status=$analyze_status reason=started"

set +e
stream_output=$(curl -sS -N --max-time 4 \
  -H "cf-access-jwt-assertion: $ACCESS_JWT" \
  -H "cf-access-authenticated-user-email: $ACCESS_EMAIL" \
  "$BASE_URL/api/insight/stream?videoId=$VIDEO_ID" 2>/dev/null)
stream_exit=$?
set -e
if [[ "$stream_exit" != "0" && "$stream_exit" != "28" ]]; then
  echo "[verify-s05] FAIL stream browser request exited with code $stream_exit" >&2
  exit 1
fi
assert_contains "$stream_output" 'data: {' "stream browser frame"
assert_contains "$stream_output" '"event":"snapshot"' "stream browser event"
echo "[verify-s05] route=stream caller=browser status=200 reason=snapshot-received"

request_json anon_status anon_body "$BASE_URL/api/insight?videoId=$VIDEO_ID"
assert_eq "$anon_status" "401" "anonymous insight status"
assert_eq "$(parse_json_field "$anon_body" reason)" "missing-browser-identity" "anonymous insight reason"
echo "[verify-s05] route=insight caller=anonymous status=$anon_status reason=$(parse_json_field "$anon_body" reason)"

request_json sync_status sync_body \
  -X POST \
  -H "cf-access-jwt-assertion: $ACCESS_JWT" \
  -H "cf-access-authenticated-user-email: $ACCESS_EMAIL" \
  "$BASE_URL/api/sync-hook"
assert_eq "$sync_status" "401" "browser sync-hook status"
assert_eq "$(parse_json_field "$sync_body" error)" "unauthorized" "browser sync-hook error"
echo "[verify-s05] route=sync-hook caller=browser-only status=$sync_status reason=machine-boundary-preserved"

echo "[verify-s05] PASS hosted browser access proof complete"
