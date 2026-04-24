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

Last dashboard update: Apr 24, 2026, 18:38 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12485 |
| Fresh reviewed issues in the last 7 days | 8609 |
| Proposed issue closes | 4796 (55.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6614 |
| Fresh reviewed PRs in the last 7 days | 4488 |
| Proposed PR closes | 1380 (30.7% of reviewed PRs) |
| Open items total | 19099 |
| Reviewed files | 13097 |
| Archived closed files | 82 |
| Fresh verified reviews in the last 7 days | 13097 |
| Proposed closes awaiting apply | 6176 (47.2% of fresh reviews) |
| Closed by Codex apply | 70 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 6002 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#60933](https://github.com/openclaw/openclaw/issues/60933) | [Proposal] Prevent order-sensitive tool failures with a pre-execution logic fuse | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60933.md) | complete | Apr 24, 2026, 18:38 UTC |
| [#60892](https://github.com/openclaw/openclaw/issues/60892) | stale_running tasks remain in ledger and cannot be cleared | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60892.md) | complete | Apr 24, 2026, 18:37 UTC |
| [#60868](https://github.com/openclaw/openclaw/pull/60868) | Agents: detect context overflow across error cause chains | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60868.md) | complete | Apr 24, 2026, 18:37 UTC |
| [#60861](https://github.com/openclaw/openclaw/issues/60861) | [Bug]: WorkClaw-exec工具执行卡死Bug反馈 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60861.md) | complete | Apr 24, 2026, 18:37 UTC |
| [#60866](https://github.com/openclaw/openclaw/issues/60866) | Discord group session freezes after compaction — reacts with 👀 but never responds | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60866.md) | complete | Apr 24, 2026, 18:37 UTC |
| [#60921](https://github.com/openclaw/openclaw/issues/60921) | [Bug] Isolated cron session delivery fails with 'Channel is required' even when delivery.channel is explicitly set | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60921.md) | complete | Apr 24, 2026, 18:37 UTC |
| [#60885](https://github.com/openclaw/openclaw/issues/60885) | LaunchAgent: ThrottleInterval=1 causes unrecoverable gateway downtime after auto-update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60885.md) | complete | Apr 24, 2026, 18:36 UTC |
| [#60930](https://github.com/openclaw/openclaw/issues/60930) | [Bug]: Control UI / WebChat local websocket disconnects with code=1001 during long-running tasks; reconnect recovers via chat.history instead of stable live updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60930.md) | complete | Apr 24, 2026, 18:36 UTC |
| [#60893](https://github.com/openclaw/openclaw/issues/60893) | Multi-tool responses dispatched as separate messages instead of coalesced | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60893.md) | complete | Apr 24, 2026, 18:36 UTC |
| [#60928](https://github.com/openclaw/openclaw/pull/60928) | CLI: refresh skills snapshot for agent runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60928.md) | complete | Apr 24, 2026, 18:36 UTC |
| [#60882](https://github.com/openclaw/openclaw/pull/60882) | test: Add unit tests for config path utilities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60882.md) | complete | Apr 24, 2026, 18:36 UTC |
| [#60929](https://github.com/openclaw/openclaw/issues/60929) | sessions_spawn subagent fails with 1008 pairing required - never enters pending queue | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60929.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60922](https://github.com/openclaw/openclaw/pull/60922) | feat(agents): derive fallbacks from configured model catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60922.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60867](https://github.com/openclaw/openclaw/issues/60867) | Discord group session freezes after compaction — reacts with 👀 but never responds | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60867.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60890](https://github.com/openclaw/openclaw/pull/60890) | fix(cron): support thread-id in cron add/edit and paged lookup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60890.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60913](https://github.com/openclaw/openclaw/issues/60913) | Support Xiaomi mimo-v2-omni for image understanding (media-understanding provider) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60913.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60920](https://github.com/openclaw/openclaw/issues/60920) | [Bug]: Telegram auth routing to OAuth despite API key configuration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60920.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60917](https://github.com/openclaw/openclaw/issues/60917) | Dashboard save fails on redacted gateway.remote.token sentinel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60917.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60934](https://github.com/openclaw/openclaw/pull/60934) | fix(auth): respect auth override by filtering profiles (token/oauth) (closes #60930) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60934.md) | complete | Apr 24, 2026, 18:35 UTC |
| [#60821](https://github.com/openclaw/openclaw/issues/60821) | [Bug]: HTTP 400 — tools.profile=coding sends `read` tool schema without `additionalProperties: false`, rejected by OpenAI and GitHub Copilot providers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60821.md) | complete | Apr 24, 2026, 18:35 UTC |

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
