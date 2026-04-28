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

Last dashboard update: Apr 28, 2026, 16:34 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4428 |
| Open PRs | 3448 |
| Open items total | 7876 |
| Reviewed files | 7482 |
| Unreviewed open items | 394 |
| Due now by cadence | 2752 |
| Proposed closes awaiting apply | 2 |
| Closed by Codex apply | 10456 |
| Failed or stale reviews | 6 |
| Archived closed files | 13629 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6962 | 6575 | 387 | 2706 | 2 | 10453 | Apr 28, 2026, 16:31 UTC | Apr 28, 2026, 16:31 UTC | 892 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 46 | 0 | 3 | Apr 28, 2026, 16:21 UTC | Apr 28, 2026, 08:18 UTC | 1 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review in progress | Apr 28, 2026, 16:34 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25063794892) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 28, 2026, 16:22 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25064003364) |

### Fleet Activity

Latest review: Apr 28, 2026, 16:31 UTC. Latest close: Apr 28, 2026, 16:31 UTC. Latest comment sync: Apr 28, 2026, 16:32 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 43 | 6 | 37 | 0 | 7 | 429 | 0 |
| Last hour | 947 | 17 | 930 | 1 | 21 | 893 | 0 |
| Last 24 hours | 4576 | 231 | 4345 | 2 | 561 | 1144 | 15 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73670](https://github.com/openclaw/openclaw/issues/73670) | [Bug]: Mac App overwrites user config fields on save, removing existing entries | already implemented on main | Apr 28, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/73670.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73670.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59075](https://github.com/openclaw/openclaw/pull/59075) | feat(desktop): add Tauri desktop companion MVP | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/59075.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59075.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#58021](https://github.com/openclaw/openclaw/issues/58021) | Feature: `transform_tool_result` plugin hook for modifying tool results before model context | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/58021.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58021.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57756](https://github.com/openclaw/openclaw/issues/57756) | [Bug]: session-key-based session access is not scoped to the calling operator client/device | not actionable in this repository | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/57756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57756.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73665](https://github.com/openclaw/openclaw/issues/73665) | Image optimization regression after 2026.4.26: MiniMax-M2.7 image understanding fails with 'Failed to optimize image' | already implemented on main | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73665.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73666](https://github.com/openclaw/openclaw/issues/73666) | [Bug]：TUI enters infinite reconnect loop on WebSocket close (code 1006) | duplicate or superseded | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73666.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73666.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73661](https://github.com/openclaw/openclaw/issues/73661) | [Bug]:TUI cannot connect to gateway after version mismatch (device identity required) | already implemented on main | Apr 28, 2026, 16:17 UTC | [records/openclaw-openclaw/closed/73661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73661.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | closed externally after review | Apr 28, 2026, 16:00 UTC | [records/openclaw-openclaw/closed/73264.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73264.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59909.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67403](https://github.com/openclaw/openclaw/pull/67403) | fix(memory-wiki): support token-overlap search for multi-term queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67403.md) | complete | Apr 28, 2026, 16:31 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73672](https://github.com/openclaw/openclaw/pull/73672) | Fix native slash command replies in groups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73672.md) | complete | Apr 28, 2026, 16:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73671.md) | complete | Apr 28, 2026, 16:30 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73627](https://github.com/openclaw/openclaw/pull/73627) | fix(sandbox): explicitly pass sandboxSessionKey to prevent Docker probes when mode is off (#73586) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73627.md) | complete | Apr 28, 2026, 16:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 16:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 16:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42637](https://github.com/openclaw/openclaw/pull/42637) | fix(skills): list omitted skill names when prompt is truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42637.md) | complete | Apr 28, 2026, 16:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73405.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#34581](https://github.com/openclaw/openclaw/pull/34581) | fix(msteams): handle invalid JSON escape sequences in Bot Framework activities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34581.md) | complete | Apr 28, 2026, 16:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73641](https://github.com/openclaw/openclaw/pull/73641) | fix(telegram): use agent's own default model for Telegram model list check mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73641.md) | complete | Apr 28, 2026, 16:26 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 16:34 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25063794892](https://github.com/openclaw/clawsweeper/actions/runs/25063794892)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3552 |
| Open PRs | 3410 |
| Open items total | 6962 |
| Reviewed files | 6575 |
| Unreviewed open items | 387 |
| Archived closed files | 13619 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3376 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3194 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6570 |
| Proposed closes awaiting apply | 2 (0% of fresh reviews) |
| Closed by Codex apply | 10453 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 114/778 current (664 due, 14.7%) |
| Hourly hot item cadence (<7d) | 114/778 current (664 due, 14.7%) |
| Daily cadence coverage | 2304/3958 current (1654 due, 58.2%) |
| Daily PR cadence | 1844/2742 current (898 due, 67.3%) |
| Daily new issue cadence (<30d) | 460/1216 current (756 due, 37.8%) |
| Weekly older issue cadence | 1838/1839 current (1 due, 99.9%) |
| Due now by cadence | 2706 |

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

Latest review: Apr 28, 2026, 16:31 UTC. Latest close: Apr 28, 2026, 16:31 UTC. Latest comment sync: Apr 28, 2026, 16:32 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 41 | 6 | 35 | 0 | 7 | 429 | 0 |
| Last hour | 673 | 17 | 656 | 0 | 21 | 892 | 0 |
| Last 24 hours | 3659 | 228 | 3431 | 1 | 551 | 1134 | 15 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73670](https://github.com/openclaw/openclaw/issues/73670) | [Bug]: Mac App overwrites user config fields on save, removing existing entries | already implemented on main | Apr 28, 2026, 16:31 UTC | [records/openclaw-openclaw/closed/73670.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73670.md) |
| [#73669](https://github.com/openclaw/openclaw/pull/73669) | fix(telegram): restore sticky IPv4 fallback when grammY wraps transpo… | duplicate or superseded | Apr 28, 2026, 16:28 UTC | [records/openclaw-openclaw/closed/73669.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73669.md) |
| [#59075](https://github.com/openclaw/openclaw/pull/59075) | feat(desktop): add Tauri desktop companion MVP | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/59075.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59075.md) |
| [#58021](https://github.com/openclaw/openclaw/issues/58021) | Feature: `transform_tool_result` plugin hook for modifying tool results before model context | duplicate or superseded | Apr 28, 2026, 16:27 UTC | [records/openclaw-openclaw/closed/58021.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/58021.md) |
| [#57756](https://github.com/openclaw/openclaw/issues/57756) | [Bug]: session-key-based session access is not scoped to the calling operator client/device | not actionable in this repository | Apr 28, 2026, 16:26 UTC | [records/openclaw-openclaw/closed/57756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57756.md) |
| [#73665](https://github.com/openclaw/openclaw/issues/73665) | Image optimization regression after 2026.4.26: MiniMax-M2.7 image understanding fails with 'Failed to optimize image' | already implemented on main | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73665.md) |
| [#73666](https://github.com/openclaw/openclaw/issues/73666) | [Bug]：TUI enters infinite reconnect loop on WebSocket close (code 1006) | duplicate or superseded | Apr 28, 2026, 16:24 UTC | [records/openclaw-openclaw/closed/73666.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73666.md) |
| [#73661](https://github.com/openclaw/openclaw/issues/73661) | [Bug]:TUI cannot connect to gateway after version mismatch (device identity required) | already implemented on main | Apr 28, 2026, 16:17 UTC | [records/openclaw-openclaw/closed/73661.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73661.md) |
| [#73264](https://github.com/openclaw/openclaw/pull/73264) | fix(security): prevent workspace PATH injection via service env and trash helpers | closed externally after review | Apr 28, 2026, 16:00 UTC | [records/openclaw-openclaw/closed/73264.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73264.md) |
| [#59909](https://github.com/openclaw/openclaw/issues/59909) | Add TUI footer display configuration options | duplicate or superseded | Apr 28, 2026, 15:58 UTC | [records/openclaw-openclaw/closed/59909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59909.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67403](https://github.com/openclaw/openclaw/pull/67403) | fix(memory-wiki): support token-overlap search for multi-term queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67403.md) | complete | Apr 28, 2026, 16:31 UTC |
| [#73672](https://github.com/openclaw/openclaw/pull/73672) | Fix native slash command replies in groups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73672.md) | complete | Apr 28, 2026, 16:30 UTC |
| [#73671](https://github.com/openclaw/openclaw/pull/73671) | fix(sandbox): gracefully handle Docker daemon unavailability when sandbox mode is off | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73671.md) | complete | Apr 28, 2026, 16:30 UTC |
| [#73627](https://github.com/openclaw/openclaw/pull/73627) | fix(sandbox): explicitly pass sandboxSessionKey to prevent Docker probes when mode is off (#73586) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73627.md) | complete | Apr 28, 2026, 16:29 UTC |
| [#42400](https://github.com/openclaw/openclaw/pull/42400) | feat(channels): add neverReply config for group message suppression | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42400.md) | complete | Apr 28, 2026, 16:29 UTC |
| [#41398](https://github.com/openclaw/openclaw/pull/41398) | fix(models): strip google/ provider prefix before sending model ID to Google API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/41398.md) | complete | Apr 28, 2026, 16:28 UTC |
| [#42637](https://github.com/openclaw/openclaw/pull/42637) | fix(skills): list omitted skill names when prompt is truncated | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42637.md) | complete | Apr 28, 2026, 16:28 UTC |
| [#73405](https://github.com/openclaw/openclaw/issues/73405) | [Bug][v2026.4.24] Control UI webchat: duplicate messages delivered (async command completion events) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73405.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#34581](https://github.com/openclaw/openclaw/pull/34581) | fix(msteams): handle invalid JSON escape sequences in Bot Framework activities | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/34581.md) | complete | Apr 28, 2026, 16:26 UTC |
| [#73641](https://github.com/openclaw/openclaw/pull/73641) | fix(telegram): use agent's own default model for Telegram model list check mark | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73641.md) | complete | Apr 28, 2026, 16:26 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 16:33 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 273. Item numbers: 604,679,692,733,745,752,767,768,779,786,791,804,808,809,817,823,834,850,853,858,868,880,883,887,889,901,903,904,928,933,941,951,954,960,967,971,972,974,975,992,993,995,997,998,1010,1015,1017,1018,1020,1027,1028,1032,1035,1039,1040,1041,1043,1044,1048,1049,1052,1053,1054,1063,1068,1080,1085,1088,1089,1092,1094,1100,1103,1110,1114,1116,1119,1121,1122,1125,1129,1133,1147,1148,1152,1153,1155,1156,1164,1168,1179,1180,1181,1186,1199,1201,1207,1212,1217,1230,1233,1256,1275,1287,1292,1368,1370,1371,1374,1376,1377,1379,1381,1382,1383,1384,1385,1387,1389,1391,1392,1393,1394,1395,1396,1397,1398,1400,1401,1402,1403,1404,1406,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1421,1422,1423,1425,1426,1427,1431,1432,1433,1434,1435,1442,1443,1444,1445,1446,1447,1450,1451,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1483,1494,1495,1500,1501,1503,1509,1511,1514,1516,1518,1519,1521,1522,1524,1525,1526,1528,1533,1534,1535,1538,1539,1540,1542,1543,1551,1552,1554,1559,1563,1565,1568,1569,1571,1576,1577,1578,1580,1582,1583,1585,1586,1589,1591,1592,1595,1614,1620,1621,1624,1632,1639,1649,1653,1657,1659,1662,1668,1671,1672,1673,1675,1678,1679,1680,1682,1689,1690,1691,1692,1703,1705,1707,1717,1720,1721,1733,1734,1735,1738,1741,1743,1744,1745,1746,1748,1785,1788,1799,1808,1811,1812,1814,1816,1853,1858,1862,1863,1864.
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
| Hourly cadence coverage | 14/52 current (38 due, 26.9%) |
| Hourly hot item cadence (<7d) | 14/52 current (38 due, 26.9%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 631/632 current (1 due, 99.8%) |
| Due now by cadence | 46 |

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

Latest review: Apr 28, 2026, 16:21 UTC. Latest close: Apr 28, 2026, 08:18 UTC. Latest comment sync: Apr 28, 2026, 16:33 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 0 | 0 |
| Last hour | 274 | 0 | 274 | 1 | 0 | 1 | 0 |
| Last 24 hours | 917 | 3 | 914 | 1 | 10 | 10 | 0 |

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
