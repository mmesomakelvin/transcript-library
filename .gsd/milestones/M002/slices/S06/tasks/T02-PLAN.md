---
estimated_steps: 4
estimated_files: 3
---

# T02: Build deploy-hook listener and slice verification

**Slice:** S06 — Proxmox Runtime and Release Pipeline
**Milestone:** M002

## Description

Write the deploy-hook listener — a standalone Node HTTP server that receives GitHub push webhooks on port 9000, verifies HMAC-SHA256 signatures, and triggers the deploy script for pushes to main. This is the only real application code in the slice. Then write the slice-level verification script that proves all deploy artifacts are internally consistent.

## Steps

1. Write `deploy/deploy-hook.ts` — standalone HTTP server (no framework dependencies) on port 9000:
   - Read `DEPLOY_WEBHOOK_SECRET` from env
   - Parse incoming POST requests, buffer the body
   - Verify `X-Hub-Signature-256` header using `crypto.createHmac('sha256', secret)` and `crypto.timingSafeEqual`
   - Check `X-GitHub-Event` is `push` and the ref is `refs/heads/main`
   - On valid push: spawn `deploy/deploy.sh` as a child process, log start/completion, return 202 Accepted
   - On invalid signature: return 403 with `{ error: "invalid-signature" }`
   - On non-push or non-main events: return 200 with `{ status: "ignored", reason: "..." }`
   - Guard against concurrent deploys with a simple lock file
   - Never log the webhook secret value
2. Write `deploy/__tests__/deploy-hook.test.ts` — Vitest tests:
   - Test HMAC signature verification accepts valid signatures and rejects invalid ones
   - Test event filtering ignores non-push events and non-main branch pushes
   - Test concurrent deploy rejection via lock mechanism
   - Mock child_process.spawn to avoid running the actual deploy script
3. Write `scripts/verify-s06-deploy-artifacts.sh` — slice verification:
   - Check all deploy artifacts exist (all files from T01 plus deploy-hook.ts)
   - Run shellcheck on shell scripts
   - Grep all deploy artifacts for path consistency (`/opt/transcript-library/`, `/srv/transcript-library/`)
   - Compare env.template var names against `src/lib/hosted-config.ts` env var references
   - Verify systemd units reference correct paths and user
   - Verify ecosystem.config.cjs cwd matches deployment plan
   - Exit 0 only if all checks pass
4. Run verification: `npx vitest run deploy/__tests__/deploy-hook.test.ts` and `bash scripts/verify-s06-deploy-artifacts.sh`

## Must-Haves

- [ ] deploy-hook.ts verifies HMAC-SHA256 signatures using timing-safe comparison
- [ ] deploy-hook.ts only triggers deploy for push events to refs/heads/main
- [ ] deploy-hook.ts guards against concurrent deploys
- [ ] deploy-hook.ts never logs the webhook secret
- [ ] Vitest tests cover signature verification, event filtering, and concurrency guard
- [ ] Verification script confirms all artifacts exist, paths are consistent, and env coverage is complete

## Verification

- `npx vitest run deploy/__tests__/deploy-hook.test.ts` — all tests pass
- `bash scripts/verify-s06-deploy-artifacts.sh` — exits 0 with all checks passing

## Observability Impact

- Signals added: deploy-hook logs each webhook receipt with event type and signature verification result (pass/fail) to stdout
- How a future agent inspects this: `journalctl -u deploy-hook` shows webhook history; deploy-manifest.json in each release dir shows deploy outcomes
- Failure state exposed: 403 responses for bad signatures, lock-file presence during active deploys, deploy.sh exit code in logs

## Inputs

- All T01 artifacts in `deploy/` — the files being verified for consistency
- `src/lib/hosted-config.ts` — env var reference list for coverage check
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — path layout for consistency check

## Expected Output

- `deploy/deploy-hook.ts` — standalone webhook listener
- `deploy/__tests__/deploy-hook.test.ts` — test coverage
- `scripts/verify-s06-deploy-artifacts.sh` — slice verification script
