---
id: T03
parent: S05
milestone: M002
provides:
  - Hosted operator docs and slice closure summary that publish one stable access topology for friends, machine automation, and edge-crossing deploy/sync callers.
key_files:
  - docs/operations/source-repo-sync-contract.md
  - docs/plans/2026-03-09-self-hosted-proxmox-deployment.md
  - docs/architecture/system-overview.md
  - README.md
  - .gsd/milestones/M002/slices/S05/S05-SUMMARY.md
key_decisions:
  - Keep `library.aojdevstudio.me` as the friend-facing Cloudflare Access hostname for browser traffic only; do not imply bearer-only access works there.
  - Keep bearer auth as the supported machine-access story for `/api/sync-hook` and other explicit automation entrypoints, with Cloudflare service tokens or a dedicated automation hostname for edge-crossing automation.
patterns_established:
  - Document hosted auth in terms of caller classes: browser-via-Access versus machine-via-bearer, with app-managed browser auth explicitly out of scope.
observability_surfaces:
  - rg verification across docs
  - .gsd/milestones/M002/slices/S05/S05-SUMMARY.md
  - bash scripts/verify-s05-hosted-access.sh
duration: 40m
verification_result: passed
completed_at: 2026-03-13T13:34:39-0500
blocker_discovered: false
---

# T03: Publish the hosted access topology for friends, sync, and deploy automation

**Locked the hosted docs to one truthful topology: friends use `library.aojdevstudio.me` through Cloudflare Access, machine automation keeps explicit bearer paths, and edge-crossing automation must use service tokens or a dedicated automation hostname.**

## What Happened

I first fixed the task plan itself by adding the missing `Observability Impact` section so future agents can inspect the doc-topology change directly.

Then I updated the four operator-facing docs to match the hosted guard contract proved in T01-T02:

- `docs/operations/source-repo-sync-contract.md` now says the friend-facing hostname is browser-via-Access, not a generic bearer endpoint, and it spells out the split between same-host automation, `/api/sync-hook` machine callers, and deploy automation that should use a dedicated hostname or Cloudflare service tokens when crossing the edge.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` now names `library.aojdevstudio.me` as the friend-facing browser hostname, adds `CLOUDFLARE_ACCESS_AUD` to hosted env config, and clarifies that deploy/sync automation should not reuse the browser flow.
- `docs/architecture/system-overview.md` now describes hosted auth as two caller classes instead of a bearer-only rule for all `/api/*` routes.
- `README.md` now gives operators a concise hosted access model with the same boundary: browser identity comes from Cloudflare Access, while `PRIVATE_API_TOKEN`/`SYNC_TOKEN` are machine credentials only.

Finally, I created `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` so S06/S07 inherit one stable statement of the caller-class split, proof surface, and non-goal of app-managed browser auth.

## Verification

Fresh verification run during this task:

- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts src/lib/__tests__/hosted-browser-access.test.ts` ✅
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"` ✅
- `bash scripts/verify-s05-hosted-access.sh` ✅
- `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg -n "reason=|status="` ✅
- `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md` ✅
- Reviewed `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` content for the same caller-class split proved by T01-T02 ✅

## Diagnostics

Future agents can inspect this task through:

- `docs/operations/source-repo-sync-contract.md` for the canonical human-vs-machine access topology
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` for the deploy/sync hostname and Cloudflare guidance
- `docs/architecture/system-overview.md` for the runtime caller-class description
- `README.md` for the concise operator-facing hosted access pointer
- `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` for the final slice closure statement and proof surfaces
- `bash scripts/verify-s05-hosted-access.sh` when someone needs to re-prove the hosted browser/machine boundary live

## Deviations

- Added the missing `## Observability Impact` section to `.gsd/milestones/M002/slices/S05/tasks/T03-PLAN.md` before executing the task, per unit pre-flight instructions.

## Known Issues

- None.

## Files Created/Modified

- `.gsd/milestones/M002/slices/S05/tasks/T03-PLAN.md` — added the required observability-impact section for this runtime-relevant task plan
- `docs/operations/source-repo-sync-contract.md` — published the explicit hosted human-vs-machine sync/deploy topology
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — aligned deployment guidance to the Access-protected friend-facing hostname and machine-only automation paths
- `docs/architecture/system-overview.md` — replaced the outdated bearer-only hosted description with the two-caller-class contract
- `README.md` — added a concise operator-facing hosted access model note and `CLOUDFLARE_ACCESS_AUD`
- `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` — recorded slice closure, proofs, and the final hosted boundary for downstream slices
- `.gsd/milestones/M002/slices/S05/tasks/T03-SUMMARY.md` — recorded task execution, verification, and diagnostics
