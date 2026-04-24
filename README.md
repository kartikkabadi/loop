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

Last dashboard update: Apr 24, 2026, 03:28 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19151 |
| Reviewed / proposed closes | 1186 / 529 |
| Reviewed files | 1186 |
| Fresh verified reviews in the last 7 days | 1186 |
| Proposed closes awaiting apply | 529 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17965 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#37547](https://github.com/openclaw/openclaw/pull/37547) | Guard known Whisper subtitle-credit hallucinations in audio transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37547.md) | complete | Apr 24, 2026, 03:28 UTC |
| [#37553](https://github.com/openclaw/openclaw/issues/37553) | [Feature]: How to automatically designate bot replies based on \"@\" in content in openclaw | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37553.md) | complete | Apr 24, 2026, 03:27 UTC |
| [#37548](https://github.com/openclaw/openclaw/issues/37548) | Duplicate plugin id warning when channels.feishu and plugins.entries.feishu both exist | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37548.md) | complete | Apr 24, 2026, 03:26 UTC |
| [#37571](https://github.com/openclaw/openclaw/issues/37571) | [Bug]: Custom anthropic-messages providers fail when proxy omits SSE event: field | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37571.md) | complete | Apr 24, 2026, 03:26 UTC |
| [#37431](https://github.com/openclaw/openclaw/issues/37431) | [Bug]: 网关自带的web应用总是出现吐字卡住 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37431.md) | complete | Apr 24, 2026, 03:26 UTC |
| [#37566](https://github.com/openclaw/openclaw/issues/37566) | [Bug]: TUI 不显示推送消息 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37566.md) | complete | Apr 24, 2026, 03:26 UTC |
| [#37457](https://github.com/openclaw/openclaw/issues/37457) | [Bug]: Auto-created agent dirs ignore OPENCLAW_STATE_DIR, fallback to ~/.openclaw/agents/ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37457.md) | complete | Apr 24, 2026, 03:26 UTC |
| [#37499](https://github.com/openclaw/openclaw/issues/37499) | Context compaction causes conversation to freeze/hang | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37499.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37545](https://github.com/openclaw/openclaw/pull/37545) | feat(feishu): add thinking panel with collapsible reasoning and tool tracking | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37545.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37549](https://github.com/openclaw/openclaw/pull/37549) | fix(logging): subsystem loggers now follow root logger rotation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37549.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37515](https://github.com/openclaw/openclaw/issues/37515) | Telegram voice notes can inject known Whisper hallucinations like \"Субтитры сделал DimaTorzok\" as trusted transcript text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37515.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37550](https://github.com/openclaw/openclaw/issues/37550) | macOS: OpenClaw.app v2026.3.2 crashes on launch (Fatal access conflict in TalkOverlayView) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37550.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37564](https://github.com/openclaw/openclaw/issues/37564) | [Bug]:  {\"subsystem\":\"gateway/channels/feishu\"} feishu[default]: dispatch complete (queuedFinal=false, replies=0) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37564.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37544](https://github.com/openclaw/openclaw/issues/37544) | Slack message tool: agent loops on message_not_found / fileId errors, burns API quota | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37544.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37494](https://github.com/openclaw/openclaw/issues/37494) | [Bug]: MAC install issue SHARP_IGNOR_GLOBAL_LIBVIPS=1 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37494.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37561](https://github.com/openclaw/openclaw/pull/37561) | fix: properly import ModelProviderConfig type | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37561.md) | complete | Apr 24, 2026, 03:25 UTC |
| [#37507](https://github.com/openclaw/openclaw/pull/37507) | feat(plugin-sdk): export session binding types and functions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/37507.md) | complete | Apr 24, 2026, 03:24 UTC |
| [#37505](https://github.com/openclaw/openclaw/issues/37505) | Cron job timeout aborts entire model fallback chain via shared AbortController | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37505.md) | complete | Apr 24, 2026, 03:24 UTC |
| [#37487](https://github.com/openclaw/openclaw/issues/37487) | [Feature]: Feature request: Per-agent isolated browser instances with per-profile proxy support (concurrent execution) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37487.md) | complete | Apr 24, 2026, 03:24 UTC |
| [#37446](https://github.com/openclaw/openclaw/issues/37446) | Sub-agent timeout recovery creates duplicate API posts (idempotency gap) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37446.md) | complete | Apr 24, 2026, 03:24 UTC |

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
npm run plan -- --batch-size 5 --shard-count 20 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
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
