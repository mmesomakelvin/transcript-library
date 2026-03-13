---
id: T01
parent: S05
milestone: M002
provides:
  - Shared hosted auth guard coverage for Cloudflare-browser and bearer-machine callers
key_files:
  - src/lib/private-api-guard.ts
  - src/lib/hosted-config.ts
  - src/lib/__tests__/private-api-guard.test.ts
  - src/lib/__tests__/route-access-control.test.ts
  - src/lib/__tests__/hosted-config.test.ts
key_decisions:
  - Require CLOUDFLARE_ACCESS_AUD in hosted preflight and trust hosted browser requests only when Cloudflare Access JWT + email headers are both present.
patterns_established:
  - One shared guard now classifies hosted callers as browser-via-Access or machine-via-bearer and emits sanitized reason codes for rejection paths.
observability_surfaces:
  - Hosted preflight warnings/errors from src/lib/hosted-config.ts and sanitized auth failure bodies from src/lib/private-api-guard.ts
duration: 15m
verification_result: passed
completed_at: 2026-03-13T18:11:00Z
blocker_discovered: false
---

# T01: Encode the two-caller-class hosted guard contract

**Shipped a shared hosted guard that accepts Cloudflare Access browser identity or bearer machine auth, with startup checks and sanitized rejection reasons locking the contract in tests.**

## What Happened

I started by fixing the slice-plan observability gap so S05 verification now includes a targeted sanitized-reason check instead of only happy-path coverage.

From there I followed the task plan in TDD order: I rewrote the three targeted test files first so they described the new caller classes explicitly. The RED run failed in the expected places: browser-via-Access requests were still denied, hosted responses did not expose sanitized reason codes, and hosted preflight did not yet require explicit Cloudflare browser-trust configuration.

I then updated `src/lib/private-api-guard.ts` to evaluate one hosted boundary with two caller classes. In hosted mode it now:

- allows explicit bearer callers with `PRIVATE_API_TOKEN`
- allows browser callers only when both `cf-access-jwt-assertion` and `cf-access-authenticated-user-email` are present and the JWT payload audience matches `CLOUDFLARE_ACCESS_AUD`
- rejects failures with sanitized reason codes (`missing-browser-identity`, `invalid-browser-identity`, `invalid-machine-token`, `machine-token-not-configured`) instead of raw auth details
- preserves the local-dev no-op path and existing payload redaction behavior

I also extended `src/lib/hosted-config.ts` so hosted startup makes the trust assumptions explicit. Hosted preflight now requires `CLOUDFLARE_ACCESS_AUD`, warns when `CLOUDFLARE_ACCESS_TEAM_DOMAIN` is absent, and prints the browser-vs-machine contract summary in preflight output. That gives future operators and agents an inspectable startup surface before runtime surprises.

Finally, I updated the route matrix and config tests to lock in the three requested outcomes: hosted browser requests via Access allowed, hosted bearer machine requests allowed, and anonymous/malformed hosted requests rejected with sanitized failures.

## Verification

Passed:

- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts`
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"`
- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts src/lib/__tests__/hosted-browser-access.test.ts`

Observed directly in test coverage:

- browser-via-Access allowed
- automation-via-bearer allowed
- anonymous or malformed hosted callers rejected with sanitized reasons
- hosted preflight now fails when `CLOUDFLARE_ACCESS_AUD` is missing and warns when the Cloudflare team domain is unspecified

Slice-level verification still pending future tasks:

- `bash scripts/verify-s05-hosted-access.sh` currently fails with `No such file or directory` because T02 owns that script
- the slice doc grep is only partially satisfied because T03 owns the documentation updates

## Diagnostics

Future agents can inspect this task’s behavior through:

- `src/lib/__tests__/private-api-guard.test.ts` for explicit reason-code coverage
- `src/lib/__tests__/route-access-control.test.ts` for the hosted allow/deny matrix across guarded routes
- `src/lib/__tests__/hosted-config.test.ts` for startup failure/warning coverage
- `src/lib/hosted-config.ts` preflight output, which now logs the hosted browser contract summary and surfaces missing/ambiguous Cloudflare trust inputs before runtime

## Deviations

None.

## Known Issues

- `scripts/verify-s05-hosted-access.sh` does not exist yet; that remains T02 work.
- Slice docs still describe the older hosted posture in places; that remains T03 work.

## Files Created/Modified

- `.gsd/milestones/M002/slices/S05/S05-PLAN.md` — added a slice verification step for the inspectable sanitized failure-path surface
- `src/lib/private-api-guard.ts` — implemented the two-caller-class hosted guard and sanitized rejection reason codes
- `src/lib/hosted-config.ts` — added explicit Cloudflare browser-trust preflight requirements/warnings and hosted contract summaries
- `src/lib/__tests__/private-api-guard.test.ts` — added direct guard coverage for browser, machine, and sanitized rejection paths
- `src/lib/__tests__/route-access-control.test.ts` — aligned the guarded route matrix to the new hosted contract
- `src/lib/__tests__/hosted-config.test.ts` — added startup coverage for missing Access audience and incomplete Cloudflare trust config
- `.gsd/DECISIONS.md` — recorded the concrete hosted browser-trust contract chosen in T01
