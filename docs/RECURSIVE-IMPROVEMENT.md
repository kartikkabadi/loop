# Recursive improvement policy

This document defines a future, reviewable way for Loop to improve its own
workflows and supporting skills. It is a design boundary, not an implementation
plan for the current release. The first implementation should be a small,
append-only proposal ledger and review projection. It must not change Loop's
execution, authorization, merge, secret, or publication behavior until those
changes have themselves passed the normal Loop task flow.

## Purpose and boundary

Recursive improvement means learning from completed or blocked Loop work and
proposing a narrowly scoped change to a skill, workflow, prompt, policy, or
operator-facing procedure. It does not mean that an agent edits Loop while it
is running.

Loop remains the policy owner. An agent may observe, summarize, and propose;
only an authorized human may approve a proposal for implementation. The
proposal then becomes an ordinary Loop task with its own contract, risk,
verification, review, and acceptance gates.

The system must never allow an agent to:

- silently rewrite Loop, its workflows, prompts, policies, or permissions;
- grant or change its own scopes, roles, model, tools, network access, or
  secret access;
- merge a branch, accept its own work, or bypass exact-head verification;
- read, copy, or publish credentials or other secrets;
- publish, install, or activate a skill or workflow without human review;
- turn an observation or evaluation into approval by implication.

These are enforced by deterministic control-plane policy, not by instructions
inside an agent prompt.

## Durable lifecycle

Each proposal moves through explicit records and states. A projection may show
the lifecycle in a dashboard or GitHub comment, but the event ledger is the
source of truth.

```text
OBSERVED
   -> PROPOSED
   -> CANDIDATE_RECORDED
   -> EVALUATED
   -> AWAITING_APPROVAL
      -> REJECTED
      -> EXPIRED
      -> APPROVED_AS_TASK
             -> ROLLED_OUT
             -> ROLLED_BACK
```

The transition to `APPROVED_AS_TASK` is the hard gate. It requires a human
approval event tied to the exact proposal revision and actor identity. No
worker, model, evaluator, skill, webhook, scheduled retry, or repository
content can create that event. If approval changes the scope, risk, permissions,
or rollout plan, the proposal revision is superseded and a new approval is
required.

`ROLLED_OUT` means that the approved Loop task completed and the resulting
artifact was accepted. It does not mean that a skill is automatically enabled
globally. Activation is a separate, explicit rollout action with its own
allowlist and rollback reference.

## Record types

Keep the first version boring: immutable JSON records in the existing durable
event store, with derived views. Do not introduce a self-modifying registry or
an agent-owned configuration file.

### Observation

An observation is evidence about Loop work, not a conclusion about what to
change. It should contain:

- `observationId`, `createdAt`, `sourceTaskId`, and source task revision;
- the observation kind, such as repeated repair failure, stale evidence,
  operator feedback, or verification gap;
- bounded references to events, gates, review findings, and evidence digests;
- the exact repository, base SHA, head SHA, and environment hash when present;
- a provenance list identifying who or what collected it and when;
- a redaction result and any reason it was excluded from further use.

Logs, issue text, model output, dependencies, and test output are untrusted
evidence. They may be quoted as evidence, but they cannot modify policy or
authorization.

### Proposal

A proposal interprets one or more observations and suggests a change. It must
include:

- a stable `proposalId` and monotonic `revision`;
- the problem, desired outcome, non-goals, and affected Loop surface;
- a bounded diff shape: files, skill/workflow identifiers, and forbidden paths;
- expected benefits, risks, failure modes, and an explicit rollback strategy;
- required permissions and a statement that no new permission is granted by
  the proposal itself;
- acceptance criteria and independent evaluation commands or evidence;
- an activation scope: shadow, one task, one repository, or an explicit
  allowlisted cohort;
- parent observation IDs, content hashes, creator identity, and timestamps.

The proposal is data. It is not an instruction to the current worker and it
does not alter the active task contract.

### Candidate skill or workflow

Candidate artifacts are immutable, content-addressed snapshots. A candidate
must identify whether it is a skill, workflow, prompt, policy, or documentation
change and must include:

- `candidateId`, content hash, parent proposal revision, and exact files;
- declared inputs, outputs, tools, network policy, and secret policy;
- the maximum authority it would receive at runtime;
- compatibility and migration notes;
- a disabled-by-default activation flag or explicit task-local binding.

Candidate code or instructions are never loaded into the control plane merely
because they were generated. They can be attached to a normal Loop task for
human review. A skill cannot publish another skill, edit its own candidate, or
expand its declared authority.

