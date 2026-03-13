---
id: S05
parent: M002
milestone: M002
provides:
  - Two-caller-class hosted auth guard distinguishing Cloudflare Access browser identity from bearer machine callers
  - Route-level and live-runtime proof that the hosted browser workspace loop works without app-managed bearer tokens
  - One stable operator topology for friend-facing browser access versus machine-only automation, documented across all operator-facing docs
requires:
  - slice: S03
    provides: Source sync contract and hosted startup expectations consumed by the hosted guard preflight
affects:
  - S06
  - S07
key_files:
  - src/lib/private-api-guard.ts
  - src/lib/hosted-config.ts
  - src/lib/__tests__/private-api-guard.test.ts
  - src/lib/__tests__/route-access-control.test.ts
  - src/lib/__tests__/hosted-config.test.ts
  - src/lib/__tests__/hosted-browser-access.test.ts
  - scripts/verify-s05-hosted-access.sh
  - docs/operations/source-repo-sync-contract.md
  - docs/plans/2026-03-09-self-hosted-proxmox-deployment.md
  - docs/architecture/system-overview.md
  - README.md
key_decisions:
  - Require CLOUDFLARE_ACCESS_AUD in hosted preflight and trust hosted browser requests only when Cloudflare Access JWT + email headers are both present.
  - Keep the hosted-access proof route-specific and use /api/sync-hook rejection as the machine-boundary sentinel.
  - Keep library.aojdevstudio.me as the friend-facing Cloudflare Access hostname for browser traffic only; bearer auth stays machine-only on supported automation entrypoints.
  - Edge-crossing automation must use Cloudflare service tokens or a dedicated automation hostname rather than bearer-only access on the friend-facing hostname.
patterns_established:
  - One shared guard classifies hosted callers as browser-via-Access or machine-via-bearer and emits sanitized reason codes for rejection paths.
  - Prove hosted browser access with Cloudflare-style headers in both focused Vitest route coverage and a live hosted-mode shell harness.
  - Document hosted auth in terms of caller classes rather than a single auth mechanism.
observability_surfaces:
  - Hosted preflight warnings/errors from src/lib/hosted-config.ts for missing CLOUDFLARE_ACCESS_AUD or ambiguous trust config
  - Sanitized auth failure bodies with reason codes from src/lib/private-api-guard.ts (missing-browser-identity, invalid-browser-identity, invalid-machine-token, machine-token-not-configured)
  - scripts/verify-s05-hosted-access.sh route-specific pass/fail output with status= and reason= lines
  - Vitest coverage across private-api-guard, route-access-control, hosted-config, and hosted-browser-access test files
drill_down_paths:
  - .gsd/milestones/M002/slices/S05/tasks/T01-SUMMARY.md
  - .gsd/milestones/M002/slices/S05/tasks/T02-SUMMARY.md
  - .gsd/milestones/M002/slices/S05/tasks/T03-SUMMARY.md
duration: 2h 26m
verification_result: passed
completed_at: 2026-03-13T13:34:39-05:00
---

# S05: Hosted Auth and Access Shape

**Shipped a two-caller-class hosted auth guard, route-level browser access proof for the video workspace loop, and one stable operator topology for friend-facing Cloudflare Access versus machine-only bearer automation.**

## What Happened

S05 solved the mismatch between Cloudflare-gated browser fetches and the bearer-only origin guard that was blocking the hosted launch experience.

**T01** rewrote the shared hosted guard in `src/lib/private-api-guard.ts` to classify hosted callers as one of two types: browser-via-Cloudflare-Access (trusted when both `cf-access-jwt-assertion` and `cf-access-authenticated-user-email` are present with a matching audience) or machine-via-bearer (using `PRIVATE_API_TOKEN`). Rejection paths now emit sanitized reason codes (`missing-browser-identity`, `invalid-browser-identity`, `invalid-machine-token`, `machine-token-not-configured`) instead of raw auth details. Hosted preflight in `src/lib/hosted-config.ts` now requires `CLOUDFLARE_ACCESS_AUD` and prints the browser trust contract summary at startup.

**T02** proved the new guard works across the actual hosted workspace routes. Focused Vitest coverage exercises `/api/insight`, `/api/analyze`, and `/api/insight/stream` under `HOSTED=true` with Cloudflare-style browser identity and no bearer token. A live runtime harness (`scripts/verify-s05-hosted-access.sh`) starts the app in hosted mode, uses a real catalog video, and asserts browser access succeeds while anonymous callers and browser-only `/api/sync-hook` requests are correctly rejected. A manual browser proof through a header-injecting proxy confirmed the workspace loads and analysis starts — later failure was provider-credit related, not auth-shape related.

