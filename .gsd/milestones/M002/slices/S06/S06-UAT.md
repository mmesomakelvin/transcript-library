# S06: Proxmox Runtime and Release Pipeline — UAT

**Milestone:** M002
**Written:** 2026-03-13

## UAT Type

- UAT mode: artifact-driven
- Why this mode is sufficient: This slice produces deploy tooling artifacts verified for internal consistency. Real Proxmox runtime proof is S07's scope. UAT validates artifact correctness, test coverage, and the verification gate.

## Preconditions

- Repository checked out with all deploy/ artifacts present
- Node.js and npm available for running Vitest
- shellcheck installed (`brew install shellcheck` on macOS)
- No active process on port 9000 (for manual deploy-hook testing, if desired)

## Smoke Test

Run `bash scripts/verify-s06-deploy-artifacts.sh` — should print 30 checks, all passing, and exit 0.

## Test Cases

### 1. All deploy artifacts exist on disk

1. Run `ls deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh deploy/ecosystem.config.cjs deploy/env.template deploy/cloudflared-config.yml deploy/deploy-hook.ts deploy/systemd/deploy-hook.service deploy/systemd/transcript-library-sweep.service deploy/systemd/transcript-library-sweep.timer`
2. **Expected:** All 10 files listed without errors

### 2. Shell scripts pass shellcheck

1. Run `shellcheck deploy/deploy.sh deploy/rollback.sh deploy/setup-lxc.sh`
2. **Expected:** No output (clean pass), exit code 0

### 3. Deploy-hook webhook tests pass

1. Run `npx vitest run deploy/__tests__/deploy-hook.test.ts`
2. **Expected:** 15/15 tests pass — covers HMAC signature verification (valid, invalid, missing, wrong format, wrong secret), method filtering (405 on GET), event filtering (ignores non-push), branch filtering (ignores non-main pushes), valid deploy trigger (202 response), and concurrent deploy rejection (409)

### 4. Slice verification script validates consistency

1. Run `bash scripts/verify-s06-deploy-artifacts.sh`
2. **Expected:** 30/30 checks pass including:
   - All 10 artifact files exist
   - shellcheck passes on 3 shell scripts
   - Release paths reference `/opt/transcript-library/` consistently
   - No release paths leak into `/srv/transcript-library/`
   - env.template covers all vars from `src/lib/hosted-config.ts`
   - systemd units specify `User=deploy` and correct `WorkingDirectory`
   - ecosystem.config.cjs cwd matches deployment plan

### 5. Deploy script includes deploy-manifest.json output

1. Run `grep -c 'deploy-manifest' deploy/deploy.sh`
2. **Expected:** At least 1 match — deploy.sh writes manifest JSON with timestamp, gitSha, and buildStatus

### 6. Rollback script preserves previous release path

1. Run `grep 'ln -sfn' deploy/rollback.sh`
2. **Expected:** Shows atomic symlink repoint to previous release directory

### 7. Cloudflare Tunnel config has both routes

1. Run `grep 'hostname:' deploy/cloudflared-config.yml`
2. **Expected:** Two hostnames — `library.aojdevstudio.me` (app on :3000) and `library-deploy.aojdevstudio.me` (deploy-hook on :9000)

### 8. pm2 ecosystem config points to current symlink

1. Run `grep 'cwd' deploy/ecosystem.config.cjs`
2. **Expected:** cwd is `/opt/transcript-library/current`

### 9. Systemd sweep timer fires daily

1. Run `grep 'OnCalendar' deploy/systemd/transcript-library-sweep.timer`
2. **Expected:** `*-*-* 03:00:00` (daily at 3 AM)

### 10. Env template covers hosted-config.ts vars

1. Run `grep -oE '[A-Z_]+' src/lib/hosted-config.ts | sort -u` and cross-reference with `grep -oE '^[A-Z_]+' deploy/env.template | sort -u`
2. **Expected:** Every env var referenced in hosted-config.ts appears in env.template

## Edge Cases

### Deploy-hook rejects GET requests

1. Run the deploy-hook test suite — the "rejects non-POST" test verifies 405 on GET
2. **Expected:** 405 Method Not Allowed

### Deploy-hook rejects concurrent deploys

1. The test suite simulates a lock file already present when a second valid webhook arrives
2. **Expected:** 409 Conflict with structured JSON explaining deploy already in progress

### Deploy-hook ignores non-main branch pushes

1. The test suite sends a valid webhook with `refs/heads/develop`
2. **Expected:** 200 OK with "ignoring push to non-main branch" — no deploy triggered

### Verification script catches missing artifacts

1. Temporarily rename one deploy artifact (e.g., `mv deploy/deploy.sh deploy/deploy.sh.bak`)
2. Run `bash scripts/verify-s06-deploy-artifacts.sh`
3. **Expected:** Script reports failure, exits non-zero
4. Restore: `mv deploy/deploy.sh.bak deploy/deploy.sh`

## Failure Signals

- `verify-s06-deploy-artifacts.sh` exits non-zero or reports fewer than 30 passing checks
- Vitest deploy-hook tests fail or discover fewer than 15 tests
- shellcheck reports warnings or errors on any shell script
- Path references to `/opt/transcript-library/` or `/srv/transcript-library/` are inconsistent across files
- env.template is missing vars that hosted-config.ts references

## Requirements Proved By This UAT

- R002 (Proxmox deployment with repeatable runtime layout) — artifacts exist with correct directory layout separation
- R010 (Hosted deploy automation is unattended, repeatable, and rollback-friendly) — deploy, rollback, and webhook scripts verified for correctness
- R003 (Cloudflare tunnel and access gate) — tunnel config template with correct routes verified

## Not Proven By This UAT

- Real Proxmox LXC provisioning and runtime behavior (S07)
- Real Cloudflare Tunnel connection and DNS routing (S07)
- Real pm2 process supervision under systemd (S07)
- Real GitHub webhook delivery to deploy-hook (S07)
- Real daily sweep execution via systemd timer (S07)
- End-to-end friend access through the deployed topology (S07)

## Notes for Tester

- This is artifact-driven UAT — everything runs locally against the repo contents. No Proxmox or Cloudflare infrastructure needed.
- The deploy-hook tests mock `child_process.spawn` so no actual deploy.sh execution happens during testing.
- If shellcheck is not installed, install it first: `brew install shellcheck` on macOS or `apt-get install shellcheck` on Debian/Ubuntu.
