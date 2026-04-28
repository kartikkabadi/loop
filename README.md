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

Last dashboard update: Apr 28, 2026, 23:40 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4395 |
| Open PRs | 3460 |
| Open items total | 7855 |
| Reviewed files | 7463 |
| Unreviewed open items | 392 |
| Due now by cadence | 2058 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10588 |
| Failed or stale reviews | 34 |
| Archived closed files | 13835 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6941 | 6555 | 386 | 1996 | 0 | 10584 | Apr 28, 2026, 23:36 UTC | Apr 28, 2026, 23:37 UTC | 813 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 908 | 6 | 62 | 0 | 4 | Apr 28, 2026, 23:31 UTC | Apr 28, 2026, 23:32 UTC | 413 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 28, 2026, 23:40 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25083277540) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 23:33 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25082711223) |

### Fleet Activity

Latest review: Apr 28, 2026, 23:36 UTC. Latest close: Apr 28, 2026, 23:37 UTC. Latest comment sync: Apr 28, 2026, 23:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 29 | 0 | 29 | 1 | 6 | 407 | 0 |
| Last hour | 1093 | 9 | 1084 | 26 | 24 | 1226 | 3 |
| Last 24 hours | 6233 | 368 | 5865 | 30 | 765 | 1671 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65418](https://github.com/openclaw/openclaw/issues/65418) | [Bug] Anthropic adapter mutates replayed thinking block text via sanitizeTransportPayloadText, breaking signature validation | cannot reproduce on current main | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/65418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51312](https://github.com/openclaw/openclaw/issues/51312) | Support per-agent userTimezone override | duplicate or superseded | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/51312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51312.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73852](https://github.com/openclaw/openclaw/pull/73852) | Use owner identity for Telegram exec approvals | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73852.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73414](https://github.com/openclaw/openclaw/pull/73414) | docs: add clawhub rescan recovery guidance | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73414.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73414.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65894](https://github.com/openclaw/openclaw/pull/65894) | fix: add local build context to docker-compose | closed externally after review | Apr 28, 2026, 23:29 UTC | [records/openclaw-openclaw/closed/65894.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65894.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73863](https://github.com/openclaw/openclaw/issues/73863) | Feature request: Enhanced logging and configurable log rotation | already implemented on main | Apr 28, 2026, 23:23 UTC | [records/openclaw-openclaw/closed/73863.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73863.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73862](https://github.com/openclaw/openclaw/issues/73862) | [Bug]: Gateway memory and connection accumulation over extended runtime on Windows | duplicate or superseded | Apr 28, 2026, 23:22 UTC | [records/openclaw-openclaw/closed/73862.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73862.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73858](https://github.com/openclaw/openclaw/issues/73858) | [Bug] Custom provider models without explicit `provider` field fail `resolveGatewayModelSupportsImages` — images offloaded as text | already implemented on main | Apr 28, 2026, 23:21 UTC | [records/openclaw-openclaw/closed/73858.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73858.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 28, 2026, 23:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73795](https://github.com/openclaw/openclaw/issues/73795) | toolProgress config stripped from channels without streaming.mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73795.md) | complete | Apr 28, 2026, 23:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73802](https://github.com/openclaw/openclaw/issues/73802) | Discord exec approval card/buttons not delivered in v2026.4.26 (regression after #71804) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73802.md) | complete | Apr 28, 2026, 23:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73837](https://github.com/openclaw/openclaw/issues/73837) | [Bug]: Node.js auto-installer fails silently with ioctl errors then falsely reports success before crashing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73837.md) | complete | Apr 28, 2026, 23:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73836](https://github.com/openclaw/openclaw/issues/73836) | [Bug]: Control UI/Gateway responsiveness regression during active runs: UI reconnect stalls, Telegram typing gaps, heartbeat poll noise, and media mirror UX issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73836.md) | complete | Apr 28, 2026, 23:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68464](https://github.com/openclaw/openclaw/pull/68464) | Harden subagent completion delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68464.md) | complete | Apr 28, 2026, 23:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67777](https://github.com/openclaw/openclaw/issues/67777) | [Bug]: Subagent completion delivery can be lost on direct-announce timeout, drain, or orphan prune | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67777.md) | complete | Apr 28, 2026, 23:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40463](https://github.com/openclaw/openclaw/pull/40463) | fix(msteams): fix image attachment download for channel and DM messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40463.md) | complete | Apr 28, 2026, 23:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#34004](https://github.com/openclaw/openclaw/issues/34004) | [Feature]: Discord self-profile updates (strict bot-only scope for nickname/avatar/status) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34004.md) | complete | Apr 28, 2026, 23:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44551](https://github.com/openclaw/openclaw/issues/44551) | [Feature]: [Feature Request] Gateway UI 支持中文显示 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44551.md) | complete | Apr 28, 2026, 23:35 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 23:40 UTC

State: Apply finished

Apply/comment-sync run finished with 0 fresh closes out of requested limit 2. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25083277540](https://github.com/openclaw/clawsweeper/actions/runs/25083277540)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3519 |
| Open PRs | 3422 |
| Open items total | 6941 |
| Reviewed files | 6555 |
| Unreviewed open items | 386 |
| Archived closed files | 13821 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3333 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3211 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6544 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10584 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 119/866 current (747 due, 13.7%) |
| Hourly hot item cadence (<7d) | 119/866 current (747 due, 13.7%) |
| Daily cadence coverage | 3008/3870 current (862 due, 77.7%) |
| Daily PR cadence | 2230/2707 current (477 due, 82.4%) |
| Daily new issue cadence (<30d) | 778/1163 current (385 due, 66.9%) |
| Weekly older issue cadence | 1818/1819 current (1 due, 99.9%) |
| Due now by cadence | 1996 |

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

Latest review: Apr 28, 2026, 23:36 UTC. Latest close: Apr 28, 2026, 23:37 UTC. Latest comment sync: Apr 28, 2026, 23:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 28 | 0 | 28 | 0 | 5 | 386 | 0 |
| Last hour | 577 | 9 | 568 | 3 | 22 | 813 | 3 |
| Last 24 hours | 5311 | 365 | 4946 | 7 | 751 | 1207 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65418](https://github.com/openclaw/openclaw/issues/65418) | [Bug] Anthropic adapter mutates replayed thinking block text via sanitizeTransportPayloadText, breaking signature validation | cannot reproduce on current main | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/65418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65418.md) |
| [#51312](https://github.com/openclaw/openclaw/issues/51312) | Support per-agent userTimezone override | duplicate or superseded | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/51312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51312.md) |
| [#73852](https://github.com/openclaw/openclaw/pull/73852) | Use owner identity for Telegram exec approvals | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73852.md) |
| [#73414](https://github.com/openclaw/openclaw/pull/73414) | docs: add clawhub rescan recovery guidance | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73414.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73414.md) |
| [#65894](https://github.com/openclaw/openclaw/pull/65894) | fix: add local build context to docker-compose | closed externally after review | Apr 28, 2026, 23:29 UTC | [records/openclaw-openclaw/closed/65894.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65894.md) |
| [#73863](https://github.com/openclaw/openclaw/issues/73863) | Feature request: Enhanced logging and configurable log rotation | already implemented on main | Apr 28, 2026, 23:23 UTC | [records/openclaw-openclaw/closed/73863.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73863.md) |
| [#73862](https://github.com/openclaw/openclaw/issues/73862) | [Bug]: Gateway memory and connection accumulation over extended runtime on Windows | duplicate or superseded | Apr 28, 2026, 23:22 UTC | [records/openclaw-openclaw/closed/73862.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73862.md) |
| [#73858](https://github.com/openclaw/openclaw/issues/73858) | [Bug] Custom provider models without explicit `provider` field fail `resolveGatewayModelSupportsImages` — images offloaded as text | already implemented on main | Apr 28, 2026, 23:21 UTC | [records/openclaw-openclaw/closed/73858.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73858.md) |
| [#73857](https://github.com/openclaw/openclaw/issues/73857) | Slack socket-mode disconnects under main-thread load (need worker thread or configurable pong timeout) | already implemented on main | Apr 28, 2026, 23:19 UTC | [records/openclaw-openclaw/closed/73857.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73857.md) |
| [#73856](https://github.com/openclaw/openclaw/pull/73856) | ci: shard agent runtime codeql quality | kept open | Apr 28, 2026, 23:17 UTC | [records/openclaw-openclaw/closed/73856.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73856.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 28, 2026, 23:36 UTC |
| [#73795](https://github.com/openclaw/openclaw/issues/73795) | toolProgress config stripped from channels without streaming.mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73795.md) | complete | Apr 28, 2026, 23:36 UTC |
| [#73802](https://github.com/openclaw/openclaw/issues/73802) | Discord exec approval card/buttons not delivered in v2026.4.26 (regression after #71804) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73802.md) | complete | Apr 28, 2026, 23:36 UTC |
| [#73837](https://github.com/openclaw/openclaw/issues/73837) | [Bug]: Node.js auto-installer fails silently with ioctl errors then falsely reports success before crashing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73837.md) | complete | Apr 28, 2026, 23:36 UTC |
| [#73836](https://github.com/openclaw/openclaw/issues/73836) | [Bug]: Control UI/Gateway responsiveness regression during active runs: UI reconnect stalls, Telegram typing gaps, heartbeat poll noise, and media mirror UX issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73836.md) | complete | Apr 28, 2026, 23:36 UTC |
| [#68464](https://github.com/openclaw/openclaw/pull/68464) | Harden subagent completion delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68464.md) | complete | Apr 28, 2026, 23:36 UTC |
| [#67777](https://github.com/openclaw/openclaw/issues/67777) | [Bug]: Subagent completion delivery can be lost on direct-announce timeout, drain, or orphan prune | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67777.md) | complete | Apr 28, 2026, 23:35 UTC |
| [#40463](https://github.com/openclaw/openclaw/pull/40463) | fix(msteams): fix image attachment download for channel and DM messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/40463.md) | complete | Apr 28, 2026, 23:35 UTC |
| [#34004](https://github.com/openclaw/openclaw/issues/34004) | [Feature]: Discord self-profile updates (strict bot-only scope for nickname/avatar/status) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34004.md) | complete | Apr 28, 2026, 23:35 UTC |
| [#44551](https://github.com/openclaw/openclaw/issues/44551) | [Feature]: [Feature Request] Gateway UI 支持中文显示 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44551.md) | complete | Apr 28, 2026, 23:35 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 23:33 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 600,677,772,786,888,1511,1519,1522,1524,1525,1539,1577,1589,1653,1678,1738,1743,1866,1867,1868.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25082711223](https://github.com/openclaw/clawsweeper/actions/runs/25082711223)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 38 |
| Open items total | 914 |
| Reviewed files | 908 |
| Unreviewed open items | 6 |
| Archived closed files | 14 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 853 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 885 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 4 |
| Failed or stale reviews | 23 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 18/52 current (34 due, 34.6%) |
| Hourly hot item cadence (<7d) | 18/52 current (34 due, 34.6%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 613/634 current (21 due, 96.7%) |
| Due now by cadence | 62 |

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

Latest review: Apr 28, 2026, 23:31 UTC. Latest close: Apr 28, 2026, 23:32 UTC. Latest comment sync: Apr 28, 2026, 23:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 1 | 1 | 21 | 0 |
| Last hour | 516 | 0 | 516 | 23 | 2 | 413 | 0 |
| Last 24 hours | 922 | 3 | 919 | 23 | 14 | 464 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1511](https://github.com/openclaw/clawhub/issues/1511) | [False Positive] SafeClaw Security Auditor flagged as malicious — security tool with detection patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1511.md) | failed | Apr 28, 2026, 23:31 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 28, 2026, 23:24 UTC |
| [#677](https://github.com/openclaw/clawhub/issues/677) | imap-mail skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/677.md) | complete | Apr 28, 2026, 23:24 UTC |
| [#772](https://github.com/openclaw/clawhub/issues/772) | CLI login button disabled - Convex WebSocket connection failing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/772.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#1525](https://github.com/openclaw/clawhub/issues/1525) | shejian ClawHub Skill has been tagged as suspicious but everything looks fine in the scan results from VirusTotal  Thanks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1525.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#888](https://github.com/openclaw/clawhub/issues/888) | Skill flagged incorrectly - urllib used for legitimate API integration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/888.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#1653](https://github.com/openclaw/clawhub/issues/1653) | add skill: robert0812/maton-browse-plan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1653.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#1866](https://github.com/openclaw/clawhub/issues/1866) | False positive: skill \"snaplii\" flagged for defensive security patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1866.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#1577](https://github.com/openclaw/clawhub/issues/1577) | Plugin search returns 500 Server Error for all queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1577.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#786](https://github.com/openclaw/clawhub/issues/786) | [false positive] Airtable w/Python skill marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/786.md) | complete | Apr 28, 2026, 23:23 UTC |

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
