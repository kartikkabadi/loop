# Issue and PR Scheduler

Read when changing `.github/workflows/sweep.yml`, `src/clawsweeper.ts` planner
selection, review cadence, dashboard capacity fields, or GitHub Actions
concurrency for issue/PR review and apply.

ClawSweeper has three issue/PR scheduler paths:

- exact event review for one target issue or pull request
- hot intake for new or recently active queue edges
- normal backfill for due backlog review

The lanes share report storage and apply rules, but they intentionally do not
share throughput. Event review and hot intake keep new maintainer-visible work
fast. Normal backfill keeps older due records moving with up to 100 concurrent
Codex review shards when backlog exists.

## Workflow

The receiver workflow is `.github/workflows/sweep.yml`.

Important source files:

- `src/clawsweeper.ts`: item selection, cadence, planning, review, dashboard,
  and status JSON
- `src/repair/workflow-utils.ts`: GitHub Actions output shaping for plans
- `results/sweep-status/<repo-slug>.json`: generated state consumed by the
  dashboard
- `records/<repo-slug>/items/<number>.md`: open item reports
- `records/<repo-slug>/closed/<number>.md`: archived closed reports

The workflow has one concurrency group per lane and target repository. Scheduled
normal review cannot overlap another normal review for the same target repo.
GitHub may keep one pending run for a concurrency group; newer scheduled runs
can replace older pending runs, but they do not cancel a running normal review
because `cancel-in-progress` is only true for exact `repository_dispatch` runs.

## Schedules

`openclaw/openclaw`:

- hot intake: `*/5 * * * *`
- normal backfill: `1/5 * * * *`
- apply: `3,18,33,48 * * * *`
- audit: `7 */6 * * *`

`openclaw/clawhub`:

- hot intake: `2/5 * * * *`
- normal backfill: `22 * * * *`
- apply: `8,23,38,53 * * * *`
- audit: `12 */6 * * *`
- review and apply work is gated by `CLAWSWEEPER_ENABLE_CLAWHUB=1`

`openclaw/clawsweeper`:

- audit: `17 */6 * * *`
- self-review is primarily manual or event-driven; scheduled audit keeps the
  dashboard health row fresh

Manual `workflow_dispatch` can override `target_repo`, `item_number`,
`item_numbers`, `batch_size`, `shard_count`, `hot_intake`, and apply inputs.
Exact item dispatches use the event path instead of the planner matrix.

## Automerge Fast Path

Automerge is an exact-item event path. A maintainer command dispatches one
review for the current PR head. If review requests a repair, the adopted repair
worker may push a branch fix; after a successful contributor-branch repair it
immediately dispatches another exact-head review and then shepherds the repaired
head for a bounded window instead of exiting immediately. That keeps the normal
path to:

1. command acknowledgement;
2. exact-head review;
3. optional branch repair;
4. immediate exact-head re-review;
5. merge after checks, review verdict, and policy gates pass.

The complete state machine is documented in
[`docs/repair/automerge-flow.md`](repair/automerge-flow.md). Keep this section
as the scheduler-facing summary.

The automerge status comment is the live progress surface. It is edited in
place and records review, repair, re-review, and merge events with durations,
run links, and commit links.

For base-sync-only repairs, the repair executor first tries a deterministic
fast path: rebase onto current `main`, apply known mechanical conflict resolvers
such as isolated `CHANGELOG.md` conflicts and generated config checksum
three-way conflicts, push the repaired branch, then wait for exact-head review
and GitHub checks. Codex fix/edit remains the fallback when the deterministic
rebase cannot complete cleanly. The default shepherd wait is ten minutes with
15-second polls, controlled by
`CLAWSWEEPER_AUTOMERGE_SHEPHERD_WAIT_MS` and
`CLAWSWEEPER_AUTOMERGE_SHEPHERD_POLL_MS`. Terminal check failures stop the
shepherd wait immediately and dispatch the router so the failed-check repair
loop can start without waiting for the full timeout.

