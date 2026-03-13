---
id: T03
parent: S01
milestone: M002
provides:
  - a repeatable provider-backed recovery verification script for the representative video
  - a schema-constrained Codex runtime path that produces canonical analysis artifacts
  - explicit preserved evidence for the remaining Claude provider failure mode
key_files:
  - scripts/verify-s01-analysis-recovery.sh
  - src/lib/analysis.ts
  - src/lib/structured-analysis.schema.json
  - src/lib/__tests__/runtime-runs.test.ts
  - .gsd/milestones/M002/slices/S01/S01-SUMMARY.md
key_decisions:
  - Use Codex as the local recovery-proof provider because it is authenticated in this workspace, while Claude still fails on account credit.
  - Constrain Codex with a checked-in JSON schema instead of relaxing the parser or adding UI-side provider controls.
patterns_established:
  - Recovery verification rebuilds or validates the catalog, starts the local app on a controlled port, triggers `/api/analyze`, polls `/api/analyze/status`, and asserts canonical artifacts from disk.
  - Remaining provider failures are named from preserved run-attempt artifacts under `data/insights/<videoId>/runs/<runId>/`.
observability_surfaces:
  - scripts/verify-s01-analysis-recovery.sh
  - data/insights/RpUTF_U4kiw/run.json
  - data/insights/RpUTF_U4kiw/status.json
  - data/insights/RpUTF_U4kiw/analysis.json
  - data/insights/RpUTF_U4kiw/runs/20260313023408847-7f7cbb/worker-stdout.txt
duration: 1h 5m
verification_result: passed
completed_at: 2026-03-13T03:09:25Z
blocker_discovered: false
---

# T03: Prove representative analysis recovery with a real provider-backed run

**Added a repeatable recovery-proof script and a schema-constrained Codex path, then verified `RpUTF_U4kiw` completes end to end with canonical artifacts while preserving Claude’s explicit low-credit failure evidence.**

## What Happened

I chose the provider path based on actual local runtime availability rather than preference. Claude CLI was already known to fail locally on the representative video because the account returned `Credit balance is too low`, while Codex CLI was installed and authenticated.

To make Codex satisfy the app’s strict artifact contract reliably, I added `src/lib/structured-analysis.schema.json` and updated `src/lib/analysis.ts` so the server-owned Codex provider path runs `codex exec` with `--output-schema <checked-in schema>` and still writes the same canonical artifacts under `data/insights/<videoId>/`.

I added `scripts/verify-s01-analysis-recovery.sh`, which:

- validates or rebuilds the catalog
- clears blocking canonical artifacts for a clean rerun without deleting prior attempt history
- starts the local app on a controlled port with `ANALYSIS_PROVIDER=codex-cli`
- triggers `POST /api/analyze?videoId=RpUTF_U4kiw`
- polls `GET /api/analyze/status?videoId=RpUTF_U4kiw` to terminal state
- asserts `run.json`, `status.json`, `analysis.json`, `analysis.md`, and the slugged markdown artifact are present and non-empty

The representative run completed successfully as `runId: 20260313030655999-9345af` with `provider: codex-cli`, `status: complete`, and `lifecycle: completed`.

I also updated the slice summary so the next session can see both the recovered working path and the remaining non-working provider path. The preserved Claude attempt under `data/insights/RpUTF_U4kiw/runs/20260313023408847-7f7cbb/worker-stdout.txt` still names the unresolved provider failure explicitly: `Credit balance is too low`.

## Verification

Passed:

- `npx vitest run src/lib/__tests__/analyze-route.test.ts src/lib/__tests__/runtime-runs.test.ts src/lib/__tests__/runtime-compat.test.ts`
- `bash -lc 'source .env.local && npx tsx scripts/rebuild-catalog.ts'`
- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`

Observed from the real recovery run:

- analyze start returned `{"ok":true,"status":"running","outcome":"started"}`
- status polling reached `status=complete lifecycle=completed`
- `data/insights/RpUTF_U4kiw/run.json` recorded `provider: codex-cli`, `exitCode: 0`, and the schema-constrained Codex command args
- `data/insights/RpUTF_U4kiw/status.json`, `analysis.json`, `analysis.md`, and `claude-code-multi-agent-orchestration-with-opus-4-6-tmux-and-agent-sandboxes.md` all existed and were non-empty

## Diagnostics

Re-run the proof with:

- `bash scripts/verify-s01-analysis-recovery.sh RpUTF_U4kiw`

Inspect these after the run:

- `data/insights/RpUTF_U4kiw/run.json` — canonical latest successful run metadata
- `data/insights/RpUTF_U4kiw/status.json` — compatibility lifecycle mirror
- `data/insights/RpUTF_U4kiw/analysis.json` — validated structured output
- `data/insights/RpUTF_U4kiw/analysis.md` — canonical markdown artifact
- `data/insights/RpUTF_U4kiw/runs/20260313023408847-7f7cbb/run.json` and `worker-stdout.txt` — preserved Claude failure attempt and explicit low-credit message

## Deviations

None.

## Known Issues

- Claude remains non-working locally for the representative run because the provider account reports `Credit balance is too low`.
- The slice now proves a real Codex-backed recovery path, but hosted proof still needs a deliberate provider choice and environment-specific verification.

## Files Created/Modified

- `scripts/verify-s01-analysis-recovery.sh` — repeatable runtime proof for the representative analysis recovery flow.
- `src/lib/analysis.ts` — adds the Codex output-schema constraint while keeping provider selection inside the server runtime.
- `src/lib/structured-analysis.schema.json` — defines the strict JSON contract for Codex-backed analysis output.
- `src/lib/__tests__/runtime-runs.test.ts` — verifies the shipped schema artifact used by the Codex path.
- `.gsd/milestones/M002/slices/S01/S01-SUMMARY.md` — records the recovered success path and the remaining Claude failure mode.
