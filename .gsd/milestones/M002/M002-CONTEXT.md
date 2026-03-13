# M002: Reliability + Hosted Launch — Context

**Gathered:** 2026-03-13
**Status:** Ready for planning

## Project Description

M002 turns the existing single-playlist Transcript Library into a trustworthy private hosted system. The UI is already accepted. This milestone focuses on the plumbing: analysis failures, historical artifact drift, source repo refresh reliability, daily unattended cleanup, and the real hosted Proxmox + Cloudflare launch path.

## Why This Milestone

The app already looks right, but it is not yet shippable because the core experience is not trustworthy. Users are seeing exit-code-1 analysis failures, reconciliation errors on older videos, and stale source updates. The project also has a documented Proxmox deployment direction that has not yet been proven in a live hosted flow. This milestone solves the reliability gap first, then launches the current product shape privately.

## User-Visible Outcome

### When this milestone is complete, the user can:

- open `library.aojdevstudio.me` as an approved friend and browse the library privately
- see newly synced videos appear automatically from the upstream transcript repo
- click generate analysis on a hosted video and get a successful result with durable artifacts
- understand old broken analysis state clearly and rerun it instead of seeing opaque failures

### Entry point / environment

- Entry point: browser at the private hosted domain plus unattended daily automation jobs
- Environment: hosted Proxmox LXC behind Cloudflare Tunnel / Access, with local dev used for implementation and regression checks
- Live dependencies involved: `playlist-transcripts` git repo, Cloudflare Tunnel, Cloudflare Access, Proxmox LXC runtime, local/private CLI analysis provider, persistent filesystem storage

## Completion Class

- Contract complete means: runtime artifact contracts, sync expectations, deploy paths, and access behavior are explicit and mechanically checkable
- Integration complete means: source repo refresh, hosted browse, hosted analysis, and daily automation all work across real subsystems
- Operational complete means: deploy, restart, sync, drift sweep, and rerun workflows behave correctly under real hosted lifecycle conditions

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- an approved friend can reach the private hosted app, browse synced videos, and request analysis successfully
- a newly added upstream transcript appears in the hosted library without manual repair work
- daily unattended automation can refresh source data and reduce runtime/artifact drift before users hit it
- the hosted environment writes runtime artifacts to persistent storage outside the release tree and survives restart/deploy boundaries cleanly

## Risks and Unknowns

- Analysis exit-code-1 failures may be caused by provider auth, prompt/output shape, missing binaries, or runtime environment assumptions — this can invalidate downstream launch work if not retired first
- Historical artifact drift may expose real contract gaps between old checked-in artifacts and the new runtime model — these gaps must be understood before automated repair is added
- Source repo refresh may be failing because of path assumptions, rebuild timing, or weak cross-repo contract enforcement — launch automation depends on understanding that contract precisely
- Cloudflare-managed access may satisfy the friend-login goal without app auth, but the exact low-friction behavior and operational setup still need live verification
- Hosted runtime behavior can diverge from local behavior around filesystem paths, process users, provider auth, and restart handling — end-to-end proof must happen in the real topology

## Existing Codebase / Prior Art

- `src/lib/analysis.ts` — current runtime authority for analysis execution, lifecycle, and artifact persistence
- `src/lib/runtime-reconciliation.ts` — current mismatch detection for runtime/artifact drift
- `src/app/api/analyze/route.ts` — current on-demand analysis trigger path
- `src/app/api/sync-hook/route.ts` — current webhook-triggered batch submission path
- `src/lib/hosted-config.ts` and `src/lib/private-api-guard.ts` — existing hosted-mode guardrails
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — prior deployment direction for Proxmox + Cloudflare Access OTP
- `../desktop-commander/homelab/proxmox/README.md` — current homelab/Proxmox inventory and deployment target reference
- `../desktop-commander/repos/playlist-transcripts/README.md` — upstream transcript source behavior and current single-playlist design

> See `.gsd/DECISIONS.md` for all architectural and pattern decisions — it is an append-only register; read it during planning, append to it during execution.

## Relevant Requirements

- R001 — friend access should be private and low-friction
- R002 — Proxmox deployment needs a repeatable runtime layout
- R003 — Cloudflare tunnel/access must expose the app safely
- R004 — on-demand analysis must actually work again
- R005 — historical drift must be understandable and rerunnable
- R006 — daily unattended repair sweep should make visible breakage rare
- R007 — upstream transcript updates should appear automatically
- R008 — sync and analysis remain decoupled for launch
- R009 — the contract between the two repos must be explicit and reliable
- R010 — deploy automation must be repeatable and rollback-friendly
- R011 — hosted end-to-end analysis must be proven in the real environment

## Scope

### In Scope

- root-cause analysis and repair of current analysis failure modes
- historical artifact drift repair and rerun flows
- source repo refresh and catalog update reliability
- unattended daily sync/repair automation
- Cloudflare-managed private access for friends
- Proxmox runtime layout, deploy automation, and hosted launch proof

### Out of Scope / Non-Goals

- major UI redesign or visual direction changes
- app-managed password accounts or custom auth product work
- full multi-playlist implementation beyond what is needed to avoid painting the architecture into a corner
- SaaS/public onboarding concerns

## Technical Constraints

- keep the app machine-keyed by `videoId`
- keep provider switching behind the server runtime, not the UI
- maintain observability through `status.json`, `run.json`, reconciliation records, and worker logs
- use additive migrations or repair paths rather than destructive rewrites of stored artifacts
- hosted runtime data must stay outside the mutable release tree
- launch should prefer Cloudflare-managed access before adding app-managed auth scope

## Integration Points

- `playlist-transcripts` repo — upstream transcript vault and indexes the app consumes
- Cloudflare Tunnel / Access — private ingress and approved-friend access gate
- Proxmox LXC — hosted runtime environment and deployment target
- local/private CLI provider (`claude-cli` / `codex-cli`) — analysis execution backend
- persistent filesystem under `/srv/transcript-library` — hosted storage for insights, logs, env, and source repo clone

## Open Questions

- Which exact failure mode is causing the current exit-code-1 analysis runs? — likely the first risk to retire in planning
- Should daily unattended repair rerun only clearly repairable drift cases, or broader failed-analysis cases too? — keep scope tight unless evidence says otherwise
- Which parts of deploy automation belong inside this repo versus homelab-side scripts/services? — answer should follow the clearest ownership boundary
