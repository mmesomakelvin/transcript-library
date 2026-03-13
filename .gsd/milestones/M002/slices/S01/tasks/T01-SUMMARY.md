---
id: T01
parent: S01
milestone: M002
provides:
  - Analyze-start responses now turn broken catalog state into a retryable repair outcome instead of a raw 500.
key_files:
  - src/app/api/analyze/route.ts
  - src/lib/catalog-db.ts
  - src/lib/__tests__/analyze-route.test.ts
  - scripts/rebuild-catalog.ts
  - justfile
  - README.md
  - docs/architecture/system-overview.md
key_decisions:
  - Map catalog lookup precondition failures at the analyze boundary into an explicit `catalog-rebuild-needed` outcome with a supported repair command.
patterns_established:
  - Classify storage-precondition errors narrowly, preserve normal lookup behavior, and surface operator-readable repair guidance from the route boundary.
observability_surfaces:
  - POST /api/analyze precondition payloads
  - npx tsx scripts/rebuild-catalog.ts
  - just rebuild-catalog
duration: 40m
verification_result: passed
completed_at: 2026-03-13T02:53:20Z
blocker_discovered: false
---

# T01: Harden analyze-route preconditions and catalog recovery signaling

**Added a narrow catalog-precondition boundary so `/api/analyze` returns a repairable start outcome and standardized catalog rebuilds on the supported `tsx` path.**

## What Happened

I kept the change at the route/catalog seam instead of weakening catalog reads globally. `src/lib/catalog-db.ts` now classifies the specific broken-snapshot failure class we reproduced (`no such table`, unreadable snapshot, open failure). `src/app/api/analyze/route.ts` catches only that class around `getVideo()` and returns a sanitized `503` payload with `outcome: "catalog-rebuild-needed"`, `stage: "catalog-precondition"`, `retryable: true`, and the supported rebuild command.

I added `src/lib/__tests__/analyze-route.test.ts` first to cover both the broken-catalog precondition and the healthy start path. After the route passed, I aligned operator rebuild references to `npx tsx scripts/rebuild-catalog.ts` in the `justfile`, README, and architecture doc.

The task verification command initially still failed because `.env.local` was being sourced without exporting variables into the child `npx` process. Rather than leave that as shell trivia, `scripts/rebuild-catalog.ts` now loads `.env.local` defaults when present and the needed env vars are unset, so the documented `tsx` entrypoint works as written.

## Verification

Task-level verification passed:

- `npx vitest run src/lib/__tests__/analyze-route.test.ts` ✅
- `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'` ✅

Slice-level verification status after T01:

- `npx vitest run src/lib/__tests__/analyze-route.test.ts src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts` ⚠️ partial — `analyze-route.test.ts` and `runtime-runs.test.ts` passed; existing `runtime-compat.test.ts` still fails on the known insight compatibility expectation (`expected 'failed' to be 'complete'`).
- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw` ⚠️ not yet available — script does not exist yet and is planned for T03.

## Diagnostics

Future agents can inspect this work by:

- hitting `POST /api/analyze?videoId=<id>` and checking for `status: 503`, `outcome: "catalog-rebuild-needed"`, `stage: "catalog-precondition"`, and `repairCommand` when the catalog is broken
- running `npx tsx scripts/rebuild-catalog.ts` (or `just rebuild-catalog`) to rebuild the catalog snapshot
- using `src/lib/__tests__/analyze-route.test.ts` as the regression contract for both broken and healthy analyze starts

## Deviations

- Added local env default loading inside `scripts/rebuild-catalog.ts` so the task’s documented verification command succeeds even when `.env.local` is sourced without exporting variables.

## Known Issues

- `src/lib/__tests__/runtime-compat.test.ts` still has the pre-existing failing expectation discovered in S01 research; T01 did not change that path.
- `scripts/verify-s01-analysis-recovery.sh` is still missing and remains T03 work.

## Files Created/Modified

- `src/lib/__tests__/analyze-route.test.ts` — new regression coverage for broken-catalog and healthy analyze-start behavior.
- `src/app/api/analyze/route.ts` — maps catalog precondition failures into an explicit operator-readable start response.
- `src/lib/catalog-db.ts` — classifies broken catalog snapshot/open failures and carries the supported repair command.
- `scripts/rebuild-catalog.ts` — loads `.env.local` defaults when needed so the supported `tsx` entrypoint is runnable as documented.
- `justfile` — adds `rebuild-catalog` and `rebuild-catalog-check` recipes on `npx tsx`.
- `README.md` — updates operator rebuild commands to the supported `tsx` path.
- `docs/architecture/system-overview.md` — updates architecture and operator command references to `npx tsx`.
- `.gsd/DECISIONS.md` — records the route-boundary catalog recovery decision.
