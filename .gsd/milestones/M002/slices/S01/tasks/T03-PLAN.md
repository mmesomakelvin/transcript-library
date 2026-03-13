---
estimated_steps: 5
estimated_files: 5
---

# T03: Prove representative analysis recovery with a real provider-backed run

**Slice:** S01 — Runtime Failure Triage and Analysis Recovery
**Milestone:** M002

## Description

Close the slice with a real recovery proof, not just better contracts. This task adds a repeatable verification path that rebuilds prerequisites, triggers analysis for the representative failing video, waits for terminal state, and asserts either canonical success artifacts on the working provider path or an explicitly named remaining provider failure on the non-working path.

## Steps

1. Choose the concrete provider path for recovery proof based on real local auth/runtime availability, preferring the smallest change that restores an end-to-end run without moving provider selection into the UI.
2. Write `scripts/verify-s01-analysis-recovery.sh` to rebuild the catalog if needed, trigger `POST /api/analyze` for `RpUTF_U4kiw`, poll the status route to terminal state, and inspect canonical artifacts under `data/insights/<videoId>/`.
3. Make the minimal runtime/config changes needed for one provider-backed run to complete successfully while keeping the current server-side provider-selection model intact.
4. Run the verification script against the representative video, capture the success evidence, and record the remaining non-working provider failure mode in the slice summary if it still exists.
5. Update slice summary/state artifacts so the next execution session can see exactly what was proven locally and what still awaits hosted proof in later slices.

## Must-Haves

- [ ] One representative on-demand analysis run completes end to end and writes the canonical artifacts expected by the current app.
- [ ] The verification path is scripted and repeatable instead of depending on manual curl/polling steps.
- [ ] If an alternate provider path still fails, the remaining failure mode is named explicitly with durable evidence instead of being left as generic exit-code behavior.
- [ ] Provider selection remains server-runtime-owned; the slice does not leak provider controls into the UI.

## Verification

- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`
- `npx vitest run src/lib/__tests__/analyze-route.test.ts src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`

## Observability Impact

- Signals added/changed: repeatable slice verification output, durable successful run artifacts, and explicit evidence for any still-broken provider path.
- How a future agent inspects this: rerun `scripts/verify-s01-analysis-recovery.sh`, then inspect `run.json`, `status.json`, `analysis.json`, and `analysis.md` for the target video.
- Failure state exposed: recovery verification identifies whether failure is precondition, provider auth/billing, or artifact-generation mismatch.

## Inputs

- `src/lib/analysis.ts` and `src/app/api/analyze/status/route.ts` — runtime flow and terminal-state inspection surfaces.
- `data/insights/<videoId>/` artifact contract — canonical success outputs to assert.
- T01 and T02 outputs — reachable analyze route and durable readable failure summaries.
- S01 research summary — representative video `RpUTF_U4kiw` and known Claude low-credit failure.

## Expected Output

- `scripts/verify-s01-analysis-recovery.sh` — repeatable end-to-end recovery verification for S01.
- Runtime/config changes needed for one provider-backed success path — minimal code or configuration alignment in the existing server-side execution flow.
- `.gsd/milestones/M002/slices/S01/S01-SUMMARY.md` — execution evidence describing the recovered success path and any remaining provider-specific failure mode.
