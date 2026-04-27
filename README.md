# ClawSweeper

ClawSweeper is the conservative OpenClaw maintenance bot for
`openclaw/openclaw`.

It keeps one markdown report per open issue or PR, publishes one durable Codex
automated review comment when useful, and only closes items when the evidence is
strong.

## Guardrails

ClawSweeper may propose a close only when the item is clearly one of these:

- implemented on current `main`
- not reproducible on current `main`
- better suited for ClawHub skill/plugin work than core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- incoherent enough that no action can be taken
- stale issue older than 60 days with too little data to verify

Maintainer-authored items are never auto-closed. Everything else stays open.
Issues with an open PR that references them using GitHub closing syntax such as
`Fixes #123` stay open until that PR merges or is closed.
Open issue/PR pairs from the same author stay open together unless the paired
item is already resolved or a maintainer explicitly asks to close one side.

## Dashboard

Last dashboard update: Apr 27, 2026, 06:35 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 06:39 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24980346225](https://github.com/openclaw/clawsweeper/actions/runs/24980346225)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3629 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3527 |
| Open items total | 7156 |
| Reviewed files | 6916 |
| Unreviewed open items | 240 |
| Archived closed files | 12865 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3554 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3359 |
| Proposed PR closes | 7 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6913 |
| Proposed closes awaiting apply | 11 (0.2% of fresh reviews) |
| Closed by Codex apply | 10151 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 116/729 current (613 due, 15.9%) |
| Hourly hot item cadence (<7d) | 116/729 current (613 due, 15.9%) |
| Daily cadence coverage | 3869/4330 current (461 due, 89.4%) |
| Daily PR cadence | 2583/2955 current (372 due, 87.4%) |
| Daily new issue cadence (<30d) | 1286/1375 current (89 due, 93.5%) |
| Weekly older issue cadence | 1857/1857 current (0 due, 100%) |
| Due now by cadence | 1314 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 27, 2026, 01:06 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7235 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 85 |
| Missing protected open records | 2 |
| Missing recently-created open records | 26 |
| Archived records that are open again | 0 |
| Stale item records | 7 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 5 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | Protected proposed close | feat(whatsapp): add reply quoting via replyToMode | closed/57413.md |
| [#60460](https://github.com/openclaw/openclaw/pull/60460) | Protected proposed close | Enforce browser profile CDP policy | closed/60460.md |
| [#40945](https://github.com/openclaw/openclaw/issues/40945) | Stale review | Control UI chat markdown only renders data URI images, not remote https image URLs | items/40945.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 27, 2026, 06:32 UTC. Latest close: Apr 27, 2026, 05:46 UTC. Latest comment sync: Apr 27, 2026, 06:18 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 500 | 7 | 493 | 0 | 0 | 0 | 0 |
| Last hour | 1025 | 11 | 1014 | 0 | 2 | 905 | 4 |
| Last 24 hours | 7664 | 1213 | 6451 | 1 | 1145 | 2224 | 10 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65750](https://github.com/openclaw/openclaw/pull/65750) | fix(control-ui): stop reloading history after clear (#65719) | cannot reproduce on current main | Apr 27, 2026, 05:46 UTC | [closed/65750.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65750.md) |
| [#63871](https://github.com/openclaw/openclaw/pull/63871) | fix(cron): honor deleteAfterRun for recurring jobs | duplicate or superseded | Apr 27, 2026, 05:46 UTC | [closed/63871.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63871.md) |
| [#71190](https://github.com/openclaw/openclaw/issues/71190) | [Bug]: mergeOrphanedTrailingUserPrompt snowballs queued messages after abort — model re-answers on every turn | already implemented on main | Apr 27, 2026, 05:25 UTC | [closed/71190.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71190.md) |
| [#68293](https://github.com/openclaw/openclaw/pull/68293) | fix(systemd): use resolveSystemdServiceName in activate/uninstall | already implemented on main | Apr 27, 2026, 05:25 UTC | [closed/68293.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68293.md) |
| [#68227](https://github.com/openclaw/openclaw/pull/68227) | fix(protocol): require hello-ok auth | duplicate or superseded | Apr 27, 2026, 05:25 UTC | [closed/68227.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68227.md) |
| [#68154](https://github.com/openclaw/openclaw/issues/68154) | [Bug]: security audit false positive: plugins.allow_phantom_entries flags bundled plugins as phantom | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/68154.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68154.md) |
| [#67970](https://github.com/openclaw/openclaw/issues/67970) | Feature: built-in memory should support automatic context extraction and daily-log writing | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/67970.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67970.md) |
| [#67764](https://github.com/openclaw/openclaw/issues/67764) | [Feature]: Sessions UI should expose per-turn raw context and assembled model input | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/67764.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67764.md) |
| [#43954](https://github.com/openclaw/openclaw/pull/43954) | feat(feishu): add feishu_card tool for sending and updating interactive cards | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43954.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43954.md) |
| [#43901](https://github.com/openclaw/openclaw/pull/43901) | fix: remove L1 bootstrap snapshot cache to fix workspace file staleness | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43901.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43901.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68010](https://github.com/openclaw/openclaw/pull/68010) | fix(providers): defer OpenRouter env var candidates to lazy proxy (#67989) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68010.md) | complete | Apr 27, 2026, 06:32 UTC |
| [#67784](https://github.com/openclaw/openclaw/issues/67784) | Mattermost message tool handler ignores threadId, filePath/path, and mediaLocalRoots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67784.md) | complete | Apr 27, 2026, 06:32 UTC |
| [#67868](https://github.com/openclaw/openclaw/issues/67868) | memory status reports \"Dreaming: off\" when only light phase is enabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67868.md) | complete | Apr 27, 2026, 06:32 UTC |
| [#67986](https://github.com/openclaw/openclaw/issues/67986) | [Bug]: Gateway wedges silently mid-session after 2026.4.15 — only recovers on WhatsApp 408 + health monitor restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67986.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#68264](https://github.com/openclaw/openclaw/issues/68264) | [Bug] Canvas/Browser UI Visualization Fails to Render in Chat Environment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68264.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67988](https://github.com/openclaw/openclaw/issues/67988) | Control UI: Model dropdown shows alias/key instead of display name for Claude Opus 4.7 and Claude Sonnet 4.6 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67988.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67728](https://github.com/openclaw/openclaw/issues/67728) | Browser: Remote CDP WebSocket needs auto-reconnect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67728.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67976](https://github.com/openclaw/openclaw/issues/67976) | [Bug] imageModel调用火山引擎API返回404错误 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67976.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67692](https://github.com/openclaw/openclaw/pull/67692) | Feat/acp tui lazy init | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67692.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67990](https://github.com/openclaw/openclaw/issues/67990) | Proposal: Improved Backup Design with Configurable Exclusion Rules and Service-Aware Archiving | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67990.md) | complete | Apr 27, 2026, 06:31 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

- hot/new and recently active items are checked hourly, with a 5-minute intake
  schedule for the newest queue edge
- pull requests and issues younger than 30 days are checked daily once they
  leave the hot window
- older inactive issues are checked weekly
- apply wakes every 15 minutes and exits quickly when there are no unchanged
  high-confidence close proposals

### Review Lane

Review is proposal-only. It never closes items.

- A planner scans open issues and PRs, then assigns exact item numbers to shards.
- Manual runs can pass `item_number` or comma-separated `item_numbers` to review
  exact Audit Health findings without scanning for a normal batch.
- Each shard checks out `openclaw/openclaw` at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes `items/<number>.md` with the decision, evidence, suggested
  comment, runtime metadata, and GitHub snapshot hash.
- High-confidence allowed close decisions become `proposed_close`.
- After publish, the lane checks the selected items' single marker-backed Codex
  review comment. Missing comments and missing metadata are synced immediately;
  existing comments are refreshed only when stale, currently weekly.

### Apply Lane

Apply reads existing reports and mutates GitHub only when the stored review is
still valid.

- Updates the single marker-backed Codex automated review comment in place.
- Closes only unchanged high-confidence proposals.
- Reuses the review comment when closing; no duplicate close comment.
- Moves closed or already-closed reports to `closed/<number>.md`.
- Moves reopened archived reports back to `items/<number>.md` as stale.
- Commits checkpoints and dashboard heartbeats during long runs.

Apply wakes every 15 minutes, no-ops when there are no unchanged
high-confidence close proposals, and narrows scheduled runs to the currently
eligible proposal list so idle runs do not scan unrelated keep-open records.
It defaults to all item kinds, no age floor, a 2-second close delay, and 50
fresh closes per checkpoint. If it reaches the requested limit, it queues
another apply run with the same settings.

There is still one deterministic apply path for writes. Review can propose and
sync stale public review comments, but closing remains guarded by apply so a
fresh GitHub snapshot, labels, maintainer-authorship, and unchanged item state
are checked immediately before mutation.

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- CI makes the OpenClaw checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

### Audit

`npm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Protected proposed closes are reported only for active `items/` records because
archived `closed/` records are historical and cannot be applied.
Missing open records are classified as eligible, maintainer-authored, protected,
or recently created so strict audit mode can flag actionable drift without
treating expected queue lag or excluded items as failures.
Use `--update-dashboard` to publish the latest audit health into this README
without making every normal dashboard heartbeat scan all open GitHub items.
Audit Health includes a copyable `item_numbers` input for reviewable findings
such as missing eligible records, reopened archived records, and stale reviews.
The workflow refreshes Audit Health on a separate six-hour schedule, and it can
be run manually with `audit_dashboard=true`.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25 --update-dashboard
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
npm run apply-decisions -- --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default; pass `apply_kind=issue` or `apply_kind=pull_request` to narrow a manual run.

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
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy `openclaw/openclaw` scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls, and apply/comment-sync jobs use the app token for comments and closes.

Token flow:

- Review shards log Codex in with `OPENAI_API_KEY`, then run without OpenAI or
  Codex token environment variables.
- ClawSweeper uses the `openclaw-ci` GitHub App token for read-heavy target
  context, falling back to `OPENCLAW_GH_TOKEN` only if app secrets are absent.
- Apply mode uses the app token for review comments and closes, so GitHub
  attributes mutations to `clawsweeper[bot]`.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to `openclaw/openclaw` issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
