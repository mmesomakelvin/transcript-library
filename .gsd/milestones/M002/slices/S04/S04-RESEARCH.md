# S04 — Research

**Date:** 2026-03-13

## Summary

S04 owns **R006** directly and materially supports **R005, R007, R008, and R009**. The slice does not need new core repair logic or new source-sync logic; both boundaries already exist and are narrower than they first look. S02 established that unattended repair is only safe for the single-reason `missing-structured-analysis` class, while S03 established that unattended source automation is refresh-only and must not auto-start analysis. That means the slice is really about **orchestration and evidence**: one daily job that runs the supported refresh entrypoint, runs the conservative repair inventory, and persists a combined operator-readable record of what changed, what was repaired, and what still needs a manual rerun.

The repo already contains most building blocks: `scripts/refresh-source-catalog.ts`, `src/lib/source-refresh.ts`, `scripts/repair-historical-artifacts.ts`, `src/lib/runtime-reconciliation.ts`, hosted preflight checks, and slice-level verification harnesses for both S02 and S03. What is missing is the thing S04 actually promises: a single unattended sweep entrypoint plus a durable sweep artifact. There is also a misleading existing script, `scripts/nightly-insights.ts`, that starts analysis work and writes artifacts to the stale `docs/ops/artifacts/` path. It is useful as evidence of older operator intent, but it is not a safe foundation for S04 because it conflicts with the launch decision to keep ingestion and analysis decoupled.

## Recommendation

Implement S04 as a **new daily sweep orchestrator** that composes the existing refresh and historical-repair contracts rather than extending `scripts/nightly-insights.ts`.

Recommended shape:

1. run `refreshSourceCatalog()` through a new sweep entrypoint instead of shelling into ad hoc git commands
2. run `repairHistoricalArtifacts()` immediately after refresh
3. persist one sweep artifact under shared runtime storage with:
   - sweep start/end timestamps
   - refresh outcome/phase/evidence pointers
   - repair counts and per-video results
   - explicit list of `rerun-needed` videos that were intentionally not auto-fixed
   - top-level outcome summarizing whether the sweep was clean, partially repaired, or left manual follow-up
4. keep analysis out of the unattended daily sweep unless a later slice explicitly broadens scope

Why this approach fits the existing contract:

- it satisfies **R006** without violating **R008**
- it reuses the safe machine boundary from S02 (`operatorEvidence`)
- it reuses the hosted/operator refresh contract from S03 (`last-source-refresh.json`, `last-import-validation.json`)
- it gives S06 a single command for cron/systemd to run on Proxmox
- it leaves room for later optional analysis workflows without making daily automation silently expensive or unsafe

## Don't Hand-Roll

| Problem                                                        | Existing Solution                                                                    | Why Use It                                                                                                                                |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Refreshing the transcript source repo safely                   | `src/lib/source-refresh.ts` via `scripts/refresh-source-catalog.ts`                  | Already handles repo inspection, explicit branch/remote logic, fast-forward-only updates, catalog rebuilds, and durable refresh evidence. |
| Detecting runtime drift and safe in-place historical repair    | `scripts/repair-historical-artifacts.ts` + `src/lib/runtime-reconciliation.ts`       | Already encodes the safe/unsafe repair boundary and produces machine-readable `operatorEvidence`.                                         |
| Hosted preflight validation for unattended refresh assumptions | `src/lib/hosted-config.ts`                                                           | Already checks the transcript repo shape and warns when refresh evidence files are missing.                                               |
| End-to-end proof for source refresh and repair boundaries      | `scripts/verify-s03-source-refresh.sh` and `scripts/verify-s02-historical-repair.sh` | Already prove the two halves of the sweep contract separately; S04 should compose rather than replace them.                               |

## Existing Code and Patterns

