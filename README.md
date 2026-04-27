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

Last dashboard update: Apr 27, 2026, 05:22 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 05:22 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24977997539](https://github.com/openclaw/clawsweeper/actions/runs/24977997539)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3645 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3533 |
| Open items total | 7178 |
| Reviewed files | 6987 |
| Unreviewed open items | 191 |
| Archived closed files | 12794 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3584 |
| Proposed issue closes | 20 (0.6% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3401 |
| Proposed PR closes | 28 (0.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6985 |
| Proposed closes awaiting apply | 48 (0.7% of fresh reviews) |
| Closed by Codex apply | 10103 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 33/737 current (704 due, 4.5%) |
| Hourly hot item cadence (<7d) | 33/737 current (704 due, 4.5%) |
| Daily cadence coverage | 4040/4387 current (347 due, 92.1%) |
| Daily PR cadence | 2731/2992 current (261 due, 91.3%) |
| Daily new issue cadence (<30d) | 1309/1395 current (86 due, 93.8%) |
| Weekly older issue cadence | 1863/1863 current (0 due, 100%) |
| Due now by cadence | 1242 |

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

Latest review: Apr 27, 2026, 05:07 UTC. Latest close: Apr 27, 2026, 03:51 UTC. Latest comment sync: Apr 27, 2026, 05:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 397 | 3 |
| Last hour | 1013 | 46 | 967 | 0 | 0 | 973 | 7 |
| Last 24 hours | 8176 | 1578 | 6598 | 0 | 1252 | 2940 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#43954](https://github.com/openclaw/openclaw/pull/43954) | feat(feishu): add feishu_card tool for sending and updating interactive cards | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43954.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43954.md) |
| [#43901](https://github.com/openclaw/openclaw/pull/43901) | fix: remove L1 bootstrap snapshot cache to fix workspace file staleness | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43901.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43901.md) |
| [#43874](https://github.com/openclaw/openclaw/pull/43874) | feat(feishu): fix board tool SDK paths and add create_whiteboard action | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43874.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43874.md) |
| [#43789](https://github.com/openclaw/openclaw/pull/43789) | [AI-assisted] fix(agents): compact sandbox skill paths | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43789.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43789.md) |
| [#43634](https://github.com/openclaw/openclaw/pull/43634) | fix: restore export-html template placeholders and prevent reformatting | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43634.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43634.md) |
| [#43594](https://github.com/openclaw/openclaw/pull/43594) | Cron: add opt-in isolated session reuse | already implemented on main | Apr 27, 2026, 05:18 UTC | [closed/43594.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43594.md) |
| [#43327](https://github.com/openclaw/openclaw/pull/43327) | Fix/tui shift enter newline | already implemented on main | Apr 27, 2026, 05:17 UTC | [closed/43327.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43327.md) |
| [#43317](https://github.com/openclaw/openclaw/pull/43317) | feat(sandbox): pluggable provider interface + Docker/gVisor backends | duplicate or superseded | Apr 27, 2026, 05:17 UTC | [closed/43317.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43317.md) |
| [#43223](https://github.com/openclaw/openclaw/pull/43223) | fix(scripts): update copy-hook-metadata script to correct destination… | already implemented on main | Apr 27, 2026, 05:17 UTC | [closed/43223.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43223.md) |
| [#43143](https://github.com/openclaw/openclaw/issues/43143) | Discussion: 10 active PR limit may throttle batch contributors | already implemented on main | Apr 27, 2026, 05:17 UTC | [closed/43143.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43143.md) |

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
