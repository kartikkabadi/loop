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

Last dashboard update: Apr 29, 2026, 21:44 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4429 |
| Open PRs | 3376 |
| Open items total | 7805 |
| Reviewed files | 7442 |
| Unreviewed open items | 366 |
| Due now by cadence | 3164 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 999 |
| Closed by Codex apply | 10898 |
| Failed or stale reviews | 18 |
| Archived closed files | 14611 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6877 | 6516 | 361 | 3136 | 0 | 954 | 10890 | Apr 29, 2026, 21:39 UTC | Apr 29, 2026, 21:43 UTC | 363 |
| [ClawHub](https://github.com/openclaw/clawhub) | 928 | 923 | 5 | 25 | 0 | 44 | 8 | Apr 29, 2026, 21:42 UTC | Apr 29, 2026, 17:17 UTC | 360 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 29, 2026, 21:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25135347223) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 21:43 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25132843082) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 21:42 UTC. Latest close: Apr 29, 2026, 21:43 UTC. Latest comment sync: Apr 29, 2026, 21:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 19 | 0 | 19 | 6 | 8 | 7 | 1 |
| Last hour | 1110 | 8 | 1102 | 12 | 77 | 723 | 1 |
| Last 24 hours | 5818 | 323 | 5495 | 14 | 799 | 1257 | 28 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74525](https://github.com/openclaw/openclaw/pull/74525) | fix: Found one regression in the `/models` chat command path for agent | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/74525.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74525.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62938](https://github.com/openclaw/openclaw/pull/62938) | fix(exec-approvals): respect OPENCLAW_STATE_DIR for store paths | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/62938.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62938.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53942](https://github.com/openclaw/openclaw/issues/53942) | Allow user-level overrides for core system prompt sections | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/53942.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53942.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44023](https://github.com/openclaw/openclaw/pull/44023) | Increase agent-to-agent ping-pong cap | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/44023.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44023.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#43295](https://github.com/openclaw/openclaw/issues/43295) | Agent fails to execute rules despite knowing them - need forced rule checking mechanism | belongs on ClawHub | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/43295.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43295.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42797](https://github.com/openclaw/openclaw/pull/42797) | Gateway: narrow model picker to available providers | already implemented on main | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/42797.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42797.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53112](https://github.com/openclaw/openclaw/pull/53112) | docs(slack): warn that groupPolicy: allowlist requires channel IDs not names | closed externally after review | Apr 29, 2026, 21:36 UTC | [records/openclaw-openclaw/closed/53112.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53112.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54685](https://github.com/openclaw/openclaw/pull/54685) | Docs: add VPS admin hardening note | closed externally after review | Apr 29, 2026, 21:36 UTC | [records/openclaw-openclaw/closed/54685.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54685.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46494](https://github.com/openclaw/openclaw/issues/46494) | [Bug]: `openclaw health --json` reports Telegram `running: false` / `tokenSource: \"none\"` while `channels status --json` reports `running: true` / `tokenSource: \"config\"` | closed externally after review | Apr 29, 2026, 21:26 UTC | [records/openclaw-openclaw/closed/46494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46494.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40760](https://github.com/openclaw/openclaw/pull/40760) | fix(auto-reply): extend typing TTL and clarify timeouts [AI] | closed externally after review | Apr 29, 2026, 21:19 UTC | [records/openclaw-openclaw/closed/40760.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40760.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1188](https://github.com/openclaw/clawhub/issues/1188) | Getting \"Personal publisher not found\" when trying publish a new version of the skill | high | candidate | Apr 29, 2026, 21:26 UTC | [records/openclaw-clawhub/items/1188.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1188.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 21:25 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 21:25 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 21:24 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 21:24 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64622](https://github.com/openclaw/openclaw/pull/64622) | fix(gateway): harden agent-to-agent routing, timeout handling, and main-session metadata sanitization | high | candidate | Apr 29, 2026, 21:23 UTC | [records/openclaw-openclaw/items/64622.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64622.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 21:23 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 21:23 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74581](https://github.com/openclaw/openclaw/issues/74581) | Telegram delivery: QUOTE_TEXT_INVALID not handled, drops messages instead of retrying without native quote | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-openclaw/items/74581.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74581.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53982](https://github.com/openclaw/openclaw/issues/53982) | Nextcloud Talk bot needs --feature response to send messages (undocumented) | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-openclaw/items/53982.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53982.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74574](https://github.com/openclaw/openclaw/issues/74574) | [Bug]: browser open and browser tabs ignore --json flag in 2026.4.26 (output goes to stderr as plain text) | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-openclaw/items/74574.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74574.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74586](https://github.com/openclaw/openclaw/issues/74586) | AM embedded run aborts memory_search tool calls; classifies as timeout despite model completion | high | candidate | Apr 29, 2026, 21:21 UTC | [records/openclaw-openclaw/items/74586.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74586.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54243](https://github.com/openclaw/openclaw/issues/54243) | [Bug]: `backup create --no-include-workspace` still includes workspace contents via `~/.openclaw` state asset | high | candidate | Apr 29, 2026, 21:21 UTC | [records/openclaw-openclaw/items/54243.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54243.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1885](https://github.com/openclaw/clawhub/issues/1885) | False positive: skill aixplain-agent-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1885.md) | complete | Apr 29, 2026, 21:42 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1002](https://github.com/openclaw/clawhub/issues/1002) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1002.md) | complete | Apr 29, 2026, 21:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74593](https://github.com/openclaw/openclaw/pull/74593) | fix(plugins): mirror global-agent runtime dependency | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74593.md) | complete | Apr 29, 2026, 21:39 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#967](https://github.com/openclaw/clawhub/issues/967) | dianping-search flagged as suspicious - request manual review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/967.md) | failed | Apr 29, 2026, 21:39 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1858](https://github.com/openclaw/clawhub/pull/1858) | fix(ui): resolve relative skill README links | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1858.md) | complete | Apr 29, 2026, 21:34 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | failed | Apr 29, 2026, 21:34 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1867](https://github.com/openclaw/clawhub/pull/1867) | feat: Device Flow auth for headless environments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1867.md) | complete | Apr 29, 2026, 21:33 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1219](https://github.com/openclaw/clawhub/issues/1219) | Readdy.ai WebSite Builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1219.md) | failed | Apr 29, 2026, 21:32 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1334](https://github.com/openclaw/clawhub/issues/1334) | tool-master has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1334.md) | complete | Apr 29, 2026, 21:32 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1116](https://github.com/openclaw/clawhub/issues/1116) | Bug: Account stuck in infinite loading loop after deletion and re-authorization (Soft-delete issue) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1116.md) | complete | Apr 29, 2026, 21:32 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 21:44 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 6. Total fresh closes in this run: 6/7. Result records in checkpoint: 13, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25135347223](https://github.com/openclaw/clawsweeper/actions/runs/25135347223)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3540 |
| Open PRs | 3337 |
| Open items total | 6877 |
| Reviewed files | 6516 |
| Unreviewed open items | 361 |
| Archived closed files | 14585 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3355 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3152 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6507 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 954 |
| Closed by Codex apply | 10890 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 40/1116 current (1076 due, 3.6%) |
| Hourly hot item cadence (<7d) | 40/1116 current (1076 due, 3.6%) |
| Daily cadence coverage | 1906/3602 current (1696 due, 52.9%) |
| Daily PR cadence | 1275/2500 current (1225 due, 51%) |
| Daily new issue cadence (<30d) | 631/1102 current (471 due, 57.3%) |
| Weekly older issue cadence | 1795/1798 current (3 due, 99.8%) |
| Due now by cadence | 3136 |

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

Latest review: Apr 29, 2026, 21:39 UTC. Latest close: Apr 29, 2026, 21:43 UTC. Latest comment sync: Apr 29, 2026, 21:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 0 | 3 | 2 | 8 | 7 | 1 |
| Last hour | 501 | 8 | 493 | 3 | 77 | 363 | 1 |
| Last 24 hours | 4878 | 323 | 4555 | 5 | 784 | 860 | 28 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74525](https://github.com/openclaw/openclaw/pull/74525) | fix: Found one regression in the `/models` chat command path for agent | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/74525.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74525.md) |
| [#62938](https://github.com/openclaw/openclaw/pull/62938) | fix(exec-approvals): respect OPENCLAW_STATE_DIR for store paths | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/62938.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62938.md) |
| [#53942](https://github.com/openclaw/openclaw/issues/53942) | Allow user-level overrides for core system prompt sections | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/53942.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53942.md) |
| [#44023](https://github.com/openclaw/openclaw/pull/44023) | Increase agent-to-agent ping-pong cap | duplicate or superseded | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/44023.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44023.md) |
| [#43295](https://github.com/openclaw/openclaw/issues/43295) | Agent fails to execute rules despite knowing them - need forced rule checking mechanism | belongs on ClawHub | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/43295.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43295.md) |
| [#42797](https://github.com/openclaw/openclaw/pull/42797) | Gateway: narrow model picker to available providers | already implemented on main | Apr 29, 2026, 21:43 UTC | [records/openclaw-openclaw/closed/42797.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42797.md) |
| [#53112](https://github.com/openclaw/openclaw/pull/53112) | docs(slack): warn that groupPolicy: allowlist requires channel IDs not names | closed externally after review | Apr 29, 2026, 21:36 UTC | [records/openclaw-openclaw/closed/53112.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53112.md) |
| [#54685](https://github.com/openclaw/openclaw/pull/54685) | Docs: add VPS admin hardening note | closed externally after review | Apr 29, 2026, 21:36 UTC | [records/openclaw-openclaw/closed/54685.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54685.md) |
| [#46494](https://github.com/openclaw/openclaw/issues/46494) | [Bug]: `openclaw health --json` reports Telegram `running: false` / `tokenSource: \"none\"` while `channels status --json` reports `running: true` / `tokenSource: \"config\"` | closed externally after review | Apr 29, 2026, 21:26 UTC | [records/openclaw-openclaw/closed/46494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46494.md) |
| [#40760](https://github.com/openclaw/openclaw/pull/40760) | fix(auto-reply): extend typing TTL and clarify timeouts [AI] | closed externally after review | Apr 29, 2026, 21:19 UTC | [records/openclaw-openclaw/closed/40760.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40760.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#64622](https://github.com/openclaw/openclaw/pull/64622) | fix(gateway): harden agent-to-agent routing, timeout handling, and main-session metadata sanitization | high | candidate | Apr 29, 2026, 21:23 UTC | [records/openclaw-openclaw/items/64622.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64622.md) |
| [#74581](https://github.com/openclaw/openclaw/issues/74581) | Telegram delivery: QUOTE_TEXT_INVALID not handled, drops messages instead of retrying without native quote | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-openclaw/items/74581.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74581.md) |
| [#53982](https://github.com/openclaw/openclaw/issues/53982) | Nextcloud Talk bot needs --feature response to send messages (undocumented) | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-openclaw/items/53982.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53982.md) |
| [#74574](https://github.com/openclaw/openclaw/issues/74574) | [Bug]: browser open and browser tabs ignore --json flag in 2026.4.26 (output goes to stderr as plain text) | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-openclaw/items/74574.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74574.md) |
| [#74586](https://github.com/openclaw/openclaw/issues/74586) | AM embedded run aborts memory_search tool calls; classifies as timeout despite model completion | high | candidate | Apr 29, 2026, 21:21 UTC | [records/openclaw-openclaw/items/74586.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74586.md) |
| [#54243](https://github.com/openclaw/openclaw/issues/54243) | [Bug]: `backup create --no-include-workspace` still includes workspace contents via `~/.openclaw` state asset | high | candidate | Apr 29, 2026, 21:21 UTC | [records/openclaw-openclaw/items/54243.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54243.md) |
| [#53809](https://github.com/openclaw/openclaw/pull/53809) | fix(agents): protect shared workspace from deletion | high | candidate | Apr 29, 2026, 21:21 UTC | [records/openclaw-openclaw/items/53809.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53809.md) |
| [#44905](https://github.com/openclaw/openclaw/issues/44905) | Discord leaks internal tool-call traces (NO_REPLY, commentary, to=functions) to channel | high | candidate | Apr 29, 2026, 21:20 UTC | [records/openclaw-openclaw/items/44905.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44905.md) |
| [#54227](https://github.com/openclaw/openclaw/issues/54227) | `reusable: false` components expire per-button instead of per-panel | high | candidate | Apr 29, 2026, 21:20 UTC | [records/openclaw-openclaw/items/54227.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54227.md) |
| [#43529](https://github.com/openclaw/openclaw/pull/43529) | fix(reply): reset sessions after all-model timeout failures | high | candidate | Apr 29, 2026, 21:20 UTC | [records/openclaw-openclaw/items/43529.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/43529.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74593](https://github.com/openclaw/openclaw/pull/74593) | fix(plugins): mirror global-agent runtime dependency | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74593.md) | complete | Apr 29, 2026, 21:39 UTC |
| [#66521](https://github.com/openclaw/openclaw/pull/66521) | fix(signal): send early typing indicator before dispatch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66521.md) | failed | Apr 29, 2026, 21:32 UTC |
| [#53645](https://github.com/openclaw/openclaw/issues/53645) | 飞书消息回复引用(replyTo)有时不显示 - OpenClaw 2026.3.23-2 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53645.md) | failed | Apr 29, 2026, 21:30 UTC |
| [#54531](https://github.com/openclaw/openclaw/issues/54531) | feat: Force reply to originating channel (Telegram/Discord/WhatsApp) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54531.md) | complete | Apr 29, 2026, 21:26 UTC |
| [#74199](https://github.com/openclaw/openclaw/issues/74199) | [Bug]: runtime-deps manifest still missing 9 dist bare-imports in 2026.4.26 (follow-up to #71420) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74199.md) | complete | Apr 29, 2026, 21:25 UTC |
| [#40864](https://github.com/openclaw/openclaw/issues/40864) | [Agent-to-Agent] Add persistent message queue for reliable delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40864.md) | failed | Apr 29, 2026, 21:24 UTC |
| [#54578](https://github.com/openclaw/openclaw/issues/54578) | Add tree view command to visualize active agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54578.md) | complete | Apr 29, 2026, 21:24 UTC |
| [#73567](https://github.com/openclaw/openclaw/pull/73567) | fix(qqbot): re-evaluate routing bindings per inbound message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73567.md) | complete | Apr 29, 2026, 21:24 UTC |
| [#64622](https://github.com/openclaw/openclaw/pull/64622) | fix(gateway): harden agent-to-agent routing, timeout handling, and main-session metadata sanitization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64622.md) | complete | Apr 29, 2026, 21:23 UTC |
| [#67332](https://github.com/openclaw/openclaw/pull/67332) | agents: wire task/team tools with owner-only authorization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67332.md) | complete | Apr 29, 2026, 21:23 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 21:43 UTC

State: Review publish complete

Merged review artifacts for run 25132843082. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25132843082](https://github.com/openclaw/clawsweeper/actions/runs/25132843082)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 889 |
| Open PRs | 39 |
| Open items total | 928 |
| Reviewed files | 923 |
| Unreviewed open items | 5 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 880 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 914 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 44 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 48/60 current (12 due, 80%) |
| Hourly hot item cadence (<7d) | 48/60 current (12 due, 80%) |
| Daily cadence coverage | 209/209 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 188/188 current (0 due, 100%) |
| Weekly older issue cadence | 646/654 current (8 due, 98.8%) |
| Due now by cadence | 25 |

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

Latest review: Apr 29, 2026, 21:42 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 21:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 0 | 16 | 4 | 0 | 0 | 0 |
| Last hour | 609 | 0 | 609 | 9 | 0 | 360 | 0 |
| Last 24 hours | 937 | 0 | 937 | 9 | 15 | 394 | 0 |

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
| [#1188](https://github.com/openclaw/clawhub/issues/1188) | Getting \"Personal publisher not found\" when trying publish a new version of the skill | high | candidate | Apr 29, 2026, 21:26 UTC | [records/openclaw-clawhub/items/1188.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1188.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 21:25 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 21:25 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 21:24 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 21:24 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 21:23 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 21:23 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 21:22 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 21:20 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1885](https://github.com/openclaw/clawhub/issues/1885) | False positive: skill aixplain-agent-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1885.md) | complete | Apr 29, 2026, 21:42 UTC |
| [#1002](https://github.com/openclaw/clawhub/issues/1002) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1002.md) | complete | Apr 29, 2026, 21:40 UTC |
| [#967](https://github.com/openclaw/clawhub/issues/967) | dianping-search flagged as suspicious - request manual review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/967.md) | failed | Apr 29, 2026, 21:39 UTC |
| [#1858](https://github.com/openclaw/clawhub/pull/1858) | fix(ui): resolve relative skill README links | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1858.md) | complete | Apr 29, 2026, 21:34 UTC |
| [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | failed | Apr 29, 2026, 21:34 UTC |
| [#1867](https://github.com/openclaw/clawhub/pull/1867) | feat: Device Flow auth for headless environments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1867.md) | complete | Apr 29, 2026, 21:33 UTC |
| [#1219](https://github.com/openclaw/clawhub/issues/1219) | Readdy.ai WebSite Builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1219.md) | failed | Apr 29, 2026, 21:32 UTC |
| [#1334](https://github.com/openclaw/clawhub/issues/1334) | tool-master has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1334.md) | complete | Apr 29, 2026, 21:32 UTC |
| [#1116](https://github.com/openclaw/clawhub/issues/1116) | Bug: Account stuck in infinite loading loop after deletion and re-authorization (Soft-delete issue) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1116.md) | complete | Apr 29, 2026, 21:32 UTC |
| [#1112](https://github.com/openclaw/clawhub/issues/1112) | Cron \"New Job\" form misaligns the Description field after interacting with Agent ID | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1112.md) | complete | Apr 29, 2026, 21:32 UTC |

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
