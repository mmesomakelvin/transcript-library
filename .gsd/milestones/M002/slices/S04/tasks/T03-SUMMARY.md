---
id: T03
parent: S04
milestone: M002
provides:
  - One consistent unattended operator command and doc story centered on the daily operational sweep, with legacy nightly analysis demoted to an explicit workflow.
key_files:
  - README.md
  - docs/operations/source-repo-sync-contract.md
  - docs/plans/2026-03-09-self-hosted-proxmox-deployment.md
  - justfile
  - package.json
  - scripts/nightly-insights.ts
key_decisions:
  - Treat `scripts/daily-operational-sweep.ts` as the only unattended operator command.
  - Move legacy nightly-analysis summary output out of `docs/` and into runtime-scoped explicit-workflow storage.
patterns_established:
  - Operator docs and commands should point unattended scheduling at `node --import tsx scripts/daily-operational-sweep.ts`, and describe rerun-only videos via `manualFollowUpVideoIds` in the durable sweep artifact.
observability_surfaces:
  - `data/runtime/daily-operational-sweep/latest.json`
  - `data/runtime/daily-operational-sweep/archive/<sweepId>.json`
  - runtime-scoped nightly analysis notes under `runtime/explicit-analysis-workflows/nightly-insights/`
duration: 25m
verification_result: passed
completed_at: 2026-03-13T16:34:17Z
blocker_discovered: false
---

# T03: Make the unattended operator contract unambiguous in commands and docs

**Made the daily operational sweep the repo’s unambiguous unattended default, and demoted nightly analysis to an explicit legacy workflow.**

## What Happened

Updated the operator-facing surfaces to tell one story: unattended automation now means `node --import tsx scripts/daily-operational-sweep.ts`, which refreshes source state, republishes browse state, runs only the conservative repair pass, and leaves durable sweep evidence behind without starting analysis.

`README.md`, the source sync contract, and the Proxmox deployment plan now name the sweep artifact paths directly and explain that `manualFollowUpVideoIds` means rerun-only videos still need explicit operator follow-up. `justfile` and `package.json` now expose the daily sweep command using the supported `node --import tsx ...` runtime.

`scripts/nightly-insights.ts` was reframed as a legacy explicit analysis workflow rather than normal unattended automation. Its summary output now goes under runtime-scoped `explicit-analysis-workflows/nightly-insights/` storage instead of `docs/ops/artifacts`, so the repo no longer implies that docs artifacts are the default unattended inspection surface.

## Verification

Ran fresh slice verification and operator-surface checks:

- `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts` — passed (4/4 tests)
- `bash scripts/verify-s04-daily-sweep.sh` — passed; verified refresh + safe repair + no-auto-analysis boundaries and copied proof artifacts under `.gsd/tmp/verify-s04-daily-sweep/`
- `rg -n "daily sweep|daily-operational-sweep|refresh-only|manual follow-up|analysis remains on-demand" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json` — passed
- `rg -n "legacy|explicit analysis workflow|not the unattended default|docs/operations/artifacts" scripts/nightly-insights.ts` — passed

## Diagnostics

- Unattended sweep command: `node --import tsx scripts/daily-operational-sweep.ts`
- Stable sweep artifact: `data/runtime/daily-operational-sweep/latest.json`
- Archived sweep artifact: `data/runtime/daily-operational-sweep/archive/<sweepId>.json`
- Slice proof bundle: `.gsd/tmp/verify-s04-daily-sweep/verification-summary.json`
- Legacy nightly analysis notes now land under the runtime tree next to `INSIGHTS_BASE_DIR` at `runtime/explicit-analysis-workflows/nightly-insights/`

## Deviations

- Moved legacy nightly analysis notes out of the docs tree into runtime storage. This was not called out explicitly in the task steps, but it was necessary to remove the stale `docs/ops/artifacts` operator framing from the unattended path.

## Known Issues

- None.

## Files Created/Modified

- `README.md` — documented `just daily-sweep`, named durable sweep artifacts, and clarified manual follow-up / no-auto-analysis behavior.
- `docs/operations/source-repo-sync-contract.md` — layered the daily sweep onto the refresh contract and documented rerun-only manual follow-up semantics.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — changed the host scheduling story to the daily sweep and named the runtime artifact operators should inspect.
- `justfile` — added `daily-sweep` and demoted `insights` to an explicit legacy analysis recipe.
- `package.json` — added `daily:sweep` and aligned `nightly:insights` with `node --import tsx`.
- `scripts/nightly-insights.ts` — marked the script as legacy explicit analysis workflow and moved its summary output into runtime-scoped storage.
- `.gsd/DECISIONS.md` — recorded the operator-surface decision for daily sweep vs legacy nightly analysis.
