# Box lifecycle durability design and test plan

## Purpose and boundary

This plan covers work that can outlive a single process: multi-day tasks,
week-long pauses, provider lease expiry, Box stop/resume/fork/delete, worker
restart, and cleanup after an uncertain provider response. It is intentionally a
design and verification plan. This pass does not change production lifecycle
behavior and does not treat provider behavior as known unless a live probe or a
provider contract proves it.

The durable source of truth is Loop control state. A Box, Crabbox lease, local
process, ACP session, branch, worktree, and pull request are external resources
whose identity must be recorded and re-checked before reuse.

## What the current code proves

The current implementation and tests establish these narrower invariants:

- `LoopBoxAllocator` persists an allocation intent before create, retries an
  idempotent intent, reconciles one matching resource after an uncertain create,
  and refuses ambiguous matches.
- Allocation stop and delete are repeat-safe at the allocator boundary. Delete
  stops first and records `deleted` only after the provider delete succeeds.
- Reconciliation classifies unowned provider resources as orphaned and expired
  unacknowledged intents as orphaned/expired state; it does not silently delete
  them.
- The Crabbox adapter extracts the canonical provider lease identity from the
  final valid timing record. Requested slugs are not reused as operational IDs.
- Workspace sync, launch, status, artifact collection, and stop are separate
  one-shot commands. The host is not an ACP transport and does not claim that a
  running process survives a provider lifecycle transition.
- Box bootstrap is repeatable, verifies pinned tools, repairs the known Devin
  executable-link failure, and reports a fail-closed readiness result.
- Runner checkpoints are atomically written, bound to task/run/revision/contract
  identity, store a session digest in emitted state, and can carry a bounded
  handoff when a session cannot be loaded.
- Runner registrations and repository/path leases fence stale generations.
  Publication derives a deterministic branch, checks the base/head race, and
  verifies that the GitHub PR head equals the pushed head.
- Runtime reconciliation fences stale runs by the observed `updatedAt` and
  generation before marking them failed.

These are control-plane guarantees. They do not prove that the provider offers
resumable snapshots, that a lease TTL is renewed, that a fork copies a given
filesystem surface, or that a deleted Box can be recovered.

## Identity model required for durable work

Every persisted run should be able to answer the following without consulting
process memory:

| Resource | Required identity | Reuse guard |
| --- | --- | --- |
| Task | task ID + contract hash + revision | expected state version |
| Run | run ID + generation + cancellation generation | stale event fence |
| Allocation | allocation ID + deterministic name + attempt | one-to-one provider match |
| Box/provider lease | provider + canonical Box/lease ID + observed state | live provider lookup |
| Workspace | canonical lease ID + actual slug + source repository | never substitute requested slug |
| Snapshot | provider snapshot ID/version + captured-at + parent Box ID | resume/fork must name source snapshot |
| Runner | runner ID + Box ID + run generation | heartbeat/registration fence |
| ACP session | opaque session ID digest + task/run/contract identity | load only matching checkpoint |
| Git checkout | repository + base SHA + worktree path + head SHA | clean-head/base race check |
| Branch/PR | repository + branch + PR number/URL + head SHA | exact-head verification |

Snapshot identity is deliberately absent from the current allocation and
workspace types. It must be added to the contract before resume/fork can be
implemented safely; inferring it from a Box ID or slug is not sufficient.

## Lifecycle state machine

The control plane should model provider transitions explicitly rather than
collapsing them into `running` and `stopped`:

```text
intent -> creating -> running
   |        |          |
   |        |          +-> stopping -> stopped
   |        +-> create-unknown -> reconciling -> running | ambiguous | failed
   |
   +-> expired-before-create -> orphaned

stopped -> resuming -> running
stopped -> forking -> running(child)
running/stopped -> deleting -> deleted
```

Each transition needs an operation id/idempotency key, an observed provider
identity, the last provider state, and a durable timestamp. A timeout must leave
the operation in an explicitly uncertain state until reconciliation proves the
outcome. `delete` must never be inferred from a local command return alone when
the provider response was lost.

For a long-lived task, a worker restart is expected, not exceptional:

```text
control state -> provider lookup -> snapshot/Box lookup -> bootstrap ->
checkpoint validation -> session load or bounded handoff -> run -> checkpoint
```

Bootstrap must be safe after stop/resume/fork and after a host reboot. It must
not assume that child processes, sockets, temporary paths, or shell state are
still present. Durable files must be under the provider's documented snapshot
surface or in Loop control storage; test paths such as `/var/tmp` must not be
used as evidence of durability without a provider contract.

## Required provider probes before implementation

These are empirical gates, not assumptions. Record the exact CLI/API version,
command, response shape, and UTC timestamp in redacted test evidence.

1. Create a Box with a short TTL and record Box ID, lease ID, deterministic name,
   expiry, and all returned snapshot fields.
2. Write sentinel files under each candidate durable path and start a uniquely
   identifiable process. Stop the Box, wait for the provider terminal state,
   resume it, and verify which files and processes remain.
3. Fork from the stopped Box. Verify parent/child identity separation, sentinel
   contents, named volumes, repository checkout, branch, and task metadata.
4. Delete parent and child independently. Verify whether snapshots, leases, and
   provider list records disappear, and whether any delete is eventually
   consistent.
5. Let a lease expire while the worker is offline. Verify whether the Box is
   stopped, deleted, recoverable, or merely unavailable, and whether a new Box
   can safely reuse the deterministic name.
6. Interrupt create/stop/resume/fork/delete after the provider accepts the
   request but before the client receives the response. Reconcile by canonical
   identity, never by a fuzzy slug match.
