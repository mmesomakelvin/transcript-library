---
id: S01
parent: M002
milestone: M002
provides:
  - repairable analyze-start responses when the catalog snapshot is broken
  - durable worker failure summaries promoted from real stdout/stderr evidence
  - a repeatable recovery verification script for the representative video
  - one locally proven provider-backed success path that writes canonical insight artifacts
requires: []
affects:
  - R004
  - R011
key_files:
  - src/app/api/analyze/route.ts
  - src/lib/analysis.ts
  - src/lib/structured-analysis.schema.json
  - scripts/rebuild-catalog.ts
  - scripts/verify-s01-analysis-recovery.sh
key_decisions:
  - "Map broken catalog lookup errors at the analyze route boundary into a retryable `catalog-rebuild-needed` outcome with the supported `npx tsx scripts/rebuild-catalog.ts` repair command."
  - "Promote durable failure summaries from the first meaningful stderr/stdout line so run/status/route reads name the real cause instead of flattening to `exit code 1`."
  - "Use the server-owned Codex provider path with a checked-in JSON schema as the local recovery proof while leaving provider selection out of the UI."
patterns_established:
  - "Slice verification starts by validating or rebuilding the catalog, then exercises the normal `/api/analyze` and `/api/analyze/status` flow against the representative video."
  - "Provider-backed success proof is asserted from canonical artifacts (`run.json`, `status.json`, `analysis.json`, `analysis.md`, slugged markdown) instead of ad hoc log inspection."
  - "Remaining provider failures are named from preserved durable evidence under `data/insights/<videoId>/runs/<runId>/` rather than generic process exits."
observability_surfaces:
  - POST /api/analyze
  - GET /api/analyze/status
  - data/insights/RpUTF_U4kiw/run.json
  - data/insights/RpUTF_U4kiw/status.json
  - data/insights/RpUTF_U4kiw/analysis.json
  - data/insights/RpUTF_U4kiw/analysis.md
  - data/insights/RpUTF_U4kiw/runs/20260313023408847-7f7cbb/worker-stdout.txt
  - scripts/verify-s01-analysis-recovery.sh
duration: 1h 5m
verification_result: passed
completed_at: 2026-03-13T03:15:00Z
blocker_discovered: false
---

# S01: Runtime Failure Triage and Analysis Recovery

**Restored a trustworthy on-demand analysis loop by hardening analyze-start preconditions, persisting real worker causes into durable runtime artifacts, and proving one representative video now completes end to end through the normal runtime path.**

## What Happened

This slice closed the gap between "better failure contracts" and actual runtime recovery.

T01 hardened `POST /api/analyze` so a broken catalog snapshot no longer collapses into a raw 500. The route now returns a repairable `catalog-rebuild-needed` outcome with the supported `npx tsx scripts/rebuild-catalog.ts` repair command.

T02 moved worker failure promotion into the shared runtime authority. Failed runs now persist the first meaningful stderr/stdout evidence line into `run.json`, `status.json`, and the route payloads, which makes provider-auth and account failures readable without opening raw logs first.

T03 proved one provider-backed recovery path locally for the representative video `RpUTF_U4kiw`. The runtime now ships a checked-in `src/lib/structured-analysis.schema.json`, and the Codex provider path passes that schema to `codex exec --output-schema ...` so the provider is constrained to the app’s structured artifact contract. `scripts/verify-s01-analysis-recovery.sh` rebuilds prerequisites, starts the local app with `ANALYSIS_PROVIDER=codex-cli`, triggers `/api/analyze`, polls `/api/analyze/status` to terminal state, and then asserts canonical success artifacts on disk.

The representative run completed successfully as `runId: 20260313030655999-9345af` with `provider: codex-cli`, `status: complete`, `lifecycle: completed`, and canonical artifacts written under `data/insights/RpUTF_U4kiw/`.

The non-working provider path is still explicit rather than hidden: the preserved Claude attempt at `data/insights/RpUTF_U4kiw/runs/20260313023408847-7f7cbb/` failed because the provider account reported `Credit balance is too low`. That remains a hosted/account-state issue, not an opaque runtime contract failure.

## Verification

Passed locally:

- `npx vitest run src/lib/__tests__/analyze-route.test.ts src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
- `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'`
- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`

The verification script confirmed:

- analyze start returned `{"ok":true,"status":"running","outcome":"started"}`
- status polling reached `status=complete lifecycle=completed`
- `run.json` recorded `provider: codex-cli`, `exitCode: 0`, and the schema-constrained Codex args
- `status.json`, `analysis.json`, `analysis.md`, and the slugged markdown artifact all existed and were non-empty

## Diagnostics

A future agent can inspect the slice outcome with:

- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`
- `data/insights/RpUTF_U4kiw/run.json` for the canonical successful run
- `data/insights/RpUTF_U4kiw/status.json` for compatibility-mapped lifecycle state
- `data/insights/RpUTF_U4kiw/analysis.json` and `analysis.md` for the validated structured/canonical outputs
- `data/insights/RpUTF_U4kiw/runs/20260313023408847-7f7cbb/run.json` plus `worker-stdout.txt` for the remaining Claude failure evidence (`Credit balance is too low`)

## Remaining Hosted Proof

- Claude CLI is still not locally viable for this representative run because the provider account reports low credit.
- The slice proves a real local recovery path with Codex, but hosted launch still needs a deliberate provider decision and fresh hosted verification once Claude account state is restored or Codex is chosen for deployment.

## Files Created/Modified

- `src/lib/analysis.ts` — constrains Codex runs with a checked-in output schema while keeping provider selection server-owned.
- `src/lib/structured-analysis.schema.json` — defines the strict structured-analysis response contract for Codex CLI runs.
- `src/lib/__tests__/runtime-runs.test.ts` — covers the shipped schema artifact used by the Codex recovery path.
- `scripts/verify-s01-analysis-recovery.sh` — repeatable catalog-rebuild, analyze, poll, and artifact-assertion script for `RpUTF_U4kiw`.
- `.gsd/milestones/M002/slices/S01/S01-SUMMARY.md` — records what the slice proved locally and what still awaits hosted proof.
