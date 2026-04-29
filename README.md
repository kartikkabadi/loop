# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently covers `openclaw/openclaw` and `openclaw/clawhub`.

It has two independent lanes:

- issue/PR sweeper: keeps one markdown report per open issue or PR, publishes
  one durable Codex automated review comment when useful, and only closes items
  when the evidence is strong
- commit sweeper: reviews code-bearing commits that land on `main`, writes one
  canonical markdown report per commit, and optionally publishes a GitHub Check
  Run for that commit

## Capabilities

- **Repository profiles:** per-repository rules live in
  `src/repository-profiles.ts`, so OpenClaw and ClawHub can share the same
  engine while keeping different apply limits.
- **Issue and PR intake:** scheduled runs scan open issues and pull requests,
  while target repositories can forward exact issue/PR events with
  `repository_dispatch` for low-latency one-item reviews.
- **Codex review reports:** each issue or PR becomes
  `records/<repo-slug>/items/<number>.md` with the decision, evidence, proposed
  maintainer-facing comment, runtime metadata, and GitHub snapshot hash.
- **Durable review comments:** ClawSweeper syncs one marker-backed public review
  comment per item and edits it in place instead of posting repeated comments.
  Pull request comments include hidden verdict markers, and actionable PR
  follow-up includes a hidden `clawsweeper-action:fix-required` marker for the
  trusted ClawSweeper repair loop. See
  [`docs/pr-review-comments.md`](docs/pr-review-comments.md).
- **Guarded apply:** apply mode re-fetches live GitHub state, checks labels,
  maintainer authorship, paired issue/PR state, snapshot drift, and repository
  profile rules before commenting or closing anything.
- **Archive and reopen handling:** closed or already-closed reports move to
  `records/<repo-slug>/closed/<number>.md`; reopened archived items move back to
  `items/` as stale work.
- **Dashboard:** this README contains the generated fleet dashboard with current
  run state, cadence health, recent reviews, recent closes, and work candidates.
- **Workflow status markers:** `pnpm run status` updates per-repository README
  status blocks so long-running workflows can publish progress without changing
  report data.
- **Audit:** `pnpm run audit` compares live GitHub state with report storage and
  can publish Audit Health into this README without mutating issues or PRs.
- **Reconcile:** `pnpm run reconcile` repairs report placement drift such as
  reopened archived records or closed items still sitting in `items/`.
- **Work candidates:** valid, narrow items can be marked as
  `queue_fix_pr` candidates for manual ClawSweeper repair promotion.
- **Commit review:** push events on target `main` branches can dispatch to
  `.github/workflows/commit-review.yml`, which expands the commit range, skips
  non-code-only commits cheaply, starts one Codex worker per code-bearing
  commit, and writes `records/<repo-slug>/commits/<sha>.md`.
- **Manual reruns and backfills:** both lanes support manual workflow dispatch.
  Commit review supports exact SHAs, historic ranges with `before_sha`, and an
  `additional_prompt` input for one-off review instructions.
- **Commit report queries:** `pnpm commit-reports -- --since 24h`,
  `--findings`, `--non-clean`, `--repo`, and `--author` make the flat per-SHA
  commit storage easy to review by time window without date folders.
- **Optional commit checks:** commit reports are the source of truth; target
  commit Check Runs are disabled by default and can be enabled per run or repo.
- **ClawSweeper repair dispatch:** commit reports with `result: findings` can
  dispatch to the repair intake, where an audit record is written and a PR is
  created only when the finding is narrow, non-security, and still relevant on
  latest `main`.

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
Issues with an open PR that references them using GitHub closing syntax such as
`Fixes #123` stay open until that PR merges or is closed.
Open issue/PR pairs from the same author stay open together unless the paired
item is already resolved or a maintainer explicitly asks to close one side.

Repository profiles can further narrow apply. ClawHub is intentionally stricter:
it reviews every issue and PR, but apply may close only PRs where current `main`
already implements the proposed change with source-backed evidence.

## Dashboard

