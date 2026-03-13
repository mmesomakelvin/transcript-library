# S05: Hosted Auth and Access Shape

**Goal:** Define and implement the hosted access contract so approved friends reach `library.aojdevstudio.me` through Cloudflare-managed access without app passwords, while automation keeps a separate supported machine-auth path.
**Demo:** In hosted mode, browser-driven video workspace requests succeed when the request carries trusted Cloudflare Access identity, automation routes still accept bearer/service-token callers without exposing app secrets to the browser, and the docs/operator topology clearly separate the friend-facing hostname from automation entrypoints.

## Decomposition Rationale

This slice is mostly a boundary-contract correction, not a broad auth build. The highest risk is the current mismatch between Cloudflare-gated browser fetches and the bearer-only origin guard, so the plan starts by changing the shared guard and preflight contract before touching docs or deployment assumptions. Once the guard can distinguish human-via-Access from machine-via-bearer callers, the next risk is false confidence, so the second task adds contract-level and hosted-runtime verification that exercises browser-style requests, SSE, and automation paths together. Documentation and topology guidance come last because S06 needs one stable answer about hostnames, sync-hook reachability, and service-token usage rather than partial implementation guesses.

## Must-Haves

- R001: Hosted browser users can reach the app and use its own API routes through Cloudflare-managed approved-friend access without any app-managed password, username, or browser bearer token.
- R003: The friend-facing app hostname is defined as Cloudflare Access protected, and the origin-side trust model explicitly composes Cloudflare identity with the app’s hosted guard rather than bypassing origin protection.
- R003: Automation callers keep a supported machine path through `PRIVATE_API_TOKEN`, `SYNC_TOKEN`, and, where needed, Cloudflare service-token headers or a dedicated non-friend hostname instead of reusing the browser flow.
- R002: The hosted access decision is encoded in startup checks and operator docs strongly enough that S06 can wire Proxmox ingress, tunnel config, and release layout against one stable trust-boundary contract.
- R010: Deploy and sync automation docs name a supported access topology for unattended callers so hosted automation does not assume the friend-facing Access hostname accepts bearer-only requests.
- R011: Slice proof covers the real hosted browser loop boundary by exercising insight load, analyze start, and stream access under `HOSTED=true` with trusted browser identity and sanitized failure behavior.

## Proof Level

- This slice proves: integration
- Real runtime required: yes
- Human/UAT required: no

## Verification

- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts src/lib/__tests__/hosted-browser-access.test.ts`
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"`
- `bash scripts/verify-s05-hosted-access.sh`
- `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg -n "reason=|status="`
- `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md`

## Observability / Diagnostics

- Runtime signals: hosted preflight warnings/errors for missing Access trust configuration or ambiguous automation topology, plus sanitized auth-failure reason codes from the shared route guard.
- Inspection surfaces: `HOSTED=true` Vitest coverage around the shared guard and route matrix, the hosted verification script, and startup/preflight output from `src/lib/hosted-config.ts` / `src/instrumentation.ts`.
- Failure visibility: whether a hosted request was rejected for missing trusted browser identity, invalid bearer token, missing machine-token config, or ambiguous sync/deploy ingress assumptions.
- Redaction constraints: never log raw Cloudflare JWTs, service-token secrets, `PRIVATE_API_TOKEN`, or unsanitized internal path/provider details in hosted responses or proof artifacts.

## Integration Closure

- Upstream surfaces consumed: `src/lib/private-api-guard.ts`, `src/lib/hosted-config.ts`, hosted route handlers under `src/app/api/**`, browser callers in `src/components/VideoAnalysisWorkspace.tsx` and `src/components/AnalysisPanel.tsx`, and hosted/operator docs from S03.
- New wiring introduced in this slice: a two-caller-class hosted guard contract, startup validation for the chosen Cloudflare trust mode, a hosted browser/machine verification harness, and explicit app-vs-automation hostname guidance for operators.
- What remains before the milestone is truly usable end-to-end: S06 still must wire the chosen hostnames/tunnel/service config into the real Proxmox runtime, and S07 still must prove the full live hosted flow with real Cloudflare access.

