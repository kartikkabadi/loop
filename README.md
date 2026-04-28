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

Last dashboard update: Apr 28, 2026, 13:02 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4424 |
| Open PRs | 3463 |
| Open items total | 7887 |
| Reviewed files | 7452 |
| Unreviewed open items | 435 |
| Due now by cadence | 3467 |
| Proposed closes awaiting apply | 4 |
| Closed by Codex apply | 10349 |
| Failed or stale reviews | 5 |
| Archived closed files | 13511 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6975 | 6547 | 428 | 3456 | 4 | 10346 | Apr 28, 2026, 12:46 UTC | Apr 28, 2026, 12:45 UTC | 451 |
| [ClawHub](https://github.com/openclaw/clawhub) | 912 | 905 | 7 | 11 | 0 | 3 | Apr 28, 2026, 12:44 UTC | Apr 28, 2026, 08:18 UTC | 272 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 13:02 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25051791093) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 12:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25051577108) |

### Fleet Activity

Latest review: Apr 28, 2026, 12:46 UTC. Latest close: Apr 28, 2026, 12:45 UTC. Latest comment sync: Apr 28, 2026, 13:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 315 | 0 |
| Last hour | 961 | 8 | 953 | 1 | 16 | 723 | 1 |
| Last 24 hours | 3500 | 133 | 3367 | 2 | 447 | 1226 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | kept open | Apr 28, 2026, 12:45 UTC | [records/openclaw-openclaw/closed/72917.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72917.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73555](https://github.com/openclaw/openclaw/issues/73555) | [Bug]: sidecars.channels blocks Node's event loop (5min+ stall on startup and prompt processing) | already implemented on main | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73555.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73553](https://github.com/openclaw/openclaw/issues/73553) | Hardcoded `/api` prefix in Signal `httpUrl` causes 404 with signal-cli-rest-api | duplicate or superseded | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73553.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73553.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73539](https://github.com/openclaw/openclaw/pull/73539) | fix(yuanbao) update docs | closed externally after review | Apr 28, 2026, 12:20 UTC | [records/openclaw-openclaw/closed/73539.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73539.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73497](https://github.com/openclaw/openclaw/pull/73497) | fix(plugins): regenerate bundled wrappers with correct specifier in staged runtime root | already implemented on main | Apr 28, 2026, 12:10 UTC | [records/openclaw-openclaw/closed/73497.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73497.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73513](https://github.com/openclaw/openclaw/pull/73513) | fix: decode web fetch legacy charsets | closed externally after review | Apr 28, 2026, 12:09 UTC | [records/openclaw-openclaw/closed/73513.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73513.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73547](https://github.com/openclaw/openclaw/pull/73547) | feat: add auto-recall plugin — automatic memory retrieval for prompt enrichment | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73547.md) | complete | Apr 28, 2026, 12:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48360](https://github.com/openclaw/openclaw/issues/48360) | gateway probe false-negative timeout/close on loopback while gateway is healthy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48360.md) | complete | Apr 28, 2026, 12:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73489](https://github.com/openclaw/openclaw/pull/73489) | fix(signal): harden signal-cli archive download with SSRF guard, timeout, and size cap (#54153) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73489.md) | complete | Apr 28, 2026, 12:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73421](https://github.com/openclaw/openclaw/issues/73421) | [Bug]: Regression after upgrading from 2026.4.23 to 2026.4.26: delayed reply delivery and websocket/control-ui/browser stalls in NAS Docker environment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73421.md) | complete | Apr 28, 2026, 12:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71582.md) | complete | Apr 28, 2026, 12:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73559](https://github.com/openclaw/openclaw/issues/73559) | GPT-5.5 OAuth requests fail with 401 Missing bearer auth header | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73559.md) | complete | Apr 28, 2026, 12:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73434](https://github.com/openclaw/openclaw/pull/73434) | fix: three-layer defense against session stuck from lost tool results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73434.md) | complete | Apr 28, 2026, 12:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73165](https://github.com/openclaw/openclaw/pull/73165) | Add MCP readiness gate for advertised skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73165.md) | complete | Apr 28, 2026, 12:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#43202](https://github.com/openclaw/openclaw/issues/43202) | Feishu card action: pass through form_value, input_value and other fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/43202.md) | complete | Apr 28, 2026, 12:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53677](https://github.com/openclaw/openclaw/pull/53677) | perf(memory): stream line-window reads for memory files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53677.md) | complete | Apr 28, 2026, 12:44 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 13:02 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 313. Item numbers: 6457,7057,12678,14593,17098,18160,18860,19328,19330,24754,25295,25789,27771,29387,31407,32558,33845,33975,36630,38161,38162,38789,38808,38876,39245,39350,39555,39558,39604,39683,39692,39703,39715,39726,39772,39891,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40463,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41058,41082,41088,41111,41120,41135,41168,41195,41199,41259,41265,41272,41283,41299,41304,41306,41346,41355,41366,41410,41418,41444,41461,41474,41483,41494,41495,41501,41517,41546,41548,41555,41561,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41665,41670,41671,41676,41685,41718,41722,41740,41744,41745,41750,41755,41779,41795,41799,41803,41826,41833,41837,41853,41854,41858,41866,41879,41882,41892,41897,41899,41933,41940,41943,41949,41954,41955,41965,41966,41983,41986,41993,42001,42007,42009,42011,42014,42039,42052,42059,42065,42079,42106,42131,42156,42157,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42291,42301,42303,42304,42317,42322,42327,42330,42351,42354,42361,42381,42391,42402,42408,42424,42425,42452,42461,42475,42476,42482,42510,42539,42541,42542,42571,42585,42592,42606,42617,42631,42636,42637,42646,42647,42650,42651,42663,42674,42675,42677,42683,42690,42707,42713,42715,42729,42771,42802,42809,42810,42820,42837,42843,42847,42858,42859,42862,42873,42898,42904,42908,42936,42952,42962,42998,42999,43005,43006,43009,43015,43020,43028,43061,43064,43068,43097,43145,43151,43165,43195,43202,43211,43216,43253,43260,43276,43292,43454,43456,43469,43832,43950,45315,45320,45342,45344,45374,45383,45393,45417,45421,45449,45454,45465,45523,45535,45592,45594,45602,45612,45613,45626,45662,45664,45673,45677,45683,45684,45704,45712,45739,45760,45782,45783,45784,45808,45831,45832,45870,45871,45876,45887,45899,45901,45912,45921,45937,45979,45990,46055,46131,46168,46221,46258,46268,46291,46300,46356,46362,46371,46373,46377,46380,46405,46455,46485,46502,46506,46520,46537,46559,46589,46607,46626,46653,46660,46693,46697,46720,46740,46752,46753,46782,46805,46834,46858,46881,46895,46904,46926,46940,46947,46949,46956,46985,47007,47029,47069,47083,47087,47162,47181,47187,47216,47225,47234,47243,47245,47255,47277,47285,47291,47302,47318,47327,47365,47377,47384,47387,47393,47398,47399,47407,47446,47479,47486,47491,48138,48360,48671,48887,49396,49983,50522,50694,51762,52192,52207,52236,52276,52521,52627,52636,52655,52727,52762,52832,52948,53030,53108,53209,53243,53281,53288,53316,53326,53329,53441,53445,53473,53496,53520,53528,53561,53650,53660,53663,53665,53670,53677,53822,53866,54810,55761,58808,58826,60027,60858,63259,64157,64400,64749,64773,64934,65886,67174,67509,67841,68079,69038,69310,69312,71156,72314,72338,73159,73165,73200,73243,73312,73338,73363,73376,73387,73391,73421,73434,73466,73474,73478,73480,73483,73495,73496,73500,73501,73502,73504,73505,73506,73508,73510,73511,73512.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25051791093](https://github.com/openclaw/clawsweeper/actions/runs/25051791093)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3549 |
| Open PRs | 3426 |
| Open items total | 6975 |
| Reviewed files | 6548 |
| Unreviewed open items | 427 |
| Archived closed files | 13505 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3366 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3180 |
| Proposed PR closes | 4 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6543 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10346 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 47/680 current (633 due, 6.9%) |
| Hourly hot item cadence (<7d) | 47/680 current (633 due, 6.9%) |
| Daily cadence coverage | 1629/4023 current (2394 due, 40.5%) |
| Daily PR cadence | 1336/2789 current (1453 due, 47.9%) |
| Daily new issue cadence (<30d) | 293/1234 current (941 due, 23.7%) |
| Weekly older issue cadence | 1843/1844 current (1 due, 99.9%) |
| Due now by cadence | 3456 |

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

Latest review: Apr 28, 2026, 12:46 UTC. Latest close: Apr 28, 2026, 12:45 UTC. Latest comment sync: Apr 28, 2026, 13:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 315 | 0 |
| Last hour | 521 | 8 | 513 | 0 | 16 | 451 | 1 |
| Last 24 hours | 2585 | 130 | 2455 | 1 | 437 | 866 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72917](https://github.com/openclaw/openclaw/pull/72917) | fix(agents): canonicalize provider aliases in byProvider tool policy lookup [AI] | kept open | Apr 28, 2026, 12:45 UTC | [records/openclaw-openclaw/closed/72917.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72917.md) |
| [#73555](https://github.com/openclaw/openclaw/issues/73555) | [Bug]: sidecars.channels blocks Node's event loop (5min+ stall on startup and prompt processing) | already implemented on main | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73555.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73555.md) |
| [#73553](https://github.com/openclaw/openclaw/issues/73553) | Hardcoded `/api` prefix in Signal `httpUrl` causes 404 with signal-cli-rest-api | duplicate or superseded | Apr 28, 2026, 12:41 UTC | [records/openclaw-openclaw/closed/73553.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73553.md) |
| [#73539](https://github.com/openclaw/openclaw/pull/73539) | fix(yuanbao) update docs | closed externally after review | Apr 28, 2026, 12:20 UTC | [records/openclaw-openclaw/closed/73539.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73539.md) |
| [#73497](https://github.com/openclaw/openclaw/pull/73497) | fix(plugins): regenerate bundled wrappers with correct specifier in staged runtime root | already implemented on main | Apr 28, 2026, 12:10 UTC | [records/openclaw-openclaw/closed/73497.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73497.md) |
| [#73513](https://github.com/openclaw/openclaw/pull/73513) | fix: decode web fetch legacy charsets | closed externally after review | Apr 28, 2026, 12:09 UTC | [records/openclaw-openclaw/closed/73513.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73513.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73547](https://github.com/openclaw/openclaw/pull/73547) | feat: add auto-recall plugin — automatic memory retrieval for prompt enrichment | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73547.md) | complete | Apr 28, 2026, 12:46 UTC |
| [#48360](https://github.com/openclaw/openclaw/issues/48360) | gateway probe false-negative timeout/close on loopback while gateway is healthy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48360.md) | complete | Apr 28, 2026, 12:46 UTC |
| [#73489](https://github.com/openclaw/openclaw/pull/73489) | fix(signal): harden signal-cli archive download with SSRF guard, timeout, and size cap (#54153) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73489.md) | complete | Apr 28, 2026, 12:46 UTC |
| [#73421](https://github.com/openclaw/openclaw/issues/73421) | [Bug]: Regression after upgrading from 2026.4.23 to 2026.4.26: delayed reply delivery and websocket/control-ui/browser stalls in NAS Docker environment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73421.md) | complete | Apr 28, 2026, 12:45 UTC |
| [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71582.md) | complete | Apr 28, 2026, 12:45 UTC |
| [#73559](https://github.com/openclaw/openclaw/issues/73559) | GPT-5.5 OAuth requests fail with 401 Missing bearer auth header | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73559.md) | complete | Apr 28, 2026, 12:45 UTC |
| [#73434](https://github.com/openclaw/openclaw/pull/73434) | fix: three-layer defense against session stuck from lost tool results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73434.md) | complete | Apr 28, 2026, 12:45 UTC |
| [#73165](https://github.com/openclaw/openclaw/pull/73165) | Add MCP readiness gate for advertised skills | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73165.md) | complete | Apr 28, 2026, 12:45 UTC |
| [#43202](https://github.com/openclaw/openclaw/issues/43202) | Feishu card action: pass through form_value, input_value and other fields | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/43202.md) | complete | Apr 28, 2026, 12:44 UTC |
| [#53677](https://github.com/openclaw/openclaw/pull/53677) | perf(memory): stream line-window reads for memory files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53677.md) | complete | Apr 28, 2026, 12:44 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 12:59 UTC

State: Review in progress

Planned 313 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25054190216](https://github.com/openclaw/clawsweeper/actions/runs/25054190216)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 37 |
| Open items total | 912 |
| Reviewed files | 905 |
| Unreviewed open items | 7 |
| Archived closed files | 10 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 874 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 31 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 905 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 49/52 current (3 due, 94.2%) |
| Hourly hot item cadence (<7d) | 49/52 current (3 due, 94.2%) |
| Daily cadence coverage | 226/226 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 205/205 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 11 |

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

Latest review: Apr 28, 2026, 12:56 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 12:58 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 440 | 0 | 440 | 1 | 0 | 272 | 0 |
| Last 24 hours | 915 | 3 | 912 | 1 | 10 | 360 | 0 |

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
| [#756](https://github.com/openclaw/clawhub/issues/756) | False positive: ppio-sandbox and novita-sandbox flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/756.md) | complete | Apr 28, 2026, 12:56 UTC |
| [#1558](https://github.com/openclaw/clawhub/issues/1558) | False positive: TrencherAI skill flagged for undeclared credentials | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1558.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1755](https://github.com/openclaw/clawhub/issues/1755) | AgentID flagged wrongly | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1755.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1726](https://github.com/openclaw/clawhub/issues/1726) | False positive: jackedin skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1726.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1541](https://github.com/openclaw/clawhub/issues/1541) | False positive suspicious flag on emotion-shared-experience skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1541.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1553](https://github.com/openclaw/clawhub/issues/1553) | Re-scan jarviyin/clawpk v5.0.0 — remove suspicious flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1553.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1706](https://github.com/openclaw/clawhub/issues/1706) | Skill flagged as suspicious - GroupMe (groupme@1.0.1) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1706.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1694](https://github.com/openclaw/clawhub/issues/1694) | Skill flagged as suspicious - `pencil-design` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1694.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1674](https://github.com/openclaw/clawhub/issues/1674) | Account blocked after ClawHavoc sweep — 40+ legitimate skills deleted, unable to sign in | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1674.md) | complete | Apr 28, 2026, 12:55 UTC |
| [#1710](https://github.com/openclaw/clawhub/issues/1710) | False Positive: relic-soul-chip incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1710.md) | complete | Apr 28, 2026, 12:55 UTC |

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
