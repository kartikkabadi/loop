# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 26, 2026, 01:00 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 01:01 UTC

State: Apply throttled

Checkpoint 3. GitHub throttled while applying close decisions. Progress: 0/2 fresh closes, 2/40 processed records in this apply chunk. Last throttled command: `gh api repos/openclaw/openclaw/issues/1210`. Retry 2/11 in 60s.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24944438478](https://github.com/openclaw/clawsweeper/actions/runs/24944438478)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5409 |
| Fresh reviewed issues in the last 7 days | 5363 |
| Proposed issue closes | 813 (15.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4251 |
| Fresh reviewed PRs in the last 7 days | 4156 |
| Proposed PR closes | 50 (1.2% of reviewed PRs) |
| Open items total | 9660 |
| Reviewed files | 9523 |
| Unreviewed open items | 137 |
| Archived closed files | 9774 |
| Fresh verified reviews in the last 7 days | 9519 |
| Proposed closes awaiting apply | 863 (9.1% of fresh reviews) |
| Closed by Codex apply | 7573 |
| Failed or stale reviews | 4 |
| Hourly cadence coverage | 23/1074 current (1051 due, 2.1%) |
| Hourly hot item cadence (<7d) | 23/1074 current (1051 due, 2.1%) |
| Daily cadence coverage | 5335/5764 current (429 due, 92.6%) |
| Daily PR cadence | 3463/3669 current (206 due, 94.4%) |
| Daily new issue cadence (<30d) | 1872/2095 current (223 due, 89.4%) |
| Weekly older issue cadence | 2684/2685 current (1 due, 100%) |
| Due now by cadence | 1618 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63087](https://github.com/openclaw/openclaw/issues/63087) | [Bug] Memory index command ignores proxy environment variables | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63087.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63060](https://github.com/openclaw/openclaw/issues/63060) | [Bug] 2026.4.5 regression: ZAI-backed GLM requests hit /v4/v1/messages while same GLM models still work via Nano-GPT | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63060.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63218](https://github.com/openclaw/openclaw/pull/63218) | fix(agents): route multi-instance Ollama providers by model baseUrl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63218.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63075](https://github.com/openclaw/openclaw/issues/63075) | Discord stale slash commands remain visible when channels.discord.commands.native=false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63075.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63188](https://github.com/openclaw/openclaw/issues/63188) | [Feature]: Agent Runtime: Configurable stopReason=\"length\" catch-and-continue for mode:\"run\" sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63188.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63024](https://github.com/openclaw/openclaw/issues/63024) | [Bug]: openclaw onboard --install-daemon error \"Did you mean to import \"tslog/cjs/index.js\"?\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63024.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63223](https://github.com/openclaw/openclaw/issues/63223) | Gateway becomes zombie after system CA rotation; internal reconnect loop cannot recover; Discord READY log line also missing in 2026.4.5 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63223.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63116](https://github.com/openclaw/openclaw/issues/63116) | Delivery-mirror session token overflow (204k > 200k) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63116.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63055](https://github.com/openclaw/openclaw/issues/63055) | [Bug]: memory: qmd binary unavailable via subprocess spawn (`/opt/homebrew/bin/qmd` ENOENT) despite binary existing in shell, causing fallback to builtin backend | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63055.md) | complete | Apr 26, 2026, 00:56 UTC |
| [#63227](https://github.com/openclaw/openclaw/issues/63227) | Windows: CLI commands hang for 30-90s after output completes (event loop not exiting) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63227.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63139](https://github.com/openclaw/openclaw/issues/63139) | before_model_resolve hook fires once per fallback iteration in runWithModelFallback, defeating runtime failover for routing plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63139.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63079](https://github.com/openclaw/openclaw/issues/63079) | [Bug]: googlechat not responding in 2026.4.8, ongoing since last few updated, audience validation issue in code | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63079.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63162](https://github.com/openclaw/openclaw/issues/63162) | [Feature]:  File Explorer Toggle in Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63162.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63195](https://github.com/openclaw/openclaw/issues/63195) | Bug: Control UI and TUI sessions intermittently disappear during normal use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63195.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63170](https://github.com/openclaw/openclaw/issues/63170) | Feature: Feishu interactive card buttons for exec approval | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63170.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63121](https://github.com/openclaw/openclaw/pull/63121) | fix(tools): add acp-only guidance to sessions_spawn streamTo parameter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63121.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63210](https://github.com/openclaw/openclaw/issues/63210) | [Feature]: Detect and recover from output truncation (stopReason:\"length\") in main agent sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63210.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63216](https://github.com/openclaw/openclaw/issues/63216) | [Bug]: Repeated hard resets on same session key despite high reserveTokensFloor; retry loop re-injects bootstrap context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63216.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63109](https://github.com/openclaw/openclaw/pull/63109) | Fix ACP slash command routing in Discord threads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63109.md) | complete | Apr 26, 2026, 00:55 UTC |
| [#63106](https://github.com/openclaw/openclaw/issues/63106) | cron: ghost runs recorded as ok when gateway is down (durationMs < 50ms) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63106.md) | complete | Apr 26, 2026, 00:55 UTC |

## How It Works

The normal review workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. The apply/comment-sync workflow is separate; it updates the durable Codex automated review comment in place and closes only unchanged high-confidence proposals.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments, plus a small best-effort local title search over existing reports for likely duplicates/superseded work.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout. The review prompt requires source/docs/tests/history inspection, adjacent-code reading, and reason-specific evidence before Codex can mark a close as high-confidence.
6. Writes `items/<number>.md` with the decision, best possible solution, proposed review comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is hourly for items with activity since the last stored snapshot and for anything created in the last 7 days, daily for older PRs and issues younger than 30 days, and weekly for older inactive issues. A separate hot-intake lane runs every 5 minutes with `batch_size=1`, up to 20 shards, and a two-page newest/most-recently-updated scan so brand-new issues and PRs get individual review workers quickly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then hot new items, then PRs, then recent issues, then older weekly reviews. The dashboard reports local cadence coverage for hourly hot items, daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To sync comments or close later without rerunning Codex, dispatch the workflow with `apply_existing=true` or let the scheduled apply lane run at minute 37 each hour. That mode reads existing `items/*.md`, refetches the issue/PR context, updates the single marker-backed Codex automated review comment in place, and only closes if nothing except that review comment changed since the proposal was written. It never posts a second close comment; closing reuses the durable review comment and then closes the item. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

`npm run audit` compares live open GitHub items with the generated `items/` and `closed/` records without moving files. It reports missing open records, open records still archived under `closed/`, stale `items/` records that no longer appear open, duplicate markdown records, protected-label proposed closes, and stale review-status records. Use `--output audit-report.json` for the full report, `--sample-limit N` to control console samples, and `--strict` to exit non-zero when state drift is present.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

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
- `CLAWSWEEPER_APP_ID`: optional GitHub App ID for the read-only OpenClaw scan token. Currently `3306130` for `openclaw-ci`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: optional private key for `openclaw-ci`; when present, plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex token environment variables. Parent ClawSweeper code uses the `openclaw-ci` GitHub App installation token for read-heavy target and related GitHub context before invoking Codex, falling back to `OPENCLAW_GH_TOKEN` only if the App secrets are absent. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. Apply mode still uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
