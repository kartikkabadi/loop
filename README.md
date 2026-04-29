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

Last dashboard update: Apr 29, 2026, 15:11 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4429 |
| Open PRs | 3426 |
| Open items total | 7855 |
| Reviewed files | 7502 |
| Unreviewed open items | 356 |
| Due now by cadence | 2966 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 693 |
| Closed by Codex apply | 10809 |
| Failed or stale reviews | 19 |
| Archived closed files | 14378 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6929 | 6578 | 351 | 2941 | 0 | 644 | 10801 | Apr 29, 2026, 15:10 UTC | Apr 29, 2026, 15:05 UTC | 447 |
| [ClawHub](https://github.com/openclaw/clawhub) | 926 | 921 | 5 | 22 | 0 | 48 | 8 | Apr 29, 2026, 15:03 UTC | Apr 29, 2026, 13:48 UTC | 481 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 29, 2026, 15:11 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25117006403) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 15:08 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25116895225) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 15:10 UTC. Latest close: Apr 29, 2026, 15:05 UTC. Latest comment sync: Apr 29, 2026, 15:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 15 | 1 | 14 | 0 | 12 | 15 | 3 |
| Last hour | 1007 | 23 | 984 | 14 | 31 | 928 | 3 |
| Last 24 hours | 5916 | 366 | 5550 | 15 | 774 | 1709 | 28 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | closed externally after review | Apr 29, 2026, 15:05 UTC | [records/openclaw-openclaw/closed/73614.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73614.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72310](https://github.com/openclaw/openclaw/issues/72310) | [Bug]: Default plugin scanning is unsustainable on mid-range hardware | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/72310.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72310.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71948](https://github.com/openclaw/openclaw/issues/71948) | Discord inbound worker repeatedly times out after 1800s while gateway is still running | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/71948.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71948.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71546](https://github.com/openclaw/openclaw/issues/71546) | Discord ingest lag of 100–400 s on stable connection persists after PR #68159 / 2026.4.1 reconnect-ownership change | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/71546.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71546.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71536](https://github.com/openclaw/openclaw/issues/71536) | [Bug]: Issue Report: Telegram restart Command Authorization Failure | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/71536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71536.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68311](https://github.com/openclaw/openclaw/pull/68311) | fix: update reasoning stream message to include Feishu support | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/68311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68311.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65317](https://github.com/openclaw/openclaw/issues/65317) | [Bug]: `functions.write` fails with `sandbox pinned mutation helper requires python3 or python` even when shell writes succeed in the same writable sandbox workspace | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/65317.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65317.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65179](https://github.com/openclaw/openclaw/pull/65179) | fix: apply payload.model override in cron jobs even when not in allowlist (#65129) | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/65179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65111](https://github.com/openclaw/openclaw/pull/65111) | fix: allow built-in chat commands to bypass plugins.allow check (closes #65083) | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/65111.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65111.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64271](https://github.com/openclaw/openclaw/issues/64271) | browser.request retry loop burns CPU indefinitely when Chrome CDP fails to start | already implemented on main | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/64271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64271.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74426](https://github.com/openclaw/openclaw/issues/74426) | Exec tool: invalid `host:` values silently coerce to sandbox, causing agents to confabulate host-level facts | high | candidate | Apr 29, 2026, 15:02 UTC | [records/openclaw-openclaw/items/74426.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74426.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74424](https://github.com/openclaw/openclaw/issues/74424) | [Bug]: gateway restart continuationMessage is silently dropped when restart coalesces with an in-flight restart | high | candidate | Apr 29, 2026, 15:01 UTC | [records/openclaw-openclaw/items/74424.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74424.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71638](https://github.com/openclaw/openclaw/issues/71638) | Telegram extension: surface forward_from / via_bot / reply_to_message on MessageReceivedHookEvent | high | candidate | Apr 29, 2026, 14:53 UTC | [records/openclaw-openclaw/items/71638.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71638.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71555](https://github.com/openclaw/openclaw/issues/71555) | [Bug]: Large session JSONL can crash gateway during embedded context rebuild; SessionManager.open() loads file twice | high | candidate | Apr 29, 2026, 14:48 UTC | [records/openclaw-openclaw/items/71555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71555.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 14:48 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71592](https://github.com/openclaw/openclaw/issues/71592) | TUI local mode advertises /status and /compact but falls through to model text | high | candidate | Apr 29, 2026, 14:47 UTC | [records/openclaw-openclaw/items/71592.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71592.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71491](https://github.com/openclaw/openclaw/issues/71491) | Kimi K2.6 reasoning_content 400 regression in long conversations after LCM compaction (follow-up #70392) | high | candidate | Apr 29, 2026, 14:47 UTC | [records/openclaw-openclaw/items/71491.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71491.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71605](https://github.com/openclaw/openclaw/issues/71605) | Gateway WS `agent` dispatch times out 60s + embedded mode contends with running daemon for session file locks | high | candidate | Apr 29, 2026, 14:47 UTC | [records/openclaw-openclaw/items/71605.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71605.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72121](https://github.com/openclaw/openclaw/issues/72121) | [Bug]: Anthropic auth rejects valid sk-ant-api03 API keys | high | candidate | Apr 29, 2026, 14:46 UTC | [records/openclaw-openclaw/items/72121.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72121.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71611](https://github.com/openclaw/openclaw/pull/71611) | fix(memory): retry rename on EBUSY and fall back to copyFile on Windows | high | candidate | Apr 29, 2026, 14:46 UTC | [records/openclaw-openclaw/items/71611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71611.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68278](https://github.com/openclaw/openclaw/pull/68278) | fix(discord): honor explicit accountId token resolution in cron deliveries | high | candidate | Apr 29, 2026, 14:46 UTC | [records/openclaw-openclaw/items/68278.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68278.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71429](https://github.com/openclaw/openclaw/issues/71429) | [Bug] Telegram gateway drops in-flight messages on sendChatAction network failure during hot reload | high | candidate | Apr 29, 2026, 14:46 UTC | [records/openclaw-openclaw/items/71429.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71429.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71689](https://github.com/openclaw/openclaw/issues/71689) | Bug: tasks registry restore fails on malformed SQLite image | high | candidate | Apr 29, 2026, 14:45 UTC | [records/openclaw-openclaw/items/71689.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71689.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63819](https://github.com/openclaw/openclaw/issues/63819) | [Bug]: Session stuck in \"running\" status persists in v2026.4.9 — phaseBeforeAbort fix no longer sufficient | high | candidate | Apr 29, 2026, 14:44 UTC | [records/openclaw-openclaw/items/63819.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63819.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64973](https://github.com/openclaw/openclaw/issues/64973) | [Bug]: macOS Talk Mode can trigger stale config.set, gateway token mismatch, and local gateway restart | high | candidate | Apr 29, 2026, 14:43 UTC | [records/openclaw-openclaw/items/64973.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64973.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57608](https://github.com/openclaw/openclaw/pull/57608) | fix(channels): googlechat auth logging + Zalo mediaMaxBytes default | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57608.md) | complete | Apr 29, 2026, 15:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74407](https://github.com/openclaw/openclaw/pull/74407) | fix(onboard): clarify keyed vs keyless skill setup prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74407.md) | complete | Apr 29, 2026, 15:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74431](https://github.com/openclaw/openclaw/pull/74431) | fix(docker): validate every gpg key in signing-key file (#74234) | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74431.md) | complete | Apr 29, 2026, 15:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74430](https://github.com/openclaw/openclaw/pull/74430) | [Feat] Add upload archive install RPC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74430.md) | complete | Apr 29, 2026, 15:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74423](https://github.com/openclaw/openclaw/issues/74423) | [Bug]: `/models` and Web chat model dropdown show full catalog (900+ models) instead of only configured providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74423.md) | complete | Apr 29, 2026, 15:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73611](https://github.com/openclaw/openclaw/pull/73611) | fix: gate startup context for sandboxed spawned sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73611.md) | complete | Apr 29, 2026, 15:04 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 15:04 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74428](https://github.com/openclaw/openclaw/pull/74428) | [codex] fix(mcp): restrict serve scope selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74428.md) | complete | Apr 29, 2026, 15:03 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1817](https://github.com/openclaw/clawhub/issues/1817) | False positive: trustboost-pii-sanitizer flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1817.md) | complete | Apr 29, 2026, 15:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74427](https://github.com/openclaw/openclaw/pull/74427) | fix(openai): honor OPENAI_BASE_URL when no provider config sets a baseUrl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74427.md) | complete | Apr 29, 2026, 15:02 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 15:11 UTC

State: Apply finished

Apply/comment-sync run finished with 0 fresh closes out of requested limit 0. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25117006403](https://github.com/openclaw/clawsweeper/actions/runs/25117006403)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3542 |
| Open PRs | 3387 |
| Open items total | 6929 |
| Reviewed files | 6578 |
| Unreviewed open items | 351 |
| Archived closed files | 14354 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3369 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3203 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6572 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 644 |
| Closed by Codex apply | 10801 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 124/1090 current (966 due, 11.4%) |
| Hourly hot item cadence (<7d) | 124/1090 current (966 due, 11.4%) |
| Daily cadence coverage | 2059/3681 current (1622 due, 55.9%) |
| Daily PR cadence | 1497/2568 current (1071 due, 58.3%) |
| Daily new issue cadence (<30d) | 562/1113 current (551 due, 50.5%) |
| Weekly older issue cadence | 1805/1807 current (2 due, 99.9%) |
| Due now by cadence | 2941 |

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

Latest review: Apr 29, 2026, 15:10 UTC. Latest close: Apr 29, 2026, 15:05 UTC. Latest comment sync: Apr 29, 2026, 15:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 14 | 1 | 13 | 0 | 12 | 14 | 3 |
| Last hour | 572 | 23 | 549 | 1 | 31 | 447 | 3 |
| Last 24 hours | 4979 | 366 | 4613 | 2 | 760 | 971 | 28 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73614](https://github.com/openclaw/openclaw/pull/73614) | fix(logging): expand leading tilde in logging.file (#73587) | closed externally after review | Apr 29, 2026, 15:05 UTC | [records/openclaw-openclaw/closed/73614.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73614.md) |
| [#72310](https://github.com/openclaw/openclaw/issues/72310) | [Bug]: Default plugin scanning is unsustainable on mid-range hardware | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/72310.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72310.md) |
| [#71948](https://github.com/openclaw/openclaw/issues/71948) | Discord inbound worker repeatedly times out after 1800s while gateway is still running | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/71948.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71948.md) |
| [#71546](https://github.com/openclaw/openclaw/issues/71546) | Discord ingest lag of 100–400 s on stable connection persists after PR #68159 / 2026.4.1 reconnect-ownership change | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/71546.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71546.md) |
| [#71536](https://github.com/openclaw/openclaw/issues/71536) | [Bug]: Issue Report: Telegram restart Command Authorization Failure | already implemented on main | Apr 29, 2026, 15:04 UTC | [records/openclaw-openclaw/closed/71536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71536.md) |
| [#68311](https://github.com/openclaw/openclaw/pull/68311) | fix: update reasoning stream message to include Feishu support | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/68311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68311.md) |
| [#65317](https://github.com/openclaw/openclaw/issues/65317) | [Bug]: `functions.write` fails with `sandbox pinned mutation helper requires python3 or python` even when shell writes succeed in the same writable sandbox workspace | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/65317.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65317.md) |
| [#65179](https://github.com/openclaw/openclaw/pull/65179) | fix: apply payload.model override in cron jobs even when not in allowlist (#65129) | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/65179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65179.md) |
| [#65111](https://github.com/openclaw/openclaw/pull/65111) | fix: allow built-in chat commands to bypass plugins.allow check (closes #65083) | duplicate or superseded | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/65111.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65111.md) |
| [#64271](https://github.com/openclaw/openclaw/issues/64271) | browser.request retry loop burns CPU indefinitely when Chrome CDP fails to start | already implemented on main | Apr 29, 2026, 15:03 UTC | [records/openclaw-openclaw/closed/64271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64271.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74426](https://github.com/openclaw/openclaw/issues/74426) | Exec tool: invalid `host:` values silently coerce to sandbox, causing agents to confabulate host-level facts | high | candidate | Apr 29, 2026, 15:02 UTC | [records/openclaw-openclaw/items/74426.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74426.md) |
| [#74424](https://github.com/openclaw/openclaw/issues/74424) | [Bug]: gateway restart continuationMessage is silently dropped when restart coalesces with an in-flight restart | high | candidate | Apr 29, 2026, 15:01 UTC | [records/openclaw-openclaw/items/74424.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74424.md) |
| [#71638](https://github.com/openclaw/openclaw/issues/71638) | Telegram extension: surface forward_from / via_bot / reply_to_message on MessageReceivedHookEvent | high | candidate | Apr 29, 2026, 14:53 UTC | [records/openclaw-openclaw/items/71638.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71638.md) |
| [#71555](https://github.com/openclaw/openclaw/issues/71555) | [Bug]: Large session JSONL can crash gateway during embedded context rebuild; SessionManager.open() loads file twice | high | candidate | Apr 29, 2026, 14:48 UTC | [records/openclaw-openclaw/items/71555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71555.md) |
| [#74410](https://github.com/openclaw/openclaw/issues/74410) | meridian/anthropic-messages stream reader drops text content blocks when response is [thinking, text] | high | candidate | Apr 29, 2026, 14:48 UTC | [records/openclaw-openclaw/items/74410.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74410.md) |
| [#71592](https://github.com/openclaw/openclaw/issues/71592) | TUI local mode advertises /status and /compact but falls through to model text | high | candidate | Apr 29, 2026, 14:47 UTC | [records/openclaw-openclaw/items/71592.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71592.md) |
| [#71491](https://github.com/openclaw/openclaw/issues/71491) | Kimi K2.6 reasoning_content 400 regression in long conversations after LCM compaction (follow-up #70392) | high | candidate | Apr 29, 2026, 14:47 UTC | [records/openclaw-openclaw/items/71491.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71491.md) |
| [#71605](https://github.com/openclaw/openclaw/issues/71605) | Gateway WS `agent` dispatch times out 60s + embedded mode contends with running daemon for session file locks | high | candidate | Apr 29, 2026, 14:47 UTC | [records/openclaw-openclaw/items/71605.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71605.md) |
| [#72121](https://github.com/openclaw/openclaw/issues/72121) | [Bug]: Anthropic auth rejects valid sk-ant-api03 API keys | high | candidate | Apr 29, 2026, 14:46 UTC | [records/openclaw-openclaw/items/72121.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72121.md) |
| [#71611](https://github.com/openclaw/openclaw/pull/71611) | fix(memory): retry rename on EBUSY and fall back to copyFile on Windows | high | candidate | Apr 29, 2026, 14:46 UTC | [records/openclaw-openclaw/items/71611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71611.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#57608](https://github.com/openclaw/openclaw/pull/57608) | fix(channels): googlechat auth logging + Zalo mediaMaxBytes default | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57608.md) | complete | Apr 29, 2026, 15:10 UTC |
| [#74407](https://github.com/openclaw/openclaw/pull/74407) | fix(onboard): clarify keyed vs keyless skill setup prompts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74407.md) | complete | Apr 29, 2026, 15:10 UTC |
| [#74431](https://github.com/openclaw/openclaw/pull/74431) | fix(docker): validate every gpg key in signing-key file (#74234) | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74431.md) | complete | Apr 29, 2026, 15:09 UTC |
| [#74430](https://github.com/openclaw/openclaw/pull/74430) | [Feat] Add upload archive install RPC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74430.md) | complete | Apr 29, 2026, 15:07 UTC |
| [#74423](https://github.com/openclaw/openclaw/issues/74423) | [Bug]: `/models` and Web chat model dropdown show full catalog (900+ models) instead of only configured providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74423.md) | complete | Apr 29, 2026, 15:07 UTC |
| [#73611](https://github.com/openclaw/openclaw/pull/73611) | fix: gate startup context for sandboxed spawned sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73611.md) | complete | Apr 29, 2026, 15:04 UTC |
| [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 15:04 UTC |
| [#74428](https://github.com/openclaw/openclaw/pull/74428) | [codex] fix(mcp): restrict serve scope selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74428.md) | complete | Apr 29, 2026, 15:03 UTC |
| [#74427](https://github.com/openclaw/openclaw/pull/74427) | fix(openai): honor OPENAI_BASE_URL when no provider config sets a baseUrl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74427.md) | complete | Apr 29, 2026, 15:02 UTC |
| [#74426](https://github.com/openclaw/openclaw/issues/74426) | Exec tool: invalid `host:` values silently coerce to sandbox, causing agents to confabulate host-level facts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74426.md) | complete | Apr 29, 2026, 15:02 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 15:08 UTC

State: Review in progress

Planned 331 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
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
| Fresh reviewed issues in the last 7 days | 874 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 908 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 48 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 53/58 current (5 due, 91.4%) |
| Hourly hot item cadence (<7d) | 53/58 current (5 due, 91.4%) |
| Daily cadence coverage | 210/211 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/190 current (1 due, 99.5%) |
| Weekly older issue cadence | 641/652 current (11 due, 98.3%) |
| Due now by cadence | 22 |

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

Latest review: Apr 29, 2026, 15:03 UTC. Latest close: Apr 29, 2026, 13:48 UTC. Latest comment sync: Apr 29, 2026, 15:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 435 | 0 | 435 | 13 | 0 | 481 | 0 |
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
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 14:26 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 14:24 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 14:22 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 14:21 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 14:19 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 14:19 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 14:18 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#868](https://github.com/openclaw/clawhub/issues/868) | [Bug] clawhub sync fails: Slug is already taken | high | candidate | Apr 29, 2026, 13:56 UTC | [records/openclaw-clawhub/items/868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/868.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1817](https://github.com/openclaw/clawhub/issues/1817) | False positive: trustboost-pii-sanitizer flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1817.md) | complete | Apr 29, 2026, 15:03 UTC |
| [#1677](https://github.com/openclaw/clawhub/issues/1677) | False positive: valerii-baidak/figma-pixel flagged Suspicious after clarifying agent vs scripts roles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1677.md) | complete | Apr 29, 2026, 14:36 UTC |
| [#1860](https://github.com/openclaw/clawhub/pull/1860) | docs: document trademark takedown reports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1860.md) | complete | Apr 29, 2026, 14:35 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 29, 2026, 14:34 UTC |
| [#1726](https://github.com/openclaw/clawhub/issues/1726) | False positive: jackedin skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1726.md) | complete | Apr 29, 2026, 14:34 UTC |
| [#1885](https://github.com/openclaw/clawhub/issues/1885) | False positive: skill aixplain-agent-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1885.md) | complete | Apr 29, 2026, 14:34 UTC |
| [#1761](https://github.com/openclaw/clawhub/issues/1761) | [Appeal] False positive flag on Jinguyuan Dumpling Skill (v0.4.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1761.md) | complete | Apr 29, 2026, 14:33 UTC |
| [#1403](https://github.com/openclaw/clawhub/issues/1403) | [Skill Flagged] DesignKit Ecommerce Skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1403.md) | complete | Apr 29, 2026, 14:33 UTC |
| [#1849](https://github.com/openclaw/clawhub/issues/1849) | Clarify suspicious flag for beamer-pipeline-public@0.2.1 despite Benign high-confidence scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1849.md) | complete | Apr 29, 2026, 14:33 UTC |
| [#1718](https://github.com/openclaw/clawhub/issues/1718) | False positive: rocky-know-how skill flagged as suspicious — benign experience/knowledge management skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1718.md) | complete | Apr 29, 2026, 14:33 UTC |

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
