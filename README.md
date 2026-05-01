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
preferred form is `@clawsweeper ...`. The router also accepts
`@clawsweeper[bot] ...`, `@openclaw-clawsweeper ...`,
`@openclaw-clawsweeper[bot] ...`, and legacy slash aliases such as
`/clawsweeper ...`, `/review`, `/automerge`, and `/autoclose <reason>`.

Common commands:

```text
@clawsweeper status
@clawsweeper re-review
@clawsweeper review
@clawsweeper fix ci
@clawsweeper address review
@clawsweeper rebase
@clawsweeper autofix
@clawsweeper automerge
@clawsweeper approve
@clawsweeper explain
@clawsweeper stop
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
  ClawSweeper PRs or PRs already opted into `clawsweeper:autofix` or
  `clawsweeper:automerge`.
- `autofix` labels an open PR, creates or reuses the adopted job, dispatches
  review, and enters the bounded review/fix loop without merging.
- `automerge` labels an open PR, creates or reuses the adopted job, dispatches
  review, and enters the bounded review/fix/merge loop. Draft PRs are fix-only
  until GitHub marks them ready for review.
- User-facing OpenClaw `fix`, `feat`, and `perf` automerge PRs must include a
  `CHANGELOG.md` entry before ClawSweeper will merge them.
- Security-sensitive findings can be repaired only after explicit
  `autofix`/`automerge` opt-in; ClawSweeper still will not merge until a later
  exact-head review is clean.
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

Last dashboard update: May 1, 2026, 00:12 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 3658 |
| Open PRs | 3357 |
| Open items total | 7015 |
| Reviewed files | 7645 |
| Unreviewed open items | 51 |
| Due now by cadence | 1303 |
| Proposed closes awaiting apply | 5 |
| Work candidates awaiting promotion | 1973 |
| Closed by Codex apply | 11355 |
| Failed or stale reviews | 23 |
| Archived closed files | 15361 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6769 | 6718 | 51 | 1047 | 5 | 1927 | 11347 | May 1, 2026, 00:00 UTC | Apr 30, 2026, 23:51 UTC | 1017 |
| [ClawHub](https://github.com/openclaw/clawhub) | 246 | 924 | 0 | 253 | 0 | 45 | 8 | Apr 29, 2026, 22:22 UTC | Apr 29, 2026, 17:17 UTC | 0 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | May 1, 2026, 00:12 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25194568344) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 22:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25135463730) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: May 1, 2026, 00:00 UTC. Latest close: Apr 30, 2026, 23:51 UTC. Latest comment sync: May 1, 2026, 00:12 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 500 | 0 |
| Last hour | 818 | 12 | 806 | 3 | 11 | 1017 | 0 |
| Last 24 hours | 6714 | 475 | 6239 | 10 | 653 | 3906 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75311](https://github.com/openclaw/openclaw/pull/75311) | fix(ci): GitHub App active-PR-limit exemption regression | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75311.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75145](https://github.com/openclaw/openclaw/pull/75145) | docs: use American \"behavior\" spelling per contribution guide | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75145.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75145.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62440](https://github.com/openclaw/openclaw/issues/62440) | agent --local --json writes JSON envelope to stderr instead of stdout | already implemented on main | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/62440.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62440.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62416](https://github.com/openclaw/openclaw/issues/62416) | Accessibility Improvement: Control UI Settings interface is not compatible with screen readers | duplicate or superseded | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/62416.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62416.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61723](https://github.com/openclaw/openclaw/issues/61723) | [Bug]: TUI process starts but UI does not render after gateway restart or kill -9 | duplicate or superseded | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/61723.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61723.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54655](https://github.com/openclaw/openclaw/pull/54655) | webchat: persist per-session drafts on session switch + fix stop button visibility | duplicate or superseded | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/54655.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54655.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46168](https://github.com/openclaw/openclaw/pull/46168) | Skills: fix discovery scan truncation | already implemented on main | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/46168.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46168.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71227](https://github.com/openclaw/openclaw/issues/71227) | sessions.json parse+write blows past 60s run budget → agents silently return 'No reply from agent' | duplicate or superseded | Apr 30, 2026, 23:51 UTC | [records/openclaw-openclaw/closed/71227.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71227.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75307](https://github.com/openclaw/openclaw/issues/75307) | Background tasks stay 'running' forever after gateway crash/restart, blocking channel reload + saturating CPU | already implemented on main | Apr 30, 2026, 23:43 UTC | [records/openclaw-openclaw/closed/75307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75307.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75221](https://github.com/openclaw/openclaw/pull/75221) | test: add published upgrade survivor lane | closed externally after review | Apr 30, 2026, 23:39 UTC | [records/openclaw-openclaw/closed/75221.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75221.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75256](https://github.com/openclaw/openclaw/pull/75256) | fix(mattermost): add streaming.mode='block' to split draft preview at turn boundaries | high | candidate | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/items/75256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75256.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73121](https://github.com/openclaw/openclaw/issues/73121) | Zombie running tasks: CLI runtime tasks that terminate are never auto-transitioned to failed/timed_out | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/73121.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73121.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75239](https://github.com/openclaw/openclaw/issues/75239) | WebChat assistant replies still duplicate after #66875 fix (2026.4.27) | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75239.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75239.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72934](https://github.com/openclaw/openclaw/issues/72934) | [Bug]: Browser snapshot action consistently times out despite successful open/navigate | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/72934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72934.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74907](https://github.com/openclaw/openclaw/issues/74907) | Multi-tool turn replay produces orphan tool_use blocks after session compaction (v2026.4.x regression) | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/74907.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74907.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75283](https://github.com/openclaw/openclaw/issues/75283) | 2026.4.29: Gateway repeatedly spawns runtime-deps pnpm installs and starves event loop | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75283.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75283.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71417](https://github.com/openclaw/openclaw/issues/71417) | `openclaw agent` defaults --channel to last, silently resumes most recent session | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/71417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71417.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75310](https://github.com/openclaw/openclaw/pull/75310) | fix: detect and recover from incomplete bundled runtime deps staging | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75310.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75310.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75261](https://github.com/openclaw/openclaw/issues/75261) | [Bug]: cron with sessionTarget=current still lowercases Matrix roomId in 2026.4.27 (regression of #71798 via MCP loopback path) | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75261.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73087](https://github.com/openclaw/openclaw/pull/73087) | fix: clarify macOS service PATH audit | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/73087.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73087.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75235](https://github.com/openclaw/openclaw/issues/75235) | Session corruption: leading-assistant transcript causes infinite \"messages: at least one message is required\" loop | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/75235.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75235.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73105](https://github.com/openclaw/openclaw/pull/73105) | fix(agents): emit fallback terminal lifecycle on subscription teardown | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/73105.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73105.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52073](https://github.com/openclaw/openclaw/issues/52073) | [Bug]: Agent becomes completely unresponsive during Skill installation and does not report task completion | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/52073.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52073.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72382](https://github.com/openclaw/openclaw/issues/72382) | [Bug]: General install | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/72382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72382.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72370](https://github.com/openclaw/openclaw/issues/72370) | Workspace hooks rejected as \"cannot override openclaw-managed hook code\" and replaced with empty managed versions (2026.4.23+) | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/72370.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72370.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75309](https://github.com/openclaw/openclaw/issues/75309) | fix: gateway startup and doctor --repair miss corrupt bundled runtime deps from interrupted staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75309.md) | complete | May 1, 2026, 00:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75184](https://github.com/openclaw/openclaw/issues/75184) | [Bug]: `agents.defaults.skipBootstrap: true` is a no-op for workspace bootstrap files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75184.md) | complete | Apr 30, 2026, 23:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75131](https://github.com/openclaw/openclaw/issues/75131) | [Bug]: delivery-queue: send-retry creates fresh UUIDs (not idempotent); recovery should fail-permanent on Telegram 400 'too long'; send-message should pre-split at 4096 chars | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75131.md) | complete | Apr 30, 2026, 23:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72128](https://github.com/openclaw/openclaw/pull/72128) | feat: implemented configurable label templates for spawned agent sess… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72128.md) | failed | Apr 30, 2026, 23:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) | failed | Apr 30, 2026, 23:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74822](https://github.com/openclaw/openclaw/issues/74822) | Gateway: recurring '⚠️ Something went wrong' error requires manual restart (Telegram) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74822.md) | complete | Apr 30, 2026, 23:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75299](https://github.com/openclaw/openclaw/pull/75299) | feat(process): add priority support to command queue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75299.md) | complete | Apr 30, 2026, 23:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74432](https://github.com/openclaw/openclaw/pull/74432) | fix(anthropic): honor ANTHROPIC_BASE_URL when no baseUrl is configured | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74432.md) | complete | Apr 30, 2026, 23:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74504](https://github.com/openclaw/openclaw/issues/74504) | Matrix: cross-signing bootstrap fails on MAS-fronted Synapse (MSC3967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74504.md) | complete | Apr 30, 2026, 23:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75007](https://github.com/openclaw/openclaw/issues/75007) | [Bug]: backup create packages manifest.json twice when TMPDIR points to ~/.openclaw/tmp | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75007.md) | complete | Apr 30, 2026, 23:51 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: May 1, 2026, 00:12 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 499. Item numbers: 7524,7540,7575,7648,7669,7817,8130,8176,8287,8321,8441,8635,8892,8959,8969,9120,9409,9443,9455,9797,9820,10253,10519,11301,11676,12429,12578,12601,12736,12911,13239,13670,14051,14407,14619,15022,17211,22438,33329,36687,38249,41671,45930,46168,46303,46506,46593,46837,46962,47604,48606,49431,50429,50483,50998,51011,51327,52293,52401,53663,53866,53951,53966,54141,54183,54475,54593,54652,54655,54716,54718,54724,54725,54756,54758,54803,54821,54830,54831,54838,54862,54899,54900,54904,54934,54967,54979,54982,55001,55004,55018,55093,55121,55171,55210,55211,55225,55266,55341,55351,55413,55458,55480,55487,55521,55542,55548,55549,55596,55645,55726,55788,55851,56575,57000,57283,57755,58186,58830,59149,59184,59212,59281,59298,59360,59427,59526,59545,59576,59618,59709,59727,59730,59735,59750,59788,59806,59878,59902,60005,60071,60237,60335,60670,60830,61306,61335,61347,61389,61418,61426,61496,61502,61520,61561,61590,61616,61621,61649,61661,61697,61716,61723,61740,61764,61834,61864,61895,62022,62029,62042,62056,62066,62077,62095,62102,62109,62121,62145,62167,62261,62276,62284,62288,62294,62317,62322,62339,62387,62416,62420,62432,62438,62440,62464,62466,62505,62509,62512,62514,63176,63259,63413,63550,63662,63827,63829,64322,64749,64907,64920,64957,65201,65222,65374,65746,65886,66010,66150,66168,66213,66287,66415,66543,66687,66804,67011,67511,67660,67717,67846,67983,68079,68089,68433,68514,68554,68558,68622,68624,68647,68755,68928,68934,69567,69961,70515,70605,70856,70857,70876,70884,70892,70895,70900,70903,70918,70971,70990,70991,71040,71142,71154,71170,71178,71205,71249,71301,71329,71330,71350,71469,71503,71517,71537,71545,71566,71575,71582,71594,71611,71652,71671,71678,71689,71696,71710,71770,71803,71849,71941,71947,72005,72013,72033,72043,72072,72081,72096,72097,72101,72108,72111,72128,72133,72135,72138,72139,72140,72143,72153,72165,72173,72178,72179,72181,72208,72211,72213,72225,72240,72253,72255,72267,72273,72277,72284,72293,72295,72306,72338,72341,72343,72404,72419,72428,72439,72446,72478,72495,72504,72511,72513,72514,72527,72541,72555,72560,72572,72574,72591,72600,72629,72703,72704,72717,72721,72745,72752,72790,72824,72860,72889,72890,72950,72952,73019,73056,73079,73082,73160,73166,73172,73182,73186,73187,73328,73363,73461,73483,73488,73536,73537,73552,73574,73603,73619,73691,73721,73726,73768,73791,73795,73836,73860,73864,73956,73959,73976,74003,74010,74038,74073,74081,74082,74093,74097,74182,74200,74212,74217,74223,74232,74233,74238,74243,74254,74258,74262,74266,74269,74271,74278,74290,74334,74339,74341,74374,74378,74384,74395,74421,74424,74427,74432,74481,74484,74491,74497,74500,74504,74510,74537,74552,74572,74575,74580,74586,74594,74597,74601,74665,74674,74679,74722,74729,74732,74749,74767,74782,74788,74800,74801,74803,74807,74809,74810,74822,74835,74845,74848,74879,74890,74900,74903,74910,74915,74922,74928,74953,74985,74986,75007,75026,75037,75041,75044,75058,75105,75131,75151,75152,75153,75154,75155,75171,75184,75203,75204,75255.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25194568344](https://github.com/openclaw/clawsweeper/actions/runs/25194568344)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3429 |
| Open PRs | 3340 |
| Open items total | 6769 |
| Reviewed files | 6718 |
| Unreviewed open items | 51 |
| Archived closed files | 15335 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3415 |
| Proposed issue closes | 3 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3293 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6708 |
| Proposed closes awaiting apply | 5 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 1927 |
| Closed by Codex apply | 11347 |
| Failed or stale reviews | 10 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 513/1447 current (934 due, 35.5%) |
| Hourly hot item cadence (<7d) | 513/1447 current (934 due, 35.5%) |
| Daily cadence coverage | 3428/3487 current (59 due, 98.3%) |
| Daily PR cadence | 2395/2449 current (54 due, 97.8%) |
| Daily new issue cadence (<30d) | 1033/1038 current (5 due, 99.5%) |
| Weekly older issue cadence | 1781/1784 current (3 due, 99.8%) |
| Due now by cadence | 1047 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 30, 2026, 18:44 UTC

Status: **Action needed**

Targeted review input: `51947,61960,62112,63037,73342`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6806 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 33 |
| Missing protected open records | 21 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 4 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 5 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#51947](https://github.com/openclaw/openclaw/issues/51947) | Stale review | proactive send from DM may route to wrong conversation when user has multiple conversations | records/openclaw-openclaw/items/51947.md |
| [#61960](https://github.com/openclaw/openclaw/pull/61960) | Stale review | docs: require i18n postprocess before skip | records/openclaw-openclaw/items/61960.md |
| [#62112](https://github.com/openclaw/openclaw/pull/62112) | Stale review | fix(agents): preserve Anthropic refusal handling | records/openclaw-openclaw/items/62112.md |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: May 1, 2026, 00:00 UTC. Latest close: Apr 30, 2026, 23:51 UTC. Latest comment sync: May 1, 2026, 00:12 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 500 | 0 |
| Last hour | 818 | 12 | 806 | 3 | 11 | 1017 | 0 |
| Last 24 hours | 6714 | 475 | 6239 | 10 | 653 | 3906 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#75311](https://github.com/openclaw/openclaw/pull/75311) | fix(ci): GitHub App active-PR-limit exemption regression | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75311.md) |
| [#75145](https://github.com/openclaw/openclaw/pull/75145) | docs: use American \"behavior\" spelling per contribution guide | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75145.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75145.md) |
| [#62440](https://github.com/openclaw/openclaw/issues/62440) | agent --local --json writes JSON envelope to stderr instead of stdout | already implemented on main | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/62440.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62440.md) |
| [#62416](https://github.com/openclaw/openclaw/issues/62416) | Accessibility Improvement: Control UI Settings interface is not compatible with screen readers | duplicate or superseded | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/62416.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62416.md) |
| [#61723](https://github.com/openclaw/openclaw/issues/61723) | [Bug]: TUI process starts but UI does not render after gateway restart or kill -9 | duplicate or superseded | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/61723.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61723.md) |
| [#54655](https://github.com/openclaw/openclaw/pull/54655) | webchat: persist per-session drafts on session switch + fix stop button visibility | duplicate or superseded | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/54655.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54655.md) |
| [#46168](https://github.com/openclaw/openclaw/pull/46168) | Skills: fix discovery scan truncation | already implemented on main | May 1, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/46168.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46168.md) |
| [#71227](https://github.com/openclaw/openclaw/issues/71227) | sessions.json parse+write blows past 60s run budget → agents silently return 'No reply from agent' | duplicate or superseded | Apr 30, 2026, 23:51 UTC | [records/openclaw-openclaw/closed/71227.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71227.md) |
| [#75307](https://github.com/openclaw/openclaw/issues/75307) | Background tasks stay 'running' forever after gateway crash/restart, blocking channel reload + saturating CPU | already implemented on main | Apr 30, 2026, 23:43 UTC | [records/openclaw-openclaw/closed/75307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75307.md) |
| [#75221](https://github.com/openclaw/openclaw/pull/75221) | test: add published upgrade survivor lane | closed externally after review | Apr 30, 2026, 23:39 UTC | [records/openclaw-openclaw/closed/75221.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75221.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#75256](https://github.com/openclaw/openclaw/pull/75256) | fix(mattermost): add streaming.mode='block' to split draft preview at turn boundaries | high | candidate | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/items/75256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75256.md) |
| [#73121](https://github.com/openclaw/openclaw/issues/73121) | Zombie running tasks: CLI runtime tasks that terminate are never auto-transitioned to failed/timed_out | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/73121.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73121.md) |
| [#75239](https://github.com/openclaw/openclaw/issues/75239) | WebChat assistant replies still duplicate after #66875 fix (2026.4.27) | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75239.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75239.md) |
| [#72934](https://github.com/openclaw/openclaw/issues/72934) | [Bug]: Browser snapshot action consistently times out despite successful open/navigate | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/72934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72934.md) |
| [#74907](https://github.com/openclaw/openclaw/issues/74907) | Multi-tool turn replay produces orphan tool_use blocks after session compaction (v2026.4.x regression) | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/74907.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74907.md) |
| [#75283](https://github.com/openclaw/openclaw/issues/75283) | 2026.4.29: Gateway repeatedly spawns runtime-deps pnpm installs and starves event loop | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75283.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75283.md) |
| [#71417](https://github.com/openclaw/openclaw/issues/71417) | `openclaw agent` defaults --channel to last, silently resumes most recent session | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/71417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71417.md) |
| [#75310](https://github.com/openclaw/openclaw/pull/75310) | fix: detect and recover from incomplete bundled runtime deps staging | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75310.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75310.md) |
| [#75261](https://github.com/openclaw/openclaw/issues/75261) | [Bug]: cron with sessionTarget=current still lowercases Matrix roomId in 2026.4.27 (regression of #71798 via MCP loopback path) | high | candidate | May 1, 2026, 00:07 UTC | [records/openclaw-openclaw/items/75261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75261.md) |
| [#73087](https://github.com/openclaw/openclaw/pull/73087) | fix: clarify macOS service PATH audit | high | candidate | May 1, 2026, 00:06 UTC | [records/openclaw-openclaw/items/73087.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73087.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#75309](https://github.com/openclaw/openclaw/issues/75309) | fix: gateway startup and doctor --repair miss corrupt bundled runtime deps from interrupted staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75309.md) | complete | May 1, 2026, 00:00 UTC |
| [#75184](https://github.com/openclaw/openclaw/issues/75184) | [Bug]: `agents.defaults.skipBootstrap: true` is a no-op for workspace bootstrap files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75184.md) | complete | Apr 30, 2026, 23:57 UTC |
| [#75131](https://github.com/openclaw/openclaw/issues/75131) | [Bug]: delivery-queue: send-retry creates fresh UUIDs (not idempotent); recovery should fail-permanent on Telegram 400 'too long'; send-message should pre-split at 4096 chars | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75131.md) | complete | Apr 30, 2026, 23:57 UTC |
| [#72128](https://github.com/openclaw/openclaw/pull/72128) | feat: implemented configurable label templates for spawned agent sess… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72128.md) | failed | Apr 30, 2026, 23:55 UTC |
| [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) | failed | Apr 30, 2026, 23:55 UTC |
| [#74822](https://github.com/openclaw/openclaw/issues/74822) | Gateway: recurring '⚠️ Something went wrong' error requires manual restart (Telegram) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74822.md) | complete | Apr 30, 2026, 23:52 UTC |
| [#75299](https://github.com/openclaw/openclaw/pull/75299) | feat(process): add priority support to command queue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75299.md) | complete | Apr 30, 2026, 23:52 UTC |
| [#74432](https://github.com/openclaw/openclaw/pull/74432) | fix(anthropic): honor ANTHROPIC_BASE_URL when no baseUrl is configured | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74432.md) | complete | Apr 30, 2026, 23:51 UTC |
| [#74504](https://github.com/openclaw/openclaw/issues/74504) | Matrix: cross-signing bootstrap fails on MAS-fronted Synapse (MSC3967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74504.md) | complete | Apr 30, 2026, 23:51 UTC |
| [#75007](https://github.com/openclaw/openclaw/issues/75007) | [Bug]: backup create packages manifest.json twice when TMPDIR points to ~/.openclaw/tmp | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75007.md) | complete | Apr 30, 2026, 23:51 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 22:23 UTC

State: Review publish complete

Merged review artifacts for run 25135463730. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25135463730](https://github.com/openclaw/clawsweeper/actions/runs/25135463730)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 229 |
| Open PRs | 17 |
| Open items total | 246 |
| Reviewed files | 924 |
| Unreviewed open items | 0 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 877 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 911 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 45 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 0/57 current (57 due, 0%) |
| Hourly hot item cadence (<7d) | 0/57 current (57 due, 0%) |
| Daily cadence coverage | 0/189 current (189 due, 0%) |
| Daily PR cadence | 0/17 current (17 due, 0%) |
| Daily new issue cadence (<30d) | 0/172 current (172 due, 0%) |
| Weekly older issue cadence | 666/673 current (7 due, 99%) |
| Due now by cadence | 253 |

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

Latest review: Apr 29, 2026, 22:22 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 22:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last 24 hours | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

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
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 22:11 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 22:09 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 22:05 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 22:04 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 22:03 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 22:02 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 22:02 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 22:02 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 22:01 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1683](https://github.com/openclaw/clawhub/issues/1683) | 显示 @yangzhichao814-cell/ apexsearch的重复项 | high | candidate | Apr 29, 2026, 21:42 UTC | [records/openclaw-clawhub/items/1683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1683.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1525](https://github.com/openclaw/clawhub/issues/1525) | shejian ClawHub Skill has been tagged as suspicious but everything looks fine in the scan results from VirusTotal  Thanks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1525.md) | failed | Apr 29, 2026, 22:22 UTC |
| [#1538](https://github.com/openclaw/clawhub/issues/1538) | clawhub dashboard is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1538.md) | failed | Apr 29, 2026, 22:21 UTC |
| [#1818](https://github.com/openclaw/clawhub/issues/1818) | False positive: agenttrust-scanner flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1818.md) | failed | Apr 29, 2026, 22:20 UTC |
| [#1900](https://github.com/openclaw/clawhub/issues/1900) | accidently delete my account， cant create new one use github | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1900.md) | complete | Apr 29, 2026, 22:15 UTC |
| [#1862](https://github.com/openclaw/clawhub/issues/1862) | False positive: asr-hotwords flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1862.md) | complete | Apr 29, 2026, 22:14 UTC |
| [#1422](https://github.com/openclaw/clawhub/issues/1422) | ai-capability-analyzer has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1422.md) | complete | Apr 29, 2026, 22:14 UTC |
| [#1707](https://github.com/openclaw/clawhub/issues/1707) | Bug Summary: Missing Token in search and explore Commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1707.md) | failed | Apr 29, 2026, 22:13 UTC |
| [#1407](https://github.com/openclaw/clawhub/issues/1407) | Skill page shows stale SKILL.md content after publishing new versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1407.md) | complete | Apr 29, 2026, 22:13 UTC |
| [#1446](https://github.com/openclaw/clawhub/issues/1446) | False Positive: Skill [Memory Never Forget v2.2.2] incorrectly flagged as suspicious by OpenClaw Security Scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1446.md) | failed | Apr 29, 2026, 22:13 UTC |
| [#1503](https://github.com/openclaw/clawhub/issues/1503) | False positive: axonflow/governance-policies flagged as suspicious — security policy templates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1503.md) | complete | Apr 29, 2026, 22:12 UTC |

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
| Last 24 hours | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

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
- Before selecting and reviewing commits, the receiver waits 15 minutes by
  default (`CLAWSWEEPER_COMMIT_REVIEW_SETTLE_SECONDS=900`) so a push range has
  time to settle across GitHub and the runner.
- The plan job expands ranges, pages large backfills at GitHub's matrix limit,
  and classifies each commit before Codex starts.
- Pure documentation, changelog, README/license, and asset-only commits get a
  skipped report without spending Codex time.
- Mixed commits and code-bearing commits start one Codex worker per commit. The
  worker checks out current target `main` and reviews the selected commit by
  SHA/range instead of detaching the whole repository at that commit.
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
The `CI` GitHub Actions workflow uses the latest Node release and runs
`pnpm run check` on pushes, pull requests, and manual dispatches. The check gate
includes the full test suite, a strict changed-surface coverage threshold, and a
full compiled-repo coverage ratchet.

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
- optionally set `CLAWSWEEPER_COMMIT_REVIEW_SETTLE_SECONDS=0` for manual
  backfills where the target commit range is already settled; the default is
  `900`
