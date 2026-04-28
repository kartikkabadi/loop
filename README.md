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

Last dashboard update: Apr 28, 2026, 11:11 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4409 |
| Open PRs | 3493 |
| Open items total | 7902 |
| Reviewed files | 7464 |
| Unreviewed open items | 438 |
| Due now by cadence | 3919 |
| Proposed closes awaiting apply | 5 |
| Closed by Codex apply | 10300 |
| Failed or stale reviews | 50 |
| Archived closed files | 13449 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6992 | 6561 | 431 | 3860 | 5 | 10297 | Apr 28, 2026, 10:58 UTC | Apr 28, 2026, 10:56 UTC | 453 |
| [ClawHub](https://github.com/openclaw/clawhub) | 910 | 903 | 7 | 59 | 0 | 3 | Apr 28, 2026, 10:45 UTC | Apr 28, 2026, 08:18 UTC | 423 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 11:11 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046595038) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 10:54 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25046784787) |

### Fleet Activity

Latest review: Apr 28, 2026, 10:58 UTC. Latest close: Apr 28, 2026, 10:56 UTC. Latest comment sync: Apr 28, 2026, 11:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 5 | 0 | 5 | 0 | 0 | 417 | 0 |
| Last hour | 625 | 10 | 615 | 0 | 25 | 876 | 2 |
| Last 24 hours | 2997 | 86 | 2911 | 9 | 386 | 1481 | 14 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73392](https://github.com/openclaw/openclaw/pull/73392) | fix(line): persist inbound media to ~/.openclaw/media/inbound/ via saveMediaBuffer | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73392.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73364](https://github.com/openclaw/openclaw/pull/73364) | fix: reduce mirror lock hold time on slow filesystems (fixes #73339) | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73364.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73498](https://github.com/openclaw/openclaw/pull/73498) | ci: shard config codeql quality | closed externally after review | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73498.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73498.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/68634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68634.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/65486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65486.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73494](https://github.com/openclaw/openclaw/issues/73494) | [Feature]: Real-time Stock Data Access for Trading Assistant | belongs on ClawHub | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73494.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | cannot reproduce on current main | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73490.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73482](https://github.com/openclaw/openclaw/issues/73482) | Active Memory embedded run times out despite configured fast recall model | duplicate or superseded | Apr 28, 2026, 10:49 UTC | [records/openclaw-openclaw/closed/73482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73482.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73479](https://github.com/openclaw/openclaw/pull/73479) | update | duplicate or superseded | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/73479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73479.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41108](https://github.com/openclaw/openclaw/pull/41108) | fix(msteams): detect implicit mentions in thread replies via conversation.id | closed externally after review | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/41108.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41108.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73449](https://github.com/openclaw/openclaw/pull/73449) | fix(codex): bridge app-server tool stream events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73449.md) | complete | Apr 28, 2026, 10:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73476](https://github.com/openclaw/openclaw/pull/73476) | Feat/tool direct reply：feat(agents): add directReply flag to tool results for bypassing LLM inference | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73476.md) | complete | Apr 28, 2026, 10:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73500](https://github.com/openclaw/openclaw/pull/73500) | fix(gateway,agent): only enforce session sendPolicy=deny when delivering | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73500.md) | complete | Apr 28, 2026, 10:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73499](https://github.com/openclaw/openclaw/pull/73499) | [codex] Add mid-turn compaction precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73499.md) | complete | Apr 28, 2026, 10:57 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73342](https://github.com/openclaw/openclaw/pull/73342) | refactor(memory-host): replace core runtime bridge with services | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73342.md) | complete | Apr 28, 2026, 10:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73421](https://github.com/openclaw/openclaw/issues/73421) | [Bug]: Regression after upgrading from 2026.4.23 to 2026.4.26: delayed reply delivery and websocket/control-ui/browser stalls in NAS Docker environment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73421.md) | complete | Apr 28, 2026, 10:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72387](https://github.com/openclaw/openclaw/pull/72387) | docs(contextPruning): document softTrimRatio and hardClearRatio valid range (0.0–1.0) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72387.md) | complete | Apr 28, 2026, 10:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71731](https://github.com/openclaw/openclaw/pull/71731) | [plugin sdk] docs: plugin host hook RFC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71731.md) | complete | Apr 28, 2026, 10:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72510](https://github.com/openclaw/openclaw/pull/72510) | fix(group-chat): wire multi-agent bot-targeting signals end-to-end (#56692) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72510.md) | complete | Apr 28, 2026, 10:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72797](https://github.com/openclaw/openclaw/pull/72797) | feat(plugin-sdk): add resolve_exec_env hook for channel-specific env injection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72797.md) | complete | Apr 28, 2026, 10:56 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 11:11 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 412. Item numbers: 6457,7057,12678,14593,17098,18160,18860,19328,19330,24754,25295,25789,27771,29387,31407,32558,33845,33975,36630,38161,38162,38789,38808,38876,39245,39350,39555,39558,39604,39683,39692,39703,39715,39726,39772,39891,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40463,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41082,41088,41108,41111,41120,41135,41168,41195,41199,41259,41265,41272,41283,41299,41304,41306,41346,41355,41366,41410,41418,41444,41461,41473,41474,41483,41494,41495,41501,41517,41546,41548,41555,41561,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41665,41670,41671,41676,41685,41718,41722,41740,41744,41745,41750,41755,41779,41795,41799,41803,41826,41833,41837,41853,41854,41858,41866,41879,41882,41892,41897,41899,41933,41940,41943,41949,41954,41955,41965,41966,41983,41986,41993,42001,42007,42009,42011,42014,42039,42052,42059,42065,42079,42106,42131,42156,42157,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42291,42301,42303,42304,42317,42322,42327,42330,42351,42354,42361,42381,42391,42400,42402,42408,42424,42425,42452,42461,42475,42476,42482,42510,42539,42541,42542,42571,42585,42592,42606,42617,42631,42636,42637,42646,42647,42650,42651,42663,42674,42675,42677,42683,42690,42707,42713,42715,42729,42771,42802,42809,42810,42820,42837,42843,42847,42858,42859,42862,42873,42898,42904,42908,42936,42952,42962,42998,42999,43005,43006,43009,43015,43020,43028,43061,43064,43068,43097,43145,43151,43165,43195,43202,43211,43216,43253,43260,43276,43292,43454,43456,43469,43832,43950,45315,45320,45342,45344,45374,45383,45393,45417,45421,45449,45454,45465,45523,45535,45592,45594,45602,45612,45613,45626,45662,45664,45673,45677,45683,45684,45704,45712,45739,45760,45782,45783,45784,45808,45831,45832,45870,45871,45876,45887,45899,45901,45912,45921,45937,45979,45990,46055,46131,46168,46221,46258,46268,46291,46300,46362,46371,46373,46377,46380,46405,46455,46472,46485,46502,46506,46520,46537,46559,46589,46607,46626,46653,46660,46693,46697,46720,46740,46752,46753,46782,46805,46834,46858,46881,46895,46904,46926,46940,46947,46949,46956,46985,46992,47007,47029,47069,47083,47087,47162,47181,47187,47216,47225,47234,47243,47245,47255,47277,47285,47291,47302,47318,47327,47365,47377,47384,47387,47393,47398,47399,47407,47446,47479,47486,47491,48138,48671,48887,49396,49983,50522,50694,50802,51399,51421,51596,51689,51762,54105,54475,54564,54810,55761,55886,55978,56394,57298,57308,57755,58216,59068,59752,59920,60248,60677,60773,62310,63259,64046,64060,65381,66000,66169,66478,66656,67841,68106,68634,69002,69022,69270,69297,69305,69379,70010,70112,70391,70605,70936,71027,71156,71575,71731,71736,71820,71843,72338,72343,72387,72510,72534,72705,72797,72913,72973,72980,72983,72984,72985,72991,72995,72997,73039,73200,73312,73338,73340,73357,73363,73364,73376,73387,73391,73392,73416,73421,73424,73427,73428.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046595038](https://github.com/openclaw/clawsweeper/actions/runs/25046595038)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3536 |
| Open PRs | 3456 |
| Open items total | 6992 |
| Reviewed files | 6561 |
| Unreviewed open items | 431 |
| Archived closed files | 13436 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3328 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3186 |
| Proposed PR closes | 5 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6512 |
| Proposed closes awaiting apply | 5 (0.1% of fresh reviews) |
| Closed by Codex apply | 10297 |
| Failed or stale reviews | 49 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 74/672 current (598 due, 11%) |
| Hourly hot item cadence (<7d) | 74/672 current (598 due, 11%) |
| Daily cadence coverage | 1230/4053 current (2823 due, 30.3%) |
| Daily PR cadence | 959/2811 current (1852 due, 34.1%) |
| Daily new issue cadence (<30d) | 271/1242 current (971 due, 21.8%) |
| Weekly older issue cadence | 1828/1836 current (8 due, 99.6%) |
| Due now by cadence | 3860 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 10:58 UTC. Latest close: Apr 28, 2026, 10:56 UTC. Latest comment sync: Apr 28, 2026, 11:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 5 | 0 | 5 | 0 | 0 | 417 | 0 |
| Last hour | 539 | 10 | 529 | 0 | 25 | 453 | 2 |
| Last 24 hours | 2084 | 83 | 2001 | 8 | 376 | 584 | 14 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73392](https://github.com/openclaw/openclaw/pull/73392) | fix(line): persist inbound media to ~/.openclaw/media/inbound/ via saveMediaBuffer | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73392.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73392.md) |
| [#73364](https://github.com/openclaw/openclaw/pull/73364) | fix: reduce mirror lock hold time on slow filesystems (fixes #73339) | already implemented on main | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73364.md) |
| [#73498](https://github.com/openclaw/openclaw/pull/73498) | ci: shard config codeql quality | closed externally after review | Apr 28, 2026, 11:00 UTC | [records/openclaw-openclaw/closed/73498.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73498.md) |
| [#68634](https://github.com/openclaw/openclaw/issues/68634) | [Bug]: CLI commands repeatedly trigger scope-upgrade requests + Telegram Native Approvals fails with pairing required, generating persistent pending approvals | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/68634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68634.md) |
| [#65486](https://github.com/openclaw/openclaw/issues/65486) | [Bug]: Gateway restart does not invalidate approval-pending session tool results - stale approval IDs cause INVALID_REQUEST loop on resume | closed externally after review | Apr 28, 2026, 10:56 UTC | [records/openclaw-openclaw/closed/65486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65486.md) |
| [#73494](https://github.com/openclaw/openclaw/issues/73494) | [Feature]: Real-time Stock Data Access for Trading Assistant | belongs on ClawHub | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73494.md) |
| [#73490](https://github.com/openclaw/openclaw/pull/73490) | fix: sanitize subprocess call in DebugHandler.kt | cannot reproduce on current main | Apr 28, 2026, 10:50 UTC | [records/openclaw-openclaw/closed/73490.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73490.md) |
| [#73482](https://github.com/openclaw/openclaw/issues/73482) | Active Memory embedded run times out despite configured fast recall model | duplicate or superseded | Apr 28, 2026, 10:49 UTC | [records/openclaw-openclaw/closed/73482.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73482.md) |
| [#73479](https://github.com/openclaw/openclaw/pull/73479) | update | duplicate or superseded | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/73479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73479.md) |
| [#41108](https://github.com/openclaw/openclaw/pull/41108) | fix(msteams): detect implicit mentions in thread replies via conversation.id | closed externally after review | Apr 28, 2026, 10:48 UTC | [records/openclaw-openclaw/closed/41108.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41108.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73449](https://github.com/openclaw/openclaw/pull/73449) | fix(codex): bridge app-server tool stream events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73449.md) | complete | Apr 28, 2026, 10:58 UTC |
| [#73476](https://github.com/openclaw/openclaw/pull/73476) | Feat/tool direct reply：feat(agents): add directReply flag to tool results for bypassing LLM inference | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73476.md) | complete | Apr 28, 2026, 10:57 UTC |
| [#73500](https://github.com/openclaw/openclaw/pull/73500) | fix(gateway,agent): only enforce session sendPolicy=deny when delivering | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73500.md) | complete | Apr 28, 2026, 10:57 UTC |
| [#73499](https://github.com/openclaw/openclaw/pull/73499) | [codex] Add mid-turn compaction precheck | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73499.md) | complete | Apr 28, 2026, 10:57 UTC |
| [#73342](https://github.com/openclaw/openclaw/pull/73342) | refactor(memory-host): replace core runtime bridge with services | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73342.md) | complete | Apr 28, 2026, 10:56 UTC |
| [#73421](https://github.com/openclaw/openclaw/issues/73421) | [Bug]: Regression after upgrading from 2026.4.23 to 2026.4.26: delayed reply delivery and websocket/control-ui/browser stalls in NAS Docker environment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73421.md) | complete | Apr 28, 2026, 10:56 UTC |
| [#72387](https://github.com/openclaw/openclaw/pull/72387) | docs(contextPruning): document softTrimRatio and hardClearRatio valid range (0.0–1.0) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72387.md) | complete | Apr 28, 2026, 10:56 UTC |
| [#71731](https://github.com/openclaw/openclaw/pull/71731) | [plugin sdk] docs: plugin host hook RFC | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71731.md) | complete | Apr 28, 2026, 10:56 UTC |
| [#72510](https://github.com/openclaw/openclaw/pull/72510) | fix(group-chat): wire multi-agent bot-targeting signals end-to-end (#56692) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72510.md) | complete | Apr 28, 2026, 10:56 UTC |
| [#72797](https://github.com/openclaw/openclaw/pull/72797) | feat(plugin-sdk): add resolve_exec_env hook for channel-specific env injection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72797.md) | complete | Apr 28, 2026, 10:56 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 11:03 UTC

State: Review publish complete

Merged review artifacts for run 25046784787. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25046784787](https://github.com/openclaw/clawsweeper/actions/runs/25046784787)
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
| Hourly cadence coverage | 0/51 current (51 due, 0%) |
| Hourly hot item cadence (<7d) | 0/51 current (51 due, 0%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 59 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:02 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 86 | 0 | 86 | 0 | 0 | 423 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 897 | 0 |

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
| [#1302](https://github.com/openclaw/clawhub/issues/1302) | wentbackward/remote-claws | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1302.md) | complete | Apr 28, 2026, 11:02 UTC |
| [#1766](https://github.com/openclaw/clawhub/issues/1766) | False Positive: Liuyao Divination Skill Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1766.md) | complete | Apr 28, 2026, 11:02 UTC |
| [#1840](https://github.com/openclaw/clawhub/pull/1840) | fix: support org-owned skill publishes via API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1840.md) | complete | Apr 28, 2026, 11:02 UTC |
| [#1347](https://github.com/openclaw/clawhub/issues/1347) | ClawHub网站登录失败：GitHub OAuth回调后登录信息不刷新 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1347.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1257](https://github.com/openclaw/clawhub/issues/1257) | False positive flag of create-mcp-server skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1257.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1326](https://github.com/openclaw/clawhub/issues/1326) | False positive: amber-voice-assistant v5.5.7 (slug: batthis/amber-voice-assistant) flagged as suspicious — all findings are normal telephony bridge patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1326.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1222](https://github.com/openclaw/clawhub/issues/1222) | Publish skill fails with Github API rate limit exceeded | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1222.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1857](https://github.com/openclaw/clawhub/pull/1857) | fix(security): tighten crypto capability swap detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1857.md) | complete | Apr 28, 2026, 11:01 UTC |
| [#1249](https://github.com/openclaw/clawhub/issues/1249) | [Request] Remove Suspicious Flag from memory-palace skill (lanzhou3/memory-palace) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1249.md) | complete | Apr 28, 2026, 11:01 UTC |

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
