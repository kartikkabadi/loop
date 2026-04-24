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

Last dashboard update: Apr 24, 2026, 17:45 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12517 |
| Fresh reviewed issues in the last 7 days | 8224 |
| Proposed issue closes | 4597 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6612 |
| Fresh reviewed PRs in the last 7 days | 4303 |
| Proposed PR closes | 1340 (31.1% of reviewed PRs) |
| Open items total | 19129 |
| Reviewed files | 12527 |
| Archived closed files | 52 |
| Fresh verified reviews in the last 7 days | 12527 |
| Proposed closes awaiting apply | 5937 (47.4% of fresh reviews) |
| Closed by Codex apply | 40 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 6602 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59770](https://github.com/openclaw/openclaw/issues/59770) | [Feishu] message tool returns 'Unknown channel: feishu' - cannot send proactive messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59770.md) | complete | Apr 24, 2026, 17:44 UTC |
| [#59784](https://github.com/openclaw/openclaw/issues/59784) | [Bug]: Subscription quota limit (\"You've hit your limit\") classified as billing error, blocks model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59784.md) | complete | Apr 24, 2026, 17:44 UTC |
| [#59802](https://github.com/openclaw/openclaw/issues/59802) | [Bug]: unauthorized: gateway token missing (open the dashboard URL and paste the token in Control UI settings) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59802.md) | complete | Apr 24, 2026, 17:43 UTC |
| [#59777](https://github.com/openclaw/openclaw/issues/59777) | 400 No connected db error when using custom model provider (purepath) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59777.md) | complete | Apr 24, 2026, 17:43 UTC |
| [#59773](https://github.com/openclaw/openclaw/issues/59773) | Feature request: Add OAuth usage quota endpoint to session_status or new tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59773.md) | complete | Apr 24, 2026, 17:43 UTC |
| [#59818](https://github.com/openclaw/openclaw/pull/59818) | fix(discord): support CJK @mention rewriting in bot-to-bot message chains | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59818.md) | complete | Apr 24, 2026, 17:43 UTC |
| [#59771](https://github.com/openclaw/openclaw/pull/59771) | Fix Feishu streaming recovery after transient reply errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59771.md) | complete | Apr 24, 2026, 17:43 UTC |
| [#59794](https://github.com/openclaw/openclaw/pull/59794) | docs(changelog): add Brave config migration note | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59794.md) | complete | Apr 24, 2026, 17:43 UTC |
| [#59827](https://github.com/openclaw/openclaw/issues/59827) | [Bug]: Tool calls not executing after upgrade to 2026.4.1 - displayed as plain text instead | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59827.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59825](https://github.com/openclaw/openclaw/issues/59825) | Regression in v2026.4.1: Environment Hijacking and Orchestrator Deadlock | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59825.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59806](https://github.com/openclaw/openclaw/issues/59806) | Bug: Feishu plugin fails with 'Cannot destructure property tenant_access_token' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59806.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59705](https://github.com/openclaw/openclaw/pull/59705) | [codex] improve parallels windows smoke logging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59705.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59826](https://github.com/openclaw/openclaw/issues/59826) | [Bug] stepfun/step-3.5-flash: thinking content leaks to channel because reasoning cannot be disabled | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59826.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59782](https://github.com/openclaw/openclaw/issues/59782) | feat: Add silentErrorReplies / suppressAgentErrors support for WhatsApp channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59782.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59719](https://github.com/openclaw/openclaw/pull/59719) | fix(exec): track background exec liveness with CLI tasks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59719.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59824](https://github.com/openclaw/openclaw/issues/59824) | [Bug] MiniMax-M2.7 streaming not working - content field contains thinking tags mixed with response | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59824.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59786](https://github.com/openclaw/openclaw/issues/59786) | Feature: subcommand-level exec allowlisting | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59786.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59817](https://github.com/openclaw/openclaw/issues/59817) | Discord DMs can fork into duplicate channel sessions during channel-info/network failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59817.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59779](https://github.com/openclaw/openclaw/issues/59779) | 【4.1升级踩坑】5 Subagents Scanned GitHub — Found 4.1 is a Disaster Worse Than 3.31 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59779.md) | complete | Apr 24, 2026, 17:42 UTC |
| [#59820](https://github.com/openclaw/openclaw/issues/59820) | [Bug]: [v2026.4.1] Discord provider hangs on first startup, requires health-monitor restart to connect | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59820.md) | complete | Apr 24, 2026, 17:42 UTC |

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
