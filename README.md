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

Last dashboard update: Apr 26, 2026, 04:12 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 04:12 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh issue closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24947944173](https://github.com/openclaw/clawsweeper/actions/runs/24947944173)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4753 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4219 |
| Open items total | 8972 |
| Reviewed files | 8787 |
| Unreviewed open items | 185 |
| Archived closed files | 10510 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4674 |
| Proposed issue closes | 453 (9.7% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4095 |
| Proposed PR closes | 179 (4.4% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8769 |
| Proposed closes awaiting apply | 632 (7.2% of fresh reviews) |
| Closed by Codex apply | 8152 |
| Failed or stale reviews | 18 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 16/1012 current (996 due, 1.6%) |
| Hourly hot item cadence (<7d) | 16/1012 current (996 due, 1.6%) |
| Daily cadence coverage | 5618/5700 current (82 due, 98.6%) |
| Daily PR cadence | 3574/3643 current (69 due, 98.1%) |
| Daily new issue cadence (<30d) | 2044/2057 current (13 due, 99.4%) |
| Weekly older issue cadence | 2072/2075 current (3 due, 99.9%) |
| Due now by cadence | 1266 |

### Latest Run Activity

Latest review: Apr 26, 2026, 04:09 UTC. Latest close: Apr 26, 2026, 04:10 UTC. Latest comment sync: Apr 26, 2026, 04:10 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 250 | 46 | 204 | 0 | 62 | 64 | 1 |
| Last hour | 948 | 169 | 779 | 1 | 246 | 267 | 4 |
| Last 24 hours | 10948 | 2475 | 8473 | 30 | 5592 | 542 | 190 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68599](https://github.com/openclaw/openclaw/pull/68599) | agents/compaction: hint at toolResultMaxChars when overflow persists after compaction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68599.md) | complete | Apr 26, 2026, 04:09 UTC |
| [#68560](https://github.com/openclaw/openclaw/pull/68560) | fix: strip base64 image data from tool results before persistence | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68560.md) | complete | Apr 26, 2026, 04:09 UTC |
| [#68496](https://github.com/openclaw/openclaw/issues/68496) | Add Hermes Agent ACP harness support | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68496.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68532](https://github.com/openclaw/openclaw/issues/68532) | web_fetch tool blocks GitHub due to false positive private IP detection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68532.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68478](https://github.com/openclaw/openclaw/issues/68478) | Auto system messages spam the chat (e.g. '💾 Cron job created', '💾 Skill installed') | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68478.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68452](https://github.com/openclaw/openclaw/issues/68452) | [Bug]: isolated cron turns can misclassify exact `NO_REPLY` tool results as incomplete when the final assistant message is empty | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68452.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68567](https://github.com/openclaw/openclaw/pull/68567) | fix(gateway): disable stale plugin cache at startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68567.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68558](https://github.com/openclaw/openclaw/pull/68558) | fix(auto-reply): stop rendering misleading /compact labels on small sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68558.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68539](https://github.com/openclaw/openclaw/issues/68539) | Support voice transcription for openai-codex without API key and independent from Codex message limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68539.md) | complete | Apr 26, 2026, 04:08 UTC |
| [#68576](https://github.com/openclaw/openclaw/issues/68576) | [Bug]: Native OpenClaw is extremely slow/unresponsive with Feishu (Lark) in mainland China vs. Chinese fork | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68576.md) | complete | Apr 26, 2026, 04:08 UTC |

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
