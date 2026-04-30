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

Last dashboard update: Apr 30, 2026, 21:27 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 3778 |
| Open PRs | 3364 |
| Open items total | 7142 |
| Reviewed files | 7656 |
| Unreviewed open items | 56 |
| Due now by cadence | 1790 |
| Proposed closes awaiting apply | 11 |
| Work candidates awaiting promotion | 1624 |
| Closed by Codex apply | 11309 |
| Failed or stale reviews | 26 |
| Archived closed files | 15309 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6785 | 6729 | 56 | 1606 | 11 | 1578 | 11301 | Apr 30, 2026, 21:12 UTC | Apr 30, 2026, 21:14 UTC | 816 |
| [ClawHub](https://github.com/openclaw/clawhub) | 357 | 924 | 0 | 181 | 0 | 45 | 8 | Apr 29, 2026, 22:22 UTC | Apr 29, 2026, 17:17 UTC | 0 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 30, 2026, 21:27 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25188392114) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 22:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25135463730) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 30, 2026, 21:12 UTC. Latest close: Apr 30, 2026, 21:14 UTC. Latest comment sync: Apr 30, 2026, 21:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 3 | 443 | 1 |
| Last hour | 777 | 25 | 752 | 7 | 22 | 816 | 3 |
| Last 24 hours | 6574 | 454 | 6120 | 24 | 652 | 3527 | 25 |

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
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75265](https://github.com/openclaw/openclaw/pull/75265) | fix(plugins): restore active-registry check before globally-disabled guard in capability provider resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75265.md) | complete | Apr 30, 2026, 21:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74686](https://github.com/openclaw/openclaw/pull/74686) | fix(gateway): add cron-list transport timing diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74686.md) | complete | Apr 30, 2026, 21:11 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73628](https://github.com/openclaw/openclaw/pull/73628) | Add sessions_yield completion truth metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73628.md) | complete | Apr 30, 2026, 21:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75264](https://github.com/openclaw/openclaw/issues/75264) | [Bug]: CLI backend (claude-cli/sonnet-4-6) + Telegram: agent stalls during file Read tool call against a wrapper path; only generic \"Something went wrong\" reaches Telegram | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75264.md) | complete | Apr 30, 2026, 21:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73394](https://github.com/openclaw/openclaw/pull/73394) | fix(codex,discord): stop duplicate channel reply when autoThread routes to a thread | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73394.md) | complete | Apr 30, 2026, 21:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72580](https://github.com/openclaw/openclaw/pull/72580) | fix(discord): preserve explicit outbound target prefixes | [close / skipped_invalid_decision](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72580.md) | complete | Apr 30, 2026, 21:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75064](https://github.com/openclaw/openclaw/pull/75064) | fix(memory): share plugin state across runtime mirrors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75064.md) | complete | Apr 30, 2026, 21:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74424](https://github.com/openclaw/openclaw/issues/74424) | [Bug]: gateway restart continuationMessage is silently dropped when restart coalesces with an in-flight restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74424.md) | failed | Apr 30, 2026, 21:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74643](https://github.com/openclaw/openclaw/pull/74643) | config: accept per-agent verboseDefault and elevatedDefault overrides (#73680) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74643.md) | complete | Apr 30, 2026, 21:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73844](https://github.com/openclaw/openclaw/pull/73844) | fix(failover): improve internal server error classification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73844.md) | complete | Apr 30, 2026, 21:06 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 30, 2026, 21:27 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 443. Item numbers: 35735,38222,38670,38683,38685,38744,38881,38923,38924,38932,38939,38945,38981,39001,39075,39117,39126,39168,39189,39231,39269,39330,39365,39372,39389,39513,39879,41195,41222,41366,41372,41418,41494,41583,41608,41740,41744,41986,42243,42290,42400,43117,43190,43238,43367,43974,43978,44049,44062,44086,44098,44111,44118,44123,44126,44129,44136,44143,44150,44165,44168,44178,44215,44223,44228,44255,44260,44281,44316,44323,44346,44348,44363,44373,44379,44510,46542,46641,46919,47518,47805,47811,47887,47979,48104,48179,48241,48532,48534,48573,48620,48641,48680,48788,48897,48915,48949,48979,49046,49251,49257,49523,49591,49788,49889,55473,56706,57524,59125,60743,62417,62956,63015,63167,63352,63411,63481,63530,63536,63552,63593,63612,63666,63673,63680,63710,63734,63740,63920,63940,63978,63990,64004,64015,64026,64027,64121,64129,64267,64268,64299,64408,64411,64427,64438,64443,64448,64530,64609,64784,65013,65040,65149,65169,65302,65331,65333,65359,65364,65382,65383,65384,65398,65409,65423,65433,65435,65452,65504,65655,65685,65692,65726,65727,65774,65906,65919,65933,65945,65963,65974,66041,66091,66119,66126,66138,66184,66235,66255,66263,66279,66339,66366,66377,66399,66432,66436,66465,66467,66468,66479,66489,66498,66612,66732,66781,66804,66830,67016,67062,67670,67680,67682,67690,67703,67709,67750,67759,67792,68176,68196,68267,68276,68278,68283,68300,68304,68307,68338,68470,68561,68587,68719,68789,68793,68815,68838,68839,68848,68896,68916,68942,68944,68982,69066,69084,69961,70472,70797,70801,70812,70823,70856,70857,70879,70894,70903,70905,70960,70991,71049,71063,71066,71127,71140,71142,71155,71156,71178,71195,71211,71326,71487,71491,71569,71581,71592,71656,71728,71803,71867,71903,71947,71973,71992,72016,72021,72031,72097,72121,72133,72176,72237,72262,72265,72277,72278,72314,72338,72373,72500,72522,72531,72532,72535,72537,72544,72545,72574,72580,72623,72634,72705,72724,72792,72794,72814,72816,72954,72957,72987,73003,73051,73097,73103,73132,73149,73152,73165,73166,73182,73247,73248,73249,73327,73338,73343,73355,73357,73378,73382,73384,73394,73416,73432,73434,73452,73467,73469,73470,73495,73500,73503,73511,73523,73546,73565,73569,73577,73587,73603,73628,73656,73659,73664,73674,73681,73726,73743,73761,73765,73768,73777,73836,73845,73859,73861,73864,73867,73874,73876,73895,73900,73901,73905,74073,74128,74144,74165,74205,74209,74234,74249,74251,74261,74286,74289,74310,74313,74315,74316,74317,74328,74343,74356,74358,74379,74382,74384,74424,74433,74449,74481,74483,74529,74537,74589,74614,74615,74617,74624,74630,74632,74635,74639,74644,74650,74659,74684,74686,74698,74699,74743,74752,74754,74757,74759,74796,74799,74817,74831,74832,74837,74853,74860,74867,74886,74919,74932,74944,74946,74948,74952,74954,74956,74963,74979,74981,74982,74990,74998,75001,75011,75030,75031,75040,75045,75052,75057,75059,75061,75063,75064,75065,75066,75067,75068,75069,75070,75071,75074,75095,75102,75103,75116,75124,75134,75137,75156,75163,75166,75168,75187,75189,75192,75197,75211,75214,75220,75260.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25188392114](https://github.com/openclaw/clawsweeper/actions/runs/25188392114)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3439 |
| Open PRs | 3346 |
| Open items total | 6785 |
| Reviewed files | 6729 |
| Unreviewed open items | 56 |
| Archived closed files | 15281 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3422 |
| Proposed issue closes | 6 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3293 |
| Proposed PR closes | 5 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6717 |
| Proposed closes awaiting apply | 11 (0.2% of fresh reviews) |
| Work candidates awaiting promotion | 1578 |
| Closed by Codex apply | 11301 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 380/1456 current (1076 due, 26.1%) |
| Hourly hot item cadence (<7d) | 380/1456 current (1076 due, 26.1%) |
| Daily cadence coverage | 3019/3492 current (473 due, 86.5%) |
| Daily PR cadence | 2071/2448 current (377 due, 84.6%) |
| Daily new issue cadence (<30d) | 948/1044 current (96 due, 90.8%) |
| Weekly older issue cadence | 1780/1781 current (1 due, 99.9%) |
| Due now by cadence | 1606 |

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

Latest review: Apr 30, 2026, 21:12 UTC. Latest close: Apr 30, 2026, 21:14 UTC. Latest comment sync: Apr 30, 2026, 21:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 3 | 443 | 1 |
| Last hour | 777 | 25 | 752 | 7 | 22 | 816 | 3 |
| Last 24 hours | 6141 | 454 | 5687 | 11 | 652 | 3129 | 25 |

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
| [#75265](https://github.com/openclaw/openclaw/pull/75265) | fix(plugins): restore active-registry check before globally-disabled guard in capability provider resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75265.md) | complete | Apr 30, 2026, 21:12 UTC |
| [#74686](https://github.com/openclaw/openclaw/pull/74686) | fix(gateway): add cron-list transport timing diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74686.md) | complete | Apr 30, 2026, 21:11 UTC |
| [#73628](https://github.com/openclaw/openclaw/pull/73628) | Add sessions_yield completion truth metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73628.md) | complete | Apr 30, 2026, 21:09 UTC |
| [#75264](https://github.com/openclaw/openclaw/issues/75264) | [Bug]: CLI backend (claude-cli/sonnet-4-6) + Telegram: agent stalls during file Read tool call against a wrapper path; only generic \"Something went wrong\" reaches Telegram | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75264.md) | complete | Apr 30, 2026, 21:09 UTC |
| [#73394](https://github.com/openclaw/openclaw/pull/73394) | fix(codex,discord): stop duplicate channel reply when autoThread routes to a thread | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73394.md) | complete | Apr 30, 2026, 21:09 UTC |
| [#72580](https://github.com/openclaw/openclaw/pull/72580) | fix(discord): preserve explicit outbound target prefixes | [close / skipped_invalid_decision](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72580.md) | complete | Apr 30, 2026, 21:08 UTC |
| [#75064](https://github.com/openclaw/openclaw/pull/75064) | fix(memory): share plugin state across runtime mirrors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75064.md) | complete | Apr 30, 2026, 21:08 UTC |
| [#74424](https://github.com/openclaw/openclaw/issues/74424) | [Bug]: gateway restart continuationMessage is silently dropped when restart coalesces with an in-flight restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74424.md) | failed | Apr 30, 2026, 21:07 UTC |
| [#74643](https://github.com/openclaw/openclaw/pull/74643) | config: accept per-agent verboseDefault and elevatedDefault overrides (#73680) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74643.md) | complete | Apr 30, 2026, 21:07 UTC |
| [#73844](https://github.com/openclaw/openclaw/pull/73844) | fix(failover): improve internal server error classification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73844.md) | complete | Apr 30, 2026, 21:06 UTC |

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
| Open issues | 339 |
| Open PRs | 18 |
| Open items total | 357 |
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
| Daily cadence coverage | 75/191 current (116 due, 39.3%) |
| Daily PR cadence | 14/18 current (4 due, 77.8%) |
| Daily new issue cadence (<30d) | 61/173 current (112 due, 35.3%) |
| Weekly older issue cadence | 665/672 current (7 due, 99%) |
| Due now by cadence | 181 |

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
| Last 24 hours | 433 | 0 | 433 | 13 | 0 | 398 | 0 |

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
