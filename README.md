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

## Dashboard

Last dashboard update: Apr 29, 2026, 14:22 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4431 |
| Open PRs | 3412 |
| Open items total | 7843 |
| Reviewed files | 7489 |
| Unreviewed open items | 357 |
| Due now by cadence | 2759 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 646 |
| Closed by Codex apply | 10790 |
| Failed or stale reviews | 39 |
| Archived closed files | 14352 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6917 | 6565 | 352 | 2691 | 0 | 602 | 10782 | Apr 29, 2026, 14:21 UTC | Apr 29, 2026, 14:22 UTC | 391 |
| [ClawHub](https://github.com/openclaw/clawhub) | 926 | 921 | 5 | 67 | 0 | 43 | 8 | Apr 29, 2026, 14:17 UTC | Apr 29, 2026, 13:48 UTC | 429 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 1 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 2 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 29, 2026, 14:22 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25114416287) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 14:20 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25114011692) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 14:21 UTC. Latest close: Apr 29, 2026, 14:22 UTC. Latest comment sync: Apr 29, 2026, 14:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 52 | 0 | 52 | 5 | 5 | 234 | 0 |
| Last hour | 1237 | 12 | 1225 | 14 | 52 | 822 | 0 |
| Last 24 hours | 6100 | 393 | 5707 | 31 | 782 | 1336 | 26 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74306](https://github.com/openclaw/openclaw/pull/74306) | fix: catch croner errors in cron gateway handlers and fix false-positive allowlist error | duplicate or superseded | Apr 29, 2026, 14:22 UTC | [records/openclaw-openclaw/closed/74306.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74306.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74344](https://github.com/openclaw/openclaw/issues/74344) | Telegram polling watchdog livelock: rebuild loop fires before runner first getUpdates | already implemented on main | Apr 29, 2026, 14:21 UTC | [records/openclaw-openclaw/closed/74344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74344.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63261](https://github.com/openclaw/openclaw/issues/63261) | [Bug]: Discord owner auth ignores channels.discord.allowFrom, hiding owner-only tools | already implemented on main | Apr 29, 2026, 14:21 UTC | [records/openclaw-openclaw/closed/63261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63261.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73700](https://github.com/openclaw/openclaw/pull/73700) | fix(cli): tolerate deleted cwd in shouldLoadCliDotEnv (#73676) | closed externally after review | Apr 29, 2026, 14:20 UTC | [records/openclaw-openclaw/closed/73700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73700.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74292](https://github.com/openclaw/openclaw/issues/74292) | active-memory embedded sub-agent WebSocket handshake timeout (all models affected) | closed externally after item changed | Apr 29, 2026, 14:12 UTC | [records/openclaw-openclaw/closed/74292.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74292.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74375](https://github.com/openclaw/openclaw/issues/74375) | [Bug]: Discord cron `announce` delivery to `user:<id>` is rewritten to `channel:<id>`, causing `Unknown Channel | already implemented on main | Apr 29, 2026, 14:02 UTC | [records/openclaw-openclaw/closed/74375.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74375.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59076](https://github.com/openclaw/openclaw/issues/59076) | JSON parse error leaked to Discord when streaming tool calls with long CJK text | closed externally after review | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/59076.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59076.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59118](https://github.com/openclaw/openclaw/pull/59118) | fix: suppress raw JSON parse errors from leaking to Discord channels (#59076) [AI-assisted] | closed externally after review | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/59118.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59118.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74287](https://github.com/openclaw/openclaw/pull/74287) | fix(providers): add moonshotai alias for moonshot provider | duplicate or superseded | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/74287.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74287.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74256](https://github.com/openclaw/openclaw/pull/74256) | Add deepseek provider-policy-api.ts | already implemented on main | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/74256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74256.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74380](https://github.com/openclaw/openclaw/issues/74380) | [Bug]: Multiple skill packages fail installation | high | candidate | Apr 29, 2026, 14:12 UTC | [records/openclaw-openclaw/items/74380.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74380.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54242](https://github.com/openclaw/openclaw/issues/54242) | [Bug]: backup archives can contain hardlink targets with '..' that fail broad extraction on macOS tar | high | candidate | Apr 29, 2026, 14:11 UTC | [records/openclaw-openclaw/items/54242.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54242.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 29, 2026, 14:09 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74378](https://github.com/openclaw/openclaw/issues/74378) | [Bug]: OpenClaw CLI commands remain alive as node.exe processes after execution on Windows | high | candidate | Apr 29, 2026, 14:08 UTC | [records/openclaw-openclaw/items/74378.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74378.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74334](https://github.com/openclaw/openclaw/issues/74334) | v2026.4.24: Stored snippet normalization mismatch with `relocateCandidateRange` causes silent rehydration failure for all post-Apr-23 promotion candidates | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74334.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74334.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63269](https://github.com/openclaw/openclaw/issues/63269) | [Bug]: Mattermost: group/public channel messages not received via WebSocket (regression in 2026.4.8) | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/63269.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63269.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74300](https://github.com/openclaw/openclaw/issues/74300) | Migration: version mismatch between source/target causes silent state incompatibility | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74300.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74312](https://github.com/openclaw/openclaw/issues/74312) | claude-cli auth-epoch flips on token rotation, forcing session resets mid-conversation | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74312.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74307](https://github.com/openclaw/openclaw/issues/74307) | [Bug]: doctor --fix recreates plugin-runtime-deps plugin-sdk as directory instead of symlink on npm/macOS install | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74307.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 14:05 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74299](https://github.com/openclaw/openclaw/issues/74299) | Telegram plugin reports \"connected\" without actually polling (false positive) | high | candidate | Apr 29, 2026, 14:05 UTC | [records/openclaw-openclaw/items/74299.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74299.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 14:05 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74313](https://github.com/openclaw/openclaw/issues/74313) | [Bug]: doctor flags live agents/main store as orphaned when default agent id is not main | high | candidate | Apr 29, 2026, 14:04 UTC | [records/openclaw-openclaw/items/74313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74313.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71382](https://github.com/openclaw/openclaw/pull/71382) | feat: add WhatsApp read-only mode | high | candidate | Apr 29, 2026, 14:03 UTC | [records/openclaw-openclaw/items/71382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71382.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74183](https://github.com/openclaw/openclaw/issues/74183) | [Feature]: MCP bundle materializer needs exponential backoff for rate-limited server init | high | candidate | Apr 29, 2026, 14:03 UTC | [records/openclaw-openclaw/items/74183.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74183.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74381](https://github.com/openclaw/openclaw/pull/74381) | refactor: centralize Discord and Slack DM access resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74381.md) | complete | Apr 29, 2026, 14:21 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74360](https://github.com/openclaw/openclaw/pull/74360) | fix(ssrf): restrict dangerouslyAllowPrivateNetwork to self-hosted providers only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74360.md) | complete | Apr 29, 2026, 14:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74384](https://github.com/openclaw/openclaw/issues/74384) | [Bug]: Plugin registerTool() tools not exposed to agent on 4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74384.md) | complete | Apr 29, 2026, 14:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74359](https://github.com/openclaw/openclaw/pull/74359) | fix(docker): replace curl\|bash Bun install with pinned multi-stage COPY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74359.md) | complete | Apr 29, 2026, 14:19 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72251](https://github.com/openclaw/openclaw/pull/72251) | fix(backup): retry on tar EOF race and skip known volatile files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72251.md) | complete | Apr 29, 2026, 14:19 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74383](https://github.com/openclaw/openclaw/pull/74383) | fix(security): classify broad Windows SIDs as world principals | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74383.md) | complete | Apr 29, 2026, 14:19 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73614.md) | complete | Apr 29, 2026, 14:18 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#625](https://github.com/openclaw/clawhub/issues/625) | Urgent: Please delete my two published skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/625.md) | complete | Apr 29, 2026, 14:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74317](https://github.com/openclaw/openclaw/pull/74317) | feat(extensions/guardrails): add a guardrails plugin for external channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74317.md) | failed | Apr 29, 2026, 14:17 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 29, 2026, 14:16 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 14:22 UTC

State: Apply finished

Apply/comment-sync run finished with 3 fresh closes out of requested limit 3. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25114416287](https://github.com/openclaw/clawsweeper/actions/runs/25114416287)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3544 |
| Open PRs | 3373 |
| Open items total | 6917 |
| Reviewed files | 6565 |
| Unreviewed open items | 352 |
| Archived closed files | 14328 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3362 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3179 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6541 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 602 |
| Closed by Codex apply | 10782 |
| Failed or stale reviews | 24 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 222/1070 current (848 due, 20.7%) |
| Hourly hot item cadence (<7d) | 222/1070 current (848 due, 20.7%) |
| Daily cadence coverage | 2205/3691 current (1486 due, 59.7%) |
| Daily PR cadence | 1601/2571 current (970 due, 62.3%) |
| Daily new issue cadence (<30d) | 604/1120 current (516 due, 53.9%) |
| Weekly older issue cadence | 1799/1804 current (5 due, 99.7%) |
| Due now by cadence | 2691 |

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

Latest review: Apr 29, 2026, 14:21 UTC. Latest close: Apr 29, 2026, 14:22 UTC. Latest comment sync: Apr 29, 2026, 14:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 31 | 0 | 31 | 4 | 5 | 27 | 0 |
| Last hour | 715 | 12 | 703 | 5 | 51 | 391 | 0 |
| Last 24 hours | 5163 | 393 | 4770 | 16 | 768 | 888 | 26 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74306](https://github.com/openclaw/openclaw/pull/74306) | fix: catch croner errors in cron gateway handlers and fix false-positive allowlist error | duplicate or superseded | Apr 29, 2026, 14:22 UTC | [records/openclaw-openclaw/closed/74306.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74306.md) |
| [#74344](https://github.com/openclaw/openclaw/issues/74344) | Telegram polling watchdog livelock: rebuild loop fires before runner first getUpdates | already implemented on main | Apr 29, 2026, 14:21 UTC | [records/openclaw-openclaw/closed/74344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74344.md) |
| [#63261](https://github.com/openclaw/openclaw/issues/63261) | [Bug]: Discord owner auth ignores channels.discord.allowFrom, hiding owner-only tools | already implemented on main | Apr 29, 2026, 14:21 UTC | [records/openclaw-openclaw/closed/63261.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63261.md) |
| [#73700](https://github.com/openclaw/openclaw/pull/73700) | fix(cli): tolerate deleted cwd in shouldLoadCliDotEnv (#73676) | closed externally after review | Apr 29, 2026, 14:20 UTC | [records/openclaw-openclaw/closed/73700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73700.md) |
| [#74292](https://github.com/openclaw/openclaw/issues/74292) | active-memory embedded sub-agent WebSocket handshake timeout (all models affected) | closed externally after item changed | Apr 29, 2026, 14:12 UTC | [records/openclaw-openclaw/closed/74292.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74292.md) |
| [#74375](https://github.com/openclaw/openclaw/issues/74375) | [Bug]: Discord cron `announce` delivery to `user:<id>` is rewritten to `channel:<id>`, causing `Unknown Channel | already implemented on main | Apr 29, 2026, 14:02 UTC | [records/openclaw-openclaw/closed/74375.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74375.md) |
| [#59076](https://github.com/openclaw/openclaw/issues/59076) | JSON parse error leaked to Discord when streaming tool calls with long CJK text | closed externally after review | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/59076.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59076.md) |
| [#59118](https://github.com/openclaw/openclaw/pull/59118) | fix: suppress raw JSON parse errors from leaking to Discord channels (#59076) [AI-assisted] | closed externally after review | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/59118.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59118.md) |
| [#74287](https://github.com/openclaw/openclaw/pull/74287) | fix(providers): add moonshotai alias for moonshot provider | duplicate or superseded | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/74287.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74287.md) |
| [#74256](https://github.com/openclaw/openclaw/pull/74256) | Add deepseek provider-policy-api.ts | already implemented on main | Apr 29, 2026, 13:59 UTC | [records/openclaw-openclaw/closed/74256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74256.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74380](https://github.com/openclaw/openclaw/issues/74380) | [Bug]: Multiple skill packages fail installation | high | candidate | Apr 29, 2026, 14:12 UTC | [records/openclaw-openclaw/items/74380.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74380.md) |
| [#54242](https://github.com/openclaw/openclaw/issues/54242) | [Bug]: backup archives can contain hardlink targets with '..' that fail broad extraction on macOS tar | high | candidate | Apr 29, 2026, 14:11 UTC | [records/openclaw-openclaw/items/54242.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54242.md) |
| [#74377](https://github.com/openclaw/openclaw/issues/74377) | [Bug]: tools array empty at Anthropic provider despite 17 tools computed in attempt.ts (Telegram channel) | high | candidate | Apr 29, 2026, 14:09 UTC | [records/openclaw-openclaw/items/74377.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74377.md) |
| [#74378](https://github.com/openclaw/openclaw/issues/74378) | [Bug]: OpenClaw CLI commands remain alive as node.exe processes after execution on Windows | high | candidate | Apr 29, 2026, 14:08 UTC | [records/openclaw-openclaw/items/74378.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74378.md) |
| [#74334](https://github.com/openclaw/openclaw/issues/74334) | v2026.4.24: Stored snippet normalization mismatch with `relocateCandidateRange` causes silent rehydration failure for all post-Apr-23 promotion candidates | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74334.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74334.md) |
| [#63269](https://github.com/openclaw/openclaw/issues/63269) | [Bug]: Mattermost: group/public channel messages not received via WebSocket (regression in 2026.4.8) | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/63269.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63269.md) |
| [#74300](https://github.com/openclaw/openclaw/issues/74300) | Migration: version mismatch between source/target causes silent state incompatibility | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74300.md) |
| [#74312](https://github.com/openclaw/openclaw/issues/74312) | claude-cli auth-epoch flips on token rotation, forcing session resets mid-conversation | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74312.md) |
| [#74307](https://github.com/openclaw/openclaw/issues/74307) | [Bug]: doctor --fix recreates plugin-runtime-deps plugin-sdk as directory instead of symlink on npm/macOS install | high | candidate | Apr 29, 2026, 14:06 UTC | [records/openclaw-openclaw/items/74307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74307.md) |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 14:05 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74381](https://github.com/openclaw/openclaw/pull/74381) | refactor: centralize Discord and Slack DM access resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74381.md) | complete | Apr 29, 2026, 14:21 UTC |
| [#74360](https://github.com/openclaw/openclaw/pull/74360) | fix(ssrf): restrict dangerouslyAllowPrivateNetwork to self-hosted providers only | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74360.md) | complete | Apr 29, 2026, 14:20 UTC |
| [#74384](https://github.com/openclaw/openclaw/issues/74384) | [Bug]: Plugin registerTool() tools not exposed to agent on 4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74384.md) | complete | Apr 29, 2026, 14:20 UTC |
| [#74359](https://github.com/openclaw/openclaw/pull/74359) | fix(docker): replace curl\|bash Bun install with pinned multi-stage COPY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74359.md) | complete | Apr 29, 2026, 14:19 UTC |
| [#72251](https://github.com/openclaw/openclaw/pull/72251) | fix(backup): retry on tar EOF race and skip known volatile files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72251.md) | complete | Apr 29, 2026, 14:19 UTC |
| [#74383](https://github.com/openclaw/openclaw/pull/74383) | fix(security): classify broad Windows SIDs as world principals | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74383.md) | complete | Apr 29, 2026, 14:19 UTC |
| [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73614.md) | complete | Apr 29, 2026, 14:18 UTC |
| [#74317](https://github.com/openclaw/openclaw/pull/74317) | feat(extensions/guardrails): add a guardrails plugin for external channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74317.md) | failed | Apr 29, 2026, 14:17 UTC |
| [#74382](https://github.com/openclaw/openclaw/issues/74382) | [Bug]: Asks for OpenAI Whisper/ElevenLabs API key even though initial list says KEY not needed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74382.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 29, 2026, 14:15 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 14:20 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 528,553,567,574,625,756,845,1523,1533,1535,1538,1552,1595,1657,1681,1831,1868,1877,1883,1895.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25114011692](https://github.com/openclaw/clawsweeper/actions/runs/25114011692)
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
| Fresh reviewed issues in the last 7 days | 872 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 906 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 43 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 15 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 10/58 current (48 due, 17.2%) |
| Hourly hot item cadence (<7d) | 10/58 current (48 due, 17.2%) |
| Daily cadence coverage | 210/211 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/190 current (1 due, 99.5%) |
| Weekly older issue cadence | 639/652 current (13 due, 98%) |
| Due now by cadence | 67 |

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

Latest review: Apr 29, 2026, 14:17 UTC. Latest close: Apr 29, 2026, 13:48 UTC. Latest comment sync: Apr 29, 2026, 14:20 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 1 | 0 | 206 | 0 |
| Last hour | 520 | 0 | 520 | 9 | 1 | 429 | 0 |
| Last 24 hours | 934 | 0 | 934 | 15 | 14 | 445 | 0 |

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
| [#868](https://github.com/openclaw/clawhub/issues/868) | [Bug] clawhub sync fails: Slug is already taken | high | candidate | Apr 29, 2026, 13:56 UTC | [records/openclaw-clawhub/items/868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/868.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 13:51 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | high | candidate | Apr 29, 2026, 13:51 UTC | [records/openclaw-clawhub/items/1678.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) |
| [#804](https://github.com/openclaw/clawhub/issues/804) | <slug> structure of clawhub | high | candidate | Apr 29, 2026, 13:50 UTC | [records/openclaw-clawhub/items/804.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/804.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 13:49 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 13:49 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 13:49 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 13:49 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 13:48 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 13:48 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#625](https://github.com/openclaw/clawhub/issues/625) | Urgent: Please delete my two published skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/625.md) | complete | Apr 29, 2026, 14:17 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#1868](https://github.com/openclaw/clawhub/issues/1868) | False positive: skill felipematos/max-auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1868.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#1538](https://github.com/openclaw/clawhub/issues/1538) | clawhub dashboard is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1538.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#567](https://github.com/openclaw/clawhub/issues/567) | New Skill: MemoryVault (memoryvault.link) — Persistent cloud memory for AI agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/567.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#1535](https://github.com/openclaw/clawhub/issues/1535) | https://clawhub.ai/kareemadelawwad/evolution-whatsapp  -  flagged suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1535.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#845](https://github.com/openclaw/clawhub/issues/845) | Account banned after test skill removal — request for review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/845.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#1552](https://github.com/openclaw/clawhub/issues/1552) | GitHub OAuth callback succeeds (302) but no session is created | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1552.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#1895](https://github.com/openclaw/clawhub/issues/1895) | OpenClaw Performance Issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1895.md) | complete | Apr 29, 2026, 14:16 UTC |
| [#574](https://github.com/openclaw/clawhub/issues/574) | 标题：经验包页面\"复制\"按钮复制错误的安装命令 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/574.md) | complete | Apr 29, 2026, 14:16 UTC |

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
| Hourly cadence coverage | 2/3 current (1 due, 66.7%) |
| Hourly hot item cadence (<7d) | 2/3 current (1 due, 66.7%) |
| Daily cadence coverage | 0/0 current (0 due, -) |
| Daily PR cadence | 0/0 current (0 due, -) |
| Daily new issue cadence (<30d) | 0/0 current (0 due, -) |
| Weekly older issue cadence | 0/0 current (0 due, -) |
| Due now by cadence | 1 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawsweeper:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawsweeper:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 14:08 UTC. Latest close: unknown. Latest comment sync: Apr 29, 2026, 14:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 2 | 0 | 2 | 0 | 0 | 2 | 0 |
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
