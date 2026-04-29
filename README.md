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

Last dashboard update: Apr 29, 2026, 01:49 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4404 |
| Open PRs | 3464 |
| Open items total | 7868 |
| Reviewed files | 7481 |
| Unreviewed open items | 387 |
| Due now by cadence | 2102 |
| Proposed closes awaiting apply | 1 |
| Work candidates awaiting promotion | 102 |
| Closed by Codex apply | 10607 |
| Failed or stale reviews | 16 |
| Archived closed files | 13879 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6952 | 6571 | 381 | 2037 | 1 | 102 | 10602 | Apr 29, 2026, 01:46 UTC | Apr 29, 2026, 01:42 UTC | 321 |
| [ClawHub](https://github.com/openclaw/clawhub) | 916 | 910 | 6 | 65 | 0 | 0 | 5 | Apr 29, 2026, 01:42 UTC | Apr 29, 2026, 01:22 UTC | 23 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 01:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25086924387) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake in progress | Apr 29, 2026, 01:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25086924387) |

### Fleet Activity

Latest review: Apr 29, 2026, 01:46 UTC. Latest close: Apr 29, 2026, 01:42 UTC. Latest comment sync: Apr 29, 2026, 01:47 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 15 | 3 | 12 | 0 | 4 | 19 | 1 |
| Last hour | 565 | 7 | 558 | 3 | 20 | 344 | 3 |
| Last 24 hours | 6492 | 388 | 6104 | 13 | 672 | 1802 | 28 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73922](https://github.com/openclaw/openclaw/issues/73922) | Gateway crashes ~18s after startup due to bonjour name conflict with other local services | already implemented on main | Apr 29, 2026, 01:42 UTC | [records/openclaw-openclaw/closed/73922.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73922.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73924](https://github.com/openclaw/openclaw/issues/73924) | [Bug]: Gateway hangs from session cleanup 2026.4.x | already implemented on main | Apr 29, 2026, 01:41 UTC | [records/openclaw-openclaw/closed/73924.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73924.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48404](https://github.com/openclaw/openclaw/issues/48404) | [Bug]: OpenClaw v2026.3.13 fails to start on the target system due to a **segmentation fault** | closed externally after review | Apr 29, 2026, 01:38 UTC | [records/openclaw-openclaw/closed/48404.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48404.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49751](https://github.com/openclaw/openclaw/pull/49751) | fix: clear WS handshake timer early, increase timeouts | closed externally after review | Apr 29, 2026, 01:35 UTC | [records/openclaw-openclaw/closed/49751.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49751.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42001](https://github.com/openclaw/openclaw/pull/42001) | fix(ui): preserve gateway token when editing WebSocket URL | closed externally after review | Apr 29, 2026, 01:33 UTC | [records/openclaw-openclaw/closed/42001.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42001.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70470](https://github.com/openclaw/openclaw/issues/70470) | [Bug]: WhatsApp behavior seems to depend on read receipts being enabled | closed externally after review | Apr 29, 2026, 01:32 UTC | [records/openclaw-openclaw/closed/70470.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70470.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73899](https://github.com/openclaw/openclaw/pull/73899) | feat(skills): add integration-notion skill for Notion setup | closed externally after item changed | Apr 29, 2026, 01:30 UTC | [records/openclaw-openclaw/closed/73899.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73899.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#40602](https://github.com/openclaw/openclaw/pull/40602) | fix(feishu): improve bitable placeholder row cleanup to handle non-empty default values | closed externally after review | Apr 29, 2026, 01:29 UTC | [records/openclaw-openclaw/closed/40602.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40602.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68450](https://github.com/openclaw/openclaw/pull/68450) | fix(mcp): dispose bundled MCP runtimes after isolated one-shot runs | closed externally after review | Apr 29, 2026, 01:29 UTC | [records/openclaw-openclaw/closed/68450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68450.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56923](https://github.com/openclaw/openclaw/pull/56923) | fix(security): include dangerous commands in known commands list | closed externally after review | Apr 29, 2026, 01:27 UTC | [records/openclaw-openclaw/closed/56923.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56923.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73926](https://github.com/openclaw/openclaw/issues/73926) | Bug: `/new` produces empty prompt → Anthropic API 400 \"messages: at least one message is required\ | high | candidate | Apr 29, 2026, 01:41 UTC | [records/openclaw-openclaw/items/73926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73926.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46899](https://github.com/openclaw/openclaw/issues/46899) | [Bug]: Cron Job Delivery Channel Mismatch - Telegram Configured but Feishu Used | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-openclaw/items/46899.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46899.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | Apr 29, 2026, 01:13 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48514](https://github.com/openclaw/openclaw/issues/48514) | WebChat UI freezes and becomes unresponsive with accumulated session history | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/48514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48514.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49185](https://github.com/openclaw/openclaw/issues/49185) | [Feature]: Configurable maxRetries per provider for model API calls | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/49185.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49185.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73646](https://github.com/openclaw/openclaw/issues/73646) | [Bug]: `openclaw crestodian` exits 0 with \"needs interactive TTY\" error in non-TTY contexts; sibling subcommands correctly exit non-zero on the same input | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73646.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73646.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49250](https://github.com/openclaw/openclaw/issues/49250) | [Feature] Handle prompt/heartbeat race conflicts without losing the prompt | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/49250.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49250.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#47444](https://github.com/openclaw/openclaw/issues/47444) | Workflow responses leak internal <function_calls> scaffolding into user-visible chat | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/47444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47444.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48450](https://github.com/openclaw/openclaw/issues/48450) | Discord: thread-create returns error but thread is created (ghost duplicate threads) | high | candidate | Apr 29, 2026, 01:10 UTC | [records/openclaw-openclaw/items/48450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48450.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48279](https://github.com/openclaw/openclaw/issues/48279) | [Bug]: agentclientprotocol SDK v0.16.x breaks ACP listSessions functionality | high | candidate | Apr 29, 2026, 01:09 UTC | [records/openclaw-openclaw/items/48279.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48279.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48534](https://github.com/openclaw/openclaw/issues/48534) | [Bug]: Plugin before_agent_start hook hang permanently blocks all agent runs with zero diagnostic output | high | candidate | Apr 29, 2026, 01:08 UTC | [records/openclaw-openclaw/items/48534.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48534.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48680](https://github.com/openclaw/openclaw/issues/48680) | [Bug] Model fallback treats HTTP 403 business rejection as 'candidate_succeeded', skipping remaining fallback models | high | candidate | Apr 29, 2026, 01:08 UTC | [records/openclaw-openclaw/items/48680.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48680.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46647](https://github.com/openclaw/openclaw/issues/46647) | Slack system prompt incorrectly checks inlineButtons instead of interactiveReplies | high | candidate | Apr 29, 2026, 01:08 UTC | [records/openclaw-openclaw/items/46647.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46647.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73474.md) | complete | Apr 29, 2026, 01:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73928](https://github.com/openclaw/openclaw/pull/73928) | fix(cli): set non-zero exit code when crestodian detects non-TTY [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73928.md) | complete | Apr 29, 2026, 01:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73927](https://github.com/openclaw/openclaw/pull/73927) | [AI-assisted] fix(telegram): soft-fail benign delete errors | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73927.md) | complete | Apr 29, 2026, 01:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73916](https://github.com/openclaw/openclaw/issues/73916) | [Bug]: Gateway binds port but hangs / never responds on Intel macOS with existing ~/.openclaw state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73916.md) | complete | Apr 29, 2026, 01:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73921](https://github.com/openclaw/openclaw/issues/73921) | infer model run silently ignores --model override (always routes to anthropic/claude-sonnet-4-6) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73921.md) | complete | Apr 29, 2026, 01:44 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1875.md) | complete | Apr 29, 2026, 01:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73926](https://github.com/openclaw/openclaw/issues/73926) | Bug: `/new` produces empty prompt → Anthropic API 400 \"messages: at least one message is required\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73926.md) | complete | Apr 29, 2026, 01:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73750](https://github.com/openclaw/openclaw/pull/73750) | fix(telegram): suppress acknowledged mutating tool warning leaks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73750.md) | complete | Apr 29, 2026, 01:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73751](https://github.com/openclaw/openclaw/pull/73751) | fix(exec): decode Windows command output with codepage-aware streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73751.md) | complete | Apr 29, 2026, 01:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73925](https://github.com/openclaw/openclaw/pull/73925) | fix(gateway): bound websocket auth after valid connect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73925.md) | complete | Apr 29, 2026, 01:40 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 01:49 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25086924387](https://github.com/openclaw/clawsweeper/actions/runs/25086924387)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3528 |
| Open PRs | 3424 |
| Open items total | 6952 |
| Reviewed files | 6571 |
| Unreviewed open items | 381 |
| Archived closed files | 13863 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3344 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3218 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6562 |
| Proposed closes awaiting apply | 1 (0% of fresh reviews) |
| Work candidates awaiting promotion | 102 |
| Closed by Codex apply | 10602 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 71/899 current (828 due, 7.9%) |
| Hourly hot item cadence (<7d) | 71/899 current (828 due, 7.9%) |
| Daily cadence coverage | 3028/3853 current (825 due, 78.6%) |
| Daily PR cadence | 2253/2695 current (442 due, 83.6%) |
| Daily new issue cadence (<30d) | 775/1158 current (383 due, 66.9%) |
| Weekly older issue cadence | 1816/1819 current (3 due, 99.8%) |
| Due now by cadence | 2037 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6951 |
| Missing eligible open records | 218 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 93 |
| Archived records that are open again | 0 |
| Stale item records | 2 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 01:46 UTC. Latest close: Apr 29, 2026, 01:42 UTC. Latest comment sync: Apr 29, 2026, 01:47 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 13 | 3 | 10 | 0 | 4 | 17 | 1 |
| Last hour | 542 | 7 | 535 | 2 | 19 | 321 | 3 |
| Last 24 hours | 5566 | 385 | 5181 | 6 | 656 | 959 | 28 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73922](https://github.com/openclaw/openclaw/issues/73922) | Gateway crashes ~18s after startup due to bonjour name conflict with other local services | already implemented on main | Apr 29, 2026, 01:42 UTC | [records/openclaw-openclaw/closed/73922.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73922.md) |
| [#73924](https://github.com/openclaw/openclaw/issues/73924) | [Bug]: Gateway hangs from session cleanup 2026.4.x | already implemented on main | Apr 29, 2026, 01:41 UTC | [records/openclaw-openclaw/closed/73924.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73924.md) |
| [#48404](https://github.com/openclaw/openclaw/issues/48404) | [Bug]: OpenClaw v2026.3.13 fails to start on the target system due to a **segmentation fault** | closed externally after review | Apr 29, 2026, 01:38 UTC | [records/openclaw-openclaw/closed/48404.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48404.md) |
| [#49751](https://github.com/openclaw/openclaw/pull/49751) | fix: clear WS handshake timer early, increase timeouts | closed externally after review | Apr 29, 2026, 01:35 UTC | [records/openclaw-openclaw/closed/49751.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/49751.md) |
| [#42001](https://github.com/openclaw/openclaw/pull/42001) | fix(ui): preserve gateway token when editing WebSocket URL | closed externally after review | Apr 29, 2026, 01:33 UTC | [records/openclaw-openclaw/closed/42001.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42001.md) |
| [#70470](https://github.com/openclaw/openclaw/issues/70470) | [Bug]: WhatsApp behavior seems to depend on read receipts being enabled | closed externally after review | Apr 29, 2026, 01:32 UTC | [records/openclaw-openclaw/closed/70470.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70470.md) |
| [#73899](https://github.com/openclaw/openclaw/pull/73899) | feat(skills): add integration-notion skill for Notion setup | closed externally after item changed | Apr 29, 2026, 01:30 UTC | [records/openclaw-openclaw/closed/73899.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73899.md) |
| [#40602](https://github.com/openclaw/openclaw/pull/40602) | fix(feishu): improve bitable placeholder row cleanup to handle non-empty default values | closed externally after review | Apr 29, 2026, 01:29 UTC | [records/openclaw-openclaw/closed/40602.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40602.md) |
| [#68450](https://github.com/openclaw/openclaw/pull/68450) | fix(mcp): dispose bundled MCP runtimes after isolated one-shot runs | closed externally after review | Apr 29, 2026, 01:29 UTC | [records/openclaw-openclaw/closed/68450.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68450.md) |
| [#56923](https://github.com/openclaw/openclaw/pull/56923) | fix(security): include dangerous commands in known commands list | closed externally after review | Apr 29, 2026, 01:27 UTC | [records/openclaw-openclaw/closed/56923.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56923.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#73926](https://github.com/openclaw/openclaw/issues/73926) | Bug: `/new` produces empty prompt → Anthropic API 400 \"messages: at least one message is required\ | high | candidate | Apr 29, 2026, 01:41 UTC | [records/openclaw-openclaw/items/73926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73926.md) |
| [#46899](https://github.com/openclaw/openclaw/issues/46899) | [Bug]: Cron Job Delivery Channel Mismatch - Telegram Configured but Feishu Used | high | candidate | Apr 29, 2026, 01:17 UTC | [records/openclaw-openclaw/items/46899.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46899.md) |
| [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | Apr 29, 2026, 01:13 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [#48514](https://github.com/openclaw/openclaw/issues/48514) | WebChat UI freezes and becomes unresponsive with accumulated session history | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/48514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48514.md) |
| [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) |
| [#49185](https://github.com/openclaw/openclaw/issues/49185) | [Feature]: Configurable maxRetries per provider for model API calls | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/49185.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49185.md) |
| [#73646](https://github.com/openclaw/openclaw/issues/73646) | [Bug]: `openclaw crestodian` exits 0 with \"needs interactive TTY\" error in non-TTY contexts; sibling subcommands correctly exit non-zero on the same input | high | candidate | Apr 29, 2026, 01:12 UTC | [records/openclaw-openclaw/items/73646.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73646.md) |
| [#72338](https://github.com/openclaw/openclaw/issues/72338) | Gateway CPU spin causes Telegram replies to stall and status probe to time out | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/72338.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72338.md) |
| [#49250](https://github.com/openclaw/openclaw/issues/49250) | [Feature] Handle prompt/heartbeat race conflicts without losing the prompt | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/49250.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49250.md) |
| [#47444](https://github.com/openclaw/openclaw/issues/47444) | Workflow responses leak internal <function_calls> scaffolding into user-visible chat | high | candidate | Apr 29, 2026, 01:11 UTC | [records/openclaw-openclaw/items/47444.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/47444.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73474](https://github.com/openclaw/openclaw/pull/73474) | fix(gateway,proxy): bypass Windows proxy for localhost gateway connections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73474.md) | complete | Apr 29, 2026, 01:46 UTC |
| [#73928](https://github.com/openclaw/openclaw/pull/73928) | fix(cli): set non-zero exit code when crestodian detects non-TTY [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73928.md) | complete | Apr 29, 2026, 01:45 UTC |
| [#73927](https://github.com/openclaw/openclaw/pull/73927) | [AI-assisted] fix(telegram): soft-fail benign delete errors | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73927.md) | complete | Apr 29, 2026, 01:44 UTC |
| [#73916](https://github.com/openclaw/openclaw/issues/73916) | [Bug]: Gateway binds port but hangs / never responds on Intel macOS with existing ~/.openclaw state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73916.md) | complete | Apr 29, 2026, 01:44 UTC |
| [#73921](https://github.com/openclaw/openclaw/issues/73921) | infer model run silently ignores --model override (always routes to anthropic/claude-sonnet-4-6) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73921.md) | complete | Apr 29, 2026, 01:44 UTC |
| [#73926](https://github.com/openclaw/openclaw/issues/73926) | Bug: `/new` produces empty prompt → Anthropic API 400 \"messages: at least one message is required\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73926.md) | complete | Apr 29, 2026, 01:41 UTC |
| [#73750](https://github.com/openclaw/openclaw/pull/73750) | fix(telegram): suppress acknowledged mutating tool warning leaks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73750.md) | complete | Apr 29, 2026, 01:41 UTC |
| [#73751](https://github.com/openclaw/openclaw/pull/73751) | fix(exec): decode Windows command output with codepage-aware streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73751.md) | complete | Apr 29, 2026, 01:41 UTC |
| [#73925](https://github.com/openclaw/openclaw/pull/73925) | fix(gateway): bound websocket auth after valid connect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73925.md) | complete | Apr 29, 2026, 01:40 UTC |
| [#73923](https://github.com/openclaw/openclaw/pull/73923) | fix(ui): preserve gateway token during safe websocket url edits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73923.md) | complete | Apr 29, 2026, 01:40 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 01:49 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25086924387](https://github.com/openclaw/clawsweeper/actions/runs/25086924387)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 40 |
| Open items total | 916 |
| Reviewed files | 910 |
| Unreviewed open items | 6 |
| Archived closed files | 16 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 869 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 903 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 0 |
| Closed by Codex apply | 5 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 2/54 current (52 due, 3.7%) |
| Hourly hot item cadence (<7d) | 2/54 current (52 due, 3.7%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 628/634 current (6 due, 99.1%) |
| Due now by cadence | 65 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 916 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 6 |
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

Latest review: Apr 29, 2026, 01:42 UTC. Latest close: Apr 29, 2026, 01:22 UTC. Latest comment sync: Apr 29, 2026, 01:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 2 | 0 |
| Last hour | 23 | 0 | 23 | 1 | 1 | 23 | 0 |
| Last 24 hours | 926 | 3 | 923 | 7 | 16 | 843 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |  |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1875.md) | complete | Apr 29, 2026, 01:42 UTC |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1871.md) | complete | Apr 29, 2026, 01:39 UTC |
| [#1769](https://github.com/openclaw/clawhub/issues/1769) | Review request: jettyd skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1769.md) | failed | Apr 29, 2026, 01:18 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 29, 2026, 01:11 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 29, 2026, 01:10 UTC |
| [#1571](https://github.com/openclaw/clawhub/issues/1571) | tender-search \"Skill flagged — suspicious patterns detected\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1571.md) | complete | Apr 29, 2026, 01:10 UTC |
| [#1689](https://github.com/openclaw/clawhub/issues/1689) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1689.md) | complete | Apr 29, 2026, 01:10 UTC |
| [#1589](https://github.com/openclaw/clawhub/issues/1589) | [Security] wechat-helper: unvalidated $MESSAGE passed directly to browser automation tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1589.md) | complete | Apr 29, 2026, 01:10 UTC |
| [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 29, 2026, 01:10 UTC |
| [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 29, 2026, 01:10 UTC |

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
