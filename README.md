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

Last dashboard update: Apr 28, 2026, 21:04 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4397 |
| Open PRs | 3453 |
| Open items total | 7850 |
| Reviewed files | 7463 |
| Unreviewed open items | 387 |
| Due now by cadence | 2240 |
| Proposed closes awaiting apply | 16 |
| Closed by Codex apply | 10542 |
| Failed or stale reviews | 13 |
| Archived closed files | 13770 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6935 | 6556 | 379 | 2198 | 16 | 10539 | Apr 28, 2026, 21:00 UTC | Apr 28, 2026, 21:01 UTC | 113 |
| [ClawHub](https://github.com/openclaw/clawhub) | 915 | 907 | 8 | 42 | 0 | 3 | Apr 28, 2026, 20:53 UTC | Apr 28, 2026, 18:47 UTC | 1 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 28, 2026, 21:03 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25074446671) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 20:54 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25075999264) |

### Fleet Activity

Latest review: Apr 28, 2026, 21:00 UTC. Latest close: Apr 28, 2026, 21:01 UTC. Latest comment sync: Apr 28, 2026, 21:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 442 | 10 | 432 | 2 | 2 | 10 | 0 |
| Last hour | 1049 | 17 | 1032 | 3 | 28 | 114 | 1 |
| Last 24 hours | 5782 | 333 | 5449 | 9 | 701 | 532 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54380](https://github.com/openclaw/openclaw/pull/54380) | fix(media): treat legacy .doc containers as binary | closed externally after review | Apr 28, 2026, 21:01 UTC | [records/openclaw-openclaw/closed/54380.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54380.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48360](https://github.com/openclaw/openclaw/issues/48360) | gateway probe false-negative timeout/close on loopback while gateway is healthy | closed externally after review | Apr 28, 2026, 20:53 UTC | [records/openclaw-openclaw/closed/48360.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48360.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63407](https://github.com/openclaw/openclaw/pull/63407) | podman: wire OPENCLAW_INSTALL_BROWSER build-arg to setup script | closed externally after review | Apr 28, 2026, 20:48 UTC | [records/openclaw-openclaw/closed/63407.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63407.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/67902.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67902.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66394](https://github.com/openclaw/openclaw/issues/66394) | [Feature]: log rotation support | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/66394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66394.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65895](https://github.com/openclaw/openclaw/pull/65895) | docs: add Bedrock Mantle provider to index and models pages | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/65895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65895.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | duplicate or superseded | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64934.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63081](https://github.com/openclaw/openclaw/pull/63081) | fix(gateway): guard loadState against array-typed pairing state files | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/63081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63081.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/62764.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62764.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62754](https://github.com/openclaw/openclaw/issues/62754) | Gateway: unhandled promise rejection from pi-agent-core Agent.processEvents after run abort/timeout | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62754.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62754.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | failed | Apr 28, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73028](https://github.com/openclaw/openclaw/pull/73028) | fix: allow cron self-removal in isolated runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73028.md) | complete | Apr 28, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73704](https://github.com/openclaw/openclaw/pull/73704) | fix(safeguard): resolve compaction provider/model before registering runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73704.md) | complete | Apr 28, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73753](https://github.com/openclaw/openclaw/issues/73753) | Discord voice enabled causes sustained gateway CPU spin after embedded Discord connects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73753.md) | complete | Apr 28, 2026, 20:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62164](https://github.com/openclaw/openclaw/pull/62164) | perf(gateway): cache sessions.list results and short-circuit unchanged responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62164.md) | complete | Apr 28, 2026, 20:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50619](https://github.com/openclaw/openclaw/issues/50619) | Feature: /model switch should check context size against target model limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50619.md) | complete | Apr 28, 2026, 20:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73767](https://github.com/openclaw/openclaw/pull/73767) | [codex] Finalize RuntimePlan embedded-runner cleanup stack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73767.md) | complete | Apr 28, 2026, 20:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49019](https://github.com/openclaw/openclaw/issues/49019) | [Feature]: Add an optional result-return mode for /hooks/agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49019.md) | complete | Apr 28, 2026, 20:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50300](https://github.com/openclaw/openclaw/pull/50300) | Fix session transcript timestamps to use local timezone offsets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50300.md) | complete | Apr 28, 2026, 20:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73755](https://github.com/openclaw/openclaw/pull/73755) | fix(gateway): preserve external Tailscale Funnel routes in serve mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73755.md) | complete | Apr 28, 2026, 20:54 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 21:03 UTC

State: Review publish complete

Merged review artifacts for run 25074446671. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25074446671](https://github.com/openclaw/clawsweeper/actions/runs/25074446671)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3521 |
| Open PRs | 3414 |
| Open items total | 6935 |
| Reviewed files | 6556 |
| Unreviewed open items | 379 |
| Archived closed files | 13759 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3342 |
| Proposed issue closes | 16 (0.5% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3202 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6544 |
| Proposed closes awaiting apply | 16 (0.2% of fresh reviews) |
| Closed by Codex apply | 10539 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 52/841 current (789 due, 6.2%) |
| Hourly hot item cadence (<7d) | 52/841 current (789 due, 6.2%) |
| Daily cadence coverage | 2852/3879 current (1027 due, 73.5%) |
| Daily PR cadence | 2122/2712 current (590 due, 78.2%) |
| Daily new issue cadence (<30d) | 730/1167 current (437 due, 62.6%) |
| Weekly older issue cadence | 1833/1836 current (3 due, 99.8%) |
| Due now by cadence | 2198 |

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

Latest review: Apr 28, 2026, 21:00 UTC. Latest close: Apr 28, 2026, 21:01 UTC. Latest comment sync: Apr 28, 2026, 21:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 183 | 10 | 173 | 2 | 2 | 10 | 0 |
| Last hour | 548 | 17 | 531 | 2 | 28 | 113 | 1 |
| Last 24 hours | 4864 | 330 | 4534 | 8 | 690 | 503 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#54380](https://github.com/openclaw/openclaw/pull/54380) | fix(media): treat legacy .doc containers as binary | closed externally after review | Apr 28, 2026, 21:01 UTC | [records/openclaw-openclaw/closed/54380.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54380.md) |
| [#48360](https://github.com/openclaw/openclaw/issues/48360) | gateway probe false-negative timeout/close on loopback while gateway is healthy | closed externally after review | Apr 28, 2026, 20:53 UTC | [records/openclaw-openclaw/closed/48360.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48360.md) |
| [#63407](https://github.com/openclaw/openclaw/pull/63407) | podman: wire OPENCLAW_INSTALL_BROWSER build-arg to setup script | closed externally after review | Apr 28, 2026, 20:48 UTC | [records/openclaw-openclaw/closed/63407.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63407.md) |
| [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/67902.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67902.md) |
| [#66394](https://github.com/openclaw/openclaw/issues/66394) | [Feature]: log rotation support | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/66394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66394.md) |
| [#65895](https://github.com/openclaw/openclaw/pull/65895) | docs: add Bedrock Mantle provider to index and models pages | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/65895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65895.md) |
| [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | duplicate or superseded | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64934.md) |
| [#63081](https://github.com/openclaw/openclaw/pull/63081) | fix(gateway): guard loadState against array-typed pairing state files | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/63081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63081.md) |
| [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/62764.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62764.md) |
| [#62754](https://github.com/openclaw/openclaw/issues/62754) | Gateway: unhandled promise rejection from pi-agent-core Agent.processEvents after run abort/timeout | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62754.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62754.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | failed | Apr 28, 2026, 21:00 UTC |
| [#73028](https://github.com/openclaw/openclaw/pull/73028) | fix: allow cron self-removal in isolated runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73028.md) | complete | Apr 28, 2026, 21:00 UTC |
| [#73704](https://github.com/openclaw/openclaw/pull/73704) | fix(safeguard): resolve compaction provider/model before registering runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73704.md) | complete | Apr 28, 2026, 21:00 UTC |
| [#73753](https://github.com/openclaw/openclaw/issues/73753) | Discord voice enabled causes sustained gateway CPU spin after embedded Discord connects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73753.md) | complete | Apr 28, 2026, 20:58 UTC |
| [#62164](https://github.com/openclaw/openclaw/pull/62164) | perf(gateway): cache sessions.list results and short-circuit unchanged responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62164.md) | complete | Apr 28, 2026, 20:57 UTC |
| [#50619](https://github.com/openclaw/openclaw/issues/50619) | Feature: /model switch should check context size against target model limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50619.md) | complete | Apr 28, 2026, 20:56 UTC |
| [#73767](https://github.com/openclaw/openclaw/pull/73767) | [codex] Finalize RuntimePlan embedded-runner cleanup stack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73767.md) | complete | Apr 28, 2026, 20:56 UTC |
| [#49019](https://github.com/openclaw/openclaw/issues/49019) | [Feature]: Add an optional result-return mode for /hooks/agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49019.md) | complete | Apr 28, 2026, 20:55 UTC |
| [#50300](https://github.com/openclaw/openclaw/pull/50300) | Fix session transcript timestamps to use local timezone offsets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50300.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#73755](https://github.com/openclaw/openclaw/pull/73755) | fix(gateway): preserve external Tailscale Funnel routes in serve mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73755.md) | complete | Apr 28, 2026, 20:54 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 20:54 UTC

State: Review publish complete

Merged review artifacts for run 25075999264. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25075999264](https://github.com/openclaw/clawsweeper/actions/runs/25075999264)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 39 |
| Open items total | 915 |
| Reviewed files | 907 |
| Unreviewed open items | 8 |
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
| Hourly cadence coverage | 18/51 current (33 due, 35.3%) |
| Hourly hot item cadence (<7d) | 18/51 current (33 due, 35.3%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/633 current (1 due, 99.8%) |
| Due now by cadence | 42 |

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

Latest review: Apr 28, 2026, 20:53 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 20:40 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 259 | 0 | 259 | 0 | 0 | 0 | 0 |
| Last hour | 501 | 0 | 501 | 1 | 0 | 1 | 0 |
| Last 24 hours | 918 | 3 | 915 | 1 | 11 | 29 | 0 |

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
| [#1070](https://github.com/openclaw/clawhub/issues/1070) | false flagg — suspicious patterns detected for tool-connector | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1070.md) | complete | Apr 28, 2026, 20:53 UTC |
| [#1172](https://github.com/openclaw/clawhub/issues/1172) | [False Positive] joe-markdown-to-docx flagged for legitimate network requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1172.md) | complete | Apr 28, 2026, 20:53 UTC |
| [#1177](https://github.com/openclaw/clawhub/issues/1177) | cant publish skill: personal publisher not found | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1177.md) | complete | Apr 28, 2026, 20:53 UTC |
| [#1022](https://github.com/openclaw/clawhub/issues/1022) | False positive flag on mind-security skill — legitimate AI security toolkit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1022.md) | complete | Apr 28, 2026, 20:53 UTC |
| [#1153](https://github.com/openclaw/clawhub/issues/1153) | Request to hard-delete all versions of JasonStarlight/phosor-ai | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1153.md) | complete | Apr 28, 2026, 20:52 UTC |
| [#1092](https://github.com/openclaw/clawhub/issues/1092) | False positive: baoshan685/easy-xiaohongshu flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1092.md) | complete | Apr 28, 2026, 20:52 UTC |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) | complete | Apr 28, 2026, 20:52 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 20:52 UTC |
| [#1823](https://github.com/openclaw/clawhub/issues/1823) | False positive: wangbatochn/gstack-dev v1.0.1 safety docs flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1823.md) | complete | Apr 28, 2026, 20:52 UTC |
| [#1173](https://github.com/openclaw/clawhub/issues/1173) | Cannot publish: Personal publisher not found / pagination error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1173.md) | complete | Apr 28, 2026, 20:52 UTC |

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
