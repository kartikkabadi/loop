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

Last dashboard update: Apr 24, 2026, 14:38 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12572 |
| Fresh reviewed issues in the last 7 days | 6670 |
| Proposed issue closes | 3730 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6619 |
| Fresh reviewed PRs in the last 7 days | 3509 |
| Proposed PR closes | 1142 (32.5% of reviewed PRs) |
| Open items total | 19191 |
| Reviewed files | 10179 |
| Fresh verified reviews in the last 7 days | 10179 |
| Proposed closes awaiting apply | 4872 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 9012 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#55368](https://github.com/openclaw/openclaw/issues/55368) | [Bug]: OpenClaw openai-codex provider returns 404 terminated / 502 Bad Gateway, while direct codex exec works on the same machine | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55368.md) | complete | Apr 24, 2026, 14:38 UTC |
| [#55390](https://github.com/openclaw/openclaw/pull/55390) | WIP feat(cli): sync local schema artifacts on startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55390.md) | complete | Apr 24, 2026, 14:37 UTC |
| [#55366](https://github.com/openclaw/openclaw/issues/55366) | [Bug]: Hard context reset destroys in-progress task state with no recovery path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55366.md) | complete | Apr 24, 2026, 14:37 UTC |
| [#55375](https://github.com/openclaw/openclaw/issues/55375) | [Bug]: Cron delivery rejects explicit channel: \"telegram\" with \"Unsupported channel\" after gateway restart | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55375.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55356](https://github.com/openclaw/openclaw/issues/55356) | Feature Request: suppressToolErrors option to hide tool failures from chat | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55356.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55395](https://github.com/openclaw/openclaw/pull/55395) | fix: centralize plugin command auth requirements | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55395.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55379](https://github.com/openclaw/openclaw/issues/55379) | [Feature]: Optional real-time API cost tracking via burn0 integration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55379.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55347](https://github.com/openclaw/openclaw/issues/55347) | Feature: Native gateway self-healing with configurable recovery workflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55347.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55416](https://github.com/openclaw/openclaw/pull/55416) | Handle inline Ollama tool calls for Qwen | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55416.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55343](https://github.com/openclaw/openclaw/issues/55343) | [Bug]: Agent loses conversation history between sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55343.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55387](https://github.com/openclaw/openclaw/issues/55387) | [Bug]:Telegram startup fails with 404 (deleteWebhook / deleteMyCommands / setMyCommands) even though direct Bot API calls succeed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55387.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55304](https://github.com/openclaw/openclaw/issues/55304) | [Bug]: Telegram channels fail to initialize silently after gateway restart in v2026.3.24 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55304.md) | complete | Apr 24, 2026, 14:36 UTC |
| [#55396](https://github.com/openclaw/openclaw/pull/55396) | feat: add Kudosity SMS channel plugin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55396.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55401](https://github.com/openclaw/openclaw/issues/55401) | Feature: Per-agent plugin configuration overrides for multi-agent setups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55401.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55372](https://github.com/openclaw/openclaw/issues/55372) | Feature request: config option to disable restart sentinel notification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55372.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55254](https://github.com/openclaw/openclaw/issues/55254) | [Bug]: [v2026.3.24 Bug] /new creates duplicate \"agent:main:main\" session that hijacks Feishu message routing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55254.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55382](https://github.com/openclaw/openclaw/issues/55382) | BUG: Subagent announce-back fails with 'Outbound not configured for channel: slack' — registry mismatch in deliver path | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55382.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55271](https://github.com/openclaw/openclaw/issues/55271) | Cron isolated + announce delivery fails: target resolved to @heartbeat instead of specified chat ID | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55271.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55262](https://github.com/openclaw/openclaw/issues/55262) | [Feature] Add tool_call and after_tool_call Hook events for automation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/55262.md) | complete | Apr 24, 2026, 14:35 UTC |
| [#55364](https://github.com/openclaw/openclaw/issues/55364) | [Bug]: WhatsApp message send sends MP3 audio as PTT voice note, breaking Android playback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55364.md) | complete | Apr 24, 2026, 14:35 UTC |

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
