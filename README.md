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

Last dashboard update: Apr 29, 2026, 18:59 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4425 |
| Open PRs | 3457 |
| Open items total | 7882 |
| Reviewed files | 7537 |
| Unreviewed open items | 348 |
| Due now by cadence | 3153 |
| Proposed closes awaiting apply | 6 |
| Work candidates awaiting promotion | 923 |
| Closed by Codex apply | 10862 |
| Failed or stale reviews | 14 |
| Archived closed files | 14463 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6957 | 6614 | 343 | 3136 | 6 | 876 | 10854 | Apr 29, 2026, 18:55 UTC | Apr 29, 2026, 18:54 UTC | 474 |
| [ClawHub](https://github.com/openclaw/clawhub) | 925 | 920 | 5 | 14 | 0 | 46 | 8 | Apr 29, 2026, 18:48 UTC | Apr 29, 2026, 17:17 UTC | 745 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 18:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25127786715) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 18:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25127786715) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 18:55 UTC. Latest close: Apr 29, 2026, 18:54 UTC. Latest comment sync: Apr 29, 2026, 18:58 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 40 | 4 | 36 | 1 | 4 | 382 | 0 |
| Last hour | 1098 | 21 | 1077 | 9 | 22 | 1219 | 0 |
| Last 24 hours | 5803 | 342 | 5461 | 10 | 731 | 1881 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74551](https://github.com/openclaw/openclaw/pull/74551) | fix: One low-severity test-suite regression found. Runtime dotenv beha | kept open | Apr 29, 2026, 18:54 UTC | [records/openclaw-openclaw/closed/74551.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74551.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74550](https://github.com/openclaw/openclaw/issues/74550) | [Bug]: Telegram stuck session blocks processing — session stays in state=processing indefinitely (120s+), no auto-recovery | duplicate or superseded | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/closed/74550.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74550.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74549](https://github.com/openclaw/openclaw/pull/74549) | Fix Telegram EHOSTUNREACH gateway crash | kept open | Apr 29, 2026, 18:48 UTC | [records/openclaw-openclaw/closed/74549.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74549.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74538](https://github.com/openclaw/openclaw/pull/74538) | fix(device-pair): validate public setup urls | kept open | Apr 29, 2026, 18:47 UTC | [records/openclaw-openclaw/closed/74538.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74538.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74531](https://github.com/openclaw/openclaw/issues/74531) | Account Owner | not actionable in this repository | Apr 29, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/74531.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74531.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74546](https://github.com/openclaw/openclaw/issues/74546) | [Bug]: memory_search vector fallback can OOM gateway when sqlite-vec is unavailable on large memory DBs | already implemented on main | Apr 29, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/74546.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74546.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62981](https://github.com/openclaw/openclaw/issues/62981) | session file locked when gateway times out and falls back to embedded runner | closed externally after review | Apr 29, 2026, 18:38 UTC | [records/openclaw-openclaw/closed/62981.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62981.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74499](https://github.com/openclaw/openclaw/pull/74499) | fix(ollama): normalize prefixed tool-call names before Ollama dispatch | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74499.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74499.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74487](https://github.com/openclaw/openclaw/issues/74487) | [Bug]: Ollama Kimi tool call fails with \"Tool exec not found\" despite /tools showing exec | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74487.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74487.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74540](https://github.com/openclaw/openclaw/issues/74540) | Gateway crashes on EHOSTUNREACH from Telegram API (uncaught exception) | duplicate or superseded | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74540.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74540.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66657](https://github.com/openclaw/openclaw/issues/66657) | TypeError: Cannot read properties of undefined (reading 'trim') on Feishu group messages with empty content | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/66657.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66657.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60542](https://github.com/openclaw/openclaw/issues/60542) | BUG: Persisted main session row can become stale and diverge from transcript, wedging new input | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/60542.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60542.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74548.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72044](https://github.com/openclaw/openclaw/issues/72044) | DeepSeek-v4-pro thinking mode breaks on multi-turn tool-call flows (4.24 fix is incomplete) | high | candidate | Apr 29, 2026, 18:41 UTC | [records/openclaw-openclaw/items/72044.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72044.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68944](https://github.com/openclaw/openclaw/issues/68944) | [Bug]: CLI commands hang at WebSocket gateway handshake | high | candidate | Apr 29, 2026, 18:37 UTC | [records/openclaw-openclaw/items/68944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68944.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63840](https://github.com/openclaw/openclaw/pull/63840) | fix(slack): preserve thread context for Agents & Assistants DM root messages | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/63840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63840.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60485](https://github.com/openclaw/openclaw/pull/60485) | fix(feishu): accept token-verified webhook challenges | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/60485.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60485.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67443](https://github.com/openclaw/openclaw/pull/67443) | fix(status): share model resolution and lock group activation defaults | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/67443.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67443.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67750](https://github.com/openclaw/openclaw/issues/67750) | [Bug]: Successful auto-compaction can still end in a 120s embedded timeout and generic `/new` fallback | high | candidate | Apr 29, 2026, 18:35 UTC | [records/openclaw-openclaw/items/67750.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67750.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54488](https://github.com/openclaw/openclaw/issues/54488) | Session lane starvation: followup drain monopolizes session lane, blocks inbound dispatch for 20-30min | high | candidate | Apr 29, 2026, 18:35 UTC | [records/openclaw-openclaw/items/54488.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54488.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64613](https://github.com/openclaw/openclaw/issues/64613) | chat.history leaks system-level memory injection blocks to WebChat UI | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-openclaw/items/64613.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64613.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53732](https://github.com/openclaw/openclaw/issues/53732) | Bug: Fallback models echo BOOT.md instructions instead of executing them | high | candidate | Apr 29, 2026, 18:33 UTC | [records/openclaw-openclaw/items/53732.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53732.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66543](https://github.com/openclaw/openclaw/pull/66543) | fix(cron): strip internal whitespace from model IDs in cron job normalization | high | candidate | Apr 29, 2026, 18:33 UTC | [records/openclaw-openclaw/items/66543.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66543.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74503](https://github.com/openclaw/openclaw/pull/74503) | fix(agents): disable pi-agent auto-retry + thinking repetition detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74503.md) | complete | Apr 29, 2026, 18:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 18:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72984](https://github.com/openclaw/openclaw/pull/72984) | fix(subagent): resolve runtime model from subagent default instead of parent primary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72984.md) | complete | Apr 29, 2026, 18:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#36630](https://github.com/openclaw/openclaw/pull/36630) | fix(signal): complete bidirectional quote-reply support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/36630.md) | complete | Apr 29, 2026, 18:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58823](https://github.com/openclaw/openclaw/pull/58823) | fix(agents): restore global subagent model default priority over agent own model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58823.md) | complete | Apr 29, 2026, 18:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74545](https://github.com/openclaw/openclaw/pull/74545) | refactor(plugins): split loader runtime helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74545.md) | complete | Apr 29, 2026, 18:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70813](https://github.com/openclaw/openclaw/pull/70813) | feat(whatsapp): support edit and unsend actions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70813.md) | complete | Apr 29, 2026, 18:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74552](https://github.com/openclaw/openclaw/issues/74552) | [Bug]: Vision pipeline failure on macOS (M2): \"Model does not support images\" despite correct config, and \"Failed to optimize image\" persists after sharp install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74552.md) | complete | Apr 29, 2026, 18:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72115](https://github.com/openclaw/openclaw/pull/72115) | [EV-002B] Skill Workshop parity: path, TOCTOU, prompt-budget hardening | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72115.md) | complete | Apr 29, 2026, 18:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74360](https://github.com/openclaw/openclaw/pull/74360) | fix(ssrf): restrict dangerouslyAllowPrivateNetwork to self-hosted providers only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74360.md) | complete | Apr 29, 2026, 18:50 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 18:59 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25127786715](https://github.com/openclaw/clawsweeper/actions/runs/25127786715)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3539 |
| Open PRs | 3418 |
| Open items total | 6957 |
| Reviewed files | 6614 |
| Unreviewed open items | 343 |
| Archived closed files | 14437 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3367 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3238 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6605 |
| Proposed closes awaiting apply | 6 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 876 |
| Closed by Codex apply | 10854 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 99/1137 current (1038 due, 8.7%) |
| Hourly hot item cadence (<7d) | 99/1137 current (1038 due, 8.7%) |
| Daily cadence coverage | 1920/3672 current (1752 due, 52.3%) |
| Daily PR cadence | 1262/2564 current (1302 due, 49.2%) |
| Daily new issue cadence (<30d) | 658/1108 current (450 due, 59.4%) |
| Weekly older issue cadence | 1802/1805 current (3 due, 99.8%) |
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

Latest review: Apr 29, 2026, 18:55 UTC. Latest close: Apr 29, 2026, 18:54 UTC. Latest comment sync: Apr 29, 2026, 18:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 39 | 4 | 35 | 0 | 4 | 38 | 0 |
| Last hour | 595 | 21 | 574 | 4 | 22 | 474 | 0 |
| Last 24 hours | 4866 | 342 | 4524 | 5 | 716 | 967 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74551](https://github.com/openclaw/openclaw/pull/74551) | fix: One low-severity test-suite regression found. Runtime dotenv beha | kept open | Apr 29, 2026, 18:54 UTC | [records/openclaw-openclaw/closed/74551.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74551.md) |
| [#74550](https://github.com/openclaw/openclaw/issues/74550) | [Bug]: Telegram stuck session blocks processing — session stays in state=processing indefinitely (120s+), no auto-recovery | duplicate or superseded | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/closed/74550.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74550.md) |
| [#74549](https://github.com/openclaw/openclaw/pull/74549) | Fix Telegram EHOSTUNREACH gateway crash | kept open | Apr 29, 2026, 18:48 UTC | [records/openclaw-openclaw/closed/74549.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74549.md) |
| [#74538](https://github.com/openclaw/openclaw/pull/74538) | fix(device-pair): validate public setup urls | kept open | Apr 29, 2026, 18:47 UTC | [records/openclaw-openclaw/closed/74538.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74538.md) |
| [#74531](https://github.com/openclaw/openclaw/issues/74531) | Account Owner | not actionable in this repository | Apr 29, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/74531.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74531.md) |
| [#74546](https://github.com/openclaw/openclaw/issues/74546) | [Bug]: memory_search vector fallback can OOM gateway when sqlite-vec is unavailable on large memory DBs | already implemented on main | Apr 29, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/74546.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74546.md) |
| [#62981](https://github.com/openclaw/openclaw/issues/62981) | session file locked when gateway times out and falls back to embedded runner | closed externally after review | Apr 29, 2026, 18:38 UTC | [records/openclaw-openclaw/closed/62981.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62981.md) |
| [#74499](https://github.com/openclaw/openclaw/pull/74499) | fix(ollama): normalize prefixed tool-call names before Ollama dispatch | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74499.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74499.md) |
| [#74487](https://github.com/openclaw/openclaw/issues/74487) | [Bug]: Ollama Kimi tool call fails with \"Tool exec not found\" despite /tools showing exec | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74487.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74487.md) |
| [#74540](https://github.com/openclaw/openclaw/issues/74540) | Gateway crashes on EHOSTUNREACH from Telegram API (uncaught exception) | duplicate or superseded | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74540.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74540.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#66657](https://github.com/openclaw/openclaw/issues/66657) | TypeError: Cannot read properties of undefined (reading 'trim') on Feishu group messages with empty content | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/66657.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66657.md) |
| [#60542](https://github.com/openclaw/openclaw/issues/60542) | BUG: Persisted main session row can become stale and diverge from transcript, wedging new input | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/60542.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60542.md) |
| [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74548.md) |
| [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) |
| [#72044](https://github.com/openclaw/openclaw/issues/72044) | DeepSeek-v4-pro thinking mode breaks on multi-turn tool-call flows (4.24 fix is incomplete) | high | candidate | Apr 29, 2026, 18:41 UTC | [records/openclaw-openclaw/items/72044.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72044.md) |
| [#68944](https://github.com/openclaw/openclaw/issues/68944) | [Bug]: CLI commands hang at WebSocket gateway handshake | high | candidate | Apr 29, 2026, 18:37 UTC | [records/openclaw-openclaw/items/68944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68944.md) |
| [#63840](https://github.com/openclaw/openclaw/pull/63840) | fix(slack): preserve thread context for Agents & Assistants DM root messages | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/63840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63840.md) |
| [#60485](https://github.com/openclaw/openclaw/pull/60485) | fix(feishu): accept token-verified webhook challenges | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/60485.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60485.md) |
| [#67443](https://github.com/openclaw/openclaw/pull/67443) | fix(status): share model resolution and lock group activation defaults | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/67443.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67443.md) |
| [#67750](https://github.com/openclaw/openclaw/issues/67750) | [Bug]: Successful auto-compaction can still end in a 120s embedded timeout and generic `/new` fallback | high | candidate | Apr 29, 2026, 18:35 UTC | [records/openclaw-openclaw/items/67750.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67750.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74503](https://github.com/openclaw/openclaw/pull/74503) | fix(agents): disable pi-agent auto-retry + thinking repetition detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74503.md) | complete | Apr 29, 2026, 18:55 UTC |
| [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 18:55 UTC |
| [#72984](https://github.com/openclaw/openclaw/pull/72984) | fix(subagent): resolve runtime model from subagent default instead of parent primary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72984.md) | complete | Apr 29, 2026, 18:54 UTC |
| [#36630](https://github.com/openclaw/openclaw/pull/36630) | fix(signal): complete bidirectional quote-reply support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/36630.md) | complete | Apr 29, 2026, 18:54 UTC |
| [#58823](https://github.com/openclaw/openclaw/pull/58823) | fix(agents): restore global subagent model default priority over agent own model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58823.md) | complete | Apr 29, 2026, 18:53 UTC |
| [#74545](https://github.com/openclaw/openclaw/pull/74545) | refactor(plugins): split loader runtime helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74545.md) | complete | Apr 29, 2026, 18:53 UTC |
| [#70813](https://github.com/openclaw/openclaw/pull/70813) | feat(whatsapp): support edit and unsend actions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70813.md) | complete | Apr 29, 2026, 18:53 UTC |
| [#74552](https://github.com/openclaw/openclaw/issues/74552) | [Bug]: Vision pipeline failure on macOS (M2): \"Model does not support images\" despite correct config, and \"Failed to optimize image\" persists after sharp install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74552.md) | complete | Apr 29, 2026, 18:52 UTC |
| [#72115](https://github.com/openclaw/openclaw/pull/72115) | [EV-002B] Skill Workshop parity: path, TOCTOU, prompt-budget hardening | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72115.md) | complete | Apr 29, 2026, 18:52 UTC |
| [#74360](https://github.com/openclaw/openclaw/pull/74360) | fix(ssrf): restrict dangerouslyAllowPrivateNetwork to self-hosted providers only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74360.md) | complete | Apr 29, 2026, 18:50 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 18:59 UTC

State: Review in progress

Planned 384 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25127786715](https://github.com/openclaw/clawsweeper/actions/runs/25127786715)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 886 |
| Open PRs | 39 |
| Open items total | 925 |
| Reviewed files | 920 |
| Unreviewed open items | 5 |
| Archived closed files | 26 |

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
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 52/57 current (5 due, 91.2%) |
| Hourly hot item cadence (<7d) | 52/57 current (5 due, 91.2%) |
| Daily cadence coverage | 210/210 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/189 current (0 due, 100%) |
| Weekly older issue cadence | 649/653 current (4 due, 99.4%) |
| Due now by cadence | 14 |

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

Latest review: Apr 29, 2026, 18:48 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 18:58 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 1 | 0 | 344 | 0 |
| Last hour | 503 | 0 | 503 | 5 | 0 | 745 | 0 |
| Last 24 hours | 934 | 0 | 934 | 5 | 15 | 911 | 0 |

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
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 18:33 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#868](https://github.com/openclaw/clawhub/issues/868) | [Bug] clawhub sync fails: Slug is already taken | high | candidate | Apr 29, 2026, 18:32 UTC | [records/openclaw-clawhub/items/868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/868.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 18:31 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 18:30 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 18:29 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 18:29 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 18:28 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 18:00 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 17:59 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1046](https://github.com/openclaw/clawhub/issues/1046) | ClawHub skill publish issue + account sign-in problem after deleting account | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1046.md) | failed | Apr 29, 2026, 18:48 UTC |
| [#1876](https://github.com/openclaw/clawhub/issues/1876) | False positive: skill aim-blog-write | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1876.md) | failed | Apr 29, 2026, 18:42 UTC |
| [#822](https://github.com/openclaw/clawhub/issues/822) | Response to Security Flag: Soul Weaver Skill Safety Assessment and Corrections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/822.md) | failed | Apr 29, 2026, 18:41 UTC |
| [#323](https://github.com/openclaw/clawhub/issues/323) | False positive: wp-multi-tool (WordPress optimization plugin) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/323.md) | complete | Apr 29, 2026, 18:38 UTC |
| [#171](https://github.com/openclaw/clawhub/issues/171) | Managed browser time out issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/171.md) | failed | Apr 29, 2026, 18:37 UTC |
| [#1212](https://github.com/openclaw/clawhub/issues/1212) | False positive: WORKSTATION.md skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1212.md) | complete | Apr 29, 2026, 18:36 UTC |
| [#1571](https://github.com/openclaw/clawhub/issues/1571) | tender-search \"Skill flagged — suspicious patterns detected\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1571.md) | complete | Apr 29, 2026, 18:35 UTC |
| [#1617](https://github.com/openclaw/clawhub/issues/1617) | Skill format: unclear how to declare optional env variables | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1617.md) | complete | Apr 29, 2026, 18:35 UTC |
| [#1299](https://github.com/openclaw/clawhub/issues/1299) | Request hard delete of soft-deleted skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1299.md) | complete | Apr 29, 2026, 18:35 UTC |
| [#1541](https://github.com/openclaw/clawhub/issues/1541) | False positive suspicious flag on emotion-shared-experience skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1541.md) | complete | Apr 29, 2026, 18:35 UTC |

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
