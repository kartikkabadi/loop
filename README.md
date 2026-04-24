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

Last dashboard update: Apr 24, 2026, 11:02 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12537 |
| Fresh reviewed issues in the last 7 days | 4700 |
| Proposed issue closes | 2592 (55.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6598 |
| Fresh reviewed PRs in the last 7 days | 2479 |
| Proposed PR closes | 853 (34.4% of reviewed PRs) |
| Open items total | 19135 |
| Reviewed files | 7179 |
| Fresh verified reviews in the last 7 days | 7179 |
| Proposed closes awaiting apply | 3445 (48% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 11956 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#49815](https://github.com/openclaw/openclaw/issues/49815) | [Bug]: Browserless in same-host Docker setup fails on loopback but works via Docker-network endpoint | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49815.md) | complete | Apr 24, 2026, 11:02 UTC |
| [#49840](https://github.com/openclaw/openclaw/pull/49840) | feat(heartbeat): add maxCostPerRun config to cap embedded run cost | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49840.md) | complete | Apr 24, 2026, 11:01 UTC |
| [#49823](https://github.com/openclaw/openclaw/issues/49823) | Add per-run cost cap for embedded runs (maxCostPerRun) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49823.md) | complete | Apr 24, 2026, 11:01 UTC |
| [#49797](https://github.com/openclaw/openclaw/pull/49797) | fix: preserve raw WebUI model aliases | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49797.md) | complete | Apr 24, 2026, 11:01 UTC |
| [#49853](https://github.com/openclaw/openclaw/issues/49853) | [Bug]: [Control UI] Stop button disappears during active chat/run (2026.3.13)\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49853.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49824](https://github.com/openclaw/openclaw/issues/49824) | Bug: webchat status bar shows incorrect remaining tokens and context percentage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49824.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49859](https://github.com/openclaw/openclaw/pull/49859) | fix(ui): include group identifier in Telegram group chat display name | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49859.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49858](https://github.com/openclaw/openclaw/issues/49858) | 🔥Enhanced LanceDB memory plugin for OpenClaw — Hybrid Retrieval (Vector + BM25), Cross-Encoder Rerank, Multi-Scope Isolation, Management CLI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49858.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49862](https://github.com/openclaw/openclaw/issues/49862) | Telegram forum: reply_to_id returns wrong content across topics | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49862.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49811](https://github.com/openclaw/openclaw/issues/49811) | [Bug] Rate limit 错误未触发快速 failover，导致 10 分钟超时阻塞 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49811.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49802](https://github.com/openclaw/openclaw/issues/49802) | Feature Request: Session lifecycle hooks (on-compact, on-session-end) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49802.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49819](https://github.com/openclaw/openclaw/pull/49819) | fix(channels): treat Feishu p2p chats as direct messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49819.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49776](https://github.com/openclaw/openclaw/issues/49776) | [Bug]: WebUI Dashboard page freezes, unresponsive after static resources load | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49776.md) | complete | Apr 24, 2026, 11:00 UTC |
| [#49856](https://github.com/openclaw/openclaw/pull/49856) | fix: web UI chat model dropdown desync and wrong provider prefix | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49856.md) | complete | Apr 24, 2026, 10:59 UTC |
| [#49786](https://github.com/openclaw/openclaw/issues/49786) | [Bug]: DingTalk channel browser tool SsrFBlockedError | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49786.md) | complete | Apr 24, 2026, 10:59 UTC |
| [#49825](https://github.com/openclaw/openclaw/pull/49825) | Discord: make exec approval timeout configurable | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49825.md) | complete | Apr 24, 2026, 10:59 UTC |
| [#49828](https://github.com/openclaw/openclaw/issues/49828) | WebChat: Sidebar agent list instead of dropdown selector | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49828.md) | complete | Apr 24, 2026, 10:59 UTC |
| [#49763](https://github.com/openclaw/openclaw/issues/49763) | [Bug]: TUI loading spinner freezes when queuing message during active run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49763.md) | complete | Apr 24, 2026, 10:59 UTC |
| [#49829](https://github.com/openclaw/openclaw/issues/49829) | [Bug] Webchat Control UI model selector cannot switch to non-Anthropic models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49829.md) | complete | Apr 24, 2026, 10:59 UTC |
| [#49835](https://github.com/openclaw/openclaw/pull/49835) | Cn zzb | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49835.md) | complete | Apr 24, 2026, 10:59 UTC |

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
