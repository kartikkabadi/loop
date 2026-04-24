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

Last dashboard update: Apr 24, 2026, 06:14 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12498 |
| Fresh reviewed issues in the last 7 days | 2263 |
| Proposed issue closes | 1167 (51.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6583 |
| Fresh reviewed PRs in the last 7 days | 923 |
| Proposed PR closes | 298 (32.3% of reviewed PRs) |
| Open items total | 19081 |
| Reviewed files | 3186 |
| Fresh verified reviews in the last 7 days | 3186 |
| Proposed closes awaiting apply | 1465 (46% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 15895 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#42200](https://github.com/openclaw/openclaw/issues/42200) | [Bug]: Slack: Streaming messages show incomplete content | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42200.md) | complete | Apr 24, 2026, 06:14 UTC |
| [#42154](https://github.com/openclaw/openclaw/pull/42154) | fix(agents): keep sandbox allow semantics while exposing explicit plugin tools from alsoAllow. Fixes #41757 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42154.md) | complete | Apr 24, 2026, 06:14 UTC |
| [#42146](https://github.com/openclaw/openclaw/issues/42146) | [Bug]: Hook runner repeatedly re-initializes in background (no user activity) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42146.md) | complete | Apr 24, 2026, 06:13 UTC |
| [#42139](https://github.com/openclaw/openclaw/issues/42139) | ACP external harness on remote Mac node is unclear/broken in Discord workspace flow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42139.md) | complete | Apr 24, 2026, 06:13 UTC |
| [#42177](https://github.com/openclaw/openclaw/issues/42177) | [Bug]: Reply with a large amount of repetitive content | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42177.md) | complete | Apr 24, 2026, 06:13 UTC |
| [#42197](https://github.com/openclaw/openclaw/pull/42197) | feat(ui): tool name style in usage panel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42197.md) | complete | Apr 24, 2026, 06:13 UTC |
| [#42136](https://github.com/openclaw/openclaw/pull/42136) | docs: add openclaw-feishu-custom to community plugins | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42136.md) | complete | Apr 24, 2026, 06:13 UTC |
| [#42201](https://github.com/openclaw/openclaw/pull/42201) | fix: tolerate unknown config keys at startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42201.md) | complete | Apr 24, 2026, 06:13 UTC |
| [#42161](https://github.com/openclaw/openclaw/pull/42161) | fix: avoid manual cron deadlock on reentrant lanes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42161.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42120](https://github.com/openclaw/openclaw/pull/42120) | Gateway: add container LAN alias for loopback (#42074) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42120.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42067](https://github.com/openclaw/openclaw/issues/42067) | [Bug]: Openclaw startup failed after install gateway service with bun runtime and setup proxy for discord | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42067.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42059](https://github.com/openclaw/openclaw/pull/42059) | fix(telegram): batch fix 13 Telegram channel bugs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42059.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42141](https://github.com/openclaw/openclaw/pull/42141) | feat(web_search): add duckduckgo as a first-class provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42141.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42112](https://github.com/openclaw/openclaw/issues/42112) | Bug: persisted orphaned toolCall poisons session replay and makes chat agent stop responding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42112.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42167](https://github.com/openclaw/openclaw/issues/42167) | [Bug] Sidebar tree: collapse/expand toggle not working | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42167.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42178](https://github.com/openclaw/openclaw/issues/42178) | Discord: Slow DiscordMessageListener (300s+) causes WebSocket 1006 drops and gateway crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42178.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42191](https://github.com/openclaw/openclaw/issues/42191) | Feature Request: Support Feishu Thread Binding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/42191.md) | complete | Apr 24, 2026, 06:12 UTC |
| [#42165](https://github.com/openclaw/openclaw/issues/42165) | [Bug]: tools.profile: \"minimal\" exposes read/write/edit unless group:fs is explicitly denied | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42165.md) | complete | Apr 24, 2026, 06:11 UTC |
| [#42157](https://github.com/openclaw/openclaw/issues/42157) | Inbound Telegram webhook payloads lost on gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42157.md) | complete | Apr 24, 2026, 06:11 UTC |
| [#42131](https://github.com/openclaw/openclaw/pull/42131) | fix(doctor): case-insensitive safe-bin trusted dir matching on macOS/Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42131.md) | complete | Apr 24, 2026, 06:11 UTC |

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
