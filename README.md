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

Last dashboard update: Apr 30, 2026, 21:28 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4316 |
| Open PRs | 3340 |
| Open items total | 7656 |
| Reviewed files | 7656 |
| Unreviewed open items | 0 |
| Due now by cadence | 1662 |
| Proposed closes awaiting apply | 11 |
| Work candidates awaiting promotion | 1622 |
| Closed by Codex apply | 11309 |
| Failed or stale reviews | 26 |
| Archived closed files | 15309 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6729 | 6729 | 0 | 1474 | 11 | 1576 | 11301 | Apr 30, 2026, 21:25 UTC | Apr 30, 2026, 21:14 UTC | 773 |
| [ClawHub](https://github.com/openclaw/clawhub) | 924 | 924 | 0 | 185 | 0 | 45 | 8 | Apr 29, 2026, 22:22 UTC | Apr 29, 2026, 17:17 UTC | 0 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 3 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 30, 2026, 21:28 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25190204097) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 22:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25135463730) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 30, 2026, 21:25 UTC. Latest close: Apr 30, 2026, 21:14 UTC. Latest comment sync: Apr 30, 2026, 21:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 0 | 9 | 1 | 5 | 450 | 1 |
| Last hour | 879 | 25 | 854 | 8 | 24 | 773 | 3 |
| Last 24 hours | 6573 | 453 | 6120 | 25 | 654 | 3458 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75060](https://github.com/openclaw/openclaw/issues/75060) | [Bug]: execution \"direct\" config silently reverted when gateway.bind=\"lan\ | closed externally after review | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/75060.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75060.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75081](https://github.com/openclaw/openclaw/pull/75081) | fix(gateway): show config recovery validation details | closed externally after review | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/75081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75081.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73845](https://github.com/openclaw/openclaw/issues/73845) | Feature: onSessionEnd agent turn — let the agent run cleanup before session reset | closed externally after proposed_close | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/73845.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73845.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71495](https://github.com/openclaw/openclaw/issues/71495) | [Bug]: /subagents list returns empty in 2026.4.23 despite gateway tracking active subagents (regression from 4.22) | closed externally after proposed_close | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/71495.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71495.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59125](https://github.com/openclaw/openclaw/issues/59125) | [Bug]: approvals.exec.mode accepts invalid value, approvals/subagents unreliable on main and channels | closed externally after review | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/closed/59125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59125.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75263](https://github.com/openclaw/openclaw/issues/75263) | [Bug] 2026.4.27 regression: Telegram provider logs \"starting\" but never begins long-poll; inbound silently dropped, outbound still works (regression of #45714 / #69064) | closed externally after review | Apr 30, 2026, 21:07 UTC | [records/openclaw-openclaw/closed/75263.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75263.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75174](https://github.com/openclaw/openclaw/issues/75174) | [Bug]: diagnostics-otel spans don't share evt.trace.traceId — orphan root traces, broken Cloud Logging trace links | already implemented on main | Apr 30, 2026, 20:39 UTC | [records/openclaw-openclaw/closed/75174.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75174.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74895](https://github.com/openclaw/openclaw/pull/74895) | fix(telegram): remove strict SecretRef resolve in read-only token inspection | already implemented on main | Apr 30, 2026, 20:39 UTC | [records/openclaw-openclaw/closed/74895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74895.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74856](https://github.com/openclaw/openclaw/pull/74856) | fix(plugins): normalize undefined handler return to prevent TypeError on Telegram plugin commands | duplicate or superseded | Apr 30, 2026, 20:38 UTC | [records/openclaw-openclaw/closed/74856.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74856.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74852](https://github.com/openclaw/openclaw/pull/74852) | feat(gateway): add environment discovery RPCs | duplicate or superseded | Apr 30, 2026, 20:38 UTC | [records/openclaw-openclaw/closed/74852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74852.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71429](https://github.com/openclaw/openclaw/issues/71429) | [Bug] Telegram gateway drops in-flight messages on sendChatAction network failure during hot reload | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/71429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71429.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72934](https://github.com/openclaw/openclaw/issues/72934) | [Bug]: Browser snapshot action consistently times out despite successful open/navigate | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/72934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72934.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72087](https://github.com/openclaw/openclaw/issues/72087) | Bug: dist/entry.js main-path breaks Codex OAuth image generation on Linux while direct runCli()/provider path succeeds | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/72087.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72087.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71335](https://github.com/openclaw/openclaw/issues/71335) | Feature: sync.watch should default to false in gateway mode | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/71335.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71335.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72382](https://github.com/openclaw/openclaw/issues/72382) | [Bug]: General install | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/72382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72382.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71583](https://github.com/openclaw/openclaw/issues/71583) | [Bug] QQ token fetch to bots.qq.com times out across A/B uplinks (core healthy) | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/71583.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71583.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72370](https://github.com/openclaw/openclaw/issues/72370) | Workspace hooks rejected as \"cannot override openclaw-managed hook code\" and replaced with empty managed versions (2026.4.23+) | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/72370.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72370.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71417](https://github.com/openclaw/openclaw/issues/71417) | `openclaw agent` defaults --channel to last, silently resumes most recent session | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/71417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71417.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65375](https://github.com/openclaw/openclaw/issues/65375) | [LINE] Webhook handler blocks HTTP 200 response — causes request_timeout, reply token expiry, and false 429 | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/65375.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65375.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72879](https://github.com/openclaw/openclaw/issues/72879) | [Bug] thought_signature 400 regression in 2026.4.25 – fix was supposedly in 2026.4.24 | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/72879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72879.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68126](https://github.com/openclaw/openclaw/issues/68126) | Discord DM inbound sets ctx.To to channel:<id> instead of user:<id> | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/68126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68126.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73765](https://github.com/openclaw/openclaw/issues/73765) | skills.entries.*.enabled: false silently ignored on existing sessions due to stale skillsSnapshot (cache-invalidation gap) | high | candidate | Apr 30, 2026, 21:03 UTC | [records/openclaw-openclaw/items/73765.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73765.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74650](https://github.com/openclaw/openclaw/issues/74650) | [Bug]: | high | candidate | Apr 30, 2026, 21:03 UTC | [records/openclaw-openclaw/items/74650.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74650.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74860](https://github.com/openclaw/openclaw/issues/74860) | Gateway 7-second event-loop stalls on 2026.4.27 — createOpenClawTools synchronously rebuilds plugin registry + provider-auth env-var resolution per tool-creation pass | high | candidate | Apr 30, 2026, 21:02 UTC | [records/openclaw-openclaw/items/74860.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74860.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 30, 2026, 21:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72297](https://github.com/openclaw/openclaw/pull/72297) | fix(memory): warn on unverified qmd path conflicts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72297.md) | complete | Apr 30, 2026, 21:24 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74051](https://github.com/openclaw/openclaw/pull/74051) | fix(memory): keep daily signals out of recall gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74051.md) | complete | Apr 30, 2026, 21:24 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75267](https://github.com/openclaw/openclaw/pull/75267) | Fix model picker alias/provider scoped options | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75267.md) | complete | Apr 30, 2026, 21:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72883](https://github.com/openclaw/openclaw/issues/72883) | gateway config.patch blocks `diagnostics.cacheTrace.*` even with content capture disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72883.md) | failed | Apr 30, 2026, 21:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70864](https://github.com/openclaw/openclaw/pull/70864) | feat: add scoped mention pattern policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70864.md) | complete | Apr 30, 2026, 21:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75266](https://github.com/openclaw/openclaw/pull/75266) | fix: allow disabling heartbeats with false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75266.md) | complete | Apr 30, 2026, 21:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75258](https://github.com/openclaw/openclaw/pull/75258) | fix: drop reasoning payloads before reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75258.md) | complete | Apr 30, 2026, 21:16 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) | complete | Apr 30, 2026, 21:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74297](https://github.com/openclaw/openclaw/issues/74297) | auth-profiles.json: `type: \"token\"` breaks Anthropic Enterprise accounts (529 errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74297.md) | complete | Apr 30, 2026, 21:13 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 30, 2026, 21:28 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25190204097](https://github.com/openclaw/clawsweeper/actions/runs/25190204097)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3426 |
| Open PRs | 3303 |
| Open items total | 6729 |
| Reviewed files | 6729 |
| Unreviewed open items | 0 |
| Archived closed files | 15283 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3422 |
| Proposed issue closes | 6 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3294 |
| Proposed PR closes | 5 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6716 |
| Proposed closes awaiting apply | 11 (0.2% of fresh reviews) |
| Work candidates awaiting promotion | 1576 |
| Closed by Codex apply | 11301 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 456/1456 current (1000 due, 31.3%) |
| Hourly hot item cadence (<7d) | 456/1456 current (1000 due, 31.3%) |
| Daily cadence coverage | 3019/3492 current (473 due, 86.5%) |
| Daily PR cadence | 2071/2448 current (377 due, 84.6%) |
| Daily new issue cadence (<30d) | 948/1044 current (96 due, 90.8%) |
| Weekly older issue cadence | 1780/1781 current (1 due, 99.9%) |
| Due now by cadence | 1474 |

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

Latest review: Apr 30, 2026, 21:25 UTC. Latest close: Apr 30, 2026, 21:14 UTC. Latest comment sync: Apr 30, 2026, 21:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 0 | 9 | 1 | 5 | 450 | 1 |
| Last hour | 879 | 25 | 854 | 8 | 24 | 773 | 3 |
| Last 24 hours | 6142 | 453 | 5689 | 12 | 654 | 3060 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#75060](https://github.com/openclaw/openclaw/issues/75060) | [Bug]: execution \"direct\" config silently reverted when gateway.bind=\"lan\ | closed externally after review | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/75060.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75060.md) |
| [#75081](https://github.com/openclaw/openclaw/pull/75081) | fix(gateway): show config recovery validation details | closed externally after review | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/75081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75081.md) |
| [#73845](https://github.com/openclaw/openclaw/issues/73845) | Feature: onSessionEnd agent turn — let the agent run cleanup before session reset | closed externally after proposed_close | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/73845.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73845.md) |
| [#71495](https://github.com/openclaw/openclaw/issues/71495) | [Bug]: /subagents list returns empty in 2026.4.23 despite gateway tracking active subagents (regression from 4.22) | closed externally after proposed_close | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/closed/71495.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71495.md) |
| [#59125](https://github.com/openclaw/openclaw/issues/59125) | [Bug]: approvals.exec.mode accepts invalid value, approvals/subagents unreliable on main and channels | closed externally after review | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/closed/59125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59125.md) |
| [#75263](https://github.com/openclaw/openclaw/issues/75263) | [Bug] 2026.4.27 regression: Telegram provider logs \"starting\" but never begins long-poll; inbound silently dropped, outbound still works (regression of #45714 / #69064) | closed externally after review | Apr 30, 2026, 21:07 UTC | [records/openclaw-openclaw/closed/75263.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75263.md) |
| [#75174](https://github.com/openclaw/openclaw/issues/75174) | [Bug]: diagnostics-otel spans don't share evt.trace.traceId — orphan root traces, broken Cloud Logging trace links | already implemented on main | Apr 30, 2026, 20:39 UTC | [records/openclaw-openclaw/closed/75174.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75174.md) |
| [#74895](https://github.com/openclaw/openclaw/pull/74895) | fix(telegram): remove strict SecretRef resolve in read-only token inspection | already implemented on main | Apr 30, 2026, 20:39 UTC | [records/openclaw-openclaw/closed/74895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74895.md) |
| [#74856](https://github.com/openclaw/openclaw/pull/74856) | fix(plugins): normalize undefined handler return to prevent TypeError on Telegram plugin commands | duplicate or superseded | Apr 30, 2026, 20:38 UTC | [records/openclaw-openclaw/closed/74856.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74856.md) |
| [#74852](https://github.com/openclaw/openclaw/pull/74852) | feat(gateway): add environment discovery RPCs | duplicate or superseded | Apr 30, 2026, 20:38 UTC | [records/openclaw-openclaw/closed/74852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74852.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 30, 2026, 21:14 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [#71429](https://github.com/openclaw/openclaw/issues/71429) | [Bug] Telegram gateway drops in-flight messages on sendChatAction network failure during hot reload | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/71429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71429.md) |
| [#72934](https://github.com/openclaw/openclaw/issues/72934) | [Bug]: Browser snapshot action consistently times out despite successful open/navigate | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/72934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72934.md) |
| [#72087](https://github.com/openclaw/openclaw/issues/72087) | Bug: dist/entry.js main-path breaks Codex OAuth image generation on Linux while direct runCli()/provider path succeeds | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/72087.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72087.md) |
| [#71335](https://github.com/openclaw/openclaw/issues/71335) | Feature: sync.watch should default to false in gateway mode | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/71335.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71335.md) |
| [#72382](https://github.com/openclaw/openclaw/issues/72382) | [Bug]: General install | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/72382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72382.md) |
| [#71583](https://github.com/openclaw/openclaw/issues/71583) | [Bug] QQ token fetch to bots.qq.com times out across A/B uplinks (core healthy) | high | candidate | Apr 30, 2026, 21:13 UTC | [records/openclaw-openclaw/items/71583.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71583.md) |
| [#72370](https://github.com/openclaw/openclaw/issues/72370) | Workspace hooks rejected as \"cannot override openclaw-managed hook code\" and replaced with empty managed versions (2026.4.23+) | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/72370.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72370.md) |
| [#71417](https://github.com/openclaw/openclaw/issues/71417) | `openclaw agent` defaults --channel to last, silently resumes most recent session | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/71417.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71417.md) |
| [#65375](https://github.com/openclaw/openclaw/issues/65375) | [LINE] Webhook handler blocks HTTP 200 response — causes request_timeout, reply token expiry, and false 429 | high | candidate | Apr 30, 2026, 21:12 UTC | [records/openclaw-openclaw/items/65375.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65375.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 30, 2026, 21:25 UTC |
| [#72297](https://github.com/openclaw/openclaw/pull/72297) | fix(memory): warn on unverified qmd path conflicts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72297.md) | complete | Apr 30, 2026, 21:24 UTC |
| [#74051](https://github.com/openclaw/openclaw/pull/74051) | fix(memory): keep daily signals out of recall gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74051.md) | complete | Apr 30, 2026, 21:24 UTC |
| [#75267](https://github.com/openclaw/openclaw/pull/75267) | Fix model picker alias/provider scoped options | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75267.md) | complete | Apr 30, 2026, 21:22 UTC |
| [#72883](https://github.com/openclaw/openclaw/issues/72883) | gateway config.patch blocks `diagnostics.cacheTrace.*` even with content capture disabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72883.md) | failed | Apr 30, 2026, 21:20 UTC |
| [#70864](https://github.com/openclaw/openclaw/pull/70864) | feat: add scoped mention pattern policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70864.md) | complete | Apr 30, 2026, 21:20 UTC |
| [#75266](https://github.com/openclaw/openclaw/pull/75266) | fix: allow disabling heartbeats with false | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75266.md) | complete | Apr 30, 2026, 21:17 UTC |
| [#75258](https://github.com/openclaw/openclaw/pull/75258) | fix: drop reasoning payloads before reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75258.md) | complete | Apr 30, 2026, 21:16 UTC |
| [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) | complete | Apr 30, 2026, 21:14 UTC |
| [#74297](https://github.com/openclaw/openclaw/issues/74297) | auth-profiles.json: `type: \"token\"` breaks Anthropic Enterprise accounts (529 errors) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74297.md) | complete | Apr 30, 2026, 21:13 UTC |

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
| Open issues | 890 |
| Open PRs | 34 |
| Open items total | 924 |
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
| Hourly cadence coverage | 0/58 current (58 due, 0%) |
| Hourly hot item cadence (<7d) | 0/58 current (58 due, 0%) |
| Daily cadence coverage | 74/194 current (120 due, 38.1%) |
| Daily PR cadence | 14/21 current (7 due, 66.7%) |
| Daily new issue cadence (<30d) | 60/173 current (113 due, 34.7%) |
| Weekly older issue cadence | 665/672 current (7 due, 99%) |
| Due now by cadence | 185 |

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
| Last 24 hours | 431 | 0 | 431 | 13 | 0 | 398 | 0 |

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