The final router gate waits up to ten minutes for transient GitHub merge state
or pending required checks, polling every 15 seconds. Pending checks are wait
states, not repair triggers; terminal required-check failures can still dispatch
the adopted repair worker. If GitHub still reports `UNSTABLE`, ClawSweeper
allows the merge command to try when the only visible blockers are ignored
non-gating automation checks such as `ClawSweeper Dispatch`; GitHub branch
protection still enforces required checks at merge time. If the live merge
preflight reports `DIRTY`, `BEHIND`, or `CONFLICTING`, automerge treats that as
repairable rebase work and dispatches the adopted repair worker instead of
leaving the PR open with only a status comment.

## Capacity

Capacity is shard-level. A review shard processes its selected item numbers
sequentially, so maximum concurrent Codex sessions equals the number of nonempty
review shard jobs, not `batch_size * shard_count`.

Defaults:

- exact event review: 1 shard, 1 item
- exact manual hot intake: 1 shard, 1 item
- broad hot intake: 50 shards, batch size 1, scans up to 10 GitHub pages
- scheduled normal backfill: 100 shards, batch size 1, scans up to 250 GitHub
  pages
- manual normal backfill: defaults to 100 shards, batch size 3, scans up to 250
  GitHub pages unless overridden

The hard planner cap is 100 shards. The workflow clamps invalid or larger
`shard_count` inputs to 100.

Planning is also the runtime build point for matrix review. The plan job installs
with pinned Node 24 and `pnpm@10.33.2`, builds `dist/` once, and uploads that
runtime artifact. Review shards download the built `dist/` and run
`node dist/clawsweeper.js review` directly instead of running a per-shard pnpm
install and build. This keeps 50-100 shard waves from stampeding the npm
registry or Corepack metadata endpoints.

Normal backfill now runs every 5 minutes for `openclaw/openclaw`. Because its
concurrency group allows only one running normal backfill per target repo, the
effect is a continuous drain loop: when due backlog exists, the active run can
hold about 100 Codex review shards with one item per shard, and the next
scheduled tick is available as the backstop or pending continuation. Manual
normal reviews keep the larger default batch size for targeted catch-up runs.

## Cadence

The planner considers only open issues and PRs that pass `shouldPlanItem`.
Protected labels and other non-reviewable items are skipped before Codex work is
allocated.

Review cadence:

- items created in the last 7 days: hourly
- items with target-side activity since the last real review: hourly
- pull requests outside the hot window: daily
- issues created in the last 30 days: daily
- older inactive issues: weekly
- review policy hash changes: due immediately

Selection uses weighted buckets so hot issues cannot starve pull requests and
older issue backlog forever. The normal scheduler cycles through:

- hot issues
- hot pull requests
- activity-driven items
- daily pull requests
- recent issues
- weekly older issues

Within each bucket, earlier due times and older reviews win before item number.

## Planning

The plan step runs:

```bash
pnpm run --silent plan -- \
  --target-repo "$TARGET_REPO" \
  --batch-size "$BATCH_SIZE" \
  --max-pages "$MAX_PAGES" \
  --shard-count "$SHARD_COUNT" \
  --codex-model gpt-5.5 \
  --codex-reasoning-effort high \
  --codex-sandbox danger-full-access \
  --codex-service-tier fast
```

`pnpm run plan` returns:

- `candidates`: selected open items
- `shards`: selected item numbers distributed across shard jobs
- `capacity`: `batch_size * clamped_shard_count`
- `dueBacklog`: due candidates found during the scan
- `activeCodexTarget`: nonempty shard count
- `oldestUnreviewedAt`: oldest scanned due candidate with no existing review
- `capacityReason`: why the selected count did or did not fill capacity
- `matrix`: GitHub Actions matrix entries

`pnpm run workflow -- plan-output` maps that JSON to GitHub Actions outputs:

- `planned_count`
- `planned_capacity`
- `planned_item_numbers`
- `planned_shards`
- `active_codex_target`
- `due_backlog`
- `oldest_unreviewed_at`
- `capacity_reason`

Capacity reasons:

- `saturated: due backlog filled planned capacity`
- `under capacity: due backlog below planned capacity`
- `idle: no due candidates found`
- `exact: requested item selection`
- `idle: no requested open items found`

