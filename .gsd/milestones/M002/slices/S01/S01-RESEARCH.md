# M002 / S01 — Research

**Date:** 2026-03-13

## Summary

This slice directly owns **R004** and supports **R011**. Research focused on the on-demand analysis path end to end: route entry, catalog lookup, prompt assembly, provider execution, durable runtime artifacts, and operator-facing evidence surfaces.

The main finding is that there are **two different failure classes** currently tangled together:

1. **Route-level preconditions can fail before analysis even starts.** In this workspace, `POST /api/analyze` initially returned `500` because `data/catalog/catalog.db` was a zero-byte SQLite file, so `getVideo()` crashed on `no such table: catalog_videos`. The catalog rebuild command in `justfile` runs through **Bun**, but this repo intentionally standardized on `better-sqlite3`, and Bun currently fails on that dependency here. That means the normal app path can die before provider execution, hiding the real analysis failure.
2. **When provider execution does run, the current representative exit-code-1 failure is a provider-account problem, not a prompt-shape or spawn bug.** After rebuilding the catalog with `npx tsx scripts/rebuild-catalog.ts`, I reproduced `POST /api/analyze?videoId=RpUTF_U4kiw` successfully starting a run. The run then failed with `exitCode: 1`, and `worker-stdout.txt` captured the real provider message: **`Credit balance is too low`**. The runtime does persist useful evidence, but `run.json` and `status.json` still flatten that into the opaque error string `exit code 1` because failure summarization only inspects stderr.

Primary recommendation: treat S01 as a **runtime-contract hardening slice**, not only a provider fix. The slice needs to (a) make the analysis route reliably reachable, (b) promote provider failure evidence into the durable primary error fields, and (c) prove one successful end-to-end analysis run again after restoring a working provider path. The existing runtime scaffolding is already strong enough to reuse; the missing piece is surfacing the right evidence in the right place and eliminating the pre-spawn failure trap.

## Recommendation

Use the current runtime architecture as the base and tighten three seams:

1. **Pre-spawn dependency seam**
   - Ensure the analyze route cannot silently depend on a broken catalog snapshot.
   - At minimum, S01 implementation should account for the fact that a zero-byte or schema-less `catalog.db` currently produces a raw 500 from `getVideo()` path access.
   - This is adjacent to S03 ownership, but it is a practical blocker for S01 reproduction and verification.

2. **Provider failure evidence seam**
   - Keep `src/lib/analysis.ts` as the single runtime authority.
   - Extend failure summarization so `run.json`, `status.json`, and route payloads use the first meaningful line from **stderr or stdout**, not stderr alone.
   - Current runtime logs already contain the real cause; S01 should make the durable top-line error operator-readable without opening log files.

3. **Verification seam**
   - Add focused tests around `startAnalysis()` or the close-handler failure path to prove that provider failures with stdout-only messages become durable structured evidence.
   - Then verify one real end-to-end success path again, likely by restoring Claude provider billing/auth or explicitly switching to the already-authenticated Codex CLI path.

## Don't Hand-Roll

| Problem                               | Existing Solution                                                                                  | Why Use It                                                                                                                                                                           |
| ------------------------------------- | -------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Durable run state and retry semantics | `src/lib/analysis.ts` + `run.json`/`status.json`                                                   | Already the single authority for lifecycle, paths, attempt directories, and concurrency. S01 should strengthen it, not bypass it.                                                    |
| Operator-facing runtime evidence      | `src/lib/runtime-stream.ts` + `src/app/api/insight/route.ts` + `src/lib/runtime-reconciliation.ts` | These surfaces already publish stage, recent logs, retry guidance, and reconciliation. Promote better error summaries into them instead of inventing a parallel diagnostics channel. |
| Catalog snapshot rebuild              | `src/lib/catalog-import.ts` / `scripts/rebuild-catalog.ts`                                         | The repo already has an atomic validated rebuild path. The issue is command/runtime wiring, not lack of a rebuild implementation.                                                    |

## Existing Code and Patterns

