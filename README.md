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

Last dashboard update: Apr 26, 2026, 06:28 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 06:28 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24950116103](https://github.com/openclaw/clawsweeper/actions/runs/24950116103)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4217 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4084 |
| Open items total | 8301 |
| Reviewed files | 8088 |
| Unreviewed open items | 213 |
| Archived closed files | 11209 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4110 |
| Proposed issue closes | 26 (0.6% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3921 |
| Proposed PR closes | 183 (4.7% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8031 |
| Proposed closes awaiting apply | 209 (2.6% of fresh reviews) |
| Closed by Codex apply | 8726 |
| Failed or stale reviews | 57 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 150/950 current (800 due, 15.8%) |
| Hourly hot item cadence (<7d) | 150/950 current (800 due, 15.8%) |
| Daily cadence coverage | 5032/5145 current (113 due, 97.8%) |
| Daily PR cadence | 3419/3511 current (92 due, 97.4%) |
| Daily new issue cadence (<30d) | 1613/1634 current (21 due, 98.7%) |
| Weekly older issue cadence | 1987/1993 current (6 due, 99.7%) |
| Due now by cadence | 1132 |

### Audit Health

<!-- clawsweeper-audit:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 06:24 UTC. Latest close: Apr 26, 2026, 06:26 UTC. Latest comment sync: Apr 26, 2026, 06:26 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 3 | 17 | 0 | 60 | 36 | 2 |
| Last hour | 790 | 299 | 491 | 2 | 68 | 133 | 7 |
| Last 24 hours | 10458 | 2322 | 8136 | 70 | 5226 | 1070 | 160 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71616](https://github.com/openclaw/openclaw/issues/71616) | Control UI: assistant replies not rendered until next user message is sent | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71616.md) | complete | Apr 26, 2026, 06:24 UTC |
| [#6975](https://github.com/openclaw/openclaw/issues/6975) | [Feature] Configurable reply context length for Telegram | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/6975.md) | complete | Apr 26, 2026, 06:24 UTC |
| [#71605](https://github.com/openclaw/openclaw/issues/71605) | Gateway WS `agent` dispatch times out 60s + embedded mode contends with running daemon for session file locks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71605.md) | complete | Apr 26, 2026, 06:24 UTC |
| [#71638](https://github.com/openclaw/openclaw/issues/71638) | Telegram extension: surface forward_from / via_bot / reply_to_message on MessageReceivedHookEvent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71638.md) | complete | Apr 26, 2026, 06:24 UTC |
| [#71612](https://github.com/openclaw/openclaw/pull/71612) | fix(loop-detection): reset toolCallHistory on long idle gaps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71612.md) | complete | Apr 26, 2026, 06:24 UTC |
| [#71609](https://github.com/openclaw/openclaw/issues/71609) | Control UI device token mismatch loop after scope upgrade causes rate-limit lockout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71609.md) | complete | Apr 26, 2026, 06:23 UTC |
| [#71593](https://github.com/openclaw/openclaw/issues/71593) | [Feature]: support to use plugin to implement secret ref provider and cover core schemas | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71593.md) | complete | Apr 26, 2026, 06:23 UTC |
| [#38780](https://github.com/openclaw/openclaw/pull/38780) | feat: context-pressure-aware continuation (CONTINUE_WORK / CONTINUE_DELEGATE) | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/38780.md) | complete | Apr 26, 2026, 06:23 UTC |
| [#71592](https://github.com/openclaw/openclaw/issues/71592) | TUI local mode advertises /status and /compact but falls through to model text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71592.md) | complete | Apr 26, 2026, 06:23 UTC |
| [#71636](https://github.com/openclaw/openclaw/pull/71636) | fix(config): make ModelProviderSchema.models optional to enable Ollama autodiscovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71636.md) | complete | Apr 26, 2026, 06:23 UTC |

</details>

## How It Works

ClawSweeper has two independent lanes.

### Review Lane

Review is proposal-only. It never closes items.

- A planner scans open issues and PRs, then assigns exact item numbers to shards.
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

Apply defaults to issue-only closes, no age floor, 2-second close delay, and
50 fresh closes per checkpoint. If it reaches the requested limit, it queues
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
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
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
