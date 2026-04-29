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
  trusted Clownfish repair loop. See
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
  `queue_fix_pr` candidates for manual ProjectClownfish promotion; ClawSweeper
  itself does not open implementation PRs.
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
- **Clownfish repair dispatch:** commit reports with `result: findings` can
  dispatch to Clownfish, where a separate intake writes an audit record and only
  creates a PR when the finding is narrow, non-security, and still relevant on
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

Last dashboard update: Apr 29, 2026, 05:48 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4398 |
| Open PRs | 3474 |
| Open items total | 7872 |
| Reviewed files | 7492 |
| Unreviewed open items | 380 |
| Due now by cadence | 2139 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 523 |
| Closed by Codex apply | 10697 |
| Failed or stale reviews | 19 |
| Archived closed files | 14054 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6955 | 6581 | 374 | 2076 | 0 | 487 | 10690 | Apr 29, 2026, 05:46 UTC | Apr 29, 2026, 05:48 UTC | 579 |
| [ClawHub](https://github.com/openclaw/clawhub) | 917 | 911 | 6 | 63 | 0 | 36 | 7 | Apr 29, 2026, 05:28 UTC | Apr 29, 2026, 05:31 UTC | 22 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 29, 2026, 05:48 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25092961339) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 05:34 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25092641218) |

### Fleet Activity

Latest review: Apr 29, 2026, 05:46 UTC. Latest close: Apr 29, 2026, 05:48 UTC. Latest comment sync: Apr 29, 2026, 05:48 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 39 | 4 | 35 | 2 | 21 | 50 | 3 |
| Last hour | 588 | 27 | 561 | 7 | 51 | 601 | 8 |
| Last 24 hours | 7050 | 453 | 6597 | 15 | 770 | 2499 | 37 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73878.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54526](https://github.com/openclaw/openclaw/pull/54526) | Fix slack channels error | already implemented on main | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54526.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54526.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54116](https://github.com/openclaw/openclaw/pull/54116) | feat(google): make Gemini web search base URL configurable | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54116.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54116.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53561](https://github.com/openclaw/openclaw/pull/53561) | fix gateway connect handshake timeout | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53561.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53561.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53478](https://github.com/openclaw/openclaw/pull/53478) | fix(plugin-sdk): re-export normalizeAccountId and resolvePreferredOpenClawTmpDir | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53478.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52522](https://github.com/openclaw/openclaw/pull/52522) | fix: widen symlink boundary for multi-agent workspace bootstrap files | duplicate or superseded | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/52522.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52522.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50876](https://github.com/openclaw/openclaw/issues/50876) | Feature: bootstrapFiles config key to extend workspace injection set | duplicate or superseded | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50876.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50876.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50600](https://github.com/openclaw/openclaw/issues/50600) | Feature: configurable busy acknowledgment when session lane is occupied | duplicate or superseded | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50600.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50600.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50472](https://github.com/openclaw/openclaw/issues/50472) | [Windows] Gateway exits silently without crash log | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50472.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50174](https://github.com/openclaw/openclaw/issues/50174) | [Bug]: Windows native: Telegram polling stalls every ~107s (UND_ERR_CONNECT_TIMEOUT) + Discord disconnect restarts while gateway stays healthy | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50174.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50174.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72139](https://github.com/openclaw/openclaw/issues/72139) | Control UI auth retry loop + blocking chat.history causes Slack Socket Mode disconnects | high | candidate | Apr 29, 2026, 05:27 UTC | [records/openclaw-openclaw/items/72139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72139.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69192](https://github.com/openclaw/openclaw/issues/69192) | Hook gateway returns 4xx with no journal entry — breaks diagnosability | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69192.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69192.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | high | candidate | Apr 29, 2026, 05:24 UTC | [records/openclaw-openclaw/items/62120.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62120.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50268](https://github.com/openclaw/openclaw/issues/50268) | Bug: Adding a second provider via onboard/configure unconditionally overwrites agents.defaults.model.primary, breaking existing provider (e.g. Bedrock → xAI) | high | candidate | Apr 29, 2026, 05:24 UTC | [records/openclaw-openclaw/items/50268.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50268.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74093](https://github.com/openclaw/openclaw/issues/74093) | Bug: /new reset can be queued behind active run when queue mode is steer | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/74093.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74093.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50277](https://github.com/openclaw/openclaw/issues/50277) | [Bug]: 聊天页面删除对话时弹框会超出边界 | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/50277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50277.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50442](https://github.com/openclaw/openclaw/issues/50442) | [Bug] backup create leaves large .tmp files on timeout causing disk space exhaustion | high | candidate | Apr 29, 2026, 05:21 UTC | [records/openclaw-openclaw/items/50442.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50442.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#47335](https://github.com/openclaw/openclaw/issues/47335) | Reply generated but not delivered when compaction triggers session rollover | high | candidate | Apr 29, 2026, 05:21 UTC | [records/openclaw-openclaw/items/47335.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47335.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#47555](https://github.com/openclaw/openclaw/issues/47555) | [Bug]: --profile flag ignored when executing gateway restart from agent session | high | candidate | Apr 29, 2026, 05:21 UTC | [records/openclaw-openclaw/items/47555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47555.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46023](https://github.com/openclaw/openclaw/issues/46023) | [Bug]: Telegram final replies with media ignore configured mediaMaxMb in outbound delivery path | high | candidate | Apr 29, 2026, 05:20 UTC | [records/openclaw-openclaw/items/46023.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46023.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50490](https://github.com/openclaw/openclaw/issues/50490) | [Bug]: Feishu 群聊中 activation 模式切换无效，始终响应所有消息 | high | candidate | Apr 29, 2026, 05:19 UTC | [records/openclaw-openclaw/items/50490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50490.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46252](https://github.com/openclaw/openclaw/issues/46252) | Cost dashboard omits .jsonl.reset.<timestamp> archive files, severely undercounting daily spend for users of /new | high | candidate | Apr 29, 2026, 05:19 UTC | [records/openclaw-openclaw/items/46252.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46252.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48684](https://github.com/openclaw/openclaw/issues/48684) | Bare abort triggers (stop, abort, wait) delayed/swallowed by inbound debounce | high | candidate | Apr 29, 2026, 05:19 UTC | [records/openclaw-openclaw/items/48684.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48684.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74009](https://github.com/openclaw/openclaw/pull/74009) | fix(agents): prefer sessionKey in sessions_send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74009.md) | complete | Apr 29, 2026, 05:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74107](https://github.com/openclaw/openclaw/pull/74107) | Keep Codex Computer Use hook relays live across turns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74107.md) | complete | Apr 29, 2026, 05:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73671.md) | complete | Apr 29, 2026, 05:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64673](https://github.com/openclaw/openclaw/pull/64673) | fix(ui): set input font-size to 16px to prevent iOS Safari auto-zoom on focus | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64673.md) | complete | Apr 29, 2026, 05:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73860](https://github.com/openclaw/openclaw/issues/73860) | [Bug]: message tool returns 400 error for Feishu channel user targets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73860.md) | complete | Apr 29, 2026, 05:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73822](https://github.com/openclaw/openclaw/pull/73822) | feat(config): support SecretRef for phone numbers in channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73822.md) | complete | Apr 29, 2026, 05:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74106](https://github.com/openclaw/openclaw/pull/74106) | fix(memory-core): separate real recallCount from combined signalCount in promotion gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74106.md) | complete | Apr 29, 2026, 05:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73839](https://github.com/openclaw/openclaw/pull/73839) | fix: disable Pi auto-compaction when safeguard mode is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73839.md) | complete | Apr 29, 2026, 05:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74105](https://github.com/openclaw/openclaw/pull/74105) | refactor(gateway): consolidate lifecycle lazy boundary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74105.md) | complete | Apr 29, 2026, 05:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73925](https://github.com/openclaw/openclaw/pull/73925) | fix(gateway): bound websocket auth after valid connect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73925.md) | complete | Apr 29, 2026, 05:42 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 05:48 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 17. Total fresh closes in this run: 17/18. Result records in checkpoint: 35, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25092961339](https://github.com/openclaw/clawsweeper/actions/runs/25092961339)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3520 |
| Open PRs | 3435 |
| Open items total | 6955 |
| Reviewed files | 6581 |
| Unreviewed open items | 374 |
| Archived closed files | 14033 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3334 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3233 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6567 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 487 |
| Closed by Codex apply | 10690 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 119/993 current (874 due, 12%) |
| Hourly hot item cadence (<7d) | 119/993 current (874 due, 12%) |
| Daily cadence coverage | 2966/3790 current (824 due, 78.3%) |
| Daily PR cadence | 2213/2650 current (437 due, 83.5%) |
| Daily new issue cadence (<30d) | 753/1140 current (387 due, 66.1%) |
| Weekly older issue cadence | 1794/1798 current (4 due, 99.8%) |
| Due now by cadence | 2076 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6951 |
| Missing eligible open records | 218 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 93 |
| Archived records that are open again | 0 |
| Stale item records | 2 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 05:46 UTC. Latest close: Apr 29, 2026, 05:48 UTC. Latest comment sync: Apr 29, 2026, 05:48 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 39 | 4 | 35 | 2 | 21 | 50 | 3 |
| Last hour | 566 | 27 | 539 | 7 | 49 | 579 | 8 |
| Last 24 hours | 6124 | 453 | 5671 | 10 | 755 | 1575 | 37 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73878.md) |
| [#54526](https://github.com/openclaw/openclaw/pull/54526) | Fix slack channels error | already implemented on main | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54526.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54526.md) |
| [#54116](https://github.com/openclaw/openclaw/pull/54116) | feat(google): make Gemini web search base URL configurable | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54116.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54116.md) |
| [#53561](https://github.com/openclaw/openclaw/pull/53561) | fix gateway connect handshake timeout | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53561.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53561.md) |
| [#53478](https://github.com/openclaw/openclaw/pull/53478) | fix(plugin-sdk): re-export normalizeAccountId and resolvePreferredOpenClawTmpDir | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53478.md) |
| [#52522](https://github.com/openclaw/openclaw/pull/52522) | fix: widen symlink boundary for multi-agent workspace bootstrap files | duplicate or superseded | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/52522.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52522.md) |
| [#50876](https://github.com/openclaw/openclaw/issues/50876) | Feature: bootstrapFiles config key to extend workspace injection set | duplicate or superseded | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50876.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50876.md) |
| [#50600](https://github.com/openclaw/openclaw/issues/50600) | Feature: configurable busy acknowledgment when session lane is occupied | duplicate or superseded | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50600.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50600.md) |
| [#50472](https://github.com/openclaw/openclaw/issues/50472) | [Windows] Gateway exits silently without crash log | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50472.md) |
| [#50174](https://github.com/openclaw/openclaw/issues/50174) | [Bug]: Windows native: Telegram polling stalls every ~107s (UND_ERR_CONNECT_TIMEOUT) + Discord disconnect restarts while gateway stays healthy | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/50174.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50174.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#72139](https://github.com/openclaw/openclaw/issues/72139) | Control UI auth retry loop + blocking chat.history causes Slack Socket Mode disconnects | high | candidate | Apr 29, 2026, 05:27 UTC | [records/openclaw-openclaw/items/72139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72139.md) |
| [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#69192](https://github.com/openclaw/openclaw/issues/69192) | Hook gateway returns 4xx with no journal entry — breaks diagnosability | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69192.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69192.md) |
| [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | high | candidate | Apr 29, 2026, 05:24 UTC | [records/openclaw-openclaw/items/62120.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62120.md) |
| [#50268](https://github.com/openclaw/openclaw/issues/50268) | Bug: Adding a second provider via onboard/configure unconditionally overwrites agents.defaults.model.primary, breaking existing provider (e.g. Bedrock → xAI) | high | candidate | Apr 29, 2026, 05:24 UTC | [records/openclaw-openclaw/items/50268.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50268.md) |
| [#74093](https://github.com/openclaw/openclaw/issues/74093) | Bug: /new reset can be queued behind active run when queue mode is steer | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/74093.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74093.md) |
| [#50277](https://github.com/openclaw/openclaw/issues/50277) | [Bug]: 聊天页面删除对话时弹框会超出边界 | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/50277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50277.md) |
| [#50442](https://github.com/openclaw/openclaw/issues/50442) | [Bug] backup create leaves large .tmp files on timeout causing disk space exhaustion | high | candidate | Apr 29, 2026, 05:21 UTC | [records/openclaw-openclaw/items/50442.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50442.md) |
| [#47335](https://github.com/openclaw/openclaw/issues/47335) | Reply generated but not delivered when compaction triggers session rollover | high | candidate | Apr 29, 2026, 05:21 UTC | [records/openclaw-openclaw/items/47335.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47335.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74009](https://github.com/openclaw/openclaw/pull/74009) | fix(agents): prefer sessionKey in sessions_send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74009.md) | complete | Apr 29, 2026, 05:46 UTC |
| [#74107](https://github.com/openclaw/openclaw/pull/74107) | Keep Codex Computer Use hook relays live across turns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74107.md) | complete | Apr 29, 2026, 05:46 UTC |
| [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73671.md) | complete | Apr 29, 2026, 05:44 UTC |
| [#64673](https://github.com/openclaw/openclaw/pull/64673) | fix(ui): set input font-size to 16px to prevent iOS Safari auto-zoom on focus | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64673.md) | complete | Apr 29, 2026, 05:43 UTC |
| [#73860](https://github.com/openclaw/openclaw/issues/73860) | [Bug]: message tool returns 400 error for Feishu channel user targets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73860.md) | complete | Apr 29, 2026, 05:43 UTC |
| [#73822](https://github.com/openclaw/openclaw/pull/73822) | feat(config): support SecretRef for phone numbers in channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73822.md) | complete | Apr 29, 2026, 05:43 UTC |
| [#74106](https://github.com/openclaw/openclaw/pull/74106) | fix(memory-core): separate real recallCount from combined signalCount in promotion gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74106.md) | complete | Apr 29, 2026, 05:43 UTC |
| [#73839](https://github.com/openclaw/openclaw/pull/73839) | fix: disable Pi auto-compaction when safeguard mode is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73839.md) | complete | Apr 29, 2026, 05:42 UTC |
| [#74105](https://github.com/openclaw/openclaw/pull/74105) | refactor(gateway): consolidate lifecycle lazy boundary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74105.md) | complete | Apr 29, 2026, 05:42 UTC |
| [#73925](https://github.com/openclaw/openclaw/pull/73925) | fix(gateway): bound websocket auth after valid connect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73925.md) | complete | Apr 29, 2026, 05:42 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 05:34 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25092641218](https://github.com/openclaw/clawsweeper/actions/runs/25092641218)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 878 |
| Open PRs | 39 |
| Open items total | 917 |
| Reviewed files | 911 |
| Unreviewed open items | 6 |
| Archived closed files | 21 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 906 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 36 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 1/53 current (52 due, 1.9%) |
| Hourly hot item cadence (<7d) | 1/53 current (52 due, 1.9%) |
| Daily cadence coverage | 221/221 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/200 current (0 due, 100%) |
| Weekly older issue cadence | 632/637 current (5 due, 99.2%) |
| Due now by cadence | 63 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 916 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 6 |
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

Latest review: Apr 29, 2026, 05:28 UTC. Latest close: Apr 29, 2026, 05:31 UTC. Latest comment sync: Apr 29, 2026, 05:28 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 22 | 0 | 22 | 0 | 2 | 22 | 0 |
| Last 24 hours | 926 | 0 | 926 | 5 | 15 | 924 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 04:05 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 04:04 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1068](https://github.com/openclaw/clawhub/issues/1068) | False positive: memory-vault skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1068.md) | complete | Apr 29, 2026, 05:26 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#1522](https://github.com/openclaw/clawhub/issues/1522) | Skill flagged — suspicious patterns detected ClawHub Security flagged this skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1522.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1227](https://github.com/openclaw/clawhub/issues/1227) | False positive: central-intelligence skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1227.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1657](https://github.com/openclaw/clawhub/pull/1657) | feat: detect phantom dependencies in skill bundle files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1657.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1128](https://github.com/openclaw/clawhub/issues/1128) | False positive: Manifest LLM Router flagged for documented, opt-in plugin behavior | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1128.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1054](https://github.com/openclaw/clawhub/issues/1054) | Login succeeds but user session not created after account deletion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1054.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1580](https://github.com/openclaw/clawhub/issues/1580) | This skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1580.md) | complete | Apr 29, 2026, 05:24 UTC |

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
  Clownfish repair loop; see
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
- Finding reports are dispatched to Clownfish when
  `CLAWSWEEPER_CLOWNFISH_COMMIT_FINDINGS_ENABLED` is not `false`. Clownfish owns
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

Manual review runs are proposal-only even if `--apply-closures` or workflow
input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged
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
- `CODEX_API_KEY`: optional compatibility alias for the same key during the
  login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target
  scans and artifact publish reconciliation when the GitHub App token is
  unavailable.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `openclaw-ci`.
  Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review
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
- ClawSweeper uses the `openclaw-ci` GitHub App token for read-heavy target
  context, falling back to `OPENCLAW_GH_TOKEN` only if app secrets are absent.
- Apply mode uses the app token for review comments and closes, so GitHub
  attributes mutations to `clawsweeper[bot]`.
- Commit review passes Codex only a read-scoped target token as `GH_TOKEN` for
  issue/PR/workflow/commit hydration, then creates write/check credentials only
  after Codex exits.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to target repository issues and pull requests
- optional Checks write on target repositories for commit Check Runs
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation, dispatch, or commit-review continuations

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
