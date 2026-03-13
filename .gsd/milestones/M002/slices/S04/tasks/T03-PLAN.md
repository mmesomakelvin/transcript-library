---
estimated_steps: 4
estimated_files: 6
---

# T03: Make the unattended operator contract unambiguous in commands and docs

**Slice:** S04 — Daily Operational Sweep and Repair Automation
**Milestone:** M002

## Description

Close the operator-facing ambiguity left by older nightly-analysis affordances. This task makes the new daily sweep the clear unattended default in repo commands and docs while preserving any explicit analysis workflow as opt-in rather than accidental launch behavior.

## Steps

1. Update `README.md`, `docs/operations/source-repo-sync-contract.md`, and `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` so the unattended default is the new daily sweep command, the durable sweep artifact is named explicitly, and manual follow-up behavior for rerun-only videos is documented.
2. Add the daily sweep command to `justfile` and `package.json`, keeping the command scheduler-safe and aligned with the supported `node --import tsx ...` runtime.
3. Demote `scripts/nightly-insights.ts` from “normal automation” to an explicit analysis workflow or legacy script with truthful wording, including removal of stale `docs/ops/artifacts/` framing as the unattended default.
4. Verify the repo’s operator surfaces now tell one consistent story about refresh-only ingestion, conservative repair automation, and on-demand/explicit analysis.

## Must-Haves

- [ ] The repo exposes one clear unattended daily sweep command for operators and later host scheduling.
- [ ] Docs name the durable sweep artifact and explain what manual follow-up means for rerun-only videos.
- [ ] The old nightly-analysis path is no longer presented as the launch-default automation.
- [ ] Operator-facing wording still preserves the launch boundary that analysis remains on-demand or explicit, not implied by refresh.

## Verification

- `rg -n "daily sweep|daily-operational-sweep|manual follow-up|analysis remains on-demand|refresh-only" README.md docs/operations/source-repo-sync-contract.md docs/plans/2026-03-09-self-hosted-proxmox-deployment.md justfile package.json`
- `rg -n "legacy|explicit analysis workflow|not the unattended default|docs/operations/artifacts" scripts/nightly-insights.ts`

## Inputs

- `docs/operations/source-repo-sync-contract.md` — current refresh-only source contract that now needs the daily sweep layered on top.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — host scheduling story S06 will inherit.
- `README.md`, `justfile`, `package.json`, `scripts/nightly-insights.ts` — current stale operator affordances that still imply analysis-oriented automation.
- T01/T02 outputs — actual sweep command name and artifact paths to document.

## Expected Output

- Updated `README.md`, operations docs, and deploy plan — one consistent unattended automation story.
- Updated `justfile` and `package.json` — explicit daily sweep command for operators.
- Updated `scripts/nightly-insights.ts` — clearly scoped as legacy or explicit analysis workflow instead of the unattended default.
