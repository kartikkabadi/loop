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

Last dashboard update: Apr 27, 2026, 05:24 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 05:24 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=42105,42158,42218,42290,42518,42573,42673,42788,43043,43093,43137,43143,43223,43317,43327,43594,43634,43789,43874,43901,43954,44002,52133,53917,62548,66267,66494,66546,66891,66934,67036,67065,67116,67122,67175,67209,67248,67259,67260,67273,67532,67568,67764,67959,67970,68154,68227,68293,71190.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24978018309](https://github.com/openclaw/clawsweeper/actions/runs/24978018309)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3641 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3532 |
| Open items total | 7173 |
| Reviewed files | 6945 |
| Unreviewed open items | 228 |
| Archived closed files | 12836 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3567 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3376 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6943 |
| Proposed closes awaiting apply | 7 (0.1% of fresh reviews) |
| Closed by Codex apply | 10143 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 33/735 current (702 due, 4.5%) |
| Hourly hot item cadence (<7d) | 33/735 current (702 due, 4.5%) |
| Daily cadence coverage | 4005/4353 current (348 due, 92%) |
| Daily PR cadence | 2705/2967 current (262 due, 91.2%) |
| Daily new issue cadence (<30d) | 1300/1386 current (86 due, 93.8%) |
| Weekly older issue cadence | 1857/1857 current (0 due, 100%) |
| Due now by cadence | 1278 |

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

Latest review: Apr 27, 2026, 05:07 UTC. Latest close: Apr 27, 2026, 05:23 UTC. Latest comment sync: Apr 27, 2026, 05:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 33 | 412 | 4 |
| Last hour | 1013 | 46 | 967 | 0 | 33 | 919 | 5 |
| Last 24 hours | 8171 | 1578 | 6593 | 0 | 1276 | 2946 | 14 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#67568](https://github.com/openclaw/openclaw/issues/67568) | Session memory files use UTC timestamps, causing date mismatch with local timezone | already implemented on main | Apr 27, 2026, 05:23 UTC | [closed/67568.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67568.md) |
| [#67532](https://github.com/openclaw/openclaw/issues/67532) | Z.AI Coding Plan baseUrl gets spurious `/v1` appended in agent-scoped `models.json` → 404 → LiveSessionModelSwitchError forces switch to `openai/gpt-5.4` | already implemented on main | Apr 27, 2026, 05:22 UTC | [closed/67532.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67532.md) |
| [#67273](https://github.com/openclaw/openclaw/pull/67273) | Fix heartbeat async exec delivery leaks | duplicate or superseded | Apr 27, 2026, 05:22 UTC | [closed/67273.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67273.md) |
| [#67260](https://github.com/openclaw/openclaw/issues/67260) | [Bug]: Native Ollama primary falls back in long-lived Telegram session while fresh runs succeed | already implemented on main | Apr 27, 2026, 05:22 UTC | [closed/67260.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67260.md) |
| [#67259](https://github.com/openclaw/openclaw/pull/67259) | fix(chat): render streaming bubble when tool calls are hidden | already implemented on main | Apr 27, 2026, 05:22 UTC | [closed/67259.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67259.md) |
| [#67248](https://github.com/openclaw/openclaw/issues/67248) | [Bug]: sessions_spawn(runtime=\"subagent\") still fails on 2026.4.14 with ACP-only streamTo under GPT-5.4 | duplicate or superseded | Apr 27, 2026, 05:22 UTC | [closed/67248.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67248.md) |
| [#67209](https://github.com/openclaw/openclaw/pull/67209) | fix(logging): honor logging.file config early | already implemented on main | Apr 27, 2026, 05:22 UTC | [closed/67209.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67209.md) |
| [#67175](https://github.com/openclaw/openclaw/pull/67175) | fix(logging): honor logging.file in bundled gateway runtime | already implemented on main | Apr 27, 2026, 05:22 UTC | [closed/67175.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67175.md) |
| [#67122](https://github.com/openclaw/openclaw/issues/67122) | [Bug]: pdf/image tools reject sub-agent workspace paths due to workspace-* blacklist in assertLocalMediaAllowed | already implemented on main | Apr 27, 2026, 05:21 UTC | [closed/67122.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67122.md) |
| [#67116](https://github.com/openclaw/openclaw/issues/67116) | [Feature]: \"Can 'openclaw logs --follow' be set to use local time by default?\ | duplicate or superseded | Apr 27, 2026, 05:21 UTC | [closed/67116.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67116.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56242](https://github.com/openclaw/openclaw/pull/56242) | fix: add CJK error patterns to failover classification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56242.md) | complete | Apr 27, 2026, 05:07 UTC |
| [#62956](https://github.com/openclaw/openclaw/pull/62956) | fix(tui): surface error details and elapsed time in status bar on agent failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62956.md) | complete | Apr 27, 2026, 05:07 UTC |
| [#57505](https://github.com/openclaw/openclaw/pull/57505) | Matrix: stop no-progress bot loops with semantic judge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57505.md) | complete | Apr 27, 2026, 05:07 UTC |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | [Bug]: Memory management is in chaos | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43747.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#64016](https://github.com/openclaw/openclaw/issues/64016) | BUG: heartbeat fires duplicate runs when external wake events (openclaw agent CLI) arrive during scheduled heartbeat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64016.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#47518](https://github.com/openclaw/openclaw/pull/47518) | fix(gemini-cli-auth): respect env proxy vars and fix hung exit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47518.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#43996](https://github.com/openclaw/openclaw/issues/43996) | [Bug]: Sandbox container exits immediately when no-new-privileges is applied (exec /usr/bin/sleep: operation not permitted) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43996.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#63558](https://github.com/openclaw/openclaw/issues/63558) | Control UI: Dreaming tab has no agent selector — cannot switch between agent contexts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63558.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#63139](https://github.com/openclaw/openclaw/issues/63139) | before_model_resolve hook fires once per fallback iteration in runWithModelFallback, defeating runtime failover for routing plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63139.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#46542](https://github.com/openclaw/openclaw/pull/46542) | feat(memory): add shared memory store for cross-agent document sharing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46542.md) | complete | Apr 27, 2026, 05:06 UTC |

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
