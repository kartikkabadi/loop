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

Last dashboard update: Apr 26, 2026, 04:26 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 04:26 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24948189525](https://github.com/openclaw/clawsweeper/actions/runs/24948189525)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4653 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4217 |
| Open items total | 8870 |
| Reviewed files | 8677 |
| Unreviewed open items | 193 |
| Archived closed files | 10620 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4573 |
| Proposed issue closes | 371 (8.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4085 |
| Proposed PR closes | 198 (4.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8658 |
| Proposed closes awaiting apply | 569 (6.6% of fresh reviews) |
| Closed by Codex apply | 8232 |
| Failed or stale reviews | 19 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 155/1010 current (855 due, 15.3%) |
| Hourly hot item cadence (<7d) | 155/1010 current (855 due, 15.3%) |
| Daily cadence coverage | 5554/5639 current (85 due, 98.5%) |
| Daily PR cadence | 3565/3638 current (73 due, 98%) |
| Daily new issue cadence (<30d) | 1989/2001 current (12 due, 99.4%) |
| Weekly older issue cadence | 2026/2028 current (2 due, 99.9%) |
| Due now by cadence | 1135 |

### Latest Run Activity

Latest review: Apr 26, 2026, 04:25 UTC. Latest close: Apr 26, 2026, 04:22 UTC. Latest comment sync: Apr 26, 2026, 04:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 249 | 44 | 205 | 0 | 80 | 81 | 1 |
| Last hour | 997 | 194 | 803 | 1 | 286 | 290 | 1 |
| Last 24 hours | 10869 | 2447 | 8422 | 32 | 5604 | 614 | 189 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69097](https://github.com/openclaw/openclaw/issues/69097) | [Bug]: Agent silently returns empty response in 2026.4.15 — no HTTP request to provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69097.md) | complete | Apr 26, 2026, 04:25 UTC |
| [#69076](https://github.com/openclaw/openclaw/pull/69076) | [codex] classify manual cancellations as killed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69076.md) | complete | Apr 26, 2026, 04:24 UTC |
| [#69108](https://github.com/openclaw/openclaw/pull/69108) | fix(agent): honor --session-id when --agent is present + add --new-session flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69108.md) | complete | Apr 26, 2026, 04:24 UTC |
| [#69196](https://github.com/openclaw/openclaw/issues/69196) | Control UI microphone does not capture speech in Chrome on Mac mini | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69196.md) | complete | Apr 26, 2026, 04:24 UTC |
| [#69056](https://github.com/openclaw/openclaw/pull/69056) | fix(gateway): handle SIGUSR1 gracefully on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69056.md) | complete | Apr 26, 2026, 04:24 UTC |
| [#69054](https://github.com/openclaw/openclaw/issues/69054) | [Feature] Add \"cron lint\" subcommand and require delivery.accountId on announce-mode crons in multi-account channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69054.md) | complete | Apr 26, 2026, 04:24 UTC |
| [#69110](https://github.com/openclaw/openclaw/issues/69110) | Gateway-level model identity not passed to delivery hooks (enables silent model-tag forgery) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69110.md) | complete | Apr 26, 2026, 04:24 UTC |
| [#69022](https://github.com/openclaw/openclaw/pull/69022) | Fix: apply humanDelay between Telegram streamed block replies (Resolves #68945) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69022.md) | complete | Apr 26, 2026, 04:23 UTC |
| [#69075](https://github.com/openclaw/openclaw/issues/69075) | [Feature] Support reasoning.max_tokens per model in provider config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69075.md) | complete | Apr 26, 2026, 04:23 UTC |
| [#69094](https://github.com/openclaw/openclaw/issues/69094) | [Feature]: gog SKILL.md | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69094.md) | complete | Apr 26, 2026, 04:23 UTC |

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