- `src/app/api/analyze/route.ts` — on-demand entrypoint. Validates `videoId`, loads the video from the SQLite-backed catalog, reads transcript parts from the transcript repo, and calls `spawnAnalysis()`. This route currently has no protection against `getVideo()` throwing from a broken catalog snapshot.
- `src/lib/analysis.ts` — the runtime authority. Handles provider selection, prompt assembly, artifact initialization, attempt directories, log capture, and lifecycle transitions. The close-handler currently summarizes failures from stderr only, which is why a provider stdout message still becomes `error: "exit code 1"`.
- `src/lib/headless-youtube-analysis.ts` — prompt input enrichment. Depends on `PLAYLIST_TRANSCRIPTS_REPO`, transcript frontmatter, repo inbox info JSON, and optionally `yt-dlp`. Prompt setup failures are already written cleanly as `prompt setup error: ...` in the durable run record.
- `src/lib/runtime-stream.ts` — best existing evidence surface. It combines runtime snapshot, reconciliation, log tails, and retry guidance. After the reproduced failure it correctly surfaced `recentLogs: ["Credit balance is too low"]`, even while `run.json.error` remained opaque.
- `src/lib/runtime-reconciliation.ts` — useful for artifact mismatch, but not for simple failed runs. A failed provider run with no artifacts is currently `status: "ok"` in reconciliation, which is fine; S01 should not overload reconciliation with normal provider failures.
- `src/lib/catalog.ts` / `src/lib/catalog-db.ts` / `src/lib/catalog-import.ts` — the analyze route depends on this stack before any provider work happens. `openCatalogDb()` opens whatever file exists; if `catalog.db` exists but is empty, downstream queries throw `SQLITE_ERROR`.
- `justfile` — important constraint. `build`, `insights`, and likely operator workflows use Bun. `scripts/rebuild-catalog.ts` currently fails under Bun because `better-sqlite3` is unsupported in this environment, which can leave operators with a broken or unrepaired local catalog state.
- `src/lib/__tests__/runtime-compat.test.ts` — already red in this branch (`expected 'complete' to be 'complete' but got 'failed'` for the insight route compatibility case). S01 work needs to account for this existing mismatch instead of assuming the runtime test baseline is fully green.

## Constraints

- **R004 owns the real user loop.** A user must be able to click generate analysis and get a completed run with expected artifacts. S01 is not done if failure evidence is better but success remains unproven.
- **R011 support means local success is insufficient.** Provider auth/billing/runtime-user assumptions need a real proof path, not only unit tests.
- **Provider execution remains server-side and runtime-selected.** This is consistent with project rules and existing decisions; do not move provider selection into the UI.
- **Artifacts stay keyed by `videoId`.** Existing path helpers and artifact contracts rely on this; use additive evidence rather than changing identity shape.
- **Reuse canonical artifact names and attempt directories.** Decisions already locked `run.json`, `status.json`, and run-attempt folders as the durable record shape.
- **Do not trust Bun-based operator commands for SQLite rebuilds here.** The observed failure is concrete: `scripts/rebuild-catalog.ts` fails under Bun with `better-sqlite3` unsupported.

## Common Pitfalls

- **Treating every `exit code 1` as a prompt/runtime contract bug** — in the reproduced case the real root cause was provider account state (`Credit balance is too low`). Check `worker-stdout.txt` and `recentLogs`, not just `run.json.error`.
- **Debugging analysis without first verifying the catalog snapshot** — `POST /api/analyze` can fail before spawn if `catalog.db` is empty or schema-less. That yields a misleading 500 that looks like analysis is broken when the provider never ran.
- **Adding a new diagnostics surface** — the repo already has `run.json`, `status.json`, reconciliation, stream snapshots, and recent logs. The problem is evidence promotion, not lack of storage locations.
- **Assuming stderr is the only failure channel** — Claude’s low-credit failure was emitted on stdout. S01 should treat both streams as evidence sources.

## Open Risks

