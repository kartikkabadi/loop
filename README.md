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

Last dashboard update: Apr 24, 2026, 14:08 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12568 |
| Fresh reviewed issues in the last 7 days | 6396 |
| Proposed issue closes | 3584 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6617 |
| Fresh reviewed PRs in the last 7 days | 3383 |
| Proposed PR closes | 1114 (32.9% of reviewed PRs) |
| Open items total | 19185 |
| Reviewed files | 9779 |
| Fresh verified reviews in the last 7 days | 9779 |
| Proposed closes awaiting apply | 4698 (48% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 9406 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#54581](https://github.com/openclaw/openclaw/issues/54581) | [Bug]: openrouter/free writes openrouter/auto into json | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54581.md) | complete | Apr 24, 2026, 14:07 UTC |
| [#54587](https://github.com/openclaw/openclaw/issues/54587) | Feature request: dangerouslyAllowUnsandboxedSubagentSpawn escape hatch for cross-sandbox agent orchestration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54587.md) | complete | Apr 24, 2026, 14:07 UTC |
| [#54615](https://github.com/openclaw/openclaw/issues/54615) | [Bug]: OpenAI Codex OAuth returning 429 since March 16 — account-level block? | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54615.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54634](https://github.com/openclaw/openclaw/issues/54634) | Update 2026.3.24 silently drops config when HOME changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54634.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54607](https://github.com/openclaw/openclaw/issues/54607) | [Feature]: Clarify BlueBubbles channel disablement vs plugin disablement, and document a safe local loopback-only runtime example | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54607.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54613](https://github.com/openclaw/openclaw/issues/54613) | [WhatsApp] Group messages not received despite correct configuration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54613.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54608](https://github.com/openclaw/openclaw/pull/54608) | fix: config path for xAI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54608.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54599](https://github.com/openclaw/openclaw/issues/54599) | [Bug]: maybeBootstrapChannelPlugin destructively replaces plugin registry, dropping autoStart:false channels | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54599.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54601](https://github.com/openclaw/openclaw/issues/54601) | Feature Request: Live context snapshot injection for isolated cron/subagent sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54601.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54589](https://github.com/openclaw/openclaw/pull/54589) | fix(logger): re-create file logger after midnight to use correct dated log file | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54589.md) | complete | Apr 24, 2026, 14:06 UTC |
| [#54515](https://github.com/openclaw/openclaw/issues/54515) | Published package openclaw@2026.3.23-2 contains bundled metadata/extensions still marked 2026.3.14 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54515.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54571](https://github.com/openclaw/openclaw/issues/54571) | [Feature]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54571.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54620](https://github.com/openclaw/openclaw/issues/54620) | [Bug]: Message duplication occurs in Feishu channel when conversation history grows lon | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54620.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54593](https://github.com/openclaw/openclaw/pull/54593) | Fix getSubagentDepth for legacy subagent session keys (AI-assisted) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54593.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54623](https://github.com/openclaw/openclaw/issues/54623) | [Bug]: Workspace bootstrap files silently truncated at 20,000 chars — agent receives incomplete context with no warning | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54623.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54585](https://github.com/openclaw/openclaw/pull/54585) | Agents: add compaction modes (warn, error, none) with proactive conte… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54585.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54535](https://github.com/openclaw/openclaw/issues/54535) | [Bug] openclaw browser CLI crashes Chrome 146 via Playwright connectOverCDP (EXC_BREAKPOINT/SIGTRAP) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54535.md) | complete | Apr 24, 2026, 14:05 UTC |
| [#54621](https://github.com/openclaw/openclaw/pull/54621) | fix(xai): honor plugin webSearch apiKey for grok web_search (AI-assisted) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54621.md) | complete | Apr 24, 2026, 14:04 UTC |
| [#54600](https://github.com/openclaw/openclaw/pull/54600) | fix: extract message string from cron agentTurn payload (#54579) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54600.md) | complete | Apr 24, 2026, 14:04 UTC |
| [#54541](https://github.com/openclaw/openclaw/issues/54541) | [Bug]: 🚨 [SECURITY] Malicious Skill: noreplyboter/polymarket-all-in-one - Reverse Shell Backdoor (ClawHavoc Campaign) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54541.md) | complete | Apr 24, 2026, 14:04 UTC |

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
