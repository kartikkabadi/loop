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

Last dashboard update: Apr 28, 2026, 16:49 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4434 |
| Open PRs | 3447 |
| Open items total | 7881 |
| Reviewed files | 7490 |
| Unreviewed open items | 391 |
| Due now by cadence | 2756 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10459 |
| Failed or stale reviews | 6 |
| Archived closed files | 13635 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6967 | 6583 | 384 | 2730 | 0 | 10456 | Apr 28, 2026, 16:47 UTC | Apr 28, 2026, 16:46 UTC | 884 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 26 | 0 | 3 | Apr 28, 2026, 16:48 UTC | Apr 28, 2026, 08:18 UTC | 274 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 28, 2026, 16:47 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25065805456) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake publish complete | Apr 28, 2026, 16:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25065834871) |

### Fleet Activity

Latest review: Apr 28, 2026, 16:48 UTC. Latest close: Apr 28, 2026, 16:46 UTC. Latest comment sync: Apr 28, 2026, 16:48 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 45 | 1 | 44 | 0 | 6 | 24 | 1 |
| Last hour | 876 | 13 | 863 | 1 | 22 | 1158 | 1 |
| Last 24 hours | 4591 | 232 | 4359 | 2 | 567 | 1436 | 16 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73405.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73405.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/72706.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72706.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73684](https://github.com/openclaw/openclaw/issues/73684) | [Bug]: Session-file lock cascade — single stale .lock blocks every subsequent agent invocation in container | already closed before apply | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73684.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73684.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66912](https://github.com/openclaw/openclaw/pull/66912) | fix(telegram): restore self-authored reply-media guard | closed externally after review | Apr 28, 2026, 16:45 UTC | [records/openclaw-openclaw/closed/66912.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66912.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70153](https://github.com/openclaw/openclaw/pull/70153) | fix(auto-reply): persist CLI turn transcript after successful reply | closed externally after review | Apr 28, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/70153.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70153.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73672](https://github.com/openclaw/openclaw/pull/73672) | Fix native slash command replies in groups | kept open | Apr 28, 2026, 16:37 UTC | [records/openclaw-openclaw/closed/73672.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73672.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73670](https://github.com/openclaw/openclaw/issues/73670) | [Bug]: Mac App overwrites user config fields on save, removing existing entries | already implemented on main | Apr 28, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/73670.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73670.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59075](https://github.com/openclaw/openclaw/pull/59075) | feat(desktop): add Tauri desktop companion MVP | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/59075.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59075.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58021](https://github.com/openclaw/openclaw/issues/58021) | Feature: `transform_tool_result` plugin hook for modifying tool results before model context | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/58021.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58021.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1834](https://github.com/openclaw/clawhub/issues/1834) | feishu-team-manager: Request re-scan after fixing flagged issues (v2.4.3) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1834.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1826](https://github.com/openclaw/clawhub/issues/1826) | False positives: powerloom-bot/powerloom-bds-univ3 flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1826.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1848](https://github.com/openclaw/clawhub/issues/1848) | False positive: futurespro-panda skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1848.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1852](https://github.com/openclaw/clawhub/issues/1852) | Multi-agent trust boundaries for claw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1852.md) | complete | Apr 28, 2026, 16:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1768](https://github.com/openclaw/clawhub/issues/1768) | Feature request: native per-skill pinning to block update/--force/--all | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1768.md) | complete | Apr 28, 2026, 16:47 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 16:47 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 16:49 UTC

State: Apply finished

Apply/comment-sync run finished with 0 fresh closes out of requested limit 2. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25065922977](https://github.com/openclaw/clawsweeper/actions/runs/25065922977)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3558 |
| Open PRs | 3409 |
| Open items total | 6967 |
| Reviewed files | 6583 |
| Unreviewed open items | 384 |
| Archived closed files | 13625 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3382 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3196 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6578 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10456 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 96/787 current (691 due, 12.2%) |
| Hourly hot item cadence (<7d) | 96/787 current (691 due, 12.2%) |
| Daily cadence coverage | 2303/3957 current (1654 due, 58.2%) |
| Daily PR cadence | 1843/2741 current (898 due, 67.2%) |
| Daily new issue cadence (<30d) | 460/1216 current (756 due, 37.8%) |
| Weekly older issue cadence | 1838/1839 current (1 due, 99.9%) |
| Due now by cadence | 2730 |

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

Latest review: Apr 28, 2026, 16:47 UTC. Latest close: Apr 28, 2026, 16:46 UTC. Latest comment sync: Apr 28, 2026, 16:48 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 25 | 1 | 24 | 0 | 6 | 24 | 1 |
| Last hour | 582 | 13 | 569 | 0 | 22 | 884 | 1 |
| Last 24 hours | 3674 | 229 | 3445 | 1 | 557 | 1153 | 16 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73405.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73405.md) |
| [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/72706.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72706.md) |
| [#73684](https://github.com/openclaw/openclaw/issues/73684) | [Bug]: Session-file lock cascade — single stale .lock blocks every subsequent agent invocation in container | already closed before apply | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73684.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73684.md) |
| [#66912](https://github.com/openclaw/openclaw/pull/66912) | fix(telegram): restore self-authored reply-media guard | closed externally after review | Apr 28, 2026, 16:45 UTC | [records/openclaw-openclaw/closed/66912.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66912.md) |
| [#70153](https://github.com/openclaw/openclaw/pull/70153) | fix(auto-reply): persist CLI turn transcript after successful reply | closed externally after review | Apr 28, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/70153.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70153.md) |
| [#73672](https://github.com/openclaw/openclaw/pull/73672) | Fix native slash command replies in groups | kept open | Apr 28, 2026, 16:37 UTC | [records/openclaw-openclaw/closed/73672.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73672.md) |
| [#73670](https://github.com/openclaw/openclaw/issues/73670) | [Bug]: Mac App overwrites user config fields on save, removing existing entries | already implemented on main | Apr 28, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/73670.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73670.md) |
| [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |
| [#59075](https://github.com/openclaw/openclaw/pull/59075) | feat(desktop): add Tauri desktop companion MVP | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/59075.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59075.md) |
| [#58021](https://github.com/openclaw/openclaw/issues/58021) | Feature: `transform_tool_result` plugin hook for modifying tool results before model context | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/58021.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58021.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73685](https://github.com/openclaw/openclaw/issues/73685) | [Bug]: @openclaw/discord@2026.3.13 fails on openclaw@2026.4.26: missing plugin-sdk/discord export | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73685.md) | complete | Apr 28, 2026, 16:47 UTC |
| [#73686](https://github.com/openclaw/openclaw/pull/73686) | fix #73549: Feature Request: Persistent Skill/.md configuration support for commercial use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73686.md) | complete | Apr 28, 2026, 16:47 UTC |
| [#73682](https://github.com/openclaw/openclaw/issues/73682) | [Bug]: \"No credentials found for profile anthropic:claude-cli\" fires in cron lane despite fresh keychain — #71026 fix not reaching runtime path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73682.md) | complete | Apr 28, 2026, 16:46 UTC |
| [#73683](https://github.com/openclaw/openclaw/issues/73683) | Session bootstrap race condition sends zero messages to zai/glm-5.1 causing 400 error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73683.md) | complete | Apr 28, 2026, 16:45 UTC |
| [#73632](https://github.com/openclaw/openclaw/pull/73632) | fix voice-call SecretRef auth token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73632.md) | complete | Apr 28, 2026, 16:45 UTC |
| [#73554](https://github.com/openclaw/openclaw/pull/73554) | fix(cli): reject missing plugin ids before config writes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73554.md) | complete | Apr 28, 2026, 16:45 UTC |
| [#73681](https://github.com/openclaw/openclaw/issues/73681) | googlechat: REACTION_ADDED / REACTION_REMOVED webhook events are silently dropped | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73681.md) | complete | Apr 28, 2026, 16:43 UTC |
| [#73680](https://github.com/openclaw/openclaw/issues/73680) | Per-agent `verboseDefault` / `elevatedDefault` rejected by config schema, despite resolver and SDK types supporting them | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73680.md) | complete | Apr 28, 2026, 16:43 UTC |
| [#73679](https://github.com/openclaw/openclaw/pull/73679) | fix(ui): preserve queued chat messages across session switches | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73679.md) | complete | Apr 28, 2026, 16:42 UTC |
| [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 16:42 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 16:49 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25065834871. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25065834871](https://github.com/openclaw/clawsweeper/actions/runs/25065834871)
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
| Hourly cadence coverage | 34/52 current (18 due, 65.4%) |
| Hourly hot item cadence (<7d) | 34/52 current (18 due, 65.4%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 631/632 current (1 due, 99.8%) |
| Due now by cadence | 26 |

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

Latest review: Apr 28, 2026, 16:48 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 16:33 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 0 | 0 | 0 |
| Last hour | 294 | 0 | 294 | 1 | 0 | 274 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 10 | 283 | 0 |

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
| [#1834](https://github.com/openclaw/clawhub/issues/1834) | feishu-team-manager: Request re-scan after fixing flagged issues (v2.4.3) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1834.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1826](https://github.com/openclaw/clawhub/issues/1826) | False positives: powerloom-bot/powerloom-bds-univ3 flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1826.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1848](https://github.com/openclaw/clawhub/issues/1848) | False positive: futurespro-panda skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1848.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1852](https://github.com/openclaw/clawhub/issues/1852) | Multi-agent trust boundaries for claw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1852.md) | complete | Apr 28, 2026, 16:48 UTC |
| [#1768](https://github.com/openclaw/clawhub/issues/1768) | Feature request: native per-skill pinning to block update/--force/--all | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1768.md) | complete | Apr 28, 2026, 16:47 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 16:47 UTC |

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
