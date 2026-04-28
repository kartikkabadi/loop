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

Last dashboard update: Apr 28, 2026, 02:08 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 02:08 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 59324,64758,65309,65886,65914,69310,69472,70864,71142,71396,71459,71550,71857,72237,72245,72268,72294,72297,72338,72376.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25029751134](https://github.com/openclaw/clawsweeper/actions/runs/25029751134)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3583 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3461 |
| Open items total | 7044 |
| Reviewed files | 6631 |
| Unreviewed open items | 413 |
| Archived closed files | 13200 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3408 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3220 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6628 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10226 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 21/627 current (606 due, 3.3%) |
| Hourly hot item cadence (<7d) | 21/627 current (606 due, 3.3%) |
| Daily cadence coverage | 1473/4148 current (2675 due, 35.5%) |
| Daily PR cadence | 919/2869 current (1950 due, 32%) |
| Daily new issue cadence (<30d) | 554/1279 current (725 due, 43.3%) |
| Weekly older issue cadence | 1856/1856 current (0 due, 100%) |
| Due now by cadence | 3694 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 27, 2026, 07:11 UTC

Status: **Action needed**

Targeted review input: `64563,65635,56915,61960,62112,62431,64150,71072`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7132 |
| Missing eligible open records | 2 |
| Missing maintainer-authored open records | 94 |
| Missing protected open records | 1 |
| Missing recently-created open records | 149 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 6 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#56915](https://github.com/openclaw/openclaw/issues/56915) | Stale review | [Bug]: [Bug] Skills scanner ignores subdirectories under ~/.openclaw/skills/ | items/56915.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 28, 2026, 02:03 UTC. Latest close: Apr 28, 2026, 02:00 UTC. Latest comment sync: Apr 28, 2026, 02:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 2 | 18 | 0 | 1 | 20 | 0 |
| Last hour | 40 | 3 | 37 | 0 | 9 | 39 | 1 |
| Last 24 hours | 2446 | 167 | 2279 | 1 | 90 | 1536 | 12 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#52291](https://github.com/openclaw/openclaw/pull/52291) | fix(ui): make ui:build work on Windows | already implemented on main | Apr 28, 2026, 02:00 UTC | [closed/52291.md](https://github.com/openclaw/clawsweeper/blob/main/closed/52291.md) |
| [#72468](https://github.com/openclaw/openclaw/pull/72468) | fix(plugins): hard-fail invalid hook and memory capability registrations | already implemented on main | Apr 28, 2026, 01:24 UTC | [closed/72468.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72468.md) |
| [#62482](https://github.com/openclaw/openclaw/pull/62482) | fix: refresh subsystem file loggers across daily log rollovers [AI-assisted] | already implemented on main | Apr 28, 2026, 01:24 UTC | [closed/62482.md](https://github.com/openclaw/clawsweeper/blob/main/closed/62482.md) |
| [#43141](https://github.com/openclaw/openclaw/issues/43141) | Queued cron-lane runs are not abort-aware and can time out before model invocation | already implemented on main | Apr 28, 2026, 01:24 UTC | [closed/43141.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43141.md) |
| [#41936](https://github.com/openclaw/openclaw/pull/41936) | feat(models): support provider connect timeout | already implemented on main | Apr 28, 2026, 01:24 UTC | [closed/41936.md](https://github.com/openclaw/clawsweeper/blob/main/closed/41936.md) |
| [#41809](https://github.com/openclaw/openclaw/pull/41809) | feat(config): add agents.defaults.reasoningDefault config key | duplicate or superseded | Apr 28, 2026, 01:24 UTC | [closed/41809.md](https://github.com/openclaw/clawsweeper/blob/main/closed/41809.md) |
| [#41764](https://github.com/openclaw/openclaw/issues/41764) | [Bug] Cron job reports lastError even when message was delivered | already implemented on main | Apr 28, 2026, 01:23 UTC | [closed/41764.md](https://github.com/openclaw/clawsweeper/blob/main/closed/41764.md) |
| [#41736](https://github.com/openclaw/openclaw/issues/41736) | [DX] Simplify and unify agent configuration hierarchy to avoid silent override bugs | duplicate or superseded | Apr 28, 2026, 01:23 UTC | [closed/41736.md](https://github.com/openclaw/clawsweeper/blob/main/closed/41736.md) |
| [#41537](https://github.com/openclaw/openclaw/issues/41537) | openclaw doctor / configure reverts channels.telegram.dmPolicy from allowlist to pairing | already implemented on main | Apr 28, 2026, 01:23 UTC | [closed/41537.md](https://github.com/openclaw/clawsweeper/blob/main/closed/41537.md) |
| [#72519](https://github.com/openclaw/openclaw/pull/72519) | Cost estimate omits cache read tokens (cacheRead cost not applied... | duplicate or superseded | Apr 27, 2026, 10:50 UTC | [closed/72519.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72519.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72338.md) | complete | Apr 28, 2026, 02:03 UTC |
| [#71550](https://github.com/openclaw/openclaw/pull/71550) | feat(slack): expose channels.slack.logLevel so operators can silence socket-mode pong-timeout noise (#71531) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71550.md) | complete | Apr 28, 2026, 02:03 UTC |
| [#72376](https://github.com/openclaw/openclaw/pull/72376) | feat(memory-core): default to WAL journal mode | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72376.md) | complete | Apr 28, 2026, 02:03 UTC |
| [#71142](https://github.com/openclaw/openclaw/issues/71142) | Feature Request: Configurable upload size limit for Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71142.md) | complete | Apr 28, 2026, 02:02 UTC |
| [#59324](https://github.com/openclaw/openclaw/pull/59324) | fix(agents): prefer sessionKey in sessions_send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/59324.md) | complete | Apr 28, 2026, 02:02 UTC |
| [#71459](https://github.com/openclaw/openclaw/pull/71459) | fix(channels): improve error logging for bundled channel entry loading failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71459.md) | complete | Apr 28, 2026, 02:02 UTC |
| [#69472](https://github.com/openclaw/openclaw/pull/69472) | auto-reply: suppress reasoning-prefaced silent replies | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69472.md) | complete | Apr 28, 2026, 02:02 UTC |
| [#65914](https://github.com/openclaw/openclaw/pull/65914) | fix(memory): respect qmd status timeout and skip checkpoint exports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65914.md) | complete | Apr 28, 2026, 02:02 UTC |
| [#72268](https://github.com/openclaw/openclaw/pull/72268) | fix(exec): parse nested approval metadata in async followups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72268.md) | complete | Apr 28, 2026, 02:02 UTC |
| [#70864](https://github.com/openclaw/openclaw/pull/70864) | feat: add scoped mention pattern policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70864.md) | complete | Apr 28, 2026, 02:02 UTC |

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

`pnpm run audit` compares live GitHub state with generated records without moving
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
corepack enable
pnpm install
pnpm run build
pnpm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
pnpm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
pnpm run apply-artifacts -- --artifact-dir artifacts/reviews
pnpm run audit -- --max-pages 250 --sample-limit 25 --update-dashboard
pnpm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default; pass `apply_kind=issue` or `apply_kind=pull_request` to narrow a manual run.

## Checks

```bash
pnpm run check
pnpm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` pnpm package.
The `CI` GitHub Actions workflow runs `pnpm run check` on pushes, pull requests,
and manual dispatches.

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
