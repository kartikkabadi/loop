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

Last dashboard update: Apr 28, 2026, 12:05 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4418 |
| Open PRs | 3467 |
| Open items total | 7885 |
| Reviewed files | 7474 |
| Unreviewed open items | 411 |
| Due now by cadence | 3503 |
| Proposed closes awaiting apply | 30 |
| Closed by Codex apply | 10313 |
| Failed or stale reviews | 5 |
| Archived closed files | 13473 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6974 | 6571 | 403 | 3443 | 30 | 10310 | Apr 28, 2026, 11:51 UTC | Apr 28, 2026, 11:52 UTC | 589 |
| [ClawHub](https://github.com/openclaw/clawhub) | 911 | 903 | 8 | 60 | 0 | 3 | Apr 28, 2026, 11:41 UTC | Apr 28, 2026, 08:18 UTC | 20 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 12:05 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049466451) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review in progress | Apr 28, 2026, 11:45 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25049237151) |

### Fleet Activity

Latest review: Apr 28, 2026, 11:51 UTC. Latest close: Apr 28, 2026, 11:52 UTC. Latest comment sync: Apr 28, 2026, 12:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 1 | 2 | 0 | 1 | 364 | 0 |
| Last hour | 566 | 37 | 529 | 2 | 22 | 609 | 1 |
| Last 24 hours | 3435 | 125 | 3310 | 2 | 413 | 1377 | 13 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73541](https://github.com/openclaw/openclaw/issues/73541) | [Bug]: [whatsapp] channel startup failed: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:' | already implemented on main | Apr 28, 2026, 11:52 UTC | [records/openclaw-openclaw/closed/73541.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73541.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73530](https://github.com/openclaw/openclaw/issues/73530) | perf] 2026.4.26: bundled plugin runtime deps staging burns 85-100% CPU continuously after upgrade | already implemented on main | Apr 28, 2026, 11:47 UTC | [records/openclaw-openclaw/closed/73530.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73530.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73431](https://github.com/openclaw/openclaw/issues/73431) | [Bug]: Discord `message read/search` hang indefinitely and Discord channel plugin does not emit standard inbound hooks (`message_received` / `inbound_claim`) — possible regression of #31264 / #33038 | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73431.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73431.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73521](https://github.com/openclaw/openclaw/pull/73521) | fix: Discord read/search timeout, session-key fallback, and gateway execution mode | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73521.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73529](https://github.com/openclaw/openclaw/issues/73529) | agents.list[].thinkingDefault not reflected in Control UI session thinking selector | already implemented on main | Apr 28, 2026, 11:44 UTC | [records/openclaw-openclaw/closed/73529.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73529.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73528](https://github.com/openclaw/openclaw/issues/73528) | Gateway startup warmup is slow for inline configured primary model | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/73528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73528.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46992](https://github.com/openclaw/openclaw/pull/46992) | Fix: Windows terminal encoding set to UTF-8 | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/46992.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46992.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46472](https://github.com/openclaw/openclaw/pull/46472) | fix(feishu): add WebSocket heartbeat config to prevent silent disconnection | duplicate or superseded | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/46472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46472.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41473](https://github.com/openclaw/openclaw/pull/41473) | Slack: expose Socket Mode ping/pong timeout config | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/41473.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41473.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73527](https://github.com/openclaw/openclaw/issues/73527) | [Bug][Regression] memorySearch provider \"gemini\" unknown after steipete@3eb2a9d | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/73527.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73527.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71961](https://github.com/openclaw/openclaw/pull/71961) | fix(agents): restore compaction gateway logs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71961.md) | complete | Apr 28, 2026, 11:51 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73467](https://github.com/openclaw/openclaw/issues/73467) | [2026.4.26] Gateway main thread stalls under orchestration load; /readyz timeouts and reload deferred behind active runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73467.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73540](https://github.com/openclaw/openclaw/pull/73540) | fix(gateway): prewarm effective tool inventory cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73540.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60607](https://github.com/openclaw/openclaw/issues/60607) | [Bug] Agent completes task but sends no reply to user (dispatch complete with queuedFinal=false, replies=0) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60607.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70859](https://github.com/openclaw/openclaw/pull/70859) | perf(cli): keep compatibility notices on the snapshot path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70859.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73446](https://github.com/openclaw/openclaw/issues/73446) | Docs language switcher loses page path (Mintlify platform behavior) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73446.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73315](https://github.com/openclaw/openclaw/pull/73315) | feat(desktop): add Tauri desktop companion MVP | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73315.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51347](https://github.com/openclaw/openclaw/issues/51347) | Bug:  ignores  config and returns success on media failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51347.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60675](https://github.com/openclaw/openclaw/issues/60675) | [Bug]: Browser gateway chat run fails at runtime with ENOENT: mkdir '/home/node' after successful device-authenticated WebSocket connect | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60675.md) | complete | Apr 28, 2026, 11:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60005](https://github.com/openclaw/openclaw/pull/60005) | feat(mcp): add resource support for channel and plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60005.md) | complete | Apr 28, 2026, 11:50 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 12:05 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 361. Item numbers: 15591,17311,17684,18915,19362,19482,20802,23096,25222,27061,30142,30529,34542,34581,38327,38502,39102,39115,39137,41296,41372,41991,42027,42099,42373,42533,42798,42832,42841,42853,42877,42933,42937,42961,42986,42987,43117,43170,43176,43204,43217,43231,43244,43249,43254,43300,43306,43340,43348,43367,43658,43659,47264,47776,47816,47947,47984,48014,48021,48034,48100,48112,48115,48130,48147,48150,48194,48235,48245,48270,48278,48283,48285,48289,48293,48305,48312,48320,48324,48325,48328,48334,48335,48336,48350,48355,48368,48373,48375,48377,48387,48391,48396,48425,48433,48442,48466,48472,48509,48520,48537,48556,48570,48585,48593,48604,48608,48615,48635,48643,48666,48668,48675,48681,48682,48690,48702,48724,48732,48742,48792,48795,48807,48808,48834,48836,48845,48851,48867,48868,48877,48883,48900,48902,48904,48940,48942,48945,48946,48958,48960,48967,48976,49001,49028,49042,49044,49058,49063,49064,49069,49072,49082,49083,49085,49107,49109,49112,49117,49120,49135,49166,49194,49216,49221,49310,49315,49332,49335,49349,49361,49366,49401,49409,49423,49430,49434,49502,49511,49529,49549,49550,49569,49574,49579,49669,49685,49699,49704,49707,49750,49762,49769,49770,49793,49794,49796,49800,49840,49841,49850,49869,49870,49875,49936,49945,49958,49962,49967,49968,49980,49981,49987,49996,50046,50054,50076,50102,50116,50141,50147,50158,50160,50164,50172,50177,50191,50193,50200,50206,50210,50217,50244,50249,50250,50267,50269,50278,50300,50320,50359,50361,50381,50392,50399,50425,50454,50460,50463,50479,50507,50515,50516,50520,50521,50527,50584,50586,50587,50631,50643,50662,50675,50682,50692,50696,50708,50720,50737,50745,50751,50755,50757,50760,50777,50837,50875,50881,50883,50885,50895,50933,50936,50955,50960,50965,50968,50975,50978,50981,50992,51001,51005,51024,51067,51077,51078,51079,51091,51121,51125,51128,51156,51163,51179,51180,51196,51198,51257,51268,51270,51282,51286,51288,51303,51311,51316,51318,51319,51327,51347,51371,51375,51388,51389,51413,51448,51462,51472,51486,51515,51528,51546,51553,51556,51563,51565,51584,51603,51623,51653,51668,51672,51675,51683,51733,51737,51775,51777,51802,51803,51822,51860,51868,51889,51893,51926,51930,51940,51965,51970,51986,52012,52025,52026,52027,52036,52052,52059,52109,52120,52121,52125,52154,52200,52234,52252,52275,52278,52293,52329,52342,52357,52400,52434,52448,52457,52480,52487,52515,52522,52571,52588,52601,52614,52640,52642,53410,53562,53943,54061,55767,55923,56153,56437,56575,56694,56791,56837,58012,58479,58565,59050,59076,59577,59592,59859,60005,60607,60675,60737,60830,61561,62557,63930,63981,64274,64585,64819,64888,64957,65209,65272,65279,65746,66168,66213,66251,66360,66409,66540,66687,67495,67631,68036,68501,68514,68554,68556,68558,68755,68928,68934,70253,70319,70371,70422,70859,71326,71582,71784,71903,71923,71976,71992,72237,72373,72645,72762,72792,73235,73241,73315,73320,73321,73323,73328,73334,73337,73343,73345,73349,73355,73359,73369,73378,73381,73400,73431,73432,73437,73440,73446,73448,73451,73453,73467,73469,73470.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25049466451](https://github.com/openclaw/clawsweeper/actions/runs/25049466451)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3544 |
| Open PRs | 3430 |
| Open items total | 6974 |
| Reviewed files | 6571 |
| Unreviewed open items | 403 |
| Archived closed files | 13463 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3360 |
| Proposed issue closes | 3 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3207 |
| Proposed PR closes | 27 (0.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6567 |
| Proposed closes awaiting apply | 30 (0.5% of fresh reviews) |
| Closed by Codex apply | 10310 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 80/679 current (599 due, 11.8%) |
| Hourly hot item cadence (<7d) | 80/679 current (599 due, 11.8%) |
| Daily cadence coverage | 1610/4050 current (2440 due, 39.8%) |
| Daily PR cadence | 1317/2812 current (1495 due, 46.8%) |
| Daily new issue cadence (<30d) | 293/1238 current (945 due, 23.7%) |
| Weekly older issue cadence | 1841/1842 current (1 due, 99.9%) |
| Due now by cadence | 3443 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:51 UTC. Latest close: Apr 28, 2026, 11:52 UTC. Latest comment sync: Apr 28, 2026, 12:05 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 1 | 2 | 0 | 1 | 364 | 0 |
| Last hour | 546 | 37 | 509 | 1 | 22 | 589 | 1 |
| Last 24 hours | 2522 | 122 | 2400 | 1 | 403 | 946 | 13 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73541](https://github.com/openclaw/openclaw/issues/73541) | [Bug]: [whatsapp] channel startup failed: Only URLs with a scheme in: file, data, and node are supported by the default ESM loader. On Windows, absolute paths must be valid file:// URLs. Received protocol 'c:' | already implemented on main | Apr 28, 2026, 11:52 UTC | [records/openclaw-openclaw/closed/73541.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73541.md) |
| [#73530](https://github.com/openclaw/openclaw/issues/73530) | perf] 2026.4.26: bundled plugin runtime deps staging burns 85-100% CPU continuously after upgrade | already implemented on main | Apr 28, 2026, 11:47 UTC | [records/openclaw-openclaw/closed/73530.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73530.md) |
| [#73431](https://github.com/openclaw/openclaw/issues/73431) | [Bug]: Discord `message read/search` hang indefinitely and Discord channel plugin does not emit standard inbound hooks (`message_received` / `inbound_claim`) — possible regression of #31264 / #33038 | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73431.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73431.md) |
| [#73521](https://github.com/openclaw/openclaw/pull/73521) | fix: Discord read/search timeout, session-key fallback, and gateway execution mode | closed externally after review | Apr 28, 2026, 11:46 UTC | [records/openclaw-openclaw/closed/73521.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73521.md) |
| [#73529](https://github.com/openclaw/openclaw/issues/73529) | agents.list[].thinkingDefault not reflected in Control UI session thinking selector | already implemented on main | Apr 28, 2026, 11:44 UTC | [records/openclaw-openclaw/closed/73529.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73529.md) |
| [#73528](https://github.com/openclaw/openclaw/issues/73528) | Gateway startup warmup is slow for inline configured primary model | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/73528.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73528.md) |
| [#46992](https://github.com/openclaw/openclaw/pull/46992) | Fix: Windows terminal encoding set to UTF-8 | already implemented on main | Apr 28, 2026, 11:43 UTC | [records/openclaw-openclaw/closed/46992.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46992.md) |
| [#46472](https://github.com/openclaw/openclaw/pull/46472) | fix(feishu): add WebSocket heartbeat config to prevent silent disconnection | duplicate or superseded | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/46472.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/46472.md) |
| [#41473](https://github.com/openclaw/openclaw/pull/41473) | Slack: expose Socket Mode ping/pong timeout config | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/41473.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41473.md) |
| [#73527](https://github.com/openclaw/openclaw/issues/73527) | [Bug][Regression] memorySearch provider \"gemini\" unknown after steipete@3eb2a9d | already implemented on main | Apr 28, 2026, 11:42 UTC | [records/openclaw-openclaw/closed/73527.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73527.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71961](https://github.com/openclaw/openclaw/pull/71961) | fix(agents): restore compaction gateway logs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71961.md) | complete | Apr 28, 2026, 11:51 UTC |
| [#73467](https://github.com/openclaw/openclaw/issues/73467) | [2026.4.26] Gateway main thread stalls under orchestration load; /readyz timeouts and reload deferred behind active runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73467.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#73540](https://github.com/openclaw/openclaw/pull/73540) | fix(gateway): prewarm effective tool inventory cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73540.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#60607](https://github.com/openclaw/openclaw/issues/60607) | [Bug] Agent completes task but sends no reply to user (dispatch complete with queuedFinal=false, replies=0) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60607.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#70859](https://github.com/openclaw/openclaw/pull/70859) | perf(cli): keep compatibility notices on the snapshot path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70859.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#73446](https://github.com/openclaw/openclaw/issues/73446) | Docs language switcher loses page path (Mintlify platform behavior) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73446.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#73315](https://github.com/openclaw/openclaw/pull/73315) | feat(desktop): add Tauri desktop companion MVP | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73315.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#51347](https://github.com/openclaw/openclaw/issues/51347) | Bug:  ignores  config and returns success on media failure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51347.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#60675](https://github.com/openclaw/openclaw/issues/60675) | [Bug]: Browser gateway chat run fails at runtime with ENOENT: mkdir '/home/node' after successful device-authenticated WebSocket connect | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60675.md) | complete | Apr 28, 2026, 11:50 UTC |
| [#60005](https://github.com/openclaw/openclaw/pull/60005) | feat(mcp): add resource support for channel and plugin | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60005.md) | complete | Apr 28, 2026, 11:50 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 12:03 UTC

State: Hot intake in progress

Hot intake planned 20 items across 20 shards. Capacity is 20 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25051655323](https://github.com/openclaw/clawsweeper/actions/runs/25051655323)
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
| Hourly cadence coverage | 0/51 current (51 due, 0%) |
| Hourly hot item cadence (<7d) | 0/51 current (51 due, 0%) |
| Daily cadence coverage | 225/225 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 204/204 current (0 due, 100%) |
| Weekly older issue cadence | 626/627 current (1 due, 99.8%) |
| Due now by cadence | 60 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 28, 2026, 11:58 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 10:53 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 20 | 0 | 20 | 1 | 0 | 20 | 0 |
| Last 24 hours | 913 | 3 | 910 | 1 | 10 | 431 | 0 |

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
