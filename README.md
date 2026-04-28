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

Last dashboard update: Apr 28, 2026, 14:11 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4429 |
| Open PRs | 3449 |
| Open items total | 7878 |
| Reviewed files | 7471 |
| Unreviewed open items | 407 |
| Due now by cadence | 3267 |
| Proposed closes awaiting apply | 22 |
| Closed by Codex apply | 10360 |
| Failed or stale reviews | 6 |
| Archived closed files | 13551 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6965 | 6565 | 400 | 3207 | 22 | 10357 | Apr 28, 2026, 13:58 UTC | Apr 28, 2026, 13:53 UTC | 703 |
| [ClawHub](https://github.com/openclaw/clawhub) | 913 | 906 | 7 | 60 | 0 | 3 | Apr 28, 2026, 13:39 UTC | Apr 28, 2026, 08:18 UTC | 333 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 28, 2026, 14:11 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25056389587) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 13:41 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25055657387) |

### Fleet Activity

Latest review: Apr 28, 2026, 13:58 UTC. Latest close: Apr 28, 2026, 13:53 UTC. Latest comment sync: Apr 28, 2026, 14:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 332 | 0 |
| Last hour | 873 | 22 | 851 | 1 | 9 | 1036 | 0 |
| Last 24 hours | 3816 | 155 | 3661 | 3 | 461 | 1687 | 12 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73589](https://github.com/openclaw/openclaw/pull/73589) | feat: hardware-aware Gemma 4 setup with auto-provisioning and Docker sandbox | not actionable in this repository | Apr 28, 2026, 14:07 UTC | [records/openclaw-openclaw/closed/73589.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73589.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68651](https://github.com/openclaw/openclaw/pull/68651) | Gateway/config: add models.pricing.enabled to skip pricing bootstrap | already implemented on main | Apr 28, 2026, 14:07 UTC | [records/openclaw-openclaw/closed/68651.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68651.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65010](https://github.com/openclaw/openclaw/pull/65010) | fix: use isActive+isStopped instead of isStreaming for steer message injection | duplicate or superseded | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/65010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65010.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59883](https://github.com/openclaw/openclaw/pull/59883) | feat(acp): retry ACP turns on transient OpenAI/Codex failures | not actionable | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/59883.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59883.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#56369](https://github.com/openclaw/openclaw/issues/56369) | [Bug]: gateway:startup hook fires before channel adapters are ready — message tool fails silently | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/56369.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56369.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55687](https://github.com/openclaw/openclaw/issues/55687) | Bedrock converse-stream: 'Cannot read properties of undefined (reading replace)' crashes agent before API call | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/55687.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55687.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55587](https://github.com/openclaw/openclaw/issues/55587) | gateway status misreports LaunchAgent as not installed during launchctl gaps | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55587.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55587.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73502](https://github.com/openclaw/openclaw/issues/73502) | Bug: active-memory still allowlists memory_search/memory_get, incompatible with bundled memory-lancedb tool surface | closed externally after review | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/73502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73502.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55536](https://github.com/openclaw/openclaw/issues/55536) | Model Circuit Breaker: Auto-disable failing models | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55536.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55223](https://github.com/openclaw/openclaw/pull/55223) | feat(slack): add `suppressAssistantText` config to suppress regular text output | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55223.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 13:58 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55768](https://github.com/openclaw/openclaw/issues/55768) | Health check bloat: uptime monitors must use /health, not /v1/chat/completions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55768.md) | complete | Apr 28, 2026, 13:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73200](https://github.com/openclaw/openclaw/pull/73200) | Reconcile terminal task audit noise | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73200.md) | complete | Apr 28, 2026, 13:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55686](https://github.com/openclaw/openclaw/issues/55686) | [Feature Request] Make command options clickable buttons in Feishu (e.g., /reasoning) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55686.md) | complete | Apr 28, 2026, 13:56 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#61972](https://github.com/openclaw/openclaw/pull/61972) | fix: add baseUrl support for Gemini and xAI web-search/x-search tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61972.md) | complete | Apr 28, 2026, 13:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62655](https://github.com/openclaw/openclaw/issues/62655) | openrouter: duplicate `auto` model in /models picker — bundled plugin id mismatch with pi-ai built-in | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62655.md) | complete | Apr 28, 2026, 13:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55742](https://github.com/openclaw/openclaw/pull/55742) | feat(plugins): inject execute context (agentId) into plugin tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55742.md) | complete | Apr 28, 2026, 13:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58675](https://github.com/openclaw/openclaw/pull/58675) | feat(github-copilot): auto-discover models via /models API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58675.md) | complete | Apr 28, 2026, 13:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64064](https://github.com/openclaw/openclaw/pull/64064) | feat(anthropic): add advisor tool support [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64064.md) | complete | Apr 28, 2026, 13:55 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68647](https://github.com/openclaw/openclaw/pull/68647) | feat: support CORS for Gateway HTTP endpoint: add opt-in CORS config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68647.md) | complete | Apr 28, 2026, 13:55 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 14:11 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 331. Item numbers: 6457,7057,12678,14593,17098,18160,18860,19328,19330,24754,25295,25789,27771,29387,31407,32558,33845,33975,36630,38161,38162,38327,38789,38808,38876,39245,39350,39555,39558,39604,39683,39692,39703,39715,39726,39772,39891,40044,40067,40155,40165,40194,40209,40215,40230,40247,40252,40277,40287,40366,40387,40392,40402,40423,40463,40472,40522,40560,40611,40641,40673,40694,40716,40744,40829,40874,40875,40877,40878,40982,41025,41058,41082,41088,41111,41120,41135,41168,41195,41199,41259,41265,41272,41283,41299,41304,41306,41346,41355,41366,41410,41418,41444,41461,41474,41483,41494,41495,41501,41517,41546,41548,41555,41561,41572,41583,41588,41594,41608,41609,41619,41624,41649,41651,41657,41665,41670,41671,41676,41685,41718,41722,41740,41744,41745,41750,41755,41779,41795,41799,41803,41826,41833,41837,41853,41854,41858,41866,41879,41882,41892,41897,41899,41933,41940,41943,41949,41954,41955,41965,41966,41983,41986,41993,42001,42007,42009,42011,42014,42039,42052,42059,42065,42079,42099,42106,42122,42131,42156,42157,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42301,42303,42304,42317,42322,42327,42330,42351,42354,42361,42381,42391,42402,42408,42424,42425,42452,42461,42476,42482,42510,42539,42541,42542,42571,42585,42592,42606,42611,42617,42631,42636,42637,42646,42650,42651,42663,42674,42675,42677,42683,42690,42707,42713,42715,42729,42771,42802,42809,42810,42820,42837,42841,42843,42847,42858,42862,42873,42898,42904,42908,42936,42952,42962,42998,42999,43005,43006,43009,43015,43020,43028,43061,43064,43068,43097,43145,43151,43165,43195,43211,43216,43253,43260,43276,43292,43367,43454,43456,43469,43500,43658,43832,43950,44144,44423,44441,44614,45315,45342,45344,45374,45383,45393,45421,45449,45454,45465,45523,45535,45594,45602,45612,45613,45626,45664,45673,45677,45683,45684,45704,45712,45739,45760,45783,45784,45831,47877,47892,47922,48293,48328,48373,48588,48589,48615,48637,48666,48877,49308,49962,49996,50206,50737,50968,50975,51005,51067,51091,51268,51270,51486,51556,52026,52278,52912,53779,53821,53961,53997,54116,54141,54414,54471,54526,54562,54574,54585,54655,54716,54725,54756,54759,54803,54805,54821,54830,54838,54874,54899,54927,54934,54939,54962,54967,54979,54985,55139,55160,55171,55224,55235,55321,55341,55347,55349,55351,55363,55366,55390,55412,55424,55450,55458,55480,55485,55507,55512,55517,55518,55519,55521,55536,55542,55549,55564,55573,55576,55587,55596,55644,55645,55684,55686,55687,55688,55694,55705,55726,55734,55735,55742,55768,55788,55801,55810,55815,55817,55826,55830,55836,55861,55878,55897,55942,56068,56133,56174,56196,56369,58186,58675,58735,59693,59801,59883,59949,60815,60860,60922,61242,61306,61335,61624,61709,61972,62195,62428,62655,62801,63113,63176,63302,63407,63557,63662,63827,64064,64335,64907,64917,64920,65010,65221,65222,65229,66419,66687,66988,67128,67717,67846,67983,68089,68325,68567,68621,68622,68624,68647,68651,68889,70628,72285,73200,73323,73376,73533,73534,73549,73550,73551,73560.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25056389587](https://github.com/openclaw/clawsweeper/actions/runs/25056389587)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3554 |
| Open PRs | 3411 |
| Open items total | 6965 |
| Reviewed files | 6565 |
| Unreviewed open items | 400 |
| Archived closed files | 13516 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3369 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3172 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6541 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10380 |
| Failed or stale reviews | 4 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 54/704 current (650 due, 7.7%) |
| Hourly hot item cadence (<7d) | 54/704 current (650 due, 7.7%) |
| Daily cadence coverage | 1860/4016 current (2156 due, 46.3%) |
| Daily PR cadence | 1561/2783 current (1222 due, 56.1%) |
| Daily new issue cadence (<30d) | 299/1233 current (934 due, 24.2%) |
| Weekly older issue cadence | 1844/1845 current (1 due, 99.9%) |
| Due now by cadence | 3207 |

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

Latest review: Apr 28, 2026, 13:58 UTC. Latest close: Apr 28, 2026, 13:53 UTC. Latest comment sync: Apr 28, 2026, 14:11 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 332 | 0 |
| Last hour | 850 | 22 | 828 | 0 | 9 | 703 | 0 |
| Last 24 hours | 2900 | 152 | 2748 | 1 | 451 | 906 | 12 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73589](https://github.com/openclaw/openclaw/pull/73589) | feat: hardware-aware Gemma 4 setup with auto-provisioning and Docker sandbox | not actionable in this repository | Apr 28, 2026, 14:07 UTC | [records/openclaw-openclaw/closed/73589.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73589.md) |
| [#68651](https://github.com/openclaw/openclaw/pull/68651) | Gateway/config: add models.pricing.enabled to skip pricing bootstrap | already implemented on main | Apr 28, 2026, 14:07 UTC | [records/openclaw-openclaw/closed/68651.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68651.md) |
| [#65010](https://github.com/openclaw/openclaw/pull/65010) | fix: use isActive+isStopped instead of isStreaming for steer message injection | duplicate or superseded | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/65010.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65010.md) |
| [#59883](https://github.com/openclaw/openclaw/pull/59883) | feat(acp): retry ACP turns on transient OpenAI/Codex failures | not actionable | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/59883.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59883.md) |
| [#56369](https://github.com/openclaw/openclaw/issues/56369) | [Bug]: gateway:startup hook fires before channel adapters are ready — message tool fails silently | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/56369.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/56369.md) |
| [#55687](https://github.com/openclaw/openclaw/issues/55687) | Bedrock converse-stream: 'Cannot read properties of undefined (reading replace)' crashes agent before API call | already implemented on main | Apr 28, 2026, 14:04 UTC | [records/openclaw-openclaw/closed/55687.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55687.md) |
| [#55587](https://github.com/openclaw/openclaw/issues/55587) | gateway status misreports LaunchAgent as not installed during launchctl gaps | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55587.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55587.md) |
| [#73502](https://github.com/openclaw/openclaw/issues/73502) | Bug: active-memory still allowlists memory_search/memory_get, incompatible with bundled memory-lancedb tool surface | closed externally after review | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/73502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73502.md) |
| [#55536](https://github.com/openclaw/openclaw/issues/55536) | Model Circuit Breaker: Auto-disable failing models | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55536.md) |
| [#55223](https://github.com/openclaw/openclaw/pull/55223) | feat(slack): add `suppressAssistantText` config to suppress regular text output | already implemented on main | Apr 28, 2026, 14:03 UTC | [records/openclaw-openclaw/closed/55223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/55223.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73583](https://github.com/openclaw/openclaw/pull/73583) | Fix Telegram status and group reply delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73583.md) | complete | Apr 28, 2026, 13:58 UTC |
| [#55768](https://github.com/openclaw/openclaw/issues/55768) | Health check bloat: uptime monitors must use /health, not /v1/chat/completions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55768.md) | complete | Apr 28, 2026, 13:56 UTC |
| [#73200](https://github.com/openclaw/openclaw/pull/73200) | Reconcile terminal task audit noise | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73200.md) | complete | Apr 28, 2026, 13:56 UTC |
| [#55686](https://github.com/openclaw/openclaw/issues/55686) | [Feature Request] Make command options clickable buttons in Feishu (e.g., /reasoning) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55686.md) | complete | Apr 28, 2026, 13:56 UTC |
| [#61972](https://github.com/openclaw/openclaw/pull/61972) | fix: add baseUrl support for Gemini and xAI web-search/x-search tools | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61972.md) | complete | Apr 28, 2026, 13:55 UTC |
| [#62655](https://github.com/openclaw/openclaw/issues/62655) | openrouter: duplicate `auto` model in /models picker — bundled plugin id mismatch with pi-ai built-in | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62655.md) | complete | Apr 28, 2026, 13:55 UTC |
| [#55742](https://github.com/openclaw/openclaw/pull/55742) | feat(plugins): inject execute context (agentId) into plugin tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55742.md) | complete | Apr 28, 2026, 13:55 UTC |
| [#58675](https://github.com/openclaw/openclaw/pull/58675) | feat(github-copilot): auto-discover models via /models API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/58675.md) | complete | Apr 28, 2026, 13:55 UTC |
| [#64064](https://github.com/openclaw/openclaw/pull/64064) | feat(anthropic): add advisor tool support [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64064.md) | complete | Apr 28, 2026, 13:55 UTC |
| [#68647](https://github.com/openclaw/openclaw/pull/68647) | feat: support CORS for Gateway HTTP endpoint: add opt-in CORS config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68647.md) | complete | Apr 28, 2026, 13:55 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 13:41 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1480,1483,1535,1538,1568,1595,1639,1649,1653,1662,1671,1690,1691,1692,1717,1720,1735,1746,1748,1788.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25055657387](https://github.com/openclaw/clawsweeper/actions/runs/25055657387)
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
| Fresh reviewed issues in the last 7 days | 872 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 32 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 904 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 3 |
| Failed or stale reviews | 2 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 2/53 current (51 due, 3.8%) |
| Hourly hot item cadence (<7d) | 2/53 current (51 due, 3.8%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 630/631 current (1 due, 99.8%) |
| Due now by cadence | 60 |

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

Latest review: Apr 28, 2026, 13:39 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 13:41 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 23 | 0 | 23 | 1 | 0 | 333 | 0 |
| Last 24 hours | 916 | 3 | 913 | 2 | 10 | 781 | 0 |

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
| [#1653](https://github.com/openclaw/clawhub/issues/1653) | add skill: robert0812/maton-browse-plan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1653.md) | failed | Apr 28, 2026, 13:39 UTC |
| [#1864](https://github.com/openclaw/clawhub/pull/1864) | feat(schema): include .r files in text whitelist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1864.md) | complete | Apr 28, 2026, 13:32 UTC |
| [#1788](https://github.com/openclaw/clawhub/issues/1788) | False Positive - Liuyao Skill Flagged as Suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1788.md) | complete | Apr 28, 2026, 13:31 UTC |
| [#1692](https://github.com/openclaw/clawhub/issues/1692) | Skill flagged as suspicious - OpenCawl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1692.md) | complete | Apr 28, 2026, 13:31 UTC |
| [#1538](https://github.com/openclaw/clawhub/issues/1538) | clawhub dashboard is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1538.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1691](https://github.com/openclaw/clawhub/issues/1691) | Skill flagged as suspicious--tech-write-assist | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1691.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1748](https://github.com/openclaw/clawhub/issues/1748) | False positive security flag on skill: zim (v3.0.2) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1748.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1746](https://github.com/openclaw/clawhub/issues/1746) | ExpertLens incorrectly flagged as Suspicious — expected patterns for behavior-modification skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1746.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1671](https://github.com/openclaw/clawhub/issues/1671) | Request for Security Re-evaluation: \"book-companion\" skill marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1671.md) | complete | Apr 28, 2026, 13:30 UTC |
| [#1717](https://github.com/openclaw/clawhub/issues/1717) | Bug: /api/auth/signin/github returns HTTP 500 — GitHub OAuth broken, no new tokens can be generated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1717.md) | complete | Apr 28, 2026, 13:30 UTC |

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
