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

Last dashboard update: Apr 28, 2026, 11:59 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4419 |
| Open PRs | 3474 |
| Open items total | 7893 |
| Reviewed files | 7479 |
| Unreviewed open items | 414 |
| Due now by cadence | 3468 |
| Proposed closes awaiting apply | 30 |
| Closed by Codex apply | 10314 |
| Failed or stale reviews | 6 |
| Archived closed files | 13474 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6982 | 6575 | 407 | 3440 | 30 | 10311 | Apr 28, 2026, 11:58 UTC | Apr 28, 2026, 11:56 UTC | 461 |
| [ClawHub](https://github.com/openclaw/clawhub) | 911 | 904 | 7 | 28 | 0 | 3 | Apr 28, 2026, 11:58 UTC | Apr 28, 2026, 08:18 UTC | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply in progress | Apr 28, 2026, 11:56 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25051323625) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 11:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049237151) |

### Fleet Activity

Latest review: Apr 28, 2026, 11:58 UTC. Latest close: Apr 28, 2026, 11:56 UTC. Latest comment sync: Apr 28, 2026, 11:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 635 | 20 | 615 | 3 | 5 | 22 | 0 |
| Last hour | 989 | 40 | 949 | 3 | 28 | 461 | 1 |
| Last 24 hours | 3442 | 126 | 3316 | 3 | 414 | 689 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73544](https://github.com/openclaw/openclaw/issues/73544) | Control UI: invalid config key agents.defaultId in Set Default Model | duplicate or superseded | Apr 28, 2026, 11:56 UTC | [records/openclaw-openclaw/closed/73544.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73544.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73541](https://github.com/openclaw/openclaw/issues/73541) | [Bug]: [whatsapp] channel startup failed: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:' | already implemented on main | Apr 28, 2026, 11:52 UTC | [records/openclaw-openclaw/closed/73541.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73541.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73530](https://github.com/openclaw/openclaw/issues/73530) | perf] 2026.4.26: bundled plugin runtime deps staging burns 85-100% CPU continuously after upgrade | already implemented on main | Apr 28, 2026, 11:47 UTC | [records/openclaw-openclaw/closed/73530.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73530.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73431](https://github.com/openclaw/openclaw/issues/73431) | [Bug]: Discord `message read/search` hang indefinitely and Discord channel plugin does not emit standard inbound hooks (`message_received` / `inbound_claim`) — possible regression of #31264 / #33038 | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73431.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73431.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73521](https://github.com/openclaw/openclaw/pull/73521) | fix: Discord read/search timeout, session-key fallback, and gateway execution mode | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73521.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73529](https://github.com/openclaw/openclaw/issues/73529) | agents.list[].thinkingDefault not reflected in Control UI session thinking selector | already implemented on main | Apr 28, 2026, 11:44 UTC | [records/openclaw-openclaw/closed/73529.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73529.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73528](https://github.com/openclaw/openclaw/issues/73528) | Gateway startup warmup is slow for inline configured primary model | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/73528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73528.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46992](https://github.com/openclaw/openclaw/pull/46992) | Fix: Windows terminal encoding set to UTF-8 | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/46992.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46992.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46472](https://github.com/openclaw/openclaw/pull/46472) | fix(feishu): add WebSocket heartbeat config to prevent silent disconnection | duplicate or superseded | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/46472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46472.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41473](https://github.com/openclaw/openclaw/pull/41473) | Slack: expose Socket Mode ping/pong timeout config | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/41473.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41473.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73546](https://github.com/openclaw/openclaw/issues/73546) | Bug: TUI reconnect creates new session instead of resuming previous one, causing silent conversation reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73546.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73542](https://github.com/openclaw/openclaw/issues/73542) | [Bug]: message_sending hook event not firing for user-defined hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73542.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1212](https://github.com/openclaw/clawhub/issues/1212) | False positive: WORKSTATION.md skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1212.md) | complete | Apr 28, 2026, 11:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 11:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73545](https://github.com/openclaw/openclaw/pull/73545) | Skip model warmup for message CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73545.md) | complete | Apr 28, 2026, 11:56 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#999](https://github.com/openclaw/clawhub/issues/999) | False suspicious flagged on agentstead deploy, VirusTotal report clearly say pass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/999.md) | failed | Apr 28, 2026, 11:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 11:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73543](https://github.com/openclaw/openclaw/pull/73543) | fix(exec/approvals): match executable realpath against allowlist patterns (#45595) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73543.md) | complete | Apr 28, 2026, 11:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61335](https://github.com/openclaw/openclaw/pull/61335) | fix(usage): handle Daylight saving time (DST) hour boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61335.md) | complete | Apr 28, 2026, 11:54 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 11:56 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh all closes. Close reasons: all. Existing Codex automated review comments are updated in place when closing or when comment-only sync is stale by 7 day(s); checkpoints commit every 50 fresh closes; close delay is 2000ms; sync-comments-only=false; item numbers=47947,48147,48245,48289,48325,48668,48795,48808,48967,49072,49366,49669,49770,49850,50102,50158,50586,50587,50885,51198,51316,51893,51965,51986,52329,54061,56153,60675,65272,73241.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25051323625](https://github.com/openclaw/clawsweeper/actions/runs/25051323625)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3545 |
| Open PRs | 3437 |
| Open items total | 6982 |
| Reviewed files | 6575 |
| Unreviewed open items | 407 |
| Archived closed files | 13464 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3362 |
| Proposed issue closes | 3 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3209 |
| Proposed PR closes | 27 (0.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6571 |
| Proposed closes awaiting apply | 30 (0.5% of fresh reviews) |
| Closed by Codex apply | 10311 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 92/683 current (591 due, 13.5%) |
| Hourly hot item cadence (<7d) | 92/683 current (591 due, 13.5%) |
| Daily cadence coverage | 1611/4052 current (2441 due, 39.8%) |
| Daily PR cadence | 1318/2812 current (1494 due, 46.9%) |
| Daily new issue cadence (<30d) | 293/1240 current (947 due, 23.6%) |
| Weekly older issue cadence | 1839/1840 current (1 due, 99.9%) |
| Due now by cadence | 3440 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:58 UTC. Latest close: Apr 28, 2026, 11:56 UTC. Latest comment sync: Apr 28, 2026, 11:59 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 301 | 20 | 281 | 1 | 5 | 22 | 0 |
| Last hour | 563 | 40 | 523 | 1 | 28 | 461 | 1 |
| Last 24 hours | 2528 | 123 | 2405 | 1 | 404 | 591 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73544](https://github.com/openclaw/openclaw/issues/73544) | Control UI: invalid config key agents.defaultId in Set Default Model | duplicate or superseded | Apr 28, 2026, 11:56 UTC | [records/openclaw-openclaw/closed/73544.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73544.md) |
| [#73541](https://github.com/openclaw/openclaw/issues/73541) | [Bug]: [whatsapp] channel startup failed: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:' | already implemented on main | Apr 28, 2026, 11:52 UTC | [records/openclaw-openclaw/closed/73541.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73541.md) |
| [#73530](https://github.com/openclaw/openclaw/issues/73530) | perf] 2026.4.26: bundled plugin runtime deps staging burns 85-100% CPU continuously after upgrade | already implemented on main | Apr 28, 2026, 11:47 UTC | [records/openclaw-openclaw/closed/73530.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73530.md) |
| [#73431](https://github.com/openclaw/openclaw/issues/73431) | [Bug]: Discord `message read/search` hang indefinitely and Discord channel plugin does not emit standard inbound hooks (`message_received` / `inbound_claim`) — possible regression of #31264 / #33038 | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73431.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73431.md) |
| [#73521](https://github.com/openclaw/openclaw/pull/73521) | fix: Discord read/search timeout, session-key fallback, and gateway execution mode | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73521.md) |
| [#73529](https://github.com/openclaw/openclaw/issues/73529) | agents.list[].thinkingDefault not reflected in Control UI session thinking selector | already implemented on main | Apr 28, 2026, 11:44 UTC | [records/openclaw-openclaw/closed/73529.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73529.md) |
| [#73528](https://github.com/openclaw/openclaw/issues/73528) | Gateway startup warmup is slow for inline configured primary model | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/73528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73528.md) |
| [#46992](https://github.com/openclaw/openclaw/pull/46992) | Fix: Windows terminal encoding set to UTF-8 | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/46992.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46992.md) |
| [#46472](https://github.com/openclaw/openclaw/pull/46472) | fix(feishu): add WebSocket heartbeat config to prevent silent disconnection | duplicate or superseded | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/46472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46472.md) |
| [#41473](https://github.com/openclaw/openclaw/pull/41473) | Slack: expose Socket Mode ping/pong timeout config | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/41473.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41473.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73546](https://github.com/openclaw/openclaw/issues/73546) | Bug: TUI reconnect creates new session instead of resuming previous one, causing silent conversation reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73546.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#73542](https://github.com/openclaw/openclaw/issues/73542) | [Bug]: message_sending hook event not firing for user-defined hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73542.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 11:57 UTC |
| [#73545](https://github.com/openclaw/openclaw/pull/73545) | Skip model warmup for message CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73545.md) | complete | Apr 28, 2026, 11:56 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 11:55 UTC |
| [#73543](https://github.com/openclaw/openclaw/pull/73543) | fix(exec/approvals): match executable realpath against allowlist patterns (#45595) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73543.md) | complete | Apr 28, 2026, 11:55 UTC |
| [#61335](https://github.com/openclaw/openclaw/pull/61335) | fix(usage): handle Daylight saving time (DST) hour boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61335.md) | complete | Apr 28, 2026, 11:54 UTC |
| [#73513](https://github.com/openclaw/openclaw/pull/73513) | fix: decode web fetch legacy charsets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73513.md) | complete | Apr 28, 2026, 11:54 UTC |
| [#71961](https://github.com/openclaw/openclaw/pull/71961) | fix(agents): restore compaction gateway logs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71961.md) | complete | Apr 28, 2026, 11:51 UTC |
| [#73467](https://github.com/openclaw/openclaw/issues/73467) | [2026.4.26] Gateway main thread stalls under orchestration load; /readyz timeouts and reload deferred behind active runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73467.md) | complete | Apr 28, 2026, 11:50 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 11:59 UTC

State: Review publish complete

Merged review artifacts for run 25049237151. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25049237151](https://github.com/openclaw/clawsweeper/actions/runs/25049237151)
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
| Fresh reviewed issues in the last 7 days | 871 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 902 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 2 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 33/52 current (19 due, 63.5%) |
| Hourly hot item cadence (<7d) | 33/52 current (19 due, 63.5%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 625/627 current (2 due, 99.7%) |
| Due now by cadence | 28 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:58 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 334 | 0 | 334 | 2 | 0 | 0 | 0 |
| Last hour | 426 | 0 | 426 | 2 | 0 | 0 | 0 |
| Last 24 hours | 914 | 3 | 911 | 2 | 10 | 98 | 0 |

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
| [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#1212](https://github.com/openclaw/clawhub/issues/1212) | False positive: WORKSTATION.md skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1212.md) | complete | Apr 28, 2026, 11:57 UTC |
| [#999](https://github.com/openclaw/clawhub/issues/999) | False suspicious flagged on agentstead deploy, VirusTotal report clearly say pass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/999.md) | failed | Apr 28, 2026, 11:56 UTC |
| [#1444](https://github.com/openclaw/clawhub/issues/1444) | False positive: jobautopilot-submitter flagged as suspicious by VirusTotal Code Insight | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1444.md) | complete | Apr 28, 2026, 11:52 UTC |
| [#1457](https://github.com/openclaw/clawhub/issues/1457) | Request to delete skill: xuy76008-maker/weaver-oa-todo-query | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1457.md) | complete | Apr 28, 2026, 11:52 UTC |
| [#1442](https://github.com/openclaw/clawhub/issues/1442) | False positive: jobautopilot-bundle flagged as suspicious by VirusTotal Code Insight | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1442.md) | complete | Apr 28, 2026, 11:51 UTC |
| [#1476](https://github.com/openclaw/clawhub/issues/1476) | [Appeal] Skill flagged suspicious: clevrpay | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1476.md) | complete | Apr 28, 2026, 11:51 UTC |
| [#1853](https://github.com/openclaw/clawhub/issues/1853) | False positive flag on aicreditshare-platform skill (legitimate platform documentation) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1853.md) | complete | Apr 28, 2026, 11:51 UTC |
| [#1659](https://github.com/openclaw/clawhub/issues/1659) | My skill just disappeared, and I can't log in again. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1659.md) | complete | Apr 28, 2026, 11:51 UTC |
| [#1743](https://github.com/openclaw/clawhub/issues/1743) | Can not search skill from Clawhub | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1743.md) | complete | Apr 28, 2026, 11:51 UTC |

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