- `scripts/refresh-source-catalog.ts` — supported CLI refresh entrypoint. Loads `.env.local`, calls `refreshSourceCatalog()`, exits non-zero on failure, and prints machine-readable JSON.
- `src/lib/source-refresh.ts` — authoritative source refresh contract. It inspects the checkout, fetches, fast-forwards, rebuilds SQLite, restores the previous validation report on rebuild failure, and writes `last-source-refresh.json`.
- `scripts/repair-historical-artifacts.ts` — conservative unattended repair entrypoint. Repairs only `missing-structured-analysis` and marks all unsafe states as `rerun-needed`.
- `src/lib/runtime-reconciliation.ts` — authoritative mismatch engine. Writes `reconciliation.json` and defines the reason-code taxonomy S04 should report, not reinterpret.
- `src/lib/hosted-config.ts` — hosted startup checks for `PLAYLIST_TRANSCRIPTS_REPO`, git checkout validity, branch ambiguity, and missing refresh evidence files.
- `docs/operations/source-repo-sync-contract.md` — canonical operator doc for refresh-only sync, durable evidence, and same-machine cron/systemd usage.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — deployment plan already expects a host-local refresh-only cron/systemd timer and shared runtime storage under `/srv/transcript-library/`.
- `scripts/verify-s02-historical-repair.sh` — authoritative proof of the historical repair boundary: safe `repaired` vs unsafe `rerun-needed`.
- `scripts/verify-s03-source-refresh.sh` — authoritative proof that refresh updates browse state and raw transcript reads without creating analysis artifacts.
- `scripts/nightly-insights.ts` — older batch-analysis script. Useful as a warning, not a reuse target: it starts analyses and writes to `docs/ops/artifacts/`, which conflicts with the documented `docs/operations/artifacts/` path and the launch-time decoupling decision.
- `src/lib/runtime-batches.ts` — existing batch-analysis machinery. Relevant mainly as something S04 should avoid binding itself to unless the scope intentionally expands beyond refresh + repair.

## Constraints

- S04 owns **R006** and must support **R005, R007, R008, and R009** without weakening their boundaries.
- Refresh must remain **refresh-only**. Daily automation can refresh source state, but it must not silently turn into background analysis of newly synced videos.
- Auto-repair is intentionally narrow. Safe unattended repair is only the single-reason `missing-structured-analysis` mismatch class; `artifacts-without-run` remains rerun-only.
- The app stays machine-keyed by `videoId`; sweep artifacts should reference videos by `videoId` and reuse per-video runtime records rather than inventing a new identity model.
- Hosted runtime data must live outside the release tree. Daily sweep evidence should land under shared runtime storage, not under mutable release code paths.
- Operators need durable evidence. The slice should prefer JSON artifacts and stable paths over transient logs or implicit success.
- S04 needs to give S06 a single scheduler-safe command. Proxmox docs already point toward cron/systemd on the app host.

## Common Pitfalls

- **Reusing `scripts/nightly-insights.ts` as the daily sweep** — That script starts analysis work and therefore violates the current launch boundary. Build a new orchestrator instead of stretching the old nightly batch.
- **Treating artifact presence as proof of health** — S02 already proved this is unsafe. `analysis.md` can exist without durable run authority. Key off `reconciliation.json`, `run.json`, and `operatorEvidence`, not markdown presence alone.
- **Writing sweep output into repo docs paths** — Daily operational evidence belongs under shared runtime storage, not under `docs/` in the release tree.
- **Assuming refresh success implies the whole sweep succeeded** — Refresh and repair are separate phases. A sweep record needs explicit per-phase outcomes and a top-level summary.
- **Attempting to auto-fix rerun-only mismatches** — `artifacts-without-run` must remain visible and manual-rerun oriented. Synthesizing `run.json` or similar history would violate the S02 contract.
- **Relying on stale repo references** — README and the old nightly script still imply analysis-oriented automation. S04 implementation should follow the newer S02/S03 contracts instead.
- **Using ad hoc git commands in a scheduler wrapper** — `src/lib/source-refresh.ts` already handles branch ambiguity, fast-forward-only behavior, and evidence writes. Reuse it.

