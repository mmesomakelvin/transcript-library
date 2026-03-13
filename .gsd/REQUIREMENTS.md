# Requirements

This file is the explicit capability and coverage contract for the project.

Use it to track what is actively in scope, what has been validated by completed work, what is intentionally deferred, and what is explicitly out of scope.

## Active

### R001 — Hosted private access for approved friends

- Class: launchability
- Status: active
- Description: Approved friends can reach the deployed library privately without creating app passwords or usernames.
- Why it matters: The product is for a trusted group, so access needs to be private but low-friction.
- Source: user
- Primary owning slice: M002/S05
- Supporting slices: M002/S07
- Validation: mapped
- Notes: Current direction is Cloudflare-managed access, not app-managed auth.

### R002 — Proxmox deployment with repeatable runtime layout

- Class: operability
- Status: active
- Description: The app runs on Proxmox with release code, persistent runtime data, and process supervision separated cleanly.
- Why it matters: Shipping depends on a stable hosted environment that survives restarts and deploys.
- Source: user
- Primary owning slice: M002/S06
- Supporting slices: M002/S07
- Validation: mapped
- Notes: Runtime data must stay outside the mutable release tree.

### R003 — Cloudflare tunnel and access gate for the app domain

- Class: launchability
- Status: active
- Description: The app is exposed privately at the target domain through Cloudflare Tunnel and an approved-friend access gate.
- Why it matters: Friends need a safe, practical way to reach the hosted app without opening the homelab broadly.
- Source: user
- Primary owning slice: M002/S05
- Supporting slices: M002/S06, M002/S07
- Validation: mapped
- Notes: `aojdevstudio.me` is the intended domain base.

### R004 — Analysis runs complete successfully on demand from the UI

- Class: primary-user-loop
- Status: active
- Description: A user can click generate analysis on a video and receive a completed analysis run with the expected artifacts.
- Why it matters: The main promise of the product breaks if on-demand analysis fails.
- Source: user
- Primary owning slice: M002/S01
- Supporting slices: M002/S07
- Validation: mapped
- Notes: Current breakage includes exit-code-1 runs.

### R005 — Historical broken analysis artifacts are detectable, understandable, and rerunnable

- Class: failure-visibility
- Status: active
- Description: Old videos with runtime/artifact drift show clear failure state and can be repaired by rerunning analysis.
- Why it matters: Existing content should not feel randomly corrupted or opaque.
- Source: user
- Primary owning slice: M002/S02
- Supporting slices: M002/S04, M002/S07
- Validation: mapped
- Notes: Current examples include missing structured analysis and artifacts without matching run records.

### R006 — Daily unattended repair sweep reduces runtime/artifact drift visibility

- Class: operability
- Status: active
- Description: A scheduled unattended job refreshes source data and sweeps for repairable runtime drift often enough that users rarely hit stale breakage.
- Why it matters: The user wants visible failures to be the exception, not the normal operator workflow.
- Source: user
- Primary owning slice: M002/S04
- Supporting slices: M002/S06, M002/S07
- Validation: mapped
- Notes: User-facing behavior should still expose clear rerun state when drift remains.

### R007 — New transcript updates from the source repo appear automatically in the library

- Class: continuity
- Status: active
- Description: New transcript content committed upstream becomes visible in the library automatically without manual catalog surgery.
- Why it matters: The library must stay in sync with the transcript source to remain useful.
- Source: user
- Primary owning slice: M002/S03
- Supporting slices: M002/S04, M002/S07
- Validation: mapped
- Notes: Automatic appearance does not imply automatic analysis.

### R008 — Ingestion and analysis stay decoupled

- Class: primary-user-loop
- Status: active
- Description: New videos sync into the library automatically, but analysis runs only when requested by a user or an explicit operator workflow.
- Why it matters: This keeps launch scope safer while preserving responsiveness and control.
- Source: user
- Primary owning slice: M002/S03
- Supporting slices: M002/S04
- Validation: mapped
- Notes: Auto-analysis of new videos is explicitly not part of the launch target.

### R009 — Source-of-truth contract between `playlist-transcripts` and this app is explicit and reliable

