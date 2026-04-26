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

Last dashboard update: Apr 26, 2026, 03:15 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 03:15 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh issue closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24947043603](https://github.com/openclaw/clawsweeper/actions/runs/24947043603)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5090 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4244 |
| Open items total | 9334 |
| Reviewed files | 9165 |
| Unreviewed open items | 169 |
| Archived closed files | 10132 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 5024 |
| Proposed issue closes | 687 (13.7% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4118 |
| Proposed PR closes | 118 (2.9% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 9142 |
| Proposed closes awaiting apply | 805 (8.8% of fresh reviews) |
| Closed by Codex apply | 7852 |
| Failed or stale reviews | 23 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 7/1035 current (1028 due, 0.7%) |
| Hourly hot item cadence (<7d) | 7/1035 current (1028 due, 0.7%) |
| Daily cadence coverage | 5586/5732 current (146 due, 97.5%) |
| Daily PR cadence | 3558/3657 current (99 due, 97.3%) |
| Daily new issue cadence (<30d) | 2028/2075 current (47 due, 97.7%) |
| Weekly older issue cadence | 2393/2398 current (5 due, 99.8%) |
| Due now by cadence | 1348 |

### Latest Run Activity

Latest review: Apr 26, 2026, 03:06 UTC. Latest close: Apr 26, 2026, 03:14 UTC. Latest comment sync: Apr 26, 2026, 03:14 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 104 | 32 | 72 | 1 | 74 | 75 | 0 |
| Last hour | 913 | 121 | 792 | 1 | 178 | 373 | 1 |
| Last 24 hours | 11205 | 2593 | 8612 | 37 | 5569 | 486 | 198 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#66287](https://github.com/openclaw/openclaw/issues/66287) | [Memory System] Single-occurrence important events not promoted to long-term memory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66287.md) | complete | Apr 26, 2026, 03:06 UTC |
| [#66095](https://github.com/openclaw/openclaw/issues/66095) | parseMessageWithAttachments drops images for qwen/qwen3.6-plus despite model declaring input: [text, image] | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66095.md) | complete | Apr 26, 2026, 03:05 UTC |
| [#66224](https://github.com/openclaw/openclaw/pull/66224) | Release sync/v2026.4.12 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66224.md) | complete | Apr 26, 2026, 03:05 UTC |
| [#66235](https://github.com/openclaw/openclaw/issues/66235) | Expose stopReason in message_sending plugin hook metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66235.md) | complete | Apr 26, 2026, 03:05 UTC |
| [#66119](https://github.com/openclaw/openclaw/issues/66119) | [Bug] Signal: update to 2026.4.12 sets registered=false in signal-cli account file, causing account deletion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66119.md) | complete | Apr 26, 2026, 03:04 UTC |
| [#66209](https://github.com/openclaw/openclaw/pull/66209) | feat(m365): add Outlook triage approvals | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66209.md) | complete | Apr 26, 2026, 03:04 UTC |
| [#66156](https://github.com/openclaw/openclaw/pull/66156) | [codex] fix exec completion system-event history leak | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66156.md) | complete | Apr 26, 2026, 03:04 UTC |
| [#66192](https://github.com/openclaw/openclaw/pull/66192) | fix(tui): reset activity after late terminal events | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66192.md) | complete | Apr 26, 2026, 03:04 UTC |
| [#66200](https://github.com/openclaw/openclaw/pull/66200) | security: wrap BlueBubbles inbound DM body via wrapExternalContent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66200.md) | complete | Apr 26, 2026, 03:04 UTC |
| [#66255](https://github.com/openclaw/openclaw/issues/66255) | @mariozechner/clipboard-linux-x64-gnu crashes gateway on headless Linux (SIGILL/SIGSEGV) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66255.md) | complete | Apr 26, 2026, 03:04 UTC |

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
