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

Last dashboard update: Apr 24, 2026, 12:26 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12552 |
| Fresh reviewed issues in the last 7 days | 5454 |
| Proposed issue closes | 3028 (55.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6605 |
| Fresh reviewed PRs in the last 7 days | 2925 |
| Proposed PR closes | 981 (33.5% of reviewed PRs) |
| Open items total | 19157 |
| Reviewed files | 8379 |
| Fresh verified reviews in the last 7 days | 8379 |
| Proposed closes awaiting apply | 4009 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 10778 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51909](https://github.com/openclaw/openclaw/issues/51909) | bug(acp): acpx gateway runtime fails with 'exited with code 1' — works fine via direct acpx invocation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51909.md) | complete | Apr 24, 2026, 12:26 UTC |
| [#51916](https://github.com/openclaw/openclaw/issues/51916) | Feature Request: Telegram Business message support (business_connection / business_message) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51916.md) | complete | Apr 24, 2026, 12:25 UTC |
| [#51958](https://github.com/openclaw/openclaw/pull/51958) | fix(agents): gate exec approval followup delivery on external channel target availability | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51958.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51967](https://github.com/openclaw/openclaw/pull/51967) | Polls: require positive duration for poll param detection (#51830) (#51830) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51967.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51900](https://github.com/openclaw/openclaw/pull/51900) | Claude/install compound plugin 0k pig | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51900.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51969](https://github.com/openclaw/openclaw/pull/51969) | Agents/cron tool: document IANA tz for cron schedules (#51922) (#51922) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51969.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51957](https://github.com/openclaw/openclaw/issues/51957) | Control UI: Chat model picker uses bare catalog id, resolves to wrong provider (e.g. openai-codex/deepseek-chat) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51957.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51930](https://github.com/openclaw/openclaw/pull/51930) | fix: normalize OpenClawBrain plugin install identity | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51930.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51940](https://github.com/openclaw/openclaw/pull/51940) | fix(ui): resolve channel config forms via account path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51940.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51844](https://github.com/openclaw/openclaw/issues/51844) | [Feature]: Time-based heartbeat schedule blocks (variable intervals by time of day) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51844.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51904](https://github.com/openclaw/openclaw/issues/51904) | memory_search tool ignores memorySearch.provider config, always uses OpenAI embeddings | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51904.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51917](https://github.com/openclaw/openclaw/issues/51917) | Feature: Auto-resume unanswered sessions after gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51917.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51952](https://github.com/openclaw/openclaw/pull/51952) | feat: add config option to disable tool-result context guard compaction to speed up local LLM calls with prompt caching [AI-assisted] | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51952.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51928](https://github.com/openclaw/openclaw/issues/51928) | Feature: Transparent exec logging — show commands before/as they run (log mode without confirmation) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51928.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51961](https://github.com/openclaw/openclaw/pull/51961) | Gateway: default WebSocket client scopes to admin + read (#51887) (#51887) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51961.md) | complete | Apr 24, 2026, 12:24 UTC |
| [#51955](https://github.com/openclaw/openclaw/pull/51955) | fix(gateway): recognize control-ui and webchat clients as valid exec approval resolvers over plain HTTP | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51955.md) | complete | Apr 24, 2026, 12:23 UTC |
| [#51872](https://github.com/openclaw/openclaw/issues/51872) | [Feature]: bearer token authentication for proxy servers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51872.md) | complete | Apr 24, 2026, 12:23 UTC |
| [#51959](https://github.com/openclaw/openclaw/pull/51959) | fix(exec): skip outbound deliver for webchat-only exec approval follow-ups (#51936) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51959.md) | complete | Apr 24, 2026, 12:23 UTC |
| [#51887](https://github.com/openclaw/openclaw/issues/51887) | [Bug]: gateway-client / TUI loses operator.read and breaks openclaw status --all | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51887.md) | complete | Apr 24, 2026, 12:23 UTC |
| [#51960](https://github.com/openclaw/openclaw/pull/51960) | Security: avoid pipe-to-shell false positive on logical OR (\|\|) (#51908) (#51908) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51960.md) | complete | Apr 24, 2026, 12:23 UTC |

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
