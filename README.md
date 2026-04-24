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

Last dashboard update: Apr 24, 2026, 04:18 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19155 |
| Reviewed / proposed closes | 1586 / 701 |
| Reviewed files | 1586 |
| Fresh verified reviews in the last 7 days | 1586 |
| Proposed closes awaiting apply | 701 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17569 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#38789](https://github.com/openclaw/openclaw/pull/38789) | fix(agents): rebuild sandbox skill prompt paths | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38789.md) | complete | Apr 24, 2026, 04:18 UTC |
| [#38792](https://github.com/openclaw/openclaw/issues/38792) | Agent loop silently stalls: no user response after API error + long tool-call chains | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38792.md) | complete | Apr 24, 2026, 04:17 UTC |
| [#38791](https://github.com/openclaw/openclaw/issues/38791) | Cron: isolated job delivery defaults to 'none' instead of 'announce' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38791.md) | complete | Apr 24, 2026, 04:17 UTC |
| [#38726](https://github.com/openclaw/openclaw/issues/38726) | Feature: Show model usage (incl. local models) in OpenClaw dashboard | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38726.md) | complete | Apr 24, 2026, 04:17 UTC |
| [#38766](https://github.com/openclaw/openclaw/pull/38766) | fix(ui): guard against undefined cron job payload in render loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38766.md) | complete | Apr 24, 2026, 04:16 UTC |
| [#38755](https://github.com/openclaw/openclaw/issues/38755) | cron.run false failure: tool timeout at 60s while gateway later returns success | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38755.md) | complete | Apr 24, 2026, 04:16 UTC |
| [#38790](https://github.com/openclaw/openclaw/pull/38790) | Browser: accept top-level act ref fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38790.md) | complete | Apr 24, 2026, 04:16 UTC |
| [#38780](https://github.com/openclaw/openclaw/pull/38780) | feat: context-pressure-aware continuation (CONTINUE_WORK / CONTINUE_DELEGATE) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38780.md) | complete | Apr 24, 2026, 04:16 UTC |
| [#38797](https://github.com/openclaw/openclaw/issues/38797) | [Feature]: Per-agent memory isolation for memory-lancedb plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38797.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38777](https://github.com/openclaw/openclaw/pull/38777) | feat(hooks): expose rate limit headers in llm_output hook | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38777.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38731](https://github.com/openclaw/openclaw/pull/38731) | Warn on high-frequency cron schedules (<30m) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38731.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38781](https://github.com/openclaw/openclaw/pull/38781) | adding system.run.prepare | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38781.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38778](https://github.com/openclaw/openclaw/issues/38778) | [Bug]: 飞书机器人@飞书机器人 场景下，被@的机器人不会回应 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38778.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38730](https://github.com/openclaw/openclaw/issues/38730) | Cron session accumulation can silently exhaust agent context window — no guardrails or warnings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38730.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38795](https://github.com/openclaw/openclaw/issues/38795) | Bug Report: imageModel 自动切换未生效 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38795.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38762](https://github.com/openclaw/openclaw/issues/38762) | browser act 的 ref 参数位置处理不一致，错误信息误导 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38762.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38729](https://github.com/openclaw/openclaw/pull/38729) | feat(thinking): register supportsXHighThinking for Anthropic provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38729.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38784](https://github.com/openclaw/openclaw/issues/38784) | [Bug]: Azure OpenAI models report 0 context tokens — supportsUsageInStreaming forcefully disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38784.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38764](https://github.com/openclaw/openclaw/pull/38764) | Formalize Agent-to-Agent Learning with Policy-Governed Knowledge Transfer | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38764.md) | complete | Apr 24, 2026, 04:15 UTC |
| [#38782](https://github.com/openclaw/openclaw/issues/38782) | Bug: /new and /reset startup greeting uses wrong time-of-day | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38782.md) | complete | Apr 24, 2026, 04:15 UTC |

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
