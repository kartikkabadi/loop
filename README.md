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

Last dashboard update: Apr 28, 2026, 18:56 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4240 |
| Open PRs | 3242 |
| Open items total | 7482 |
| Reviewed files | 7482 |
| Unreviewed open items | 0 |
| Due now by cadence | 1883 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10517 |
| Failed or stale reviews | 8 |
| Archived closed files | 13711 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6576 | 6576 | 0 | 1882 | 0 | 10514 | Apr 28, 2026, 18:54 UTC | Apr 28, 2026, 18:54 UTC | 587 |
| [ClawHub](https://github.com/openclaw/clawhub) | 906 | 906 | 0 | 1 | 0 | 3 | Apr 28, 2026, 18:46 UTC | Apr 28, 2026, 18:47 UTC | 292 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 28, 2026, 18:56 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25071814947) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 18:48 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25071268833) |

### Fleet Activity

Latest review: Apr 28, 2026, 18:54 UTC. Latest close: Apr 28, 2026, 18:54 UTC. Latest comment sync: Apr 28, 2026, 18:55 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 71 | 3 | 68 | 0 | 10 | 165 | 3 |
| Last hour | 895 | 14 | 881 | 0 | 24 | 879 | 5 |
| Last 24 hours | 5208 | 294 | 4914 | 5 | 642 | 1324 | 23 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73752](https://github.com/openclaw/openclaw/issues/73752) | [Bug]: Windows 2026.4.26 gateway/WebChat/TUI handshake timeouts + stuck agent:main:main queue | duplicate or superseded | Apr 28, 2026, 18:54 UTC | [records/openclaw-openclaw/closed/73752.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73752.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73748](https://github.com/openclaw/openclaw/issues/73748) | MemOS stopped capturing after 4.26 upgrade - fix: hooks.allowConversationAccess | already implemented on main | Apr 28, 2026, 18:48 UTC | [records/openclaw-openclaw/closed/73748.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73748.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62789](https://github.com/openclaw/openclaw/pull/62789) | cron: add command payload execution engine | belongs on ClawHub | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/62789.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62789.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73585](https://github.com/openclaw/openclaw/issues/73585) | [Bug]: Discord /gateway/bot metadata lookup times out at 10s starting ~2026-04-27 (raw HTTP latency is fine) | closed externally after review | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/73585.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73585.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73709](https://github.com/openclaw/openclaw/issues/73709) | Discord: channels.discord.voice.enabled=false still subscribes to GuildVoiceStates intent, causing sustained gateway CPU spin | closed externally after review | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/73709.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73709.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61859](https://github.com/openclaw/openclaw/issues/61859) | [Bug] 飞书图片与消息错配 - 图片路由错误 | already implemented on main | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/61859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61859.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42621](https://github.com/openclaw/openclaw/issues/42621) | Webhook hooks: allow delivering to existing agent session instead of isolated run | duplicate or superseded | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/42621.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42621.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41955](https://github.com/openclaw/openclaw/pull/41955) | fix(control-ui): show all configured agents in webchat session dropdown | duplicate or superseded | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/41955.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41955.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73745](https://github.com/openclaw/openclaw/issues/73745) | [Bug]: Discord /reset sends empty prompt on 2026.4.26 | already implemented on main | Apr 28, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/73745.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73745.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69010](https://github.com/openclaw/openclaw/pull/69010) | fix(gateway): prefer current route delivery context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69010.md) | complete | Apr 28, 2026, 18:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73724](https://github.com/openclaw/openclaw/pull/73724) | fix(cli): avoid false local gateway unreachable on probe timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73724.md) | complete | Apr 28, 2026, 18:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72585](https://github.com/openclaw/openclaw/pull/72585) | fix(ui): use agents.list[].default instead of agents.defaultId for set-default [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72585.md) | complete | Apr 28, 2026, 18:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42895](https://github.com/openclaw/openclaw/pull/42895) | fix(infra): derive home directory from PREFIX on Android/Termux | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42895.md) | complete | Apr 28, 2026, 18:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 28, 2026, 18:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73750](https://github.com/openclaw/openclaw/pull/73750) | fix(telegram): suppress acknowledged mutating tool warning leaks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73750.md) | complete | Apr 28, 2026, 18:52 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73751](https://github.com/openclaw/openclaw/pull/73751) | fix(exec): decode Windows command output with codepage-aware streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73751.md) | complete | Apr 28, 2026, 18:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73749](https://github.com/openclaw/openclaw/pull/73749) | fix(tui): recover stale streaming status after unbound final | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73749.md) | complete | Apr 28, 2026, 18:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73235](https://github.com/openclaw/openclaw/pull/73235) | fix(bluebubbles): tighten DM-vs-group routing across session route, reactions, chatGuid fallback, and short message ids | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73235.md) | complete | Apr 28, 2026, 18:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62191](https://github.com/openclaw/openclaw/pull/62191) | fix(imessage): strip U+FFFD garbage chars from echo text key normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62191.md) | complete | Apr 28, 2026, 18:49 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:56 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25071814947](https://github.com/openclaw/clawsweeper/actions/runs/25071814947)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3366 |
| Open PRs | 3210 |
| Open items total | 6576 |
| Reviewed files | 6576 |
| Unreviewed open items | 0 |
| Archived closed files | 13700 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3363 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3205 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6568 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10514 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 86/828 current (742 due, 10.4%) |
| Hourly hot item cadence (<7d) | 86/828 current (742 due, 10.4%) |
| Daily cadence coverage | 2768/3907 current (1139 due, 70.8%) |
| Daily PR cadence | 2071/2723 current (652 due, 76.1%) |
| Daily new issue cadence (<30d) | 697/1184 current (487 due, 58.9%) |
| Weekly older issue cadence | 1840/1841 current (1 due, 99.9%) |
| Due now by cadence | 1882 |

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

Latest review: Apr 28, 2026, 18:54 UTC. Latest close: Apr 28, 2026, 18:54 UTC. Latest comment sync: Apr 28, 2026, 18:55 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 51 | 3 | 48 | 0 | 9 | 145 | 3 |
| Last hour | 603 | 14 | 589 | 0 | 23 | 587 | 5 |
| Last 24 hours | 4291 | 291 | 4000 | 5 | 631 | 1004 | 23 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73752](https://github.com/openclaw/openclaw/issues/73752) | [Bug]: Windows 2026.4.26 gateway/WebChat/TUI handshake timeouts + stuck agent:main:main queue | duplicate or superseded | Apr 28, 2026, 18:54 UTC | [records/openclaw-openclaw/closed/73752.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73752.md) |
| [#73748](https://github.com/openclaw/openclaw/issues/73748) | MemOS stopped capturing after 4.26 upgrade - fix: hooks.allowConversationAccess | already implemented on main | Apr 28, 2026, 18:48 UTC | [records/openclaw-openclaw/closed/73748.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73748.md) |
| [#62789](https://github.com/openclaw/openclaw/pull/62789) | cron: add command payload execution engine | belongs on ClawHub | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/62789.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62789.md) |
| [#73585](https://github.com/openclaw/openclaw/issues/73585) | [Bug]: Discord /gateway/bot metadata lookup times out at 10s starting ~2026-04-27 (raw HTTP latency is fine) | closed externally after review | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/73585.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73585.md) |
| [#73709](https://github.com/openclaw/openclaw/issues/73709) | Discord: channels.discord.voice.enabled=false still subscribes to GuildVoiceStates intent, causing sustained gateway CPU spin | closed externally after review | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/73709.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73709.md) |
| [#61859](https://github.com/openclaw/openclaw/issues/61859) | [Bug] 飞书图片与消息错配 - 图片路由错误 | already implemented on main | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/61859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/61859.md) |
| [#42621](https://github.com/openclaw/openclaw/issues/42621) | Webhook hooks: allow delivering to existing agent session instead of isolated run | duplicate or superseded | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/42621.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42621.md) |
| [#41955](https://github.com/openclaw/openclaw/pull/41955) | fix(control-ui): show all configured agents in webchat session dropdown | duplicate or superseded | Apr 28, 2026, 18:45 UTC | [records/openclaw-openclaw/closed/41955.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41955.md) |
| [#73745](https://github.com/openclaw/openclaw/issues/73745) | [Bug]: Discord /reset sends empty prompt on 2026.4.26 | already implemented on main | Apr 28, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/73745.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73745.md) |
| [#73731](https://github.com/openclaw/openclaw/issues/73731) | resolveBuiltInModelSuppression runs the same 48-plugin load twice back-to-back via independent caches | already implemented on main | Apr 28, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/73731.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73731.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#69010](https://github.com/openclaw/openclaw/pull/69010) | fix(gateway): prefer current route delivery context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69010.md) | complete | Apr 28, 2026, 18:54 UTC |
| [#73724](https://github.com/openclaw/openclaw/pull/73724) | fix(cli): avoid false local gateway unreachable on probe timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73724.md) | complete | Apr 28, 2026, 18:54 UTC |
| [#72585](https://github.com/openclaw/openclaw/pull/72585) | fix(ui): use agents.list[].default instead of agents.defaultId for set-default [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72585.md) | complete | Apr 28, 2026, 18:54 UTC |
| [#42895](https://github.com/openclaw/openclaw/pull/42895) | fix(infra): derive home directory from PREFIX on Android/Termux | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42895.md) | complete | Apr 28, 2026, 18:53 UTC |
| [#73668](https://github.com/openclaw/openclaw/pull/73668) | feat(profile): add privacy-safe profile export and import | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73668.md) | complete | Apr 28, 2026, 18:52 UTC |
| [#73750](https://github.com/openclaw/openclaw/pull/73750) | fix(telegram): suppress acknowledged mutating tool warning leaks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73750.md) | complete | Apr 28, 2026, 18:52 UTC |
| [#73751](https://github.com/openclaw/openclaw/pull/73751) | fix(exec): decode Windows command output with codepage-aware streaming | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73751.md) | complete | Apr 28, 2026, 18:51 UTC |
| [#73749](https://github.com/openclaw/openclaw/pull/73749) | fix(tui): recover stale streaming status after unbound final | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73749.md) | complete | Apr 28, 2026, 18:51 UTC |
| [#73235](https://github.com/openclaw/openclaw/pull/73235) | fix(bluebubbles): tighten DM-vs-group routing across session route, reactions, chatGuid fallback, and short message ids | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73235.md) | complete | Apr 28, 2026, 18:50 UTC |
| [#62191](https://github.com/openclaw/openclaw/pull/62191) | fix(imessage): strip U+FFFD garbage chars from echo text key normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62191.md) | complete | Apr 28, 2026, 18:49 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 18:48 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1542,1591,1672,1771,1772,1781,1783,1787,1789,1797,1815,1818,1819,1823,1824,1828,1833,1849,1857,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25071268833](https://github.com/openclaw/clawsweeper/actions/runs/25071268833)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 874 |
| Open PRs | 32 |
| Open items total | 906 |
| Reviewed files | 906 |
| Unreviewed open items | 0 |
| Archived closed files | 11 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 874 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 906 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 49/50 current (1 due, 98%) |
| Hourly hot item cadence (<7d) | 49/50 current (1 due, 98%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 633/633 current (0 due, 100%) |
| Due now by cadence | 1 |

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

Latest review: Apr 28, 2026, 18:46 UTC. Latest close: Apr 28, 2026, 18:47 UTC. Latest comment sync: Apr 28, 2026, 18:48 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 0 | 20 | 0 | 1 | 20 | 0 |
| Last hour | 292 | 0 | 292 | 0 | 1 | 292 | 0 |
| Last 24 hours | 917 | 3 | 914 | 0 | 11 | 320 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |
| [#85](https://github.com/openclaw/clawhub/issues/85) | Clawhub Sort feature shows wrong results | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/85.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/85.md) |
| [#1736](https://github.com/openclaw/clawhub/pull/1736) | Align hover stats with denormalized counters and fix seed digest stat drift | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1736.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1736.md) |
| [#1324](https://github.com/openclaw/clawhub/pull/1324) | feat: add --dry-run flag to package publish command | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1324.md) |
| [#1240](https://github.com/openclaw/clawhub/pull/1240) | fix: use esbuild minification for safari builds | already implemented on main | Apr 28, 2026, 05:18 UTC | [records/openclaw-clawhub/closed/1240.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1240.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1783](https://github.com/openclaw/clawhub/issues/1783) | False Positive Malware Detection for @nimsuite/openclaw-nim-channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1783.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1849](https://github.com/openclaw/clawhub/issues/1849) | Clarify suspicious flag for beamer-pipeline-public@0.2.1 despite Benign high-confidence scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1849.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1818](https://github.com/openclaw/clawhub/issues/1818) | False positive: agenttrust-scanner flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1818.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1857](https://github.com/openclaw/clawhub/pull/1857) | fix(security): tighten crypto capability swap detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1857.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1819](https://github.com/openclaw/clawhub/issues/1819) | ClawHub login stuck and my published skills disappeared / hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1819.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1789](https://github.com/openclaw/clawhub/issues/1789) | https://clawhub.ai/aiworkskills/aws-wechat-article-topics why it was flagged and what  i can do. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1789.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1833](https://github.com/openclaw/clawhub/issues/1833) | False positive security flag on published skill: zhouyi-benjing-oracle | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1833.md) | complete | Apr 28, 2026, 18:46 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 28, 2026, 18:46 UTC |

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
