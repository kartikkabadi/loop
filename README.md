# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently sweeps `openclaw/openclaw` and `openclaw/clawhub`.

It keeps one markdown report per open issue or PR, publishes one durable Codex
automated review comment when useful, and only closes items when the evidence is
strong.

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

Last dashboard update: Apr 28, 2026, 20:45 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4398 |
| Open PRs | 3453 |
| Open items total | 7851 |
| Reviewed files | 7486 |
| Unreviewed open items | 365 |
| Due now by cadence | 2200 |
| Proposed closes awaiting apply | 21 |
| Closed by Codex apply | 10522 |
| Failed or stale reviews | 9 |
| Archived closed files | 13771 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6936 | 6580 | 356 | 2140 | 21 | 10519 | Apr 28, 2026, 19:54 UTC | Apr 28, 2026, 19:56 UTC | 127 |
| [ClawHub](https://github.com/openclaw/clawhub) | 915 | 906 | 9 | 60 | 0 | 3 | Apr 28, 2026, 19:44 UTC | Apr 28, 2026, 18:47 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 20:29 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25075999264) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 20:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25075999264) |

### Fleet Activity

Latest review: Apr 28, 2026, 20:43 UTC. Latest close: Apr 28, 2026, 20:44 UTC. Latest comment sync: Apr 28, 2026, 20:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 493 | 23 | 470 | 2 | 3 | 147 | 0 |
| Last 24 hours | 5541 | 315 | 5226 | 5 | 667 | 546 | 17 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/67902.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67902.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66394](https://github.com/openclaw/openclaw/issues/66394) | [Feature]: log rotation support | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/66394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66394.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65895](https://github.com/openclaw/openclaw/pull/65895) | docs: add Bedrock Mantle provider to index and models pages | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/65895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65895.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | duplicate or superseded | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64934.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63081](https://github.com/openclaw/openclaw/pull/63081) | fix(gateway): guard loadState against array-typed pairing state files | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/63081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63081.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68649](https://github.com/openclaw/openclaw/issues/68649) | pdf tool can hang indefinitely, blocking session and preventing /new /restart recovery | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/68649.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68649.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64956](https://github.com/openclaw/openclaw/pull/64956) | fix: dedupe session summaries by session id | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64956.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64956.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56815](https://github.com/openclaw/openclaw/issues/56815) | memorySearch: embedding reindex fails with 'TypeError: fetch failed' after indexing ~40K chunks | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/56815.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56815.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51708](https://github.com/openclaw/openclaw/pull/51708) | docs: remove trailing whitespace from documentation files | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/51708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/62764.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62764.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51596](https://github.com/openclaw/openclaw/pull/51596) | docs: fix custom skill naming example | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51596.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39726](https://github.com/openclaw/openclaw/pull/39726) | agents: notify chat sessions on empty bg success | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39726.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39683](https://github.com/openclaw/openclaw/pull/39683) | fix(cron): reject Feishu announce jobs without delivery target | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39683.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39489](https://github.com/openclaw/openclaw/pull/39489) | fix(feishu): report connection/event activity for health monitor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39489.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54646](https://github.com/openclaw/openclaw/pull/54646) | fix(cli): validate gateway-rpc --timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54646.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40044](https://github.com/openclaw/openclaw/pull/40044) | feat: inject sessionId into runtime context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40044.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40067](https://github.com/openclaw/openclaw/pull/40067) | fix(gateway): do not crash on Playwright dialog race unhandled rejection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40067.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40716](https://github.com/openclaw/openclaw/pull/40716) | fix: filter delivery-mirror from all consumer paths (LLM context, webchat, API) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40716.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41296](https://github.com/openclaw/openclaw/pull/41296) | fix(gateway): improve shutdown error visibility and add close timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41296.md) | complete | Apr 28, 2026, 20:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48377](https://github.com/openclaw/openclaw/pull/48377) | fix(feishu): feishu_doc create action now populates content when provided | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48377.md) | complete | Apr 28, 2026, 20:43 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 20:45 UTC

State: Apply finished

Apply/comment-sync run finished with 20 fresh closes out of requested limit 20. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25076375047](https://github.com/openclaw/clawsweeper/actions/runs/25076375047)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3522 |
| Open PRs | 3414 |
| Open items total | 6936 |
| Reviewed files | 6580 |
| Unreviewed open items | 356 |
| Archived closed files | 13725 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3342 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3201 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6543 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10539 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 95/839 current (744 due, 11.3%) |
| Hourly hot item cadence (<7d) | 95/839 current (744 due, 11.3%) |
| Daily cadence coverage | 2854/3893 current (1039 due, 73.3%) |
| Daily PR cadence | 2120/2719 current (599 due, 78%) |
| Daily new issue cadence (<30d) | 734/1174 current (440 due, 62.5%) |
| Weekly older issue cadence | 1847/1848 current (1 due, 99.9%) |
| Due now by cadence | 2140 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 28, 2026, 18:46 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6948 |
| Missing eligible open records | 179 |
| Missing maintainer-authored open records | 72 |
| Missing protected open records | 1 |
| Missing recently-created open records | 125 |
| Archived records that are open again | 0 |
| Stale item records | 6 |
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

Latest review: Apr 28, 2026, 20:43 UTC. Latest close: Apr 28, 2026, 20:44 UTC. Latest comment sync: Apr 28, 2026, 20:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 493 | 23 | 470 | 2 | 3 | 127 | 0 |
| Last 24 hours | 4624 | 312 | 4312 | 4 | 656 | 497 | 17 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/67902.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67902.md) |
| [#66394](https://github.com/openclaw/openclaw/issues/66394) | [Feature]: log rotation support | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/66394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66394.md) |
| [#65895](https://github.com/openclaw/openclaw/pull/65895) | docs: add Bedrock Mantle provider to index and models pages | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/65895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65895.md) |
| [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | duplicate or superseded | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64934.md) |
| [#63081](https://github.com/openclaw/openclaw/pull/63081) | fix(gateway): guard loadState against array-typed pairing state files | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/63081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63081.md) |
| [#68649](https://github.com/openclaw/openclaw/issues/68649) | pdf tool can hang indefinitely, blocking session and preventing /new /restart recovery | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/68649.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68649.md) |
| [#64956](https://github.com/openclaw/openclaw/pull/64956) | fix: dedupe session summaries by session id | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64956.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64956.md) |
| [#56815](https://github.com/openclaw/openclaw/issues/56815) | memorySearch: embedding reindex fails with 'TypeError: fetch failed' after indexing ~40K chunks | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/56815.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56815.md) |
| [#51708](https://github.com/openclaw/openclaw/pull/51708) | docs: remove trailing whitespace from documentation files | closed externally after review | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/51708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51708.md) |
| [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/62764.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62764.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#51596](https://github.com/openclaw/openclaw/pull/51596) | docs: fix custom skill naming example | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51596.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#39726](https://github.com/openclaw/openclaw/pull/39726) | agents: notify chat sessions on empty bg success | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39726.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#39683](https://github.com/openclaw/openclaw/pull/39683) | fix(cron): reject Feishu announce jobs without delivery target | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39683.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#39489](https://github.com/openclaw/openclaw/pull/39489) | fix(feishu): report connection/event activity for health monitor | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39489.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#54646](https://github.com/openclaw/openclaw/pull/54646) | fix(cli): validate gateway-rpc --timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54646.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#40044](https://github.com/openclaw/openclaw/pull/40044) | feat: inject sessionId into runtime context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40044.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#40067](https://github.com/openclaw/openclaw/pull/40067) | fix(gateway): do not crash on Playwright dialog race unhandled rejection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40067.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#40716](https://github.com/openclaw/openclaw/pull/40716) | fix: filter delivery-mirror from all consumer paths (LLM context, webchat, API) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40716.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#41296](https://github.com/openclaw/openclaw/pull/41296) | fix(gateway): improve shutdown error visibility and add close timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41296.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#48377](https://github.com/openclaw/openclaw/pull/48377) | fix(feishu): feishu_doc create action now populates content when provided | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48377.md) | complete | Apr 28, 2026, 20:43 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 20:45 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25075999264](https://github.com/openclaw/clawsweeper/actions/runs/25075999264)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 39 |
| Open items total | 915 |
| Reviewed files | 906 |
| Unreviewed open items | 9 |
| Archived closed files | 11 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 874 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 906 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 1/51 current (50 due, 2%) |
| Hourly hot item cadence (<7d) | 1/51 current (50 due, 2%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/633 current (1 due, 99.8%) |
| Due now by cadence | 60 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 28, 2026, 18:45 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 914 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 7 |
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

Latest review: Apr 28, 2026, 20:40 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 20:40 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 0 | 0 | 0 | 0 | 0 | 20 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 11 | 49 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1866](https://github.com/openclaw/clawhub/issues/1866) | False positive: skill \"snaplii\" flagged for defensive security patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1866.md) | complete | Apr 28, 2026, 20:40 UTC |
| [#1667](https://github.com/openclaw/clawhub/issues/1667) | [False Positive] trump-daily-report v1.1.6 flagged SUSPICIOUS - metadata mismatch (registry shows \"Required env vars: none\" but skill declares config) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1667.md) | complete | Apr 28, 2026, 19:44 UTC |
| [#1574](https://github.com/openclaw/clawhub/issues/1574) | clawhub explore --json returns empty items[] (authenticated, all sort modes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1574.md) | complete | Apr 28, 2026, 19:43 UTC |
| [#1587](https://github.com/openclaw/clawhub/issues/1587) | Skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1587.md) | complete | Apr 28, 2026, 19:43 UTC |
| [#1755](https://github.com/openclaw/clawhub/issues/1755) | AgentID flagged wrongly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1755.md) | complete | Apr 28, 2026, 19:43 UTC |
| [#1515](https://github.com/openclaw/clawhub/issues/1515) | Appeal: nebula-distill and valkyrie-distill falsely flagged as template spam | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1515.md) | complete | Apr 28, 2026, 19:43 UTC |
| [#1764](https://github.com/openclaw/clawhub/issues/1764) | Some people couldn't login clawhub normally over github auth. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1764.md) | complete | Apr 28, 2026, 19:43 UTC |
| [#1695](https://github.com/openclaw/clawhub/issues/1695) | Skill flagged as suspicious - witty-persona | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1695.md) | complete | Apr 28, 2026, 19:43 UTC |
| [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 19:43 UTC |
| [#1711](https://github.com/openclaw/clawhub/issues/1711) | Request: Change skill display name from 'skill' to 'Relic Soul Chip' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1711.md) | complete | Apr 28, 2026, 19:43 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

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

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- Event jobs create target write and report-push credentials only after Codex
  exits.
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

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

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default, subject to the selected repository profile; pass `target_repo`, `apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

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
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `openclaw-ci`. Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy target API calls, and apply/comment-sync jobs use the app token for comments and closes.
  Keep App credentials scoped to the `actions/create-github-app-token` step.
  Review shards run Codex over attacker-controlled issue/PR text, so
  `codexEnv()` also strips these App variables before spawning Codex.

Token flow:

- Review shards log Codex in with `OPENAI_API_KEY`, then run without OpenAI or
  Codex token environment variables.
- ClawSweeper uses the `openclaw-ci` GitHub App token for read-heavy target
  context, falling back to `OPENCLAW_GH_TOKEN` only if app secrets are absent.
- Apply mode uses the app token for review comments and closes, so GitHub
  attributes mutations to `clawsweeper[bot]`.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to target repository issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
