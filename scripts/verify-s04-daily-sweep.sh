#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

WORK_DIR="$ROOT_DIR/.gsd/tmp/verify-s04-daily-sweep"
REMOTE_REPO="$WORK_DIR/remote.git"
UPSTREAM_REPO="$WORK_DIR/upstream"
CLONE_REPO="$WORK_DIR/clone"
RUNTIME_DIR="$WORK_DIR/runtime"
CATALOG_DB_PATH="$RUNTIME_DIR/data/catalog/catalog.db"
INSIGHTS_BASE_DIR="$RUNTIME_DIR/data/insights"
INITIAL_REFRESH_JSON="$WORK_DIR/initial-refresh.json"
SWEEP_STDOUT_JSON="$WORK_DIR/sweep-cli-output.json"
VERIFY_SUMMARY_JSON="$WORK_DIR/verification-summary.json"
REPAIRABLE_RECONCILIATION_COPY="$WORK_DIR/repairable-reconciliation.json"
RERUN_RECONCILIATION_COPY="$WORK_DIR/rerun-reconciliation.json"
REPAIRABLE_ANALYSIS_COPY="$WORK_DIR/repairable-analysis.json"
LATEST_SWEEP_COPY="$WORK_DIR/sweep-latest.json"
ARCHIVE_SWEEP_COPY="$WORK_DIR/sweep-archive.json"
LAST_SOURCE_REFRESH_COPY="$WORK_DIR/last-source-refresh.json"
LAST_IMPORT_VALIDATION_COPY="$WORK_DIR/last-import-validation.json"
REPAIRABLE_RUN_BEFORE="$WORK_DIR/repairable-run-before.json"
REPAIRABLE_STATUS_BEFORE="$WORK_DIR/repairable-status-before.json"

VIDEO_ID_INITIAL="alpha123xyz"
VIDEO_ID_REFRESHED="beta123xyza"
REPAIR_VIDEO_ID="repair123xy"
RERUN_VIDEO_ID="rerun123xyz"

rm -rf "$WORK_DIR"
mkdir -p "$WORK_DIR" "$RUNTIME_DIR"

export PLAYLIST_TRANSCRIPTS_REPO="$CLONE_REPO"
export PLAYLIST_TRANSCRIPTS_REMOTE="origin"
export PLAYLIST_TRANSCRIPTS_BRANCH="master"
export CATALOG_DB_PATH
export INSIGHTS_BASE_DIR
export VIDEO_ID_INITIAL
export VIDEO_ID_REFRESHED
export REPAIR_VIDEO_ID
export RERUN_VIDEO_ID
unset HOSTED
unset PRIVATE_API_TOKEN

run_git() {
  local repo="$1"
  shift
  git -C "$repo" "$@"
}

write_repo_state() {
  local repo="$1"
  local include_beta="$2"

  mkdir -p \
    "$repo/youtube-transcripts/index" \
    "$repo/youtube-transcripts/alpha" \
    "$repo/youtube-transcripts/repair" \
    "$repo/youtube-transcripts/rerun"

  cat >"$repo/youtube-transcripts/alpha/main.md" <<'EOF'
Alpha transcript from initial upstream state.
EOF

  cat >"$repo/youtube-transcripts/repair/main.md" <<'EOF'
Repairable transcript that already has canonical analysis artifacts.
EOF

  cat >"$repo/youtube-transcripts/rerun/main.md" <<'EOF'
Rerun-only transcript that still requires a manual analysis retry.
EOF

  if [[ "$include_beta" == "1" ]]; then
    mkdir -p "$repo/youtube-transcripts/beta"
    cat >"$repo/youtube-transcripts/beta/main.md" <<'EOF'
Beta transcript from refreshed upstream state.
EOF
  else
    rm -rf "$repo/youtube-transcripts/beta"
  fi

  {
    echo 'video_id,parent_video_id,title,channel,topic,published_date,ingested_date,word_count,chunk,total_chunks,file_path'
    echo "$VIDEO_ID_INITIAL,,Alpha,Channel A,Testing,2026-03-10,2026-03-11,120,1,1,alpha/main.md"
    echo "$REPAIR_VIDEO_ID,,Repairable Fixture,Channel Repair,Testing,2026-03-09,2026-03-11,180,1,1,repair/main.md"
    echo "$RERUN_VIDEO_ID,,Rerun Fixture,Channel Repair,Testing,2026-03-08,2026-03-11,160,1,1,rerun/main.md"
    if [[ "$include_beta" == "1" ]]; then
      echo "$VIDEO_ID_REFRESHED,,Beta,Channel B,Testing,2026-03-12,2026-03-12,240,1,1,beta/main.md"
    fi
  } >"$repo/youtube-transcripts/index/videos.csv"
}

