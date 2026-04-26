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

Last dashboard update: Apr 26, 2026, 21:50 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 21:50 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 1. Total fresh closes in this run: 1/1. Result records in checkpoint: 2, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24967892820](https://github.com/openclaw/clawsweeper/actions/runs/24967892820)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3698 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3533 |
| Open items total | 7231 |
| Reviewed files | 7143 |
| Unreviewed open items | 88 |
| Archived closed files | 12586 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3670 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3468 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7138 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 9993 |
| Failed or stale reviews | 5 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 21/768 current (747 due, 2.7%) |
| Hourly hot item cadence (<7d) | 21/768 current (747 due, 2.7%) |
| Daily cadence coverage | 4421/4489 current (68 due, 98.5%) |
| Daily PR cadence | 2991/3049 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1430/1440 current (10 due, 99.3%) |
| Weekly older issue cadence | 1886/1886 current (0 due, 100%) |
| Due now by cadence | 903 |

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

Latest review: Apr 26, 2026, 21:43 UTC. Latest close: Apr 26, 2026, 21:50 UTC. Latest comment sync: Apr 26, 2026, 21:50 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 445 | 1 | 444 | 0 | 7 | 2 | 0 |
| Last hour | 541 | 7 | 534 | 0 | 25 | 61 | 1 |
| Last 24 hours | 9655 | 2485 | 7170 | 3 | 2062 | 2170 | 10 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#38160](https://github.com/openclaw/openclaw/pull/38160) | feat(agents): local model fallback + semantic cache store | belongs on ClawHub | Apr 26, 2026, 21:50 UTC | [closed/38160.md](https://github.com/openclaw/clawsweeper/blob/main/closed/38160.md) |
| [#72356](https://github.com/openclaw/openclaw/issues/72356) | [Bug]: Double Messages | already implemented on main | Apr 26, 2026, 21:37 UTC | [closed/72356.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72356.md) |
| [#72354](https://github.com/openclaw/openclaw/issues/72354) | Subagent result exists but requester reports \"aborted/no result\" due to completion announce timeout (Telegram) | already implemented on main | Apr 26, 2026, 21:37 UTC | [closed/72354.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72354.md) |
| [#72349](https://github.com/openclaw/openclaw/issues/72349) | [Bug]: Subagent spawn fails with \"No API key found for bedrock\" when using IAM Roles Anywhere (AWS_PROFILE + credential_process) | already implemented on main | Apr 26, 2026, 21:36 UTC | [closed/72349.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72349.md) |
| [#72347](https://github.com/openclaw/openclaw/issues/72347) | Active Memory: timeoutMs unenforceable due to multi-turn agent loop; need single-shot mode | already implemented on main | Apr 26, 2026, 21:36 UTC | [closed/72347.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72347.md) |
| [#72346](https://github.com/openclaw/openclaw/issues/72346) | [Bug]: bonjour plugin: unhandled rejection on probe cancellation crashes process in 2026.4.24 (worked in 2026.4.23) | already implemented on main | Apr 26, 2026, 21:35 UTC | [closed/72346.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72346.md) |
| [#72344](https://github.com/openclaw/openclaw/issues/72344) | Bonjour/ciao mDNS causes repeated gateway crashes on headless Linux (CIAO PROBING CANCELLED) | already implemented on main | Apr 26, 2026, 21:35 UTC | [closed/72344.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72344.md) |
| [#72340](https://github.com/openclaw/openclaw/issues/72340) | Slack: native streaming gate excludes DMs even though chat.startStream accepts recipient_user_id | duplicate or superseded | Apr 26, 2026, 21:35 UTC | [closed/72340.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72340.md) |
| [#72339](https://github.com/openclaw/openclaw/issues/72339) | [Bug]: Gateway crashes after update to 2026.4.24 (CIAO PROBING CANCELLED) | already implemented on main | Apr 26, 2026, 21:35 UTC | [closed/72339.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72339.md) |
| [#72337](https://github.com/openclaw/openclaw/issues/72337) | Bonjour plugin crash-loops gateway on headless VPS (v2026.4.24) | already implemented on main | Apr 26, 2026, 21:35 UTC | [closed/72337.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72337.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#38212](https://github.com/openclaw/openclaw/issues/38212) | codex-cli/gpt-5.4 fails in embedded/helper paths while openai-codex/gpt-5.4 works | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38212.md) | complete | Apr 26, 2026, 21:43 UTC |
| [#38881](https://github.com/openclaw/openclaw/pull/38881) | Fix imageModel auto-switch when primary model doesn't support vision | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38881.md) | complete | Apr 26, 2026, 21:43 UTC |
| [#35406](https://github.com/openclaw/openclaw/issues/35406) | Improve read tool handling for binary document formats (.docx, .pdf, .pptx, .xlsx) & Avoid Token Waste on Binary Read  | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35406.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#38604](https://github.com/openclaw/openclaw/issues/38604) | [Security] Sandbox containers have no default pidsLimit - vulnerable to fork bomb attacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38604.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#38731](https://github.com/openclaw/openclaw/pull/38731) | Warn on high-frequency cron schedules (<30m) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38731.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#33838](https://github.com/openclaw/openclaw/issues/33838) | [Feature]: need  a mechanism for nodes to declare their command schemas | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/33838.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#39406](https://github.com/openclaw/openclaw/issues/39406) | Feature request: config option to suppress transient tool error warnings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39406.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#39142](https://github.com/openclaw/openclaw/issues/39142) | Configurable user-facing message when all models are exhausted | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39142.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#39031](https://github.com/openclaw/openclaw/issues/39031) | Feature: Forward iMessage tapback reactions to agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39031.md) | complete | Apr 26, 2026, 21:42 UTC |
| [#39400](https://github.com/openclaw/openclaw/issues/39400) | session_status usage data is unstable: Day window jumps and usage fields intermittently missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39400.md) | complete | Apr 26, 2026, 21:42 UTC |

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
