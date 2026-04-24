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

Last dashboard update: Apr 24, 2026, 10:01 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12532 |
| Fresh reviewed issues in the last 7 days | 4213 |
| Proposed issue closes | 2316 (55% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6595 |
| Fresh reviewed PRs in the last 7 days | 2170 |
| Proposed PR closes | 751 (34.6% of reviewed PRs) |
| Open items total | 19127 |
| Reviewed files | 6383 |
| Fresh verified reviews in the last 7 days | 6383 |
| Proposed closes awaiting apply | 3067 (48% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 12744 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#48343](https://github.com/openclaw/openclaw/issues/48343) | [Bug]: Usage stats shows abnormal inputTokens (44M) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48343.md) | complete | Apr 24, 2026, 10:01 UTC |
| [#48341](https://github.com/openclaw/openclaw/issues/48341) | [Feature Request] TUI and Feishu message sync | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48341.md) | complete | Apr 24, 2026, 10:00 UTC |
| [#48361](https://github.com/openclaw/openclaw/issues/48361) | [Bug]: Agent goes completely silent for 30+ minutes after any provider error — no reply, no error message, no fallback (reproduced on Anthropic AND OpenAI) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48361.md) | complete | Apr 24, 2026, 10:00 UTC |
| [#48350](https://github.com/openclaw/openclaw/pull/48350) | Agents: add post-compaction validator | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48350.md) | complete | Apr 24, 2026, 10:00 UTC |
| [#48390](https://github.com/openclaw/openclaw/issues/48390) | WhatsApp Web: chronic 440 session conflict causes stale-socket loop and delivery failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48390.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48389](https://github.com/openclaw/openclaw/issues/48389) | [Bug]: stale queued reply can replay after restart instead of being invalidated by runtime generation change | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48389.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48381](https://github.com/openclaw/openclaw/pull/48381) | Plugin SDK: expose session binding adapter registration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48381.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48359](https://github.com/openclaw/openclaw/issues/48359) | Thread-bound ACP sessions missing metadata causing ACP_SESSION_INIT_FAILED | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48359.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48353](https://github.com/openclaw/openclaw/pull/48353) | CLI/status: bound Tailscale probes in status paths | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48353.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48360](https://github.com/openclaw/openclaw/issues/48360) | gateway probe false-negative timeout/close on loopback while gateway is healthy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48360.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48387](https://github.com/openclaw/openclaw/pull/48387) | whatsapp: stop gating explicit outbound targets on allowFrom | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48387.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48354](https://github.com/openclaw/openclaw/issues/48354) | Session corruption: 164 failures from orphaned tool_use blocks — need auto-recovery + repair in validateAnthropicTurns | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48354.md) | complete | Apr 24, 2026, 09:59 UTC |
| [#48379](https://github.com/openclaw/openclaw/issues/48379) | [Feature]: Per-agent X-Title header for OpenRouter (agent attribution in API logs) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48379.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48366](https://github.com/openclaw/openclaw/issues/48366) | Feature Request: Add Qwen3-TTS as Local TTS Provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48366.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48373](https://github.com/openclaw/openclaw/issues/48373) | feishu_doc `create` action silently ignores `content` parameter — creates empty document | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48373.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48368](https://github.com/openclaw/openclaw/pull/48368) | Agents: add recommend-reset escalation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48368.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48357](https://github.com/openclaw/openclaw/pull/48357) | [Feature]: Add Apertis as first-class model provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48357.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48340](https://github.com/openclaw/openclaw/issues/48340) | [Feature Request] TUI and Feishu message sync | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48340.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48375](https://github.com/openclaw/openclaw/pull/48375) | feat: Update Tailscale Gateway w/ custom control server configuration, validation & test coverage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48375.md) | complete | Apr 24, 2026, 09:58 UTC |
| [#48338](https://github.com/openclaw/openclaw/issues/48338) | Custom / third-party model APIs often fall back to an unclear 16K context window UX | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48338.md) | complete | Apr 24, 2026, 09:58 UTC |

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