- **Success path still unproven after identifying the root cause.** Claude currently cannot complete a run in this environment until billing/auth is fixed. A slice-level success proof may need Codex as the temporary provider escape hatch unless the intended Claude path is restored.
- **Catalog/operator workflow is currently fragile.** If Bun remains the default script runner for rebuild paths, operators can re-break the analyze route even after S01 analysis fixes land.
- **Existing runtime compatibility coverage is not clean.** One current Vitest expectation is already failing, which may mask or complicate S01 verification unless triaged explicitly.
- **Historical status-only directories exist.** Example: the repo-local `data/insights/RpUTF_U4kiw/` initially had only `status.json`. S02 owns drift repair, but S01 implementation needs to avoid making those states more confusing.
- **Codex provider viability is only partially proven.** A trivial `codex exec` smoke test succeeded locally, but full transcript-analysis output contract compatibility has not yet been exercised.

## Skills Discovered

| Technology         | Skill                                                | Status                                                                          |
| ------------------ | ---------------------------------------------------- | ------------------------------------------------------------------------------- |
| Debugging workflow | installed `systematic-debugging`                     | installed                                                                       |
| Deep debugging     | installed `debug-like-expert`                        | installed                                                                       |
| Next.js App Router | `wshobson/agents@nextjs-app-router-patterns`         | available — `npx skills add wshobson/agents@nextjs-app-router-patterns`         |
| Vitest             | `onmax/nuxt-skills@vitest`                           | available — `npx skills add onmax/nuxt-skills@vitest`                           |
| Bun                | `sickn33/antigravity-awesome-skills@bun-development` | available — `npx skills add sickn33/antigravity-awesome-skills@bun-development` |
| Claude CLI         | `lanej/dotfiles@claude-cli`                          | available — low-signal match, not installed                                     |
| Codex CLI          | `borghei/claude-skills@codex-cli-specialist`         | available — `npx skills add borghei/claude-skills@codex-cli-specialist`         |
| better-sqlite3     | none found                                           | none found                                                                      |

## Sources

- Reproduced route-level failure: `POST /api/analyze?videoId=RpUTF_U4kiw` returned `500`, and dev-server logs showed `SqliteError: no such table: catalog_videos` from `src/app/api/analyze/route.ts` before provider spawn. Source: local runtime reproduction against `http://127.0.0.1:3000` plus dev server output.
- Verified catalog corruption state: `data/catalog/catalog.db` was zero bytes while `data/catalog/last-import-validation.json` still claimed a valid checked snapshot. Source: local filesystem inspection and `data/catalog/last-import-validation.json`.
- Verified rebuild command mismatch: `bun run scripts/rebuild-catalog.ts` failed with `better-sqlite3 is not yet supported in Bun`, while `bash -lc 'source .env.local; npx -y tsx scripts/rebuild-catalog.ts'` rebuilt the catalog successfully. Source: local command output and `scripts/rebuild-catalog.ts`, `src/lib/catalog-import.ts`, `src/lib/catalog-db.ts`, `justfile`.
- Reproduced real provider failure after catalog repair: `POST /api/analyze?videoId=RpUTF_U4kiw` started successfully, then `GET /api/analyze/status` reported `lifecycle: "failed"`, `error: "exit code 1"`. Source: local API calls against the running dev server.
- Identified root cause of exit code 1: `data/insights/RpUTF_U4kiw/worker-stdout.txt` contained `Credit balance is too low`. Source: local artifact read after reproduction.
- Identified opacity gap in durable state: `data/insights/RpUTF_U4kiw/run.json` and `status.json` persisted only `error: "exit code 1"`, while `GET /api/insight` correctly exposed `recentLogs: ["Credit balance is too low"]`. Source: local artifact reads plus `src/lib/analysis.ts`, `src/lib/runtime-stream.ts`, `src/app/api/insight/route.ts`.
- Verified missing coverage seam: no direct test currently exercises provider failure summarization through stdout-only error output. Source: code search across `src/lib/__tests__`.
- Verified existing test drift: `bun run test src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-reconciliation.test.ts src/lib/__tests__/runtime-compat.test.ts` failed in `runtime-compat.test.ts` on the insight-route compatibility expectation. Source: local test run.
- Verified alternate-provider partial viability: a trivial `codex exec` smoke test completed locally, indicating Codex auth/runtime is available even though transcript-analysis contract compatibility is still unproven. Source: local `codex exec` command output.
