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

Last dashboard update: Apr 28, 2026, 18:02 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4411 |
| Open PRs | 3444 |
| Open items total | 7855 |
| Reviewed files | 7464 |
| Unreviewed open items | 391 |
| Due now by cadence | 2357 |
| Proposed closes awaiting apply | 1 |
| Closed by Codex apply | 10506 |
| Failed or stale reviews | 8 |
| Archived closed files | 13688 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6941 | 6557 | 384 | 2316 | 1 | 10503 | Apr 28, 2026, 17:59 UTC | Apr 28, 2026, 17:57 UTC | 493 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 41 | 0 | 3 | Apr 28, 2026, 17:25 UTC | Apr 28, 2026, 08:18 UTC | 38 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 28, 2026, 18:01 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25068369931) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 28, 2026, 17:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069266554) |

### Fleet Activity

Latest review: Apr 28, 2026, 17:59 UTC. Latest close: Apr 28, 2026, 17:57 UTC. Latest comment sync: Apr 28, 2026, 17:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 280 | 2 | 278 | 2 | 3 | 18 | 0 |
| Last hour | 1082 | 35 | 1047 | 2 | 37 | 531 | 2 |
| Last 24 hours | 5049 | 281 | 4768 | 5 | 619 | 1139 | 18 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65200](https://github.com/openclaw/openclaw/issues/65200) | /new and /reset should clear session model overrides | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/65200.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65200.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62810](https://github.com/openclaw/openclaw/pull/62810) | fix: add error logging to empty catch blocks in Config IO | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62810.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62810.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62741](https://github.com/openclaw/openclaw/pull/62741) | fix(memory-lancedb): guard against empty embeddings response | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62741.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61850](https://github.com/openclaw/openclaw/issues/61850) | Slack file_share events silently dropped after upgrade from 2026.3.31 to 2026.4.5 | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61850.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61850.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61725](https://github.com/openclaw/openclaw/pull/61725) | fix(task-registry): prevent NOT NULL crash on requester_session_key in legacy DBs | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61725.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61725.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61683](https://github.com/openclaw/openclaw/issues/61683) | Enhancement: Plugin-scoped config errors (plugins.entries.*.config) should degrade gracefully, not abort gateway startup | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61683.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57364](https://github.com/openclaw/openclaw/pull/57364) | fix(msteams): delete FileConsentCard after user accepts, declines, or upload expires | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57364.md) | complete | Apr 28, 2026, 17:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52012](https://github.com/openclaw/openclaw/pull/52012) | feat(compaction): add modelFallbacks for compaction model resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52012.md) | complete | Apr 28, 2026, 17:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73713](https://github.com/openclaw/openclaw/issues/73713) | openclaw infer embedding create fails with TypeError: fetch failed on Node 24 despite valid Voyage credential; underlying cause is swallowed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73713.md) | complete | Apr 28, 2026, 17:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51462](https://github.com/openclaw/openclaw/pull/51462) | fix: emit assistant update for tool-call-only messages from OpenAI-compatible providers [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51462.md) | complete | Apr 28, 2026, 17:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51024](https://github.com/openclaw/openclaw/pull/51024) | fix(cron): clear stale running markers using per-job timeouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51024.md) | complete | Apr 28, 2026, 17:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72534](https://github.com/openclaw/openclaw/pull/72534) | fix(skills): scan nested subdirectories for grouped skill layouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72534.md) | complete | Apr 28, 2026, 17:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51156](https://github.com/openclaw/openclaw/pull/51156) | feat(config): add enforceFinalTag option to agent defaults | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51156.md) | complete | Apr 28, 2026, 17:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68559](https://github.com/openclaw/openclaw/pull/68559) | fix(memory-host-sdk): index only primary session transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68559.md) | complete | Apr 28, 2026, 17:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50054](https://github.com/openclaw/openclaw/pull/50054) | fix(acp): add distributed session locking with fail-closed redis fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50054.md) | failed | Apr 28, 2026, 17:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67404](https://github.com/openclaw/openclaw/pull/67404) | fix(memory-core): refresh qmd session exports on transcript updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67404.md) | complete | Apr 28, 2026, 17:55 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:01 UTC

State: Review publish complete

Merged review artifacts for run 25068369931. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25068369931](https://github.com/openclaw/clawsweeper/actions/runs/25068369931)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3535 |
| Open PRs | 3406 |
| Open items total | 6941 |
| Reviewed files | 6557 |
| Unreviewed open items | 384 |
| Archived closed files | 13678 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3358 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3191 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6549 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Closed by Codex apply | 10503 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 99/802 current (703 due, 12.3%) |
| Hourly hot item cadence (<7d) | 99/802 current (703 due, 12.3%) |
| Daily cadence coverage | 2684/3912 current (1228 due, 68.6%) |
| Daily PR cadence | 2002/2726 current (724 due, 73.4%) |
| Daily new issue cadence (<30d) | 682/1186 current (504 due, 57.5%) |
| Weekly older issue cadence | 1842/1843 current (1 due, 99.9%) |
| Due now by cadence | 2316 |

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

Latest review: Apr 28, 2026, 17:59 UTC. Latest close: Apr 28, 2026, 17:57 UTC. Latest comment sync: Apr 28, 2026, 17:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 280 | 2 | 278 | 2 | 3 | 18 | 0 |
| Last hour | 1044 | 35 | 1009 | 2 | 37 | 493 | 2 |
| Last 24 hours | 4132 | 278 | 3854 | 5 | 609 | 819 | 18 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |
| [#65200](https://github.com/openclaw/openclaw/issues/65200) | /new and /reset should clear session model overrides | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/65200.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65200.md) |
| [#62810](https://github.com/openclaw/openclaw/pull/62810) | fix: add error logging to empty catch blocks in Config IO | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62810.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62810.md) |
| [#62741](https://github.com/openclaw/openclaw/pull/62741) | fix(memory-lancedb): guard against empty embeddings response | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62741.md) |
| [#61850](https://github.com/openclaw/openclaw/issues/61850) | Slack file_share events silently dropped after upgrade from 2026.3.31 to 2026.4.5 | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61850.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61850.md) |
| [#61725](https://github.com/openclaw/openclaw/pull/61725) | fix(task-registry): prevent NOT NULL crash on requester_session_key in legacy DBs | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61725.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61725.md) |
| [#61683](https://github.com/openclaw/openclaw/issues/61683) | Enhancement: Plugin-scoped config errors (plugins.entries.*.config) should degrade gracefully, not abort gateway startup | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/61683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61683.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#57364](https://github.com/openclaw/openclaw/pull/57364) | fix(msteams): delete FileConsentCard after user accepts, declines, or upload expires | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57364.md) | complete | Apr 28, 2026, 17:59 UTC |
| [#52012](https://github.com/openclaw/openclaw/pull/52012) | feat(compaction): add modelFallbacks for compaction model resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52012.md) | complete | Apr 28, 2026, 17:59 UTC |
| [#73713](https://github.com/openclaw/openclaw/issues/73713) | openclaw infer embedding create fails with TypeError: fetch failed on Node 24 despite valid Voyage credential; underlying cause is swallowed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73713.md) | complete | Apr 28, 2026, 17:58 UTC |
| [#51462](https://github.com/openclaw/openclaw/pull/51462) | fix: emit assistant update for tool-call-only messages from OpenAI-compatible providers [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51462.md) | complete | Apr 28, 2026, 17:57 UTC |
| [#51024](https://github.com/openclaw/openclaw/pull/51024) | fix(cron): clear stale running markers using per-job timeouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51024.md) | complete | Apr 28, 2026, 17:57 UTC |
| [#72534](https://github.com/openclaw/openclaw/pull/72534) | fix(skills): scan nested subdirectories for grouped skill layouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72534.md) | complete | Apr 28, 2026, 17:56 UTC |
| [#51156](https://github.com/openclaw/openclaw/pull/51156) | feat(config): add enforceFinalTag option to agent defaults | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51156.md) | complete | Apr 28, 2026, 17:56 UTC |
| [#68559](https://github.com/openclaw/openclaw/pull/68559) | fix(memory-host-sdk): index only primary session transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68559.md) | complete | Apr 28, 2026, 17:55 UTC |
| [#50054](https://github.com/openclaw/openclaw/pull/50054) | fix(acp): add distributed session locking with fail-closed redis fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50054.md) | failed | Apr 28, 2026, 17:55 UTC |
| [#67404](https://github.com/openclaw/openclaw/pull/67404) | fix(memory-core): refresh qmd session exports on transcript updates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67404.md) | complete | Apr 28, 2026, 17:55 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 17:59 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25069266554](https://github.com/openclaw/clawsweeper/actions/runs/25069266554)
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
| Hourly cadence coverage | 17/51 current (34 due, 33.3%) |
| Hourly hot item cadence (<7d) | 17/51 current (34 due, 33.3%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 41 |

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

Latest review: Apr 28, 2026, 17:25 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 17:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 38 | 0 | 38 | 0 | 0 | 38 | 0 |
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
| [#1422](https://github.com/openclaw/clawhub/issues/1422) | ai-capability-analyzer has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1422.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1413](https://github.com/openclaw/clawhub/issues/1413) | Skill: threadline (by @vidursharma202-del) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1413.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1408](https://github.com/openclaw/clawhub/issues/1408) | Skill 页面可访问但搜索无法找到 - 搜索索引问题 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1408.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1397](https://github.com/openclaw/clawhub/issues/1397) | [Skill flagged]: False Positive High Confidence Security Flag - dxm-agent-wallet Skill (https://clawhub.ai/guofeng007/dxm-agent-wallet) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1397.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1445](https://github.com/openclaw/clawhub/issues/1445) | False positive: context-slimming flagged as suspicious — benign workspace optimization skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1445.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1382](https://github.com/openclaw/clawhub/issues/1382) | Login issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1382.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1401](https://github.com/openclaw/clawhub/issues/1401) | tv-indicators-analysis 错误标记 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1401.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1381](https://github.com/openclaw/clawhub/issues/1381) | delet skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1381.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1477](https://github.com/openclaw/clawhub/issues/1477) | [Appeal] Account \"clawgrid\" locked after skill flagged — requesting account restoration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1477.md) | complete | Apr 28, 2026, 17:25 UTC |
| [#1672](https://github.com/openclaw/clawhub/issues/1672) | Security scan findings: credential-pattern and remote-exec hits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1672.md) | complete | Apr 28, 2026, 17:25 UTC |

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
