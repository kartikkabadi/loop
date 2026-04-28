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

Last dashboard update: Apr 28, 2026, 22:38 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4391 |
| Open PRs | 3460 |
| Open items total | 7851 |
| Reviewed files | 7461 |
| Unreviewed open items | 390 |
| Due now by cadence | 2063 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10573 |
| Failed or stale reviews | 7 |
| Archived closed files | 13808 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6935 | 6552 | 383 | 2006 | 1 | 10570 | Apr 28, 2026, 22:35 UTC | Apr 28, 2026, 22:35 UTC | 543 |
| [ClawHub](https://github.com/openclaw/clawhub) | 916 | 909 | 7 | 57 | 0 | 3 | Apr 28, 2026, 22:12 UTC | Apr 28, 2026, 22:18 UTC | 25 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 28, 2026, 22:38 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25081258581) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 28, 2026, 22:33 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25081107345) |

### Fleet Activity

Latest review: Apr 28, 2026, 22:35 UTC. Latest close: Apr 28, 2026, 22:35 UTC. Latest comment sync: Apr 28, 2026, 22:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 2 | 7 | 0 | 2 | 10 | 0 |
| Last hour | 582 | 24 | 558 | 0 | 32 | 568 | 4 |
| Last 24 hours | 6200 | 357 | 5843 | 4 | 739 | 1451 | 23 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73838](https://github.com/openclaw/openclaw/issues/73838) | [Bug]: Control UI intermittently loses webchat state and renders NO_REPLY as NO | already implemented on main | Apr 28, 2026, 22:35 UTC | [records/openclaw-openclaw/closed/73838.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73838.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71069](https://github.com/openclaw/openclaw/issues/71069) | [Bug]: Gemma4-26b-a4-it-gguf override is rejected and reverts to gpt-4o | closed externally after review | Apr 28, 2026, 22:33 UTC | [records/openclaw-openclaw/closed/71069.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71069.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73825](https://github.com/openclaw/openclaw/pull/73825) | fix(imessage): strip visible metadata envelopes before send | closed externally after item changed | Apr 28, 2026, 22:23 UTC | [records/openclaw-openclaw/closed/73825.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73825.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73833](https://github.com/openclaw/openclaw/issues/73833) | [Bug]: Bundled ACPX extension missing plugin-local acpx/codex-acp binaries after 2026.4.26 update | already implemented on main | Apr 28, 2026, 22:16 UTC | [records/openclaw-openclaw/closed/73833.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73833.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73832](https://github.com/openclaw/openclaw/issues/73832) | Context token count shows 0 for Ollama provider despite usage data being returned | already implemented on main | Apr 28, 2026, 22:15 UTC | [records/openclaw-openclaw/closed/73832.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73832.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66617](https://github.com/openclaw/openclaw/pull/66617) | Skills: fix watcher so deleting a skill folder refreshes on macOS | duplicate or superseded | Apr 28, 2026, 22:11 UTC | [records/openclaw-openclaw/closed/66617.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66617.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52840](https://github.com/openclaw/openclaw/issues/52840) | Security audit false-positive: lossless-claw engine.ts:829 flagged as potential-exfiltration | cannot reproduce on current main | Apr 28, 2026, 22:11 UTC | [records/openclaw-openclaw/closed/52840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52840.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52632](https://github.com/openclaw/openclaw/issues/52632) | Channel removal incomplete: WhatsApp credentials cause channel to reappear on restart | already implemented on main | Apr 28, 2026, 22:11 UTC | [records/openclaw-openclaw/closed/52632.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52632.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52499](https://github.com/openclaw/openclaw/issues/52499) | feat: native support for coordinator + reporter multi-agent channel patterns | already implemented on main | Apr 28, 2026, 22:10 UTC | [records/openclaw-openclaw/closed/52499.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52499.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55518](https://github.com/openclaw/openclaw/pull/55518) | feat(docker): add OPENCLAW_SKIP_ONBOARDING env to skip onboarding during Docker setup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55518.md) | complete | Apr 28, 2026, 22:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73839](https://github.com/openclaw/openclaw/pull/73839) | fix: disable Pi auto-compaction when safeguard mode is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73839.md) | complete | Apr 28, 2026, 22:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48265](https://github.com/openclaw/openclaw/pull/48265) | feat: [[SPLIT]] directive + @mention context enrichment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48265.md) | complete | Apr 28, 2026, 22:32 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72936](https://github.com/openclaw/openclaw/pull/72936) | Wire diagnostics through the core chat command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72936.md) | complete | Apr 28, 2026, 22:32 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73822](https://github.com/openclaw/openclaw/pull/73822) | feat(config): support SecretRef for phone numbers in channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73822.md) | complete | Apr 28, 2026, 22:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73837](https://github.com/openclaw/openclaw/issues/73837) | [Bug]: Node.js auto-installer fails silently with ioctl errors then falsely reports success before crashing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73837.md) | complete | Apr 28, 2026, 22:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73175](https://github.com/openclaw/openclaw/pull/73175) | Plugins: list Kudosity SMS in community plugins | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73175.md) | complete | Apr 28, 2026, 22:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73836](https://github.com/openclaw/openclaw/issues/73836) | [Bug]: Control UI/Gateway responsiveness regression during active runs: UI reconnect stalls, Telegram typing gaps, heartbeat poll noise, and media mirror UX issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73836.md) | complete | Apr 28, 2026, 22:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73817](https://github.com/openclaw/openclaw/pull/73817) | fix(media): allow private audio transcription endpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73817.md) | complete | Apr 28, 2026, 22:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68341](https://github.com/openclaw/openclaw/pull/68341) | fix: remediate critical vulnerabilities and logic regressions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68341.md) | complete | Apr 28, 2026, 22:21 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 22:38 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 1 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=73175.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25081258581](https://github.com/openclaw/clawsweeper/actions/runs/25081258581)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3514 |
| Open PRs | 3421 |
| Open items total | 6935 |
| Reviewed files | 6552 |
| Unreviewed open items | 383 |
| Archived closed files | 13796 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3333 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3213 |
| Proposed PR closes | 1 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6545 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10570 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 97/856 current (759 due, 11.3%) |
| Hourly hot item cadence (<7d) | 97/856 current (759 due, 11.3%) |
| Daily cadence coverage | 3012/3875 current (863 due, 77.7%) |
| Daily PR cadence | 2232/2710 current (478 due, 82.4%) |
| Daily new issue cadence (<30d) | 780/1165 current (385 due, 67%) |
| Weekly older issue cadence | 1820/1821 current (1 due, 99.9%) |
| Due now by cadence | 2006 |

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

Latest review: Apr 28, 2026, 22:35 UTC. Latest close: Apr 28, 2026, 22:35 UTC. Latest comment sync: Apr 28, 2026, 22:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 2 | 7 | 0 | 2 | 10 | 0 |
| Last hour | 557 | 24 | 533 | 0 | 31 | 543 | 4 |
| Last 24 hours | 5279 | 354 | 4925 | 4 | 727 | 960 | 23 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73838](https://github.com/openclaw/openclaw/issues/73838) | [Bug]: Control UI intermittently loses webchat state and renders NO_REPLY as NO | already implemented on main | Apr 28, 2026, 22:35 UTC | [records/openclaw-openclaw/closed/73838.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73838.md) |
| [#71069](https://github.com/openclaw/openclaw/issues/71069) | [Bug]: Gemma4-26b-a4-it-gguf override is rejected and reverts to gpt-4o | closed externally after review | Apr 28, 2026, 22:33 UTC | [records/openclaw-openclaw/closed/71069.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71069.md) |
| [#73825](https://github.com/openclaw/openclaw/pull/73825) | fix(imessage): strip visible metadata envelopes before send | closed externally after item changed | Apr 28, 2026, 22:23 UTC | [records/openclaw-openclaw/closed/73825.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73825.md) |
| [#73833](https://github.com/openclaw/openclaw/issues/73833) | [Bug]: Bundled ACPX extension missing plugin-local acpx/codex-acp binaries after 2026.4.26 update | already implemented on main | Apr 28, 2026, 22:16 UTC | [records/openclaw-openclaw/closed/73833.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73833.md) |
| [#73832](https://github.com/openclaw/openclaw/issues/73832) | Context token count shows 0 for Ollama provider despite usage data being returned | already implemented on main | Apr 28, 2026, 22:15 UTC | [records/openclaw-openclaw/closed/73832.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73832.md) |
| [#66617](https://github.com/openclaw/openclaw/pull/66617) | Skills: fix watcher so deleting a skill folder refreshes on macOS | duplicate or superseded | Apr 28, 2026, 22:11 UTC | [records/openclaw-openclaw/closed/66617.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66617.md) |
| [#52840](https://github.com/openclaw/openclaw/issues/52840) | Security audit false-positive: lossless-claw engine.ts:829 flagged as potential-exfiltration | cannot reproduce on current main | Apr 28, 2026, 22:11 UTC | [records/openclaw-openclaw/closed/52840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52840.md) |
| [#52632](https://github.com/openclaw/openclaw/issues/52632) | Channel removal incomplete: WhatsApp credentials cause channel to reappear on restart | already implemented on main | Apr 28, 2026, 22:11 UTC | [records/openclaw-openclaw/closed/52632.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52632.md) |
| [#52499](https://github.com/openclaw/openclaw/issues/52499) | feat: native support for coordinator + reporter multi-agent channel patterns | already implemented on main | Apr 28, 2026, 22:10 UTC | [records/openclaw-openclaw/closed/52499.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52499.md) |
| [#51691](https://github.com/openclaw/openclaw/issues/51691) | Feature: Real-time session sync across surfaces (Telegram <-> TUI) | duplicate or superseded | Apr 28, 2026, 22:10 UTC | [records/openclaw-openclaw/closed/51691.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51691.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#55518](https://github.com/openclaw/openclaw/pull/55518) | feat(docker): add OPENCLAW_SKIP_ONBOARDING env to skip onboarding during Docker setup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55518.md) | complete | Apr 28, 2026, 22:35 UTC |
| [#73839](https://github.com/openclaw/openclaw/pull/73839) | fix: disable Pi auto-compaction when safeguard mode is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73839.md) | complete | Apr 28, 2026, 22:35 UTC |
| [#48265](https://github.com/openclaw/openclaw/pull/48265) | feat: [[SPLIT]] directive + @mention context enrichment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48265.md) | complete | Apr 28, 2026, 22:32 UTC |
| [#72936](https://github.com/openclaw/openclaw/pull/72936) | Wire diagnostics through the core chat command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72936.md) | complete | Apr 28, 2026, 22:32 UTC |
| [#73822](https://github.com/openclaw/openclaw/pull/73822) | feat(config): support SecretRef for phone numbers in channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73822.md) | complete | Apr 28, 2026, 22:30 UTC |
| [#73837](https://github.com/openclaw/openclaw/issues/73837) | [Bug]: Node.js auto-installer fails silently with ioctl errors then falsely reports success before crashing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73837.md) | complete | Apr 28, 2026, 22:29 UTC |
| [#73175](https://github.com/openclaw/openclaw/pull/73175) | Plugins: list Kudosity SMS in community plugins | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73175.md) | complete | Apr 28, 2026, 22:28 UTC |
| [#73836](https://github.com/openclaw/openclaw/issues/73836) | [Bug]: Control UI/Gateway responsiveness regression during active runs: UI reconnect stalls, Telegram typing gaps, heartbeat poll noise, and media mirror UX issues | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73836.md) | complete | Apr 28, 2026, 22:26 UTC |
| [#73817](https://github.com/openclaw/openclaw/pull/73817) | fix(media): allow private audio transcription endpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73817.md) | complete | Apr 28, 2026, 22:22 UTC |
| [#68341](https://github.com/openclaw/openclaw/pull/68341) | fix: remediate critical vulnerabilities and logic regressions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68341.md) | complete | Apr 28, 2026, 22:21 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 22:38 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1003,1007,1010,1024,1026,1028,1039,1044,1069,1102,1118,1120,1121,1124,1147,1155,1193,1197,1222,1228.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25081107345](https://github.com/openclaw/clawsweeper/actions/runs/25081107345)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 33 |
| Open items total | 909 |
| Reviewed files | 909 |
| Unreviewed open items | 0 |
| Archived closed files | 12 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 876 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 909 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 3/53 current (50 due, 5.7%) |
| Hourly hot item cadence (<7d) | 3/53 current (50 due, 5.7%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 50 |

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

Latest review: Apr 28, 2026, 22:36 UTC. Latest close: Apr 28, 2026, 22:18 UTC. Latest comment sync: Apr 28, 2026, 22:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 0 | 20 | 0 |
| Last hour | 45 | 0 | 45 | 0 | 1 | 45 | 0 |
| Last 24 hours | 921 | 3 | 918 | 0 | 12 | 491 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1007](https://github.com/openclaw/clawhub/issues/1007) | FFmpeg Master Pro Skill Falsely Reported | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1007.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1003](https://github.com/openclaw/clawhub/issues/1003) | [False Positive] inter-agent-communication & feishu-group-helper | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1003.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1026](https://github.com/openclaw/clawhub/issues/1026) | False Positive: google-drive-service-account uses OAuth and service-account auth as intentional compatibility fallbacks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1026.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1069](https://github.com/openclaw/clawhub/issues/1069) | Title: \"False positive: crypto-portfolio-analyzer-pro flagged as suspicious\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1069.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1193](https://github.com/openclaw/clawhub/issues/1193) | clawhub login succeeds but whoami returns unknown and publish fails with \"Personal publisher not found\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1193.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1028](https://github.com/openclaw/clawhub/issues/1028) | [False Positive Appeal] baidu-netdisk-skill Flagged as Suspicious - Request Review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1028.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1024](https://github.com/openclaw/clawhub/issues/1024) | Security scan guidance request: suspicious flag on microsoft-365-graph-openclaw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1024.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1222](https://github.com/openclaw/clawhub/issues/1222) | Publish skill fails with Github API rate limit exceeded | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1222.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1121](https://github.com/openclaw/clawhub/issues/1121) | False positive suspicions: yt-description-autoposter | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1121.md) | complete | Apr 28, 2026, 22:36 UTC |
| [#1044](https://github.com/openclaw/clawhub/issues/1044) | False Positive: ifly-speed-transcription is  safe, official iFlytek transcription tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1044.md) | complete | Apr 28, 2026, 22:35 UTC |

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
