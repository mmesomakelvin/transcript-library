---
estimated_steps: 7
estimated_files: 9
---

# T01: Create deploy scripts, pm2 config, systemd units, and LXC setup

**Slice:** S06 — Proxmox Runtime and Release Pipeline
**Milestone:** M002

## Description

Produce all static infrastructure artifacts needed to stand up and operate the Transcript Library on a Proxmox LXC. This covers the deploy script (clone → npm ci → build → symlink → restart), rollback script, pm2 ecosystem config, systemd timer for the daily sweep, systemd service for the deploy-hook listener, LXC setup script, Cloudflare Tunnel config template, and the env var template. All artifacts must reference consistent paths from the deployment plan.

## Steps

1. Read `src/lib/hosted-config.ts` to extract the complete list of env vars for the env template (required + optional + warnings).
2. Write `deploy/env.template` documenting every hosted env var with its purpose, whether it's required/optional, and the correct hosted path values.
3. Write `deploy/deploy.sh` — the release deploy script:
   - Accept a git ref (default: `main`) and repo URL
   - Create timestamped release directory under `/opt/transcript-library/releases/`
   - `git clone --depth 1 --branch <ref>` into the release dir
   - `npm ci --production=false` (dev deps needed for build)
   - `npx next build --webpack`
   - Symlink `.env.local` from `/srv/transcript-library/.env.local` into the release dir
   - Atomically repoint `/opt/transcript-library/current` symlink via `ln -sfn`
   - `pm2 delete transcript-library && pm2 start /opt/transcript-library/current/deploy/ecosystem.config.cjs` (avoids cached symlink resolution)
   - `pm2 save`
   - Write `deploy-manifest.json` in the release dir with timestamp, git SHA, node version, build status
   - Clean up releases older than the 3 most recent
   - Exit non-zero on any step failure, preserving previous release
4. Write `deploy/rollback.sh` — repoints symlink to the previous release directory and restarts pm2.
5. Write `deploy/ecosystem.config.cjs` — pm2 config with `cwd` set to `/opt/transcript-library/current`, `script: "npm"`, `args: "run start"`, env vars loaded from `.env.local` via dotenv or symlink, and `max_restarts: 10`.
6. Write `deploy/setup-lxc.sh` — LXC bootstrap script that installs Node 22 (via NodeSource), git, pm2, cloudflared, creates the directory layout (`/opt/transcript-library/releases/`, `/srv/transcript-library/{insights,logs,catalog,runtime,playlist-transcripts}/`), creates a `deploy` user, and sets permissions.
7. Write `deploy/cloudflared-config.yml` — Cloudflare Tunnel config template with placeholder tunnel ID, ingress rules for `library.aojdevstudio.me` → localhost:3000 and `library-deploy.aojdevstudio.me` → localhost:9000, and catch-all 404.
8. Write `deploy/systemd/transcript-library-sweep.service` and `deploy/systemd/transcript-library-sweep.timer` — daily sweep automation. Service sets `WorkingDirectory=/opt/transcript-library/current`, runs `node --import tsx scripts/daily-operational-sweep.ts`, and uses the `deploy` user. Timer triggers daily at 03:00.
9. Write `deploy/systemd/deploy-hook.service` — runs the deploy-hook listener as the `deploy` user with `WorkingDirectory=/opt/transcript-library/current`.

## Must-Haves

- [ ] `deploy/deploy.sh` creates timestamped release dirs, builds with `--webpack`, repoints symlink atomically, writes deploy-manifest.json, and cleans old releases
- [ ] `deploy/rollback.sh` reverts to previous release and restarts pm2
- [ ] `deploy/ecosystem.config.cjs` references `/opt/transcript-library/current` with correct cwd and restart config
- [ ] `deploy/setup-lxc.sh` installs Node 22, pm2, cloudflared, creates full directory layout
- [ ] `deploy/env.template` covers all env vars from hosted-config.ts with correct hosted paths
- [ ] `deploy/cloudflared-config.yml` routes both hostnames correctly
- [ ] systemd timer fires daily and sweep service sets correct working directory
- [ ] systemd deploy-hook service runs the listener as the deploy user
- [ ] All scripts pass shellcheck with no errors

## Verification

- `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh` — no errors
- Manual review: every path in deploy.sh, ecosystem.config.cjs, and systemd units matches the deployment plan's `/opt/transcript-library/` and `/srv/transcript-library/` layout
- Env template includes every var that `src/lib/hosted-config.ts` references

## Observability Impact

- **deploy-manifest.json**: Each deploy writes `{ timestamp, gitSha, nodeVersion, buildStatus }` to the release directory. A future agent inspects `/opt/transcript-library/current/deploy-manifest.json` to see what's running.
- **deploy.sh exit code**: Non-zero on any failure, preserving the previous `current` symlink. `journalctl -u deploy-hook` shows the deploy script's stdout/stderr.
- **rollback.sh logging**: Prints which release it reverted to and the pm2 restart result.
- **systemd journal**: `journalctl -u transcript-library-sweep` shows sweep execution. `journalctl -u deploy-hook` shows webhook receipts and deploy outcomes.
- **pm2 status**: `pm2 show transcript-library` shows uptime, restart count, and current `cwd` — verifies the symlink resolved correctly.
- **Failure state visibility**: A failed deploy leaves the previous release intact. `ls -la /opt/transcript-library/current` shows which release is active. `ls /opt/transcript-library/releases/` shows available rollback targets.

## Inputs

- `src/lib/hosted-config.ts` — canonical list of env vars and their validation rules
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — directory layout, component descriptions, and path conventions
- `scripts/daily-operational-sweep.ts` — the CLI entrypoint the systemd timer must invoke

## Expected Output

- `deploy/deploy.sh` — release deploy script
- `deploy/rollback.sh` — rollback script
- `deploy/setup-lxc.sh` — LXC provisioning script
- `deploy/ecosystem.config.cjs` — pm2 config
- `deploy/env.template` — hosted env var documentation
- `deploy/cloudflared-config.yml` — tunnel config template
- `deploy/systemd/transcript-library-sweep.service` — daily sweep service
- `deploy/systemd/transcript-library-sweep.timer` — daily sweep timer
- `deploy/systemd/deploy-hook.service` — deploy listener service
