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

Last dashboard update: Apr 26, 2026, 03:23 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 03:23 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 16 hot-intake item(s). Item numbers: 12219,12394,12398,12578,12759,15591,16251,17684,18860,40874,40877,40878,50483,50998,51011,58823,66953,71379,71550,71573.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24947085068](https://github.com/openclaw/clawsweeper/actions/runs/24947085068)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5042 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4241 |
| Open items total | 9283 |
| Reviewed files | 9120 |
| Unreviewed open items | 163 |
| Archived closed files | 10177 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4981 |
| Proposed issue closes | 647 (13% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4116 |
| Proposed PR closes | 118 (2.9% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 9097 |
| Proposed closes awaiting apply | 765 (8.4% of fresh reviews) |
| Closed by Codex apply | 7892 |
| Failed or stale reviews | 23 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 6/1028 current (1022 due, 0.6%) |
| Hourly hot item cadence (<7d) | 6/1028 current (1022 due, 0.6%) |
| Daily cadence coverage | 5575/5734 current (159 due, 97.2%) |
| Daily PR cadence | 3551/3657 current (106 due, 97.1%) |
| Daily new issue cadence (<30d) | 2024/2077 current (53 due, 97.4%) |
| Weekly older issue cadence | 2353/2358 current (5 due, 99.8%) |
| Due now by cadence | 1349 |

### Latest Run Activity

Latest review: Apr 26, 2026, 03:20 UTC. Latest close: Apr 26, 2026, 03:20 UTC. Latest comment sync: Apr 26, 2026, 03:23 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 60 | 77 | 3 |
| Last hour | 769 | 113 | 656 | 1 | 198 | 401 | 4 |
| Last 24 hours | 11179 | 2582 | 8597 | 37 | 5564 | 514 | 200 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#66953](https://github.com/openclaw/openclaw/issues/66953) | [Bug]: delivery-mirror transcript written to wrong agent session in multi-account multi-agent config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/66953.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#12394](https://github.com/openclaw/openclaw/issues/12394) | [Feature]: Per-user heartbeat routing for channel-level heartbeat messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12394.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#71573](https://github.com/openclaw/openclaw/pull/71573) | fix(update.run): journal restart continuation so post-update agents can resume their turn (#71178) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71573.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#71550](https://github.com/openclaw/openclaw/pull/71550) | feat(slack): expose channels.slack.logLevel so operators can silence socket-mode pong-timeout noise (#71531) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71550.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#50998](https://github.com/openclaw/openclaw/pull/50998) | fix(ios): restore contacts/calendar permission prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50998.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#51011](https://github.com/openclaw/openclaw/pull/51011) | feat(ios): add Privacy & Access settings for contacts, calendar, and reminders | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/51011.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#12398](https://github.com/openclaw/openclaw/issues/12398) | Feature: Postcondition checks for cron jobs (deterministic verification of agent outcomes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12398.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#40878](https://github.com/openclaw/openclaw/pull/40878) | fix(ios): picker adaptive onChange loop + OSLog string concatenation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40878.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#18860](https://github.com/openclaw/openclaw/pull/18860) | feat(agents): expose tools and their schemas via new after_tools_resolved hook [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18860.md) | complete | Apr 26, 2026, 03:20 UTC |
| [#12759](https://github.com/openclaw/openclaw/issues/12759) | [Feature]: add \"channel: ALL\" label | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/12759.md) | complete | Apr 26, 2026, 03:20 UTC |

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
