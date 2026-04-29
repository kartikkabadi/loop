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
  When a review starts and no ClawSweeper comment exists yet, it posts a short
  crustacean-friendly status placeholder first, then replaces that same comment
  with the completed review. Completed comments include a dedicated security
  review section for supply-chain, permission, secret-handling, and code
  execution concerns. Pull request comments include hidden verdict markers, and
  actionable PR follow-up includes a hidden
  `clawsweeper-action:fix-required` marker for the trusted ClawSweeper repair
  loop. See
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

## Maintainer Commands

Maintainers can steer ClawSweeper from target-repo issue and PR comments. The
router accepts `/clawsweeper ...`, `/automerge`, `/autoclose <reason>`,
`@clawsweeper ...`, `@clawsweeper[bot] ...`, `@openclaw-clawsweeper ...`, and
`@openclaw-clawsweeper[bot] ...`.

Common commands:

```text
/review
/clawsweeper status
/clawsweeper re-review
/clawsweeper fix ci
/clawsweeper address review
/clawsweeper rebase
/clawsweeper automerge
/clawsweeper approve
/clawsweeper explain
/clawsweeper stop
/automerge
/autoclose <maintainer close reason>
@clawsweeper re-review
@clawsweeper review
```

- `status` and `explain` post a short target summary.
- `review` and `re-review` dispatch a fresh ClawSweeper issue/PR review without
  starting repair.
- `fix ci`, `address review`, and `rebase` dispatch the repair worker only for
  ClawSweeper PRs or PRs already opted into `clawsweeper:automerge`.
- `automerge` labels an open PR, creates or reuses the adopted job, dispatches
  review, and enters the bounded review/fix/merge loop.
- `approve` lets a maintainer clear a ClawSweeper human-review pause and merge
  only after the normal exact-head, checks, mergeability, and gate checks pass.
- `stop` adds `clawsweeper:human-review`; `/autoclose <reason>` closes the
  item and bounded linked same-repo targets with an explicit maintainer reason.

Only maintainers are accepted. The router checks repository collaborator
permission (`admin`, `maintain`, or `write`) and falls back to trusted
`author_association` values when permission lookup is unavailable. Contributor
commands are ignored without a reply. Scheduled comment routing is dry unless
`CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1`; workflow dispatch with `execute=true`
can be used for one-off live routing.

## Dashboard

