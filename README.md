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

Last dashboard update: Apr 29, 2026, 00:57 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4399 |
| Open PRs | 3466 |
| Open items total | 7865 |
| Reviewed files | 7470 |
| Unreviewed open items | 395 |
| Due now by cadence | 2067 |
| Proposed closes awaiting apply | 2 |
| Closed by Codex apply | 10600 |
| Failed or stale reviews | 18 |
| Archived closed files | 13857 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6949 | 6560 | 389 | 2019 | 2 | 10595 | Apr 29, 2026, 00:43 UTC | Apr 29, 2026, 00:43 UTC | 970 |
| [ClawHub](https://github.com/openclaw/clawhub) | 916 | 910 | 6 | 48 | 0 | 5 | Apr 29, 2026, 00:42 UTC | Apr 29, 2026, 00:32 UTC | 527 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 00:57 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25084492060) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 00:31 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25083357498) |

### Fleet Activity

Latest review: Apr 29, 2026, 00:43 UTC. Latest close: Apr 29, 2026, 00:43 UTC. Latest comment sync: Apr 29, 2026, 00:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 0 | 4 | 0 | 1 | 471 | 0 |
| Last hour | 994 | 5 | 989 | 12 | 14 | 1497 | 1 |
| Last 24 hours | 6460 | 381 | 6079 | 15 | 786 | 2262 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65178](https://github.com/openclaw/openclaw/pull/65178) | fix: case-insensitive model lookup for image support resolution | closed externally after review | Apr 29, 2026, 00:43 UTC | [records/openclaw-openclaw/closed/65178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65178.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73851](https://github.com/openclaw/openclaw/pull/73851) | Fix heartbeat exec-event routing and Telegram thread retry coverage | closed externally after review | Apr 29, 2026, 00:40 UTC | [records/openclaw-openclaw/closed/73851.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73851.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62191](https://github.com/openclaw/openclaw/pull/62191) | fix(imessage): strip U+FFFD garbage chars from echo text key normalization | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/62191.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62191.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50479](https://github.com/openclaw/openclaw/pull/50479) | fix(install.sh): warn about .npmrc prefix override and sudo npm incom… | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/50479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50479.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73872](https://github.com/openclaw/openclaw/pull/73872) | Route sensitive group commands to the owner privately | closed externally after review | Apr 29, 2026, 00:27 UTC | [records/openclaw-openclaw/closed/73872.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73872.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73879](https://github.com/openclaw/openclaw/issues/73879) | Heartbeat / cron / exec wakeups submit empty user prompt to model providers in 4.25, causing 400 INVALID_ARGUMENT on Vertex/Gemini | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73879.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73881](https://github.com/openclaw/openclaw/issues/73881) | openclaw infer model run (without --gateway) hangs indefinitely on 4.26; same prompt completes immediately in 4.25 | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73881.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64485](https://github.com/openclaw/openclaw/pull/64485) | fix(docker): add config dir defaults to prevent broken volume mounts | closed externally after review | Apr 29, 2026, 00:12 UTC | [records/openclaw-openclaw/closed/64485.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64485.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42675](https://github.com/openclaw/openclaw/pull/42675) | fix(discord): throw error when fetchUser(@me) fails to prevent security bypass | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/42675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42675.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71582.md) | complete | Apr 29, 2026, 00:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#43190](https://github.com/openclaw/openclaw/pull/43190) | MS Teams: add channel archive persistence and deleted-channel cleanup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/43190.md) | complete | Apr 29, 2026, 00:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68262](https://github.com/openclaw/openclaw/pull/68262) | fix: source-tag internal prompts to hide them from chat history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68262.md) | complete | Apr 29, 2026, 00:42 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1874.md) | complete | Apr 29, 2026, 00:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73846](https://github.com/openclaw/openclaw/issues/73846) | Docker/Unraid: 2026.4.24 and 2026.4.25 gateway never becomes healthy; doctor --fix does not recover, 2026.4.26 doctor still hangs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73846.md) | complete | Apr 29, 2026, 00:42 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64956](https://github.com/openclaw/openclaw/pull/64956) | fix: dedupe session summaries by session id | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64956.md) | complete | Apr 29, 2026, 00:41 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73711](https://github.com/openclaw/openclaw/pull/73711) | feat(chat/ios): photos-picker-style attachment thumbnails with persistent add-more tile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73711.md) | complete | Apr 29, 2026, 00:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64963](https://github.com/openclaw/openclaw/pull/64963) | fix(heartbeat): skip heartbeat execution while a reply run is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64963.md) | complete | Apr 29, 2026, 00:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73892](https://github.com/openclaw/openclaw/pull/73892) | fix(agents/process): honor AbortSignal in process.poll busy-wait loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73892.md) | complete | Apr 29, 2026, 00:39 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52421](https://github.com/openclaw/openclaw/issues/52421) | LLM API error: unexpected tool_use_id in tool_result blocks causes session disruption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52421.md) | complete | Apr 29, 2026, 00:39 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 00:57 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 467. Item numbers: 6457,6599,6615,6792,6946,7057,7338,7359,7379,7403,7406,7424,7433,7456,7524,7540,7575,7629,7648,7669,7707,7817,8081,8130,8176,8190,8287,8299,8321,8355,8441,8582,8635,8719,8892,8959,8969,8972,9016,9120,9132,9409,9443,9546,9656,9658,9797,9820,9987,10118,10142,10253,10737,10957,11172,11301,11460,11487,11676,11894,12163,12394,12429,12507,12578,12590,12736,12855,12911,13225,13239,13364,13597,13607,13610,13670,13962,13968,14051,14407,14619,15022,15032,15591,15634,16035,16351,16711,17098,17211,17217,17311,17684,18160,18860,19328,19330,19362,19482,25222,25295,25789,27771,30529,31407,32558,33329,33845,34528,35119,35152,35208,35241,36614,36687,36967,37625,37804,38162,38170,38237,38249,38302,38327,38420,38458,38633,38687,38691,38713,38789,38876,39037,39115,39127,39137,39138,39232,39245,39248,39350,39413,39476,39487,39489,39497,39505,39507,39523,39551,39554,39555,39558,39581,39583,39585,39588,39589,39597,39644,39653,39685,39715,39722,39739,39745,39772,39780,39790,39806,39847,39857,39870,39913,39963,39970,39975,39996,39999,40039,40165,40209,40215,40314,40366,40423,40560,41152,41199,41222,41272,41299,41304,41355,41410,41484,41546,41657,41671,41685,41745,42304,42400,42895,42908,42999,43068,43340,44167,45613,45758,47631,47687,48187,48220,48300,48708,48745,48757,48947,49751,49914,49983,50178,50479,50522,50694,50802,50996,51028,51040,51041,51049,51054,51057,51073,51088,51091,51104,51133,51184,51186,51205,51245,51251,51264,51287,51299,51336,51349,51350,51363,51377,51386,51393,51394,51395,51396,51399,51421,51429,51441,51458,51497,51511,51534,51549,51572,51586,51587,51593,51602,51620,51628,51644,51654,51660,51664,51667,51689,51694,51805,51825,51828,51832,51857,51865,51871,51872,51881,51892,51903,51911,51918,51964,51977,52029,52045,52046,52073,52092,52105,52130,52146,52147,52161,52184,52186,52201,52238,52254,52266,52286,52288,52305,52313,52353,52365,52373,52382,52384,52385,52396,52421,52442,52473,52496,52498,52500,52510,52511,52526,52540,52568,52573,52577,52596,52618,52648,52662,52665,52732,52736,52757,52789,52793,52802,52803,52826,52849,52859,52934,52948,52951,52960,52997,53289,53578,53920,54306,54409,54475,54564,54669,54749,54797,54798,55291,55886,55923,55978,56791,56815,56923,57017,57169,57298,57308,57594,57970,58110,58216,58333,59068,59077,59287,59697,59752,59859,59920,60248,60527,60677,60826,61278,61315,61675,62191,62308,62310,62863,63162,63272,63375,63471,63476,63491,63561,63719,63743,63793,63897,63915,64060,64080,64110,64630,64673,64712,64731,64956,64963,64980,65198,65287,65381,65437,65505,65583,65649,65730,65736,65902,66000,66001,66169,66187,66241,66247,66406,66443,66478,66485,66502,66656,66712,66735,66759,66983,67004,67235,67243,67579,67610,67652,68341,70156,71142,71796,71856,72154,72645,73376,73566,73581,73609,73614,73619,73620,73632,73655,73664,73674,73700,73710,73711,73715,73720,73743,73754,73755,73758,73769,73772,73775,73777,73779,73817,73834,73835,73839,73841,73844,73845,73846,73847,73849,73850,73851,73855.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25084492060](https://github.com/openclaw/clawsweeper/actions/runs/25084492060)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3523 |
| Open PRs | 3426 |
| Open items total | 6949 |
| Reviewed files | 6560 |
| Unreviewed open items | 389 |
| Archived closed files | 13842 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3336 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3213 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6549 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10595 |
| Failed or stale reviews | 11 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 80/882 current (802 due, 9.1%) |
| Hourly hot item cadence (<7d) | 80/882 current (802 due, 9.1%) |
| Daily cadence coverage | 3035/3860 current (825 due, 78.6%) |
| Daily PR cadence | 2257/2701 current (444 due, 83.6%) |
| Daily new issue cadence (<30d) | 778/1159 current (381 due, 67.1%) |
| Weekly older issue cadence | 1815/1818 current (3 due, 99.8%) |
| Due now by cadence | 2019 |

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

Latest review: Apr 29, 2026, 00:43 UTC. Latest close: Apr 29, 2026, 00:43 UTC. Latest comment sync: Apr 29, 2026, 00:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 0 | 3 | 0 | 1 | 470 | 0 |
| Last hour | 564 | 5 | 559 | 5 | 13 | 970 | 1 |
| Last 24 hours | 5535 | 378 | 5157 | 8 | 771 | 1420 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#65178](https://github.com/openclaw/openclaw/pull/65178) | fix: case-insensitive model lookup for image support resolution | closed externally after review | Apr 29, 2026, 00:43 UTC | [records/openclaw-openclaw/closed/65178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65178.md) |
| [#73851](https://github.com/openclaw/openclaw/pull/73851) | Fix heartbeat exec-event routing and Telegram thread retry coverage | closed externally after review | Apr 29, 2026, 00:40 UTC | [records/openclaw-openclaw/closed/73851.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73851.md) |
| [#62191](https://github.com/openclaw/openclaw/pull/62191) | fix(imessage): strip U+FFFD garbage chars from echo text key normalization | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/62191.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62191.md) |
| [#50479](https://github.com/openclaw/openclaw/pull/50479) | fix(install.sh): warn about .npmrc prefix override and sudo npm incom… | closed externally after review | Apr 29, 2026, 00:34 UTC | [records/openclaw-openclaw/closed/50479.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50479.md) |
| [#73872](https://github.com/openclaw/openclaw/pull/73872) | Route sensitive group commands to the owner privately | closed externally after review | Apr 29, 2026, 00:27 UTC | [records/openclaw-openclaw/closed/73872.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73872.md) |
| [#73879](https://github.com/openclaw/openclaw/issues/73879) | Heartbeat / cron / exec wakeups submit empty user prompt to model providers in 4.25, causing 400 INVALID_ARGUMENT on Vertex/Gemini | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73879.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73879.md) |
| [#73881](https://github.com/openclaw/openclaw/issues/73881) | openclaw infer model run (without --gateway) hangs indefinitely on 4.26; same prompt completes immediately in 4.25 | already implemented on main | Apr 29, 2026, 00:13 UTC | [records/openclaw-openclaw/closed/73881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73881.md) |
| [#64485](https://github.com/openclaw/openclaw/pull/64485) | fix(docker): add config dir defaults to prevent broken volume mounts | closed externally after review | Apr 29, 2026, 00:12 UTC | [records/openclaw-openclaw/closed/64485.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64485.md) |
| [#42675](https://github.com/openclaw/openclaw/pull/42675) | fix(discord): throw error when fetchUser(@me) fails to prevent security bypass | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/42675.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42675.md) |
| [#40536](https://github.com/openclaw/openclaw/issues/40536) | [Feature]: Per-Skill Model Override | duplicate or superseded | Apr 29, 2026, 00:08 UTC | [records/openclaw-openclaw/closed/40536.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/40536.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71582.md) | complete | Apr 29, 2026, 00:43 UTC |
| [#43190](https://github.com/openclaw/openclaw/pull/43190) | MS Teams: add channel archive persistence and deleted-channel cleanup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/43190.md) | complete | Apr 29, 2026, 00:43 UTC |
| [#68262](https://github.com/openclaw/openclaw/pull/68262) | fix: source-tag internal prompts to hide them from chat history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68262.md) | complete | Apr 29, 2026, 00:42 UTC |
| [#73846](https://github.com/openclaw/openclaw/issues/73846) | Docker/Unraid: 2026.4.24 and 2026.4.25 gateway never becomes healthy; doctor --fix does not recover, 2026.4.26 doctor still hangs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73846.md) | complete | Apr 29, 2026, 00:42 UTC |
| [#64956](https://github.com/openclaw/openclaw/pull/64956) | fix: dedupe session summaries by session id | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64956.md) | complete | Apr 29, 2026, 00:41 UTC |
| [#73711](https://github.com/openclaw/openclaw/pull/73711) | feat(chat/ios): photos-picker-style attachment thumbnails with persistent add-more tile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73711.md) | complete | Apr 29, 2026, 00:40 UTC |
| [#64963](https://github.com/openclaw/openclaw/pull/64963) | fix(heartbeat): skip heartbeat execution while a reply run is active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64963.md) | complete | Apr 29, 2026, 00:39 UTC |
| [#73892](https://github.com/openclaw/openclaw/pull/73892) | fix(agents/process): honor AbortSignal in process.poll busy-wait loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73892.md) | complete | Apr 29, 2026, 00:39 UTC |
| [#52421](https://github.com/openclaw/openclaw/issues/52421) | LLM API error: unexpected tool_use_id in tool_result blocks causes session disruption | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52421.md) | complete | Apr 29, 2026, 00:39 UTC |
| [#61675](https://github.com/openclaw/openclaw/pull/61675) | feat: fire session reset hooks for daily and idle resets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/61675.md) | complete | Apr 29, 2026, 00:38 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 00:31 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 427. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,65,72,79,84,86,88,95,97,99,100,102,115,117,120,127,128,129,131,134,137,151,156,162,169,170,171,173,174,178,184,192,208,211,224,225,226,228,231,234,236,237,238,243,248,256,265,268,275,277,279,284,287,288,290,314,321,323,328,329,330,337,340,345,348,349,351,353,364,367,369,371,373,374,378,379,380,382,385,386,387,388,392,393,397,402,406,410,420,424,425,426,437,438,442,443,447,448,449,450,451,454,455,459,463,469,471,474,478,479,480,481,482,484,485,487,488,489,494,495,498,503,504,509,516,528,531,532,539,541,549,553,563,566,567,568,573,574,575,576,579,580,581,586,589,593,604,606,609,613,614,615,618,619,621,625,630,631,635,636,637,642,645,646,647,650,651,652,653,654,655,656,657,658,661,662,664,666,667,669,670,672,673,674,675,676,678,679,680,681,683,686,692,694,699,700,701,705,706,707,708,711,712,713,716,717,718,722,729,730,731,733,734,737,740,745,747,752,755,756,758,760,761,762,764,765,767,768,769,770,779,780,782,784,785,789,791,792,794,800,804,807,808,809,811,816,817,819,822,823,824,834,835,838,845,846,847,848,849,850,851,852,853,854,856,858,860,861,862,863,865,867,868,869,870,871,873,874,875,876,878,879,880,881,882,883,886,887,889,890,892,895,896,897,899,900,901,903,904,906,907,908,909,910,911,912,913,914,915,917,920,921,922,923,925,927,928,930,932,933,935,936,937,938,939,940,941,943,946,951,952,954,958,959,960,962,963,966,967,969,970,971,972,974,975,984,985,987,989,990,992,1003,1007,1010,1024,1026,1028,1033,1035,1038,1039,1044,1054,1063,1069,1083,1102,1107,1109,1118,1120,1121,1124,1128,1142,1147,1155,1169,1186,1193,1197,1204,1206,1222,1227,1228,1398,1403,1553,1581,1589,1591,1649,1718,1743,1751,1768,1771,1772,1783,1787,1789,1797,1815,1818,1819,1821,1823,1824,1828,1833,1849,1857,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25083357498](https://github.com/openclaw/clawsweeper/actions/runs/25083357498)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 876 |
| Open PRs | 40 |
| Open items total | 916 |
| Reviewed files | 910 |
| Unreviewed open items | 6 |
| Archived closed files | 15 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 869 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 903 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 5 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 19/54 current (35 due, 35.2%) |
| Hourly hot item cadence (<7d) | 19/54 current (35 due, 35.2%) |
| Daily cadence coverage | 221/222 current (1 due, 99.5%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/201 current (1 due, 99.5%) |
| Weekly older issue cadence | 628/634 current (6 due, 99.1%) |
| Due now by cadence | 48 |

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

Latest review: Apr 29, 2026, 00:42 UTC. Latest close: Apr 29, 2026, 00:32 UTC. Latest comment sync: Apr 29, 2026, 00:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 1 | 0 |
| Last hour | 430 | 0 | 430 | 7 | 1 | 527 | 0 |
| Last 24 hours | 925 | 3 | 922 | 7 | 15 | 842 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |
| [#1517](https://github.com/openclaw/clawhub/issues/1517) | [Appeal] Skill Wrongly Flagged: abu-shotai/ai-video-remix | closed externally after review | Apr 28, 2026, 07:43 UTC | [records/openclaw-clawhub/closed/1517.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1517.md) |
| [#125](https://github.com/openclaw/clawhub/issues/125) | New Provider Plugin: ClawRouter — 30+ models, smart routing, x402 payments | closed externally after review | Apr 28, 2026, 06:41 UTC | [records/openclaw-clawhub/closed/125.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/125.md) |
| [#1699](https://github.com/openclaw/clawhub/issues/1699) | Plugin search returns 500, and plugin catalog breaks after page 2 | closed externally after review | Apr 28, 2026, 05:46 UTC | [records/openclaw-clawhub/closed/1699.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1699.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1874.md) | complete | Apr 29, 2026, 00:42 UTC |
| [#1589](https://github.com/openclaw/clawhub/issues/1589) | [Security] wechat-helper: unvalidated $MESSAGE passed directly to browser automation tool | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1589.md) | failed | Apr 29, 2026, 00:19 UTC |
| [#1860](https://github.com/openclaw/clawhub/pull/1860) | docs: document trademark takedown reports | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1860.md) | complete | Apr 29, 2026, 00:19 UTC |
| [#1228](https://github.com/openclaw/clawhub/issues/1228) | Theme toggle: re-enable switching between system, light, and dark modes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1228.md) | complete | Apr 29, 2026, 00:17 UTC |
| [#863](https://github.com/openclaw/clawhub/issues/863) | False positive security scan: bria-ai skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/863.md) | complete | Apr 29, 2026, 00:17 UTC |
| [#959](https://github.com/openclaw/clawhub/issues/959) | spider: skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/959.md) | complete | Apr 29, 2026, 00:17 UTC |
| [#914](https://github.com/openclaw/clawhub/issues/914) | False positive: zalo-agent skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/914.md) | complete | Apr 29, 2026, 00:16 UTC |
| [#642](https://github.com/openclaw/clawhub/issues/642) | False Positive — Skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/642.md) | complete | Apr 29, 2026, 00:16 UTC |
| [#782](https://github.com/openclaw/clawhub/issues/782) | False positive: clawsy flagged as suspicious — v0.9.35 is docs-only (zero executable code) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/782.md) | complete | Apr 29, 2026, 00:16 UTC |
| [#1063](https://github.com/openclaw/clawhub/issues/1063) | False positive: freeguard-setup skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1063.md) | complete | Apr 29, 2026, 00:16 UTC |

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
