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

Last dashboard update: Apr 24, 2026, 02:51 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19132 |
| Reviewed / proposed closes | 886 / 396 |
| Reviewed files | 886 |
| Fresh verified reviews in the last 7 days | 886 |
| Proposed closes awaiting apply | 396 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18246 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#28230](https://github.com/openclaw/openclaw/issues/28230) | [Feature]: 1006：no reason | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28230.md) | complete | Apr 24, 2026, 02:50 UTC |
| [#28753](https://github.com/openclaw/openclaw/issues/28753) | [Feature]: Route approval prompts to the originating channel (Discord/Telegram/Slack) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28753.md) | complete | Apr 24, 2026, 02:50 UTC |
| [#28222](https://github.com/openclaw/openclaw/issues/28222) | [Bug]: Built-in diagnostics-otel plugin doesn't work | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28222.md) | complete | Apr 24, 2026, 02:50 UTC |
| [#28847](https://github.com/openclaw/openclaw/issues/28847) | Provider key pools + bucket-aware cooldown/backoff on 429 (Gemini projects) to prevent retry storms | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/28847.md) | complete | Apr 24, 2026, 02:50 UTC |
| [#28797](https://github.com/openclaw/openclaw/issues/28797) | [Feature]: Tool lifecycle hooks (tool.start/tool.end/tool.progress) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28797.md) | complete | Apr 24, 2026, 02:50 UTC |
| [#28965](https://github.com/openclaw/openclaw/issues/28965) | [Proposal] Simplify Model Configuration: Single-Source Reconcile + Session Override Reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/28965.md) | complete | Apr 24, 2026, 02:50 UTC |
| [#28580](https://github.com/openclaw/openclaw/issues/28580) | [Feature]: [Channel Plugin] NapCat (OneBot v11) — China's leading QQ bot backend | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28580.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#29012](https://github.com/openclaw/openclaw/issues/29012) | [Feature Request] Per-agent or per-channel slash command configuration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/29012.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#29054](https://github.com/openclaw/openclaw/issues/29054) | [Feature]: Add drag-and-drop image upload to chat composer | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/29054.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#27137](https://github.com/openclaw/openclaw/issues/27137) | [Feature]: RFC: Unified ingress authorization gate to address recurring per-channel auth drift | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/27137.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#28281](https://github.com/openclaw/openclaw/pull/28281) | fix: override basic-ftp and fast-xml-parser to fix security vulnerabilities | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28281.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#29053](https://github.com/openclaw/openclaw/issues/29053) | [Feature Request] MCP Client: Native support for connecting to external MCP servers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/29053.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#28166](https://github.com/openclaw/openclaw/pull/28166) | Diagnostics: dedupe OTEL trace context + log transport fixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/28166.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#28913](https://github.com/openclaw/openclaw/issues/28913) | [Feature]: Source-based filtering for autoCapture | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/28913.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#29014](https://github.com/openclaw/openclaw/issues/29014) | [Feature]: [Feature Request] Smart, reliable fallback + auto-retry for overloaded errors (Anthropic 529, “The AI service is temporarily overloaded”, 503/502/504, api_error, etc.) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/29014.md) | complete | Apr 24, 2026, 02:49 UTC |
| [#27848](https://github.com/openclaw/openclaw/issues/27848) | [Feature]: Scheduled Agent Memory Indexing for RAG-Optimized Context Retrieval | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/27848.md) | complete | Apr 24, 2026, 02:48 UTC |
| [#28183](https://github.com/openclaw/openclaw/pull/28183) | feat: add Avian as a named LLM provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/28183.md) | complete | Apr 24, 2026, 02:48 UTC |
| [#28814](https://github.com/openclaw/openclaw/issues/28814) | [Feature]: Default Cron Job Staggering to Avoid Rate Limits at :00 hourly time | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/28814.md) | complete | Apr 24, 2026, 02:48 UTC |
| [#27574](https://github.com/openclaw/openclaw/issues/27574) | [Feature]: Browser Preview Panel in Dashboard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/27574.md) | complete | Apr 24, 2026, 02:48 UTC |
| [#27925](https://github.com/openclaw/openclaw/issues/27925) | [Feature]: Context Tier Slash Commands | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/27925.md) | complete | Apr 24, 2026, 02:48 UTC |

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
npm run plan -- --batch-size 5 --shard-count 20 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
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
