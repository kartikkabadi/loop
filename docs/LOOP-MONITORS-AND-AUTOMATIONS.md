# Loop Monitors and Automations

This document defines a human-facing hourly monitor for Loop. It is a
read-only attention aid, not a second control plane and not an autonomous
dispatcher.

## Purpose and capability boundary

The monitor runs as a recurring ChatGPT automation using the app's local
scheduled-job capability. Its prompt should instruct it to read the connected
Loop MCP surface and produce a compact digest. It must not create an
automation, modify a project, change a repository, or call an external
resource as part of this monitor's setup or operation.

Each run should read:

- `loop.workday.get` for the compact task, review, blocker, and capacity view;
- `loop.capacity.get` when the workday result does not contain sufficient
  capacity or cooldown detail;
- `loop.tasks.get`, `loop.review.get`, and evidence reads only for items that
  need enough detail to explain an attention item;
- the current Loop state, rather than stale Project files, for status claims.

The digest should contain only material changes or actionable items:

1. capacity: active admissions, waiting work, cooldowns, and provider failures;
2. blocked tasks: task, blocker, age, and the next human decision or missing
   proof;
3. review-ready work: exact task/PR identity, reviewed head, gates, and the
   human review action;
4. failed recovery: stale runs, exhausted recovery, escalations, or retries
   that need inspection;
5. proposed work, if any, clearly marked as a proposal with its reason and
   required approval.

If nothing changed and nothing needs attention, report a short “no action
needed” digest with the read timestamp. Never imply that an agent is complete
without exact-head evidence and the human acceptance state.

## What the monitor may propose

After reading current state, the monitor may propose one of these bounded next
steps:

- review a task already in `REVIEWING` or `HUMAN_ACCEPTANCE`;
- resolve or clarify a named blocker;
- approve or dispatch a task whose contract is already validated, but only as
  an explicit human-facing proposal;
- request a bounded repair for specific recorded findings;
- investigate a failed recovery or wait for a recorded cooldown to expire.

The proposal must name the task, current version, exact reason, expected
effect, and one next action for the human. A proposal is not an approval and
must not be represented as a ready task merely because it appeared in the
digest.

## Human approval is always required

The monitor may never silently perform a Loop write. Human approval is
required for creating a task draft or issue, validating or approving a task,
starting or resuming a run, requesting repair, pausing, cancelling,
escalating, submitting a review, accepting completion, or changing production
systems. Merge, publication, secret handling, and changes to automation
configuration are also human-only actions.

The approval must apply to the exact next mutating action. A previous approval
to plan, inspect, or create a draft does not authorize dispatch, repair,
completion, or any later transition. If the connected MCP tools or required
scope are unavailable, the monitor reports that fact instead of simulating a
result.

## Cooldown and noise suppression

Run the monitor hourly, but suppress repeated alerts using a stable alert key
made from the task or system identity, condition, blocker or failure reason,
reviewed head when relevant, and recovery generation. Do not repeat an item
until its key changes, its state becomes actionable again after a cooldown, or
the human explicitly asks for a refresh.

Capacity rate limits, quota failures, and provider outages should be grouped
into one capacity alert with the recorded `cooldownUntil` and reason. Do not
recommend repeated retries while a cooldown is active. A waiting task is not a
failure merely because it has not received a Box or provider slot.

The digest should cap each section to the highest-signal items and include a
count of suppressed or additional items. It should preserve links or stable
task/PR identifiers where available, but avoid dumping transcripts, raw logs,
secrets, or unchanged evidence.

## Idempotency and stale reads

The monitor is safe to run more than once. It performs reads only, uses the
latest `generatedAt` and task versions, and never derives a write from a stale
snapshot. If a future approved action is taken from a digest, the action must
re-read the task and carry Loop's expected version plus a stable idempotency
key. Version conflicts fail closed and require a fresh read.

The monitor must not infer recovery from a timeout, a missing response, or an
agent's own message. It should report `unknown` when state cannot be read and
should distinguish a stale workflow, a provider cooldown, a blocked contract,
and a failed verification. The Loop event ledger and review packet remain the
authoritative records.

## Boundary with durable Loop execution

| Surface | Responsibility | Lifetime and mutation |
| --- | --- | --- |
| ChatGPT hourly monitor | Read status, summarize attention, propose a next human action | Best-effort recurring local job; no implicit writes |
| Durable Loop Worker | Admit approved work, coordinate adapters, hold leases, and reconcile runtime state | Durable service state; bounded authenticated mutations |
| Cloudflare Workflow | Progress one approved run across waits, retries, generations, and external events | Durable per-run orchestration; never substitutes for approval |

The monitor must not become a polling worker, provider-capacity allocator,
lease owner, stale-run reconciler, retry engine, or event consumer. Those
responsibilities belong to Loop's durable control plane and Workflow paths,
which already persist task state, checkpoints, generations, cooldowns, and
recovery decisions. Conversely, a Worker or Workflow must not treat a monitor
digest or ChatGPT text as authorization. Human gates, exact-head verification,
and the Loop state machine remain in force regardless of how the digest was
generated.

## Suggested hourly prompt

> Read the current Loop workday and capacity state. Produce a compact digest of
> changed or actionable capacity issues, blocked tasks, review-ready PRs, and
> failed recovery. Suppress unchanged items using their stable task/reason/head
> identity. For each item, state the evidence, current version, and one human
> decision. You may propose a next action, but do not call any write tool,
> create an issue, dispatch work, request repair, change production, or modify
> automation. If live state is unavailable, say so explicitly.
