# Loop testing model

Loop is tested as a durable control plane, not as a collection of happy-path
functions. The useful question is whether a task can cross a lifecycle boundary
with the wrong contract, stale evidence, lost ownership, or an unauthorized
external side effect. Tests should therefore assert durable state, exact
boundary calls, and the next human action together.

## Test layers

Tests mirror behavior boundaries. A test may cover several modules when they
form one contract; do not create a file-per-function test taxonomy.

### 1. Pure policy and rendering tests

These are fast `node:test` cases with no process, network, or filesystem
dependency. They cover deterministic decisions and projections such as:

- contract validation and risk floors (`test/loop-core.test.ts`);
- environment validation, hashing, and bounded context packing
  (`test/loop-environment.test.ts`);
- rollout, repair, reconciliation, lease, capacity, and URL policies
  (`test/loop-core.test.ts`);
- runner-result validation and the human review surface
  (`test/loop-review-surface.test.ts`);
- compact workday ordering and next-action text
  (`test/loop-human-summary.test.ts`).

Assert the exact diagnostic, state, ordering, or rendered marker that carries
the invariant. Avoid snapshots of an entire response when one field proves the
behavior.

### 2. Boundary contract tests

Use strict in-memory doubles at every outside-world edge. Record every call and
return deterministic outcomes. Assert both what happened and what was refused.
The main boundary contracts are:

- event, evidence, run, checkpoint, allocation, and lease stores;
- Box allocation and the Crabbox adapter;
- GitHub webhook verification, intake, publication, and stale-head fencing;
- MCP JSON-RPC, SDK transport, tool schemas, OAuth scopes, and read/write
  annotations;
- runner ACP execution, result-file matching, cancellation generations, and
  publication path/secret/branch guards.

The Loop-specific boundary cases are concentrated in
`test/loop-core.test.ts`, `test/loop-mcp-contract.test.ts`, and
`test/loop-bootstrap.test.ts`. Crabbox’s CLI translation is covered separately
by `test/crabbox-workspace-host.test.ts`, which verifies command order, shared
`sourceDir` working directories, canonical Box identity, timing JSON parsing,
artifact collection, and validation-before-execution.

### 3. Lifecycle and scenario tests

Build one valid task fixture, then drive it through named transitions. Keep each
scenario focused on one reason the lifecycle could become unsafe. Current
scenarios include:

- draft → validation → approval → execution → review → human acceptance;
- invalid contract and missing authority;
- same-actor approval/review rejection;
- changed head invalidating a previously passing gate;
- pause/cancel generation fencing and stale runner rejection;
- duplicate webhook or retried MCP write being idempotent;
- Box allocation uncertainty, orphan reconciliation, interruption, and resume;
- bounded repair after review findings, including budget and repeated-diff
  stops;
- GitHub publication refusing a stale PR head;
- fresh clean-head verification and durable execution-coordinator handoff.

Each scenario should assert:

1. the resulting durable phase, condition, version, and evidence;
2. external calls, including calls that must not occur;
3. the human-readable status and next action;
4. the security scope and exact SHA/revision binding.

The model’s prose is evidence input, never the source of lifecycle truth.

### 4. ClawSweeper and repair regression lanes

Loop shares the package, workflows, and maintenance boundaries with
ClawSweeper. A Loop change that touches shared orchestration, command runners,
workflow policy, or repair state must retain coverage in the narrowest matching
existing suite:

- `test/clawsweeper.test.ts` covers review/apply safety, durable records,
  workflow admission, retry/yield behavior, credential boundaries, and live
  state drift;
- `test/repair/*.test.ts` covers repair contracts, locks, publication,
  validation, conflict recovery, and terminal outcomes;
- `src/repair/*.test.ts` covers focused repair policies and prompt/report
  transformations.

Do not move a Loop invariant into the broad ClawSweeper file merely because the
full suite runs there. Add new coverage beside the owning behavior.

### 5. Build, workflow, and deployment checks

TypeScript builds, lint, active-surface/limit checks, workflow assertions,
migrations, and Wrangler dry-runs catch wiring errors that unit tests cannot.
`pnpm run check` is the handoff gate for code, test, and workflow changes
because it includes the ClawSweeper and repair surfaces that share this repo.

### 6. Opt-in live checks

Live Box, GitHub, Cloudflare, browser, and artifact checks stay separate from
the default suite. They must use explicit configuration, unique names, bounded
timeouts, and cleanup. Missing configuration is a skip, never a fake pass.

The current gateway smoke test is `test/loop-live.test.ts` and checks only:

- `GET /healthz` returns `200` and `{ "status": "ok" }`;
- `GET /mcp` exposes the Loop workday catalog;
- an unauthenticated MCP write returns `401`.

It does not create tasks, allocate Boxes, or mutate GitHub.

## Fixture rules

