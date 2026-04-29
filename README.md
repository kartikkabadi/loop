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
@clawsweeper why did automerge stop here?
```

- `status` and `explain` post a short target summary.
- `review` and `re-review` dispatch a fresh ClawSweeper issue/PR review without
  starting repair.
- Command status replies are marker-backed and edited in place per
  issue/PR, intent, and head SHA, so repeated review nudges do not leave a
  trail of duplicate lobster notes.
- Freeform `@clawsweeper ...` mentions dispatch a read-only assist review that
  answers the maintainer request in the next ClawSweeper comment. Action-looking
  prose still maps through existing safe markers and deterministic gates.
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

Last dashboard update: Apr 29, 2026, 21:05 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4429 |
| Open PRs | 3418 |
| Open items total | 7847 |
| Reviewed files | 7517 |
| Unreviewed open items | 333 |
| Due now by cadence | 3206 |
| Proposed closes awaiting apply | 4 |
| Work candidates awaiting promotion | 981 |
| Closed by Codex apply | 10892 |
| Failed or stale reviews | 25 |
| Archived closed files | 14539 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6919 | 6591 | 328 | 3172 | 4 | 937 | 10879 | Apr 29, 2026, 20:48 UTC | Apr 29, 2026, 20:49 UTC | 734 |
| [ClawHub](https://github.com/openclaw/clawhub) | 928 | 923 | 5 | 31 | 0 | 43 | 8 | Apr 29, 2026, 20:25 UTC | Apr 29, 2026, 17:17 UTC | 385 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 21:05 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25131933794) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 29, 2026, 20:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25132847826) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 20:48 UTC. Latest close: Apr 29, 2026, 20:49 UTC. Latest comment sync: Apr 29, 2026, 21:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 346 | 0 |
| Last hour | 712 | 4 | 708 | 18 | 28 | 1119 | 1 |
| Last 24 hours | 5713 | 317 | 5396 | 22 | 740 | 2005 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/74548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74548.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74519](https://github.com/openclaw/openclaw/pull/74519) | fix: Found one remaining compatibility regression in the Discord publi | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/74519.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74519.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40894](https://github.com/openclaw/openclaw/pull/40894) | Codex/fix 40880 media staging max bytes | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/40894.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40894.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40848](https://github.com/openclaw/openclaw/issues/40848) | Add entities support to message tool for custom emoji | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/40848.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40848.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56562](https://github.com/openclaw/openclaw/issues/56562) | Feature Request: Add tools.validate_before_call and tools.retry_on_missing_params | closed externally after review | Apr 29, 2026, 20:49 UTC | [records/openclaw-openclaw/closed/56562.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56562.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74595](https://github.com/openclaw/openclaw/issues/74595) | [Bug]: async exec completion relay asks user for missing logs after No session found | closed externally after review | Apr 29, 2026, 20:42 UTC | [records/openclaw-openclaw/closed/74595.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74595.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59441](https://github.com/openclaw/openclaw/issues/59441) | [Bug]: cron add --at does not support HH:MM time-only strings; --tz has no effect on --at | closed externally after review | Apr 29, 2026, 20:39 UTC | [records/openclaw-openclaw/closed/59441.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59441.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61100](https://github.com/openclaw/openclaw/pull/61100) | feat(discord): add upload-file action support [claude-generated] | closed externally after review | Apr 29, 2026, 20:38 UTC | [records/openclaw-openclaw/closed/61100.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61100.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61087](https://github.com/openclaw/openclaw/pull/61087) | fix(discord): advertise upload-file action so agents can discover file-send capability | closed externally after review | Apr 29, 2026, 20:37 UTC | [records/openclaw-openclaw/closed/61087.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61087.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42261](https://github.com/openclaw/openclaw/issues/42261) | fix(gateway): webchat/WS clients never receive live thinking events | closed externally after review | Apr 29, 2026, 20:33 UTC | [records/openclaw-openclaw/closed/42261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42261.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 20:47 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54647](https://github.com/openclaw/openclaw/pull/54647) | Fix ACP session model reporting in sessions list | high | candidate | Apr 29, 2026, 20:46 UTC | [records/openclaw-openclaw/items/54647.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54647.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 20:46 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 20:45 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 20:45 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 20:44 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#804](https://github.com/openclaw/clawhub/issues/804) | <slug> structure of clawhub | high | candidate | Apr 29, 2026, 20:43 UTC | [records/openclaw-clawhub/items/804.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/804.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58805](https://github.com/openclaw/openclaw/pull/58805) | Plugins: preserve manifest skills on loaded plugin records | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-openclaw/items/58805.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58805.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61151](https://github.com/openclaw/openclaw/pull/61151) | fix(agents): drop partialJson streaming artifacts from session history repair | high | candidate | Apr 29, 2026, 20:41 UTC | [records/openclaw-openclaw/items/61151.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61151.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62891](https://github.com/openclaw/openclaw/issues/62891) | [v4.5] Session-store reconciliation on startup blocks main process, causing full fallback chain timeout for cron/LLM requests | high | candidate | Apr 29, 2026, 20:40 UTC | [records/openclaw-openclaw/items/62891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62891.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60824](https://github.com/openclaw/openclaw/pull/60824) | fix(config): migrate legacy acp.stream keys on load | high | candidate | Apr 29, 2026, 20:40 UTC | [records/openclaw-openclaw/items/60824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60824.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53528](https://github.com/openclaw/openclaw/pull/53528) | feat: watch jobs.json for external changes to invalidate store cache | high | candidate | Apr 29, 2026, 20:40 UTC | [records/openclaw-openclaw/items/53528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53528.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1500](https://github.com/openclaw/clawhub/issues/1500) | error with Alibaba Cloud DashScope compatible mode - InvalidParameter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1500.md) | complete | Apr 29, 2026, 21:01 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1155](https://github.com/openclaw/clawhub/issues/1155) | 大哥，真的标记错了，给我解开吧 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1155.md) | failed | Apr 29, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74616](https://github.com/openclaw/openclaw/pull/74616) | refactor(plugins): split bundled runtime deps helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74616.md) | complete | Apr 29, 2026, 20:57 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1558](https://github.com/openclaw/clawhub/issues/1558) | False positive: TrencherAI skill flagged for undeclared credentials | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1558.md) | complete | Apr 29, 2026, 20:56 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1494](https://github.com/openclaw/clawhub/issues/1494) | Request to Whitelist Preny Analytics Skill (false positive) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1494.md) | complete | Apr 29, 2026, 20:55 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1391](https://github.com/openclaw/clawhub/issues/1391) | ClawHub Security Scan False Positives: .git/ and __pycache__/ flagged as \"suspicious patterns\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1391.md) | complete | Apr 29, 2026, 20:55 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1452](https://github.com/openclaw/clawhub/issues/1452) | [Bug] Cannot sign in with GitHub after deleting account (OAuth binding not cleared) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1452.md) | complete | Apr 29, 2026, 20:55 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1511](https://github.com/openclaw/clawhub/issues/1511) | [False Positive] SafeClaw Security Auditor flagged as malicious — security tool with detection patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1511.md) | complete | Apr 29, 2026, 20:55 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1526](https://github.com/openclaw/clawhub/issues/1526) | pop-pay flagged suspicious — capability-based classification, no malicious code found. Verified publisher path? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1526.md) | complete | Apr 29, 2026, 20:55 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1253](https://github.com/openclaw/clawhub/issues/1253) | Skill flagged as suspicious due to undeclared config usage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1253.md) | complete | Apr 29, 2026, 20:55 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 21:05 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 346. Item numbers: 9865,10960,11517,12931,13593,13613,13616,13911,14438,15073,15591,17098,17213,17684,18160,22439,24107,28300,30389,32438,36630,38716,38817,39060,39137,39343,40207,40216,40218,40255,40355,40418,40427,40440,40447,40464,40485,40502,40578,40663,40723,40732,40764,40786,40808,40828,40846,40848,40873,40880,40894,40895,40919,40953,40958,40961,40970,41009,41013,41022,41031,41048,41140,41172,41204,41206,41254,41275,41284,41324,41351,41368,41421,41613,41614,41685,41716,41734,41737,41792,41807,41812,41880,41987,42026,42139,42165,42294,42350,42472,42480,42497,42504,42555,42591,42648,42652,42654,42803,42840,43239,43286,43357,43374,43440,43441,43462,43467,43493,43495,43549,43562,43563,43564,43568,43574,43588,43605,43673,43690,43712,43735,43760,43770,43775,43790,43794,43797,43803,43810,43816,43903,43910,43911,43938,43953,43976,43984,44011,44015,44027,44202,44625,44845,44859,44886,44897,44900,44930,44935,44972,44986,45011,45017,45044,45082,45102,45158,45200,45209,45216,45220,45228,45262,45276,45288,45290,45301,45438,45525,45686,45706,45930,45952,46058,46221,46423,46637,46698,46701,46733,46837,46844,47095,47335,47441,47487,47534,47540,47562,47613,47643,47651,47677,47690,47706,47710,47739,47814,47834,47840,47961,47975,47983,47992,47996,48045,48200,48260,48510,48512,48554,48684,48709,48786,48793,48908,49099,49145,49488,49692,49841,49944,50081,50090,50093,50126,50195,50248,50268,50274,50277,50287,50291,50374,50429,50442,50482,50490,50530,50561,50563,50565,50590,50619,50642,50677,50681,50690,50719,50739,50768,50776,50795,50798,50809,50818,50880,50900,50972,51088,51421,51455,51594,51849,51903,52005,52192,52207,52244,52276,52342,52365,52400,52434,52448,52457,52480,52515,52521,52601,52614,52627,52636,52640,52642,52727,52751,52762,52776,52801,52803,52832,52894,52912,52921,52928,52943,52972,52993,53008,53015,53021,53030,53088,53108,53242,53243,53250,53259,53262,53288,53321,53326,53329,53378,53408,53410,53441,53445,53454,53473,53486,53520,53524,53526,53528,53531,53533,53556,53590,53607,53629,53638,53641,53676,53678,53716,53718,53720,53738,53762,53779,53780,53784,53787,53852,53881,53922,53941,53942,53961,53965,53969,53998,54032,54132,54149,54153,54155,54157,54278,54289,54306,54308,54311,54342,54343,54354,54361,54375,54386,54405,54414,54439,54470,54471,54504,54518,54519,54524,54529,54549,54565,54574,54585,54591,54593,54600,54602,54622,54647,54732,54799,54812,54841,54878,54879,54918,54996,55027,55036,55044,55047,55121,55196,55654,55757,55943,56502,56651,56693,56798,57608,58070,58189,58775,58805,58823,58971,58987,59330,59859,60497,60542,60808,60824,60848,60946,61151,61443,62120,62364,62431,62891,62910,62924,62927,62937,62962,62985,62989,63037,63038,63050,63073,63082,63148,64383,65039,66551,66657,67363,67716,68779,68864,68893,72984,73323,73648,73735,73798,74320,74374,74392,74395,74453,74484,74490,74491,74494,74497,74498,74500,74502,74503,74504,74508,74509,74510,74512,74513,74517,74518,74519,74520,74521,74522,74523,74524,74547,74548,74552,74560,74561,74562,74563,74564,74572,74573.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25131933794](https://github.com/openclaw/clawsweeper/actions/runs/25131933794)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3540 |
| Open PRs | 3379 |
| Open items total | 6919 |
| Reviewed files | 6591 |
| Unreviewed open items | 328 |
| Archived closed files | 14508 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3359 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3217 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6576 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 937 |
| Closed by Codex apply | 10884 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 61/1142 current (1081 due, 5.3%) |
| Hourly hot item cadence (<7d) | 61/1142 current (1081 due, 5.3%) |
| Daily cadence coverage | 1886/3647 current (1761 due, 51.7%) |
| Daily PR cadence | 1268/2545 current (1277 due, 49.8%) |
| Daily new issue cadence (<30d) | 618/1102 current (484 due, 56.1%) |
| Weekly older issue cadence | 1800/1802 current (2 due, 99.9%) |
| Due now by cadence | 3172 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 18:45 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72537,72539,72541`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6960 |
| Missing eligible open records | 262 |
| Missing maintainer-authored open records | 35 |
| Missing protected open records | 23 |
| Missing recently-created open records | 28 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
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

