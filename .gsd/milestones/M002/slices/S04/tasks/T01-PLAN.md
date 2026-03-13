---
estimated_steps: 4
estimated_files: 5
---

# T01: Add the daily sweep orchestrator and durable sweep record

**Slice:** S04 — Daily Operational Sweep and Repair Automation
**Milestone:** M002

## Description

Create the one new runtime boundary S04 actually needs: a scheduler-safe daily sweep that composes the existing refresh and historical-repair authorities, computes a truthful top-level outcome, and persists durable evidence under shared runtime storage without invoking any analysis workflow.

## Steps

1. Add `src/lib/daily-operational-sweep.ts` as the shared orchestrator: call `refreshSourceCatalog()` first, then `repairHistoricalArtifacts()`, derive top-level sweep outcome/status from the two phase results, and shape one machine-readable sweep schema with timestamps, refresh summary, repair summary, and explicit manual-follow-up video IDs.
2. Persist the sweep evidence as both a stable latest record and an archived per-sweep JSON artifact under shared runtime storage, reusing existing path/environment conventions instead of writing under `docs/` or the mutable release tree.
3. Add `scripts/daily-operational-sweep.ts` as the scheduler/operator CLI entrypoint, and make any small supporting changes needed in `src/lib/source-refresh.ts` or `scripts/repair-historical-artifacts.ts` so the composed record preserves the real phase evidence instead of reinterpreting it.
4. Write `src/lib/__tests__/daily-operational-sweep.test.ts` to cover clean, repaired, manual-follow-up, and failed sweep outcomes, including the non-goal that the sweep never starts analysis or synthesizes `run.json` history for rerun-only directories.

## Must-Haves

- [ ] One shared orchestrator composes refresh and repair in order and returns machine-readable sweep output.
- [ ] Sweep artifacts live under shared runtime storage as both a stable latest record and archived per-run evidence.
- [ ] The top-level sweep result distinguishes clean, repaired, manual-follow-up, and failed outcomes from real phase results.
- [ ] Unsafe mismatches remain rerun-needed and no analysis work is started by the sweep.

## Verification

- `npx vitest run src/lib/__tests__/daily-operational-sweep.test.ts`
- Inspect the emitted latest/archive sweep JSON from the test fixture to confirm refresh and repair phase evidence are preserved verbatim enough for operators to diagnose failures.

## Observability Impact

- Signals added/changed: daily sweep JSON records with per-phase outcomes, counts, timestamps, and manual-follow-up video IDs.
- How a future agent inspects this: run `node --import tsx scripts/daily-operational-sweep.ts` and inspect the stable latest sweep record plus the archived sweep file beside it.
- Failure state exposed: failing phase, refresh failure details, repair error counts, and rerun-needed video IDs remain visible in one place.

## Inputs

- `src/lib/source-refresh.ts` — refresh-only authority and durable refresh evidence from S03.
- `scripts/repair-historical-artifacts.ts` — safe repair inventory and `operatorEvidence` from S02.
- `src/lib/runtime-reconciliation.ts` — persisted mismatch taxonomy that the sweep must report, not reinterpret.
- S02/S03 summaries — fixed repair boundary and refresh-only launch boundary the orchestrator must preserve.

## Expected Output

- `src/lib/daily-operational-sweep.ts` — shared sweep authority and sweep artifact writer.
- `scripts/daily-operational-sweep.ts` — scheduler-safe CLI entrypoint for local and hosted operators.
- `src/lib/__tests__/daily-operational-sweep.test.ts` — regression coverage for sweep outcomes, evidence shape, and no-analysis behavior.
