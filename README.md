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

Last dashboard update: Apr 29, 2026, 16:47 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4423 |
| Open PRs | 3432 |
| Open items total | 7855 |
| Reviewed files | 7507 |
| Unreviewed open items | 351 |
| Due now by cadence | 2780 |
| Proposed closes awaiting apply | 2 |
| Work candidates awaiting promotion | 803 |
| Closed by Codex apply | 10833 |
| Failed or stale reviews | 18 |
| Archived closed files | 14418 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6928 | 6582 | 346 | 2736 | 2 | 756 | 10825 | Apr 29, 2026, 16:43 UTC | Apr 29, 2026, 16:43 UTC | 381 |
| [ClawHub](https://github.com/openclaw/clawhub) | 927 | 922 | 5 | 41 | 0 | 46 | 8 | Apr 29, 2026, 16:30 UTC | Apr 29, 2026, 13:48 UTC | 20 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 29, 2026, 16:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25120545966) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 16:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25119771229) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 16:43 UTC. Latest close: Apr 29, 2026, 16:43 UTC. Latest comment sync: Apr 29, 2026, 16:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 191 | 3 | 188 | 5 | 4 | 13 | 0 |
| Last hour | 1392 | 18 | 1374 | 12 | 28 | 401 | 1 |
| Last 24 hours | 6171 | 358 | 5813 | 14 | 766 | 1105 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74475](https://github.com/openclaw/openclaw/pull/74475) | fix(tts): synthesize tagged hidden text under short-skip threshold (#73758) | duplicate or superseded | Apr 29, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/74475.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74475.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69483](https://github.com/openclaw/openclaw/pull/69483) | feat(security): add GHSA detector-review pipeline and OpenGrep CI workflows | closed externally after review | Apr 29, 2026, 16:42 UTC | [records/openclaw-openclaw/closed/69483.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69483.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73579](https://github.com/openclaw/openclaw/pull/73579) | fix(tts): deliver WhatsApp voice notes from suppressed group replies | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/73579.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73579.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74295](https://github.com/openclaw/openclaw/pull/74295) | fix(whatsapp): use sender lid for ack reactions | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/74295.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74295.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74464](https://github.com/openclaw/openclaw/pull/74464) | fix: The commit introduces imports from `src/channels/plugins/dm-acces | already closed before apply | Apr 29, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/74464.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74464.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74469](https://github.com/openclaw/openclaw/issues/74469) | [Bug]: CLI 表格渲染性能严重退化 | already implemented on main | Apr 29, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/74469.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74469.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74426](https://github.com/openclaw/openclaw/issues/74426) | Exec tool: invalid `host:` values silently coerce to sandbox, causing agents to confabulate host-level facts | closed externally after review | Apr 29, 2026, 16:25 UTC | [records/openclaw-openclaw/closed/74426.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74426.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74468](https://github.com/openclaw/openclaw/pull/74468) | fix(exec): reject invalid host targets | closed externally after review | Apr 29, 2026, 16:25 UTC | [records/openclaw-openclaw/closed/74468.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74468.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71204](https://github.com/openclaw/openclaw/pull/71204) | feat(nvidia): add NVIDIA provider with onboarding flow | closed externally after review | Apr 29, 2026, 16:25 UTC | [records/openclaw-openclaw/closed/71204.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71204.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | closed externally after review | Apr 29, 2026, 16:23 UTC | [records/openclaw-openclaw/closed/73671.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73671.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64818](https://github.com/openclaw/openclaw/issues/64818) | openclaw update: tracked src/canvas-host/a2ui/.bundle.hash breaks preflight bisect walkback | high | candidate | Apr 29, 2026, 16:40 UTC | [records/openclaw-openclaw/items/64818.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64818.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74433](https://github.com/openclaw/openclaw/pull/74433) | fix(doctor): warn when OPENCLAW_GATEWAY_TOKEN env overrides gateway.auth.token config | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/74433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74433.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65156](https://github.com/openclaw/openclaw/issues/65156) | [Bug] Memory vector search broken in v4.11 — sqlite-vec loads but registers no functions (SQLite ABI mismatch) | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/65156.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65156.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63210](https://github.com/openclaw/openclaw/issues/63210) | [Feature]: Detect and recover from output truncation (stopReason:\"length\") in main agent sessions | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/63210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63210.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64820](https://github.com/openclaw/openclaw/pull/64820) | fix(feishu): break circular module init causing ReferenceError on group mention | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/64820.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64820.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74448](https://github.com/openclaw/openclaw/issues/74448) | Subagent task completion event fires on session-compaction (mid-task), not on actual task end — parent receives truncated mid-task frozenResultText | high | candidate | Apr 29, 2026, 16:33 UTC | [records/openclaw-openclaw/items/74448.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74448.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64903](https://github.com/openclaw/openclaw/issues/64903) | Android app crashes on NodeForegroundService startForeground with ForegroundServiceStartNotAllowedException | high | candidate | Apr 29, 2026, 16:33 UTC | [records/openclaw-openclaw/items/64903.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64903.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50776](https://github.com/openclaw/openclaw/issues/50776) | [Bug]: Slack directory reads return empty results despite valid user token and successful Slack API autoke | high | candidate | Apr 29, 2026, 16:32 UTC | [records/openclaw-openclaw/items/50776.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50776.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60824](https://github.com/openclaw/openclaw/pull/60824) | fix(config): migrate legacy acp.stream keys on load | high | candidate | Apr 29, 2026, 16:32 UTC | [records/openclaw-openclaw/items/60824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60824.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#47710](https://github.com/openclaw/openclaw/pull/47710) | fix: improve 408 timeout handling with socket retry in waitForWebLogin | high | candidate | Apr 29, 2026, 16:30 UTC | [records/openclaw-openclaw/items/47710.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47710.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53528](https://github.com/openclaw/openclaw/pull/53528) | feat: watch jobs.json for external changes to invalidate store cache | high | candidate | Apr 29, 2026, 16:30 UTC | [records/openclaw-openclaw/items/53528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53528.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45952](https://github.com/openclaw/openclaw/issues/45952) | Webchat: messages lost during WebSocket reconnect (no client-side queue/ACK) | high | candidate | Apr 29, 2026, 16:29 UTC | [records/openclaw-openclaw/items/45952.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45952.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50719](https://github.com/openclaw/openclaw/issues/50719) | [Bug]: 404 status code (body not found) | high | candidate | Apr 29, 2026, 16:29 UTC | [records/openclaw-openclaw/items/50719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50719.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65252](https://github.com/openclaw/openclaw/issues/65252) | [Feature Proposal] Real-time LSP Diagnostics: In-Editor Code Quality Feedback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65252.md) | complete | Apr 29, 2026, 16:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 16:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) | complete | Apr 29, 2026, 16:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74417](https://github.com/openclaw/openclaw/pull/74417) | fix(onboard): clarify skill credential prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74417.md) | complete | Apr 29, 2026, 16:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74474](https://github.com/openclaw/openclaw/pull/74474) | [codex] fix(markdown): preserve loose list paragraphs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74474.md) | complete | Apr 29, 2026, 16:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63062](https://github.com/openclaw/openclaw/pull/63062) | fix: apply cache_control to conversation messages on OpenRouter path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63062.md) | complete | Apr 29, 2026, 16:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74458](https://github.com/openclaw/openclaw/pull/74458) | fix(security): block workspace env from overriding Windows system root paths [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74458.md) | complete | Apr 29, 2026, 16:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74421](https://github.com/openclaw/openclaw/issues/74421) | [Bug]: Telegram voice notes not auto-transcribed despite unified inbound handling fix (#20591) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74421.md) | complete | Apr 29, 2026, 16:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52244](https://github.com/openclaw/openclaw/pull/52244) | fix(openrouter): resolve thinking/reasoning defaults for dynamic models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52244.md) | complete | Apr 29, 2026, 16:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64818](https://github.com/openclaw/openclaw/issues/64818) | openclaw update: tracked src/canvas-host/a2ui/.bundle.hash breaks preflight bisect walkback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64818.md) | complete | Apr 29, 2026, 16:40 UTC |

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

State: Review publish complete

Merged review artifacts for run 25120545966. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25120545966](https://github.com/openclaw/clawsweeper/actions/runs/25120545966)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3535 |
| Open PRs | 3393 |
| Open items total | 6928 |
| Reviewed files | 6582 |
| Unreviewed open items | 346 |
| Archived closed files | 14394 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3359 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3212 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6571 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Work candidates awaiting promotion | 756 |
| Closed by Codex apply | 10825 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 162/1105 current (943 due, 14.7%) |
| Hourly hot item cadence (<7d) | 162/1105 current (943 due, 14.7%) |
| Daily cadence coverage | 2229/3671 current (1442 due, 60.7%) |
| Daily PR cadence | 1520/2564 current (1044 due, 59.3%) |
| Daily new issue cadence (<30d) | 709/1107 current (398 due, 64%) |
| Weekly older issue cadence | 1801/1806 current (5 due, 99.7%) |
| Due now by cadence | 2736 |

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

Latest review: Apr 29, 2026, 16:43 UTC. Latest close: Apr 29, 2026, 16:43 UTC. Latest comment sync: Apr 29, 2026, 16:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 191 | 3 | 188 | 5 | 4 | 13 | 0 |
| Last hour | 872 | 18 | 854 | 5 | 28 | 381 | 1 |
| Last 24 hours | 5233 | 358 | 4875 | 7 | 752 | 859 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74475](https://github.com/openclaw/openclaw/pull/74475) | fix(tts): synthesize tagged hidden text under short-skip threshold (#73758) | duplicate or superseded | Apr 29, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/74475.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74475.md) |
| [#69483](https://github.com/openclaw/openclaw/pull/69483) | feat(security): add GHSA detector-review pipeline and OpenGrep CI workflows | closed externally after review | Apr 29, 2026, 16:42 UTC | [records/openclaw-openclaw/closed/69483.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69483.md) |
| [#73579](https://github.com/openclaw/openclaw/pull/73579) | fix(tts): deliver WhatsApp voice notes from suppressed group replies | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/73579.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73579.md) |
| [#74295](https://github.com/openclaw/openclaw/pull/74295) | fix(whatsapp): use sender lid for ack reactions | closed externally after review | Apr 29, 2026, 16:39 UTC | [records/openclaw-openclaw/closed/74295.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74295.md) |
| [#74464](https://github.com/openclaw/openclaw/pull/74464) | fix: The commit introduces imports from `src/channels/plugins/dm-acces | already closed before apply | Apr 29, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/74464.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74464.md) |
| [#74469](https://github.com/openclaw/openclaw/issues/74469) | [Bug]: CLI 表格渲染性能严重退化 | already implemented on main | Apr 29, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/74469.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74469.md) |
| [#74426](https://github.com/openclaw/openclaw/issues/74426) | Exec tool: invalid `host:` values silently coerce to sandbox, causing agents to confabulate host-level facts | closed externally after review | Apr 29, 2026, 16:25 UTC | [records/openclaw-openclaw/closed/74426.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74426.md) |
| [#74468](https://github.com/openclaw/openclaw/pull/74468) | fix(exec): reject invalid host targets | closed externally after review | Apr 29, 2026, 16:25 UTC | [records/openclaw-openclaw/closed/74468.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74468.md) |
| [#71204](https://github.com/openclaw/openclaw/pull/71204) | feat(nvidia): add NVIDIA provider with onboarding flow | closed externally after review | Apr 29, 2026, 16:25 UTC | [records/openclaw-openclaw/closed/71204.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71204.md) |
| [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | closed externally after review | Apr 29, 2026, 16:23 UTC | [records/openclaw-openclaw/closed/73671.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73671.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#64818](https://github.com/openclaw/openclaw/issues/64818) | openclaw update: tracked src/canvas-host/a2ui/.bundle.hash breaks preflight bisect walkback | high | candidate | Apr 29, 2026, 16:40 UTC | [records/openclaw-openclaw/items/64818.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64818.md) |
| [#74433](https://github.com/openclaw/openclaw/pull/74433) | fix(doctor): warn when OPENCLAW_GATEWAY_TOKEN env overrides gateway.auth.token config | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/74433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74433.md) |
| [#65156](https://github.com/openclaw/openclaw/issues/65156) | [Bug] Memory vector search broken in v4.11 — sqlite-vec loads but registers no functions (SQLite ABI mismatch) | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/65156.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65156.md) |
| [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 16:35 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [#63210](https://github.com/openclaw/openclaw/issues/63210) | [Feature]: Detect and recover from output truncation (stopReason:\"length\") in main agent sessions | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/63210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63210.md) |
| [#64820](https://github.com/openclaw/openclaw/pull/64820) | fix(feishu): break circular module init causing ReferenceError on group mention | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/64820.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64820.md) |
| [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 16:34 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [#74448](https://github.com/openclaw/openclaw/issues/74448) | Subagent task completion event fires on session-compaction (mid-task), not on actual task end — parent receives truncated mid-task frozenResultText | high | candidate | Apr 29, 2026, 16:33 UTC | [records/openclaw-openclaw/items/74448.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74448.md) |
| [#64903](https://github.com/openclaw/openclaw/issues/64903) | Android app crashes on NodeForegroundService startForeground with ForegroundServiceStartNotAllowedException | high | candidate | Apr 29, 2026, 16:33 UTC | [records/openclaw-openclaw/items/64903.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64903.md) |
| [#50776](https://github.com/openclaw/openclaw/issues/50776) | [Bug]: Slack directory reads return empty results despite valid user token and successful Slack API autoke | high | candidate | Apr 29, 2026, 16:32 UTC | [records/openclaw-openclaw/items/50776.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50776.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65252](https://github.com/openclaw/openclaw/issues/65252) | [Feature Proposal] Real-time LSP Diagnostics: In-Editor Code Quality Feedback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65252.md) | complete | Apr 29, 2026, 16:43 UTC |
| [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 16:43 UTC |
| [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) | complete | Apr 29, 2026, 16:42 UTC |
| [#74417](https://github.com/openclaw/openclaw/pull/74417) | fix(onboard): clarify skill credential prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74417.md) | complete | Apr 29, 2026, 16:42 UTC |
| [#74474](https://github.com/openclaw/openclaw/pull/74474) | [codex] fix(markdown): preserve loose list paragraphs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74474.md) | complete | Apr 29, 2026, 16:42 UTC |
| [#63062](https://github.com/openclaw/openclaw/pull/63062) | fix: apply cache_control to conversation messages on OpenRouter path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63062.md) | complete | Apr 29, 2026, 16:42 UTC |
| [#74458](https://github.com/openclaw/openclaw/pull/74458) | fix(security): block workspace env from overriding Windows system root paths [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74458.md) | complete | Apr 29, 2026, 16:41 UTC |
| [#74421](https://github.com/openclaw/openclaw/issues/74421) | [Bug]: Telegram voice notes not auto-transcribed despite unified inbound handling fix (#20591) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74421.md) | complete | Apr 29, 2026, 16:40 UTC |
| [#52244](https://github.com/openclaw/openclaw/pull/52244) | fix(openrouter): resolve thinking/reasoning defaults for dynamic models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52244.md) | complete | Apr 29, 2026, 16:40 UTC |
| [#64818](https://github.com/openclaw/openclaw/issues/64818) | openclaw update: tracked src/canvas-host/a2ui/.bundle.hash breaks preflight bisect walkback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64818.md) | complete | Apr 29, 2026, 16:40 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 16:45 UTC

State: Review in progress

Planned 408 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25121774072](https://github.com/openclaw/clawsweeper/actions/runs/25121774072)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 888 |
| Open PRs | 39 |
| Open items total | 927 |
| Reviewed files | 922 |
| Unreviewed open items | 5 |
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
| Due now by cadence | 41 |

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
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 520 | 0 | 520 | 7 | 0 | 20 | 0 |
| Last 24 hours | 935 | 0 | 935 | 7 | 14 | 243 | 0 |

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
