---
estimated_steps: 4
estimated_files: 5
---

# T02: Promote worker failure evidence into durable runtime truth

**Slice:** S01 — Runtime Failure Triage and Analysis Recovery
**Milestone:** M002

## Description

Make the existing runtime evidence trustworthy by promoting the first meaningful worker failure line from stderr or stdout into the canonical durable error fields. This task fixes the current gap where operators can see the real cause in logs but `run.json` and `status.json` still claim only `exit code 1`.

## Steps

1. Inspect the close-handler/failure-summary path in `src/lib/analysis.ts` and the compatibility/status readers that consume its durable output.
2. Extend `src/lib/__tests__/runtime-runs.test.ts` and `src/lib/__tests__/runtime-compat.test.ts` with a stdout-only provider-failure fixture and assertions on `run.json`, `status.json`, and route-facing payload shape.
3. Implement shared failure summarization in `src/lib/analysis.ts` so the first meaningful stderr/stdout evidence becomes the durable top-line error while preserving existing artifact names and lifecycle semantics.
4. Run the focused tests and confirm the insight/status surfaces read from the new shared durable truth instead of inventing a divergent summary.

## Must-Haves

- [ ] A stdout-only worker failure no longer persists as bare `exit code 1` when a concrete cause line exists.
- [ ] `run.json` remains the latest-run authority and `status.json` stays compatibility-derived from the same transition path.
- [ ] Route payloads stay aligned with the durable runtime record instead of requiring operators to inspect raw worker logs first.
- [ ] No new parallel diagnostics file or UI-side summary logic is introduced.

## Verification

- `npx vitest run src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
- `npx vitest run src/lib/__tests__/runtime-stream.test.ts`

## Observability Impact

- Signals added/changed: canonical error summary in `run.json`/`status.json` now reflects real worker evidence from either output stream.
- How a future agent inspects this: read `data/insights/<videoId>/run.json`, `status.json`, and `GET /api/insight` without opening worker logs first.
- Failure state exposed: provider-account and CLI execution failures become visible as durable top-line causes rather than opaque exit codes.

## Inputs

- `src/lib/analysis.ts` — shared runtime authority and current failure summarization seam.
- `src/lib/runtime-stream.ts` and `src/app/api/insight/route.ts` — existing operator-facing payloads already carrying useful recent logs.
- `src/lib/__tests__/runtime-runs.test.ts` and `src/lib/__tests__/runtime-compat.test.ts` — current runtime contract coverage to extend.
- S01 research summary — reproduced provider failure with stdout-only `Credit balance is too low` evidence.

## Expected Output

- `src/lib/analysis.ts` — improved failure-summary promotion shared by durable artifacts and routes.
- `src/lib/__tests__/runtime-runs.test.ts` and `src/lib/__tests__/runtime-compat.test.ts` — regression coverage for stdout-derived durable errors.
- `src/lib/runtime-stream.ts` and/or `src/app/api/insight/route.ts` — aligned consumption of the durable summary where needed.
