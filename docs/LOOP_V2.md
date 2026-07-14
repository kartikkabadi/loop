# Loop V2

Loop is the control loop between software intent and verified, reviewable
changes. ChatGPT or another operator plans and approves a task; Loop records an
immutable contract, coordinates repository operations and an isolated coding
runtime, collects evidence, and returns a review packet for human acceptance.

ClawSweeper remains the repository-operations subsystem. Crabbox remains the
workspace lifecycle adapter. The configured provider remains behind an
execution adapter. None of those adapters owns task authority, approval, or
merge policy.

## Product boundary

Loop is not a coding model, browser bot, ChatGPT scraper, generic multi-agent
framework, autonomous merger, GitHub replacement, or CI replacement. Its
operator-facing API exposes intent-level actions:

```text
create draft → validate → approve → dispatch → inspect evidence → review
             → request repair or accept → complete
```

Raw shell, secret reads, arbitrary agent prompts, policy overrides, and merge
operations are deliberately outside the control-plane API.

## Core invariants

- A model cannot grant itself authority or waive a gate.
- A builder, verifier, reviewer, and merger are separate roles.
- Every contract, gate, and review packet is bound to task revision, contract
  hash, base SHA, and head SHA.
- A new head marks passing evidence stale.
- Repository files, issue text, logs, dependencies, and test output are
  untrusted input; they cannot change Loop policy or authorization.
- All loops have explicit attempt, repair, verifier, and lifetime budgets.
- Workspace state is disposable; intent, events, evidence, and review state are
  durable outside the Box.
- Human stop wins immediately before any external mutation.
- Version one never exposes automatic merge.

## Domain model

The source of truth is the typed contract in `src/loop/task-contract.ts`.
Contracts contain repository ownership mode, problem, authority documents,
durable decisions/open questions/relevant paths, scope, constraints, expected
and forbidden paths, observable acceptance criteria, proof mechanisms, risk,
verification profile, rollback, budgets, and approval requirements.

`validateLoopTaskContract` rejects subjective acceptance language, missing
proof, contradictory paths, unresolved external-contribution forks, missing
rollback, invalid budgets, risk below the automatic floor, and automatic-merge
requests. `hashLoopTaskContract` produces the stable identity used by gates and
review packets.

`src/loop/task-state.ts` keeps phase, condition, and gate state orthogonal:

```text
DRAFT → VALIDATING → AWAITING_APPROVAL → QUEUED → ALLOCATING → PREPARING
  → EXECUTING → PUBLISHING → VERIFYING → REVIEWING → HUMAN_ACCEPTANCE
  → COMPLETE
```

Review findings return a task to bounded repair execution. Pause, resume,
cancel, replan, and head-change transitions are explicit. Gate writes fail when
their revision, contract hash, base SHA, or head SHA does not match the task.

`src/loop/event-store.ts` stores resulting state alongside append-only event
facts. The JSONL store is intentionally boring and reconstructable; a cloud
adapter can replace it without changing domain transitions.

## Application surface

`LoopApplication` is the intent-level application service. It currently
provides:

- `createDraft`, `validate`, `approve`, and phase advancement;
- `pause`, `resume`, `cancel`, and bounded repair requests;
- exact-head updates and gate recording;
- structured review submission and human completion approval;
- task lookup/listing and review-packet construction.

Every write accepts an expected version and optional idempotency key. Version
conflicts fail closed. The review packet contains the contract hash, exact
repository SHAs, gate results, findings, and a digest of the packet contents.

The gateway exposes the same router through two operator transports: MCP at
`/mcp` and authenticated REST tool calls at
`/v1/tools/{url-encoded-tool-name}`. REST requests use the shape
`{ "arguments": {...}, "expectedVersion": 4, "idempotencyKey": "..." }`;
they do not bypass scopes, repository serialization, or workflow admission.
`/docs/mcp` is a public bounded description of both transports.

`GitHubLoopPublicationAdapter` projects exact-head checks and one
marker-backed status comment. Check runs use a deterministic external ID and
are updated in place; GitHub projections are never treated as the source of
truth.

`LoopBoxAllocator` persists an allocation intent before provider creation,
uses deterministic names, reconciles a timed-out create exactly once, and
classifies duplicate or unowned resources instead of creating again blindly.
The D1 migration stores allocation state outside the disposable Box.

The repository Durable Object also owns the single active writer lease for the
repository. Lease paths are normalized and overlap-checked (including parent
and child paths), stale generations cannot renew or release another run's
lease, and runner heartbeats renew the lease while the host is active. The
Workflow releases it when a run is cancelled, rate-limited, failed, or has
handed its candidate to verification.

Workflow instances also register a durable run record with attempt, generation,
expected task version, and lifecycle status. The record is a reconciliation
projection; the task event log remains authoritative for task transitions.

The execution coordinator accepts a separate verification workspace adapter;
when configured, it syncs and verifies from a fresh lease and always stops that
lease independently of the builder. `decideLoopRepair` refuses same-diff,
repeated-failure, and over-budget repair loops.

