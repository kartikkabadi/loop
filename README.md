# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently covers `openclaw/openclaw` and `openclaw/clawhub`.

It has two independent lanes:

- issue/PR sweeper: keeps one markdown report per open issue or PR, publishes
  one durable Codex automated review comment when useful, and only closes items
  when the evidence is strong
- commit sweeper: reviews code-bearing commits that land on `main`, writes one
  canonical markdown report per commit, and optionally publishes a GitHub Check
  Run for that commit

## Capabilities

- **Repository profiles:** per-repository rules live in
  `src/repository-profiles.ts`, so OpenClaw and ClawHub can share the same
  engine while keeping different apply limits.
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

Repository profiles can further narrow apply. ClawHub is intentionally stricter:
it reviews every issue and PR, but apply may close only PRs where current `main`
already implements the proposed change with source-backed evidence.

## Dashboard

Last dashboard update: Apr 29, 2026, 12:22 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4420 |
| Open PRs | 3455 |
| Open items total | 7875 |
| Reviewed files | 7512 |
| Unreviewed open items | 363 |
| Due now by cadence | 2641 |
| Proposed closes awaiting apply | 1 |
| Work candidates awaiting promotion | 629 |
| Closed by Codex apply | 10772 |
| Failed or stale reviews | 24 |
| Archived closed files | 14265 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6948 | 6590 | 358 | 2595 | 1 | 585 | 10764 | Apr 29, 2026, 12:18 UTC | Apr 29, 2026, 12:12 UTC | 84 |
| [ClawHub](https://github.com/openclaw/clawhub) | 927 | 922 | 5 | 46 | 0 | 44 | 8 | Apr 29, 2026, 12:12 UTC | Apr 29, 2026, 08:25 UTC | 766 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Hot intake publish complete | Apr 29, 2026, 12:21 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25108129768) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 29, 2026, 12:18 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25107385637) |

### Fleet Activity

Latest review: Apr 29, 2026, 12:18 UTC. Latest close: Apr 29, 2026, 12:12 UTC. Latest comment sync: Apr 29, 2026, 12:19 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 35 | 1 | 34 | 0 | 4 | 364 | 0 |
| Last hour | 568 | 5 | 563 | 6 | 21 | 850 | 0 |
| Last 24 hours | 6379 | 411 | 5968 | 18 | 736 | 2375 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74216](https://github.com/openclaw/openclaw/pull/74216) | fix(plugins): install runtime deps for library extensions | closed externally after review | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/closed/74216.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74216.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74322](https://github.com/openclaw/openclaw/pull/74322) | Fix provider-scoped manifest model picker | kept open | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/closed/74322.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74322.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51311](https://github.com/openclaw/openclaw/pull/51311) | fix(ios): guard sendPing continuation against double-resume crash | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/51311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51311.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41653](https://github.com/openclaw/openclaw/pull/41653) | fix: guard WebSocketTaskBox.sendPing against double continuation resume | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/41653.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41653.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74318](https://github.com/openclaw/openclaw/issues/74318) | Integration: Adding prompt injection protection and audit logging to OpenClaw with Ombre[Feature]: | belongs on ClawHub | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/closed/74318.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74318.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74055](https://github.com/openclaw/openclaw/issues/74055) | [Bug]: v2026.4.26: OAuth Refresh Lock Fails in Multi-Agent Swarm (401 refresh_token_reused) | closed externally after review | Apr 29, 2026, 12:05 UTC | [records/openclaw-openclaw/closed/74055.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74055.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74319](https://github.com/openclaw/openclaw/pull/74319) | fix(agents): keep PI telemetry on model provider | kept open | Apr 29, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/74319.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74319.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73607](https://github.com/openclaw/openclaw/issues/73607) | agents.defaults.params and agents.defaults.models[].params stripped from openclaw.json by gateway runtime (v2026.4.26) | closed externally after review | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/73607.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73607.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74293](https://github.com/openclaw/openclaw/pull/74293) | fix(control-ui): make chat divider accessible | kept open | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/74293.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74293.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74179](https://github.com/openclaw/openclaw/pull/74179) | fix(subagent-announce-delivery): prefer parent session binding for completion announce | already implemented on main | Apr 29, 2026, 11:54 UTC | [records/openclaw-openclaw/closed/74179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74179.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 12:18 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74321](https://github.com/openclaw/openclaw/issues/74321) | [Bug]: Delivery-recovery retries indefinitely on permanent HTTP 400 errors (message too long, auth, not-found) — should classify and halt on non-transient failures | high | candidate | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/items/74321.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74321.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 11:59 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 11:55 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 11:53 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 11:51 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74313](https://github.com/openclaw/openclaw/issues/74313) | [Bug]: doctor flags live agents/main store as orphaned when default agent id is not main | high | candidate | Apr 29, 2026, 11:50 UTC | [records/openclaw-openclaw/items/74313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74313.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 11:50 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 11:49 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74312](https://github.com/openclaw/openclaw/issues/74312) | claude-cli auth-epoch flips on token rotation, forcing session resets mid-conversation | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-openclaw/items/74312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74312.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 11:47 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 11:47 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53486](https://github.com/openclaw/openclaw/issues/53486) | [Bug] Feishu: message(action=send) renders card JSON as plain text instead of interactive card (regression) | high | candidate | Apr 29, 2026, 11:44 UTC | [records/openclaw-openclaw/items/53486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53486.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74078](https://github.com/openclaw/openclaw/issues/74078) | [Bug]: 4.26 version cutdown connection to local model in few minites | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74078.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74086](https://github.com/openclaw/openclaw/issues/74086) | [Bug]: Regression: Telegram provider fails on Windows after 2026.4.23 (deleteWebhook / setMyCommands errors) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74086.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74095](https://github.com/openclaw/openclaw/issues/74095) | feat(tasks): normalize blocker and failure taxonomy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74095.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73567](https://github.com/openclaw/openclaw/pull/73567) | fix(qqbot): re-evaluate routing bindings per inbound message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73567.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74081](https://github.com/openclaw/openclaw/pull/74081) | feat(config): coerce ${VAR} to a string array when the env value is a… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74081.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73655](https://github.com/openclaw/openclaw/issues/73655) | Gateway leak triad on plugin restart: Manifest EADDRINUSE retry loop, signal-handler accumulation, sync I/O on session JSONL → WS handshake starvation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73655.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74096](https://github.com/openclaw/openclaw/issues/74096) | image/video/music generate tools eagerly list capability providers, causing ~15-18s reload per turn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74096.md) | complete | Apr 29, 2026, 12:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74192](https://github.com/openclaw/openclaw/issues/74192) | [Bug]: Delay in provider/transport path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74192.md) | complete | Apr 29, 2026, 12:17 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 12:21 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25108129768. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25108129768](https://github.com/openclaw/clawsweeper/actions/runs/25108129768)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3532 |
| Open PRs | 3416 |
| Open items total | 6948 |
| Reviewed files | 6590 |
| Unreviewed open items | 358 |
| Archived closed files | 14242 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3351 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3221 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6572 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Work candidates awaiting promotion | 585 |
| Closed by Codex apply | 10764 |
| Failed or stale reviews | 18 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 72/1047 current (975 due, 6.9%) |
| Hourly hot item cadence (<7d) | 72/1047 current (975 due, 6.9%) |
| Daily cadence coverage | 2484/3742 current (1258 due, 66.4%) |
| Daily PR cadence | 1866/2617 current (751 due, 71.3%) |
| Daily new issue cadence (<30d) | 618/1125 current (507 due, 54.9%) |
| Weekly older issue cadence | 1797/1801 current (4 due, 99.8%) |
| Due now by cadence | 2595 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 07:05 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6973 |
| Missing eligible open records | 264 |
| Missing maintainer-authored open records | 63 |
| Missing protected open records | 1 |
| Missing recently-created open records | 43 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 7 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 12:18 UTC. Latest close: Apr 29, 2026, 12:12 UTC. Latest comment sync: Apr 29, 2026, 12:19 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 34 | 1 | 33 | 0 | 4 | 15 | 0 |
| Last hour | 100 | 5 | 95 | 0 | 21 | 84 | 0 |
| Last 24 hours | 5445 | 411 | 5034 | 12 | 723 | 1596 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74216](https://github.com/openclaw/openclaw/pull/74216) | fix(plugins): install runtime deps for library extensions | closed externally after review | Apr 29, 2026, 12:12 UTC | [records/openclaw-openclaw/closed/74216.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74216.md) |
| [#74322](https://github.com/openclaw/openclaw/pull/74322) | Fix provider-scoped manifest model picker | kept open | Apr 29, 2026, 12:09 UTC | [records/openclaw-openclaw/closed/74322.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74322.md) |
| [#51311](https://github.com/openclaw/openclaw/pull/51311) | fix(ios): guard sendPing continuation against double-resume crash | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/51311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51311.md) |
| [#41653](https://github.com/openclaw/openclaw/pull/41653) | fix: guard WebSocketTaskBox.sendPing against double continuation resume | closed externally after review | Apr 29, 2026, 12:08 UTC | [records/openclaw-openclaw/closed/41653.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41653.md) |
| [#74318](https://github.com/openclaw/openclaw/issues/74318) | Integration: Adding prompt injection protection and audit logging to OpenClaw with Ombre[Feature]: | belongs on ClawHub | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/closed/74318.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74318.md) |
| [#74055](https://github.com/openclaw/openclaw/issues/74055) | [Bug]: v2026.4.26: OAuth Refresh Lock Fails in Multi-Agent Swarm (401 refresh_token_reused) | closed externally after review | Apr 29, 2026, 12:05 UTC | [records/openclaw-openclaw/closed/74055.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74055.md) |
| [#74319](https://github.com/openclaw/openclaw/pull/74319) | fix(agents): keep PI telemetry on model provider | kept open | Apr 29, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/74319.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74319.md) |
| [#73607](https://github.com/openclaw/openclaw/issues/73607) | agents.defaults.params and agents.defaults.models[].params stripped from openclaw.json by gateway runtime (v2026.4.26) | closed externally after review | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/73607.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73607.md) |
| [#74293](https://github.com/openclaw/openclaw/pull/74293) | fix(control-ui): make chat divider accessible | kept open | Apr 29, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/74293.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74293.md) |
| [#74179](https://github.com/openclaw/openclaw/pull/74179) | fix(subagent-announce-delivery): prefer parent session binding for completion announce | already implemented on main | Apr 29, 2026, 11:54 UTC | [records/openclaw-openclaw/closed/74179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74179.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | high | candidate | Apr 29, 2026, 12:18 UTC | [records/openclaw-openclaw/items/74155.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) |
| [#74321](https://github.com/openclaw/openclaw/issues/74321) | [Bug]: Delivery-recovery retries indefinitely on permanent HTTP 400 errors (message too long, auth, not-found) — should classify and halt on non-transient failures | high | candidate | Apr 29, 2026, 12:06 UTC | [records/openclaw-openclaw/items/74321.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74321.md) |
| [#74313](https://github.com/openclaw/openclaw/issues/74313) | [Bug]: doctor flags live agents/main store as orphaned when default agent id is not main | high | candidate | Apr 29, 2026, 11:50 UTC | [records/openclaw-openclaw/items/74313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74313.md) |
| [#74312](https://github.com/openclaw/openclaw/issues/74312) | claude-cli auth-epoch flips on token rotation, forcing session resets mid-conversation | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-openclaw/items/74312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74312.md) |
| [#53486](https://github.com/openclaw/openclaw/issues/53486) | [Bug] Feishu: message(action=send) renders card JSON as plain text instead of interactive card (regression) | high | candidate | Apr 29, 2026, 11:44 UTC | [records/openclaw-openclaw/items/53486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53486.md) |
| [#46168](https://github.com/openclaw/openclaw/pull/46168) | Skills: fix discovery scan truncation | high | candidate | Apr 29, 2026, 11:44 UTC | [records/openclaw-openclaw/items/46168.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46168.md) |
| [#71382](https://github.com/openclaw/openclaw/pull/71382) | feat: add WhatsApp read-only mode | high | candidate | Apr 29, 2026, 11:44 UTC | [records/openclaw-openclaw/items/71382.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71382.md) |
| [#74307](https://github.com/openclaw/openclaw/issues/74307) | [Bug]: doctor --fix recreates plugin-runtime-deps plugin-sdk as directory instead of symlink on npm/macOS install | high | candidate | Apr 29, 2026, 11:33 UTC | [records/openclaw-openclaw/items/74307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74307.md) |
| [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 11:01 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [#74262](https://github.com/openclaw/openclaw/issues/74262) | Update QA lab parity gate for GPT-5.5 vs Opus 4.7 and harden preflight | high | candidate | Apr 29, 2026, 09:44 UTC | [records/openclaw-openclaw/items/74262.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74262.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74078](https://github.com/openclaw/openclaw/issues/74078) | [Bug]: 4.26 version cutdown connection to local model in few minites | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74078.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#73243](https://github.com/openclaw/openclaw/pull/73243) | fix(diagnostics): abort stuck sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73243.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#74086](https://github.com/openclaw/openclaw/issues/74086) | [Bug]: Regression: Telegram provider fails on Windows after 2026.4.23 (deleteWebhook / setMyCommands errors) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74086.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#74095](https://github.com/openclaw/openclaw/issues/74095) | feat(tasks): normalize blocker and failure taxonomy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74095.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#73567](https://github.com/openclaw/openclaw/pull/73567) | fix(qqbot): re-evaluate routing bindings per inbound message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73567.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#74155](https://github.com/openclaw/openclaw/pull/74155) | fix(slack): make download-file fileId requirement self-evident to LLMs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74155.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#74081](https://github.com/openclaw/openclaw/pull/74081) | feat(config): coerce ${VAR} to a string array when the env value is a… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74081.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#73655](https://github.com/openclaw/openclaw/issues/73655) | Gateway leak triad on plugin restart: Manifest EADDRINUSE retry loop, signal-handler accumulation, sync I/O on session JSONL → WS handshake starvation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73655.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#74096](https://github.com/openclaw/openclaw/issues/74096) | image/video/music generate tools eagerly list capability providers, causing ~15-18s reload per turn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74096.md) | complete | Apr 29, 2026, 12:18 UTC |
| [#74192](https://github.com/openclaw/openclaw/issues/74192) | [Bug]: Delay in provider/transport path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74192.md) | complete | Apr 29, 2026, 12:17 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 12:18 UTC

State: Review in progress

Planned 245 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25107385637](https://github.com/openclaw/clawsweeper/actions/runs/25107385637)
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
| Archived closed files | 23 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 882 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 916 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 44 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 25/60 current (35 due, 41.7%) |
| Hourly hot item cadence (<7d) | 25/60 current (35 due, 41.7%) |
| Daily cadence coverage | 209/211 current (2 due, 99.1%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 188/190 current (2 due, 98.9%) |
| Weekly older issue cadence | 647/651 current (4 due, 99.4%) |
| Due now by cadence | 46 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 07:05 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 922 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 6 |
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

Latest review: Apr 29, 2026, 12:12 UTC. Latest close: Apr 29, 2026, 08:25 UTC. Latest comment sync: Apr 29, 2026, 12:17 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 349 | 0 |
| Last hour | 468 | 0 | 468 | 6 | 0 | 766 | 0 |
| Last 24 hours | 934 | 0 | 934 | 6 | 13 | 779 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | kept open | Apr 29, 2026, 08:25 UTC | [records/openclaw-clawhub/closed/1891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1891.md) |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 11:59 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 11:55 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 11:53 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 11:51 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1126](https://github.com/openclaw/clawhub/issues/1126) | openclaw-checkpoint skill missing from search results despite existing in registry | high | candidate | Apr 29, 2026, 11:50 UTC | [records/openclaw-clawhub/items/1126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1126.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 11:49 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#874](https://github.com/openclaw/clawhub/issues/874) | Publish silently drops extensionless files and .tsv files | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-clawhub/items/874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/874.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 11:48 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 11:47 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#371](https://github.com/openclaw/clawhub/issues/371) | Add appeal link for VirusTotal false positives in UI | high | candidate | Apr 29, 2026, 11:47 UTC | [records/openclaw-clawhub/items/371.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/371.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#723](https://github.com/openclaw/clawhub/issues/723) | [False Positive Appeal] sudo-gold by FMouseBoy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/723.md) | complete | Apr 29, 2026, 12:12 UTC |
| [#1514](https://github.com/openclaw/clawhub/issues/1514) | False duplicate flag: claude-to-free is not a duplicate of model-migration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1514.md) | complete | Apr 29, 2026, 12:05 UTC |
| [#1483](https://github.com/openclaw/clawhub/issues/1483) | Allow to view security from CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1483.md) | complete | Apr 29, 2026, 12:03 UTC |
| [#1452](https://github.com/openclaw/clawhub/issues/1452) | [Bug] Cannot sign in with GitHub after deleting account (OAuth binding not cleared) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1452.md) | failed | Apr 29, 2026, 12:03 UTC |
| [#1440](https://github.com/openclaw/clawhub/issues/1440) | skill incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1440.md) | failed | Apr 29, 2026, 12:02 UTC |
| [#1404](https://github.com/openclaw/clawhub/issues/1404) | Skill Strategy Consultation: Page Icon Meanings and Search Recall Issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1404.md) | complete | Apr 29, 2026, 12:02 UTC |
| [#1395](https://github.com/openclaw/clawhub/issues/1395) | [Skill Flagged] openclaw-health-guardian - False Positive Appeal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1395.md) | complete | Apr 29, 2026, 12:02 UTC |
| [#1501](https://github.com/openclaw/clawhub/issues/1501) | Ownership Transfer: baidu-netdisk-storage -> @BaiduNetdiskAIBot | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1501.md) | complete | Apr 29, 2026, 12:02 UTC |
| [#1415](https://github.com/openclaw/clawhub/issues/1415) | Skill \"apple-health-skills\" is incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1415.md) | complete | Apr 29, 2026, 12:01 UTC |
| [#1327](https://github.com/openclaw/clawhub/issues/1327) | 不要标记可疑可以吗，我这里没有敏感的 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1327.md) | failed | Apr 29, 2026, 12:01 UTC |

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

Scheduled runs cover both configured profiles. `openclaw/openclaw` keeps the
existing cadence; `openclaw/clawhub` runs on offset review/apply/audit crons so
its reports live under `records/openclaw-clawhub/` without colliding with
default repo records.

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
