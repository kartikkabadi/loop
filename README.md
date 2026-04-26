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

Last dashboard update: Apr 26, 2026, 02:38 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 02:38 UTC

State: Review publish complete

Merged review artifacts for run 24946210130. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24946210130](https://github.com/openclaw/clawsweeper/actions/runs/24946210130)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5320 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4247 |
| Open items total | 9567 |
| Reviewed files | 9408 |
| Unreviewed open items | 159 |
| Archived closed files | 9889 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 5269 |
| Proposed issue closes | 852 (16.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 4138 |
| Proposed PR closes | 104 (2.5% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 9407 |
| Proposed closes awaiting apply | 956 (10.2% of fresh reviews) |
| Closed by Codex apply | 7632 |
| Failed or stale reviews | 1 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 13/1043 current (1030 due, 1.2%) |
| Hourly hot item cadence (<7d) | 13/1043 current (1030 due, 1.2%) |
| Daily cadence coverage | 5578/5749 current (171 due, 97%) |
| Daily PR cadence | 3563/3664 current (101 due, 97.2%) |
| Daily new issue cadence (<30d) | 2015/2085 current (70 due, 96.6%) |
| Weekly older issue cadence | 2615/2616 current (1 due, 100%) |
| Due now by cadence | 1361 |

### Latest Run Activity

Latest review: Apr 26, 2026, 02:37 UTC. Latest close: Apr 26, 2026, 01:49 UTC. Latest comment sync: Apr 26, 2026, 02:34 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 250 | 36 | 214 | 0 | 0 | 354 | 6 |
| Last hour | 1000 | 84 | 916 | 0 | 19 | 373 | 6 |
| Last 24 hours | 11412 | 2743 | 8669 | 15 | 5527 | 467 | 205 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65156](https://github.com/openclaw/openclaw/issues/65156) | [Bug] Memory vector search broken in v4.11 — sqlite-vec loads but registers no functions (SQLite ABI mismatch) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65156.md) | complete | Apr 26, 2026, 02:37 UTC |
| [#65123](https://github.com/openclaw/openclaw/pull/65123) | fix(discord): preserve explicit target kind when parsing recipients | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65123.md) | complete | Apr 26, 2026, 02:36 UTC |
| [#65131](https://github.com/openclaw/openclaw/issues/65131) | Feature Request: Option to hide system messages from Control UI chat window | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65131.md) | complete | Apr 26, 2026, 02:36 UTC |
| [#65190](https://github.com/openclaw/openclaw/pull/65190) | feat(i18n): add Vietnamese (vi-VN) localization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65190.md) | complete | Apr 26, 2026, 02:36 UTC |
| [#65194](https://github.com/openclaw/openclaw/pull/65194) | fix(imessage): avoid duplicate default monitor startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65194.md) | complete | Apr 26, 2026, 02:35 UTC |
| [#65161](https://github.com/openclaw/openclaw/issues/65161) | Heartbeat isolated mode: cadence stalls, 'heartbeat last' mislabels exec-events, lightContext stays heavy, heartbeat-state writer appears missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65161.md) | complete | Apr 26, 2026, 02:35 UTC |
| [#65115](https://github.com/openclaw/openclaw/pull/65115) | fix: resolve 8 GUI bugs in webchat Control UI and TUI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65115.md) | complete | Apr 26, 2026, 02:35 UTC |
| [#65165](https://github.com/openclaw/openclaw/issues/65165) | [Bug]:  图片上传失败：模型不支持图片，但配置了 input: [\"text\", \"image\"] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65165.md) | complete | Apr 26, 2026, 02:35 UTC |
| [#65195](https://github.com/openclaw/openclaw/issues/65195) | exec/runtime cannot reach LAN host on macOS while interactive shell can | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65195.md) | complete | Apr 26, 2026, 02:35 UTC |
| [#65143](https://github.com/openclaw/openclaw/pull/65143) | feat(models): add per-provider timeoutSeconds config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65143.md) | complete | Apr 26, 2026, 02:35 UTC |

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
