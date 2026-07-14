# Loop implementation ledger

This ledger follows [`docs/LOOP_V2.md`](docs/LOOP_V2.md). Completed work is
marked with evidence; open work remains explicit instead of being represented
by optimistic release language.

## Completed

- [x] Read and preserve the Loop V2 architecture, security model, and exact-SHA
      evidence rules.
- [x] Prove the Box/Crabbox lifecycle and record transport limitations in
      `docs/repair/devin-acp-box-spike.md`.
- [x] Define capability-gated `AgentSessionRuntime` contracts.
- [x] Route existing Codex lanes through a behavior-preserving process adapter.
- [x] Define `CrabboxWorkspaceHost` as a lifecycle-only boundary.
- [x] Implement and harden the Box-hosted Devin ACP runtime with deny-all host
      services, environment scrubbing, cancellation, bounded protocol I/O, and
      regression fixtures.
- [x] Implement Loop task contracts, risk-floor linting, stable contract hashes,
      orthogonal state transitions, exact-SHA gate invalidation, append-only event
      stores, version checks, and review packets.
- [x] Persist actor attribution for task creation, approval, review, acceptance,
      and completion; block the approving actor from submitting the review and
      the reviewing actor from accepting or completing the task.
- [x] Persist explicit task decisions, open questions, and relevant repository
      paths in the hashed contract context.
- [x] Implement the Cloudflare Worker gateway with MCP JSON-RPC, protected
      resource metadata, OAuth 401 challenges, intent-only tool routing, and
      fail-closed Auth0 JWT/JWKS verification.
- [x] Adopt the useful CodexPro MCP patterns without exposing a hosted shell:
      server instructions, concrete tool schemas, read/write annotations,
      per-tool OAuth metadata, bounded structured results, and native scope
      challenges. See `docs/CODEXPRO-INTEGRATION.md`.
- [x] Serve authenticated MCP traffic through the official TypeScript SDK's
      Web Standard Streamable HTTP transport while retaining the Loop intent
      router as the policy boundary.
- [x] Expose the same authenticated intent router through a bounded REST tool
      transport and public MCP documentation metadata.
- [x] Provision the remote control-plane storage, apply the initial migrations,
      and deploy the Loop gateway through the configured Cloudflare
      environment.
- [x] Add the D1 event-store adapter, GitHub repository adapter, structural
      Crabbox workspace adapter, and durable execution coordinator through review
      and human acceptance.
- [x] Add focused MCP, SHA-256, gateway, stale-gate, JSONL, and coordinator
      coverage; `pnpm run check` passes all repository checks.
- [x] Add GitHub HMAC webhook verification, D1 delivery deduplication, Queue
      fanout with explicit ack/retry, a dead-letter queue, and a durable webhook
      event ledger.
- [x] Add exact-bound evidence metadata in D1, content in R2, bounded MCP
      evidence reads, and scheduled retention cleanup.
- [x] Add a repository-keyed SQLite Durable Object and route authenticated MCP
      writes through its serialized boundary.
- [x] Add deterministic GitHub check-run and marker-backed status-comment
      publication adapters with exact-head external IDs and update-in-place behavior.
- [x] Add a fail-closed, HMAC-authenticated workflow-event ingress for host-owned
      Box/runner completion events.
- [x] Add durable Box allocation intents, deterministic names, timeout
      reconciliation, and orphan/ambiguous resource classification.
- [x] Add optional fresh-workspace verification isolation and pure repair
      convergence limits for same-diff, repeated-failure, and budget cases.
- [x] Add durable run records for Workflow instance lifecycle, attempt,
      generation, and status reconciliation.
- [x] Add a `loop:ready` GitHub issue template, strict contract-block intake,
      and marker-backed status rendering for the zero-copy bridge.
- [x] Add the operator `loop` CLI for doctor/login guidance, task/run/review,
      evidence commands, and typed Box maintenance delegation.
- [x] Add a Box-local Loop Runner package and CLI with jailed ACP host services,
      strict result parsing, runner generation fencing, and signed event output.
- [x] Enforce SWE-1.7 as the only Devin model, start with two adaptive provider
      admissions under a ten-slot deployment ceiling, checkpoint ACP sessions,
      sleep through provider cooldowns, and resume with cancellation-generation
      fencing.
- [x] Add scheduled stale-run, stale-runner, and expired Box-intent
      reconciliation; Box waits no longer reserve Devin capacity.
- [x] Connect valid `loop:ready` GitHub issue webhook events to durable draft
      task creation with delivery-safe idempotency.
- [x] Add a fail-closed GitHub issue-comment `@loop` command ledger and actor
      allowlist bridge for status, dispatch, stop, resume, retry, verify,
      explain, and review intents. Mutating commands require
      `LOOP_ALLOWED_GITHUB_ACTOR`; unconfigured or unauthorized actors are
      recorded as rejected.
- [x] Exercise the runner against the existing Box/Devin environment; a real
      ACP turn completed, missing result evidence became `candidate_unknown`,
      and the Box was stopped afterward.
