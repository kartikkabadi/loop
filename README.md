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

Last dashboard update: Apr 24, 2026, 00:30 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19150 |
| Reviewed files | 53 |
| Fresh verified reviews in the last 7 days | 53 |
| Proposed closes awaiting apply | 22 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 19097 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#8920](https://github.com/openclaw/openclaw/issues/8920) | [Feature]: Better UI for configuration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8920.md) | complete | Apr 24, 2026, 00:20 UTC |
| [#7598](https://github.com/openclaw/openclaw/issues/7598) | [Feature]: Session History Backup Layer | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7598.md) | complete | Apr 24, 2026, 00:14 UTC |
| [#6711](https://github.com/openclaw/openclaw/issues/6711) | Feature request: gateway:shutdown and gateway:pre-restart hook events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6711.md) | complete | Apr 24, 2026, 00:14 UTC |
| [#6966](https://github.com/openclaw/openclaw/issues/6966) | Dynamic Model Switching Based on API Rate Limits | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/6966.md) | complete | Apr 24, 2026, 00:14 UTC |
| [#6842](https://github.com/openclaw/openclaw/issues/6842) | Feature Request: Add A2A (Agent-to-Agent) Protocol Support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6842.md) | complete | Apr 24, 2026, 00:13 UTC |
| [#6675](https://github.com/openclaw/openclaw/issues/6675) | [Security] Baseline hardening: headers, CI scanning, and local assets | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/6675.md) | complete | Apr 24, 2026, 00:13 UTC |
| [#7006](https://github.com/openclaw/openclaw/issues/7006) | [Feature]: Expose AI model used and usage cost when using openrouter/auto | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7006.md) | complete | Apr 24, 2026, 00:13 UTC |
| [#7312](https://github.com/openclaw/openclaw/issues/7312) | [Feature]: Support OpenTelemetry GenAI Auto-Instrumentation (OpenLLMetry / IITM) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7312.md) | complete | Apr 24, 2026, 00:13 UTC |
| [#8231](https://github.com/openclaw/openclaw/issues/8231) | [Feature]: terminal-based web search | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8231.md) | complete | Apr 24, 2026, 00:13 UTC |
| [#7722](https://github.com/openclaw/openclaw/issues/7722) | Feature Request: Filesystem Sandboxing Config (tools.fileAccess) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7722.md) | complete | Apr 24, 2026, 00:13 UTC |
| [#7017](https://github.com/openclaw/openclaw/issues/7017) | [Suggestion] Exploring Integration with AIClient-2-API to Reduce Token Costs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7017.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7260](https://github.com/openclaw/openclaw/issues/7260) | Improved compaction summarization with task preservation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7260.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7021](https://github.com/openclaw/openclaw/issues/7021) | [Feature]: integrate PowerMem as a Memory backend (semantic recall + long‑term memory) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7021.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7509](https://github.com/openclaw/openclaw/issues/7509) | [Feature]: Chromium Browser Extension | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7509.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7325](https://github.com/openclaw/openclaw/issues/7325) | [Feature]: Add Soniox speech-to-text provider (best for Slovenian) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7325.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7783](https://github.com/openclaw/openclaw/issues/7783) | Add observability ingestion pipeline for JSONL → SQLite | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7783.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7056](https://github.com/openclaw/openclaw/issues/7056) | [Feature]: I think the current Clawdbot architecture is flawed. A correct architecture should place the operational layer at the top, but only allow operations on things like Docker containers or virtual machines. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7056.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7420](https://github.com/openclaw/openclaw/issues/7420) | Feature Proposal: RLM-Style Query Delegation as Alternative to Compaction | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7420.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#7579](https://github.com/openclaw/openclaw/issues/7579) | [Feature]: Perplexity pplx‑api as a first‑class provider (Not Only Sonar) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7579.md) | complete | Apr 24, 2026, 00:12 UTC |
| [#6946](https://github.com/openclaw/openclaw/issues/6946) | Feature: Processing indicator message for Telegram (send ⌛️ while thinking, delete on reply) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/6946.md) | complete | Apr 24, 2026, 00:12 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that selects the next open items once, starting from `#1`, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The final job merges artifacts and updates this README so the dashboard reflects progress.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 2 --shard-count 10 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 2 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
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
