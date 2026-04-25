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

Last dashboard update: Apr 25, 2026, 12:36 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 12:36 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24930982848](https://github.com/openclaw/clawsweeper/actions/runs/24930982848)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 7782 |
| Fresh reviewed issues in the last 7 days | 7747 |
| Proposed issue closes | 2182 (28.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4892 |
| Fresh reviewed PRs in the last 7 days | 4816 |
| Proposed PR closes | 436 (9.1% of reviewed PRs) |
| Open items total | 12674 |
| Reviewed files | 12585 |
| Unreviewed open items | 89 |
| Archived closed files | 6543 |
| Fresh verified reviews in the last 7 days | 12563 |
| Proposed closes awaiting apply | 2618 (20.8% of fresh reviews) |
| Closed by Codex apply | 4657 |
| Failed or stale reviews | 22 |
| Daily cadence coverage | 9513/9812 current (299 due, 97%) |
| Daily PR cadence | 4539/4822 current (283 due, 94.1%) |
| Daily new issue cadence (<30d) | 4974/4990 current (16 due, 99.7%) |
| Weekly older issue cadence | 2773/2773 current (0 due, 100%) |
| Due now by cadence | 388 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#50515](https://github.com/openclaw/openclaw/pull/50515) | security: sanitize control characters in channel error logging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50515.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50267](https://github.com/openclaw/openclaw/pull/50267) | fix: add provider attribution headers to image tool for OpenRouter free tier | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50267.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#71555](https://github.com/openclaw/openclaw/issues/71555) | [Bug]: Large session JSONL can crash gateway during embedded context rebuild; SessionManager.open() loads file twice | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71555.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50276](https://github.com/openclaw/openclaw/pull/50276) | fix(slack): support [[reply_to_current]] thread replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50276.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50381](https://github.com/openclaw/openclaw/pull/50381) | CLI: add LLM log source with pretty trace output | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50381.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#71556](https://github.com/openclaw/openclaw/issues/71556) | [Bug]: zai provider: thinking/reasoning parameter never sent to API — affects all endpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71556.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50338](https://github.com/openclaw/openclaw/pull/50338) | fix(telegram): preserve default replyToId when replyToMode is all | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50338.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50522](https://github.com/openclaw/openclaw/pull/50522) | fix(discord): only include ThreadStarterBody for new sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50522.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50463](https://github.com/openclaw/openclaw/pull/50463) | fix(agents): hint when unknown tools are skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50463.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50516](https://github.com/openclaw/openclaw/pull/50516) | security: use crypto.timingSafeEqual for Nextcloud Talk webhook signatures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50516.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#71546](https://github.com/openclaw/openclaw/issues/71546) | Discord ingest lag of 100–400 s on stable connection persists after PR #68159 / 2026.4.1 reconnect-ownership change | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71546.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#71551](https://github.com/openclaw/openclaw/issues/71551) | [Bug]: Custom avatar image returns 401 Unauthorized in Control UI after v2026.4.23 update | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71551.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50357](https://github.com/openclaw/openclaw/pull/50357) | docs(feishu): clarify feishu_doc create action does not support content parameter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50357.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50429](https://github.com/openclaw/openclaw/pull/50429) | fix(feishu): fall back to plain text when card delivery fails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50429.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50425](https://github.com/openclaw/openclaw/pull/50425) | fix: strip reasoning blocks from sessions_history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50425.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50507](https://github.com/openclaw/openclaw/pull/50507) | feat(whatsapp): support native location messages via message tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50507.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50359](https://github.com/openclaw/openclaw/pull/50359) | Fix embedded read-image media fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50359.md) | complete | Apr 25, 2026, 11:42 UTC |
| [#50278](https://github.com/openclaw/openclaw/pull/50278) | fix: exclude Markdown image syntax from bash bang detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50278.md) | complete | Apr 25, 2026, 11:41 UTC |
| [#50483](https://github.com/openclaw/openclaw/pull/50483) | fix(ios): stabilize chat streaming layout and session flow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50483.md) | complete | Apr 25, 2026, 11:41 UTC |
| [#50394](https://github.com/openclaw/openclaw/pull/50394) | fix(feishu): stop treating @all as a direct bot mention in group chats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50394.md) | complete | Apr 25, 2026, 11:41 UTC |

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

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
npm run reconcile -- --dry-run
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
