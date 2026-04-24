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

Last dashboard update: Apr 24, 2026, 07:11 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12508 |
| Fresh reviewed issues in the last 7 days | 2732 |
| Proposed issue closes | 1426 (52.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6582 |
| Fresh reviewed PRs in the last 7 days | 1254 |
| Proposed PR closes | 402 (32.1% of reviewed PRs) |
| Open items total | 19090 |
| Reviewed files | 3986 |
| Fresh verified reviews in the last 7 days | 3986 |
| Proposed closes awaiting apply | 1828 (45.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 15104 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#43760](https://github.com/openclaw/openclaw/issues/43760) | Feature: separate fallback remote config for memorySearch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43760.md) | complete | Apr 24, 2026, 07:11 UTC |
| [#43756](https://github.com/openclaw/openclaw/issues/43756) | Feature Request: Slack threadBindings with spawnAcpSessions support (parity with Discord/Telegram) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43756.md) | complete | Apr 24, 2026, 07:08 UTC |
| [#43670](https://github.com/openclaw/openclaw/pull/43670) | fix: treat transient network errors as retryable for failover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43670.md) | complete | Apr 24, 2026, 07:08 UTC |
| [#43755](https://github.com/openclaw/openclaw/issues/43755) | [Bug]: Subagent result not delivered to parent session (sessions_spawn with claude) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43755.md) | complete | Apr 24, 2026, 07:07 UTC |
| [#43765](https://github.com/openclaw/openclaw/pull/43765) | Improve runtime recovery for heartbeat, Feishu, and exec sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43765.md) | complete | Apr 24, 2026, 07:07 UTC |
| [#43779](https://github.com/openclaw/openclaw/issues/43779) | [Bug]: `openclaw message send --channel qqbot --target` fails with `ToolInputError: to required` | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43779.md) | complete | Apr 24, 2026, 07:07 UTC |
| [#43741](https://github.com/openclaw/openclaw/issues/43741) | Thinking blocks modified during compaction/session replay cause API rejection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43741.md) | complete | Apr 24, 2026, 07:07 UTC |
| [#43802](https://github.com/openclaw/openclaw/issues/43802) | [Bug] Subagent completion notification loop causes excessive API calls | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43802.md) | complete | Apr 24, 2026, 07:07 UTC |
| [#43768](https://github.com/openclaw/openclaw/issues/43768) | [Bug]: sessions_spawn(runtime=\"subagent\") does not honor agents.defaults.subagents.model or explicit model override | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43768.md) | complete | Apr 24, 2026, 07:07 UTC |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | [Bug]: Memory management is in chaos | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43747.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43803](https://github.com/openclaw/openclaw/issues/43803) | [BUG] config.patch still sends SIGUSR1 for hot-reloadable paths (browser.profiles.*), bypassing reload mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43803.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43767](https://github.com/openclaw/openclaw/issues/43767) | [Bug]: Heartbeat ignores lightContext: true, loads full agent context + unbounded session history | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43767.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43808](https://github.com/openclaw/openclaw/pull/43808) | cron: honor delivery.threadId for Telegram announce delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43808.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43774](https://github.com/openclaw/openclaw/issues/43774) | ClawHub CLI missing license acceptance flag for publish command | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43774.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43758](https://github.com/openclaw/openclaw/issues/43758) | [Feature]: Optimize the console log: log the information when OpenClaw sends a message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43758.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43778](https://github.com/openclaw/openclaw/issues/43778) | feat(tui): improve UX when gateway is disconnected or restarting | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43778.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43776](https://github.com/openclaw/openclaw/pull/43776) | \"dedupe\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43776.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43790](https://github.com/openclaw/openclaw/pull/43790) | [AI-assisted] fix(message): honor explicit agent routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43790.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43789](https://github.com/openclaw/openclaw/pull/43789) | [AI-assisted] fix(agents): compact sandbox skill paths | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43789.md) | complete | Apr 24, 2026, 07:06 UTC |
| [#43804](https://github.com/openclaw/openclaw/issues/43804) | [Bug] doctor --deep says no channel security warnings while security audit --deep reports criticals | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/43804.md) | complete | Apr 24, 2026, 07:06 UTC |

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
