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

Last dashboard update: Apr 28, 2026, 21:07 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4223 |
| Open PRs | 3241 |
| Open items total | 7464 |
| Reviewed files | 7464 |
| Unreviewed open items | 0 |
| Due now by cadence | 1851 |
| Proposed closes awaiting apply | 16 |
| Closed by Codex apply | 10542 |
| Failed or stale reviews | 14 |
| Archived closed files | 13770 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6557 | 6557 | 0 | 1816 | 16 | 10539 | Apr 28, 2026, 21:04 UTC | Apr 28, 2026, 21:01 UTC | 119 |
| [ClawHub](https://github.com/openclaw/clawhub) | 907 | 907 | 0 | 35 | 0 | 3 | Apr 28, 2026, 21:03 UTC | Apr 28, 2026, 18:47 UTC | 481 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 21:07 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25077718449) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 21:06 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25075999264) |

### Fleet Activity

Latest review: Apr 28, 2026, 21:04 UTC. Latest close: Apr 28, 2026, 21:01 UTC. Latest comment sync: Apr 28, 2026, 21:06 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 60 | 2 | 58 | 4 | 2 | 494 | 0 |
| Last hour | 1053 | 17 | 1036 | 4 | 27 | 600 | 1 |
| Last 24 hours | 5783 | 333 | 5450 | 10 | 701 | 1016 | 18 |

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
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73799](https://github.com/openclaw/openclaw/pull/73799) | fix(media): treat legacy Word docs as binary attachments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73799.md) | complete | Apr 28, 2026, 21:04 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#613](https://github.com/openclaw/clawhub/issues/613) | Feature request: Device flow auth for headless agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/613.md) | failed | Apr 28, 2026, 21:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | failed | Apr 28, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73028](https://github.com/openclaw/openclaw/pull/73028) | fix: allow cron self-removal in isolated runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73028.md) | complete | Apr 28, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73704](https://github.com/openclaw/openclaw/pull/73704) | fix(safeguard): resolve compaction provider/model before registering runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73704.md) | complete | Apr 28, 2026, 21:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73753](https://github.com/openclaw/openclaw/issues/73753) | Discord voice enabled causes sustained gateway CPU spin after embedded Discord connects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73753.md) | complete | Apr 28, 2026, 20:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73655](https://github.com/openclaw/openclaw/issues/73655) | Gateway leak triad on plugin restart: Manifest EADDRINUSE retry loop, signal-handler accumulation, sync I/O on session JSONL → WS handshake starvation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73655.md) | complete | Apr 28, 2026, 20:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62164](https://github.com/openclaw/openclaw/pull/62164) | perf(gateway): cache sessions.list results and short-circuit unchanged responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62164.md) | complete | Apr 28, 2026, 20:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72950](https://github.com/openclaw/openclaw/issues/72950) | Plugin config (plugins.entries.<id>.config) has no env-var or writable-overlay path — every change requires image rebuild in policy-locked sandboxes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72950.md) | complete | Apr 28, 2026, 20:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50619](https://github.com/openclaw/openclaw/issues/50619) | Feature: /model switch should check context size against target model limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50619.md) | complete | Apr 28, 2026, 20:56 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 21:07 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25077718449](https://github.com/openclaw/clawsweeper/actions/runs/25077718449)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3348 |
| Open PRs | 3209 |
| Open items total | 6557 |
| Reviewed files | 6557 |
| Unreviewed open items | 0 |
| Archived closed files | 13759 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3342 |
| Proposed issue closes | 16 (0.5% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3203 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6545 |
| Proposed closes awaiting apply | 16 (0.2% of fresh reviews) |
| Closed by Codex apply | 10539 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 56/842 current (786 due, 6.7%) |
| Hourly hot item cadence (<7d) | 56/842 current (786 due, 6.7%) |
| Daily cadence coverage | 2852/3879 current (1027 due, 73.5%) |
| Daily PR cadence | 2122/2712 current (590 due, 78.2%) |
| Daily new issue cadence (<30d) | 730/1167 current (437 due, 62.6%) |
| Weekly older issue cadence | 1833/1836 current (3 due, 99.8%) |
| Due now by cadence | 1816 |

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

Latest review: Apr 28, 2026, 21:04 UTC. Latest close: Apr 28, 2026, 21:01 UTC. Latest comment sync: Apr 28, 2026, 21:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 30 | 2 | 28 | 2 | 2 | 14 | 0 |
| Last hour | 552 | 17 | 535 | 2 | 27 | 119 | 1 |
| Last 24 hours | 4865 | 330 | 4535 | 8 | 690 | 507 | 18 |

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
| [#73799](https://github.com/openclaw/openclaw/pull/73799) | fix(media): treat legacy Word docs as binary attachments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73799.md) | complete | Apr 28, 2026, 21:04 UTC |
| [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | failed | Apr 28, 2026, 21:00 UTC |
| [#73028](https://github.com/openclaw/openclaw/pull/73028) | fix: allow cron self-removal in isolated runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73028.md) | complete | Apr 28, 2026, 21:00 UTC |
| [#73704](https://github.com/openclaw/openclaw/pull/73704) | fix(safeguard): resolve compaction provider/model before registering runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73704.md) | complete | Apr 28, 2026, 21:00 UTC |
| [#73753](https://github.com/openclaw/openclaw/issues/73753) | Discord voice enabled causes sustained gateway CPU spin after embedded Discord connects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73753.md) | complete | Apr 28, 2026, 20:58 UTC |
| [#73655](https://github.com/openclaw/openclaw/issues/73655) | Gateway leak triad on plugin restart: Manifest EADDRINUSE retry loop, signal-handler accumulation, sync I/O on session JSONL → WS handshake starvation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73655.md) | complete | Apr 28, 2026, 20:57 UTC |
| [#62164](https://github.com/openclaw/openclaw/pull/62164) | perf(gateway): cache sessions.list results and short-circuit unchanged responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62164.md) | complete | Apr 28, 2026, 20:57 UTC |
| [#72950](https://github.com/openclaw/openclaw/issues/72950) | Plugin config (plugins.entries.<id>.config) has no env-var or writable-overlay path — every change requires image rebuild in policy-locked sandboxes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72950.md) | complete | Apr 28, 2026, 20:57 UTC |
| [#50619](https://github.com/openclaw/openclaw/issues/50619) | Feature: /model switch should check context size against target model limits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50619.md) | complete | Apr 28, 2026, 20:56 UTC |
| [#73757](https://github.com/openclaw/openclaw/pull/73757) | docs(exec): note sandbox-active rejection of per-call host=node from auto | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73757.md) | complete | Apr 28, 2026, 20:56 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 21:06 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 479. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,65,72,77,79,84,86,88,95,96,97,99,100,102,115,117,120,127,128,129,131,134,137,151,156,162,169,170,171,173,174,178,184,192,205,208,211,224,225,226,227,228,231,234,236,237,238,243,248,256,265,268,275,277,279,284,287,288,290,314,321,323,328,329,330,337,340,345,348,349,351,353,364,367,369,371,373,374,378,379,380,382,385,386,387,388,390,392,393,397,402,406,410,420,423,424,425,426,437,438,442,443,447,448,449,450,451,454,455,459,463,469,471,474,478,479,480,481,482,484,485,487,488,489,494,495,498,501,503,504,509,516,528,531,532,535,539,541,553,563,566,567,568,573,574,575,579,580,581,586,589,593,600,604,609,613,614,615,618,619,621,625,630,631,635,636,637,642,645,646,650,651,652,653,654,656,657,658,661,662,664,667,669,670,672,673,674,675,676,677,678,679,680,681,683,686,692,694,699,700,701,705,706,707,708,711,712,716,717,718,722,729,730,733,734,737,740,745,752,756,758,760,761,762,764,765,767,768,769,772,779,782,784,786,789,791,792,794,800,804,807,808,809,816,817,819,823,824,834,835,838,847,848,849,850,852,853,854,856,858,860,862,863,865,868,869,870,871,873,874,876,878,879,880,882,883,886,887,889,890,892,895,896,897,899,900,901,903,904,906,907,908,910,911,912,913,914,915,917,920,922,927,928,930,932,933,936,939,941,943,946,951,954,958,959,960,962,967,970,971,972,974,975,984,985,987,992,995,997,998,999,1003,1006,1007,1008,1009,1010,1011,1015,1016,1017,1018,1020,1021,1022,1024,1026,1027,1028,1032,1033,1035,1036,1038,1039,1040,1041,1043,1044,1045,1046,1048,1049,1051,1052,1053,1054,1059,1062,1063,1068,1069,1070,1072,1075,1079,1080,1081,1082,1083,1084,1085,1088,1089,1090,1091,1092,1094,1097,1098,1099,1100,1102,1103,1104,1105,1106,1107,1109,1110,1112,1113,1114,1116,1118,1119,1120,1121,1122,1124,1125,1126,1128,1129,1131,1132,1133,1136,1137,1140,1141,1142,1147,1148,1149,1152,1153,1154,1155,1156,1159,1164,1168,1169,1170,1171,1172,1173,1175,1176,1177,1179,1180,1181,1182,1184,1186,1188,1193,1195,1197,1199,1201,1204,1206,1207,1211,1212,1217,1218,1219,1221,1222,1228,1282,1290,1296,1542,1591,1672,1771,1772,1781,1783,1787,1789,1797,1815,1818,1819,1823,1824,1828,1833,1849,1857,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25075999264](https://github.com/openclaw/clawsweeper/actions/runs/25075999264)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 32 |
| Open items total | 907 |
| Reviewed files | 907 |
| Unreviewed open items | 0 |
| Archived closed files | 11 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 2 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 18/51 current (33 due, 35.3%) |
| Hourly hot item cadence (<7d) | 18/51 current (33 due, 35.3%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 631/633 current (2 due, 99.7%) |
| Due now by cadence | 35 |

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

Latest review: Apr 28, 2026, 21:03 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 21:06 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 30 | 0 | 30 | 2 | 0 | 480 | 0 |
| Last hour | 501 | 0 | 501 | 2 | 0 | 481 | 0 |
| Last 24 hours | 918 | 3 | 915 | 2 | 11 | 509 | 0 |

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
| [#613](https://github.com/openclaw/clawhub/issues/613) | Feature request: Device flow auth for headless agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/613.md) | failed | Apr 28, 2026, 21:03 UTC |
| [#699](https://github.com/openclaw/clawhub/issues/699) | False positive: Security skill flagged as malicious because it contains detection patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/699.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#1040](https://github.com/openclaw/clawhub/issues/1040) | False Positive: ifly-voiceclone-tts is  safe, official iFlytek voice clone tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1040.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#975](https://github.com/openclaw/clawhub/issues/975) | False positive: 'vibe-reading' and 'vibe-reading-cn' skills flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/975.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#1081](https://github.com/openclaw/clawhub/issues/1081) | HostGuard flagged as Suspicious despite 0/64 VirusTotal detections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1081.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#1015](https://github.com/openclaw/clawhub/issues/1015) | Why was skill Tavily Search (tavily-websearch) flagged as suspicious? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1015.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#992](https://github.com/openclaw/clawhub/issues/992) | False positive flag on telegram-whisper-transcribe skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/992.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#1048](https://github.com/openclaw/clawhub/issues/1048) | why Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1048.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#880](https://github.com/openclaw/clawhub/issues/880) | Aegis Firewall has been falsely marked as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/880.md) | complete | Apr 28, 2026, 20:54 UTC |
| [#679](https://github.com/openclaw/clawhub/issues/679) | False positive: jonisjongithub/venice-ai flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/679.md) | complete | Apr 28, 2026, 20:54 UTC |

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
