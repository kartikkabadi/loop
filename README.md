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

Last dashboard update: Apr 24, 2026, 15:41 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12566 |
| Fresh reviewed issues in the last 7 days | 7164 |
| Proposed issue closes | 3992 (55.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6620 |
| Fresh reviewed PRs in the last 7 days | 3804 |
| Proposed PR closes | 1223 (32.2% of reviewed PRs) |
| Open items total | 19186 |
| Reviewed files | 10968 |
| Archived closed files | 11 |
| Fresh verified reviews in the last 7 days | 10968 |
| Proposed closes awaiting apply | 5215 (47.5% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 8218 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56763](https://github.com/openclaw/openclaw/issues/56763) | [Bug]: 2026.3.28 — /v1/models and /v1/chat/completions reject gateway bearer token with 'missing scope: operator.read/write' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56763.md) | complete | Apr 24, 2026, 15:41 UTC |
| [#56788](https://github.com/openclaw/openclaw/issues/56788) | [Bug] Heartbeat model override ignored in v2026.3.28 - falls back to main session model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56788.md) | complete | Apr 24, 2026, 15:40 UTC |
| [#56794](https://github.com/openclaw/openclaw/issues/56794) | Bundled channel schema overrides external plugin schema even when bundled plugin is disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56794.md) | complete | Apr 24, 2026, 15:40 UTC |
| [#56766](https://github.com/openclaw/openclaw/pull/56766) | fix(slack): wake interaction system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56766.md) | complete | Apr 24, 2026, 15:40 UTC |
| [#56758](https://github.com/openclaw/openclaw/pull/56758) | fix(feishu): downgrade tool registration logs from info to debug (fixes #56695) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56758.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56815](https://github.com/openclaw/openclaw/issues/56815) | memorySearch: embedding reindex fails with 'TypeError: fetch failed' after indexing ~40K chunks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56815.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56771](https://github.com/openclaw/openclaw/issues/56771) | [Bug]: Add automatic parameter validation before tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56771.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56775](https://github.com/openclaw/openclaw/issues/56775) | Bug: exec denied: allowlist miss despite correct configuration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56775.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56691](https://github.com/openclaw/openclaw/issues/56691) | openai-codex provider drops inbound user message in agent dispatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56691.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56760](https://github.com/openclaw/openclaw/issues/56760) | Plugin hooks (before_agent_start, agent_end) don't fire for per-channel-peer sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56760.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56791](https://github.com/openclaw/openclaw/pull/56791) | fix(signal): forward quote metadata to agent context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56791.md) | complete | Apr 24, 2026, 15:39 UTC |
| [#56804](https://github.com/openclaw/openclaw/issues/56804) | Mission Control gateway heartbeat exhausts ChatGPT Plus Codex weekly quota | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56804.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56792](https://github.com/openclaw/openclaw/pull/56792) | fix(schema-validator): report specific property name for additionalProperties errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56792.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56783](https://github.com/openclaw/openclaw/pull/56783) | UI: cap Control UI chat history rendering by char budget | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56783.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56759](https://github.com/openclaw/openclaw/issues/56759) | [Feature]: Provide a running status indicator. I cannot determine whether the task is currently being executed. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56759.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56801](https://github.com/openclaw/openclaw/issues/56801) | Recurring bug: compaction status is emitted into Telegram user-facing output and final reply is not delivered | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56801.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56693](https://github.com/openclaw/openclaw/issues/56693) | OpenAI Codex OAuth can bind to a deactivated ChatGPT workspace when accounts have multiple workspaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56693.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56774](https://github.com/openclaw/openclaw/issues/56774) | [Bug] Image viewer broken - Cannot find package 'sharp' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56774.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56682](https://github.com/openclaw/openclaw/issues/56682) | [Bug]: webchat session context lost after Gateway restart (SIGUSR1) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56682.md) | complete | Apr 24, 2026, 15:38 UTC |
| [#56778](https://github.com/openclaw/openclaw/issues/56778) | cron list: add --agent filter for multi-agent isolation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56778.md) | complete | Apr 24, 2026, 15:38 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking.

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
