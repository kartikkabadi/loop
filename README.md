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

Last dashboard update: Apr 28, 2026, 13:29 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4431 |
| Open PRs | 3470 |
| Open items total | 7901 |
| Reviewed files | 7468 |
| Unreviewed open items | 433 |
| Due now by cadence | 3323 |
| Proposed closes awaiting apply | 12 |
| Closed by Codex apply | 10353 |
| Failed or stale reviews | 6 |
| Archived closed files | 13516 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6989 | 6563 | 426 | 3312 | 12 | 10350 | Apr 28, 2026, 13:26 UTC | Apr 28, 2026, 13:20 UTC | 379 |
| [ClawHub](https://github.com/openclaw/clawhub) | 912 | 905 | 7 | 11 | 0 | 3 | Apr 28, 2026, 13:12 UTC | Apr 28, 2026, 08:18 UTC | 752 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 28, 2026, 13:29 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25054382460) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 13:22 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25054190216) |

### Fleet Activity

Latest review: Apr 28, 2026, 13:26 UTC. Latest close: Apr 28, 2026, 13:20 UTC. Latest comment sync: Apr 28, 2026, 13:26 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 157 | 9 | 148 | 1 | 1 | 272 | 0 |
| Last hour | 1242 | 18 | 1224 | 2 | 8 | 1131 | 1 |
| Last 24 hours | 3640 | 144 | 3496 | 3 | 452 | 1336 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68773](https://github.com/openclaw/openclaw/pull/68773) | fix(active-memory): skip payload-less memory_search toolResults in tr… | closed externally after review | Apr 28, 2026, 13:20 UTC | [records/openclaw-openclaw/closed/68773.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68773.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73547](https://github.com/openclaw/openclaw/pull/73547) | feat: add auto-recall plugin — automatic memory retrieval for prompt enrichment | belongs on ClawHub | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/73547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73547.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69038](https://github.com/openclaw/openclaw/pull/69038) | fix(mattermost): anchor slash command state to globalThis to fix dual-instance 503s | duplicate or superseded | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/69038.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69038.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53665](https://github.com/openclaw/openclaw/pull/53665) | perf(memory): avoid full sort in vector fallback search | already implemented on main | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/53665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53665.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42859](https://github.com/openclaw/openclaw/pull/42859) | Gateway: stop injecting control-ui sender metadata | duplicate or superseded | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/42859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42859.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | kept open | Apr 28, 2026, 12:45 UTC | [records/openclaw-openclaw/closed/72917.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72917.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73555](https://github.com/openclaw/openclaw/issues/73555) | [Bug]: sidecars.channels blocks Node's event loop (5min+ stall on startup and prompt processing) | already implemented on main | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73555.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73553](https://github.com/openclaw/openclaw/issues/73553) | Hardcoded `/api` prefix in Signal `httpUrl` causes 404 with signal-cli-rest-api | duplicate or superseded | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73553.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73553.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73539](https://github.com/openclaw/openclaw/pull/73539) | fix(yuanbao) update docs | closed externally after review | Apr 28, 2026, 12:20 UTC | [records/openclaw-openclaw/closed/73539.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73539.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73497](https://github.com/openclaw/openclaw/pull/73497) | fix(plugins): regenerate bundled wrappers with correct specifier in staged runtime root | already implemented on main | Apr 28, 2026, 12:10 UTC | [records/openclaw-openclaw/closed/73497.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73497.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59298](https://github.com/openclaw/openclaw/pull/59298) | feat(skills): notify agents of available updates via skill preambles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59298.md) | complete | Apr 28, 2026, 13:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73540](https://github.com/openclaw/openclaw/pull/73540) | fix(gateway): resolve effective tool cold misses synchronously | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73540.md) | complete | Apr 28, 2026, 13:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51067](https://github.com/openclaw/openclaw/pull/51067) | feat(gateway): add configurable Control UI title | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51067.md) | failed | Apr 28, 2026, 13:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72921](https://github.com/openclaw/openclaw/pull/72921) | fix(agents): validate caller groupId against session context in resolveGroupToolPolicy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72921.md) | complete | Apr 28, 2026, 13:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73492](https://github.com/openclaw/openclaw/pull/73492) | feat: expose sessionId and sessionKey to provider createStreamFn plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73492.md) | complete | Apr 28, 2026, 13:24 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73581](https://github.com/openclaw/openclaw/issues/73581) | [Bug]: Agent processing lane can stall for minutes without timeout recovery, plus memory-core dreaming cron race condition on Gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73581.md) | complete | Apr 28, 2026, 13:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73462](https://github.com/openclaw/openclaw/pull/73462) | fix: add auth profile listing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73462.md) | complete | Apr 28, 2026, 13:23 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73579](https://github.com/openclaw/openclaw/pull/73579) | fix(tts): deliver WhatsApp voice notes from suppressed group replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73579.md) | complete | Apr 28, 2026, 13:22 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73580](https://github.com/openclaw/openclaw/pull/73580) | fix(whatsapp): expose Baileys socket timing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73580.md) | complete | Apr 28, 2026, 13:20 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55210](https://github.com/openclaw/openclaw/pull/55210) | fix: resolve finish_reason placement and chunk emission issues for v1/chat/completions endpoint | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55210.md) | complete | Apr 28, 2026, 13:19 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 13:29 UTC

State: Review publish complete

Merged review artifacts for run 25054382460. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25054382460](https://github.com/openclaw/clawsweeper/actions/runs/25054382460)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3556 |
| Open PRs | 3433 |
| Open items total | 6989 |
| Reviewed files | 6563 |
| Unreviewed open items | 426 |
| Archived closed files | 13506 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3372 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3186 |
| Proposed PR closes | 12 (0.4% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6558 |
| Proposed closes awaiting apply | 12 (0.2% of fresh reviews) |
| Closed by Codex apply | 10350 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 100/700 current (600 due, 14.3%) |
| Hourly hot item cadence (<7d) | 100/700 current (600 due, 14.3%) |
| Daily cadence coverage | 1733/4018 current (2285 due, 43.1%) |
| Daily PR cadence | 1439/2785 current (1346 due, 51.7%) |
| Daily new issue cadence (<30d) | 294/1233 current (939 due, 23.8%) |
| Weekly older issue cadence | 1844/1845 current (1 due, 99.9%) |
| Due now by cadence | 3312 |

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

Latest review: Apr 28, 2026, 13:26 UTC. Latest close: Apr 28, 2026, 13:20 UTC. Latest comment sync: Apr 28, 2026, 13:26 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 157 | 9 | 148 | 1 | 1 | 12 | 0 |
| Last hour | 746 | 18 | 728 | 1 | 8 | 379 | 1 |
| Last 24 hours | 2725 | 141 | 2584 | 2 | 442 | 556 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#68773](https://github.com/openclaw/openclaw/pull/68773) | fix(active-memory): skip payload-less memory_search toolResults in tr… | closed externally after review | Apr 28, 2026, 13:20 UTC | [records/openclaw-openclaw/closed/68773.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68773.md) |
| [#73547](https://github.com/openclaw/openclaw/pull/73547) | feat: add auto-recall plugin — automatic memory retrieval for prompt enrichment | belongs on ClawHub | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/73547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73547.md) |
| [#69038](https://github.com/openclaw/openclaw/pull/69038) | fix(mattermost): anchor slash command state to globalThis to fix dual-instance 503s | duplicate or superseded | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/69038.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69038.md) |
| [#53665](https://github.com/openclaw/openclaw/pull/53665) | perf(memory): avoid full sort in vector fallback search | already implemented on main | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/53665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53665.md) |
| [#42859](https://github.com/openclaw/openclaw/pull/42859) | Gateway: stop injecting control-ui sender metadata | duplicate or superseded | Apr 28, 2026, 12:52 UTC | [records/openclaw-openclaw/closed/42859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42859.md) |
| [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | kept open | Apr 28, 2026, 12:45 UTC | [records/openclaw-openclaw/closed/72917.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72917.md) |
| [#73555](https://github.com/openclaw/openclaw/issues/73555) | [Bug]: sidecars.channels blocks Node's event loop (5min+ stall on startup and prompt processing) | already implemented on main | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73555.md) |
| [#73553](https://github.com/openclaw/openclaw/issues/73553) | Hardcoded `/api` prefix in Signal `httpUrl` causes 404 with signal-cli-rest-api | duplicate or superseded | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73553.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73553.md) |
| [#73539](https://github.com/openclaw/openclaw/pull/73539) | fix(yuanbao) update docs | closed externally after review | Apr 28, 2026, 12:20 UTC | [records/openclaw-openclaw/closed/73539.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73539.md) |
| [#73497](https://github.com/openclaw/openclaw/pull/73497) | fix(plugins): regenerate bundled wrappers with correct specifier in staged runtime root | already implemented on main | Apr 28, 2026, 12:10 UTC | [records/openclaw-openclaw/closed/73497.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73497.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#59298](https://github.com/openclaw/openclaw/pull/59298) | feat(skills): notify agents of available updates via skill preambles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59298.md) | complete | Apr 28, 2026, 13:26 UTC |
| [#73540](https://github.com/openclaw/openclaw/pull/73540) | fix(gateway): resolve effective tool cold misses synchronously | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73540.md) | complete | Apr 28, 2026, 13:25 UTC |
| [#51067](https://github.com/openclaw/openclaw/pull/51067) | feat(gateway): add configurable Control UI title | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51067.md) | failed | Apr 28, 2026, 13:25 UTC |
| [#72921](https://github.com/openclaw/openclaw/pull/72921) | fix(agents): validate caller groupId against session context in resolveGroupToolPolicy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72921.md) | complete | Apr 28, 2026, 13:25 UTC |
| [#73492](https://github.com/openclaw/openclaw/pull/73492) | feat: expose sessionId and sessionKey to provider createStreamFn plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73492.md) | complete | Apr 28, 2026, 13:24 UTC |
| [#73581](https://github.com/openclaw/openclaw/issues/73581) | [Bug]: Agent processing lane can stall for minutes without timeout recovery, plus memory-core dreaming cron race condition on Gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73581.md) | complete | Apr 28, 2026, 13:23 UTC |
| [#73462](https://github.com/openclaw/openclaw/pull/73462) | fix: add auth profile listing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73462.md) | complete | Apr 28, 2026, 13:23 UTC |
| [#73579](https://github.com/openclaw/openclaw/pull/73579) | fix(tts): deliver WhatsApp voice notes from suppressed group replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73579.md) | complete | Apr 28, 2026, 13:22 UTC |
| [#73580](https://github.com/openclaw/openclaw/pull/73580) | fix(whatsapp): expose Baileys socket timing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73580.md) | complete | Apr 28, 2026, 13:20 UTC |
| [#55210](https://github.com/openclaw/openclaw/pull/55210) | fix: resolve finish_reason placement and chunk emission issues for v1/chat/completions endpoint | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55210.md) | complete | Apr 28, 2026, 13:19 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 13:28 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25055657387](https://github.com/openclaw/clawsweeper/actions/runs/25055657387)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 37 |
| Open items total | 912 |
| Reviewed files | 905 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 904 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 49/52 current (3 due, 94.2%) |
| Hourly hot item cadence (<7d) | 49/52 current (3 due, 94.2%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 627/628 current (1 due, 99.8%) |
| Due now by cadence | 11 |

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

Latest review: Apr 28, 2026, 13:12 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 13:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 260 | 0 |
| Last hour | 496 | 0 | 496 | 1 | 0 | 752 | 0 |
| Last 24 hours | 915 | 3 | 912 | 1 | 10 | 780 | 0 |

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
| [#1411](https://github.com/openclaw/clawhub/pull/1411) | feat: allow owners to edit skill summary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1411.md) | complete | Apr 28, 2026, 13:12 UTC |
| [#1554](https://github.com/openclaw/clawhub/issues/1554) | Safari (WebKit/JavaScriptCore) SyntaxError: Unexpected keyword 'in' on website pages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1554.md) | complete | Apr 28, 2026, 13:12 UTC |
| [#1494](https://github.com/openclaw/clawhub/issues/1494) | Request to Whitelist Preny Analytics Skill (false positive) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1494.md) | complete | Apr 28, 2026, 13:11 UTC |
| [#984](https://github.com/openclaw/clawhub/issues/984) | nba-tracker Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/984.md) | failed | Apr 28, 2026, 13:11 UTC |
| [#1133](https://github.com/openclaw/clawhub/pull/1133) | feat: add liftModerationHold admin mutation for false-positive recovery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1133.md) | complete | Apr 28, 2026, 13:11 UTC |
| [#1431](https://github.com/openclaw/clawhub/issues/1431) | Cannot change an existing skill's publisher/owner to an organization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1431.md) | complete | Apr 28, 2026, 13:10 UTC |
| [#1233](https://github.com/openclaw/clawhub/pull/1233) | fix: clarify skill/soul stats semantics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1233.md) | complete | Apr 28, 2026, 13:10 UTC |
| [#1621](https://github.com/openclaw/clawhub/issues/1621) | Cannot signin. First time trying to publish | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1621.md) | complete | Apr 28, 2026, 13:09 UTC |
| [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 28, 2026, 13:09 UTC |
| [#1675](https://github.com/openclaw/clawhub/issues/1675) | Skills: support org ownership and transfer to org | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1675.md) | complete | Apr 28, 2026, 13:08 UTC |

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