commit_all() {
  local repo="$1"
  local message="$2"
  run_git "$repo" add .
  run_git "$repo" commit -m "$message" >/dev/null
  run_git "$repo" rev-parse HEAD
}

run_refresh() {
  local output_file="$1"
  node --import tsx scripts/refresh-source-catalog.ts >"$output_file"
  cat "$output_file"
  printf '\n'
}

echo "==> creating temporary upstream bare repo and working seed"
git init --bare "$REMOTE_REPO" >/dev/null
mkdir -p "$UPSTREAM_REPO"
git -C "$WORK_DIR" init -b master "$UPSTREAM_REPO" >/dev/null
run_git "$UPSTREAM_REPO" config user.name "Transcript Library Verify"
run_git "$UPSTREAM_REPO" config user.email "verify@example.com"
write_repo_state "$UPSTREAM_REPO" 0
INITIAL_HEAD="$(commit_all "$UPSTREAM_REPO" "initial transcript import")"
run_git "$UPSTREAM_REPO" remote add origin "$REMOTE_REPO"
run_git "$UPSTREAM_REPO" push -u origin master >/dev/null

echo "==> cloning the app-owned checkout fixture"
git clone -b master "$REMOTE_REPO" "$CLONE_REPO" >/dev/null
run_git "$CLONE_REPO" config user.name "Transcript Library Verify"
run_git "$CLONE_REPO" config user.email "verify@example.com"

echo "==> initial refresh through the supported CLI entrypoint"
run_refresh "$INITIAL_REFRESH_JSON"

echo "==> preparing representative repairable and rerun-only runtime drift"
INSIGHTS_BASE_DIR="$INSIGHTS_BASE_DIR" REPAIR_VIDEO_ID="$REPAIR_VIDEO_ID" RERUN_VIDEO_ID="$RERUN_VIDEO_ID" node <<'NODE'
const fs = require('fs');
const path = require('path');

const insightsBaseDir = process.env.INSIGHTS_BASE_DIR;
const repairVideoId = process.env.REPAIR_VIDEO_ID;
const rerunVideoId = process.env.RERUN_VIDEO_ID;

function writeJson(filePath, value) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(value, null, 2));
}

function writeRepairableFixture() {
  const dir = path.join(insightsBaseDir, repairVideoId);
  fs.mkdirSync(dir, { recursive: true });

  const markdown = [
    '---',
    'title: "Repairable Fixture"',
    '---',
    '',
    '## Summary',
    'Repairable fixture summary paragraph.',
    '',
    '## Key Takeaways',
    '- Preserve durable run authority.',
    '',
    '## Action Items',
    '1. Rebuild structured analysis from canonical markdown.',
    '',
    '## Notable Points',
    '- Safe repair should not synthesize a new analysis run.',
  ].join('\n');

  fs.writeFileSync(path.join(dir, 'analysis.md'), markdown);
  fs.writeFileSync(path.join(dir, 'repairable-fixture.md'), markdown);
  writeJson(path.join(dir, 'video-metadata.json'), {
    videoId: repairVideoId,
    title: 'Repairable Fixture',
  });
  writeJson(path.join(dir, 'run.json'), {
    schemaVersion: 1,
    videoId: repairVideoId,
    provider: 'claude-cli',
    command: 'claude',
    args: ['-p'],
    status: 'complete',
    startedAt: '2026-03-08T20:53:03.157Z',
    promptResolvedAt: '2026-03-08T20:53:03.145Z',
    pid: 23322,
    completedAt: '2026-03-08T20:54:34.905Z',
    exitCode: 0,
    artifacts: {
      canonicalFileName: 'analysis.md',
      displayFileName: 'repairable-fixture.md',
      metadataFileName: 'video-metadata.json',
      stdoutFileName: 'worker-stdout.txt',
      stderrFileName: 'worker-stderr.txt',
    },
  });
  writeJson(path.join(dir, 'status.json'), {
    status: 'complete',
    pid: 23322,
    startedAt: '2026-03-08T20:53:03.157Z',
    completedAt: '2026-03-08T20:54:34.905Z',
  });
}