**T03** locked the operator-facing docs to one truthful topology across sync contract, deployment plan, architecture overview, and README. `library.aojdevstudio.me` is the friend-facing browser hostname through Cloudflare Access. Bearer auth is machine-only. Edge-crossing automation must use service tokens or a dedicated automation hostname. App-managed browser auth is a non-goal.

## Verification

All slice-level verification checks pass:

- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts src/lib/__tests__/hosted-browser-access.test.ts` — 63 tests passed
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"` — 2 tests passed
- `bash scripts/verify-s05-hosted-access.sh` — PASS
- `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg -n "reason=|status="` — all 6 route/caller/status lines confirm correct behavior
- `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md` — matches across all four docs

## Requirements Advanced

- R001 — Hosted browser users can now reach app API routes through Cloudflare-managed identity without any app-managed password or browser bearer token. Full proof requires real Cloudflare Access in S07.
- R003 — The friend-facing hostname is defined as Access-protected, and the origin guard explicitly composes Cloudflare identity with the app's hosted guard. Automation callers keep a supported machine path. Full proof requires real tunnel/access config in S06/S07.

## Requirements Validated

- None newly validated. R001 and R003 are advanced but not fully validated until the real Cloudflare Access gate is exercised in S07.

## New Requirements Surfaced

- None.

## Requirements Invalidated or Re-scoped

- None.

## Deviations

None.

## Known Limitations

- The Cloudflare Access JWT audience verification uses a lightweight local check, not a full JWKS-based verification against Cloudflare's signing keys. This is appropriate for the private friend-group deployment but would need hardening for higher-trust scenarios.
- Provider credit balance can cause analysis to fail after auth succeeds — that is outside this slice's scope (provider runtime, not access shape).

## Follow-ups

- S06 must wire `CLOUDFLARE_ACCESS_AUD`, tunnel config, and the friend-facing hostname into the real Proxmox deployment layout.
- S07 must prove the full live access flow with real Cloudflare Access, not just header-injected local proofs.

## Files Created/Modified

- `src/lib/private-api-guard.ts` — two-caller-class hosted guard with sanitized rejection reasons
- `src/lib/hosted-config.ts` — Cloudflare browser-trust preflight requirements and hosted contract summaries
- `src/lib/__tests__/private-api-guard.test.ts` — guard coverage for browser, machine, and sanitized rejection paths
- `src/lib/__tests__/route-access-control.test.ts` — aligned guarded route matrix to the new hosted contract
- `src/lib/__tests__/hosted-config.test.ts` — startup coverage for missing Access audience and incomplete trust config
- `src/lib/__tests__/hosted-browser-access.test.ts` — focused hosted-browser route coverage for insight, analyze, stream
- `scripts/verify-s05-hosted-access.sh` — repeatable hosted runtime proof harness
- `docs/operations/source-repo-sync-contract.md` — human-vs-machine sync/deploy topology
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — aligned to Access-protected friend-facing hostname
- `docs/architecture/system-overview.md` — two-caller-class hosted auth description
- `README.md` — concise operator-facing hosted access model
- `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` — slice closure

## Forward Intelligence

### What the next slice should know

- The hosted guard contract is stable and tested. S06 should consume the caller-class split as-is and wire `CLOUDFLARE_ACCESS_AUD` plus tunnel hostname config into the Proxmox environment file without redesigning the guard.
- The verification harness at `scripts/verify-s05-hosted-access.sh` can be extended for S07 live proof by pointing it at the real hosted URL instead of localhost.

### What's fragile

- The JWT audience check in `private-api-guard.ts` decodes the Cloudflare JWT payload without JWKS signature verification — this works because Cloudflare Access sits at the edge and the origin trusts that boundary, but any change to the trust model would need real signature verification added.
- `scripts/verify-s05-hosted-access.sh` relies on `curl --max-time` exit code 28 tolerance for SSE streams — if curl behavior changes or the stream format changes, the harness assertion may need adjustment.

### Authoritative diagnostics

- `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg -n "reason=|status="` — this is the fastest way to confirm the hosted boundary still works; each line names the route, caller type, HTTP status, and sanitized reason so regressions are immediately attributable.
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"` — confirms rejection responses never leak raw auth details in hosted mode.
- Hosted preflight output from `src/lib/hosted-config.ts` — at startup, the app logs which trust inputs are present/missing and prints the browser contract summary, so misconfigured deploys surface before any user request.

### What assumptions changed

- The original hosted guard assumed all callers would present a bearer token. That assumption was replaced: browser callers now present Cloudflare Access identity headers, and only machine callers use bearer tokens.
