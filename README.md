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

Last dashboard update: Apr 24, 2026, 13:10 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12556 |
| Fresh reviewed issues in the last 7 days | 5864 |
| Proposed issue closes | 3284 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6612 |
| Fresh reviewed PRs in the last 7 days | 3115 |
| Proposed PR closes | 1038 (33.3% of reviewed PRs) |
| Open items total | 19168 |
| Reviewed files | 8979 |
| Fresh verified reviews in the last 7 days | 8979 |
| Proposed closes awaiting apply | 4322 (48.1% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 10189 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#53170](https://github.com/openclaw/openclaw/issues/53170) | Feature request: BM25 hybrid search for memory_search | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53170.md) | complete | Apr 24, 2026, 13:10 UTC |
| [#53162](https://github.com/openclaw/openclaw/issues/53162) | [Bug]: WhatsApp cron delivery always fails with \"No active WhatsApp Web listener\" despite channel being connected | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53162.md) | complete | Apr 24, 2026, 13:09 UTC |
| [#53109](https://github.com/openclaw/openclaw/issues/53109) | Better handling for interrupted streaming tool calls to avoid silent failure and retry loops | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53109.md) | complete | Apr 24, 2026, 13:08 UTC |
| [#53070](https://github.com/openclaw/openclaw/issues/53070) | 2026.3.22: breaking config schema removals + describeMessageTool TypeError silently break Discord tool calling | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53070.md) | complete | Apr 24, 2026, 13:08 UTC |
| [#53150](https://github.com/openclaw/openclaw/issues/53150) | [Feature Request] Support dynamic model switching in Gateway chat completions API | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53150.md) | complete | Apr 24, 2026, 13:08 UTC |
| [#53090](https://github.com/openclaw/openclaw/issues/53090) | Paperclip openclaw_gateway agents: WebSocket closed immediately even with auth=none | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53090.md) | complete | Apr 24, 2026, 13:08 UTC |
| [#53128](https://github.com/openclaw/openclaw/issues/53128) | [Bug]: `onboard --install-daemon` does not set `gateway.remote.token`, causing immediate token mismatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53128.md) | complete | Apr 24, 2026, 13:08 UTC |
| [#53119](https://github.com/openclaw/openclaw/pull/53119) | Fix cron false-positive errors after recovered reminder delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53119.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53123](https://github.com/openclaw/openclaw/pull/53123) | fix(whatsapp): add outbound guard for group allowlist policy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53123.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53120](https://github.com/openclaw/openclaw/issues/53120) | Approval flow regression: '/approve <id> allow-always' frequently returns 'unknown or expired approval id' for node system.run denies | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53120.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53149](https://github.com/openclaw/openclaw/pull/53149) | feat: add session search/recall, skills hub loop, and replay research surfaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53149.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53163](https://github.com/openclaw/openclaw/issues/53163) | [Bug] message tool file attachments silently dropped on Discord after v2026.3.22 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53163.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53124](https://github.com/openclaw/openclaw/issues/53124) | Telegram streaming: preview deleted before media message confirmed sent (group chat) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53124.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53172](https://github.com/openclaw/openclaw/issues/53172) | Control UI: Logo image broken on dashboard/connect page | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53172.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53158](https://github.com/openclaw/openclaw/issues/53158) | Session keys use ':openai:' regardless of actual LLM provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53158.md) | complete | Apr 24, 2026, 13:07 UTC |
| [#53126](https://github.com/openclaw/openclaw/issues/53126) | voice-call plugin: CLI conflicts with gateway on port 3334 — voicecall.initiate RPC does not trigger call (source install) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53126.md) | complete | Apr 24, 2026, 13:06 UTC |
| [#53140](https://github.com/openclaw/openclaw/issues/53140) | [Bug]:WhatsApp is taken over by OpenClaw and automatically replies to all messages. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/53140.md) | complete | Apr 24, 2026, 13:06 UTC |
| [#53171](https://github.com/openclaw/openclaw/pull/53171) | fix: include scripts/ in npm package files to fix ui:build after update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53171.md) | complete | Apr 24, 2026, 13:06 UTC |
| [#53168](https://github.com/openclaw/openclaw/issues/53168) | [Bug]: CLI commands crash gateway via WebSocket handshake timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53168.md) | complete | Apr 24, 2026, 13:06 UTC |
| [#52993](https://github.com/openclaw/openclaw/pull/52993) | feat(feishu): add message recall and delete support (#51422) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52993.md) | complete | Apr 24, 2026, 13:06 UTC |

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
