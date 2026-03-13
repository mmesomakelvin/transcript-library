# S04: Daily Operational Sweep and Repair Automation

**Goal:** Deliver one scheduler-safe daily sweep that refreshes source data, performs only the already-approved safe historical repairs, and leaves behind durable operator evidence for what changed, what was fixed, and what still needs a manual rerun.
**Demo:** Running the daily sweep entrypoint against a runtime with a real source refresh event plus representative repairable and rerun-only artifact drift refreshes browse state, repairs only the safe `missing-structured-analysis` case, records explicit manual follow-up for rerun-only videos, and writes a durable sweep record under shared runtime storage without starting analysis work.

## Must-Haves

- R006: One unattended command runs the supported source refresh entrypoint and the conservative historical repair inventory as a single sweep suitable for cron/systemd use.
- R006: Each sweep persists durable JSON evidence with timestamps, top-level outcome, per-phase status, repair counts, and explicit manual-follow-up video IDs so operators can understand overnight behavior without grepping logs.
- R005: The sweep auto-repairs only the safe `missing-structured-analysis` class and keeps `artifacts-without-run` or other unsafe mismatches visible as rerun-needed rather than fabricating runtime history.
- R007: The sweep reuses the S03 refresh contract so upstream transcript changes still reach the library automatically through the supported refresh path.
- R008: Slice proof confirms the daily sweep does not auto-start analysis for newly synced or rerun-needed videos.
- R009: The unattended operator contract is explicit in code and docs: one command to schedule, one durable sweep record to inspect, and no ambiguous fallback to the old nightly-analysis script as the default automation path.

## Proof Level

- This slice proves: operational
- Real runtime required: yes
- Human/UAT required: no

## Verification

- `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
- `bash scripts/verify-s04-daily-sweep.sh`
- `rg -n "daily sweep|daily-operational-sweep|refresh-only|manual follow-up|analysis remains on-demand" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json`

## Observability / Diagnostics

- Runtime signals: durable daily sweep records with sweep outcome (`clean`, `repaired`, `manual-follow-up`, `failed`), per-phase refresh/repair status, counts, and per-video repair results carrying `operatorEvidence`.
- Inspection surfaces: the daily sweep CLI output, the stable latest sweep JSON under shared runtime storage, archived per-sweep JSON records, `last-source-refresh.json`, `last-import-validation.json`, and per-video `reconciliation.json` / `run.json` where relevant.
- Failure visibility: last sweep start/end timestamps, failing phase, refresh outcome/phase, repair error count, rerun-needed video IDs, and whether the sweep left manual follow-up outstanding.
- Redaction constraints: sweep records must not leak secrets, private tokens, or unnecessary filesystem internals beyond the repo/runtime paths operators already inspect locally.

## Integration Closure

- Upstream surfaces consumed: `src/lib/source-refresh.ts`, `scripts/refresh-source-catalog.ts`, `scripts/repair-historical-artifacts.ts`, `src/lib/runtime-reconciliation.ts`, `src/lib/hosted-config.ts`, `docs/operations/source-repo-sync-contract.md`, and existing S02/S03 verification patterns.
- New wiring introduced in this slice: a dedicated daily sweep service/CLI that composes refresh plus repair, a durable sweep artifact under shared runtime storage, and an operator-facing command/doc surface that names this as the unattended default.
- What remains before the milestone is truly usable end-to-end: S06 still needs to wire the command into host scheduling/supervision, and S07 still needs live hosted proof that the scheduled path works in the deployed topology.

## Tasks

- [x] **T01: Add the daily sweep orchestrator and durable sweep record** `est:1h20m`
  - Why: S04’s core deliverable is one runtime boundary that composes refresh and safe repair without turning unattended automation into hidden analysis work.
  - Files: `src/lib/daily-operational-sweep.ts`, `scripts/daily-operational-sweep.ts`, `src/lib/source-refresh.ts`, `src/lib/__tests__/daily-operational-sweep.test.ts`, `scripts/repair-historical-artifacts.ts`
  - Do: Add a shared daily sweep service that runs `refreshSourceCatalog()` first, then `repairHistoricalArtifacts()`, computes a top-level sweep outcome from the two phases, and writes both a stable latest record and an archived per-sweep JSON artifact under shared runtime storage; reuse `operatorEvidence` from the repair inventory, keep unsafe mismatches as manual follow-up only, and make sure the new entrypoint never submits analysis work or synthesizes run history.
  - Verify: `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
  - Done when: one CLI-safe entrypoint returns machine-readable sweep JSON, writes durable latest/archive sweep artifacts, distinguishes clean vs repaired vs manual-follow-up vs failed outcomes, and tests prove no analysis submission occurs as part of the sweep.
- [x] **T02: Prove the sweep contract with a real refresh-plus-repair verification harness** `est:1h15m`
  - Why: This slice is about unattended operational truth, so it needs a contract proof that composes the S02 and S03 boundaries instead of assuming they still hold when wired together.
  - Files: `scripts/verify-s04-daily-sweep.sh`, `src/lib/__tests__/daily-operational-sweep.test.ts`, `scripts/refresh-source-catalog.ts`, `scripts/repair-historical-artifacts.ts`, `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md`
  - Do: Build a verification harness that creates a temporary runtime with an upstream transcript refresh event plus representative `missing-structured-analysis` and `artifacts-without-run` states, runs the new daily sweep entrypoint, and asserts that browse refresh evidence updates, only the repairable directory is fixed, rerun-only videos remain visible in manual follow-up, and no new `run.json`/analysis batch artifacts are created for synced or rerun-needed videos.
  - Verify: `bash scripts/verify-s04-daily-sweep.sh`
  - Done when: the verification script produces durable evidence showing refresh + repair ran in one pass, safe repair resolved the intended directory, rerun-only directories stayed manual, and analysis remained untouched.
- [x] **T03: Make the unattended operator contract unambiguous in commands and docs** `est:50m`
  - Why: S04 is incomplete if the repo still tells operators to schedule the older nightly-analysis path or inspect stale artifact locations.
  - Files: `README.md`, `docs/operations/source-repo-sync-contract.md`, `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`, `justfile`, `package.json`, `scripts/nightly-insights.ts`
  - Do: Add the new daily sweep command to the repo’s operator surfaces, update deployment/operations docs to schedule that command as the unattended default, and demote the old nightly analysis script to an explicit opt-in analysis workflow or legacy path so refresh-only launch behavior stays clear.
  - Verify: `rg -n "daily sweep|daily-operational-sweep|refresh-only|manual follow-up|analysis remains on-demand" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json && rg -n "legacy|explicit analysis workflow|not the unattended default" scripts/nightly-insights.ts`
  - Done when: the repo has one clear unattended sweep command/operator story, the docs point schedulers at it, and stale nightly-analysis automation is no longer presented as the launch-default path.

## Files Likely Touched

- `src/lib/daily-operational-sweep.ts`
- `scripts/daily-operational-sweep.ts`
- `src/lib/source-refresh.ts`
- `scripts/repair-historical-artifacts.ts`
- `src/lib/__tests__/daily-operational-sweep.test.ts`
- `scripts/verify-s04-daily-sweep.sh`
- `README.md`
- `docs/operations/source-repo-sync-contract.md`
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`
- `justfile`
- `package.json`
- `scripts/nightly-insights.ts`
- `.gsd/milestones/M002/slices/S04/S04-SUMMARY.md`
