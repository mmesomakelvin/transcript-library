# Transcript Library

## What This Is

Transcript Library is a private, desktop-first web app for a small friend group to browse a shared YouTube playlist, read transcripts, watch videos, and review AI-generated insight artifacts. It runs as a Next.js App Router workspace with SQLite-backed catalog, JSON-first insight artifacts, durable analysis lifecycle, and a private API boundary — deployed on a Proxmox LXC container behind a private tunnel.

## Core Value

The library must stay fast and trustworthy for private knowledge browsing and analysis, even as the catalog grows and runtime analysis moves onto a hosted Proxmox container.

## Requirements

### Validated

- ✓ Browse the video catalog by home, channel, and per-video pages — existing
- ✓ Read transcript content and transcript parts from the shared transcript repository — existing
- ✓ Trigger headless transcript analysis through local CLI providers — existing
- ✓ Store insight artifacts on disk keyed by `videoId` with operational files such as `status.json`, `run.json`, and worker logs — existing
- ✓ Render structured video workspaces that combine player, transcript, and analysis surfaces in the current UI — existing
- ✓ Expose private internal API routes for catalog, transcript, insight, and analysis workflows inside a trusted environment — existing
- ✓ Configurable `INSIGHTS_BASE_DIR` so runtime data can live outside the deployed app tree — M001/S01
- ✓ Strict `analysis.json` contract with validated structured UI reads and markdown report preservation — M001/S01
- ✓ SQLite-backed catalog replacing synchronous CSV parsing with indexed queries — M001/S02
- ✓ Private-deployment safety: shared API guard, webhook replay protection, preflight validation — M001/S04
- ✓ Durable analysis lifecycle with attempt-aware runs, batch visibility, and restart-safe reconciliation — M001/S03
- ✓ Reduced synchronous filesystem IO in hot request paths — M001/S02
- ✓ Scale validated at 1000+ videos with 25×–250× headroom through benchmark evidence — M001/S04
- ✓ Catalog and artifact validation, reconciliation, and defensive path handling — M001/S01–S03
- ✓ Focused automated coverage across analysis lifecycle, catalog, artifacts, and critical API behaviors — M001/S01–S04
- ✓ Deploy-time environment validation catches misconfiguration before user-triggered flows — M001/S04
- ✓ SQLite committed as storage model; architecture validated through ~5000 videos with documented escalation triggers — M001/S04

### Active

(none — all M001 requirements validated)

### Out of Scope

- UI redesign or major visual direction changes — the current UI is already meeting expectations and this cycle is focused on architecture
- Public SaaS-style onboarding, billing, or multi-tenant account management — this remains a private internal tool for a small friend group
- Moving provider selection into the UI — provider switching should remain behind the server runtime
- Replacing `videoId` as the machine key for artifacts and runtime operations — current storage and workflow assumptions depend on that stable identifier

## Context

The app is a brownfield Next.js App Router codebase with React 19, TypeScript, Tailwind, SQLite-backed catalog (via better-sqlite3), JSON-first insight artifacts, and local CLI-based analysis providers. Catalog metadata comes from a SQLite database rebuilt from the shared `PLAYLIST_TRANSCRIPTS_REPO`, while insight artifacts live under a configurable `INSIGHTS_BASE_DIR` (defaulting to `data/insights/<videoId>/`).

The deployment target is a private Proxmox LXC container exposed through a private tunnel. All API routes are guarded by `PRIVATE_API_TOKEN` in hosted mode. Server startup validates prerequisites via `instrumentation.ts` preflight. Local dev remains zero-config.

## Architecture Summary (post-M001)

- **Catalog**: SQLite via better-sqlite3, rebuilt explicitly through `scripts/rebuild-catalog.ts`, cached by mtime + validation report version
- **Insights**: JSON-first (`analysis.json` authoritative, `analysis.md` as human-readable report), configurable base dir, legacy migration complete
- **Runtime**: Durable `run.json` per video with attempt identity, batch records for automation, artifact reconciliation with mismatch detection
- **Hosting**: `PRIVATE_API_TOKEN` guard on all routes, `sanitizePayload()` for response safety, `instrumentation.ts` preflight
- **Scale**: Validated through ~5000 videos; escalation triggers documented in `docs/operations/hosted-scale-validation.md`
- **Tests**: ~98 Vitest tests covering paths, contracts, catalog, runtime lifecycle, access control, and scale

## Constraints

- **Deployment**: Private Proxmox LXC hosting with tunnel-based access
- **Performance**: Sub-400 ms page/API responses for common private usage — validated with benchmark evidence
- **UI Stability**: Preserve the current interface and user experience
- **Storage Model**: `videoId` as machine key, human-readable markdown artifacts alongside structured JSON
- **Runtime Providers**: Analysis via local/private CLI tools, compatible with future worker separation
- **Migration Strategy**: Additive migrations over destructive rewrites
- **Observability**: Durable `run.json`, `status.json`, `reconciliation.json`, worker logs, and SSE stream snapshots

## Key Decisions

| Decision                                                                        | Rationale                                                                  | Outcome |
| ------------------------------------------------------------------------------- | -------------------------------------------------------------------------- | ------- |
| Keep the existing UI direction stable                                           | User is happy with current interface; this cycle focused on infrastructure | ✓ Done  |
| Configurable insights storage and structured analysis.json as prerequisite work | Unblocks Proxmox deployment and improves runtime/data quality              | ✓ Done  |
| Move catalog indexing from CSV to SQLite                                        | Indexed queries replace synchronous full-catalog parsing                   | ✓ Done  |
| Treat the concerns inventory as active scope                                    | Harden the brownfield system comprehensively                               | ✓ Done  |
| Keep the app private behind trusted access                                      | Matches the repo's actual audience and deployment model                    | ✓ Done  |
| SQLite + filesystem as committed storage model                                  | Validated through ~5000 videos with documented escalation triggers         | ✓ Done  |
| One shared PRIVATE_API_TOKEN for all API routes                                 | Simple, zero-config local dev, sufficient for private deployment           | ✓ Done  |

## Completed Milestones

- **M001: Migration** (2026-03-09 → 2026-03-12) — Hardened storage, runtime, and hosting architecture across 4 slices (Artifact Foundations, SQLite Catalog, Durable Runtime, Hosted Hardening). All 27 requirements validated.

---

_Last updated: 2026-03-12 after M001 completion_
