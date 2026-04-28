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

Last dashboard update: Apr 28, 2026, 16:31 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4429 |
| Open PRs | 3447 |
| Open items total | 7876 |
| Reviewed files | 7480 |
| Unreviewed open items | 396 |
| Due now by cadence | 2755 |
| Proposed closes awaiting apply | 2 |
| Closed by Codex apply | 10455 |
| Failed or stale reviews | 6 |
| Archived closed files | 13628 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6962 | 6573 | 389 | 2709 | 2 | 10452 | Apr 28, 2026, 16:28 UTC | Apr 28, 2026, 16:28 UTC | 506 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 46 | 0 | 3 | Apr 28, 2026, 16:21 UTC | Apr 28, 2026, 08:18 UTC | 1 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 16:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25064672348) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 16:22 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25064003364) |

### Fleet Activity

Latest review: Apr 28, 2026, 16:28 UTC. Latest close: Apr 28, 2026, 16:28 UTC. Latest comment sync: Apr 28, 2026, 16:31 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 43 | 6 | 37 | 1 | 9 | 44 | 0 |
| Last hour | 943 | 16 | 927 | 1 | 22 | 507 | 0 |
| Last 24 hours | 4572 | 230 | 4342 | 2 | 562 | 758 | 15 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59075](https://github.com/openclaw/openclaw/pull/59075) | feat(desktop): add Tauri desktop companion MVP | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/59075.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59075.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58021](https://github.com/openclaw/openclaw/issues/58021) | Feature: `transform_tool_result` plugin hook for modifying tool results before model context | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/58021.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58021.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57756](https://github.com/openclaw/openclaw/issues/57756) | [Bug]: session-key-based session access is not scoped to the calling operator client/device | not actionable in this repository | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/57756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57756.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51472](https://github.com/openclaw/openclaw/pull/51472) | Export Feishu workspace artifact helpers | belongs on ClawHub | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/51472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51472.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49194](https://github.com/openclaw/openclaw/pull/49194) | fix(google-vertex): strip \"<authenticated>\" ADC sentinel before provider call | already implemented on main | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/49194.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49194.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73665](https://github.com/openclaw/openclaw/issues/73665) | Image optimization regression after 2026.4.26: MiniMax-M2.7 image understanding fails with 'Failed to optimize image' | already implemented on main | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73665.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73666](https://github.com/openclaw/openclaw/issues/73666) | [Bug]：TUI enters infinite reconnect loop on WebSocket close (code 1006) | duplicate or superseded | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73666.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73666.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73661](https://github.com/openclaw/openclaw/issues/73661) | [Bug]:TUI cannot connect to gateway after version mismatch (device identity required) | already implemented on main | Apr 28, 2026, 16:17 UTC | [records/openclaw-openclaw/closed/73661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73661.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | closed externally after review | Apr 28, 2026, 16:00 UTC | [records/openclaw-openclaw/closed/73264.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73264.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 16:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42637](https://github.com/openclaw/openclaw/pull/42637) | fix(skills): list omitted skill names when prompt is truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42637.md) | complete | Apr 28, 2026, 16:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73405.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#34581](https://github.com/openclaw/openclaw/pull/34581) | fix(msteams): handle invalid JSON escape sequences in Bot Framework activities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34581.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73641](https://github.com/openclaw/openclaw/pull/73641) | fix(telegram): use agent's own default model for Telegram model list check mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73641.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73190](https://github.com/openclaw/openclaw/pull/73190) | Keep Codex same-session replies on the normal OpenClaw path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73190.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73602](https://github.com/openclaw/openclaw/issues/73602) | [Bug]: WhatsApp flaps and Telegram polling stalls on WSL2 in 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73602.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73382](https://github.com/openclaw/openclaw/pull/73382) | fix(amazon-bedrock): resolve 200K context window for Claude 3.x and unlisted Anthropic Bedrock variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73382.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72706.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 16:25 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 16:31 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 52767,72706,73243,73382,73394,73405,73407,73452,73583,73602,73616,73618,73619,73620,73621,73622,73623,73624,73626,73629.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25064672348](https://github.com/openclaw/clawsweeper/actions/runs/25064672348)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3553 |
| Open PRs | 3409 |
| Open items total | 6962 |
| Reviewed files | 6573 |
| Unreviewed open items | 389 |
| Archived closed files | 13618 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3376 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3192 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6568 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10452 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 112/776 current (664 due, 14.4%) |
| Hourly hot item cadence (<7d) | 112/776 current (664 due, 14.4%) |
| Daily cadence coverage | 2303/3958 current (1655 due, 58.2%) |
| Daily PR cadence | 1843/2742 current (899 due, 67.2%) |
| Daily new issue cadence (<30d) | 460/1216 current (756 due, 37.8%) |
| Weekly older issue cadence | 1838/1839 current (1 due, 99.9%) |
| Due now by cadence | 2709 |

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

Latest review: Apr 28, 2026, 16:28 UTC. Latest close: Apr 28, 2026, 16:28 UTC. Latest comment sync: Apr 28, 2026, 16:31 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 40 | 6 | 34 | 0 | 9 | 44 | 0 |
| Last hour | 669 | 16 | 653 | 0 | 22 | 506 | 0 |
| Last 24 hours | 3655 | 227 | 3428 | 1 | 552 | 748 | 15 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |
| [#59075](https://github.com/openclaw/openclaw/pull/59075) | feat(desktop): add Tauri desktop companion MVP | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/59075.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59075.md) |
| [#58021](https://github.com/openclaw/openclaw/issues/58021) | Feature: `transform_tool_result` plugin hook for modifying tool results before model context | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/58021.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58021.md) |
| [#57756](https://github.com/openclaw/openclaw/issues/57756) | [Bug]: session-key-based session access is not scoped to the calling operator client/device | not actionable in this repository | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/57756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57756.md) |
| [#51472](https://github.com/openclaw/openclaw/pull/51472) | Export Feishu workspace artifact helpers | belongs on ClawHub | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/51472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51472.md) |
| [#49194](https://github.com/openclaw/openclaw/pull/49194) | fix(google-vertex): strip \"<authenticated>\" ADC sentinel before provider call | already implemented on main | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/49194.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49194.md) |
| [#73665](https://github.com/openclaw/openclaw/issues/73665) | Image optimization regression after 2026.4.26: MiniMax-M2.7 image understanding fails with 'Failed to optimize image' | already implemented on main | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73665.md) |
| [#73666](https://github.com/openclaw/openclaw/issues/73666) | [Bug]：TUI enters infinite reconnect loop on WebSocket close (code 1006) | duplicate or superseded | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73666.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73666.md) |
| [#73661](https://github.com/openclaw/openclaw/issues/73661) | [Bug]:TUI cannot connect to gateway after version mismatch (device identity required) | already implemented on main | Apr 28, 2026, 16:17 UTC | [records/openclaw-openclaw/closed/73661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73661.md) |
| [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | closed externally after review | Apr 28, 2026, 16:00 UTC | [records/openclaw-openclaw/closed/73264.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73264.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 16:28 UTC |
| [#42637](https://github.com/openclaw/openclaw/pull/42637) | fix(skills): list omitted skill names when prompt is truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42637.md) | complete | Apr 28, 2026, 16:28 UTC |
| [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73405.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#34581](https://github.com/openclaw/openclaw/pull/34581) | fix(msteams): handle invalid JSON escape sequences in Bot Framework activities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34581.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#73641](https://github.com/openclaw/openclaw/pull/73641) | fix(telegram): use agent's own default model for Telegram model list check mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73641.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#73190](https://github.com/openclaw/openclaw/pull/73190) | Keep Codex same-session replies on the normal OpenClaw path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73190.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#73602](https://github.com/openclaw/openclaw/issues/73602) | [Bug]: WhatsApp flaps and Telegram polling stalls on WSL2 in 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73602.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#73382](https://github.com/openclaw/openclaw/pull/73382) | fix(amazon-bedrock): resolve 200K context window for Claude 3.x and unlisted Anthropic Bedrock variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73382.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72706.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 16:25 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 16:22 UTC

State: Review publish complete

Merged review artifacts for run 25064003364. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25064003364](https://github.com/openclaw/clawsweeper/actions/runs/25064003364)
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
| Hourly cadence coverage | 14/52 current (38 due, 26.9%) |
| Hourly hot item cadence (<7d) | 14/52 current (38 due, 26.9%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 631/632 current (1 due, 99.8%) |
| Due now by cadence | 46 |

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

Latest review: Apr 28, 2026, 16:21 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 16:12 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 0 | 3 | 1 | 0 | 0 | 0 |
| Last hour | 274 | 0 | 274 | 1 | 0 | 1 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 10 | 10 | 0 |

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
| [#1624](https://github.com/openclaw/clawhub/issues/1624) | Skill `power-oracle` flagged as suspicious - incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1624.md) | complete | Apr 28, 2026, 16:21 UTC |
| [#1164](https://github.com/openclaw/clawhub/issues/1164) | Help me remove the mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1164.md) | complete | Apr 28, 2026, 16:20 UTC |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/993.md) | failed | Apr 28, 2026, 16:19 UTC |
| [#1738](https://github.com/openclaw/clawhub/issues/1738) | False Positive: SkillWiki skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1738.md) | complete | Apr 28, 2026, 16:14 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 16:14 UTC |
| [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1668](https://github.com/openclaw/clawhub/issues/1668) | Plugin scan stuck on 'pending' for 7 days + skill/plugin name collision blocks new release | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1668.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1371](https://github.com/openclaw/clawhub/issues/1371) | Request: delete unraidclaw skill listing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1371.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1471](https://github.com/openclaw/clawhub/issues/1471) | Request to delete skill listings: clawcost-basic and clawcost-pro (@jairog813) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1471.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1735](https://github.com/openclaw/clawhub/issues/1735) | Peeps shows up as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1735.md) | complete | Apr 28, 2026, 16:13 UTC |

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
