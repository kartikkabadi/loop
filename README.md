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

Last dashboard update: Apr 26, 2026, 05:58 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 05:58 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24949636772](https://github.com/openclaw/clawsweeper/actions/runs/24949636772)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4218 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4207 |
| Open items total | 8425 |
| Reviewed files | 8223 |
| Unreviewed open items | 202 |
| Archived closed files | 11074 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4129 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4069 |
| Proposed PR closes | 287 (7.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8198 |
| Proposed closes awaiting apply | 287 (3.5% of fresh reviews) |
| Closed by Codex apply | 8666 |
| Failed or stale reviews | 25 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 275/958 current (683 due, 28.7%) |
| Hourly hot item cadence (<7d) | 275/958 current (683 due, 28.7%) |
| Daily cadence coverage | 5184/5272 current (88 due, 98.3%) |
| Daily PR cadence | 3560/3634 current (74 due, 98%) |
| Daily new issue cadence (<30d) | 1624/1638 current (14 due, 99.1%) |
| Weekly older issue cadence | 1991/1993 current (2 due, 99.9%) |
| Due now by cadence | 975 |

### Latest Run Activity

Latest review: Apr 26, 2026, 05:56 UTC. Latest close: Apr 26, 2026, 05:44 UTC. Latest comment sync: Apr 26, 2026, 05:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 250 | 165 | 85 | 0 | 7 | 106 | 5 |
| Last hour | 1019 | 271 | 748 | 2 | 175 | 367 | 7 |
| Last 24 hours | 10533 | 2322 | 8211 | 38 | 5337 | 1138 | 175 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#37841](https://github.com/openclaw/openclaw/issues/37841) | [Bug]: Session text invisible to user when message tool sends media on WhatsApp | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/37841.md) | complete | Apr 26, 2026, 05:56 UTC |
| [#68586](https://github.com/openclaw/openclaw/pull/68586) | fix(memory-core): resolve runtime artifacts before wiki bridge status | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68586.md) | complete | Apr 26, 2026, 05:55 UTC |
| [#68557](https://github.com/openclaw/openclaw/pull/68557) | fix(ui): include cache tokens in ctx% badge and cache-hit-rate | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68557.md) | complete | Apr 26, 2026, 05:55 UTC |
| [#68682](https://github.com/openclaw/openclaw/pull/68682) | anthropic: stop forcing Claude CLI permission bypass | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68682.md) | complete | Apr 26, 2026, 05:55 UTC |
| [#69231](https://github.com/openclaw/openclaw/pull/69231) | docs: add heartbeat configuration examples to config CLI reference | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69231.md) | complete | Apr 26, 2026, 05:55 UTC |
| [#68641](https://github.com/openclaw/openclaw/pull/68641) | Fix Control UI image history rendering | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68641.md) | complete | Apr 26, 2026, 05:55 UTC |
| [#68334](https://github.com/openclaw/openclaw/pull/68334) | fix(memory): split restoreMemoryPluginState into restore/merge for cache-hit bug | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68334.md) | complete | Apr 26, 2026, 05:55 UTC |
| [#69257](https://github.com/openclaw/openclaw/pull/69257) | docs: add gog tasks commands to SKILL.md | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69257.md) | complete | Apr 26, 2026, 05:54 UTC |
| [#68420](https://github.com/openclaw/openclaw/pull/68420) | Agents/fallback: rotate to fallback model on incomplete-turn exits | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68420.md) | complete | Apr 26, 2026, 05:54 UTC |
| [#68991](https://github.com/openclaw/openclaw/pull/68991) | fix(auto-reply): don't persist automatic fallback runtime as next-turn selected model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68991.md) | complete | Apr 26, 2026, 05:54 UTC |

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
