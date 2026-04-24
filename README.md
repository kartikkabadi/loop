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

Last dashboard update: Apr 24, 2026, 11:31 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12543 |
| Fresh reviewed issues in the last 7 days | 4963 |
| Proposed issue closes | 2749 (55.4% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6600 |
| Fresh reviewed PRs in the last 7 days | 2616 |
| Proposed PR closes | 889 (34% of reviewed PRs) |
| Open items total | 19143 |
| Reviewed files | 7579 |
| Fresh verified reviews in the last 7 days | 7579 |
| Proposed closes awaiting apply | 3638 (48% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 11564 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#50531](https://github.com/openclaw/openclaw/issues/50531) | Feishu: GM机器人(WebSocket)无法接收消息 - 多账号配置问题 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50531.md) | complete | Apr 24, 2026, 11:31 UTC |
| [#50478](https://github.com/openclaw/openclaw/issues/50478) | sessions_list in Discord channels appears scoped to current session instead of showing full active session set | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50478.md) | complete | Apr 24, 2026, 11:29 UTC |
| [#50514](https://github.com/openclaw/openclaw/issues/50514) | [Bug]: openclaw security audit --deep reports missing scope: operator.read despite operator tokens/scopes being present and gateway healthy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50514.md) | complete | Apr 24, 2026, 11:29 UTC |
| [#50525](https://github.com/openclaw/openclaw/pull/50525) | security: add periodic cleanup to control plane rate limiter | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50525.md) | complete | Apr 24, 2026, 11:28 UTC |
| [#50538](https://github.com/openclaw/openclaw/pull/50538) | Plugins: fix source plugin-sdk alias resolution | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50538.md) | complete | Apr 24, 2026, 11:28 UTC |
| [#50529](https://github.com/openclaw/openclaw/issues/50529) | Bug: depth-2 subagent receives task message twice on single sessions_spawn call | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50529.md) | complete | Apr 24, 2026, 11:28 UTC |
| [#50489](https://github.com/openclaw/openclaw/issues/50489) | [Bug]: Message tool and cron announce delivery fail with \"No active WhatsApp Web listener\" despite WhatsApp being connected (Baileys) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50489.md) | complete | Apr 24, 2026, 11:28 UTC |
| [#50487](https://github.com/openclaw/openclaw/issues/50487) | Agent-to-agent announce step does not fire for sessions_send to ACP-bound sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50487.md) | complete | Apr 24, 2026, 11:28 UTC |
| [#50392](https://github.com/openclaw/openclaw/pull/50392) | fix: inherit exec policy for /bash chat sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50392.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50498](https://github.com/openclaw/openclaw/issues/50498) | Feature: Allow hiding/filtering built-in model catalog entries | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50498.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50526](https://github.com/openclaw/openclaw/issues/50526) | Ollama-backed sub-agents fail on large-context tasks — read input, produce no meaningful output | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50526.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50472](https://github.com/openclaw/openclaw/issues/50472) | [Windows] Gateway exits silently without crash log | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50472.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50534](https://github.com/openclaw/openclaw/issues/50534) | Control UI: Agent settings model switch sends model ID without provider prefix | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50534.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50493](https://github.com/openclaw/openclaw/pull/50493) | fix: make initializeGlobalHookRunner idempotent (#50025) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50493.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50515](https://github.com/openclaw/openclaw/pull/50515) | security: sanitize control characters in channel error logging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50515.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50524](https://github.com/openclaw/openclaw/issues/50524) | Telegram /model switch confirms but doesn't take effect on active session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50524.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50491](https://github.com/openclaw/openclaw/issues/50491) | sessions_list returns only current session while openclaw status shows all active sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50491.md) | complete | Apr 24, 2026, 11:27 UTC |
| [#50456](https://github.com/openclaw/openclaw/pull/50456) | fix(ui): disambiguate chat model picker model refs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50456.md) | complete | Apr 24, 2026, 11:26 UTC |
| [#50494](https://github.com/openclaw/openclaw/issues/50494) | Feature: Auto-analyze inbound images with vision model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50494.md) | complete | Apr 24, 2026, 11:26 UTC |
| [#50508](https://github.com/openclaw/openclaw/issues/50508) | [Bug]: Message responses occasionally routed to wrong channel (webchat instead of Feishu) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50508.md) | complete | Apr 24, 2026, 11:26 UTC |

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
