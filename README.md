# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently covers `openclaw/openclaw`, `openclaw/clawhub`, and self-review for
`openclaw/clawsweeper`.

It has two independent lanes:

- issue/PR sweeper: keeps one markdown report per open issue or PR, publishes
  one durable Codex automated review comment when useful, and only closes items
  when the evidence is strong
- commit sweeper: reviews code-bearing commits that land on `main`, writes one
  canonical markdown report per commit, and optionally publishes a GitHub Check
  Run for that commit

## Capabilities

- **Repository profiles:** per-repository rules live in
  `src/repository-profiles.ts`, so OpenClaw, ClawHub, and ClawSweeper can share
  the same engine while keeping different apply limits.
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

Repository profiles can further narrow apply. ClawHub and ClawSweeper self-review
are intentionally stricter: they review issues and PRs, but apply may close only
PRs where current `main` already implements the proposed change with
source-backed evidence.

## Dashboard

Last dashboard update: Apr 29, 2026, 14:58 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4436 |
| Open PRs | 3422 |
| Open items total | 7858 |
| Reviewed files | 7505 |
| Unreviewed open items | 356 |
| Due now by cadence | 2977 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 655 |
| Closed by Codex apply | 10798 |
| Failed or stale reviews | 33 |
| Archived closed files | 14366 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6932 | 6581 | 351 | 2952 | 0 | 606 | 10790 | Apr 29, 2026, 14:55 UTC | Apr 29, 2026, 14:56 UTC | 457 |
| [ClawHub](https://github.com/openclaw/clawhub) | 926 | 921 | 5 | 23 | 0 | 48 | 8 | Apr 29, 2026, 14:36 UTC | Apr 29, 2026, 13:48 UTC | 722 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 2 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 1 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 29, 2026, 14:58 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25116344305) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 14:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25114145923) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 14:55 UTC. Latest close: Apr 29, 2026, 14:56 UTC. Latest comment sync: Apr 29, 2026, 14:56 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 19 | 2 | 17 | 0 | 4 | 257 | 0 |
| Last hour | 903 | 12 | 891 | 15 | 24 | 1180 | 0 |
| Last 24 hours | 5788 | 356 | 5432 | 24 | 774 | 2032 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74373](https://github.com/openclaw/openclaw/pull/74373) | feat(feishu): add userToolAllowFrom for trusted tool actions | closed externally after review | Apr 29, 2026, 14:56 UTC | [records/openclaw-openclaw/closed/74373.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74373.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74116](https://github.com/openclaw/openclaw/pull/74116) | fix(boot-md): deduplicate BOOT.md runs by workspace path | already implemented on main | Apr 29, 2026, 14:55 UTC | [records/openclaw-openclaw/closed/74116.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74116.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74416](https://github.com/openclaw/openclaw/issues/74416) | DeepSeek V4 Flash streaming with reasoning_content always triggers fallback to fallback model | already implemented on main | Apr 29, 2026, 14:52 UTC | [records/openclaw-openclaw/closed/74416.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74416.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74299](https://github.com/openclaw/openclaw/issues/74299) | Telegram plugin reports \"connected\" without actually polling (false positive) | closed externally after review | Apr 29, 2026, 14:45 UTC | [records/openclaw-openclaw/closed/74299.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74299.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74401](https://github.com/openclaw/openclaw/issues/74401) | [Bug]: sqlite-vec unavailable on node:sqlite — vector recall degraded (macOS ARM64, v2026.4.26) | duplicate or superseded | Apr 29, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/74401.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74401.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74348](https://github.com/openclaw/openclaw/pull/74348) | ci: add codeql quality profile input | closed externally after review | Apr 29, 2026, 14:39 UTC | [records/openclaw-openclaw/closed/74348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74348.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74393](https://github.com/openclaw/openclaw/pull/74393) | fix(agents): dedupe async media completion sends | closed externally after review | Apr 29, 2026, 14:36 UTC | [records/openclaw-openclaw/closed/74393.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74393.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74394](https://github.com/openclaw/openclaw/issues/74394) | [Bug]: DeepSeek V4-pro 400 error via opencode-go: reasoning_content passthrough regression in v2026.4.26 | already implemented on main | Apr 29, 2026, 14:32 UTC | [records/openclaw-openclaw/closed/74394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74394.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62762](https://github.com/openclaw/openclaw/issues/62762) | Gateway 1006 closed-before-connect repro still present on 2026.4.12 after Node 24 normalization and ACP/Discord isolation | closed externally after review | Apr 29, 2026, 14:31 UTC | [records/openclaw-openclaw/closed/62762.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62762.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74338](https://github.com/openclaw/openclaw/pull/74338) | docs(security): clarify proxy SSRF reporting scope | kept open | Apr 29, 2026, 14:30 UTC | [records/openclaw-openclaw/closed/74338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74338.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 14:48 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74358](https://github.com/openclaw/openclaw/issues/74358) | Slack: streaming preview completely silent when toolProgress: false — verbose mode broken since v2026.4.21 | high | candidate | Apr 29, 2026, 14:36 UTC | [records/openclaw-openclaw/items/74358.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74358.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 14:26 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 14:24 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 14:22 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 14:21 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 14:19 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 14:19 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74380](https://github.com/openclaw/openclaw/issues/74380) | [Bug]: Multiple skill packages fail installation | high | candidate | Apr 29, 2026, 14:12 UTC | [records/openclaw-openclaw/items/74380.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74380.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54242](https://github.com/openclaw/openclaw/issues/54242) | [Bug]: backup archives can contain hardlink targets with '..' that fail broad extraction on macOS tar | high | candidate | Apr 29, 2026, 14:11 UTC | [records/openclaw-openclaw/items/54242.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54242.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 29, 2026, 14:09 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74378](https://github.com/openclaw/openclaw/issues/74378) | [Bug]: OpenClaw CLI commands remain alive as node.exe processes after execution on Windows | high | candidate | Apr 29, 2026, 14:08 UTC | [records/openclaw-openclaw/items/74378.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74378.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74409](https://github.com/openclaw/openclaw/issues/74409) | silent-reply detection gated behind isGroupChat — direct chats can't honor silentReplyPolicy=\"allow\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74409.md) | complete | Apr 29, 2026, 14:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69483](https://github.com/openclaw/openclaw/pull/69483) | feat(security): add GHSA detector-review pipeline and OpenGrep CI workflows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69483.md) | complete | Apr 29, 2026, 14:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74419](https://github.com/openclaw/openclaw/issues/74419) | feat: support Jina Embeddings v5 task parameter for task-specific adapters | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74419.md) | complete | Apr 29, 2026, 14:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74362](https://github.com/openclaw/openclaw/pull/74362) | fix(gateway): continue update runs after restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74362.md) | complete | Apr 29, 2026, 14:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74418](https://github.com/openclaw/openclaw/pull/74418) | fix(agents): recognize params.thinking=false and \"disabled\"/\"none\" as thinking=off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74418.md) | complete | Apr 29, 2026, 14:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74417](https://github.com/openclaw/openclaw/pull/74417) | fix(onboard): clarify skill credential prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74417.md) | complete | Apr 29, 2026, 14:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74392](https://github.com/openclaw/openclaw/pull/74392) | fix(plugins): install runtime deps for library extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74392.md) | complete | Apr 29, 2026, 14:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74381](https://github.com/openclaw/openclaw/pull/74381) | refactor: centralize Discord and Slack DM access resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74381.md) | complete | Apr 29, 2026, 14:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74413](https://github.com/openclaw/openclaw/issues/74413) | [Feature]: Do hello-world/trial of WhatsApp channel when that's set up/ also docs show setup but again, no hello world example given | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74413.md) | complete | Apr 29, 2026, 14:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74389](https://github.com/openclaw/openclaw/pull/74389) | fix(control-ui): clear live stream artifacts on final chat events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74389.md) | complete | Apr 29, 2026, 14:50 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 14:58 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 1 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=74116.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25116344305](https://github.com/openclaw/clawsweeper/actions/runs/25116344305)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3549 |
| Open PRs | 3383 |
| Open items total | 6932 |
| Reviewed files | 6581 |
| Unreviewed open items | 351 |
| Archived closed files | 14342 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3368 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3194 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6562 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 606 |
| Closed by Codex apply | 10790 |
| Failed or stale reviews | 19 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 178/1086 current (908 due, 16.4%) |
| Hourly hot item cadence (<7d) | 178/1086 current (908 due, 16.4%) |
| Daily cadence coverage | 2000/3688 current (1688 due, 54.2%) |
| Daily PR cadence | 1466/2571 current (1105 due, 57%) |
| Daily new issue cadence (<30d) | 534/1117 current (583 due, 47.8%) |
| Weekly older issue cadence | 1802/1807 current (5 due, 99.7%) |
| Due now by cadence | 2952 |

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

Latest review: Apr 29, 2026, 14:55 UTC. Latest close: Apr 29, 2026, 14:56 UTC. Latest comment sync: Apr 29, 2026, 14:56 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 19 | 2 | 17 | 0 | 4 | 29 | 0 |
| Last hour | 463 | 12 | 451 | 1 | 24 | 457 | 0 |
| Last 24 hours | 4851 | 356 | 4495 | 10 | 760 | 1294 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74373](https://github.com/openclaw/openclaw/pull/74373) | feat(feishu): add userToolAllowFrom for trusted tool actions | closed externally after review | Apr 29, 2026, 14:56 UTC | [records/openclaw-openclaw/closed/74373.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74373.md) |
| [#74116](https://github.com/openclaw/openclaw/pull/74116) | fix(boot-md): deduplicate BOOT.md runs by workspace path | already implemented on main | Apr 29, 2026, 14:55 UTC | [records/openclaw-openclaw/closed/74116.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74116.md) |
| [#74416](https://github.com/openclaw/openclaw/issues/74416) | DeepSeek V4 Flash streaming with reasoning_content always triggers fallback to fallback model | already implemented on main | Apr 29, 2026, 14:52 UTC | [records/openclaw-openclaw/closed/74416.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74416.md) |
| [#74299](https://github.com/openclaw/openclaw/issues/74299) | Telegram plugin reports \"connected\" without actually polling (false positive) | closed externally after review | Apr 29, 2026, 14:45 UTC | [records/openclaw-openclaw/closed/74299.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74299.md) |
| [#74401](https://github.com/openclaw/openclaw/issues/74401) | [Bug]: sqlite-vec unavailable on node:sqlite — vector recall degraded (macOS ARM64, v2026.4.26) | duplicate or superseded | Apr 29, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/74401.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74401.md) |
| [#74348](https://github.com/openclaw/openclaw/pull/74348) | ci: add codeql quality profile input | closed externally after review | Apr 29, 2026, 14:39 UTC | [records/openclaw-openclaw/closed/74348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74348.md) |
| [#74393](https://github.com/openclaw/openclaw/pull/74393) | fix(agents): dedupe async media completion sends | closed externally after review | Apr 29, 2026, 14:36 UTC | [records/openclaw-openclaw/closed/74393.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74393.md) |
| [#74394](https://github.com/openclaw/openclaw/issues/74394) | [Bug]: DeepSeek V4-pro 400 error via opencode-go: reasoning_content passthrough regression in v2026.4.26 | already implemented on main | Apr 29, 2026, 14:32 UTC | [records/openclaw-openclaw/closed/74394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74394.md) |
| [#62762](https://github.com/openclaw/openclaw/issues/62762) | Gateway 1006 closed-before-connect repro still present on 2026.4.12 after Node 24 normalization and ACP/Discord isolation | closed externally after review | Apr 29, 2026, 14:31 UTC | [records/openclaw-openclaw/closed/62762.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62762.md) |
| [#74338](https://github.com/openclaw/openclaw/pull/74338) | docs(security): clarify proxy SSRF reporting scope | kept open | Apr 29, 2026, 14:30 UTC | [records/openclaw-openclaw/closed/74338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74338.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 14:48 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [#74358](https://github.com/openclaw/openclaw/issues/74358) | Slack: streaming preview completely silent when toolProgress: false — verbose mode broken since v2026.4.21 | high | candidate | Apr 29, 2026, 14:36 UTC | [records/openclaw-openclaw/items/74358.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74358.md) |
| [#74380](https://github.com/openclaw/openclaw/issues/74380) | [Bug]: Multiple skill packages fail installation | high | candidate | Apr 29, 2026, 14:12 UTC | [records/openclaw-openclaw/items/74380.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74380.md) |
| [#54242](https://github.com/openclaw/openclaw/issues/54242) | [Bug]: backup archives can contain hardlink targets with '..' that fail broad extraction on macOS tar | high | candidate | Apr 29, 2026, 14:11 UTC | [records/openclaw-openclaw/items/54242.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54242.md) |
| [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 29, 2026, 14:09 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [#74378](https://github.com/openclaw/openclaw/issues/74378) | [Bug]: OpenClaw CLI commands remain alive as node.exe processes after execution on Windows | high | candidate | Apr 29, 2026, 14:08 UTC | [records/openclaw-openclaw/items/74378.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74378.md) |
| [#74334](https://github.com/openclaw/openclaw/issues/74334) | v2026.4.24: Stored snippet normalization mismatch with `relocateCandidateRange` causes silent rehydration failure for all post-Apr-23 promotion candidates | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74334.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74334.md) |
| [#63269](https://github.com/openclaw/openclaw/issues/63269) | [Bug]: Mattermost: group/public channel messages not received via WebSocket (regression in 2026.4.8) | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/63269.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63269.md) |
| [#74300](https://github.com/openclaw/openclaw/issues/74300) | Migration: version mismatch between source/target causes silent state incompatibility | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74300.md) |
| [#74312](https://github.com/openclaw/openclaw/issues/74312) | claude-cli auth-epoch flips on token rotation, forcing session resets mid-conversation | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74312.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74409](https://github.com/openclaw/openclaw/issues/74409) | silent-reply detection gated behind isGroupChat — direct chats can't honor silentReplyPolicy=\"allow\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74409.md) | complete | Apr 29, 2026, 14:55 UTC |
| [#69483](https://github.com/openclaw/openclaw/pull/69483) | feat(security): add GHSA detector-review pipeline and OpenGrep CI workflows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69483.md) | complete | Apr 29, 2026, 14:55 UTC |
| [#74419](https://github.com/openclaw/openclaw/issues/74419) | feat: support Jina Embeddings v5 task parameter for task-specific adapters | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74419.md) | complete | Apr 29, 2026, 14:54 UTC |
| [#74362](https://github.com/openclaw/openclaw/pull/74362) | fix(gateway): continue update runs after restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74362.md) | complete | Apr 29, 2026, 14:53 UTC |
| [#74418](https://github.com/openclaw/openclaw/pull/74418) | fix(agents): recognize params.thinking=false and \"disabled\"/\"none\" as thinking=off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74418.md) | complete | Apr 29, 2026, 14:53 UTC |
| [#74417](https://github.com/openclaw/openclaw/pull/74417) | fix(onboard): clarify skill credential prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74417.md) | complete | Apr 29, 2026, 14:52 UTC |
| [#74392](https://github.com/openclaw/openclaw/pull/74392) | fix(plugins): install runtime deps for library extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74392.md) | complete | Apr 29, 2026, 14:52 UTC |
| [#74381](https://github.com/openclaw/openclaw/pull/74381) | refactor: centralize Discord and Slack DM access resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74381.md) | complete | Apr 29, 2026, 14:52 UTC |
| [#74413](https://github.com/openclaw/openclaw/issues/74413) | [Feature]: Do hello-world/trial of WhatsApp channel when that's set up/ also docs show setup but again, no hello world example given | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74413.md) | complete | Apr 29, 2026, 14:52 UTC |
| [#74389](https://github.com/openclaw/openclaw/pull/74389) | fix(control-ui): clear live stream artifacts on final chat events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74389.md) | complete | Apr 29, 2026, 14:50 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 14:49 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 407. Item numbers: 65,96,128,156,234,321,495,528,553,567,574,625,679,702,756,758,822,824,845,849,867,887,912,939,940,966,1002,1006,1007,1011,1017,1018,1021,1028,1038,1039,1040,1043,1045,1046,1047,1052,1061,1064,1068,1070,1072,1075,1084,1088,1090,1091,1094,1097,1098,1104,1106,1107,1111,1112,1114,1119,1122,1126,1128,1131,1133,1140,1145,1146,1147,1148,1154,1156,1159,1168,1177,1179,1188,1195,1201,1204,1206,1208,1210,1211,1212,1217,1218,1219,1222,1223,1224,1226,1227,1229,1231,1233,1235,1236,1237,1239,1243,1244,1247,1249,1250,1254,1256,1257,1260,1261,1264,1265,1266,1267,1268,1269,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1282,1283,1285,1287,1288,1289,1290,1292,1293,1294,1296,1298,1299,1301,1302,1307,1308,1309,1310,1312,1313,1314,1315,1316,1318,1320,1325,1326,1329,1334,1336,1338,1341,1345,1347,1350,1351,1353,1354,1358,1359,1361,1364,1366,1367,1368,1370,1371,1374,1376,1377,1378,1379,1381,1382,1383,1384,1385,1387,1389,1391,1392,1393,1394,1396,1397,1398,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1428,1430,1431,1432,1433,1434,1435,1437,1442,1443,1444,1445,1446,1447,1448,1450,1451,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1494,1495,1500,1503,1509,1511,1515,1516,1518,1519,1520,1521,1523,1525,1526,1528,1529,1530,1533,1535,1538,1541,1542,1543,1551,1552,1553,1554,1558,1559,1563,1571,1572,1574,1575,1576,1578,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1591,1592,1594,1595,1614,1617,1620,1621,1624,1631,1632,1649,1653,1654,1657,1658,1659,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1679,1680,1681,1682,1683,1684,1685,1689,1690,1691,1692,1694,1695,1702,1703,1705,1706,1707,1710,1711,1712,1717,1718,1719,1720,1721,1725,1726,1733,1734,1735,1738,1741,1742,1743,1744,1745,1746,1747,1748,1749,1751,1755,1756,1757,1758,1760,1761,1764,1766,1767,1768,1769,1771,1772,1781,1785,1787,1788,1789,1797,1798,1799,1806,1808,1811,1813,1814,1815,1816,1817,1818,1819,1821,1823,1824,1826,1828,1829,1831,1833,1834,1836,1838,1840,1848,1849,1852,1853,1854,1855,1856,1857,1858,1859,1860,1862,1863,1864,1865,1866,1867,1868,1876,1877,1883,1884,1885,1887,1888,1890,1895.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25114145923](https://github.com/openclaw/clawsweeper/actions/runs/25114145923)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 887 |
| Open PRs | 39 |
| Open items total | 926 |
| Reviewed files | 921 |
| Unreviewed open items | 5 |
| Archived closed files | 24 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 48 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 52/58 current (6 due, 89.7%) |
| Hourly hot item cadence (<7d) | 52/58 current (6 due, 89.7%) |
| Daily cadence coverage | 210/211 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/190 current (1 due, 99.5%) |
| Weekly older issue cadence | 641/652 current (11 due, 98.3%) |
| Due now by cadence | 23 |

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

Latest review: Apr 29, 2026, 14:36 UTC. Latest close: Apr 29, 2026, 13:48 UTC. Latest comment sync: Apr 29, 2026, 14:49 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 228 | 0 |
| Last hour | 439 | 0 | 439 | 14 | 0 | 722 | 0 |
| Last 24 hours | 934 | 0 | 934 | 14 | 14 | 735 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | closed externally after review | Apr 29, 2026, 13:48 UTC | [records/openclaw-clawhub/closed/1812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1812.md) |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | kept open | Apr 29, 2026, 08:25 UTC | [records/openclaw-clawhub/closed/1891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1891.md) |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 14:26 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 14:24 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 14:22 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 14:21 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 14:19 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 14:19 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#868](https://github.com/openclaw/clawhub/issues/868) | [Bug] clawhub sync fails: Slug is already taken | high | candidate | Apr 29, 2026, 13:56 UTC | [records/openclaw-clawhub/items/868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/868.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1677](https://github.com/openclaw/clawhub/issues/1677) | False positive: valerii-baidak/figma-pixel flagged Suspicious after clarifying agent vs scripts roles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1677.md) | complete | Apr 29, 2026, 14:36 UTC |
| [#1860](https://github.com/openclaw/clawhub/pull/1860) | docs: document trademark takedown reports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1860.md) | complete | Apr 29, 2026, 14:35 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 29, 2026, 14:34 UTC |
| [#1726](https://github.com/openclaw/clawhub/issues/1726) | False positive: jackedin skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1726.md) | complete | Apr 29, 2026, 14:34 UTC |
| [#1885](https://github.com/openclaw/clawhub/issues/1885) | False positive: skill aixplain-agent-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1885.md) | complete | Apr 29, 2026, 14:34 UTC |
| [#1761](https://github.com/openclaw/clawhub/issues/1761) | [Appeal] False positive flag on Jinguyuan Dumpling Skill (v0.4.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1761.md) | complete | Apr 29, 2026, 14:33 UTC |
| [#1403](https://github.com/openclaw/clawhub/issues/1403) | [Skill Flagged] DesignKit Ecommerce Skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1403.md) | complete | Apr 29, 2026, 14:33 UTC |
| [#1817](https://github.com/openclaw/clawhub/issues/1817) | False positive: trustboost-pii-sanitizer flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1817.md) | failed | Apr 29, 2026, 14:33 UTC |
| [#1849](https://github.com/openclaw/clawhub/issues/1849) | Clarify suspicious flag for beamer-pipeline-public@0.2.1 despite Benign high-confidence scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1849.md) | complete | Apr 29, 2026, 14:33 UTC |
| [#1718](https://github.com/openclaw/clawhub/issues/1718) | False positive: rocky-know-how skill flagged as suspicious — benign experience/knowledge management skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1718.md) | complete | Apr 29, 2026, 14:33 UTC |

</details>

<details>
<summary>ClawSweeper (openclaw/clawsweeper)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawsweeper:start -->
**Workflow status**

Repository: [openclaw/clawsweeper](https://github.com/openclaw/clawsweeper)

Updated: unknown

State: Idle

No workflow status has been published yet.
<!-- clawsweeper-status:openclaw-clawsweeper:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawsweeper](https://github.com/openclaw/clawsweeper) |
| Open issues | 0 |
| Open PRs | 0 |
| Open items total | 0 |
| Reviewed files | 3 |
| Unreviewed open items | 0 |
| Archived closed files | 0 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 0 |
| Proposed issue closes | 0 (- of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 3 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 1 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 1/3 current (2 due, 33.3%) |
| Hourly hot item cadence (<7d) | 1/3 current (2 due, 33.3%) |
| Daily cadence coverage | 0/0 current (0 due, -) |
| Daily PR cadence | 0/0 current (0 due, -) |
| Daily new issue cadence (<30d) | 0/0 current (0 due, -) |
| Weekly older issue cadence | 0/0 current (0 due, -) |
| Due now by cadence | 2 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawsweeper:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawsweeper:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 14:08 UTC. Latest close: unknown. Latest comment sync: Apr 29, 2026, 14:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last 24 hours | 3 | 0 | 3 | 0 | 0 | 3 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#19](https://github.com/openclaw/clawsweeper/pull/19) | test: exercise automerge repair smoke | high | candidate | Apr 29, 2026, 13:41 UTC | [records/openclaw-clawsweeper/items/19.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/19.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#20](https://github.com/openclaw/clawsweeper/pull/20) | test: suppress duplicate remaining-risk prose | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/20.md) | complete | Apr 29, 2026, 14:08 UTC |
| [#19](https://github.com/openclaw/clawsweeper/pull/19) | test: exercise automerge repair smoke | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/19.md) | complete | Apr 29, 2026, 13:41 UTC |
| [#18](https://github.com/openclaw/clawsweeper/pull/18) | docs: document clawsweeper self smoke target | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/18.md) | complete | Apr 29, 2026, 13:18 UTC |

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

Scheduled runs cover the configured product profiles. `openclaw/openclaw` keeps
the existing cadence; `openclaw/clawhub` runs on offset review/apply/audit crons
so its reports live under `records/openclaw-clawhub/` without colliding with
default repo records. `openclaw/clawsweeper` is available for manual and event
self-review smoke tests.

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
