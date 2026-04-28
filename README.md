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

Last dashboard update: Apr 28, 2026, 23:31 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4215 |
| Open PRs | 3253 |
| Open items total | 7468 |
| Reviewed files | 7468 |
| Unreviewed open items | 0 |
| Due now by cadence | 1661 |
| Proposed closes awaiting apply | 2 |
| Closed by Codex apply | 10585 |
| Failed or stale reviews | 41 |
| Archived closed files | 13828 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6558 | 6558 | 0 | 1597 | 2 | 10582 | Apr 28, 2026, 23:29 UTC | Apr 28, 2026, 23:23 UTC | 442 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 910 | 0 | 64 | 0 | 3 | Apr 28, 2026, 23:24 UTC | Apr 28, 2026, 22:18 UTC | 418 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 23:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25083067471) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 23:22 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25082754561) |

### Fleet Activity

Latest review: Apr 28, 2026, 23:29 UTC. Latest close: Apr 28, 2026, 23:23 UTC. Latest comment sync: Apr 28, 2026, 23:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 31 | 4 | 27 | 4 | 5 | 166 | 0 |
| Last hour | 1257 | 13 | 1244 | 33 | 21 | 860 | 3 |
| Last 24 hours | 6230 | 368 | 5862 | 37 | 758 | 1288 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73863](https://github.com/openclaw/openclaw/issues/73863) | Feature request: Enhanced logging and configurable log rotation | already implemented on main | Apr 28, 2026, 23:23 UTC | [records/openclaw-openclaw/closed/73863.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73863.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73862](https://github.com/openclaw/openclaw/issues/73862) | [Bug]: Gateway memory and connection accumulation over extended runtime on Windows | duplicate or superseded | Apr 28, 2026, 23:22 UTC | [records/openclaw-openclaw/closed/73862.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73862.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73858](https://github.com/openclaw/openclaw/issues/73858) | [Bug] Custom provider models without explicit `provider` field fail `resolveGatewayModelSupportsImages` — images offloaded as text | already implemented on main | Apr 28, 2026, 23:21 UTC | [records/openclaw-openclaw/closed/73858.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73858.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73857](https://github.com/openclaw/openclaw/issues/73857) | Slack socket-mode disconnects under main-thread load (need worker thread or configurable pong timeout) | already implemented on main | Apr 28, 2026, 23:19 UTC | [records/openclaw-openclaw/closed/73857.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73857.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73856](https://github.com/openclaw/openclaw/pull/73856) | ci: shard agent runtime codeql quality | kept open | Apr 28, 2026, 23:17 UTC | [records/openclaw-openclaw/closed/73856.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73856.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73854](https://github.com/openclaw/openclaw/pull/73854) | docs(skills): require body files for github text | already closed before apply | Apr 28, 2026, 23:12 UTC | [records/openclaw-openclaw/closed/73854.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73854.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71389](https://github.com/openclaw/openclaw/issues/71389) | SIGILL crash when sharp loads on non-AVX CPUs | already closed before apply | Apr 28, 2026, 23:09 UTC | [records/openclaw-openclaw/closed/71389.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71389.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73848](https://github.com/openclaw/openclaw/issues/73848) | Bug: Session reset via Control UI injects blank user message, crashing MiniMax provider | cannot reproduce on current main | Apr 28, 2026, 23:09 UTC | [records/openclaw-openclaw/closed/73848.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73848.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64257](https://github.com/openclaw/openclaw/pull/64257) | build: ignore generated docker-compose.sandbox.yml | closed externally after review | Apr 28, 2026, 23:02 UTC | [records/openclaw-openclaw/closed/64257.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64257.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73843](https://github.com/openclaw/openclaw/pull/73843) | feat(rls): add weekly Supabase RLS leak scanner | closed externally after item changed | Apr 28, 2026, 23:02 UTC | [records/openclaw-openclaw/closed/73843.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73843.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73414](https://github.com/openclaw/openclaw/pull/73414) | docs: add clawhub rescan recovery guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73414.md) | complete | Apr 28, 2026, 23:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73840](https://github.com/openclaw/openclaw/pull/73840) | test(ci): cover kitchen-sink plugin prerelease installs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73840.md) | complete | Apr 28, 2026, 23:27 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) | complete | Apr 28, 2026, 23:27 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73864](https://github.com/openclaw/openclaw/issues/73864) | Feature: let openclaw mcp serve request configurable operator scopes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73864.md) | complete | Apr 28, 2026, 23:25 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1870.md) | complete | Apr 28, 2026, 23:24 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73642](https://github.com/openclaw/openclaw/pull/73642) | feat(cli): add thinking override to infer model run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73642.md) | complete | Apr 28, 2026, 23:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations after explicit restarts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) | complete | Apr 28, 2026, 23:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48265](https://github.com/openclaw/openclaw/pull/48265) | feat: [[SPLIT]] directive + @mention context enrichment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48265.md) | complete | Apr 28, 2026, 23:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63268](https://github.com/openclaw/openclaw/pull/63268) | fix(doctor): warn when config path diverges from running gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63268.md) | complete | Apr 28, 2026, 23:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73822](https://github.com/openclaw/openclaw/pull/73822) | feat(config): support SecretRef for phone numbers in channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73822.md) | complete | Apr 28, 2026, 23:22 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 23:31 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25083067471](https://github.com/openclaw/clawsweeper/actions/runs/25083067471)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3339 |
| Open PRs | 3219 |
| Open items total | 6558 |
| Reviewed files | 6558 |
| Unreviewed open items | 0 |
| Archived closed files | 13816 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3332 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3212 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6544 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10582 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 137/866 current (729 due, 15.8%) |
| Hourly hot item cadence (<7d) | 137/866 current (729 due, 15.8%) |
| Daily cadence coverage | 3008/3872 current (864 due, 77.7%) |
| Daily PR cadence | 2229/2708 current (479 due, 82.3%) |
| Daily new issue cadence (<30d) | 779/1164 current (385 due, 66.9%) |
| Weekly older issue cadence | 1816/1820 current (4 due, 99.8%) |
| Due now by cadence | 1597 |

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

Latest review: Apr 28, 2026, 23:29 UTC. Latest close: Apr 28, 2026, 23:23 UTC. Latest comment sync: Apr 28, 2026, 23:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 30 | 4 | 26 | 4 | 5 | 17 | 0 |
| Last hour | 736 | 13 | 723 | 6 | 21 | 442 | 3 |
| Last 24 hours | 5308 | 365 | 4943 | 10 | 746 | 836 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73863](https://github.com/openclaw/openclaw/issues/73863) | Feature request: Enhanced logging and configurable log rotation | already implemented on main | Apr 28, 2026, 23:23 UTC | [records/openclaw-openclaw/closed/73863.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73863.md) |
| [#73862](https://github.com/openclaw/openclaw/issues/73862) | [Bug]: Gateway memory and connection accumulation over extended runtime on Windows | duplicate or superseded | Apr 28, 2026, 23:22 UTC | [records/openclaw-openclaw/closed/73862.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73862.md) |
| [#73858](https://github.com/openclaw/openclaw/issues/73858) | [Bug] Custom provider models without explicit `provider` field fail `resolveGatewayModelSupportsImages` — images offloaded as text | already implemented on main | Apr 28, 2026, 23:21 UTC | [records/openclaw-openclaw/closed/73858.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73858.md) |
| [#73857](https://github.com/openclaw/openclaw/issues/73857) | Slack socket-mode disconnects under main-thread load (need worker thread or configurable pong timeout) | already implemented on main | Apr 28, 2026, 23:19 UTC | [records/openclaw-openclaw/closed/73857.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73857.md) |
| [#73856](https://github.com/openclaw/openclaw/pull/73856) | ci: shard agent runtime codeql quality | kept open | Apr 28, 2026, 23:17 UTC | [records/openclaw-openclaw/closed/73856.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73856.md) |
| [#73854](https://github.com/openclaw/openclaw/pull/73854) | docs(skills): require body files for github text | already closed before apply | Apr 28, 2026, 23:12 UTC | [records/openclaw-openclaw/closed/73854.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73854.md) |
| [#71389](https://github.com/openclaw/openclaw/issues/71389) | SIGILL crash when sharp loads on non-AVX CPUs | already closed before apply | Apr 28, 2026, 23:09 UTC | [records/openclaw-openclaw/closed/71389.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71389.md) |
| [#73848](https://github.com/openclaw/openclaw/issues/73848) | Bug: Session reset via Control UI injects blank user message, crashing MiniMax provider | cannot reproduce on current main | Apr 28, 2026, 23:09 UTC | [records/openclaw-openclaw/closed/73848.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73848.md) |
| [#64257](https://github.com/openclaw/openclaw/pull/64257) | build: ignore generated docker-compose.sandbox.yml | closed externally after review | Apr 28, 2026, 23:02 UTC | [records/openclaw-openclaw/closed/64257.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64257.md) |
| [#73843](https://github.com/openclaw/openclaw/pull/73843) | feat(rls): add weekly Supabase RLS leak scanner | closed externally after item changed | Apr 28, 2026, 23:02 UTC | [records/openclaw-openclaw/closed/73843.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73843.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73414](https://github.com/openclaw/openclaw/pull/73414) | docs: add clawhub rescan recovery guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73414.md) | complete | Apr 28, 2026, 23:29 UTC |
| [#73840](https://github.com/openclaw/openclaw/pull/73840) | test(ci): cover kitchen-sink plugin prerelease installs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73840.md) | complete | Apr 28, 2026, 23:27 UTC |
| [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) | complete | Apr 28, 2026, 23:27 UTC |
| [#73864](https://github.com/openclaw/openclaw/issues/73864) | Feature: let openclaw mcp serve request configurable operator scopes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73864.md) | complete | Apr 28, 2026, 23:25 UTC |
| [#73642](https://github.com/openclaw/openclaw/pull/73642) | feat(cli): add thinking override to infer model run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73642.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#73812](https://github.com/openclaw/openclaw/pull/73812) | Fix restart continuations after explicit restarts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73812.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#48265](https://github.com/openclaw/openclaw/pull/48265) | feat: [[SPLIT]] directive + @mention context enrichment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48265.md) | complete | Apr 28, 2026, 23:23 UTC |
| [#63268](https://github.com/openclaw/openclaw/pull/63268) | fix(doctor): warn when config path diverges from running gateway | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63268.md) | complete | Apr 28, 2026, 23:22 UTC |
| [#73822](https://github.com/openclaw/openclaw/pull/73822) | feat(config): support SecretRef for phone numbers in channel configs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73822.md) | complete | Apr 28, 2026, 23:22 UTC |
| [#68959](https://github.com/openclaw/openclaw/issues/68959) | Control UI: No agent switcher — cannot switch between agents in web UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68959.md) | complete | Apr 28, 2026, 23:22 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 23:22 UTC

State: Review in progress

Planned 415 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25082754561](https://github.com/openclaw/clawsweeper/actions/runs/25082754561)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 34 |
| Open items total | 910 |
| Reviewed files | 910 |
| Unreviewed open items | 0 |
| Archived closed files | 12 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 849 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 883 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 27 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 16/54 current (38 due, 29.6%) |
| Hourly hot item cadence (<7d) | 16/54 current (38 due, 29.6%) |
| Daily cadence coverage | 222/222 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 201/201 current (0 due, 100%) |
| Weekly older issue cadence | 608/634 current (26 due, 95.9%) |
| Due now by cadence | 64 |

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

Latest review: Apr 28, 2026, 23:24 UTC. Latest close: Apr 28, 2026, 22:18 UTC. Latest comment sync: Apr 28, 2026, 23:24 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 149 | 0 |
| Last hour | 521 | 0 | 521 | 27 | 0 | 418 | 0 |
| Last 24 hours | 922 | 3 | 919 | 27 | 12 | 452 | 0 |

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
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1870.md) | complete | Apr 28, 2026, 23:24 UTC |
| [#1141](https://github.com/openclaw/clawhub/issues/1141) | Clawhub.ai compatibility issues in safari | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1141.md) | failed | Apr 28, 2026, 23:08 UTC |
| [#1164](https://github.com/openclaw/clawhub/issues/1164) | Help me remove the mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1164.md) | failed | Apr 28, 2026, 23:07 UTC |
| [#1849](https://github.com/openclaw/clawhub/issues/1849) | Clarify suspicious flag for beamer-pipeline-public@0.2.1 despite Benign high-confidence scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1849.md) | complete | Apr 28, 2026, 23:00 UTC |
| [#1116](https://github.com/openclaw/clawhub/issues/1116) | Bug: Account stuck in infinite loading loop after deletion and re-authorization (Soft-delete issue) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1116.md) | failed | Apr 28, 2026, 23:00 UTC |
| [#1211](https://github.com/openclaw/clawhub/issues/1211) | privacy-mask v0.3.5 — Requesting review of false-positive suspicious flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1211.md) | complete | Apr 28, 2026, 23:00 UTC |
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | complete | Apr 28, 2026, 23:00 UTC |
| [#1107](https://github.com/openclaw/clawhub/issues/1107) | False positive on shoofly-basic -- security skill flagged for containing threat signatures it monitors for | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1107.md) | complete | Apr 28, 2026, 22:59 UTC |
| [#1090](https://github.com/openclaw/clawhub/issues/1090) | Appeal: yinxiang-notes skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1090.md) | complete | Apr 28, 2026, 22:59 UTC |
| [#1080](https://github.com/openclaw/clawhub/issues/1080) | skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1080.md) | complete | Apr 28, 2026, 22:59 UTC |

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
