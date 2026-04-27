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

Last dashboard update: Apr 27, 2026, 09:40 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 09:40 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 18. Item numbers: 53742,67595,70651,72189,72365,72468,72476,72478,72480,72482,72483,72484,72485,72486,72487,72489,72490,72491,72494,72495.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24987364711](https://github.com/openclaw/clawsweeper/actions/runs/24987364711)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3581 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3483 |
| Open items total | 7064 |
| Reviewed files | 6832 |
| Unreviewed open items | 232 |
| Archived closed files | 12983 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3504 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3318 |
| Proposed PR closes | 4 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6822 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10182 |
| Failed or stale reviews | 10 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 94/722 current (628 due, 13%) |
| Hourly hot item cadence (<7d) | 94/722 current (628 due, 13%) |
| Daily cadence coverage | 1666/4257 current (2591 due, 39.1%) |
| Daily PR cadence | 1022/2911 current (1889 due, 35.1%) |
| Daily new issue cadence (<30d) | 644/1346 current (702 due, 47.8%) |
| Weekly older issue cadence | 1853/1853 current (0 due, 100%) |
| Due now by cadence | 3451 |

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

Latest review: Apr 27, 2026, 09:36 UTC. Latest close: Apr 27, 2026, 09:22 UTC. Latest comment sync: Apr 27, 2026, 09:40 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 4 | 16 | 0 | 0 | 19 | 2 |
| Last hour | 525 | 6 | 519 | 1 | 2 | 781 | 13 |
| Last 24 hours | 4328 | 628 | 3700 | 5 | 535 | 1803 | 20 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72206](https://github.com/openclaw/openclaw/issues/72206) | New claude-cli live session fails immediately with FailoverError while session reuse succeeds | already implemented on main | Apr 27, 2026, 09:22 UTC | [closed/72206.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72206.md) |
| [#72466](https://github.com/openclaw/openclaw/pull/72466) | Add denylist support for exec approvals (block high-risk commands by pattern) | duplicate or superseded | Apr 27, 2026, 09:03 UTC | [closed/72466.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72466.md) |
| [#43288](https://github.com/openclaw/openclaw/issues/43288) | CLI backend: pickSessionId accepts non-UUID strings like 'rate-limited' causing resume failure | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/43288.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43288.md) |
| [#42680](https://github.com/openclaw/openclaw/pull/42680) | fix(cron): start job timeout after execution begins, not at enqueue time | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/42680.md](https://github.com/openclaw/clawsweeper/blob/main/closed/42680.md) |
| [#42531](https://github.com/openclaw/openclaw/pull/42531) | fix(memory-lancedb): preserve dimensions for baseUrl embeddings | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/42531.md](https://github.com/openclaw/clawsweeper/blob/main/closed/42531.md) |
| [#40446](https://github.com/openclaw/openclaw/pull/40446) | feat(agents): add passive execution health monitoring for death spiral detection | belongs on ClawHub | Apr 27, 2026, 08:23 UTC | [closed/40446.md](https://github.com/openclaw/clawsweeper/blob/main/closed/40446.md) |
| [#72460](https://github.com/openclaw/openclaw/pull/72460) | fix(gateway): align UI thinking default with runtime resolver | already implemented on main | Apr 27, 2026, 08:02 UTC | [closed/72460.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72460.md) |
| [#72458](https://github.com/openclaw/openclaw/pull/72458) | Fix/skills snapshot stale after restart | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72458.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72458.md) |
| [#72457](https://github.com/openclaw/openclaw/pull/72457) | Fix/onboard trim typeerror | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72457.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72457.md) |
| [#72456](https://github.com/openclaw/openclaw/pull/72456) | Fix/minimax m2.7 vlm support | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72456.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72456.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72487](https://github.com/openclaw/openclaw/pull/72487) | fix(qqbot): skip PlatformAdapter lookup in resolveQQBotAccount when adapter not registered (#72465) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72487.md) | complete | Apr 27, 2026, 09:36 UTC |
| [#72189](https://github.com/openclaw/openclaw/pull/72189) | fix(realtime-voice): continue Google Live consult responses | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/72189.md) | complete | Apr 27, 2026, 09:36 UTC |
| [#53742](https://github.com/openclaw/openclaw/issues/53742) | Bug: macOS gateway install --force resolves SecretRef values into plaintext LaunchAgent plist and triggers token mismatch loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53742.md) | complete | Apr 27, 2026, 09:36 UTC |
| [#72476](https://github.com/openclaw/openclaw/pull/72476) | Pass through configured thinking budgets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72476.md) | complete | Apr 27, 2026, 09:36 UTC |
| [#72494](https://github.com/openclaw/openclaw/pull/72494) | fix(plugins): fail loud on rejected registration gates | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72494.md) | complete | Apr 27, 2026, 09:35 UTC |
| [#72468](https://github.com/openclaw/openclaw/pull/72468) | fix(plugins): hard-fail invalid hook and memory capability registrations | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72468.md) | complete | Apr 27, 2026, 09:35 UTC |
| [#72489](https://github.com/openclaw/openclaw/pull/72489) | docs(whatsapp): add 408 disconnect runbook (Fixes #72262) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72489.md) | complete | Apr 27, 2026, 09:35 UTC |
| [#72478](https://github.com/openclaw/openclaw/issues/72478) | Google Meet: support reliable headless agent join with audio/transcription health checks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72478.md) | complete | Apr 27, 2026, 09:35 UTC |
| [#72365](https://github.com/openclaw/openclaw/issues/72365) | [Bug]: Regression: Control UI / gateway becomes unresponsive for 30-45s during chat runs after v2026.4.14 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72365.md) | complete | Apr 27, 2026, 09:35 UTC |
| [#72485](https://github.com/openclaw/openclaw/pull/72485) | Optimize QMD multi-collection memory search | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72485.md) | complete | Apr 27, 2026, 09:35 UTC |

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
