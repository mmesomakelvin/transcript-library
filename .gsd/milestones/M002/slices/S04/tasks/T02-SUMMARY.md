---
id: T02
parent: S04
milestone: M002
provides:
  - A real refresh-plus-repair verification harness that proves the daily sweep contract against durable runtime evidence instead of stdout alone.
key_files:
  - scripts/verify-s04-daily-sweep.sh
  - .gsd/milestones/M002/slices/S04/S04-SUMMARY.md
  - .gsd/tmp/verify-s04-daily-sweep/verification-summary.json
key_decisions:
  - Build the sweep proof as one disposable runtime harness that copies the authoritative runtime JSON surfaces into `.gsd/tmp/verify-s04-daily-sweep/` so future agents can inspect proof artifacts without re-deriving paths from the live runtime tree.
patterns_established:
  - Combined sweep verification should assert refresh, repair, and no-auto-analysis boundaries from durable JSON artifacts: sweep latest/archive, source refresh records, import validation, and per-video reconciliation files.
observability_surfaces:
  - `bash scripts/verify-s04-daily-sweep.sh`
  - `.gsd/tmp/verify-s04-daily-sweep/verification-summary.json`
  - `.gsd/tmp/verify-s04-daily-sweep/sweep-latest.json`
  - `.gsd/tmp/verify-s04-daily-sweep/sweep-archive.json`
  - `.gsd/tmp/verify-s04-daily-sweep/last-source-refresh.json`
  - `.gsd/tmp/verify-s04-daily-sweep/last-import-validation.json`
  - `.gsd/tmp/verify-s04-daily-sweep/repairable-reconciliation.json`
  - `.gsd/tmp/verify-s04-daily-sweep/rerun-reconciliation.json`
duration: 1h
verification_result: passed
completed_at: 2026-03-13T16:28:41Z
blocker_discovered: false
---

# T02: Prove the sweep contract with a real refresh-plus-repair verification harness

**Added `scripts/verify-s04-daily-sweep.sh`, a disposable-runtime contract harness that proves one daily sweep can refresh source state, repair only the safe historical mismatch, preserve rerun-only follow-up, and avoid starting analysis work.**

## What Happened

I built `scripts/verify-s04-daily-sweep.sh` in the same temporary-runtime style as the S02 and S03 verifiers. The script creates a bare upstream git repo, an app-owned clone, a disposable runtime root, and two representative insight directories under that runtime: `repair123xy` as a `missing-structured-analysis` repair candidate and `rerun123xyz` as an `artifacts-without-run` rerun-only mismatch.

The harness seeds the catalog through the supported refresh CLI, confirms the refreshed video (`beta123xyza`) is absent before the upstream change, pushes a real second upstream commit, and then runs `node --import tsx scripts/daily-operational-sweep.ts`. From there it asserts the contract from disk-backed evidence rather than trusting stdout alone: the sweep CLI payload, durable latest/archive sweep records, `last-source-refresh.json`, `last-import-validation.json`, rebuilt `analysis.json` for the repairable directory, and both per-video `reconciliation.json` files.

The proof locks three boundaries at once. First, refresh truth: the git heads advance, the refreshed catalog exposes `beta/main.md`, and `/api/raw` reads the new transcript text. Second, repair truth: the repairable directory resolves in place, while its existing `run.json` and `status.json` remain byte-for-byte unchanged. Third, no-auto-analysis truth: the rerun-only directory stays `rerun-needed` with explicit `operatorEvidence`, and neither it nor the newly synced video gains `run.json`, `status.json`, `runs/`, or runtime batch artifacts.

I also created `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md` so the slice now carries the rerunnable proof command plus the concrete artifact paths that T03 and later slices can inspect directly.

## Verification

Passed with fresh evidence:

- `bash scripts/verify-s04-daily-sweep.sh`
  - wrote `.gsd/tmp/verify-s04-daily-sweep/verification-summary.json`
  - wrote copied proof artifacts under `.gsd/tmp/verify-s04-daily-sweep/`
  - confirmed the runtime proof surfaces under `.gsd/tmp/verify-s04-daily-sweep/runtime/data/...`
- `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
- Slice-level check status during this task:
  - Passed: `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
  - Passed: `bash scripts/verify-s04-daily-sweep.sh`
  - Partial only / still owned by T03: `rg -n "daily sweep|daily-operational-sweep|refresh-only|manual follow-up|analysis remains on-demand" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json`

## Diagnostics

- Rerun `bash scripts/verify-s04-daily-sweep.sh`.
- Start with `.gsd/tmp/verify-s04-daily-sweep/verification-summary.json` for the combined verdict and exact evidence paths.
- Inspect these copied proof artifacts next:
  - `.gsd/tmp/verify-s04-daily-sweep/sweep-cli-output.json`
  - `.gsd/tmp/verify-s04-daily-sweep/sweep-latest.json`
  - `.gsd/tmp/verify-s04-daily-sweep/sweep-archive.json`
  - `.gsd/tmp/verify-s04-daily-sweep/last-source-refresh.json`
  - `.gsd/tmp/verify-s04-daily-sweep/last-import-validation.json`
  - `.gsd/tmp/verify-s04-daily-sweep/repairable-reconciliation.json`
  - `.gsd/tmp/verify-s04-daily-sweep/rerun-reconciliation.json`
  - `.gsd/tmp/verify-s04-daily-sweep/repairable-analysis.json`
- If the harness fails, it stops at the first broken contract and names the diverging evidence surface in the assertion message.

## Deviations

- The task plan asked to update `S04-SUMMARY.md`, but that file did not exist yet. I created it and recorded the T01-T02 proof state there so downstream work has one slice-level place to inspect the command and evidence paths.

## Known Issues

- T03 still needs to update the repo command/doc surfaces so the daily sweep is clearly presented as the unattended default. The current slice proof is real, but the operator-facing wording is not complete until that task lands.

## Files Created/Modified

- `scripts/verify-s04-daily-sweep.sh` — end-to-end daily sweep contract harness with disposable upstream/runtime fixtures and disk-evidence assertions.
- `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md` — slice-level proof summary with rerunnable command and evidence paths.
- `.gsd/milestones/M002/slices/S04/tasks/T02-SUMMARY.md` — task execution summary and verification record.
