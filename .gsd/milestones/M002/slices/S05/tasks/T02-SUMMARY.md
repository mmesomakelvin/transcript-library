---
id: T02
parent: S05
milestone: M002
provides:
  - Hosted browser-loop proof for `/api/insight`, `/api/analyze`, and `/api/insight/stream` under `HOSTED=true`, plus a repeatable runtime harness that also proves browser trust does not open the machine-only sync path.
key_files:
  - src/lib/__tests__/hosted-browser-access.test.ts
  - scripts/verify-s05-hosted-access.sh
  - .gsd/milestones/M002/slices/S05/S05-PLAN.md
  - .gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.verify.txt
key_decisions:
  - Keep the hosted-access proof route-specific and use `/api/sync-hook` rejection as the machine-boundary sentinel.
patterns_established:
  - Prove hosted browser access with Cloudflare-style headers in both focused Vitest route coverage and a live hosted-mode shell harness, while separately checking client code stays free of app-managed bearer auth.
observability_surfaces:
  - `npx vitest run src/lib/__tests__/hosted-browser-access.test.ts`
  - `bash scripts/verify-s05-hosted-access.sh`
  - `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.vitest.txt`
  - `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.verify.txt`
  - `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-slice-verification.vitest.txt`
duration: 1h 31m
verification_result: passed
completed_at: 2026-03-13T13:29:00-05:00
blocker_discovered: false
---

# T02: Prove hosted browser access for insight, analyze, and stream flows

**Added focused hosted-browser proof coverage and a live hosted verification harness for the insight/analyze/stream loop, without reintroducing browser bearer auth.**

## What Happened

I fixed the slice-plan observability gap first by adding a grep-able failure-path verification step to `S05-PLAN.md`.

Then I added `src/lib/__tests__/hosted-browser-access.test.ts` as the focused contract file for this task. It exercises the three workspace routes under `HOSTED=true` with Cloudflare-style browser identity and no bearer token:

- `GET /api/insight`
- `POST /api/analyze`
- `GET /api/insight/stream`

The same test file also locks in the negative hosted anonymous case so the browser allow-path does not silently widen the boundary.

The route/runtime code itself did not need changes after T01 — the shared guard already flowed cleanly through these handlers. The new work for this task was proof and diagnostics, not another auth rewrite.

I created `scripts/verify-s05-hosted-access.sh` to run the app in hosted mode with safe local verification values, select a real catalog `videoId`, mint a local Cloudflare-style JWT, and assert:

- browser-style insight load succeeds
- browser-style analyze start succeeds
- browser-style stream connection returns an SSE snapshot
- anonymous insight requests still fail with `reason=missing-browser-identity`
- browser identity alone still cannot use the machine-only `/api/sync-hook` path
- `VideoAnalysisWorkspace.tsx` and `AnalysisPanel.tsx` do not reference `PRIVATE_API_TOKEN` or an app-managed `Authorization:` header

While tightening the harness, I debugged one real issue in the proof script: the SSE request was healthy but `curl --max-time` exits `28` on long-lived streams. I fixed only the harness logic to accept that exit code when a snapshot frame has already been received.

I also exercised the real video workspace in a browser through a local header-injecting proxy so the hosted page could load and start analysis with Cloudflare-style headers. The browser reached the page, the Generate Analysis action transitioned the workspace, and the later visible failure was provider-credit related (`Credit balance is too low`), not a hosted-auth rejection.

## Verification

Targeted task verification:

- `npx vitest run src/lib/__tests__/hosted-browser-access.test.ts` ✅
- `bash scripts/verify-s05-hosted-access.sh` ✅

Slice-level verification run during this task:

- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts src/lib/__tests__/hosted-browser-access.test.ts` ✅
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"` ✅
- `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg -n "reason=|status="` ✅
- `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md` ✅ for the docs currently touched in-slice

Preserved proof artifacts:

- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.vitest.txt`
- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.verify.txt`
- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-slice-verification.vitest.txt`
- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-sanitized-reason.vitest.txt`

Browser proof:

- hosted video page loaded through a local header-injecting proxy
- Generate Analysis was clickable and transitioned the workspace
- no new 401/403 fetch/XHR failures were captured during the browser interaction
- visible runtime failure after start was provider-credit related, not auth-shape related

## Diagnostics

Future agents can inspect this task via:

- `src/lib/__tests__/hosted-browser-access.test.ts` for route-by-route hosted browser assertions
- `bash scripts/verify-s05-hosted-access.sh` for the live contract proof
- `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg -n "reason=|status="` for route-specific failure labels
- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.verify.txt` for the latest passing runtime proof output

The shell harness emits explicit route/caller/status/reason lines so regressions show whether `insight`, `analyze`, `stream`, or the machine-boundary sentinel failed, and whether the failure was due to browser identity shape.

## Deviations

None.

## Known Issues

- In the browser proof environment, the analysis worker later surfaced `Credit balance is too low`. That is a provider/runtime credential condition after auth succeeds, not a hosted-access regression.
- The `browser_assert` tool path hit a tool-side `captureCompactPageState is not a function` error during manual verification, so browser confirmation used explicit element/log checks instead.

## Files Created/Modified

- `src/lib/__tests__/hosted-browser-access.test.ts` — adds focused hosted-browser route coverage for insight, analyze, stream, plus anonymous denial coverage.
- `scripts/verify-s05-hosted-access.sh` — adds a repeatable hosted runtime proof harness with route-specific pass/fail output and a machine-boundary sentinel check.
- `.gsd/milestones/M002/slices/S05/S05-PLAN.md` — adds the missing diagnostic verification step and marks T02 done.
- `.gsd/DECISIONS.md` — records the route-specific hosted-proof pattern and sync-hook machine-boundary sentinel decision.
- `.gsd/STATE.md` — advances the next action to T03 and records the latest slice decision.
- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.vitest.txt` — preserved targeted Vitest proof output.
- `.gsd/milestones/M002/slices/S05/tasks/artifacts/t02-hosted-browser-access.verify.txt` — preserved hosted runtime script proof output.