- Class: integration
- Status: active
- Description: The app’s expectations about transcript repo structure, indexes, refresh behavior, and failure handling are documented and enforced clearly enough to avoid silent drift.
- Why it matters: The system spans two repos and currently fails when that contract is implicit.
- Source: inferred
- Primary owning slice: M002/S03
- Supporting slices: M002/S04
- Validation: mapped
- Notes: The transcript repo exists independently; the Desktop Commander submodule is only a local convenience.

### R010 — Hosted deploy automation is unattended, repeatable, and rollback-friendly

- Class: operability
- Status: active
- Description: Deploys to the hosted environment can run unattended and recover cleanly through restart and rollback paths.
- Why it matters: Shipping on homelab infrastructure needs a maintainable operator story, not hand-edited production state.
- Source: user
- Primary owning slice: M002/S06
- Supporting slices: M002/S07
- Validation: mapped
- Notes: This includes daily automation and release hygiene, not only first deploy.

### R011 — Hosted runtime proves end-to-end analysis works with real provider auth and persistent storage

- Class: launchability
- Status: active
- Description: In the deployed environment, a real user flow can browse, trigger analysis, and produce durable artifacts in persistent storage.
- Why it matters: Local success is not enough if hosted runtime auth, paths, or process behavior differ.
- Source: inferred
- Primary owning slice: M002/S07
- Supporting slices: M002/S01, M002/S06
- Validation: mapped
- Notes: Must be proven in the real hosted topology, not only by local tests.

### R012 — Multi-playlist ingestion model supports adding more playlists without redesigning the app architecture

- Class: integration
- Status: active
- Description: The system can grow from one upstream playlist to multiple playlist pipelines without replacing the current app foundations.
- Why it matters: The user intends to add more collections soon after launch.
- Source: user
- Primary owning slice: M003/none yet
- Supporting slices: none
- Validation: unmapped
- Notes: Ownership will be refined when M003 is planned.

### R013 — Each playlist can be configured to either get its own top-level route or merge into the shared library

- Class: core-capability
- Status: active
- Description: New playlist sources are not forced into one presentation mode; each collection can be surfaced as its own section or blended into the shared library.
- Why it matters: The user wants collection-level flexibility, not a fixed UX rule.
- Source: user
- Primary owning slice: M003/none yet
- Supporting slices: none
- Validation: unmapped
- Notes: This is a product behavior requirement, not just a data-model preference.

### R014 — Collection/source identity is preserved alongside `videoId` machine keying

- Class: constraint
- Status: active
- Description: The system keeps `videoId` as the machine key while also preserving which playlist or collection a video belongs to.
- Why it matters: Future multi-source behavior needs collection semantics without breaking existing artifact assumptions.
- Source: inferred
- Primary owning slice: M003/none yet
- Supporting slices: none
- Validation: unmapped
- Notes: This follows the repo rule to keep the app machine-keyed by `videoId`.

### R015 — Operator workflow for adding a new playlist is straightforward and documented

- Class: admin/support
- Status: active
- Description: Adding another playlist source is a repeatable operator workflow instead of a one-off custom engineering exercise.
- Why it matters: The user wants to add more pipelines quickly after launch.
- Source: user
- Primary owning slice: M003/none yet
- Supporting slices: none
- Validation: unmapped
- Notes: Documentation matters because the workflow spans repos and automation.

## Validated

### R101 — Configurable insights base directory works in local and hosted modes

- Class: operability
- Status: validated
- Description: Runtime insight artifacts can live outside the deployed app tree while local development still works when no override is set.
- Why it matters: Hosted deployment requires mutable runtime data to be separated from release code.
- Source: execution
- Primary owning slice: M001/S01
- Supporting slices: none
- Validation: validated
- Notes: Implemented through shared path authority and tested env-based resolution.

### R102 — Structured analysis contract is authoritative for UI reads

- Class: core-capability
- Status: validated
- Description: New analysis runs write validated `analysis.json`, and the UI reads structured fields from it instead of markdown heuristics.
- Why it matters: Reliable analysis UX depends on a durable structured contract.
- Source: execution
- Primary owning slice: M001/S01
- Supporting slices: none
- Validation: validated
- Notes: Markdown remains as the human-readable derived artifact.

### R103 — Legacy markdown-only insights remain readable during the migration window

