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

Last dashboard update: Apr 25, 2026, 10:08 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 10:08 UTC

State: Apply in progress

Checkpoint 4 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 200/500. Result records in checkpoint: 50.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24928065717](https://github.com/openclaw/clawsweeper/actions/runs/24928065717)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 8522 |
| Fresh reviewed issues in the last 7 days | 8497 |
| Proposed issue closes | 2915 (34.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5112 |
| Fresh reviewed PRs in the last 7 days | 5048 |
| Proposed PR closes | 597 (11.8% of reviewed PRs) |
| Open items total | 13634 |
| Reviewed files | 13562 |
| Unreviewed open items | 72 |
| Archived closed files | 5535 |
| Fresh verified reviews in the last 7 days | 13545 |
| Proposed closes awaiting apply | 3512 (25.9% of fresh reviews) |
| Closed by Codex apply | 3807 |
| Failed or stale reviews | 17 |
| Daily cadence coverage | 10562/10722 current (160 due, 98.5%) |
| Daily PR cadence | 4905/5052 current (147 due, 97.1%) |
| Daily new issue cadence (<30d) | 5657/5670 current (13 due, 99.8%) |
| Weekly older issue cadence | 2840/2840 current (0 due, 100%) |
| Due now by cadence | 232 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71491](https://github.com/openclaw/openclaw/issues/71491) | Kimi K2.6 reasoning_content 400 regression in long conversations after LCM compaction (follow-up #70392) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71491.md) | complete | Apr 25, 2026, 09:52 UTC |
| [#47714](https://github.com/openclaw/openclaw/pull/47714) | fix: add Mistral tool call ID hints to OpenRouter provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47714.md) | complete | Apr 25, 2026, 09:52 UTC |
| [#71504](https://github.com/openclaw/openclaw/issues/71504) | [Bug]: openclaw-lark 插件 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71504.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#71493](https://github.com/openclaw/openclaw/issues/71493) | gateway.bind=lan can advertise Docker bridge IP for dashboard and QR | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71493.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#71514](https://github.com/openclaw/openclaw/issues/71514) | [Bug]: SSE [DONE] terminator incorrectly passed to JSON parser — kills agentTurn cron jobs on stream end | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71514.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#47706](https://github.com/openclaw/openclaw/pull/47706) | feat: adaptive resource limits for ARM/low-memory devices | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47706.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#71492](https://github.com/openclaw/openclaw/issues/71492) | [Bug]: Terminal flickering on Windows due to Bonjour arp -a polling (missing windowsHide) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71492.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#63444](https://github.com/openclaw/openclaw/issues/63444) | Bug: openclaw memory status fails when memorySearch.provider is bedrock | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63444.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#54983](https://github.com/openclaw/openclaw/issues/54983) | feat: Add vLLM reasoning/thinking toggle support (enable_thinking parameter) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54983.md) | complete | Apr 25, 2026, 09:51 UTC |
| [#47743](https://github.com/openclaw/openclaw/pull/47743) | feat(plugins): add trust tier classification for plugin security model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47743.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#71494](https://github.com/openclaw/openclaw/issues/71494) | gateway status dashboard URL uses http when TLS is enabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71494.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#71495](https://github.com/openclaw/openclaw/issues/71495) | [Bug]: /subagents list returns empty in 2026.4.23 despite gateway tracking active subagents (regression from 4.22) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71495.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#47635](https://github.com/openclaw/openclaw/pull/47635) | fix(gateway): proactive session archive cleanup at startup and on timer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47635.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#47486](https://github.com/openclaw/openclaw/pull/47486) | feat: add sessions_broadcast tool for cross-session system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47486.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#69579](https://github.com/openclaw/openclaw/issues/69579) | [Bug]: Telegram handler drops thinking block signatures  on multi-turn conversations, causing Anthropic API rejection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69579.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#47654](https://github.com/openclaw/openclaw/pull/47654) | config: strip unknown keys with warnings instead of crash-looping | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47654.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#71210](https://github.com/openclaw/openclaw/issues/71210) | [Bug]: openclaw memory status fails with 'Unknown memory embedding provider: local' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71210.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#47582](https://github.com/openclaw/openclaw/pull/47582) | fix(ui-cron): keep new-job form in normal flow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47582.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#47604](https://github.com/openclaw/openclaw/pull/47604) | feat(android): add Wear OS app MVP | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47604.md) | complete | Apr 25, 2026, 09:50 UTC |
| [#47491](https://github.com/openclaw/openclaw/pull/47491) | fix: preserve agent context in plugin hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47491.md) | complete | Apr 25, 2026, 09:50 UTC |

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
