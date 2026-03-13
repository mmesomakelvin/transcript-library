---
id: S04
parent: M002
milestone: M002
status: in_progress
completed_tasks:
  - T01
  - T02
pending_tasks:
  - T03
last_updated: 2026-03-13T16:28:41Z
---

# S04: Daily Operational Sweep and Repair Automation

**Current slice state:** the daily sweep runtime is in place and now has a real end-to-end proof showing one sweep can pull an upstream transcript change, repair only the safe `missing-structured-analysis` class, keep `artifacts-without-run` as explicit manual follow-up, and leave analysis work on-demand.

## What T01-T02 Proved

- `src/lib/daily-operational-sweep.ts` and `scripts/daily-operational-sweep.ts` are now the scheduler-safe sweep authority: refresh first, then conservative historical repair, then persist one durable sweep record under shared runtime storage.
- `scripts/verify-s04-daily-sweep.sh` now composes the S03 refresh proof and the S02 repair proof in one disposable runtime.
- The harness creates a temporary bare upstream repo plus app-owned clone, seeds one repairable historical directory (`repair123xy`) and one rerun-only directory (`rerun123xyz`), pushes a real upstream commit that adds `beta123xyza`, then runs the supported daily sweep CLI.
- The proof shows one sweep ending as `manual-follow-up` with `repairedCount: 1`, `manualFollowUpCount: 1`, and `manualFollowUpVideoIds: ["rerun123xyz"]`.
- Refresh evidence proves the upstream change reached browse state: `beta123xyza` appears in the catalog with `beta/main.md`, `/api/raw?path=beta/main.md` returns the refreshed transcript text, and the durable `last-source-refresh.json` / `last-import-validation.json` match the sweep record.
- Repair evidence proves the safe class was repaired in place: `repair123xy` moves to `reconciliation.status = resolved`, `analysis.json` is rebuilt from canonical markdown, and the pre-existing `run.json` / `status.json` remain byte-for-byte unchanged.
- Manual-follow-up evidence proves the unsafe class stayed honest: `rerun123xyz` remains `reconciliation.status = mismatch` with `resolution = rerun-ready`, the sweep report preserves `operatorEvidence`, and no `run.json`, `status.json`, or `runs/` attempt artifacts are synthesized.
- The no-auto-analysis boundary still holds: no `run.json`, `status.json`, `runs/`, or runtime batch artifacts are created for the newly refreshed video or the rerun-needed video.

## Verification Status

Passed during T02:

- `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
- `bash scripts/verify-s04-daily-sweep.sh`

Slice-level doc/command grep is still only partially satisfied and remains owned by T03:

- `rg -n "daily sweep|daily-operational-sweep|refresh-only|manual follow-up|analysis remains on-demand" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json`

## Durable Evidence

Rerun and inspect:

- `bash scripts/verify-s04-daily-sweep.sh`
- `.gsd/tmp/verify-s04-daily-sweep/verification-summary.json`
- `.gsd/tmp/verify-s04-daily-sweep/sweep-cli-output.json`
- `.gsd/tmp/verify-s04-daily-sweep/sweep-latest.json`
- `.gsd/tmp/verify-s04-daily-sweep/sweep-archive.json`
- `.gsd/tmp/verify-s04-daily-sweep/last-source-refresh.json`
- `.gsd/tmp/verify-s04-daily-sweep/last-import-validation.json`
- `.gsd/tmp/verify-s04-daily-sweep/repairable-reconciliation.json`
- `.gsd/tmp/verify-s04-daily-sweep/rerun-reconciliation.json`
- `.gsd/tmp/verify-s04-daily-sweep/repairable-analysis.json`

Runtime paths from the same proof run:

- `.gsd/tmp/verify-s04-daily-sweep/runtime/data/runtime/daily-operational-sweep/latest.json`
- `.gsd/tmp/verify-s04-daily-sweep/runtime/data/runtime/daily-operational-sweep/archive/<sweepId>.json`
- `.gsd/tmp/verify-s04-daily-sweep/runtime/data/catalog/last-source-refresh.json`
- `.gsd/tmp/verify-s04-daily-sweep/runtime/data/catalog/last-import-validation.json`
- `.gsd/tmp/verify-s04-daily-sweep/runtime/data/insights/repair123xy/reconciliation.json`
- `.gsd/tmp/verify-s04-daily-sweep/runtime/data/insights/rerun123xyz/reconciliation.json`

## Remaining Slice Work

- T03 still needs to make the unattended operator contract explicit in repo commands and docs so the daily sweep is the obvious scheduled default rather than just a verified runtime boundary.