function writeRerunOnlyFixture() {
  const dir = path.join(insightsBaseDir, rerunVideoId);
  fs.mkdirSync(dir, { recursive: true });

  const markdown = [
    '---',
    'title: "Rerun Fixture"',
    '---',
    '',
    '## Summary',
    'Rerun fixture summary paragraph.',
    '',
    '## Key Takeaways',
    '- Existing markdown without run history must stay manual follow-up.',
    '',
    '## Action Items',
    '1. Run the normal analyze flow later.',
    '',
    '## Notable Points',
    '- The sweep must not invent run.json or attempt artifacts.',
  ].join('\n');

  fs.writeFileSync(path.join(dir, 'analysis.md'), markdown);
  fs.writeFileSync(path.join(dir, 'rerun-fixture.md'), markdown);
  writeJson(path.join(dir, 'video-metadata.json'), {
    videoId: rerunVideoId,
    title: 'Rerun Fixture',
  });
}

writeRepairableFixture();
writeRerunOnlyFixture();

console.log(JSON.stringify({
  ok: true,
  repairable: path.join(insightsBaseDir, repairVideoId),
  rerunOnly: path.join(insightsBaseDir, rerunVideoId),
}, null, 2));
NODE

cp "$INSIGHTS_BASE_DIR/$REPAIR_VIDEO_ID/run.json" "$REPAIRABLE_RUN_BEFORE"
cp "$INSIGHTS_BASE_DIR/$REPAIR_VIDEO_ID/status.json" "$REPAIRABLE_STATUS_BEFORE"

echo "==> asserting the refreshed video is absent before the upstream change"
node --import tsx <<'NODE'
const catalogModule = await import('./src/lib/catalog.ts');
const { getVideo } = catalogModule.default ?? catalogModule;
const videoId = process.env.VIDEO_ID_REFRESHED;
const video = getVideo(videoId);
if (video) {
  throw new Error(`expected ${videoId} to be absent before sweep refresh, found ${video.title}`);
}
console.log(JSON.stringify({ ok: true, beforeSweepVideoPresent: false, videoId }, null, 2));
NODE

echo "==> committing a second upstream transcript/video"
write_repo_state "$UPSTREAM_REPO" 1
UPDATED_HEAD="$(commit_all "$UPSTREAM_REPO" "add refreshed beta transcript")"
run_git "$UPSTREAM_REPO" push origin master >/dev/null

echo "==> running the daily sweep CLI"
node --import tsx scripts/daily-operational-sweep.ts >"$SWEEP_STDOUT_JSON"
cat "$SWEEP_STDOUT_JSON"
printf '\n'

echo "==> asserting refresh evidence, repair outcomes, and no-analysis boundaries"
INITIAL_HEAD="$INITIAL_HEAD" UPDATED_HEAD="$UPDATED_HEAD" VERIFY_SUMMARY_JSON="$VERIFY_SUMMARY_JSON" \
REPAIRABLE_RUN_BEFORE="$REPAIRABLE_RUN_BEFORE" REPAIRABLE_STATUS_BEFORE="$REPAIRABLE_STATUS_BEFORE" \
REPAIRABLE_RECONCILIATION_COPY="$REPAIRABLE_RECONCILIATION_COPY" RERUN_RECONCILIATION_COPY="$RERUN_RECONCILIATION_COPY" \
REPAIRABLE_ANALYSIS_COPY="$REPAIRABLE_ANALYSIS_COPY" LATEST_SWEEP_COPY="$LATEST_SWEEP_COPY" ARCHIVE_SWEEP_COPY="$ARCHIVE_SWEEP_COPY" \
LAST_SOURCE_REFRESH_COPY="$LAST_SOURCE_REFRESH_COPY" LAST_IMPORT_VALIDATION_COPY="$LAST_IMPORT_VALIDATION_COPY" \
node --import tsx <<'NODE'
import fs from 'node:fs';
import path from 'node:path';

const catalogModule = await import('./src/lib/catalog.ts');
const { getVideo } = catalogModule.default ?? catalogModule;
const rawRouteModule = await import('./src/app/api/raw/route.ts');
const { GET } = rawRouteModule.default ?? rawRouteModule;

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