- Class: continuity
- Status: validated
- Description: Existing markdown-only insights can still render during the explicit migration window without silently masking invalid structured artifacts.
- Why it matters: Migration had to preserve older content while moving to JSON-first runtime behavior.
- Source: execution
- Primary owning slice: M001/S01
- Supporting slices: none
- Validation: validated
- Notes: Fallback is gated by `.migration-status.json`.

### R104 — Catalog metadata is served from SQLite-backed reads

- Class: quality-attribute
- Status: validated
- Description: Browse reads no longer depend on synchronous `videos.csv` parsing on hot request paths.
- Why it matters: The app needed a more scalable and deterministic catalog authority.
- Source: execution
- Primary owning slice: M001/S02
- Supporting slices: none
- Validation: validated
- Notes: Includes parity/import validation around the new catalog source.

### R105 — Browse and lookup behavior remain correct after the catalog migration

- Class: continuity
- Status: validated
- Description: Home/channel grouping, video lookup by `videoId`, and transcript-part ordering remain correct under the SQLite-backed catalog.
- Why it matters: Storage changes were only acceptable if user-facing browse behavior stayed correct.
- Source: execution
- Primary owning slice: M001/S02
- Supporting slices: none
- Validation: validated
- Notes: Covered by focused tests and import validation.

### R106 — Durable runtime lifecycle state survives restarts and mismatch detection

- Class: failure-visibility
- Status: validated
- Description: Analysis lifecycle state is written durably and reconciliation detects mismatches between runtime records and artifacts.
- Why it matters: Runtime status could no longer depend only on in-memory counters or loose PID checks.
- Source: execution
- Primary owning slice: M001/S03
- Supporting slices: none
- Validation: validated
- Notes: `run.json` is the latest-run authority; `status.json` remains a compatibility artifact.

### R107 — Runtime routes expose status-first evidence and rerun guidance

- Class: failure-visibility
- Status: validated
- Description: Runtime routes and SSE surfaces expose stage, recent logs, reconciliation details, and rerun guidance instead of vague success/failure state.
- Why it matters: Operator trust depends on visible evidence, not guesswork.
- Source: execution
- Primary owning slice: M001/S03
- Supporting slices: none
- Validation: validated
- Notes: UI remains thin because the runtime layer publishes compact evidence directly.

### R108 — Hosted mode fails early on missing critical env configuration

- Class: operability
- Status: validated
- Description: Hosted startup validates required configuration before user-triggered flows are attempted.
- Why it matters: Misconfigured deploys should fail at boot instead of later during usage.
- Source: execution
- Primary owning slice: M001/S04
- Supporting slices: none
- Validation: validated
- Notes: Implemented through `instrumentation.ts` preflight.

### R109 — Sensitive hosted API routes are protected by a shared private boundary

- Class: compliance/security
- Status: validated
- Description: Internal API routes reject unauthenticated hosted requests while local dev remains zero-config.
- Why it matters: Private deployment should not rely only on ambient network trust.
- Source: execution
- Primary owning slice: M001/S04
- Supporting slices: none
- Validation: validated
- Notes: Uses one shared `PRIVATE_API_TOKEN` guard and payload sanitization.

### R110 — Current architecture is validated for the near-term private scale target

- Class: quality-attribute
- Status: validated
- Description: SQLite plus filesystem is documented and benchmarked as sufficient for the near-term friend-group deployment scale.
- Why it matters: The project needed a real stop point before overbuilding infrastructure.
- Source: execution
- Primary owning slice: M001/S04
- Supporting slices: none
- Validation: validated
- Notes: Escalation triggers are documented instead of speculative platform changes.

## Deferred

### R201 — Automatic background analysis of all newly synced videos

- Class: operability
- Status: deferred
- Description: New videos are analyzed automatically without a user requesting them.
- Why it matters: It could increase convenience later, but it adds cost and operational risk to launch.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: The launch decision is to keep ingestion and analysis decoupled.

### R202 — App-managed magic-link authentication

- Class: compliance/security
- Status: deferred
- Description: The app itself owns friend login via magic links or one-time codes.
- Why it matters: It may become useful if Cloudflare-managed access stops fitting the product.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: For now, Cloudflare Access is preferred because it keeps app scope lean.

### R203 — Roll out a second real collection such as `spirit-talk`

- Class: differentiator
- Status: deferred
- Description: A second concrete playlist is onboarded and surfaced in the library.
- Why it matters: It is the first real proof of multi-playlist value, but it should follow the launch milestone.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: unmapped
- Notes: M003 should create the capability; the specific collection rollout can follow immediately.

