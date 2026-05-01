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
- **Dashboard:** `openclaw/clawsweeper-dashboard` renders the live fleet
  dashboard from this repository's durable `records/`, `jobs/`, and `results/`
  state.
- **Workflow status state:** `pnpm run status` updates tracked per-repository
  status JSON under `results/sweep-status/` so long-running workflows can publish
  progress without changing report data.
- **Audit:** `pnpm run audit` compares live GitHub state with report storage and
  can publish audit state under `results/audit/` without mutating issues or PRs.
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

Last dashboard update: May 1, 2026, 06:19 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 3655 |
| Open PRs | 3360 |
| Open items total | 7015 |
| Reviewed files | 7657 |
| Unreviewed open items | 56 |
| Due now by cadence | 1506 |
| Proposed closes awaiting apply | 7 |
| Work candidates awaiting promotion | 2418 |
| Closed by Codex apply | 11440 |
| Failed or stale reviews | 21 |
| Archived closed files | 15505 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6783 | 6728 | 55 | 1254 | 7 | 2372 | 11432 | May 1, 2026, 06:18 UTC | May 1, 2026, 06:05 UTC | 335 |
| [ClawHub](https://github.com/openclaw/clawhub) | 231 | 924 | 0 | 246 | 0 | 45 | 8 | Apr 29, 2026, 22:22 UTC | Apr 29, 2026, 17:17 UTC | 0 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 1 | 5 | 1 | 6 | 0 | 1 | 0 | May 1, 2026, 02:03 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Hot intake publish complete | May 1, 2026, 06:19 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25204550656) |
| [ClawHub](https://github.com/openclaw/clawhub) | Idle | unknown | _none_ |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: May 1, 2026, 06:18 UTC. Latest close: May 1, 2026, 06:05 UTC. Latest comment sync: May 1, 2026, 06:18 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 74 | 2 | 72 | 1 | 1 | 197 | 0 |
| Last hour | 609 | 17 | 592 | 1 | 29 | 335 | 1 |
| Last 24 hours | 6808 | 466 | 6342 | 6 | 602 | 4179 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75146](https://github.com/openclaw/openclaw/pull/75146) | fix: opt-in compaction precheck path mid-turn retry regression | closed externally after review | May 1, 2026, 06:05 UTC | [records/openclaw-openclaw/closed/75146.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75146.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74606](https://github.com/openclaw/openclaw/pull/74606) | fix(voice-call): catch speakInitialMessage rejection on answered | already closed before apply | May 1, 2026, 06:00 UTC | [records/openclaw-openclaw/closed/74606.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74606.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49989](https://github.com/openclaw/openclaw/issues/49989) | bug: Synology Chat plugin fails to deliver replies when peer ID contains channel prefix (e.g. \"synology-chat:4\") | already implemented on main | May 1, 2026, 05:57 UTC | [records/openclaw-openclaw/closed/49989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49989.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48239](https://github.com/openclaw/openclaw/issues/48239) | Telegram exec approvals can surface in the wrong agent/chat despite agentFilter=main | already implemented on main | May 1, 2026, 05:57 UTC | [records/openclaw-openclaw/closed/48239.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48239.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75449](https://github.com/openclaw/openclaw/issues/75449) | Telegram group topic responses silently dropped — model generates text but does not auto-deliver | already implemented on main | May 1, 2026, 05:54 UTC | [records/openclaw-openclaw/closed/75449.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75449.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75399](https://github.com/openclaw/openclaw/pull/75399) | fix: media-generation tool availability gate regression | closed externally after review | May 1, 2026, 05:46 UTC | [records/openclaw-openclaw/closed/75399.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75399.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75446](https://github.com/openclaw/openclaw/pull/75446) | fix: The stat-error rethrow itself is correct, but the same allowlist readers still convert n... | closed externally after review | May 1, 2026, 05:46 UTC | [records/openclaw-openclaw/closed/75446.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75446.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75230](https://github.com/openclaw/openclaw/pull/75230) | security(logging): redact payment credential fields | closed externally after review | May 1, 2026, 05:45 UTC | [records/openclaw-openclaw/closed/75230.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75230.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75282](https://github.com/openclaw/openclaw/pull/75282) | fix: TTS fallback fix removes the global plugin-disable guard for every capability provider... | closed externally after review | May 1, 2026, 05:45 UTC | [records/openclaw-openclaw/closed/75282.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75282.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75344](https://github.com/openclaw/openclaw/pull/75344) | fix: regression where commitment safety handling can disable tools for unrelated due heartbea... | closed externally after review | May 1, 2026, 05:44 UTC | [records/openclaw-openclaw/closed/75344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75344.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75462](https://github.com/openclaw/openclaw/pull/75462) | fix: log and recover from swallowed subagent completion errors | high | candidate | May 1, 2026, 06:13 UTC | [records/openclaw-openclaw/items/75462.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75462.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58445](https://github.com/openclaw/openclaw/pull/58445) | feat: add before_block_reply plugin hook for block streaming interception | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/58445.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58445.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58421](https://github.com/openclaw/openclaw/pull/58421) | feat(plugins): add optional api.resetSession() | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/58421.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58421.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75431](https://github.com/openclaw/openclaw/pull/75431) | fix: use runtimeDepSpecsIncludeAll for package.json fallback in materialization check | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75431.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75431.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74879](https://github.com/openclaw/openclaw/issues/74879) | [Bug]: Onboarding slowdown in recent versions | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74879.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75430](https://github.com/openclaw/openclaw/issues/75430) | TUI startup hangs at 100% CPU due to bundled plugin reload loop (2026.4.29) | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75430.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75430.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75400](https://github.com/openclaw/openclaw/pull/75400) | Strip OpenRouter Anthropic assistant prefill | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75400.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75400.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75416](https://github.com/openclaw/openclaw/issues/75416) | Bug: QQBot streaming + stuck session recovery deadlock causes permanent session freeze | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75416.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75416.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74860](https://github.com/openclaw/openclaw/issues/74860) | Gateway 7-second event-loop stalls on 2026.4.27 — createOpenClawTools synchronously rebuilds plugin registry + provider-auth env-var resolution per tool-creation pass | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74860.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74860.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74956](https://github.com/openclaw/openclaw/issues/74956) | [Bug]: wal-protocol hook: message:received event lacks workspaceDir/agentId, all agent data written to main workspace | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74956.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74956.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74944](https://github.com/openclaw/openclaw/issues/74944) | [bug] launchd-submitted self-update script fails with \"env: node: No such file or directory\" (npm exit 127) on macOS Homebrew installs | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74944.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75032](https://github.com/openclaw/openclaw/issues/75032) | [Feature]: Expose `installBundledRuntimeDeps: false` + make `isolatedExecutionRoot` default for bundled plugin runtime deps | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71923](https://github.com/openclaw/openclaw/pull/71923) | fix: label doctor auth warnings by agent | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/71923.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71923.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74985](https://github.com/openclaw/openclaw/issues/74985) | [Bug]: Embedded agent Kimi timeout with no fallback despite fallbacks configured in model_stack | high | candidate | May 1, 2026, 06:10 UTC | [records/openclaw-openclaw/items/74985.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74985.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75183](https://github.com/openclaw/openclaw/pull/75183) | fix: simplify bundled runtime dependency repair | high | candidate | May 1, 2026, 06:08 UTC | [records/openclaw-openclaw/items/75183.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75183.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75464](https://github.com/openclaw/openclaw/pull/75464) | fix: RTT wrapper actionable issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75464.md) | complete | May 1, 2026, 06:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74900](https://github.com/openclaw/openclaw/issues/74900) | [Feature]: stable public SDK path for embedding provider API (independent of memory-core) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74900.md) | failed | May 1, 2026, 06:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75423](https://github.com/openclaw/openclaw/pull/75423) | fix(gateway): refresh stale channel health cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75423.md) | complete | May 1, 2026, 06:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75463](https://github.com/openclaw/openclaw/pull/75463) | fix: edge case in the new prefixed-alias cache behavior | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75463.md) | complete | May 1, 2026, 06:16 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75461](https://github.com/openclaw/openclaw/pull/75461) | fix(plugin-sdk): restore reply-prefix helpers on legacy compat surface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75461.md) | complete | May 1, 2026, 06:14 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75462](https://github.com/openclaw/openclaw/pull/75462) | fix: log and recover from swallowed subagent completion errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75462.md) | complete | May 1, 2026, 06:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75441](https://github.com/openclaw/openclaw/pull/75441) | fix(config): log observe recovery write failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75441.md) | complete | May 1, 2026, 06:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74804](https://github.com/openclaw/openclaw/pull/74804) | feat(gateway): add SDK-facing tools.invoke RPC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74804.md) | complete | May 1, 2026, 06:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58387](https://github.com/openclaw/openclaw/pull/58387) | feat(webchat): autostart hidden bootstrap prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58387.md) | complete | May 1, 2026, 06:12 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75455](https://github.com/openclaw/openclaw/pull/75455) | Fix BlueBubbles DM routing when chat identifier is present | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75455.md) | complete | May 1, 2026, 06:12 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: May 1, 2026, 06:19 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25204550656 without full folder reconciliation, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25204550656](https://github.com/openclaw/clawsweeper/actions/runs/25204550656)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3439 |
| Open PRs | 3344 |
| Open items total | 6783 |
| Reviewed files | 6728 |
| Unreviewed open items | 55 |
| Archived closed files | 15479 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3395 |
| Proposed issue closes | 5 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3280 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6675 |
| Proposed closes awaiting apply | 7 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 2372 |
| Closed by Codex apply | 11432 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 371/1481 current (1110 due, 25.1%) |
| Hourly hot item cadence (<7d) | 371/1481 current (1110 due, 25.1%) |
| Daily cadence coverage | 3403/3461 current (58 due, 98.3%) |
| Daily PR cadence | 2381/2435 current (54 due, 97.8%) |
| Daily new issue cadence (<30d) | 1022/1026 current (4 due, 99.6%) |
| Weekly older issue cadence | 1755/1786 current (31 due, 98.3%) |
| Due now by cadence | 1254 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: May 1, 2026, 06:18 UTC. Latest close: May 1, 2026, 06:05 UTC. Latest comment sync: May 1, 2026, 06:18 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 74 | 2 | 72 | 1 | 1 | 197 | 0 |
| Last hour | 609 | 17 | 592 | 1 | 29 | 335 | 1 |
| Last 24 hours | 6806 | 466 | 6340 | 6 | 602 | 4177 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#75146](https://github.com/openclaw/openclaw/pull/75146) | fix: opt-in compaction precheck path mid-turn retry regression | closed externally after review | May 1, 2026, 06:05 UTC | [records/openclaw-openclaw/closed/75146.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75146.md) |
| [#74606](https://github.com/openclaw/openclaw/pull/74606) | fix(voice-call): catch speakInitialMessage rejection on answered | already closed before apply | May 1, 2026, 06:00 UTC | [records/openclaw-openclaw/closed/74606.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74606.md) |
| [#49989](https://github.com/openclaw/openclaw/issues/49989) | bug: Synology Chat plugin fails to deliver replies when peer ID contains channel prefix (e.g. \"synology-chat:4\") | already implemented on main | May 1, 2026, 05:57 UTC | [records/openclaw-openclaw/closed/49989.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49989.md) |
| [#48239](https://github.com/openclaw/openclaw/issues/48239) | Telegram exec approvals can surface in the wrong agent/chat despite agentFilter=main | already implemented on main | May 1, 2026, 05:57 UTC | [records/openclaw-openclaw/closed/48239.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48239.md) |
| [#75449](https://github.com/openclaw/openclaw/issues/75449) | Telegram group topic responses silently dropped — model generates text but does not auto-deliver | already implemented on main | May 1, 2026, 05:54 UTC | [records/openclaw-openclaw/closed/75449.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75449.md) |
| [#75399](https://github.com/openclaw/openclaw/pull/75399) | fix: media-generation tool availability gate regression | closed externally after review | May 1, 2026, 05:46 UTC | [records/openclaw-openclaw/closed/75399.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75399.md) |
| [#75446](https://github.com/openclaw/openclaw/pull/75446) | fix: The stat-error rethrow itself is correct, but the same allowlist readers still convert n... | closed externally after review | May 1, 2026, 05:46 UTC | [records/openclaw-openclaw/closed/75446.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75446.md) |
| [#75230](https://github.com/openclaw/openclaw/pull/75230) | security(logging): redact payment credential fields | closed externally after review | May 1, 2026, 05:45 UTC | [records/openclaw-openclaw/closed/75230.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75230.md) |
| [#75282](https://github.com/openclaw/openclaw/pull/75282) | fix: TTS fallback fix removes the global plugin-disable guard for every capability provider... | closed externally after review | May 1, 2026, 05:45 UTC | [records/openclaw-openclaw/closed/75282.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75282.md) |
| [#75344](https://github.com/openclaw/openclaw/pull/75344) | fix: regression where commitment safety handling can disable tools for unrelated due heartbea... | closed externally after review | May 1, 2026, 05:44 UTC | [records/openclaw-openclaw/closed/75344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75344.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#75462](https://github.com/openclaw/openclaw/pull/75462) | fix: log and recover from swallowed subagent completion errors | high | candidate | May 1, 2026, 06:13 UTC | [records/openclaw-openclaw/items/75462.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75462.md) |
| [#58445](https://github.com/openclaw/openclaw/pull/58445) | feat: add before_block_reply plugin hook for block streaming interception | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/58445.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58445.md) |
| [#58421](https://github.com/openclaw/openclaw/pull/58421) | feat(plugins): add optional api.resetSession() | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/58421.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58421.md) |
| [#75431](https://github.com/openclaw/openclaw/pull/75431) | fix: use runtimeDepSpecsIncludeAll for package.json fallback in materialization check | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75431.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75431.md) |
| [#74879](https://github.com/openclaw/openclaw/issues/74879) | [Bug]: Onboarding slowdown in recent versions | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74879.md) |
| [#75430](https://github.com/openclaw/openclaw/issues/75430) | TUI startup hangs at 100% CPU due to bundled plugin reload loop (2026.4.29) | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75430.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75430.md) |
| [#75400](https://github.com/openclaw/openclaw/pull/75400) | Strip OpenRouter Anthropic assistant prefill | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75400.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75400.md) |
| [#75416](https://github.com/openclaw/openclaw/issues/75416) | Bug: QQBot streaming + stuck session recovery deadlock causes permanent session freeze | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/75416.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75416.md) |
| [#74860](https://github.com/openclaw/openclaw/issues/74860) | Gateway 7-second event-loop stalls on 2026.4.27 — createOpenClawTools synchronously rebuilds plugin registry + provider-auth env-var resolution per tool-creation pass | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74860.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74860.md) |
| [#74956](https://github.com/openclaw/openclaw/issues/74956) | [Bug]: wal-protocol hook: message:received event lacks workspaceDir/agentId, all agent data written to main workspace | high | candidate | May 1, 2026, 06:11 UTC | [records/openclaw-openclaw/items/74956.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74956.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#75464](https://github.com/openclaw/openclaw/pull/75464) | fix: RTT wrapper actionable issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75464.md) | complete | May 1, 2026, 06:18 UTC |
| [#74900](https://github.com/openclaw/openclaw/issues/74900) | [Feature]: stable public SDK path for embedding provider API (independent of memory-core) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74900.md) | failed | May 1, 2026, 06:18 UTC |
| [#75423](https://github.com/openclaw/openclaw/pull/75423) | fix(gateway): refresh stale channel health cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75423.md) | complete | May 1, 2026, 06:18 UTC |
| [#75463](https://github.com/openclaw/openclaw/pull/75463) | fix: edge case in the new prefixed-alias cache behavior | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75463.md) | complete | May 1, 2026, 06:16 UTC |
| [#75461](https://github.com/openclaw/openclaw/pull/75461) | fix(plugin-sdk): restore reply-prefix helpers on legacy compat surface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75461.md) | complete | May 1, 2026, 06:14 UTC |
| [#75462](https://github.com/openclaw/openclaw/pull/75462) | fix: log and recover from swallowed subagent completion errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75462.md) | complete | May 1, 2026, 06:13 UTC |
| [#75441](https://github.com/openclaw/openclaw/pull/75441) | fix(config): log observe recovery write failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75441.md) | complete | May 1, 2026, 06:12 UTC |
| [#74804](https://github.com/openclaw/openclaw/pull/74804) | feat(gateway): add SDK-facing tools.invoke RPC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74804.md) | complete | May 1, 2026, 06:12 UTC |
| [#58387](https://github.com/openclaw/openclaw/pull/58387) | feat(webchat): autostart hidden bootstrap prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58387.md) | complete | May 1, 2026, 06:12 UTC |
| [#75455](https://github.com/openclaw/openclaw/pull/75455) | Fix BlueBubbles DM routing when chat identifier is present | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75455.md) | complete | May 1, 2026, 06:12 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: unknown

State: Idle

No workflow status has been published yet.
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 215 |
| Open PRs | 16 |
| Open items total | 231 |
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
| Daily cadence coverage | 0/181 current (181 due, 0%) |
| Daily PR cadence | 0/16 current (16 due, 0%) |
| Daily new issue cadence (<30d) | 0/165 current (165 due, 0%) |
| Weekly older issue cadence | 672/680 current (8 due, 98.8%) |
| Due now by cadence | 246 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
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
| Open issues | 1 |
| Open PRs | 0 |
| Open items total | 1 |
| Reviewed files | 5 |
| Unreviewed open items | 1 |
| Archived closed files | 0 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 0 |
| Proposed issue closes | 0 (- of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 5 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 5 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 1 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 0/5 current (5 due, 0%) |
| Hourly hot item cadence (<7d) | 0/5 current (5 due, 0%) |
| Daily cadence coverage | 0/0 current (0 due, -) |
| Daily PR cadence | 0/0 current (0 due, -) |
| Daily new issue cadence (<30d) | 0/0 current (0 due, -) |
| Weekly older issue cadence | 0/0 current (0 due, -) |
| Due now by cadence | 6 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawsweeper:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawsweeper:end -->

#### Latest Run Activity

Latest review: May 1, 2026, 02:03 UTC. Latest close: unknown. Latest comment sync: May 1, 2026, 02:03 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last 24 hours | 2 | 0 | 2 | 0 | 0 | 2 | 0 |

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
| [#24](https://github.com/openclaw/clawsweeper/pull/24) | fix: repair automerge merge conflicts after merge race | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/24.md) | complete | May 1, 2026, 02:03 UTC |
| [#23](https://github.com/openclaw/clawsweeper/pull/23) | fix: repair dirty automerge prs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/23.md) | complete | May 1, 2026, 01:29 UTC |
| [#20](https://github.com/openclaw/clawsweeper/pull/20) | test: suppress duplicate remaining-risk prose | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/20.md) | complete | Apr 29, 2026, 14:08 UTC |
| [#19](https://github.com/openclaw/clawsweeper/pull/19) | test: exercise automerge repair smoke | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/19.md) | complete | Apr 29, 2026, 13:41 UTC |
| [#18](https://github.com/openclaw/clawsweeper/pull/18) | docs: document clawsweeper self smoke target | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/18.md) | complete | Apr 29, 2026, 13:18 UTC |

</details>

## How It Works

ClawSweeper is split into two operational systems:

- issue/PR sweeper: scheduler, review lane, apply lane, audit, reconcile, and
  durable state publishing
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
- Commits checkpoints and machine-readable status during long runs.

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

The external dashboard is fleet-scoped. Each configured repository gets its own
record folder, status JSON, audit state, cadence counts, and recent activity
section. The dashboard repo aggregates those repository snapshots so event runs
from one repo do not hide the state of another.

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
Use `--update-dashboard` to publish the latest audit state under
`results/audit/` without making every normal status update scan all open GitHub
items. The dashboard repo renders reviewable findings such as missing eligible
records, reopened archived records, and stale reviews from that state. The
workflow refreshes audit state on a separate six-hour schedule, and it can be run
manually with `audit_dashboard=true`.

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
pnpm run apply-artifacts -- --target-repo openclaw/openclaw --artifact-dir artifacts/reviews --skip-dashboard
pnpm run audit -- --target-repo openclaw/openclaw --max-pages 250 --sample-limit 25 --update-dashboard
pnpm run reconcile -- --target-repo openclaw/openclaw --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --limit 20 --apply-kind all --skip-dashboard
```

Sync durable review comments without closing:

```bash
source ~/.profile
corepack enable
pnpm run apply-decisions -- --target-repo openclaw/openclaw --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0 --skip-dashboard
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
self-review smoke tests. Broad hot-intake sweeps cap scheduled fan-out at 50
one-item shards per run; exact event reviews still use one shard, and normal
review backfills can fan out to 100 shards when explicitly configured.

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
