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

Last dashboard update: Apr 29, 2026, 06:10 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4222 |
| Open PRs | 3283 |
| Open items total | 7505 |
| Reviewed files | 7505 |
| Unreviewed open items | 0 |
| Due now by cadence | 1743 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 528 |
| Closed by Codex apply | 10702 |
| Failed or stale reviews | 27 |
| Archived closed files | 14059 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6593 | 6593 | 0 | 1708 | 0 | 489 | 10695 | Apr 29, 2026, 06:08 UTC | Apr 29, 2026, 06:03 UTC | 543 |
| [ClawHub](https://github.com/openclaw/clawhub) | 912 | 912 | 0 | 35 | 0 | 39 | 7 | Apr 29, 2026, 06:07 UTC | Apr 29, 2026, 05:31 UTC | 420 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 06:10 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25093676944) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 06:09 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25092641218) |

### Fleet Activity

Latest review: Apr 29, 2026, 06:08 UTC. Latest close: Apr 29, 2026, 06:03 UTC. Latest comment sync: Apr 29, 2026, 06:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 24 | 2 | 22 | 0 | 1 | 420 | 0 |
| Last hour | 1088 | 29 | 1059 | 20 | 35 | 963 | 7 |
| Last 24 hours | 7060 | 454 | 6606 | 23 | 758 | 2830 | 35 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74119](https://github.com/openclaw/openclaw/issues/74119) | [Bug]: Telegram DM startup/runtime context and async follow-up scaffolding can leak into user-visible messages | already implemented on main | Apr 29, 2026, 06:03 UTC | [records/openclaw-openclaw/closed/74119.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74119.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74111](https://github.com/openclaw/openclaw/issues/74111) | BUG: media-understanding-core cannot resolve staged sharp dependency for image processing | already implemented on main | Apr 29, 2026, 05:54 UTC | [records/openclaw-openclaw/closed/74111.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74111.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74109](https://github.com/openclaw/openclaw/pull/74109) | ci: rename codeql quality baseline shard | kept open | Apr 29, 2026, 05:50 UTC | [records/openclaw-openclaw/closed/74109.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74109.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74108](https://github.com/openclaw/openclaw/issues/74108) | QQBot: /new command fails with 'messages must not be empty' error | duplicate or superseded | Apr 29, 2026, 05:50 UTC | [records/openclaw-openclaw/closed/74108.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74108.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73878.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54526](https://github.com/openclaw/openclaw/pull/54526) | Fix slack channels error | already implemented on main | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54526.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54526.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54116](https://github.com/openclaw/openclaw/pull/54116) | feat(google): make Gemini web search base URL configurable | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54116.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54116.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53561](https://github.com/openclaw/openclaw/pull/53561) | fix gateway connect handshake timeout | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53561.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53561.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53478](https://github.com/openclaw/openclaw/pull/53478) | fix(plugin-sdk): re-export normalizeAccountId and resolvePreferredOpenClawTmpDir | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53478.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74027](https://github.com/openclaw/openclaw/pull/74027) | [AI-assisted] fix(agents): clarify approval slug guidance | closed externally after review | Apr 29, 2026, 05:45 UTC | [records/openclaw-openclaw/closed/74027.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74027.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74125](https://github.com/openclaw/openclaw/issues/74125) | Gateway-restart wake-ups for Claude CLI Discord sessions arrive cold — neither --resume nor openClawHistoryPrompt rebuild fires | high | candidate | Apr 29, 2026, 06:08 UTC | [records/openclaw-openclaw/items/74125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74125.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74123](https://github.com/openclaw/openclaw/issues/74123) | BUG: media:// image URI resolves to invalid workspace media path | high | candidate | Apr 29, 2026, 06:05 UTC | [records/openclaw-openclaw/items/74123.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74123.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 05:48 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | high | candidate | Apr 29, 2026, 05:45 UTC | [records/openclaw-clawhub/items/1521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 05:44 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1683](https://github.com/openclaw/clawhub/issues/1683) | 显示 @yangzhichao814-cell/ apexsearch的重复项 | high | candidate | Apr 29, 2026, 05:43 UTC | [records/openclaw-clawhub/items/1683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1683.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 05:41 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 05:38 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 05:38 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 05:37 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 05:37 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 05:37 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72139](https://github.com/openclaw/openclaw/issues/72139) | Control UI auth retry loop + blocking chat.history causes Slack Socket Mode disconnects | high | candidate | Apr 29, 2026, 05:27 UTC | [records/openclaw-openclaw/items/72139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72139.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 29, 2026, 06:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74125](https://github.com/openclaw/openclaw/issues/74125) | Gateway-restart wake-ups for Claude CLI Discord sessions arrive cold — neither --resume nor openClawHistoryPrompt rebuild fires | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74125.md) | complete | Apr 29, 2026, 06:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69312](https://github.com/openclaw/openclaw/pull/69312) | fix: prevent MEDIA: false-positive extraction from indented code blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69312.md) | complete | Apr 29, 2026, 06:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58808](https://github.com/openclaw/openclaw/pull/58808) | feat: pass requesterSenderId and senderIsOwner to ChannelAgentToolFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58808.md) | complete | Apr 29, 2026, 06:07 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1883](https://github.com/openclaw/clawhub/issues/1883) | The Skill Accumulation Problem: How many skills before your agent gets confused? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1883.md) | complete | Apr 29, 2026, 06:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74126](https://github.com/openclaw/openclaw/pull/74126) | test: exercise Clownfish any-PR automerge opt-in | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74126.md) | complete | Apr 29, 2026, 06:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74123](https://github.com/openclaw/openclaw/issues/74123) | BUG: media:// image URI resolves to invalid workspace media path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74123.md) | complete | Apr 29, 2026, 06:05 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74122](https://github.com/openclaw/openclaw/issues/74122) | Watcher should debounce rapid multi-file edits into a single reload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74122.md) | complete | Apr 29, 2026, 06:05 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74121](https://github.com/openclaw/openclaw/pull/74121) | Drop blank user messages; skip toolless fallbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74121.md) | complete | Apr 29, 2026, 06:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74115](https://github.com/openclaw/openclaw/issues/74115) | [Bug]: IT SHOULD NOT BE REQUIRED TO set up all settings before gateway and WEBUI starts. This is unwise design practice. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74115.md) | complete | Apr 29, 2026, 06:03 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 06:10 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25093676944](https://github.com/openclaw/clawsweeper/actions/runs/25093676944)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3343 |
| Open PRs | 3250 |
| Open items total | 6593 |
| Reviewed files | 6593 |
| Unreviewed open items | 0 |
| Archived closed files | 14038 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3339 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3240 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6579 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 489 |
| Closed by Codex apply | 10695 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 123/1003 current (880 due, 12.3%) |
| Hourly hot item cadence (<7d) | 123/1003 current (880 due, 12.3%) |
| Daily cadence coverage | 2968/3792 current (824 due, 78.3%) |
| Daily PR cadence | 2214/2651 current (437 due, 83.5%) |
| Daily new issue cadence (<30d) | 754/1141 current (387 due, 66.1%) |
| Weekly older issue cadence | 1794/1798 current (4 due, 99.8%) |
| Due now by cadence | 1708 |

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

Latest review: Apr 29, 2026, 06:08 UTC. Latest close: Apr 29, 2026, 06:03 UTC. Latest comment sync: Apr 29, 2026, 06:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 22 | 2 | 20 | 0 | 1 | 22 | 0 |
| Last hour | 565 | 29 | 536 | 7 | 33 | 543 | 7 |
| Last 24 hours | 6133 | 454 | 5679 | 10 | 743 | 2008 | 35 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74119](https://github.com/openclaw/openclaw/issues/74119) | [Bug]: Telegram DM startup/runtime context and async follow-up scaffolding can leak into user-visible messages | already implemented on main | Apr 29, 2026, 06:03 UTC | [records/openclaw-openclaw/closed/74119.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74119.md) |
| [#74111](https://github.com/openclaw/openclaw/issues/74111) | BUG: media-understanding-core cannot resolve staged sharp dependency for image processing | already implemented on main | Apr 29, 2026, 05:54 UTC | [records/openclaw-openclaw/closed/74111.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74111.md) |
| [#74109](https://github.com/openclaw/openclaw/pull/74109) | ci: rename codeql quality baseline shard | kept open | Apr 29, 2026, 05:50 UTC | [records/openclaw-openclaw/closed/74109.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74109.md) |
| [#74108](https://github.com/openclaw/openclaw/issues/74108) | QQBot: /new command fails with 'messages must not be empty' error | duplicate or superseded | Apr 29, 2026, 05:50 UTC | [records/openclaw-openclaw/closed/74108.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74108.md) |
| [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73878.md) |
| [#54526](https://github.com/openclaw/openclaw/pull/54526) | Fix slack channels error | already implemented on main | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54526.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54526.md) |
| [#54116](https://github.com/openclaw/openclaw/pull/54116) | feat(google): make Gemini web search base URL configurable | duplicate or superseded | Apr 29, 2026, 05:48 UTC | [records/openclaw-openclaw/closed/54116.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54116.md) |
| [#53561](https://github.com/openclaw/openclaw/pull/53561) | fix gateway connect handshake timeout | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53561.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53561.md) |
| [#53478](https://github.com/openclaw/openclaw/pull/53478) | fix(plugin-sdk): re-export normalizeAccountId and resolvePreferredOpenClawTmpDir | already implemented on main | Apr 29, 2026, 05:47 UTC | [records/openclaw-openclaw/closed/53478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53478.md) |
| [#74027](https://github.com/openclaw/openclaw/pull/74027) | [AI-assisted] fix(agents): clarify approval slug guidance | closed externally after review | Apr 29, 2026, 05:45 UTC | [records/openclaw-openclaw/closed/74027.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74027.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74125](https://github.com/openclaw/openclaw/issues/74125) | Gateway-restart wake-ups for Claude CLI Discord sessions arrive cold — neither --resume nor openClawHistoryPrompt rebuild fires | high | candidate | Apr 29, 2026, 06:08 UTC | [records/openclaw-openclaw/items/74125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74125.md) |
| [#74123](https://github.com/openclaw/openclaw/issues/74123) | BUG: media:// image URI resolves to invalid workspace media path | high | candidate | Apr 29, 2026, 06:05 UTC | [records/openclaw-openclaw/items/74123.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74123.md) |
| [#72139](https://github.com/openclaw/openclaw/issues/72139) | Control UI auth retry loop + blocking chat.history causes Slack Socket Mode disconnects | high | candidate | Apr 29, 2026, 05:27 UTC | [records/openclaw-openclaw/items/72139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72139.md) |
| [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#69192](https://github.com/openclaw/openclaw/issues/69192) | Hook gateway returns 4xx with no journal entry — breaks diagnosability | high | candidate | Apr 29, 2026, 05:26 UTC | [records/openclaw-openclaw/items/69192.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69192.md) |
| [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | high | candidate | Apr 29, 2026, 05:24 UTC | [records/openclaw-openclaw/items/62120.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62120.md) |
| [#50268](https://github.com/openclaw/openclaw/issues/50268) | Bug: Adding a second provider via onboard/configure unconditionally overwrites agents.defaults.model.primary, breaking existing provider (e.g. Bedrock → xAI) | high | candidate | Apr 29, 2026, 05:24 UTC | [records/openclaw-openclaw/items/50268.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50268.md) |
| [#74093](https://github.com/openclaw/openclaw/issues/74093) | Bug: /new reset can be queued behind active run when queue mode is steer | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/74093.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74093.md) |
| [#50277](https://github.com/openclaw/openclaw/issues/50277) | [Bug]: 聊天页面删除对话时弹框会超出边界 | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/50277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50277.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 29, 2026, 06:08 UTC |
| [#74125](https://github.com/openclaw/openclaw/issues/74125) | Gateway-restart wake-ups for Claude CLI Discord sessions arrive cold — neither --resume nor openClawHistoryPrompt rebuild fires | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74125.md) | complete | Apr 29, 2026, 06:08 UTC |
| [#69312](https://github.com/openclaw/openclaw/pull/69312) | fix: prevent MEDIA: false-positive extraction from indented code blocks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69312.md) | complete | Apr 29, 2026, 06:08 UTC |
| [#58808](https://github.com/openclaw/openclaw/pull/58808) | feat: pass requesterSenderId and senderIsOwner to ChannelAgentToolFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58808.md) | complete | Apr 29, 2026, 06:07 UTC |
| [#74126](https://github.com/openclaw/openclaw/pull/74126) | test: exercise Clownfish any-PR automerge opt-in | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74126.md) | complete | Apr 29, 2026, 06:07 UTC |
| [#74123](https://github.com/openclaw/openclaw/issues/74123) | BUG: media:// image URI resolves to invalid workspace media path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74123.md) | complete | Apr 29, 2026, 06:05 UTC |
| [#74122](https://github.com/openclaw/openclaw/issues/74122) | Watcher should debounce rapid multi-file edits into a single reload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74122.md) | complete | Apr 29, 2026, 06:05 UTC |
| [#74121](https://github.com/openclaw/openclaw/pull/74121) | Drop blank user messages; skip toolless fallbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74121.md) | complete | Apr 29, 2026, 06:03 UTC |
| [#74115](https://github.com/openclaw/openclaw/issues/74115) | [Bug]: IT SHOULD NOT BE REQUIRED TO set up all settings before gateway and WEBUI starts. This is unwise design practice. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74115.md) | complete | Apr 29, 2026, 06:03 UTC |
| [#74120](https://github.com/openclaw/openclaw/pull/74120) | fix(failover): classify 'budget exceeded' proxy errors as billing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74120.md) | complete | Apr 29, 2026, 06:03 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 06:09 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 397. Item numbers: 3,15,18,23,26,32,33,48,49,51,52,60,62,72,77,79,84,86,88,96,97,99,100,115,117,120,127,128,129,131,151,156,169,170,171,173,174,178,184,192,205,208,211,224,225,226,227,228,231,234,237,238,243,256,268,275,277,284,314,323,328,329,330,337,348,349,353,364,367,369,371,373,374,378,379,380,382,385,388,390,397,406,420,423,426,443,449,450,454,455,463,484,487,488,494,498,501,503,509,516,528,532,535,549,553,563,567,568,574,575,576,579,589,593,600,606,609,615,630,631,636,637,645,654,656,657,661,668,674,677,680,686,699,702,707,718,723,729,740,772,782,785,798,816,848,865,886,888,896,897,904,905,910,940,952,982,988,992,997,1006,1007,1008,1011,1015,1017,1021,1022,1030,1032,1036,1037,1042,1046,1047,1050,1051,1052,1053,1058,1059,1061,1064,1070,1085,1088,1097,1098,1099,1103,1106,1111,1113,1114,1125,1126,1131,1138,1141,1145,1146,1159,1164,1167,1168,1179,1205,1208,1210,1213,1220,1223,1224,1226,1229,1230,1231,1233,1235,1236,1237,1239,1243,1244,1247,1249,1250,1253,1254,1256,1257,1260,1264,1265,1267,1269,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1282,1283,1285,1287,1288,1289,1292,1293,1294,1296,1298,1300,1301,1302,1307,1308,1309,1310,1312,1313,1314,1315,1316,1318,1320,1325,1327,1329,1334,1336,1338,1341,1345,1347,1350,1351,1353,1354,1358,1359,1361,1364,1366,1367,1368,1370,1371,1374,1376,1377,1378,1379,1381,1382,1383,1384,1385,1387,1389,1392,1393,1395,1396,1397,1400,1401,1402,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1420,1421,1422,1423,1424,1425,1426,1427,1428,1430,1431,1432,1433,1435,1437,1440,1442,1443,1444,1445,1446,1447,1448,1450,1451,1452,1457,1462,1463,1465,1471,1472,1473,1477,1483,1494,1495,1500,1501,1503,1509,1514,1516,1519,1520,1521,1523,1525,1526,1529,1530,1533,1535,1538,1539,1540,1541,1543,1552,1557,1559,1565,1568,1569,1571,1572,1574,1576,1577,1582,1583,1584,1586,1587,1588,1589,1592,1595,1614,1617,1620,1621,1624,1631,1632,1639,1654,1658,1659,1662,1666,1667,1668,1669,1670,1671,1673,1674,1675,1676,1679,1680,1682,1683,1684,1689,1690,1691,1692,1694,1695,1702,1703,1705,1706,1710,1711,1712,1717,1719,1720,1721,1725,1726,1733,1735,1738,1741,1742,1744,1745,1746,1747,1748,1749,1755,1756,1757,1758,1760,1761,1764,1766,1767,1769,1781,1785,1788,1799,1806,1811,1812,1814,1816,1817,1824,1826,1829,1834,1838,1848,1852,1853,1854,1855,1856,1858,1859,1862,1864,1865,1866,1867,1868.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25092641218](https://github.com/openclaw/clawsweeper/actions/runs/25092641218)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 879 |
| Open PRs | 33 |
| Open items total | 912 |
| Reviewed files | 912 |
| Unreviewed open items | 0 |
| Archived closed files | 21 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 866 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 899 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 39 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 30/53 current (23 due, 56.6%) |
| Hourly hot item cadence (<7d) | 30/53 current (23 due, 56.6%) |
| Daily cadence coverage | 217/219 current (2 due, 99.1%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 196/198 current (2 due, 99%) |
| Weekly older issue cadence | 630/640 current (10 due, 98.4%) |
| Due now by cadence | 35 |

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

Latest review: Apr 29, 2026, 06:07 UTC. Latest close: Apr 29, 2026, 05:31 UTC. Latest comment sync: Apr 29, 2026, 06:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 398 | 0 |
| Last hour | 523 | 0 | 523 | 13 | 2 | 420 | 0 |
| Last 24 hours | 927 | 0 | 927 | 13 | 15 | 822 | 0 |

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
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 05:48 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | high | candidate | Apr 29, 2026, 05:45 UTC | [records/openclaw-clawhub/items/1521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 05:44 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1683](https://github.com/openclaw/clawhub/issues/1683) | 显示 @yangzhichao814-cell/ apexsearch的重复项 | high | candidate | Apr 29, 2026, 05:43 UTC | [records/openclaw-clawhub/items/1683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1683.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 05:41 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 05:38 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 05:38 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 05:37 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 05:37 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 05:37 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1883](https://github.com/openclaw/clawhub/issues/1883) | The Skill Accumulation Problem: How many skills before your agent gets confused? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1883.md) | complete | Apr 29, 2026, 06:07 UTC |
| [#1705](https://github.com/openclaw/clawhub/issues/1705) | Skill flagged as suspicious - share-onetime-link | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1705.md) | complete | Apr 29, 2026, 05:55 UTC |
| [#1760](https://github.com/openclaw/clawhub/issues/1760) | Exposed production API credentials in archived skill (skills/akkualle/akkualle-seo/SKILL.md) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1760.md) | complete | Apr 29, 2026, 05:54 UTC |
| [#1741](https://github.com/openclaw/clawhub/issues/1741) | Skill 'voc-amazon-reviews' incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1741.md) | complete | Apr 29, 2026, 05:53 UTC |
| [#1451](https://github.com/openclaw/clawhub/issues/1451) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1451.md) | complete | Apr 29, 2026, 05:53 UTC |
| [#1757](https://github.com/openclaw/clawhub/issues/1757) | Appeal: funasr-transcribe incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1757.md) | complete | Apr 29, 2026, 05:53 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 29, 2026, 05:52 UTC |
| [#1859](https://github.com/openclaw/clawhub/pull/1859) | docs: clarify optional skill environment variables | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1859.md) | complete | Apr 29, 2026, 05:52 UTC |
| [#1565](https://github.com/openclaw/clawhub/issues/1565) | False positive: swarm-sprint flagged as suspicious — git worktree orchestration skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1565.md) | complete | Apr 29, 2026, 05:52 UTC |
| [#1834](https://github.com/openclaw/clawhub/issues/1834) | feishu-team-manager: Request re-scan after fixing flagged issues (v2.4.3) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1834.md) | complete | Apr 29, 2026, 05:52 UTC |

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
