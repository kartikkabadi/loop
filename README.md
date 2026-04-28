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

Last dashboard update: Apr 28, 2026, 15:50 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4427 |
| Open PRs | 3447 |
| Open items total | 7874 |
| Reviewed files | 7471 |
| Unreviewed open items | 403 |
| Due now by cadence | 2796 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10438 |
| Failed or stale reviews | 6 |
| Archived closed files | 13611 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6961 | 6565 | 396 | 2774 | 1 | 10435 | Apr 28, 2026, 15:47 UTC | Apr 28, 2026, 15:48 UTC | 399 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 22 | 0 | 3 | Apr 28, 2026, 15:27 UTC | Apr 28, 2026, 08:18 UTC | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 15:50 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25062217829) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 15:28 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061130507) |

### Fleet Activity

Latest review: Apr 28, 2026, 15:47 UTC. Latest close: Apr 28, 2026, 15:48 UTC. Latest comment sync: Apr 28, 2026, 15:50 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 52 | 3 | 49 | 0 | 4 | 55 | 0 |
| Last hour | 1034 | 36 | 998 | 1 | 38 | 399 | 3 |
| Last 24 hours | 4502 | 215 | 4287 | 2 | 545 | 1532 | 16 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57548](https://github.com/openclaw/openclaw/pull/57548) | fix(telegram): persist native command metadata to target sessions | closed externally after review | Apr 28, 2026, 15:48 UTC | [records/openclaw-openclaw/closed/57548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57548.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73636](https://github.com/openclaw/openclaw/issues/73636) | [Bug]: Remote CLI TUI stuck in device-pairing-required loop after device wipe | already implemented on main | Apr 28, 2026, 15:43 UTC | [records/openclaw-openclaw/closed/73636.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73636.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73645](https://github.com/openclaw/openclaw/issues/73645) | [Bug]: sidecars.channels stalls 145–625s on startup due to redundant loadOpenClawPlugins call from shouldSuppressBuiltInModel | already implemented on main | Apr 28, 2026, 15:41 UTC | [records/openclaw-openclaw/closed/73645.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73645.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73634](https://github.com/openclaw/openclaw/issues/73634) | WebChat: Restore browser-based voice input (MediaRecorder / getUserMedia) | duplicate or superseded | Apr 28, 2026, 15:39 UTC | [records/openclaw-openclaw/closed/73634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73634.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68164](https://github.com/openclaw/openclaw/pull/68164) | test(slack): cover looksLikeSlackTargetId + target-parsing edge cases | closed externally after review | Apr 28, 2026, 15:35 UTC | [records/openclaw-openclaw/closed/68164.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68164.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70651](https://github.com/openclaw/openclaw/pull/70651) | fix(feishu): degrade gracefully when card table count exceeds platform limit (230099/11310) | kept open | Apr 28, 2026, 15:28 UTC | [records/openclaw-openclaw/closed/70651.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70651.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73631](https://github.com/openclaw/openclaw/issues/73631) | [Bug]: WebSocket handshake-timeout on reconnect causes Control UI to stay disconnected for minutes (nginx reverse proxy) | duplicate or superseded | Apr 28, 2026, 15:25 UTC | [records/openclaw-openclaw/closed/73631.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73631.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73625](https://github.com/openclaw/openclaw/issues/73625) | [Bug]: iMessage attachments not coming through - permissions boundary for multi-agent setup | already implemented on main | Apr 28, 2026, 15:18 UTC | [records/openclaw-openclaw/closed/73625.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73625.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68567](https://github.com/openclaw/openclaw/pull/68567) | fix(gateway): disable stale plugin cache at startup | closed externally after review | Apr 28, 2026, 15:18 UTC | [records/openclaw-openclaw/closed/68567.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68567.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59571](https://github.com/openclaw/openclaw/issues/59571) | [Bug]: feishu_doc 插件加载正常，但工具未暴露给 agent 调用 | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59571.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59571.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45677](https://github.com/openclaw/openclaw/pull/45677) | fix: pass meta argument through RuntimeLogger methods in createRuntimeLogging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45677.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73632](https://github.com/openclaw/openclaw/pull/73632) | fix voice-call SecretRef auth token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73632.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73647.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73637](https://github.com/openclaw/openclaw/pull/73637) | fix(agents): preserve extraSystemPrompt under systemPromptOverride (#73624) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73637.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73595](https://github.com/openclaw/openclaw/issues/73595) | Runtime injection tags (`<system-reminder>`, `<previous_response>`) leak verbatim to delivery channels when model is in degraded state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73595.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73652](https://github.com/openclaw/openclaw/issues/73652) | Gateway accepts connections before ready signal, causing handshake timeouts on startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73652.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64490](https://github.com/openclaw/openclaw/pull/64490) | CLI: escape zsh completion descriptions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64490.md) | complete | Apr 28, 2026, 15:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73642](https://github.com/openclaw/openclaw/pull/73642) | feat(cli): add thinking override to infer model run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73642.md) | complete | Apr 28, 2026, 15:45 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 15:50 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 35203,44695,47277,48558,50096,51451,60572,63550,63829,65374,66287,71155,73455,73533,73551,73586,73592,73593,73594,73595.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25062217829](https://github.com/openclaw/clawsweeper/actions/runs/25062217829)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3552 |
| Open PRs | 3409 |
| Open items total | 6961 |
| Reviewed files | 6565 |
| Unreviewed open items | 396 |
| Archived closed files | 13601 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3372 |
| Proposed issue closes | 3 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3188 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6560 |
| Proposed closes awaiting apply | 5 (0.1% of fresh reviews) |
| Closed by Codex apply | 10435 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 75/759 current (684 due, 9.9%) |
| Hourly hot item cadence (<7d) | 75/759 current (684 due, 9.9%) |
| Daily cadence coverage | 2276/3969 current (1693 due, 57.3%) |
| Daily PR cadence | 1822/2747 current (925 due, 66.3%) |
| Daily new issue cadence (<30d) | 454/1222 current (768 due, 37.2%) |
| Weekly older issue cadence | 1836/1837 current (1 due, 99.9%) |
| Due now by cadence | 2774 |

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

Latest review: Apr 28, 2026, 15:47 UTC. Latest close: Apr 28, 2026, 15:48 UTC. Latest comment sync: Apr 28, 2026, 15:50 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 52 | 3 | 49 | 0 | 4 | 55 | 0 |
| Last hour | 534 | 36 | 498 | 0 | 38 | 399 | 3 |
| Last 24 hours | 3586 | 212 | 3374 | 1 | 535 | 1251 | 16 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#57548](https://github.com/openclaw/openclaw/pull/57548) | fix(telegram): persist native command metadata to target sessions | closed externally after review | Apr 28, 2026, 15:48 UTC | [records/openclaw-openclaw/closed/57548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57548.md) |
| [#73636](https://github.com/openclaw/openclaw/issues/73636) | [Bug]: Remote CLI TUI stuck in device-pairing-required loop after device wipe | already implemented on main | Apr 28, 2026, 15:43 UTC | [records/openclaw-openclaw/closed/73636.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73636.md) |
| [#73645](https://github.com/openclaw/openclaw/issues/73645) | [Bug]: sidecars.channels stalls 145–625s on startup due to redundant loadOpenClawPlugins call from shouldSuppressBuiltInModel | already implemented on main | Apr 28, 2026, 15:41 UTC | [records/openclaw-openclaw/closed/73645.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73645.md) |
| [#73634](https://github.com/openclaw/openclaw/issues/73634) | WebChat: Restore browser-based voice input (MediaRecorder / getUserMedia) | duplicate or superseded | Apr 28, 2026, 15:39 UTC | [records/openclaw-openclaw/closed/73634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73634.md) |
| [#68164](https://github.com/openclaw/openclaw/pull/68164) | test(slack): cover looksLikeSlackTargetId + target-parsing edge cases | closed externally after review | Apr 28, 2026, 15:35 UTC | [records/openclaw-openclaw/closed/68164.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68164.md) |
| [#70651](https://github.com/openclaw/openclaw/pull/70651) | fix(feishu): degrade gracefully when card table count exceeds platform limit (230099/11310) | kept open | Apr 28, 2026, 15:28 UTC | [records/openclaw-openclaw/closed/70651.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70651.md) |
| [#73631](https://github.com/openclaw/openclaw/issues/73631) | [Bug]: WebSocket handshake-timeout on reconnect causes Control UI to stay disconnected for minutes (nginx reverse proxy) | duplicate or superseded | Apr 28, 2026, 15:25 UTC | [records/openclaw-openclaw/closed/73631.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73631.md) |
| [#73625](https://github.com/openclaw/openclaw/issues/73625) | [Bug]: iMessage attachments not coming through - permissions boundary for multi-agent setup | already implemented on main | Apr 28, 2026, 15:18 UTC | [records/openclaw-openclaw/closed/73625.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73625.md) |
| [#68567](https://github.com/openclaw/openclaw/pull/68567) | fix(gateway): disable stale plugin cache at startup | closed externally after review | Apr 28, 2026, 15:18 UTC | [records/openclaw-openclaw/closed/68567.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68567.md) |
| [#59571](https://github.com/openclaw/openclaw/issues/59571) | [Bug]: feishu_doc 插件加载正常，但工具未暴露给 agent 调用 | already implemented on main | Apr 28, 2026, 15:16 UTC | [records/openclaw-openclaw/closed/59571.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59571.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#45677](https://github.com/openclaw/openclaw/pull/45677) | fix: pass meta argument through RuntimeLogger methods in createRuntimeLogging | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45677.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#73632](https://github.com/openclaw/openclaw/pull/73632) | fix voice-call SecretRef auth token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73632.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73647.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#73637](https://github.com/openclaw/openclaw/pull/73637) | fix(agents): preserve extraSystemPrompt under systemPromptOverride (#73624) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73637.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#73595](https://github.com/openclaw/openclaw/issues/73595) | Runtime injection tags (`<system-reminder>`, `<previous_response>`) leak verbatim to delivery channels when model is in degraded state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73595.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#73652](https://github.com/openclaw/openclaw/issues/73652) | Gateway accepts connections before ready signal, causing handshake timeouts on startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73652.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#64490](https://github.com/openclaw/openclaw/pull/64490) | CLI: escape zsh completion descriptions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64490.md) | complete | Apr 28, 2026, 15:45 UTC |
| [#73642](https://github.com/openclaw/openclaw/pull/73642) | feat(cli): add thinking override to infer model run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73642.md) | complete | Apr 28, 2026, 15:45 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 15:28 UTC

State: Review publish complete

Merged review artifacts for run 25061130507. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25061130507](https://github.com/openclaw/clawsweeper/actions/runs/25061130507)
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
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 38/52 current (14 due, 73.1%) |
| Hourly hot item cadence (<7d) | 38/52 current (14 due, 73.1%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
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

Latest review: Apr 28, 2026, 15:27 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 14:24 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 500 | 0 | 500 | 1 | 0 | 0 | 0 |
| Last 24 hours | 916 | 3 | 913 | 1 | 10 | 281 | 0 |

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
| [#1681](https://github.com/openclaw/clawhub/issues/1681) | Bug: Relative reference links in skill documentation resolve to incorrect/malicious URLs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1681.md) | complete | Apr 28, 2026, 15:27 UTC |
| [#1577](https://github.com/openclaw/clawhub/issues/1577) | Plugin search returns 500 Server Error for all queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1577.md) | failed | Apr 28, 2026, 15:26 UTC |
| [#1138](https://github.com/openclaw/clawhub/issues/1138) | False positive: mac-system-stat flagged by VirusTotal for compiling local Swift helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1138.md) | complete | Apr 28, 2026, 15:21 UTC |
| [#1712](https://github.com/openclaw/clawhub/issues/1712) | Package stats (downloads/installs) never incremented; skill installs always zero | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1712.md) | complete | Apr 28, 2026, 15:21 UTC |
| [#1424](https://github.com/openclaw/clawhub/issues/1424) | booking-manager skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1424.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#1818](https://github.com/openclaw/clawhub/issues/1818) | False positive: agenttrust-scanner flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1818.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#988](https://github.com/openclaw/clawhub/issues/988) | Skill flagged but marked benign https://clawhub.ai/iamjasonlevin/memelord | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/988.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#875](https://github.com/openclaw/clawhub/issues/875) | Appeal: Clickup Skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/875.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#1797](https://github.com/openclaw/clawhub/issues/1797) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1797.md) | complete | Apr 28, 2026, 15:20 UTC |

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
