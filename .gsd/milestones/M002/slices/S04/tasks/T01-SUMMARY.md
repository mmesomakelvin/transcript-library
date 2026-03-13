---
id: T01
parent: S04
milestone: M002
provides:
  - Daily sweep orchestration that composes refresh and safe historical repair into one durable runtime record without starting analysis work.
key_files:
  - src/lib/daily-operational-sweep.ts
  - scripts/daily-operational-sweep.ts
  - src/lib/__tests__/daily-operational-sweep.test.ts
key_decisions:
  - Keep the full refresh record and full repair report nested inside the sweep artifact, and derive sweep/phase status alongside them instead of collapsing operator evidence into a new summary-only schema.
patterns_established:
  - Persist unattended operator evidence under `path.dirname(insightsBaseDir())/runtime/...` with one stable latest JSON plus one archived per-run JSON record.
observability_surfaces:
  - `data/runtime/daily-operational-sweep/latest.json`
  - `data/runtime/daily-operational-sweep/archive/<sweepId>.json`
  - `node --import tsx scripts/daily-operational-sweep.ts`
duration: 1h
verification_result: passed
completed_at: 2026-03-13T16:21:22Z
blocker_discovered: false
---

# T01: Add the daily sweep orchestrator and durable sweep record

**Added a scheduler-safe daily sweep service/CLI that runs refresh then safe repair, derives truthful sweep outcomes, and writes durable latest/archive JSON evidence under shared runtime storage.**

## What Happened

I added `src/lib/daily-operational-sweep.ts` as the new S04 runtime boundary. It calls `refreshSourceCatalog()` first, then `repairHistoricalArtifacts()`, derives top-level outcomes as `clean`, `repaired`, `manual-follow-up`, or `failed`, and persists one machine-readable sweep record under shared runtime storage. The record keeps the full refresh payload and full repair report nested verbatim enough for operators to diagnose failures without having to recompute phase evidence.

I used the existing shared runtime storage convention (`path.dirname(insightsBaseDir())/runtime`) and wrote both `runtime/daily-operational-sweep/latest.json` and `runtime/daily-operational-sweep/archive/<sweepId>.json`. Manual follow-up video IDs are derived only from `rerun-needed` repair results, so unsafe mismatches stay explicitly rerun-only rather than being auto-repaired or reinterpreted.

I added `scripts/daily-operational-sweep.ts` as the CLI entrypoint with the same `.env.local` loading pattern as the refresh CLI. It prints the sweep payload and exits non-zero only when the composed sweep outcome is `failed`.

I wrote `src/lib/__tests__/daily-operational-sweep.test.ts` first, then implemented the orchestrator to satisfy it. The tests cover clean, repaired, manual-follow-up, and failed sweeps, and the manual-follow-up fixture proves the sweep does not synthesize `run.json` history for `artifacts-without-run` directories.

## Verification

- Passed: `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
- Passed: `PLAYLIST_TRANSCRIPTS_REPO=/tmp/does-not-exist CATALOG_DB_PATH=$(mktemp -u)/catalog.db INSIGHTS_BASE_DIR=$(mktemp -u)/insights node --import tsx scripts/daily-operational-sweep.ts`
  - confirmed CLI execution path, non-zero exit on failed refresh, and emitted latest/archive record paths
- Passed: read the emitted `latest.json` and archived sweep JSON directly and confirmed they preserved refresh failure details, repair report structure, and matching archive/latest content
- Slice-level checks run from S04 plan:
  - Passed: `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
  - Not yet passing: `bash scripts/verify-s04-daily-sweep.sh` (`No such file or directory`) — owned by T02
  - Partial only: `rg -n "daily sweep|daily-operational-sweep|refresh-only|manual follow-up|analysis remains on-demand" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json` — existing refresh-only references are present, but T03 still owns the explicit daily-sweep doc/command updates

## Diagnostics

- Run `node --import tsx scripts/daily-operational-sweep.ts` to execute the sweep through the supported CLI.
- Inspect `data/runtime/daily-operational-sweep/latest.json` for the last sweep and `data/runtime/daily-operational-sweep/archive/<sweepId>.json` for immutable per-run evidence.
- Sweep records expose: `outcome`, `failingPhase`, `manualFollowUpVideoIds`, repair counts, the full refresh record under `refresh.record`, and the full repair report under `repair.report`.

## Deviations

- None.

## Known Issues

- `scripts/verify-s04-daily-sweep.sh` does not exist yet, so the full slice verification harness remains outstanding until T02.
- Operator docs/commands still need explicit daily-sweep wording from T03.

## Files Created/Modified

- `src/lib/daily-operational-sweep.ts` — shared sweep orchestrator, outcome derivation, and durable latest/archive record writer
- `scripts/daily-operational-sweep.ts` — CLI entrypoint for schedulers and operators
- `src/lib/__tests__/daily-operational-sweep.test.ts` — regression coverage for clean/repaired/manual-follow-up/failed sweeps and no-analysis behavior
- `.gsd/milestones/M002/slices/S04/S04-PLAN.md` — marked T01 complete
