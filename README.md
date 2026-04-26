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

Last dashboard update: Apr 26, 2026, 08:52 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 08:52 UTC

State: Apply finished

Apply/comment-sync run finished with 20 fresh closes out of requested limit 20. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24952629344](https://github.com/openclaw/clawsweeper/actions/runs/24952629344)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4040 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3659 |
| Open items total | 7699 |
| Reviewed files | 7446 |
| Unreviewed open items | 253 |
| Archived closed files | 11851 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3902 |
| Proposed issue closes | 24 (0.6% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3480 |
| Proposed PR closes | 20 (0.6% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7382 |
| Proposed closes awaiting apply | 44 (0.6% of fresh reviews) |
| Closed by Codex apply | 9345 |
| Failed or stale reviews | 64 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 67/776 current (709 due, 8.6%) |
| Hourly hot item cadence (<7d) | 67/776 current (709 due, 8.6%) |
| Daily cadence coverage | 4584/4698 current (114 due, 97.6%) |
| Daily PR cadence | 3059/3142 current (83 due, 97.4%) |
| Daily new issue cadence (<30d) | 1525/1556 current (31 due, 98%) |
| Weekly older issue cadence | 1967/1972 current (5 due, 99.7%) |
| Due now by cadence | 1081 |

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

Latest review: Apr 26, 2026, 08:49 UTC. Latest close: Apr 26, 2026, 08:52 UTC. Latest comment sync: Apr 26, 2026, 08:52 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 42 | 9 | 33 | 0 | 93 | 114 | 0 |
| Last hour | 1517 | 253 | 1264 | 5 | 172 | 523 | 20 |
| Last 24 hours | 9980 | 2409 | 7571 | 77 | 4980 | 1872 | 51 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71733](https://github.com/openclaw/openclaw/issues/71733) | [RFC] Durable next-turn injections and agent turn preparation hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71733.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#71736](https://github.com/openclaw/openclaw/issues/71736) | [RFC] Control UI plugin contribution slots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71736.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#71732](https://github.com/openclaw/openclaw/issues/71732) | [RFC] Plugin session extensions and patch actions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71732.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#71735](https://github.com/openclaw/openclaw/issues/71735) | [RFC] Scoped plugin commands, trusted command ownership, and continuation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71735.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#24196](https://github.com/openclaw/openclaw/issues/24196) | [Feature]: Allow max allowed file attachments on discord messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/24196.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#25592](https://github.com/openclaw/openclaw/issues/25592) | Text between tool calls leaks to messaging channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/25592.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#71734](https://github.com/openclaw/openclaw/issues/71734) | [RFC] Trusted tool policy stage and plugin tool metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71734.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#71731](https://github.com/openclaw/openclaw/pull/71731) | docs: add Plan Mode plugin host hook RFC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71731.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#20935](https://github.com/openclaw/openclaw/issues/20935) | [Feature]: Audit log for agent memory changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/20935.md) | complete | Apr 26, 2026, 08:49 UTC |
| [#23906](https://github.com/openclaw/openclaw/issues/23906) | [Feature]: feat(sessions_spawn): per-spawn tool profile override | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/23906.md) | complete | Apr 26, 2026, 08:49 UTC |

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