Last dashboard update: Apr 29, 2026, 13:08 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4421 |
| Open PRs | 3459 |
| Open items total | 7880 |
| Reviewed files | 7519 |
| Unreviewed open items | 361 |
| Due now by cadence | 2731 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 642 |
| Closed by Codex apply | 10778 |
| Failed or stale reviews | 17 |
| Archived closed files | 14278 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6953 | 6597 | 356 | 2669 | 0 | 597 | 10770 | Apr 29, 2026, 13:05 UTC | Apr 29, 2026, 13:08 UTC | 421 |
| [ClawHub](https://github.com/openclaw/clawhub) | 927 | 922 | 5 | 62 | 0 | 45 | 8 | Apr 29, 2026, 12:54 UTC | Apr 29, 2026, 08:25 UTC | 579 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 29, 2026, 13:08 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25110631504) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 12:57 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25110139540) |

### Fleet Activity

Latest review: Apr 29, 2026, 13:05 UTC. Latest close: Apr 29, 2026, 13:08 UTC. Latest comment sync: Apr 29, 2026, 13:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 38 | 1 | 37 | 0 | 2 | 52 | 0 |
| Last hour | 418 | 6 | 412 | 0 | 14 | 1000 | 2 |
| Last 24 hours | 6296 | 411 | 5885 | 11 | 742 | 2276 | 29 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74221](https://github.com/openclaw/openclaw/pull/74221) | fix(openai-codex): show device-pairing code in SSH (#74212) | duplicate or superseded | Apr 29, 2026, 13:08 UTC | [records/openclaw-openclaw/closed/74221.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74221.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74311](https://github.com/openclaw/openclaw/pull/74311) | docs: classify media decode overhead as performance-only | closed externally after review | Apr 29, 2026, 12:54 UTC | [records/openclaw-openclaw/closed/74311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74311.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74190](https://github.com/openclaw/openclaw/pull/74190) | feat(plugins): add SQLite plugin state store | kept open | Apr 29, 2026, 12:53 UTC | [records/openclaw-openclaw/closed/74190.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74190.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74086](https://github.com/openclaw/openclaw/issues/74086) | [Bug]: Regression: Telegram provider fails on Windows after 2026.4.23 (deleteWebhook / setMyCommands errors) | already implemented on main | Apr 29, 2026, 12:48 UTC | [records/openclaw-openclaw/closed/74086.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74086.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73892](https://github.com/openclaw/openclaw/pull/73892) | fix(agents/process): honor AbortSignal in process.poll busy-wait loop | closed externally after review | Apr 29, 2026, 12:48 UTC | [records/openclaw-openclaw/closed/73892.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73892.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74324](https://github.com/openclaw/openclaw/pull/74324) | fix(ui): improve command palette accessibility | closed externally after review | Apr 29, 2026, 12:44 UTC | [records/openclaw-openclaw/closed/74324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74324.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74330](https://github.com/openclaw/openclaw/pull/74330) | to release | closed externally after item changed | Apr 29, 2026, 12:42 UTC | [records/openclaw-openclaw/closed/74330.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74330.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74332](https://github.com/openclaw/openclaw/issues/74332) | v2026.4.24: Plugin synthetic operator client lacks `operator.admin` scope, breaking `subagent.deleteSession` for memory-core dreaming narrative cleanup | already implemented on main | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/closed/74332.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74332.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74333](https://github.com/openclaw/openclaw/issues/74333) | v2026.4.24: Agent's `memory_search` tool never invokes `recordShortTermRecalls`; only the human CLI does, leaving `recallCount=0` for all agent-driven recalls | already implemented on main | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/closed/74333.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74333.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74245](https://github.com/openclaw/openclaw/issues/74245) | [Bug]: deepseek extension missing provider-policy-api.ts — contextWindow and cost default to wrong values | closed externally after review | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/closed/74245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74245.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 12:59 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74336](https://github.com/openclaw/openclaw/pull/74336) | fix(slack): route block-action wakes to the thread session key | high | candidate | Apr 29, 2026, 12:47 UTC | [records/openclaw-openclaw/items/74336.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74336.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74334](https://github.com/openclaw/openclaw/issues/74334) | v2026.4.24: Stored snippet normalization mismatch with `relocateCandidateRange` causes silent rehydration failure for all post-Apr-23 promotion candidates | high | candidate | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/items/74334.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74334.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#989](https://github.com/openclaw/clawhub/issues/989) | Wrong VirusTotal tag | high | candidate | Apr 29, 2026, 12:25 UTC | [records/openclaw-clawhub/items/989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/989.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 12:25 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 12:25 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 12:24 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 12:23 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 12:21 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 12:20 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 12:18 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65668](https://github.com/openclaw/openclaw/issues/65668) | [Bug]: SIGUSR1/config.patch restart orphans gateway under custom supervisors → EADDRINUSE crash loop (workaround: OPENCLAW_NO_RESPAWN=1) | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/65668.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65668.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64732](https://github.com/openclaw/openclaw/issues/64732) | [Bug]: openclaw tool/help CLI surfaces break when plugins.allow omits synthetic command ids | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/64732.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64732.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74343](https://github.com/openclaw/openclaw/issues/74343) | Slash command cross-routing when multiple Apps register same commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74343.md) | complete | Apr 29, 2026, 13:05 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74329](https://github.com/openclaw/openclaw/pull/74329) | refactor(discord): internalize Discord client | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74329.md) | complete | Apr 29, 2026, 13:04 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74342](https://github.com/openclaw/openclaw/pull/74342) | ci: add plugin sdk package contract codeql quality shard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74342.md) | complete | Apr 29, 2026, 13:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74338](https://github.com/openclaw/openclaw/pull/74338) | docs(security): clarify proxy SSRF reporting scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74338.md) | complete | Apr 29, 2026, 13:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74341](https://github.com/openclaw/openclaw/pull/74341) | fix(agents/harness): validate forced plugin harness support before pinning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74341.md) | complete | Apr 29, 2026, 13:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73717](https://github.com/openclaw/openclaw/pull/73717) | fix(cli): canonicalize infer model run refs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73717.md) | complete | Apr 29, 2026, 13:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 13:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) | complete | Apr 29, 2026, 12:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55840](https://github.com/openclaw/openclaw/issues/55840) | [Feature]: Bring back Chrome Extension Relay support (removed in 2026.3.22) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55840.md) | complete | Apr 29, 2026, 12:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74164](https://github.com/openclaw/openclaw/issues/74164) | [Bug]: OpenClaw send message with big file via wecom show gateway timeout after 10000ms | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74164.md) | complete | Apr 29, 2026, 12:59 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 13:08 UTC

State: Apply finished

Apply/comment-sync run finished with 1 fresh closes out of requested limit 1. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25110631504](https://github.com/openclaw/clawsweeper/actions/runs/25110631504)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3533 |
| Open PRs | 3420 |
| Open items total | 6953 |
| Reviewed files | 6597 |
| Unreviewed open items | 356 |
| Archived closed files | 14255 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3354 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3226 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6580 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 597 |
| Closed by Codex apply | 10770 |
| Failed or stale reviews | 17 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 88/1055 current (967 due, 8.3%) |
| Hourly hot item cadence (<7d) | 88/1055 current (967 due, 8.3%) |
| Daily cadence coverage | 2397/3740 current (1343 due, 64.1%) |
| Daily PR cadence | 1783/2616 current (833 due, 68.2%) |
| Daily new issue cadence (<30d) | 614/1124 current (510 due, 54.6%) |
| Weekly older issue cadence | 1799/1802 current (3 due, 99.8%) |
| Due now by cadence | 2669 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 12:49 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72537,72539,72541`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6950 |
| Missing eligible open records | 270 |
| Missing maintainer-authored open records | 36 |
| Missing protected open records | 25 |
| Missing recently-created open records | 27 |
| Archived records that are open again | 0 |
| Stale item records | 3 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 11 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 13:05 UTC. Latest close: Apr 29, 2026, 13:08 UTC. Latest comment sync: Apr 29, 2026, 13:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 32 | 1 | 31 | 0 | 2 | 32 | 0 |
| Last hour | 156 | 6 | 150 | 0 | 14 | 421 | 2 |
| Last 24 hours | 5362 | 411 | 4951 | 11 | 729 | 1497 | 29 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74221](https://github.com/openclaw/openclaw/pull/74221) | fix(openai-codex): show device-pairing code in SSH (#74212) | duplicate or superseded | Apr 29, 2026, 13:08 UTC | [records/openclaw-openclaw/closed/74221.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74221.md) |
| [#74311](https://github.com/openclaw/openclaw/pull/74311) | docs: classify media decode overhead as performance-only | closed externally after review | Apr 29, 2026, 12:54 UTC | [records/openclaw-openclaw/closed/74311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74311.md) |
| [#74190](https://github.com/openclaw/openclaw/pull/74190) | feat(plugins): add SQLite plugin state store | kept open | Apr 29, 2026, 12:53 UTC | [records/openclaw-openclaw/closed/74190.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74190.md) |
| [#74086](https://github.com/openclaw/openclaw/issues/74086) | [Bug]: Regression: Telegram provider fails on Windows after 2026.4.23 (deleteWebhook / setMyCommands errors) | already implemented on main | Apr 29, 2026, 12:48 UTC | [records/openclaw-openclaw/closed/74086.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74086.md) |
| [#73892](https://github.com/openclaw/openclaw/pull/73892) | fix(agents/process): honor AbortSignal in process.poll busy-wait loop | closed externally after review | Apr 29, 2026, 12:48 UTC | [records/openclaw-openclaw/closed/73892.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73892.md) |
| [#74324](https://github.com/openclaw/openclaw/pull/74324) | fix(ui): improve command palette accessibility | closed externally after review | Apr 29, 2026, 12:44 UTC | [records/openclaw-openclaw/closed/74324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74324.md) |
| [#74330](https://github.com/openclaw/openclaw/pull/74330) | to release | closed externally after item changed | Apr 29, 2026, 12:42 UTC | [records/openclaw-openclaw/closed/74330.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74330.md) |
| [#74332](https://github.com/openclaw/openclaw/issues/74332) | v2026.4.24: Plugin synthetic operator client lacks `operator.admin` scope, breaking `subagent.deleteSession` for memory-core dreaming narrative cleanup | already implemented on main | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/closed/74332.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74332.md) |
| [#74333](https://github.com/openclaw/openclaw/issues/74333) | v2026.4.24: Agent's `memory_search` tool never invokes `recordShortTermRecalls`; only the human CLI does, leaving `recallCount=0` for all agent-driven recalls | already implemented on main | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/closed/74333.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74333.md) |
| [#74245](https://github.com/openclaw/openclaw/issues/74245) | [Bug]: deepseek extension missing provider-policy-api.ts — contextWindow and cost default to wrong values | closed externally after review | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/closed/74245.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74245.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 12:59 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [#74336](https://github.com/openclaw/openclaw/pull/74336) | fix(slack): route block-action wakes to the thread session key | high | candidate | Apr 29, 2026, 12:47 UTC | [records/openclaw-openclaw/items/74336.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74336.md) |
| [#74334](https://github.com/openclaw/openclaw/issues/74334) | v2026.4.24: Stored snippet normalization mismatch with `relocateCandidateRange` causes silent rehydration failure for all post-Apr-23 promotion candidates | high | candidate | Apr 29, 2026, 12:38 UTC | [records/openclaw-openclaw/items/74334.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74334.md) |
| [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 12:18 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#65668](https://github.com/openclaw/openclaw/issues/65668) | [Bug]: SIGUSR1/config.patch restart orphans gateway under custom supervisors → EADDRINUSE crash loop (workaround: OPENCLAW_NO_RESPAWN=1) | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/65668.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65668.md) |
| [#64732](https://github.com/openclaw/openclaw/issues/64732) | [Bug]: openclaw tool/help CLI surfaces break when plugins.allow omits synthetic command ids | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/64732.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64732.md) |
| [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 12:10 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |
| [#71784](https://github.com/openclaw/openclaw/issues/71784) | Bug: memory search live embedding fails ~20–40% with `fetch failed \| other side closed` (provider-agnostic; upstream healthy) | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/71784.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71784.md) |
| [#69249](https://github.com/openclaw/openclaw/issues/69249) | Gateway restart can silently abort an in-flight Discord turn, with no automatic recovery message to the user | high | candidate | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/items/69249.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69249.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74343](https://github.com/openclaw/openclaw/issues/74343) | Slash command cross-routing when multiple Apps register same commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74343.md) | complete | Apr 29, 2026, 13:05 UTC |
| [#74329](https://github.com/openclaw/openclaw/pull/74329) | refactor(discord): internalize Discord client | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74329.md) | complete | Apr 29, 2026, 13:04 UTC |
| [#74342](https://github.com/openclaw/openclaw/pull/74342) | ci: add plugin sdk package contract codeql quality shard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74342.md) | complete | Apr 29, 2026, 13:03 UTC |
| [#74338](https://github.com/openclaw/openclaw/pull/74338) | docs(security): clarify proxy SSRF reporting scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74338.md) | complete | Apr 29, 2026, 13:03 UTC |
| [#74341](https://github.com/openclaw/openclaw/pull/74341) | fix(agents/harness): validate forced plugin harness support before pinning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74341.md) | complete | Apr 29, 2026, 13:03 UTC |
| [#73717](https://github.com/openclaw/openclaw/pull/73717) | fix(cli): canonicalize infer model run refs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73717.md) | complete | Apr 29, 2026, 13:02 UTC |
| [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 13:00 UTC |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) | complete | Apr 29, 2026, 12:59 UTC |
| [#55840](https://github.com/openclaw/openclaw/issues/55840) | [Feature]: Bring back Chrome Extension Relay support (removed in 2026.3.22) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55840.md) | complete | Apr 29, 2026, 12:59 UTC |
| [#74164](https://github.com/openclaw/openclaw/issues/74164) | [Bug]: OpenClaw send message with big file via wecom show gateway timeout after 10000ms | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74164.md) | complete | Apr 29, 2026, 12:59 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 12:57 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25110139540](https://github.com/openclaw/clawsweeper/actions/runs/25110139540)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 888 |
| Open PRs | 39 |
| Open items total | 927 |
| Reviewed files | 922 |
| Unreviewed open items | 5 |
| Archived closed files | 23 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 888 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 922 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 45 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 3/60 current (57 due, 5%) |
| Hourly hot item cadence (<7d) | 3/60 current (57 due, 5%) |
| Daily cadence coverage | 211/211 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 190/190 current (0 due, 100%) |
| Weekly older issue cadence | 651/651 current (0 due, 100%) |
| Due now by cadence | 62 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 12:49 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 927 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 5 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 0 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 12:54 UTC. Latest close: Apr 29, 2026, 08:25 UTC. Latest comment sync: Apr 29, 2026, 12:56 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 6 | 0 | 6 | 0 | 0 | 20 | 0 |
| Last hour | 262 | 0 | 262 | 0 | 0 | 579 | 0 |
| Last 24 hours | 934 | 0 | 934 | 0 | 13 | 779 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | kept open | Apr 29, 2026, 08:25 UTC | [records/openclaw-clawhub/closed/1891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1891.md) |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#989](https://github.com/openclaw/clawhub/issues/989) | Wrong VirusTotal tag | high | candidate | Apr 29, 2026, 12:25 UTC | [records/openclaw-clawhub/items/989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/989.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 12:25 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 12:25 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 12:24 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 12:23 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 12:21 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 12:20 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 11:59 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 11:55 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 11:53 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1540](https://github.com/openclaw/clawhub/issues/1540) | False positive suspicious flag on blindoracle - metadata mismatch (ref #522) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1540.md) | complete | Apr 29, 2026, 12:54 UTC |
| [#1662](https://github.com/openclaw/clawhub/issues/1662) | Appealing Suspicious Tag on Agent-Changelog Skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1662.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#348](https://github.com/openclaw/clawhub/issues/348) | Skills flagged and unreachable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/348.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#1892](https://github.com/openclaw/clawhub/issues/1892) | False positive: krillbloc flagged as suspicious — battle royale game with in-game terminology | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1892.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#1577](https://github.com/openclaw/clawhub/issues/1577) | Plugin search returns 500 Server Error for all queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1577.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#1565](https://github.com/openclaw/clawhub/issues/1565) | False positive: swarm-sprint flagged as suspicious — git worktree orchestration skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1565.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#1522](https://github.com/openclaw/clawhub/issues/1522) | Skill flagged — suspicious patterns detected ClawHub Security flagged this skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1522.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#1783](https://github.com/openclaw/clawhub/issues/1783) | False Positive Malware Detection for @nimsuite/openclaw-nim-channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1783.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#880](https://github.com/openclaw/clawhub/issues/880) | Aegis Firewall has been falsely marked as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/880.md) | complete | Apr 29, 2026, 12:53 UTC |
| [#1569](https://github.com/openclaw/clawhub/issues/1569) | How can I transfer \"personal skills\" to \"organization skills\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1569.md) | complete | Apr 29, 2026, 12:53 UTC |

</details>

## How It Works

ClawSweeper is split into two operational systems:

- issue/PR sweeper: scheduler, review lane, apply lane, audit, reconcile, and
  dashboard publishing
- commit sweeper: main-branch commit dispatch, cheap code/non-code
  classification, one Codex review worker per code-bearing commit, report
  publishing, and optional target commit checks

### Scheduler

The issue/PR scheduler decides what to scan and how often. New and active items
get more attention; older quiet items fall back to a slower cadence.

- hot/new and recently active items are checked hourly, with a 5-minute intake
  schedule for the newest queue edge
- target repositories can forward issue and PR events with
  `repository_dispatch`; those exact item runs use a dedicated single job to
  review one item, sync the durable comment, and apply only safe close
  proposals for that same item
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
- Each shard checks out the selected target repository at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes a flat report under
  `records/<repo-slug>/items/<number>.md` with the decision, evidence,
  suggested comment, runtime metadata, and GitHub snapshot hash.
- High-confidence allowed close decisions become `proposed_close`.
- After publish, the lane checks the selected items' single marker-backed Codex
  review comment. Missing comments and missing metadata are synced immediately;
  existing comments are refreshed only when stale, currently weekly.
- PR review comments use hidden verdict/action markers for the trusted
  ClawSweeper repair loop; see
  [`docs/pr-review-comments.md`](docs/pr-review-comments.md).

### Apply Lane

Apply reads existing reports and mutates GitHub only when the stored review is
still valid.

- Updates the single marker-backed Codex automated review comment in place.
- Closes only unchanged high-confidence proposals.
- Reuses the review comment when closing; no duplicate close comment.
- Moves closed or already-closed reports to
  `records/<repo-slug>/closed/<number>.md`.
- Moves reopened archived reports back to the repo’s `items/` folder as stale.
- Commits checkpoints and dashboard heartbeats during long runs.

Apply wakes every 15 minutes, no-ops when there are no unchanged
high-confidence close proposals, and narrows scheduled runs to the currently
eligible proposal list so idle runs do not scan unrelated keep-open records.
It defaults to all item kinds, no age floor, a 2-second close delay, and 50
fresh closes per checkpoint. If it reaches the requested limit, it queues
another apply run with the same settings.

Exact event runs skip the bulk planner, shard matrix, artifact upload, and
separate publish job. They still use the same review and apply code paths, but
only for the selected item number and only with immediate-safe reasons enabled
by default: `implemented_on_main` and `duplicate_or_superseded`.
`stale_insufficient_info` is never applied to young items; apply requires those
issue reports to be at least 30 days old unless a manual run explicitly changes
the threshold.

The README dashboard is fleet-scoped. Each configured repository gets its own
record folder, workflow status marker, audit-health marker, cadence counts, and
recent activity section. The top dashboard aggregates those repository snapshots
so event runs from one repo do not hide the state of another.

There is still one deterministic apply path for writes. Review can propose and
sync stale public review comments, but closing remains guarded by apply so a
fresh GitHub snapshot, labels, maintainer-authorship, and unchanged item state
are checked immediately before mutation.

### Commit Review Lane

Commit review is intentionally separate from issue/PR cleanup. It never closes
items, writes comments, or fixes code.

- Target repositories forward `push` events from `main` with
  `repository_dispatch`.
- Manual runs can pass `commit_sha`, optional `before_sha`, optional
  `additional_prompt`, `enabled`, and `create_checks`.
- The receiver verifies the selected commits are reachable from `origin/main`.
- The plan job expands ranges, pages large backfills at GitHub's matrix limit,
  and classifies each commit before Codex starts.
- Pure documentation, changelog, README/license, and asset-only commits get a
  skipped report without spending Codex time.
- Mixed commits and code-bearing commits start one Codex worker per commit.
- Codex is prompted to read beyond the diff: changed files, callers/callees,
  runtime entry points, adjacent tests/docs, dependency manifests, release
  notes, advisories, web sources, and focused live tests when useful.
- Each commit writes exactly one report at
  `records/<repo-slug>/commits/<40-char-sha>.md`.
- Reruns overwrite the same report, including reruns with an
  `additional_prompt`.
- Report results are `nothing_found`, `findings`, `inconclusive`, `failed`, or
  `skipped_non_code`.
- Optional GitHub Checks use the `ClawSweeper Commit Review` name on the target
  commit. Clean or skipped reports are green; high-confidence high/critical
  findings fail; lower-severity, inconclusive, and failed reviews are neutral.
- Finding reports are dispatched to the repair intake when
  `CLAWSWEEPER_COMMIT_FINDINGS_ENABLED` is not `false`. ClawSweeper owns
  the audit log and any repair PR.

Use `pnpm commit-reports -- --since 24h` to review recent reports and add
`--findings`, `--non-clean`, `--repo`, or `--author` to narrow the list. The
storage stays flat so a rerun can overwrite exactly one file for a commit
without rediscovering a date bucket.

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- Issue/PR event jobs create target write and report-push credentials only after
  Codex exits.
- Commit review workers give Codex only a read-scoped target token as `GH_TOKEN`
  so it can inspect mentioned issues, PRs, workflow runs, and commit metadata.
- Commit write/check credentials are created only after Codex exits.
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.
- Commit Check Runs are optional and disabled by default.

### Audit

`pnpm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Protected proposed closes are reported only for active repo `items/` records
because archived repo `closed/` records are historical and cannot be applied.
Missing open records are classified as eligible, maintainer-authored, protected,
or recently created so strict audit mode can flag actionable drift without
treating expected queue lag or excluded items as failures.
Use `--update-dashboard` to publish the latest audit health into this README
without making every normal dashboard heartbeat scan all open GitHub items.
Audit Health includes a copyable `item_numbers` input for reviewable findings
such as missing eligible records, reopened archived records, and stale reviews.
The workflow refreshes Audit Health on a separate six-hour schedule, and it can
be run manually with `audit_dashboard=true`.

## Local Run

Requires Node 24.

Issue/PR sweeper:

```bash
source ~/.profile
corepack enable
pnpm install
pnpm run build
pnpm run plan -- --target-repo openclaw/openclaw --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
pnpm run review -- --target-repo openclaw/openclaw --target-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
pnpm run apply-artifacts -- --target-repo openclaw/openclaw --artifact-dir artifacts/reviews
pnpm run audit -- --target-repo openclaw/openclaw --max-pages 250 --sample-limit 25 --update-dashboard
pnpm run reconcile -- --target-repo openclaw/openclaw --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

List commit reports:

```bash
source ~/.profile
corepack enable
pnpm run build
pnpm commit-reports -- --since 24h
pnpm commit-reports -- --since 24h --findings
pnpm commit-reports -- --repo openclaw/openclaw --author steipete --since 7d
```

Manually rerun commit review through GitHub Actions:

```bash
gh workflow run commit-review.yml \
  --repo openclaw/clawsweeper \
  --ref main \
  -f target_repo=openclaw/openclaw \
  -f commit_sha=<commit-sha> \
  -f before_sha=<parent-or-range-start-sha> \
  -f create_checks=false \
  -f enabled=true \
  -f additional_prompt='Optional extra review focus.'
```

Omit `before_sha` for a single-commit review. Pass `before_sha` to review the
historic range `before_sha..commit_sha`.

Manual review runs are proposal-only. Use `apply_existing=true` to apply unchanged
proposals later. Scheduled apply runs process both issues and pull requests by
default, subject to the selected repository profile; pass `target_repo`,
`apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

Scheduled runs cover both configured profiles. `openclaw/openclaw` keeps the
existing cadence; `openclaw/clawhub` runs on offset review/apply/audit crons so
its reports live under `records/openclaw-clawhub/` without colliding with
default repo records.

Target repositories can opt into event-level latency by installing the
dispatcher workflow in [docs/target-dispatcher.md](docs/target-dispatcher.md).
The dispatcher sends `repository_dispatch` events to this repository with the
target repo and exact item number; ClawSweeper then runs one event job that
reviews, comments, and checks immediate safe apply instead of waiting for the
next hot-intake cron or bulk publish lane.

Target repositories can opt into main-branch commit review with
[docs/commit-dispatcher.md](docs/commit-dispatcher.md). That dispatcher sends
push ranges to this repository, where ClawSweeper expands the range and writes
one commit report per SHA.

## Checks

```bash
pnpm run check
pnpm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` pnpm package.
The `CI` GitHub Actions workflow runs `pnpm run check` on pushes, pull requests,
and manual dispatches.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `clawsweeper`.
  Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `clawsweeper`; plan/review
  jobs use a short-lived GitHub App installation token for read-heavy target API
  calls, commit review uses a read-scoped target token while Codex runs, and
  apply/comment-sync/check jobs use the app token for comments, closes, and
  optional checks.
  Keep App credentials scoped to the `actions/create-github-app-token` step.
  Review shards run Codex over attacker-controlled issue/PR text, so
  `codexEnv()` also strips these App variables before spawning Codex.

Token flow:

- Review shards log Codex in with `OPENAI_API_KEY`, then run without OpenAI or
  Codex token environment variables.
- ClawSweeper uses the `clawsweeper` GitHub App token for read-heavy target
  context.
- Apply mode uses the same app token for review comments and closes, so GitHub
  attributes mutations to the app bot account instead of a PAT user.
- Commit review passes Codex only a read-scoped target token as `GH_TOKEN` for
  issue/PR/workflow/commit hydration, then creates write/check credentials only
  after Codex exits.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required `clawsweeper` app permissions:

- Contents: read/write, for report commits, repair branches, and repository
  dispatch inputs that need a contents-scoped installation token.
- Issues: read/write, for issue comments, labels, closes, and maintainer command
  authorization context.
- Pull requests: read/write, for PR comments, labels, merge readiness, repair PRs,
  and guarded automerge.
- Actions: read/write on `openclaw/clawsweeper`, for run cancellation, manual
  dispatch, self-heal, and commit-review continuations.
- Checks: write on target repositories when commit Check Runs should be
  published.

ClawSweeper no longer falls back to PAT-based write tokens. If the GitHub App
installation does not grant the requested permission set, the workflow fails at
token creation instead of silently switching identity.

Target repository setup:

- install the issue/PR dispatcher from
  [docs/target-dispatcher.md](docs/target-dispatcher.md) for exact item event
  reviews
- install the commit dispatcher from
  [docs/commit-dispatcher.md](docs/commit-dispatcher.md) for `main` commit
  reviews
- set `CLAWSWEEPER_COMMIT_REVIEW_ENABLED=false` to disable commit dispatch
  without code changes
- set `CLAWSWEEPER_COMMIT_REVIEW_CREATE_CHECKS=true` only if commit Check Runs
  should be published
