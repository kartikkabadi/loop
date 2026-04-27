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

Last dashboard update: Apr 27, 2026, 01:08 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 01:09 UTC

State: Hot intake in progress

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24971849359](https://github.com/openclaw/clawsweeper/actions/runs/24971849359)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3685 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3551 |
| Open items total | 7236 |
| Reviewed files | 7122 |
| Unreviewed open items | 114 |
| Archived closed files | 12659 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3660 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3457 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7117 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10025 |
| Failed or stale reviews | 5 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 3/772 current (769 due, 0.4%) |
| Hourly hot item cadence (<7d) | 3/772 current (769 due, 0.4%) |
| Daily cadence coverage | 4227/4463 current (236 due, 94.7%) |
| Daily PR cadence | 2899/3029 current (130 due, 95.7%) |
| Daily new issue cadence (<30d) | 1328/1434 current (106 due, 92.6%) |
| Weekly older issue cadence | 1884/1887 current (3 due, 99.8%) |
| Due now by cadence | 1122 |

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

Latest review: Apr 27, 2026, 00:28 UTC. Latest close: Apr 27, 2026, 01:05 UTC. Latest comment sync: Apr 27, 2026, 01:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 7 | 6 | 1 |
| Last hour | 5 | 1 | 4 | 0 | 7 | 11 | 1 |
| Last 24 hours | 8585 | 1795 | 6790 | 3 | 2040 | 2303 | 9 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72430](https://github.com/openclaw/openclaw/issues/72430) | [Bug]: Windows: Slack channel fails to start with ESM URL error (`c:` protocol) in v2026.4.24 | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72430.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72430.md) |
| [#72429](https://github.com/openclaw/openclaw/issues/72429) | [Bug]: Duplication of messages with minmax 2.7 | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72429.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72429.md) |
| [#72395](https://github.com/openclaw/openclaw/issues/72395) | [Bug]: [Windows] ERR_UNSUPPORTED_ESM_URL_SCHEME — Discord channel and browser plugin fail to load on v2026.4.24 | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72395.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72395.md) |
| [#72184](https://github.com/openclaw/openclaw/issues/72184) | delivery-recovery on restart sends raw session context blob instead of original message | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/72184.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72184.md) |
| [#71860](https://github.com/openclaw/openclaw/pull/71860) | fix(heartbeat): keep successful exec completions internal | duplicate or superseded | Apr 27, 2026, 01:05 UTC | [closed/71860.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71860.md) |
| [#71084](https://github.com/openclaw/openclaw/issues/71084) | Question: should CLI-backed agents be allowed to trigger memoryFlush / preflightCompaction? | duplicate or superseded | Apr 27, 2026, 01:05 UTC | [closed/71084.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71084.md) |
| [#71018](https://github.com/openclaw/openclaw/issues/71018) | openclaw-lark 插件工具执行步骤不显示（工具執行区域始终显示'暂无工具步骤'） | already implemented on main | Apr 27, 2026, 01:05 UTC | [closed/71018.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71018.md) |
| [#72420](https://github.com/openclaw/openclaw/issues/72420) | Bonjour plugin crash-loops gateway on hosts without working multicast (2026.4.24) | already implemented on main | Apr 27, 2026, 00:02 UTC | [closed/72420.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72420.md) |
| [#72415](https://github.com/openclaw/openclaw/issues/72415) | [Bug]: ERR_MODULE_NOT_FOUND 'openclaw' still happening on 2026.4.22 (Telegram channel + scheduled cron) — same root cause as #71484, fix appears incomplete on upgrade path | already implemented on main | Apr 27, 2026, 00:02 UTC | [closed/72415.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72415.md) |
| [#72403](https://github.com/openclaw/openclaw/pull/72403) | Feature/bucky jarvis phase1 | belongs on ClawHub | Apr 27, 2026, 00:02 UTC | [closed/72403.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72403.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69400](https://github.com/openclaw/openclaw/issues/69400) | Feature: honor OPENCLAW_WRAPPER (or --wrapper) when generating LaunchAgent ProgramArguments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69400.md) | complete | Apr 27, 2026, 00:28 UTC |
| [#72434](https://github.com/openclaw/openclaw/issues/72434) | [Bug]: Regression in 2026.4.24: agent harness \"claude-cli\" is not registered, all gateway requests fail | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/72434.md) | complete | Apr 27, 2026, 00:12 UTC |
| [#10356](https://github.com/openclaw/openclaw/pull/10356) | TTS: add Typecast provider (emotion presets, audio tuning, Asian language voices) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/10356.md) | complete | Apr 27, 2026, 00:11 UTC |
| [#56532](https://github.com/openclaw/openclaw/pull/56532) | memory-lancedb: add configurable timeout/retry for embedding calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56532.md) | complete | Apr 27, 2026, 00:11 UTC |
| [#72436](https://github.com/openclaw/openclaw/pull/72436) | Add append-only session recovery log | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72436.md) | complete | Apr 27, 2026, 00:10 UTC |
| [#72132](https://github.com/openclaw/openclaw/pull/72132) | test(plugin-sdk): backfill DeepSeek V4 tool-call reasoning on large transcript (#71915) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72132.md) | complete | Apr 26, 2026, 23:59 UTC |
| [#72154](https://github.com/openclaw/openclaw/pull/72154) | docs(install): fix gog/goplaces release URLs in docker-vm-runtime example | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72154.md) | complete | Apr 26, 2026, 23:59 UTC |
| [#71699](https://github.com/openclaw/openclaw/issues/71699) | [Bug]: Gateway hard-crashes with 0xC0000409 (STATUS_STACK_BUFFER_OVERRUN) on Windows during Mattermost streaming reply; auto-respawn frequently wedges | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71699.md) | complete | Apr 26, 2026, 23:58 UTC |
| [#72080](https://github.com/openclaw/openclaw/issues/72080) | [Bug]: ACP child sessions report stopReason=\"stop\" with usage=0 before harness completes, causing parent agents to abandon mid-flight | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72080.md) | complete | Apr 26, 2026, 23:58 UTC |
| [#72214](https://github.com/openclaw/openclaw/issues/72214) | Telegram channel can stall gateway when Node fetch to api.telegram.org times out while curl -4 succeeds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72214.md) | complete | Apr 26, 2026, 23:58 UTC |

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