7. Resume after at least one day, and repeat after a week where the provider
   supports it. Verify credentials remain scoped, bootstrap is idempotent, the
   Devin link is repaired if needed, and the checkpoint/session handoff is still
   valid.

No production path should be enabled from a probe result until the result is
stable across two independent runs and the response fields are represented in
typed code or explicitly treated as opaque.

## Focused scenario matrix

| Scenario | Setup | Assertions | Cleanup |
| --- | --- | --- | --- |
| Fresh start | intent + successful create | one allocation, canonical Box identity, exact repo/base SHA | stop, then delete |
| Create timeout | provider creates, client times out | reconcile finds exactly one identity; retry does not create a second Box | delete reconciled Box |
| Duplicate match | two same-name resources | allocation becomes ambiguous; no automatic close/delete | operator-reviewed cleanup |
| Stop snapshot | dirty checkout + checkpoint + sentinel | stop operation is durable; snapshot identity recorded; process liveness is not assumed | resume or delete |
| Resume after restart | stopped Box, new coordinator process | provider state is waited on; bootstrap runs; checkpoint identity is checked; session load or handoff is explicit | stop |
| Resume twice | same resume operation replayed | no duplicate Box/runner/session; final state is monotonic | stop |
| Fork | stopped parent with known snapshot | child has distinct Box/lease identity and expected copied data; parent mapping is retained | delete child, then parent |
| Fork retry timeout | fork accepted, response lost | reconcile parent/snapshot/child without guessing; ambiguous child blocks reuse | operator-reviewed cleanup |
| TTL expiry | worker offline past lease expiry | allocation is marked expired/orphaned only after provider observation; no stale PR publication | provider cleanup |
| Worker crash | process dies after checkpoint and before event | stale generation cannot overwrite replacement; replacement resumes from the newest valid checkpoint | stop/delete |
| Host reboot | Box remains allocated, local process gone | lookup uses durable identity; bootstrap/restart is idempotent; no orphan runner remains | stop/delete |
| Repository identity | fork/resume with changed remote/base | repository, branch, worktree, base SHA, and contract hash all match before edits | remove temporary checkout |
| PR identity | resumed publisher sees existing branch/PR | exact repository + branch + head SHA + PR URL/number match; stale head blocks publish | leave PR untouched on mismatch |
| Delete replay | deleted Box and repeated delete | repeated operation is a no-op only after provider confirms deleted/absent state | verify no orphan |
| Orphan sweep | provider resource with no allocation | classified with evidence; no automatic deletion in review mode | explicit apply-path test only |

## Test layers and fixtures

### Deterministic unit tests

Keep provider-independent tests in the narrowest files. Add a new
`test/loop-box-lifecycle-scenarios.test.ts` only for scenario compositions that
cross allocation, checkpoint, bootstrap, runner, and publication boundaries.
The fixture should model a provider as a state machine with explicit fault
injection points: accepted-before-timeout, eventual state transition, duplicate
identity, expired lease, and process loss. It must not pretend to implement
undocumented provider semantics.

Required assertions for that file, once the production contracts exist:

- replaying start/stop/resume/fork/delete does not duplicate resources;
- a replacement generation cannot write after cancellation or lease expiry;
- a resumed worker uses the same task/contract/repository/base identity;
- forked work cannot publish to the parent task's branch or PR;
- a lost response always enters reconciliation rather than guessed success;
- orphan cleanup is bounded, identity-based, and absent from review-only paths.

### Provider contract tests

Run the probe matrix against a disposable provider account/resource budget. Keep
these tests opt-in and redacted; they must be skipped when credentials or the
provider CLI are absent. Save raw provider responses outside committed state,
and commit only normalized fixtures with version and timestamp metadata.

### Multi-day soak

Run a coordinator restart loop over 24 hours, then seven days where available.
At each interval record control-state hashes, provider identities, checkpoint
IDs/digests, runner generations, branch/head SHA, and PR identity. The pass
condition is no drift, no duplicate resources, no stale generation acceptance,
and a clean final delete/reconciliation.

## Current implementation gaps to resolve in a later change

- `LoopBoxControlClient` has create/list/stop/delete only; resume and fork are
  not represented, so their lifecycle cannot currently be made durable.
- Allocation records have no snapshot ID, provider operation ID, lease renewal
  state, or observed provider expiry. TTL is input-only and cannot be audited
  after creation.
- The Crabbox warmup adapter accepts `ttlSeconds` but does not pass a TTL flag
  to the warmup command. This is a contract gap requiring provider confirmation
  and a production change; this audit does not silently “fix” it.
- Workspace acquisition and allocation are separate abstractions with no
  durable join record. A restart could know a Box allocation and a Crabbox
  workspace independently without proving they are the same resource.
- The normal execution coordinator stops its workspace in `finally`, but does
  not own a durable delete/reclaim policy for completed, failed, or expired
  allocations.
- Runner checkpoints preserve a session handoff but do not persist provider
  snapshot/Box identity or a repository worktree identity. Those must be bound
  before cross-Box resume/fork is allowed.
- Orphan classification is present; an apply-side, provider-aware cleanup
  operation with a dry-run and an explicit identity proof is not covered here.

## Exit criteria for lifecycle implementation

Do not call multi-day durability complete until all of the following are true:

1. Provider behavior is captured by versioned, redacted contract evidence.
2. Typed state represents Box, lease, operation, snapshot, runner, checkout,
   branch, and PR identities.
3. Every mutating provider operation is replay-safe and reconciles lost replies.
4. Resume and fork are tested with process loss and coordinator restart.
5. TTL expiry and orphan cleanup are tested without unsafe automatic deletion.
6. A real 24-hour soak passes, with a seven-day result where supported.
7. `pnpm run check` and the focused lifecycle scenario suite pass on Node 24+.