Last dashboard update: Apr 29, 2026, 17:16 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4424 |
| Open PRs | 3438 |
| Open items total | 7862 |
| Reviewed files | 7503 |
| Unreviewed open items | 363 |
| Due now by cadence | 2906 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 804 |
| Closed by Codex apply | 10837 |
| Failed or stale reviews | 20 |
| Archived closed files | 14424 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6936 | 6578 | 358 | 2858 | 0 | 756 | 10829 | Apr 29, 2026, 17:02 UTC | Apr 29, 2026, 17:02 UTC | 471 |
| [ClawHub](https://github.com/openclaw/clawhub) | 926 | 922 | 5 | 45 | 0 | 47 | 8 | Apr 29, 2026, 17:03 UTC | Apr 29, 2026, 13:48 UTC | 795 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review in progress | Apr 29, 2026, 17:02 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25122496005) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 17:16 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25121774072) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 17:03 UTC. Latest close: Apr 29, 2026, 17:02 UTC. Latest comment sync: Apr 29, 2026, 17:16 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 11 | 0 | 11 | 2 | 1 | 397 | 0 |
| Last hour | 982 | 7 | 975 | 14 | 17 | 1266 | 1 |
| Last 24 hours | 6134 | 347 | 5787 | 16 | 756 | 2033 | 26 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74478](https://github.com/openclaw/openclaw/issues/74478) | [Bug]: Agent ignores all proxy settings, cannot connect to Telegram behind DPI | already implemented on main | Apr 29, 2026, 17:02 UTC | [records/openclaw-openclaw/closed/74478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74478.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74474](https://github.com/openclaw/openclaw/pull/74474) | fix(markdown): preserve loose list paragraphs | kept open | Apr 29, 2026, 16:56 UTC | [records/openclaw-openclaw/closed/74474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74474.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#36671](https://github.com/openclaw/openclaw/issues/36671) | [Feature] Hooks extensions for security plugins (and more) | closed externally after review | Apr 29, 2026, 16:54 UTC | [records/openclaw-openclaw/closed/36671.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/36671.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74445](https://github.com/openclaw/openclaw/pull/74445) | fix(deepseek): expose xhigh and max thinking levels for V4 models | duplicate or superseded | Apr 29, 2026, 16:54 UTC | [records/openclaw-openclaw/closed/74445.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74445.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74030](https://github.com/openclaw/openclaw/pull/74030) | [AI-assisted] feat(mcp): allow serve operator scope selection | duplicate or superseded | Apr 29, 2026, 16:54 UTC | [records/openclaw-openclaw/closed/74030.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74030.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74471](https://github.com/openclaw/openclaw/pull/74471) | infra: fix heartbeat directive preservation and global enablement | closed externally after review | Apr 29, 2026, 16:49 UTC | [records/openclaw-openclaw/closed/74471.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74471.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74475](https://github.com/openclaw/openclaw/pull/74475) | fix(tts): synthesize tagged hidden text under short-skip threshold (#73758) | duplicate or superseded | Apr 29, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/74475.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74475.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69483](https://github.com/openclaw/openclaw/pull/69483) | feat(security): add GHSA detector-review pipeline and OpenGrep CI workflows | closed externally after review | Apr 29, 2026, 16:42 UTC | [records/openclaw-openclaw/closed/69483.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69483.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73579](https://github.com/openclaw/openclaw/pull/73579) | fix(tts): deliver WhatsApp voice notes from suppressed group replies | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/73579.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73579.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74295](https://github.com/openclaw/openclaw/pull/74295) | fix(whatsapp): use sender lid for ack reactions | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/74295.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74295.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74451](https://github.com/openclaw/openclaw/issues/74451) | Regression: Codex ChatGPT accounts hard-fail when session switches to openai-codex/gpt-5.4-mini | high | candidate | Apr 29, 2026, 16:56 UTC | [records/openclaw-openclaw/items/74451.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74451.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1864](https://github.com/openclaw/clawhub/pull/1864) | feat(schema): include .r files in text whitelist | high | candidate | Apr 29, 2026, 16:55 UTC | [records/openclaw-clawhub/items/1864.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1864.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 16:54 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#989](https://github.com/openclaw/clawhub/issues/989) | Wrong VirusTotal tag | high | candidate | Apr 29, 2026, 16:54 UTC | [records/openclaw-clawhub/items/989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/989.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 16:54 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 16:52 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 16:52 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 16:52 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 16:51 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#941](https://github.com/openclaw/clawhub/issues/941) | False positive: humanizerai and melies (standard API client CLIs) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/941.md) | complete | Apr 29, 2026, 17:03 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1100](https://github.com/openclaw/clawhub/issues/1100) | Sift flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1100.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74470](https://github.com/openclaw/openclaw/pull/74470) | fix: add compaction model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74470.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | failed | Apr 29, 2026, 17:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1887](https://github.com/openclaw/clawhub/issues/1887) | False Positive: Autonomous DeFi Agent flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1887.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1182](https://github.com/openclaw/clawhub/issues/1182) | Publish/Import fails: Convex pagination error in syncSkillSearchDigestsForOwnerPublisherId | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1182.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1129](https://github.com/openclaw/clawhub/issues/1129) | I think the first-principle-social-platform skill has been incorrectly flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1129.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#969](https://github.com/openclaw/clawhub/issues/969) | 报告0问题，请求解除警告 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/969.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74480](https://github.com/openclaw/openclaw/pull/74480) | fix(active-memory): preserve setup grace for embedded recall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74480.md) | complete | Apr 29, 2026, 17:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1854](https://github.com/openclaw/clawhub/pull/1854) | fix(ui): use download icon for public skill stats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1854.md) | complete | Apr 29, 2026, 17:02 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 17:02 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25122496005](https://github.com/openclaw/clawsweeper/actions/runs/25122496005)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3537 |
| Open PRs | 3399 |
| Open items total | 6936 |
| Reviewed files | 6578 |
| Unreviewed open items | 358 |
| Archived closed files | 14400 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3360 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3209 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6569 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 756 |
| Closed by Codex apply | 10829 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 68/1098 current (1030 due, 6.2%) |
| Hourly hot item cadence (<7d) | 68/1098 current (1030 due, 6.2%) |
| Daily cadence coverage | 2207/3674 current (1467 due, 60.1%) |
| Daily PR cadence | 1506/2566 current (1060 due, 58.7%) |
| Daily new issue cadence (<30d) | 701/1108 current (407 due, 63.3%) |
| Weekly older issue cadence | 1803/1806 current (3 due, 99.8%) |
| Due now by cadence | 2858 |

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

Latest review: Apr 29, 2026, 17:02 UTC. Latest close: Apr 29, 2026, 17:02 UTC. Latest comment sync: Apr 29, 2026, 17:03 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 3 | 0 |
| Last hour | 545 | 7 | 538 | 3 | 17 | 471 | 1 |
| Last 24 hours | 5197 | 347 | 4850 | 5 | 742 | 1216 | 26 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74478](https://github.com/openclaw/openclaw/issues/74478) | [Bug]: Agent ignores all proxy settings, cannot connect to Telegram behind DPI | already implemented on main | Apr 29, 2026, 17:02 UTC | [records/openclaw-openclaw/closed/74478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74478.md) |
| [#74474](https://github.com/openclaw/openclaw/pull/74474) | fix(markdown): preserve loose list paragraphs | kept open | Apr 29, 2026, 16:56 UTC | [records/openclaw-openclaw/closed/74474.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74474.md) |
| [#36671](https://github.com/openclaw/openclaw/issues/36671) | [Feature] Hooks extensions for security plugins (and more) | closed externally after review | Apr 29, 2026, 16:54 UTC | [records/openclaw-openclaw/closed/36671.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/36671.md) |
| [#74445](https://github.com/openclaw/openclaw/pull/74445) | fix(deepseek): expose xhigh and max thinking levels for V4 models | duplicate or superseded | Apr 29, 2026, 16:54 UTC | [records/openclaw-openclaw/closed/74445.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74445.md) |
| [#74030](https://github.com/openclaw/openclaw/pull/74030) | [AI-assisted] feat(mcp): allow serve operator scope selection | duplicate or superseded | Apr 29, 2026, 16:54 UTC | [records/openclaw-openclaw/closed/74030.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74030.md) |
| [#74471](https://github.com/openclaw/openclaw/pull/74471) | infra: fix heartbeat directive preservation and global enablement | closed externally after review | Apr 29, 2026, 16:49 UTC | [records/openclaw-openclaw/closed/74471.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74471.md) |
| [#74475](https://github.com/openclaw/openclaw/pull/74475) | fix(tts): synthesize tagged hidden text under short-skip threshold (#73758) | duplicate or superseded | Apr 29, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/74475.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74475.md) |
| [#69483](https://github.com/openclaw/openclaw/pull/69483) | feat(security): add GHSA detector-review pipeline and OpenGrep CI workflows | closed externally after review | Apr 29, 2026, 16:42 UTC | [records/openclaw-openclaw/closed/69483.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69483.md) |
| [#73579](https://github.com/openclaw/openclaw/pull/73579) | fix(tts): deliver WhatsApp voice notes from suppressed group replies | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/73579.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73579.md) |
| [#74295](https://github.com/openclaw/openclaw/pull/74295) | fix(whatsapp): use sender lid for ack reactions | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/74295.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74295.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74451](https://github.com/openclaw/openclaw/issues/74451) | Regression: Codex ChatGPT accounts hard-fail when session switches to openai-codex/gpt-5.4-mini | high | candidate | Apr 29, 2026, 16:56 UTC | [records/openclaw-openclaw/items/74451.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74451.md) |
| [#64818](https://github.com/openclaw/openclaw/issues/64818) | openclaw update: tracked src/canvas-host/a2ui/.bundle.hash breaks preflight bisect walkback | high | candidate | Apr 29, 2026, 16:40 UTC | [records/openclaw-openclaw/items/64818.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64818.md) |
| [#74433](https://github.com/openclaw/openclaw/pull/74433) | fix(doctor): warn when OPENCLAW_GATEWAY_TOKEN env overrides gateway.auth.token config | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/74433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74433.md) |
| [#65156](https://github.com/openclaw/openclaw/issues/65156) | [Bug] Memory vector search broken in v4.11 — sqlite-vec loads but registers no functions (SQLite ABI mismatch) | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/65156.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65156.md) |
| [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [#63210](https://github.com/openclaw/openclaw/issues/63210) | [Feature]: Detect and recover from output truncation (stopReason:\"length\") in main agent sessions | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/63210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63210.md) |
| [#64820](https://github.com/openclaw/openclaw/pull/64820) | fix(feishu): break circular module init causing ReferenceError on group mention | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/64820.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64820.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#74448](https://github.com/openclaw/openclaw/issues/74448) | Subagent task completion event fires on session-compaction (mid-task), not on actual task end — parent receives truncated mid-task frozenResultText | high | candidate | Apr 29, 2026, 16:33 UTC | [records/openclaw-openclaw/items/74448.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74448.md) |
| [#64903](https://github.com/openclaw/openclaw/issues/64903) | Android app crashes on NodeForegroundService startForeground with ForegroundServiceStartNotAllowedException | high | candidate | Apr 29, 2026, 16:33 UTC | [records/openclaw-openclaw/items/64903.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64903.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74470](https://github.com/openclaw/openclaw/pull/74470) | fix: add compaction model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74470.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#74480](https://github.com/openclaw/openclaw/pull/74480) | fix(active-memory): preserve setup grace for embedded recall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74480.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#74134](https://github.com/openclaw/openclaw/pull/74134) | feat(file-transfer): add bundled plugin for binary file ops on nodes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74134.md) | complete | Apr 29, 2026, 17:00 UTC |
| [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 29, 2026, 16:58 UTC |
| [#74360](https://github.com/openclaw/openclaw/pull/74360) | fix(ssrf): restrict dangerouslyAllowPrivateNetwork to self-hosted providers only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74360.md) | complete | Apr 29, 2026, 16:58 UTC |
| [#74359](https://github.com/openclaw/openclaw/pull/74359) | fix(docker): replace curl\|bash Bun install with pinned multi-stage COPY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74359.md) | complete | Apr 29, 2026, 16:57 UTC |
| [#74453](https://github.com/openclaw/openclaw/pull/74453) | fix(voice-call): close webhook in-flight limiter fail-open on empty remote address | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74453.md) | complete | Apr 29, 2026, 16:57 UTC |
| [#71817](https://github.com/openclaw/openclaw/pull/71817) | fix(telegram,feishu): enable Claude CLI reasoning via reasoningDefault config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71817.md) | complete | Apr 29, 2026, 16:56 UTC |
| [#68322](https://github.com/openclaw/openclaw/pull/68322) | fix(kilocode): send auth header in model discovery to include BYOK models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68322.md) | complete | Apr 29, 2026, 16:56 UTC |
| [#74392](https://github.com/openclaw/openclaw/pull/74392) | fix(plugins): install runtime deps for library extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74392.md) | complete | Apr 29, 2026, 16:56 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 17:16 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 381. Item numbers: 52,99,151,208,227,228,248,275,284,328,330,337,340,371,374,379,387,388,390,392,402,406,424,426,442,447,448,449,450,451,455,459,463,469,474,478,480,481,482,484,485,487,501,504,509,531,532,535,539,541,549,563,566,575,576,579,589,593,600,604,609,613,614,618,619,621,630,635,636,637,642,645,647,650,653,654,655,656,657,658,662,666,667,668,669,673,674,675,676,677,678,680,681,683,686,692,694,699,700,701,706,707,708,711,712,713,716,717,718,722,723,729,730,731,733,734,737,740,745,747,752,755,756,760,761,762,767,768,769,770,772,779,780,782,784,785,786,791,792,794,798,800,804,807,808,809,811,816,817,819,823,824,834,835,838,845,846,847,848,850,851,852,854,858,860,862,863,865,868,869,870,871,873,874,875,876,879,880,881,882,883,886,889,890,892,895,896,897,899,900,901,903,904,905,906,907,908,909,910,911,913,914,915,917,920,921,922,923,925,927,928,930,932,933,935,936,937,938,941,943,946,951,952,954,958,959,960,962,963,967,969,970,971,972,974,975,982,984,985,987,988,989,990,992,994,995,997,998,999,1001,1003,1004,1005,1006,1008,1009,1010,1013,1015,1016,1020,1022,1024,1026,1027,1030,1032,1033,1035,1036,1037,1041,1042,1044,1048,1049,1050,1051,1053,1054,1058,1059,1062,1063,1069,1079,1080,1081,1082,1083,1085,1089,1092,1099,1100,1102,1103,1105,1109,1110,1113,1116,1118,1120,1121,1124,1125,1129,1132,1136,1137,1138,1141,1142,1149,1152,1153,1155,1164,1167,1168,1169,1170,1171,1172,1173,1175,1176,1180,1181,1182,1184,1186,1193,1195,1197,1199,1205,1207,1213,1220,1221,1228,1230,1248,1253,1266,1283,1300,1327,1359,1376,1389,1395,1396,1407,1415,1427,1440,1452,1483,1501,1514,1522,1524,1534,1539,1540,1557,1565,1568,1569,1577,1580,1639,1662,1678,1705,1770,1783,1808,1840,1848,1849,1852,1853,1854,1855,1856,1857,1858,1859,1860,1862,1863,1864,1865,1866,1867,1876,1884,1885,1887,1888,1890,1892,1893,1894.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25121774072](https://github.com/openclaw/clawsweeper/actions/runs/25121774072)
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
| Archived closed files | 24 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 879 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 911 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 47 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 28/57 current (29 due, 49.1%) |
| Hourly hot item cadence (<7d) | 28/57 current (29 due, 49.1%) |
| Daily cadence coverage | 209/212 current (3 due, 98.6%) |
| Daily PR cadence | 19/21 current (2 due, 90.5%) |
| Daily new issue cadence (<30d) | 190/191 current (1 due, 99.5%) |
| Weekly older issue cadence | 645/653 current (8 due, 98.8%) |
| Due now by cadence | 45 |

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

Latest review: Apr 29, 2026, 17:03 UTC. Latest close: Apr 29, 2026, 13:48 UTC. Latest comment sync: Apr 29, 2026, 17:16 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 0 | 9 | 2 | 0 | 394 | 0 |
| Last hour | 437 | 0 | 437 | 11 | 0 | 795 | 0 |
| Last 24 hours | 934 | 0 | 934 | 11 | 14 | 814 | 0 |

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
| [#1864](https://github.com/openclaw/clawhub/pull/1864) | feat(schema): include .r files in text whitelist | high | candidate | Apr 29, 2026, 16:55 UTC | [records/openclaw-clawhub/items/1864.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1864.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 16:54 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#989](https://github.com/openclaw/clawhub/issues/989) | Wrong VirusTotal tag | high | candidate | Apr 29, 2026, 16:54 UTC | [records/openclaw-clawhub/items/989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/989.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 16:54 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 16:53 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#941](https://github.com/openclaw/clawhub/issues/941) | False positive: humanizerai and melies (standard API client CLIs) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/941.md) | complete | Apr 29, 2026, 17:03 UTC |
| [#1100](https://github.com/openclaw/clawhub/issues/1100) | Sift flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1100.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | failed | Apr 29, 2026, 17:02 UTC |
| [#1887](https://github.com/openclaw/clawhub/issues/1887) | False Positive: Autonomous DeFi Agent flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1887.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#1182](https://github.com/openclaw/clawhub/issues/1182) | Publish/Import fails: Convex pagination error in syncSkillSearchDigestsForOwnerPublisherId | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1182.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#1129](https://github.com/openclaw/clawhub/issues/1129) | I think the first-principle-social-platform skill has been incorrectly flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1129.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#969](https://github.com/openclaw/clawhub/issues/969) | 报告0问题，请求解除警告 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/969.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#1854](https://github.com/openclaw/clawhub/pull/1854) | fix(ui): use download icon for public skill stats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1854.md) | complete | Apr 29, 2026, 17:02 UTC |
| [#1125](https://github.com/openclaw/clawhub/pull/1125) | feat: check OS requirements when clawdhub install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1125.md) | failed | Apr 29, 2026, 17:01 UTC |
| [#1167](https://github.com/openclaw/clawhub/issues/1167) | [Security / Release Slug] Hard delete SKILL and purge all historical versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1167.md) | failed | Apr 29, 2026, 17:01 UTC |

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
| Hourly cadence coverage | 0/3 current (3 due, 0%) |
| Hourly hot item cadence (<7d) | 0/3 current (3 due, 0%) |
| Daily cadence coverage | 0/0 current (0 due, -) |
| Daily PR cadence | 0/0 current (0 due, -) |
| Daily new issue cadence (<30d) | 0/0 current (0 due, -) |
| Weekly older issue cadence | 0/0 current (0 due, -) |
| Due now by cadence | 3 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawsweeper:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawsweeper:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 14:08 UTC. Latest close: unknown. Latest comment sync: Apr 29, 2026, 14:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
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
  Codex `/review`-style PR findings, suggested comment, runtime metadata, and
  GitHub snapshot hash.
- High-confidence allowed close decisions become `proposed_close`.
- After publish, the lane checks the selected items' single marker-backed Codex
  review comment. Missing comments and missing metadata are synced immediately;
  existing comments are refreshed only when stale, currently weekly.
- PR review comments keep the top-level note concise, put source links and full
  evidence in collapsed details, and use hidden verdict/action markers for the
  trusted ClawSweeper repair loop; see
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
