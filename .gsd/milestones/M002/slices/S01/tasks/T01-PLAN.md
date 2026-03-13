---
estimated_steps: 4
estimated_files: 6
---

# T01: Harden analyze-route preconditions and catalog recovery signaling

**Slice:** S01 — Runtime Failure Triage and Analysis Recovery
**Milestone:** M002

## Description

Restore the analyze entrypoint as a trustworthy boundary by turning broken catalog state into a defined, repairable outcome instead of a raw route crash. This task closes the "provider never ran" failure class so later runtime work is debugging the real analysis path, not a false-front catalog problem.

## Steps

1. Inspect the current analyze-route lookup path and identify the narrowest shared seam for catching schema-less or missing catalog failures without weakening normal lookup behavior.
2. Write `src/lib/__tests__/analyze-route.test.ts` to cover a broken-catalog precondition and a healthy-catalog start path, including the expected operator-readable response shape.
3. Implement the route/catalog handling needed to translate broken catalog state into a defined analyze outcome and align the rebuild workflow on the supported `tsx` path instead of Bun for this repo.
4. Run the focused test and the real rebuild command, then update any operator-facing command references touched by the implementation.

## Must-Haves

- [ ] A zero-byte or schema-less catalog no longer bubbles `SQLITE_ERROR` into an opaque `500` from `POST /api/analyze`.
- [ ] The analyze response tells an operator what failed and that catalog repair/rebuild is the next move.
- [ ] The supported catalog rebuild path succeeds through `npx tsx scripts/rebuild-catalog.ts` and no task-local workflow depends on Bun for the SQLite rebuild.
- [ ] Healthy catalog behavior still reaches the normal analysis-start path.

## Verification

- `npx vitest run src/lib/__tests__/analyze-route.test.ts`
- `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'`

## Observability Impact

- Signals added/changed: analyze-start responses distinguish catalog-precondition failure from runtime worker failure.
- How a future agent inspects this: hit `POST /api/analyze`, inspect server response, then confirm catalog rebuild with `npx tsx scripts/rebuild-catalog.ts`.
- Failure state exposed: broken catalog/snapshot state becomes operator-readable and rerunnable instead of a generic 500.

## Inputs

- `src/app/api/analyze/route.ts` — current analyze entrypoint that crashes on broken catalog state.
- `src/lib/catalog.ts` and `src/lib/catalog-db.ts` — current catalog lookup/open behavior and failure surfaces.
- `scripts/rebuild-catalog.ts` and `justfile` — current operator rebuild workflow mismatch.
- S01 research summary — identified the zero-byte catalog and Bun/`better-sqlite3` mismatch as the first blocking failure class.

## Expected Output

- `src/lib/__tests__/analyze-route.test.ts` — regression coverage for broken-catalog and healthy-catalog analyze behavior.
- `src/app/api/analyze/route.ts` and related catalog helpers — explicit precondition handling that produces a repairable response.
- `justfile` and/or operator command references — rebuild path aligned with the supported runtime.
