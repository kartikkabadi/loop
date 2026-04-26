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

Last dashboard update: Apr 26, 2026, 10:10 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 10:10 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 20 hot-intake item(s). Item numbers: 39635,39659,39685,39690,39722,39768,39772,39785,39805,39806,39826,39879,39975,39979,39996,39999,40009,40044,40067,40078.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24953986385](https://github.com/openclaw/clawsweeper/actions/runs/24953986385)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3869 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3571 |
| Open items total | 7440 |
| Reviewed files | 7181 |
| Unreviewed open items | 259 |
| Archived closed files | 12131 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3701 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3372 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7073 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 9604 |
| Failed or stale reviews | 108 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 78/773 current (695 due, 10.1%) |
| Hourly hot item cadence (<7d) | 78/773 current (695 due, 10.1%) |
| Daily cadence coverage | 4370/4512 current (142 due, 96.9%) |
| Daily PR cadence | 2953/3055 current (102 due, 96.7%) |
| Daily new issue cadence (<30d) | 1417/1457 current (40 due, 97.3%) |
| Weekly older issue cadence | 1884/1896 current (12 due, 99.4%) |
| Due now by cadence | 1108 |

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

Latest review: Apr 26, 2026, 10:09 UTC. Latest close: Apr 26, 2026, 10:03 UTC. Latest comment sync: Apr 26, 2026, 10:10 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 1 | 19 | 0 | 20 | 41 | 0 |
| Last hour | 1536 | 130 | 1406 | 5 | 173 | 413 | 8 |
| Last 24 hours | 9954 | 2602 | 7352 | 120 | 4943 | 2121 | 37 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#39768](https://github.com/openclaw/openclaw/issues/39768) | [Bug]: MCP tool failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39768.md) | complete | Apr 26, 2026, 10:09 UTC |
| [#39690](https://github.com/openclaw/openclaw/issues/39690) | Bug: Multimodal (Vision) Messages Ignored for Custom Ollama Cloud Models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39690.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#40078](https://github.com/openclaw/openclaw/issues/40078) | [Feature]: Silent preflight transcription in requireMention channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40078.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39785](https://github.com/openclaw/openclaw/pull/39785) | fix(config): respect explicit input modalities override in provider model merge | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39785.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39685](https://github.com/openclaw/openclaw/issues/39685) | [Feature]: Network Access Control (allowedDomains / denyDomains) — Egress Firewall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39685.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39805](https://github.com/openclaw/openclaw/issues/39805) | [Feature]: 飞书插件支持读取飞书表格 (Sheet) 内容 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39805.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39879](https://github.com/openclaw/openclaw/issues/39879) | [Feature] WhatsApp outbound mentions (mentionedJids) support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39879.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39979](https://github.com/openclaw/openclaw/issues/39979) | [Feature]: Path-scoped RWX permissions for exec and file tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39979.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39996](https://github.com/openclaw/openclaw/pull/39996) | status: surface global tool profile hints in overview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39996.md) | complete | Apr 26, 2026, 10:08 UTC |
| [#39826](https://github.com/openclaw/openclaw/pull/39826) | discord: include accountId in no-mention auto-reply logs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39826.md) | complete | Apr 26, 2026, 10:08 UTC |

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