- Use a builder with valid defaults and small, explicit overrides. Keep the
  canonical task fixture close to the suite that owns it.
- Fix timestamps, SHAs, task IDs, revisions, Box identities, provider/model
  responses, and webhook delivery IDs. Never derive assertions from wall-clock
  time or random IDs.
- Use a fake clock when retry, cooldown, lease expiry, timeout, or maximum
  lifetime matters.
- Make command fakes strict. Unknown commands, wrong arguments, wrong `cwd`,
  and unexpected extra calls must fail immediately.
- Model process outcomes explicitly with stdout, stderr, and exit code. Test
  nonzero outcomes and malformed output separately from thrown executor errors.
- Keep storage doubles close to production interfaces, including version checks,
  idempotency, prefix listing, deletes, and atomic take/lease behavior.
- Assert exact calls and selected fields rather than snapshotting large objects.
- Keep generated or verbose evidence bounded; assert its digest, identity, and
  required paths rather than reproducing all content in the test.
- For Crabbox, preserve the distinction between the requested slug and the
  canonical operational `--id`; all post-acquire operations must use the latter
  and the source workspace directory.
- For live checks, make skip conditions visible, avoid durable credentials in
  fixtures, and clean up every resource created by the test.

## Failure matrix

The failure branch is part of the contract. These are the minimum cases to
preserve when changing the related boundary:

| Failure or drift | Expected result | Primary coverage |
| --- | --- | --- |
| Subjective acceptance or risk below floor | Validation is blocked with actionable diagnostics; no execution | `test/loop-core.test.ts` |
| Missing authority, verification command, review, or acceptance gate | Environment validation reports the missing requirement | `test/loop-environment.test.ts` |
| Same actor approves and reviews | Review is rejected by durable actor attribution | `test/loop-core.test.ts` |
| Head SHA changes after a passing gate | Gate becomes stale; stale gate write is rejected | `test/loop-core.test.ts` |
| Duplicate write or webhook delivery | Original result/state is returned; no second transition | `test/loop-core.test.ts` |
| Pause/cancel or stale runner generation | Old runner result is fenced; durable state remains coherent | `test/loop-core.test.ts` |
| Box warmup exits nonzero | Allocation fails with no workspace and a classified reason | `test/loop-core.test.ts`, `test/crabbox-workspace-host.test.ts` |
| Crabbox timing JSON is missing, malformed, or wrong-provider | Identity is unavailable; do not operate on an untrusted workspace | `test/crabbox-workspace-host.test.ts` |
| Crabbox command uses requested slug, wrong `cwd`, or wrong order | Strict fake fails; adapter must not issue the operation | `test/crabbox-workspace-host.test.ts` |
| Required Box tool is absent or unpinned | Bootstrap is not ready; package installation must go through `sfw` | `test/loop-bootstrap.test.ts` |
| MCP tool is missing scope/schema or write annotation | Contract test fails; registry is not publishable | `test/loop-mcp-contract.test.ts` |
| Runner has no hard verification proof or mismatched result file | Candidate is rejected before publication | `test/loop-review-surface.test.ts`, `test/loop-core.test.ts` |
| Reviewed PR head is stale | GitHub publication refuses mutation | `test/loop-core.test.ts` |
| Repair budget, repeated failure, or same diff is exhausted | Stop or escalate durably; do not loop indefinitely | `test/loop-core.test.ts`, `src/repair/*.test.ts` |
| Live URL/configuration is absent | Live test is skipped, not passed by a fake | `test/loop-live.test.ts` |
| ClawSweeper item is locked, stale, or requires maintainer authority | Apply path records a safe skip and does not close/mutate the item | `test/clawsweeper.test.ts`, `src/repair/apply-locks.test.ts` |

When a new failure mode is found, add it to the narrowest test file and this
matrix in the same change if the behavior is a durable contract.

## Commands

Use Node 24 or newer (`engines.node` is `>=24`). The focused Loop lane builds
the project first and includes the Loop tests plus the ChatGPT Project surface:

```bash
pnpm run test:loop
```

Run the Crabbox workspace-host contract separately because it is not matched by
`test:loop`:

```bash
pnpm run build
node --test test/crabbox-workspace-host.test.ts
```

Useful surrounding lanes are:

```bash
pnpm run test:unit     # ClawSweeper and shared test/*.test.ts
pnpm run test:repair   # test/repair plus compiled src/repair tests
pnpm run format:check
pnpm run check         # full handoff gate
```

For the gateway smoke test, provide an explicit deployed URL:

```bash
LOOP_LIVE_URL=https://your-loop-gateway.example pnpm run test:loop
```

For a documentation-only change, the relevant verification is a clean
`test:loop`/Crabbox run plus a Markdown review. Run the full `check` gate when
the change is being handed off with code, tests, or workflow changes.
