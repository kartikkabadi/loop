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

Last dashboard update: Apr 26, 2026, 02:01 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 02:01 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 19 hot-intake item(s). Item numbers: 38502,38597,38607,38609,38664,38670,38713,38729,38744,38780,38781,38846,38881,38932,38939,38945,39001,66864,67049,71379.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24945724917](https://github.com/openclaw/clawsweeper/actions/runs/24945724917)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5342 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4252 |
| Open items total | 9594 |
| Reviewed files | 9444 |
| Unreviewed open items | 150 |
| Archived closed files | 9853 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 5294 |
| Proposed issue closes | 833 (15.7% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4149 |
| Proposed PR closes | 83 (2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 9443 |
| Proposed closes awaiting apply | 916 (9.7% of fresh reviews) |
| Closed by Codex apply | 7632 |
| Failed or stale reviews | 1 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 23/1057 current (1034 due, 2.2%) |
| Hourly hot item cadence (<7d) | 23/1057 current (1034 due, 2.2%) |
| Daily cadence coverage | 5625/5762 current (137 due, 97.6%) |
| Daily PR cadence | 3577/3671 current (94 due, 97.4%) |
| Daily new issue cadence (<30d) | 2048/2091 current (43 due, 97.9%) |
| Weekly older issue cadence | 2624/2625 current (1 due, 100%) |
| Due now by cadence | 1322 |

### Latest Run Activity

Latest review: Apr 26, 2026, 01:59 UTC. Latest close: Apr 26, 2026, 01:49 UTC. Latest comment sync: Apr 26, 2026, 02:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 139 | 17 | 122 | 0 | 7 | 75 | 1 |
| Last hour | 772 | 122 | 650 | 1 | 49 | 391 | 7 |
| Last 24 hours | 11643 | 2862 | 8781 | 15 | 5638 | 454 | 202 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#38945](https://github.com/openclaw/openclaw/pull/38945) | fix(memory): Unicode support for MMR and FTS tokenizers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38945.md) | complete | Apr 26, 2026, 01:59 UTC |
| [#38609](https://github.com/openclaw/openclaw/pull/38609) | fix(feishu): fix card action context fields and chat_type detection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38609.md) | complete | Apr 26, 2026, 01:59 UTC |
| [#38607](https://github.com/openclaw/openclaw/issues/38607) | Discord: CJK text splits at wrong character boundaries when message exceeds 2000 chars | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38607.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38781](https://github.com/openclaw/openclaw/pull/38781) | adding system.run.prepare | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38781.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38744](https://github.com/openclaw/openclaw/pull/38744) | feat(ios): add ElevenLabs realtime WebSocket STT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38744.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#39001](https://github.com/openclaw/openclaw/pull/39001) | fix(feishu): preserve sender identity and resolve mentions in merge_forward messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39001.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38597](https://github.com/openclaw/openclaw/issues/38597) | CJK text splitting breaks mid-character at Discord 2000-char boundary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38597.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38881](https://github.com/openclaw/openclaw/pull/38881) | Fix imageModel auto-switch when primary model doesn't support vision | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38881.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38729](https://github.com/openclaw/openclaw/pull/38729) | feat(thinking): register supportsXHighThinking for Anthropic provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38729.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38939](https://github.com/openclaw/openclaw/pull/38939) | feishu: arbitrate group mentions across main and specialists | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38939.md) | complete | Apr 26, 2026, 01:58 UTC |

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

Apply defaults to issue-only closes, no age floor, 5-second close delay, and
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
