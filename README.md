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

Last dashboard update: Apr 28, 2026, 18:15 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4238 |
| Open PRs | 3233 |
| Open items total | 7471 |
| Reviewed files | 7471 |
| Unreviewed open items | 0 |
| Due now by cadence | 1954 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10508 |
| Failed or stale reviews | 8 |
| Archived closed files | 13691 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6564 | 6564 | 0 | 1936 | 0 | 10505 | Apr 28, 2026, 18:13 UTC | Apr 28, 2026, 18:13 UTC | 734 |
| [ClawHub](https://github.com/openclaw/clawhub) | 907 | 907 | 0 | 18 | 0 | 3 | Apr 28, 2026, 18:04 UTC | Apr 28, 2026, 08:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 18:14 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069979188) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 18:04 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069191786) |

### Fleet Activity

Latest review: Apr 28, 2026, 18:13 UTC. Latest close: Apr 28, 2026, 18:13 UTC. Latest comment sync: Apr 28, 2026, 18:14 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 229 | 2 | 227 | 0 | 3 | 399 | 1 |
| Last hour | 1165 | 32 | 1133 | 2 | 39 | 754 | 3 |
| Last 24 hours | 5059 | 283 | 4776 | 5 | 622 | 1261 | 19 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57210](https://github.com/openclaw/openclaw/issues/57210) | [Feature Request] Multi-Session / New Chat Support | duplicate or superseded | Apr 28, 2026, 18:07 UTC | [records/openclaw-openclaw/closed/57210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57210.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72171](https://github.com/openclaw/openclaw/pull/72171) | fix(onboard): detect vision-capable models for custom providers | closed externally after review | Apr 28, 2026, 18:05 UTC | [records/openclaw-openclaw/closed/72171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72171.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65200](https://github.com/openclaw/openclaw/issues/65200) | /new and /reset should clear session model overrides | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/65200.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65200.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62810](https://github.com/openclaw/openclaw/pull/62810) | fix: add error logging to empty catch blocks in Config IO | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62810.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62810.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62741](https://github.com/openclaw/openclaw/pull/62741) | fix(memory-lancedb): guard against empty embeddings response | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62741.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73721](https://github.com/openclaw/openclaw/pull/73721) | fix(ui): deliver live chat events on runId match when sessionKey differs (#73716) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73721.md) | complete | Apr 28, 2026, 18:13 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73692](https://github.com/openclaw/openclaw/pull/73692) | fix: log fetch timeout aborts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73692.md) | complete | Apr 28, 2026, 18:11 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73720](https://github.com/openclaw/openclaw/pull/73720) | fix(agents): move groupId trust check into resolveGroupToolPolicy for all callers [AI-assisted] | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73720.md) | complete | Apr 28, 2026, 18:11 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64934.md) | complete | Apr 28, 2026, 18:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73718](https://github.com/openclaw/openclaw/issues/73718) | [Feature]: DeepSeek provider thinking profile should expose xhigh and max levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73718.md) | complete | Apr 28, 2026, 18:10 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66673](https://github.com/openclaw/openclaw/pull/66673) | [Feat] Gateway: add doctor.memory.remHarness probe | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66673.md) | complete | Apr 28, 2026, 18:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73456](https://github.com/openclaw/openclaw/pull/73456) | feat(azure-speech): add realtime transcription provider for voice-call | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73456.md) | complete | Apr 28, 2026, 18:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69310](https://github.com/openclaw/openclaw/pull/69310) | fix: surface dropped media to users instead of silently swallowing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69310.md) | complete | Apr 28, 2026, 18:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73008](https://github.com/openclaw/openclaw/pull/73008) | fix(deepseek): expose V4 max thinking levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73008.md) | complete | Apr 28, 2026, 18:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 28, 2026, 18:07 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:14 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25069979188](https://github.com/openclaw/clawsweeper/actions/runs/25069979188)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3363 |
| Open PRs | 3201 |
| Open items total | 6564 |
| Reviewed files | 6564 |
| Unreviewed open items | 0 |
| Archived closed files | 13681 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3360 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3196 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6556 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10505 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 103/810 current (707 due, 12.7%) |
| Hourly hot item cadence (<7d) | 103/810 current (707 due, 12.7%) |
| Daily cadence coverage | 2683/3911 current (1228 due, 68.6%) |
| Daily PR cadence | 2002/2726 current (724 due, 73.4%) |
| Daily new issue cadence (<30d) | 681/1185 current (504 due, 57.5%) |
| Weekly older issue cadence | 1842/1843 current (1 due, 99.9%) |
| Due now by cadence | 1936 |

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

Latest review: Apr 28, 2026, 18:13 UTC. Latest close: Apr 28, 2026, 18:13 UTC. Latest comment sync: Apr 28, 2026, 18:14 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 2 | 18 | 0 | 3 | 399 | 1 |
| Last hour | 872 | 32 | 840 | 2 | 39 | 734 | 3 |
| Last 24 hours | 4142 | 280 | 3862 | 5 | 612 | 1214 | 19 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |
| [#57210](https://github.com/openclaw/openclaw/issues/57210) | [Feature Request] Multi-Session / New Chat Support | duplicate or superseded | Apr 28, 2026, 18:07 UTC | [records/openclaw-openclaw/closed/57210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57210.md) |
| [#72171](https://github.com/openclaw/openclaw/pull/72171) | fix(onboard): detect vision-capable models for custom providers | closed externally after review | Apr 28, 2026, 18:05 UTC | [records/openclaw-openclaw/closed/72171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72171.md) |
| [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |
| [#65200](https://github.com/openclaw/openclaw/issues/65200) | /new and /reset should clear session model overrides | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/65200.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65200.md) |
| [#62810](https://github.com/openclaw/openclaw/pull/62810) | fix: add error logging to empty catch blocks in Config IO | duplicate or superseded | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62810.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62810.md) |
| [#62741](https://github.com/openclaw/openclaw/pull/62741) | fix(memory-lancedb): guard against empty embeddings response | already implemented on main | Apr 28, 2026, 17:46 UTC | [records/openclaw-openclaw/closed/62741.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62741.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73721](https://github.com/openclaw/openclaw/pull/73721) | fix(ui): deliver live chat events on runId match when sessionKey differs (#73716) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73721.md) | complete | Apr 28, 2026, 18:13 UTC |
| [#73692](https://github.com/openclaw/openclaw/pull/73692) | fix: log fetch timeout aborts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73692.md) | complete | Apr 28, 2026, 18:11 UTC |
| [#73720](https://github.com/openclaw/openclaw/pull/73720) | fix(agents): move groupId trust check into resolveGroupToolPolicy for all callers [AI-assisted] | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73720.md) | complete | Apr 28, 2026, 18:11 UTC |
| [#64934](https://github.com/openclaw/openclaw/pull/64934) | feat(tasks): add intermediate active task states | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64934.md) | complete | Apr 28, 2026, 18:10 UTC |
| [#73718](https://github.com/openclaw/openclaw/issues/73718) | [Feature]: DeepSeek provider thinking profile should expose xhigh and max levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73718.md) | complete | Apr 28, 2026, 18:10 UTC |
| [#66673](https://github.com/openclaw/openclaw/pull/66673) | [Feat] Gateway: add doctor.memory.remHarness probe | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66673.md) | complete | Apr 28, 2026, 18:09 UTC |
| [#73456](https://github.com/openclaw/openclaw/pull/73456) | feat(azure-speech): add realtime transcription provider for voice-call | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73456.md) | complete | Apr 28, 2026, 18:09 UTC |
| [#69310](https://github.com/openclaw/openclaw/pull/69310) | fix: surface dropped media to users instead of silently swallowing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69310.md) | complete | Apr 28, 2026, 18:08 UTC |
| [#73008](https://github.com/openclaw/openclaw/pull/73008) | fix(deepseek): expose V4 max thinking levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73008.md) | complete | Apr 28, 2026, 18:08 UTC |
| [#67509](https://github.com/openclaw/openclaw/pull/67509) | fix: add root guard to prevent CLI execution as root (#67478) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67509.md) | complete | Apr 28, 2026, 18:07 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 18:04 UTC

State: Review publish complete

Merged review artifacts for run 25069191786. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25069191786](https://github.com/openclaw/clawsweeper/actions/runs/25069191786)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 32 |
| Open items total | 907 |
| Reviewed files | 907 |
| Unreviewed open items | 0 |
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
| Hourly cadence coverage | 33/51 current (18 due, 64.7%) |
| Hourly hot item cadence (<7d) | 33/51 current (18 due, 64.7%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 18 |

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

Latest review: Apr 28, 2026, 18:04 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 17:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 209 | 0 | 209 | 0 | 0 | 0 | 0 |
| Last hour | 293 | 0 | 293 | 0 | 0 | 20 | 0 |
| Last 24 hours | 917 | 3 | 914 | 0 | 10 | 47 | 0 |

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
