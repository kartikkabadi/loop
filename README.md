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

Last dashboard update: Apr 24, 2026, 01:17 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19144 |
| Reviewed / proposed closes | 136 / 68 |
| Reviewed files | 136 |
| Fresh verified reviews in the last 7 days | 136 |
| Proposed closes awaiting apply | 68 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 19008 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#8215](https://github.com/openclaw/openclaw/issues/8215) | Feature: Emit separate \"thinking\" stream in agent events for real-time reasoning visibility | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8215.md) | complete | Apr 24, 2026, 01:13 UTC |
| [#8192](https://github.com/openclaw/openclaw/issues/8192) | [Feature]: Workspace Files Editor in Control UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8192.md) | complete | Apr 24, 2026, 01:13 UTC |
| [#8190](https://github.com/openclaw/openclaw/issues/8190) | Feature: Global session reset on auth switch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8190.md) | complete | Apr 24, 2026, 01:13 UTC |
| [#8081](https://github.com/openclaw/openclaw/issues/8081) | Feature Request: Multi-user permission management with role-based access control | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8081.md) | complete | Apr 24, 2026, 01:13 UTC |
| [#8080](https://github.com/openclaw/openclaw/issues/8080) | Feature request: Image resize/maxBytes option for Read tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8080.md) | complete | Apr 24, 2026, 01:13 UTC |
| [#8176](https://github.com/openclaw/openclaw/issues/8176) | Allow before_agent_start hooks to override prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8176.md) | complete | Apr 24, 2026, 01:12 UTC |
| [#8061](https://github.com/openclaw/openclaw/issues/8061) | [Feature]: per-agent maxConcurrent in agents.list | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8061.md) | complete | Apr 24, 2026, 01:12 UTC |
| [#8106](https://github.com/openclaw/openclaw/issues/8106) | 🍛 [Feature]: Add Swiggy MCP Skill for Food Ordering (India) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8106.md) | complete | Apr 24, 2026, 01:12 UTC |
| [#8185](https://github.com/openclaw/openclaw/issues/8185) | [Feature]: Memory flush on /new and /reset (pre-reset memory save) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8185.md) | complete | Apr 24, 2026, 01:09 UTC |
| [#7951](https://github.com/openclaw/openclaw/issues/7951) | [Feature]: Integrating ApplePay / GooglePay | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7951.md) | complete | Apr 24, 2026, 01:09 UTC |
| [#8130](https://github.com/openclaw/openclaw/issues/8130) | Feature Request: Proactive user notification on LLM failover/API errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8130.md) | complete | Apr 24, 2026, 01:09 UTC |
| [#8089](https://github.com/openclaw/openclaw/issues/8089) | [Feature]: cache for ci/cd | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8089.md) | complete | Apr 24, 2026, 01:08 UTC |
| [#8231](https://github.com/openclaw/openclaw/issues/8231) | [Feature]: terminal-based web search | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8231.md) | complete | Apr 24, 2026, 01:08 UTC |
| [#8263](https://github.com/openclaw/openclaw/issues/8263) | Feature Request: Webchat User Display Name Customization | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8263.md) | complete | Apr 24, 2026, 01:08 UTC |
| [#7993](https://github.com/openclaw/openclaw/issues/7993) | [Feature]: Show gateway bundled skills in openclaw skills list | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7993.md) | complete | Apr 24, 2026, 01:08 UTC |
| [#7880](https://github.com/openclaw/openclaw/issues/7880) | Add Campfire channel integration (37signals self-hosted chat) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/7880.md) | complete | Apr 24, 2026, 01:08 UTC |
| [#8147](https://github.com/openclaw/openclaw/issues/8147) | [Feature]:   Add configurable send hotkey for WebChat (Cmd+Enter instead of Enter) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/8147.md) | complete | Apr 24, 2026, 01:07 UTC |
| [#7834](https://github.com/openclaw/openclaw/issues/7834) | Add thorough QA tests for observability ingestor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7834.md) | complete | Apr 24, 2026, 01:07 UTC |
| [#7959](https://github.com/openclaw/openclaw/issues/7959) | Feature: Identity file versioning / changelog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/7959.md) | complete | Apr 24, 2026, 01:07 UTC |
| [#8079](https://github.com/openclaw/openclaw/issues/8079) | [Feature Request] Add proxy configuration option for browser tool | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/8079.md) | complete | Apr 24, 2026, 01:07 UTC |

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
