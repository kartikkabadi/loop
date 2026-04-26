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

Last dashboard update: Apr 26, 2026, 19:53 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 19:53 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 24965502728. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24965502728](https://github.com/openclaw/clawsweeper/actions/runs/24965502728)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3722 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3537 |
| Open items total | 7258 |
| Reviewed files | 7165 |
| Unreviewed open items | 93 |
| Archived closed files | 12532 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3694 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3468 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7162 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 9947 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 0/784 current (784 due, 0%) |
| Hourly hot item cadence (<7d) | 0/784 current (784 due, 0%) |
| Daily cadence coverage | 4422/4490 current (68 due, 98.5%) |
| Daily PR cadence | 2990/3049 current (59 due, 98.1%) |
| Daily new issue cadence (<30d) | 1432/1441 current (9 due, 99.4%) |
| Weekly older issue cadence | 1891/1891 current (0 due, 100%) |
| Due now by cadence | 945 |

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

Latest review: Apr 26, 2026, 19:52 UTC. Latest close: Apr 26, 2026, 19:01 UTC. Latest comment sync: Apr 26, 2026, 19:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 520 | 1 | 519 | 0 | 0 | 0 | 0 |
| Last hour | 560 | 1 | 559 | 0 | 39 | 173 | 2 |
| Last 24 hours | 9853 | 2624 | 7229 | 1 | 2036 | 2240 | 11 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#39037](https://github.com/openclaw/openclaw/issues/39037) | WhatsApp channel: expose ctwa_clid from Click-to-WhatsApp ads in session metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39037.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#39141](https://github.com/openclaw/openclaw/issues/39141) | [Feature]: Optional session activity watchdog and alerts (blocked by #39127) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39141.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#38844](https://github.com/openclaw/openclaw/issues/38844) | [Bug]: browser upload/file chooser flow is flaky and can misreport stale-click failures as browser control timeouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38844.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#39038](https://github.com/openclaw/openclaw/issues/39038) | [Bug]: OpenClaw节点程序在Windows 11 24H2上启动后卡在PATH信息，无法连接Gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39038.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#38923](https://github.com/openclaw/openclaw/pull/38923) | Fix/38439 webchat avatar identity md | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38923.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#39245](https://github.com/openclaw/openclaw/pull/39245) | fix(agents): normalize mangled tool names and IDs from OpenAI-compati… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39245.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#39457](https://github.com/openclaw/openclaw/issues/39457) | [Feature]: post-update hook / lifecycle script support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39457.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#38817](https://github.com/openclaw/openclaw/issues/38817) | [Bug]: Volcengine/Kimi models fail parameter validation due to unsupported minLength keyword / 火山引擎/Kimi系列模型因不支持minLength关键字导致参数校验失败 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38817.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#38520](https://github.com/openclaw/openclaw/issues/38520) | Feature: Pre-compaction agent notification, structured handoff window, and deferral mechanism | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38520.md) | complete | Apr 26, 2026, 19:52 UTC |
| [#38816](https://github.com/openclaw/openclaw/issues/38816) | [Bug]: Image tool incorrectly adds anthropic provider prefix to all model IDs / 图像工具自动为所有模型ID错误添加anthropic provider前缀 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38816.md) | complete | Apr 26, 2026, 19:51 UTC |

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
