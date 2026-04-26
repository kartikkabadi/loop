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

Last dashboard update: Apr 26, 2026, 23:50 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 23:50 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24970174387](https://github.com/openclaw/clawsweeper/actions/runs/24970174387)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3702 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3541 |
| Open items total | 7243 |
| Reviewed files | 7150 |
| Unreviewed open items | 93 |
| Archived closed files | 12621 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3684 |
| Proposed issue closes | 10 (0.3% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3463 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7147 |
| Proposed closes awaiting apply | 12 (0.2% of fresh reviews) |
| Closed by Codex apply | 10006 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 513/790 current (277 due, 64.9%) |
| Hourly hot item cadence (<7d) | 513/790 current (277 due, 64.9%) |
| Daily cadence coverage | 4405/4472 current (67 due, 98.5%) |
| Daily PR cadence | 2974/3032 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1431/1440 current (9 due, 99.4%) |
| Weekly older issue cadence | 1888/1888 current (0 due, 100%) |
| Due now by cadence | 437 |

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

Latest review: Apr 26, 2026, 23:49 UTC. Latest close: Apr 26, 2026, 23:50 UTC. Latest comment sync: Apr 26, 2026, 23:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 472 | 11 | 461 | 1 | 1 | 4 | 0 |
| Last hour | 544 | 14 | 530 | 1 | 1 | 43 | 1 |
| Last 24 hours | 9219 | 2045 | 7174 | 1 | 2075 | 2173 | 11 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72374](https://github.com/openclaw/openclaw/issues/72374) | Bundled runtime dependency staging should create an isolated package root before npm install | already implemented on main | Apr 26, 2026, 23:50 UTC | [closed/72374.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72374.md) |
| [#72380](https://github.com/openclaw/openclaw/issues/72380) | [v2026.4.24] doctor --fix installs bundled deps to wrong dir; ENOTEMPTY in plugin-sdk alias crashes node host | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/72380.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72380.md) |
| [#72166](https://github.com/openclaw/openclaw/issues/72166) | Request: Add cron.enabled and compaction.mode to ALLOWED_GATEWAY_CONFIG_PATHS | duplicate or superseded | Apr 26, 2026, 22:19 UTC | [closed/72166.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72166.md) |
| [#72094](https://github.com/openclaw/openclaw/issues/72094) | Feature request: route desktop-control tasks through Codex Desktop Computer Use, not only PeekabooBridge | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/72094.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72094.md) |
| [#70869](https://github.com/openclaw/openclaw/issues/70869) | delivery-mirror: writes role:assistant into parent session without paired user message, violating Anthropic alternation | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/70869.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70869.md) |
| [#70053](https://github.com/openclaw/openclaw/issues/70053) | sub-agent dispatch: in-process spawn hits gateway pairing gate (no in-process lane shortcut) | already implemented on main | Apr 26, 2026, 22:19 UTC | [closed/70053.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70053.md) |
| [#72321](https://github.com/openclaw/openclaw/issues/72321) | Context usage % display bug: cumulative cacheRead/cacheWrite divided by context window size instead of current conversation tokens | already implemented on main | Apr 26, 2026, 22:01 UTC | [closed/72321.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72321.md) |
| [#72282](https://github.com/openclaw/openclaw/issues/72282) | [Bug]: Mattermost channel messages no longer received via WebSocket — regression in 2026.4.24 (DMs still work) | duplicate or superseded | Apr 26, 2026, 22:01 UTC | [closed/72282.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72282.md) |
| [#71612](https://github.com/openclaw/openclaw/pull/71612) | fix(loop-detection): reset toolCallHistory on long idle gaps | already implemented on main | Apr 26, 2026, 22:01 UTC | [closed/71612.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71612.md) |
| [#70590](https://github.com/openclaw/openclaw/issues/70590) | [Feature]: Solve the problem of hard-coded language | duplicate or superseded | Apr 26, 2026, 22:00 UTC | [closed/70590.md](https://github.com/openclaw/clawsweeper/blob/main/closed/70590.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72287](https://github.com/openclaw/openclaw/pull/72287) | [plugin sdk] Add generic plugin host-hook contracts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72287.md) | complete | Apr 26, 2026, 23:49 UTC |
| [#71736](https://github.com/openclaw/openclaw/issues/71736) | [RFC] Control UI plugin contribution slots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71736.md) | failed | Apr 26, 2026, 23:48 UTC |
| [#72418](https://github.com/openclaw/openclaw/issues/72418) | [Bug]: shouldSkipBackendSelfPairing allows loopback clients to self-declare GATEWAY_CLIENT identity and bypass device pairing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72418.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#70529](https://github.com/openclaw/openclaw/issues/70529) | [Bug]: Desktop cannot use existing Chrome sessions: EasyClaw Google sign-in fails, and user profile attach fails with spawn npx ENOENT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70529.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#70578](https://github.com/openclaw/openclaw/issues/70578) | Silent config data loss: Zod `.strict()` strips unknown top-level fields on round-trip | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70578.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#72402](https://github.com/openclaw/openclaw/issues/72402) | Ollama Cloud models should receive native think: max instead of mapped think: high | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72402.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#71645](https://github.com/openclaw/openclaw/pull/71645) | Mattermost streaming text fix [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71645.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#72360](https://github.com/openclaw/openclaw/issues/72360) | [Bug]: /allowlist --store bypasses channel configWrites policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72360.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#72341](https://github.com/openclaw/openclaw/issues/72341) | Control UI / WebChat: assistant text-between-tools blocks render as cumulative duplicates instead of fresh cards | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72341.md) | complete | Apr 26, 2026, 23:43 UTC |
| [#70824](https://github.com/openclaw/openclaw/pull/70824) | fix: merge mode no longer drops image attachments when one provider lacks apiKey | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70824.md) | complete | Apr 26, 2026, 23:42 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

- hot/new and recently active items are checked hourly, with a 5-minute intake
  schedule for the newest queue edge
- pull requests and issues younger than 30 days are checked daily once they
  leave the hot window
- older inactive issues are checked weekly
- apply wakes every 15 minutes and exits quickly when there are no unchanged
  high-confidence close proposals

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
- After publish, the lane checks the selected items' single marker-backed Codex
  review comment. Missing comments and missing metadata are synced immediately;
  existing comments are refreshed only when stale, currently weekly.

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

There is still one deterministic apply path for writes. Review can propose and
sync stale public review comments, but closing remains guarded by apply so a
fresh GitHub snapshot, labels, maintainer-authorship, and unchanged item state
are checked immediately before mutation.

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

Sync durable review comments without closing:

```bash
source ~/.profile
npm run apply-decisions -- --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
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
