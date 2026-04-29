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

Last dashboard update: Apr 29, 2026, 16:45 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4253 |
| Open PRs | 3261 |
| Open items total | 7514 |
| Reviewed files | 7514 |
| Unreviewed open items | 0 |
| Due now by cadence | 2466 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 806 |
| Closed by Codex apply | 10833 |
| Failed or stale reviews | 16 |
| Archived closed files | 14411 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6589 | 6589 | 0 | 2427 | 0 | 759 | 10825 | Apr 29, 2026, 16:42 UTC | Apr 29, 2026, 16:43 UTC | 428 |
| [ClawHub](https://github.com/openclaw/clawhub) | 922 | 922 | 0 | 36 | 0 | 46 | 8 | Apr 29, 2026, 16:30 UTC | Apr 29, 2026, 13:48 UTC | 427 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 3 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 16:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25121774072) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 16:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25119771229) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 16:42 UTC. Latest close: Apr 29, 2026, 16:43 UTC. Latest comment sync: Apr 29, 2026, 16:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 15 | 2 | 13 | 0 | 2 | 423 | 1 |
| Last hour | 986 | 17 | 969 | 10 | 23 | 855 | 2 |
| Last 24 hours | 6182 | 362 | 5820 | 12 | 763 | 1998 | 30 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74475](https://github.com/openclaw/openclaw/pull/74475) | fix(tts): synthesize tagged hidden text under short-skip threshold (#73758) | duplicate or superseded | Apr 29, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/74475.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74475.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74464](https://github.com/openclaw/openclaw/pull/74464) | fix: The commit introduces imports from `src/channels/plugins/dm-acces | already closed before apply | Apr 29, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/74464.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74464.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74469](https://github.com/openclaw/openclaw/issues/74469) | [Bug]: CLI 表格渲染性能严重退化 | already implemented on main | Apr 29, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/74469.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74469.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74467](https://github.com/openclaw/openclaw/issues/74467) | [Bug]: | already implemented on main | Apr 29, 2026, 16:21 UTC | [records/openclaw-openclaw/closed/74467.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74467.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68714](https://github.com/openclaw/openclaw/pull/68714) | fix(config): openclaw.json written with 0664 mode instead of 0600 after hot-save | cannot reproduce on current main | Apr 29, 2026, 16:13 UTC | [records/openclaw-openclaw/closed/68714.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68714.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68620](https://github.com/openclaw/openclaw/issues/68620) | Stuck session not auto-killed — API call hung for 49 minutes blocking Telegram session | duplicate or superseded | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68620.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68620.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68619](https://github.com/openclaw/openclaw/issues/68619) | `openclaw docs` fails on macOS — TLS handshake error against docs.openclaw.ai | cannot reproduce on current main | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68619.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68619.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68562](https://github.com/openclaw/openclaw/issues/68562) | memory-core: narrative session cleanup logs spurious warning when subagent runtime is request-scoped | already implemented on main | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68562.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68562.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68481](https://github.com/openclaw/openclaw/pull/68481) | fix(auto-reply): don't drop URL messages when link-understanding import fails | already implemented on main | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68481.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68481.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74465](https://github.com/openclaw/openclaw/pull/74465) | fix(google): prevent empty contents error for gemini | kept open | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/74465.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74465.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1243](https://github.com/openclaw/clawhub/issues/1243) | Search: skill with 'phone' and 'voice' tags not surfacing when searching those terms | high | candidate | Apr 29, 2026, 16:19 UTC | [records/openclaw-clawhub/items/1243.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1243.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 16:14 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 16:12 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 16:12 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1683](https://github.com/openclaw/clawhub/issues/1683) | 显示 @yangzhichao814-cell/ apexsearch的重复项 | high | candidate | Apr 29, 2026, 16:12 UTC | [records/openclaw-clawhub/items/1683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1683.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 16:11 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 16:10 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 16:08 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 16:08 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 16:07 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 16:06 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 16:06 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#18](https://github.com/openclaw/clawhub/issues/18) | Skill detail view: Mobile view broken | high | candidate | Apr 29, 2026, 16:06 UTC | [records/openclaw-clawhub/items/18.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/18.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 16:05 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74459](https://github.com/openclaw/openclaw/issues/74459) | [Bug]: `cron edit` persists invalid `--cron` expressions on disabled jobs and can leave them enabled after failed enable | high | candidate | Apr 29, 2026, 16:00 UTC | [records/openclaw-openclaw/items/74459.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74459.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74430](https://github.com/openclaw/openclaw/pull/74430) | [Feat] Add upload archive install RPC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74430.md) | complete | Apr 29, 2026, 16:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74474](https://github.com/openclaw/openclaw/pull/74474) | [codex] fix(markdown): preserve loose list paragraphs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74474.md) | complete | Apr 29, 2026, 16:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74458](https://github.com/openclaw/openclaw/pull/74458) | fix(security): block workspace env from overriding Windows system root paths [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74458.md) | complete | Apr 29, 2026, 16:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 29, 2026, 16:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74428](https://github.com/openclaw/openclaw/pull/74428) | [codex] fix(mcp): restrict serve scope selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74428.md) | complete | Apr 29, 2026, 16:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73122](https://github.com/openclaw/openclaw/pull/73122) | test claude-cli backend registration guardrails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73122.md) | complete | Apr 29, 2026, 16:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74471](https://github.com/openclaw/openclaw/pull/74471) | infra: fix heartbeat directive preservation and global enablement | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74471.md) | complete | Apr 29, 2026, 16:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74472](https://github.com/openclaw/openclaw/pull/74472) | fix(gateway): keep native approvals off stale pairing baselines | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74472.md) | complete | Apr 29, 2026, 16:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 29, 2026, 16:34 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74051](https://github.com/openclaw/openclaw/pull/74051) | fix(memory): keep daily signals out of recall gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74051.md) | complete | Apr 29, 2026, 16:34 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 16:45 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25121774072](https://github.com/openclaw/clawsweeper/actions/runs/25121774072)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3365 |
| Open PRs | 3224 |
| Open items total | 6589 |
| Reviewed files | 6589 |
| Unreviewed open items | 0 |
| Archived closed files | 14387 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3360 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3220 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6580 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 759 |
| Closed by Codex apply | 10825 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 121/1111 current (990 due, 10.9%) |
| Hourly hot item cadence (<7d) | 121/1111 current (990 due, 10.9%) |
| Daily cadence coverage | 2237/3672 current (1435 due, 60.9%) |
| Daily PR cadence | 1527/2565 current (1038 due, 59.5%) |
| Daily new issue cadence (<30d) | 710/1107 current (397 due, 64.1%) |
| Weekly older issue cadence | 1804/1806 current (2 due, 99.9%) |
| Due now by cadence | 2427 |

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

Latest review: Apr 29, 2026, 16:42 UTC. Latest close: Apr 29, 2026, 16:43 UTC. Latest comment sync: Apr 29, 2026, 16:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 14 | 2 | 12 | 0 | 2 | 16 | 1 |
| Last hour | 466 | 17 | 449 | 3 | 23 | 428 | 2 |
| Last 24 hours | 5244 | 362 | 4882 | 5 | 749 | 1345 | 30 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74475](https://github.com/openclaw/openclaw/pull/74475) | fix(tts): synthesize tagged hidden text under short-skip threshold (#73758) | duplicate or superseded | Apr 29, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/74475.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74475.md) |
| [#74464](https://github.com/openclaw/openclaw/pull/74464) | fix: The commit introduces imports from `src/channels/plugins/dm-acces | already closed before apply | Apr 29, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/74464.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74464.md) |
| [#74469](https://github.com/openclaw/openclaw/issues/74469) | [Bug]: CLI 表格渲染性能严重退化 | already implemented on main | Apr 29, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/74469.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74469.md) |
| [#74467](https://github.com/openclaw/openclaw/issues/74467) | [Bug]: | already implemented on main | Apr 29, 2026, 16:21 UTC | [records/openclaw-openclaw/closed/74467.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74467.md) |
| [#68714](https://github.com/openclaw/openclaw/pull/68714) | fix(config): openclaw.json written with 0664 mode instead of 0600 after hot-save | cannot reproduce on current main | Apr 29, 2026, 16:13 UTC | [records/openclaw-openclaw/closed/68714.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68714.md) |
| [#68620](https://github.com/openclaw/openclaw/issues/68620) | Stuck session not auto-killed — API call hung for 49 minutes blocking Telegram session | duplicate or superseded | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68620.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68620.md) |
| [#68619](https://github.com/openclaw/openclaw/issues/68619) | `openclaw docs` fails on macOS — TLS handshake error against docs.openclaw.ai | cannot reproduce on current main | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68619.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68619.md) |
| [#68562](https://github.com/openclaw/openclaw/issues/68562) | memory-core: narrative session cleanup logs spurious warning when subagent runtime is request-scoped | already implemented on main | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68562.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68562.md) |
| [#68481](https://github.com/openclaw/openclaw/pull/68481) | fix(auto-reply): don't drop URL messages when link-understanding import fails | already implemented on main | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/68481.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68481.md) |
| [#74465](https://github.com/openclaw/openclaw/pull/74465) | fix(google): prevent empty contents error for gemini | kept open | Apr 29, 2026, 16:12 UTC | [records/openclaw-openclaw/closed/74465.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74465.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74459](https://github.com/openclaw/openclaw/issues/74459) | [Bug]: `cron edit` persists invalid `--cron` expressions on disabled jobs and can leave them enabled after failed enable | high | candidate | Apr 29, 2026, 16:00 UTC | [records/openclaw-openclaw/items/74459.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74459.md) |
| [#68738](https://github.com/openclaw/openclaw/issues/68738) | readPageSummaries: no concurrency limit on fs.readFile, triggers EDEADLK on iCloud/FileProvider-backed vaults | high | candidate | Apr 29, 2026, 16:00 UTC | [records/openclaw-openclaw/items/68738.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68738.md) |
| [#68391](https://github.com/openclaw/openclaw/issues/68391) | CLI: `openclaw models --agent <id> set` silently writes to global default instead of agent scope | high | candidate | Apr 29, 2026, 15:59 UTC | [records/openclaw-openclaw/items/68391.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68391.md) |
| [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 29, 2026, 15:58 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [#68590](https://github.com/openclaw/openclaw/pull/68590) | fix(memory-core): rewrite qmd index on managed collection repair | high | candidate | Apr 29, 2026, 15:58 UTC | [records/openclaw-openclaw/items/68590.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68590.md) |
| [#70563](https://github.com/openclaw/openclaw/issues/70563) | Subagent spawn fails: thinking enabled but reasoning_content missing | high | candidate | Apr 29, 2026, 15:54 UTC | [records/openclaw-openclaw/items/70563.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70563.md) |
| [#68565](https://github.com/openclaw/openclaw/pull/68565) | fix(agents/anthropic-replay): preserve signed/redacted thinking block… | high | candidate | Apr 29, 2026, 15:54 UTC | [records/openclaw-openclaw/items/68565.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68565.md) |
| [#70014](https://github.com/openclaw/openclaw/issues/70014) | [Bug] Dreaming does not process the primary agent workspace | high | candidate | Apr 29, 2026, 15:53 UTC | [records/openclaw-openclaw/items/70014.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70014.md) |
| [#68575](https://github.com/openclaw/openclaw/pull/68575) | fix(telegram): reset sessions after unrecoverable context overflow | high | candidate | Apr 29, 2026, 15:53 UTC | [records/openclaw-openclaw/items/68575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68575.md) |
| [#68046](https://github.com/openclaw/openclaw/pull/68046) | fix: pass through image/audio/resource content blocks in MCP HTTP gateway | high | candidate | Apr 29, 2026, 15:53 UTC | [records/openclaw-openclaw/items/68046.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68046.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74430](https://github.com/openclaw/openclaw/pull/74430) | [Feat] Add upload archive install RPC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74430.md) | complete | Apr 29, 2026, 16:42 UTC |
| [#74474](https://github.com/openclaw/openclaw/pull/74474) | [codex] fix(markdown): preserve loose list paragraphs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74474.md) | complete | Apr 29, 2026, 16:42 UTC |
| [#74458](https://github.com/openclaw/openclaw/pull/74458) | fix(security): block workspace env from overriding Windows system root paths [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74458.md) | complete | Apr 29, 2026, 16:41 UTC |
| [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 29, 2026, 16:37 UTC |
| [#74428](https://github.com/openclaw/openclaw/pull/74428) | [codex] fix(mcp): restrict serve scope selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74428.md) | complete | Apr 29, 2026, 16:37 UTC |
| [#73122](https://github.com/openclaw/openclaw/pull/73122) | test claude-cli backend registration guardrails | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73122.md) | complete | Apr 29, 2026, 16:36 UTC |
| [#74471](https://github.com/openclaw/openclaw/pull/74471) | infra: fix heartbeat directive preservation and global enablement | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74471.md) | complete | Apr 29, 2026, 16:36 UTC |
| [#74472](https://github.com/openclaw/openclaw/pull/74472) | fix(gateway): keep native approvals off stale pairing baselines | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74472.md) | complete | Apr 29, 2026, 16:35 UTC |
| [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 29, 2026, 16:34 UTC |
| [#74051](https://github.com/openclaw/openclaw/pull/74051) | fix(memory): keep daily signals out of recall gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74051.md) | complete | Apr 29, 2026, 16:34 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 16:44 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 407. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,65,72,77,79,84,86,88,95,96,97,99,100,102,115,117,120,127,128,129,131,134,137,156,162,169,170,171,173,174,178,184,192,205,211,224,225,226,231,234,236,237,238,243,256,265,268,277,279,287,288,290,314,321,323,329,345,348,349,351,353,364,367,369,373,378,380,382,385,386,393,397,410,420,423,425,437,438,443,454,471,479,488,489,494,495,498,503,516,528,553,567,568,573,574,575,580,581,586,606,615,625,631,651,652,661,664,670,679,702,705,756,758,765,789,822,849,853,856,861,867,887,888,912,939,940,966,1002,1007,1011,1017,1018,1021,1028,1038,1039,1040,1043,1045,1046,1047,1052,1061,1064,1068,1070,1072,1075,1084,1088,1090,1091,1094,1097,1098,1104,1106,1107,1111,1112,1114,1119,1122,1126,1128,1131,1133,1140,1145,1146,1147,1148,1154,1156,1159,1177,1179,1188,1195,1201,1204,1206,1208,1210,1211,1212,1217,1218,1219,1222,1223,1224,1226,1227,1229,1231,1233,1235,1236,1237,1239,1243,1244,1247,1249,1250,1254,1256,1257,1260,1261,1264,1265,1266,1267,1268,1269,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1282,1285,1287,1288,1289,1290,1292,1293,1294,1296,1298,1299,1301,1302,1307,1308,1309,1310,1312,1313,1314,1315,1316,1318,1320,1325,1326,1329,1334,1336,1338,1341,1345,1347,1350,1351,1353,1354,1358,1361,1364,1366,1367,1368,1370,1371,1374,1377,1378,1379,1381,1382,1383,1384,1385,1387,1391,1392,1393,1394,1397,1398,1400,1401,1402,1403,1404,1405,1406,1408,1409,1410,1411,1412,1413,1414,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1428,1430,1431,1432,1433,1434,1435,1437,1442,1443,1444,1445,1446,1447,1448,1450,1451,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1494,1495,1500,1503,1509,1511,1515,1516,1518,1519,1520,1523,1526,1528,1529,1530,1533,1535,1538,1542,1543,1551,1553,1554,1558,1559,1563,1572,1574,1575,1576,1578,1582,1583,1584,1585,1586,1587,1588,1589,1591,1592,1594,1595,1614,1631,1632,1649,1653,1654,1658,1659,1666,1667,1668,1669,1670,1672,1673,1674,1675,1676,1677,1679,1680,1681,1682,1683,1684,1685,1689,1690,1691,1692,1694,1702,1703,1705,1706,1707,1710,1711,1712,1717,1718,1719,1720,1721,1725,1726,1733,1734,1735,1738,1741,1742,1743,1744,1745,1746,1748,1751,1755,1756,1757,1758,1760,1761,1764,1766,1767,1768,1769,1771,1772,1781,1785,1787,1788,1789,1797,1798,1799,1806,1811,1813,1814,1815,1816,1817,1818,1819,1821,1823,1824,1826,1828,1829,1831,1833,1834,1836,1838,1868,1877,1883,1895.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25119771229](https://github.com/openclaw/clawsweeper/actions/runs/25119771229)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 888 |
| Open PRs | 34 |
| Open items total | 922 |
| Reviewed files | 922 |
| Unreviewed open items | 0 |
| Archived closed files | 24 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 881 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 915 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 46 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 28/57 current (29 due, 49.1%) |
| Hourly hot item cadence (<7d) | 28/57 current (29 due, 49.1%) |
| Daily cadence coverage | 211/212 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 190/191 current (1 due, 99.5%) |
| Weekly older issue cadence | 647/653 current (6 due, 99.1%) |
| Due now by cadence | 36 |

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

Latest review: Apr 29, 2026, 16:30 UTC. Latest close: Apr 29, 2026, 13:48 UTC. Latest comment sync: Apr 29, 2026, 16:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 407 | 0 |
| Last hour | 520 | 0 | 520 | 7 | 0 | 427 | 0 |
| Last 24 hours | 935 | 0 | 935 | 7 | 14 | 650 | 0 |

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
| [#1243](https://github.com/openclaw/clawhub/issues/1243) | Search: skill with 'phone' and 'voice' tags not surfacing when searching those terms | high | candidate | Apr 29, 2026, 16:19 UTC | [records/openclaw-clawhub/items/1243.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1243.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 16:14 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 16:12 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 16:12 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [#1683](https://github.com/openclaw/clawhub/issues/1683) | 显示 @yangzhichao814-cell/ apexsearch的重复项 | high | candidate | Apr 29, 2026, 16:12 UTC | [records/openclaw-clawhub/items/1683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1683.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 16:11 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 16:10 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 16:08 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 16:08 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 16:07 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1757](https://github.com/openclaw/clawhub/issues/1757) | Appeal: funasr-transcribe incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1757.md) | complete | Apr 29, 2026, 16:30 UTC |
| [#1447](https://github.com/openclaw/clawhub/issues/1447) | Skill \"cesto-toolkit\" incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1447.md) | complete | Apr 29, 2026, 16:28 UTC |
| [#1266](https://github.com/openclaw/clawhub/issues/1266) | VirusTotal integration shows \"Suspicious\" despite 0/63 detections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1266.md) | failed | Apr 29, 2026, 16:26 UTC |
| [#1680](https://github.com/openclaw/clawhub/issues/1680) | Clarification on ai-replace-me-check Skill flag as OpenClaw Suspicious incorrectly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1680.md) | complete | Apr 29, 2026, 16:22 UTC |
| [#1705](https://github.com/openclaw/clawhub/issues/1705) | Skill flagged as suspicious - share-onetime-link | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1705.md) | failed | Apr 29, 2026, 16:22 UTC |
| [#1672](https://github.com/openclaw/clawhub/issues/1672) | Security scan findings: credential-pattern and remote-exec hits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1672.md) | complete | Apr 29, 2026, 16:21 UTC |
| [#1401](https://github.com/openclaw/clawhub/issues/1401) | tv-indicators-analysis 错误标记 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1401.md) | complete | Apr 29, 2026, 16:21 UTC |
| [#1675](https://github.com/openclaw/clawhub/issues/1675) | Skills: support org ownership and transfer to org | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1675.md) | complete | Apr 29, 2026, 16:20 UTC |
| [#1766](https://github.com/openclaw/clawhub/issues/1766) | False Positive: Liuyao Divination Skill Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1766.md) | complete | Apr 29, 2026, 16:20 UTC |
| [#1526](https://github.com/openclaw/clawhub/issues/1526) | pop-pay flagged suspicious — capability-based classification, no malicious code found. Verified publisher path? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1526.md) | complete | Apr 29, 2026, 16:20 UTC |

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