## Open Risks

- There is currently no unified sweep artifact schema. If S04 does not define one cleanly, operators will still need to inspect multiple unrelated files to understand what happened overnight.
- The repo contains stale operational references (`README.md`, `scripts/nightly-insights.ts`, `justfile`, `package.json`) that still frame analysis batching as a normal automation path. Leaving that ambiguity in place could undermine S04’s contract.
- `reconciliation.json` is persisted on shared reconcile reads. S02 noted that some resolved states only become durable after a later read path, which may matter if S04 ever expands beyond in-place repairs.
- No scheduler unit/timer files currently exist in the repo. S04 can provide the command contract, but S06 likely still owns the final host-level systemd/cron wiring.
- Existing nightly artifact path references are inconsistent: move-map docs say `docs/operations/artifacts/`, but `scripts/nightly-insights.ts` still writes to `docs/ops/artifacts/`.

## Skills Discovered

| Technology                            | Skill                                                                          | Status                                                                                         |
| ------------------------------------- | ------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| Next.js                               | `wshobson/agents@nextjs-app-router-patterns`                                   | available via `npx skills add wshobson/agents@nextjs-app-router-patterns`                      |
| Next.js                               | `sickn33/antigravity-awesome-skills@nextjs-best-practices`                     | available via `npx skills add sickn33/antigravity-awesome-skills@nextjs-best-practices`        |
| systemd timers / Linux service wiring | `bagelhole/devops-security-agent-skills@systemd-services`                      | available via `npx skills add bagelhole/devops-security-agent-skills@systemd-services`         |
| systemd timers / Linux ops            | `ancoleman/ai-design-components@administering-linux`                           | available via `npx skills add ancoleman/ai-design-components@administering-linux`              |
| Cloudflare Tunnel                     | `vm0-ai/vm0-skills@cloudflare-tunnel`                                          | available via `npx skills add vm0-ai/vm0-skills@cloudflare-tunnel`                             |
| S04 core repo logic                   | no directly installed specialist skill beyond existing repo/GSD process skills | installed skills list does not include a dedicated Next.js/systemd/Cloudflare automation skill |

## Sources

- S04 requirement ownership/support mapping and slice promise came from the preloaded milestone roadmap and requirements context. (source: inlined GSD context)
- Safe auto-repair boundary and `operatorEvidence` contract came from `.gsd/milestones/M002/slices/S02/S02-SUMMARY.md`. (source: preloaded slice summary)
- Refresh-only source-sync boundary and hosted evidence contract came from `.gsd/milestones/M002/slices/S03/S03-SUMMARY.md`. (source: preloaded slice summary)
- Refresh CLI behavior came from `scripts/refresh-source-catalog.ts`. (source: repo file)
- Refresh lifecycle, failure phases, and durable record structure came from `src/lib/source-refresh.ts`. (source: repo file)
- Historical repair scope, action types, and machine-readable operator evidence came from `scripts/repair-historical-artifacts.ts`. (source: repo file)
- Reconciliation reason taxonomy and persistence behavior came from `src/lib/runtime-reconciliation.ts`. (source: repo file)
- Existing batch-analysis behavior and request dedupe came from `src/lib/runtime-batches.ts` and `src/lib/__tests__/runtime-batches.test.ts`. (source: repo files)
- Hosted refresh assumptions and missing-evidence warnings came from `src/lib/hosted-config.ts`. (source: repo file)
- Canonical operator refresh contract and same-machine cron/systemd guidance came from `docs/operations/source-repo-sync-contract.md`. (source: repo file)
- Proxmox deployment expectations for shared storage and host-local timer wiring came from `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`. (source: repo file)
- Nightly automation drift and stale artifact path mismatch came from `scripts/nightly-insights.ts`, `docs/architecture/move-map.md`, `README.md`, `justfile`, and `package.json`. (source: repo files)