## Tasks

- [x] **T01: Encode the two-caller-class hosted guard contract** `est:1h20m`
  - Why: The slice cannot succeed until the shared hosted guard stops treating browser UI traffic and machine automation as the same caller type.
  - Files: `src/lib/private-api-guard.ts`, `src/lib/hosted-config.ts`, `src/lib/__tests__/private-api-guard.test.ts`, `src/lib/__tests__/route-access-control.test.ts`, `src/lib/__tests__/hosted-config.test.ts`
  - Do: Update the shared hosted auth boundary to accept trusted Cloudflare Access browser identity for human requests while preserving bearer-token machine access, define the exact trusted-header/JWT-preflight assumptions in hosted config, and update the route/access tests to lock in allowed browser, bearer, and rejection paths without leaking secrets in hosted responses.
  - Verify: `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts`
  - Done when: hosted mode distinguishes browser-via-Access from automation-via-bearer callers through one shared contract, startup checks flag missing/ambiguous access config, and the route matrix proves the correct allow/deny behavior.
- [x] **T02: Prove hosted browser access for insight, analyze, and stream flows** `est:1h15m`
  - Why: S05 owns the friend-facing experience boundary, so it needs more than unit auth checks; it needs proof that the actual hosted workspace loop works under the new contract.
  - Files: `src/lib/__tests__/hosted-browser-access.test.ts`, `scripts/verify-s05-hosted-access.sh`, `src/components/VideoAnalysisWorkspace.tsx`, `src/components/AnalysisPanel.tsx`, `src/app/api/insight/route.ts`, `src/app/api/analyze/route.ts`, `src/app/api/insight/stream/route.ts`
  - Do: Add focused hosted-mode coverage that exercises browser-style requests against the key video workspace routes using trusted Cloudflare identity, keep machine/bearer access covered for automation-only paths, and create a repeatable verification script that starts the app in `HOSTED=true` and proves insight load, analyze start, and SSE/stream access no longer fail with the current hosted 401 mismatch.
  - Verify: `npx vitest run src/lib/__tests__/hosted-browser-access.test.ts && bash scripts/verify-s05-hosted-access.sh`
  - Done when: the hosted browser workspace routes work without any browser bearer token, automation-only paths still reject anonymous callers, and the verification harness leaves evidence that the original 401 regression is closed.
- [x] **T03: Publish the hosted access topology for friends, sync, and deploy automation** `est:50m`
  - Why: S06 needs a settled operator contract for which hostname is Access-gated, which callers use service tokens, and whether `/api/sync-hook` remains externally reachable.
  - Files: `docs/operations/source-repo-sync-contract.md`, `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`, `docs/architecture/system-overview.md`, `README.md`, `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md`
  - Do: Document the chosen access shape around `library.aojdevstudio.me`, the supported machine-access options for sync/deploy automation, the non-goal of app-managed auth, and the exact operator expectations for Cloudflare Access, service tokens, and any dedicated automation hostname so downstream deploy work inherits one unambiguous topology.
  - Verify: `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md`
  - Done when: the repo has one explicit hosted access story for humans and machines, sync/deploy docs no longer overpromise bearer-only reachability on the friend-facing hostname, and the slice summary records the locked-in contract for S06/S07.

## Files Likely Touched

- `src/lib/private-api-guard.ts`
- `src/lib/hosted-config.ts`
- `src/lib/__tests__/private-api-guard.test.ts`
- `src/lib/__tests__/route-access-control.test.ts`
- `src/lib/__tests__/hosted-config.test.ts`
- `src/lib/__tests__/hosted-browser-access.test.ts`
- `scripts/verify-s05-hosted-access.sh`
- `src/components/VideoAnalysisWorkspace.tsx`
- `src/components/AnalysisPanel.tsx`
- `src/app/api/insight/route.ts`
- `src/app/api/analyze/route.ts`
- `src/app/api/insight/stream/route.ts`
- `docs/operations/source-repo-sync-contract.md`
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`
- `docs/architecture/system-overview.md`
- `README.md`
- `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md`
