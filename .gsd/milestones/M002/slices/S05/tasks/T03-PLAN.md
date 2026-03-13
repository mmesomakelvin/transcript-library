---
estimated_steps: 3
estimated_files: 5
---

# T03: Publish the hosted access topology for friends, sync, and deploy automation

**Slice:** S05 — Hosted Auth and Access Shape
**Milestone:** M002

## Description

Document the access shape chosen by S05 so S06 can wire real hostnames and Cloudflare resources without guessing. The docs should clearly separate human browser access, same-machine/internal automation, and any external automation that must traverse Cloudflare.

## Steps

1. Update the source-sync, architecture, and self-hosted deployment docs to state that `library.aojdevstudio.me` is the friend-facing Cloudflare Access hostname, browser API calls rely on Cloudflare-managed identity rather than app-managed secrets, and unattended automation must use bearer tokens only on supported machine entrypoints.
2. Clarify the supported machine-access story for `/api/sync-hook`, deploy hooks, and any future automation that crosses the edge, including when Cloudflare service tokens or a dedicated automation hostname are required.
3. Capture the final slice contract in `S05-SUMMARY.md` so downstream slices inherit one stable statement of the access boundary and proof surface.

## Must-Haves

- [ ] The docs no longer imply that a bearer token alone is sufficient on the friend-facing Access-protected hostname.
- [ ] Downstream deployment work has one explicit topology for human access, machine access, and the non-goal of app-managed auth.

## Verification

- `rg -n "Cloudflare Access|service token|library\.aojdevstudio\.me|deploy hostname|friend-facing|browser access|machine access" docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md docs/architecture/system-overview.md README.md`
- Review `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` to confirm it records the same caller-class split proved by T01-T02.

## Observability Impact

- Signals changed: the operator-facing docs and slice summary now expose one explicit hosted topology for friend-facing browser access, machine-only bearer entrypoints, and edge-crossing automation that requires Cloudflare service tokens or a dedicated automation hostname.
- How to inspect later: run the task verification `rg` against the four docs, then read `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` for the final caller-class contract and proof surfaces inherited from T01-T02.
- Failure states made visible: documentation drift that implies bearer-only access works on `library.aojdevstudio.me`, ambiguity about whether `/api/sync-hook` or deploy hooks may cross the Access-protected hostname, and missing guidance for future machine callers that need Cloudflare service tokens or a separate hostname.

## Inputs

- `docs/operations/source-repo-sync-contract.md` — current sync contract that still needs an Access-aware automation story.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — deployment plan that already points toward separate friend-facing and deploy hostnames.
- Results from T01-T02 — the locked caller-class contract and hosted proof that the docs must describe truthfully.

## Expected Output

- `docs/operations/source-repo-sync-contract.md` — access-aware sync/deploy automation guidance.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — deployment topology aligned to the chosen Cloudflare/browser-vs-machine split.
- `docs/architecture/system-overview.md` — architecture description that names the two hosted caller classes.
- `README.md` — concise operator-facing pointer to the hosted access model.
- `.gsd/milestones/M002/slices/S05/S05-SUMMARY.md` — slice closure summary for S06/S07 consumers.
