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

Last dashboard update: Apr 26, 2026, 06:41 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 06:41 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24950333879](https://github.com/openclaw/clawsweeper/actions/runs/24950333879)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4217 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4007 |
| Open items total | 8224 |
| Reviewed files | 8005 |
| Unreviewed open items | 219 |
| Archived closed files | 11292 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4101 |
| Proposed issue closes | 57 (1.4% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3843 |
| Proposed PR closes | 122 (3.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7944 |
| Proposed closes awaiting apply | 179 (2.3% of fresh reviews) |
| Closed by Codex apply | 8806 |
| Failed or stale reviews | 61 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 267/944 current (677 due, 28.3%) |
| Hourly hot item cadence (<7d) | 267/944 current (677 due, 28.3%) |
| Daily cadence coverage | 4955/5069 current (114 due, 97.8%) |
| Daily PR cadence | 3346/3436 current (90 due, 97.4%) |
| Daily new issue cadence (<30d) | 1609/1633 current (24 due, 98.5%) |
| Weekly older issue cadence | 1985/1992 current (7 due, 99.6%) |
| Due now by cadence | 1017 |

### Audit Health

<!-- clawsweeper-audit:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 06:28 UTC. Latest close: Apr 26, 2026, 06:39 UTC. Latest comment sync: Apr 26, 2026, 06:39 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 10 | 4 | 6 | 0 | 70 | 64 | 1 |
| Last hour | 766 | 288 | 478 | 1 | 130 | 142 | 4 |
| Last 24 hours | 10458 | 2374 | 8084 | 74 | 5289 | 1128 | 159 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70563](https://github.com/openclaw/openclaw/issues/70563) | Subagent spawn fails: thinking enabled but reasoning_content missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70563.md) | complete | Apr 26, 2026, 06:28 UTC |
| [#70591](https://github.com/openclaw/openclaw/issues/70591) | [ClawX] Session freezes after compaction — Thinking... stuck, stop button not working | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70591.md) | complete | Apr 26, 2026, 06:27 UTC |
| [#70622](https://github.com/openclaw/openclaw/issues/70622) | [Bug]: assistant turn can enter repeated terminated state immediately after a tool error instead of reporting the failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70622.md) | complete | Apr 26, 2026, 06:27 UTC |
| [#70582](https://github.com/openclaw/openclaw/issues/70582) | LCM compaction sends deprecated  parameter to claude-opus-4-7, causing repeated API errors and retry loops | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70582.md) | complete | Apr 26, 2026, 06:27 UTC |
| [#70753](https://github.com/openclaw/openclaw/issues/70753) | Bundled HTTP MCP client times out against hosted SSE server even when endpoint responds in <1s | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70753.md) | complete | Apr 26, 2026, 06:26 UTC |
| [#70416](https://github.com/openclaw/openclaw/issues/70416) | cost.cacheWrite field wrong by ~5 orders of magnitude for claude-opus-4-7 (missing price table entry) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70416.md) | complete | Apr 26, 2026, 06:26 UTC |
| [#70618](https://github.com/openclaw/openclaw/issues/70618) | Session crashes with Context overflow when large Project Context is injected at session start | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70618.md) | complete | Apr 26, 2026, 06:26 UTC |
| [#70752](https://github.com/openclaw/openclaw/issues/70752) | gateway install can early-return already-installed while loaded LaunchAgent still embeds stale OPENCLAW_GATEWAY_TOKEN | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70752.md) | complete | Apr 26, 2026, 06:26 UTC |
| [#70659](https://github.com/openclaw/openclaw/issues/70659) | QA-lab extension test fails on current main: aborts in-flight runner model catalog | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70659.md) | complete | Apr 26, 2026, 06:26 UTC |
| [#70453](https://github.com/openclaw/openclaw/issues/70453) | [Bug]: CLI and WebUI silent failure/hang when calling Gemini via HTTP proxy (v2026.4.21) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70453.md) | complete | Apr 26, 2026, 06:26 UTC |

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
