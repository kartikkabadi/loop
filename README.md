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

Last dashboard update: Apr 24, 2026, 01:41 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19133 |
| Reviewed / proposed closes | 286 / 130 |
| Reviewed files | 286 |
| Fresh verified reviews in the last 7 days | 286 |
| Proposed closes awaiting apply | 130 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18847 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#10356](https://github.com/openclaw/openclaw/pull/10356) | TTS: add Typecast provider (emotion presets, audio tuning, Asian language voices) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10356.md) | complete | Apr 24, 2026, 01:41 UTC |
| [#10659](https://github.com/openclaw/openclaw/issues/10659) | Feature Request: Masked Secrets - Prevent Agent from Accessing Raw API Keys | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10659.md) | complete | Apr 24, 2026, 01:40 UTC |
| [#10485](https://github.com/openclaw/openclaw/issues/10485) | Feature: Strip markdown formatting before TTS conversion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10485.md) | complete | Apr 24, 2026, 01:39 UTC |
| [#10467](https://github.com/openclaw/openclaw/issues/10467) | [Feature Request]: Multi-lane concurrency support for sub-agents via sessions_spawn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10467.md) | complete | Apr 24, 2026, 01:39 UTC |
| [#10458](https://github.com/openclaw/openclaw/issues/10458) | Docs: README uses deprecated --to for openclaw message send (should be --target) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10458.md) | complete | Apr 24, 2026, 01:39 UTC |
| [#10687](https://github.com/openclaw/openclaw/issues/10687) | Models: fully dynamic model discovery (OpenRouter + beyond) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10687.md) | complete | Apr 24, 2026, 01:39 UTC |
| [#10502](https://github.com/openclaw/openclaw/issues/10502) | Feature Request: Add tool:call and tool:result Hook Events | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10502.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10419](https://github.com/openclaw/openclaw/issues/10419) | [Feature]: Integrate EU Inference: OVHcloud AI Endpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10419.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10448](https://github.com/openclaw/openclaw/issues/10448) | Feature request: HTTP webhook to trigger agent tasks directly | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10448.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10480](https://github.com/openclaw/openclaw/issues/10480) | Support Workers AI model selection during onboard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10480.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10050](https://github.com/openclaw/openclaw/issues/10050) | [Feature]: Implement \"Zero-Log\" Secure Secret Handoff to Prevent Telemetry Leakage | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10050.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10141](https://github.com/openclaw/openclaw/issues/10141) | Feature: Display current installed version in Web UI Dashboard | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10141.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10137](https://github.com/openclaw/openclaw/issues/10137) | api=openai-responses (Codex/Responses): gateway online but no replies; repeated 400 (no body) — request normalization / compat options | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10137.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10566](https://github.com/openclaw/openclaw/issues/10566) | Feature request: proportional humanDelay mode (based on message length) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10566.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10393](https://github.com/openclaw/openclaw/issues/10393) | [Feature Request] memory_search: support local file search without external API | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10393.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10161](https://github.com/openclaw/openclaw/issues/10161) | [Feature]: Integrate service-ability-creator for Automated AI Service Generation in Clawdbot | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10161.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10479](https://github.com/openclaw/openclaw/issues/10479) | [Feature]: Support compaction.customInstructions for auto-compaction | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10479.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10524](https://github.com/openclaw/openclaw/issues/10524) | Feature: Post-compaction system event injection for context continuity | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10524.md) | complete | Apr 24, 2026, 01:38 UTC |
| [#10547](https://github.com/openclaw/openclaw/issues/10547) | [Proposal] Anchor Memory Protocol (AMP): Intelligent Session Refactoring for Pseudo-Infinite Context | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/10547.md) | complete | Apr 24, 2026, 01:37 UTC |
| [#10253](https://github.com/openclaw/openclaw/issues/10253) | [Feature]: Configurable auto-cleanup and archival policy for webhook/hook sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10253.md) | complete | Apr 24, 2026, 01:37 UTC |

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