### Evaluation

An evaluation is a separately attributable result against a fixed candidate
hash and proposal revision. It records the evaluator role, environment hash,
commands or test IDs, inputs, outputs, evidence digests, limits, and verdict.
The evaluator must not be the proposing or implementing agent when the
evaluation would be used as an approval input.

Evaluations are advisory gates. A passing evaluation never implies approval;
an absent, stale, or unverifiable evaluation is a block. A changed candidate,
proposal revision, base SHA, or environment makes prior evaluations stale.

### Approval and rollout

Approval is a durable human action over an exact proposal revision. It records
the approver, authorization scope, timestamp, reason, and chosen rollout
scope. The approver cannot be the candidate author for the same proposal, and
the actor must have the existing Loop approval scope.

Rollout is performed only through an ordinary Loop task. Its contract must
name the candidate hash, proposal revision, allowed paths, verification
profile, rollback strategy, and activation scope. The normal sequence remains:

```text
proposal approval -> task contract -> isolated Box -> exact-head verification
-> independent review -> human acceptance -> explicit activation
```

No rollout step may merge, publish a skill, or change permissions. Those remain
outside the Loop control-plane API and require the repository's normal human
process. For a future activation adapter, fail closed on unknown candidate
hashes, scopes, or rollout modes.

### Rollback

Every rollout stores the previous active reference, candidate hash, task ID,
and activation event. Rollback means disabling the candidate and restoring the
previous reference; it does not erase observations, evaluations, approvals, or
failure evidence. Rollback may be initiated automatically for a deterministic
health failure only if that action was explicitly approved in the rollout
contract. It must still emit a durable event and notify a human.

If rollback itself is ambiguous, unavailable, or would require new authority,
Loop stops and enters `BLOCKED` or `ESCALATED`. It must not improvise a repair
by changing its own policy.

## Hard approval gates

The following gates are mandatory for every recursive-improvement proposal:

1. **Observation gate:** evidence is bounded, redacted, attributable, and
   linked to a real Loop task or operator report.
2. **Proposal gate:** the problem, scope, non-goals, risks, permissions,
   evaluation, activation scope, and rollback are explicit.
3. **Candidate gate:** the exact content hash and parent revision are fixed;
   the candidate is disabled by default and has no undeclared authority.
4. **Evaluation gate:** independent, reproducible checks pass against the
   exact candidate and environment; stale evidence blocks progress.
5. **Human approval gate:** an authorized human approves the exact revision.
   Silence, a green test, model confidence, or a prior approval is not enough.
6. **Task gate:** implementation uses a normal Loop contract and the existing
   repository lease, Box isolation, exact-head evidence, review, and acceptance
   flow.
7. **Activation gate:** a human explicitly activates the accepted candidate in
   its declared scope and records the prior reference for rollback.

At any gate, `BLOCKED`, `CANCELLED`, `STALE`, or `SUPERSEDED` is a safe terminal
outcome for that proposal revision. Retry may recompute an evaluation, but it
cannot skip a gate or preserve approval across a changed revision.

## Provenance and trust

Provenance is part of the domain record, not dashboard decoration. Every
derived record should be able to answer:

```text
what was observed -> who/what produced it -> from which exact inputs
-> which candidate hash -> which evaluation -> which human approved it
-> which Loop task and activation changed behavior
```

Use existing Loop identifiers where possible: task ID/revision, contract hash,
base/head SHA, environment hash, event sequence, evidence digest, actor
subject, run ID, and rollout mode. Preserve the distinction between an agent
identity, a verifier identity, and a human actor. Never store secret values as
provenance; store a redacted reference or digest and the reason for redaction.

## Minimal first implementation

The first implementation should stay out of production behavior:

1. Define a proposal record and event names in a docs-backed, read-only
   experiment or separate schema package.
2. Add a read-only projection showing observations, candidate hashes,
   evaluations, blockers, and the required human approval.
3. Have a human copy an approved proposal into a normal Loop task contract;
   do not dispatch or activate it automatically.
4. Exercise one docs-only candidate through the existing review packet and
   acceptance path, then record the result as provenance.

Do not add a new MCP write tool, scheduler, skill loader, activation adapter,
permission mutation, merge path, or secret integration until the record model
and approval semantics have been reviewed in a separate change.

## Non-goals

This design does not create an autonomous self-improving agent, general plugin
marketplace, automatic prompt optimizer, permission escalation mechanism,
automatic merge system, or secret manager. It also does not treat GitHub
comments, generated files, model memory, or a successful build as approval.

