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

Last dashboard update: Apr 24, 2026, 16:28 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12548 |
| Fresh reviewed issues in the last 7 days | 7577 |
| Proposed issue closes | 4239 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6622 |
| Fresh reviewed PRs in the last 7 days | 3981 |
| Proposed PR closes | 1270 (31.9% of reviewed PRs) |
| Open items total | 19170 |
| Reviewed files | 11558 |
| Archived closed files | 21 |
| Fresh verified reviews in the last 7 days | 11558 |
| Proposed closes awaiting apply | 5509 (47.7% of fresh reviews) |
| Closed by Codex apply | 10 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 7612 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#57901](https://github.com/openclaw/openclaw/issues/57901) | Safeguard compaction ignores compaction.model config — uses session model instead | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57901.md) | complete | Apr 24, 2026, 16:28 UTC |
| [#57908](https://github.com/openclaw/openclaw/issues/57908) | [Feature]: Allow prompt-level selection of LLM service provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57908.md) | complete | Apr 24, 2026, 16:27 UTC |
| [#57849](https://github.com/openclaw/openclaw/pull/57849) | fix(hooks): preserve provenance field in plugin hook event messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57849.md) | complete | Apr 24, 2026, 16:27 UTC |
| [#57900](https://github.com/openclaw/openclaw/issues/57900) | Subagent runs don't use model fallback chain on 429/rate-limit errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57900.md) | complete | Apr 24, 2026, 16:26 UTC |
| [#57867](https://github.com/openclaw/openclaw/issues/57867) | [Bug] Isolated cron sessions still cannot deliver to Telegram on v2026.3.28 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57867.md) | complete | Apr 24, 2026, 16:26 UTC |
| [#57917](https://github.com/openclaw/openclaw/issues/57917) | Control UI model switch misparses aliases like gpt-5.4 as anthropic/* | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57917.md) | complete | Apr 24, 2026, 16:26 UTC |
| [#57821](https://github.com/openclaw/openclaw/issues/57821) | [Bug]: Cannot read properties of undefined (reading 'push') with third-party Anthropic-compatible provider returning non-standard content blocks | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57821.md) | complete | Apr 24, 2026, 16:26 UTC |
| [#57872](https://github.com/openclaw/openclaw/issues/57872) | TypeError: Cannot read properties of undefined (reading 'padEnd') in cron table formatter | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57872.md) | complete | Apr 24, 2026, 16:25 UTC |
| [#57918](https://github.com/openclaw/openclaw/issues/57918) | [Bug]: Announce delivery constructs malformed recipient \"group:<chatId>\" for Telegram forum topic sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57918.md) | complete | Apr 24, 2026, 16:25 UTC |
| [#57925](https://github.com/openclaw/openclaw/issues/57925) | v2026.3.28: Discord extension silently skipped during gateway startup — zero channels load despite valid config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57925.md) | complete | Apr 24, 2026, 16:25 UTC |
| [#57906](https://github.com/openclaw/openclaw/issues/57906) | Model fallback retries primary too aggressively before moving to next fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57906.md) | complete | Apr 24, 2026, 16:25 UTC |
| [#57880](https://github.com/openclaw/openclaw/issues/57880) | Retry loop duplicates user message hundreds of times in context window on rate limit | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57880.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57753](https://github.com/openclaw/openclaw/issues/57753) | [Bug]: anthropic-messages SSE state machine fails to reset between tool-use loop iterations — \"Unexpected event order, got message_start before receiving message_stop\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57753.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57897](https://github.com/openclaw/openclaw/pull/57897) | fix(cron): guard against undefined values in cron table formatter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57897.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57853](https://github.com/openclaw/openclaw/pull/57853) | fix: handle message_start before message_stop from provider (closes #57654) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57853.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57820](https://github.com/openclaw/openclaw/pull/57820) | test(extensions): add unit tests for speech-core, image-generation-core, and media-understanding-core | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57820.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57916](https://github.com/openclaw/openclaw/issues/57916) | Subagent announce: swap dispatch order to queue-first when parent session is busy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57916.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57889](https://github.com/openclaw/openclaw/pull/57889) | fix(gateway): preserve operator scopes for token-authenticated non-local clients | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57889.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57864](https://github.com/openclaw/openclaw/issues/57864) | Discord thread inbound worker blocks for 1800s on attachment (mp4) message | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57864.md) | complete | Apr 24, 2026, 16:24 UTC |
| [#57826](https://github.com/openclaw/openclaw/issues/57826) | [Bug]: [Regression 2026.3.28] AI agent systematically omits required tool parameters | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57826.md) | complete | Apr 24, 2026, 16:24 UTC |

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
