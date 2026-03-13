---
id: S06
parent: M002
milestone: M002
provides:
  - Complete deploy toolkit for Proxmox LXC with pm2 supervision, systemd scheduling, Cloudflare Tunnel config, and webhook-triggered deploys with rollback
requires:
  - slice: S03
    provides: Source repo runtime expectations and filesystem/layout dependencies
  - slice: S05
    provides: Access pattern, domains, and trust-boundary assumptions for hosted deployment
affects:
  - S07
key_files:
  - deploy/deploy.sh
  - deploy/rollback.sh
  - deploy/setup-lxc.sh
  - deploy/ecosystem.config.cjs
  - deploy/env.template
  - deploy/cloudflared-config.yml
  - deploy/deploy-hook.ts
  - deploy/__tests__/deploy-hook.test.ts
  - deploy/systemd/transcript-library-sweep.service
  - deploy/systemd/transcript-library-sweep.timer
  - deploy/systemd/deploy-hook.service
  - scripts/verify-s06-deploy-artifacts.sh
key_decisions:
  - pm2 delete-then-start pattern avoids cached symlink resolution after deploys
  - deploy.sh uses ln -sfn for atomic symlink swap preserving rollback safety
  - systemd deploy-hook.service reads .env.local via EnvironmentFile for secret injection
  - Lock file at /tmp/transcript-library-deploy.lock with exclusive-create for race-safe concurrency guard
  - Deploy-hook returns 202 Accepted immediately and runs deploy.sh asynchronously
  - env.template is a superset of hosted-config.ts vars plus deployment-specific vars
patterns_established:
  - deploy/ directory as the canonical location for all infra artifacts
  - /opt/transcript-library/{releases,current} for immutable release code
  - /srv/transcript-library/ for mutable runtime data (insights, logs, catalog)
  - Structured JSON logging from deploy-hook for systemd journal capture
  - 30-check verification script as the slice-level consistency gate
observability_surfaces:
  - deploy-manifest.json written per release with timestamp, gitSha, nodeVersion, buildStatus
  - systemd journal for sweep and deploy-hook services
  - pm2 show transcript-library for process health
  - deploy-hook structured JSON logs per webhook receipt
  - Lock file presence at /tmp/transcript-library-deploy.lock indicates active deploy
drill_down_paths:
  - .gsd/milestones/M002/slices/S06/tasks/T01-SUMMARY.md
  - .gsd/milestones/M002/slices/S06/tasks/T02-SUMMARY.md
duration: 35m
verification_result: passed
completed_at: 2026-03-13
---

# S06: Proxmox Runtime and Release Pipeline

**Complete deploy toolkit with 10 infrastructure artifacts, webhook-triggered deploys with HMAC verification, and a 30-check consistency gate — all paths verified internally consistent against the deployment plan.**

## What Happened

T01 produced all 9 static infrastructure artifacts: `deploy.sh` (clone → npm ci → build → atomic symlink swap → pm2 restart → deploy-manifest.json → cleanup keeping 3 releases), `rollback.sh` (repoints symlink to previous release), `setup-lxc.sh` (Node 22, pm2, cloudflared, directory layout under `/opt/` and `/srv/`), `ecosystem.config.cjs` (pm2 config rooted at `/opt/transcript-library/current`), `env.template` (14 vars covering all hosted-config.ts requirements plus deployment-specific vars), `cloudflared-config.yml` (routes for `library.aojdevstudio.me` and `library-deploy.aojdevstudio.me`), and three systemd units (daily sweep timer at 03:00, sweep service, deploy-hook service).

T02 added the deploy-hook listener — a standalone Node HTTP server on port 9000 that verifies GitHub webhook HMAC-SHA256 signatures, filters for push events to `refs/heads/main`, uses a lock file for concurrency safety, and spawns deploy.sh asynchronously. 15 Vitest tests cover all signature, filtering, and concurrency paths. The slice verification script validates 30 conditions across artifact existence, shellcheck compliance, path consistency, env var coverage, and systemd unit correctness.

## Verification

