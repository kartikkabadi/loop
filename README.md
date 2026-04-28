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

Last dashboard update: Apr 28, 2026, 12:07 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4419 |
| Open PRs | 3467 |
| Open items total | 7886 |
| Reviewed files | 7453 |
| Unreviewed open items | 433 |
| Due now by cadence | 3525 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10343 |
| Failed or stale reviews | 5 |
| Archived closed files | 13503 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6975 | 6549 | 426 | 3467 | 0 | 10340 | Apr 28, 2026, 12:05 UTC | Apr 28, 2026, 12:04 UTC | 570 |
| [ClawHub](https://github.com/openclaw/clawhub) | 911 | 904 | 7 | 58 | 0 | 3 | Apr 28, 2026, 12:06 UTC | Apr 28, 2026, 08:18 UTC | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 12:06 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25051791093) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake publish complete | Apr 28, 2026, 12:07 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25051655323) |

### Fleet Activity

Latest review: Apr 28, 2026, 12:06 UTC. Latest close: Apr 28, 2026, 12:04 UTC. Latest comment sync: Apr 28, 2026, 12:06 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 41 | 2 | 39 | 1 | 27 | 406 | 1 |
| Last hour | 904 | 39 | 865 | 2 | 48 | 570 | 2 |
| Last 24 hours | 3445 | 126 | 3319 | 2 | 439 | 1061 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73241](https://github.com/openclaw/openclaw/pull/73241) | feat(bluebubbles): fetch quoted message via SSRF-guarded API on reply cache miss + surface attachment download errors | duplicate or superseded | Apr 28, 2026, 12:04 UTC | [records/openclaw-openclaw/closed/73241.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73241.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65272](https://github.com/openclaw/openclaw/issues/65272) | Pre-compaction memory flush appears mid-context instead of first position after auto-compaction | already implemented on main | Apr 28, 2026, 12:04 UTC | [records/openclaw-openclaw/closed/65272.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65272.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60675](https://github.com/openclaw/openclaw/issues/60675) | [Bug]: Browser gateway chat run fails at runtime with ENOENT: mkdir '/home/node' after successful device-authenticated WebSocket connect | already implemented on main | Apr 28, 2026, 12:04 UTC | [records/openclaw-openclaw/closed/60675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60675.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56153](https://github.com/openclaw/openclaw/pull/56153) | fix(telegram): add max retries and backoff to sendChatAction | duplicate or superseded | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/56153.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56153.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54061](https://github.com/openclaw/openclaw/issues/54061) | Suppress inline assistant text when message() tool is used in the same turn | already implemented on main | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/54061.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54061.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52329](https://github.com/openclaw/openclaw/pull/52329) | fix(agents): include cache tokens in /status cost estimate | duplicate or superseded | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/52329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52329.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51986](https://github.com/openclaw/openclaw/pull/51986) | fix: use WAL journal mode for memory index database | already implemented on main | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/51986.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51986.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51965](https://github.com/openclaw/openclaw/pull/51965) | Onboarding: heuristic vision inputs for non-Azure custom models (#51869) (#51869) | already implemented on main | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/51965.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51965.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51893](https://github.com/openclaw/openclaw/pull/51893) | fix(onboard): infer vision input for non-Azure custom models | already implemented on main | Apr 28, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/51893.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51893.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51316](https://github.com/openclaw/openclaw/pull/51316) | fix: clamp reserveTokensFloor to prevent negative memory flush threshold | duplicate or superseded | Apr 28, 2026, 12:00 UTC | [records/openclaw-openclaw/closed/51316.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51316.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1671](https://github.com/openclaw/clawhub/issues/1671) | Request for Security Re-evaluation: \"book-companion\" skill marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1671.md) | complete | Apr 28, 2026, 12:06 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1691](https://github.com/openclaw/clawhub/issues/1691) | Skill flagged as suspicious--tech-write-assist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1691.md) | complete | Apr 28, 2026, 12:06 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#999](https://github.com/openclaw/clawhub/issues/999) | False suspicious flagged on agentstead deploy, VirusTotal report clearly say pass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/999.md) | complete | Apr 28, 2026, 12:06 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1735](https://github.com/openclaw/clawhub/issues/1735) | Peeps shows up as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1735.md) | complete | Apr 28, 2026, 12:06 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1746](https://github.com/openclaw/clawhub/issues/1746) | ExpertLens incorrectly flagged as Suspicious — expected patterns for behavior-modification skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1746.md) | complete | Apr 28, 2026, 12:06 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1692](https://github.com/openclaw/clawhub/issues/1692) | Skill flagged as suspicious - OpenCawl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1692.md) | complete | Apr 28, 2026, 12:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 28, 2026, 12:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1720](https://github.com/openclaw/clawhub/pull/1720) | fix(auth): fail fast when AUTH_GITHUB_ID/SECRET env vars are missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1720.md) | complete | Apr 28, 2026, 12:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1717](https://github.com/openclaw/clawhub/issues/1717) | Bug: /api/auth/signin/github returns HTTP 500 — GitHub OAuth broken, no new tokens can be generated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1717.md) | complete | Apr 28, 2026, 12:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 12:05 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 12:06 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25051791093](https://github.com/openclaw/clawsweeper/actions/runs/25051791093)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3545 |
| Open PRs | 3430 |
| Open items total | 6975 |
| Reviewed files | 6549 |
| Unreviewed open items | 426 |
| Archived closed files | 13493 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3360 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3185 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6545 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10340 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 84/685 current (601 due, 12.3%) |
| Hourly hot item cadence (<7d) | 84/685 current (601 due, 12.3%) |
| Daily cadence coverage | 1584/4023 current (2439 due, 39.4%) |
| Daily PR cadence | 1293/2787 current (1494 due, 46.4%) |
| Daily new issue cadence (<30d) | 291/1236 current (945 due, 23.5%) |
| Weekly older issue cadence | 1840/1841 current (1 due, 99.9%) |
| Due now by cadence | 3467 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 12:05 UTC. Latest close: Apr 28, 2026, 12:04 UTC. Latest comment sync: Apr 28, 2026, 12:06 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 19 | 2 | 17 | 0 | 27 | 406 | 1 |
| Last hour | 552 | 39 | 513 | 1 | 48 | 570 | 2 |
| Last 24 hours | 2531 | 123 | 2408 | 1 | 429 | 981 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73241](https://github.com/openclaw/openclaw/pull/73241) | feat(bluebubbles): fetch quoted message via SSRF-guarded API on reply cache miss + surface attachment download errors | duplicate or superseded | Apr 28, 2026, 12:04 UTC | [records/openclaw-openclaw/closed/73241.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73241.md) |
| [#65272](https://github.com/openclaw/openclaw/issues/65272) | Pre-compaction memory flush appears mid-context instead of first position after auto-compaction | already implemented on main | Apr 28, 2026, 12:04 UTC | [records/openclaw-openclaw/closed/65272.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65272.md) |
| [#60675](https://github.com/openclaw/openclaw/issues/60675) | [Bug]: Browser gateway chat run fails at runtime with ENOENT: mkdir '/home/node' after successful device-authenticated WebSocket connect | already implemented on main | Apr 28, 2026, 12:04 UTC | [records/openclaw-openclaw/closed/60675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/60675.md) |
| [#56153](https://github.com/openclaw/openclaw/pull/56153) | fix(telegram): add max retries and backoff to sendChatAction | duplicate or superseded | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/56153.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56153.md) |
| [#54061](https://github.com/openclaw/openclaw/issues/54061) | Suppress inline assistant text when message() tool is used in the same turn | already implemented on main | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/54061.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54061.md) |
| [#52329](https://github.com/openclaw/openclaw/pull/52329) | fix(agents): include cache tokens in /status cost estimate | duplicate or superseded | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/52329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/52329.md) |
| [#51986](https://github.com/openclaw/openclaw/pull/51986) | fix: use WAL journal mode for memory index database | already implemented on main | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/51986.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51986.md) |
| [#51965](https://github.com/openclaw/openclaw/pull/51965) | Onboarding: heuristic vision inputs for non-Azure custom models (#51869) (#51869) | already implemented on main | Apr 28, 2026, 12:03 UTC | [records/openclaw-openclaw/closed/51965.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51965.md) |
| [#51893](https://github.com/openclaw/openclaw/pull/51893) | fix(onboard): infer vision input for non-Azure custom models | already implemented on main | Apr 28, 2026, 12:02 UTC | [records/openclaw-openclaw/closed/51893.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51893.md) |
| [#51316](https://github.com/openclaw/openclaw/pull/51316) | fix: clamp reserveTokensFloor to prevent negative memory flush threshold | duplicate or superseded | Apr 28, 2026, 12:00 UTC | [records/openclaw-openclaw/closed/51316.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51316.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73549](https://github.com/openclaw/openclaw/issues/73549) | Feature Request: Persistent Skill/.md configuration support for commercial use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73549.md) | complete | Apr 28, 2026, 12:05 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 12:03 UTC |
| [#73548](https://github.com/openclaw/openclaw/pull/73548) | fix(acpx): validate runtime session mode at wrapper boundary (#73071) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73548.md) | complete | Apr 28, 2026, 12:02 UTC |
| [#73476](https://github.com/openclaw/openclaw/pull/73476) | Feat/tool direct reply：feat(agents): add directReply flag to tool results for bypassing LLM inference | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73476.md) | complete | Apr 28, 2026, 12:02 UTC |
| [#73540](https://github.com/openclaw/openclaw/pull/73540) | fix(gateway): prewarm effective tool inventory cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73540.md) | complete | Apr 28, 2026, 12:02 UTC |
| [#73547](https://github.com/openclaw/openclaw/pull/73547) | feat: add auto-recall plugin — automatic memory retrieval for prompt enrichment | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73547.md) | complete | Apr 28, 2026, 12:01 UTC |
| [#73497](https://github.com/openclaw/openclaw/pull/73497) | fix(plugins): regenerate bundled wrappers with correct specifier in staged runtime root | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73497.md) | complete | Apr 28, 2026, 12:01 UTC |
| [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 28, 2026, 11:59 UTC |
| [#73489](https://github.com/openclaw/openclaw/pull/73489) | fix(signal): harden signal-cli archive download with SSRF guard, timeout, and size cap (#54153) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73489.md) | complete | Apr 28, 2026, 11:59 UTC |
| [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 28, 2026, 11:58 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 12:07 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25051655323. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25051655323](https://github.com/openclaw/clawsweeper/actions/runs/25051655323)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 874 |
| Open PRs | 37 |
| Open items total | 911 |
| Reviewed files | 904 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 872 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 903 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 2/52 current (50 due, 3.8%) |
| Hourly hot item cadence (<7d) | 2/52 current (50 due, 3.8%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 58 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 12:06 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 22 | 0 | 22 | 1 | 0 | 0 | 0 |
| Last hour | 352 | 0 | 352 | 1 | 0 | 0 | 0 |
| Last 24 hours | 914 | 3 | 911 | 1 | 10 | 80 | 0 |

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
| [#1671](https://github.com/openclaw/clawhub/issues/1671) | Request for Security Re-evaluation: \"book-companion\" skill marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1671.md) | complete | Apr 28, 2026, 12:06 UTC |
| [#1691](https://github.com/openclaw/clawhub/issues/1691) | Skill flagged as suspicious--tech-write-assist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1691.md) | complete | Apr 28, 2026, 12:06 UTC |
| [#999](https://github.com/openclaw/clawhub/issues/999) | False suspicious flagged on agentstead deploy, VirusTotal report clearly say pass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/999.md) | complete | Apr 28, 2026, 12:06 UTC |
| [#1735](https://github.com/openclaw/clawhub/issues/1735) | Peeps shows up as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1735.md) | complete | Apr 28, 2026, 12:06 UTC |
| [#1746](https://github.com/openclaw/clawhub/issues/1746) | ExpertLens incorrectly flagged as Suspicious — expected patterns for behavior-modification skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1746.md) | complete | Apr 28, 2026, 12:06 UTC |
| [#1692](https://github.com/openclaw/clawhub/issues/1692) | Skill flagged as suspicious - OpenCawl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1692.md) | complete | Apr 28, 2026, 12:05 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 28, 2026, 12:05 UTC |
| [#1720](https://github.com/openclaw/clawhub/pull/1720) | fix(auth): fail fast when AUTH_GITHUB_ID/SECRET env vars are missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1720.md) | complete | Apr 28, 2026, 12:05 UTC |
| [#1717](https://github.com/openclaw/clawhub/issues/1717) | Bug: /api/auth/signin/github returns HTTP 500 — GitHub OAuth broken, no new tokens can be generated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1717.md) | complete | Apr 28, 2026, 12:05 UTC |
| [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | stale_local_checkout_blocked | Apr 28, 2026, 12:05 UTC |

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
