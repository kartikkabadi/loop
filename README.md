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

Last dashboard update: Apr 29, 2026, 06:42 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4410 |
| Open PRs | 3488 |
| Open items total | 7898 |
| Reviewed files | 7521 |
| Unreviewed open items | 377 |
| Due now by cadence | 1949 |
| Proposed closes awaiting apply | 10 |
| Work candidates awaiting promotion | 528 |
| Closed by Codex apply | 10702 |
| Failed or stale reviews | 27 |
| Archived closed files | 14063 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6977 | 6606 | 371 | 1926 | 10 | 491 | 10695 | Apr 29, 2026, 06:28 UTC | Apr 29, 2026, 06:10 UTC | 405 |
| [ClawHub](https://github.com/openclaw/clawhub) | 921 | 915 | 6 | 23 | 0 | 37 | 7 | Apr 29, 2026, 06:28 UTC | Apr 29, 2026, 05:31 UTC | 792 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 29, 2026, 06:17 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25093141323) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 06:42 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25093676944) |

### Fleet Activity

Latest review: Apr 29, 2026, 06:28 UTC. Latest close: Apr 29, 2026, 06:10 UTC. Latest comment sync: Apr 29, 2026, 06:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 15 | 0 | 15 | 1 | 0 | 409 | 0 |
| Last hour | 1173 | 17 | 1156 | 20 | 16 | 1197 | 4 |
| Last 24 hours | 7008 | 450 | 6558 | 23 | 744 | 2344 | 31 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74024](https://github.com/openclaw/openclaw/pull/74024) | [AI-assisted] fix(config): allow custom skill entry fields | duplicate or superseded | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/74024.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74024.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71645](https://github.com/openclaw/openclaw/pull/71645) | Mattermost streaming text fix [AI-assisted] | duplicate or superseded | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/71645.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71645.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71086](https://github.com/openclaw/openclaw/pull/71086) | fix(pi): suppress stale mutating-tool warnings after successful reply | duplicate or superseded | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/71086.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71086.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70968](https://github.com/openclaw/openclaw/pull/70968) | fix(gateway): remove literal managed env values from install plan | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/70968.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70968.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70607](https://github.com/openclaw/openclaw/pull/70607) | fix(agents): preserve parent accountId in cross-agent subagent spawn routing | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/70607.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70607.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70223](https://github.com/openclaw/openclaw/issues/70223) | gateway launchd plist missing WorkingDirectory → ENOENT on every agent turn (relative agentDir resolves under cwd=/) | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/70223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70223.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69698](https://github.com/openclaw/openclaw/issues/69698) | Control UI: exec.approvals.set fails with unexpected property 'source' | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/69698.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69698.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63616](https://github.com/openclaw/openclaw/pull/63616) | Norgai/fix session default model complete | duplicate or superseded | Apr 29, 2026, 06:39 UTC | [records/openclaw-openclaw/closed/63616.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63616.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63377](https://github.com/openclaw/openclaw/pull/63377) | fix: Clarify sessions_send schema field guidance for sessionKey/label | duplicate or superseded | Apr 29, 2026, 06:39 UTC | [records/openclaw-openclaw/closed/63377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63377.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63372](https://github.com/openclaw/openclaw/issues/63372) | [Feature]: Allow memory-core dreaming to use a configurable model override | already implemented on main | Apr 29, 2026, 06:39 UTC | [records/openclaw-openclaw/closed/63372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63372.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74143](https://github.com/openclaw/openclaw/issues/74143) | feishu: streaming card duplicates content when block payloads overlap with partial snapshots | high | candidate | Apr 29, 2026, 06:29 UTC | [records/openclaw-openclaw/items/74143.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74143.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 06:28 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:27 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:25 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74137](https://github.com/openclaw/openclaw/issues/74137) | [Bug] Telegram channel occasionally injects blank user messages, causing API errors | high | candidate | Apr 29, 2026, 06:24 UTC | [records/openclaw-openclaw/items/74137.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74137.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 06:19 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:17 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 06:15 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 06:15 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72240](https://github.com/openclaw/openclaw/issues/72240) | [Bug]: exec commands intermittently SIGKILL on macOS with no diagnostic cause | high | candidate | Apr 29, 2026, 06:12 UTC | [records/openclaw-openclaw/items/72240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72240.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70797](https://github.com/openclaw/openclaw/issues/70797) | Tool-call payload can leak into user-visible reply during background exec/process flows | high | candidate | Apr 29, 2026, 06:11 UTC | [records/openclaw-openclaw/items/70797.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70797.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70288](https://github.com/openclaw/openclaw/pull/70288) | fix(dispatch): return queuedFinal: true when plugin-bound handler claims message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70288.md) | complete | Apr 29, 2026, 06:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73855](https://github.com/openclaw/openclaw/pull/73855) | ci: add workflow to detect hosted installer drift | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73855.md) | complete | Apr 29, 2026, 06:28 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) | complete | Apr 29, 2026, 06:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74138](https://github.com/openclaw/openclaw/issues/74138) | [Bug]: feishu  createScopedPairingAccess | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74138.md) | complete | Apr 29, 2026, 06:28 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1863](https://github.com/openclaw/clawhub/issues/1863) | /skills search is not stable for English queries: `scienceclaw` returns 3 results while `ScienceClaw` returns 6` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1863.md) | complete | Apr 29, 2026, 06:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74141](https://github.com/openclaw/openclaw/issues/74141) | session_status throws \"Unknown sessionKey: current\" for channel-plugin agents (~4s wasted per turn) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74141.md) | complete | Apr 29, 2026, 06:28 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) | complete | Apr 29, 2026, 06:27 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1089](https://github.com/openclaw/clawhub/issues/1089) | False Positive Flag Report: kling-image-generate | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1089.md) | complete | Apr 29, 2026, 06:27 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 29, 2026, 06:27 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1035](https://github.com/openclaw/clawhub/issues/1035) | risk-sentiment-scanner skill flagged  申请误标记接触 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1035.md) | complete | Apr 29, 2026, 06:27 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 06:41 UTC

State: Apply finished

Apply/comment-sync run finished with 10 fresh closes out of requested limit 10. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25094570466](https://github.com/openclaw/clawsweeper/actions/runs/25094570466)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3528 |
| Open PRs | 3449 |
| Open items total | 6977 |
| Reviewed files | 6606 |
| Unreviewed open items | 371 |
| Archived closed files | 14042 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3343 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3246 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6589 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 492 |
| Closed by Codex apply | 10709 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 306/1012 current (706 due, 30.2%) |
| Hourly hot item cadence (<7d) | 306/1012 current (706 due, 30.2%) |
| Daily cadence coverage | 2948/3796 current (848 due, 77.7%) |
| Daily PR cadence | 2205/2653 current (448 due, 83.1%) |
| Daily new issue cadence (<30d) | 743/1143 current (400 due, 65%) |
| Weekly older issue cadence | 1797/1798 current (1 due, 99.9%) |
| Due now by cadence | 1926 |

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

Latest review: Apr 29, 2026, 06:28 UTC. Latest close: Apr 29, 2026, 06:10 UTC. Latest comment sync: Apr 29, 2026, 06:29 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 6 | 0 | 6 | 0 | 0 | 6 | 0 |
| Last hour | 572 | 17 | 555 | 5 | 16 | 405 | 4 |
| Last 24 hours | 6080 | 450 | 5630 | 8 | 730 | 1519 | 31 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74024](https://github.com/openclaw/openclaw/pull/74024) | [AI-assisted] fix(config): allow custom skill entry fields | duplicate or superseded | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/74024.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74024.md) |
| [#71645](https://github.com/openclaw/openclaw/pull/71645) | Mattermost streaming text fix [AI-assisted] | duplicate or superseded | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/71645.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71645.md) |
| [#71086](https://github.com/openclaw/openclaw/pull/71086) | fix(pi): suppress stale mutating-tool warnings after successful reply | duplicate or superseded | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/71086.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71086.md) |
| [#70968](https://github.com/openclaw/openclaw/pull/70968) | fix(gateway): remove literal managed env values from install plan | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/70968.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70968.md) |
| [#70607](https://github.com/openclaw/openclaw/pull/70607) | fix(agents): preserve parent accountId in cross-agent subagent spawn routing | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/70607.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70607.md) |
| [#70223](https://github.com/openclaw/openclaw/issues/70223) | gateway launchd plist missing WorkingDirectory → ENOENT on every agent turn (relative agentDir resolves under cwd=/) | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/70223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70223.md) |
| [#69698](https://github.com/openclaw/openclaw/issues/69698) | Control UI: exec.approvals.set fails with unexpected property 'source' | already implemented on main | Apr 29, 2026, 06:40 UTC | [records/openclaw-openclaw/closed/69698.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69698.md) |
| [#63616](https://github.com/openclaw/openclaw/pull/63616) | Norgai/fix session default model complete | duplicate or superseded | Apr 29, 2026, 06:39 UTC | [records/openclaw-openclaw/closed/63616.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63616.md) |
| [#63377](https://github.com/openclaw/openclaw/pull/63377) | fix: Clarify sessions_send schema field guidance for sessionKey/label | duplicate or superseded | Apr 29, 2026, 06:39 UTC | [records/openclaw-openclaw/closed/63377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63377.md) |
| [#63372](https://github.com/openclaw/openclaw/issues/63372) | [Feature]: Allow memory-core dreaming to use a configurable model override | already implemented on main | Apr 29, 2026, 06:39 UTC | [records/openclaw-openclaw/closed/63372.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63372.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74143](https://github.com/openclaw/openclaw/issues/74143) | feishu: streaming card duplicates content when block payloads overlap with partial snapshots | high | candidate | Apr 29, 2026, 06:29 UTC | [records/openclaw-openclaw/items/74143.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74143.md) |
| [#74137](https://github.com/openclaw/openclaw/issues/74137) | [Bug] Telegram channel occasionally injects blank user messages, causing API errors | high | candidate | Apr 29, 2026, 06:24 UTC | [records/openclaw-openclaw/items/74137.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74137.md) |
| [#72240](https://github.com/openclaw/openclaw/issues/72240) | [Bug]: exec commands intermittently SIGKILL on macOS with no diagnostic cause | high | candidate | Apr 29, 2026, 06:12 UTC | [records/openclaw-openclaw/items/72240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72240.md) |
| [#70797](https://github.com/openclaw/openclaw/issues/70797) | Tool-call payload can leak into user-visible reply during background exec/process flows | high | candidate | Apr 29, 2026, 06:11 UTC | [records/openclaw-openclaw/items/70797.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70797.md) |
| [#74125](https://github.com/openclaw/openclaw/issues/74125) | Gateway-restart wake-ups for Claude CLI Discord sessions arrive cold — neither --resume nor openClawHistoryPrompt rebuild fires | high | candidate | Apr 29, 2026, 06:08 UTC | [records/openclaw-openclaw/items/74125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74125.md) |
| [#70407](https://github.com/openclaw/openclaw/issues/70407) | Breaking config change in v2026.4.21: dreaming.storage schema migration breaks CLI on upgrade | high | candidate | Apr 29, 2026, 06:07 UTC | [records/openclaw-openclaw/items/70407.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70407.md) |
| [#70347](https://github.com/openclaw/openclaw/issues/70347) | Cron outer timeout should emit lifecycle.error so sessions.json finalizes immediately | high | candidate | Apr 29, 2026, 06:07 UTC | [records/openclaw-openclaw/items/70347.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70347.md) |
| [#69599](https://github.com/openclaw/openclaw/issues/69599) | [Bug]: Control UI /new, /reset, and New Session do not create the same true fresh session as direct session creation | high | candidate | Apr 29, 2026, 06:07 UTC | [records/openclaw-openclaw/items/69599.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69599.md) |
| [#74036](https://github.com/openclaw/openclaw/issues/74036) | [Bug]: corpus=sessions memory_search returns 0 results for many keywords despite data being indexed | high | candidate | Apr 29, 2026, 06:06 UTC | [records/openclaw-openclaw/items/74036.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74036.md) |
| [#71710](https://github.com/openclaw/openclaw/issues/71710) | [Bug]: openclaw-agent ignores SIGTERM under cron, accumulates hung process chains and exhausts host RAM/swap | high | candidate | Apr 29, 2026, 06:06 UTC | [records/openclaw-openclaw/items/71710.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71710.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70288](https://github.com/openclaw/openclaw/pull/70288) | fix(dispatch): return queuedFinal: true when plugin-bound handler claims message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70288.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#73855](https://github.com/openclaw/openclaw/pull/73855) | ci: add workflow to detect hosted installer drift | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73855.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#74138](https://github.com/openclaw/openclaw/issues/74138) | [Bug]: feishu  createScopedPairingAccess | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74138.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#74141](https://github.com/openclaw/openclaw/issues/74141) | session_status throws \"Unknown sessionKey: current\" for channel-plugin agents (~4s wasted per turn) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74141.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73474.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#74140](https://github.com/openclaw/openclaw/pull/74140) | fix: Found one generated-baseline regression. The code changes are JSD | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74140.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#72409](https://github.com/openclaw/openclaw/pull/72409) | fix(plugins): suppress false duplicate-id warnings across origins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72409.md) | complete | Apr 29, 2026, 06:26 UTC |
| [#74010](https://github.com/openclaw/openclaw/pull/74010) | fix(compaction): respect effective reserve tokens in compaction gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74010.md) | complete | Apr 29, 2026, 06:26 UTC |
| [#73746](https://github.com/openclaw/openclaw/pull/73746) | feat(tasks): improve task state transitions and lifecycle formatting | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73746.md) | complete | Apr 29, 2026, 06:25 UTC |
| [#74139](https://github.com/openclaw/openclaw/pull/74139) | fix(tools): skip allowlist guard when tools are explicitly disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74139.md) | complete | Apr 29, 2026, 06:24 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 06:42 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 403. Item numbers: 17,65,95,102,134,137,162,173,236,248,265,279,287,288,290,321,340,345,348,351,386,387,392,393,402,410,424,425,437,438,442,447,448,451,459,469,471,474,478,479,480,481,482,485,489,495,498,504,531,539,541,566,573,580,581,586,604,613,614,618,619,621,625,635,642,646,647,650,651,652,653,655,658,662,664,666,667,669,670,672,673,675,676,678,679,681,683,692,694,700,701,705,706,708,711,712,713,716,717,722,730,731,733,734,737,745,747,752,755,756,758,760,761,762,764,765,767,768,769,770,779,780,784,786,789,791,792,794,800,804,807,808,809,811,817,819,822,823,824,834,835,838,845,846,847,849,850,851,852,853,854,856,858,860,861,862,863,867,868,869,870,871,873,874,875,876,878,879,880,881,882,883,887,889,890,892,895,899,900,901,903,904,906,907,908,909,910,911,912,913,914,915,917,920,921,922,923,925,927,928,930,932,933,935,936,937,938,939,941,943,946,951,954,958,959,960,962,963,966,967,969,970,971,972,974,975,984,985,987,989,990,994,995,998,999,1001,1002,1003,1004,1005,1009,1010,1013,1016,1018,1020,1024,1026,1027,1028,1033,1035,1038,1039,1040,1041,1043,1044,1045,1048,1049,1062,1063,1069,1072,1075,1079,1080,1081,1082,1083,1084,1089,1090,1091,1092,1094,1098,1100,1102,1104,1105,1107,1109,1110,1112,1114,1116,1118,1119,1120,1121,1122,1124,1129,1132,1133,1136,1137,1140,1142,1147,1148,1149,1152,1153,1154,1155,1169,1170,1171,1172,1173,1175,1176,1177,1180,1181,1182,1184,1186,1188,1193,1195,1197,1199,1201,1204,1206,1207,1211,1212,1217,1218,1219,1221,1222,1228,1248,1261,1266,1268,1290,1294,1299,1301,1326,1354,1391,1394,1398,1403,1418,1434,1476,1480,1495,1511,1528,1542,1551,1553,1554,1558,1563,1575,1581,1591,1649,1672,1677,1685,1707,1718,1734,1735,1743,1751,1768,1771,1772,1783,1787,1789,1797,1798,1808,1813,1815,1818,1819,1821,1823,1828,1833,1840,1848,1849,1857,1860,1863,1876,1877,1884.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25093676944](https://github.com/openclaw/clawsweeper/actions/runs/25093676944)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 882 |
| Open PRs | 39 |
| Open items total | 921 |
| Reviewed files | 915 |
| Unreviewed open items | 6 |
| Archived closed files | 21 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 867 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 900 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 37 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 15 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 54/56 current (2 due, 96.4%) |
| Hourly hot item cadence (<7d) | 54/56 current (2 due, 96.4%) |
| Daily cadence coverage | 218/218 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 197/197 current (0 due, 100%) |
| Weekly older issue cadence | 626/641 current (15 due, 97.7%) |
| Due now by cadence | 23 |

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

Latest review: Apr 29, 2026, 06:28 UTC. Latest close: Apr 29, 2026, 05:31 UTC. Latest comment sync: Apr 29, 2026, 06:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 0 | 9 | 1 | 0 | 403 | 0 |
| Last hour | 601 | 0 | 601 | 15 | 0 | 792 | 0 |
| Last 24 hours | 928 | 0 | 928 | 15 | 14 | 825 | 0 |

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
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 06:28 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:27 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:25 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 06:19 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:17 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 06:15 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#1863](https://github.com/openclaw/clawhub/issues/1863) | /skills search is not stable for English queries: `scienceclaw` returns 3 results while `ScienceClaw` returns 6` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1863.md) | complete | Apr 29, 2026, 06:28 UTC |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1089](https://github.com/openclaw/clawhub/issues/1089) | False Positive Flag Report: kling-image-generate | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1089.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1035](https://github.com/openclaw/clawhub/issues/1035) | risk-sentiment-scanner skill flagged  申请误标记接触 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1035.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1301](https://github.com/openclaw/clawhub/issues/1301) | Question: Publisher verification path for active code plugin contributors? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1301.md) | failed | Apr 29, 2026, 06:27 UTC |
| [#1040](https://github.com/openclaw/clawhub/issues/1040) | False Positive: ifly-voiceclone-tts is  safe, official iFlytek voice clone tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1040.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1173](https://github.com/openclaw/clawhub/issues/1173) | Cannot publish: Personal publisher not found / pagination error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1173.md) | complete | Apr 29, 2026, 06:27 UTC |
| [#1772](https://github.com/openclaw/clawhub/issues/1772) | Skill flagged as suspicious — docx-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1772.md) | complete | Apr 29, 2026, 06:27 UTC |

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
