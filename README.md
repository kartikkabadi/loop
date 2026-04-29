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

## Maintainer Commands

Maintainers can steer ClawSweeper from target-repo issue and PR comments. The
router accepts `/clawsweeper ...`, `/automerge`, `/autoclose <reason>`,
`@clawsweeper ...`, `@clawsweeper[bot] ...`, `@openclaw-clawsweeper ...`, and
`@openclaw-clawsweeper[bot] ...`.

Common commands:

```text
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
```

- `status` and `explain` post a short target summary.
- `re-review` dispatches a fresh ClawSweeper issue/PR review without starting
  repair.
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

Last dashboard update: Apr 29, 2026, 15:37 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4427 |
| Open PRs | 3433 |
| Open items total | 7860 |
| Reviewed files | 7510 |
| Unreviewed open items | 353 |
| Due now by cadence | 2897 |
| Proposed closes awaiting apply | 5 |
| Work candidates awaiting promotion | 723 |
| Closed by Codex apply | 10810 |
| Failed or stale reviews | 16 |
| Archived closed files | 14379 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6934 | 6586 | 348 | 2820 | 5 | 674 | 10802 | Apr 29, 2026, 15:23 UTC | Apr 29, 2026, 15:18 UTC | 454 |
| [ClawHub](https://github.com/openclaw/clawhub) | 926 | 921 | 5 | 74 | 0 | 48 | 8 | Apr 29, 2026, 15:03 UTC | Apr 29, 2026, 13:48 UTC | 407 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 15:37 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25116649947) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 15:08 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25116895225) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 15:23 UTC. Latest close: Apr 29, 2026, 15:18 UTC. Latest comment sync: Apr 29, 2026, 15:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 396 | 1 |
| Last hour | 958 | 25 | 933 | 1 | 19 | 861 | 4 |
| Last 24 hours | 6024 | 367 | 5657 | 15 | 754 | 1741 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72080](https://github.com/openclaw/openclaw/issues/72080) | [Bug]: ACP child sessions report stopReason=\"stop\" with usage=0 before harness completes, causing parent agents to abandon mid-flight | already implemented on main | Apr 29, 2026, 15:33 UTC | [records/openclaw-openclaw/closed/72080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72080.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65131](https://github.com/openclaw/openclaw/issues/65131) | Feature Request: Option to hide system messages from Control UI chat window | already implemented on main | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/65131.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65131.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65123](https://github.com/openclaw/openclaw/pull/65123) | fix(discord): preserve explicit target kind when parsing recipients | already implemented on main | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/65123.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65123.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64830](https://github.com/openclaw/openclaw/issues/64830) | [Feature] Web UI new session should respect agents.defaults.thinkingDefault and agents.defaults.reasoningDefault | duplicate or superseded | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/64830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64830.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50762](https://github.com/openclaw/openclaw/issues/50762) | Feature request: split chat and live exec logs in Control UI | duplicate or superseded | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/50762.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50762.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | closed externally after review | Apr 29, 2026, 15:27 UTC | [records/openclaw-openclaw/closed/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44354.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74371](https://github.com/openclaw/openclaw/pull/74371) | Fix Control UI dashboard breadcrumb navigation | closed externally after review | Apr 29, 2026, 15:27 UTC | [records/openclaw-openclaw/closed/74371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74371.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74435](https://github.com/openclaw/openclaw/pull/74435) | fix(memory): use db.loadExtension() instead of sqliteVec.load() for n… | duplicate or superseded | Apr 29, 2026, 15:18 UTC | [records/openclaw-openclaw/closed/74435.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74435.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | closed externally after review | Apr 29, 2026, 15:05 UTC | [records/openclaw-openclaw/closed/73614.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73614.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72310](https://github.com/openclaw/openclaw/issues/72310) | [Bug]: Default plugin scanning is unsustainable on mid-range hardware | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/72310.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72310.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 15:30 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 15:29 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 15:23 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#737](https://github.com/openclaw/clawhub/issues/737) | Remove duplicate label on @nexecuteinc/cmdbcompass | high | candidate | Apr 29, 2026, 15:22 UTC | [records/openclaw-clawhub/items/737.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/737.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64767](https://github.com/openclaw/openclaw/issues/64767) | [Bug] Bloated session jsonl (444 MB) hangs gateway via String.prototype.replace — diagnose with sample+lsof | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/64767.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64767.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68126](https://github.com/openclaw/openclaw/issues/68126) | Discord DM inbound sets ctx.To to channel:<id> instead of user:<id> | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/68126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68126.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64891](https://github.com/openclaw/openclaw/issues/64891) | [Bug]: Hundreds of repeated HTTP requests to 169.254.169.254:80 for the first 10 minutes after the startup | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/64891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64891.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations after explicit restarts | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/73812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70991](https://github.com/openclaw/openclaw/issues/70991) | [Bug]: connection drops between gateway and OpenCL Control + unable to stop running task with /stop and button disapear | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/70991.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70991.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72382](https://github.com/openclaw/openclaw/issues/72382) | [Bug]: General install | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/72382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72382.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64883](https://github.com/openclaw/openclaw/issues/64883) | agents: strengthen planning-only detector against dummy tool calls | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/64883.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64883.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74363](https://github.com/openclaw/openclaw/issues/74363) | Subagent runs can be falsely marked failed/lost after clean gateway close or pending wait | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/74363.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74363.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74370](https://github.com/openclaw/openclaw/issues/74370) | [Bug] 消息在 memory flush + compaction 后被重复投递 | high | candidate | Apr 29, 2026, 15:18 UTC | [records/openclaw-openclaw/items/74370.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74370.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64903](https://github.com/openclaw/openclaw/issues/64903) | Android app crashes on NodeForegroundService startForeground with ForegroundServiceStartNotAllowedException | high | candidate | Apr 29, 2026, 15:18 UTC | [records/openclaw-openclaw/items/64903.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64903.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74397](https://github.com/openclaw/openclaw/pull/74397) | fix(feishu): repair stale channel state in doctor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74397.md) | complete | Apr 29, 2026, 15:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74381](https://github.com/openclaw/openclaw/pull/74381) | refactor: centralize Discord and Slack DM access resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74381.md) | complete | Apr 29, 2026, 15:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74428](https://github.com/openclaw/openclaw/pull/74428) | [codex] fix(mcp): restrict serve scope selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74428.md) | complete | Apr 29, 2026, 15:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74237](https://github.com/openclaw/openclaw/issues/74237) | Feishu channel can hot-loop gateway on stale or corrupt channel session state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74237.md) | complete | Apr 29, 2026, 15:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74406](https://github.com/openclaw/openclaw/pull/74406) | fix(tasks): cache maintenance session lookups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74406.md) | complete | Apr 29, 2026, 15:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 15:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74261](https://github.com/openclaw/openclaw/issues/74261) | [Feature]: whatsapp create group tool for whatsapp-agent-tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74261.md) | complete | Apr 29, 2026, 15:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74439](https://github.com/openclaw/openclaw/issues/74439) | Feature: Centralized API key management | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74439.md) | complete | Apr 29, 2026, 15:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74255](https://github.com/openclaw/openclaw/pull/74255) | fix(context-engine): honor assembled prompt authority in precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74255.md) | complete | Apr 29, 2026, 15:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64767](https://github.com/openclaw/openclaw/issues/64767) | [Bug] Bloated session jsonl (444 MB) hangs gateway via String.prototype.replace — diagnose with sample+lsof | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64767.md) | complete | Apr 29, 2026, 15:20 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 15:37 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 391. Item numbers: 147,6792,7057,7338,7359,7403,7406,7433,8724,9394,9465,9607,10029,10137,10354,10872,10960,11414,11473,11489,11517,11655,11665,11703,11960,12008,12047,12198,12219,12398,12441,12505,12512,12554,12590,12602,12931,13241,13271,13304,13337,13362,13387,13417,13440,13479,13543,13570,13613,13616,13617,13620,13744,13751,14251,14438,14526,14601,14629,14747,14804,14850,14861,14874,14968,15591,16142,16896,17098,17213,17684,17810,17876,17925,18548,18985,19680,19859,20237,20321,20950,22021,22438,22439,23585,24107,25295,26428,27137,28300,29707,29736,32188,32438,36314,37589,38076,38501,38716,38729,38817,39038,39060,39343,39605,40355,40756,41685,43383,44859,45438,45706,45952,46023,46058,46109,46168,46221,46544,46548,46637,46656,46701,46733,46786,46809,46844,47095,47143,47235,47335,47441,47452,47487,47534,47540,47555,47562,47565,47613,47643,47651,47663,47690,47706,47710,47712,47723,47739,47743,47834,47840,47856,47910,47961,47975,47983,47992,47996,48045,48133,48200,48260,48486,48510,48684,48709,48780,48785,48786,48793,48814,48920,49099,49841,49931,49944,50040,50081,50090,50093,50126,50165,50184,50195,50199,50245,50248,50268,50274,50276,50277,50287,50291,50374,50442,50482,50490,50530,50561,50563,50565,50590,50611,50619,50630,50642,50677,50681,50690,50719,50739,50762,50768,50776,50795,50798,50809,50880,50887,50900,50972,51088,51327,51421,51455,51594,51849,52192,52207,52244,52276,52365,52400,52434,52448,52457,52480,52515,52571,52601,52614,52627,52636,52640,52642,52727,52751,52762,52801,52832,52912,52921,52943,52993,53015,53021,53030,53108,53243,53259,53262,53281,53288,53326,53329,53410,53441,53445,53454,53473,53486,53520,53524,53526,53528,53533,53557,53607,53629,53638,53660,53670,53676,53677,53716,53718,53720,53738,53762,53779,53780,53787,53809,53922,53961,53965,54032,54085,54132,54155,54306,54308,54315,54343,54354,54361,54375,54386,54392,54414,54471,54574,54585,54591,54600,54602,54647,58971,59330,61443,62024,62120,63193,63196,63208,63210,63216,63223,63266,64318,64720,64721,64726,64734,64760,64767,64782,64800,64805,64807,64810,64813,64818,64820,64830,64831,64832,64874,64879,64881,64883,64887,64891,64901,64902,64903,64921,64929,64946,64960,64962,64983,64988,64993,65005,65030,65036,65058,65059,65066,65095,65123,65131,65134,65141,65156,65161,65177,65180,65190,65194,65199,65213,65223,65235,65239,65242,65251,65252,65258,65260,65262,65284,65301,65307,65312,65331,65345,65355,65358,65359,65364,65375,65382,65383,65384,65398,65404,65408,65409,65423,65425,65433,65435,65444,65445,65452,65477,65502,65506,65727,66184,66432,68124,68126,68127,68149,68152,68155,68170,68176,68181,68196,68204,68222,68257,68258,68449,69707,70584,70990,70991,71063,71066,71099,71116,71132,71136,71140,71154,71157,71170,71211,71216,71227,71249,71273,71285,71301,71324,71329,71335,71350,71398,72080,72362,72370,72382,72390,72394,72404,72418,72419,72421,72951,73243,73428,73501,73632,73812,74237,74243,74255,74261,74269,74271,74275,74283,74284,74285,74286,74288,74289,74361,74363,74364,74365,74370,74374.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25116649947](https://github.com/openclaw/clawsweeper/actions/runs/25116649947)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3540 |
| Open PRs | 3394 |
| Open items total | 6934 |
| Reviewed files | 6586 |
| Unreviewed open items | 348 |
| Archived closed files | 14355 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3370 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3210 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6580 |
| Proposed closes awaiting apply | 5 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 674 |
| Closed by Codex apply | 10802 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 174/1095 current (921 due, 15.9%) |
| Hourly hot item cadence (<7d) | 174/1095 current (921 due, 15.9%) |
| Daily cadence coverage | 2134/3683 current (1549 due, 57.9%) |
| Daily PR cadence | 1517/2569 current (1052 due, 59.1%) |
| Daily new issue cadence (<30d) | 617/1114 current (497 due, 55.4%) |
| Weekly older issue cadence | 1806/1808 current (2 due, 99.9%) |
| Due now by cadence | 2820 |

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

Latest review: Apr 29, 2026, 15:23 UTC. Latest close: Apr 29, 2026, 15:18 UTC. Latest comment sync: Apr 29, 2026, 15:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 396 | 1 |
| Last hour | 957 | 25 | 932 | 1 | 19 | 454 | 4 |
| Last 24 hours | 5087 | 367 | 4720 | 2 | 740 | 1003 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72080](https://github.com/openclaw/openclaw/issues/72080) | [Bug]: ACP child sessions report stopReason=\"stop\" with usage=0 before harness completes, causing parent agents to abandon mid-flight | already implemented on main | Apr 29, 2026, 15:33 UTC | [records/openclaw-openclaw/closed/72080.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72080.md) |
| [#65131](https://github.com/openclaw/openclaw/issues/65131) | Feature Request: Option to hide system messages from Control UI chat window | already implemented on main | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/65131.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65131.md) |
| [#65123](https://github.com/openclaw/openclaw/pull/65123) | fix(discord): preserve explicit target kind when parsing recipients | already implemented on main | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/65123.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65123.md) |
| [#64830](https://github.com/openclaw/openclaw/issues/64830) | [Feature] Web UI new session should respect agents.defaults.thinkingDefault and agents.defaults.reasoningDefault | duplicate or superseded | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/64830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64830.md) |
| [#50762](https://github.com/openclaw/openclaw/issues/50762) | Feature request: split chat and live exec logs in Control UI | duplicate or superseded | Apr 29, 2026, 15:32 UTC | [records/openclaw-openclaw/closed/50762.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50762.md) |
| [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | closed externally after review | Apr 29, 2026, 15:27 UTC | [records/openclaw-openclaw/closed/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44354.md) |
| [#74371](https://github.com/openclaw/openclaw/pull/74371) | Fix Control UI dashboard breadcrumb navigation | closed externally after review | Apr 29, 2026, 15:27 UTC | [records/openclaw-openclaw/closed/74371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74371.md) |
| [#74435](https://github.com/openclaw/openclaw/pull/74435) | fix(memory): use db.loadExtension() instead of sqliteVec.load() for n… | duplicate or superseded | Apr 29, 2026, 15:18 UTC | [records/openclaw-openclaw/closed/74435.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74435.md) |
| [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | closed externally after review | Apr 29, 2026, 15:05 UTC | [records/openclaw-openclaw/closed/73614.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73614.md) |
| [#72310](https://github.com/openclaw/openclaw/issues/72310) | [Bug]: Default plugin scanning is unsustainable on mid-range hardware | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/72310.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72310.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 15:30 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 15:29 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#64767](https://github.com/openclaw/openclaw/issues/64767) | [Bug] Bloated session jsonl (444 MB) hangs gateway via String.prototype.replace — diagnose with sample+lsof | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/64767.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64767.md) |
| [#68126](https://github.com/openclaw/openclaw/issues/68126) | Discord DM inbound sets ctx.To to channel:<id> instead of user:<id> | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/68126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68126.md) |
| [#64891](https://github.com/openclaw/openclaw/issues/64891) | [Bug]: Hundreds of repeated HTTP requests to 169.254.169.254:80 for the first 10 minutes after the startup | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/64891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64891.md) |
| [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations after explicit restarts | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/73812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) |
| [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 15:20 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [#70991](https://github.com/openclaw/openclaw/issues/70991) | [Bug]: connection drops between gateway and OpenCL Control + unable to stop running task with /stop and button disapear | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/70991.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70991.md) |
| [#72382](https://github.com/openclaw/openclaw/issues/72382) | [Bug]: General install | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/72382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72382.md) |
| [#64883](https://github.com/openclaw/openclaw/issues/64883) | agents: strengthen planning-only detector against dummy tool calls | high | candidate | Apr 29, 2026, 15:19 UTC | [records/openclaw-openclaw/items/64883.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64883.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74397](https://github.com/openclaw/openclaw/pull/74397) | fix(feishu): repair stale channel state in doctor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74397.md) | complete | Apr 29, 2026, 15:23 UTC |
| [#74381](https://github.com/openclaw/openclaw/pull/74381) | refactor: centralize Discord and Slack DM access resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74381.md) | complete | Apr 29, 2026, 15:22 UTC |
| [#74428](https://github.com/openclaw/openclaw/pull/74428) | [codex] fix(mcp): restrict serve scope selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74428.md) | complete | Apr 29, 2026, 15:21 UTC |
| [#74237](https://github.com/openclaw/openclaw/issues/74237) | Feishu channel can hot-loop gateway on stale or corrupt channel session state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74237.md) | complete | Apr 29, 2026, 15:21 UTC |
| [#74406](https://github.com/openclaw/openclaw/pull/74406) | fix(tasks): cache maintenance session lookups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74406.md) | complete | Apr 29, 2026, 15:21 UTC |
| [#74246](https://github.com/openclaw/openclaw/pull/74246) | fix(plugins): simplify bundled runtime deps staging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74246.md) | complete | Apr 29, 2026, 15:21 UTC |
| [#74261](https://github.com/openclaw/openclaw/issues/74261) | [Feature]: whatsapp create group tool for whatsapp-agent-tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74261.md) | complete | Apr 29, 2026, 15:21 UTC |
| [#74439](https://github.com/openclaw/openclaw/issues/74439) | Feature: Centralized API key management | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74439.md) | complete | Apr 29, 2026, 15:20 UTC |
| [#74255](https://github.com/openclaw/openclaw/pull/74255) | fix(context-engine): honor assembled prompt authority in precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74255.md) | complete | Apr 29, 2026, 15:20 UTC |
| [#64767](https://github.com/openclaw/openclaw/issues/64767) | [Bug] Bloated session jsonl (444 MB) hangs gateway via String.prototype.replace — diagnose with sample+lsof | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64767.md) | complete | Apr 29, 2026, 15:20 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 15:36 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 331. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,72,77,79,84,86,88,95,97,99,100,102,115,117,120,127,129,131,134,137,151,162,169,170,171,173,174,178,184,192,205,208,211,224,225,226,227,228,231,236,237,238,243,248,256,265,268,275,277,279,284,287,288,290,314,323,328,329,330,337,340,345,348,349,351,353,364,367,369,371,373,374,378,379,380,382,385,386,387,388,390,392,393,397,402,406,410,420,423,424,425,426,437,438,442,443,447,448,449,450,451,454,455,459,463,469,471,474,478,479,480,481,482,484,485,487,488,489,494,498,501,503,504,509,516,531,532,535,539,541,549,563,566,568,573,575,576,579,580,581,586,589,593,600,604,606,609,613,614,615,618,619,621,630,631,635,636,637,642,645,646,647,650,651,652,653,654,655,656,657,658,661,662,664,666,667,668,669,670,672,673,674,675,676,677,678,680,681,683,686,692,694,699,700,701,705,706,707,708,711,712,713,716,717,718,722,723,729,730,731,733,734,737,740,745,747,752,755,756,760,761,762,764,765,767,768,769,770,772,779,780,782,784,785,786,789,791,792,794,798,800,804,807,808,809,811,816,817,819,823,824,834,835,838,845,846,847,848,850,851,852,853,854,856,858,860,861,862,863,865,868,869,870,871,873,874,875,876,878,879,880,881,882,883,886,888,889,890,892,895,896,897,899,900,901,903,904,905,906,907,908,909,910,911,913,1006,1168,1283,1359,1376,1389,1396,1407,1580,1808,1892,1893,1894.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25116895225](https://github.com/openclaw/clawsweeper/actions/runs/25116895225)
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
| Fresh reviewed issues in the last 7 days | 877 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 911 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 47 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 10 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 1/58 current (57 due, 1.7%) |
| Hourly hot item cadence (<7d) | 1/58 current (57 due, 1.7%) |
| Daily cadence coverage | 210/211 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/190 current (1 due, 99.5%) |
| Weekly older issue cadence | 641/652 current (11 due, 98.3%) |
| Due now by cadence | 74 |

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

Latest review: Apr 29, 2026, 15:25 UTC. Latest close: Apr 29, 2026, 13:48 UTC. Latest comment sync: Apr 29, 2026, 15:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 1 | 0 | 1 | 0 | 0 | 407 | 0 |
| Last 24 hours | 934 | 0 | 934 | 13 | 14 | 735 | 0 |

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
| [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 15:23 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [#737](https://github.com/openclaw/clawhub/issues/737) | Remove duplicate label on @nexecuteinc/cmdbcompass | high | candidate | Apr 29, 2026, 15:22 UTC | [records/openclaw-clawhub/items/737.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/737.md) |
| [#868](https://github.com/openclaw/clawhub/issues/868) | [Bug] clawhub sync fails: Slug is already taken | high | candidate | Apr 29, 2026, 15:17 UTC | [records/openclaw-clawhub/items/868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/868.md) |
| [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 15:16 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 15:13 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 15:10 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 15:10 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 15:10 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 14:26 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 14:24 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1376](https://github.com/openclaw/clawhub/issues/1376) | False positive: openclaw-workspace-sync flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1376.md) | complete | Apr 29, 2026, 15:25 UTC |
| [#1283](https://github.com/openclaw/clawhub/issues/1283) | False positive: 7ito/hkroute flagged as suspicious due to bundled CJS | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1283.md) | complete | Apr 29, 2026, 15:24 UTC |
| [#1894](https://github.com/openclaw/clawhub/issues/1894) | Search ranking question: high-download skill ranks very low | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1894.md) | complete | Apr 29, 2026, 15:24 UTC |
| [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) | complete | Apr 29, 2026, 15:23 UTC |
| [#701](https://github.com/openclaw/clawhub/issues/701) | False positive: xquik-x-twitter-scraper flagged as suspicious incorrectly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/701.md) | complete | Apr 29, 2026, 15:23 UTC |
| [#769](https://github.com/openclaw/clawhub/issues/769) | [iwencai-screener] 技能被误判为可疑，请求人工审核 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/769.md) | complete | Apr 29, 2026, 15:23 UTC |
| [#878](https://github.com/openclaw/clawhub/issues/878) | False positive: privacy-mask flagged as Suspicious despite declared permissions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/878.md) | failed | Apr 29, 2026, 15:23 UTC |
| [#737](https://github.com/openclaw/clawhub/issues/737) | Remove duplicate label on @nexecuteinc/cmdbcompass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/737.md) | complete | Apr 29, 2026, 15:22 UTC |
| [#900](https://github.com/openclaw/clawhub/issues/900) | deleted account → can’t re-login / button stays live | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/900.md) | complete | Apr 29, 2026, 15:22 UTC |
| [#863](https://github.com/openclaw/clawhub/issues/863) | False positive security scan: bria-ai skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/863.md) | complete | Apr 29, 2026, 15:22 UTC |

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
