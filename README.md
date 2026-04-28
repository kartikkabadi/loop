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

Last dashboard update: Apr 27, 2026, 11:22 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 01:21 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25028648434](https://github.com/openclaw/clawsweeper/actions/runs/25028648434)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3546 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3457 |
| Open items total | 7003 |
| Reviewed files | 6771 |
| Unreviewed open items | 232 |
| Archived closed files | 13060 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3478 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3290 |
| Proposed PR closes | 4 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6768 |
| Proposed closes awaiting apply | 8 (0.1% of fresh reviews) |
| Closed by Codex apply | 10217 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 28/718 current (690 due, 3.9%) |
| Hourly hot item cadence (<7d) | 28/718 current (690 due, 3.9%) |
| Daily cadence coverage | 1821/4204 current (2383 due, 43.3%) |
| Daily PR cadence | 1157/2882 current (1725 due, 40.1%) |
| Daily new issue cadence (<30d) | 664/1322 current (658 due, 50.2%) |
| Weekly older issue cadence | 1849/1849 current (0 due, 100%) |
| Due now by cadence | 3305 |

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

Latest review: Apr 27, 2026, 11:08 UTC. Latest close: Apr 27, 2026, 10:50 UTC. Latest comment sync: Apr 27, 2026, 11:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 12 | 0 | 12 | 0 | 0 | 417 | 2 |
| Last hour | 890 | 26 | 864 | 0 | 13 | 970 | 4 |
| Last 24 hours | 4119 | 481 | 3638 | 1 | 341 | 1777 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72519](https://github.com/openclaw/openclaw/pull/72519) | Cost estimate omits cache read tokens (cacheRead cost not applied... | duplicate or superseded | Apr 27, 2026, 10:50 UTC | [closed/72519.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72519.md) |
| [#72517](https://github.com/openclaw/openclaw/pull/72517) | Add session cost to /status output | not actionable | Apr 27, 2026, 10:50 UTC | [closed/72517.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72517.md) |
| [#72505](https://github.com/openclaw/openclaw/issues/72505) | Gateway infinite loop during initialization on v2026.4.23+ (CPU 100%+, never reaches HTTP bind) | already implemented on main | Apr 27, 2026, 10:50 UTC | [closed/72505.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72505.md) |
| [#72497](https://github.com/openclaw/openclaw/issues/72497) | [Bug]: Tool calls invisible in Telegram DM despite verbose: on — user cannot see agent activity | already implemented on main | Apr 27, 2026, 10:50 UTC | [closed/72497.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72497.md) |
| [#68878](https://github.com/openclaw/openclaw/pull/68878) | [codex] Optimize gateway session listing before full row construction | duplicate or superseded | Apr 27, 2026, 10:50 UTC | [closed/68878.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68878.md) |
| [#68866](https://github.com/openclaw/openclaw/pull/68866) | fix(auth): invalidate stale runtime auth snapshots when auth files change | already implemented on main | Apr 27, 2026, 10:50 UTC | [closed/68866.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68866.md) |
| [#68865](https://github.com/openclaw/openclaw/pull/68865) | fix(feishu): add application-level WebSocket reconnection with backoff | duplicate or superseded | Apr 27, 2026, 10:50 UTC | [closed/68865.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68865.md) |
| [#68831](https://github.com/openclaw/openclaw/pull/68831) | perf: share JITI instances across plugins with identical alias configs | already implemented on main | Apr 27, 2026, 10:49 UTC | [closed/68831.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68831.md) |
| [#68611](https://github.com/openclaw/openclaw/issues/68611) | [Bug]: WebChat CLI runner — assistant replies invisible + user messages erased after each turn | already implemented on main | Apr 27, 2026, 10:49 UTC | [closed/68611.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68611.md) |
| [#66515](https://github.com/openclaw/openclaw/pull/66515) | feat: add YandexGPT as native provider via Yandex AI Studio | belongs on ClawHub | Apr 27, 2026, 10:49 UTC | [closed/66515.md](https://github.com/openclaw/clawsweeper/blob/main/closed/66515.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#53989](https://github.com/openclaw/openclaw/issues/53989) | Slack event dispatch broken after 2026.3.23-1 → 2026.3.23-2 update (regression) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/53989.md) | complete | Apr 27, 2026, 11:08 UTC |
| [#67466](https://github.com/openclaw/openclaw/pull/67466) | fix(feishu): reduce startup latency by parallelizing probe and capping timeouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67466.md) | complete | Apr 27, 2026, 11:08 UTC |
| [#65691](https://github.com/openclaw/openclaw/pull/65691) | feat(slack): add message search support via search.messages API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65691.md) | complete | Apr 27, 2026, 11:08 UTC |
| [#67244](https://github.com/openclaw/openclaw/issues/67244) | Explicit ACP agent runs: embedded backend visibility failure and stale final JSON state after sessions_yield | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67244.md) | complete | Apr 27, 2026, 11:07 UTC |
| [#65983](https://github.com/openclaw/openclaw/issues/65983) | Background PTY exec runs can survive restart/session loss and become untracked orphan process trees | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65983.md) | complete | Apr 27, 2026, 11:07 UTC |
| [#67477](https://github.com/openclaw/openclaw/pull/67477) | fix(whatsapp): emit hooks for auto-replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67477.md) | complete | Apr 27, 2026, 11:07 UTC |
| [#67587](https://github.com/openclaw/openclaw/issues/67587) | Discord outbound messages should reliably convert known @AgentName references into real <@userId> mentions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67587.md) | complete | Apr 27, 2026, 11:07 UTC |
| [#72476](https://github.com/openclaw/openclaw/pull/72476) | Pass through configured thinking budgets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72476.md) | complete | Apr 27, 2026, 11:07 UTC |
| [#67761](https://github.com/openclaw/openclaw/pull/67761) | fix: remove truncated preview from inbound system events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67761.md) | complete | Apr 27, 2026, 11:07 UTC |
| [#67393](https://github.com/openclaw/openclaw/issues/67393) | [Bug]: Massive virtual memory bloat (22GB+ VIRT) immediately after Gateway startup, identical to previously reported issue #6413. This issue was closed as \"not planned\" but the problem persists on the latest stable release. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67393.md) | complete | Apr 27, 2026, 11:07 UTC |

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
