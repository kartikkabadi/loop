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

Last dashboard update: Apr 28, 2026, 18:44 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4417 |
| Open PRs | 3449 |
| Open items total | 7866 |
| Reviewed files | 7475 |
| Unreviewed open items | 391 |
| Due now by cadence | 2276 |
| Proposed closes awaiting apply | 7 |
| Closed by Codex apply | 10511 |
| Failed or stale reviews | 7 |
| Archived closed files | 13700 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6952 | 6568 | 384 | 2251 | 7 | 10505 | Apr 28, 2026, 18:30 UTC | Apr 28, 2026, 18:32 UTC | 550 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 25 | 0 | 3 | Apr 28, 2026, 18:04 UTC | Apr 28, 2026, 08:18 UTC | 273 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 18:44 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069979188) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 18:15 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069191786) |

### Fleet Activity

Latest review: Apr 28, 2026, 18:30 UTC. Latest close: Apr 28, 2026, 18:32 UTC. Latest comment sync: Apr 28, 2026, 18:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 3 | 116 | 1 |
| Last hour | 1219 | 11 | 1208 | 0 | 21 | 823 | 2 |
| Last 24 hours | 5182 | 290 | 4892 | 4 | 628 | 1275 | 20 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73745](https://github.com/openclaw/openclaw/issues/73745) | [Bug]: Discord /reset sends empty prompt on 2026.4.26 | already implemented on main | Apr 28, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/73745.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73745.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73731](https://github.com/openclaw/openclaw/issues/73731) | resolveBuiltInModelSuppression runs the same 48-plugin load twice back-to-back via independent caches | already implemented on main | Apr 28, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/73731.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73731.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73342](https://github.com/openclaw/openclaw/pull/73342) | refactor(memory-host): replace core runtime bridge with services | closed externally after review | Apr 28, 2026, 18:32 UTC | [records/openclaw-openclaw/closed/73342.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73342.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73654](https://github.com/openclaw/openclaw/pull/73654) | fix(cli): make crestodian exit non-zero on no-TTY (#73646) | closed externally after review | Apr 28, 2026, 18:31 UTC | [records/openclaw-openclaw/closed/73654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73654.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50107](https://github.com/openclaw/openclaw/issues/50107) | [Bug]: NVIDIA Provider Sends Anthropic-Style Message Format to OpenAI-Compatible API | closed externally after review | Apr 28, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/50107.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50107.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68947](https://github.com/openclaw/openclaw/pull/68947) | fix(reply): restore export-session inline scripts | closed externally after review | Apr 28, 2026, 18:28 UTC | [records/openclaw-openclaw/closed/68947.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68947.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | closed externally after review | Apr 28, 2026, 18:16 UTC | [records/openclaw-openclaw/closed/73708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73692](https://github.com/openclaw/openclaw/pull/73692) | fix: log fetch timeout aborts | kept open | Apr 28, 2026, 18:12 UTC | [records/openclaw-openclaw/closed/73692.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73692.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73534](https://github.com/openclaw/openclaw/pull/73534) | fix(telegram): scope native quote streaming guard to real quotes (#73505) | closed externally after review | Apr 28, 2026, 18:11 UTC | [records/openclaw-openclaw/closed/73534.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73534.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73730](https://github.com/openclaw/openclaw/issues/73730) | resolvePluginWebProviders snapshot cache never hits because callers pass fresh config objects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73730.md) | complete | Apr 28, 2026, 18:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73729](https://github.com/openclaw/openclaw/issues/73729) | resolvePluginCapabilityProviders triggers redundant full plugin loads per message (image/video/music generation) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73729.md) | complete | Apr 28, 2026, 18:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73203](https://github.com/openclaw/openclaw/pull/73203) | fix(feishu): support text tag and nested arrays in interactive card parsing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73203.md) | complete | Apr 28, 2026, 18:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73662](https://github.com/openclaw/openclaw/pull/73662) | CLI/status: synthesize Channels rows from gateway snapshot when read-only discovery returns none | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73662.md) | complete | Apr 28, 2026, 18:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73650](https://github.com/openclaw/openclaw/pull/73650) | CLI/status: share reconciled task snapshot across registry and audit summaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73650.md) | complete | Apr 28, 2026, 18:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 28, 2026, 18:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73728](https://github.com/openclaw/openclaw/issues/73728) | Default DEFAULT_PLUGIN_DISCOVERY_CACHE_MS / DEFAULT_PLUGIN_MANIFEST_CACHE_MS of 1 second is too short for gateway use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73728.md) | complete | Apr 28, 2026, 18:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73706](https://github.com/openclaw/openclaw/pull/73706) | fix(outbound): thread sessionKey into message_sending + align session.key with agent runtime + document the contract | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73706.md) | complete | Apr 28, 2026, 18:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59933](https://github.com/openclaw/openclaw/issues/59933) | [Bug]: sessions_list does not surface group sessions for the same agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59933.md) | complete | Apr 28, 2026, 18:27 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | complete | Apr 28, 2026, 18:27 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:44 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 111. Item numbers: 25592,27061,35203,37967,38248,40088,40838,41265,41283,41294,41330,41459,41474,41561,41579,41645,41665,41676,41750,41755,41779,41795,41799,41805,41826,41853,41854,41866,41943,41949,41955,41966,41991,41993,42009,42027,42059,42122,42131,42197,42207,42208,42213,42222,42223,42245,42246,42261,42273,42276,42291,42301,42317,42322,42332,42351,42354,42361,42373,42381,42397,42400,42402,42408,42424,42425,42438,42452,42461,42475,42476,42482,42488,42510,42533,42539,42541,42542,42571,42585,42606,42611,42617,42621,42646,42647,42650,42651,42663,42665,42674,42677,42683,42707,42713,42715,42729,42747,42754,42771,42798,42802,42809,42810,42816,42832,42837,42841,42843,42847,42853,42858,42862,42873,42877,42898,42904,42908,42933,42936,42937,42952,42962,42986,42987,42998,43005,43006,43009,43015,43020,43028,43061,43064,43097,43145,43151,43165,43170,43176,43190,43195,43202,43204,43211,43216,43217,43220,43231,43235,43244,43249,43253,43254,43260,43276,43292,43300,43306,43340,43348,43432,43454,43456,43469,43500,43658,43659,43661,43681,43750,43786,43830,43832,43837,43929,43950,44144,44166,44253,44288,44423,44441,44578,44614,45062,45315,45320,45342,45344,45374,45380,45383,45393,45417,45421,45449,45454,45465,45523,45535,45592,45594,45602,45612,45613,45626,45643,45664,45673,45677,45683,45684,45704,45712,45739,45760,45782,45783,45784,45808,45831,45832,46303,46552,46933,47090,47264,47277,47635,47660,47776,47816,47877,47892,47922,47984,48014,48021,48034,48100,48112,48115,48130,48150,48194,48235,48265,48270,48278,48285,48320,48324,48328,48334,48336,48375,48387,48391,48396,48433,48537,48570,48585,48588,48643,48681,48682,48690,48724,48742,48807,48845,48868,48940,48945,48958,48960,48976,49058,49064,49082,49085,49107,49112,49117,49120,49216,49221,49349,49361,49401,49430,49434,49511,49569,49579,49660,49750,49769,49796,49840,49869,49870,49875,49936,49958,49967,50054,50076,50096,50141,50147,50152,50160,50200,50244,50269,50320,50357,50359,50643,50675,50875,50936,50979,51124,51197,51413,51451,51553,51762,51860,51926,52025,52357,52782,52989,53112,53257,53314,53393,53467,53788,53916,54275,54436,54567,54656,54660,54671,54677,54685,54764,54819,55327,55713,55753,55973,57081,57991,58280,58313,58479,58789,58822,58823,59361,59509,59528,59710,59740,59745,59798,59817,59859,59881,59913,59933,60034,60078,60087,60103,60113,60117,60154,60191,60204,60225,60274,60339,60342,60344,60382,60422,60427,60450,60456,60572,60576,60593,60612,60620,60657,60694,60713,60759,60763,60767,60774,60827,60835,60841,60882,60946,60955,60961,60979,60982,61002,61005,61041,61078,61092,61177,61183,61232,61245,61278,61713,61722,61859,61970,62010,62055,62134,62308,62323,62413,62455,62468,62495,62503,62545,62604,62643,62644,62646,62696,62697,62702,62742,62773,62789,62792,62822,62827,62845,63081,63412,63711,63753,63939,64257,64616,64956,65564,66394,66542,67239,67853,68669,71396,72294,72297,72984,73101,73235,73363,73369,73384,73554,73566,73579,73583,73632,73641,73676,73677,73678,73679,73680,73681,73682,73683,73685,73689,73691,73695,73696.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25069979188](https://github.com/openclaw/clawsweeper/actions/runs/25069979188)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3541 |
| Open PRs | 3411 |
| Open items total | 6952 |
| Reviewed files | 6568 |
| Unreviewed open items | 384 |
| Archived closed files | 13687 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3364 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3197 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6561 |
| Proposed closes awaiting apply | 7 (0.1% of fresh reviews) |
| Closed by Codex apply | 10508 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 92/815 current (723 due, 11.3%) |
| Hourly hot item cadence (<7d) | 92/815 current (723 due, 11.3%) |
| Daily cadence coverage | 2768/3911 current (1143 due, 70.8%) |
| Daily PR cadence | 2070/2726 current (656 due, 75.9%) |
| Daily new issue cadence (<30d) | 698/1185 current (487 due, 58.9%) |
| Weekly older issue cadence | 1841/1842 current (1 due, 99.9%) |
| Due now by cadence | 2251 |

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

Latest review: Apr 28, 2026, 18:30 UTC. Latest close: Apr 28, 2026, 18:32 UTC. Latest comment sync: Apr 28, 2026, 18:44 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 3 | 116 | 1 |
| Last hour | 946 | 11 | 935 | 0 | 21 | 550 | 2 |
| Last 24 hours | 4265 | 287 | 3978 | 4 | 618 | 955 | 20 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73745](https://github.com/openclaw/openclaw/issues/73745) | [Bug]: Discord /reset sends empty prompt on 2026.4.26 | already implemented on main | Apr 28, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/73745.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73745.md) |
| [#73731](https://github.com/openclaw/openclaw/issues/73731) | resolveBuiltInModelSuppression runs the same 48-plugin load twice back-to-back via independent caches | already implemented on main | Apr 28, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/73731.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73731.md) |
| [#73342](https://github.com/openclaw/openclaw/pull/73342) | refactor(memory-host): replace core runtime bridge with services | closed externally after review | Apr 28, 2026, 18:32 UTC | [records/openclaw-openclaw/closed/73342.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73342.md) |
| [#73654](https://github.com/openclaw/openclaw/pull/73654) | fix(cli): make crestodian exit non-zero on no-TTY (#73646) | closed externally after review | Apr 28, 2026, 18:31 UTC | [records/openclaw-openclaw/closed/73654.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73654.md) |
| [#50107](https://github.com/openclaw/openclaw/issues/50107) | [Bug]: NVIDIA Provider Sends Anthropic-Style Message Format to OpenAI-Compatible API | closed externally after review | Apr 28, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/50107.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50107.md) |
| [#68947](https://github.com/openclaw/openclaw/pull/68947) | fix(reply): restore export-session inline scripts | closed externally after review | Apr 28, 2026, 18:28 UTC | [records/openclaw-openclaw/closed/68947.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68947.md) |
| [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | closed externally after review | Apr 28, 2026, 18:16 UTC | [records/openclaw-openclaw/closed/73708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73708.md) |
| [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |
| [#73692](https://github.com/openclaw/openclaw/pull/73692) | fix: log fetch timeout aborts | kept open | Apr 28, 2026, 18:12 UTC | [records/openclaw-openclaw/closed/73692.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73692.md) |
| [#73534](https://github.com/openclaw/openclaw/pull/73534) | fix(telegram): scope native quote streaming guard to real quotes (#73505) | closed externally after review | Apr 28, 2026, 18:11 UTC | [records/openclaw-openclaw/closed/73534.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73534.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73730](https://github.com/openclaw/openclaw/issues/73730) | resolvePluginWebProviders snapshot cache never hits because callers pass fresh config objects | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73730.md) | complete | Apr 28, 2026, 18:30 UTC |
| [#73729](https://github.com/openclaw/openclaw/issues/73729) | resolvePluginCapabilityProviders triggers redundant full plugin loads per message (image/video/music generation) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73729.md) | complete | Apr 28, 2026, 18:30 UTC |
| [#73203](https://github.com/openclaw/openclaw/pull/73203) | fix(feishu): support text tag and nested arrays in interactive card parsing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73203.md) | complete | Apr 28, 2026, 18:29 UTC |
| [#73662](https://github.com/openclaw/openclaw/pull/73662) | CLI/status: synthesize Channels rows from gateway snapshot when read-only discovery returns none | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73662.md) | complete | Apr 28, 2026, 18:29 UTC |
| [#73650](https://github.com/openclaw/openclaw/pull/73650) | CLI/status: share reconciled task snapshot across registry and audit summaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73650.md) | complete | Apr 28, 2026, 18:29 UTC |
| [#71396](https://github.com/openclaw/openclaw/pull/71396) | fix(feishu): stop automatic mention cascades | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71396.md) | complete | Apr 28, 2026, 18:28 UTC |
| [#73728](https://github.com/openclaw/openclaw/issues/73728) | Default DEFAULT_PLUGIN_DISCOVERY_CACHE_MS / DEFAULT_PLUGIN_MANIFEST_CACHE_MS of 1 second is too short for gateway use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73728.md) | complete | Apr 28, 2026, 18:28 UTC |
| [#73706](https://github.com/openclaw/openclaw/pull/73706) | fix(outbound): thread sessionKey into message_sending + align session.key with agent runtime + document the contract | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73706.md) | complete | Apr 28, 2026, 18:28 UTC |
| [#59933](https://github.com/openclaw/openclaw/issues/59933) | [Bug]: sessions_list does not surface group sessions for the same agent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59933.md) | complete | Apr 28, 2026, 18:27 UTC |
| [#73566](https://github.com/openclaw/openclaw/pull/73566) | fix(cli): handle closed plugin uninstall prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73566.md) | complete | Apr 28, 2026, 18:27 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 18:44 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25071268833](https://github.com/openclaw/clawsweeper/actions/runs/25071268833)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 875 |
| Open PRs | 32 |
| Open items total | 907 |
| Reviewed files | 907 |
| Unreviewed open items | 0 |
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
| Hourly cadence coverage | 32/50 current (18 due, 64%) |
| Hourly hot item cadence (<7d) | 32/50 current (18 due, 64%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 634/634 current (0 due, 100%) |
| Due now by cadence | 18 |

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

Latest review: Apr 28, 2026, 18:04 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 18:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 273 | 0 | 273 | 0 | 0 | 273 | 0 |
| Last 24 hours | 917 | 3 | 914 | 0 | 10 | 320 | 0 |

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
| [#1569](https://github.com/openclaw/clawhub/issues/1569) | How can I transfer \"personal skills\" to \"organization skills\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1569.md) | complete | Apr 28, 2026, 18:04 UTC |
| [#1690](https://github.com/openclaw/clawhub/issues/1690) | False positive flag: eolas-openclaw-mcp is a legitimate DeFi trading plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1690.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1812.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1826](https://github.com/openclaw/clawhub/issues/1826) | False positives: powerloom-bot/powerloom-bds-univ3 flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1826.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1563](https://github.com/openclaw/clawhub/issues/1563) | Skill flagged suspicious, scan tagged benign | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1563.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1855](https://github.com/openclaw/clawhub/pull/1855) | feat(cli): show skill moderation in inspect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1855.md) | complete | Apr 28, 2026, 18:03 UTC |
| [#1472](https://github.com/openclaw/clawhub/issues/1472) | Why is my skill flagged as suspicious even after reaching benign status? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1472.md) | complete | Apr 28, 2026, 18:02 UTC |
| [#1595](https://github.com/openclaw/clawhub/issues/1595) | Proposal: native Apple Notes skill for macOS agents (osascript, no memo dependency) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1595.md) | complete | Apr 28, 2026, 18:02 UTC |

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
