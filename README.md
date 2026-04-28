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

Last dashboard update: Apr 28, 2026, 17:07 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4426 |
| Open PRs | 3447 |
| Open items total | 7873 |
| Reviewed files | 7491 |
| Unreviewed open items | 382 |
| Due now by cadence | 2632 |
| Proposed closes awaiting apply | 11 |
| Closed by Codex apply | 10461 |
| Failed or stale reviews | 7 |
| Archived closed files | 13637 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6959 | 6584 | 375 | 2606 | 11 | 10458 | Apr 28, 2026, 16:54 UTC | Apr 28, 2026, 16:53 UTC | 830 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 26 | 0 | 3 | Apr 28, 2026, 16:48 UTC | Apr 28, 2026, 08:18 UTC | 294 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 17:07 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25063794892) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 16:50 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25065834871) |

### Fleet Activity

Latest review: Apr 28, 2026, 16:54 UTC. Latest close: Apr 28, 2026, 16:53 UTC. Latest comment sync: Apr 28, 2026, 17:07 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 369 | 0 |
| Last hour | 1282 | 26 | 1256 | 3 | 16 | 1124 | 1 |
| Last 24 hours | 4702 | 245 | 4457 | 4 | 569 | 1438 | 16 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73688](https://github.com/openclaw/openclaw/issues/73688) | [Bug] /new session creation fails with ZAI/GLM: provider rejects system-only messages (400) | already implemented on main | Apr 28, 2026, 16:53 UTC | [records/openclaw-openclaw/closed/73688.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73688.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73687](https://github.com/openclaw/openclaw/issues/73687) | [Bug]: Default fallback chain includes models that fail the minimum context-window check, making them effectively unusable | already implemented on main | Apr 28, 2026, 16:51 UTC | [records/openclaw-openclaw/closed/73687.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73687.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73405.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73405.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/72706.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72706.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73684](https://github.com/openclaw/openclaw/issues/73684) | [Bug]: Session-file lock cascade — single stale .lock blocks every subsequent agent invocation in container | already closed before apply | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73684.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73684.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66912](https://github.com/openclaw/openclaw/pull/66912) | fix(telegram): restore self-authored reply-media guard | closed externally after review | Apr 28, 2026, 16:45 UTC | [records/openclaw-openclaw/closed/66912.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66912.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70153](https://github.com/openclaw/openclaw/pull/70153) | fix(auto-reply): persist CLI turn transcript after successful reply | closed externally after review | Apr 28, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/70153.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70153.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73672](https://github.com/openclaw/openclaw/pull/73672) | Fix native slash command replies in groups | kept open | Apr 28, 2026, 16:37 UTC | [records/openclaw-openclaw/closed/73672.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73672.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73670](https://github.com/openclaw/openclaw/issues/73670) | [Bug]: Mac App overwrites user config fields on save, removing existing entries | already implemented on main | Apr 28, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/73670.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73670.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73689](https://github.com/openclaw/openclaw/pull/73689) | fix(bedrock): strip inferenceConfig.temperature for Opus 4.7 (#73663) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73689.md) | complete | Apr 28, 2026, 16:54 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | complete | Apr 28, 2026, 16:53 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73674](https://github.com/openclaw/openclaw/pull/73674) | fix(memory): resolve QMD Windows cmd shims | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73674.md) | complete | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60683](https://github.com/openclaw/openclaw/pull/60683) | feat(memory): expose local llama embedding settings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60683.md) | failed | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72297](https://github.com/openclaw/openclaw/pull/72297) | fix(memory): rebind qmd path conflicts from add errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72297.md) | complete | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72294](https://github.com/openclaw/openclaw/pull/72294) | fix(feishu): suppress late streaming card finals | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72294.md) | complete | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73685](https://github.com/openclaw/openclaw/issues/73685) | [Bug]: @openclaw/discord@2026.3.13 fails on openclaw@2026.4.26: missing plugin-sdk/discord export | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73685.md) | complete | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73627](https://github.com/openclaw/openclaw/pull/73627) | fix(sandbox): explicitly pass sandboxSessionKey to prevent Docker probes when mode is off (#73586) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73627.md) | complete | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 28, 2026, 16:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59484](https://github.com/openclaw/openclaw/pull/59484) | Avoid config fallback for channels status probe failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59484.md) | complete | Apr 28, 2026, 16:49 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 17:07 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 365. Item numbers: 6457,7057,12678,14593,15591,17098,17311,17684,18160,18860,18915,19328,19330,19362,19482,20802,23096,24754,25222,25295,25789,27771,29387,30142,30529,31407,32558,33845,33975,34542,36630,38161,38162,38327,38502,38789,38808,38876,39102,39115,39137,39245,39350,39555,39558,39604,39683,39692,39703,39715,39726,39772,39891,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41058,41082,41088,41111,41120,41135,41168,41195,41199,41259,41265,41272,41283,41296,41299,41304,41306,41346,41355,41366,41372,41410,41418,41444,41461,41474,41483,41494,41495,41501,41517,41546,41548,41555,41561,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41665,41670,41671,41676,41685,41718,41722,41740,41744,41745,41750,41755,41779,41795,41799,41803,41826,41833,41837,41853,41854,41858,41866,41879,41882,41892,41897,41899,41933,41940,41943,41949,41954,41955,41965,41966,41983,41986,41991,41993,42001,42007,42009,42011,42014,42027,42039,42052,42059,42065,42079,42099,42106,42122,42131,42156,42157,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42291,42301,42303,42304,42317,42322,42327,42330,42351,42354,42361,42373,42381,42391,42402,42408,42424,42425,42452,42461,42475,42476,42482,42510,42533,42539,42541,42542,42571,42585,42592,42606,42611,42617,42631,42636,42646,42647,42650,42651,42663,42674,42675,42677,42683,42690,42707,42715,42729,42771,42802,42809,42810,42820,42832,42837,42841,42843,42847,42853,42858,42862,42873,42877,42898,42904,42908,42933,42936,42937,42952,42961,42962,42986,42998,42999,43005,43006,43009,43015,43020,43028,43061,43064,43068,43097,43117,43145,43151,43165,43170,43176,43190,43195,43202,43204,43211,43216,43217,43244,43249,43253,43254,43260,43276,43292,43306,43340,43348,43367,43454,43456,43500,43658,43659,43832,43837,43950,44144,44166,44288,44423,44614,45315,45342,45344,45374,45383,45393,45421,45449,45454,45465,45523,45535,45592,45594,45602,45613,45626,45664,45673,45677,45683,45684,45704,45712,45760,45784,45831,47877,47892,47922,48014,48034,48112,48115,48150,48235,48283,48293,48305,48312,48335,48350,48355,48373,48377,48425,48472,48509,48537,51594,52075,52264,55874,58702,58730,58776,58777,58832,58932,59149,59212,59225,59281,59284,59360,59427,59484,59517,59526,59545,59560,59576,59597,59618,59650,59696,59709,59717,59727,59728,59730,59735,59737,59747,59750,59788,59797,59806,59821,59839,59868,59872,59878,59884,59888,59897,59902,59904,59957,59964,59970,60008,60022,60071,60086,60137,60147,60183,60184,60206,60237,60290,60304,60335,60383,60402,60500,60507,60515,60520,60534,60536,60545,60551,60630,60643,60661,60664,60670,60683,60698,60723,60777,60808,60819,60839,60842,60849,60854,60928,60990,60996,61020,61087,61089,61100,61104,61120,61176,61269,61485,61590,62011,62110,66210,68725,69059,71924,72534,72807,72814,72815,72816,72818,72819,73101,73294,73384,73628,73630,73633.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25063794892](https://github.com/openclaw/clawsweeper/actions/runs/25063794892)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3550 |
| Open PRs | 3409 |
| Open items total | 6959 |
| Reviewed files | 6584 |
| Unreviewed open items | 375 |
| Archived closed files | 13627 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3381 |
| Proposed issue closes | 6 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3197 |
| Proposed PR closes | 5 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6578 |
| Proposed closes awaiting apply | 11 (0.2% of fresh reviews) |
| Closed by Codex apply | 10458 |
| Failed or stale reviews | 6 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 105/788 current (683 due, 13.3%) |
| Hourly hot item cadence (<7d) | 105/788 current (683 due, 13.3%) |
| Daily cadence coverage | 2409/3956 current (1547 due, 60.9%) |
| Daily PR cadence | 1906/2741 current (835 due, 69.5%) |
| Daily new issue cadence (<30d) | 503/1215 current (712 due, 41.4%) |
| Weekly older issue cadence | 1839/1840 current (1 due, 99.9%) |
| Due now by cadence | 2606 |

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

Latest review: Apr 28, 2026, 16:54 UTC. Latest close: Apr 28, 2026, 16:53 UTC. Latest comment sync: Apr 28, 2026, 17:07 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 369 | 0 |
| Last hour | 988 | 26 | 962 | 2 | 16 | 830 | 1 |
| Last 24 hours | 3785 | 242 | 3543 | 3 | 559 | 1135 | 16 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73688](https://github.com/openclaw/openclaw/issues/73688) | [Bug] /new session creation fails with ZAI/GLM: provider rejects system-only messages (400) | already implemented on main | Apr 28, 2026, 16:53 UTC | [records/openclaw-openclaw/closed/73688.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73688.md) |
| [#73687](https://github.com/openclaw/openclaw/issues/73687) | [Bug]: Default fallback chain includes models that fail the minimum context-window check, making them effectively unusable | already implemented on main | Apr 28, 2026, 16:51 UTC | [records/openclaw-openclaw/closed/73687.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73687.md) |
| [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73405.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73405.md) |
| [#72706](https://github.com/openclaw/openclaw/issues/72706) | Telegram: streaming.mode 'partial' causes intermediate message deletion (visible 'ghost message' UX bug) | already implemented on main | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/72706.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72706.md) |
| [#73684](https://github.com/openclaw/openclaw/issues/73684) | [Bug]: Session-file lock cascade — single stale .lock blocks every subsequent agent invocation in container | already closed before apply | Apr 28, 2026, 16:46 UTC | [records/openclaw-openclaw/closed/73684.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73684.md) |
| [#66912](https://github.com/openclaw/openclaw/pull/66912) | fix(telegram): restore self-authored reply-media guard | closed externally after review | Apr 28, 2026, 16:45 UTC | [records/openclaw-openclaw/closed/66912.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/66912.md) |
| [#70153](https://github.com/openclaw/openclaw/pull/70153) | fix(auto-reply): persist CLI turn transcript after successful reply | closed externally after review | Apr 28, 2026, 16:43 UTC | [records/openclaw-openclaw/closed/70153.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70153.md) |
| [#73672](https://github.com/openclaw/openclaw/pull/73672) | Fix native slash command replies in groups | kept open | Apr 28, 2026, 16:37 UTC | [records/openclaw-openclaw/closed/73672.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73672.md) |
| [#73670](https://github.com/openclaw/openclaw/issues/73670) | [Bug]: Mac App overwrites user config fields on save, removing existing entries | already implemented on main | Apr 28, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/73670.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73670.md) |
| [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73689](https://github.com/openclaw/openclaw/pull/73689) | fix(bedrock): strip inferenceConfig.temperature for Opus 4.7 (#73663) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73689.md) | complete | Apr 28, 2026, 16:54 UTC |
| [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | complete | Apr 28, 2026, 16:53 UTC |
| [#73674](https://github.com/openclaw/openclaw/pull/73674) | fix(memory): resolve QMD Windows cmd shims | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73674.md) | complete | Apr 28, 2026, 16:51 UTC |
| [#60683](https://github.com/openclaw/openclaw/pull/60683) | feat(memory): expose local llama embedding settings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60683.md) | failed | Apr 28, 2026, 16:51 UTC |
| [#72297](https://github.com/openclaw/openclaw/pull/72297) | fix(memory): rebind qmd path conflicts from add errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72297.md) | complete | Apr 28, 2026, 16:51 UTC |
| [#72294](https://github.com/openclaw/openclaw/pull/72294) | fix(feishu): suppress late streaming card finals | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72294.md) | complete | Apr 28, 2026, 16:51 UTC |
| [#73685](https://github.com/openclaw/openclaw/issues/73685) | [Bug]: @openclaw/discord@2026.3.13 fails on openclaw@2026.4.26: missing plugin-sdk/discord export | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73685.md) | complete | Apr 28, 2026, 16:51 UTC |
| [#73627](https://github.com/openclaw/openclaw/pull/73627) | fix(sandbox): explicitly pass sandboxSessionKey to prevent Docker probes when mode is off (#73586) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73627.md) | complete | Apr 28, 2026, 16:51 UTC |
| [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 28, 2026, 16:51 UTC |
| [#59484](https://github.com/openclaw/openclaw/pull/59484) | Avoid config fallback for channels status probe failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59484.md) | complete | Apr 28, 2026, 16:49 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 17:06 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 18. Item numbers: 993,1771,1772,1781,1783,1787,1789,1797,1815,1818,1819,1823,1824,1828,1833,1849,1857,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25066600918](https://github.com/openclaw/clawsweeper/actions/runs/25066600918)
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
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 51/52 current (1 due, 98.1%) |
| Hourly hot item cadence (<7d) | 51/52 current (1 due, 98.1%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 632/632 current (0 due, 100%) |
| Due now by cadence | 8 |

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

Latest review: Apr 28, 2026, 17:04 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 17:06 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 294 | 0 | 294 | 1 | 0 | 294 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 10 | 303 | 0 |

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
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1818](https://github.com/openclaw/clawhub/issues/1818) | False positive: agenttrust-scanner flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1818.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1833](https://github.com/openclaw/clawhub/issues/1833) | False positive security flag on published skill: zhouyi-benjing-oracle | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1833.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1783](https://github.com/openclaw/clawhub/issues/1783) | False Positive Malware Detection for @nimsuite/openclaw-nim-channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1783.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1819](https://github.com/openclaw/clawhub/issues/1819) | ClawHub login stuck and my published skills disappeared / hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1819.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1828](https://github.com/openclaw/clawhub/issues/1828) | Operon-Guard | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1828.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1797](https://github.com/openclaw/clawhub/issues/1797) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1797.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | complete | Apr 28, 2026, 17:04 UTC |
| [#1815](https://github.com/openclaw/clawhub/issues/1815) | Appeal for Skill Flag Review(Why Flagged Patterns Are Not Suspicious) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1815.md) | complete | Apr 28, 2026, 17:03 UTC |

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