## Status and Dashboard

Planning and publish steps call `pnpm run status`, which writes structured JSON
under `results/sweep-status/` in generated state. The README dashboard reads
that JSON and shows:

- active Codex target
- planned review items
- planned review shards
- planned review capacity
- due backlog scanned
- oldest unreviewed scanned
- capacity reason

`active Codex target` is the planned number of nonempty Codex shard jobs for the
current run. It is not a live process count from GitHub Actions. For live worker
count, inspect active review shard jobs on the current workflow run.

## Apply

Review is proposal-only. Apply is the only issue/PR scheduler path that mutates
GitHub close state.

Apply wakes every 15 minutes for `openclaw/openclaw` and on offset 15-minute
ticks for ClawHub. It re-fetches live GitHub state, checks labels, author
association, paired issue/PR state, snapshot drift, and repository profile
rules. It closes only unchanged high-confidence proposals and otherwise updates
or syncs the durable ClawSweeper review comment.

Scheduled normal review publishes records first, then dispatches durable review
comment sync into the separate apply/comment-sync lane. This keeps slow GitHub
comment writes from holding the normal review concurrency group and delaying the
next 100-shard backfill wave. Exact and manual targeted review runs still sync
their selected comments inline before finishing.

Long apply runs commit checkpoints and can dispatch continuation runs when they
reach the configured close limit.

## Continuation and Recovery

When a normal or hot review run fills its planned capacity, the publish job
dispatches another `sweep.yml` run with the same lane inputs. The 5-minute
normal schedule is still the safety net if continuation dispatch fails or GitHub
delays it.

If review shards fail, the recovery job reads failed shard artifacts or failed
job names, extracts their planned item numbers from the original matrix, and
requeues those exact item numbers once with a recovery marker in the additional
prompt.

Review shard jobs are allowed to finish as recovered failures instead of making
the whole sweep appear broken when the recovery job can requeue exact item
numbers. Each shard uploads a small metrics artifact with item numbers, target
repo, start/end timestamps, and review-step outcome. Publish includes artifact
and metric counts in the status detail so setup noise, missing artifacts, and
real review failures can be separated while monitoring.

The generated state checkout uses a blobless partial clone, but it intentionally
keeps full commit history by default. Publish jobs rebase and retry state writes
after races, and shallow state history can make those retries less reliable.

## Audit

Audit is read-only and runs separately from review and apply. It refreshes
`results/audit/<repo-slug>.json` and the README Audit Health table from live
GitHub state. Scheduled audit currently covers:

- `openclaw/openclaw`: `7 */6 * * *`
- `openclaw/clawhub`: `12 */6 * * *`
- `openclaw/clawsweeper`: `17 */6 * * *`

The audit lane first tries a ClawSweeper GitHub App read token for the target
repository. If that token is unavailable, it falls back to the workflow token for
public read-only API access so dashboard rows do not remain `unknown` just
because mutating scheduled work is still gated.

## Monitoring

Useful commands:

```bash
gh run list --repo openclaw/clawsweeper --workflow sweep.yml --limit 20 \
  --json databaseId,displayTitle,event,status,conclusion,createdAt,headSha,url

gh run view <run-id> --repo openclaw/clawsweeper --json jobs \
  --jq '[.jobs[] | select(.name | startswith("Review shard")) | select(.status=="in_progress")] | length'

gh api repos/openclaw/clawsweeper/readme --jq '.content' | base64 --decode
```

Read the remote generated README, not only the local checkout, when checking the
live dashboard. Generated dashboard state is published from GitHub Actions and
can be newer than local files.

## Common Changes

To change how many normal Codex sessions can run, update both
`.github/workflows/sweep.yml` and the planner constants in `src/clawsweeper.ts`.
The workflow can otherwise continue with stale defaults during continuation
runs.

To change review cadence, update the cadence constants and the scheduler bucket
logic in `src/clawsweeper.ts`, then update dashboard labels and this document.

To add a new target repository, add a repository profile, wire schedule target
resolution and concurrency target resolution in `.github/workflows/sweep.yml`,
then confirm the generated state paths remain flat under one repo slug.
