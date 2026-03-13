---
id: T02
parent: S06
milestone: M002
provides:
  - Deploy-hook webhook listener with HMAC-SHA256 verification
  - Slice verification script validating all deploy artifact consistency
key_files:
  - deploy/deploy-hook.ts
  - deploy/__tests__/deploy-hook.test.ts
  - scripts/verify-s06-deploy-artifacts.sh
key_decisions:
  - Exported core functions (verifySignature, acquireLock, releaseLock, handleWebhook, startServer) for testability while using isMain guard for direct execution
  - Lock file at /tmp/transcript-library-deploy.lock with exclusive-create (wx flag) for race-safe concurrency guard
  - Structured JSON logging to stdout/stderr for systemd journal capture
  - 202 Accepted response with async deploy execution — webhook returns immediately
patterns_established:
  - deploy/ directory contains both shell scripts and TypeScript for the hook listener, run via `node --import tsx`
  - vitest.config.ts include array extended to cover deploy/**/*.test.ts
observability_surfaces:
  - Structured JSON logs to stdout per webhook receipt (event type, signature pass/fail, deploy start/completion)
  - Lock file presence at /tmp/transcript-library-deploy.lock indicates active deploy
  - 403 responses for invalid signatures, 409 for concurrent deploys
  - deploy.sh exit code captured and logged
duration: 15m
verification_result: passed
completed_at: 2026-03-13
blocker_discovered: false
---

# T02: Build deploy-hook listener and slice verification

**Built standalone webhook listener with HMAC-SHA256 verification, concurrency guard, and branch filtering, plus a 30-check slice verification script proving all deploy artifacts are internally consistent.**

## What Happened

Wrote `deploy/deploy-hook.ts` as a zero-dependency Node HTTP server on port 9000 that receives GitHub push webhooks. The handler buffers the request body, verifies `X-Hub-Signature-256` using `crypto.timingSafeEqual`, filters for push events to `refs/heads/main`, checks a lock file for concurrent deploys, then spawns `deploy.sh` asynchronously and returns 202. The webhook secret is never logged — only its presence and key length are confirmed at startup.

Tests cover all 5 signature edge cases, lock acquire/release/reacquire, method filtering, event filtering, branch filtering, valid deploy trigger (202), and concurrent rejection (409). The child_process.spawn mock prevents actual deploy execution during tests.

The slice verification script checks 30 conditions: all 10 artifact files exist, shellcheck passes on 3 shell scripts, path consistency across 6 files (release paths under `/opt/`, mutable data under `/srv/`, no cross-contamination), env var coverage (all `process.env.X` references in `hosted-config.ts` present in `env.template`), systemd unit correctness (User=deploy, WorkingDirectory), and ecosystem.config.cjs cwd alignment.

## Verification

- `npx vitest run deploy/__tests__/deploy-hook.test.ts` — 15/15 tests pass
- `bash scripts/verify-s06-deploy-artifacts.sh` — 30/30 checks pass, exit 0
- `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh` — clean

## Diagnostics

- Webhook history: `journalctl -u deploy-hook` shows JSON-structured logs per receipt
- Active deploy check: `ls /tmp/transcript-library-deploy.lock`
- Deploy-hook startup: logs `DEPLOY_WEBHOOK_SECRET is configured` with key length (never the value)
- Response codes: 202 (deploy started), 200 (ignored event), 403 (bad signature), 409 (concurrent), 405 (wrong method)

## Deviations

- Extended `vitest.config.ts` include pattern to `["src/**/*.test.ts", "deploy/**/*.test.ts"]` — the existing config only covered `src/`. Required for deploy tests to be discovered.
- Used `grep -oE` instead of `grep -oP` in the verification script — macOS grep doesn't support PCRE (`-P` flag).

## Known Issues

None.

## Files Created/Modified

- `deploy/deploy-hook.ts` — Standalone webhook HTTP server with HMAC verification, event/branch filtering, concurrency guard
- `deploy/__tests__/deploy-hook.test.ts` — 15 Vitest tests covering signature, filtering, and concurrency
- `scripts/verify-s06-deploy-artifacts.sh` — 30-check slice verification script
- `vitest.config.ts` — Extended include pattern to cover deploy/ test files