- `bash scripts/verify-s06-deploy-artifacts.sh` — 30/30 checks pass
- `npx vitest run deploy/__tests__/deploy-hook.test.ts` — 15/15 tests pass
- `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh` — clean, zero errors
- All paths consistently reference `/opt/transcript-library/` for release code and `/srv/transcript-library/` for mutable runtime data

## Requirements Advanced

- R002 (Proxmox deployment with repeatable runtime layout) — all deploy artifacts exist with consistent paths and documented env vars; real Proxmox proof deferred to S07
- R010 (Hosted deploy automation is unattended, repeatable, and rollback-friendly) — webhook-triggered deploy, atomic symlink swap, rollback script, release cleanup all implemented; real runtime proof deferred to S07
- R003 (Cloudflare tunnel and access gate) — tunnel config template created with both app and deploy-hook routes; real tunnel proof deferred to S07
- R006 (Daily unattended repair sweep) — systemd timer/service unit wired to the daily sweep script at the `current` symlink; real scheduling proof deferred to S07

## Requirements Validated

- None — this slice produces artifacts; real runtime validation happens in S07

## New Requirements Surfaced

- None

## Requirements Invalidated or Re-scoped

- None

## Deviations

- Extended `vitest.config.ts` include pattern to `["src/**/*.test.ts", "deploy/**/*.test.ts"]` so deploy tests are discovered — minor config change required by placing tests outside `src/`.
- Used `grep -oE` instead of `grep -oP` in the verification script for macOS compatibility.

## Known Limitations

- All artifacts are verified for internal consistency only — no real Proxmox LXC runtime proof exists yet (that's S07's job).
- The deploy-hook listener runs via `node --import tsx` which requires tsx installed on the host; the setup-lxc.sh script does not currently install tsx globally.
- Release cleanup keeps only 3 releases; a rapid sequence of deploys could remove all rollback targets older than the last 3.

## Follow-ups

- S07 must exercise these artifacts in the real Proxmox topology.
- Operator should verify that `node --import tsx` works in the LXC after setup-lxc.sh runs, or add tsx to the global install list.

## Files Created/Modified

- `deploy/deploy.sh` — Release deploy script (clone → build → symlink → restart)
- `deploy/rollback.sh` — Rollback to previous release
- `deploy/setup-lxc.sh` — LXC provisioning (Node 22, pm2, cloudflared, directory layout)
- `deploy/ecosystem.config.cjs` — pm2 process config
- `deploy/env.template` — Hosted env var documentation (14 vars)
- `deploy/cloudflared-config.yml` — Cloudflare Tunnel config template
- `deploy/deploy-hook.ts` — Standalone webhook HTTP server with HMAC verification
- `deploy/__tests__/deploy-hook.test.ts` — 15 Vitest tests for webhook listener
- `deploy/systemd/transcript-library-sweep.service` — Daily sweep systemd service
- `deploy/systemd/transcript-library-sweep.timer` — Daily sweep timer (03:00)
- `deploy/systemd/deploy-hook.service` — Deploy hook listener systemd service
- `scripts/verify-s06-deploy-artifacts.sh` — 30-check slice verification script
- `vitest.config.ts` — Extended include pattern for deploy/ tests

## Forward Intelligence

### What the next slice should know

- All deploy artifacts are at `deploy/` in the repo root. The verification script at `scripts/verify-s06-deploy-artifacts.sh` is the fastest way to confirm nothing drifted.
- The intended operator workflow: run `setup-lxc.sh` once, populate `.env.local` from `env.template`, run `deploy.sh` for the first release, then configure systemd units and cloudflared.
- The deploy-hook expects `DEPLOY_WEBHOOK_SECRET` in `.env.local` and listens on port 9000.

### What's fragile

- The `node --import tsx deploy/deploy-hook.ts` invocation in the systemd unit depends on tsx being available — if the LXC doesn't have it, the service won't start.
- deploy.sh assumes the deploy user has SSH access to clone the repo from GitHub.

### Authoritative diagnostics

- `deploy-manifest.json` in each release directory is the fastest way to identify what's deployed and when.
- `journalctl -u deploy-hook` shows structured JSON logs for every webhook receipt.
- `readlink /opt/transcript-library/current` shows the active release.

### What assumptions changed

- No assumptions changed — the slice executed cleanly per plan.
