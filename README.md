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

Last dashboard update: Apr 26, 2026, 03:57 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 03:57 UTC

State: Apply finished

Apply/comment-sync run finished with 20 fresh closes out of requested limit 20. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24947679591](https://github.com/openclaw/clawsweeper/actions/runs/24947679591)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4832 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4222 |
| Open items total | 9054 |
| Reviewed files | 8878 |
| Unreviewed open items | 176 |
| Archived closed files | 10419 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4761 |
| Proposed issue closes | 519 (10.9% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4096 |
| Proposed PR closes | 157 (3.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8857 |
| Proposed closes awaiting apply | 676 (7.6% of fresh reviews) |
| Closed by Codex apply | 8072 |
| Failed or stale reviews | 21 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 14/1013 current (999 due, 1.4%) |
| Hourly hot item cadence (<7d) | 14/1013 current (999 due, 1.4%) |
| Daily cadence coverage | 5624/5708 current (84 due, 98.5%) |
| Daily PR cadence | 3575/3645 current (70 due, 98.1%) |
| Daily new issue cadence (<30d) | 2049/2063 current (14 due, 99.3%) |
| Weekly older issue cadence | 2155/2157 current (2 due, 99.9%) |
| Due now by cadence | 1261 |

### Latest Run Activity

Latest review: Apr 26, 2026, 03:53 UTC. Latest close: Apr 26, 2026, 03:57 UTC. Latest comment sync: Apr 26, 2026, 03:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 249 | 53 | 196 | 0 | 100 | 100 | 0 |
| Last hour | 972 | 161 | 811 | 4 | 276 | 296 | 3 |
| Last 24 hours | 11042 | 2514 | 8528 | 34 | 5603 | 496 | 192 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67817](https://github.com/openclaw/openclaw/issues/67817) | [Bug]: Discord setup: service file doesn't include DISCORD_BOT_TOKEN environment variable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67817.md) | complete | Apr 26, 2026, 03:53 UTC |
| [#67759](https://github.com/openclaw/openclaw/issues/67759) | WebChat image recognition fails when using coding.dashscope base URL for Qwen models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67759.md) | complete | Apr 26, 2026, 03:53 UTC |
| [#67826](https://github.com/openclaw/openclaw/pull/67826) | Telegram: harden setup allowFrom and target resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67826.md) | complete | Apr 26, 2026, 03:52 UTC |
| [#67689](https://github.com/openclaw/openclaw/issues/67689) | Feature request: Session management UI (hide/archive/filter sessions) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67689.md) | complete | Apr 26, 2026, 03:51 UTC |
| [#67970](https://github.com/openclaw/openclaw/issues/67970) | Feature: built-in memory should support automatic context extraction and daily-log writing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67970.md) | complete | Apr 26, 2026, 03:51 UTC |
| [#67836](https://github.com/openclaw/openclaw/pull/67836) | feat(memory-core): Memory v2 foundation — sidecar, ingest, rerank (all default-off) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67836.md) | complete | Apr 26, 2026, 03:51 UTC |
| [#67889](https://github.com/openclaw/openclaw/issues/67889) | Image understanding tool has hardcoded 60s timeout, ignoring configured timeoutSeconds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67889.md) | complete | Apr 26, 2026, 03:51 UTC |
| [#67952](https://github.com/openclaw/openclaw/pull/67952) | fix(memory-lancedb): get memory records through ltm list command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67952.md) | complete | Apr 26, 2026, 03:51 UTC |
| [#67946](https://github.com/openclaw/openclaw/pull/67946) | Clear stale subagent lineage on top-level sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67946.md) | complete | Apr 26, 2026, 03:51 UTC |
| [#67943](https://github.com/openclaw/openclaw/issues/67943) | Normal sessions can inherit stale subagent lineage and incorrectly hit sessions_spawn depth limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67943.md) | complete | Apr 26, 2026, 03:51 UTC |

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
