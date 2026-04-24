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

Last dashboard update: Apr 24, 2026, 12:41 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12556 |
| Fresh reviewed issues in the last 7 days | 5584 |
| Proposed issue closes | 3107 (55.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6606 |
| Fresh reviewed PRs in the last 7 days | 2995 |
| Proposed PR closes | 1005 (33.6% of reviewed PRs) |
| Open items total | 19162 |
| Reviewed files | 8579 |
| Fresh verified reviews in the last 7 days | 8579 |
| Proposed closes awaiting apply | 4112 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 10583 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#52333](https://github.com/openclaw/openclaw/issues/52333) | openclaw status: Gateway probe reports unreachable on loopback (missing scope operator.read) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52333.md) | complete | Apr 24, 2026, 12:40 UTC |
| [#52306](https://github.com/openclaw/openclaw/issues/52306) | Embedded run holds session-write-lock for 30 minutes when Telegram streaming stalls (watchdog timeout: 600s, not configurable) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52306.md) | complete | Apr 24, 2026, 12:40 UTC |
| [#52292](https://github.com/openclaw/openclaw/issues/52292) | [Bug] nano-banana-pro skill causes duplicate image sends — AI doesn't know OpenClaw auto-attaches MEDIA: output | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52292.md) | complete | Apr 24, 2026, 12:40 UTC |
| [#52339](https://github.com/openclaw/openclaw/issues/52339) | [Bug]:   OPENCLAW_CONFIG_DIR defaults to /root/.openclaw causing silent write failures for non-root users | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52339.md) | complete | Apr 24, 2026, 12:40 UTC |
| [#52323](https://github.com/openclaw/openclaw/issues/52323) | Cron isolated sessions should display job name as session label in Control UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52323.md) | complete | Apr 24, 2026, 12:40 UTC |
| [#52342](https://github.com/openclaw/openclaw/pull/52342) | fix(feishu): treat OpenChat (oc_) topic groups as group chats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52342.md) | complete | Apr 24, 2026, 12:40 UTC |
| [#52338](https://github.com/openclaw/openclaw/issues/52338) | [CLI] Local operator RPCs still lose operator.read after 2026.3.12 shared-auth hardening | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52338.md) | complete | Apr 24, 2026, 12:39 UTC |
| [#52298](https://github.com/openclaw/openclaw/issues/52298) | [Bug]: | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52298.md) | complete | Apr 24, 2026, 12:39 UTC |
| [#52316](https://github.com/openclaw/openclaw/pull/52316) | fix(tts): add inbound and tagged modes to /tts help output | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52316.md) | complete | Apr 24, 2026, 12:39 UTC |
| [#52311](https://github.com/openclaw/openclaw/issues/52311) | [Bug]: openai的模型会显示成 anthropic/gpt-5.4-pro | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52311.md) | complete | Apr 24, 2026, 12:39 UTC |
| [#52271](https://github.com/openclaw/openclaw/issues/52271) | [Bug]: sessions_send from cron/heartbeat context deadlocks on nested lane (maxConcurrent: 1) - regression from PR #45459 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52271.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52329](https://github.com/openclaw/openclaw/pull/52329) | fix(agents): include cache tokens in /status cost estimate | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52329.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52327](https://github.com/openclaw/openclaw/issues/52327) | Feature: Persistent session retention for subagent/ACP sessions (analogous to cron.sessionRetention) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52327.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52297](https://github.com/openclaw/openclaw/pull/52297) | fix(session-startup): strengthen bare /new and /reset startup prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52297.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52278](https://github.com/openclaw/openclaw/pull/52278) | [codex] fix(embedded): recover orphaned turns without dropping repeats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52278.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52317](https://github.com/openclaw/openclaw/issues/52317) | System prompt completely missing after /new — workspace files not injected, silent failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52317.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52285](https://github.com/openclaw/openclaw/issues/52285) | [Bug]: Heartbeat messages will not be sent to Telegram | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52285.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52286](https://github.com/openclaw/openclaw/issues/52286) | [Bug] message tool sends files to DM instead of staying in Telegram topic | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/52286.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52280](https://github.com/openclaw/openclaw/issues/52280) | gateway probe times out on loopback; deep audit reports missing scope operator.read (device-identity GatewayClient works) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52280.md) | complete | Apr 24, 2026, 12:38 UTC |
| [#52265](https://github.com/openclaw/openclaw/issues/52265) | [Bug]: CLI `openclaw cron/gateway` commands fail with \"handshake timeout\" on v2026.3.13 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/52265.md) | complete | Apr 24, 2026, 12:38 UTC |

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
