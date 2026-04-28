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

Last dashboard update: Apr 28, 2026, 12:01 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4237 |
| Open PRs | 3222 |
| Open items total | 7459 |
| Reviewed files | 7459 |
| Unreviewed open items | 0 |
| Due now by cadence | 3080 |
| Proposed closes awaiting apply | 9 |
| Closed by Codex apply | 10334 |
| Failed or stale reviews | 6 |
| Archived closed files | 13494 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6555 | 6555 | 0 | 3033 | 9 | 10331 | Apr 28, 2026, 11:59 UTC | Apr 28, 2026, 12:00 UTC | 433 |
| [ClawHub](https://github.com/openclaw/clawhub) | 904 | 904 | 0 | 47 | 0 | 3 | Apr 28, 2026, 11:58 UTC | Apr 28, 2026, 08:18 UTC | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 12:01 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25051556056) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 11:59 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049237151) |

### Fleet Activity

Latest review: Apr 28, 2026, 11:59 UTC. Latest close: Apr 28, 2026, 12:00 UTC. Latest comment sync: Apr 28, 2026, 12:00 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 551 | 15 | 536 | 3 | 23 | 46 | 1 |
| Last hour | 914 | 40 | 874 | 3 | 45 | 433 | 2 |
| Last 24 hours | 3442 | 126 | 3316 | 3 | 434 | 711 | 14 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51316](https://github.com/openclaw/openclaw/pull/51316) | fix: clamp reserveTokensFloor to prevent negative memory flush threshold | duplicate or superseded | Apr 28, 2026, 12:00 UTC | [records/openclaw-openclaw/closed/51316.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51316.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51198](https://github.com/openclaw/openclaw/pull/51198) | fix(scripts): close pipes on partial RPC client init failure | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/51198.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51198.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50885](https://github.com/openclaw/openclaw/pull/50885) | process: fix Windows runExec garbled CJK output [AI-assisted] | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50885.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50885.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50587](https://github.com/openclaw/openclaw/pull/50587) | fix(reply): pass inbound images from MediaPaths to agent as ImageContent[] | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50587.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50587.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50586](https://github.com/openclaw/openclaw/pull/50586) | fix(exec): use gbk encoding for Windows cmd.exe wrapper [AI-assisted] | duplicate or superseded | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50586.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50586.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50158](https://github.com/openclaw/openclaw/pull/50158) | fix: add format validation for gateway.nodes.denyCommands | duplicate or superseded | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50158.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50158.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50102](https://github.com/openclaw/openclaw/pull/50102) | fix: prevent ghost media attachments from debounce buffer flatMap | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50102.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50102.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49850](https://github.com/openclaw/openclaw/pull/49850) | fix(feishu): use native at elements for @mentions in post messages | duplicate or superseded | Apr 28, 2026, 11:58 UTC | [records/openclaw-openclaw/closed/49850.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49850.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49770](https://github.com/openclaw/openclaw/pull/49770) | fix(feishu): stop @_all from triggering all bots in group chat | already implemented on main | Apr 28, 2026, 11:58 UTC | [records/openclaw-openclaw/closed/49770.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49770.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49669](https://github.com/openclaw/openclaw/pull/49669) | fix(ui): add .catch() to createLazy() to prevent silent blank views | already implemented on main | Apr 28, 2026, 11:58 UTC | [records/openclaw-openclaw/closed/49669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49669.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 28, 2026, 11:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73489](https://github.com/openclaw/openclaw/pull/73489) | fix(signal): harden signal-cli archive download with SSRF guard, timeout, and size cap (#54153) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73489.md) | complete | Apr 28, 2026, 11:59 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66687](https://github.com/openclaw/openclaw/pull/66687) | feat(cache-trace): capture stream-context tools with opt-in payload controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66687.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73546](https://github.com/openclaw/openclaw/issues/73546) | Bug: TUI reconnect creates new session instead of resuming previous one, causing silent conversation reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73546.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73542](https://github.com/openclaw/openclaw/issues/73542) | [Bug]: message_sending hook event not firing for user-defined hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73542.md) | complete | Apr 28, 2026, 11:58 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1212](https://github.com/openclaw/clawhub/issues/1212) | False positive: WORKSTATION.md skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1212.md) | complete | Apr 28, 2026, 11:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 11:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73545](https://github.com/openclaw/openclaw/pull/73545) | Skip model warmup for message CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73545.md) | complete | Apr 28, 2026, 11:56 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 12:01 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25051556056](https://github.com/openclaw/clawsweeper/actions/runs/25051556056)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3364 |
| Open PRs | 3191 |
| Open items total | 6555 |
| Reviewed files | 6555 |
| Unreviewed open items | 0 |
| Archived closed files | 13484 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3362 |
| Proposed issue closes | 3 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3189 |
| Proposed PR closes | 6 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6551 |
| Proposed closes awaiting apply | 9 (0.1% of fresh reviews) |
| Closed by Codex apply | 10331 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 92/683 current (591 due, 13.5%) |
| Hourly hot item cadence (<7d) | 92/683 current (591 due, 13.5%) |
| Daily cadence coverage | 1591/4032 current (2441 due, 39.5%) |
| Daily PR cadence | 1298/2792 current (1494 due, 46.5%) |
| Daily new issue cadence (<30d) | 293/1240 current (947 due, 23.6%) |
| Weekly older issue cadence | 1839/1840 current (1 due, 99.9%) |
| Due now by cadence | 3033 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:59 UTC. Latest close: Apr 28, 2026, 12:00 UTC. Latest comment sync: Apr 28, 2026, 12:00 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 217 | 15 | 202 | 1 | 23 | 46 | 1 |
| Last hour | 563 | 40 | 523 | 1 | 45 | 433 | 2 |
| Last 24 hours | 2528 | 123 | 2405 | 1 | 424 | 613 | 14 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#51316](https://github.com/openclaw/openclaw/pull/51316) | fix: clamp reserveTokensFloor to prevent negative memory flush threshold | duplicate or superseded | Apr 28, 2026, 12:00 UTC | [records/openclaw-openclaw/closed/51316.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51316.md) |
| [#51198](https://github.com/openclaw/openclaw/pull/51198) | fix(scripts): close pipes on partial RPC client init failure | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/51198.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/51198.md) |
| [#50885](https://github.com/openclaw/openclaw/pull/50885) | process: fix Windows runExec garbled CJK output [AI-assisted] | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50885.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50885.md) |
| [#50587](https://github.com/openclaw/openclaw/pull/50587) | fix(reply): pass inbound images from MediaPaths to agent as ImageContent[] | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50587.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50587.md) |
| [#50586](https://github.com/openclaw/openclaw/pull/50586) | fix(exec): use gbk encoding for Windows cmd.exe wrapper [AI-assisted] | duplicate or superseded | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50586.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50586.md) |
| [#50158](https://github.com/openclaw/openclaw/pull/50158) | fix: add format validation for gateway.nodes.denyCommands | duplicate or superseded | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50158.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50158.md) |
| [#50102](https://github.com/openclaw/openclaw/pull/50102) | fix: prevent ghost media attachments from debounce buffer flatMap | already implemented on main | Apr 28, 2026, 11:59 UTC | [records/openclaw-openclaw/closed/50102.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50102.md) |
| [#49850](https://github.com/openclaw/openclaw/pull/49850) | fix(feishu): use native at elements for @mentions in post messages | duplicate or superseded | Apr 28, 2026, 11:58 UTC | [records/openclaw-openclaw/closed/49850.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49850.md) |
| [#49770](https://github.com/openclaw/openclaw/pull/49770) | fix(feishu): stop @_all from triggering all bots in group chat | already implemented on main | Apr 28, 2026, 11:58 UTC | [records/openclaw-openclaw/closed/49770.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49770.md) |
| [#49669](https://github.com/openclaw/openclaw/pull/49669) | fix(ui): add .catch() to createLazy() to prevent silent blank views | already implemented on main | Apr 28, 2026, 11:58 UTC | [records/openclaw-openclaw/closed/49669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49669.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73533](https://github.com/openclaw/openclaw/pull/73533) | fix(infra): skip POSIX /tmp preferred path on Windows (#60713) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73533.md) | complete | Apr 28, 2026, 11:59 UTC |
| [#73489](https://github.com/openclaw/openclaw/pull/73489) | fix(signal): harden signal-cli archive download with SSRF guard, timeout, and size cap (#54153) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73489.md) | complete | Apr 28, 2026, 11:59 UTC |
| [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#66687](https://github.com/openclaw/openclaw/pull/66687) | feat(cache-trace): capture stream-context tools with opt-in payload controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66687.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#73546](https://github.com/openclaw/openclaw/issues/73546) | Bug: TUI reconnect creates new session instead of resuming previous one, causing silent conversation reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73546.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#73542](https://github.com/openclaw/openclaw/issues/73542) | [Bug]: message_sending hook event not firing for user-defined hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73542.md) | complete | Apr 28, 2026, 11:58 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 28, 2026, 11:57 UTC |
| [#73545](https://github.com/openclaw/openclaw/pull/73545) | Skip model warmup for message CLI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73545.md) | complete | Apr 28, 2026, 11:56 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 11:55 UTC |
| [#73543](https://github.com/openclaw/openclaw/pull/73543) | fix(exec/approvals): match executable realpath against allowlist patterns (#45595) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73543.md) | complete | Apr 28, 2026, 11:55 UTC |

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
| Open issues | 873 |
| Open PRs | 31 |
| Open items total | 904 |
| Reviewed files | 904 |
| Unreviewed open items | 0 |
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
| Hourly cadence coverage | 7/52 current (45 due, 13.5%) |
| Hourly hot item cadence (<7d) | 7/52 current (45 due, 13.5%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 625/627 current (2 due, 99.7%) |
| Due now by cadence | 47 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:58 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 334 | 0 | 334 | 2 | 0 | 0 | 0 |
| Last hour | 351 | 0 | 351 | 2 | 0 | 0 | 0 |
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
