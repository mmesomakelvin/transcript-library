# S05 — Research

**Date:** 2026-03-13

## Summary

S05 owns the launch-time access contract for **R001** (private, low-friction friend access) and **R003** (Cloudflare tunnel/access gate for the app domain). In practice it also constrains downstream **R002**, **R010**, and **R011**, because the chosen access pattern determines which hostnames exist, which callers can reach the origin, and whether the hosted UI can actually use its own API routes.

The codebase already has a strong hosted/private posture, but it is not yet shaped for the intended Cloudflare-friend flow. `HOSTED=true` currently protects all `/api/*` routes with `Authorization: Bearer <PRIVATE_API_TOKEN>`, while the browser UI calls those same routes from client components with no bearer token. I verified this live: the hosted video page renders, but `GET /api/insight` and `POST /api/analyze` return `401 unauthorized`, so the workspace cannot load or start analysis under the current contract.

That means S05 should not try to add app-managed auth. It should define **two caller classes** and encode them cleanly: **human browser access via Cloudflare Access** and **automation access via private bearer/service-token paths**. The current strongest direction is to keep Cloudflare as the human auth boundary, preserve origin-side protection, and update the app boundary so browser requests can be trusted from Cloudflare Access without requiring the browser to know `PRIVATE_API_TOKEN`.

## Recommendation

Use **Cloudflare Access as the sole human-facing auth layer** for `library.aojdevstudio.me`, but **split origin trust by caller type**:

1. **Human browser traffic**
   - Protected at the edge by Cloudflare Access.
   - Origin accepts requests that present trusted Cloudflare Access identity/JWT headers.
   - No app password, username, or bearer token in the browser.

2. **Automation / machine callers**
   - Keep `PRIVATE_API_TOKEN` and `SYNC_TOKEN` for non-browser callers.
   - If a machine must traverse an Access-protected hostname, pair that with a Cloudflare service-token policy.
   - Prefer dedicated non-human entrypoints/hostnames where that keeps the topology simpler.

Concretely, S05 should produce an access contract that says:

- `library.aojdevstudio.me` is the friend-facing hostname behind Cloudflare Access.
- browser UI traffic must work there without any app-managed credential scope.
- `/api/sync-hook` and future deploy automation cannot assume that a bearer token alone is enough once the hostname is behind Access.
- the app’s route guard must distinguish **browser-via-Access** from **automation-via-bearer**, instead of treating every hosted API call as bearer-only.

## Don't Hand-Roll

| Problem                               | Existing Solution                                 | Why Use It                                                                                                              |
| ------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Friend login for a tiny trusted group | Cloudflare Access OTP / allowlisted identity flow | Matches R001 directly and avoids shipping app-managed auth the project explicitly does not want.                        |
| Machine access through Zero Trust     | Cloudflare Access service tokens                  | This is Cloudflare’s supported non-browser path; do not try to fake browser auth with `PRIVATE_API_TOKEN` in client JS. |
| Hosted startup contract checks        | `src/lib/hosted-config.ts` preflight              | The repo already has a deployment-contract authority; extend it instead of inventing separate boot checks.              |
| Route protection                      | `src/lib/private-api-guard.ts`                    | Reuse one guard surface, but broaden it to support trusted Cloudflare browser identity in addition to bearer callers.   |

## Slice-Owned / Slice-Supported Requirements

### Primary owner

- **R001 — Hosted private access for approved friends**
- **R003 — Cloudflare tunnel and access gate for the app domain**

### Downstream constraints this slice materially affects

- **R002 — Proxmox deployment with repeatable runtime layout**
- **R010 — Hosted deploy automation is unattended, repeatable, rollback-friendly**
- **R011 — Hosted runtime proves end-to-end analysis works with real provider auth and persistent storage**

## Existing Code and Patterns

