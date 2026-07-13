# Loop

Loop is a durable software-work loop: plan in ChatGPT, approve a task, run it
in an isolated workspace through the configured execution provider, verify the
exact commit, review the evidence, repair bounded failures, and stop at an
explicit human acceptance gate.

The control plane is Cloudflare Workers, D1, R2, Durable Objects, Queues, and
Workflows. GitHub is the human-visible ledger. Workspaces are the execution plane.
GitHub Actions is intentionally limited to repository checks and dependency
security; it never hosts long-lived agents or consumes provider capacity.

## Operating loop

1. ChatGPT calls `loop.workday.get` for one compact status read, then discovers
   the repository and produces a setup plan for the environment, tools,
   authority files, verification surfaces, and human gates.
2. ChatGPT creates a complete, versioned Loop task contract carrying that
   environment context.
3. Loop stores the draft and can project it to a `loop:draft` GitHub issue.
4. A human validates and approves the plan; marking the issue `loop:ready`
   enables webhook intake.
5. Cloudflare allocates a disposable workspace and bootstraps Node, pnpm, the
   execution provider,
   `agent-browser`, and Socket Firewall (`sfw`) idempotently.
6. The workspace runner invokes the provider adapter with the configured model
   enforced and the signed
   context pack, publishes a commit-bound PR and evidence, then waits for review.
7. Passing exact-head gates convert a draft PR to ready-for-review and add
   `loop:review-ready`. A human reviews the packet and either accepts it or
   requests one of the bounded repair paths.
8. Loop self-heals stale runtime state and resumes from durable checkpoints;
   it never silently merges or treats model output as approval.

## Status vocabulary

Loop lifecycle labels are intentionally small and composable:

- `loop:draft`: plan exists but is inert.
- `loop:ready`: a complete issue contract may be admitted.
- `loop:running`: execution is active in a workspace.
- `loop:review-ready`: exact-head verification passed and human review is next.
- `loop:blocked`: an explicit decision, dependency, or proof is missing.
- `loop:complete`: human acceptance and completion were recorded.
- `loop:failed`: bounded recovery was exhausted or an unsafe condition stopped it.

The authoritative state remains the Loop event ledger and review packet; labels,
checks, comments, and PR draft state are projections that can be reconciled.

## Execution provider capacity

The execution provider’s public interfaces do not expose a universal account
concurrency limit. Loop therefore starts at two active provider admissions, persists a deployment
ceiling (currently ten), and ramps one slot after observed successful
completions. A rate, quota, or provider failure halves the active admission
limit and records a cooldown. Waiting tasks retain their contract, checkpoint,
reason, and next attempt time; a later workspace runner can resume them safely.

Inspect this through the authenticated `loop.capacity.get` MCP tool. Loop does
not select a paid fallback model: the configured execution model is the only
permitted model.

## Development

Requirements: Node 24 or newer and pnpm 11.10.0.

```bash
corepack enable
pnpm install
pnpm run check
pnpm run gateway:typecheck
```

The authoritative architecture, threat model, failure policy, and rollout
contract are in [`docs/LOOP_V2.md`](docs/LOOP_V2.md). Operational GitHub and
Workspace behavior is documented in [`docs/WORKFLOW-OPERATIONS.md`](docs/WORKFLOW-OPERATIONS.md).
The product roles and environment-first model are in
[`docs/PRODUCT-MODEL.md`](docs/PRODUCT-MODEL.md), and the self-host onboarding
contract is in
[`docs/SELF-HOSTING-SETUP.md`](docs/SELF-HOSTING-SETUP.md).
The human and agent PR review layout is documented in
[`docs/PR-REVIEW-SURFACE.md`](docs/PR-REVIEW-SURFACE.md).

## Safety boundary

Loop exposes intent-level MCP tools only. It does not expose raw shell,
credentials, arbitrary prompts, provider controls, or merge operations to
ChatGPT. Host-owned runners deliver bounded, authenticated result events;
GitHub App credentials remain Worker secrets and are never passed into the
execution provider.
