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

Last dashboard update: Apr 26, 2026, 05:37 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 05:37 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 20 hot-intake item(s). Item numbers: 60017,60298,60668,60718,60784,60934,61226,61228,61331,61386,61392,61538,61638,61687,61824,61926,62194,62257,62429,62479.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24949193835](https://github.com/openclaw/clawsweeper/actions/runs/24949193835)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4232 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4208 |
| Open items total | 8440 |
| Reviewed files | 8236 |
| Unreviewed open items | 204 |
| Archived closed files | 11061 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 4143 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4071 |
| Proposed PR closes | 250 (6.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 8214 |
| Proposed closes awaiting apply | 250 (3% of fresh reviews) |
| Closed by Codex apply | 8658 |
| Failed or stale reviews | 22 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 244/964 current (720 due, 25.3%) |
| Hourly hot item cadence (<7d) | 244/964 current (720 due, 25.3%) |
| Daily cadence coverage | 5192/5278 current (86 due, 98.4%) |
| Daily PR cadence | 3561/3633 current (72 due, 98%) |
| Daily new issue cadence (<30d) | 1631/1645 current (14 due, 99.1%) |
| Weekly older issue cadence | 1992/1994 current (2 due, 99.9%) |
| Due now by cadence | 1012 |

### Latest Run Activity

Latest review: Apr 26, 2026, 05:35 UTC. Latest close: Apr 26, 2026, 05:27 UTC. Latest comment sync: Apr 26, 2026, 05:37 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 56 | 24 | 32 | 0 | 36 | 251 | 11 |
| Last hour | 798 | 103 | 695 | 1 | 287 | 504 | 12 |
| Last 24 hours | 10610 | 2336 | 8274 | 35 | 5508 | 1163 | 186 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#61926](https://github.com/openclaw/openclaw/pull/61926) | feat: add openclaw video CLI (generate, list, status) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61926.md) | complete | Apr 26, 2026, 05:35 UTC |
| [#60718](https://github.com/openclaw/openclaw/pull/60718) | fix: resolve startedAt timestamp inversion in task registry | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60718.md) | complete | Apr 26, 2026, 05:34 UTC |
| [#60298](https://github.com/openclaw/openclaw/pull/60298) | feat: add Atomic Chat local LLM provider plugin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60298.md) | complete | Apr 26, 2026, 05:34 UTC |
| [#61538](https://github.com/openclaw/openclaw/pull/61538) | feat(memory): add Jina AI embeddings provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61538.md) | complete | Apr 26, 2026, 05:34 UTC |
| [#60934](https://github.com/openclaw/openclaw/pull/60934) | fix(auth): respect auth override by filtering profiles (token/oauth) (closes #60930) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60934.md) | complete | Apr 26, 2026, 05:34 UTC |
| [#60668](https://github.com/openclaw/openclaw/pull/60668) | fix(control-ui): keep browser session-key helpers off server-only imports | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60668.md) | complete | Apr 26, 2026, 05:34 UTC |
| [#62257](https://github.com/openclaw/openclaw/pull/62257) | fix(github-copilot): return IDE identity headers from prepareRuntimeAuth | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62257.md) | complete | Apr 26, 2026, 05:34 UTC |
| [#62194](https://github.com/openclaw/openclaw/pull/62194) | fix(plugin-sdk): normalize bundled entry imports on Windows | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62194.md) | complete | Apr 26, 2026, 05:33 UTC |
| [#60017](https://github.com/openclaw/openclaw/pull/60017) | fix: improve reminder scheduling guidance for relative times | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60017.md) | complete | Apr 26, 2026, 05:33 UTC |
| [#61386](https://github.com/openclaw/openclaw/pull/61386) | fix(heartbeat): clamp setTimeout delay to prevent 32-bit overflow | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61386.md) | complete | Apr 26, 2026, 05:33 UTC |

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
