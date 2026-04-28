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

Last dashboard update: Apr 28, 2026, 14:04 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4427 |
| Open PRs | 3451 |
| Open items total | 7878 |
| Reviewed files | 7452 |
| Unreviewed open items | 426 |
| Due now by cadence | 3277 |
| Proposed closes awaiting apply | 2 |
| Closed by Codex apply | 10381 |
| Failed or stale reviews | 6 |
| Archived closed files | 13548 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6965 | 6546 | 419 | 3217 | 2 | 10378 | Apr 28, 2026, 14:03 UTC | Apr 28, 2026, 14:04 UTC | 403 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 60 | 0 | 3 | Apr 28, 2026, 13:39 UTC | Apr 28, 2026, 08:18 UTC | 333 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 28, 2026, 14:04 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25057235583) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 13:41 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25055657387) |

### Fleet Activity

Latest review: Apr 28, 2026, 14:03 UTC. Latest close: Apr 28, 2026, 14:04 UTC. Latest comment sync: Apr 28, 2026, 14:04 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 291 | 10 | 281 | 0 | 23 | 31 | 0 |
| Last hour | 1052 | 24 | 1028 | 2 | 31 | 736 | 0 |
| Last 24 hours | 3819 | 155 | 3664 | 3 | 483 | 1379 | 12 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65010](https://github.com/openclaw/openclaw/pull/65010) | fix: use isActive+isStopped instead of isStreaming for steer message injection | duplicate or superseded | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/65010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65010.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59883](https://github.com/openclaw/openclaw/pull/59883) | feat(acp): retry ACP turns on transient OpenAI/Codex failures | not actionable | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/59883.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59883.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56369](https://github.com/openclaw/openclaw/issues/56369) | [Bug]: gateway:startup hook fires before channel adapters are ready — message tool fails silently | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/56369.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56369.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55687](https://github.com/openclaw/openclaw/issues/55687) | Bedrock converse-stream: 'Cannot read properties of undefined (reading replace)' crashes agent before API call | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/55687.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55687.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55587](https://github.com/openclaw/openclaw/issues/55587) | gateway status misreports LaunchAgent as not installed during launchctl gaps | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55587.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55587.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55536](https://github.com/openclaw/openclaw/issues/55536) | Model Circuit Breaker: Auto-disable failing models | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55536.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55223](https://github.com/openclaw/openclaw/pull/55223) | feat(slack): add `suppressAssistantText` config to suppress regular text output | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55223.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54929](https://github.com/openclaw/openclaw/pull/54929) | fix(gateway): route web chat image turns through the configured image model | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/54929.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54929.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54927](https://github.com/openclaw/openclaw/pull/54927) | Skills: stop using chokidar globs for refresh | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/54927.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54927.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54562](https://github.com/openclaw/openclaw/pull/54562) | feat(gateway): add Model Router for automatic tier-based model selection | belongs on ClawHub | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/54562.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54562.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 28, 2026, 14:03 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73101](https://github.com/openclaw/openclaw/pull/73101) | fix(slack): honor configured ACP bindings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73101.md) | complete | Apr 28, 2026, 14:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73592](https://github.com/openclaw/openclaw/issues/73592) | [Bug]: WSL local gateway binds but WebSocket handshake times out on 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73592.md) | complete | Apr 28, 2026, 14:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 14:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73455](https://github.com/openclaw/openclaw/pull/73455) | feat(matrix): add AI-gated participation and final-reply freshness controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73455.md) | complete | Apr 28, 2026, 14:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72295](https://github.com/openclaw/openclaw/pull/72295) | Agents: broaden strict-agentic actionable-prompt and active-narration gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72295.md) | complete | Apr 28, 2026, 13:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73588](https://github.com/openclaw/openclaw/pull/73588) | fix(agents): inject resolved OAuth bearer into boundary-aware embedded streams | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73588.md) | complete | Apr 28, 2026, 13:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 13:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55768](https://github.com/openclaw/openclaw/issues/55768) | Health check bloat: uptime monitors must use /health, not /v1/chat/completions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55768.md) | complete | Apr 28, 2026, 13:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73200](https://github.com/openclaw/openclaw/pull/73200) | Reconcile terminal task audit noise | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73200.md) | complete | Apr 28, 2026, 13:56 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 14:04 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 20. Total fresh closes in this run: 20/20. Result records in checkpoint: 39, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25057235583](https://github.com/openclaw/clawsweeper/actions/runs/25057235583)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3552 |
| Open PRs | 3413 |
| Open items total | 6965 |
| Reviewed files | 6546 |
| Unreviewed open items | 419 |
| Archived closed files | 13538 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3370 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3172 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6542 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10378 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 65/706 current (641 due, 9.2%) |
| Hourly hot item cadence (<7d) | 65/706 current (641 due, 9.2%) |
| Daily cadence coverage | 1843/3999 current (2156 due, 46.1%) |
| Daily PR cadence | 1545/2767 current (1222 due, 55.8%) |
| Daily new issue cadence (<30d) | 298/1232 current (934 due, 24.2%) |
| Weekly older issue cadence | 1840/1841 current (1 due, 99.9%) |
| Due now by cadence | 3217 |

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

Latest review: Apr 28, 2026, 14:03 UTC. Latest close: Apr 28, 2026, 14:04 UTC. Latest comment sync: Apr 28, 2026, 14:04 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 291 | 10 | 281 | 0 | 23 | 31 | 0 |
| Last hour | 1011 | 24 | 987 | 0 | 31 | 403 | 0 |
| Last 24 hours | 2903 | 152 | 2751 | 1 | 473 | 598 | 12 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65010](https://github.com/openclaw/openclaw/pull/65010) | fix: use isActive+isStopped instead of isStreaming for steer message injection | duplicate or superseded | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/65010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65010.md) |
| [#59883](https://github.com/openclaw/openclaw/pull/59883) | feat(acp): retry ACP turns on transient OpenAI/Codex failures | not actionable | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/59883.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59883.md) |
| [#56369](https://github.com/openclaw/openclaw/issues/56369) | [Bug]: gateway:startup hook fires before channel adapters are ready — message tool fails silently | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/56369.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56369.md) |
| [#55687](https://github.com/openclaw/openclaw/issues/55687) | Bedrock converse-stream: 'Cannot read properties of undefined (reading replace)' crashes agent before API call | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/55687.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55687.md) |
| [#55587](https://github.com/openclaw/openclaw/issues/55587) | gateway status misreports LaunchAgent as not installed during launchctl gaps | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55587.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55587.md) |
| [#55536](https://github.com/openclaw/openclaw/issues/55536) | Model Circuit Breaker: Auto-disable failing models | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55536.md) |
| [#55223](https://github.com/openclaw/openclaw/pull/55223) | feat(slack): add `suppressAssistantText` config to suppress regular text output | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55223.md) |
| [#54929](https://github.com/openclaw/openclaw/pull/54929) | fix(gateway): route web chat image turns through the configured image model | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/54929.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54929.md) |
| [#54927](https://github.com/openclaw/openclaw/pull/54927) | Skills: stop using chokidar globs for refresh | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/54927.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54927.md) |
| [#54562](https://github.com/openclaw/openclaw/pull/54562) | feat(gateway): add Model Router for automatic tier-based model selection | belongs on ClawHub | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/54562.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54562.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 28, 2026, 14:03 UTC |
| [#73101](https://github.com/openclaw/openclaw/pull/73101) | fix(slack): honor configured ACP bindings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73101.md) | complete | Apr 28, 2026, 14:02 UTC |
| [#73592](https://github.com/openclaw/openclaw/issues/73592) | [Bug]: WSL local gateway binds but WebSocket handshake times out on 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73592.md) | complete | Apr 28, 2026, 14:02 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 14:02 UTC |
| [#73455](https://github.com/openclaw/openclaw/pull/73455) | feat(matrix): add AI-gated participation and final-reply freshness controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73455.md) | complete | Apr 28, 2026, 14:00 UTC |
| [#72295](https://github.com/openclaw/openclaw/pull/72295) | Agents: broaden strict-agentic actionable-prompt and active-narration gates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72295.md) | complete | Apr 28, 2026, 13:58 UTC |
| [#73588](https://github.com/openclaw/openclaw/pull/73588) | fix(agents): inject resolved OAuth bearer into boundary-aware embedded streams | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73588.md) | complete | Apr 28, 2026, 13:58 UTC |
| [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 13:58 UTC |
| [#55768](https://github.com/openclaw/openclaw/issues/55768) | Health check bloat: uptime monitors must use /health, not /v1/chat/completions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55768.md) | complete | Apr 28, 2026, 13:56 UTC |
| [#73200](https://github.com/openclaw/openclaw/pull/73200) | Reconcile terminal task audit noise | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73200.md) | complete | Apr 28, 2026, 13:56 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 13:41 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1480,1483,1535,1538,1568,1595,1639,1649,1653,1662,1671,1690,1691,1692,1717,1720,1735,1746,1748,1788.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25055657387](https://github.com/openclaw/clawsweeper/actions/runs/25055657387)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 38 |
| Open items total | 913 |
| Reviewed files | 906 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 872 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 904 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 2 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 2/53 current (51 due, 3.8%) |
| Hourly hot item cadence (<7d) | 2/53 current (51 due, 3.8%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 630/631 current (1 due, 99.8%) |
| Due now by cadence | 60 |

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

Latest review: Apr 28, 2026, 13:39 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 13:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 41 | 0 | 41 | 2 | 0 | 333 | 0 |
| Last 24 hours | 916 | 3 | 913 | 2 | 10 | 781 | 0 |

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
| [#1653](https://github.com/openclaw/clawhub/issues/1653) | add skill: robert0812/maton-browse-plan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1653.md) | failed | Apr 28, 2026, 13:39 UTC |
| [#1864](https://github.com/openclaw/clawhub/pull/1864) | feat(schema): include .r files in text whitelist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1864.md) | complete | Apr 28, 2026, 13:32 UTC |
| [#1788](https://github.com/openclaw/clawhub/issues/1788) | False Positive - Liuyao Skill Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1788.md) | complete | Apr 28, 2026, 13:31 UTC |
| [#1692](https://github.com/openclaw/clawhub/issues/1692) | Skill flagged as suspicious - OpenCawl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1692.md) | complete | Apr 28, 2026, 13:31 UTC |
| [#1538](https://github.com/openclaw/clawhub/issues/1538) | clawhub dashboard is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1538.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1691](https://github.com/openclaw/clawhub/issues/1691) | Skill flagged as suspicious--tech-write-assist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1691.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1746](https://github.com/openclaw/clawhub/issues/1746) | ExpertLens incorrectly flagged as Suspicious — expected patterns for behavior-modification skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1746.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1671](https://github.com/openclaw/clawhub/issues/1671) | Request for Security Re-evaluation: \"book-companion\" skill marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1671.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1717](https://github.com/openclaw/clawhub/issues/1717) | Bug: /api/auth/signin/github returns HTTP 500 — GitHub OAuth broken, no new tokens can be generated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1717.md) | complete | Apr 28, 2026, 13:30 UTC |

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
