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

Last dashboard update: Apr 28, 2026, 14:44 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4423 |
| Open PRs | 3445 |
| Open items total | 7868 |
| Reviewed files | 7456 |
| Unreviewed open items | 412 |
| Due now by cadence | 3112 |
| Proposed closes awaiting apply | 16 |
| Closed by Codex apply | 10386 |
| Failed or stale reviews | 5 |
| Archived closed files | 13571 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6955 | 6550 | 405 | 3060 | 16 | 10383 | Apr 28, 2026, 14:31 UTC | Apr 28, 2026, 14:24 UTC | 675 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 52 | 0 | 3 | Apr 28, 2026, 14:22 UTC | Apr 28, 2026, 08:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 14:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25057396452) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 14:24 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25058345601) |

### Fleet Activity

Latest review: Apr 28, 2026, 14:31 UTC. Latest close: Apr 28, 2026, 14:24 UTC. Latest comment sync: Apr 28, 2026, 14:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 6 | 0 | 6 | 0 | 0 | 297 | 0 |
| Last hour | 1055 | 31 | 1024 | 0 | 31 | 695 | 1 |
| Last 24 hours | 4064 | 175 | 3889 | 2 | 489 | 1770 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73576](https://github.com/openclaw/openclaw/pull/73576) | fix: clarify infer audio/image errors when no provider configured | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/73576.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73576.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57470](https://github.com/openclaw/openclaw/pull/57470) | fix(cron): honour payload.model override even when not in allowlist | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57470.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57470.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57139](https://github.com/openclaw/openclaw/issues/57139) | sessions_history should support reading archived/reset sessions | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57139.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56698](https://github.com/openclaw/openclaw/issues/56698) | Bug: Hook bootstrap virtual files accumulate on every restart (no dedup) | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56698.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56698.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56671](https://github.com/openclaw/openclaw/pull/56671) | fix(config): deduplicate clobbered config snapshots in-process | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56671.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56671.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56601](https://github.com/openclaw/openclaw/issues/56601) | [Bug]: In Chat in Web Interface the Microsoft Edge voice does not use the voice in the openclaw.json config | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56601.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56601.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56504](https://github.com/openclaw/openclaw/pull/56504) | fix: normalize tool IDs in repairToolUseResultPairing for cross-model sessions | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56504.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56504.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56469](https://github.com/openclaw/openclaw/issues/56469) | Support per-device typingIndicator configuration for Feishu channel | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56469.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56469.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56453](https://github.com/openclaw/openclaw/pull/56453) | fix(agent): respect configured default agent for --to sessions | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56453.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56299](https://github.com/openclaw/openclaw/issues/56299) | [Feature]: Control UI should auto-reconnect after gateway restart | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56299.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56299.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73543](https://github.com/openclaw/openclaw/pull/73543) | fix(exec/approvals): match executable realpath against allowlist patterns (#45595) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73543.md) | complete | Apr 28, 2026, 14:31 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73369](https://github.com/openclaw/openclaw/pull/73369) | fix(skills/discord): clarify message.send is sideband-only to prevent autoThread duplicate replies (#73278) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73369.md) | complete | Apr 28, 2026, 14:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 28, 2026, 14:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73602](https://github.com/openclaw/openclaw/issues/73602) | [Bug]: WhatsApp flaps and Telegram polling stalls on WSL2 in 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73602.md) | complete | Apr 28, 2026, 14:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73495](https://github.com/openclaw/openclaw/pull/73495) | fix(telegram): document and warn when replyToMode silently disables tool-progress preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73495.md) | complete | Apr 28, 2026, 14:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 14:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73563](https://github.com/openclaw/openclaw/pull/73563) | fix(security): add session transcript redaction guards at bare appendMessage call sites | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73563.md) | complete | Apr 28, 2026, 14:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56597](https://github.com/openclaw/openclaw/issues/56597) | [Bug]: Discord sessions persist per-session exec directives, causing allowlist mode to behave unexpectedly after config changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/56597.md) | complete | Apr 28, 2026, 14:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57470](https://github.com/openclaw/openclaw/pull/57470) | fix(cron): honour payload.model override even when not in allowlist | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57470.md) | complete | Apr 28, 2026, 14:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66961](https://github.com/openclaw/openclaw/issues/66961) | Bug: models.json generation should exclude unresolved custom providers; codex discovered models still rejected by session model allowlist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66961.md) | complete | Apr 28, 2026, 14:28 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 14:44 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 290. Item numbers: 15591,17311,17684,18915,19362,19482,20802,23096,25222,27061,30142,30529,34542,34581,38502,39102,39115,39137,41296,41372,41991,42027,42291,42373,42400,42475,42533,42647,42798,42832,42853,42877,42933,42937,42961,42986,42987,43117,43170,43176,43190,43202,43204,43217,43231,43244,43249,43254,43300,43306,43340,43348,43659,43837,44166,45320,45417,45592,45643,45662,45782,45808,45832,45902,47090,47264,47776,47816,47984,48014,48034,48112,48115,48130,48150,48194,48235,48270,48278,48283,48305,48312,48320,48324,48325,48334,48335,48336,48350,48355,48368,48375,48377,48387,48391,48396,48425,48433,48472,48509,48520,48537,48556,48570,48585,48593,48604,48608,48635,48675,48681,48682,48690,48702,48724,48732,48792,48807,48834,48836,48845,48851,48868,48883,48900,48904,48940,48945,48958,48976,49001,49042,49044,49058,49064,49069,49082,49083,49107,49109,49112,49117,49120,49135,49194,49286,49332,49335,49361,49401,49434,49529,49549,49550,49685,49699,49704,49707,49762,49769,49794,49800,49870,49875,49936,49945,49968,49980,49981,50076,50141,50160,50172,50191,50193,50200,50250,50320,50381,50399,50460,50463,50507,50521,50527,50631,50708,50755,50760,50777,50837,50875,50881,50933,50978,50992,51078,51163,51371,51472,51565,51683,51733,51777,51868,51889,51926,51970,52012,52121,52125,55253,55354,55358,55365,55372,55381,55401,55420,55459,55462,55484,55492,55501,55506,55520,55532,55563,55592,55600,55619,55640,55678,55691,55718,55723,55743,55766,55770,55771,55789,55790,55792,55806,55807,55831,55840,55850,55851,55858,55870,55874,55880,55882,55884,55888,55893,55896,55901,55913,55914,55915,55917,55927,55928,55935,55940,55944,55966,55970,55973,55982,56023,56031,56034,56036,56044,56072,56078,56081,56083,56092,56096,56102,56106,56110,56118,56130,56131,56145,56152,56157,56167,56176,56190,56197,56199,56202,56203,56215,56217,56222,56227,56257,56258,56263,56271,56276,56284,56286,56299,56307,56308,56312,56318,56319,56340,56349,56352,56357,56362,56366,56368,56386,56391,56398,56401,56403,56415,56419,56420,56435,56453,56454,56457,56467,56469,56488,56497,56498,56499,56504,56509,56516,56523,56530,56535,56544,56545,56562,56574,56580,56581,56583,56597,56601,56609,56610,56615,56619,56624,56635,56650,56653,56668,56671,56672,56674,56697,56698,56699,56705,56720,56726,56733,56736,56741,56752,56768,56771,56778,56781,56783,56785,56793,56795,56796,56806,56815,56818,56827,56830,56831,56839,56845,56850,56856,56858,56861,56863,56866,56869,56876,56880,56881,56898,56966,56973,56974,56979,57000,57016,57053,57067,57077,57088,57089,57091,57100,57110,57129,57135,57139,57140,57142,57146,57148,57207,57225,57283,57293,57366,57425,57470,57510,57511,65054,65204,65867,66071,66957,66961,67884,70153,70464,71582,71830,72015,72226,72237,72306,72314,72338,72705,73165,73243,73312,73338,73357,73363,73387,73421,73424,73434,73466,73474,73476,73478,73480,73483,73486,73489,73496,73499,73500,73501,73503,73511,73514,73515,73523,73525,73531,73532,73535,73537,73559,73561,73562,73564,73565,73566,73567,73568,73569,73570,73573,73574,73575,73576.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25057396452](https://github.com/openclaw/clawsweeper/actions/runs/25057396452)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3548 |
| Open PRs | 3407 |
| Open items total | 6955 |
| Reviewed files | 6550 |
| Unreviewed open items | 405 |
| Archived closed files | 13544 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3373 |
| Proposed issue closes | 9 (0.3% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3173 |
| Proposed PR closes | 7 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6546 |
| Proposed closes awaiting apply | 16 (0.2% of fresh reviews) |
| Closed by Codex apply | 10383 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 90/709 current (619 due, 12.7%) |
| Hourly hot item cadence (<7d) | 90/709 current (619 due, 12.7%) |
| Daily cadence coverage | 1964/3999 current (2035 due, 49.1%) |
| Daily PR cadence | 1655/2767 current (1112 due, 59.8%) |
| Daily new issue cadence (<30d) | 309/1232 current (923 due, 25.1%) |
| Weekly older issue cadence | 1841/1842 current (1 due, 99.9%) |
| Due now by cadence | 3060 |

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

Latest review: Apr 28, 2026, 14:31 UTC. Latest close: Apr 28, 2026, 14:24 UTC. Latest comment sync: Apr 28, 2026, 14:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 6 | 0 | 6 | 0 | 0 | 297 | 0 |
| Last hour | 1035 | 31 | 1004 | 0 | 31 | 675 | 1 |
| Last 24 hours | 3148 | 172 | 2976 | 1 | 479 | 989 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73576](https://github.com/openclaw/openclaw/pull/73576) | fix: clarify infer audio/image errors when no provider configured | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/73576.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73576.md) |
| [#57470](https://github.com/openclaw/openclaw/pull/57470) | fix(cron): honour payload.model override even when not in allowlist | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57470.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57470.md) |
| [#57139](https://github.com/openclaw/openclaw/issues/57139) | sessions_history should support reading archived/reset sessions | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/57139.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57139.md) |
| [#56698](https://github.com/openclaw/openclaw/issues/56698) | Bug: Hook bootstrap virtual files accumulate on every restart (no dedup) | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56698.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56698.md) |
| [#56671](https://github.com/openclaw/openclaw/pull/56671) | fix(config): deduplicate clobbered config snapshots in-process | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56671.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56671.md) |
| [#56601](https://github.com/openclaw/openclaw/issues/56601) | [Bug]: In Chat in Web Interface the Microsoft Edge voice does not use the voice in the openclaw.json config | closed externally after proposed_close | Apr 28, 2026, 14:42 UTC | [records/openclaw-openclaw/closed/56601.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56601.md) |
| [#56504](https://github.com/openclaw/openclaw/pull/56504) | fix: normalize tool IDs in repairToolUseResultPairing for cross-model sessions | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56504.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56504.md) |
| [#56469](https://github.com/openclaw/openclaw/issues/56469) | Support per-device typingIndicator configuration for Feishu channel | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56469.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56469.md) |
| [#56453](https://github.com/openclaw/openclaw/pull/56453) | fix(agent): respect configured default agent for --to sessions | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56453.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56453.md) |
| [#56299](https://github.com/openclaw/openclaw/issues/56299) | [Feature]: Control UI should auto-reconnect after gateway restart | closed externally after proposed_close | Apr 28, 2026, 14:41 UTC | [records/openclaw-openclaw/closed/56299.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56299.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73543](https://github.com/openclaw/openclaw/pull/73543) | fix(exec/approvals): match executable realpath against allowlist patterns (#45595) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73543.md) | complete | Apr 28, 2026, 14:31 UTC |
| [#73369](https://github.com/openclaw/openclaw/pull/73369) | fix(skills/discord): clarify message.send is sideband-only to prevent autoThread duplicate replies (#73278) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73369.md) | complete | Apr 28, 2026, 14:30 UTC |
| [#73536](https://github.com/openclaw/openclaw/pull/73536) | fix(agents/bundle-mcp): pass configured timeout to MCP callTool requests (#60967) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73536.md) | complete | Apr 28, 2026, 14:30 UTC |
| [#73602](https://github.com/openclaw/openclaw/issues/73602) | [Bug]: WhatsApp flaps and Telegram polling stalls on WSL2 in 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73602.md) | complete | Apr 28, 2026, 14:30 UTC |
| [#73495](https://github.com/openclaw/openclaw/pull/73495) | fix(telegram): document and warn when replyToMode silently disables tool-progress preview | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73495.md) | complete | Apr 28, 2026, 14:29 UTC |
| [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 14:29 UTC |
| [#73563](https://github.com/openclaw/openclaw/pull/73563) | fix(security): add session transcript redaction guards at bare appendMessage call sites | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73563.md) | complete | Apr 28, 2026, 14:29 UTC |
| [#56597](https://github.com/openclaw/openclaw/issues/56597) | [Bug]: Discord sessions persist per-session exec directives, causing allowlist mode to behave unexpectedly after config changes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/56597.md) | complete | Apr 28, 2026, 14:28 UTC |
| [#57470](https://github.com/openclaw/openclaw/pull/57470) | fix(cron): honour payload.model override even when not in allowlist | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/57470.md) | complete | Apr 28, 2026, 14:28 UTC |
| [#66961](https://github.com/openclaw/openclaw/issues/66961) | Bug: models.json generation should exclude unresolved custom providers; codex discovered models still rejected by session model allowlist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66961.md) | complete | Apr 28, 2026, 14:28 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 14:24 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1525,1543,1565,1569,1576,1586,1653,1705,1738,1741,1744,1785,1799,1808,1811,1812,1814,1816,1858,1863.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25058345601](https://github.com/openclaw/clawsweeper/actions/runs/25058345601)
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
| Hourly cadence coverage | 9/53 current (44 due, 17%) |
| Hourly hot item cadence (<7d) | 9/53 current (44 due, 17%) |
| Daily cadence coverage | 221/221 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/200 current (0 due, 100%) |
| Weekly older issue cadence | 631/632 current (1 due, 99.8%) |
| Due now by cadence | 52 |

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