## Adapter boundaries

The existing repository code stays below this control plane:

- `src/clawsweeper.ts` and `src/repair/` own deterministic repository intake,
  validation, GitHub mutation isolation, and repair policy.
- `src/crabbox-workspace-host.ts` owns acquire/sync/launch/observe/collect/stop.
  Crabbox transport is not a duplex ACP channel.
- `src/box-agent-worker/` owns Devin ACP stdio protocol, host-service policy,
  environment scrubbing, cancellation, and bounded output.
- GitHub, Cloudflare, Box, and provider credentials must be injected through
  adapters. They must not leak into the domain core or agent subprocess.

## Deployment path

The intended deployment is a modular monolith with separate runtime entrypoints:

```text
gateway worker (REST/MCP/webhooks)
        ↓
workflow worker (durable task progression and waits)
        ↓
ClawSweeper + Crabbox → disposable workspace → execution provider
        ↓
GitHub branch / PR / CI evidence
        ↓
review packet → human acceptance
```

Cloudflare D1, Durable Objects, Workflows, Queues, and R2 are persistence and
coordination adapters, not replacements for the domain model. Authentication is
OAuth resource-server behavior at the gateway edge; the domain core receives a
verified subject and scope, never raw bearer tokens.

The gateway has a deployed integration environment. Public documentation keeps
the live endpoint, account identifiers, storage binding names, and Auth0 tenant
details out of source control; configure those values through the deployment
environment and repository secrets. The public `/healthz` probe should report
only service status, rollout mode, and time, while authenticated writes remain
behind the configured resource-server checks.

The MCP contract adopts the useful parts of the CodexPro local bridge: server
instructions, bounded structured results, concrete per-tool schemas, tool
annotations, OAuth security metadata, and MCP-native scope challenges. The
authenticated Worker path uses the official TypeScript SDK's Web Standard
Streamable HTTP transport; the Loop intent router remains the authorization and
policy boundary. The hosted Loop Worker intentionally does not expose CodexPro's
local filesystem or shell tools; those remain an optional, separately trusted
local-repository mode.

`loop.runs.start` creates a deterministic Cloudflare Workflow instance for an
approved task. The workflow persists phase transitions and waits for
host-owned `box-ready`, `agent-outcome`, `verification-result`, and
`review-result` events. Box
provider invocation, Devin invocation, publication credentials, and clean-head
independent verification remain explicit external adapters; scheduling the
workflow records allocation intent but does not claim provider creation or
execution succeeded.

Task state durably records the subjects that created, approved, reviewed,
accepted, and completed a task. The state machine rejects a review from the
approving subject and rejects completion acceptance from the reviewing subject;
the workflow never treats a model claim as an approval.

Rollout is controlled by `LOOP_ROLLOUT_MODE` and defaults to `shadow`. Shadow
starts no workflows; assisted permits explicit R0/R1 dispatch; controlled and
normal automatically retry approved queued R0-R2 dispatch through the scheduled
reconciler. R3/R4 remain denied at Workflow admission until a distinct human
approval gate is implemented.

Host-owned runners and independent verifiers can deliver those events through `/workflow-events` using a
dedicated HMAC secret and the `x-loop-signature-256` header. The route accepts
only the typed box, agent, verification, review, registration, and heartbeat event kinds,
requires matching task IDs, bounds payloads, and remains unavailable until its
secret is configured.

The Box-local [Loop Runner](../src/loop-runner/index.ts) owns the ACP runtime,
workspace jail, terminal policy, result-file parsing, and runner heartbeats.
It can emit signed registration/heartbeat envelopes without ever receiving a
GitHub write credential or Box API key. Missing result files become
`candidate_unknown`, never success.

After a candidate result is complete, the host-side publication adapter can
validate changed paths and staged secret patterns, create the deterministic
`loop/<task>-<title>` branch, commit, push with `--force-with-lease`, and
open/reuse the draft pull request through the GitHub App client. The ACP
process is shut down before publication begins. The resulting event includes
the published head SHA and preliminary gates. The workflow then waits for a
separate `verification-result` bound to that exact head, records every required
gate, and only then accepts a `review-result`.

## Execution provider policy

The execution-provider adapter is intentionally narrow and durable:

- Loop always invokes SWE-1.7 through Devin ACP. A caller that selects another
  model is rejected before a process starts; Loop never falls back to another
  model when usage limits are reached.
- A single Durable Object owns exactly two provider leases. A task can hold at
  most one lease for one generation. Leases expire and are renewed by runner
  heartbeats, so a dead Box cannot consume capacity forever.
- Capacity waits and provider cooldowns are persisted as run state. Workflows
  sleep until the recorded retry time, so a 12–24 hour operating window does
  not require a hot process or repeated polling.
- The runner writes an atomic Box-local checkpoint. The control plane stores
  only a session digest and bounded handoff; the raw ACP session identifier
  stays inside the Box. Resume attempts `session/load` first and falls back to a
  fresh session with the handoff when the provider cannot load the old session.
