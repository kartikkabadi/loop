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

Last dashboard update: Apr 27, 2026, 03:51 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 03:51 UTC

State: Apply finished

Apply/comment-sync run finished with 5 fresh closes out of requested limit 5. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24975624127](https://github.com/openclaw/clawsweeper/actions/runs/24975624127)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3654 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3551 |
| Open items total | 7205 |
| Reviewed files | 7009 |
| Unreviewed open items | 196 |
| Archived closed files | 12772 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3590 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3412 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7002 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10103 |
| Failed or stale reviews | 7 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 37/749 current (712 due, 4.9%) |
| Hourly hot item cadence (<7d) | 37/749 current (712 due, 4.9%) |
| Daily cadence coverage | 3974/4397 current (423 due, 90.4%) |
| Daily PR cadence | 2777/3000 current (223 due, 92.6%) |
| Daily new issue cadence (<30d) | 1197/1397 current (200 due, 85.7%) |
| Weekly older issue cadence | 1863/1863 current (0 due, 100%) |
| Due now by cadence | 1331 |

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

Latest review: Apr 27, 2026, 03:41 UTC. Latest close: Apr 27, 2026, 03:51 UTC. Latest comment sync: Apr 27, 2026, 03:50 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 290 | 4 | 286 | 0 | 5 | 4 | 0 |
| Last hour | 540 | 5 | 535 | 0 | 5 | 41 | 3 |
| Last 24 hours | 8307 | 1628 | 6679 | 4 | 1700 | 1842 | 8 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | belongs on ClawHub | Apr 27, 2026, 03:51 UTC | [closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70597.md) |
| [#65669](https://github.com/openclaw/openclaw/pull/65669) | feat: support custom job IDs in cron add command | duplicate or superseded | Apr 27, 2026, 03:50 UTC | [closed/65669.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65669.md) |
| [#64653](https://github.com/openclaw/openclaw/pull/64653) | fix: honor provider-prefixed configured model ids for routed providers | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/64653.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64653.md) |
| [#64201](https://github.com/openclaw/openclaw/issues/64201) | [Bug]: OpenClaw: Crash loop on plugin config reload (ECONNREFUSED on loopback port 18789) | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/64201.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64201.md) |
| [#63779](https://github.com/openclaw/openclaw/issues/63779) | ACP completion delivery-mirror message (assistant role) does not activate next turn after sessions_yield | already implemented on main | Apr 27, 2026, 03:50 UTC | [closed/63779.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63779.md) |
| [#65938](https://github.com/openclaw/openclaw/pull/65938) | docs(providers): add Bedrock Mantle to provider index pages | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65938.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65938.md) |
| [#65813](https://github.com/openclaw/openclaw/issues/65813) | openai-codex auth profile rotation burns through both profiles before escalating to model fallback | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65813.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65813.md) |
| [#65724](https://github.com/openclaw/openclaw/issues/65724) | [Windows] DeprecationWarning: Passing args to child process with shell option true | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65724.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65724.md) |
| [#65675](https://github.com/openclaw/openclaw/pull/65675) | docs: add 2MB size limit note for avatar images | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65675.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65675.md) |
| [#65589](https://github.com/openclaw/openclaw/pull/65589) | feat(memory-core): dreaming circuit breaker to prevent runaway cost and data corruption | duplicate or superseded | Apr 27, 2026, 02:30 UTC | [closed/65589.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65589.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65655](https://github.com/openclaw/openclaw/pull/65655) | fix: harden Mattermost slash callback auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65655.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#65374](https://github.com/openclaw/openclaw/issues/65374) | Bug: Built-in dreaming system contaminates agent identity in multi-agent setups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65374.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#66041](https://github.com/openclaw/openclaw/pull/66041) | fix(telegram): keep ack reactions without mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66041.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#65906](https://github.com/openclaw/openclaw/pull/65906) | feat: Add {context} and {contextPercent} template variables for response prefix | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65906.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#65692](https://github.com/openclaw/openclaw/pull/65692) | tool result microcompress | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65692.md) | complete | Apr 27, 2026, 03:41 UTC |
| [#72189](https://github.com/openclaw/openclaw/pull/72189) | fix(voice-call): Google Live tool responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72189.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65870](https://github.com/openclaw/openclaw/issues/65870) | [Bug]: Brave Search docs URL in code points to legacy path instead of canonical location | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65870.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65279](https://github.com/openclaw/openclaw/issues/65279) | [Bug]: MiniMax-M2.7 10+ second delay in message preprocessing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65279.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65860](https://github.com/openclaw/openclaw/issues/65860) | [Bug]: Error message references nonexistent docs anchor `tools/plugin#runtime-helpers` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65860.md) | complete | Apr 27, 2026, 03:40 UTC |
| [#65733](https://github.com/openclaw/openclaw/issues/65733) | [Bug]: Plugin discovery via safeRealpathSync takes ~20 minutes during gateway startup on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65733.md) | complete | Apr 27, 2026, 03:40 UTC |

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
