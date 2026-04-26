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

Last dashboard update: Apr 26, 2026, 23:26 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 23:26 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24969711665](https://github.com/openclaw/clawsweeper/actions/runs/24969711665)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3700 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3537 |
| Open items total | 7237 |
| Reviewed files | 7141 |
| Unreviewed open items | 96 |
| Archived closed files | 12619 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3680 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3459 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7139 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10005 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 35/782 current (747 due, 4.5%) |
| Hourly hot item cadence (<7d) | 35/782 current (747 due, 4.5%) |
| Daily cadence coverage | 4405/4472 current (67 due, 98.5%) |
| Daily PR cadence | 2974/3032 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1431/1440 current (9 due, 99.4%) |
| Weekly older issue cadence | 1887/1887 current (0 due, 100%) |
| Due now by cadence | 910 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 26, 2026, 18:26 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7283 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 2 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 2 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | Protected proposed close | feat(whatsapp): add reply quoting via replyToMode | closed/57413.md |
| [#60460](https://github.com/openclaw/openclaw/pull/60460) | Protected proposed close | Enforce browser profile CDP policy | closed/60460.md |
| [#61960](https://github.com/openclaw/openclaw/pull/61960) | Stale review | docs: require i18n postprocess before skip | items/61960.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 23:09 UTC. Latest close: Apr 26, 2026, 22:19 UTC. Latest comment sync: Apr 26, 2026, 23:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 18 | 0 |
| Last hour | 67 | 1 | 66 | 0 | 0 | 38 | 4 |
| Last 24 hours | 9326 | 2147 | 7179 | 0 | 2074 | 2184 | 15 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72380](https://github.com/openclaw/openclaw/issues/72380) | [v2026.4.24] doctor --fix installs bundled deps to wrong dir; ENOTEMPTY in plugin-sdk alias crashes node host | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/72380.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72380.md) |
| [#72166](https://github.com/openclaw/openclaw/issues/72166) | Request: Add cron.enabled and compaction.mode to ALLOWED_GATEWAY_CONFIG_PATHS | duplicate or superseded | Apr 26, 2026, 22:19 UTC | [closed/72166.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72166.md) |
| [#72094](https://github.com/openclaw/openclaw/issues/72094) | Feature request: route desktop-control tasks through Codex Desktop Computer Use, not only PeekabooBridge | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/72094.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72094.md) |
| [#70869](https://github.com/openclaw/openclaw/issues/70869) | delivery-mirror: writes role:assistant into parent session without paired user message, violating Anthropic alternation | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/70869.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70869.md) |
| [#70053](https://github.com/openclaw/openclaw/issues/70053) | sub-agent dispatch: in-process spawn hits gateway pairing gate (no in-process lane shortcut) | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/70053.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70053.md) |
| [#72321](https://github.com/openclaw/openclaw/issues/72321) | Context usage % display bug: cumulative cacheRead/cacheWrite divided by context window size instead of current conversation tokens | already implemented on main | Apr 26, 2026, 22:01 UTC | [closed/72321.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72321.md) |
| [#72282](https://github.com/openclaw/openclaw/issues/72282) | [Bug]: Mattermost channel messages no longer received via WebSocket — regression in 2026.4.24 (DMs still work) | duplicate or superseded | Apr 26, 2026, 22:01 UTC | [closed/72282.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72282.md) |
| [#71612](https://github.com/openclaw/openclaw/pull/71612) | fix(loop-detection): reset toolCallHistory on long idle gaps | already implemented on main | Apr 26, 2026, 22:01 UTC | [closed/71612.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71612.md) |
| [#70590](https://github.com/openclaw/openclaw/issues/70590) | [Feature]: Solve the problem of hard-coded language | duplicate or superseded | Apr 26, 2026, 22:00 UTC | [closed/70590.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70590.md) |
| [#70003](https://github.com/openclaw/openclaw/issues/70003) | Support concurrent user turns during long-running tool execution | already implemented on main | Apr 26, 2026, 22:00 UTC | [closed/70003.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70003.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#44395](https://github.com/openclaw/openclaw/issues/44395) | feat: heading-aware chunking + entity extraction for memory search | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44395.md) | complete | Apr 26, 2026, 23:09 UTC |
| [#50818](https://github.com/openclaw/openclaw/pull/50818) | fix(heartbeat): propagate sessionKey in exec/hooks to fix async context loss | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50818.md) | complete | Apr 26, 2026, 23:09 UTC |
| [#72027](https://github.com/openclaw/openclaw/pull/72027) | fix(gateway): reduce pricing fetch timeout from 60s to 10s | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72027.md) | complete | Apr 26, 2026, 23:09 UTC |
| [#47994](https://github.com/openclaw/openclaw/pull/47994) | fix(agent): prevent fallback model from permanently overwriting agent config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47994.md) | complete | Apr 26, 2026, 23:09 UTC |
| [#69379](https://github.com/openclaw/openclaw/pull/69379) | fix(compaction): preflight/memoryFlush gates respect reserveTokens above floor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69379.md) | complete | Apr 26, 2026, 23:09 UTC |
| [#40215](https://github.com/openclaw/openclaw/issues/40215) | Feature: Show cumulative context usage in /usage footer (model + context tokens / window) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40215.md) | complete | Apr 26, 2026, 23:09 UTC |
| [#40255](https://github.com/openclaw/openclaw/issues/40255) | [Bug]: Regression: User-configured heartbeat prompt no longer respected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40255.md) | complete | Apr 26, 2026, 23:08 UTC |
| [#40247](https://github.com/openclaw/openclaw/pull/40247) | fix(gateway): bind to loopback alongside tailnet/custom IPs for internal calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40247.md) | complete | Apr 26, 2026, 23:08 UTC |
| [#69051](https://github.com/openclaw/openclaw/pull/69051) | [tts][personality] source-text metadata + provider capability handling (#69051 PR-A of 4) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/69051.md) | complete | Apr 26, 2026, 23:08 UTC |
| [#40205](https://github.com/openclaw/openclaw/pull/40205) | fix(ollama): migrate embedding provider from deprecated /api/embeddings to /api/embed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40205.md) | complete | Apr 26, 2026, 23:08 UTC |

</details>

## How It Works

ClawSweeper has two independent lanes.

### Review Lane

Review is proposal-only. It never closes items.

- A planner scans open issues and PRs, then assigns exact item numbers to shards.
- Manual runs can pass `item_number` or comma-separated `item_numbers` to review
  exact Audit Health findings without scanning for a normal batch.
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

Apply wakes every 15 minutes, no-ops when there are no unchanged
high-confidence close proposals, and narrows scheduled runs to the currently
eligible proposal list so idle runs do not scan unrelated keep-open records.
It defaults to all item kinds, no age floor, a 2-second close delay, and 50
fresh closes per checkpoint. If it reaches the requested limit, it queues
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
npm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
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
