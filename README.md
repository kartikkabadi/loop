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

Last dashboard update: Apr 24, 2026, 15:31 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12565 |
| Fresh reviewed issues in the last 7 days | 7041 |
| Proposed issue closes | 3932 (55.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6620 |
| Fresh reviewed PRs in the last 7 days | 3727 |
| Proposed PR closes | 1204 (32.3% of reviewed PRs) |
| Open items total | 19185 |
| Reviewed files | 10768 |
| Archived closed files | 11 |
| Fresh verified reviews in the last 7 days | 10768 |
| Proposed closes awaiting apply | 5136 (47.7% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 8417 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56483](https://github.com/openclaw/openclaw/pull/56483) | ani: add Agent-Native IM channel plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56483.md) | complete | Apr 24, 2026, 15:24 UTC |
| [#56444](https://github.com/openclaw/openclaw/issues/56444) | message tool: WhatsApp media sends return 'unsupported channel' error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56444.md) | complete | Apr 24, 2026, 15:23 UTC |
| [#56428](https://github.com/openclaw/openclaw/issues/56428) | Discord channel enabled but silently ignored by gateway — not shown in status probe | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56428.md) | complete | Apr 24, 2026, 15:22 UTC |
| [#56479](https://github.com/openclaw/openclaw/issues/56479) | msteams plugin: path-to-regexp crash on gateway 2026.3.24 + Node.js 25.8.2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56479.md) | complete | Apr 24, 2026, 15:22 UTC |
| [#56470](https://github.com/openclaw/openclaw/issues/56470) | [Bug]: weixin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56470.md) | complete | Apr 24, 2026, 15:22 UTC |
| [#56458](https://github.com/openclaw/openclaw/issues/56458) | WebChat channel: Image support | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56458.md) | complete | Apr 24, 2026, 15:22 UTC |
| [#56469](https://github.com/openclaw/openclaw/issues/56469) | Support per-device typingIndicator configuration for Feishu channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56469.md) | complete | Apr 24, 2026, 15:21 UTC |
| [#56437](https://github.com/openclaw/openclaw/issues/56437) | [Feature Request] Native fallbackRunbook injection in agents config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56437.md) | complete | Apr 24, 2026, 15:21 UTC |
| [#56463](https://github.com/openclaw/openclaw/issues/56463) | Cursor ACP via gateway: 'queue owner unavailable' — works from CLI, fails through gateway plugin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56463.md) | complete | Apr 24, 2026, 15:21 UTC |
| [#56434](https://github.com/openclaw/openclaw/issues/56434) | Feature Request: Built-in periodic memory consolidation (daily → MEMORY.md) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56434.md) | complete | Apr 24, 2026, 15:21 UTC |
| [#56467](https://github.com/openclaw/openclaw/issues/56467) | Implement two-strike enforcement for agents and subagents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56467.md) | complete | Apr 24, 2026, 15:21 UTC |
| [#56485](https://github.com/openclaw/openclaw/issues/56485) | openclaw-control-ui: duplicate reflection requests and missing image attachment support | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56485.md) | complete | Apr 24, 2026, 15:21 UTC |
| [#56417](https://github.com/openclaw/openclaw/issues/56417) | [Bug]: Issue: Image tool returns \"No media-understanding provider registered\" for configured vision models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56417.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56426](https://github.com/openclaw/openclaw/issues/56426) | [Bug]: plugins.allow breaks Telegram channel in OpenClaw 2026.3.24 on WSL2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56426.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56442](https://github.com/openclaw/openclaw/pull/56442) | feat: Add opt-in ACP parent completion notify for sessions_spawn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56442.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56478](https://github.com/openclaw/openclaw/issues/56478) | [Bug]: WeChat plugin fails to send messages from isolated cron sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56478.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56418](https://github.com/openclaw/openclaw/issues/56418) | WhatsApp self-chat: outbound messages echo back as inbound in personal-number mode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56418.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56466](https://github.com/openclaw/openclaw/pull/56466) | fix: handle wildcard (*) in plugin API version range checks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56466.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56453](https://github.com/openclaw/openclaw/pull/56453) | fix(agent): respect configured default agent for --to sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56453.md) | complete | Apr 24, 2026, 15:20 UTC |
| [#56378](https://github.com/openclaw/openclaw/issues/56378) | Telegram: multi-minute silence during tool-heavy turns and compaction — operator has no visibility | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/56378.md) | complete | Apr 24, 2026, 15:20 UTC |

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
