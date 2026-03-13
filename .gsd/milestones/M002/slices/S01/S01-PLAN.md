# S01: Runtime Failure Triage and Analysis Recovery

**Goal:** Restore a trustworthy on-demand analysis loop by hardening the analyze entrypoint against broken catalog state, promoting real worker failure evidence into durable runtime artifacts, and proving one end-to-end analysis run can complete again.
**Demo:** From the app/runtime entrypoint, a representative video can either (a) complete analysis and produce the expected canonical artifacts or (b) fail with an operator-readable durable error that names the actual cause instead of opaque `exit code 1` behavior.

## Must-Haves

- R004: `POST /api/analyze` no longer collapses into a raw 500 when catalog state is missing or schema-less; the route produces a defined, operator-readable outcome that makes the precondition failure diagnosable and repairable.
- R004: Provider/runtime failures that currently surface as `exit code 1` promote the first meaningful worker evidence from stdout or stderr into `run.json`, `status.json`, and route payloads.
- R004: At least one real analysis run can complete again from the normal on-demand flow and write the expected canonical artifacts for a representative currently failing video.
- R011 support: the slice leaves a repeatable verification path for exercising real provider auth/runtime assumptions again instead of stopping at unit coverage.
- Existing runtime authority stays centralized in `src/lib/analysis.ts`; no parallel diagnostics channel or UI-side provider logic is introduced.

## Proof Level

- This slice proves: contract + integration
- Real runtime required: yes
- Human/UAT required: no

## Verification

- `npx vitest run src/lib/__tests__/analyze-route.test.ts src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
- `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'`
- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`

## Observability / Diagnostics

- Runtime signals: catalog-precondition failure summaries at analyze-start time, durable run/status error summaries sourced from worker output, and canonical latest-run state transitions in `run.json`.
- Inspection surfaces: `POST /api/analyze`, `GET /api/analyze/status`, `GET /api/insight`, `data/insights/<videoId>/run.json`, `data/insights/<videoId>/status.json`, and worker stdout/stderr logs.
- Failure visibility: top-line error, lifecycle/stage, latest attempt identity, recent useful log lines, and whether the failure happened before spawn or during provider execution.
- Redaction constraints: keep provider secrets, filesystem internals, and hosted-only details out of route payloads while preserving operator-readable cause text.

## Integration Closure

- Upstream surfaces consumed: `src/app/api/analyze/route.ts`, catalog lookup/rebuild helpers, `src/lib/analysis.ts`, runtime status/insight routes, provider CLI invocation, and existing insight artifact conventions.
- New wiring introduced in this slice: analyze-route precondition handling, shared failure-summary promotion across runtime artifacts/routes, and a repeatable runtime verification script for recovery proof.
- What remains before the milestone is truly usable end-to-end: historical artifact repair, automatic source sync, hosted topology proof, and unattended repair automation.

## Tasks

- [x] **T01: Harden analyze-route preconditions and catalog recovery signaling** `est:50m`
  - Why: The main user loop is currently blocked before provider execution when the catalog snapshot is empty or schema-less, so S01 needs a trustworthy entrypoint before provider debugging matters.
  - Files: `src/app/api/analyze/route.ts`, `src/lib/catalog.ts`, `src/lib/catalog-db.ts`, `src/lib/__tests__/analyze-route.test.ts`, `justfile`, `scripts/rebuild-catalog.ts`
  - Do: Add explicit handling for broken catalog preconditions in the analyze entrypoint, map the failure into a defined operator-readable response instead of a raw 500, and align the operator rebuild path away from Bun so the catalog can actually be repaired in this repo runtime.
  - Verify: `npx vitest run src/lib/__tests__/analyze-route.test.ts` and `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'`
  - Done when: a missing or schema-less catalog produces a repairable analyze outcome with concrete guidance, and the documented rebuild command succeeds under the supported runtime.
- [x] **T02: Promote worker failure evidence into durable runtime truth** `est:55m`
  - Why: The current runtime already captures the real provider failure in logs, but durable artifacts flatten it to `exit code 1`, which breaks operator trust and makes reruns guesswork.
  - Files: `src/lib/analysis.ts`, `src/lib/runtime-stream.ts`, `src/lib/__tests__/runtime-runs.test.ts`, `src/lib/__tests__/runtime-compat.test.ts`, `src/app/api/insight/route.ts`
  - Do: Refine failure summarization in the shared runtime authority so the first meaningful line from stderr or stdout becomes the durable top-line error, preserve compatibility artifact names, and keep insight/status payloads aligned with that shared truth.
  - Verify: `npx vitest run src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
  - Done when: a stdout-only provider failure is reflected consistently in `run.json`, `status.json`, and route payloads without reading raw worker logs.
- [x] **T03: Prove representative analysis recovery with a real provider-backed run** `est:45m`
  - Why: Better failures are necessary but not sufficient; S01 owns restoring the user loop by proving one representative video can finish analysis end to end again.
  - Files: `scripts/verify-s01-analysis-recovery.sh`, `src/lib/analysis.ts`, `src/app/api/analyze/status/route.ts`, `data/insights/.gitkeep`, `.gsd/milestones/M002/slices/S01/S01-SUMMARY.md`
  - Do: Add a repeatable runtime verification script that rebuilds prerequisites, triggers analysis for the representative failing video, waits for terminal state, asserts canonical success artifacts on the working provider path, and records the remaining failure mode explicitly if the non-working provider is still configured.
  - Verify: `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`
  - Done when: the script proves one real successful run with canonical artifacts and leaves a clear evidence trail for whichever provider path remains unavailable.

## Files Likely Touched

- `src/app/api/analyze/route.ts`
- `src/app/api/analyze/status/route.ts`
- `src/app/api/insight/route.ts`
- `src/lib/analysis.ts`
- `src/lib/catalog.ts`
- `src/lib/catalog-db.ts`
- `src/lib/runtime-stream.ts`
- `src/lib/__tests__/analyze-route.test.ts`
- `src/lib/__tests__/runtime-runs.test.ts`
- `src/lib/__tests__/runtime-compat.test.ts`
- `scripts/rebuild-catalog.ts`
- `scripts/verify-s01-analysis-recovery.sh`
- `justfile`
- `.gsd/milestones/M002/slices/S01/S01-SUMMARY.md`
