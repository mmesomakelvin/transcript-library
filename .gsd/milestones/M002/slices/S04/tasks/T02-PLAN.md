---
estimated_steps: 4
estimated_files: 5
---

# T02: Prove the sweep contract with a real refresh-plus-repair verification harness

**Slice:** S04 — Daily Operational Sweep and Repair Automation
**Milestone:** M002

## Description

Exercise the new sweep like an operator would. This task builds a real contract harness that composes the S03 refresh proof and the S02 repair proof in one pass, so the slice closes on operational evidence instead of trusting unit-level composition alone.

## Steps

1. Create `scripts/verify-s04-daily-sweep.sh` using the same temporary-runtime style as the S02 and S03 verifiers: stand up a disposable transcript repo fixture, app runtime root, and representative insight directories for one repairable and one rerun-only mismatch.
2. In the harness, trigger an upstream transcript change, run the new daily sweep CLI, and capture the emitted sweep JSON plus the durable latest/archive sweep artifacts, `last-source-refresh.json`, `last-import-validation.json`, and the representative per-video reconciliation files.
3. Assert the combined contract: refresh evidence shows the upstream change reached the app runtime, the repairable `missing-structured-analysis` directory becomes resolved, the rerun-only `artifacts-without-run` directory remains manual follow-up with explicit `operatorEvidence`, and no new `run.json` or analysis batch artifacts are created for synced or rerun-needed videos.
4. Record the key proof outputs under `.gsd/tmp/verify-s04-daily-sweep/` and update the slice summary with the concrete evidence paths the next slice can inspect.

## Must-Haves

- [ ] The verification harness exercises a real upstream refresh event plus both representative repair classes in one sweep run.
- [ ] The harness asserts durable sweep artifacts, refresh evidence, and per-video reconciliation state rather than inferring success from stdout alone.
- [ ] The harness proves the sweep preserves the no-auto-analysis launch boundary.
- [ ] The slice summary names the rerunnable proof command and the durable evidence paths it produces.

## Verification

- `bash scripts/verify-s04-daily-sweep.sh`
- Confirm `.gsd/tmp/verify-s04-daily-sweep/` contains the captured sweep record, refresh evidence, verification summary, and representative reconciliation files referenced by the script output.

## Observability Impact

- Signals added/changed: one higher-level proof artifact set that ties sweep, refresh, and per-video reconciliation evidence together.
- How a future agent inspects this: rerun `bash scripts/verify-s04-daily-sweep.sh`, then inspect `.gsd/tmp/verify-s04-daily-sweep/verification-summary.json` and the referenced runtime files.
- Failure state exposed: the harness should stop on the first broken contract and name which phase or evidence surface diverged.

## Inputs

- `src/lib/daily-operational-sweep.ts` and `scripts/daily-operational-sweep.ts` — new sweep authority from T01.
- `scripts/verify-s03-source-refresh.sh` — established temporary-upstream refresh verification pattern.
- `scripts/verify-s02-historical-repair.sh` — established representative repair/rerun verification pattern.
- `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md` — destination for durable proof references once the task passes.

## Expected Output

- `scripts/verify-s04-daily-sweep.sh` — end-to-end proof for the combined daily sweep contract.
- `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md` — summary updated with proof commands and artifact paths.
- `.gsd/tmp/verify-s04-daily-sweep/` outputs — captured runtime evidence for refresh, repair, and manual follow-up behavior.
