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

Last dashboard update: Apr 28, 2026, 20:47 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4398 |
| Open PRs | 3453 |
| Open items total | 7851 |
| Reviewed files | 7464 |
| Unreviewed open items | 387 |
| Due now by cadence | 2202 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10542 |
| Failed or stale reviews | 13 |
| Archived closed files | 13767 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6936 | 6557 | 379 | 2159 | 0 | 10539 | Apr 28, 2026, 20:45 UTC | Apr 28, 2026, 20:44 UTC | 157 |
| [ClawHub](https://github.com/openclaw/clawhub) | 915 | 907 | 8 | 43 | 0 | 3 | Apr 28, 2026, 20:44 UTC | Apr 28, 2026, 18:47 UTC | 21 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 28, 2026, 20:47 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25076749728) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 20:46 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25075833696) |

### Fleet Activity

Latest review: Apr 28, 2026, 20:45 UTC. Latest close: Apr 28, 2026, 20:44 UTC. Latest comment sync: Apr 28, 2026, 20:46 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 63 | 0 | 63 | 1 | 21 | 130 | 1 |
| Last hour | 417 | 21 | 396 | 3 | 34 | 178 | 1 |
| Last 24 hours | 5550 | 316 | 5234 | 8 | 698 | 582 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/67902.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67902.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66394](https://github.com/openclaw/openclaw/issues/66394) | [Feature]: log rotation support | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/66394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66394.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65895](https://github.com/openclaw/openclaw/pull/65895) | docs: add Bedrock Mantle provider to index and models pages | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/65895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65895.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | duplicate or superseded | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64934.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63081](https://github.com/openclaw/openclaw/pull/63081) | fix(gateway): guard loadState against array-typed pairing state files | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/63081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63081.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/62764.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62764.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62754](https://github.com/openclaw/openclaw/issues/62754) | Gateway: unhandled promise rejection from pi-agent-core Agent.processEvents after run abort/timeout | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62754.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62754.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62702](https://github.com/openclaw/openclaw/issues/62702) | feat(plugins): Non-blocking async plugin hooks with configurable timeout + fallback | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62702.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62702.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62486](https://github.com/openclaw/openclaw/issues/62486) | [Bug]: 2026.4.2 版本三个影响体验的问题 | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62486.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48782](https://github.com/openclaw/openclaw/issues/48782) | Feature Request: Project-level memory for multi-project workflows | belongs on ClawHub | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/48782.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48782.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73797](https://github.com/openclaw/openclaw/issues/73797) | WhatsApp pairing: verification message sent without inbound text message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73797.md) | complete | Apr 28, 2026, 20:45 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39891](https://github.com/openclaw/openclaw/pull/39891) | fix(googlechat): clean up typing message on NO_REPLY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39891.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1781](https://github.com/openclaw/clawhub/issues/1781) | [Skill Appeal] markdown2doc incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1781.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1849](https://github.com/openclaw/clawhub/issues/1849) | Clarify suspicious flag for beamer-pipeline-public@0.2.1 despite Benign high-confidence scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1849.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1672](https://github.com/openclaw/clawhub/issues/1672) | Security scan findings: credential-pattern and remote-exec hits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1672.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1819](https://github.com/openclaw/clawhub/issues/1819) | ClawHub login stuck and my published skills disappeared / hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1819.md) | complete | Apr 28, 2026, 20:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1815](https://github.com/openclaw/clawhub/issues/1815) | Appeal for Skill Flag Review(Why Flagged Patterns Are Not Suspicious) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1815.md) | complete | Apr 28, 2026, 20:44 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 20:47 UTC

State: Apply finished

Apply/comment-sync run finished with 0 fresh closes out of requested limit 20. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25076749728](https://github.com/openclaw/clawsweeper/actions/runs/25076749728)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3522 |
| Open PRs | 3414 |
| Open items total | 6936 |
| Reviewed files | 6557 |
| Unreviewed open items | 379 |
| Archived closed files | 13756 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3343 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3202 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6545 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10539 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 102/839 current (737 due, 12.2%) |
| Hourly hot item cadence (<7d) | 102/839 current (737 due, 12.2%) |
| Daily cadence coverage | 2841/3882 current (1041 due, 73.2%) |
| Daily PR cadence | 2113/2714 current (601 due, 77.9%) |
| Daily new issue cadence (<30d) | 728/1168 current (440 due, 62.3%) |
| Weekly older issue cadence | 1834/1836 current (2 due, 99.9%) |
| Due now by cadence | 2159 |

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

Latest review: Apr 28, 2026, 20:45 UTC. Latest close: Apr 28, 2026, 20:44 UTC. Latest comment sync: Apr 28, 2026, 20:46 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 42 | 0 | 42 | 0 | 21 | 109 | 1 |
| Last hour | 396 | 21 | 375 | 2 | 34 | 157 | 1 |
| Last 24 hours | 4632 | 313 | 4319 | 7 | 687 | 532 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/67902.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/67902.md) |
| [#66394](https://github.com/openclaw/openclaw/issues/66394) | [Feature]: log rotation support | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/66394.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66394.md) |
| [#65895](https://github.com/openclaw/openclaw/pull/65895) | docs: add Bedrock Mantle provider to index and models pages | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/65895.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65895.md) |
| [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | duplicate or superseded | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/64934.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64934.md) |
| [#63081](https://github.com/openclaw/openclaw/pull/63081) | fix(gateway): guard loadState against array-typed pairing state files | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/63081.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63081.md) |
| [#62764](https://github.com/openclaw/openclaw/issues/62764) | openclaw doctor --fix regenerates user-systemd unit even when system unit owns the gateway, causing dual-instance deadlock | already implemented on main | Apr 28, 2026, 20:44 UTC | [records/openclaw-openclaw/closed/62764.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62764.md) |
| [#62754](https://github.com/openclaw/openclaw/issues/62754) | Gateway: unhandled promise rejection from pi-agent-core Agent.processEvents after run abort/timeout | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62754.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62754.md) |
| [#62702](https://github.com/openclaw/openclaw/issues/62702) | feat(plugins): Non-blocking async plugin hooks with configurable timeout + fallback | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62702.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62702.md) |
| [#62486](https://github.com/openclaw/openclaw/issues/62486) | [Bug]: 2026.4.2 版本三个影响体验的问题 | already implemented on main | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/62486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62486.md) |
| [#48782](https://github.com/openclaw/openclaw/issues/48782) | Feature Request: Project-level memory for multi-project workflows | belongs on ClawHub | Apr 28, 2026, 20:43 UTC | [records/openclaw-openclaw/closed/48782.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48782.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73797](https://github.com/openclaw/openclaw/issues/73797) | WhatsApp pairing: verification message sent without inbound text message | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73797.md) | complete | Apr 28, 2026, 20:45 UTC |
| [#39891](https://github.com/openclaw/openclaw/pull/39891) | fix(googlechat): clean up typing message on NO_REPLY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39891.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#48138](https://github.com/openclaw/openclaw/pull/48138) | feat(feishu): add document ownership transfer support to feishu_doc tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48138.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#39692](https://github.com/openclaw/openclaw/pull/39692) | Localize control UI hardcoded strings to zh-CN | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39692.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#39558](https://github.com/openclaw/openclaw/pull/39558) | fix(feishu): strip reaction suffix from message_id before API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39558.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#48887](https://github.com/openclaw/openclaw/pull/48887) | Fix/docs format check windows clean | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48887.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#39772](https://github.com/openclaw/openclaw/pull/39772) | fix(telegram): apply reply_to only to first stream preview to avoid 'Deleted message' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39772.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#55886](https://github.com/openclaw/openclaw/pull/55886) | fix(telegram): cool down transient sendChatAction failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55886.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#42904](https://github.com/openclaw/openclaw/pull/42904) | fix(logs): find active log file across date boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42904.md) | complete | Apr 28, 2026, 20:43 UTC |
| [#73465](https://github.com/openclaw/openclaw/pull/73465) | docs: add Cerebras provider to navigation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73465.md) | complete | Apr 28, 2026, 20:43 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 20:46 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 756,1542,1591,1672,1771,1772,1781,1787,1789,1797,1815,1818,1819,1823,1824,1828,1833,1849,1857,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25075833696](https://github.com/openclaw/clawsweeper/actions/runs/25075833696)
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
| Hourly cadence coverage | 17/51 current (34 due, 33.3%) |
| Hourly hot item cadence (<7d) | 17/51 current (34 due, 33.3%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/633 current (1 due, 99.8%) |
| Due now by cadence | 43 |

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

Latest review: Apr 28, 2026, 20:44 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 20:46 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 21 | 0 | 21 | 1 | 0 | 21 | 0 |
| Last hour | 21 | 0 | 21 | 1 | 0 | 21 | 0 |
| Last 24 hours | 918 | 3 | 915 | 1 | 11 | 50 | 0 |

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
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1781](https://github.com/openclaw/clawhub/issues/1781) | [Skill Appeal] markdown2doc incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1781.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 20:44 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1849](https://github.com/openclaw/clawhub/issues/1849) | Clarify suspicious flag for beamer-pipeline-public@0.2.1 despite Benign high-confidence scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1849.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1672](https://github.com/openclaw/clawhub/issues/1672) | Security scan findings: credential-pattern and remote-exec hits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1672.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1819](https://github.com/openclaw/clawhub/issues/1819) | ClawHub login stuck and my published skills disappeared / hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1819.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1815](https://github.com/openclaw/clawhub/issues/1815) | Appeal for Skill Flag Review(Why Flagged Patterns Are Not Suspicious) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1815.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1823](https://github.com/openclaw/clawhub/issues/1823) | False positive: wangbatochn/gstack-dev v1.0.1 safety docs flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1823.md) | complete | Apr 28, 2026, 20:44 UTC |
| [#1828](https://github.com/openclaw/clawhub/issues/1828) | Operon-Guard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1828.md) | complete | Apr 28, 2026, 20:44 UTC |

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
