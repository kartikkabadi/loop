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

Last dashboard update: Apr 25, 2026, 18:36 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 18:36 UTC

State: Apply in progress

Starting apply run for up to 500 fresh all closes. Checkpoints commit every 50 fresh closes; close delay is 5000ms.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24937779720](https://github.com/openclaw/clawsweeper/actions/runs/24937779720)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5862 |
| Fresh reviewed issues in the last 7 days | 5745 |
| Proposed issue closes | 341 (5.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4467 |
| Fresh reviewed PRs in the last 7 days | 4346 |
| Proposed PR closes | 63 (1.4% of reviewed PRs) |
| Open items total | 10329 |
| Reviewed files | 10248 |
| Unreviewed open items | 81 |
| Archived closed files | 9002 |
| Fresh verified reviews in the last 7 days | 10091 |
| Proposed closes awaiting apply | 404 (4% of fresh reviews) |
| Closed by Codex apply | 7107 |
| Failed or stale reviews | 157 |
| Daily cadence coverage | 7014/7469 current (455 due, 93.9%) |
| Daily PR cadence | 4191/4398 current (207 due, 95.3%) |
| Daily new issue cadence (<30d) | 2823/3071 current (248 due, 91.9%) |
| Weekly older issue cadence | 2779/2779 current (0 due, 100%) |
| Due now by cadence | 536 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59973](https://github.com/openclaw/openclaw/issues/59973) | iMessage DM echo: corrupted prefix breaks text-based dedup (v2026.3.31+) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59973.md) | complete | Apr 25, 2026, 18:29 UTC |
| [#59735](https://github.com/openclaw/openclaw/issues/59735) | Docker: Automate base image digest updates and add stale image alerts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59735.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:27 UTC |
| [#59307](https://github.com/openclaw/openclaw/issues/59307) | Regression 2026.3.31: embedded agent calls read tool without path during heartbeat polls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59307.md) | failed | Apr 25, 2026, 18:26 UTC |
| [#59876](https://github.com/openclaw/openclaw/issues/59876) | [Feature]: Include retry/reset time in rate limit error messages | [close / skipped_invalid_decision](https://github.com/openclaw/clawsweeper/blob/main/items/59876.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:22 UTC |
| [#60000](https://github.com/openclaw/openclaw/issues/60000) | [Bug]: control-ui writes exec approval entries with unsupported `source` field, causing repeated INVALID_REQUEST errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60000.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:21 UTC |
| [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59909.md) | complete | Apr 25, 2026, 18:21 UTC |
| [#59753](https://github.com/openclaw/openclaw/issues/59753) | [Bug]: 飞书无限重连Feishu WebSocket reconnect loop never stops — gateway becomes unresponsive without manual restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59753.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59545](https://github.com/openclaw/openclaw/issues/59545) | [Bug]: macOS app General settings rewrites ~/.openclaw/openclaw.json without user changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59545.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59758](https://github.com/openclaw/openclaw/issues/59758) | Mattermost DM replies go to new Thread instead of main channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59758.md) | complete | Apr 25, 2026, 18:20 UTC |
| [#59881](https://github.com/openclaw/openclaw/issues/59881) | Plugin hook ctx.channelId returns provider name instead of actual channel ID | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59881.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59970](https://github.com/openclaw/openclaw/issues/59970) | Proposal: reply-first chat behavior, retrieval guardrails, and result-oriented sub-agent reporting | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59970.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59888](https://github.com/openclaw/openclaw/issues/59888) | [Bug]: WhatsApp web-auto-reply dispatches stale/cached reply to subsequent inbound message (5ms response, no LLM call) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59888.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#60083](https://github.com/openclaw/openclaw/issues/60083) | Cron startup catch-up fires duplicate when previous run was itself a late catch-up | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60083.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#60087](https://github.com/openclaw/openclaw/issues/60087) | [Bug]: Gateway killed on every `exec` tool invocation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60087.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59945](https://github.com/openclaw/openclaw/issues/59945) | Slack socket mode fails with \"reserved redaction sentinel\" error despite valid tokens — infinite restart loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59945.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59966](https://github.com/openclaw/openclaw/issues/59966) | Hardcoded 120s timeout in channel layer overrides configurable timeoutSeconds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59966.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:20 UTC |
| [#59728](https://github.com/openclaw/openclaw/issues/59728) | Scripts: Organize 150+ files in scripts/ directory by function with README index | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59728.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:19 UTC |
| [#59878](https://github.com/openclaw/openclaw/issues/59878) | Session lane stuck in 'running' after run dies — sessions.abort + gateway restart fail to clear stale state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59878.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:19 UTC |
| [#59868](https://github.com/openclaw/openclaw/issues/59868) | edit tool shows false positive error when oldText match fails after file was already fixed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59868.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:19 UTC |
| [#60034](https://github.com/openclaw/openclaw/issues/60034) | [Feature]: `session-memory` hook does not comply with AGENTS.md workspace directory convention | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60034.md) | stale_local_checkout_blocked | Apr 25, 2026, 18:19 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.5`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort medium --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort medium --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run reconcile -- --dry-run
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

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex API key environment variables. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
