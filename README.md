# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently sweeps `openclaw/openclaw` and `openclaw/clawhub`.

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

Repository profiles can further narrow apply. ClawHub is intentionally stricter:
it reviews every issue and PR, but apply may close only PRs where current `main`
already implements the proposed change with source-backed evidence.

## Dashboard

Last dashboard update: Apr 28, 2026, 04:40 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 04:40 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25034212406](https://github.com/openclaw/clawsweeper/actions/runs/25034212406)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3575 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3477 |
| Open items total | 7052 |
| Reviewed files | 6585 |
| Unreviewed open items | 467 |
| Archived closed files | 13246 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3390 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3191 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6581 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10236 |
| Failed or stale reviews | 4 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 22/601 current (579 due, 3.7%) |
| Hourly hot item cadence (<7d) | 22/601 current (579 due, 3.7%) |
| Daily cadence coverage | 1392/4127 current (2735 due, 33.7%) |
| Daily PR cadence | 881/2854 current (1973 due, 30.9%) |
| Daily new issue cadence (<30d) | 511/1273 current (762 due, 40.1%) |
| Weekly older issue cadence | 1857/1857 current (0 due, 100%) |
| Due now by cadence | 3781 |

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
| [#56915](https://github.com/openclaw/openclaw/issues/56915) | Stale review | [Bug]: [Bug] Skills scanner ignores subdirectories under ~/.openclaw/skills/ | records/openclaw-openclaw/items/56915.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 28, 2026, 03:43 UTC. Latest close: Apr 28, 2026, 03:52 UTC. Latest comment sync: Apr 28, 2026, 03:52 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 121 | 5 | 116 | 0 | 11 | 11 | 0 |
| Last 24 hours | 2232 | 115 | 2117 | 2 | 93 | 1103 | 15 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72512](https://github.com/openclaw/openclaw/pull/72512) | fix(webchat): guard Enter-to-send when a request is already in flight (#72157) | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72512.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72512.md) |
| [#72507](https://github.com/openclaw/openclaw/issues/72507) | Bug: sessions.json grows unbounded due to static schema serialized into dynamic session state | duplicate or superseded | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72507.md) |
| [#72286](https://github.com/openclaw/openclaw/pull/72286) | Add Google Live browser Talk sessions | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72286.md) |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70597.md) |
| [#65147](https://github.com/openclaw/openclaw/pull/65147) | fix: add --force flag to npm install -g for container updates | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/65147.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65147.md) |
| [#64559](https://github.com/openclaw/openclaw/pull/64559) | fix(plugins): emit message_received hook for queued inbound messages (#64525) | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/64559.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64559.md) |
| [#62976](https://github.com/openclaw/openclaw/issues/62976) | Doctor cannot recover from invalid third-party plugin config; gateway hard-fails to start | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/62976.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62976.md) |
| [#54740](https://github.com/openclaw/openclaw/issues/54740) | doctor: 3 false positives make health output unusable on any non-trivial install | duplicate or superseded | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/54740.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54740.md) |
| [#54665](https://github.com/openclaw/openclaw/issues/54665) | [2026.3.24] FATAL ERROR: RegExpCompiler Allocation failed — gateway crashes on startup, OOM in V8 regex compiler | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/54665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54665.md) |
| [#41593](https://github.com/openclaw/openclaw/pull/41593) | fix(daemon): include OrbStack and Docker Desktop in macOS LaunchAgent PATH | duplicate or superseded | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/41593.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41593.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#66198](https://github.com/openclaw/openclaw/pull/66198) | security: wrap Signal inbound DM body via wrapExternalContent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66198.md) | complete | Apr 28, 2026, 03:43 UTC |
| [#64004](https://github.com/openclaw/openclaw/issues/64004) | [Bug]: Control UI remains slow although `sessions.list` returns quickly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64004.md) | complete | Apr 28, 2026, 03:43 UTC |
| [#66278](https://github.com/openclaw/openclaw/pull/66278) | fix(gateway): align OpenAI chat completions tool protocol | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66278.md) | complete | Apr 28, 2026, 03:43 UTC |
| [#68854](https://github.com/openclaw/openclaw/pull/68854) | fix(security): allow quoted heredocs in allowlist mode without extra approval | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68854.md) | complete | Apr 28, 2026, 03:43 UTC |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65486.md) | complete | Apr 28, 2026, 03:42 UTC |
| [#66499](https://github.com/openclaw/openclaw/pull/66499) | fix(gateway): WebSocket delta corruption with inline directive tags | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66499.md) | complete | Apr 28, 2026, 03:42 UTC |
| [#72513](https://github.com/openclaw/openclaw/pull/72513) | fix(mattermost): handle post_edited websocket events (#71930) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72513.md) | complete | Apr 28, 2026, 03:42 UTC |
| [#66836](https://github.com/openclaw/openclaw/pull/66836) | fix(sandbox): add configurable init timeout with cooperative abort | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66836.md) | complete | Apr 28, 2026, 03:42 UTC |
| [#70205](https://github.com/openclaw/openclaw/pull/70205) | fix(gateway): aggregate usage cost across agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70205.md) | complete | Apr 28, 2026, 03:42 UTC |
| [#64044](https://github.com/openclaw/openclaw/pull/64044) | fix(infra): upgrade base image from Debian 12 to Debian 13 (trixie) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64044.md) | complete | Apr 28, 2026, 03:42 UTC |

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
- Each shard checks out the selected target repository at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes a flat report under
  `records/<repo-slug>/items/<number>.md` with the decision, evidence,
  suggested comment, runtime metadata, and GitHub snapshot hash.
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
- Moves closed or already-closed reports to
  `records/<repo-slug>/closed/<number>.md`.
- Moves reopened archived reports back to the repo’s `items/` folder as stale.
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
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

### Audit

`pnpm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Protected proposed closes are reported only for active repo `items/` records
because archived repo `closed/` records are historical and cannot be applied.
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
pnpm run plan -- --target-repo openclaw/openclaw --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
pnpm run review -- --target-repo openclaw/openclaw --target-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
pnpm run apply-artifacts -- --target-repo openclaw/openclaw --artifact-dir artifacts/reviews
pnpm run audit -- --target-repo openclaw/openclaw --max-pages 250 --sample-limit 25 --update-dashboard
pnpm run reconcile -- --target-repo openclaw/openclaw --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default, subject to the selected repository profile; pass `target_repo`, `apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

Scheduled runs cover both configured profiles. `openclaw/openclaw` keeps the
existing cadence; `openclaw/clawhub` runs on offset review/apply/audit crons so
its reports live under `records/openclaw-clawhub/` without colliding with
default repo records.

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
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy target API calls, and apply/comment-sync jobs use the app token for comments and closes.

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
- write access to target repository issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
