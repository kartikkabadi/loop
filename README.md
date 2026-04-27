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

Last dashboard update: Apr 27, 2026, 02:03 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 02:03 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=53032,53168,53416,53430,53500,53679,53926,54150,54199,54254,54381,54413,54535,54658,54743,54837,54854,55059,55063,55074,55163,62890,62991,63045,63075,63119,63169,71148,71848.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24973085727](https://github.com/openclaw/clawsweeper/actions/runs/24973085727)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3664 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3560 |
| Open items total | 7224 |
| Reviewed files | 7087 |
| Unreviewed open items | 137 |
| Archived closed files | 12694 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3630 |
| Proposed issue closes | 5 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3447 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7077 |
| Proposed closes awaiting apply | 7 (0.1% of fresh reviews) |
| Closed by Codex apply | 10047 |
| Failed or stale reviews | 10 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 224/765 current (541 due, 29.3%) |
| Hourly hot item cadence (<7d) | 224/765 current (541 due, 29.3%) |
| Daily cadence coverage | 4177/4454 current (277 due, 93.8%) |
| Daily PR cadence | 2883/3027 current (144 due, 95.2%) |
| Daily new issue cadence (<30d) | 1294/1427 current (133 due, 90.7%) |
| Weekly older issue cadence | 1868/1868 current (0 due, 100%) |
| Due now by cadence | 955 |

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

Latest review: Apr 27, 2026, 01:59 UTC. Latest close: Apr 27, 2026, 02:02 UTC. Latest comment sync: Apr 27, 2026, 02:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 20 | 20 | 2 |
| Last hour | 634 | 33 | 601 | 1 | 29 | 516 | 12 |
| Last 24 hours | 8673 | 1748 | 6925 | 8 | 2013 | 2550 | 15 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#62890](https://github.com/openclaw/openclaw/issues/62890) | [Bug]: Missing @img/colour module breaks inline screenshot rendering | already implemented on main | Apr 27, 2026, 02:02 UTC | [closed/62890.md](https://github.com/openclaw/clawsweeper/blob/main/closed/62890.md) |
| [#55163](https://github.com/openclaw/openclaw/issues/55163) | [Bug]: Doctor auto-enable creates config reload loop for local extensions in ~/.openclaw/extensions/ | already implemented on main | Apr 27, 2026, 02:02 UTC | [closed/55163.md](https://github.com/openclaw/clawsweeper/blob/main/closed/55163.md) |
| [#55074](https://github.com/openclaw/openclaw/issues/55074) | Make MEDIA_MAX_BYTES configurable instead of hardcoded 5MB | duplicate or superseded | Apr 27, 2026, 02:01 UTC | [closed/55074.md](https://github.com/openclaw/clawsweeper/blob/main/closed/55074.md) |
| [#55063](https://github.com/openclaw/openclaw/issues/55063) | [Bug]: /new and /reset preserve session model override; reset banner default can differ from agents.defaults.model.primary | duplicate or superseded | Apr 27, 2026, 02:01 UTC | [closed/55063.md](https://github.com/openclaw/clawsweeper/blob/main/closed/55063.md) |
| [#55059](https://github.com/openclaw/openclaw/issues/55059) | [Feature]:Support openai-chat API type for providers | already implemented on main | Apr 27, 2026, 02:01 UTC | [closed/55059.md](https://github.com/openclaw/clawsweeper/blob/main/closed/55059.md) |
| [#54854](https://github.com/openclaw/openclaw/issues/54854) | Control UI regression: drag-and-drop file to chat no longer works / old 'drop to local file path' workflow is gone | already implemented on main | Apr 27, 2026, 02:01 UTC | [closed/54854.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54854.md) |
| [#54743](https://github.com/openclaw/openclaw/issues/54743) | config set throws Maximum call stack size exceeded | already implemented on main | Apr 27, 2026, 02:01 UTC | [closed/54743.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54743.md) |
| [#54658](https://github.com/openclaw/openclaw/issues/54658) | Silent message delivery failure: AI response generated but never delivered to Discord | already implemented on main | Apr 27, 2026, 02:01 UTC | [closed/54658.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54658.md) |
| [#54535](https://github.com/openclaw/openclaw/issues/54535) | [Bug] openclaw browser CLI crashes Chrome 146 via Playwright connectOverCDP (EXC_BREAKPOINT/SIGTRAP) | already implemented on main | Apr 27, 2026, 02:01 UTC | [closed/54535.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54535.md) |
| [#54413](https://github.com/openclaw/openclaw/issues/54413) | Discord delivery silently drops messages after response termination + retry | already implemented on main | Apr 27, 2026, 02:01 UTC | [closed/54413.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54413.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72284](https://github.com/openclaw/openclaw/issues/72284) | [Bug]: DREAMS.md not created after successful REM phase; Control UI Dreams tab empty | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72284.md) | complete | Apr 27, 2026, 01:59 UTC |
| [#72149](https://github.com/openclaw/openclaw/pull/72149) | fix(agents): omit temperature for anthropic opus 4.7 requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72149.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72189](https://github.com/openclaw/openclaw/pull/72189) | fix(voice-call): Google Live tool responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72189.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72278](https://github.com/openclaw/openclaw/issues/72278) | Fix SecretRef integration so external secret providers batch/memoize lookups across all vault backends | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72278.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72254](https://github.com/openclaw/openclaw/pull/72254) | fix(skills): clean up partially-copied skill dirs after sync failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72254.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72369](https://github.com/openclaw/openclaw/issues/72369) | [webchat] Hide startup trigger message from chat history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72369.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72251](https://github.com/openclaw/openclaw/pull/72251) | fix(backup): retry on tar EOF race and skip known volatile files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72251.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72286](https://github.com/openclaw/openclaw/pull/72286) | Add Google Live browser Talk sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72286.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#65668](https://github.com/openclaw/openclaw/issues/65668) | [Bug]: SIGUSR1/config.patch restart orphans gateway under custom supervisors → EADDRINUSE crash loop (workaround: OPENCLAW_NO_RESPAWN=1) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65668.md) | complete | Apr 27, 2026, 01:58 UTC |
| [#72253](https://github.com/openclaw/openclaw/pull/72253) | fix(heartbeat): keep benign exec completions internal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72253.md) | complete | Apr 27, 2026, 01:58 UTC |

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
Missing open records are classified as eligible, maintainer-authored, protected,
or recently created so strict audit mode can flag actionable drift without
treating expected queue lag or excluded items as failures.
Use `--update-dashboard` to publish the latest audit health into this README
without making every normal dashboard heartbeat scan all open GitHub items.
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