## Out of Scope

### R301 — Major UI redesign or visual rework

- Class: anti-feature
- Status: out-of-scope
- Description: This cycle does not rework the current look and feel substantially.
- Why it matters: The user explicitly likes the existing UI and wants effort spent on plumbing and launchability.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: UI changes are only acceptable when directly required for clarity around runtime state.

### R302 — Username/password accounts for friends

- Class: anti-feature
- Status: out-of-scope
- Description: Friends should not need to create and manage passwords inside the app.
- Why it matters: This preserves the low-friction private-group access model.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Password flows are explicitly rejected for this product shape.

### R303 — Public self-serve onboarding, billing, or multi-tenant account management

- Class: anti-feature
- Status: out-of-scope
- Description: The app is not being turned into a SaaS or public self-serve product.
- Why it matters: It protects the internal-tool scope and keeps architecture decisions aligned with the actual audience.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: This remains a private friend-group tool.

### R304 — Auto-analyzing videos before any user requests them

- Class: anti-feature
- Status: out-of-scope
- Description: The launch milestone will not analyze all new content proactively by default.
- Why it matters: This prevents accidental scope creep into cost-heavy background processing.
- Source: user
- Primary owning slice: none
- Supporting slices: none
- Validation: n/a
- Notes: Same behavioral exclusion as R201, expressed as a launch boundary.

## Traceability

| ID   | Class               | Status       | Primary owner | Supporting         | Proof     |
| ---- | ------------------- | ------------ | ------------- | ------------------ | --------- |
| R001 | launchability       | active       | M002/S05      | M002/S07           | mapped    |
| R002 | operability         | active       | M002/S06      | M002/S07           | mapped    |
| R003 | launchability       | active       | M002/S05      | M002/S06, M002/S07 | mapped    |
| R004 | primary-user-loop   | active       | M002/S01      | M002/S07           | mapped    |
| R005 | failure-visibility  | active       | M002/S02      | M002/S04, M002/S07 | mapped    |
| R006 | operability         | active       | M002/S04      | M002/S06, M002/S07 | mapped    |
| R007 | continuity          | active       | M002/S03      | M002/S04, M002/S07 | mapped    |
| R008 | primary-user-loop   | active       | M002/S03      | M002/S04           | mapped    |
| R009 | integration         | active       | M002/S03      | M002/S04           | mapped    |
| R010 | operability         | active       | M002/S06      | M002/S07           | mapped    |
| R011 | launchability       | active       | M002/S07      | M002/S01, M002/S06 | mapped    |
| R012 | integration         | active       | M003/none yet | none               | unmapped  |
| R013 | core-capability     | active       | M003/none yet | none               | unmapped  |
| R014 | constraint          | active       | M003/none yet | none               | unmapped  |
| R015 | admin/support       | active       | M003/none yet | none               | unmapped  |
| R101 | operability         | validated    | M001/S01      | none               | validated |
| R102 | core-capability     | validated    | M001/S01      | none               | validated |
| R103 | continuity          | validated    | M001/S01      | none               | validated |
| R104 | quality-attribute   | validated    | M001/S02      | none               | validated |
| R105 | continuity          | validated    | M001/S02      | none               | validated |
| R106 | failure-visibility  | validated    | M001/S03      | none               | validated |
| R107 | failure-visibility  | validated    | M001/S03      | none               | validated |
| R108 | operability         | validated    | M001/S04      | none               | validated |
| R109 | compliance/security | validated    | M001/S04      | none               | validated |
| R110 | quality-attribute   | validated    | M001/S04      | none               | validated |
| R201 | operability         | deferred     | none          | none               | unmapped  |
| R202 | compliance/security | deferred     | none          | none               | unmapped  |
| R203 | differentiator      | deferred     | none          | none               | unmapped  |
| R301 | anti-feature        | out-of-scope | none          | none               | n/a       |
| R302 | anti-feature        | out-of-scope | none          | none               | n/a       |
| R303 | anti-feature        | out-of-scope | none          | none               | n/a       |
| R304 | anti-feature        | out-of-scope | none          | none               | n/a       |

## Coverage Summary

- Active requirements: 15
- Mapped to slices: 11
- Validated: 10
- Unmapped active requirements: 4