- Unknown failures fail the run. Rate limits, quota exhaustion, and transient
  provider outages release the lease, advance the generation, and retry after
  cooldown. Stale generations cannot publish into the new attempt.

This deliberately prefers two continuously recoverable workers over optimistic
parallelism. It respects the observed Devin capacity while remaining safe when
the provider allowance is lower than the desired operating window.

The runner was smoke-tested in the existing Box snapshot with Devin
`3000.1.27` on `SWE-1.7`: a real no-tool ACP turn completed, registration and
heartbeat events carried the enforced model, a second generation loaded the
same ACP session from the Box-local checkpoint, and the Box was stopped with a
completed snapshot afterward. The runner CLI can now deliver signed events to
the live Worker using its protected secret file; an unsigned synthetic runner
event was rejected, while a signed one reached the stale-run guard rather than
the authentication guard.

The scheduled maintenance pass reconciles stale workflow/runner records and
unacknowledged Box allocation intents. Provider capacity is leased only after
the `box-ready` event, so a long Box provisioning wait cannot consume either of
the two SWE-1.7 slots. Pause and cancellation increment the task's monotonic
control generation; delayed runner events from the previous generation are
rejected before publication.

Self-healing is bounded and rollout-aware. A stale active run becomes a failed
historical run, then controlled/normal mode can recover the task to `QUEUED`
with a new cancellation generation and a versioned Workflow identity. Recovery
is limited by `maxBuilderAttempts`; exhausted or non-retryable work becomes an
auditable `ESCALATED` terminal task. Shadow mode records the observation without
mutating task state, so a rollout cannot silently create work.

Every new Box runs the idempotent Loop bootstrap manifest before Devin starts.
It verifies Node, npm, git, Devin, pinned pnpm, pinned `agent-browser`, and
Socket Firewall Free (`sfw`). The pinned Linux `sfw` release is downloaded over
HTTPS, verified against its SHA-256 digest, installed under the persistent
managed user-bin path, and used to wrap package-manager installs. It
repairs known managed binary links after resume, installs the browser runtime,
and runs the offline doctor. The bootstrap command surface is a fixed
allowlist; agents cannot turn it into arbitrary SSH or package-manager access.
The baseline does not copy host credentials, shell profiles, or the Mac's
complete toolchain into Boxes.
The repository-owned `skills/loop-box-verification/SKILL.md` is the verification
contract for browser/runtime evidence, including bounded output, domain scope,
credential hygiene, and explicit browser cleanup.

GitHub issue intake accepts only an open issue carrying the exact `loop:ready`
label and a bounded machine-readable contract block. Surrounding issue prose is
untrusted; the intake parser returns diagnostics rather than dispatching an
invalid contract.

The live GitHub webhook queue turns a valid issue event into an idempotent draft
task in D1. Invalid, closed, unlabeled, or repository-mismatched issues are
ignored without dispatch. Check/comment publication remains a separate GitHub
App adapter and is intentionally not enabled with a personal token.

Issue comments can carry one standalone first non-empty line in the form
`@loop status|dispatch|verify|retry|stop|resume|explain|review [arguments]`.
The queue records every recognized command in D1 with delivery-level
deduplication. Commands are ignored when the issue has no Loop task link and
mutating commands are rejected unless `LOOP_ALLOWED_GITHUB_ACTOR` exactly
matches the GitHub login. The bridge is intentionally fail-closed until an
operator configures that allowlist. `retry` records a bounded repair request
only when the current task phase supports one; runtime recovery uses a separate
durable `loop.runs.recover`/`loop.runs.escalate` path and never treats a GitHub
comment as permission to bypass the task contract.

ChatGPT can create a Loop GitHub issue through `loop.issues.create`. Draft
issues receive `loop:draft` and remain inert; an explicit
`loop.issues.mark_ready` operation adds `loop:ready`, after which signed
webhook intake creates the durable task. Published pull requests are drafts by
default and remain subject to independent verification, review, and human
acceptance. GitHub App installation credentials are short-lived Worker-side
configuration, never MCP or Box secrets.

After creating the Auth0 API/audience, configure the Worker with
`AUTH0_ISSUER`, `AUTH0_AUDIENCE`, and an allowed subject or email, then
redeploy. The MCP endpoint to register in ChatGPT is the `/mcp` URL above; the
protected-resource metadata endpoint advertises the OAuth challenge.

The operator CLI is `pnpm loop` (or `node scripts/loop.mjs`). It calls the same
intent-level MCP tools as ChatGPT, never bypasses optimistic concurrency or
scope checks, and delegates Box lifecycle commands to the typed Node adapter:

```bash
pnpm loop doctor
pnpm loop task inspect --task-id loop_...
pnpm loop run list
pnpm loop box list
```

## Verification

The core is tested with in-memory services and a temporary JSONL event log. The
full repository checks remain authoritative for ClawSweeper behavior:

```bash
pnpm run check
```

Live Box/Devin findings are recorded in
`docs/repair/devin-acp-box-spike.md`; credentials and one-time codes do not
belong in this repository.