function readJson(filePath: string) {
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}

function copyFile(src: string, dest: string) {
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

const workDir = path.join(process.cwd(), '.gsd/tmp/verify-s04-daily-sweep');
const runtimeDataDir = path.dirname(process.env.INSIGHTS_BASE_DIR!);
const runtimeDir = path.join(runtimeDataDir, 'runtime');
const sweepStdout = readJson(path.join(workDir, 'sweep-cli-output.json'));
const initialRefresh = readJson(path.join(workDir, 'initial-refresh.json'));
const latestSweep = readJson(path.join(runtimeDir, 'daily-operational-sweep', 'latest.json'));
const archiveSweep = readJson(latestSweep.paths.archive);
const lastSourceRefresh = readJson(path.join(path.dirname(process.env.CATALOG_DB_PATH!), 'last-source-refresh.json'));
const lastImportValidation = readJson(path.join(path.dirname(process.env.CATALOG_DB_PATH!), 'last-import-validation.json'));
const repairableReconciliationPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.REPAIR_VIDEO_ID!, 'reconciliation.json');
const rerunReconciliationPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.RERUN_VIDEO_ID!, 'reconciliation.json');
const repairableAnalysisPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.REPAIR_VIDEO_ID!, 'analysis.json');
const repairableRunPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.REPAIR_VIDEO_ID!, 'run.json');
const repairableStatusPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.REPAIR_VIDEO_ID!, 'status.json');
const rerunRunPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.RERUN_VIDEO_ID!, 'run.json');
const rerunStatusPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.RERUN_VIDEO_ID!, 'status.json');
const rerunRunsDir = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.RERUN_VIDEO_ID!, 'runs');
const refreshRunPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.VIDEO_ID_REFRESHED!, 'run.json');
const refreshStatusPath = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.VIDEO_ID_REFRESHED!, 'status.json');
const refreshRunsDir = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.VIDEO_ID_REFRESHED!, 'runs');
const repairableRunsDir = path.join(process.env.INSIGHTS_BASE_DIR!, process.env.REPAIR_VIDEO_ID!, 'runs');
const runtimeBatchRoot = path.join(runtimeDataDir, 'runtime', 'batches');
const initialHead = process.env.INITIAL_HEAD!;
const updatedHead = process.env.UPDATED_HEAD!;

assert(initialRefresh.status === 'noop', `expected initial refresh status noop, got ${initialRefresh.status}`);
assert(initialRefresh.repo.headBefore === initialHead, `expected initial refresh headBefore ${initialHead}, got ${initialRefresh.repo.headBefore}`);
assert(initialRefresh.repo.headAfter === initialHead, `expected initial refresh headAfter ${initialHead}, got ${initialRefresh.repo.headAfter}`);

assert(sweepStdout.status === 'manual-follow-up', `expected sweep CLI status manual-follow-up, got ${sweepStdout.status}`);
assert(sweepStdout.failingPhase === null, `expected sweep failingPhase null, got ${sweepStdout.failingPhase}`);
assert(JSON.stringify(sweepStdout.manualFollowUpVideoIds) === JSON.stringify([process.env.RERUN_VIDEO_ID]), `unexpected manualFollowUpVideoIds ${JSON.stringify(sweepStdout.manualFollowUpVideoIds)}`);
assert(sweepStdout.counts.repairedCount === 1, `expected repairedCount 1, got ${sweepStdout.counts.repairedCount}`);
assert(sweepStdout.counts.manualFollowUpCount === 1, `expected manualFollowUpCount 1, got ${sweepStdout.counts.manualFollowUpCount}`);
assert(sweepStdout.counts.errorCount === 0, `expected errorCount 0, got ${sweepStdout.counts.errorCount}`);
assert(sweepStdout.refresh.status === 'completed', `expected refresh status completed, got ${sweepStdout.refresh.status}`);
assert(sweepStdout.refresh.record.outcome === 'updated', `expected refresh outcome updated, got ${sweepStdout.refresh.record.outcome}`);
assert(sweepStdout.refresh.record.repo.headBefore === initialHead, `expected sweep refresh headBefore ${initialHead}, got ${sweepStdout.refresh.record.repo.headBefore}`);
assert(sweepStdout.refresh.record.repo.headAfter === updatedHead, `expected sweep refresh headAfter ${updatedHead}, got ${sweepStdout.refresh.record.repo.headAfter}`);
assert(sweepStdout.refresh.record.repo.upstreamHead === updatedHead, `expected sweep refresh upstreamHead ${updatedHead}, got ${sweepStdout.refresh.record.repo.upstreamHead}`);
assert(sweepStdout.repair.status === 'manual-follow-up', `expected repair status manual-follow-up, got ${sweepStdout.repair.status}`);

