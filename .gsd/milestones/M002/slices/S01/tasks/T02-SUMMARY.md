---
id: T02
parent: S01
milestone: M002
provides:
  - Durable runtime failures now promote the first meaningful stdout/stderr evidence line into run.json, status.json, and route payloads.
key_files:
  - src/lib/analysis.ts
  - src/lib/__tests__/runtime-runs.test.ts
  - src/lib/__tests__/runtime-compat.test.ts
  - .gsd/DECISIONS.md
key_decisions:
  - Promote failure summaries inside writeRunLifecycle so the durable runtime authority, compatibility status file, and route payloads all read the same top-line cause.
patterns_established:
  - Derive operator-facing failure text from persisted worker logs with stderr-first/stdout-second evidence selection instead of route-local summarization.
observability_surfaces:
  - data/insights/<videoId>/run.json
  - data/insights/<videoId>/status.json
  - GET /api/insight
  - GET /api/analyze/status
  - worker-stdout.txt / worker-stderr.txt
duration: 39m
verification_result: passed
completed_at: 2026-03-13T02:59:22Z
blocker_discovered: false
---

# T02: Promote worker failure evidence into durable runtime truth

**Promoted meaningful worker failure lines from stdout/stderr into the shared durable runtime record so opaque `exit code 1` failures now persist as operator-readable causes.**

## What Happened

I inspected the runtime close-handler and confirmed the gap was in `src/lib/analysis.ts`: failed runs only summarized stderr, while the provider failure reproduced in S01 research (`Credit balance is too low`) lived in stdout. I added shared failure-line selection helpers there, normalized obvious non-signal progress lines, and made `writeRunLifecycle` promote the best available evidence from attempt logs or canonical worker logs whenever a run is persisted as failed/interrupted.

To keep the contract honest, I added the regression first in `src/lib/__tests__/runtime-runs.test.ts` and `src/lib/__tests__/runtime-compat.test.ts`. The red run showed the exact mismatch: `run.json`, `status.json`, and `GET /api/insight` all still surfaced `exit code 1`. I also updated the existing completed-run compatibility fixture to include the required structured artifact, since the current reconciliation contract correctly treats markdown-only completed runs as mismatched.

No new diagnostics channel or route-local summary logic was added. The routes keep reading the same durable runtime snapshot; the writer now stores a better canonical error.

## Verification

- Passed: `npx vitest run src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
- Passed: `npx vitest run src/lib/__tests__/runtime-stream.test.ts`
- Passed: `npx vitest run src/lib/__tests__/analyze-route.test.ts src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
- Passed: `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'`
- Failed as expected for this task boundary: `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw` → script missing; this remains T03 work, not a T02 regression.

## Diagnostics

A future agent can inspect a failed provider run without opening raw logs first by reading:

- `data/insights/<videoId>/run.json` for the canonical latest-run error
- `data/insights/<videoId>/status.json` for the compatibility-derived mirror
- `GET /api/insight?videoId=<id>` for the same durable error plus recent logs
- `GET /api/analyze/status?videoId=<id>` for lifecycle/status alignment

If the promoted top-line cause still looks too generic, compare it with `worker-stdout.txt` and `worker-stderr.txt`; the runtime now selects the first meaningful stderr/stdout line from those same artifacts.

## Deviations

- Updated the existing completed-run compatibility fixture to include a valid structured analysis artifact because the current reconciliation contract marks a completed markdown-only run as mismatched. This was test-fixture alignment, not a production-scope change.

## Known Issues

- `scripts/verify-s01-analysis-recovery.sh` does not exist yet, so the final slice recovery proof remains open for T03.

## Files Created/Modified

- `src/lib/analysis.ts` — added shared failure-evidence promotion and routed failed lifecycle writes through it.
- `src/lib/__tests__/runtime-runs.test.ts` — added regression coverage for stdout-only provider failures persisting into `run.json` and `status.json`.
- `src/lib/__tests__/runtime-compat.test.ts` — added route-facing durable failure assertions and aligned the completed-run fixture with the structured-artifact contract.
- `.gsd/DECISIONS.md` — recorded the shared durable failure-summary decision for downstream slice work.
