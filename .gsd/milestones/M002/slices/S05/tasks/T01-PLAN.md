---
estimated_steps: 4
estimated_files: 5
---

# T01: Encode the two-caller-class hosted guard contract

**Slice:** S05 — Hosted Auth and Access Shape
**Milestone:** M002

## Description

Replace the current bearer-only hosted guard contract with one shared boundary that can trust browser requests authenticated by Cloudflare Access while keeping machine callers on explicit bearer auth. This task is the slice’s highest-risk closure because every later hosted verification and deployment assumption depends on a stable answer for who the origin trusts and how that trust is configured.

## Steps

1. Add failing tests that describe the new caller classes: trusted Cloudflare browser requests allowed in hosted mode, bearer-authenticated machine requests still allowed, and anonymous or malformed hosted requests rejected with sanitized failures.
2. Update `src/lib/private-api-guard.ts` to evaluate the hosted caller type through one shared contract, preserving local-dev no-op behavior and existing redaction guarantees.
3. Extend `src/lib/hosted-config.ts` so startup checks and warnings make the chosen Cloudflare trust assumptions explicit, including ambiguous or incomplete hosted auth configuration.
4. Re-run the route matrix and targeted config tests to confirm the allow/deny behavior is locked before any browser-flow or doc work proceeds.

## Must-Haves

- [ ] Hosted mode accepts trusted Cloudflare-authenticated browser requests and explicit bearer-token machine requests through the same shared guard instead of route-by-route exceptions.
- [ ] Hosted failures remain sanitized and operator-readable, with startup checks surfacing missing or ambiguous auth configuration before runtime surprises.

## Verification

- `npx vitest run src/lib/__tests__/private-api-guard.test.ts src/lib/__tests__/route-access-control.test.ts src/lib/__tests__/hosted-config.test.ts`
- Confirm the tests cover three outcomes explicitly: browser-via-Access allowed, automation-via-bearer allowed, and anonymous/invalid hosted requests rejected.

## Observability Impact

- Signals added/changed: hosted auth failures should expose a sanitized reason path that distinguishes missing browser identity from invalid machine auth.
- How a future agent inspects this: run the targeted Vitest suite and inspect hosted preflight output from `src/lib/hosted-config.ts`.
- Failure state exposed: ambiguous Cloudflare trust configuration or rejected hosted caller type becomes visible before deployment and in route-level test coverage.

## Inputs

- `src/lib/private-api-guard.ts` — current bearer-only hosted guard that must broaden without weakening origin protection.
- `src/lib/hosted-config.ts` — existing hosted preflight authority that should become the explicit home for access-shape startup assumptions.
- `src/lib/__tests__/route-access-control.test.ts` — current hosted allow/deny matrix that locks in the mismatch this task must replace.

## Expected Output

- `src/lib/private-api-guard.ts` — shared two-caller-class hosted guard contract.
- `src/lib/hosted-config.ts` — hosted preflight rules that describe the required Cloudflare/browser trust assumptions.
- `src/lib/__tests__/private-api-guard.test.ts` — guard coverage for browser, machine, and rejection paths.
- `src/lib/__tests__/route-access-control.test.ts` — route matrix aligned to the new hosted contract.
- `src/lib/__tests__/hosted-config.test.ts` — startup warning/failure coverage for the chosen access shape.
