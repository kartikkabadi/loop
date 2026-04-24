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

Last dashboard update: Apr 24, 2026, 13:24 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12559 |
| Fresh reviewed issues in the last 7 days | 5993 |
| Proposed issue closes | 3365 (56.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6613 |
| Fresh reviewed PRs in the last 7 days | 3186 |
| Proposed PR closes | 1057 (33.2% of reviewed PRs) |
| Open items total | 19172 |
| Reviewed files | 9179 |
| Fresh verified reviews in the last 7 days | 9179 |
| Proposed closes awaiting apply | 4422 (48.2% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 9993 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#53521](https://github.com/openclaw/openclaw/pull/53521) | fix: improve remediation message for Telegram group allowlist finding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53521.md) | complete | Apr 24, 2026, 13:24 UTC |
| [#53493](https://github.com/openclaw/openclaw/issues/53493) | [Bug] 2026.3.23-2: Telegram channel stops initializing permanently after polling stall loop | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53493.md) | complete | Apr 24, 2026, 13:24 UTC |
| [#53498](https://github.com/openclaw/openclaw/issues/53498) | [Bug]: telegram 无法将运行 openclaw 主机上的文件当成附件发送远程主机 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53498.md) | complete | Apr 24, 2026, 13:23 UTC |
| [#53525](https://github.com/openclaw/openclaw/issues/53525) | 百度千帆 API 返回错误时错误信息丢失，导致空响应 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53525.md) | complete | Apr 24, 2026, 13:23 UTC |
| [#53480](https://github.com/openclaw/openclaw/issues/53480) | [Bug]: Discord /reset creates sessions with thinkingLevel=off for OpenAI Codex models, breaking tool calling (regression in 2026.3.23) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53480.md) | complete | Apr 24, 2026, 13:23 UTC |
| [#53486](https://github.com/openclaw/openclaw/issues/53486) | [Bug] Feishu: message(action=send) renders card JSON as plain text instead of interactive card (regression) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53486.md) | complete | Apr 24, 2026, 13:23 UTC |
| [#53488](https://github.com/openclaw/openclaw/issues/53488) | feat: allow definition of custom workspace injection files | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53488.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53484](https://github.com/openclaw/openclaw/issues/53484) | Agent run preemption: messages silently dropped when session is busy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53484.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53448](https://github.com/openclaw/openclaw/issues/53448) | [Bug]: llama-cpp and Ollama providers return incorrect context usage due to field name mismatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53448.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53485](https://github.com/openclaw/openclaw/issues/53485) | [Bug]: the record of web chat lost after updated | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53485.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53499](https://github.com/openclaw/openclaw/pull/53499) | Create README_CN.md | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53499.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53469](https://github.com/openclaw/openclaw/issues/53469) | [Feature]: Add private network access support for web tools and gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53469.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53520](https://github.com/openclaw/openclaw/pull/53520) | feat(cli): add migrate export/import for cross-device migration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53520.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53531](https://github.com/openclaw/openclaw/issues/53531) | Compaction should use auth-profile rotation / failover within the same provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53531.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53497](https://github.com/openclaw/openclaw/issues/53497) | openclaw-weixin 1.0.3 fails to load on OpenClaw 2026.3.23-2: plugin-sdk top-level barrel missing exports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53497.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53494](https://github.com/openclaw/openclaw/issues/53494) | [Bug]: Plugin tools (registerTool) permanently lost after image message: gateway-level registry corruption | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53494.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53504](https://github.com/openclaw/openclaw/issues/53504) | MCP tools bypass tools.subagents.tools.allow/deny policy filtering | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53504.md) | complete | Apr 24, 2026, 13:22 UTC |
| [#53491](https://github.com/openclaw/openclaw/issues/53491) | [Feature]: Agent cron introspection — allow agents to list and verify their scheduled cron jobs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53491.md) | complete | Apr 24, 2026, 13:21 UTC |
| [#53489](https://github.com/openclaw/openclaw/pull/53489) | fix: prevent context bleed in thread/topic sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53489.md) | complete | Apr 24, 2026, 13:21 UTC |
| [#53533](https://github.com/openclaw/openclaw/pull/53533) | feat(feishu): surface connection health state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53533.md) | complete | Apr 24, 2026, 13:21 UTC |

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
