# Project

## What This Is

Transcript Library is a private, desktop-first web app for a small friend group to browse curated YouTube transcript collections, watch source videos, read transcripts, and run AI analysis on demand. It currently runs as a Next.js App Router app with a SQLite-backed catalog, filesystem-based runtime artifacts, and local CLI providers for analysis. The next phase is to make the existing single-playlist system trustworthy enough to ship privately on Proxmox behind Cloudflare access, then extend it later to support multiple playlist pipelines.

## Core Value

Friends can open one private library, see newly synced videos, and reliably trigger useful analysis without fighting broken runtime state or scattered source repositories.

## Current State

M001 is complete. The app already has:

- a stable UI the user wants to preserve
- SQLite-backed catalog reads instead of hot-path CSV parsing
- JSON-first analysis artifacts with `analysis.json` as the structured authority
- durable runtime lifecycle artifacts (`run.json`, `status.json`, reconciliation records, logs)
- hosted-mode preflight checks and a private API token boundary
- documentation for the intended Proxmox + Cloudflare deployment direction

What is not yet proven in real use:

- analysis generation is still failing for some runs
- historical artifacts have reconciliation drift in the checked-in data set
- source repo updates are not feeding the app reliably enough
- Proxmox deployment, Cloudflare access, and unattended daily automation are not yet operationalized
- multi-playlist ingestion is not yet built

## Architecture / Key Patterns

- **Frontend/runtime:** Next.js 16 App Router, React 19, TypeScript, Tailwind
- **Catalog authority:** SQLite via `better-sqlite3`, rebuilt from `PLAYLIST_TRANSCRIPTS_REPO`
- **Runtime authority:** `src/lib/analysis.ts` and related runtime modules own run lifecycle, artifacts, and reconciliation
- **Artifact model:** `videoId` remains the machine key; `analysis.json` is authoritative, `analysis.md` remains the human-readable report
- **Hosting model:** private hosted deployment on Proxmox LXC with persistent runtime data outside the release tree
- **Source integration:** transcript data comes from the separate `playlist-transcripts` repo, currently single-playlist upstream
- **Security direction:** keep the app private; use Cloudflare-managed outer access for friends rather than building SaaS-style app auth first

## Capability Contract

See `.gsd/REQUIREMENTS.md` for the explicit capability contract, requirement status, and coverage mapping.

## Milestone Sequence

- [x] M001: Migration — Harden storage, catalog, runtime, and hosted readiness foundations
- [ ] M002: Reliability + Hosted Launch — Fix runtime failures, restore sync trust, and launch privately on Proxmox
- [ ] M003: Multi-Playlist Expansion — Add a repeatable multi-source ingest model with configurable collection exposure
