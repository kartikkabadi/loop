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

Last dashboard update: Apr 27, 2026, 10:26 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 10:26 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24989699373](https://github.com/openclaw/clawsweeper/actions/runs/24989699373)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3559 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3466 |
| Open items total | 7025 |
| Reviewed files | 6789 |
| Unreviewed open items | 236 |
| Archived closed files | 13026 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3484 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3301 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6785 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10200 |
| Failed or stale reviews | 4 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 38/711 current (673 due, 5.3%) |
| Hourly hot item cadence (<7d) | 38/711 current (673 due, 5.3%) |
| Daily cadence coverage | 1767/4230 current (2463 due, 41.8%) |
| Daily PR cadence | 1086/2899 current (1813 due, 37.5%) |
| Daily new issue cadence (<30d) | 681/1331 current (650 due, 51.2%) |
| Weekly older issue cadence | 1847/1848 current (1 due, 99.9%) |
| Due now by cadence | 3373 |

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

Latest review: Apr 27, 2026, 10:09 UTC. Latest close: Apr 27, 2026, 10:23 UTC. Latest comment sync: Apr 27, 2026, 10:25 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 3 | 385 | 0 |
| Last hour | 938 | 19 | 919 | 0 | 15 | 765 | 4 |
| Last 24 hours | 4096 | 563 | 3533 | 1 | 425 | 1654 | 14 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#68572](https://github.com/openclaw/openclaw/pull/68572) | feat(plugin-sdk): add delegated wait-run handle seam | duplicate or superseded | Apr 27, 2026, 10:23 UTC | [closed/68572.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68572.md) |
| [#68477](https://github.com/openclaw/openclaw/pull/68477) | feat(auth): add --profile to models auth login | duplicate or superseded | Apr 27, 2026, 10:22 UTC | [closed/68477.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68477.md) |
| [#68465](https://github.com/openclaw/openclaw/pull/68465) | fix(whatsapp): support silentErrorReplies parity | duplicate or superseded | Apr 27, 2026, 10:22 UTC | [closed/68465.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68465.md) |
| [#72494](https://github.com/openclaw/openclaw/pull/72494) | fix(plugins): fail loud on rejected registration gates | already implemented on main | Apr 27, 2026, 09:59 UTC | [closed/72494.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72494.md) |
| [#72487](https://github.com/openclaw/openclaw/pull/72487) | fix(qqbot): skip PlatformAdapter lookup in resolveQQBotAccount when adapter not registered (#72465) | duplicate or superseded | Apr 27, 2026, 09:59 UTC | [closed/72487.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72487.md) |
| [#72483](https://github.com/openclaw/openclaw/pull/72483) | Feature Request: Custom TUI Footer Fields for Cost/Balance/Rate L... | not actionable in this repository | Apr 27, 2026, 09:59 UTC | [closed/72483.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72483.md) |
| [#68589](https://github.com/openclaw/openclaw/pull/68589) | fix(cli): skip sessions warmup for non-TTY output | already implemented on main | Apr 27, 2026, 09:59 UTC | [closed/68589.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68589.md) |
| [#68445](https://github.com/openclaw/openclaw/pull/68445) | fix: exec tool gateway crash (#68376) and memory-core dreaming bloat (#68379) | already implemented on main | Apr 27, 2026, 09:59 UTC | [closed/68445.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68445.md) |
| [#68417](https://github.com/openclaw/openclaw/pull/68417) | fix(exec-approvals): allow ~/.openclaw symlink when OPENCLAW_STATE_DIR is set | duplicate or superseded | Apr 27, 2026, 09:59 UTC | [closed/68417.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68417.md) |
| [#68386](https://github.com/openclaw/openclaw/issues/68386) | Bug: Async command completion notification routed to wrong session (heartbeat instead of main) | already implemented on main | Apr 27, 2026, 09:59 UTC | [closed/68386.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68386.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68703](https://github.com/openclaw/openclaw/issues/68703) | [Bug]: Discord guild-admin actions execute without requester authorization checks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68703.md) | complete | Apr 27, 2026, 10:09 UTC |
| [#68618](https://github.com/openclaw/openclaw/issues/68618) | Feature request: sender name alias mapping for Feishu channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68618.md) | complete | Apr 27, 2026, 10:09 UTC |
| [#68656](https://github.com/openclaw/openclaw/issues/68656) | Slow startup on Windows (~39s before ready) with long silent gap before plugin registration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68656.md) | complete | Apr 27, 2026, 10:09 UTC |
| [#68667](https://github.com/openclaw/openclaw/pull/68667) | security(gateway): route hook completion events to the target agent's session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68667.md) | complete | Apr 27, 2026, 10:08 UTC |
| [#68909](https://github.com/openclaw/openclaw/pull/68909) | fix(daemon): probe system bus and cgroup-aware dedup for gateway status | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68909.md) | complete | Apr 27, 2026, 10:08 UTC |
| [#68734](https://github.com/openclaw/openclaw/pull/68734) | feat(hooks): allow prompt hooks to dynamically narrow tool + skill surface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68734.md) | complete | Apr 27, 2026, 10:08 UTC |
| [#68716](https://github.com/openclaw/openclaw/pull/68716) | fix: Discord guild-admin actions execute without requester... | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68716.md) | complete | Apr 27, 2026, 10:08 UTC |
| [#68714](https://github.com/openclaw/openclaw/pull/68714) | fix(config): openclaw.json written with 0664 mode instead of 0600 after hot-save | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68714.md) | complete | Apr 27, 2026, 10:08 UTC |
| [#68443](https://github.com/openclaw/openclaw/pull/68443) | feat(feishu): add list action to read chat history by container_id | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68443.md) | complete | Apr 27, 2026, 10:08 UTC |
| [#64126](https://github.com/openclaw/openclaw/pull/64126) | fix(diffs): reuse shared secret comparison helper for artifact token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64126.md) | complete | Apr 27, 2026, 10:08 UTC |

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
