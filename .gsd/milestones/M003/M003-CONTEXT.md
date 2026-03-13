# M003: Multi-Playlist Expansion — Context

**Gathered:** 2026-03-13
**Status:** Ready for future planning

## Project Description

M003 extends Transcript Library from a single upstream playlist pipeline into a repeatable multi-playlist system. The goal is not only to ingest more videos, but to let each source collection be surfaced either as its own top-level section or as part of the shared library, while preserving the existing machine-key and runtime conventions.

## Why This Milestone

The current upstream `playlist-transcripts` repo is built around one playlist. The user wants to add more collections soon after launch, including examples like `spirit-talk`. If the ingest model stays single-source, every new playlist becomes a custom one-off. This milestone creates the durable expansion path after the hosted launch is stable.

## User-Visible Outcome

### When this milestone is complete, the user can:

- add another playlist pipeline without redesigning the app
- decide whether a collection gets its own route or is blended into the shared library
- browse content with collection identity preserved without breaking existing `videoId`-keyed behaviors

### Entry point / environment

- Entry point: operator workflow spanning upstream playlist configuration and the app’s library routes
- Environment: same private hosted runtime established by M002, plus updated upstream transcript ingestion pipeline(s)
- Live dependencies involved: `playlist-transcripts` repo or its successor ingest model, app catalog refresh path, hosted runtime, route and collection configuration

## Completion Class

- Contract complete means: the multi-playlist data model, routing choices, and operator workflow are explicit and testable
- Integration complete means: at least one additional playlist can flow from upstream ingest into the hosted library in the configured presentation mode
- Operational complete means: adding a playlist is documented, repeatable, and does not require bespoke code surgery for every new source

## Final Integrated Acceptance

To call this milestone complete, we must prove:

- a second playlist can be added through a repeatable operator workflow
- the resulting collection can be exposed either as its own top-level route or mixed into the shared library according to configuration
- existing single-playlist content and `videoId`-keyed runtime behavior continue to work after the expansion

## Risks and Unknowns

- The upstream transcript repo currently assumes one playlist, so the real shape of multi-source support may require changes in that repo as well as this app
- `videoId` remains the machine key, so collection/source identity must be added without destabilizing artifact and catalog assumptions
- Route design can create product sprawl if collection identity and shared browse behavior are not separated cleanly
- Sync automation and repair logic from M002 may need to evolve once multiple upstream pipelines exist

## Existing Codebase / Prior Art

- `../desktop-commander/repos/playlist-transcripts/README.md` — upstream repo already lists multi-playlist support on its roadmap and documents the current single-playlist pipeline
- `src/modules/catalog` and `src/lib/catalog-*` — current catalog authority that will eventually need collection/source semantics
- current route structure under `src/app` — existing browse surfaces that may gain collection-aware behavior later
- `AGENTS.md` project rules — keep the app machine-keyed by `videoId`, keep provider switching behind the server runtime, write human-readable slugged markdown alongside machine-keyed artifacts

> See `.gsd/DECISIONS.md` for all architectural and pattern decisions — it is an append-only register; read it during planning, append to it during execution.

## Relevant Requirements

- R012 — multi-playlist ingestion model without redesigning the app
- R013 — playlist can be top-level or mixed into shared library
- R014 — preserve collection/source identity alongside `videoId`
- R015 — operator workflow for adding a playlist is straightforward and documented
- R203 — concrete second collection rollout remains deferred until capability exists

## Scope

### In Scope

- multi-playlist ingest model and source identity
- collection presentation rules and route strategy
- operator workflow and documentation for adding playlists
- compatibility with the hosted runtime and automation delivered by M002

### Out of Scope / Non-Goals

- changing the private-hosted product into a general public content platform
- replacing `videoId` as the machine key
- large-scale UI redesign unrelated to collection exposure needs
- speculative many-tenant collection management

## Technical Constraints

- preserve existing runtime/artifact conventions keyed by `videoId`
- avoid coupling provider/runtime logic to collection presentation
- prefer additive catalog and source-model evolution over destructive rewrites
- keep the expansion path compatible with the private hosted deployment model proved in M002

## Integration Points

- upstream transcript ingest repo(s) — playlist definition and transcript generation
- app catalog/database layer — collection-aware indexing and queries
- app routes and browse surfaces — dedicated collection pages and/or mixed library views
- hosted automation — sync, repair, and deploy workflows that must continue working with multiple sources

## Open Questions

- Should multi-playlist support live entirely in the current upstream repo, or should a thinner per-source contract feed this app from multiple repos/configs? — planning should answer from the evidence
- What is the cleanest operator-facing abstraction for “new playlist becomes top-level route” versus “new playlist merges into shared library”? — this needs product and data-model alignment
