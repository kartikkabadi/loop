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

Last dashboard update: Apr 28, 2026, 16:31 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4428 |
| Open PRs | 3448 |
| Open items total | 7876 |
| Reviewed files | 7475 |
| Unreviewed open items | 401 |
| Due now by cadence | 2787 |
| Proposed closes awaiting apply | 5 |
| Closed by Codex apply | 10447 |
| Failed or stale reviews | 6 |
| Archived closed files | 13620 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6962 | 6568 | 394 | 2728 | 5 | 10444 | Apr 28, 2026, 16:16 UTC | Apr 28, 2026, 16:17 UTC | 857 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 59 | 0 | 3 | Apr 28, 2026, 16:12 UTC | Apr 28, 2026, 08:18 UTC | 21 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 16:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25063765572) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 16:12 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25063711208) |

### Fleet Activity

Latest review: Apr 28, 2026, 16:16 UTC. Latest close: Apr 28, 2026, 16:17 UTC. Latest comment sync: Apr 28, 2026, 16:31 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 1 | 386 | 0 |
| Last hour | 659 | 11 | 648 | 0 | 14 | 878 | 0 |
| Last 24 hours | 4557 | 225 | 4332 | 2 | 554 | 1393 | 15 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73661](https://github.com/openclaw/openclaw/issues/73661) | [Bug]:TUI cannot connect to gateway after version mismatch (device identity required) | already implemented on main | Apr 28, 2026, 16:17 UTC | [records/openclaw-openclaw/closed/73661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73661.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | closed externally after review | Apr 28, 2026, 16:00 UTC | [records/openclaw-openclaw/closed/73264.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73264.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59909.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59852](https://github.com/openclaw/openclaw/pull/59852) | fix(lsp): clear request timeout on successful response and session dispose | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59852.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59767](https://github.com/openclaw/openclaw/issues/59767) | [Bug]: Voice Wake trigger word matching fails on Mac mini (Mac16,10) macOS 26.2 | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59767.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59767.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59495](https://github.com/openclaw/openclaw/pull/59495) | fix: ensure CLI service operations respect --profile on macOS | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59495.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59495.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58842](https://github.com/openclaw/openclaw/issues/58842) | [Bug]: model hanging | already implemented on main | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/58842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58842.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48558](https://github.com/openclaw/openclaw/issues/48558) | Feature Request: Native support for Anthropic Memory Tool (memory_20250818) | belongs on ClawHub | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/48558.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48558.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | kept open | Apr 28, 2026, 15:54 UTC | [records/openclaw-openclaw/closed/73275.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73275.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57548](https://github.com/openclaw/openclaw/pull/57548) | fix(telegram): persist native command metadata to target sessions | kept open | Apr 28, 2026, 15:47 UTC | [records/openclaw-openclaw/closed/57548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57548.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 16:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42637](https://github.com/openclaw/openclaw/pull/42637) | fix(skills): list omitted skill names when prompt is truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42637.md) | complete | Apr 28, 2026, 16:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73405.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#34581](https://github.com/openclaw/openclaw/pull/34581) | fix(msteams): handle invalid JSON escape sequences in Bot Framework activities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34581.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73641](https://github.com/openclaw/openclaw/pull/73641) | fix(telegram): use agent's own default model for Telegram model list check mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73641.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73190](https://github.com/openclaw/openclaw/pull/73190) | Keep Codex same-session replies on the normal OpenClaw path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73190.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73602](https://github.com/openclaw/openclaw/issues/73602) | [Bug]: WhatsApp flaps and Telegram polling stalls on WSL2 in 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73602.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73382](https://github.com/openclaw/openclaw/pull/73382) | fix(amazon-bedrock): resolve 200K context window for Claude 3.x and unlisted Anthropic Bedrock variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73382.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72706.md) | complete | Apr 28, 2026, 16:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 16:25 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 16:31 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 384. Item numbers: 27061,37967,38248,40463,42798,42987,43231,43300,43750,45320,45643,45662,45782,45808,45832,45902,47090,47264,47776,47816,47984,48021,48100,48194,48270,48278,48285,48324,48325,48334,48336,48368,48375,48387,48391,48433,48442,48466,48520,48556,48585,48643,48681,48682,48690,48724,48742,48807,48834,48845,48867,48868,48902,48940,48942,48945,48946,48958,48960,48976,49028,49058,49063,49064,49069,49082,49085,49107,49112,49117,49120,49166,49194,49216,49221,49286,49310,49315,49349,49361,49401,49409,49423,49430,49434,49502,49511,49550,49569,49574,49579,49704,49750,49769,49793,49796,49800,49840,49841,49869,49870,49875,49936,49945,49958,49967,49968,49980,49981,49987,50046,50051,50054,50076,50116,50136,50141,50147,50152,50160,50164,50172,50177,50193,50200,50210,50217,50221,50244,50249,50250,50267,50269,50278,50300,50320,50357,50359,50361,50381,50392,50399,50425,50454,50463,50479,50515,50516,50520,50584,50631,50643,50662,50675,50682,50692,50696,50720,50745,50751,50755,50757,50760,50777,50837,50875,50881,50883,50895,50933,50936,50943,50955,50960,50965,50978,50979,50981,50992,51001,51024,51077,51079,51121,51124,51125,51128,51156,51163,51179,51180,51196,51257,51282,51286,51288,51303,51311,51318,51319,51327,51347,51375,51388,51389,51413,51448,51462,51472,51513,51515,51528,51546,51553,51563,51565,51584,51603,51623,51653,51668,51672,51675,51695,51708,51737,51775,51777,51802,51803,51822,51823,51849,51860,51868,51926,51930,51940,51970,52012,52025,52027,52036,52052,52059,52109,52120,52121,52125,52154,52200,52234,52252,52275,54164,55253,55354,55358,55365,55372,55381,55401,55420,55459,55462,55484,55501,55520,55532,55563,55592,55600,55619,55640,55678,55691,55718,55723,55743,55766,55770,55771,55789,55790,55792,55806,55807,55831,55840,55850,55851,55858,55870,55880,55882,55884,55888,55893,55896,55901,55913,55914,55915,55917,55927,55928,55935,55940,55944,55966,55970,55973,55982,56023,56031,56034,56036,56072,56078,56081,56083,56092,56096,56102,56106,56110,56118,56130,56131,56132,56145,56152,56157,56167,56228,56442,56594,56621,56692,56813,56862,56897,56994,56997,57019,57031,57086,57119,57123,57126,57143,57192,57199,57202,57204,57210,57236,57239,57241,57256,57259,57260,57270,57271,57276,57278,57281,57284,57296,57297,57300,57307,57309,57313,57335,57349,57360,57364,57369,57376,57387,57389,57404,57408,57415,57416,57427,57442,57443,57447,57461,57480,57483,57496,57541,57553,57555,57557,57562,57565,57567,57570,57572,57588,57592,57597,57600,57602,57607,57608,57609,57612,57621,57630,57638,57639,57651,57658,57661,57697,57700,57705,57708,57715,57717,57745,57752,57754,57756,57775,57790,57824,57825,57831,57835,57843,57846,57849,57858,57889,57901,57927,57933,57959,57967,57975,57978,57987,57992,57996,58021,58026,58028,58034,58051,59075,60127,67363,67805,69297,72015,72792,72866,73182,73230,73247,73248,73249,73251,73338,73363,73369,73378,73421,73440,73456,73462,73492,73495,73499,73510,73511,73536,73538,73542,73543,73572,73577,73578,73579,73581,73587,73601,73603,73607,73608,73609,73610,73614,73615.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25063765572](https://github.com/openclaw/clawsweeper/actions/runs/25063765572)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3552 |
| Open PRs | 3410 |
| Open items total | 6962 |
| Reviewed files | 6568 |
| Unreviewed open items | 394 |
| Archived closed files | 13610 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3376 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3190 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6563 |
| Proposed closes awaiting apply | 5 (0.1% of fresh reviews) |
| Closed by Codex apply | 10444 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 89/766 current (677 due, 11.6%) |
| Hourly hot item cadence (<7d) | 89/766 current (677 due, 11.6%) |
| Daily cadence coverage | 2307/3963 current (1656 due, 58.2%) |
| Daily PR cadence | 1845/2745 current (900 due, 67.2%) |
| Daily new issue cadence (<30d) | 462/1218 current (756 due, 37.9%) |
| Weekly older issue cadence | 1838/1839 current (1 due, 99.9%) |
| Due now by cadence | 2728 |

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

Latest review: Apr 28, 2026, 16:16 UTC. Latest close: Apr 28, 2026, 16:17 UTC. Latest comment sync: Apr 28, 2026, 16:31 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 1 | 386 | 0 |
| Last hour | 638 | 11 | 627 | 0 | 14 | 857 | 0 |
| Last 24 hours | 3640 | 222 | 3418 | 1 | 544 | 1111 | 15 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73661](https://github.com/openclaw/openclaw/issues/73661) | [Bug]:TUI cannot connect to gateway after version mismatch (device identity required) | already implemented on main | Apr 28, 2026, 16:17 UTC | [records/openclaw-openclaw/closed/73661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73661.md) |
| [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | closed externally after review | Apr 28, 2026, 16:00 UTC | [records/openclaw-openclaw/closed/73264.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73264.md) |
| [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59909.md) |
| [#59852](https://github.com/openclaw/openclaw/pull/59852) | fix(lsp): clear request timeout on successful response and session dispose | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59852.md) |
| [#59767](https://github.com/openclaw/openclaw/issues/59767) | [Bug]: Voice Wake trigger word matching fails on Mac mini (Mac16,10) macOS 26.2 | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59767.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59767.md) |
| [#59495](https://github.com/openclaw/openclaw/pull/59495) | fix: ensure CLI service operations respect --profile on macOS | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59495.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59495.md) |
| [#58842](https://github.com/openclaw/openclaw/issues/58842) | [Bug]: model hanging | already implemented on main | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/58842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58842.md) |
| [#48558](https://github.com/openclaw/openclaw/issues/48558) | Feature Request: Native support for Anthropic Memory Tool (memory_20250818) | belongs on ClawHub | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/48558.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48558.md) |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | kept open | Apr 28, 2026, 15:54 UTC | [records/openclaw-openclaw/closed/73275.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73275.md) |
| [#57548](https://github.com/openclaw/openclaw/pull/57548) | fix(telegram): persist native command metadata to target sessions | kept open | Apr 28, 2026, 15:47 UTC | [records/openclaw-openclaw/closed/57548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57548.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 16:28 UTC |
| [#42637](https://github.com/openclaw/openclaw/pull/42637) | fix(skills): list omitted skill names when prompt is truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42637.md) | complete | Apr 28, 2026, 16:28 UTC |
| [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73405.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#34581](https://github.com/openclaw/openclaw/pull/34581) | fix(msteams): handle invalid JSON escape sequences in Bot Framework activities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34581.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#73641](https://github.com/openclaw/openclaw/pull/73641) | fix(telegram): use agent's own default model for Telegram model list check mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73641.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#73190](https://github.com/openclaw/openclaw/pull/73190) | Keep Codex same-session replies on the normal OpenClaw path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73190.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#73602](https://github.com/openclaw/openclaw/issues/73602) | [Bug]: WhatsApp flaps and Telegram polling stalls on WSL2 in 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73602.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#73382](https://github.com/openclaw/openclaw/pull/73382) | fix(amazon-bedrock): resolve 200K context window for Claude 3.x and unlisted Anthropic Bedrock variants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73382.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72706.md) | complete | Apr 28, 2026, 16:25 UTC |
| [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 16:25 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 16:22 UTC

State: Review publish complete

Merged review artifacts for run 25064003364. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25064003364](https://github.com/openclaw/clawsweeper/actions/runs/25064003364)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 38 |
| Open items total | 914 |
| Reviewed files | 907 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

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
| Failed or stale reviews | 1 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 1/52 current (51 due, 1.9%) |
| Hourly hot item cadence (<7d) | 1/52 current (51 due, 1.9%) |
| Daily cadence coverage | 222/223 current (1 due, 99.6%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 201/202 current (1 due, 99.5%) |
| Weekly older issue cadence | 632/632 current (0 due, 100%) |
| Due now by cadence | 59 |

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

Latest review: Apr 28, 2026, 16:21 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 16:12 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 21 | 0 | 21 | 0 | 0 | 21 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 10 | 282 | 0 |

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
| [#1624](https://github.com/openclaw/clawhub/issues/1624) | Skill `power-oracle` flagged as suspicious - incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1624.md) | complete | Apr 28, 2026, 16:21 UTC |
| [#1164](https://github.com/openclaw/clawhub/issues/1164) | Help me remove the mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1164.md) | complete | Apr 28, 2026, 16:20 UTC |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/993.md) | failed | Apr 28, 2026, 16:19 UTC |
| [#1738](https://github.com/openclaw/clawhub/issues/1738) | False Positive: SkillWiki skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1738.md) | complete | Apr 28, 2026, 16:14 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 16:14 UTC |
| [#1521](https://github.com/openclaw/clawhub/issues/1521) | Embedding failed 500 error blocks skill publication + request to remove flagged versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1521.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1668](https://github.com/openclaw/clawhub/issues/1668) | Plugin scan stuck on 'pending' for 7 days + skill/plugin name collision blocks new release | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1668.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1371](https://github.com/openclaw/clawhub/issues/1371) | Request: delete unraidclaw skill listing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1371.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1471](https://github.com/openclaw/clawhub/issues/1471) | Request to delete skill listings: clawcost-basic and clawcost-pro (@jairog813) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1471.md) | complete | Apr 28, 2026, 16:13 UTC |
| [#1735](https://github.com/openclaw/clawhub/issues/1735) | Peeps shows up as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1735.md) | complete | Apr 28, 2026, 16:13 UTC |

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
