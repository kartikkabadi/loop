# Loop workflow operations

This repository has one active automation boundary: the Loop control plane.
The old repository-maintenance workflow fleet was removed from this repo
because it targeted OpenClaw operations rather than Loop execution. Agent work
belongs in disposable workspaces, where the bootstrap manifest installs and verifies
the required tools.

## GitHub Actions

The active Loop workflows are intentionally small. The older ClawSweeper
workflow files remain in the repository for source/test compatibility, but
they are not part of the active Loop execution lane and are kept disabled in
GitHub Actions:

- `Loop CI` runs the full `pnpm run check` suite on pushes to `main`, pull
  requests, and manual dispatch.
- `Loop security` runs a production dependency audit on pushes, pull requests,
  a weekly schedule, and manual dispatch.

Both workflows use Node 24, pinned pnpm, frozen-lockfile installs, read-only
repository permissions, and cancellation for superseded runs. They do not
start the execution provider, allocate workspaces, mutate GitHub issues, or
merge pull requests.

## Human-visible work states

The GitHub projection is deliberately explicit:

| State | Projection | Meaning | Human action |
| --- | --- | --- | --- |
| Draft | `loop:draft`, draft issue/PR | Plan or implementation is inert | Edit or validate the plan |
| Ready | `loop:ready` | Contract is complete and may be admitted | Approve/dispatch |
| Running | `loop:running` | Workspace and provider execution are active | Observe, pause, or cancel |
| Review ready | `loop:review-ready`, non-draft PR | Exact head passed required gates | Review the Loop packet |
| Blocked | `loop:blocked` | Missing decision, dependency, or proof | Resolve the named blocker |
| Complete | `loop:complete` | Human acceptance and completion recorded | Close out normally |
| Failed | `loop:failed` | Bounded recovery stopped safely | Inspect evidence and replan |

Labels are projections, not authority. The D1 event ledger, exact commit SHA,
gate records, and review packet are authoritative. A projection can be
replayed without creating a second task or a second comment.

## PR readiness

Every Loop-created PR begins as a draft. It is converted to ready-for-review
only after the runner has published a head SHA, every required gate is bound to
that exact head, and the task enters `REVIEWING`. The adapter refuses to change
draft state if the live PR head differs from the reviewed SHA. A ready PR is
still not merge-ready: human review and human acceptance remain separate gates.

## Execution provider usage and recovery

The CLI exposes model selection and ACP transport, but not an account-wide
concurrency or remaining-quota API. Loop records the observable facts instead:

- fixed model: `SWE-1.7`;
- initial active admission: two;
- configured ceiling: ten, never exceeded by the persisted coordinator;
- successful completions since ramp;
- rate/quota failure count and last failure time;
- cooldown reason and retry timestamp;
- active leases and expiry times.

Admission is additive and slow; failure is multiplicative and immediate. A
  waiting task sleeps in a durable Workflow, so rate limits do not burn workspace time
or create repeated sessions. Reconciliation reclaims stale leases and runners;
generation and cancellation fencing rejects late events from old sessions.

## Failure and security policy

- **Happy path:** issue -> approved task -> workspace -> execution provider -> exact-head gates ->
  review-ready PR -> human acceptance.
- **Failure modes:** invalid contracts are rejected before dispatch; stale
  heads invalidate gates; rate limits sleep and retry; repeated failures,
  missing evidence, credential misconfiguration, or ambiguous workspace state stop in
  an auditable state.
- **Abuse/security:** Auth0 verification fails closed; GitHub webhook and
  workflow events are authenticated; runner environments scrub provider and
  GitHub secrets; MCP scopes separate read, planning, dispatch, repair, and
  approval; no raw shell or merge tool is exposed.
- **Scale/performance:** D1 stores compact state and events, R2 stores bounded
  evidence, Durable Objects serialize repository/provider leases, Queues absorb
  webhook bursts, and workspaces carry the expensive execution workload.
- **Trade-off:** two-start/adaptive-ramp is slower than blindly launching ten
  agents, but it is the only honest default while account-specific provider
  limits remain undiscoverable. The ten-slot ceiling keeps the system ready to
  use observed capacity without making it an assumption.
