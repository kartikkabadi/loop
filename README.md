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

Last dashboard update: Apr 24, 2026, 12:12 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12550 |
| Fresh reviewed issues in the last 7 days | 5337 |
| Proposed issue closes | 2965 (55.6% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6604 |
| Fresh reviewed PRs in the last 7 days | 2842 |
| Proposed PR closes | 948 (33.4% of reviewed PRs) |
| Open items total | 19154 |
| Reviewed files | 8179 |
| Fresh verified reviews in the last 7 days | 8179 |
| Proposed closes awaiting apply | 3913 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 10975 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51556](https://github.com/openclaw/openclaw/pull/51556) | fix(pairing): propagate non-ENOENT errors in sync allowlist reader | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51556.md) | complete | Apr 24, 2026, 12:11 UTC |
| [#51523](https://github.com/openclaw/openclaw/pull/51523) | feat(matrix): add subagent hooks for ACP room-binding | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51523.md) | complete | Apr 24, 2026, 12:11 UTC |
| [#51513](https://github.com/openclaw/openclaw/pull/51513) | docs(channels): add connection architecture overview and transport notes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51513.md) | complete | Apr 24, 2026, 12:11 UTC |
| [#51570](https://github.com/openclaw/openclaw/pull/51570) | Add OpenClaw User-Agent header to all outbound HTTP requests | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51570.md) | complete | Apr 24, 2026, 12:11 UTC |
| [#51533](https://github.com/openclaw/openclaw/issues/51533) | [Bug]: onboard wizard stores env var reference as apiKey; breaks channels that don't resolve it | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51533.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51452](https://github.com/openclaw/openclaw/issues/51452) | [Bug] Persistent HTTP 401 with Valid Aliyun ModelStudio Key (Direct API Calls Work, CLI Fails) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51452.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51551](https://github.com/openclaw/openclaw/issues/51551) | Bug: Context Window shows unknown/0 despite extensive conversation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51551.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51483](https://github.com/openclaw/openclaw/issues/51483) | Feature: Support local vision model preprocessing for inbound images | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51483.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51549](https://github.com/openclaw/openclaw/issues/51549) | [Bug]: WebChat loses message queue, conversation history, and draft on browser refresh | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51549.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51511](https://github.com/openclaw/openclaw/issues/51511) | [Bug]: Bug Report: Cursor Support Assistant Hijacks Custom Agent Session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51511.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51516](https://github.com/openclaw/openclaw/issues/51516) | [Bug]: openclaw devices/* and gateway RPC fail locally with pairing/operator scope mismatch on healthy loopback gateway (2026.3.13) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51516.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51547](https://github.com/openclaw/openclaw/pull/51547) | fix(exec): default to GBK encoding on Windows (#50519) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51547.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51572](https://github.com/openclaw/openclaw/issues/51572) | Feature: fire session-memory hook on session reset/prune, not just compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51572.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51565](https://github.com/openclaw/openclaw/pull/51565) | whatsapp: Allow different ack emoji for different agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51565.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51518](https://github.com/openclaw/openclaw/issues/51518) | [Feature] Allow subagent.run in agent_end hook (async spawn without request context) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51518.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51521](https://github.com/openclaw/openclaw/issues/51521) | Feature Request: Support custom reasoning language / 中文推理语言支持 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51521.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51461](https://github.com/openclaw/openclaw/issues/51461) | Feishu DM stop/停止 does not preempt active run; abort appears delayed until dispatch completes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51461.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51498](https://github.com/openclaw/openclaw/issues/51498) | [Bug]: openclaw cron list/status and openclaw health --json timeout against local gateway while scheduler still appears to run jobs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51498.md) | complete | Apr 24, 2026, 12:10 UTC |
| [#51584](https://github.com/openclaw/openclaw/pull/51584) | fix(sandbox): fall back to static channel registry for sandbox explain channel resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51584.md) | complete | Apr 24, 2026, 12:09 UTC |
| [#51545](https://github.com/openclaw/openclaw/issues/51545) | Bug: Sub-agent model override not working in 2026.3.13 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/51545.md) | complete | Apr 24, 2026, 12:09 UTC |

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
