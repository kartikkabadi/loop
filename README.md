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

Last dashboard update: Apr 27, 2026, 08:09 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 08:08 UTC

State: Review publish complete

Merged review artifacts for run 24982810262. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24982810262](https://github.com/openclaw/clawsweeper/actions/runs/24982810262)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3594 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3502 |
| Open items total | 7096 |
| Reviewed files | 6863 |
| Unreviewed open items | 233 |
| Archived closed files | 12935 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3529 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3327 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6856 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10176 |
| Failed or stale reviews | 7 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 126/717 current (591 due, 17.6%) |
| Hourly hot item cadence (<7d) | 126/717 current (591 due, 17.6%) |
| Daily cadence coverage | 2997/4293 current (1296 due, 69.8%) |
| Daily PR cadence | 1741/2929 current (1188 due, 59.4%) |
| Daily new issue cadence (<30d) | 1256/1364 current (108 due, 92.1%) |
| Weekly older issue cadence | 1853/1853 current (0 due, 100%) |
| Due now by cadence | 2120 |

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

Latest review: Apr 27, 2026, 08:06 UTC. Latest close: Apr 27, 2026, 08:02 UTC. Latest comment sync: Apr 27, 2026, 07:47 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 196 | 1 | 195 | 1 | 8 | 0 | 0 |
| Last hour | 1016 | 16 | 1000 | 1 | 11 | 710 | 4 |
| Last 24 hours | 6569 | 1000 | 5569 | 5 | 862 | 1858 | 9 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72460](https://github.com/openclaw/openclaw/pull/72460) | fix(gateway): align UI thinking default with runtime resolver | already implemented on main | Apr 27, 2026, 08:02 UTC | [closed/72460.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72460.md) |
| [#72458](https://github.com/openclaw/openclaw/pull/72458) | Fix/skills snapshot stale after restart | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72458.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72458.md) |
| [#72457](https://github.com/openclaw/openclaw/pull/72457) | Fix/onboard trim typeerror | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72457.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72457.md) |
| [#72456](https://github.com/openclaw/openclaw/pull/72456) | Fix/minimax m2.7 vlm support | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72456.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72456.md) |
| [#72453](https://github.com/openclaw/openclaw/pull/72453) | Fix/freebsd homebrew onboard | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72453.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72453.md) |
| [#72451](https://github.com/openclaw/openclaw/pull/72451) | Fix/exec approvals source field | already implemented on main | Apr 27, 2026, 08:01 UTC | [closed/72451.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72451.md) |
| [#72447](https://github.com/openclaw/openclaw/issues/72447) | Feature: Typing indicator during agent active processing | already implemented on main | Apr 27, 2026, 08:01 UTC | [closed/72447.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72447.md) |
| [#72444](https://github.com/openclaw/openclaw/pull/72444) | fix: follow symlinks to plugin directories in global extensions | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72444.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72444.md) |
| [#71349](https://github.com/openclaw/openclaw/issues/71349) | memory-lancedb: autoCapture rarely fires; only 2 entries persisted across many sessions | already implemented on main | Apr 27, 2026, 07:41 UTC | [closed/71349.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71349.md) |
| [#67207](https://github.com/openclaw/openclaw/pull/67207) | fix(discord): add regression tests and diagnostics for https URL preservation | cannot reproduce on current main | Apr 27, 2026, 07:41 UTC | [closed/67207.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67207.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67910](https://github.com/openclaw/openclaw/pull/67910) | fix(memory status): show light/deep/rem dreaming phase state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67910.md) | complete | Apr 27, 2026, 08:06 UTC |
| [#42978](https://github.com/openclaw/openclaw/pull/42978) | fix(auth): add bailian to PROVIDER_ENV_API_KEY_CANDIDATES | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42978.md) | complete | Apr 27, 2026, 08:04 UTC |
| [#42294](https://github.com/openclaw/openclaw/pull/42294) | fix(telegram): preserve audioAsVoice in outbound media sends | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42294.md) | failed | Apr 27, 2026, 08:02 UTC |
| [#67990](https://github.com/openclaw/openclaw/issues/67990) | Proposal: Improved Backup Design with Configurable Exclusion Rules and Service-Aware Archiving | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67990.md) | complete | Apr 27, 2026, 07:59 UTC |
| [#68116](https://github.com/openclaw/openclaw/pull/68116) | feat(memory-lancedb): support reindex and drop-index command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68116.md) | complete | Apr 27, 2026, 07:59 UTC |
| [#67690](https://github.com/openclaw/openclaw/issues/67690) | Feature request: Improve context pruning/trimming mechanism visibility and control | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67690.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#68209](https://github.com/openclaw/openclaw/issues/68209) | [Bug]: Switching from openai-codex/gpt-5.4 to codex/gpt-5.4 can trigger runaway context growth and off-task workspace contamination | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68209.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#68037](https://github.com/openclaw/openclaw/issues/68037) | HTTP MCP gateway strips image/audio/resource fields from tool results (normalizeToolCallContent) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68037.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#72216](https://github.com/openclaw/openclaw/pull/72216) | fix(nostr): keep setup status off full surface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72216.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#68115](https://github.com/openclaw/openclaw/issues/68115) | [Feature]: First-class tool-plugin setup hook for global `openclaw setup` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68115.md) | complete | Apr 27, 2026, 07:58 UTC |

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
