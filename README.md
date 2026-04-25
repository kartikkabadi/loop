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

Last dashboard update: Apr 25, 2026, 14:03 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 14:03 UTC

State: Review in progress

Planned 79 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24932577279](https://github.com/openclaw/clawsweeper/actions/runs/24932577279)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 7230 |
| Fresh reviewed issues in the last 7 days | 7189 |
| Proposed issue closes | 1610 (22.4% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4768 |
| Fresh reviewed PRs in the last 7 days | 4704 |
| Proposed PR closes | 340 (7.2% of reviewed PRs) |
| Open items total | 11998 |
| Reviewed files | 11908 |
| Unreviewed open items | 90 |
| Archived closed files | 7250 |
| Fresh verified reviews in the last 7 days | 11893 |
| Proposed closes awaiting apply | 1950 (16.4% of fresh reviews) |
| Closed by Codex apply | 5357 |
| Failed or stale reviews | 15 |
| Daily cadence coverage | 9025/9136 current (111 due, 98.8%) |
| Daily PR cadence | 4607/4708 current (101 due, 97.9%) |
| Daily new issue cadence (<30d) | 4418/4428 current (10 due, 99.8%) |
| Weekly older issue cadence | 2771/2772 current (1 due, 100%) |
| Due now by cadence | 202 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71584](https://github.com/openclaw/openclaw/issues/71584) | /think max rejected for ollama/deepseek-v4-flash:cloud despite provider support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71584.md) | complete | Apr 25, 2026, 13:58 UTC |
| [#62414](https://github.com/openclaw/openclaw/issues/62414) | Intermittent 'terminated' and LLM errors during response streaming | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62414.md) | complete | Apr 25, 2026, 13:57 UTC |
| [#53762](https://github.com/openclaw/openclaw/pull/53762) | fix(telegram): flush buffered final answer when reasoning delivery is skipped [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53762.md) | complete | Apr 25, 2026, 13:57 UTC |
| [#53936](https://github.com/openclaw/openclaw/pull/53936) | fix(web-search): add diagnostic logging for API key resolution failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53936.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#53716](https://github.com/openclaw/openclaw/pull/53716) | feat(gateway): add watchdog + startup error diagnostics (closes #53684) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53716.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#71583](https://github.com/openclaw/openclaw/issues/71583) | [Bug] QQ token fetch to bots.qq.com times out across A/B uplinks (core healthy) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71583.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#53865](https://github.com/openclaw/openclaw/pull/53865) | Providers: add Lemonade Server plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53865.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#67133](https://github.com/openclaw/openclaw/issues/67133) | [Bug] 严重问题：hooks未触发和定时任务执行历史缺失 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67133.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#62930](https://github.com/openclaw/openclaw/issues/62930) | Internal HTTP client (memory-core embedding) ignores HTTP_PROXY / HTTPS_PROXY env vars | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62930.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#60426](https://github.com/openclaw/openclaw/issues/60426) | exec approval followup dispatch fails with gateway timeout when user does not respond within approval window | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60426.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#53948](https://github.com/openclaw/openclaw/pull/53948) | feat(local-models): standardize tool calling with ReAct fallback & th… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53948.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#53775](https://github.com/openclaw/openclaw/pull/53775) | fix(agents): protect shared workspace from accidental deletion in agents delete --force | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53775.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#53963](https://github.com/openclaw/openclaw/pull/53963) | feat: implement ReAct tool-calling fallback for local models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53963.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#53741](https://github.com/openclaw/openclaw/pull/53741) | feat(discord/voice): add sessionChannelId to autoJoin for text-channel transcript routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53741.md) | complete | Apr 25, 2026, 13:56 UTC |
| [#60602](https://github.com/openclaw/openclaw/issues/60602) | Feature Request: Per-Agent Bedrock requestMetadata Injection for Multi-Agent Cost Attribution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60602.md) | complete | Apr 25, 2026, 13:55 UTC |
| [#53588](https://github.com/openclaw/openclaw/pull/53588) | fix: strip <relevant-memories> tags from user messages in WebChat UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53588.md) | complete | Apr 25, 2026, 13:55 UTC |
| [#53968](https://github.com/openclaw/openclaw/pull/53968) | feat: enforce project namespace integrity for memory writes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53968.md) | complete | Apr 25, 2026, 13:55 UTC |
| [#53997](https://github.com/openclaw/openclaw/pull/53997) | acpx: add terminal-truth artifacts and strict terminal states | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53997.md) | complete | Apr 25, 2026, 13:55 UTC |
| [#53961](https://github.com/openclaw/openclaw/pull/53961) | fix(delivery): track and log silent delivery failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53961.md) | complete | Apr 25, 2026, 13:55 UTC |
| [#53885](https://github.com/openclaw/openclaw/pull/53885) | Claude/remove tts deny rule b q8 co | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53885.md) | complete | Apr 25, 2026, 13:55 UTC |

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
