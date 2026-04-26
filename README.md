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

## Dashboard

Last dashboard update: Apr 26, 2026, 22:01 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 22:01 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 7. Total fresh closes in this run: 7/9. Result records in checkpoint: 16, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24968090172](https://github.com/openclaw/clawsweeper/actions/runs/24968090172)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3694 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3531 |
| Open items total | 7225 |
| Reviewed files | 7150 |
| Unreviewed open items | 75 |
| Archived closed files | 12596 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3677 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3470 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7147 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10000 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 471/777 current (306 due, 60.6%) |
| Hourly hot item cadence (<7d) | 471/777 current (306 due, 60.6%) |
| Daily cadence coverage | 4419/4487 current (68 due, 98.5%) |
| Daily PR cadence | 2988/3046 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1431/1441 current (10 due, 99.3%) |
| Weekly older issue cadence | 1886/1886 current (0 due, 100%) |
| Due now by cadence | 449 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 26, 2026, 18:26 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7283 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 2 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 2 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | Protected proposed close | feat(whatsapp): add reply quoting via replyToMode | closed/57413.md |
| [#60460](https://github.com/openclaw/openclaw/pull/60460) | Protected proposed close | Enforce browser profile CDP policy | closed/60460.md |
| [#61960](https://github.com/openclaw/openclaw/pull/61960) | Stale review | docs: require i18n postprocess before skip | items/61960.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 21:57 UTC. Latest close: Apr 26, 2026, 22:01 UTC. Latest comment sync: Apr 26, 2026, 22:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 500 | 9 | 491 | 0 | 8 | 8 | 2 |
| Last hour | 1040 | 16 | 1024 | 0 | 32 | 65 | 3 |
| Last 24 hours | 9643 | 2465 | 7178 | 1 | 2069 | 2158 | 12 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72321](https://github.com/openclaw/openclaw/issues/72321) | Context usage % display bug: cumulative cacheRead/cacheWrite divided by context window size instead of current conversation tokens | already implemented on main | Apr 26, 2026, 22:01 UTC | [closed/72321.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72321.md) |
| [#72282](https://github.com/openclaw/openclaw/issues/72282) | [Bug]: Mattermost channel messages no longer received via WebSocket — regression in 2026.4.24 (DMs still work) | duplicate or superseded | Apr 26, 2026, 22:01 UTC | [closed/72282.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72282.md) |
| [#71612](https://github.com/openclaw/openclaw/pull/71612) | fix(loop-detection): reset toolCallHistory on long idle gaps | already implemented on main | Apr 26, 2026, 22:01 UTC | [closed/71612.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71612.md) |
| [#70590](https://github.com/openclaw/openclaw/issues/70590) | [Feature]: Solve the problem of hard-coded language | duplicate or superseded | Apr 26, 2026, 22:00 UTC | [closed/70590.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70590.md) |
| [#70003](https://github.com/openclaw/openclaw/issues/70003) | Support concurrent user turns during long-running tool execution | already implemented on main | Apr 26, 2026, 22:00 UTC | [closed/70003.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70003.md) |
| [#69931](https://github.com/openclaw/openclaw/issues/69931) | [Bug]: Detecting which historical message you attached an emoji to | duplicate or superseded | Apr 26, 2026, 22:00 UTC | [closed/69931.md](https://github.com/openclaw/clawsweeper/blob/main/closed/69931.md) |
| [#40286](https://github.com/openclaw/openclaw/pull/40286) | fix(slack): keep replies flowing for oversized file uploads | duplicate or superseded | Apr 26, 2026, 22:00 UTC | [closed/40286.md](https://github.com/openclaw/clawsweeper/blob/main/closed/40286.md) |
| [#38160](https://github.com/openclaw/openclaw/pull/38160) | feat(agents): local model fallback + semantic cache store | belongs on ClawHub | Apr 26, 2026, 21:50 UTC | [closed/38160.md](https://github.com/openclaw/clawsweeper/blob/main/closed/38160.md) |
| [#72356](https://github.com/openclaw/openclaw/issues/72356) | [Bug]: Double Messages | already implemented on main | Apr 26, 2026, 21:37 UTC | [closed/72356.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72356.md) |
| [#72354](https://github.com/openclaw/openclaw/issues/72354) | Subagent result exists but requester reports \"aborted/no result\" due to completion announce timeout (Telegram) | already implemented on main | Apr 26, 2026, 21:37 UTC | [closed/72354.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72354.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71113](https://github.com/openclaw/openclaw/pull/71113) | CI: add AGENTS.md size guard to check-additional | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71113.md) | complete | Apr 26, 2026, 21:57 UTC |
| [#72058](https://github.com/openclaw/openclaw/issues/72058) | [Bug]: npm deps are missing after update to 24.04.2026 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72058.md) | complete | Apr 26, 2026, 21:57 UTC |
| [#70473](https://github.com/openclaw/openclaw/pull/70473) | fix(agents): derive overflow budgets from provider errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70473.md) | complete | Apr 26, 2026, 21:57 UTC |
| [#70420](https://github.com/openclaw/openclaw/issues/70420) | Discord health monitor reports restart but active sessions are not recreated, making session-based checks look disconnected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70420.md) | complete | Apr 26, 2026, 21:56 UTC |
| [#72342](https://github.com/openclaw/openclaw/pull/72342) | fix(codex): default app-server to guardian mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72342.md) | complete | Apr 26, 2026, 21:56 UTC |
| [#70888](https://github.com/openclaw/openclaw/pull/70888) | fix: restore explicit requester depth lookup without cfg | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70888.md) | complete | Apr 26, 2026, 21:56 UTC |
| [#70407](https://github.com/openclaw/openclaw/issues/70407) | Breaking config change in v2026.4.21: dreaming.storage schema migration breaks CLI on upgrade | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70407.md) | complete | Apr 26, 2026, 21:56 UTC |
| [#72114](https://github.com/openclaw/openclaw/issues/72114) | update.run: bundled runtime deps staging timeout + shutdown race condition causes gateway crash on cold cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72114.md) | complete | Apr 26, 2026, 21:56 UTC |
| [#71569](https://github.com/openclaw/openclaw/issues/71569) | Mattermost streaming config: documented but not implemented + notification UX bug | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71569.md) | complete | Apr 26, 2026, 21:56 UTC |
| [#71770](https://github.com/openclaw/openclaw/issues/71770) | Feature Request: Automatic Token-Based Model Failover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71770.md) | complete | Apr 26, 2026, 21:56 UTC |

</details>

## How It Works

ClawSweeper has two independent lanes.

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

Cadence:

- hourly for items with activity since the last snapshot
- hourly for anything created in the last 7 days
- daily for older PRs and issues younger than 30 days
- weekly for older inactive issues
- immediate-ish hot intake every 5 minutes for newest/active items

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

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
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
