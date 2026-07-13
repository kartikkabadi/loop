# Loop product model

Loop is a software-development harness, not a chat wrapper and not a single
model pretending to be a software factory. Its job is to make the execution
environment explicit, durable, observable, and safe enough for agents to work
inside.

## The four roles

| Role | Responsibility | Authority |
| --- | --- | --- |
| ChatGPT | Discover the repository, ask setup questions, form the plan, create the task, steer runs, and explain evidence | Planning and steering |
| Loop | Build the environment contract, allocate the Box, enforce policy, persist state, reconcile failures, and project status | Execution policy and lifecycle |
| Devin | Implement and test inside the prepared Box using the exact task context | Bounded code changes |
| Humans | Approve the plan, resolve blockers, review the exact head, and accept completion | Final authorization |

Review providers are adapters, not hidden authorities. A Claude review lane can
be added behind the review-provider boundary, but no model—Devin, Claude, or
ChatGPT—can self-approve or merge a change.

## Environment-first execution

Every executable task should carry an environment context containing:

- repository, base branch, and exact base SHA;
- authority and instruction files;
- required tools and package manager;
- verification commands and browser availability;
- network policy and known constraints;
- provider identity (`Devin`, model `SWE-1.7`);
- mandatory human gates for review and acceptance.

The context is hashed with the task contract and rendered into the runner
prompt. A worker that resumes later receives the same contract-bound context,
plus its durable handoff. This prevents the common failure mode where an agent
has a capable model but the wrong repository, missing tools, stale instructions,
or no way to prove its work.

## Human-in-the-loop state machine

```text
discover -> plan draft -> human approval -> provision environment
    -> execute -> verify exact head -> review-ready
    -> human review -> repair or accept -> complete
```

The human can be the repository owner, a maintainer, a contributor, or a
delegated reviewer. The identity and gate decision are durable facts, not an
implicit chat assumption.

## Factory behavior

Parallel work is allowed only when repository leases and path scopes prove that
the workers cannot corrupt one another. Every worker is independently:

1. given the same authoritative task contract;
2. started in a prepared, disposable environment;
3. required to publish exact-head evidence;
4. reviewed against that exact head;
5. paused, repaired, or replaced when the environment or provider fails.

This is the tournament-factory shape: workers compete through evidence and
gates, not through unreviewed writes to the default branch.

## Product boundary

Self-hosted Loop owns the Cloudflare control plane, GitHub integration, and
Boxes. A future hosted plan can own those operational resources for a monthly
fee, while customers retain their GitHub repositories and provider accounts.
The hosted version must preserve the same boundaries: customer-scoped secrets,
tenant-isolated state, explicit human gates, and no provider credential copied
into an agent prompt.
