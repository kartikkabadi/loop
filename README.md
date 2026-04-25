# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 25, 2026, 05:40 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 05:40 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 50/500. Result records in checkpoint: 51.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24923761277](https://github.com/openclaw/clawsweeper/actions/runs/24923761277)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9277 |
| Fresh reviewed issues in the last 7 days | 8929 |
| Proposed issue closes | 3543 (39.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6188 |
| Fresh reviewed PRs in the last 7 days | 5983 |
| Proposed PR closes | 1545 (25.8% of reviewed PRs) |
| Open items total | 15465 |
| Reviewed files | 14912 |
| Archived closed files | 3115 |
| Fresh verified reviews in the last 7 days | 14912 |
| Proposed closes awaiting apply | 5088 (34.1% of fresh reviews) |
| Closed by Codex apply | 2333 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 553 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#40296](https://github.com/openclaw/openclaw/pull/40296) | perf(system-prompt): move dynamic sections after static content for prefix cache stability | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40296.md) | complete | Apr 25, 2026, 05:30 UTC |
| [#40236](https://github.com/openclaw/openclaw/issues/40236) | [Feature]: Cron job 生命周期 hooks - 支持 job 级 timeout 和自动清理策略 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40236.md) | complete | Apr 25, 2026, 05:30 UTC |
| [#40317](https://github.com/openclaw/openclaw/issues/40317) | feat(config): add config validation mode (strict vs tolerant) for different operations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40317.md) | complete | Apr 25, 2026, 05:30 UTC |
| [#40246](https://github.com/openclaw/openclaw/pull/40246) | Respect proxy env for WhatsApp web sockets | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40246.md) | complete | Apr 25, 2026, 05:30 UTC |
| [#40277](https://github.com/openclaw/openclaw/pull/40277) | fix(ui): show model errors inline in web chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40277.md) | complete | Apr 25, 2026, 05:30 UTC |
| [#40393](https://github.com/openclaw/openclaw/issues/40393) | [Bug]: Session_spawn runtime:acp accepts model and thinking but silently ignores them. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40393.md) | complete | Apr 25, 2026, 05:30 UTC |
| [#40248](https://github.com/openclaw/openclaw/pull/40248) | fix(googlechat): synchronous space events and chunked message thread continuity | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40248.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40233](https://github.com/openclaw/openclaw/pull/40233) | routing: keep per-channel DM last-route scoped to session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40233.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40269](https://github.com/openclaw/openclaw/issues/40269) | Gateway leaks internal API error to chat when compaction encounters thinking blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40269.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40268](https://github.com/openclaw/openclaw/issues/40268) | Gateway crashes on unknown config keys — .strict() should be .strip() on read path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40268.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40311](https://github.com/openclaw/openclaw/pull/40311) | feat(web-search): expose Brave Goggles for custom search filtering and ranking | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40311.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40238](https://github.com/openclaw/openclaw/pull/40238) | Respect skill tool policy in inline command dispatch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40238.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40287](https://github.com/openclaw/openclaw/pull/40287) | feat(slack): handle file_shared events and large file upload fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40287.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40253](https://github.com/openclaw/openclaw/pull/40253) | fix(telegram): mirror inbound user messages to WebChat (#36640) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40253.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40423](https://github.com/openclaw/openclaw/pull/40423) | feat(runtime): expose agent and session env markers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40423.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40052](https://github.com/openclaw/openclaw/pull/40052) | fix(ui): save default agent model changes to defaults config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40052.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40330](https://github.com/openclaw/openclaw/pull/40330) | fix(telegram): coalesce DM streaming into single message in partial mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40330.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40355](https://github.com/openclaw/openclaw/pull/40355) | fix(config): warn when configured model primary is not in catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40355.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40241](https://github.com/openclaw/openclaw/pull/40241) | feat: add Microsoft Clarity analytics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40241.md) | complete | Apr 25, 2026, 05:29 UTC |
| [#40140](https://github.com/openclaw/openclaw/issues/40140) | Session lane blocking: long tool chains delay all other channel messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40140.md) | complete | Apr 25, 2026, 05:29 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs can set `--apply-closures` or workflow input `apply_closures=true`, but the safer path is proposal first, then `apply_existing=true`.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used by Codex.
- `CODEX_API_KEY`: same API key for `codex exec` CI auth.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, passes `CODEX_API_KEY` to `codex exec`, and fails the shard instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