Latest review: Apr 29, 2026, 20:48 UTC. Latest close: Apr 29, 2026, 20:49 UTC. Latest comment sync: Apr 29, 2026, 21:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 346 | 0 |
| Last hour | 528 | 4 | 524 | 5 | 28 | 734 | 1 |
| Last 24 hours | 4773 | 317 | 4456 | 7 | 725 | 1219 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/74548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74548.md) |
| [#74519](https://github.com/openclaw/openclaw/pull/74519) | fix: Found one remaining compatibility regression in the Discord publi | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/74519.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74519.md) |
| [#40894](https://github.com/openclaw/openclaw/pull/40894) | Codex/fix 40880 media staging max bytes | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/40894.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40894.md) |
| [#40848](https://github.com/openclaw/openclaw/issues/40848) | Add entities support to message tool for custom emoji | duplicate or superseded | Apr 29, 2026, 20:54 UTC | [records/openclaw-openclaw/closed/40848.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40848.md) |
| [#56562](https://github.com/openclaw/openclaw/issues/56562) | Feature Request: Add tools.validate_before_call and tools.retry_on_missing_params | closed externally after review | Apr 29, 2026, 20:49 UTC | [records/openclaw-openclaw/closed/56562.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56562.md) |
| [#74595](https://github.com/openclaw/openclaw/issues/74595) | [Bug]: async exec completion relay asks user for missing logs after No session found | closed externally after review | Apr 29, 2026, 20:42 UTC | [records/openclaw-openclaw/closed/74595.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74595.md) |
| [#59441](https://github.com/openclaw/openclaw/issues/59441) | [Bug]: cron add --at does not support HH:MM time-only strings; --tz has no effect on --at | closed externally after review | Apr 29, 2026, 20:39 UTC | [records/openclaw-openclaw/closed/59441.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59441.md) |
| [#61100](https://github.com/openclaw/openclaw/pull/61100) | feat(discord): add upload-file action support [claude-generated] | closed externally after review | Apr 29, 2026, 20:38 UTC | [records/openclaw-openclaw/closed/61100.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61100.md) |
| [#61087](https://github.com/openclaw/openclaw/pull/61087) | fix(discord): advertise upload-file action so agents can discover file-send capability | closed externally after review | Apr 29, 2026, 20:37 UTC | [records/openclaw-openclaw/closed/61087.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61087.md) |
| [#42261](https://github.com/openclaw/openclaw/issues/42261) | fix(gateway): webchat/WS clients never receive live thinking events | closed externally after review | Apr 29, 2026, 20:33 UTC | [records/openclaw-openclaw/closed/42261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42261.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#54647](https://github.com/openclaw/openclaw/pull/54647) | Fix ACP session model reporting in sessions list | high | candidate | Apr 29, 2026, 20:46 UTC | [records/openclaw-openclaw/items/54647.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54647.md) |
| [#58805](https://github.com/openclaw/openclaw/pull/58805) | Plugins: preserve manifest skills on loaded plugin records | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-openclaw/items/58805.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58805.md) |
| [#61151](https://github.com/openclaw/openclaw/pull/61151) | fix(agents): drop partialJson streaming artifacts from session history repair | high | candidate | Apr 29, 2026, 20:41 UTC | [records/openclaw-openclaw/items/61151.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61151.md) |
| [#62891](https://github.com/openclaw/openclaw/issues/62891) | [v4.5] Session-store reconciliation on startup blocks main process, causing full fallback chain timeout for cron/LLM requests | high | candidate | Apr 29, 2026, 20:40 UTC | [records/openclaw-openclaw/items/62891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62891.md) |
| [#60824](https://github.com/openclaw/openclaw/pull/60824) | fix(config): migrate legacy acp.stream keys on load | high | candidate | Apr 29, 2026, 20:40 UTC | [records/openclaw-openclaw/items/60824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60824.md) |
| [#53528](https://github.com/openclaw/openclaw/pull/53528) | feat: watch jobs.json for external changes to invalidate store cache | high | candidate | Apr 29, 2026, 20:40 UTC | [records/openclaw-openclaw/items/53528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53528.md) |
| [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | high | candidate | Apr 29, 2026, 20:39 UTC | [records/openclaw-openclaw/items/74547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) |
| [#54529](https://github.com/openclaw/openclaw/issues/54529) | Telegram: apiRoot local Bot API server receives updates but never dispatches to agent sessions | high | candidate | Apr 29, 2026, 20:39 UTC | [records/openclaw-openclaw/items/54529.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54529.md) |
| [#53852](https://github.com/openclaw/openclaw/issues/53852) | Bug: partialArgs JSON duplication in agentTurn cron jobs with isolated sessionTarget | high | candidate | Apr 29, 2026, 20:38 UTC | [records/openclaw-openclaw/items/53852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53852.md) |
| [#54311](https://github.com/openclaw/openclaw/issues/54311) | gh-issues skill: Frontmatter validation failure + excessive size | high | candidate | Apr 29, 2026, 20:38 UTC | [records/openclaw-openclaw/items/54311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54311.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74616](https://github.com/openclaw/openclaw/pull/74616) | refactor(plugins): split bundled runtime deps helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74616.md) | complete | Apr 29, 2026, 20:57 UTC |
| [#58775](https://github.com/openclaw/openclaw/issues/58775) | Bug: google-vertex provider merged into google transport path in 2026.3.28 (regression) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58775.md) | complete | Apr 29, 2026, 20:48 UTC |
| [#62962](https://github.com/openclaw/openclaw/issues/62962) | [Feature]: Tool security classification properties (isDestructive, isReadOnly, isConcurrencySafe) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62962.md) | complete | Apr 29, 2026, 20:48 UTC |
| [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 20:47 UTC |
| [#53445](https://github.com/openclaw/openclaw/pull/53445) | Control UI: show full date-time in session list (fixes #53088) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53445.md) | complete | Apr 29, 2026, 20:47 UTC |
| [#54647](https://github.com/openclaw/openclaw/pull/54647) | Fix ACP session model reporting in sessions list | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54647.md) | complete | Apr 29, 2026, 20:46 UTC |
| [#53998](https://github.com/openclaw/openclaw/issues/53998) | [Bug]: secrets audit flags $VAR env refs as PLAINTEXT_FOUND — no clear path to zero plaintext | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53998.md) | complete | Apr 29, 2026, 20:46 UTC |
| [#74593](https://github.com/openclaw/openclaw/pull/74593) | fix(plugins): mirror global-agent runtime dependency | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74593.md) | complete | Apr 29, 2026, 20:45 UTC |
| [#53021](https://github.com/openclaw/openclaw/pull/53021) | fix: coerce lan→loopback for Control UI display URLs in status/configure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53021.md) | complete | Apr 29, 2026, 20:45 UTC |
| [#56693](https://github.com/openclaw/openclaw/issues/56693) | OpenAI Codex OAuth can bind to a deactivated ChatGPT workspace when accounts have multiple workspaces | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/56693.md) | complete | Apr 29, 2026, 20:45 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 21:02 UTC

State: Review publish complete

Merged review artifacts for run 25132551774. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25132551774](https://github.com/openclaw/clawsweeper/actions/runs/25132551774)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 889 |
| Open PRs | 34 |
| Open items total | 923 |
| Reviewed files | 923 |
| Unreviewed open items | 0 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 909 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 43 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 47/60 current (13 due, 78.3%) |
| Hourly hot item cadence (<7d) | 47/60 current (13 due, 78.3%) |
| Daily cadence coverage | 207/209 current (2 due, 99%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 186/188 current (2 due, 98.9%) |
| Weekly older issue cadence | 643/654 current (11 due, 98.3%) |
| Due now by cadence | 31 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 18:44 UTC

Status: **Passing**

Targeted review input: `756`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 925 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 5 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 1 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 21:01 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 20:37 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 184 | 0 | 184 | 13 | 0 | 385 | 0 |
| Last 24 hours | 937 | 0 | 937 | 15 | 15 | 783 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1434](https://github.com/openclaw/clawhub/issues/1434) | Sonarbay-skill incorrectly flaged. | closed externally after review | Apr 29, 2026, 17:17 UTC | [records/openclaw-clawhub/closed/1434.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1434.md) |
| [#1376](https://github.com/openclaw/clawhub/issues/1376) | False positive: openclaw-workspace-sync flagged as suspicious | closed externally after review | Apr 29, 2026, 17:06 UTC | [records/openclaw-clawhub/closed/1376.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1376.md) |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | closed externally after review | Apr 29, 2026, 13:48 UTC | [records/openclaw-clawhub/closed/1812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1812.md) |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | kept open | Apr 29, 2026, 08:25 UTC | [records/openclaw-clawhub/closed/1891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1891.md) |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 20:47 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 20:46 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 20:45 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 20:45 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 20:44 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#804](https://github.com/openclaw/clawhub/issues/804) | <slug> structure of clawhub | high | candidate | Apr 29, 2026, 20:43 UTC | [records/openclaw-clawhub/items/804.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/804.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 20:42 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 20:24 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1500](https://github.com/openclaw/clawhub/issues/1500) | error with Alibaba Cloud DashScope compatible mode - InvalidParameter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1500.md) | complete | Apr 29, 2026, 21:01 UTC |
| [#1155](https://github.com/openclaw/clawhub/issues/1155) | 大哥，真的标记错了，给我解开吧 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1155.md) | failed | Apr 29, 2026, 21:00 UTC |
| [#1558](https://github.com/openclaw/clawhub/issues/1558) | False positive: TrencherAI skill flagged for undeclared credentials | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1558.md) | complete | Apr 29, 2026, 20:56 UTC |
| [#1494](https://github.com/openclaw/clawhub/issues/1494) | Request to Whitelist Preny Analytics Skill (false positive) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1494.md) | complete | Apr 29, 2026, 20:55 UTC |
| [#1391](https://github.com/openclaw/clawhub/issues/1391) | ClawHub Security Scan False Positives: .git/ and __pycache__/ flagged as \"suspicious patterns\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1391.md) | complete | Apr 29, 2026, 20:55 UTC |
| [#1452](https://github.com/openclaw/clawhub/issues/1452) | [Bug] Cannot sign in with GitHub after deleting account (OAuth binding not cleared) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1452.md) | complete | Apr 29, 2026, 20:55 UTC |
| [#1511](https://github.com/openclaw/clawhub/issues/1511) | [False Positive] SafeClaw Security Auditor flagged as malicious — security tool with detection patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1511.md) | complete | Apr 29, 2026, 20:55 UTC |
| [#1526](https://github.com/openclaw/clawhub/issues/1526) | pop-pay flagged suspicious — capability-based classification, no malicious code found. Verified publisher path? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1526.md) | complete | Apr 29, 2026, 20:55 UTC |
| [#1253](https://github.com/openclaw/clawhub/issues/1253) | Skill flagged as suspicious due to undeclared config usage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1253.md) | complete | Apr 29, 2026, 20:55 UTC |
| [#1503](https://github.com/openclaw/clawhub/issues/1503) | False positive: axonflow/governance-policies flagged as suspicious — security policy templates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1503.md) | complete | Apr 29, 2026, 20:54 UTC |

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
| Open PRs | 3 |
| Open items total | 3 |
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
