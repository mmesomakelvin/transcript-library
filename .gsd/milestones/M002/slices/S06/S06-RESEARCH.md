# S06: Proxmox Runtime and Release Pipeline — Research

**Date:** 2026-03-13

## Summary

S06 needs to take a thoroughly documented but entirely unbuilt deployment plan and make it real. The deployment plan at `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` has already been revised by S03 and S05 to reflect the refresh-only sync contract, two-caller-class auth guard, and Cloudflare Access browser trust model. The app's runtime storage is fully configurable via env vars (`INSIGHTS_BASE_DIR`, `CATALOG_DB_PATH`, `PLAYLIST_TRANSCRIPTS_REPO`), so the split between immutable release code and mutable runtime data is already supported in application code.

What does not exist yet: no LXC container for this app on the Proxmox host, no pm2 ecosystem config, no deploy-hook listener, no release management scripts, no systemd timer for the daily sweep, and no Cloudflare Tunnel configuration. The entire hosted infrastructure is greenfield. The existing Proxmox cluster (`aojdevserver` at 10.69.1.105) has CT 101 (webadmin) and CT 103 (docs/GPU), but no dedicated container for transcript-library.

The primary risk is not the plan — it's execution sequencing. The deploy-hook listener, Cloudflare Tunnel, pm2 process management, and daily automation timer all need to work together, and each has its own failure surface. The secondary risk is Claude CLI auth persistence under the pm2 process user — analysis spawns child processes, and CLI auth may not survive across user contexts or restarts.

## Recommendation

Implement in three task phases: (1) create the LXC container and directory layout with a manual first deploy, proving the app boots and serves on localhost:3000 inside the container; (2) wire pm2 process management, the daily sweep systemd timer, and the Cloudflare Tunnel/Access integration; (3) build the deploy-hook listener for automated releases with rollback. This sequence proves the runtime works before adding automation on top.

Keep deploy scripts inside this repo under `deploy/` rather than in the homelab repo — the deploy listener and pm2 ecosystem config are app-specific and should travel with the release.

## Don't Hand-Roll

| Problem                        | Existing Solution                               | Why Use It                                                                          |
| ------------------------------ | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| Process supervision            | pm2                                             | Already decided in deployment plan; handles restarts, startup-on-boot, log rotation |
| Tunnel ingress                 | cloudflared                                     | Already decided; Cloudflare Tunnel with Access for friend auth                      |
| Webhook signature verification | crypto.timingSafeEqual + HMAC-SHA256            | Standard GitHub webhook pattern; don't build custom auth                            |
| Daily scheduling               | systemd timer                                   | More reliable than cron on an LXC, handles missed runs, has journald logging        |
| Release directory management   | Shell script with timestamp dirs + symlink swap | Simple, proven pattern; no need for tools like Capistrano                           |

## Existing Code and Patterns

- `src/lib/hosted-config.ts` — preflight validation already checks all required env vars at startup; deploy just needs to set them correctly in `.env.local`
- `src/instrumentation.ts` — server bootstrap runs `assertPreflight()` so misconfigured deploys fail at boot with actionable messages
- `src/lib/private-api-guard.ts` — two-caller-class guard already handles Cloudflare Access browser identity and bearer machine callers; deploy wires `CLOUDFLARE_ACCESS_AUD`
- `src/lib/insight-paths.ts` — `insightsBaseDir()` respects `INSIGHTS_BASE_DIR` env var; persistent storage separation works
- `src/lib/daily-operational-sweep.ts` — sweep writes to `runtime/daily-operational-sweep/` under the parent of `INSIGHTS_BASE_DIR`; hosted layout at `/srv/transcript-library/runtime/`
- `src/lib/analysis.ts` — spawns child processes via `spawn()` for analysis providers; pm2 must not interfere with worker subprocess spawning
- `scripts/daily-operational-sweep.ts` — CLI entrypoint loads `.env.local` manually; the systemd timer must set `NODE_ENV` and working directory correctly
- `justfile` — build command is `bunx next build --webpack` (Turbopack panic workaround); deploy must use `--webpack` flag
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — the canonical deployment plan; already revised by S03/S05

## Constraints

