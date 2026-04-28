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

Last dashboard update: Apr 28, 2026, 15:12 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4422 |
| Open PRs | 3445 |
| Open items total | 7867 |
| Reviewed files | 7469 |
| Unreviewed open items | 398 |
| Due now by cadence | 2752 |
| Proposed closes awaiting apply | 27 |
| Closed by Codex apply | 10408 |
| Failed or stale reviews | 5 |
| Archived closed files | 13577 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6954 | 6563 | 391 | 2701 | 27 | 10405 | Apr 28, 2026, 15:09 UTC | Apr 28, 2026, 15:10 UTC | 362 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 51 | 0 | 3 | Apr 28, 2026, 14:22 UTC | Apr 28, 2026, 08:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 15:11 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061130507) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 15:12 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061130507) |

### Fleet Activity

Latest review: Apr 28, 2026, 15:09 UTC. Latest close: Apr 28, 2026, 15:10 UTC. Latest comment sync: Apr 28, 2026, 15:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 120 | 10 | 110 | 0 | 4 | 25 | 0 |
| Last hour | 1090 | 54 | 1036 | 0 | 26 | 382 | 1 |
| Last 24 hours | 4456 | 209 | 4247 | 2 | 512 | 1678 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73170](https://github.com/openclaw/openclaw/pull/73170) | fix(memory-core): retry dreaming cron registration after startup deferral [AI-assisted] | duplicate or superseded | Apr 28, 2026, 15:10 UTC | [records/openclaw-openclaw/closed/73170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73170.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73617](https://github.com/openclaw/openclaw/issues/73617) | [Bug]: Browser runtime ignores root browser.executablePath on 2026.4.26 | already implemented on main | Apr 28, 2026, 15:05 UTC | [records/openclaw-openclaw/closed/73617.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73617.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73598](https://github.com/openclaw/openclaw/pull/73598) | feat: add local AlpaCore MCP bridge | belongs on ClawHub | Apr 28, 2026, 15:01 UTC | [records/openclaw-openclaw/closed/73598.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73598.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73234](https://github.com/openclaw/openclaw/issues/73234) | WebChat/Control UI duplicates assistant replies when auto-TTS appends assistant-media transcript entries | already implemented on main | Apr 28, 2026, 15:01 UTC | [records/openclaw-openclaw/closed/73234.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73234.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73612](https://github.com/openclaw/openclaw/issues/73612) | [Bug]: Error: Unknown memory embedding provider: voyage | already implemented on main | Apr 28, 2026, 14:56 UTC | [records/openclaw-openclaw/closed/73612.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73612.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73136](https://github.com/openclaw/openclaw/pull/73136) | fix(reply): keep consumed reset triggers empty | closed externally after proposed_close | Apr 28, 2026, 14:49 UTC | [records/openclaw-openclaw/closed/73136.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73136.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73576](https://github.com/openclaw/openclaw/pull/73576) | fix: clarify infer audio/image errors when no provider configured | duplicate or superseded | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/73576.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73576.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57470](https://github.com/openclaw/openclaw/pull/57470) | fix(cron): honour payload.model override even when not in allowlist | duplicate or superseded | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57470.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57470.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57139](https://github.com/openclaw/openclaw/issues/57139) | sessions_history should support reading archived/reset sessions | duplicate or superseded | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57139.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56698](https://github.com/openclaw/openclaw/issues/56698) | Bug: Hook bootstrap virtual files accumulate on every restart (no dedup) | already implemented on main | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56698.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56698.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73621](https://github.com/openclaw/openclaw/issues/73621) | [Bug]: Control UI — queued message silently lost when switching to another session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73621.md) | complete | Apr 28, 2026, 15:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73620](https://github.com/openclaw/openclaw/pull/73620) | fix(cli/agents add): pre-fill peer-level workspace path in wizard (#71889) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73620.md) | complete | Apr 28, 2026, 15:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72817](https://github.com/openclaw/openclaw/pull/72817) | fix: harden bundled plugin public surface loading | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72817.md) | complete | Apr 28, 2026, 15:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72818](https://github.com/openclaw/openclaw/pull/72818) | fix: start configured channel plugins absent from registry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72818.md) | complete | Apr 28, 2026, 15:09 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73616](https://github.com/openclaw/openclaw/pull/73616) | fix(qqbot): unify slash command auth, c2cOnly gating, and file delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73616.md) | complete | Apr 28, 2026, 15:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72815](https://github.com/openclaw/openclaw/pull/72815) | fix: keep local assistant avatar overrides authoritative | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72815.md) | complete | Apr 28, 2026, 15:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 15:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72816](https://github.com/openclaw/openclaw/pull/72816) | feat: show assistant activity before stream text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72816.md) | complete | Apr 28, 2026, 15:08 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72534](https://github.com/openclaw/openclaw/pull/72534) | fix(skills): scan nested subdirectories for grouped skill layouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72534.md) | complete | Apr 28, 2026, 15:06 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72814](https://github.com/openclaw/openclaw/pull/72814) | fix: stabilize isolated heartbeat routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72814.md) | complete | Apr 28, 2026, 15:06 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 15:11 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25061139329](https://github.com/openclaw/clawsweeper/actions/runs/25061139329)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3547 |
| Open PRs | 3407 |
| Open items total | 6954 |
| Reviewed files | 6563 |
| Unreviewed open items | 391 |
| Archived closed files | 13567 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3372 |
| Proposed issue closes | 13 (0.4% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3188 |
| Proposed PR closes | 14 (0.4% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6559 |
| Proposed closes awaiting apply | 27 (0.4% of fresh reviews) |
| Closed by Codex apply | 10405 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 118/733 current (615 due, 16.1%) |
| Hourly hot item cadence (<7d) | 118/733 current (615 due, 16.1%) |
| Daily cadence coverage | 2301/3995 current (1694 due, 57.6%) |
| Daily PR cadence | 1836/2762 current (926 due, 66.5%) |
| Daily new issue cadence (<30d) | 465/1233 current (768 due, 37.7%) |
| Weekly older issue cadence | 1834/1835 current (1 due, 99.9%) |
| Due now by cadence | 2701 |

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

Latest review: Apr 28, 2026, 15:09 UTC. Latest close: Apr 28, 2026, 15:10 UTC. Latest comment sync: Apr 28, 2026, 15:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 120 | 10 | 110 | 0 | 4 | 25 | 0 |
| Last hour | 1070 | 54 | 1016 | 0 | 26 | 362 | 1 |
| Last 24 hours | 3540 | 206 | 3334 | 1 | 502 | 897 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73170](https://github.com/openclaw/openclaw/pull/73170) | fix(memory-core): retry dreaming cron registration after startup deferral [AI-assisted] | duplicate or superseded | Apr 28, 2026, 15:10 UTC | [records/openclaw-openclaw/closed/73170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73170.md) |
| [#73617](https://github.com/openclaw/openclaw/issues/73617) | [Bug]: Browser runtime ignores root browser.executablePath on 2026.4.26 | already implemented on main | Apr 28, 2026, 15:05 UTC | [records/openclaw-openclaw/closed/73617.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73617.md) |
| [#73598](https://github.com/openclaw/openclaw/pull/73598) | feat: add local AlpaCore MCP bridge | belongs on ClawHub | Apr 28, 2026, 15:01 UTC | [records/openclaw-openclaw/closed/73598.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73598.md) |
| [#73234](https://github.com/openclaw/openclaw/issues/73234) | WebChat/Control UI duplicates assistant replies when auto-TTS appends assistant-media transcript entries | already implemented on main | Apr 28, 2026, 15:01 UTC | [records/openclaw-openclaw/closed/73234.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73234.md) |
| [#73612](https://github.com/openclaw/openclaw/issues/73612) | [Bug]: Error: Unknown memory embedding provider: voyage | already implemented on main | Apr 28, 2026, 14:56 UTC | [records/openclaw-openclaw/closed/73612.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73612.md) |
| [#73136](https://github.com/openclaw/openclaw/pull/73136) | fix(reply): keep consumed reset triggers empty | closed externally after proposed_close | Apr 28, 2026, 14:49 UTC | [records/openclaw-openclaw/closed/73136.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73136.md) |
| [#73576](https://github.com/openclaw/openclaw/pull/73576) | fix: clarify infer audio/image errors when no provider configured | duplicate or superseded | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/73576.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73576.md) |
| [#57470](https://github.com/openclaw/openclaw/pull/57470) | fix(cron): honour payload.model override even when not in allowlist | duplicate or superseded | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57470.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57470.md) |
| [#57139](https://github.com/openclaw/openclaw/issues/57139) | sessions_history should support reading archived/reset sessions | duplicate or superseded | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57139.md) |
| [#56698](https://github.com/openclaw/openclaw/issues/56698) | Bug: Hook bootstrap virtual files accumulate on every restart (no dedup) | already implemented on main | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56698.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56698.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73621](https://github.com/openclaw/openclaw/issues/73621) | [Bug]: Control UI — queued message silently lost when switching to another session | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73621.md) | complete | Apr 28, 2026, 15:09 UTC |
| [#73620](https://github.com/openclaw/openclaw/pull/73620) | fix(cli/agents add): pre-fill peer-level workspace path in wizard (#71889) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73620.md) | complete | Apr 28, 2026, 15:09 UTC |
| [#72817](https://github.com/openclaw/openclaw/pull/72817) | fix: harden bundled plugin public surface loading | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72817.md) | complete | Apr 28, 2026, 15:09 UTC |
| [#72818](https://github.com/openclaw/openclaw/pull/72818) | fix: start configured channel plugins absent from registry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72818.md) | complete | Apr 28, 2026, 15:09 UTC |
| [#73616](https://github.com/openclaw/openclaw/pull/73616) | fix(qqbot): unify slash command auth, c2cOnly gating, and file delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73616.md) | complete | Apr 28, 2026, 15:08 UTC |
| [#72815](https://github.com/openclaw/openclaw/pull/72815) | fix: keep local assistant avatar overrides authoritative | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72815.md) | complete | Apr 28, 2026, 15:08 UTC |
| [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 15:08 UTC |
| [#72816](https://github.com/openclaw/openclaw/pull/72816) | feat: show assistant activity before stream text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72816.md) | complete | Apr 28, 2026, 15:08 UTC |
| [#72534](https://github.com/openclaw/openclaw/pull/72534) | fix(skills): scan nested subdirectories for grouped skill layouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72534.md) | complete | Apr 28, 2026, 15:06 UTC |
| [#72814](https://github.com/openclaw/openclaw/pull/72814) | fix: stabilize isolated heartbeat routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72814.md) | complete | Apr 28, 2026, 15:06 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 15:12 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
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
| Hourly cadence coverage | 9/52 current (43 due, 17.3%) |
| Hourly hot item cadence (<7d) | 9/52 current (43 due, 17.3%) |
| Daily cadence coverage | 222/222 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 201/201 current (0 due, 100%) |
| Weekly older issue cadence | 631/632 current (1 due, 99.8%) |
| Due now by cadence | 51 |

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

Latest review: Apr 28, 2026, 14:22 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 14:24 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 20 | 0 | 20 | 0 | 0 | 20 | 0 |
| Last 24 hours | 916 | 3 | 913 | 1 | 10 | 781 | 0 |

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
| [#1799](https://github.com/openclaw/clawhub/issues/1799) | ZenQuote Skill False Positive - VirusTotal Misidentification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1799.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1653](https://github.com/openclaw/clawhub/issues/1653) | add skill: robert0812/maton-browse-plan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1653.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1586](https://github.com/openclaw/clawhub/issues/1586) | ClawHub Security flagged skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1586.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1738](https://github.com/openclaw/clawhub/issues/1738) | False Positive: SkillWiki skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1738.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1811](https://github.com/openclaw/clawhub/issues/1811) | Skill flagged — suspicious patterns detected (trade-router, re-bruce-wayne) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1811.md) | complete | Apr 28, 2026, 14:22 UTC |
| [#1744](https://github.com/openclaw/clawhub/issues/1744) | Request: delete stale plugin entries claw-pay-plugin (v0.27, v0.25) from Publisher Plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1744.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1858](https://github.com/openclaw/clawhub/pull/1858) | fix(ui): resolve relative skill README links | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1858.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1705](https://github.com/openclaw/clawhub/issues/1705) | Skill flagged as suspicious - share-onetime-link | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1705.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 28, 2026, 14:21 UTC |
| [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 28, 2026, 14:21 UTC |

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
