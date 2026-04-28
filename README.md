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

Last dashboard update: Apr 28, 2026, 18:46 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4413 |
| Open PRs | 3449 |
| Open items total | 7862 |
| Reviewed files | 7485 |
| Unreviewed open items | 377 |
| Due now by cadence | 2255 |
| Proposed closes awaiting apply | 7 |
| Closed by Codex apply | 10511 |
| Failed or stale reviews | 8 |
| Archived closed files | 13702 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6948 | 6578 | 370 | 2230 | 7 | 10508 | Apr 28, 2026, 18:44 UTC | Apr 28, 2026, 18:43 UTC | 580 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 25 | 0 | 3 | Apr 28, 2026, 18:04 UTC | Apr 28, 2026, 08:18 UTC | 273 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 18:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25071337699) |
| [ClawHub](https://github.com/openclaw/clawhub) | Audit finished | Apr 28, 2026, 18:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25071350785) |

### Fleet Activity

Latest review: Apr 28, 2026, 18:44 UTC. Latest close: Apr 28, 2026, 18:43 UTC. Latest comment sync: Apr 28, 2026, 18:45 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 40 | 2 | 38 | 0 | 7 | 151 | 1 |
| Last hour | 1167 | 13 | 1154 | 0 | 26 | 853 | 2 |
| Last 24 hours | 5200 | 292 | 4908 | 5 | 633 | 1305 | 20 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73745](https://github.com/openclaw/openclaw/issues/73745) | [Bug]: Discord /reset sends empty prompt on 2026.4.26 | already implemented on main | Apr 28, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/73745.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73745.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73731](https://github.com/openclaw/openclaw/issues/73731) | resolveBuiltInModelSuppression runs the same 48-plugin load twice back-to-back via independent caches | already implemented on main | Apr 28, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/73731.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73731.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73568](https://github.com/openclaw/openclaw/pull/73568) | fix(telegram): show Ollama think levels from catalog [AI] | closed externally after review | Apr 28, 2026, 18:37 UTC | [records/openclaw-openclaw/closed/73568.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73568.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73515](https://github.com/openclaw/openclaw/issues/73515) | Ollama provider: /think menu only shows 'off' for reasoning-capable models | closed externally after review | Apr 28, 2026, 18:37 UTC | [records/openclaw-openclaw/closed/73515.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73515.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50152](https://github.com/openclaw/openclaw/pull/50152) | fix: normalize text-only content arrays to strings for OpenAI-compatible providers | closed externally after review | Apr 28, 2026, 18:33 UTC | [records/openclaw-openclaw/closed/50152.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50152.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73654](https://github.com/openclaw/openclaw/pull/73654) | fix(cli): make crestodian exit non-zero on no-TTY (#73646) | closed externally after review | Apr 28, 2026, 18:31 UTC | [records/openclaw-openclaw/closed/73654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73654.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50107](https://github.com/openclaw/openclaw/issues/50107) | [Bug]: NVIDIA Provider Sends Anthropic-Style Message Format to OpenAI-Compatible API | closed externally after review | Apr 28, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/50107.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50107.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68947](https://github.com/openclaw/openclaw/pull/68947) | fix(reply): restore export-session inline scripts | closed externally after review | Apr 28, 2026, 18:28 UTC | [records/openclaw-openclaw/closed/68947.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68947.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | closed externally after review | Apr 28, 2026, 18:16 UTC | [records/openclaw-openclaw/closed/73708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39551](https://github.com/openclaw/openclaw/pull/39551) | fix: prefer sessionKey over label in sessions_send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39551.md) | complete | Apr 28, 2026, 18:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73736](https://github.com/openclaw/openclaw/issues/73736) | [Bug]: 2026.4.26 ships incomplete typebox bundles in extensions/xai and extensions/browser, breaking plugin load | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73736.md) | complete | Apr 28, 2026, 18:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48377](https://github.com/openclaw/openclaw/pull/48377) | fix(feishu): feishu_doc create action now populates content when provided | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48377.md) | complete | Apr 28, 2026, 18:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72115](https://github.com/openclaw/openclaw/pull/72115) | [EV-002B] Skill Workshop parity: path, TOCTOU, prompt-budget hardening | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72115.md) | complete | Apr 28, 2026, 18:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#47631](https://github.com/openclaw/openclaw/pull/47631) | fix(telegram): restore native draft streaming for DM answer lanes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47631.md) | complete | Apr 28, 2026, 18:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73744](https://github.com/openclaw/openclaw/pull/73744) | feat(ui): show persistent chat context usage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73744.md) | complete | Apr 28, 2026, 18:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73740](https://github.com/openclaw/openclaw/issues/73740) | [Feature]: Support outbound-only messaging for specific WhatsApp peers (no inbound processing) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73740.md) | complete | Apr 28, 2026, 18:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 28, 2026, 18:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68559](https://github.com/openclaw/openclaw/pull/68559) | fix(memory-host-sdk): index only primary session transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68559.md) | complete | Apr 28, 2026, 18:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67404](https://github.com/openclaw/openclaw/pull/67404) | fix(memory-core): refresh qmd session exports on transcript updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67404.md) | complete | Apr 28, 2026, 18:43 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:45 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25071337699](https://github.com/openclaw/clawsweeper/actions/runs/25071337699)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3537 |
| Open PRs | 3411 |
| Open items total | 6948 |
| Reviewed files | 6578 |
| Unreviewed open items | 370 |
| Archived closed files | 13692 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3366 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3204 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6570 |
| Proposed closes awaiting apply | 7 (0.1% of fresh reviews) |
| Closed by Codex apply | 10508 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 108/826 current (718 due, 13.1%) |
| Hourly hot item cadence (<7d) | 108/826 current (718 due, 13.1%) |
| Daily cadence coverage | 2769/3910 current (1141 due, 70.8%) |
| Daily PR cadence | 2071/2725 current (654 due, 76%) |
| Daily new issue cadence (<30d) | 698/1185 current (487 due, 58.9%) |
| Weekly older issue cadence | 1841/1842 current (1 due, 99.9%) |
| Due now by cadence | 2230 |

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

Latest review: Apr 28, 2026, 18:44 UTC. Latest close: Apr 28, 2026, 18:43 UTC. Latest comment sync: Apr 28, 2026, 18:45 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 40 | 2 | 38 | 0 | 7 | 151 | 1 |
| Last hour | 894 | 13 | 881 | 0 | 26 | 580 | 2 |
| Last 24 hours | 4283 | 289 | 3994 | 5 | 623 | 985 | 20 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73745](https://github.com/openclaw/openclaw/issues/73745) | [Bug]: Discord /reset sends empty prompt on 2026.4.26 | already implemented on main | Apr 28, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/73745.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73745.md) |
| [#73731](https://github.com/openclaw/openclaw/issues/73731) | resolveBuiltInModelSuppression runs the same 48-plugin load twice back-to-back via independent caches | already implemented on main | Apr 28, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/73731.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73731.md) |
| [#73568](https://github.com/openclaw/openclaw/pull/73568) | fix(telegram): show Ollama think levels from catalog [AI] | closed externally after review | Apr 28, 2026, 18:37 UTC | [records/openclaw-openclaw/closed/73568.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73568.md) |
| [#73515](https://github.com/openclaw/openclaw/issues/73515) | Ollama provider: /think menu only shows 'off' for reasoning-capable models | closed externally after review | Apr 28, 2026, 18:37 UTC | [records/openclaw-openclaw/closed/73515.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73515.md) |
| [#50152](https://github.com/openclaw/openclaw/pull/50152) | fix: normalize text-only content arrays to strings for OpenAI-compatible providers | closed externally after review | Apr 28, 2026, 18:33 UTC | [records/openclaw-openclaw/closed/50152.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50152.md) |
| [#73654](https://github.com/openclaw/openclaw/pull/73654) | fix(cli): make crestodian exit non-zero on no-TTY (#73646) | closed externally after review | Apr 28, 2026, 18:31 UTC | [records/openclaw-openclaw/closed/73654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73654.md) |
| [#50107](https://github.com/openclaw/openclaw/issues/50107) | [Bug]: NVIDIA Provider Sends Anthropic-Style Message Format to OpenAI-Compatible API | closed externally after review | Apr 28, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/50107.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50107.md) |
| [#68947](https://github.com/openclaw/openclaw/pull/68947) | fix(reply): restore export-session inline scripts | closed externally after review | Apr 28, 2026, 18:28 UTC | [records/openclaw-openclaw/closed/68947.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68947.md) |
| [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | closed externally after review | Apr 28, 2026, 18:16 UTC | [records/openclaw-openclaw/closed/73708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73708.md) |
| [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#39551](https://github.com/openclaw/openclaw/pull/39551) | fix: prefer sessionKey over label in sessions_send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39551.md) | complete | Apr 28, 2026, 18:44 UTC |
| [#73736](https://github.com/openclaw/openclaw/issues/73736) | [Bug]: 2026.4.26 ships incomplete typebox bundles in extensions/xai and extensions/browser, breaking plugin load | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73736.md) | complete | Apr 28, 2026, 18:44 UTC |
| [#48377](https://github.com/openclaw/openclaw/pull/48377) | fix(feishu): feishu_doc create action now populates content when provided | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48377.md) | complete | Apr 28, 2026, 18:44 UTC |
| [#72115](https://github.com/openclaw/openclaw/pull/72115) | [EV-002B] Skill Workshop parity: path, TOCTOU, prompt-budget hardening | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72115.md) | complete | Apr 28, 2026, 18:44 UTC |
| [#47631](https://github.com/openclaw/openclaw/pull/47631) | fix(telegram): restore native draft streaming for DM answer lanes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47631.md) | complete | Apr 28, 2026, 18:44 UTC |
| [#73744](https://github.com/openclaw/openclaw/pull/73744) | feat(ui): show persistent chat context usage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73744.md) | complete | Apr 28, 2026, 18:43 UTC |
| [#73740](https://github.com/openclaw/openclaw/issues/73740) | [Feature]: Support outbound-only messaging for specific WhatsApp peers (no inbound processing) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73740.md) | complete | Apr 28, 2026, 18:43 UTC |
| [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 28, 2026, 18:43 UTC |
| [#68559](https://github.com/openclaw/openclaw/pull/68559) | fix(memory-host-sdk): index only primary session transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68559.md) | complete | Apr 28, 2026, 18:43 UTC |
| [#67404](https://github.com/openclaw/openclaw/pull/67404) | fix(memory-core): refresh qmd session exports on transcript updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67404.md) | complete | Apr 28, 2026, 18:43 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 18:45 UTC

State: Audit finished

Refreshed README Audit Health from a full live openclaw/clawhub state audit. Normal review/apply dashboard heartbeats preserve this block without rerunning the audit scan.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25071350785](https://github.com/openclaw/clawsweeper/actions/runs/25071350785)
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
| Hourly cadence coverage | 32/50 current (18 due, 64%) |
| Hourly hot item cadence (<7d) | 32/50 current (18 due, 64%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 634/634 current (0 due, 100%) |
| Due now by cadence | 25 |

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

Latest review: Apr 28, 2026, 18:04 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 18:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 273 | 0 | 273 | 0 | 0 | 273 | 0 |
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
| [#1569](https://github.com/openclaw/clawhub/issues/1569) | How can I transfer \"personal skills\" to \"organization skills\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1569.md) | complete | Apr 28, 2026, 18:04 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1826](https://github.com/openclaw/clawhub/issues/1826) | False positives: powerloom-bot/powerloom-bds-univ3 flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1826.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1563](https://github.com/openclaw/clawhub/issues/1563) | Skill flagged suspicious, scan tagged benign | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1563.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1855](https://github.com/openclaw/clawhub/pull/1855) | feat(cli): show skill moderation in inspect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1855.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1472](https://github.com/openclaw/clawhub/issues/1472) | Why is my skill flagged as suspicious even after reaching benign status? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1472.md) | complete | Apr 28, 2026, 18:02 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 28, 2026, 18:02 UTC |

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
