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

Last dashboard update: Apr 26, 2026, 09:51 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 09:51 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 20. Total fresh closes in this run: 20/20. Result records in checkpoint: 39, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24953682358](https://github.com/openclaw/clawsweeper/actions/runs/24953682358)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3886 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3582 |
| Open items total | 7468 |
| Reviewed files | 7217 |
| Unreviewed open items | 251 |
| Archived closed files | 12095 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3726 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3388 |
| Proposed PR closes | 9 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7114 |
| Proposed closes awaiting apply | 11 (0.2% of fresh reviews) |
| Closed by Codex apply | 9585 |
| Failed or stale reviews | 103 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 117/780 current (663 due, 15%) |
| Hourly hot item cadence (<7d) | 117/780 current (663 due, 15%) |
| Daily cadence coverage | 4384/4522 current (138 due, 96.9%) |
| Daily PR cadence | 2965/3065 current (100 due, 96.7%) |
| Daily new issue cadence (<30d) | 1419/1457 current (38 due, 97.4%) |
| Weekly older issue cadence | 1904/1915 current (11 due, 99.4%) |
| Due now by cadence | 1063 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 26, 2026, 06:52 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 8155 |
| Missing eligible open records | 5 |
| Missing maintainer-authored open records | 72 |
| Missing protected open records | 0 |
| Missing recently-created open records | 142 |
| Archived records that are open again | 0 |
| Stale item records | 7 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 41 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#66922](https://github.com/openclaw/openclaw/issues/66922) | Missing eligible open | [Bug]: xAI grok reasoning models (grok-4-1-fast-reasoning) ignore workspace IDENTITY.md behavioral rules at 0% compliance rate | eligible |
| [#66923](https://github.com/openclaw/openclaw/issues/66923) | Missing eligible open | OpenClaw Model Registry: GPT-4.1 family passes through unmanaged | eligible |
| [#68655](https://github.com/openclaw/openclaw/issues/68655) | Missing eligible open | bug(web-ui): streaming markdown flickers — full DOM replacement on every token via unsafeHTML | eligible |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 09:43 UTC. Latest close: Apr 26, 2026, 09:51 UTC. Latest comment sync: Apr 26, 2026, 09:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 167 | 12 | 155 | 1 | 85 | 174 | 0 |
| Last hour | 1651 | 192 | 1459 | 7 | 257 | 920 | 9 |
| Last 24 hours | 9957 | 2578 | 7379 | 115 | 5093 | 2425 | 38 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#39141](https://github.com/openclaw/openclaw/issues/39141) | [Feature]: Optional session activity watchdog and alerts (blocked by #39127) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39141.md) | complete | Apr 26, 2026, 09:43 UTC |
| [#38327](https://github.com/openclaw/openclaw/issues/38327) | [Bug] \"Cannot convert undefined or null to object\" in 2026.3.2 with google-vertex/gemini-3.1-pro-preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38327.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#39120](https://github.com/openclaw/openclaw/issues/39120) | [Feature]: Support arbitrary workspace files in bootstrap context injection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39120.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#38671](https://github.com/openclaw/openclaw/issues/38671) | [Feature]: Support direct Shell command execution in Cron to bypass LLM inference and context pollution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38671.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#39457](https://github.com/openclaw/openclaw/issues/39457) | [Feature]: post-update hook / lifecycle script support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39457.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#38458](https://github.com/openclaw/openclaw/issues/38458) | [Feature]: Option to suppress tool error output from reaching chat surfaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38458.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#38931](https://github.com/openclaw/openclaw/issues/38931) | [Feature]: SSRF 内网访问确认机制 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38931.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#38346](https://github.com/openclaw/openclaw/issues/38346) | [Feature]: Telegram listen to all messages but triggered by few | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38346.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#38597](https://github.com/openclaw/openclaw/issues/38597) | CJK text splitting breaks mid-character at Discord 2000-char boundary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38597.md) | complete | Apr 26, 2026, 09:42 UTC |
| [#39127](https://github.com/openclaw/openclaw/issues/39127) | [Feature]: Per-session activity state (busy/idle + awaiting_user, awaiting_subagent) via gateway API + WS statechange | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39127.md) | complete | Apr 26, 2026, 09:42 UTC |

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
