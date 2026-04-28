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

Last dashboard update: Apr 28, 2026, 23:59 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4393 |
| Open PRs | 3460 |
| Open items total | 7853 |
| Reviewed files | 7465 |
| Unreviewed open items | 388 |
| Due now by cadence | 2048 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10592 |
| Failed or stale reviews | 25 |
| Archived closed files | 13842 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6938 | 6556 | 382 | 2015 | 0 | 10588 | Apr 28, 2026, 23:56 UTC | Apr 28, 2026, 23:57 UTC | 436 |
| [ClawHub](https://github.com/openclaw/clawhub) | 915 | 909 | 6 | 33 | 0 | 4 | Apr 28, 2026, 23:52 UTC | Apr 28, 2026, 23:32 UTC | 381 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Hot intake in progress | Apr 28, 2026, 23:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25083887062) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 23:48 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25082754561) |

### Fleet Activity

Latest review: Apr 28, 2026, 23:56 UTC. Latest close: Apr 28, 2026, 23:57 UTC. Latest comment sync: Apr 28, 2026, 23:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 9 | 1 | 8 | 1 | 4 | 9 | 0 |
| Last hour | 980 | 10 | 970 | 17 | 25 | 817 | 1 |
| Last 24 hours | 6243 | 371 | 5872 | 21 | 772 | 1645 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73873](https://github.com/openclaw/openclaw/issues/73873) | [Bug]: Why the fuck is there no disable cloud proider and telemetry option in conf?????????????????? | already implemented on main | Apr 28, 2026, 23:57 UTC | [records/openclaw-openclaw/closed/73873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73873.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40296](https://github.com/openclaw/openclaw/pull/40296) | perf(system-prompt): move dynamic sections after static content for prefix cache stability | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40296.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40296.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40256](https://github.com/openclaw/openclaw/issues/40256) | System prompt section ordering breaks LLM prefix caching for local models | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40256.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58277](https://github.com/openclaw/openclaw/pull/58277) | fix(sandbox): add { once: true } to Docker abort signal listener | closed externally after review | Apr 28, 2026, 23:47 UTC | [records/openclaw-openclaw/closed/58277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58277.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73869](https://github.com/openclaw/openclaw/issues/73869) | agent_end hook completion should reap :cron:run: registry entries | already implemented on main | Apr 28, 2026, 23:43 UTC | [records/openclaw-openclaw/closed/73869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73869.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73868](https://github.com/openclaw/openclaw/issues/73868) | Server-side timeout for sessions stuck in 'processing' state | duplicate or superseded | Apr 28, 2026, 23:42 UTC | [records/openclaw-openclaw/closed/73868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73868.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65418](https://github.com/openclaw/openclaw/issues/65418) | [Bug] Anthropic adapter mutates replayed thinking block text via sanitizeTransportPayloadText, breaking signature validation | cannot reproduce on current main | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/65418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51312](https://github.com/openclaw/openclaw/issues/51312) | Support per-agent userTimezone override | duplicate or superseded | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/51312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51312.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73852](https://github.com/openclaw/openclaw/pull/73852) | Use owner identity for Telegram exec approvals | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73852.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73414](https://github.com/openclaw/openclaw/pull/73414) | docs: add clawhub rescan recovery guidance | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73414.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73414.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73874](https://github.com/openclaw/openclaw/issues/73874) | Gateway HTTP/WS dispatch deadlock on Windows + Docker Desktop bind-mount setups (regression in 2026.4.24, persists in .25 and .26) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73874.md) | complete | Apr 28, 2026, 23:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73872](https://github.com/openclaw/openclaw/pull/73872) | Route sensitive group commands to the owner privately | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73872.md) | complete | Apr 28, 2026, 23:53 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1871.md) | complete | Apr 28, 2026, 23:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73871](https://github.com/openclaw/openclaw/pull/73871) | Add a first-run setup command for Codex Computer Use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73871.md) | complete | Apr 28, 2026, 23:48 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1768](https://github.com/openclaw/clawhub/issues/1768) | Feature request: native per-skill pinning to block update/--force/--all | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1768.md) | failed | Apr 28, 2026, 23:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68927](https://github.com/openclaw/openclaw/pull/68927) | ui(chat): show explicit qualified model refs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68927.md) | complete | Apr 28, 2026, 23:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72807](https://github.com/openclaw/openclaw/pull/72807) | feat(agents): allow opting out of git init on agents.create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72807.md) | complete | Apr 28, 2026, 23:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73853](https://github.com/openclaw/openclaw/pull/73853) | [AI-assisted] fix(plugins): reduce startup provider registry reloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73853.md) | complete | Apr 28, 2026, 23:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73870](https://github.com/openclaw/openclaw/issues/73870) | Per-parent concurrency cap on subagent spawns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73870.md) | complete | Apr 28, 2026, 23:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69633](https://github.com/openclaw/openclaw/pull/69633) | feat(ui): add SPA-side support for WebView2 native bridge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69633.md) | complete | Apr 28, 2026, 23:42 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 23:59 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25083887062](https://github.com/openclaw/clawsweeper/actions/runs/25083887062)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3517 |
| Open PRs | 3421 |
| Open items total | 6938 |
| Reviewed files | 6556 |
| Unreviewed open items | 382 |
| Archived closed files | 13828 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3335 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3210 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6545 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10588 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 99/870 current (771 due, 11.4%) |
| Hourly hot item cadence (<7d) | 99/870 current (771 due, 11.4%) |
| Daily cadence coverage | 3006/3867 current (861 due, 77.7%) |
| Daily PR cadence | 2229/2705 current (476 due, 82.4%) |
| Daily new issue cadence (<30d) | 777/1162 current (385 due, 66.9%) |
| Weekly older issue cadence | 1818/1819 current (1 due, 99.9%) |
| Due now by cadence | 2015 |

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

Latest review: Apr 28, 2026, 23:56 UTC. Latest close: Apr 28, 2026, 23:57 UTC. Latest comment sync: Apr 28, 2026, 23:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 7 | 1 | 6 | 0 | 4 | 8 | 0 |
| Last hour | 557 | 10 | 547 | 3 | 23 | 436 | 1 |
| Last 24 hours | 5320 | 368 | 4952 | 7 | 758 | 1234 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73873](https://github.com/openclaw/openclaw/issues/73873) | [Bug]: Why the fuck is there no disable cloud proider and telemetry option in conf?????????????????? | already implemented on main | Apr 28, 2026, 23:57 UTC | [records/openclaw-openclaw/closed/73873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73873.md) |
| [#40296](https://github.com/openclaw/openclaw/pull/40296) | perf(system-prompt): move dynamic sections after static content for prefix cache stability | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40296.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40296.md) |
| [#40256](https://github.com/openclaw/openclaw/issues/40256) | System prompt section ordering breaks LLM prefix caching for local models | closed externally after review | Apr 28, 2026, 23:50 UTC | [records/openclaw-openclaw/closed/40256.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40256.md) |
| [#58277](https://github.com/openclaw/openclaw/pull/58277) | fix(sandbox): add { once: true } to Docker abort signal listener | closed externally after review | Apr 28, 2026, 23:47 UTC | [records/openclaw-openclaw/closed/58277.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58277.md) |
| [#73869](https://github.com/openclaw/openclaw/issues/73869) | agent_end hook completion should reap :cron:run: registry entries | already implemented on main | Apr 28, 2026, 23:43 UTC | [records/openclaw-openclaw/closed/73869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73869.md) |
| [#73868](https://github.com/openclaw/openclaw/issues/73868) | Server-side timeout for sessions stuck in 'processing' state | duplicate or superseded | Apr 28, 2026, 23:42 UTC | [records/openclaw-openclaw/closed/73868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73868.md) |
| [#65418](https://github.com/openclaw/openclaw/issues/65418) | [Bug] Anthropic adapter mutates replayed thinking block text via sanitizeTransportPayloadText, breaking signature validation | cannot reproduce on current main | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/65418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65418.md) |
| [#51312](https://github.com/openclaw/openclaw/issues/51312) | Support per-agent userTimezone override | duplicate or superseded | Apr 28, 2026, 23:37 UTC | [records/openclaw-openclaw/closed/51312.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51312.md) |
| [#73852](https://github.com/openclaw/openclaw/pull/73852) | Use owner identity for Telegram exec approvals | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73852.md) |
| [#73414](https://github.com/openclaw/openclaw/pull/73414) | docs: add clawhub rescan recovery guidance | closed externally after review | Apr 28, 2026, 23:34 UTC | [records/openclaw-openclaw/closed/73414.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73414.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73874](https://github.com/openclaw/openclaw/issues/73874) | Gateway HTTP/WS dispatch deadlock on Windows + Docker Desktop bind-mount setups (regression in 2026.4.24, persists in .25 and .26) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73874.md) | complete | Apr 28, 2026, 23:56 UTC |
| [#73872](https://github.com/openclaw/openclaw/pull/73872) | Route sensitive group commands to the owner privately | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73872.md) | complete | Apr 28, 2026, 23:53 UTC |
| [#73871](https://github.com/openclaw/openclaw/pull/73871) | Add a first-run setup command for Codex Computer Use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73871.md) | complete | Apr 28, 2026, 23:48 UTC |
| [#68927](https://github.com/openclaw/openclaw/pull/68927) | ui(chat): show explicit qualified model refs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68927.md) | complete | Apr 28, 2026, 23:47 UTC |
| [#72807](https://github.com/openclaw/openclaw/pull/72807) | feat(agents): allow opting out of git init on agents.create | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72807.md) | complete | Apr 28, 2026, 23:47 UTC |
| [#73853](https://github.com/openclaw/openclaw/pull/73853) | [AI-assisted] fix(plugins): reduce startup provider registry reloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73853.md) | complete | Apr 28, 2026, 23:47 UTC |
| [#73870](https://github.com/openclaw/openclaw/issues/73870) | Per-parent concurrency cap on subagent spawns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73870.md) | complete | Apr 28, 2026, 23:43 UTC |
| [#69633](https://github.com/openclaw/openclaw/pull/69633) | feat(ui): add SPA-side support for WebView2 native bridge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69633.md) | complete | Apr 28, 2026, 23:42 UTC |
| [#73867](https://github.com/openclaw/openclaw/issues/73867) | openclaw tasks maintenance --apply should also prune session registry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73867.md) | complete | Apr 28, 2026, 23:42 UTC |
| [#73866](https://github.com/openclaw/openclaw/pull/73866) | fix(media): send echoTranscript for preflight-transcribed audio | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73866.md) | complete | Apr 28, 2026, 23:41 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 23:48 UTC

State: Review publish complete

Merged review artifacts for run 25082754561. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25082754561](https://github.com/openclaw/clawsweeper/actions/runs/25082754561)
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
| Fresh reviewed issues in the last 7 days | 862 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 895 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 4 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 38/53 current (15 due, 71.7%) |
| Hourly hot item cadence (<7d) | 38/53 current (15 due, 71.7%) |
| Daily cadence coverage | 212/222 current (10 due, 95.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 191/201 current (10 due, 95%) |
| Weekly older issue cadence | 632/634 current (2 due, 99.7%) |
| Due now by cadence | 33 |

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

Latest review: Apr 28, 2026, 23:52 UTC. Latest close: Apr 28, 2026, 23:32 UTC. Latest comment sync: Apr 28, 2026, 23:52 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 1 | 0 | 1 | 0 |
| Last hour | 423 | 0 | 423 | 14 | 2 | 381 | 0 |
| Last 24 hours | 923 | 3 | 920 | 14 | 14 | 411 | 0 |

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
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1871.md) | complete | Apr 28, 2026, 23:52 UTC |
| [#1768](https://github.com/openclaw/clawhub/issues/1768) | Feature request: native per-skill pinning to block update/--force/--all | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1768.md) | failed | Apr 28, 2026, 23:47 UTC |
| [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) | complete | Apr 28, 2026, 23:41 UTC |
| [#1856](https://github.com/openclaw/clawhub/pull/1856) | fix(cli): preserve root skill manifest during publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1856.md) | complete | Apr 28, 2026, 23:40 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | failed | Apr 28, 2026, 23:40 UTC |
| [#1743](https://github.com/openclaw/clawhub/issues/1743) | Can not search skill from Clawhub | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1743.md) | failed | Apr 28, 2026, 23:40 UTC |
| [#1816](https://github.com/openclaw/clawhub/issues/1816) | False positive: mimotts25-plus flagged as SUSPICIOUS by AI scanner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1816.md) | complete | Apr 28, 2026, 23:39 UTC |
| [#1553](https://github.com/openclaw/clawhub/issues/1553) | Re-scan jarviyin/clawpk v5.0.0 — remove suspicious flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1553.md) | failed | Apr 28, 2026, 23:39 UTC |
| [#1428](https://github.com/openclaw/clawhub/issues/1428) | Credential Auditor Skill Incorrectly Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1428.md) | complete | Apr 28, 2026, 23:39 UTC |
| [#1565](https://github.com/openclaw/clawhub/issues/1565) | False positive: swarm-sprint flagged as suspicious — git worktree orchestration skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1565.md) | complete | Apr 28, 2026, 23:39 UTC |

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
