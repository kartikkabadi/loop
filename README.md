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

Last dashboard update: Apr 28, 2026, 16:02 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4425 |
| Open PRs | 3445 |
| Open items total | 7870 |
| Reviewed files | 7471 |
| Unreviewed open items | 399 |
| Due now by cadence | 2764 |
| Proposed closes awaiting apply | 6 |
| Closed by Codex apply | 10438 |
| Failed or stale reviews | 6 |
| Archived closed files | 13617 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6957 | 6565 | 392 | 2742 | 6 | 10435 | Apr 28, 2026, 15:47 UTC | Apr 28, 2026, 15:48 UTC | 756 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 22 | 0 | 3 | Apr 28, 2026, 15:27 UTC | Apr 28, 2026, 08:18 UTC | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 16:02 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061549508) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 15:28 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25061130507) |

### Fleet Activity

Latest review: Apr 28, 2026, 15:47 UTC. Latest close: Apr 28, 2026, 15:48 UTC. Latest comment sync: Apr 28, 2026, 16:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 398 | 0 |
| Last hour | 1078 | 13 | 1065 | 1 | 35 | 756 | 3 |
| Last 24 hours | 4541 | 220 | 4321 | 2 | 545 | 1453 | 16 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59909.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59852](https://github.com/openclaw/openclaw/pull/59852) | fix(lsp): clear request timeout on successful response and session dispose | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59852.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59767](https://github.com/openclaw/openclaw/issues/59767) | [Bug]: Voice Wake trigger word matching fails on Mac mini (Mac16,10) macOS 26.2 | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59767.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59767.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59495](https://github.com/openclaw/openclaw/pull/59495) | fix: ensure CLI service operations respect --profile on macOS | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59495.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59495.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58842](https://github.com/openclaw/openclaw/issues/58842) | [Bug]: model hanging | already implemented on main | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/58842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58842.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48558](https://github.com/openclaw/openclaw/issues/48558) | Feature Request: Native support for Anthropic Memory Tool (memory_20250818) | belongs on ClawHub | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/48558.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48558.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57548](https://github.com/openclaw/openclaw/pull/57548) | fix(telegram): persist native command metadata to target sessions | kept open | Apr 28, 2026, 15:47 UTC | [records/openclaw-openclaw/closed/57548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57548.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73636](https://github.com/openclaw/openclaw/issues/73636) | [Bug]: Remote CLI TUI stuck in device-pairing-required loop after device wipe | already implemented on main | Apr 28, 2026, 15:43 UTC | [records/openclaw-openclaw/closed/73636.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73636.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73645](https://github.com/openclaw/openclaw/issues/73645) | [Bug]: sidecars.channels stalls 145–625s on startup due to redundant loadOpenClawPlugins call from shouldSuppressBuiltInModel | already implemented on main | Apr 28, 2026, 15:41 UTC | [records/openclaw-openclaw/closed/73645.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73645.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73634](https://github.com/openclaw/openclaw/issues/73634) | WebChat: Restore browser-based voice input (MediaRecorder / getUserMedia) | duplicate or superseded | Apr 28, 2026, 15:39 UTC | [records/openclaw-openclaw/closed/73634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73634.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73632](https://github.com/openclaw/openclaw/pull/73632) | fix voice-call SecretRef auth token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73632.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59337](https://github.com/openclaw/openclaw/issues/59337) | [Feature]: Openclaw nodes run function hopes to be restored | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59337.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#48570](https://github.com/openclaw/openclaw/pull/48570) | feat(whatsapp): add poll, reaction, event, and RSVP message support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48570.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73592](https://github.com/openclaw/openclaw/issues/73592) | [Bug]: WSL local gateway binds but WebSocket handshake times out on 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73592.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 15:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73593](https://github.com/openclaw/openclaw/pull/73593) | fix(cli): clarify infer media provider config errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73593.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50206](https://github.com/openclaw/openclaw/pull/50206) | feat: add opt-in X-OpenClaw-Agent header for per-agent LLM tracking | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50206.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52176](https://github.com/openclaw/openclaw/pull/52176) | feat(docker): add optional uv installation for skills and extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52176.md) | complete | Apr 28, 2026, 15:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73647.md) | complete | Apr 28, 2026, 15:46 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 16:02 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 392. Item numbers: 6457,7057,12678,14593,15591,17098,17311,17684,18160,18860,18915,19328,19330,19362,19482,20802,23096,24754,25222,25295,25789,27771,29387,30142,30529,31407,32558,33845,33975,34542,34581,36630,38161,38162,38327,38502,38789,38808,38876,39102,39115,39137,39245,39350,39555,39558,39604,39683,39692,39703,39715,39726,39772,39891,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41058,41082,41088,41111,41120,41135,41168,41195,41199,41259,41265,41272,41283,41296,41299,41304,41306,41346,41355,41366,41372,41398,41410,41418,41444,41461,41474,41483,41494,41495,41501,41517,41546,41548,41555,41561,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41665,41670,41671,41676,41685,41718,41722,41740,41744,41745,41750,41755,41779,41795,41799,41803,41826,41833,41837,41853,41854,41858,41866,41879,41882,41892,41897,41899,41933,41940,41943,41949,41954,41955,41965,41966,41983,41986,41991,41993,42001,42007,42009,42011,42014,42027,42039,42052,42059,42065,42079,42099,42106,42122,42131,42156,42157,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42291,42301,42303,42304,42317,42322,42327,42330,42351,42354,42361,42373,42381,42391,42402,42408,42424,42425,42452,42461,42475,42476,42482,42510,42533,42539,42541,42542,42571,42585,42592,42606,42611,42617,42631,42636,42637,42646,42647,42650,42651,42663,42674,42675,42677,42683,42690,42707,42713,42715,42729,42771,42802,42809,42810,42820,42832,42837,42841,42843,42847,42853,42858,42862,42873,42877,42898,42904,42908,42933,42936,42937,42952,42961,42962,42986,42998,42999,43005,43006,43009,43015,43020,43028,43061,43064,43068,43097,43117,43145,43151,43165,43170,43176,43195,43202,43204,43211,43216,43217,43244,43249,43253,43254,43260,43276,43292,43306,43340,43348,43367,43454,43456,43469,43500,43658,43659,43832,43837,43950,44144,44166,44423,44441,44614,45315,45342,45344,45374,45383,45393,45417,45421,45449,45454,45465,45523,45535,45592,45594,45602,45612,45613,45626,45664,45673,45677,45683,45684,45704,45712,45739,45760,45783,45784,45831,47877,47892,47922,48014,48034,48112,48115,48130,48150,48235,48283,48293,48305,48312,48320,48328,48335,48350,48355,48373,48377,48396,48425,48472,48509,48537,48570,48588,48589,48593,48604,48608,48615,48635,48637,48666,48675,48702,48732,48792,48836,48851,48877,48883,48900,48904,49001,49042,49044,49083,49109,49135,49308,49332,49335,49529,49549,49685,49699,49707,49762,49794,49962,49996,50191,50206,50460,50507,50521,50527,50708,50737,51078,51371,51683,51733,51889,52176,52555,52643,56791,58726,58808,58830,58842,58957,59337,59362,59413,59495,59500,59616,59658,59685,59688,59744,59767,59771,59786,59795,59818,59852,59909,59973,59976,60114,60212,60229,60328,60347,60349,60353,60445,60595,60600,60678,60762,64500,64752,67008,67509,69310,69312,71384,72295,73101,73453,73455,73533,73586,73592,73593,73594,73595.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25061549508](https://github.com/openclaw/clawsweeper/actions/runs/25061549508)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3550 |
| Open PRs | 3407 |
| Open items total | 6957 |
| Reviewed files | 6565 |
| Unreviewed open items | 392 |
| Archived closed files | 13601 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3372 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3188 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6560 |
| Proposed closes awaiting apply | 6 (0.1% of fresh reviews) |
| Closed by Codex apply | 10435 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 64/757 current (693 due, 8.5%) |
| Hourly hot item cadence (<7d) | 64/757 current (693 due, 8.5%) |
| Daily cadence coverage | 2315/3971 current (1656 due, 58.3%) |
| Daily PR cadence | 1847/2747 current (900 due, 67.2%) |
| Daily new issue cadence (<30d) | 468/1224 current (756 due, 38.2%) |
| Weekly older issue cadence | 1836/1837 current (1 due, 99.9%) |
| Due now by cadence | 2742 |

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

Latest review: Apr 28, 2026, 15:47 UTC. Latest close: Apr 28, 2026, 15:48 UTC. Latest comment sync: Apr 28, 2026, 16:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 1 | 398 | 0 |
| Last hour | 578 | 13 | 565 | 0 | 35 | 756 | 3 |
| Last 24 hours | 3625 | 217 | 3408 | 1 | 535 | 1172 | 16 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59909.md) |
| [#59852](https://github.com/openclaw/openclaw/pull/59852) | fix(lsp): clear request timeout on successful response and session dispose | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59852.md) |
| [#59767](https://github.com/openclaw/openclaw/issues/59767) | [Bug]: Voice Wake trigger word matching fails on Mac mini (Mac16,10) macOS 26.2 | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59767.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59767.md) |
| [#59495](https://github.com/openclaw/openclaw/pull/59495) | fix: ensure CLI service operations respect --profile on macOS | already implemented on main | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59495.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59495.md) |
| [#58842](https://github.com/openclaw/openclaw/issues/58842) | [Bug]: model hanging | already implemented on main | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/58842.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58842.md) |
| [#48558](https://github.com/openclaw/openclaw/issues/48558) | Feature Request: Native support for Anthropic Memory Tool (memory_20250818) | belongs on ClawHub | Apr 28, 2026, 15:57 UTC | [records/openclaw-openclaw/closed/48558.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/48558.md) |
| [#57548](https://github.com/openclaw/openclaw/pull/57548) | fix(telegram): persist native command metadata to target sessions | kept open | Apr 28, 2026, 15:47 UTC | [records/openclaw-openclaw/closed/57548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57548.md) |
| [#73636](https://github.com/openclaw/openclaw/issues/73636) | [Bug]: Remote CLI TUI stuck in device-pairing-required loop after device wipe | already implemented on main | Apr 28, 2026, 15:43 UTC | [records/openclaw-openclaw/closed/73636.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73636.md) |
| [#73645](https://github.com/openclaw/openclaw/issues/73645) | [Bug]: sidecars.channels stalls 145–625s on startup due to redundant loadOpenClawPlugins call from shouldSuppressBuiltInModel | already implemented on main | Apr 28, 2026, 15:41 UTC | [records/openclaw-openclaw/closed/73645.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73645.md) |
| [#73634](https://github.com/openclaw/openclaw/issues/73634) | WebChat: Restore browser-based voice input (MediaRecorder / getUserMedia) | duplicate or superseded | Apr 28, 2026, 15:39 UTC | [records/openclaw-openclaw/closed/73634.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73634.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73632](https://github.com/openclaw/openclaw/pull/73632) | fix voice-call SecretRef auth token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73632.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#59337](https://github.com/openclaw/openclaw/issues/59337) | [Feature]: Openclaw nodes run function hopes to be restored | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59337.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#48570](https://github.com/openclaw/openclaw/pull/48570) | feat(whatsapp): add poll, reaction, event, and RSVP message support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/48570.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#73592](https://github.com/openclaw/openclaw/issues/73592) | [Bug]: WSL local gateway binds but WebSocket handshake times out on 2026.4.26 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73592.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#73275](https://github.com/openclaw/openclaw/pull/73275) | fix(plugins): restrict bundled plugin dir resolution to trusted package roots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73275.md) | complete | Apr 28, 2026, 15:47 UTC |
| [#73593](https://github.com/openclaw/openclaw/pull/73593) | fix(cli): clarify infer media provider config errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73593.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#59859](https://github.com/openclaw/openclaw/pull/59859) | feat: cute GTK-native Linux App (#75) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/59859.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#50206](https://github.com/openclaw/openclaw/pull/50206) | feat: add opt-in X-OpenClaw-Agent header for per-agent LLM tracking | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/50206.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#52176](https://github.com/openclaw/openclaw/pull/52176) | feat(docker): add optional uv installation for skills and extensions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52176.md) | complete | Apr 28, 2026, 15:46 UTC |
| [#73647](https://github.com/openclaw/openclaw/issues/73647) | [Bug]: 2026.4.26 Telegram-only gateway spins CPU in channel runtime / staged runtime deps | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73647.md) | complete | Apr 28, 2026, 15:46 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 15:28 UTC

State: Review publish complete

Merged review artifacts for run 25061130507. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25061130507](https://github.com/openclaw/clawsweeper/actions/runs/25061130507)
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
| Hourly cadence coverage | 38/52 current (14 due, 73.1%) |
| Hourly hot item cadence (<7d) | 38/52 current (14 due, 73.1%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 632/632 current (0 due, 100%) |
| Due now by cadence | 22 |

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

Latest review: Apr 28, 2026, 15:27 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 14:24 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 500 | 0 | 500 | 1 | 0 | 0 | 0 |
| Last 24 hours | 916 | 3 | 913 | 1 | 10 | 281 | 0 |

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
| [#1681](https://github.com/openclaw/clawhub/issues/1681) | Bug: Relative reference links in skill documentation resolve to incorrect/malicious URLs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1681.md) | complete | Apr 28, 2026, 15:27 UTC |
| [#1577](https://github.com/openclaw/clawhub/issues/1577) | Plugin search returns 500 Server Error for all queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1577.md) | failed | Apr 28, 2026, 15:26 UTC |
| [#1138](https://github.com/openclaw/clawhub/issues/1138) | False positive: mac-system-stat flagged by VirusTotal for compiling local Swift helpers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1138.md) | complete | Apr 28, 2026, 15:21 UTC |
| [#1712](https://github.com/openclaw/clawhub/issues/1712) | Package stats (downloads/installs) never incremented; skill installs always zero | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1712.md) | complete | Apr 28, 2026, 15:21 UTC |
| [#1424](https://github.com/openclaw/clawhub/issues/1424) | booking-manager skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1424.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#1818](https://github.com/openclaw/clawhub/issues/1818) | False positive: agenttrust-scanner flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1818.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#988](https://github.com/openclaw/clawhub/issues/988) | Skill flagged but marked benign https://clawhub.ai/iamjasonlevin/memelord | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/988.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#875](https://github.com/openclaw/clawhub/issues/875) | Appeal: Clickup Skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/875.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#1787](https://github.com/openclaw/clawhub/issues/1787) | False-positive VT Code Insight flags blocking installs of legitimate trading SDK skills — request trustedPublisher / manual overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1787.md) | complete | Apr 28, 2026, 15:20 UTC |
| [#1797](https://github.com/openclaw/clawhub/issues/1797) | Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1797.md) | complete | Apr 28, 2026, 15:20 UTC |

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
