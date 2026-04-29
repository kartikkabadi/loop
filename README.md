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

Last dashboard update: Apr 29, 2026, 00:09 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4396 |
| Open PRs | 3459 |
| Open items total | 7855 |
| Reviewed files | 7459 |
| Unreviewed open items | 396 |
| Due now by cadence | 1997 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10597 |
| Failed or stale reviews | 17 |
| Archived closed files | 13848 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6940 | 6550 | 390 | 1981 | 0 | 10593 | Apr 29, 2026, 00:08 UTC | Apr 29, 2026, 00:08 UTC | 435 |
| [ClawHub](https://github.com/openclaw/clawhub) | 915 | 909 | 6 | 16 | 0 | 4 | Apr 29, 2026, 00:08 UTC | Apr 28, 2026, 23:32 UTC | 776 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 29, 2026, 00:08 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25084129142) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 00:09 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25084054851) |

### Fleet Activity

Latest review: Apr 29, 2026, 00:08 UTC. Latest close: Apr 29, 2026, 00:08 UTC. Latest comment sync: Apr 29, 2026, 00:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 85 | 1 | 84 | 4 | 7 | 213 | 0 |
| Last hour | 1217 | 13 | 1204 | 13 | 26 | 1211 | 1 |
| Last 24 hours | 6361 | 376 | 5985 | 14 | 778 | 1700 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42675](https://github.com/openclaw/openclaw/pull/42675) | fix(discord): throw error when fetchUser(@me) fails to prevent security bypass | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/42675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42675.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40536](https://github.com/openclaw/openclaw/issues/40536) | [Feature]: Per-Skill Model Override | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/40536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40536.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39661](https://github.com/openclaw/openclaw/issues/39661) | Feature: Discord channel-level per-user mention policy for agent replies | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/39661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/39661.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#37841](https://github.com/openclaw/openclaw/issues/37841) | [Bug]: Session text invisible to user when message tool sends media on WhatsApp | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/37841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/37841.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#11326](https://github.com/openclaw/openclaw/issues/11326) | [Feature]: Add GBK/GB2312 encoding support to web_fetch tool for Chinese websites | already implemented on main | Apr 29, 2026, 00:07 UTC | [records/openclaw-openclaw/closed/11326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/11326.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73840](https://github.com/openclaw/openclaw/pull/73840) | test(ci): cover kitchen-sink plugin prerelease installs | closed externally after review | Apr 29, 2026, 00:04 UTC | [records/openclaw-openclaw/closed/73840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73840.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73873](https://github.com/openclaw/openclaw/issues/73873) | [Bug]: Why the fuck is there no disable cloud proider and telemetry option in conf?????????????????? | already implemented on main | Apr 28, 2026, 23:57 UTC | [records/openclaw-openclaw/closed/73873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73873.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40296](https://github.com/openclaw/openclaw/pull/40296) | perf(system-prompt): move dynamic sections after static content for prefix cache stability | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40296.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40296.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40256](https://github.com/openclaw/openclaw/issues/40256) | System prompt section ordering breaks LLM prefix caching for local models | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40256.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58277](https://github.com/openclaw/openclaw/pull/58277) | fix(sandbox): add { once: true } to Docker abort signal listener | closed externally after review | Apr 28, 2026, 23:47 UTC | [records/openclaw-openclaw/closed/58277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58277.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69310](https://github.com/openclaw/openclaw/pull/69310) | fix: surface dropped media to users instead of silently swallowing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69310.md) | complete | Apr 29, 2026, 00:08 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1819](https://github.com/openclaw/clawhub/issues/1819) | ClawHub login stuck and my published skills disappeared / hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1819.md) | complete | Apr 29, 2026, 00:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73671.md) | complete | Apr 29, 2026, 00:08 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1581](https://github.com/openclaw/clawhub/issues/1581) | [Auth] GitHub OAuth callback redirects to 127.0.0.1 instead of Convex production URL | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1581.md) | complete | Apr 29, 2026, 00:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64485](https://github.com/openclaw/openclaw/pull/64485) | fix(docker): add config dir defaults to prevent broken volume mounts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64485.md) | complete | Apr 29, 2026, 00:07 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1772](https://github.com/openclaw/clawhub/issues/1772) | Skill flagged as suspicious — docx-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1772.md) | complete | Apr 29, 2026, 00:07 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 29, 2026, 00:07 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1751](https://github.com/openclaw/clawhub/issues/1751) | False-positive signals on jimcollinson/x0x v0.17.4 — 1 static-analysis hit and 6 capability chips | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1751.md) | complete | Apr 29, 2026, 00:07 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58808](https://github.com/openclaw/openclaw/pull/58808) | feat: pass requesterSenderId and senderIsOwner to ChannelAgentToolFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58808.md) | complete | Apr 29, 2026, 00:07 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1591](https://github.com/openclaw/clawhub/issues/1591) | Is there an avenue to appeal for the removal of a Skill that was registered in bad faith, corresponding to another party's valid trademark? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1591.md) | complete | Apr 29, 2026, 00:07 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 00:08 UTC

State: Apply finished

Apply/comment-sync run finished with 5 fresh closes out of requested limit 5. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25084129142](https://github.com/openclaw/clawsweeper/actions/runs/25084129142)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3520 |
| Open PRs | 3420 |
| Open items total | 6940 |
| Reviewed files | 6550 |
| Unreviewed open items | 390 |
| Archived closed files | 13834 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3327 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3210 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6537 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10593 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 110/869 current (759 due, 12.7%) |
| Hourly hot item cadence (<7d) | 110/869 current (759 due, 12.7%) |
| Daily cadence coverage | 3041/3866 current (825 due, 78.7%) |
| Daily PR cadence | 2261/2704 current (443 due, 83.6%) |
| Daily new issue cadence (<30d) | 780/1162 current (382 due, 67.1%) |
| Weekly older issue cadence | 1808/1815 current (7 due, 99.6%) |
| Due now by cadence | 1981 |

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

Latest review: Apr 29, 2026, 00:08 UTC. Latest close: Apr 29, 2026, 00:08 UTC. Latest comment sync: Apr 29, 2026, 00:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 64 | 1 | 63 | 4 | 7 | 13 | 0 |
| Last hour | 790 | 13 | 777 | 9 | 24 | 435 | 1 |
| Last 24 hours | 5438 | 373 | 5065 | 10 | 764 | 866 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#42675](https://github.com/openclaw/openclaw/pull/42675) | fix(discord): throw error when fetchUser(@me) fails to prevent security bypass | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/42675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42675.md) |
| [#40536](https://github.com/openclaw/openclaw/issues/40536) | [Feature]: Per-Skill Model Override | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/40536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40536.md) |
| [#39661](https://github.com/openclaw/openclaw/issues/39661) | Feature: Discord channel-level per-user mention policy for agent replies | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/39661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/39661.md) |
| [#37841](https://github.com/openclaw/openclaw/issues/37841) | [Bug]: Session text invisible to user when message tool sends media on WhatsApp | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/37841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/37841.md) |
| [#11326](https://github.com/openclaw/openclaw/issues/11326) | [Feature]: Add GBK/GB2312 encoding support to web_fetch tool for Chinese websites | already implemented on main | Apr 29, 2026, 00:07 UTC | [records/openclaw-openclaw/closed/11326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/11326.md) |
| [#73840](https://github.com/openclaw/openclaw/pull/73840) | test(ci): cover kitchen-sink plugin prerelease installs | closed externally after review | Apr 29, 2026, 00:04 UTC | [records/openclaw-openclaw/closed/73840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73840.md) |
| [#73873](https://github.com/openclaw/openclaw/issues/73873) | [Bug]: Why the fuck is there no disable cloud proider and telemetry option in conf?????????????????? | already implemented on main | Apr 28, 2026, 23:57 UTC | [records/openclaw-openclaw/closed/73873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73873.md) |
| [#40296](https://github.com/openclaw/openclaw/pull/40296) | perf(system-prompt): move dynamic sections after static content for prefix cache stability | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40296.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40296.md) |
| [#40256](https://github.com/openclaw/openclaw/issues/40256) | System prompt section ordering breaks LLM prefix caching for local models | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40256.md) |
| [#58277](https://github.com/openclaw/openclaw/pull/58277) | fix(sandbox): add { once: true } to Docker abort signal listener | closed externally after review | Apr 28, 2026, 23:47 UTC | [records/openclaw-openclaw/closed/58277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58277.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69310](https://github.com/openclaw/openclaw/pull/69310) | fix: surface dropped media to users instead of silently swallowing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69310.md) | complete | Apr 29, 2026, 00:08 UTC |
| [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73671.md) | complete | Apr 29, 2026, 00:08 UTC |
| [#64485](https://github.com/openclaw/openclaw/pull/64485) | fix(docker): add config dir defaults to prevent broken volume mounts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64485.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#58808](https://github.com/openclaw/openclaw/pull/58808) | feat: pass requesterSenderId and senderIsOwner to ChannelAgentToolFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58808.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#73853](https://github.com/openclaw/openclaw/pull/73853) | [AI-assisted] fix(plugins): reduce startup provider registry reloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73853.md) | complete | Apr 29, 2026, 00:04 UTC |
| [#49223](https://github.com/openclaw/openclaw/issues/49223) | WhatsApp inter_session delivery requests can be wrongly suppressed as REPLY_SKIP / ANNOUNCE_SKIP / NO_REPLY | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49223.md) | complete | Apr 29, 2026, 00:03 UTC |
| [#49507](https://github.com/openclaw/openclaw/issues/49507) | [Bug] Cron Job 使用错误的飞书账号发送消息 - 缺少 accountId 自动推断 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49507.md) | complete | Apr 29, 2026, 00:03 UTC |
| [#49376](https://github.com/openclaw/openclaw/issues/49376) | Feature: configurable LLM retry with backoff on transient errors (overloaded/529) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49376.md) | complete | Apr 29, 2026, 00:02 UTC |
| [#48628](https://github.com/openclaw/openclaw/issues/48628) | Feature: Pass raw audio to multimodal models instead of (or alongside) STT transcription | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48628.md) | complete | Apr 29, 2026, 00:02 UTC |
| [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 29, 2026, 00:02 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 00:09 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1553,1581,1589,1591,1649,1718,1743,1751,1768,1771,1772,1787,1789,1797,1815,1818,1819,1821,1828,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25084054851](https://github.com/openclaw/clawsweeper/actions/runs/25084054851)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 39 |
| Open items total | 915 |
| Reviewed files | 909 |
| Unreviewed open items | 6 |
| Archived closed files | 14 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 872 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 4 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 47/53 current (6 due, 88.7%) |
| Hourly hot item cadence (<7d) | 47/53 current (6 due, 88.7%) |
| Daily cadence coverage | 220/222 current (2 due, 99.1%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 199/201 current (2 due, 99%) |
| Weekly older issue cadence | 632/634 current (2 due, 99.7%) |
| Due now by cadence | 16 |

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

Latest review: Apr 29, 2026, 00:08 UTC. Latest close: Apr 28, 2026, 23:32 UTC. Latest comment sync: Apr 29, 2026, 00:09 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 21 | 0 | 21 | 0 | 0 | 200 | 0 |
| Last hour | 427 | 0 | 427 | 4 | 2 | 776 | 0 |
| Last 24 hours | 923 | 3 | 920 | 4 | 14 | 834 | 0 |

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
| [#1819](https://github.com/openclaw/clawhub/issues/1819) | ClawHub login stuck and my published skills disappeared / hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1819.md) | complete | Apr 29, 2026, 00:08 UTC |
| [#1581](https://github.com/openclaw/clawhub/issues/1581) | [Auth] GitHub OAuth callback redirects to 127.0.0.1 instead of Convex production URL | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1581.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1772](https://github.com/openclaw/clawhub/issues/1772) | Skill flagged as suspicious — docx-builder | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1772.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1751](https://github.com/openclaw/clawhub/issues/1751) | False-positive signals on jimcollinson/x0x v0.17.4 — 1 static-analysis hit and 6 capability chips | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1751.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1591](https://github.com/openclaw/clawhub/issues/1591) | Is there an avenue to appeal for the removal of a Skill that was registered in bad faith, corresponding to another party's valid trademark? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1591.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1789](https://github.com/openclaw/clawhub/issues/1789) | https://clawhub.ai/aiworkskills/aws-wechat-article-topics why it was flagged and what  i can do. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1789.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1821](https://github.com/openclaw/clawhub/issues/1821) | Scan flag review request — saschahu/fred-bot v0.2.0 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1821.md) | complete | Apr 29, 2026, 00:07 UTC |
| [#1815](https://github.com/openclaw/clawhub/issues/1815) | Appeal for Skill Flag Review(Why Flagged Patterns Are Not Suspicious) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1815.md) | complete | Apr 29, 2026, 00:07 UTC |

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
