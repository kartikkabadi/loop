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

Last dashboard update: Apr 28, 2026, 09:49 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4407 |
| Open PRs | 3494 |
| Open items total | 7901 |
| Reviewed files | 7455 |
| Unreviewed open items | 446 |
| Due now by cadence | 3851 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10292 |
| Failed or stale reviews | 50 |
| Archived closed files | 13417 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6991 | 6552 | 439 | 3841 | 0 | 10289 | Apr 28, 2026, 09:47 UTC | Apr 28, 2026, 09:45 UTC | 43 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 10 | 0 | 3 | Apr 28, 2026, 09:45 UTC | Apr 28, 2026, 05:18 UTC | 189 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Event review applied | Apr 28, 2026, 09:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25044614340) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 09:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25043739194) |

### Fleet Activity

Latest review: Apr 28, 2026, 09:47 UTC. Latest close: Apr 28, 2026, 09:45 UTC. Latest comment sync: Apr 28, 2026, 09:49 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 53 | 2 | 51 | 0 | 2 | 32 | 1 |
| Last hour | 805 | 9 | 796 | 1 | 4 | 232 | 4 |
| Last 24 hours | 3078 | 106 | 2972 | 11 | 60 | 1108 | 22 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73450](https://github.com/openclaw/openclaw/issues/73450) | [Bug]: Telegram /new can trigger empty Codex Responses request and expose provider error | already implemented on main | Apr 28, 2026, 09:45 UTC | [records/openclaw-openclaw/closed/73450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73450.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73444](https://github.com/openclaw/openclaw/issues/73444) | Sub-agent model routing silently ignored - explicit model= falls back to primary model | already implemented on main | Apr 28, 2026, 09:42 UTC | [records/openclaw-openclaw/closed/73444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73444.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73433](https://github.com/openclaw/openclaw/issues/73433) | [Bug]: Gateway pegs single CPU thread at 100% immediately on boot in 2026.4.26 — TUI handshake timeouts, multi-minute message latency | duplicate or superseded | Apr 28, 2026, 09:01 UTC | [records/openclaw-openclaw/closed/73433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73433.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73383](https://github.com/openclaw/openclaw/pull/73383) | feat(line): persist inbound media to ~/.openclaw/media/inbound/ | already implemented on main | Apr 28, 2026, 08:53 UTC | [records/openclaw-openclaw/closed/73383.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73383.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73418](https://github.com/openclaw/openclaw/issues/73418) | memory-wiki bridge still imports 0 artifacts with QMD backend on 2026.4.26 | duplicate or superseded | Apr 28, 2026, 08:45 UTC | [records/openclaw-openclaw/closed/73418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73418.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73413](https://github.com/openclaw/openclaw/issues/73413) | [Bug]: When the sub-agent compresses, the session yield incorrectly returns intermediate results, causing the system to fail to produce the correct outcome once compression is complete and execution proceeds. | already implemented on main | Apr 28, 2026, 08:38 UTC | [records/openclaw-openclaw/closed/73413.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73413.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73313](https://github.com/openclaw/openclaw/pull/73313) | fix #73204: release session write lock during LLM summarization to prevent message drops | already implemented on main | Apr 28, 2026, 07:50 UTC | [records/openclaw-openclaw/closed/73313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73313.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73352](https://github.com/openclaw/openclaw/issues/73352) | MCP Client: Add OAuth2 Authorization Code Flow support for HTTP-based MCP servers | duplicate or superseded | Apr 28, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/73352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73352.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | complete | Apr 28, 2026, 09:47 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1266](https://github.com/openclaw/clawhub/issues/1266) | VirusTotal integration shows \"Suspicious\" despite 0/63 detections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1266.md) | complete | Apr 28, 2026, 09:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73365](https://github.com/openclaw/openclaw/pull/73365) | fix: allow steer messages during active non-streaming runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73365.md) | complete | Apr 28, 2026, 09:45 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#932](https://github.com/openclaw/clawhub/issues/932) | qualia-skill wrongly marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/932.md) | complete | Apr 28, 2026, 09:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1091](https://github.com/openclaw/clawhub/issues/1091) | False positive: greydanus/tidepool flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1091.md) | complete | Apr 28, 2026, 09:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1783](https://github.com/openclaw/clawhub/issues/1783) | False Positive Malware Detection for @nimsuite/openclaw-nim-channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1783.md) | complete | Apr 28, 2026, 09:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73437](https://github.com/openclaw/openclaw/issues/73437) | [Feature]: `ContextEngine.assemble` should fire per LLM call, not per user prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73437.md) | complete | Apr 28, 2026, 09:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1354](https://github.com/openclaw/clawhub/issues/1354) | False Positive: r-stats skill flagged as suspicious — legitimate Rscript execution for statistical analysis | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1354.md) | complete | Apr 28, 2026, 09:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1257](https://github.com/openclaw/clawhub/issues/1257) | False positive flag of create-mcp-server skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1257.md) | complete | Apr 28, 2026, 09:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1136](https://github.com/openclaw/clawhub/issues/1136) | Can we have a separate place for people to post stuff like false positive,appeal etc.? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1136.md) | complete | Apr 28, 2026, 09:44 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 09:49 UTC

State: Event review applied

Reviewed event item #71156, synced durable comment(s): 1, closed safe proposal(s): 0. Close reasons enabled: implemented_on_main,duplicate_or_superseded.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25044614340](https://github.com/openclaw/clawsweeper/actions/runs/25044614340)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3534 |
| Open PRs | 3457 |
| Open items total | 6991 |
| Reviewed files | 6552 |
| Unreviewed open items | 439 |
| Archived closed files | 13407 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3331 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3172 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6503 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10289 |
| Failed or stale reviews | 49 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 40/650 current (610 due, 6.2%) |
| Hourly hot item cadence (<7d) | 40/650 current (610 due, 6.2%) |
| Daily cadence coverage | 1280/4064 current (2784 due, 31.5%) |
| Daily PR cadence | 988/2818 current (1830 due, 35.1%) |
| Daily new issue cadence (<30d) | 292/1246 current (954 due, 23.4%) |
| Weekly older issue cadence | 1830/1838 current (8 due, 99.6%) |
| Due now by cadence | 3841 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:47 UTC. Latest close: Apr 28, 2026, 09:45 UTC. Latest comment sync: Apr 28, 2026, 09:49 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 33 | 2 | 31 | 0 | 2 | 32 | 1 |
| Last hour | 305 | 9 | 296 | 0 | 4 | 43 | 4 |
| Last 24 hours | 2165 | 103 | 2062 | 10 | 57 | 907 | 22 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73450](https://github.com/openclaw/openclaw/issues/73450) | [Bug]: Telegram /new can trigger empty Codex Responses request and expose provider error | already implemented on main | Apr 28, 2026, 09:45 UTC | [records/openclaw-openclaw/closed/73450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73450.md) |
| [#73444](https://github.com/openclaw/openclaw/issues/73444) | Sub-agent model routing silently ignored - explicit model= falls back to primary model | already implemented on main | Apr 28, 2026, 09:42 UTC | [records/openclaw-openclaw/closed/73444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73444.md) |
| [#73433](https://github.com/openclaw/openclaw/issues/73433) | [Bug]: Gateway pegs single CPU thread at 100% immediately on boot in 2026.4.26 — TUI handshake timeouts, multi-minute message latency | duplicate or superseded | Apr 28, 2026, 09:01 UTC | [records/openclaw-openclaw/closed/73433.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73433.md) |
| [#73383](https://github.com/openclaw/openclaw/pull/73383) | feat(line): persist inbound media to ~/.openclaw/media/inbound/ | already implemented on main | Apr 28, 2026, 08:53 UTC | [records/openclaw-openclaw/closed/73383.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73383.md) |
| [#73418](https://github.com/openclaw/openclaw/issues/73418) | memory-wiki bridge still imports 0 artifacts with QMD backend on 2026.4.26 | duplicate or superseded | Apr 28, 2026, 08:45 UTC | [records/openclaw-openclaw/closed/73418.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73418.md) |
| [#73413](https://github.com/openclaw/openclaw/issues/73413) | [Bug]: When the sub-agent compresses, the session yield incorrectly returns intermediate results, causing the system to fail to produce the correct outcome once compression is complete and execution proceeds. | already implemented on main | Apr 28, 2026, 08:38 UTC | [records/openclaw-openclaw/closed/73413.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73413.md) |
| [#73313](https://github.com/openclaw/openclaw/pull/73313) | fix #73204: release session write lock during LLM summarization to prevent message drops | already implemented on main | Apr 28, 2026, 07:50 UTC | [records/openclaw-openclaw/closed/73313.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73313.md) |
| [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [#73352](https://github.com/openclaw/openclaw/issues/73352) | MCP Client: Add OAuth2 Authorization Code Flow support for HTTP-based MCP servers | duplicate or superseded | Apr 28, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/73352.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73352.md) |
| [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71156](https://github.com/openclaw/openclaw/pull/71156) | docs: add AGENTS.md for secrets and pairing high-privilege zones | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71156.md) | complete | Apr 28, 2026, 09:47 UTC |
| [#73365](https://github.com/openclaw/openclaw/pull/73365) | fix: allow steer messages during active non-streaming runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73365.md) | complete | Apr 28, 2026, 09:45 UTC |
| [#73437](https://github.com/openclaw/openclaw/issues/73437) | [Feature]: `ContextEngine.assemble` should fire per LLM call, not per user prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73437.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#73440](https://github.com/openclaw/openclaw/pull/73440) | fix(gateway/command-auth): memoize ownerAllowFrom list per raw array (#50289) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73440.md) | complete | Apr 28, 2026, 09:43 UTC |
| [#73374](https://github.com/openclaw/openclaw/pull/73374) | fix: gate same-model retries to idempotent calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73374.md) | complete | Apr 28, 2026, 09:43 UTC |
| [#73434](https://github.com/openclaw/openclaw/pull/73434) | fix: three-layer defense against session stuck from lost tool results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73434.md) | complete | Apr 28, 2026, 09:43 UTC |
| [#73448](https://github.com/openclaw/openclaw/issues/73448) | Bug: message tool asVoice parameter defined in schema but never read in handleSendAction | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73448.md) | complete | Apr 28, 2026, 09:42 UTC |
| [#73323](https://github.com/openclaw/openclaw/issues/73323) | [Bug]: Gateway runtime degradation: pricing fetch 60s timeouts, Telegram polling stalls, slow RPC — chronic across 4.23/4.25/4.26 on Windows 11 + Node 24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73323.md) | complete | Apr 28, 2026, 09:42 UTC |
| [#73378](https://github.com/openclaw/openclaw/pull/73378) | feat(line): add native sticker send support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73378.md) | complete | Apr 28, 2026, 09:41 UTC |
| [#73369](https://github.com/openclaw/openclaw/pull/73369) | fix(skills/discord): clarify message.send is sideband-only to prevent autoThread duplicate replies (#73278) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73369.md) | complete | Apr 28, 2026, 09:41 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 09:45 UTC

State: Review publish complete

Merged review artifacts for run 25043739194. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25043739194](https://github.com/openclaw/clawsweeper/actions/runs/25043739194)
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
| Hourly cadence coverage | 49/51 current (2 due, 96.1%) |
| Hourly hot item cadence (<7d) | 49/51 current (2 due, 96.1%) |
| Daily cadence coverage | 227/227 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 206/206 current (0 due, 100%) |
| Weekly older issue cadence | 624/625 current (1 due, 99.8%) |
| Due now by cadence | 10 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 09:45 UTC. Latest close: Apr 28, 2026, 05:18 UTC. Latest comment sync: Apr 28, 2026, 08:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 0 | 0 | 0 |
| Last hour | 500 | 0 | 500 | 1 | 0 | 189 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 3 | 201 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1266](https://github.com/openclaw/clawhub/issues/1266) | VirusTotal integration shows \"Suspicious\" despite 0/63 detections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1266.md) | complete | Apr 28, 2026, 09:45 UTC |
| [#932](https://github.com/openclaw/clawhub/issues/932) | qualia-skill wrongly marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/932.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1091](https://github.com/openclaw/clawhub/issues/1091) | False positive: greydanus/tidepool flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1091.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1783](https://github.com/openclaw/clawhub/issues/1783) | False Positive Malware Detection for @nimsuite/openclaw-nim-channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1783.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1354](https://github.com/openclaw/clawhub/issues/1354) | False Positive: r-stats skill flagged as suspicious — legitimate Rscript execution for statistical analysis | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1354.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1257](https://github.com/openclaw/clawhub/issues/1257) | False positive flag of create-mcp-server skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1257.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1136](https://github.com/openclaw/clawhub/issues/1136) | Can we have a separate place for people to post stuff like false positive,appeal etc.? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1136.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1833](https://github.com/openclaw/clawhub/issues/1833) | False positive security flag on published skill: zhouyi-benjing-oracle | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1833.md) | complete | Apr 28, 2026, 09:44 UTC |
| [#1106](https://github.com/openclaw/clawhub/issues/1106) | False positive for spacetime-memory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1106.md) | complete | Apr 28, 2026, 09:43 UTC |
| [#1265](https://github.com/openclaw/clawhub/issues/1265) | Skill flagged as suspicious despite clean VirusTotal scan (0/65) and Benign OpenClaw rating | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1265.md) | complete | Apr 28, 2026, 09:43 UTC |

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