- **Build requires `--webpack` flag** — `next build` alone triggers a Turbopack panic in the current Next version. Deploy scripts must always build with `next build --webpack` or `npm run build` which includes the flag.
- **No standalone output mode** — `next.config.ts` does not set `output: "standalone"`. The app runs via `next start`, which requires the full `node_modules/` and `.next/` tree. Deploy must `npm ci` + build in each release directory.
- **Child process spawning** — analysis uses `spawn()` for `claude-cli` / `codex-cli`. pm2 must not restrict subprocess creation, and the pm2 process user must have CLI auth configured.
- **App uses `bun` locally but deploy should use `npm`** — the Justfile uses `bun` commands, but the deployment plan specifies `npm ci` for reproducibility on the LXC. Node 22 is required.
- **`.env.local` lives outside the release tree** — at `/srv/transcript-library/.env.local`. Next.js loads `.env.local` from the working directory, so the release tree needs either a symlink or an explicit env file path mechanism.
- **Catalog DB path separation** — `CATALOG_DB_PATH` must point to `/srv/transcript-library/catalog/catalog.db` so catalog rebuilds write outside the release tree.
- **Sweep artifacts directory** — daily sweep writes to `path.dirname(INSIGHTS_BASE_DIR)/../runtime/daily-operational-sweep/`. With `INSIGHTS_BASE_DIR=/srv/transcript-library/insights`, sweep artifacts land at `/srv/transcript-library/runtime/daily-operational-sweep/`.

## Common Pitfalls

- **`.env.local` not found after symlink swap** — Next.js loads `.env.local` relative to `process.cwd()`. When pm2 restarts the app after a symlink repoint, the working directory may still be the old release. pm2 must be configured with `cwd` pointing to the `current` symlink, and `.env.local` should be symlinked from `/opt/transcript-library/current/.env.local` → `/srv/transcript-library/.env.local` in the deploy script.
- **pm2 caches the resolved symlink path** — pm2 may resolve `/opt/transcript-library/current` to the real release directory at start time. After a deploy repoints the symlink, `pm2 restart` may still use the old resolved path. Use `pm2 delete` + `pm2 start` instead of `pm2 restart` after deploy, or use an ecosystem file that always references the symlink.
- **Claude CLI auth not available to pm2 user** — Claude CLI stores auth tokens per-user (usually in `~/.claude/`). If pm2 runs as a different user than the one who authenticated, analysis will fail with auth errors. The pm2 process user must be the same user that runs `claude auth login`.
- **`npm ci` fails without `package-lock.json`** — the repo uses `bun.lock`. Deploy needs either `npm install --frozen-lockfile` or generation of `package-lock.json` as a build step. Alternatively, install bun on the LXC and use `bun install --frozen-lockfile`.
- **systemd timer working directory** — the daily sweep script loads `.env.local` from `process.cwd()`. The systemd service unit must set `WorkingDirectory=/opt/transcript-library/current`.

## Open Risks

- **Claude CLI auth persistence** — unclear whether CLI auth survives LXC reboots or how to re-authenticate without interactive terminal access. May need `ANTHROPIC_API_KEY` as a fallback, which is a separate billing path.
- **Lock file format** — repo uses `bun.lock`, not `package-lock.json`. Either install bun on the LXC or commit a `package-lock.json` for `npm ci` compatibility. Need to decide which approach.
- **GitHub webhook delivery to `library-deploy.aojdevstudio.me`** — this hostname needs its own Cloudflare Tunnel route without Access protection, and the deploy listener must verify GitHub's HMAC signature. The listener itself is a custom script that doesn't exist yet.
- **LXC resource sizing** — 2 GB RAM may be tight for `next build` + analysis child processes running concurrently. Build happens during deploy (not during analysis), so they shouldn't overlap, but worth monitoring.
- **Rollback path** — keeping the previous release directory is simple, but the catalog DB and insight artifacts are shared mutable state. A release rollback doesn't rollback data changes. Need to document what rollback means operationally.
- **Cloudflare Tunnel and Access setup** — these are manual Cloudflare dashboard operations. The agent can prepare scripts and configs but cannot provision Cloudflare resources directly. The user will need to create the tunnel, configure DNS, and set up the Access application.

## Skills Discovered

| Technology        | Skill                                                  | Status                                                                           |
| ----------------- | ------------------------------------------------------ | -------------------------------------------------------------------------------- |
| pm2               | `viteinfinite/skills@pm2-server-control` (14 installs) | available — not essential; pm2 config is straightforward for this use case       |
| Cloudflare Tunnel | `vm0-ai/vm0-skills@cloudflare-tunnel` (70 installs)    | available — could help with tunnel setup guidance                                |
| Proxmox           | existing `knowledge/technology/proxmox/` docs          | installed locally — community scripts doc, not directly relevant to LXC creation |

None of these are critical enough to require installation. The deployment plan is already specific enough to guide implementation.

## Sources

- Deployment plan covers the full architecture and directory layout (source: `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`)
- Proxmox inventory shows target host specs and existing containers (source: `../desktop-commander/homelab/proxmox/README.md`)
- Hosted config preflight already validates all required env vars (source: `src/lib/hosted-config.ts`)
- Source sync contract defines refresh entrypoints and evidence files for hosted automation (source: `docs/operations/source-repo-sync-contract.md`)
- S05 summary defines the two-caller-class auth topology the deploy must wire (source: `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md`)
- S03 summary defines the refresh contract and hosted repo expectations (source: `.gsd/milestones/M002/slices/S03/S03-SUMMARY.md`)
