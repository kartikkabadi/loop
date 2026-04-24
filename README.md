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

Last dashboard update: Apr 24, 2026, 07:39 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12505 |
| Fresh reviewed issues in the last 7 days | 2961 |
| Proposed issue closes | 1558 (52.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6582 |
| Fresh reviewed PRs in the last 7 days | 1425 |
| Proposed PR closes | 464 (32.6% of reviewed PRs) |
| Open items total | 19087 |
| Reviewed files | 4386 |
| Fresh verified reviews in the last 7 days | 4386 |
| Proposed closes awaiting apply | 2022 (46.1% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 14701 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#44527](https://github.com/openclaw/openclaw/issues/44527) | web_fetch 工具缺少 ssrfPolicy 配置，TUN 模式下被阻止 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44527.md) | complete | Apr 24, 2026, 07:38 UTC |
| [#44529](https://github.com/openclaw/openclaw/issues/44529) | [Bug]: Gateway crashes with unhandled promise rejection when Discord API returns 503 during health-monitor bot reconnect | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44529.md) | complete | Apr 24, 2026, 07:38 UTC |
| [#44484](https://github.com/openclaw/openclaw/issues/44484) | Agent declared tools != effective session tools: no strict inheritance mode, no visibility, no clipping reason trace | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44484.md) | complete | Apr 24, 2026, 07:38 UTC |
| [#44528](https://github.com/openclaw/openclaw/issues/44528) | [Control UI] Internal task completion event incorrectly delivered to chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44528.md) | complete | Apr 24, 2026, 07:38 UTC |
| [#44491](https://github.com/openclaw/openclaw/issues/44491) | Bug: Control UI 聊天记录在 session 重启后丢失 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44491.md) | complete | Apr 24, 2026, 07:38 UTC |
| [#44507](https://github.com/openclaw/openclaw/issues/44507) | openclaw gateway restart fails to restart service (SIGTERM instead of SIGUSR1) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44507.md) | complete | Apr 24, 2026, 07:38 UTC |
| [#44474](https://github.com/openclaw/openclaw/issues/44474) | [Feature Request] 简化配置流程 - 让 OpenClaw 更易上手 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44474.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44524](https://github.com/openclaw/openclaw/issues/44524) | [Bug]: Discord mention detection fails when mentionedUsers array is empty | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44524.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44476](https://github.com/openclaw/openclaw/pull/44476) | fix(gateway): exit 0 on EADDRINUSE when healthy OpenClaw gateway is already running | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44476.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44492](https://github.com/openclaw/openclaw/issues/44492) | [Bug]: Telegram forum topic loses ACP/OpenCode routing after heavy bound turn; topic recovers only after gateway restart and then fails again under load | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44492.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44490](https://github.com/openclaw/openclaw/issues/44490) | [Bug]: openclaw gateway restart fails to restart service (SIGTERM instead of SIGUSR1) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44490.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44477](https://github.com/openclaw/openclaw/issues/44477) | Feature: Support multiple API keys per provider as rate limit backup | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44477.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44483](https://github.com/openclaw/openclaw/issues/44483) | Slack: implicit reply-to-bot thread detection not working in channels (groupPolicy: open) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44483.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44518](https://github.com/openclaw/openclaw/pull/44518) | fix(daemon): trigger SIGUSR1 in-process restart when scheduling launchd handoff | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44518.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44472](https://github.com/openclaw/openclaw/issues/44472) | [Patch] Runtime bundle fixes for premature success bug (compact, pi-embedded, reply) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44472.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44459](https://github.com/openclaw/openclaw/issues/44459) | TTS tool on Telegram renders as audio file instead of native voice memo (sendAudio vs sendVoice) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44459.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44532](https://github.com/openclaw/openclaw/issues/44532) | [Bug]: http_request is not available in dockerized version of openclaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44532.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44488](https://github.com/openclaw/openclaw/issues/44488) | [Feature]: Feature Request: 优化心跳会话的显示标签 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44488.md) | complete | Apr 24, 2026, 07:37 UTC |
| [#44486](https://github.com/openclaw/openclaw/pull/44486) | fix(gateway): honor dangerouslyDisableDeviceAuth regardless of sharedAuthOk | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44486.md) | complete | Apr 24, 2026, 07:36 UTC |
| [#44461](https://github.com/openclaw/openclaw/issues/44461) | [Bug]:QQBot channel fails to send messages due to missing \"to\" parameter mapping | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44461.md) | complete | Apr 24, 2026, 07:36 UTC |

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
