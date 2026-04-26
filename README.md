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

Last dashboard update: Apr 26, 2026, 06:13 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 06:13 UTC

State: Review publish complete

Merged review artifacts for run 24949636772. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24949636772](https://github.com/openclaw/clawsweeper/actions/runs/24949636772)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4216 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4156 |
| Open items total | 8372 |
| Reviewed files | 8171 |
| Unreviewed open items | 201 |
| Archived closed files | 11126 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4122 |
| Proposed issue closes | 23 (0.6% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4024 |
| Proposed PR closes | 275 (6.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8146 |
| Proposed closes awaiting apply | 298 (3.7% of fresh reviews) |
| Closed by Codex apply | 8666 |
| Failed or stale reviews | 25 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 358/955 current (597 due, 37.5%) |
| Hourly hot item cadence (<7d) | 358/955 current (597 due, 37.5%) |
| Daily cadence coverage | 5136/5225 current (89 due, 98.3%) |
| Daily PR cadence | 3517/3592 current (75 due, 97.9%) |
| Daily new issue cadence (<30d) | 1619/1633 current (14 due, 99.1%) |
| Weekly older issue cadence | 1989/1991 current (2 due, 99.9%) |
| Due now by cadence | 889 |

### Latest Run Activity

Latest review: Apr 26, 2026, 06:11 UTC. Latest close: Apr 26, 2026, 05:44 UTC. Latest comment sync: Apr 26, 2026, 05:47 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 250 | 66 | 184 | 0 | 0 | 0 | 0 |
| Last hour | 1019 | 324 | 695 | 2 | 96 | 194 | 5 |
| Last 24 hours | 10492 | 2343 | 8149 | 38 | 5197 | 1035 | 161 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69849](https://github.com/openclaw/openclaw/issues/69849) | ACP SDK: Missing default values for optional array parameters cause Claude tool schema validation to fail | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69849.md) | complete | Apr 26, 2026, 06:11 UTC |
| [#69622](https://github.com/openclaw/openclaw/issues/69622) | [Bug]: Feishu image: Media Understanding not triggered, model receives `[image data removed]` instead of image | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69622.md) | complete | Apr 26, 2026, 06:11 UTC |
| [#69790](https://github.com/openclaw/openclaw/issues/69790) | Telegram inbound can fail with persistent session write lock on existing DM session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69790.md) | complete | Apr 26, 2026, 06:11 UTC |
| [#69871](https://github.com/openclaw/openclaw/issues/69871) | [Bug] Image tool uses openai-completions instead of provider-zai-endpoint, causing 404 on zai VL models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69871.md) | complete | Apr 26, 2026, 06:11 UTC |
| [#69916](https://github.com/openclaw/openclaw/issues/69916) | [Bug]: Telegram exec approvals ignore targets.accountId and fan out across all bot accounts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69916.md) | complete | Apr 26, 2026, 06:10 UTC |
| [#44256](https://github.com/openclaw/openclaw/pull/44256) | fix(feishu): do not treat @all as a bot mention | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44256.md) | complete | Apr 26, 2026, 06:10 UTC |
| [#69695](https://github.com/openclaw/openclaw/issues/69695) | [Bug]: Gateway service check fails with \"No medium found\" on WSL2 despite systemd running correctly | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69695.md) | complete | Apr 26, 2026, 06:10 UTC |
| [#69801](https://github.com/openclaw/openclaw/issues/69801) | Add visible New Chat / New Session button to Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69801.md) | complete | Apr 26, 2026, 06:10 UTC |
| [#44205](https://github.com/openclaw/openclaw/pull/44205) | fix(cron): suppress stale descendant subagent fallback summaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44205.md) | complete | Apr 26, 2026, 06:10 UTC |
| [#69799](https://github.com/openclaw/openclaw/issues/69799) | [Security] Ship a dedicated/bundled Node binary so macOS TCC permissions (FDA, Accessibility) are scoped to OpenClaw only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69799.md) | complete | Apr 26, 2026, 06:10 UTC |

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