- `src/lib/hosted-config.ts` — hosted preflight authority. Already enforces `HOSTED`, `PLAYLIST_TRANSCRIPTS_REPO`, and `PRIVATE_API_TOKEN`, plus source-refresh contract warnings. Good place to add launch-time access assumptions, but right now it assumes bearer-token protection is universally correct.
- `src/lib/private-api-guard.ts` — current hosted route guard. In hosted mode it only accepts `Authorization: Bearer <PRIVATE_API_TOKEN>`. This is secure for machine callers, but incompatible with the browser UI.
- `src/components/VideoAnalysisWorkspace.tsx` — browser-side workspace. Calls `/api/insight`, `/api/insight/stream`, and `/api/analyze` directly from the client with no auth header, which is correct for a Cloudflare-gated browser app but incompatible with the current guard.
- `src/components/AnalysisPanel.tsx` — older analysis client path with the same pattern: plain browser `fetch()` to guarded routes.
- `src/lib/__tests__/route-access-control.test.ts` — proves every app API route returns `401` in hosted mode without a bearer token. This locks in the current mismatch.
- `docs/plans/2026-03-09-self-hosted-proxmox-deployment.md` — already chooses `library.aojdevstudio.me` behind Cloudflare Access OTP and a separate deploy hostname outside that OTP boundary.
- `docs/operations/source-repo-sync-contract.md` — still documents `POST /api/sync-hook` as bearer-authenticated for external callers, but does not reconcile that with an Access-protected public hostname.
- `src/instrumentation.ts` — hosted preflight bootstrap. Useful for failing fast once the S05 contract is explicit.

## What Exists Already

- Hosted mode and startup preflight are real.
- Private API bearer protection is real.
- Cloudflare Access is already the documented launch direction.
- The Proxmox deployment plan already separates the **friend-facing app hostname** from the **deploy webhook hostname**.
- The daily sweep gives a same-machine automation path that does not need public browser auth at all.

## What Is Missing

- A defined origin-side trust model for **human browser** requests after Cloudflare Access has authenticated them.
- A decision on whether `/api/sync-hook` is expected to be reachable from outside the host once the app hostname is behind Access.
- Any hosted-mode browser verification that the workspace can load status, SSE, and analysis actions while `HOSTED=true`.
- Documentation that separates **browser access**, **host-local automation**, and **external automation** into different supported paths.

## Live Verification Notes

I started the app in hosted mode locally with:

```bash
HOSTED=true \
PRIVATE_API_TOKEN=test-private-token \
SYNC_TOKEN=test-sync-token \
PLAYLIST_TRANSCRIPTS_REPO=/Users/ossieirondi/Projects/desktop-commander/repos/playlist-transcripts \
PLAYLIST_TRANSCRIPTS_BRANCH=master \
npm run dev -- --hostname 127.0.0.1 --port 3000
```

Then I opened a real video page in the browser.

Observed behavior:

- page HTML rendered normally
- analysis workspace showed the client shell
- `GET /api/insight?videoId=V5A1IU8VVp4` returned `401`
- clicking **Generate Analysis** caused `POST /api/analyze?videoId=V5A1IU8VVp4` to return `401`
- `GET /api/insight/stream?...` aborted immediately after the failed start

This confirms the current hosted contract breaks the primary hosted user loop even before Cloudflare is in front of it.

## Constraints

- **No app-managed auth scope.** Requirements and decisions already reject passwords/usernames and prefer Cloudflare-managed access.
- **Do not leak `PRIVATE_API_TOKEN` to the browser.** That would collapse the distinction between human UI traffic and internal automation.
- **Keep response sanitization.** Hosted mode already strips filesystem/provider details; S05 should preserve that property.
- **Cloudflare edge auth and app-origin auth are separate concerns.** S05 has to define how they compose rather than assuming one replaces the other.
- **S03’s webhook story needs an access-aware topology.** A bearer token at the app route is not enough if Cloudflare Access blocks the request before it reaches origin.
- **S06 depends on the hostname/trust-boundary decision.** Deploy topology, tunnel config, and systemd/pm2 assumptions should follow this slice, not guess around it.

## Common Pitfalls

- **Treating Cloudflare Access and `PRIVATE_API_TOKEN` as the same layer** — they protect different trust boundaries. Access authenticates the browser at the edge; `PRIVATE_API_TOKEN` authenticates machine/API callers at the origin.
- **Pushing `PRIVATE_API_TOKEN` into client-side fetches** — that would work technically but would be the wrong security model for a friend-facing browser app.
- **Assuming `/api/sync-hook` stays externally callable on the app hostname** — once `library.*` is behind Access OTP, outside automation needs either a service-token path or a different ingress shape.
- **Leaving browser and automation callers on one undifferentiated guard path** — the current live 401 proves this will break the hosted UX.

## Access-Shape Options Considered

### Option A — Remove app guard from browser APIs and trust Cloudflare only

Pros:

- simplest browser flow
- little app work

Cons:

- weakens the validated shared private-boundary story from M001
- makes origin behavior depend entirely on external infra
- leaves automation and browser routes muddled

### Option B — Accept either Cloudflare Access identity/JWT **or** bearer token at the origin

Pros:

