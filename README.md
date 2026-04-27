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

Last dashboard update: Apr 27, 2026, 02:34 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 02:34 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24973788373](https://github.com/openclaw/clawsweeper/actions/runs/24973788373)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3640 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3551 |
| Open items total | 7191 |
| Reviewed files | 7036 |
| Unreviewed open items | 155 |
| Archived closed files | 12745 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3600 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3430 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7030 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10090 |
| Failed or stale reviews | 6 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 18/761 current (743 due, 2.4%) |
| Hourly hot item cadence (<7d) | 18/761 current (743 due, 2.4%) |
| Daily cadence coverage | 4337/4407 current (70 due, 98.4%) |
| Daily PR cadence | 2948/3007 current (59 due, 98%) |
| Daily new issue cadence (<30d) | 1389/1400 current (11 due, 99.2%) |
| Weekly older issue cadence | 1868/1868 current (0 due, 100%) |
| Due now by cadence | 968 |

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

Latest review: Apr 27, 2026, 02:16 UTC. Latest close: Apr 27, 2026, 02:30 UTC. Latest comment sync: Apr 27, 2026, 02:32 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 5 | 466 | 2 |
| Last hour | 634 | 44 | 590 | 0 | 23 | 719 | 10 |
| Last 24 hours | 8838 | 1759 | 7079 | 3 | 2016 | 3050 | 17 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65938](https://github.com/openclaw/openclaw/pull/65938) | docs(providers): add Bedrock Mantle to provider index pages | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65938.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65938.md) |
| [#65813](https://github.com/openclaw/openclaw/issues/65813) | openai-codex auth profile rotation burns through both profiles before escalating to model fallback | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65813.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65813.md) |
| [#65724](https://github.com/openclaw/openclaw/issues/65724) | [Windows] DeprecationWarning: Passing args to child process with shell option true | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65724.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65724.md) |
| [#65675](https://github.com/openclaw/openclaw/pull/65675) | docs: add 2MB size limit note for avatar images | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65675.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65675.md) |
| [#65589](https://github.com/openclaw/openclaw/pull/65589) | feat(memory-core): dreaming circuit breaker to prevent runaway cost and data corruption | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65589.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65589.md) |
| [#71848](https://github.com/openclaw/openclaw/issues/71848) | [SRE] Gateway SIGABRT (134) on macOS launchd (mini-lobby) | already implemented on main | Apr 27, 2026, 02:04 UTC | [closed/71848.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71848.md) |
| [#71148](https://github.com/openclaw/openclaw/issues/71148) | Memory leak: Ajv `.compile()` per call in `sharedAjv` (and `ajv`) leaks SchemaEnv/run closures | already implemented on main | Apr 27, 2026, 02:04 UTC | [closed/71148.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71148.md) |
| [#63169](https://github.com/openclaw/openclaw/issues/63169) | WhatsApp media send reports success but attachment is never delivered (2026.4.8) | already implemented on main | Apr 27, 2026, 02:04 UTC | [closed/63169.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63169.md) |
| [#63119](https://github.com/openclaw/openclaw/issues/63119) | [Feature]: Session compaction: archive transcript files before deletion, with configurable retention | already implemented on main | Apr 27, 2026, 02:03 UTC | [closed/63119.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63119.md) |
| [#63075](https://github.com/openclaw/openclaw/issues/63075) | Discord stale slash commands remain visible when channels.discord.commands.native=false | already implemented on main | Apr 27, 2026, 02:03 UTC | [closed/63075.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63075.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65486.md) | complete | Apr 27, 2026, 02:15 UTC |
| [#65490](https://github.com/openclaw/openclaw/issues/65490) | Running an OpenClaw agent in production: the execution discipline gap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65490.md) | complete | Apr 27, 2026, 02:15 UTC |
| [#65687](https://github.com/openclaw/openclaw/issues/65687) | [Bug]: Discord voice conversations break after one successful back and forth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65687.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65592](https://github.com/openclaw/openclaw/pull/65592) | feat(searxng): show JSON format setup note during onboarding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65592.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65933](https://github.com/openclaw/openclaw/pull/65933) | fix(exec): respect configured security=full as floor; model args cannot downgrade | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65933.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#67157](https://github.com/openclaw/openclaw/pull/67157) | Add stable tarball upgrade workflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67157.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65670](https://github.com/openclaw/openclaw/pull/65670) | feat: keep vite-plus companion bin on daemon PATH | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65670.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65855](https://github.com/openclaw/openclaw/pull/65855) | chore: add qqbot to channel contract guardrails and fix synology-chat labeler | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65855.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#66067](https://github.com/openclaw/openclaw/pull/66067) | fix(tui): preserve spaces between thinking fragments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66067.md) | complete | Apr 27, 2026, 02:14 UTC |
| [#65726](https://github.com/openclaw/openclaw/issues/65726) | ACP bindings: add notifyPolicy config + dedup guard for bound threads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65726.md) | complete | Apr 27, 2026, 02:14 UTC |

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
