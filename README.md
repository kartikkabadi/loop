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

Last dashboard update: Apr 27, 2026, 02:28 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 02:28 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=61320,63002,63109,63187,63227,63260,63401,63606,63688,63723,63773,63994,64201,64289,64296,64319,64321,64549,64606,64653,64661,64672,64709,64744,64745,64787,64836,64927,65081,65176,65195,65457,65481,65494,65497,65589,65675,65724,65813,65938.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24973669832](https://github.com/openclaw/clawsweeper/actions/runs/24973669832)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3648 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3557 |
| Open items total | 7205 |
| Reviewed files | 7056 |
| Unreviewed open items | 149 |
| Archived closed files | 12725 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3609 |
| Proposed issue closes | 9 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3441 |
| Proposed PR closes | 8 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7050 |
| Proposed closes awaiting apply | 17 (0.2% of fresh reviews) |
| Closed by Codex apply | 10074 |
| Failed or stale reviews | 6 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 18/761 current (743 due, 2.4%) |
| Hourly hot item cadence (<7d) | 18/761 current (743 due, 2.4%) |
| Daily cadence coverage | 4357/4427 current (70 due, 98.4%) |
| Daily PR cadence | 2959/3018 current (59 due, 98%) |
| Daily new issue cadence (<30d) | 1398/1409 current (11 due, 99.2%) |
| Weekly older issue cadence | 1868/1868 current (0 due, 100%) |
| Due now by cadence | 962 |

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

Latest review: Apr 27, 2026, 02:16 UTC. Latest close: Apr 27, 2026, 02:26 UTC. Latest comment sync: Apr 27, 2026, 02:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 4 | 16 | 0 | 20 | 21 | 3 |
| Last hour | 634 | 44 | 590 | 0 | 38 | 434 | 13 |
| Last 24 hours | 8866 | 1782 | 7084 | 4 | 2031 | 2573 | 18 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#64709](https://github.com/openclaw/openclaw/pull/64709) | fix(process): handle Windows CJK encoding in child process output [AI-assisted] | duplicate or superseded | Apr 27, 2026, 02:26 UTC | [closed/64709.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64709.md) |
| [#64672](https://github.com/openclaw/openclaw/issues/64672) | qwen3.6-plus unavailable on Qwen Coding Plan Pro subscription | duplicate or superseded | Apr 27, 2026, 02:26 UTC | [closed/64672.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64672.md) |
| [#64661](https://github.com/openclaw/openclaw/pull/64661) | fix(exec): apply Windows codepage-aware output decoding in runExec and spawn-based callers [AI-assisted] | duplicate or superseded | Apr 27, 2026, 02:26 UTC | [closed/64661.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64661.md) |
| [#64606](https://github.com/openclaw/openclaw/issues/64606) | Duplicate Telegram message sent after provider timeout + retry | already implemented on main | Apr 27, 2026, 02:26 UTC | [closed/64606.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64606.md) |
| [#64549](https://github.com/openclaw/openclaw/issues/64549) | [Bug]: memorySearch watch does not auto-index new markdown files in workspace/memory or extraPaths | already implemented on main | Apr 27, 2026, 02:26 UTC | [closed/64549.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64549.md) |
| [#64321](https://github.com/openclaw/openclaw/issues/64321) | sessions.list slow with large session history (23s for 112MB) | duplicate or superseded | Apr 27, 2026, 02:26 UTC | [closed/64321.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64321.md) |
| [#64319](https://github.com/openclaw/openclaw/issues/64319) | [Bug]: models auth config shows Waiting for GitHub authorization | duplicate or superseded | Apr 27, 2026, 02:26 UTC | [closed/64319.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64319.md) |
| [#64296](https://github.com/openclaw/openclaw/issues/64296) | [Bug]: WhatsApp Web connection ended before fully opening | duplicate or superseded | Apr 27, 2026, 02:26 UTC | [closed/64296.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64296.md) |
| [#64289](https://github.com/openclaw/openclaw/issues/64289) | [Bug] Session-scoped plugin lazy-initialization causes UX disruption after idle | already implemented on main | Apr 27, 2026, 02:26 UTC | [closed/64289.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64289.md) |
| [#63773](https://github.com/openclaw/openclaw/issues/63773) | Bug: Subagent session JSONL does not record token usage (usage fields always 0) | already implemented on main | Apr 27, 2026, 02:25 UTC | [closed/63773.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63773.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65497](https://github.com/openclaw/openclaw/pull/65497) | fix: reuse gateway provider registry in worker sessions (#62051) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65497.md) | complete | Apr 27, 2026, 02:16 UTC |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65486.md) | complete | Apr 27, 2026, 02:15 UTC |
| [#65490](https://github.com/openclaw/openclaw/issues/65490) | Running an OpenClaw agent in production: the execution discipline gap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65490.md) | complete | Apr 27, 2026, 02:15 UTC |
| [#65687](https://github.com/openclaw/openclaw/issues/65687) | [Bug]: Discord voice conversations break after one successful back and forth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65687.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65592](https://github.com/openclaw/openclaw/pull/65592) | feat(searxng): show JSON format setup note during onboarding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65592.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65933](https://github.com/openclaw/openclaw/pull/65933) | fix(exec): respect configured security=full as floor; model args cannot downgrade | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65933.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65589](https://github.com/openclaw/openclaw/pull/65589) | feat(memory-core): dreaming circuit breaker to prevent runaway cost and data corruption | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65589.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#67157](https://github.com/openclaw/openclaw/pull/67157) | Add stable tarball upgrade workflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67157.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65670](https://github.com/openclaw/openclaw/pull/65670) | feat: keep vite-plus companion bin on daemon PATH | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65670.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65855](https://github.com/openclaw/openclaw/pull/65855) | chore: add qqbot to channel contract guardrails and fix synology-chat labeler | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65855.md) | complete | Apr 27, 2026, 02:14 UTC |

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
