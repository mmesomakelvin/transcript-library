# S06: Proxmox Runtime and Release Pipeline

**Goal:** The repo contains a complete, internally consistent deploy toolkit that an operator can use to stand up the app on a Proxmox LXC with persistent storage, pm2 supervision, Cloudflare Tunnel ingress, systemd-scheduled daily sweep, and webhook-triggered deploys with rollback.
**Demo:** `bash scripts/verify-s06-deploy-artifacts.sh` validates all deploy artifacts for internal consistency, correct paths, and required env coverage. `npx vitest run deploy/__tests__/deploy-hook.test.ts` proves webhook signature verification and deploy trigger logic.

## Must-Haves

- pm2 ecosystem config that runs the app from the `current` symlink with correct `cwd` and `.env.local` symlink handling
- Deploy script that clones, installs (`npm ci`), builds (`npx next build --webpack`), repoints symlink atomically, and restarts pm2
- Rollback script that repoints symlink to previous release and restarts pm2
- LXC setup script that installs Node 22, pm2, cloudflared, git, creates the directory layout under `/opt/transcript-library/` and `/srv/transcript-library/`
- Cloudflare Tunnel config template with both `library.aojdevstudio.me` and `library-deploy.aojdevstudio.me` routes
- systemd timer + service for the daily operational sweep pointing at the `current` symlink
- systemd service for the deploy-hook listener
- Deploy-hook listener that receives GitHub webhooks, verifies HMAC-SHA256 signature, and triggers the deploy script
- Environment template documenting all required and optional env vars with the hosted directory paths
- All deploy scripts reference consistent paths matching the deployment plan (`/opt/transcript-library/`, `/srv/transcript-library/`)

## Proof Level

- This slice proves: operational (deploy tooling is correct and internally consistent)
- Real runtime required: no (real Proxmox proof is S07)
- Human/UAT required: no (user performs manual Cloudflare/LXC setup with these artifacts in S07)

## Verification

- `bash scripts/verify-s06-deploy-artifacts.sh` — validates all deploy artifacts exist, shellcheck passes on shell scripts, paths are consistent across files, env template covers all vars from `hosted-config.ts`, systemd units reference correct paths
- `npx vitest run deploy/__tests__/deploy-hook.test.ts` — tests webhook HMAC verification, deploy trigger on valid signature, rejection on invalid signature, and idempotency under concurrent webhook delivery
- `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh` — no errors

## Observability / Diagnostics

- Runtime signals: deploy-hook listener logs each webhook receipt, signature verification result, deploy script invocation, and outcome to stdout (captured by systemd journal)
- Inspection surfaces: `deploy/env.template` documents all env vars; deploy.sh writes a `deploy-manifest.json` in each release directory with timestamp, git SHA, and build status
- Failure visibility: deploy.sh exits non-zero on any failed step and preserves the previous release; rollback.sh logs what it reverted to
- Redaction constraints: webhook secret and API tokens never logged; only key names appear in deploy-manifest.json

## Integration Closure

- Upstream surfaces consumed: `src/lib/hosted-config.ts` (env var requirements), `src/lib/private-api-guard.ts` (CLOUDFLARE_ACCESS_AUD wiring), `scripts/daily-operational-sweep.ts` (sweep entrypoint), `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` (canonical layout)
- New wiring introduced: `deploy/` directory with all deploy tooling; systemd units for sweep timer and deploy-hook service
- What remains before the milestone is truly usable end-to-end: S07 proves real Proxmox deployment, Cloudflare Access, and live hosted experience

## Tasks

- [x] **T01: Create deploy scripts, pm2 config, systemd units, and LXC setup** `est:1h30m`
  - Why: Produces all the static infrastructure artifacts needed to stand up and operate the app on Proxmox — everything except the deploy-hook listener
  - Files: `deploy/deploy.sh`, `deploy/rollback.sh`, `deploy/setup-lxc.sh`, `deploy/ecosystem.config.cjs`, `deploy/env.template`, `deploy/cloudflared-config.yml`, `deploy/systemd/transcript-library-sweep.service`, `deploy/systemd/transcript-library-sweep.timer`, `deploy/systemd/deploy-hook.service`
  - Do: Write deploy.sh with clone→npm-ci→build→symlink→restart flow including deploy-manifest.json output. Write rollback.sh. Write pm2 ecosystem config referencing `/opt/transcript-library/current` with `.env.local` symlink step in deploy.sh. Write systemd timer for daily sweep and service units. Write LXC setup script. Write Cloudflare Tunnel config template. Write env.template covering all hosted env vars from hosted-config.ts. All paths must be consistent with the deployment plan.
  - Verify: `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh` passes with no errors
  - Done when: all 9 deploy artifacts exist, shellcheck clean, paths consistent across all files

- [x] **T02: Build deploy-hook listener and slice verification** `est:1h`
  - Why: The deploy-hook listener is the only real application code in this slice — it receives GitHub webhooks and triggers deploys. Slice verification proves all artifacts are internally consistent.
  - Files: `deploy/deploy-hook.ts`, `deploy/__tests__/deploy-hook.test.ts`, `scripts/verify-s06-deploy-artifacts.sh`
  - Do: Write deploy-hook.ts as a standalone Node HTTP server on port 9000 that verifies GitHub HMAC-SHA256 webhook signatures using `crypto.timingSafeEqual`, invokes deploy.sh on valid push events to main, and returns structured JSON responses. Write Vitest tests covering signature verification, event filtering, and rejection paths. Write the slice verification script that checks all deploy artifacts exist, paths are consistent, env template coverage matches hosted-config.ts, and shellcheck passes.
  - Verify: `npx vitest run deploy/__tests__/deploy-hook.test.ts` passes; `bash scripts/verify-s06-deploy-artifacts.sh` passes
  - Done when: deploy-hook listener has test coverage for signature verification and deploy triggering, and slice verification script confirms all artifacts are internally consistent

## Files Likely Touched

- `deploy/deploy.sh`
- `deploy/rollback.sh`
- `deploy/setup-lxc.sh`
- `deploy/ecosystem.config.cjs`
- `deploy/env.template`
- `deploy/cloudflared-config.yml`
- `deploy/deploy-hook.ts`
- `deploy/__tests__/deploy-hook.test.ts`
- `deploy/systemd/transcript-library-sweep.service`
- `deploy/systemd/transcript-library-sweep.timer`
- `deploy/systemd/deploy-hook.service`
- `scripts/verify-s06-deploy-artifacts.sh`
