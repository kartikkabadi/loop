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

Last dashboard update: Apr 24, 2026, 17:30 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12517 |
| Fresh reviewed issues in the last 7 days | 8096 |
| Proposed issue closes | 4527 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6612 |
| Fresh reviewed PRs in the last 7 days | 4231 |
| Proposed PR closes | 1328 (31.4% of reviewed PRs) |
| Open items total | 19129 |
| Reviewed files | 12327 |
| Archived closed files | 52 |
| Fresh verified reviews in the last 7 days | 12327 |
| Proposed closes awaiting apply | 5855 (47.5% of fresh reviews) |
| Closed by Codex apply | 40 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 6802 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59451](https://github.com/openclaw/openclaw/issues/59451) | [Feature]: Add file-based fallback search when `node:sqlite` is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59451.md) | complete | Apr 24, 2026, 17:30 UTC |
| [#59427](https://github.com/openclaw/openclaw/issues/59427) | Baseline Context Load: 40K tokens per message regardless of reply length | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59427.md) | complete | Apr 24, 2026, 17:29 UTC |
| [#59413](https://github.com/openclaw/openclaw/issues/59413) | Feature Request: Per-candidate retry count for model fallback (support pool-based/proxy providers) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59413.md) | complete | Apr 24, 2026, 17:29 UTC |
| [#59430](https://github.com/openclaw/openclaw/issues/59430) | [Bug]: Image Tool Fails | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59430.md) | complete | Apr 24, 2026, 17:28 UTC |
| [#59460](https://github.com/openclaw/openclaw/issues/59460) | [Feature]: Graduated `tools.sessions.visibility` - add `self-sessions` level | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59460.md) | complete | Apr 24, 2026, 17:28 UTC |
| [#59477](https://github.com/openclaw/openclaw/pull/59477) | fix(sessions_send): allow cross-agent messaging for sandboxed agents with a2a enabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59477.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59447](https://github.com/openclaw/openclaw/pull/59447) | fix(embedded-runner): return friendly error for session JSON parse failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59447.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59470](https://github.com/openclaw/openclaw/issues/59470) | Bug: openclaw gateway call times out for plugin gateway methods even when the method executes successfully | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59470.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59449](https://github.com/openclaw/openclaw/issues/59449) | [Bug]: `openclaw cron <subcommand> --help` always shows parent command help instead of subcommand help | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59449.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59386](https://github.com/openclaw/openclaw/pull/59386) | iMessage: harden echo detection against control-char prefixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59386.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59443](https://github.com/openclaw/openclaw/pull/59443) | fix(fetch-guard): skip DNS pre-flight in trusted-env-proxy mode when proxy is configured | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59443.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59422](https://github.com/openclaw/openclaw/pull/59422) | feat(feishu): add ignoreAtAll configuration option | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59422.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59361](https://github.com/openclaw/openclaw/issues/59361) | [Bug]: openclaw agent exits 0 with no output on v2026.3.31; lobster CLI unregistered as command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59361.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59456](https://github.com/openclaw/openclaw/issues/59456) | [Docs/UX]:  help text is misleading — says \"cron expressions\" only, but should also apply to  datetime strings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59456.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59346](https://github.com/openclaw/openclaw/issues/59346) | Telemetry endpoint us.i.posthog.com returns 404 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59346.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59405](https://github.com/openclaw/openclaw/issues/59405) | [Bug]: Telegram channel runtime drops exec/grep tool output for openai/gpt-5.1-codex | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59405.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59416](https://github.com/openclaw/openclaw/issues/59416) | [Bug]: Thinking level displayed inconsistently almost everywhere; XHIGH support for models should be enhanced. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59416.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59426](https://github.com/openclaw/openclaw/issues/59426) | [Feature]: OpenClaw as MCP Server (Expose Execution & Orchestration) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/59426.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59472](https://github.com/openclaw/openclaw/pull/59472) | Keep channels list JSON output when usage loading fails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59472.md) | complete | Apr 24, 2026, 17:27 UTC |
| [#59414](https://github.com/openclaw/openclaw/pull/59414) | feat(doctor): add Node.js runtime info health contribution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59414.md) | complete | Apr 24, 2026, 17:27 UTC |

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
