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

Last dashboard update: Apr 24, 2026, 02:17 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19132 |
| Reviewed / proposed closes | 586 / 263 |
| Reviewed files | 586 |
| Fresh verified reviews in the last 7 days | 586 |
| Proposed closes awaiting apply | 263 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18546 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#15098](https://github.com/openclaw/openclaw/issues/15098) | Feature Request: Custom user avatar in webchat UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/15098.md) | complete | Apr 24, 2026, 02:17 UTC |
| [#14804](https://github.com/openclaw/openclaw/issues/14804) | Enhancement: Add ephemeral file system support for isolated sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14804.md) | complete | Apr 24, 2026, 02:16 UTC |
| [#14850](https://github.com/openclaw/openclaw/issues/14850) | [Feature]: Session key override on bindings (cross-channel session unification) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14850.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#15066](https://github.com/openclaw/openclaw/issues/15066) | [Feature]:  Pre hook for messages in whatsapp | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/15066.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#14785](https://github.com/openclaw/openclaw/issues/14785) | Reduce tool schema token overhead (~3,500 tok/session) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14785.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#14779](https://github.com/openclaw/openclaw/issues/14779) | Feature: Add plugin hooks for token cost management | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14779.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#14812](https://github.com/openclaw/openclaw/issues/14812) | Feature Request: Per-tool enable/disable config (tools.entries.<name>.enabled) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14812.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#15048](https://github.com/openclaw/openclaw/issues/15048) | [Feature Request] Add retention policy for isolated cron sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/15048.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#15022](https://github.com/openclaw/openclaw/issues/15022) | Feature request: Coalesce interleaved text blocks into single outbound message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/15022.md) | complete | Apr 24, 2026, 02:15 UTC |
| [#14916](https://github.com/openclaw/openclaw/issues/14916) | Feature: summarize images on ingest to reduce context usage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14916.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14861](https://github.com/openclaw/openclaw/issues/14861) | Gateway boot: no observability for subsystem startup failures (gmail-watcher, hooks) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14861.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14874](https://github.com/openclaw/openclaw/issues/14874) | [Feature]: Proposal: optional SIE verification in skill loader (warn/strict modes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14874.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#15014](https://github.com/openclaw/openclaw/issues/15014) | [Feature]: Update Copilot provider model list to add claude-opus-4-6-fast, gpt-5.3-codex, and modernize default models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/15014.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14803](https://github.com/openclaw/openclaw/issues/14803) | Add browser.args config field for custom Chrome launch flags | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14803.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14431](https://github.com/openclaw/openclaw/issues/14431) | [Feature]: Feishu inbound dedup cache lost on SIGUSR1 restart, causing duplicate message processing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14431.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14921](https://github.com/openclaw/openclaw/issues/14921) | [Feature]: Auto-Report Subagent Costs to Parent Session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14921.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14965](https://github.com/openclaw/openclaw/issues/14965) | [Feature]: Formatting agent reply | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14965.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14438](https://github.com/openclaw/openclaw/issues/14438) | [Feature]: Plugin hot-reload without container restart (jiti cache invalidation) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/14438.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#14735](https://github.com/openclaw/openclaw/issues/14735) | feat: implement message:sent hook event for outbound message post-processing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/14735.md) | complete | Apr 24, 2026, 02:14 UTC |
| [#15027](https://github.com/openclaw/openclaw/issues/15027) | [Docs]: Conflicting installation guidance for Windows — Getting Started recommends PowerShell IRM, Install page recommends WSL2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/15027.md) | complete | Apr 24, 2026, 02:14 UTC |

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
