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

Last dashboard update: Apr 24, 2026, 01:29 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19135 |
| Reviewed / proposed closes | 186 / 85 |
| Reviewed files | 186 |
| Fresh verified reviews in the last 7 days | 186 |
| Proposed closes awaiting apply | 85 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18949 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#8843](https://github.com/openclaw/openclaw/issues/8843) | Feature: Expose Telegram file_id for audio/document attachments (enable download) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8843.md) | complete | Apr 24, 2026, 01:29 UTC |
| [#8892](https://github.com/openclaw/openclaw/issues/8892) | Feature: --agent flag for TUI to select which agent handles the session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8892.md) | complete | Apr 24, 2026, 01:28 UTC |
| [#8913](https://github.com/openclaw/openclaw/issues/8913) | [Feature] Configurable thinking/reasoning block format per channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8913.md) | complete | Apr 24, 2026, 01:28 UTC |
| [#8945](https://github.com/openclaw/openclaw/issues/8945) | Feature Request: Per-Channel Model Defaults | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8945.md) | complete | Apr 24, 2026, 01:28 UTC |
| [#8719](https://github.com/openclaw/openclaw/issues/8719) | [Feature] OpenClaw Security Profile v1.1 (Data-centric, secure-by-default) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8719.md) | complete | Apr 24, 2026, 01:27 UTC |
| [#8895](https://github.com/openclaw/openclaw/issues/8895) | RFC: Batch state primitives for orchestration layer | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8895.md) | complete | Apr 24, 2026, 01:27 UTC |
| [#8901](https://github.com/openclaw/openclaw/issues/8901) | Feature: Separate tool event streaming from channel verbose mode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8901.md) | complete | Apr 24, 2026, 01:27 UTC |
| [#8781](https://github.com/openclaw/openclaw/issues/8781) | Atlas support: use ChatGPT UI for browser-scoped tasks to reduce API usage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8781.md) | complete | Apr 24, 2026, 01:27 UTC |
| [#8959](https://github.com/openclaw/openclaw/issues/8959) | Feature: Cross-platform multi-select component in message tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8959.md) | complete | Apr 24, 2026, 01:27 UTC |
| [#8865](https://github.com/openclaw/openclaw/issues/8865) | Feature Request: TUI Light Theme / Color Customization Support | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8865.md) | complete | Apr 24, 2026, 01:27 UTC |
| [#8754](https://github.com/openclaw/openclaw/issues/8754) | [Feature]: Agent has no idea of what the gateway dashboard is | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8754.md) | complete | Apr 24, 2026, 01:26 UTC |
| [#8886](https://github.com/openclaw/openclaw/issues/8886) | [Feature]: WhatsApp documents (PDF) not downloaded - mediaPath is null | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8886.md) | complete | Apr 24, 2026, 01:26 UTC |
| [#8801](https://github.com/openclaw/openclaw/issues/8801) | feat: Add on_gateway_ready hook to run tasks immediately after gateway starts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8801.md) | complete | Apr 24, 2026, 01:26 UTC |
| [#8761](https://github.com/openclaw/openclaw/issues/8761) | Feature: Allow MEDIA: directive with absolute paths (opt-in) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8761.md) | complete | Apr 24, 2026, 01:26 UTC |
| [#8495](https://github.com/openclaw/openclaw/issues/8495) | Feature: Auto-leave WhatsApp groups not in allowlist + group-join webhook | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8495.md) | complete | Apr 24, 2026, 01:25 UTC |
| [#8722](https://github.com/openclaw/openclaw/issues/8722) | [Feature Request] Feishu plugin: Add typing indicator via message reactions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8722.md) | complete | Apr 24, 2026, 01:25 UTC |
| [#8962](https://github.com/openclaw/openclaw/issues/8962) | Feature Request: Custom CSS/Theme Support for Webchat Interface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8962.md) | complete | Apr 24, 2026, 01:25 UTC |
| [#8724](https://github.com/openclaw/openclaw/issues/8724) | Feature: Add per-model generation timeout config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8724.md) | complete | Apr 24, 2026, 01:25 UTC |
| [#8758](https://github.com/openclaw/openclaw/issues/8758) | Feature request: Send stickers in Telegram | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8758.md) | complete | Apr 24, 2026, 01:25 UTC |
| [#8615](https://github.com/openclaw/openclaw/issues/8615) | [Feature]: Native multi-API-key support for OpenRouter provider with load balancing and fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8615.md) | complete | Apr 24, 2026, 01:25 UTC |

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
