# S05: Hosted Auth and Access Shape — UAT

**Milestone:** M002
**Written:** 2026-03-13

## UAT Type

- UAT mode: mixed (artifact-driven + live-runtime)
- Why this mode is sufficient: The slice changes a shared auth guard and operator docs. Unit tests prove the guard logic, the live harness proves the runtime loop, and doc inspection proves the topology is published. Real Cloudflare Access proof is deferred to S07.

## Preconditions

- The app can build and start locally (`just start` or `npm run dev`)
- `PLAYLIST_TRANSCRIPTS_REPO` points to a valid transcript checkout with at least one indexed video
- Node.js and `npx vitest` are available
- `curl`, `rg`, and `jq` are available for shell verification
- No real Cloudflare Access configuration is required — the harness uses locally minted headers

## Smoke Test

Run `bash scripts/verify-s05-hosted-access.sh` and confirm output ends with `PASS hosted browser access proof complete`. This exercises browser access, anonymous rejection, and machine-boundary preservation in one command.

## Test Cases

### 1. Hosted browser access allows Cloudflare-authenticated requests without bearer token

1. Run `npx vitest run src/lib/__tests__/hosted-browser-access.test.ts`
2. Confirm all tests pass
3. **Expected:** `/api/insight`, `/api/analyze`, and `/api/insight/stream` return 200 when called with `cf-access-jwt-assertion` and `cf-access-authenticated-user-email` headers under `HOSTED=true`, without any `Authorization: Bearer` header

### 2. Hosted anonymous requests are rejected with sanitized reasons

1. Run `npx vitest run src/lib/__tests__/private-api-guard.test.ts -t "sanitized reason"`
2. Confirm both tests pass
3. Run `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg "reason=missing-browser-identity"`
4. **Expected:** Anonymous hosted requests to `/api/insight` return 401 with `reason=missing-browser-identity`, not raw auth error details

### 3. Machine-only routes reject browser-only callers

1. Run `bash scripts/verify-s05-hosted-access.sh 2>&1 | rg "sync-hook"`
2. **Expected:** Output includes `route=sync-hook caller=browser-only status=401 reason=machine-boundary-preserved`
3. This confirms Cloudflare Access browser identity alone cannot access `/api/sync-hook`

### 4. Hosted preflight fails on missing CLOUDFLARE_ACCESS_AUD

1. Run `npx vitest run src/lib/__tests__/hosted-config.test.ts`
2. Confirm the test `throws in hosted mode on missing required vars` passes
3. **Expected:** When `HOSTED=true` but `CLOUDFLARE_ACCESS_AUD` is unset, preflight throws an error naming the missing variable

### 5. Route access matrix covers all guarded routes

1. Run `npx vitest run src/lib/__tests__/route-access-control.test.ts`
2. Confirm all 32 tests pass
3. **Expected:** Each guarded route has explicit allow/deny coverage for browser-via-Access, bearer-machine, and anonymous hosted callers

### 6. Live hosted runtime proof passes end-to-end

1. Run `bash scripts/verify-s05-hosted-access.sh`
2. Confirm output shows all 6 status lines with correct pass/fail
3. **Expected:**
   - `client-auth-surface status=pass` — no app-managed bearer found in client code
   - `route=insight caller=browser status=200`
   - `route=analyze caller=browser status=200`
   - `route=stream caller=browser status=200`
   - `route=insight caller=anonymous status=401`
   - `route=sync-hook caller=browser-only status=401`

### 7. Operator docs publish the correct access topology

1. Run `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md`
2. **Expected:** All four docs contain references to the two-caller-class model. Specifically:
   - `library.aojdevstudio.me` appears as the friend-facing hostname
   - "Cloudflare Access" appears as the browser identity system
   - "service token" or "dedicated automation hostname" appears for edge-crossing machine access
   - No doc implies bearer-only access works on the friend-facing hostname

## Edge Cases

### Missing CLOUDFLARE_ACCESS_TEAM_DOMAIN produces warning, not failure

1. Run `npx vitest run src/lib/__tests__/hosted-config.test.ts -t "warns when CLOUDFLARE_ACCESS_TEAM_DOMAIN is absent"`
2. **Expected:** Preflight completes with a warning, not an error — the team domain is recommended but not strictly required

### Local dev mode skips all hosted auth checks

1. Run `npx vitest run src/lib/__tests__/hosted-config.test.ts -t "does not throw in local dev with no vars"`
2. **Expected:** Preflight passes with no errors when `HOSTED` is unset, even with no Cloudflare or token variables configured

### Bearer callers still work for machine routes in hosted mode

1. Run `npx vitest run src/lib/__tests__/route-access-control.test.ts -t "bearer"`
2. **Expected:** Machine callers with valid `PRIVATE_API_TOKEN` are accepted on all guarded routes including `/api/sync-hook`

## Failure Signals

- Any test in the 4 test files failing → guard contract regression
- `verify-s05-hosted-access.sh` printing `FAIL` or exiting non-zero → live hosted boundary broken
- Hosted preflight not mentioning `CLOUDFLARE_ACCESS_AUD` → startup validation regressed
- Docs grep returning no matches for one of the four files → topology documentation gap
- Client code (`VideoAnalysisWorkspace.tsx`, `AnalysisPanel.tsx`) containing `PRIVATE_API_TOKEN` or `Authorization: Bearer` → app-managed browser auth leaked into client

## Requirements Proved By This UAT

- R001 — Hosted browser users reach app API routes through Cloudflare-managed identity without app-managed passwords (proved locally with header injection; real Cloudflare Access proof deferred to S07)
- R003 — Friend-facing hostname is Access-protected, automation callers keep a supported machine path, and the origin guard composes both correctly

## Not Proven By This UAT

- Real Cloudflare Access gate with actual Cloudflare-issued JWTs (S07)
- Real tunnel config wiring `library.aojdevstudio.me` to the Proxmox origin (S06)
- Full JWKS-based JWT signature verification against Cloudflare signing keys
- Provider-level analysis completion (provider credit/auth is outside access shape scope)

## Notes for Tester

- The verification script starts a temporary Next.js server on port 3123 and kills it on exit. If a previous run crashed, check for orphaned processes on that port.
- The SSE stream test accepts curl exit code 28 (timeout on long-lived connection) as success when a snapshot frame was already received — this is intentional, not a test bug.
- If analysis start returns a non-200 during the live harness, check whether the video already has a completed analysis (the route returns a different status for already-complete videos).
