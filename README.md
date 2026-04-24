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

Last dashboard update: Apr 24, 2026, 15:57 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12567 |
| Fresh reviewed issues in the last 7 days | 7313 |
| Proposed issue closes | 4091 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6621 |
| Fresh reviewed PRs in the last 7 days | 3855 |
| Proposed PR closes | 1240 (32.2% of reviewed PRs) |
| Open items total | 19188 |
| Reviewed files | 11168 |
| Archived closed files | 11 |
| Fresh verified reviews in the last 7 days | 11168 |
| Proposed closes awaiting apply | 5331 (47.7% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 8020 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#57135](https://github.com/openclaw/openclaw/pull/57135) | fix(config): show unrecognized property names in validation errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57135.md) | complete | Apr 24, 2026, 15:57 UTC |
| [#57145](https://github.com/openclaw/openclaw/issues/57145) | [Bug] Duplicate messages sent via delivery-mirror on QQBot channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57145.md) | complete | Apr 24, 2026, 15:56 UTC |
| [#57099](https://github.com/openclaw/openclaw/issues/57099) | [Bug]: Explicit api ollama provider config fails with No API provider registered after upgrade to 2026.3.28 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57099.md) | complete | Apr 24, 2026, 15:56 UTC |
| [#57105](https://github.com/openclaw/openclaw/issues/57105) | Host exec guard requires --confirm flags even when target CLI can’t accept them | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57105.md) | complete | Apr 24, 2026, 15:55 UTC |
| [#57152](https://github.com/openclaw/openclaw/issues/57152) | [Bug]: [3.28] image_generate tool result not displaying in webchat UI Body: | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57152.md) | complete | Apr 24, 2026, 15:55 UTC |
| [#57125](https://github.com/openclaw/openclaw/pull/57125) | fix(cron): add runtime type guard and exception handling in delivery dispatch | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57125.md) | complete | Apr 24, 2026, 15:55 UTC |
| [#57141](https://github.com/openclaw/openclaw/issues/57141) | [Bug]: Telegram DM topic ACP bind fails on next message with missing ACP metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57141.md) | complete | Apr 24, 2026, 15:55 UTC |
| [#57103](https://github.com/openclaw/openclaw/issues/57103) | [bug]: Under the Ollama native provider, the arguments of the tool call are incorrectly stringified when returned, leading to a gradual failure or confusion of parameters in multi-turn tool calling. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57103.md) | complete | Apr 24, 2026, 15:55 UTC |
| [#57076](https://github.com/openclaw/openclaw/pull/57076) | fix(heartbeat): respect heartbeat.model override — three-location fix | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57076.md) | complete | Apr 24, 2026, 15:55 UTC |
| [#57109](https://github.com/openclaw/openclaw/issues/57109) | WhatsApp: wasMentioned returns false when sender uses native @mention (LID not matched to selfLid) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57109.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57100](https://github.com/openclaw/openclaw/pull/57100) | fix(agents): prevent provider defaultModel from overriding agents.defaults.model (fixes #24170) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57100.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57112](https://github.com/openclaw/openclaw/issues/57112) | [Bug]: Cron payload model override ignored - LiveSessionModelSwitchError on 2026.3.28 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57112.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57117](https://github.com/openclaw/openclaw/issues/57117) | Gateway doctor auto-adds 'minimax' to plugins.allow (model provider treated as plugin) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57117.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57119](https://github.com/openclaw/openclaw/issues/57119) | Feature Request: Enforce skill execution sandbox when enabled: false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57119.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57140](https://github.com/openclaw/openclaw/pull/57140) | Fix OpenAI websocket transport provider normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57140.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57045](https://github.com/openclaw/openclaw/issues/57045) | [Bug] cron add CLI validation failed: job must be object | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57045.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57115](https://github.com/openclaw/openclaw/issues/57115) | Gateway startup hangs when previous process exists as zombie (PID alive but port not listening) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/57115.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57102](https://github.com/openclaw/openclaw/pull/57102) | ACPX: harden Windows queue-owner failure recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57102.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57116](https://github.com/openclaw/openclaw/pull/57116) | fix: skip discovery for providers not in openclaw.json | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57116.md) | complete | Apr 24, 2026, 15:54 UTC |
| [#57088](https://github.com/openclaw/openclaw/pull/57088) | fix(cron): add defensive prune before reading run log to prevent OOM | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57088.md) | complete | Apr 24, 2026, 15:53 UTC |

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
