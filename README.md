# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 24, 2026, 08:33 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12518 |
| Fresh reviewed issues in the last 7 days | 3481 |
| Proposed issue closes | 1874 (53.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6581 |
| Fresh reviewed PRs in the last 7 days | 1705 |
| Proposed PR closes | 572 (33.5% of reviewed PRs) |
| Open items total | 19099 |
| Reviewed files | 5186 |
| Fresh verified reviews in the last 7 days | 5186 |
| Proposed closes awaiting apply | 2446 (47.2% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 13913 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45905](https://github.com/openclaw/openclaw/issues/45905) | [Bug]: Heartbeat session shows as gray blank in Control UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45905.md) | complete | Apr 24, 2026, 08:33 UTC |
| [#45875](https://github.com/openclaw/openclaw/issues/45875) | [Bug] Cron Tool Parameter Validation Error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45875.md) | complete | Apr 24, 2026, 08:33 UTC |
| [#45906](https://github.com/openclaw/openclaw/issues/45906) | [Telegram] statusReactions always shows error emoji even for successful exec commands | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45906.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45883](https://github.com/openclaw/openclaw/issues/45883) | 更新后工具调用失败：旧模块文件hash未清理 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45883.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45892](https://github.com/openclaw/openclaw/pull/45892) | fix: harden macOS launchd restart handoff after config-triggered gateway restarts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45892.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45882](https://github.com/openclaw/openclaw/issues/45882) | [Bug]: MiniMax streaming not working - output displays all at once instead of streaming | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45882.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45889](https://github.com/openclaw/openclaw/issues/45889) | browser profile=\"user\" times out on macOS even though existing-session Chrome MCP is detected and running | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45889.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45918](https://github.com/openclaw/openclaw/issues/45918) | [Bug]: run openclaw nodes list, but get nodes list failed: Error: gateway closed (1000 normal closure): no close reason | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45918.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45893](https://github.com/openclaw/openclaw/issues/45893) | [Bug]: Webchat UI Bug: Session Messages Display as Exclamation Mark | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45893.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45873](https://github.com/openclaw/openclaw/issues/45873) | Subagents ignore tools.subagents.tools.allow and only receive parent/session tools | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45873.md) | complete | Apr 24, 2026, 08:32 UTC |
| [#45903](https://github.com/openclaw/openclaw/pull/45903) | docs(cron): document NO_REPLY conditional delivery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45903.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45925](https://github.com/openclaw/openclaw/pull/45925) | fix: keep heartbeat wakes out of cron run sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45925.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45913](https://github.com/openclaw/openclaw/pull/45913) | fix(control-ui): use actual context size instead of cumulative input … | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45913.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45917](https://github.com/openclaw/openclaw/issues/45917) | Webchat/ControlUI: Image uploads not processed since 2026.3.13 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45917.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45879](https://github.com/openclaw/openclaw/pull/45879) | feat(metabolism): add homeostatic token budget management system | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45879.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45908](https://github.com/openclaw/openclaw/issues/45908) | [Bug]: \"openclaw status\" reports gateway as \"unreachable\" when probe lacks operator.read scope (cosmetic, gateway fully functional) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45908.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45927](https://github.com/openclaw/openclaw/issues/45927) | [Feature Request] Control UI 添加语言设置选项 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45927.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45849](https://github.com/openclaw/openclaw/issues/45849) | [Bug]: DMs routed to main agent do not collapse into Main > main; Control UI creates discord:direct / telegram:direct sessions instead | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45849.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45902](https://github.com/openclaw/openclaw/pull/45902) | feat(telegram): inherit /model defaults for new Telegram threads [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/45902.md) | complete | Apr 24, 2026, 08:31 UTC |
| [#45807](https://github.com/openclaw/openclaw/issues/45807) | [Bug]:  Control UI image attachments disappear from chat.history after AI response | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45807.md) | complete | Apr 24, 2026, 08:31 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that selects the next open items once, starting from `#1`, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The final job merges artifacts and updates this README so the dashboard reflects progress. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

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