assert(latestSweep.outcome === 'manual-follow-up', `expected latest sweep outcome manual-follow-up, got ${latestSweep.outcome}`);
assert(latestSweep.paths.latest === sweepStdout.latestRecordPath, 'latest record path mismatch between CLI and durable record');
assert(latestSweep.paths.archive === sweepStdout.archiveRecordPath, 'archive record path mismatch between CLI and durable record');
assert(JSON.stringify(latestSweep.manualFollowUpVideoIds) === JSON.stringify([process.env.RERUN_VIDEO_ID]), `unexpected latest manualFollowUpVideoIds ${JSON.stringify(latestSweep.manualFollowUpVideoIds)}`);
assert(JSON.stringify(latestSweep) === JSON.stringify(archiveSweep), 'expected latest and archive sweep records to match exactly');

assert(lastSourceRefresh.outcome === 'updated', `expected last-source-refresh outcome updated, got ${lastSourceRefresh.outcome}`);
assert(lastSourceRefresh.repo.headBefore === initialHead, `expected last-source-refresh headBefore ${initialHead}, got ${lastSourceRefresh.repo.headBefore}`);
assert(lastSourceRefresh.repo.headAfter === updatedHead, `expected last-source-refresh headAfter ${updatedHead}, got ${lastSourceRefresh.repo.headAfter}`);
assert(lastImportValidation.catalogVersion === lastSourceRefresh.catalog.version, 'expected import validation catalogVersion to match refresh record');

const refreshedVideo = getVideo(process.env.VIDEO_ID_REFRESHED!);
assert(refreshedVideo?.title === 'Beta', `expected refreshed video title Beta, got ${refreshedVideo?.title ?? '<missing>'}`);
assert(refreshedVideo?.parts[0]?.filePath === 'beta/main.md', `expected beta file path beta/main.md, got ${refreshedVideo?.parts[0]?.filePath ?? '<missing>'}`);

const rawResponse = await GET(new Request('http://localhost/api/raw?path=beta/main.md'));
assert(rawResponse.status === 200, `expected raw route HTTP 200, got ${rawResponse.status}`);
const rawText = await rawResponse.text();
assert(rawText.includes('Beta transcript from refreshed upstream state.'), 'expected raw route to return refreshed beta transcript text');

const repairableReconciliation = readJson(repairableReconciliationPath);
const rerunReconciliation = readJson(rerunReconciliationPath);
const repairableAnalysis = readJson(repairableAnalysisPath);
const repairResults = latestSweep.repair.report.results;
const repairableResult = repairResults.find((entry: any) => entry.videoId === process.env.REPAIR_VIDEO_ID);
const rerunResult = repairResults.find((entry: any) => entry.videoId === process.env.RERUN_VIDEO_ID);

assert(repairableResult, `missing sweep repair result for ${process.env.REPAIR_VIDEO_ID}`);
assert(rerunResult, `missing sweep repair result for ${process.env.RERUN_VIDEO_ID}`);
assert(repairableResult.action === 'repaired', `expected ${process.env.REPAIR_VIDEO_ID} action repaired, got ${repairableResult.action}`);
assert(JSON.stringify(repairableResult.reasonCodes) === JSON.stringify(['missing-structured-analysis']), `unexpected ${process.env.REPAIR_VIDEO_ID} reason codes ${JSON.stringify(repairableResult.reasonCodes)}`);
assert(repairableResult.operatorEvidence?.analyzeOutcome === 'resolved', `expected ${process.env.REPAIR_VIDEO_ID} analyzeOutcome resolved`);
assert(repairableResult.operatorEvidence?.retryable === false, `expected ${process.env.REPAIR_VIDEO_ID} retryable false`);
assert(rerunResult.action === 'rerun-needed', `expected ${process.env.RERUN_VIDEO_ID} action rerun-needed, got ${rerunResult.action}`);
assert(JSON.stringify(rerunResult.reasonCodes) === JSON.stringify(['artifacts-without-run']), `unexpected ${process.env.RERUN_VIDEO_ID} reason codes ${JSON.stringify(rerunResult.reasonCodes)}`);
assert(rerunResult.operatorEvidence?.analyzeOutcome === 'retry-needed', `expected ${process.env.RERUN_VIDEO_ID} analyzeOutcome retry-needed`);
assert(rerunResult.operatorEvidence?.retryable === true, `expected ${process.env.RERUN_VIDEO_ID} retryable true`);

