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

Last dashboard update: Apr 26, 2026, 05:02 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 05:02 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh issue closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24948735608](https://github.com/openclaw/clawsweeper/actions/runs/24948735608)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4403 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4213 |
| Open items total | 8616 |
| Reviewed files | 8420 |
| Unreviewed open items | 196 |
| Archived closed files | 10877 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4320 |
| Proposed issue closes | 168 (3.9% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4073 |
| Proposed PR closes | 234 (5.7% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8393 |
| Proposed closes awaiting apply | 402 (4.8% of fresh reviews) |
| Closed by Codex apply | 8491 |
| Failed or stale reviews | 27 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 224/1003 current (779 due, 22.3%) |
| Hourly hot item cadence (<7d) | 224/1003 current (779 due, 22.3%) |
| Daily cadence coverage | 5335/5424 current (89 due, 98.4%) |
| Daily PR cadence | 3562/3636 current (74 due, 98%) |
| Daily new issue cadence (<30d) | 1773/1788 current (15 due, 99.2%) |
| Weekly older issue cadence | 1991/1993 current (2 due, 99.9%) |
| Due now by cadence | 1066 |

### Latest Run Activity

Latest review: Apr 26, 2026, 04:56 UTC. Latest close: Apr 26, 2026, 05:01 UTC. Latest comment sync: Apr 26, 2026, 05:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 210 | 27 | 183 | 0 | 91 | 91 | 0 |
| Last hour | 924 | 157 | 767 | 2 | 295 | 317 | 0 |
| Last 24 hours | 10719 | 2403 | 8316 | 40 | 5473 | 799 | 176 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#37804](https://github.com/openclaw/openclaw/issues/37804) | RFC: treat models.providers-injected models as first-class forward-compat models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37804.md) | complete | Apr 26, 2026, 04:56 UTC |
| [#38731](https://github.com/openclaw/openclaw/pull/38731) | Warn on high-frequency cron schedules (<30m) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38731.md) | complete | Apr 26, 2026, 04:56 UTC |
| [#38897](https://github.com/openclaw/openclaw/pull/38897) | [codex] Surface tool runtime, execution queue, and autonomy posture | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38897.md) | complete | Apr 26, 2026, 04:55 UTC |
| [#37813](https://github.com/openclaw/openclaw/issues/37813) | [Bug]: Unrecognised model IDs silently fall back to primary default — bypasses configured fallback chain and tool permissions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37813.md) | complete | Apr 26, 2026, 04:55 UTC |
| [#37711](https://github.com/openclaw/openclaw/issues/37711) | [Bug]: Hostinger Docker template deploys successfully, but OpenClaw web UI stays black due to /assets/index-*.js ERR_CONTENT_LENGTH_MISMATCH | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37711.md) | complete | Apr 26, 2026, 04:55 UTC |
| [#38923](https://github.com/openclaw/openclaw/pull/38923) | Fix/38439 webchat avatar identity md | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38923.md) | complete | Apr 26, 2026, 04:55 UTC |
| [#38364](https://github.com/openclaw/openclaw/issues/38364) | control-ui: expose reply-to metadata to agent sessions and avoid confusing no-output completion notices | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38364.md) | complete | Apr 26, 2026, 04:55 UTC |
| [#37746](https://github.com/openclaw/openclaw/issues/37746) | [Feature]: Sandboxed skill functions for remote heartbeat instructions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37746.md) | complete | Apr 26, 2026, 04:54 UTC |
| [#38661](https://github.com/openclaw/openclaw/pull/38661) | fix: resolve multiple issues (#38517, #38501, #38554, #38494) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38661.md) | complete | Apr 26, 2026, 04:54 UTC |
| [#38212](https://github.com/openclaw/openclaw/issues/38212) | codex-cli/gpt-5.4 fails in embedded/helper paths while openai-codex/gpt-5.4 works | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38212.md) | complete | Apr 26, 2026, 04:54 UTC |

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
