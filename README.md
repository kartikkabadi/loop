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

Last dashboard update: Apr 27, 2026, 03:21 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 03:21 UTC

State: Apply finished

Apply/comment-sync run finished with 9 fresh closes out of requested limit 9. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24974909142](https://github.com/openclaw/clawsweeper/actions/runs/24974909142)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3649 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3549 |
| Open items total | 7198 |
| Reviewed files | 7018 |
| Unreviewed open items | 180 |
| Archived closed files | 12763 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3594 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3418 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7012 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10098 |
| Failed or stale reviews | 6 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 204/750 current (546 due, 27.2%) |
| Hourly hot item cadence (<7d) | 204/750 current (546 due, 27.2%) |
| Daily cadence coverage | 4255/4404 current (149 due, 96.6%) |
| Daily PR cadence | 2904/3005 current (101 due, 96.6%) |
| Daily new issue cadence (<30d) | 1351/1399 current (48 due, 96.6%) |
| Weekly older issue cadence | 1864/1864 current (0 due, 100%) |
| Due now by cadence | 875 |

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

Latest review: Apr 27, 2026, 02:45 UTC. Latest close: Apr 27, 2026, 03:21 UTC. Latest comment sync: Apr 27, 2026, 03:21 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 9 | 9 | 0 |
| Last hour | 498 | 9 | 489 | 0 | 14 | 411 | 2 |
| Last 24 hours | 8666 | 1693 | 6973 | 3 | 1827 | 2395 | 5 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72434](https://github.com/openclaw/openclaw/issues/72434) | [Bug]: Regression in 2026.4.24: agent harness \"claude-cli\" is not registered, all gateway requests fail | already implemented on main | Apr 27, 2026, 03:21 UTC | [closed/72434.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72434.md) |
| [#71354](https://github.com/openclaw/openclaw/pull/71354) | fix: detect Tailscale runtime state even when config mode is off | duplicate or superseded | Apr 27, 2026, 03:21 UTC | [closed/71354.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71354.md) |
| [#66045](https://github.com/openclaw/openclaw/pull/66045) | fix(doctor): avoid false gateway entrypoint mismatches for dist aliases | duplicate or superseded | Apr 27, 2026, 03:21 UTC | [closed/66045.md](https://github.com/openclaw/clawsweeper/blob/main/closed/66045.md) |
| [#65809](https://github.com/openclaw/openclaw/pull/65809) | fix(slack): print manifest JSON outside framed note for easy copying | duplicate or superseded | Apr 27, 2026, 03:21 UTC | [closed/65809.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65809.md) |
| [#63046](https://github.com/openclaw/openclaw/pull/63046) | fix: image tool respects tools.media.image.timeoutSeconds config | duplicate or superseded | Apr 27, 2026, 03:20 UTC | [closed/63046.md](https://github.com/openclaw/clawsweeper/blob/main/closed/63046.md) |
| [#55095](https://github.com/openclaw/openclaw/issues/55095) | [Bug]: errorCode=INVALID_REQUEST errorMessage=missing scope: operator.write conn=28b5f2bb…fa4b id=d990912d…51f5 | duplicate or superseded | Apr 27, 2026, 03:20 UTC | [closed/55095.md](https://github.com/openclaw/clawsweeper/blob/main/closed/55095.md) |
| [#54837](https://github.com/openclaw/openclaw/issues/54837) | Slack: requireMention should suppress implicit thread mentions (multi-agent blocker) | already implemented on main | Apr 27, 2026, 03:20 UTC | [closed/54837.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54837.md) |
| [#54199](https://github.com/openclaw/openclaw/issues/54199) | [Bug]: OpenClaw 控制界面文件上传功能限制 - 只能上传图片文件 | already implemented on main | Apr 27, 2026, 03:20 UTC | [closed/54199.md](https://github.com/openclaw/clawsweeper/blob/main/closed/54199.md) |
| [#47994](https://github.com/openclaw/openclaw/pull/47994) | fix(agent): prevent fallback model from permanently overwriting agent config | already implemented on main | Apr 27, 2026, 03:20 UTC | [closed/47994.md](https://github.com/openclaw/clawsweeper/blob/main/closed/47994.md) |
| [#65938](https://github.com/openclaw/openclaw/pull/65938) | docs(providers): add Bedrock Mantle to provider index pages | already implemented on main | Apr 27, 2026, 02:30 UTC | [closed/65938.md](https://github.com/openclaw/clawsweeper/blob/main/closed/65938.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71653](https://github.com/openclaw/openclaw/pull/71653) | refactor: trim reply prompt hot path plumbing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71653.md) | complete | Apr 27, 2026, 02:45 UTC |
| [#72005](https://github.com/openclaw/openclaw/pull/72005) | feat: server-rendered status footer and context threshold warnings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72005.md) | complete | Apr 27, 2026, 02:45 UTC |
| [#71069](https://github.com/openclaw/openclaw/issues/71069) | [Bug]: Gemma4-26b-a4-it-gguf override is rejected and reverts to gpt-4o | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71069.md) | complete | Apr 27, 2026, 02:45 UTC |
| [#71545](https://github.com/openclaw/openclaw/pull/71545) | fix(mcp): auto-reinitialize streamable-http session on -32000 Server not initialized | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71545.md) | complete | Apr 27, 2026, 02:45 UTC |
| [#71696](https://github.com/openclaw/openclaw/pull/71696) | feat(telegram): add chat-type-based reply mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71696.md) | complete | Apr 27, 2026, 02:44 UTC |
| [#68554](https://github.com/openclaw/openclaw/pull/68554) | fix(sessions): remove redundant skipCache disk re-read inside session store lock | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68554.md) | complete | Apr 27, 2026, 02:44 UTC |
| [#70280](https://github.com/openclaw/openclaw/issues/70280) | [Feature]: Request for attribution: Dreaming memory system design derived from Nuwa (shierduan/Nuwa) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70280.md) | complete | Apr 27, 2026, 02:44 UTC |
| [#71605](https://github.com/openclaw/openclaw/issues/71605) | Gateway WS `agent` dispatch times out 60s + embedded mode contends with running daemon for session file locks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71605.md) | complete | Apr 27, 2026, 02:44 UTC |
| [#72314](https://github.com/openclaw/openclaw/pull/72314) | fix(auto-reply): dedupe idless inbound retries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72314.md) | complete | Apr 27, 2026, 02:44 UTC |
| [#72053](https://github.com/openclaw/openclaw/pull/72053) | fix(agents): dedupe subagent task in first user turn (#72019) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72053.md) | complete | Apr 27, 2026, 02:44 UTC |

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
