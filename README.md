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

Last dashboard update: Apr 28, 2026, 17:44 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4415 |
| Open PRs | 3445 |
| Open items total | 7860 |
| Reviewed files | 7471 |
| Unreviewed open items | 389 |
| Due now by cadence | 2347 |
| Proposed closes awaiting apply | 9 |
| Closed by Codex apply | 10496 |
| Failed or stale reviews | 6 |
| Archived closed files | 13676 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6946 | 6564 | 382 | 2325 | 9 | 10493 | Apr 28, 2026, 17:43 UTC | Apr 28, 2026, 17:43 UTC | 727 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 22 | 0 | 3 | Apr 28, 2026, 17:25 UTC | Apr 28, 2026, 08:18 UTC | 58 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 28, 2026, 17:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25068398837) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 17:27 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25067584269) |

### Fleet Activity

Latest review: Apr 28, 2026, 17:43 UTC. Latest close: Apr 28, 2026, 17:43 UTC. Latest comment sync: Apr 28, 2026, 17:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 18 | 0 | 18 | 0 | 21 | 253 | 2 |
| Last hour | 663 | 43 | 620 | 1 | 44 | 785 | 3 |
| Last 24 hours | 5044 | 279 | 4765 | 3 | 607 | 1617 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61572](https://github.com/openclaw/openclaw/pull/61572) | Harden Discord reads and message targeting | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61572.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61572.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61366](https://github.com/openclaw/openclaw/pull/61366) | fix: resolve intermittent 'unknown channel' errors for plugin channels in sessions_spawn | already implemented on main | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61366.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61366.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61349](https://github.com/openclaw/openclaw/pull/61349) | fix: suppress raw JSON parse errors from truncated tool call streams | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61349.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61349.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61341](https://github.com/openclaw/openclaw/issues/61341) | [Bug]: The system continuously sends instructions to opnelcaw. | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61341.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61341.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61237](https://github.com/openclaw/openclaw/issues/61237) | Agent repeatedly acts autonomously despite explicit rules in memory/context files | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61237.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61237.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61119](https://github.com/openclaw/openclaw/pull/61119) | UI: localize connect command labels | already implemented on main | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61119.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61119.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61010](https://github.com/openclaw/openclaw/issues/61010) | [Bug]: Model supposed to run in workspace yet sees whole environment | duplicate or superseded | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/61010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61010.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60782](https://github.com/openclaw/openclaw/issues/60782) | [Bug] Web UI global update shows 'global update (omit optional)' error | already implemented on main | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/60782.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60782.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60719](https://github.com/openclaw/openclaw/issues/60719) | Heartbeat sessions never compact — memory system incompatible with short-session agent patterns | belongs on ClawHub | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/60719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60719.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60490](https://github.com/openclaw/openclaw/issues/60490) | [Bug]: Gateway not starting on Windows automatically (need to start manually) – Dashboard unreachable (127.0.0.1 refused to connect) | already implemented on main | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/60490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60490.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67805](https://github.com/openclaw/openclaw/pull/67805) | fix(memory-core): fall back when mcporter query returns no results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67805.md) | complete | Apr 28, 2026, 17:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 17:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73104](https://github.com/openclaw/openclaw/pull/73104) | fix(telegram): handle edited message updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73104.md) | complete | Apr 28, 2026, 17:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73694](https://github.com/openclaw/openclaw/pull/73694) | Restore Codex OAuth model routes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73694.md) | complete | Apr 28, 2026, 17:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73708.md) | complete | Apr 28, 2026, 17:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73707](https://github.com/openclaw/openclaw/pull/73707) | feat(skills): add persist flag and trustedSources config for commercial use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73707.md) | complete | Apr 28, 2026, 17:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73705](https://github.com/openclaw/openclaw/issues/73705) | [Bug]: 2026.4.25+ macOS startup hot loop / 100% CPU in bundled plugin path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73705.md) | complete | Apr 28, 2026, 17:38 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73635](https://github.com/openclaw/openclaw/pull/73635) | Errors: rewrite 403 HTML auth pages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73635.md) | complete | Apr 28, 2026, 17:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73706](https://github.com/openclaw/openclaw/pull/73706) | fix(outbound): thread sessionKey into message_sending hook context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73706.md) | complete | Apr 28, 2026, 17:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73627](https://github.com/openclaw/openclaw/pull/73627) | fix(sandbox): explicitly pass sandboxSessionKey to prevent Docker probes when mode is off (#73586) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73627.md) | complete | Apr 28, 2026, 17:36 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 17:44 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 20. Total fresh closes in this run: 20/20. Result records in checkpoint: 26, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25068398837](https://github.com/openclaw/clawsweeper/actions/runs/25068398837)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3539 |
| Open PRs | 3407 |
| Open items total | 6946 |
| Reviewed files | 6564 |
| Unreviewed open items | 382 |
| Archived closed files | 13666 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3363 |
| Proposed issue closes | 6 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3195 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6558 |
| Proposed closes awaiting apply | 9 (0.1% of fresh reviews) |
| Closed by Codex apply | 10493 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 83/798 current (715 due, 10.4%) |
| Hourly hot item cadence (<7d) | 83/798 current (715 due, 10.4%) |
| Daily cadence coverage | 2697/3924 current (1227 due, 68.7%) |
| Daily PR cadence | 2007/2730 current (723 due, 73.5%) |
| Daily new issue cadence (<30d) | 690/1194 current (504 due, 57.8%) |
| Weekly older issue cadence | 1841/1842 current (1 due, 99.9%) |
| Due now by cadence | 2325 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 28, 2026, 12:54 UTC

Status: **Action needed**

Targeted review input: `64563,65635,72522,72527,72529,72531,72532,72535,72536,72537`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6974 |
| Missing eligible open records | 117 |
| Missing maintainer-authored open records | 74 |
| Missing protected open records | 1 |
| Missing recently-created open records | 237 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 17:43 UTC. Latest close: Apr 28, 2026, 17:43 UTC. Latest comment sync: Apr 28, 2026, 17:43 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 18 | 0 | 18 | 0 | 21 | 253 | 2 |
| Last hour | 605 | 43 | 562 | 1 | 44 | 727 | 3 |
| Last 24 hours | 4127 | 276 | 3851 | 3 | 597 | 1297 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#61572](https://github.com/openclaw/openclaw/pull/61572) | Harden Discord reads and message targeting | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61572.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61572.md) |
| [#61366](https://github.com/openclaw/openclaw/pull/61366) | fix: resolve intermittent 'unknown channel' errors for plugin channels in sessions_spawn | already implemented on main | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61366.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61366.md) |
| [#61349](https://github.com/openclaw/openclaw/pull/61349) | fix: suppress raw JSON parse errors from truncated tool call streams | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61349.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61349.md) |
| [#61341](https://github.com/openclaw/openclaw/issues/61341) | [Bug]: The system continuously sends instructions to opnelcaw. | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61341.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61341.md) |
| [#61237](https://github.com/openclaw/openclaw/issues/61237) | Agent repeatedly acts autonomously despite explicit rules in memory/context files | duplicate or superseded | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61237.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61237.md) |
| [#61119](https://github.com/openclaw/openclaw/pull/61119) | UI: localize connect command labels | already implemented on main | Apr 28, 2026, 17:43 UTC | [records/openclaw-openclaw/closed/61119.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61119.md) |
| [#61010](https://github.com/openclaw/openclaw/issues/61010) | [Bug]: Model supposed to run in workspace yet sees whole environment | duplicate or superseded | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/61010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61010.md) |
| [#60782](https://github.com/openclaw/openclaw/issues/60782) | [Bug] Web UI global update shows 'global update (omit optional)' error | already implemented on main | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/60782.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60782.md) |
| [#60719](https://github.com/openclaw/openclaw/issues/60719) | Heartbeat sessions never compact — memory system incompatible with short-session agent patterns | belongs on ClawHub | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/60719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60719.md) |
| [#60490](https://github.com/openclaw/openclaw/issues/60490) | [Bug]: Gateway not starting on Windows automatically (need to start manually) – Dashboard unreachable (127.0.0.1 refused to connect) | already implemented on main | Apr 28, 2026, 17:42 UTC | [records/openclaw-openclaw/closed/60490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60490.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67805](https://github.com/openclaw/openclaw/pull/67805) | fix(memory-core): fall back when mcporter query returns no results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67805.md) | complete | Apr 28, 2026, 17:43 UTC |
| [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 17:42 UTC |
| [#73104](https://github.com/openclaw/openclaw/pull/73104) | fix(telegram): handle edited message updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73104.md) | complete | Apr 28, 2026, 17:40 UTC |
| [#73694](https://github.com/openclaw/openclaw/pull/73694) | Restore Codex OAuth model routes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73694.md) | complete | Apr 28, 2026, 17:40 UTC |
| [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73708.md) | complete | Apr 28, 2026, 17:39 UTC |
| [#73707](https://github.com/openclaw/openclaw/pull/73707) | feat(skills): add persist flag and trustedSources config for commercial use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73707.md) | complete | Apr 28, 2026, 17:39 UTC |
| [#73705](https://github.com/openclaw/openclaw/issues/73705) | [Bug]: 2026.4.25+ macOS startup hot loop / 100% CPU in bundled plugin path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73705.md) | complete | Apr 28, 2026, 17:38 UTC |
| [#73635](https://github.com/openclaw/openclaw/pull/73635) | Errors: rewrite 403 HTML auth pages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73635.md) | complete | Apr 28, 2026, 17:37 UTC |
| [#73706](https://github.com/openclaw/openclaw/pull/73706) | fix(outbound): thread sessionKey into message_sending hook context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73706.md) | complete | Apr 28, 2026, 17:37 UTC |
| [#73627](https://github.com/openclaw/openclaw/pull/73627) | fix(sandbox): explicitly pass sandboxSessionKey to prevent Docker probes when mode is off (#73586) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73627.md) | complete | Apr 28, 2026, 17:36 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 17:27 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1027,1381,1382,1383,1384,1385,1392,1395,1397,1401,1408,1410,1412,1413,1414,1422,1445,1477,1591,1672.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25067584269](https://github.com/openclaw/clawsweeper/actions/runs/25067584269)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 38 |
| Open items total | 914 |
| Reviewed files | 907 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 37/52 current (15 due, 71.2%) |
| Hourly hot item cadence (<7d) | 37/52 current (15 due, 71.2%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/632 current (0 due, 100%) |
| Due now by cadence | 22 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 28, 2026, 12:54 UTC

Status: **Passing**

Targeted review input: `756`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 912 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 7 |
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

Latest review: Apr 28, 2026, 17:25 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 17:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 58 | 0 | 58 | 0 | 0 | 58 | 0 |
| Last 24 hours | 917 | 3 | 914 | 0 | 10 | 320 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |
| [#1842](https://github.com/openclaw/clawhub/pull/1842) | fix: constrain plugin catalog queries | closed externally after review | Apr 28, 2026, 05:05 UTC | [records/openclaw-clawhub/closed/1842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1842.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1422](https://github.com/openclaw/clawhub/issues/1422) | ai-capability-analyzer has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1422.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1413](https://github.com/openclaw/clawhub/issues/1413) | Skill: threadline (by @vidursharma202-del) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1413.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1408](https://github.com/openclaw/clawhub/issues/1408) | Skill 页面可访问但搜索无法找到 - 搜索索引问题 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1408.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1397](https://github.com/openclaw/clawhub/issues/1397) | [Skill flagged]: False Positive High Confidence Security Flag - dxm-agent-wallet Skill (https://clawhub.ai/guofeng007/dxm-agent-wallet) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1397.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1445](https://github.com/openclaw/clawhub/issues/1445) | False positive: context-slimming flagged as suspicious — benign workspace optimization skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1445.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1382](https://github.com/openclaw/clawhub/issues/1382) | Login issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1382.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1401](https://github.com/openclaw/clawhub/issues/1401) | tv-indicators-analysis 错误标记 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1401.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1381](https://github.com/openclaw/clawhub/issues/1381) | delet skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1381.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1477](https://github.com/openclaw/clawhub/issues/1477) | [Appeal] Account \"clawgrid\" locked after skill flagged — requesting account restoration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1477.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1672](https://github.com/openclaw/clawhub/issues/1672) | Security scan findings: credential-pattern and remote-exec hits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1672.md) | complete | Apr 28, 2026, 17:25 UTC |

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
