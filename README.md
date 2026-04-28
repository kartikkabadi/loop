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

Last dashboard update: Apr 28, 2026, 09:06 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4411 |
| Open PRs | 3489 |
| Open items total | 7900 |
| Reviewed files | 7455 |
| Unreviewed open items | 445 |
| Due now by cadence | 3753 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10290 |
| Failed or stale reviews | 40 |
| Archived closed files | 13408 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6990 | 6552 | 438 | 3714 | 0 | 10287 | Apr 28, 2026, 09:01 UTC | Apr 28, 2026, 09:01 UTC | 45 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 39 | 0 | 3 | Apr 28, 2026, 09:05 UTC | Apr 28, 2026, 05:18 UTC | 467 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Event review applied | Apr 28, 2026, 09:05 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25043843310) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake publish complete | Apr 28, 2026, 09:06 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25043856115) |

### Fleet Activity

Latest review: Apr 28, 2026, 09:05 UTC. Latest close: Apr 28, 2026, 09:01 UTC. Latest comment sync: Apr 28, 2026, 09:04 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 194 | 7 | 187 | 0 | 2 | 333 | 1 |
| Last hour | 1066 | 12 | 1054 | 1 | 4 | 512 | 7 |
| Last 24 hours | 3271 | 117 | 3154 | 15 | 59 | 1582 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54378](https://github.com/openclaw/openclaw/issues/54378) | Webchat: Maximum call stack size exceeded when adding photo/image attachment | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/54378.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54378.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53742](https://github.com/openclaw/openclaw/issues/53742) | Bug: macOS gateway install --force resolves SecretRef values into plaintext LaunchAgent plist and triggers token mismatch loop | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/53742.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53742.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44816](https://github.com/openclaw/openclaw/pull/44816) | fix(daemon): try direct systemctl --user before --machine fallback | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/44816.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44816.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#43341](https://github.com/openclaw/openclaw/issues/43341) | Bug: TUI not receiving real-time message updates from main session | duplicate or superseded | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/43341.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43341.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42010](https://github.com/openclaw/openclaw/pull/42010) | fix(line): migrate media downloads to saveMediaBuffer for sandbox access | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/42010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42010.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73433](https://github.com/openclaw/openclaw/issues/73433) | [Bug]: Gateway pegs single CPU thread at 100% immediately on boot in 2026.4.26 — TUI handshake timeouts, multi-minute message latency | duplicate or superseded | Apr 28, 2026, 09:01 UTC | [records/openclaw-openclaw/closed/73433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73433.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73383](https://github.com/openclaw/openclaw/pull/73383) | feat(line): persist inbound media to ~/.openclaw/media/inbound/ | already implemented on main | Apr 28, 2026, 08:53 UTC | [records/openclaw-openclaw/closed/73383.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73383.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73418](https://github.com/openclaw/openclaw/issues/73418) | memory-wiki bridge still imports 0 artifacts with QMD backend on 2026.4.26 | duplicate or superseded | Apr 28, 2026, 08:45 UTC | [records/openclaw-openclaw/closed/73418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73413](https://github.com/openclaw/openclaw/issues/73413) | [Bug]: When the sub-agent compresses, the session yield incorrectly returns intermediate results, causing the system to fail to produce the correct outcome once compression is complete and execution proceeds. | already implemented on main | Apr 28, 2026, 08:38 UTC | [records/openclaw-openclaw/closed/73413.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73413.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73313](https://github.com/openclaw/openclaw/pull/73313) | fix #73204: release session write lock during LLM summarization to prevent message drops | already implemented on main | Apr 28, 2026, 07:50 UTC | [records/openclaw-openclaw/closed/73313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73313.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 09:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1828](https://github.com/openclaw/clawhub/issues/1828) | Operon-Guard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1828.md) | complete | Apr 28, 2026, 09:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 09:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1785](https://github.com/openclaw/clawhub/issues/1785) | Appeal: opsrobot skill falsely flagged as suspicious by VirusTotal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1785.md) | complete | Apr 28, 2026, 09:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 28, 2026, 09:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1852](https://github.com/openclaw/clawhub/issues/1852) | Multi-agent trust boundaries for claw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1852.md) | complete | Apr 28, 2026, 09:05 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | complete | Apr 28, 2026, 09:04 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 09:04 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 28, 2026, 09:04 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | complete | Apr 28, 2026, 09:04 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 09:06 UTC

State: Event review applied

Reviewed event item #73384, synced durable comment(s): 0, closed safe proposal(s): 0. Close reasons enabled: implemented_on_main,duplicate_or_superseded.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25043857274](https://github.com/openclaw/clawsweeper/actions/runs/25043857274)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3538 |
| Open PRs | 3452 |
| Open items total | 6990 |
| Reviewed files | 6552 |
| Unreviewed open items | 438 |
| Archived closed files | 13398 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3337 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3176 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6513 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10287 |
| Failed or stale reviews | 39 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 27/648 current (621 due, 4.2%) |
| Hourly hot item cadence (<7d) | 27/648 current (621 due, 4.2%) |
| Daily cadence coverage | 1413/4063 current (2650 due, 34.8%) |
| Daily PR cadence | 1054/2818 current (1764 due, 37.4%) |
| Daily new issue cadence (<30d) | 359/1245 current (886 due, 28.8%) |
| Weekly older issue cadence | 1836/1841 current (5 due, 99.7%) |
| Due now by cadence | 3714 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:04 UTC. Latest close: Apr 28, 2026, 09:03 UTC. Latest comment sync: Apr 28, 2026, 09:04 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 174 | 7 | 167 | 0 | 2 | 12 | 1 |
| Last hour | 545 | 12 | 533 | 0 | 4 | 45 | 7 |
| Last 24 hours | 2358 | 114 | 2244 | 14 | 56 | 901 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#54378](https://github.com/openclaw/openclaw/issues/54378) | Webchat: Maximum call stack size exceeded when adding photo/image attachment | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/54378.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54378.md) |
| [#53742](https://github.com/openclaw/openclaw/issues/53742) | Bug: macOS gateway install --force resolves SecretRef values into plaintext LaunchAgent plist and triggers token mismatch loop | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/53742.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/53742.md) |
| [#44816](https://github.com/openclaw/openclaw/pull/44816) | fix(daemon): try direct systemctl --user before --machine fallback | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/44816.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44816.md) |
| [#43341](https://github.com/openclaw/openclaw/issues/43341) | Bug: TUI not receiving real-time message updates from main session | duplicate or superseded | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/43341.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43341.md) |
| [#42010](https://github.com/openclaw/openclaw/pull/42010) | fix(line): migrate media downloads to saveMediaBuffer for sandbox access | already implemented on main | Apr 28, 2026, 09:03 UTC | [records/openclaw-openclaw/closed/42010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42010.md) |
| [#73433](https://github.com/openclaw/openclaw/issues/73433) | [Bug]: Gateway pegs single CPU thread at 100% immediately on boot in 2026.4.26 — TUI handshake timeouts, multi-minute message latency | duplicate or superseded | Apr 28, 2026, 09:01 UTC | [records/openclaw-openclaw/closed/73433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73433.md) |
| [#73383](https://github.com/openclaw/openclaw/pull/73383) | feat(line): persist inbound media to ~/.openclaw/media/inbound/ | already implemented on main | Apr 28, 2026, 08:53 UTC | [records/openclaw-openclaw/closed/73383.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73383.md) |
| [#73418](https://github.com/openclaw/openclaw/issues/73418) | memory-wiki bridge still imports 0 artifacts with QMD backend on 2026.4.26 | duplicate or superseded | Apr 28, 2026, 08:45 UTC | [records/openclaw-openclaw/closed/73418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73418.md) |
| [#73413](https://github.com/openclaw/openclaw/issues/73413) | [Bug]: When the sub-agent compresses, the session yield incorrectly returns intermediate results, causing the system to fail to produce the correct outcome once compression is complete and execution proceeds. | already implemented on main | Apr 28, 2026, 08:38 UTC | [records/openclaw-openclaw/closed/73413.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73413.md) |
| [#73313](https://github.com/openclaw/openclaw/pull/73313) | fix #73204: release session write lock during LLM summarization to prevent message drops | already implemented on main | Apr 28, 2026, 07:50 UTC | [records/openclaw-openclaw/closed/73313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73313.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 09:04 UTC |
| [#72700](https://github.com/openclaw/openclaw/pull/72700) | feat(openrouter): add video generation provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72700.md) | complete | Apr 28, 2026, 09:01 UTC |
| [#73365](https://github.com/openclaw/openclaw/pull/73365) | fix: allow steer messages during active non-streaming runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73365.md) | complete | Apr 28, 2026, 09:01 UTC |
| [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 28, 2026, 09:00 UTC |
| [#73431](https://github.com/openclaw/openclaw/issues/73431) | [Bug]: Discord `message read/search` hang indefinitely and Discord channel plugin does not emit standard inbound hooks (`message_received` / `inbound_claim`) — possible regression of #31264 / #33038 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73431.md) | complete | Apr 28, 2026, 09:00 UTC |
| [#73165](https://github.com/openclaw/openclaw/pull/73165) | Add MCP readiness gate for advertised skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73165.md) | complete | Apr 28, 2026, 09:00 UTC |
| [#73372](https://github.com/openclaw/openclaw/pull/73372) | fix(cron): clarify local timezone cron expressions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73372.md) | complete | Apr 28, 2026, 09:00 UTC |
| [#73434](https://github.com/openclaw/openclaw/pull/73434) | fix: three-layer defense against session stuck from lost tool results | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73434.md) | complete | Apr 28, 2026, 09:00 UTC |
| [#73432](https://github.com/openclaw/openclaw/issues/73432) | [Bug]: qmd embedding is never triggered per memory.qmd.update.interval/embedInterval | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73432.md) | complete | Apr 28, 2026, 08:57 UTC |
| [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) | complete | Apr 28, 2026, 08:55 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 09:06 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25043856115. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25043856115](https://github.com/openclaw/clawsweeper/actions/runs/25043856115)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 873 |
| Open PRs | 37 |
| Open items total | 910 |
| Reviewed files | 903 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 871 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 902 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 20/51 current (31 due, 39.2%) |
| Hourly hot item cadence (<7d) | 20/51 current (31 due, 39.2%) |
| Daily cadence coverage | 229/229 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 208/208 current (0 due, 100%) |
| Weekly older issue cadence | 622/623 current (1 due, 99.8%) |
| Due now by cadence | 39 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:05 UTC. Latest close: Apr 28, 2026, 05:18 UTC. Latest comment sync: Apr 28, 2026, 08:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 0 | 321 | 0 |
| Last hour | 521 | 0 | 521 | 1 | 0 | 467 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 3 | 681 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1828](https://github.com/openclaw/clawhub/issues/1828) | Operon-Guard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1828.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1785](https://github.com/openclaw/clawhub/issues/1785) | Appeal: opsrobot skill falsely flagged as suspicious by VirusTotal | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1785.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1852](https://github.com/openclaw/clawhub/issues/1852) | Multi-agent trust boundaries for claw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1852.md) | complete | Apr 28, 2026, 09:05 UTC |
| [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | complete | Apr 28, 2026, 09:04 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 09:04 UTC |
| [#1808](https://github.com/openclaw/clawhub/issues/1808) | Re-evaluation request: topview-skill (official Topview AI client) — medium-suspicious verdict triggered by emoji ZWJ false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1808.md) | complete | Apr 28, 2026, 09:04 UTC |
| [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | complete | Apr 28, 2026, 09:04 UTC |

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
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
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
