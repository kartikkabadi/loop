# Loop vision

Loop is an account-wide software-work orchestration system that lets an
operator plan and approve work in ChatGPT, execute it through isolated coding
runtimes, continuously validate and repair the result, and return complete
evidence for repeated human-led review.

The authoritative architecture and domain contract are in
[`docs/LOOP_V2.md`](docs/LOOP_V2.md). The existing ClawSweeper implementation
is retained as Loop's conservative repository-operations subsystem, not as the
whole product.

## What Loop owns

- immutable task contracts and revisions;
- repository ownership mode and scope policy;
- bounded task lifecycle and repair convergence;
- exact-input evidence binding and stale-gate invalidation;
- approval, pause, resume, cancellation, and human-acceptance authority;
- durable events, review packets, and audit reconstruction;
- high-level operator/MCP actions.

## What Loop delegates

- repository intake, deterministic GitHub policy, and validation to ClawSweeper;
- workspace lifecycle to Crabbox;
- isolated coding execution to a Box-hosted Devin ACP runtime;
- code, CI, branches, and review history to GitHub;
- durable cloud scheduling and storage to Cloudflare adapters.

## Non-goals

Loop does not build a browser automation layer, scrape ChatGPT, expose raw
remote shell, read secrets through MCP, let models override policy, expose
automatic merge in v1, or pretend a local demo is a deployed control plane.

## Safety principles

1. Proposal precedes mutation.
2. A model cannot approve its own work.
3. Claims are not evidence.
4. New code invalidates old proof.
5. Every loop and external mutation is bounded or reconcilable.
6. Human stop always wins.

## Current implementation

The repository contains an executable vertical slice and live control plane:

- typed task contract and risk-floor linter;
- orthogonal phase/condition/gate state machine;
- append-only in-memory and JSONL task event stores;
- versioned application operations and exact-head review packets;
- existing Crabbox and Devin ACP runtime adapters;
- Box-local Loop Runner with SWE-1.7-only execution, adaptive provider capacity
  leases (two-start, ten-slot deployment ceiling),
  durable checkpoints, cooldown sleeps, and cancellation-generation fencing;
- Cloudflare Worker MCP gateway, D1 event/run/checkpoint projections, GitHub
  webhook intake, Workflows, Durable Objects, Queues, R2 evidence, and runtime
  reconciliation;
- regression tests for the core invariants and live Box/Devin smoke evidence.

Auth0 and GitHub App publication credentials remain deployment configuration
rather than domain-core dependencies. They must be provisioned before
authenticated ChatGPT writes or GitHub publication can be enabled. The
workflow-event secret is provisioned on the live Worker and existing Box
runner; future Box rollout remains an external deployment concern.