assert(repairableReconciliation.status === 'resolved', `expected ${process.env.REPAIR_VIDEO_ID} reconciliation resolved, got ${repairableReconciliation.status}`);
assert(repairableReconciliation.resolution === 'resolved', `expected ${process.env.REPAIR_VIDEO_ID} reconciliation resolution resolved, got ${repairableReconciliation.resolution}`);
assert(repairableReconciliation.retryable === false, `expected ${process.env.REPAIR_VIDEO_ID} reconciliation retryable false`);
assert(Array.isArray(repairableReconciliation.reasons) && repairableReconciliation.reasons.length === 0, `expected ${process.env.REPAIR_VIDEO_ID} reconciliation reasons to be empty`);
assert(Array.isArray(repairableAnalysis.takeaways) && repairableAnalysis.takeaways[0] === 'Preserve durable run authority.', 'expected repairable analysis takeaways to be rebuilt from markdown');
assert(Array.isArray(repairableAnalysis.actionItems) && repairableAnalysis.actionItems[0] === 'Rebuild structured analysis from canonical markdown.', 'expected repairable action item to be rebuilt from markdown');

assert(rerunReconciliation.status === 'mismatch', `expected ${process.env.RERUN_VIDEO_ID} reconciliation mismatch, got ${rerunReconciliation.status}`);
assert(rerunReconciliation.resolution === 'rerun-ready', `expected ${process.env.RERUN_VIDEO_ID} reconciliation resolution rerun-ready, got ${rerunReconciliation.resolution}`);
assert(rerunReconciliation.retryable === true, `expected ${process.env.RERUN_VIDEO_ID} reconciliation retryable true`);
assert(Array.isArray(rerunReconciliation.reasons) && rerunReconciliation.reasons[0]?.code === 'artifacts-without-run', `expected ${process.env.RERUN_VIDEO_ID} reconciliation reason artifacts-without-run`);

assert(fs.readFileSync(repairableRunPath, 'utf8') === fs.readFileSync(process.env.REPAIRABLE_RUN_BEFORE!, 'utf8'), `expected ${process.env.REPAIR_VIDEO_ID} run.json to remain unchanged by safe repair`);
assert(fs.readFileSync(repairableStatusPath, 'utf8') === fs.readFileSync(process.env.REPAIRABLE_STATUS_BEFORE!, 'utf8'), `expected ${process.env.REPAIR_VIDEO_ID} status.json to remain unchanged by safe repair`);
assert(!fs.existsSync(repairableRunsDir), `unexpected runs/ directory created for ${process.env.REPAIR_VIDEO_ID}`);
assert(!fs.existsSync(rerunRunPath), `unexpected run.json created for ${process.env.RERUN_VIDEO_ID}`);
assert(!fs.existsSync(rerunStatusPath), `unexpected status.json created for ${process.env.RERUN_VIDEO_ID}`);
assert(!fs.existsSync(rerunRunsDir), `unexpected runs/ directory created for ${process.env.RERUN_VIDEO_ID}`);
assert(!fs.existsSync(refreshRunPath), `unexpected run.json created for synced video ${process.env.VIDEO_ID_REFRESHED}`);
assert(!fs.existsSync(refreshStatusPath), `unexpected status.json created for synced video ${process.env.VIDEO_ID_REFRESHED}`);
assert(!fs.existsSync(refreshRunsDir), `unexpected runs/ directory created for synced video ${process.env.VIDEO_ID_REFRESHED}`);
assert(!fs.existsSync(runtimeBatchRoot), `unexpected runtime batch artifacts created at ${runtimeBatchRoot}`);

