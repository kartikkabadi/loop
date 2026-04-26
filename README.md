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

Last dashboard update: Apr 26, 2026, 06:46 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 06:46 UTC

State: Apply finished

Apply/comment-sync run finished with 20 fresh closes out of requested limit 20. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24950395066](https://github.com/openclaw/clawsweeper/actions/runs/24950395066)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4217 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3966 |
| Open items total | 8183 |
| Reviewed files | 7961 |
| Unreviewed open items | 222 |
| Archived closed files | 11336 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4107 |
| Proposed issue closes | 85 (2.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3814 |
| Proposed PR closes | 102 (2.7% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7921 |
| Proposed closes awaiting apply | 187 (2.4% of fresh reviews) |
| Closed by Codex apply | 8846 |
| Failed or stale reviews | 40 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 386/941 current (555 due, 41%) |
| Hourly hot item cadence (<7d) | 386/941 current (555 due, 41%) |
| Daily cadence coverage | 4931/5028 current (97 due, 98.1%) |
| Daily PR cadence | 3317/3395 current (78 due, 97.7%) |
| Daily new issue cadence (<30d) | 1614/1633 current (19 due, 98.8%) |
| Weekly older issue cadence | 1987/1992 current (5 due, 99.7%) |
| Due now by cadence | 879 |

### Audit Health

<!-- clawsweeper-audit:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 06:44 UTC. Latest close: Apr 26, 2026, 06:46 UTC. Latest comment sync: Apr 26, 2026, 06:46 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 250 | 73 | 177 | 0 | 100 | 99 | 1 |
| Last hour | 1004 | 350 | 654 | 1 | 163 | 137 | 2 |
| Last 24 hours | 10454 | 2416 | 8038 | 53 | 5329 | 1141 | 157 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45900](https://github.com/openclaw/openclaw/pull/45900) | fix(plugins): suppress false-positive duplicate id warning for channel registration pattern | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/45900.md) | complete | Apr 26, 2026, 06:44 UTC |
| [#51455](https://github.com/openclaw/openclaw/issues/51455) | bug: pdf extraction fallback renderer omits standardFontDataUrl and emits PDF.js warnings in Node | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51455.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#46472](https://github.com/openclaw/openclaw/pull/46472) | fix(feishu): add WebSocket heartbeat config to prevent silent disconnection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46472.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#60226](https://github.com/openclaw/openclaw/issues/60226) | Non-image file attachments (PDF/Word/etc) not injected into agent context after upload via webchat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60226.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#71188](https://github.com/openclaw/openclaw/issues/71188) | Windows: Gateway spawns visible cmd.exe every ~16s for LAN/ARP discovery (flashing console window) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71188.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#46578](https://github.com/openclaw/openclaw/pull/46578) | fix: replace console.log with logVerbose in tailscale funnel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/46578.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#46131](https://github.com/openclaw/openclaw/pull/46131) | fix(models): apply provider-level api default in buildInlineProviderModels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46131.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#46356](https://github.com/openclaw/openclaw/pull/46356) | Channels: restore webchat bidirectional sync and add proxy support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46356.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#69229](https://github.com/openclaw/openclaw/issues/69229) | [Bug]: tasks audit reports false-positive inconsistent_timestamps on succeeded/failed/running tasks | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/69229.md) | complete | Apr 26, 2026, 06:42 UTC |
| [#71476](https://github.com/openclaw/openclaw/issues/71476) | Webchat HTTP 401 on __openclaw/ routes after session compaction | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71476.md) | complete | Apr 26, 2026, 06:42 UTC |

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
