# Automation Limits

Read when changing ClawSweeper throughput, Codex fan-out, commit review paging,
or repair dispatch capacity.

`config/automation-limits.json` is the source of truth for the global worker
budget. Most lane-specific values are derived from `workers.max`; safety
thresholds such as close age floors, apply delays, retry counts, and comment
caps stay near the code that owns those decisions.

GitHub repository variables still override selected live limits. When a variable
is unset, workflows read the checked-in budget after checkout. The one exception
is the `workflow_dispatch.inputs.shard_count.default` value in
`.github/workflows/sweep.yml`: GitHub renders that UI before checkout, so it
must remain a YAML literal. `pnpm run check:limits` verifies that literal and the
docs stay in sync with the derived budget.

## Worker Budget

| Name | Current | Meaning |
| --- | ---: | --- |
| `workers.max` | 100 | Maximum global Codex worker budget used to derive lane limits. |
| `workers.reserve_for_interactive` | 10 | Worker slots background lanes leave open for exact/manual/urgent work. |
| `workers.minimum_background` | 10 | Target floor for background progress when enough global capacity is available. |

## Derived Limits

| Name | Current | Meaning |
| --- | ---: | --- |
| `review_shards.normal_default` | 70 | Quiet-system normal review shard ceiling. |
| `review_shards.normal_active_floor` | 30 | Minimum active normal review shards to keep queued for `openclaw/openclaw`. |
| `review_shards.hot_intake_default` | 35 | Quiet-system broad hot-intake review shard ceiling. |
| `review_shards.exact_item_default` | 1 | Exact-item hot-intake shard count. |
| `review_shards.hard_cap` | 100 | Maximum accepted review shard count. |
| `commit_review.page_size_default` | 5 | Commits selected per commit-review page. |
| `commit_review.page_size_hard_cap` | 100 | Maximum commit-review page size. |
| `repair_live_runs.default` | 40 | Default live repair workflow run cap for manual dispatch/requeue/self-heal. |
| `repair_live_runs.hard_cap` | 100 | Absolute live repair run cap accepted by the CLI. |
| `repair_live_runs.automerge_default` | 40 | Live repair run cap for automerge comment-router dispatches. |
| `repair_live_runs.issue_implementation_default` | 40 | Live repair run cap for issue-to-PR implementation intake. |
| `issue_implementation.dispatches_per_sweep_default` | 4 | Maximum implementation intake jobs queued from one review publish run. |

## Dynamic Scheduling

Normal review, hot intake, and commit review are background lanes. They ask the
worker scheduler for capacity before dispatching. The scheduler subtracts active
repair and exact-item work, reserves `workers.reserve_for_interactive`, and then
lets background lanes use the remaining capacity up to their derived ceiling.

## Runtime Overrides

- `CLAWSWEEPER_COMMIT_REVIEW_PAGE_SIZE` overrides
  `commit_review.page_size_default`.
- `CLAWSWEEPER_MAX_LIVE_WORKERS` overrides `repair_live_runs.default`.
- `CLAWSWEEPER_AUTOMERGE_MAX_LIVE_WORKERS` overrides
  `repair_live_runs.automerge_default`.
- `CLAWSWEEPER_AUTO_IMPLEMENT_MAX_LIVE_WORKERS` overrides
  `repair_live_runs.issue_implementation_default`.
- `CLAWSWEEPER_AUTO_IMPLEMENT_MAX_DISPATCH_PER_SWEEP` overrides
  `issue_implementation.dispatches_per_sweep_default`.
- Manual `sweep.yml` dispatch `shard_count` overrides
  `review_shards.normal_default`, then clamps to `review_shards.hard_cap`.
