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

Last dashboard update: Apr 27, 2026, 05:46 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 05:46 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 2 fresh all closes. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=63871,65750.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24978617852](https://github.com/openclaw/clawsweeper/actions/runs/24978617852)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3637 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3531 |
| Open items total | 7168 |
| Reviewed files | 6931 |
| Unreviewed open items | 237 |
| Archived closed files | 12850 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3561 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3368 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6929 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10149 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 3/732 current (729 due, 0.4%) |
| Hourly hot item cadence (<7d) | 3/732 current (729 due, 0.4%) |
| Daily cadence coverage | 3992/4343 current (351 due, 91.9%) |
| Daily PR cadence | 2696/2961 current (265 due, 91.1%) |
| Daily new issue cadence (<30d) | 1296/1382 current (86 due, 93.8%) |
| Weekly older issue cadence | 1856/1856 current (0 due, 100%) |
| Due now by cadence | 1317 |

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

Latest review: Apr 27, 2026, 05:35 UTC. Latest close: Apr 27, 2026, 05:25 UTC. Latest comment sync: Apr 27, 2026, 05:25 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 211 | 1 | 210 | 0 | 0 | 0 | 0 |
| Last hour | 998 | 25 | 973 | 0 | 19 | 711 | 5 |
| Last 24 hours | 8098 | 1517 | 6581 | 0 | 1226 | 2363 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#71190](https://github.com/openclaw/openclaw/issues/71190) | [Bug]: mergeOrphanedTrailingUserPrompt snowballs queued messages after abort — model re-answers on every turn | already implemented on main | Apr 27, 2026, 05:25 UTC | [closed/71190.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71190.md) |
| [#68293](https://github.com/openclaw/openclaw/pull/68293) | fix(systemd): use resolveSystemdServiceName in activate/uninstall | already implemented on main | Apr 27, 2026, 05:25 UTC | [closed/68293.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68293.md) |
| [#68227](https://github.com/openclaw/openclaw/pull/68227) | fix(protocol): require hello-ok auth | duplicate or superseded | Apr 27, 2026, 05:25 UTC | [closed/68227.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68227.md) |
| [#68154](https://github.com/openclaw/openclaw/issues/68154) | [Bug]: security audit false positive: plugins.allow_phantom_entries flags bundled plugins as phantom | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/68154.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68154.md) |
| [#67970](https://github.com/openclaw/openclaw/issues/67970) | Feature: built-in memory should support automatic context extraction and daily-log writing | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/67970.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67970.md) |
| [#67764](https://github.com/openclaw/openclaw/issues/67764) | [Feature]: Sessions UI should expose per-turn raw context and assembled model input | already implemented on main | Apr 27, 2026, 05:24 UTC | [closed/67764.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67764.md) |
| [#43954](https://github.com/openclaw/openclaw/pull/43954) | feat(feishu): add feishu_card tool for sending and updating interactive cards | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43954.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43954.md) |
| [#43901](https://github.com/openclaw/openclaw/pull/43901) | fix: remove L1 bootstrap snapshot cache to fix workspace file staleness | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43901.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43901.md) |
| [#43874](https://github.com/openclaw/openclaw/pull/43874) | feat(feishu): fix board tool SDK paths and add create_whiteboard action | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43874.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43874.md) |
| [#43789](https://github.com/openclaw/openclaw/pull/43789) | [AI-assisted] fix(agents): compact sandbox skill paths | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43789.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43789.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65180](https://github.com/openclaw/openclaw/pull/65180) | fix(cli,sessions): make local model run stateless by default and keep transcript fallback profile-scoped | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65180.md) | complete | Apr 27, 2026, 05:35 UTC |
| [#65374](https://github.com/openclaw/openclaw/issues/65374) | Bug: Built-in dreaming system contaminates agent identity in multi-agent setups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65374.md) | complete | Apr 27, 2026, 05:35 UTC |
| [#64784](https://github.com/openclaw/openclaw/issues/64784) | [Feature]: LINE sticker send/receive support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64784.md) | complete | Apr 27, 2026, 05:35 UTC |
| [#65383](https://github.com/openclaw/openclaw/pull/65383) | fix(imessage): avoid duplicate default watcher | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65383.md) | complete | Apr 27, 2026, 05:35 UTC |
| [#65058](https://github.com/openclaw/openclaw/pull/65058) | fix(googlechat): accept add-on space lifecycle payload variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65058.md) | complete | Apr 27, 2026, 05:35 UTC |
| [#64960](https://github.com/openclaw/openclaw/issues/64960) | Compaction fails permanently when Azure content filter blocks summarization — no model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64960.md) | complete | Apr 27, 2026, 05:34 UTC |
| [#65398](https://github.com/openclaw/openclaw/pull/65398) | fix(feishu): preserve top-level groupPolicy and avoid duplicate registration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65398.md) | complete | Apr 27, 2026, 05:34 UTC |
| [#65307](https://github.com/openclaw/openclaw/issues/65307) | [Critical Bug] Agent misinterprets opencli as openclaw and executes destructive npm uninstall without confirmation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65307.md) | complete | Apr 27, 2026, 05:34 UTC |
| [#65177](https://github.com/openclaw/openclaw/issues/65177) | [Bug]: openclaw doctor --fix does not migrate Feishu botName to name after upgrade to 2026.4.11 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65177.md) | complete | Apr 27, 2026, 05:34 UTC |
| [#64831](https://github.com/openclaw/openclaw/issues/64831) | [Bug]: Cron jobs run inconsistently, chat-triggered exec unstable, and missing catch-up delivery on Telegram | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64831.md) | complete | Apr 27, 2026, 05:34 UTC |

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