- [x] Add the idempotent Loop Box bootstrap manifest: Devin SWE-1.7
      verification/repair, pinned pnpm, pinned agent-browser, pinned Socket
      Firewall Free (`sfw`), browser runtime install, offline doctor, and an
      allowlisted command boundary. Package-manager installs run through `sfw`.
- [x] Add bounded self-healing: stale runtime observations become durable retry
      or escalation plans, recovery increments the cancellation generation, and
      recovered workflows use versioned identities.
- [x] Add ChatGPT-facing draft issue creation, explicit ready-label promotion,
      draft pull-request publication, and durable issue-to-task intake.
- [x] Add repository-owned Box browser verification guidance and prove the
      live health endpoint from a resumed Box with agent-browser.

## Current acceptance bar

```text
pnpm run build:all
pnpm run test:unit
pnpm run test:repair
pnpm run check
```

The core must remain usable with in-memory fakes and a temporary JSONL store;
no test may require GitHub, Cloudflare, Box, Devin credentials, or a paid model.

## Next slices

### Gateway and MCP

- [x] Add a Cloudflare Worker gateway with protected-resource metadata and a
      verified OAuth subject/scope boundary.
- [x] Expose only intent-level read/write tools with idempotency and expected
      version on every write.
- [x] Add webhook signature verification and delivery deduplication.

### Durable orchestration

- [x] Add the D1 adapter and durable event migration for task events.
- [x] Add the intent-level coordinator and structural GitHub/Crabbox adapters.
- [x] Add the repository Durable Object boundary, Queue delivery, explicit
      retries/DLQ, webhook retention, and scheduled cleanup.
- [x] Add provider workflow leases, orphan-intent cleanup, bounded run retries,
      and scheduled runtime reconciliation.
- [x] Add cancellation-generation fencing for stopped and replacement runs.
- [x] Add repository writer/path leases to the repository Durable Object, renew
      them from runner heartbeats, and release them across cancellation,
      cooldown, failure, and publication paths.
- [x] Add deterministic host-side runner publication with expected/forbidden
      path checks, secret-pattern rejection, stable branch/commit identity,
      force-with-lease pushes, and GitHub App PR reuse.
- [x] Keep Box stop/delete execution behind the Node maintenance adapter;
      scheduled cleanup can invoke the same typed control boundary without
      exposing Box credentials to the Worker or agent.
- [x] Add deterministic GitHub check/comment publication around the coordinator.
- [x] Add a GitHub App installation-token publication client with in-memory
      short-lived token caching; connecting configured App credentials remains
      an external deployment step.
- [x] Configure the workflow-event secret on the Worker and existing Box runner;
      the local CLI emits validated signed payloads and unsigned events fail
      closed. Automating rollout across future Boxes remains an external
      deployment adapter concern.
- [x] Add durable runner registration and heartbeat projections with stale
      generation rejection.
- [x] Make a successful Loop Runner result carry the current git head and
      commit-bound preliminary gates; incomplete result files emit failure and
      cannot satisfy Workflow completion.
- [x] Verify the live GitHub repository hook and signed delivery path; a test
      event was accepted by the Worker and persisted by the Queue consumer in
      the remote D1 webhook ledger.

### Verification and review

- [x] Add exact SHA/revision-bound verification gates and review packets.
- [x] Add evidence object storage/retention with exact SHA/revision binding.
- [x] Add independent verifier execution on a clean exact-head workspace.
- [x] Add repair convergence limits, same-diff detection, and escalation policy.
- [x] Re-enter bounded execution after `changes_requested` review results in
      both the local coordinator and the durable Cloudflare Workflow.
- [x] Wire GitHub issue intake to the configured webhook and durable task event
      store, including the fail-closed `@loop` issue-comment command ledger.
      GitHub status projections still wait on App credentials.

### Rollout

- [x] Deploy the unauthenticated, fail-closed gateway and verify live metadata,
      tool discovery, and 401 behavior.
- [x] Add public `/healthz` and `/health` probes for deployment and CLI doctor
      checks without exposing task data or credentials.
- [ ] Configure an Auth0 issuer/audience and allowed principal. This requires
      the operator's Auth0 tenant details; no Auth0 secrets are present in the
      workspace or Worker.
- [x] Implement explicit fail-closed shadow/assisted/controlled/normal rollout
      policy, scheduled approved-task dispatch, and Workflow admission checks.
- [ ] Promote live configuration from shadow to assisted execution for R0/R1
      tasks after Auth0 is configured.
- [ ] Promote live configuration to controlled/normal execution for approved
      R2 tasks after an observed shadow/assisted soak.
- [x] Keep R3/R4 human-gated; v1 has no automatic merge. Workflow admission and
      completion policy both enforce this boundary.

## Explicitly forbidden shortcuts

- Do not expose arbitrary shell or raw agent prompts through MCP.
- Do not put GitHub write credentials, Box API keys, Cloudflare admin tokens, or
  App private keys in the agent environment.
- Do not let a model waive a failed gate or lower a risk floor.
- Do not treat a green local build as proof of live Box, GitHub, or Cloudflare
  behavior.
- Keep the legacy ClawSweeper/Codex source lane isolated from Loop execution
      until a measured Devin/Box soak proves replacement parity; it is not an
      active GitHub Actions lane.
