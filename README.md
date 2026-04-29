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

Last dashboard update: Apr 29, 2026, 13:59 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4428 |
| Open PRs | 3414 |
| Open items total | 7842 |
| Reviewed files | 7488 |
| Unreviewed open items | 356 |
| Due now by cadence | 2846 |
| Proposed closes awaiting apply | 2 |
| Work candidates awaiting promotion | 648 |
| Closed by Codex apply | 10784 |
| Failed or stale reviews | 36 |
| Archived closed files | 14341 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6915 | 6564 | 351 | 2789 | 2 | 604 | 10776 | Apr 29, 2026, 13:56 UTC | Apr 29, 2026, 13:56 UTC | 433 |
| [ClawHub](https://github.com/openclaw/clawhub) | 926 | 922 | 5 | 57 | 0 | 43 | 8 | Apr 29, 2026, 13:35 UTC | Apr 29, 2026, 08:25 UTC | 326 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 1 | 2 | 0 | 0 | 0 | 1 | 0 | Apr 29, 2026, 13:41 UTC | unknown | 2 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 29, 2026, 13:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25113230202) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 13:38 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25112177089) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 13:56 UTC. Latest close: Apr 29, 2026, 13:56 UTC. Latest comment sync: Apr 29, 2026, 13:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 22 | 2 | 20 | 0 | 9 | 196 | 0 |
| Last hour | 1076 | 9 | 1067 | 17 | 64 | 761 | 1 |
| Last 24 hours | 6108 | 394 | 5714 | 28 | 795 | 2002 | 28 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72161](https://github.com/openclaw/openclaw/pull/72161) | fix: update Brave Search docs URL to canonical location | closed externally after review | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/72161.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72161.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74372](https://github.com/openclaw/openclaw/issues/74372) | [Bug]: Whatsapp package not found on npm | already implemented on main | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/74372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74372.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72163](https://github.com/openclaw/openclaw/pull/72163) | docs: fix alphabetical ordering in provider and channel lists | closed externally after review | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/72163.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72163.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72172](https://github.com/openclaw/openclaw/pull/72172) | docs: document avatar image 2MB size limit | closed externally after review | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/72172.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72172.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74368](https://github.com/openclaw/openclaw/issues/74368) | [Feature]: Ensure dropdown during model selection (in openclaw onboard) | already implemented on main | Apr 29, 2026, 13:53 UTC | [records/openclaw-openclaw/closed/74368.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74368.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48270](https://github.com/openclaw/openclaw/pull/48270) | fix(gateway): prevent probe timeout from deferred ESM module evaluation | closed externally after review | Apr 29, 2026, 13:52 UTC | [records/openclaw-openclaw/closed/48270.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48270.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74279](https://github.com/openclaw/openclaw/issues/74279) | Regression: Windows gateway probe/connect timeout returns in 2026.4.26 | closed externally after review | Apr 29, 2026, 13:52 UTC | [records/openclaw-openclaw/closed/74279.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74279.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63003](https://github.com/openclaw/openclaw/pull/63003) | sandbox explain: show effective mounts | closed externally after review | Apr 29, 2026, 13:51 UTC | [records/openclaw-openclaw/closed/63003.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63003.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74230](https://github.com/openclaw/openclaw/pull/74230) | fix(telegram): classify plain grammY network envelope as safe to retry for sends | duplicate or superseded | Apr 29, 2026, 13:44 UTC | [records/openclaw-openclaw/closed/74230.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74230.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74215](https://github.com/openclaw/openclaw/pull/74215) | [debug][skill] add bundled skill for triage-ready OpenClaw agent bug reports | belongs on ClawHub | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/closed/74215.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74215.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74370](https://github.com/openclaw/openclaw/issues/74370) | [Bug] 消息在 memory flush + compaction 后被重复投递 | high | candidate | Apr 29, 2026, 13:54 UTC | [records/openclaw-openclaw/items/74370.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74370.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74364](https://github.com/openclaw/openclaw/issues/74364) | Strip <relevant-memories> blocks from outbound channel messages (Telegram, Discord, etc.) | high | candidate | Apr 29, 2026, 13:48 UTC | [records/openclaw-openclaw/items/74364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74364.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74363](https://github.com/openclaw/openclaw/issues/74363) | Subagent runs can be falsely marked failed/lost after clean gateway close or pending wait | high | candidate | Apr 29, 2026, 13:46 UTC | [records/openclaw-openclaw/items/74363.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74363.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations after explicit restarts | high | candidate | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/items/73812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74271](https://github.com/openclaw/openclaw/issues/74271) | [Feature]: doctor/status should warn when OPENCLAW_GATEWAY_TOKEN in ~/.openclaw/.env overrides gateway.auth.token | high | candidate | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/items/74271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74271.md) |
| [openclaw/clawsweeper](https://github.com/openclaw/clawsweeper) | [#19](https://github.com/openclaw/clawsweeper/pull/19) | test: exercise automerge repair smoke | high | candidate | Apr 29, 2026, 13:41 UTC | [records/openclaw-clawsweeper/items/19.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/19.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74358](https://github.com/openclaw/openclaw/issues/74358) | Slack: streaming preview completely silent when toolProgress: false — verbose mode broken since v2026.4.21 | high | candidate | Apr 29, 2026, 13:34 UTC | [records/openclaw-openclaw/items/74358.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74358.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63474](https://github.com/openclaw/openclaw/pull/63474) | fix(config): strip legacy installs/plugins from channel configs before validation | high | candidate | Apr 29, 2026, 13:26 UTC | [records/openclaw-openclaw/items/63474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63474.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69220](https://github.com/openclaw/openclaw/issues/69220) | Gemini text-tag reasoning conflicts with native thinking — produces unclosed <think>, empty post-tool turn, payloads=0 | high | candidate | Apr 29, 2026, 13:25 UTC | [records/openclaw-openclaw/items/69220.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69220.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74237](https://github.com/openclaw/openclaw/issues/74237) | Feishu channel can hot-loop gateway on stale or corrupt channel session state | high | candidate | Apr 29, 2026, 13:25 UTC | [records/openclaw-openclaw/items/74237.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74237.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73920](https://github.com/openclaw/openclaw/pull/73920) | fix(feishu): clean up bitable placeholder rows with empty defaults | high | candidate | Apr 29, 2026, 13:24 UTC | [records/openclaw-openclaw/items/73920.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73920.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63373](https://github.com/openclaw/openclaw/issues/63373) | [Bug]: Raw internal transcript content ([TOOL_CALL]) leaked into user-visible Telegram chat after transcript corruption/repair | high | candidate | Apr 29, 2026, 13:24 UTC | [records/openclaw-openclaw/items/63373.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63373.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69118](https://github.com/openclaw/openclaw/issues/69118) | Claude CLI sessions reset on every turn in group channels due to groupIntro drift in extraSystemPromptHash | high | candidate | Apr 29, 2026, 13:24 UTC | [records/openclaw-openclaw/items/69118.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69118.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69778](https://github.com/openclaw/openclaw/issues/69778) | [Bug]: Gateway restart resurrects ancient interrupted CLI subagent tasks regardless of age — old prompts auto-execute | high | candidate | Apr 29, 2026, 13:24 UTC | [records/openclaw-openclaw/items/69778.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69778.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64318](https://github.com/openclaw/openclaw/pull/64318) | feat: Add unified Amazon plugin — Polly TTS, Transcribe STT, Nova Sonic realtime voice | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64318.md) | complete | Apr 29, 2026, 13:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74373](https://github.com/openclaw/openclaw/pull/74373) | feat(feishu): add explicit approval approvers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74373.md) | complete | Apr 29, 2026, 13:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74370](https://github.com/openclaw/openclaw/issues/74370) | [Bug] 消息在 memory flush + compaction 后被重复投递 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74370.md) | complete | Apr 29, 2026, 13:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74371](https://github.com/openclaw/openclaw/pull/74371) | Fix Control UI dashboard breadcrumb navigation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74371.md) | complete | Apr 29, 2026, 13:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74365](https://github.com/openclaw/openclaw/issues/74365) | [Feature]: Handle loading states, because commands are generally slow. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74365.md) | complete | Apr 29, 2026, 13:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74369](https://github.com/openclaw/openclaw/pull/74369) | fix(control-ui): preserve numeric chat input in composer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74369.md) | complete | Apr 29, 2026, 13:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 13:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74338](https://github.com/openclaw/openclaw/pull/74338) | docs(security): clarify proxy SSRF reporting scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74338.md) | complete | Apr 29, 2026, 13:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73008](https://github.com/openclaw/openclaw/pull/73008) | fix(deepseek): expose V4 max thinking levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73008.md) | complete | Apr 29, 2026, 13:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59118](https://github.com/openclaw/openclaw/pull/59118) | fix: suppress raw JSON parse errors from leaking to Discord channels (#59076) [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59118.md) | complete | Apr 29, 2026, 13:50 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 13:59 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 2 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=74256,74287.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25113230202](https://github.com/openclaw/clawsweeper/actions/runs/25113230202)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3541 |
| Open PRs | 3374 |
| Open items total | 6915 |
| Reviewed files | 6564 |
| Unreviewed open items | 351 |
| Archived closed files | 14318 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3358 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3185 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6543 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Work candidates awaiting promotion | 604 |
| Closed by Codex apply | 10776 |
| Failed or stale reviews | 21 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 109/1068 current (959 due, 10.2%) |
| Hourly hot item cadence (<7d) | 109/1068 current (959 due, 10.2%) |
| Daily cadence coverage | 2218/3692 current (1474 due, 60.1%) |
| Daily PR cadence | 1614/2571 current (957 due, 62.8%) |
| Daily new issue cadence (<30d) | 604/1121 current (517 due, 53.9%) |
| Weekly older issue cadence | 1799/1804 current (5 due, 99.7%) |
| Due now by cadence | 2789 |

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

Latest review: Apr 29, 2026, 13:56 UTC. Latest close: Apr 29, 2026, 13:56 UTC. Latest comment sync: Apr 29, 2026, 13:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 22 | 2 | 20 | 0 | 9 | 196 | 0 |
| Last hour | 574 | 9 | 565 | 2 | 64 | 433 | 1 |
| Last 24 hours | 5172 | 394 | 4778 | 13 | 782 | 1385 | 28 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72161](https://github.com/openclaw/openclaw/pull/72161) | fix: update Brave Search docs URL to canonical location | closed externally after review | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/72161.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72161.md) |
| [#74372](https://github.com/openclaw/openclaw/issues/74372) | [Bug]: Whatsapp package not found on npm | already implemented on main | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/74372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74372.md) |
| [#72163](https://github.com/openclaw/openclaw/pull/72163) | docs: fix alphabetical ordering in provider and channel lists | closed externally after review | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/72163.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72163.md) |
| [#72172](https://github.com/openclaw/openclaw/pull/72172) | docs: document avatar image 2MB size limit | closed externally after review | Apr 29, 2026, 13:56 UTC | [records/openclaw-openclaw/closed/72172.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72172.md) |
| [#74368](https://github.com/openclaw/openclaw/issues/74368) | [Feature]: Ensure dropdown during model selection (in openclaw onboard) | already implemented on main | Apr 29, 2026, 13:53 UTC | [records/openclaw-openclaw/closed/74368.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74368.md) |
| [#48270](https://github.com/openclaw/openclaw/pull/48270) | fix(gateway): prevent probe timeout from deferred ESM module evaluation | closed externally after review | Apr 29, 2026, 13:52 UTC | [records/openclaw-openclaw/closed/48270.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48270.md) |
| [#74279](https://github.com/openclaw/openclaw/issues/74279) | Regression: Windows gateway probe/connect timeout returns in 2026.4.26 | closed externally after review | Apr 29, 2026, 13:52 UTC | [records/openclaw-openclaw/closed/74279.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74279.md) |
| [#63003](https://github.com/openclaw/openclaw/pull/63003) | sandbox explain: show effective mounts | closed externally after review | Apr 29, 2026, 13:51 UTC | [records/openclaw-openclaw/closed/63003.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63003.md) |
| [#74230](https://github.com/openclaw/openclaw/pull/74230) | fix(telegram): classify plain grammY network envelope as safe to retry for sends | duplicate or superseded | Apr 29, 2026, 13:44 UTC | [records/openclaw-openclaw/closed/74230.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74230.md) |
| [#74215](https://github.com/openclaw/openclaw/pull/74215) | [debug][skill] add bundled skill for triage-ready OpenClaw agent bug reports | belongs on ClawHub | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/closed/74215.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74215.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74370](https://github.com/openclaw/openclaw/issues/74370) | [Bug] 消息在 memory flush + compaction 后被重复投递 | high | candidate | Apr 29, 2026, 13:54 UTC | [records/openclaw-openclaw/items/74370.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74370.md) |
| [#74364](https://github.com/openclaw/openclaw/issues/74364) | Strip <relevant-memories> blocks from outbound channel messages (Telegram, Discord, etc.) | high | candidate | Apr 29, 2026, 13:48 UTC | [records/openclaw-openclaw/items/74364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74364.md) |
| [#74363](https://github.com/openclaw/openclaw/issues/74363) | Subagent runs can be falsely marked failed/lost after clean gateway close or pending wait | high | candidate | Apr 29, 2026, 13:46 UTC | [records/openclaw-openclaw/items/74363.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74363.md) |
| [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations after explicit restarts | high | candidate | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/items/73812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) |
| [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [#74271](https://github.com/openclaw/openclaw/issues/74271) | [Feature]: doctor/status should warn when OPENCLAW_GATEWAY_TOKEN in ~/.openclaw/.env overrides gateway.auth.token | high | candidate | Apr 29, 2026, 13:43 UTC | [records/openclaw-openclaw/items/74271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74271.md) |
| [#74358](https://github.com/openclaw/openclaw/issues/74358) | Slack: streaming preview completely silent when toolProgress: false — verbose mode broken since v2026.4.21 | high | candidate | Apr 29, 2026, 13:34 UTC | [records/openclaw-openclaw/items/74358.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74358.md) |
| [#63474](https://github.com/openclaw/openclaw/pull/63474) | fix(config): strip legacy installs/plugins from channel configs before validation | high | candidate | Apr 29, 2026, 13:26 UTC | [records/openclaw-openclaw/items/63474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63474.md) |
| [#69220](https://github.com/openclaw/openclaw/issues/69220) | Gemini text-tag reasoning conflicts with native thinking — produces unclosed <think>, empty post-tool turn, payloads=0 | high | candidate | Apr 29, 2026, 13:25 UTC | [records/openclaw-openclaw/items/69220.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69220.md) |
| [#74237](https://github.com/openclaw/openclaw/issues/74237) | Feishu channel can hot-loop gateway on stale or corrupt channel session state | high | candidate | Apr 29, 2026, 13:25 UTC | [records/openclaw-openclaw/items/74237.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74237.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64318](https://github.com/openclaw/openclaw/pull/64318) | feat: Add unified Amazon plugin — Polly TTS, Transcribe STT, Nova Sonic realtime voice | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64318.md) | complete | Apr 29, 2026, 13:56 UTC |
| [#74373](https://github.com/openclaw/openclaw/pull/74373) | feat(feishu): add explicit approval approvers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74373.md) | complete | Apr 29, 2026, 13:56 UTC |
| [#74370](https://github.com/openclaw/openclaw/issues/74370) | [Bug] 消息在 memory flush + compaction 后被重复投递 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74370.md) | complete | Apr 29, 2026, 13:54 UTC |
| [#74371](https://github.com/openclaw/openclaw/pull/74371) | Fix Control UI dashboard breadcrumb navigation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74371.md) | complete | Apr 29, 2026, 13:54 UTC |
| [#74365](https://github.com/openclaw/openclaw/issues/74365) | [Feature]: Handle loading states, because commands are generally slow. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74365.md) | complete | Apr 29, 2026, 13:54 UTC |
| [#74369](https://github.com/openclaw/openclaw/pull/74369) | fix(control-ui): preserve numeric chat input in composer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74369.md) | complete | Apr 29, 2026, 13:53 UTC |
| [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 13:52 UTC |
| [#74338](https://github.com/openclaw/openclaw/pull/74338) | docs(security): clarify proxy SSRF reporting scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74338.md) | complete | Apr 29, 2026, 13:52 UTC |
| [#73008](https://github.com/openclaw/openclaw/pull/73008) | fix(deepseek): expose V4 max thinking levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73008.md) | complete | Apr 29, 2026, 13:52 UTC |
| [#59118](https://github.com/openclaw/openclaw/pull/59118) | fix: suppress raw JSON parse errors from leaking to Discord channels (#59076) [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59118.md) | complete | Apr 29, 2026, 13:50 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 13:38 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25112177089](https://github.com/openclaw/clawsweeper/actions/runs/25112177089)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 887 |
| Open PRs | 39 |
| Open items total | 926 |
| Reviewed files | 922 |
| Unreviewed open items | 5 |
| Archived closed files | 23 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 43 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 15 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 21/59 current (38 due, 35.6%) |
| Hourly hot item cadence (<7d) | 21/59 current (38 due, 35.6%) |
| Daily cadence coverage | 210/212 current (2 due, 99.1%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/191 current (2 due, 99%) |
| Weekly older issue cadence | 639/651 current (12 due, 98.2%) |
| Due now by cadence | 57 |

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

Latest review: Apr 29, 2026, 13:35 UTC. Latest close: Apr 29, 2026, 08:25 UTC. Latest comment sync: Apr 29, 2026, 13:37 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 500 | 0 | 500 | 15 | 0 | 326 | 0 |
| Last 24 hours | 934 | 0 | 934 | 15 | 13 | 615 | 0 |

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
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 13:16 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 13:12 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 13:09 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 13:08 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 13:05 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 13:04 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 13:04 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 13:04 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 13:03 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 13:03 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1557](https://github.com/openclaw/clawhub/issues/1557) | False positive: humanizer-de v1.1.2 flagged as suspicious (fs.readFileSync/writeFileSync for text correction) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1557.md) | failed | Apr 29, 2026, 13:35 UTC |
| [#1543](https://github.com/openclaw/clawhub/issues/1543) | False Positive Security Flag for VCF Log Insight Skill (vcf-loginsight-sddc-errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1543.md) | complete | Apr 29, 2026, 13:28 UTC |
| [#1583](https://github.com/openclaw/clawhub/issues/1583) | False Positive: Suspicious patterns / Unicode flags on beckmann-knowledge-graph | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1583.md) | complete | Apr 29, 2026, 13:28 UTC |
| [#1585](https://github.com/openclaw/clawhub/issues/1585) | Bc Calc flagged with 'suspicious patterns' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1585.md) | complete | Apr 29, 2026, 13:27 UTC |
| [#1817](https://github.com/openclaw/clawhub/issues/1817) | False positive: trustboost-pii-sanitizer flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1817.md) | complete | Apr 29, 2026, 13:27 UTC |
| [#1574](https://github.com/openclaw/clawhub/issues/1574) | clawhub explore --json returns empty items[] (authenticated, all sort modes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1574.md) | complete | Apr 29, 2026, 13:27 UTC |
| [#1559](https://github.com/openclaw/clawhub/issues/1559) | False positive: solana-token-monitor flagged as suspicious — legitimate public API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1559.md) | complete | Apr 29, 2026, 13:27 UTC |
| [#1890](https://github.com/openclaw/clawhub/issues/1890) | False positive: solidclaw flagged as suspicious — env var + network is standard SOLID OIDC auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1890.md) | complete | Apr 29, 2026, 13:27 UTC |
| [#1877](https://github.com/openclaw/clawhub/issues/1877) | Regression: manually cleared skill shows suspicious status again after ClawHub update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1877.md) | complete | Apr 29, 2026, 13:27 UTC |
| [#1533](https://github.com/openclaw/clawhub/pull/1533) | refactor: deduplicate clampInt utility across convex modules | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1533.md) | complete | Apr 29, 2026, 13:27 UTC |

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
| Open PRs | 1 |
| Open items total | 1 |
| Reviewed files | 2 |
| Unreviewed open items | 0 |
| Archived closed files | 0 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 0 |
| Proposed issue closes | 0 (- of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 2 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 2 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 1 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 2/2 current (0 due, 100%) |
| Hourly hot item cadence (<7d) | 2/2 current (0 due, 100%) |
| Daily cadence coverage | 0/0 current (0 due, -) |
| Daily PR cadence | 0/0 current (0 due, -) |
| Daily new issue cadence (<30d) | 0/0 current (0 due, -) |
| Weekly older issue cadence | 0/0 current (0 due, -) |
| Due now by cadence | 0 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawsweeper:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawsweeper:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 13:41 UTC. Latest close: unknown. Latest comment sync: Apr 29, 2026, 13:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 2 | 0 | 2 | 0 | 0 | 2 | 0 |
| Last 24 hours | 2 | 0 | 2 | 0 | 0 | 2 | 0 |

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
