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

Last dashboard update: Apr 26, 2026, 13:01 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 13:01 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 20 hot-intake item(s). Item numbers: 39554,39555,39558,39565,39568,39569,39581,39583,39585,39587,39589,39597,39599,39646,39671,39806,39825,40044,63897,68735.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24957137779](https://github.com/openclaw/clawsweeper/actions/runs/24957137779)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3748 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3526 |
| Open items total | 7274 |
| Reviewed files | 7188 |
| Unreviewed open items | 86 |
| Archived closed files | 12364 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3731 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3455 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7186 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 9824 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 357/801 current (444 due, 44.6%) |
| Hourly hot item cadence (<7d) | 357/801 current (444 due, 44.6%) |
| Daily cadence coverage | 4432/4502 current (70 due, 98.4%) |
| Daily PR cadence | 2986/3049 current (63 due, 97.9%) |
| Daily new issue cadence (<30d) | 1446/1453 current (7 due, 99.5%) |
| Weekly older issue cadence | 1885/1885 current (0 due, 100%) |
| Due now by cadence | 600 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 26, 2026, 12:29 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7259 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 69 |
| Missing protected open records | 0 |
| Missing recently-created open records | 7 |
| Archived records that are open again | 0 |
| Stale item records | 2 |
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

Latest review: Apr 26, 2026, 12:59 UTC. Latest close: Apr 26, 2026, 12:22 UTC. Latest comment sync: Apr 26, 2026, 13:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 1 | 19 | 0 | 0 | 20 | 0 |
| Last hour | 657 | 31 | 626 | 0 | 57 | 365 | 1 |
| Last 24 hours | 10053 | 2726 | 7327 | 14 | 4199 | 2471 | 29 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68735](https://github.com/openclaw/openclaw/issues/68735) | [Bug]: LLM request failed: provider rejected the request schema or tool payload. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68735.md) | complete | Apr 26, 2026, 12:59 UTC |
| [#39599](https://github.com/openclaw/openclaw/issues/39599) | Cron allows invalid Feishu announce jobs without delivery.to, causing runtime delivery failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39599.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39554](https://github.com/openclaw/openclaw/issues/39554) | Google Chat plugin: invalid thread resource name causes message send failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39554.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39671](https://github.com/openclaw/openclaw/pull/39671) | feat: add repotype for skill/package structure enforcement | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39671.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39825](https://github.com/openclaw/openclaw/issues/39825) | [Bug]: Discord native /vc join fails immediately with 'The operation was aborted' and no active session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39825.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39597](https://github.com/openclaw/openclaw/issues/39597) | Feature: Distinguish webchat client types (Mac app vs browser) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39597.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39583](https://github.com/openclaw/openclaw/pull/39583) | Fix double JSON-serialization of vLLM content blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39583.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39555](https://github.com/openclaw/openclaw/pull/39555) | fix(memory): use per-keyword FTS search in hybrid mode #39484 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39555.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#39558](https://github.com/openclaw/openclaw/pull/39558) | fix(feishu): strip reaction suffix from message_id before API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39558.md) | complete | Apr 26, 2026, 12:58 UTC |
| [#40044](https://github.com/openclaw/openclaw/pull/40044) | feat: inject sessionId into runtime context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40044.md) | complete | Apr 26, 2026, 12:58 UTC |

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
