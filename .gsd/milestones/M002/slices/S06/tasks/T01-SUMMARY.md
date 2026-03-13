---
id: T01
parent: S06
milestone: M002
provides:
  - All 9 static deploy infrastructure artifacts for Proxmox LXC deployment
key_files:
  - deploy/deploy.sh
  - deploy/rollback.sh
  - deploy/setup-lxc.sh
  - deploy/ecosystem.config.cjs
  - deploy/env.template
  - deploy/cloudflared-config.yml
  - deploy/systemd/transcript-library-sweep.service
  - deploy/systemd/transcript-library-sweep.timer
  - deploy/systemd/deploy-hook.service
key_decisions:
  - pm2 delete-then-start pattern avoids cached symlink resolution
  - deploy.sh uses ln -sfn for atomic symlink swap
  - systemd deploy-hook.service reads .env.local via EnvironmentFile for DEPLOY_WEBHOOK_SECRET
  - env.template is a superset of hosted-config.ts vars plus deployment-specific vars
patterns_established:
  - deploy/ directory as the canonical location for all infra artifacts
  - /opt/transcript-library/{releases,current} for immutable releases
  - /srv/transcript-library/ for mutable runtime data
observability_surfaces:
  - deploy-manifest.json written per release with timestamp, gitSha, nodeVersion, buildStatus
  - systemd journal for sweep and deploy-hook services
  - pm2 show transcript-library for process health
  - rollback.sh prints which release it reverted to
duration: 20m
verification_result: passed
completed_at: 2026-03-13
blocker_discovered: false
---

# T01: Create deploy scripts, pm2 config, systemd units, and LXC setup

**Produced all 9 static infrastructure artifacts for Proxmox LXC deployment with shellcheck-clean scripts and consistent path references.**

## What Happened

Wrote all deploy artifacts per the task plan:

- `deploy.sh` — clone → npm ci → next build --webpack → symlink .env.local → atomic symlink swap → pm2 delete+start → deploy-manifest.json → cleanup old releases (keep 3)
- `rollback.sh` — finds previous release, repoints symlink, restarts pm2, prints manifest
- `ecosystem.config.cjs` — pm2 config with cwd at /opt/transcript-library/current, npm run start, max_restarts:10, log paths under /srv
- `setup-lxc.sh` — installs Node 22 (NodeSource), git, pm2, cloudflared, creates deploy user, creates full /opt and /srv directory layout
- `env.template` — documents all env vars from hosted-config.ts plus deployment-specific vars (INSIGHTS_BASE_DIR, DEPLOY_WEBHOOK_SECRET, ANALYSIS_PROVIDER, etc.)
- `cloudflared-config.yml` — tunnel config with library.aojdevstudio.me → :3000 and library-deploy.aojdevstudio.me → :9000
- systemd sweep service/timer — daily at 03:00 with 5min random delay, 30min timeout
- systemd deploy-hook service — reads .env.local via EnvironmentFile for secrets

Also fixed the pre-flight observability gap by adding an `## Observability Impact` section to T01-PLAN.md.

## Verification

- `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh` — passes with zero errors
- All 9 artifacts confirmed present on disk
- All shell scripts have executable permissions
- Path consistency: grep confirmed all files reference `/opt/transcript-library/` and `/srv/transcript-library/` consistently with the deployment plan
- Env var coverage: all 8 vars from hosted-config.ts are present in env.template (template is a superset with 14 total vars)

### Slice-level verification (partial — T01 scope)

- ✓ `shellcheck` passes on all 3 shell scripts
- ⏳ `bash scripts/verify-s06-deploy-artifacts.sh` — script does not exist yet (T02 creates it)
- ⏳ `npx vitest run deploy/__tests__/deploy-hook.test.ts` — test does not exist yet (T02 creates it)

## Diagnostics

- Inspect deploy state: `cat /opt/transcript-library/current/deploy-manifest.json`
- Available releases: `ls /opt/transcript-library/releases/`
- Active release: `readlink /opt/transcript-library/current`
- Sweep logs: `journalctl -u transcript-library-sweep`
- Deploy hook logs: `journalctl -u deploy-hook`
- pm2 health: `pm2 show transcript-library`

## Deviations

None.

## Known Issues

None.

## Files Created/Modified

- `deploy/deploy.sh` — release deploy script (clone → build → symlink → restart)
- `deploy/rollback.sh` — rollback to previous release
- `deploy/setup-lxc.sh` — LXC provisioning (Node 22, pm2, cloudflared, directory layout)
- `deploy/ecosystem.config.cjs` — pm2 process config
- `deploy/env.template` — hosted env var documentation
- `deploy/cloudflared-config.yml` — Cloudflare Tunnel config template
- `deploy/systemd/transcript-library-sweep.service` — daily sweep systemd service
- `deploy/systemd/transcript-library-sweep.timer` — daily sweep timer (03:00)
- `deploy/systemd/deploy-hook.service` — deploy hook listener systemd service
- `.gsd/milestones/M002/slices/S06/tasks/T01-PLAN.md` — added Observability Impact section