- preserves origin-side access control
- fits the product goal: browser users need no app credential
- cleanly separates human and automation callers
- keeps current `PRIVATE_API_TOKEN` useful for same-machine/internal flows

Cons:

- needs a small contract and implementation pass in the route guard
- needs hosted verification around browser + SSE behavior

### Option C — Proxy browser actions through server-only actions/routes that inject the private token

Pros:

- technically workable

Cons:

- unnecessary indirection
- still treats browser requests as if they were machine callers
- adds complexity without clarifying the actual trust boundary

**Recommendation:** choose **Option B**.

## Open Risks

- The Cloudflare headers/JWT validation details are not yet encoded in the app, so S05 needs a concrete origin-trust decision before S06 starts wiring hostnames and tunnels.
- `/api/sync-hook` currently has an external-caller contract, but the friend-facing app hostname is planned to be Access-protected. That needs an explicit supported automation path or the docs will overpromise.
- Hosted verification currently stops at route-unit tests. There is no browser-level hosted smoke test proving the video workspace works when `HOSTED=true`.
- If the slice keeps OTP-only login, delivery reliability of OTP email is an operational dependency; if that becomes noisy for the friend group, an allowlisted IdP may be lower-friction than email PINs.

## Skills Discovered

| Technology                     | Skill                                                 | Status    |
| ------------------------------ | ----------------------------------------------------- | --------- |
| Cloudflare Access / Tunnel     | `vm0-ai/vm0-skills@cloudflare-tunnel`                 | available |
| Cloudflare Access / Zero Trust | `jackspace/claudeskillz@cloudflare-zero-trust-access` | available |
| Proxmox VE / LXC               | `bastos/skills@proxmox-admin`                         | available |
| Next.js App Router             | `wshobson/agents@nextjs-app-router-patterns`          | available |

Promising install commands if wanted later:

```bash
npx skills add vm0-ai/vm0-skills@cloudflare-tunnel
npx skills add jackspace/claudeskillz@cloudflare-zero-trust-access
npx skills add bastos/skills@proxmox-admin
npx skills add wshobson/agents@nextjs-app-router-patterns
```

## Sources

- Hosted mode currently requires `PRIVATE_API_TOKEN`, validates the transcript checkout, and warns on sync-contract gaps (source: [`src/lib/hosted-config.ts`](../../../../../../src/lib/hosted-config.ts))
- Hosted API routes currently accept only bearer-token callers through one shared guard (source: [`src/lib/private-api-guard.ts`](../../../../../../src/lib/private-api-guard.ts))
- Browser workspace fetches guarded routes directly with no auth header (source: [`src/components/VideoAnalysisWorkspace.tsx`](../../../../../../src/components/VideoAnalysisWorkspace.tsx))
- Older analysis panel follows the same unauthenticated browser-fetch pattern (source: [`src/components/AnalysisPanel.tsx`](../../../../../../src/components/AnalysisPanel.tsx))
- Route tests explicitly lock in `401` for hosted unauthenticated API requests (source: [`src/lib/__tests__/route-access-control.test.ts`](../../../../../../src/lib/__tests__/route-access-control.test.ts))
- Current deployment plan already chooses Cloudflare Access for the app hostname and a separate deploy hostname outside that boundary (source: [`docs/plans/2026-03-09-self-hosted-proxmox-deployment.md`](../../../../../../docs/plans/2026-03-09-self-hosted-proxmox-deployment.md))
- Current sync contract still documents external bearer access to `/api/sync-hook`, which now needs an Access-aware topology decision (source: [`docs/operations/source-repo-sync-contract.md`](../../../../../../docs/operations/source-repo-sync-contract.md))
- Cloudflare documents One-Time PIN as a way to grant external partners access without adding them to the IdP (source: [Three new ways teams are using Cloudflare Access](https://blog.cloudflare.com/three-new-ways-teams-are-using-cloudflare-access/))
- Cloudflare documents service tokens as the supported path for automated systems, using `CF-Access-Client-ID` and `CF-Access-Client-Secret` rather than human login flows (source: [Give your automated services credentials with Access service tokens](https://blog.cloudflare.com/give-your-automated-services-credentials-with-access-service-tokens/))
- Cloudflare documents that browser Access sessions rely on JWT/cookie-based auth while command-line/API access uses a different token/header flow (source: [Leave your VPN and cURL secure APIs with Cloudflare Access](https://blog.cloudflare.com/leave-your-vpn-and-curl-secure-apis-with-cloudflare-access/))
