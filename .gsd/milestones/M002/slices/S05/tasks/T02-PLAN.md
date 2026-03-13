---
estimated_steps: 4
estimated_files: 7
---

# T02: Prove hosted browser access for insight, analyze, and stream flows

**Slice:** S05 — Hosted Auth and Access Shape
**Milestone:** M002

## Description

Close the slice’s user-visible proof by exercising the actual video workspace contract under `HOSTED=true`. This task should prove the key hosted browser loop works with Cloudflare-authenticated browser requests and that automation-only routes still keep their stricter machine boundary.

## Steps

1. Add focused failing coverage for the hosted browser workspace path, covering `GET /api/insight`, `POST /api/analyze`, and `GET /api/insight/stream` with trusted browser identity and no bearer token.
2. Adjust the affected routes or browser callers only as needed so the new shared guard contract flows cleanly through status load, analyze start, and SSE/stream access without reintroducing secret-bearing client fetches.
3. Create `scripts/verify-s05-hosted-access.sh` to start the app in hosted mode with safe local test env values and assert the original 401 mismatch is gone for browser-style requests while anonymous callers still fail.
4. Run the targeted test plus the hosted verification script and preserve their output as the slice’s contract proof.

## Must-Haves

- [ ] Hosted browser requests can load insight state, start analysis, and connect to the insight stream without sending `PRIVATE_API_TOKEN` from client code.
- [ ] The proof harness checks both the positive browser path and at least one negative anonymous/machine-auth failure path so the new contract does not silently over-open hosted routes.

## Verification

- `npx vitest run src/lib/__tests__/hosted-browser-access.test.ts`
- `bash scripts/verify-s05-hosted-access.sh`

## Observability Impact

- Signals added/changed: hosted browser-flow tests and verification output should make it obvious which route failed (`insight`, `analyze`, or `stream`) and whether the rejection was auth-shape related.
- How a future agent inspects this: run the dedicated Vitest file and the hosted verification script; inspect the script’s response/status assertions for the failed route.
- Failure state exposed: regressions back to the current hosted `401 unauthorized` mismatch become reproducible from one script instead of anecdotal browser clicking.

## Inputs

- `src/lib/private-api-guard.ts` — updated shared guard from T01.
- `src/app/api/insight/route.ts`, `src/app/api/analyze/route.ts`, `src/app/api/insight/stream/route.ts` — hosted workspace routes that currently sit behind the shared guard.
- `src/components/VideoAnalysisWorkspace.tsx` — browser caller path that must stay free of app-managed bearer auth.

## Expected Output

- `src/lib/__tests__/hosted-browser-access.test.ts` — focused hosted browser-loop coverage.
- `scripts/verify-s05-hosted-access.sh` — repeatable hosted runtime proof for browser and anonymous paths.
- `src/app/api/insight/route.ts` — route behavior compatible with trusted browser identity in hosted mode.
- `src/app/api/analyze/route.ts` — analyze start path compatible with trusted browser identity in hosted mode.
- `src/app/api/insight/stream/route.ts` — stream path compatible with trusted browser identity in hosted mode.
- `src/components/VideoAnalysisWorkspace.tsx` / `src/components/AnalysisPanel.tsx` — browser callers that continue to avoid app-managed secrets while working under the hosted contract.