copyFile(repairableReconciliationPath, process.env.REPAIRABLE_RECONCILIATION_COPY!);
copyFile(rerunReconciliationPath, process.env.RERUN_RECONCILIATION_COPY!);
copyFile(repairableAnalysisPath, process.env.REPAIRABLE_ANALYSIS_COPY!);
copyFile(latestSweep.paths.latest, process.env.LATEST_SWEEP_COPY!);
copyFile(latestSweep.paths.archive, process.env.ARCHIVE_SWEEP_COPY!);
copyFile(path.join(path.dirname(process.env.CATALOG_DB_PATH!), 'last-source-refresh.json'), process.env.LAST_SOURCE_REFRESH_COPY!);
copyFile(path.join(path.dirname(process.env.CATALOG_DB_PATH!), 'last-import-validation.json'), process.env.LAST_IMPORT_VALIDATION_COPY!);

const summary = {
  ok: true,
  sweep: {
    outcome: latestSweep.outcome,
    failingPhase: latestSweep.failingPhase,
    sweepId: latestSweep.sweepId,
    manualFollowUpVideoIds: latestSweep.manualFollowUpVideoIds,
    counts: latestSweep.counts,
  },
  refresh: {
    initialStatus: initialRefresh.status,
    headBefore: lastSourceRefresh.repo.headBefore,
    headAfter: lastSourceRefresh.repo.headAfter,
    catalogVersion: lastSourceRefresh.catalog.version,
    refreshedVideoId: process.env.VIDEO_ID_REFRESHED,
    refreshedPartPath: refreshedVideo.parts[0].filePath,
  },
  repair: {
    repairableVideoId: process.env.REPAIR_VIDEO_ID,
    repairableAction: repairableResult.action,
    repairableReconciliation: {
      status: repairableReconciliation.status,
      resolution: repairableReconciliation.resolution,
    },
    rerunVideoId: process.env.RERUN_VIDEO_ID,
    rerunAction: rerunResult.action,
    rerunReconciliation: {
      status: rerunReconciliation.status,
      resolution: rerunReconciliation.resolution,
      primaryReasonCode: rerunReconciliation.reasons[0]?.code ?? null,
    },
  },
  noAutoAnalysis: {
    syncedVideoRunJsonPresent: fs.existsSync(refreshRunPath),
    syncedVideoStatusJsonPresent: fs.existsSync(refreshStatusPath),
    rerunVideoRunJsonPresent: fs.existsSync(rerunRunPath),
    rerunVideoStatusJsonPresent: fs.existsSync(rerunStatusPath),
    runtimeBatchArtifactsPresent: fs.existsSync(runtimeBatchRoot),
  },
  evidence: {
    workDir,
    sweepCliOutputPath: path.join(workDir, 'sweep-cli-output.json'),
    verificationSummaryPath: process.env.VERIFY_SUMMARY_JSON,
    sweepLatestCopyPath: process.env.LATEST_SWEEP_COPY,
    sweepArchiveCopyPath: process.env.ARCHIVE_SWEEP_COPY,
    lastSourceRefreshCopyPath: process.env.LAST_SOURCE_REFRESH_COPY,
    lastImportValidationCopyPath: process.env.LAST_IMPORT_VALIDATION_COPY,
    repairableReconciliationCopyPath: process.env.REPAIRABLE_RECONCILIATION_COPY,
    rerunReconciliationCopyPath: process.env.RERUN_RECONCILIATION_COPY,
    repairableAnalysisCopyPath: process.env.REPAIRABLE_ANALYSIS_COPY,
    runtimeSweepLatestPath: latestSweep.paths.latest,
    runtimeSweepArchivePath: latestSweep.paths.archive,
    runtimeLastSourceRefreshPath: path.join(path.dirname(process.env.CATALOG_DB_PATH!), 'last-source-refresh.json'),
    runtimeLastImportValidationPath: path.join(path.dirname(process.env.CATALOG_DB_PATH!), 'last-import-validation.json'),
    runtimeRepairableReconciliationPath: repairableReconciliationPath,
    runtimeRerunReconciliationPath: rerunReconciliationPath,
  },
};

fs.writeFileSync(process.env.VERIFY_SUMMARY_JSON!, JSON.stringify(summary, null, 2));
console.log(JSON.stringify(summary, null, 2));
NODE

echo "==> verification evidence written under $WORK_DIR"
