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

Last dashboard update: Apr 26, 2026, 12:07 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 12:07 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24956216819](https://github.com/openclaw/clawsweeper/actions/runs/24956216819)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3772 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3525 |
| Open items total | 7297 |
| Reviewed files | 7222 |
| Unreviewed open items | 75 |
| Archived closed files | 12315 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3754 |
| Proposed issue closes | 17 (0.5% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3466 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7220 |
| Proposed closes awaiting apply | 20 (0.3% of fresh reviews) |
| Closed by Codex apply | 9784 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 467/835 current (368 due, 55.9%) |
| Hourly hot item cadence (<7d) | 467/835 current (368 due, 55.9%) |
| Daily cadence coverage | 4435/4505 current (70 due, 98.4%) |
| Daily PR cadence | 2989/3052 current (63 due, 97.9%) |
| Daily new issue cadence (<30d) | 1446/1453 current (7 due, 99.5%) |
| Weekly older issue cadence | 1882/1882 current (0 due, 100%) |
| Due now by cadence | 513 |

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

Latest review: Apr 26, 2026, 12:02 UTC. Latest close: Apr 26, 2026, 12:06 UTC. Latest comment sync: Apr 26, 2026, 12:06 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 388 | 33 | 355 | 0 | 40 | 415 | 3 |
| Last hour | 1022 | 41 | 981 | 0 | 40 | 434 | 4 |
| Last 24 hours | 10100 | 2739 | 7361 | 14 | 4482 | 2343 | 31 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72079](https://github.com/openclaw/openclaw/issues/72079) | [Bug]: `openclaw health --json` fails while `openclaw gateway health --json` succeeds on the same healthy gateway | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72079.md) | complete | Apr 26, 2026, 12:02 UTC |
| [#72102](https://github.com/openclaw/openclaw/pull/72102) | fix(ollama): parse tool_call arguments returned as JSON strings [AI-assisted] | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72102.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#72058](https://github.com/openclaw/openclaw/issues/72058) | [Bug]: npm deps are missing after update to 24.04.2026 | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/72058.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#69051](https://github.com/openclaw/openclaw/pull/69051) | Provider-aware TTS expressiveness with optional voice-library support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69051.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#65437](https://github.com/openclaw/openclaw/issues/65437) | [Bug]: tools.elevated.allowFrom.slack silently blocked by commandAuthorized gate — no documented fallback for Slack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65437.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#72117](https://github.com/openclaw/openclaw/issues/72117) | [Feature]: official `npm create openclaw-plugin` scaffolder for ClawHub-ready plugins | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72117.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#71843](https://github.com/openclaw/openclaw/pull/71843) | fix(slack): suppress already_reacted from agent react tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71843.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#71841](https://github.com/openclaw/openclaw/pull/71841) | test(slack): cover formatSlackFileReference + formatSlackFileReferenceList | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71841.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#72101](https://github.com/openclaw/openclaw/pull/72101) | fix(agents): ignore ACP-only streamTo and treat default model as unset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72101.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#70238](https://github.com/openclaw/openclaw/issues/70238) | [Bug]: Gateway OpenCLAW spawns flashing command prompt windows in background on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70238.md) | complete | Apr 26, 2026, 12:01 UTC |

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
