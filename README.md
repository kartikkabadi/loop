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

Last dashboard update: Apr 26, 2026, 03:50 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 03:50 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 20. Total fresh closes in this run: 20/20. Result records in checkpoint: 40, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24947586982](https://github.com/openclaw/clawsweeper/actions/runs/24947586982)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4886 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4226 |
| Open items total | 9112 |
| Reviewed files | 8939 |
| Unreviewed open items | 173 |
| Archived closed files | 10358 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4813 |
| Proposed issue closes | 529 (11% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4097 |
| Proposed PR closes | 140 (3.4% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8910 |
| Proposed closes awaiting apply | 669 (7.5% of fresh reviews) |
| Closed by Codex apply | 8032 |
| Failed or stale reviews | 29 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 10/1022 current (1012 due, 1%) |
| Hourly hot item cadence (<7d) | 10/1022 current (1012 due, 1%) |
| Daily cadence coverage | 5598/5717 current (119 due, 97.9%) |
| Daily PR cadence | 3563/3645 current (82 due, 97.8%) |
| Daily new issue cadence (<30d) | 2035/2072 current (37 due, 98.2%) |
| Weekly older issue cadence | 2196/2200 current (4 due, 99.8%) |
| Due now by cadence | 1308 |

### Latest Run Activity

Latest review: Apr 26, 2026, 03:37 UTC. Latest close: Apr 26, 2026, 03:50 UTC. Latest comment sync: Apr 26, 2026, 03:50 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 5 | 4 | 0 | 92 | 92 | 0 |
| Last hour | 757 | 113 | 644 | 4 | 261 | 282 | 3 |
| Last 24 hours | 11067 | 2514 | 8553 | 41 | 5588 | 456 | 194 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67122](https://github.com/openclaw/openclaw/issues/67122) | [Bug]: pdf/image tools reject sub-agent workspace paths due to workspace-* blacklist in assertLocalMediaAllowed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67122.md) | complete | Apr 26, 2026, 03:37 UTC |
| [#67097](https://github.com/openclaw/openclaw/issues/67097) | [Bug]: Discrepancy in models.json: bundled plugins bypass the onboard lifecycle to inject models into the manifest | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67097.md) | complete | Apr 26, 2026, 03:36 UTC |
| [#67051](https://github.com/openclaw/openclaw/issues/67051) | [Bug]: WebUI: Config validation error when disabling second skill (tools.web.search provider-owned config moved) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67051.md) | complete | Apr 26, 2026, 03:36 UTC |
| [#67065](https://github.com/openclaw/openclaw/issues/67065) | Managed media workflows need session-scoped next-turn suppression / pending state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67065.md) | complete | Apr 26, 2026, 03:36 UTC |
| [#67262](https://github.com/openclaw/openclaw/pull/67262) | fix(heartbeat): suppress async relay when payload is missing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67262.md) | complete | Apr 26, 2026, 03:36 UTC |
| [#67135](https://github.com/openclaw/openclaw/issues/67135) | [Bug]: Webchat context meter shows false overflow after /new and fresh sessions start with excessive prompt weight | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67135.md) | complete | Apr 26, 2026, 03:35 UTC |
| [#67119](https://github.com/openclaw/openclaw/pull/67119) | fix(google): use v1alpha API version for preview Veo models (#62309) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67119.md) | complete | Apr 26, 2026, 03:35 UTC |
| [#67062](https://github.com/openclaw/openclaw/issues/67062) | Feature Request: Add channels.qqbot.mediaAllowHosts config for QQ Bot media SSRF policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67062.md) | complete | Apr 26, 2026, 03:35 UTC |
| [#67238](https://github.com/openclaw/openclaw/issues/67238) | Feature Request: Option to hide/filter system heartbeat polling messages in Control UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67238.md) | complete | Apr 26, 2026, 03:35 UTC |
| [#67063](https://github.com/openclaw/openclaw/pull/67063) | fix(plugins): include memory slot plugin in primary wiki CLI scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67063.md) | complete | Apr 26, 2026, 03:35 UTC |

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

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

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
