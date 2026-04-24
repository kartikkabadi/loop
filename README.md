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

Last dashboard update: Apr 24, 2026, 01:54 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19133 |
| Reviewed / proposed closes | 386 / 172 |
| Reviewed files | 386 |
| Fresh verified reviews in the last 7 days | 386 |
| Proposed closes awaiting apply | 172 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18747 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#12377](https://github.com/openclaw/openclaw/issues/12377) | [Feature]:Provide a way to surface tool call details in channels | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/12377.md) | complete | Apr 24, 2026, 01:53 UTC |
| [#12505](https://github.com/openclaw/openclaw/issues/12505) | [Feature Request] Unified Built-in Sandbox with Multi-Platform Support and Tiered Presets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12505.md) | complete | Apr 24, 2026, 01:52 UTC |
| [#12385](https://github.com/openclaw/openclaw/issues/12385) | [Feature]: Security - Context-Based Runtime Security Policy (Shield.md) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/12385.md) | complete | Apr 24, 2026, 01:52 UTC |
| [#12436](https://github.com/openclaw/openclaw/issues/12436) | docs: Document undocumented hooks (before_agent_start, message_received, etc.) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/12436.md) | complete | Apr 24, 2026, 01:52 UTC |
| [#12429](https://github.com/openclaw/openclaw/issues/12429) | [Feature]: Add a secure way to pair dynamically autoscaled worked nodes in K8s | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12429.md) | complete | Apr 24, 2026, 01:52 UTC |
| [#12441](https://github.com/openclaw/openclaw/issues/12441) | [Feature] Control UI should accept gateway token from Authorization header | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12441.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#12299](https://github.com/openclaw/openclaw/issues/12299) | No programmatic access to cumulative token usage or cost data per session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/12299.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#11946](https://github.com/openclaw/openclaw/issues/11946) | Post-Conversation Hook for Automated Knowledge Extraction | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/11946.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#12198](https://github.com/openclaw/openclaw/issues/12198) | [Feature]: Markdown validation for prompt files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12198.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#12219](https://github.com/openclaw/openclaw/issues/12219) | [Feature]: Skill Permission Manifest Standard (skill.yaml) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12219.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#12215](https://github.com/openclaw/openclaw/issues/12215) | [Feature]: Add a \"Model Ping\" or \"Health Check\" feature for all models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12215.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#12297](https://github.com/openclaw/openclaw/issues/12297) | Feature Request: sessions_kill and sessions_cleanup tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12297.md) | complete | Apr 24, 2026, 01:51 UTC |
| [#12252](https://github.com/openclaw/openclaw/issues/12252) | [Feature]: Feature request: we might need a better interaction way from http/https website？ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12252.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#11955](https://github.com/openclaw/openclaw/issues/11955) | [Feature]: Memory/Context Improvements (metrics + global semantic search + conversation chaining + preload on restart) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/11955.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#12163](https://github.com/openclaw/openclaw/issues/12163) | Feature Request: Add speed parameter support for OpenAI TTS | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12163.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#12129](https://github.com/openclaw/openclaw/issues/12129) | Feature request: outbound text transform hook for channel plugins | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/12129.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#12047](https://github.com/openclaw/openclaw/issues/12047) | Feature Request: Extract text from document attachments in Telegram channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12047.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#12394](https://github.com/openclaw/openclaw/issues/12394) | [Feature]: Per-user heartbeat routing for channel-level heartbeat messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12394.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#12208](https://github.com/openclaw/openclaw/issues/12208) | All .large bubbles should have scrollable body regardless of truncation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12208.md) | complete | Apr 24, 2026, 01:50 UTC |
| [#12412](https://github.com/openclaw/openclaw/issues/12412) | Proposal: Native Token Optimization Dashboard & Pre-configured Optimization Tiers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12412.md) | complete | Apr 24, 2026, 01:50 UTC |

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
