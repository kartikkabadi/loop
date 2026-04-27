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

Last dashboard update: Apr 27, 2026, 07:11 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 07:11 UTC

State: Apply in progress

Checkpoint 2 finished. Fresh closes in checkpoint: 0. Total fresh closes in this run: 4/5. Result records in checkpoint: 0, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24981437187](https://github.com/openclaw/clawsweeper/actions/runs/24981437187)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3616 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3514 |
| Open items total | 7130 |
| Reviewed files | 6882 |
| Unreviewed open items | 248 |
| Archived closed files | 12899 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3543 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3333 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6876 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10166 |
| Failed or stale reviews | 6 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 35/720 current (685 due, 4.9%) |
| Hourly hot item cadence (<7d) | 35/720 current (685 due, 4.9%) |
| Daily cadence coverage | 3470/4310 current (840 due, 80.5%) |
| Daily PR cadence | 2193/2937 current (744 due, 74.7%) |
| Daily new issue cadence (<30d) | 1277/1373 current (96 due, 93%) |
| Weekly older issue cadence | 1852/1852 current (0 due, 100%) |
| Due now by cadence | 1773 |

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

Latest review: Apr 27, 2026, 07:00 UTC. Latest close: Apr 27, 2026, 07:11 UTC. Latest comment sync: Apr 27, 2026, 07:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 113 | 1 | 112 | 1 | 4 | 4 | 1 |
| Last hour | 1003 | 12 | 991 | 1 | 15 | 793 | 7 |
| Last 24 hours | 7152 | 1100 | 6052 | 4 | 948 | 2031 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#64714](https://github.com/openclaw/openclaw/issues/64714) | sessions_spawn rejects subagent runtime when streamTo is auto-filled by strict-mode providers | already implemented on main | Apr 27, 2026, 07:11 UTC | [closed/64714.md](https://github.com/openclaw/clawsweeper/blob/main/closed/64714.md) |
| [#53475](https://github.com/openclaw/openclaw/issues/53475) | [Bug] macOS LaunchAgent gateway does not respawn after SIGTERM; launchd reports 'domain in on-demand-only mode' | already implemented on main | Apr 27, 2026, 07:11 UTC | [closed/53475.md](https://github.com/openclaw/clawsweeper/blob/main/closed/53475.md) |
| [#43671](https://github.com/openclaw/openclaw/pull/43671) | fix: retry Ollama stream on empty responses (tool call parse failure) | already implemented on main | Apr 27, 2026, 07:11 UTC | [closed/43671.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43671.md) |
| [#43669](https://github.com/openclaw/openclaw/pull/43669) | fix: wait for agent idle after prompt to prevent auto-retry race | already implemented on main | Apr 27, 2026, 07:11 UTC | [closed/43669.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43669.md) |
| [#72433](https://github.com/openclaw/openclaw/pull/72433) | test(gateway): move SecretInputs probe auth regression | duplicate or superseded | Apr 27, 2026, 06:42 UTC | [closed/72433.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72433.md) |
| [#68179](https://github.com/openclaw/openclaw/pull/68179) | fix(discord): use normalized target in parseDiscordExplicitTarget | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/68179.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68179.md) |
| [#67959](https://github.com/openclaw/openclaw/pull/67959) | fix(channels): parallelize status probes | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/67959.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67959.md) |
| [#67924](https://github.com/openclaw/openclaw/pull/67924) | fix(exec): tolerate  inside Python/JS string literals during preflight | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/67924.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67924.md) |
| [#67335](https://github.com/openclaw/openclaw/issues/67335) | Bug: gateway LaunchAgent is sometimes removed from launchd domain and requires doctor/re-bootstrap | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/67335.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67335.md) |
| [#67292](https://github.com/openclaw/openclaw/pull/67292) | fix(openai-transport): handle Mistral reasoning_content as non-string delta content | duplicate or superseded | Apr 27, 2026, 06:42 UTC | [closed/67292.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67292.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64874](https://github.com/openclaw/openclaw/pull/64874) | Improve bootstrap file truncation visibility and edit failure diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64874.md) | complete | Apr 27, 2026, 07:00 UTC |
| [#63612](https://github.com/openclaw/openclaw/issues/63612) | Main session prompt crash: Cannot read properties of undefined (reading 'length') in compaction token estimation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63612.md) | complete | Apr 27, 2026, 07:00 UTC |
| [#64593](https://github.com/openclaw/openclaw/issues/64593) | Chromium child processes leak as zombies on normal exit (not just startup) → containers hit PID limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64593.md) | complete | Apr 27, 2026, 07:00 UTC |
| [#64950](https://github.com/openclaw/openclaw/issues/64950) | Model picker ignores models.mode=replace, shows full catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64950.md) | complete | Apr 27, 2026, 06:59 UTC |
| [#64217](https://github.com/openclaw/openclaw/issues/64217) | [Bug]: Source-dependent instructions/tools drift invalidates OpenAI prompt cache within the same session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64217.md) | complete | Apr 27, 2026, 06:59 UTC |
| [#64507](https://github.com/openclaw/openclaw/issues/64507) | Feature: Agent default delivery target for cross-session message calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64507.md) | complete | Apr 27, 2026, 06:59 UTC |
| [#64212](https://github.com/openclaw/openclaw/issues/64212) | [Bug]: Image tool fails with \"Request was aborted\" for NVIDIA Kimi K2.5 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64212.md) | complete | Apr 27, 2026, 06:59 UTC |
| [#64556](https://github.com/openclaw/openclaw/issues/64556) | [Bug]: hooks.mappings[].agentId and sessionKey silently ignored for action=\"wake\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64556.md) | complete | Apr 27, 2026, 06:59 UTC |
| [#72370](https://github.com/openclaw/openclaw/issues/72370) | Workspace hooks rejected as \"cannot override openclaw-managed hook code\" and replaced with empty managed versions (2026.4.23+) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72370.md) | complete | Apr 27, 2026, 06:59 UTC |
| [#64758](https://github.com/openclaw/openclaw/pull/64758) | fix: unblock steer-mode followups when active runs stop streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64758.md) | complete | Apr 27, 2026, 06:59 UTC |

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
