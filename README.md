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

Last dashboard update: Apr 26, 2026, 17:55 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 17:55 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 20 hot-intake item(s). Item numbers: 41419,66247,70616,70898,71658,71992,72023,72033,72045,72051,72058,72069,72101,72168,72174,72179,72181,72187,72189,72201.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24963118871](https://github.com/openclaw/clawsweeper/actions/runs/24963118871)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3743 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3539 |
| Open items total | 7282 |
| Reviewed files | 7187 |
| Unreviewed open items | 95 |
| Archived closed files | 12476 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3718 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3467 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7185 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 9908 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 44/795 current (751 due, 5.5%) |
| Hourly hot item cadence (<7d) | 44/795 current (751 due, 5.5%) |
| Daily cadence coverage | 4428/4495 current (67 due, 98.5%) |
| Daily PR cadence | 2994/3052 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1434/1443 current (9 due, 99.4%) |
| Weekly older issue cadence | 1897/1897 current (0 due, 100%) |
| Due now by cadence | 913 |

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

Latest review: Apr 26, 2026, 17:54 UTC. Latest close: Apr 26, 2026, 16:17 UTC. Latest comment sync: Apr 26, 2026, 17:55 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 195 | 1 | 194 | 0 | 0 | 20 | 0 |
| Last hour | 560 | 1 | 559 | 0 | 0 | 58 | 2 |
| Last 24 hours | 9861 | 2602 | 7259 | 10 | 2645 | 2235 | 17 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72187](https://github.com/openclaw/openclaw/pull/72187) | feat(plugin-sdk): add service lifecycle test harness | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72187.md) | complete | Apr 26, 2026, 17:54 UTC |
| [#70616](https://github.com/openclaw/openclaw/issues/70616) | Feature Request: Add execution field to dreaming config with fallback model support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70616.md) | complete | Apr 26, 2026, 17:54 UTC |
| [#72168](https://github.com/openclaw/openclaw/issues/72168) | [Bug]: Browser Playwright actions still fail after doctor --fix on 2026.4.24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72168.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#70898](https://github.com/openclaw/openclaw/pull/70898) | fix(auto-reply): preserve DM continuity across silent session rotations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70898.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#72174](https://github.com/openclaw/openclaw/pull/72174) | fix(macos): keep attach-only from stopping gateway launchd | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72174.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#72058](https://github.com/openclaw/openclaw/issues/72058) | [Bug]: npm deps are missing after update to 24.04.2026 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72058.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#72023](https://github.com/openclaw/openclaw/pull/72023) | fix(acp): skip terminal one-shot/closed sessions in startup identity reconcile (#72013) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72023.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#72069](https://github.com/openclaw/openclaw/pull/72069) | fix(agents): seed claude-cli fallback prompts with prior-session context (#69973) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72069.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#66247](https://github.com/openclaw/openclaw/pull/66247) | [codex] Telegram: let immediate queue modes bypass busy topic lanes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66247.md) | complete | Apr 26, 2026, 17:53 UTC |
| [#71992](https://github.com/openclaw/openclaw/issues/71992) | [Bug]: Control UI webchat duplicates every assistant reply on 2026.4.21 — regression from #5964/#39469 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71992.md) | complete | Apr 26, 2026, 17:53 UTC |

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
