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

The dashboard reflects the most recently published target repository run.
Reports live under `records/<repo-slug>/items` and
`records/<repo-slug>/closed`, with each repo keeping a flat issue/PR list.

Last dashboard update: Apr 28, 2026, 02:30 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 02:40 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25030885772](https://github.com/openclaw/clawsweeper/actions/runs/25030885772)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3580 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3463 |
| Open items total | 7043 |
| Reviewed files | 6623 |
| Unreviewed open items | 420 |
| Archived closed files | 13208 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3404 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3216 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6620 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10233 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 48/622 current (574 due, 7.7%) |
| Hourly hot item cadence (<7d) | 48/622 current (574 due, 7.7%) |
| Daily cadence coverage | 1496/4145 current (2649 due, 36.1%) |
| Daily PR cadence | 939/2867 current (1928 due, 32.8%) |
| Daily new issue cadence (<30d) | 557/1278 current (721 due, 43.6%) |
| Weekly older issue cadence | 1856/1856 current (0 due, 100%) |
| Due now by cadence | 3643 |

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

Latest review: Apr 28, 2026, 02:15 UTC. Latest close: Apr 28, 2026, 02:26 UTC. Latest comment sync: Apr 28, 2026, 02:28 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 4 | 409 | 5 |
| Last hour | 416 | 8 | 408 | 0 | 5 | 411 | 5 |
| Last 24 hours | 2474 | 150 | 2324 | 1 | 91 | 1581 | 15 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72376](https://github.com/openclaw/openclaw/pull/72376) | feat(memory-core): default to WAL journal mode | already implemented on main | Apr 28, 2026, 02:26 UTC | [records/openclaw-openclaw/closed/72376.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72376.md) |
| [#70149](https://github.com/openclaw/openclaw/issues/70149) | [Bug]: WhatsApp login times out over ambient proxy-agent, while explicit HttpsProxyAgent can open the same WSS endpoint | already implemented on main | Apr 28, 2026, 02:26 UTC | [records/openclaw-openclaw/closed/70149.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70149.md) |
| [#69472](https://github.com/openclaw/openclaw/pull/69472) | auto-reply: suppress reasoning-prefaced silent replies | duplicate or superseded | Apr 28, 2026, 02:25 UTC | [records/openclaw-openclaw/closed/69472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69472.md) |
| [#66875](https://github.com/openclaw/openclaw/issues/66875) | Webchat race: chat final / session.message / sessions.changed triggers eager chat.history reload, causing flicker, collapse, or duplicate bubbles | already implemented on main | Apr 28, 2026, 02:25 UTC | [records/openclaw-openclaw/closed/66875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66875.md) |
| [#52291](https://github.com/openclaw/openclaw/pull/52291) | fix(ui): make ui:build work on Windows | already implemented on main | Apr 28, 2026, 02:00 UTC | [records/openclaw-openclaw/closed/52291.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52291.md) |
| [#72468](https://github.com/openclaw/openclaw/pull/72468) | fix(plugins): hard-fail invalid hook and memory capability registrations | already implemented on main | Apr 28, 2026, 01:24 UTC | [records/openclaw-openclaw/closed/72468.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72468.md) |
| [#62482](https://github.com/openclaw/openclaw/pull/62482) | fix: refresh subsystem file loggers across daily log rollovers [AI-assisted] | already implemented on main | Apr 28, 2026, 01:24 UTC | [records/openclaw-openclaw/closed/62482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62482.md) |
| [#43141](https://github.com/openclaw/openclaw/issues/43141) | Queued cron-lane runs are not abort-aware and can time out before model invocation | already implemented on main | Apr 28, 2026, 01:24 UTC | [records/openclaw-openclaw/closed/43141.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43141.md) |
| [#41936](https://github.com/openclaw/openclaw/pull/41936) | feat(models): support provider connect timeout | already implemented on main | Apr 28, 2026, 01:24 UTC | [records/openclaw-openclaw/closed/41936.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41936.md) |
| [#41809](https://github.com/openclaw/openclaw/pull/41809) | feat(config): add agents.defaults.reasoningDefault config key | duplicate or superseded | Apr 28, 2026, 01:24 UTC | [records/openclaw-openclaw/closed/41809.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41809.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72129](https://github.com/openclaw/openclaw/pull/72129) | feat(huggingface): add text-to-image generation via hf-inference Inference Providers route | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72129.md) | complete | Apr 28, 2026, 02:15 UTC |
| [#71820](https://github.com/openclaw/openclaw/pull/71820) | feat(bluebubbles): add reply-context API fallback for cache misses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71820.md) | complete | Apr 28, 2026, 02:15 UTC |
| [#67572](https://github.com/openclaw/openclaw/pull/67572) | [Feat] Gateway: offload non-image attachments on chat.send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67572.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#71736](https://github.com/openclaw/openclaw/issues/71736) | [RFC] Control UI plugin contribution slots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71736.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#69056](https://github.com/openclaw/openclaw/pull/69056) | fix(gateway): handle SIGUSR1 gracefully on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69056.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#63463](https://github.com/openclaw/openclaw/issues/63463) | MLX routing fails: model_not_found + fallback despite direct MLX API success | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63463.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#71744](https://github.com/openclaw/openclaw/issues/71744) | [Bug]: Watchdog fallback chain silently drops primary-failure root cause when fallback also fails - only terminal error surfaces in runtime_events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71744.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#66985](https://github.com/openclaw/openclaw/pull/66985) | fix(agents): resolve requestedNode to canonical ID before boundNode comparison | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66985.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#68280](https://github.com/openclaw/openclaw/pull/68280) | fix(gateway): fail fast on missing local probe auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68280.md) | complete | Apr 28, 2026, 02:14 UTC |
| [#70586](https://github.com/openclaw/openclaw/pull/70586) | fix(slack): fire trackEvent from message events for socket-health liveness (follow-up to #69833) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70586.md) | complete | Apr 28, 2026, 02:14 UTC |

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
