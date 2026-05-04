# Automation Limits

Read when changing ClawSweeper throughput, Codex fan-out, commit review paging,
or repair dispatch capacity.

`config/automation-limits.json` is the source of truth for automation capacity
defaults. It covers throughput and fan-out limits only. Safety thresholds such
as close age floors, apply delays, retry counts, and comment caps stay near the
code that owns those decisions.

GitHub repository variables still override these defaults in live workflows.
When a variable is unset, workflows read the checked-in limit after checkout.
The one exception is the `workflow_dispatch.inputs.shard_count.default` value in
`.github/workflows/sweep.yml`: GitHub renders that UI before checkout, so it
must remain a YAML literal. `pnpm run check:limits` verifies that literal and
the docs stay in sync with `config/automation-limits.json`.

## Names

| Name | Current | Meaning |
| --- | ---: | --- |
| `review_shards.normal_default` | 51 | Default normal review shard jobs per sweep. |
| `review_shards.normal_active_floor` | 26 | Minimum active normal review shards to keep queued for `openclaw/openclaw`. |
| `review_shards.hot_intake_default` | 32 | Broad hot-intake review shard jobs. |
| `review_shards.exact_item_default` | 1 | Exact-item hot-intake shard count. |
| `review_shards.hard_cap` | 80 | Maximum accepted review shard count. |
| `commit_review.page_size_default` | 5 | Commits selected per commit-review page. |
| `commit_review.page_size_hard_cap` | 205 | Maximum commit-review page size. |
| `repair_live_runs.default` | 32 | Default live repair workflow run cap for manual dispatch/requeue/self-heal. |
| `repair_live_runs.hard_cap` | 80 | Absolute live repair run cap accepted by the CLI. |
| `repair_live_runs.automerge_default` | 32 | Live repair run cap for automerge comment-router dispatches. |
| `repair_live_runs.issue_implementation_default` | 32 | Live repair run cap for issue-to-PR implementation intake. |
| `issue_implementation.dispatches_per_sweep_default` | 3 | Maximum implementation intake jobs queued from one review publish run. |

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
