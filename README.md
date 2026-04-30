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

Last dashboard update: Apr 30, 2026, 01:05 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4463 |
| Open PRs | 3381 |
| Open items total | 7844 |
| Reviewed files | 7439 |
| Unreviewed open items | 408 |
| Due now by cadence | 2973 |
| Proposed closes awaiting apply | 12 |
| Work candidates awaiting promotion | 1094 |
| Closed by Codex apply | 10923 |
| Failed or stale reviews | 27 |
| Archived closed files | 14668 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6897 | 6512 | 385 | 2874 | 12 | 1048 | 10915 | Apr 30, 2026, 01:02 UTC | Apr 30, 2026, 01:02 UTC | 976 |
| [ClawHub](https://github.com/openclaw/clawhub) | 947 | 924 | 23 | 96 | 0 | 45 | 8 | Apr 29, 2026, 22:22 UTC | Apr 29, 2026, 17:17 UTC | 0 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review in progress | Apr 30, 2026, 01:05 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25141959840) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 22:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25135463730) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 30, 2026, 01:02 UTC. Latest close: Apr 30, 2026, 01:02 UTC. Latest comment sync: Apr 30, 2026, 01:03 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 17 | 2 | 15 | 0 | 7 | 482 | 0 |
| Last hour | 547 | 19 | 528 | 7 | 18 | 976 | 0 |
| Last 24 hours | 5931 | 311 | 5620 | 22 | 779 | 1946 | 19 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74511](https://github.com/openclaw/openclaw/pull/74511) | fix(models): reject suppressed inline model rows with api | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74511.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74511.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74451](https://github.com/openclaw/openclaw/issues/74451) | Regression: Codex ChatGPT accounts hard-fail when session switches to openai-codex/gpt-5.4-mini | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74451.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74451.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74655](https://github.com/openclaw/openclaw/pull/74655) | fix(models): unconditionally suppress stale openai-codex/gpt-5.4-mini inline entries (#74451) | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74655.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74655.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74453](https://github.com/openclaw/openclaw/pull/74453) | fix(voice-call): close webhook in-flight limiter fail-open on empty remote address | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74453.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73623](https://github.com/openclaw/openclaw/pull/73623) | fix: validate plugin id before writing config in plugins enable/disable | duplicate or superseded | Apr 30, 2026, 00:57 UTC | [records/openclaw-openclaw/closed/73623.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73623.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72782](https://github.com/openclaw/openclaw/pull/72782) | fix(security): replace console.warn with structured logger in windows… | closed externally after review | Apr 30, 2026, 00:55 UTC | [records/openclaw-openclaw/closed/72782.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72782.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74673](https://github.com/openclaw/openclaw/pull/74673) | fix: compatibility gaps in the new Google Vertex ADC manifest evidence | closed externally after review | Apr 30, 2026, 00:52 UTC | [records/openclaw-openclaw/closed/74673.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74673.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74657](https://github.com/openclaw/openclaw/pull/74657) | fix(google-vertex): support authorized_user ADC credentials | closed externally after review | Apr 30, 2026, 00:48 UTC | [records/openclaw-openclaw/closed/74657.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74657.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38853](https://github.com/openclaw/openclaw/issues/38853) | [Bug]: Discord channel reconnect loop triggers Cloudflare rate-limit ban (Error 1015) | closed externally after review | Apr 30, 2026, 00:47 UTC | [records/openclaw-openclaw/closed/38853.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/38853.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74489](https://github.com/openclaw/openclaw/pull/74489) | fix(discord): cool down Cloudflare 429 responses | kept open | Apr 30, 2026, 00:47 UTC | [records/openclaw-openclaw/closed/74489.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74489.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74134](https://github.com/openclaw/openclaw/pull/74134) | feat(file-transfer): add bundled plugin for binary file ops on nodes | high | candidate | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/items/74134.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74134.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64585](https://github.com/openclaw/openclaw/issues/64585) | Auto-recover stuck gateway sessions after restart | high | candidate | Apr 30, 2026, 00:37 UTC | [records/openclaw-openclaw/items/64585.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64585.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72985](https://github.com/openclaw/openclaw/issues/72985) | Cron isolated-agent: fallback chain silently delivers incomplete-turn warning, and status=error rows mark delivered=true | high | candidate | Apr 30, 2026, 00:35 UTC | [records/openclaw-openclaw/items/72985.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72985.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64920](https://github.com/openclaw/openclaw/pull/64920) | fix(feishu): route topic-group messages through per-thread sequential lanes | high | candidate | Apr 30, 2026, 00:34 UTC | [records/openclaw-openclaw/items/64920.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64920.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64274](https://github.com/openclaw/openclaw/issues/64274) | [Bug]: Agent-specific MiniMax auth resolves from main agent auth-profiles.json | high | candidate | Apr 30, 2026, 00:34 UTC | [records/openclaw-openclaw/items/64274.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64274.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73505](https://github.com/openclaw/openclaw/issues/73505) | [Bug]: Telegram streaming.mode=\"partial\" completely disabled when replyToMode is not \"off\ | high | candidate | Apr 30, 2026, 00:33 UTC | [records/openclaw-openclaw/items/73505.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73505.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68558](https://github.com/openclaw/openclaw/pull/68558) | fix(auto-reply): stop rendering misleading /compact labels on small sessions | high | candidate | Apr 30, 2026, 00:33 UTC | [records/openclaw-openclaw/items/68558.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68558.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74597](https://github.com/openclaw/openclaw/issues/74597) | Bug: update dev-channel switch can leave npm-global openclaw as source checkout symlink | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/74597.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74597.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74586](https://github.com/openclaw/openclaw/issues/74586) | AM embedded run aborts memory_search tool calls; classifies as timeout despite model completion | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/74586.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74586.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58012](https://github.com/openclaw/openclaw/issues/58012) | [Bug]: strict9 tool-call-id regression — Mistral via proxy providers fails again after provider-capabilities refactors | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/58012.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58012.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73427](https://github.com/openclaw/openclaw/issues/73427) | Control UI Realtime Talk: CSP blocks OpenAI WebRTC and UI hides realtime audio errors | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/73427.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73427.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66360](https://github.com/openclaw/openclaw/issues/66360) | session.maintenance has no size cap for transcript .jsonl files — unbounded growth causes gateway CPU 100% | high | candidate | Apr 30, 2026, 00:31 UTC | [records/openclaw-openclaw/items/66360.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66360.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50268](https://github.com/openclaw/openclaw/issues/50268) | Bug: Adding a second provider via onboard/configure unconditionally overwrites agents.defaults.model.primary, breaking existing provider (e.g. Bedrock → xAI) | high | candidate | Apr 30, 2026, 00:30 UTC | [records/openclaw-openclaw/items/50268.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50268.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73337](https://github.com/openclaw/openclaw/issues/73337) | [Bug] macOS Companion App: Canvas A2UI push returns ok but renders completely blank (regression of #7143) | high | candidate | Apr 30, 2026, 00:30 UTC | [records/openclaw-openclaw/items/73337.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73337.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55734](https://github.com/openclaw/openclaw/issues/55734) | [Bug]: OpenClaw navigates URLs into Chrome internal UI components (chrome://omnibox-popup.top-chrome/, chrome://tab-search.top-chrome/) instead of actual web tabs when using CDP mode | high | candidate | Apr 30, 2026, 00:30 UTC | [records/openclaw-openclaw/items/55734.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55734.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74134](https://github.com/openclaw/openclaw/pull/74134) | feat(file-transfer): add bundled plugin for binary file ops on nodes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74134.md) | complete | Apr 30, 2026, 01:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68433](https://github.com/openclaw/openclaw/pull/68433) | Prewarm mirrored outbound sessions before first callback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68433.md) | complete | Apr 30, 2026, 01:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74703](https://github.com/openclaw/openclaw/pull/74703) | fix: Windows-specific reliability gap in the new timeout cleanup path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74703.md) | complete | Apr 30, 2026, 01:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74641](https://github.com/openclaw/openclaw/pull/74641) | fix(acp): fall through to thread-bound resolution when token is unresolvable (#66299) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74641.md) | complete | Apr 30, 2026, 00:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74390](https://github.com/openclaw/openclaw/pull/74390) | fix(agents): skip preflight compaction for /new and /reset commands (#74227) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74390.md) | complete | Apr 30, 2026, 00:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74653](https://github.com/openclaw/openclaw/pull/74653) | fix(doctor): suppress false-positive embedding warning when probe skipped (#74608) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74653.md) | complete | Apr 30, 2026, 00:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74666](https://github.com/openclaw/openclaw/pull/74666) | fix(exec): preserve turnSourceChannel as messageProvider in approval followup runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74666.md) | complete | Apr 30, 2026, 00:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74701](https://github.com/openclaw/openclaw/issues/74701) | amazon-bedrock: `xhigh` thinking level missing for Claude Opus 4.7 (and adaptive for sonnet-4.6) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74701.md) | complete | Apr 30, 2026, 00:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73094](https://github.com/openclaw/openclaw/pull/73094) | fix: address WS handshake ordering in ACP runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73094.md) | complete | Apr 30, 2026, 00:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74686](https://github.com/openclaw/openclaw/pull/74686) | fix(gateway): add cron-list transport timing diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74686.md) | complete | Apr 30, 2026, 00:56 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 30, 2026, 01:05 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25141959840](https://github.com/openclaw/clawsweeper/actions/runs/25141959840)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3555 |
| Open PRs | 3342 |
| Open items total | 6897 |
| Reviewed files | 6512 |
| Unreviewed open items | 385 |
| Archived closed files | 14642 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3352 |
| Proposed issue closes | 7 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3146 |
| Proposed PR closes | 5 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6498 |
| Proposed closes awaiting apply | 12 (0.2% of fresh reviews) |
| Work candidates awaiting promotion | 1048 |
| Closed by Codex apply | 10915 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 116/1118 current (1002 due, 10.4%) |
| Hourly hot item cadence (<7d) | 116/1118 current (1002 due, 10.4%) |
| Daily cadence coverage | 2110/3595 current (1485 due, 58.7%) |
| Daily PR cadence | 1425/2501 current (1076 due, 57%) |
| Daily new issue cadence (<30d) | 685/1094 current (409 due, 62.6%) |
| Weekly older issue cadence | 1797/1799 current (2 due, 99.9%) |
| Due now by cadence | 2874 |

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

Latest review: Apr 30, 2026, 01:02 UTC. Latest close: Apr 30, 2026, 01:02 UTC. Latest comment sync: Apr 30, 2026, 01:03 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 17 | 2 | 15 | 0 | 7 | 482 | 0 |
| Last hour | 547 | 19 | 528 | 7 | 18 | 976 | 0 |
| Last 24 hours | 4993 | 311 | 4682 | 9 | 768 | 1534 | 19 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74511](https://github.com/openclaw/openclaw/pull/74511) | fix(models): reject suppressed inline model rows with api | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74511.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74511.md) |
| [#74451](https://github.com/openclaw/openclaw/issues/74451) | Regression: Codex ChatGPT accounts hard-fail when session switches to openai-codex/gpt-5.4-mini | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74451.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74451.md) |
| [#74655](https://github.com/openclaw/openclaw/pull/74655) | fix(models): unconditionally suppress stale openai-codex/gpt-5.4-mini inline entries (#74451) | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74655.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74655.md) |
| [#74453](https://github.com/openclaw/openclaw/pull/74453) | fix(voice-call): close webhook in-flight limiter fail-open on empty remote address | closed externally after review | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/closed/74453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74453.md) |
| [#73623](https://github.com/openclaw/openclaw/pull/73623) | fix: validate plugin id before writing config in plugins enable/disable | duplicate or superseded | Apr 30, 2026, 00:57 UTC | [records/openclaw-openclaw/closed/73623.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73623.md) |
| [#72782](https://github.com/openclaw/openclaw/pull/72782) | fix(security): replace console.warn with structured logger in windows… | closed externally after review | Apr 30, 2026, 00:55 UTC | [records/openclaw-openclaw/closed/72782.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72782.md) |
| [#74673](https://github.com/openclaw/openclaw/pull/74673) | fix: compatibility gaps in the new Google Vertex ADC manifest evidence | closed externally after review | Apr 30, 2026, 00:52 UTC | [records/openclaw-openclaw/closed/74673.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74673.md) |
| [#74657](https://github.com/openclaw/openclaw/pull/74657) | fix(google-vertex): support authorized_user ADC credentials | closed externally after review | Apr 30, 2026, 00:48 UTC | [records/openclaw-openclaw/closed/74657.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74657.md) |
| [#38853](https://github.com/openclaw/openclaw/issues/38853) | [Bug]: Discord channel reconnect loop triggers Cloudflare rate-limit ban (Error 1015) | closed externally after review | Apr 30, 2026, 00:47 UTC | [records/openclaw-openclaw/closed/38853.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/38853.md) |
| [#74489](https://github.com/openclaw/openclaw/pull/74489) | fix(discord): cool down Cloudflare 429 responses | kept open | Apr 30, 2026, 00:47 UTC | [records/openclaw-openclaw/closed/74489.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74489.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74134](https://github.com/openclaw/openclaw/pull/74134) | feat(file-transfer): add bundled plugin for binary file ops on nodes | high | candidate | Apr 30, 2026, 01:02 UTC | [records/openclaw-openclaw/items/74134.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74134.md) |
| [#64585](https://github.com/openclaw/openclaw/issues/64585) | Auto-recover stuck gateway sessions after restart | high | candidate | Apr 30, 2026, 00:37 UTC | [records/openclaw-openclaw/items/64585.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64585.md) |
| [#72985](https://github.com/openclaw/openclaw/issues/72985) | Cron isolated-agent: fallback chain silently delivers incomplete-turn warning, and status=error rows mark delivered=true | high | candidate | Apr 30, 2026, 00:35 UTC | [records/openclaw-openclaw/items/72985.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72985.md) |
| [#64920](https://github.com/openclaw/openclaw/pull/64920) | fix(feishu): route topic-group messages through per-thread sequential lanes | high | candidate | Apr 30, 2026, 00:34 UTC | [records/openclaw-openclaw/items/64920.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64920.md) |
| [#64274](https://github.com/openclaw/openclaw/issues/64274) | [Bug]: Agent-specific MiniMax auth resolves from main agent auth-profiles.json | high | candidate | Apr 30, 2026, 00:34 UTC | [records/openclaw-openclaw/items/64274.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64274.md) |
| [#73505](https://github.com/openclaw/openclaw/issues/73505) | [Bug]: Telegram streaming.mode=\"partial\" completely disabled when replyToMode is not \"off\ | high | candidate | Apr 30, 2026, 00:33 UTC | [records/openclaw-openclaw/items/73505.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73505.md) |
| [#68558](https://github.com/openclaw/openclaw/pull/68558) | fix(auto-reply): stop rendering misleading /compact labels on small sessions | high | candidate | Apr 30, 2026, 00:33 UTC | [records/openclaw-openclaw/items/68558.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68558.md) |
| [#74597](https://github.com/openclaw/openclaw/issues/74597) | Bug: update dev-channel switch can leave npm-global openclaw as source checkout symlink | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/74597.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74597.md) |
| [#74586](https://github.com/openclaw/openclaw/issues/74586) | AM embedded run aborts memory_search tool calls; classifies as timeout despite model completion | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/74586.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74586.md) |
| [#58012](https://github.com/openclaw/openclaw/issues/58012) | [Bug]: strict9 tool-call-id regression — Mistral via proxy providers fails again after provider-capabilities refactors | high | candidate | Apr 30, 2026, 00:32 UTC | [records/openclaw-openclaw/items/58012.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58012.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74134](https://github.com/openclaw/openclaw/pull/74134) | feat(file-transfer): add bundled plugin for binary file ops on nodes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74134.md) | complete | Apr 30, 2026, 01:02 UTC |
| [#68433](https://github.com/openclaw/openclaw/pull/68433) | Prewarm mirrored outbound sessions before first callback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68433.md) | complete | Apr 30, 2026, 01:02 UTC |
| [#74703](https://github.com/openclaw/openclaw/pull/74703) | fix: Windows-specific reliability gap in the new timeout cleanup path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74703.md) | complete | Apr 30, 2026, 01:02 UTC |
| [#74641](https://github.com/openclaw/openclaw/pull/74641) | fix(acp): fall through to thread-bound resolution when token is unresolvable (#66299) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74641.md) | complete | Apr 30, 2026, 00:58 UTC |
| [#74390](https://github.com/openclaw/openclaw/pull/74390) | fix(agents): skip preflight compaction for /new and /reset commands (#74227) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74390.md) | complete | Apr 30, 2026, 00:58 UTC |
| [#74653](https://github.com/openclaw/openclaw/pull/74653) | fix(doctor): suppress false-positive embedding warning when probe skipped (#74608) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74653.md) | complete | Apr 30, 2026, 00:57 UTC |
| [#74666](https://github.com/openclaw/openclaw/pull/74666) | fix(exec): preserve turnSourceChannel as messageProvider in approval followup runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74666.md) | complete | Apr 30, 2026, 00:57 UTC |
| [#74701](https://github.com/openclaw/openclaw/issues/74701) | amazon-bedrock: `xhigh` thinking level missing for Claude Opus 4.7 (and adaptive for sonnet-4.6) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74701.md) | complete | Apr 30, 2026, 00:57 UTC |
| [#73094](https://github.com/openclaw/openclaw/pull/73094) | fix: address WS handshake ordering in ACP runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73094.md) | complete | Apr 30, 2026, 00:56 UTC |
| [#74686](https://github.com/openclaw/openclaw/pull/74686) | fix(gateway): add cron-list transport timing diagnostics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74686.md) | complete | Apr 30, 2026, 00:56 UTC |

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
| Open issues | 908 |
| Open PRs | 39 |
| Open items total | 947 |
| Reviewed files | 924 |
| Unreviewed open items | 23 |
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
| Hourly cadence coverage | 0/61 current (61 due, 0%) |
| Hourly hot item cadence (<7d) | 0/61 current (61 due, 0%) |
| Daily cadence coverage | 202/207 current (5 due, 97.6%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 181/186 current (5 due, 97.3%) |
| Weekly older issue cadence | 649/656 current (7 due, 98.9%) |
| Due now by cadence | 96 |

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
| Last 24 hours | 935 | 0 | 935 | 13 | 11 | 409 | 0 |

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
