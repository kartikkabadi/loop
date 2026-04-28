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

Last dashboard update: Apr 28, 2026, 18:30 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4417 |
| Open PRs | 3447 |
| Open items total | 7864 |
| Reviewed files | 7474 |
| Unreviewed open items | 390 |
| Due now by cadence | 2365 |
| Proposed closes awaiting apply | 0 |
| Closed by Codex apply | 10508 |
| Failed or stale reviews | 7 |
| Archived closed files | 13694 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6950 | 6567 | 383 | 2340 | 0 | 10505 | Apr 28, 2026, 18:27 UTC | Apr 28, 2026, 18:28 UTC | 652 |
| [ClawHub](https://github.com/openclaw/clawhub) | 914 | 907 | 7 | 25 | 0 | 3 | Apr 28, 2026, 18:04 UTC | Apr 28, 2026, 08:18 UTC | 273 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Hot intake publish complete | Apr 28, 2026, 18:29 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25070290401) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 28, 2026, 18:15 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25069191786) |

### Fleet Activity

Latest review: Apr 28, 2026, 18:27 UTC. Latest close: Apr 28, 2026, 18:28 UTC. Latest comment sync: Apr 28, 2026, 18:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 34 | 0 | 34 | 0 | 2 | 15 | 0 |
| Last hour | 850 | 4 | 846 | 1 | 39 | 925 | 3 |
| Last 24 hours | 5066 | 283 | 4783 | 4 | 625 | 1523 | 19 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68947](https://github.com/openclaw/openclaw/pull/68947) | fix(reply): restore export-session inline scripts | closed externally after review | Apr 28, 2026, 18:28 UTC | [records/openclaw-openclaw/closed/68947.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68947.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | closed externally after review | Apr 28, 2026, 18:16 UTC | [records/openclaw-openclaw/closed/73708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73534](https://github.com/openclaw/openclaw/pull/73534) | fix(telegram): scope native quote streaming guard to real quotes (#73505) | closed externally after review | Apr 28, 2026, 18:11 UTC | [records/openclaw-openclaw/closed/73534.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73534.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#57210](https://github.com/openclaw/openclaw/issues/57210) | [Feature Request] Multi-Session / New Chat Support | duplicate or superseded | Apr 28, 2026, 18:07 UTC | [records/openclaw-openclaw/closed/57210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57210.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72171](https://github.com/openclaw/openclaw/pull/72171) | fix(onboard): detect vision-capable models for custom providers | closed externally after review | Apr 28, 2026, 18:05 UTC | [records/openclaw-openclaw/closed/72171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72171.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73683](https://github.com/openclaw/openclaw/issues/73683) | Session bootstrap race condition sends zero messages to zai/glm-5.1 causing 400 error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73683.md) | complete | Apr 28, 2026, 18:27 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73725](https://github.com/openclaw/openclaw/pull/73725) | fix(webchat): create dashboard sessions from New Chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73725.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73724](https://github.com/openclaw/openclaw/pull/73724) | fix(cli): avoid false local gateway unreachable on probe timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73724.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42475](https://github.com/openclaw/openclaw/issues/42475) | [Feature]: Per-agent cost budget enforcement at the gateway level | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42475.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73727](https://github.com/openclaw/openclaw/pull/73727) | feat(agents/cron): @default model sentinel resolves to defaults.primary at fire time | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73727.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73691](https://github.com/openclaw/openclaw/issues/73691) | [Bug]: MEMORY.md grows unbounded → bootstrap overflow → Gateway freeze | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73691.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42402](https://github.com/openclaw/openclaw/pull/42402) | fix(config): guard non-string values in env.vars to prevent TypeError | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42402.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73102](https://github.com/openclaw/openclaw/pull/73102) | Clear Codex app-server env keys case-insensitively on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73102.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73681](https://github.com/openclaw/openclaw/issues/73681) | googlechat: REACTION_ADDED / REACTION_REMOVED webhook events are silently dropped | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73681.md) | complete | Apr 28, 2026, 18:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73679](https://github.com/openclaw/openclaw/pull/73679) | fix(ui): preserve queued chat messages across session switches | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73679.md) | complete | Apr 28, 2026, 18:26 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 28, 2026, 18:29 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 25070290401. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25070290401](https://github.com/openclaw/clawsweeper/actions/runs/25070290401)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3541 |
| Open PRs | 3409 |
| Open items total | 6950 |
| Reviewed files | 6567 |
| Unreviewed open items | 383 |
| Archived closed files | 13684 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3362 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3198 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6560 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10505 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 84/813 current (729 due, 10.3%) |
| Hourly hot item cadence (<7d) | 84/813 current (729 due, 10.3%) |
| Daily cadence coverage | 2684/3911 current (1227 due, 68.6%) |
| Daily PR cadence | 2003/2726 current (723 due, 73.5%) |
| Daily new issue cadence (<30d) | 681/1185 current (504 due, 57.5%) |
| Weekly older issue cadence | 1842/1843 current (1 due, 99.9%) |
| Due now by cadence | 2340 |

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

Latest review: Apr 28, 2026, 18:27 UTC. Latest close: Apr 28, 2026, 18:28 UTC. Latest comment sync: Apr 28, 2026, 18:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 34 | 0 | 34 | 0 | 2 | 14 | 0 |
| Last hour | 577 | 4 | 573 | 1 | 39 | 652 | 3 |
| Last 24 hours | 4149 | 280 | 3869 | 4 | 615 | 1203 | 19 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#68947](https://github.com/openclaw/openclaw/pull/68947) | fix(reply): restore export-session inline scripts | closed externally after review | Apr 28, 2026, 18:28 UTC | [records/openclaw-openclaw/closed/68947.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68947.md) |
| [#73708](https://github.com/openclaw/openclaw/pull/73708) | ci: shard gateway codeql quality | closed externally after review | Apr 28, 2026, 18:16 UTC | [records/openclaw-openclaw/closed/73708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73708.md) |
| [#73719](https://github.com/openclaw/openclaw/issues/73719) | [Bug]: Bonjour is a mess but it's enabled by default | already implemented on main | Apr 28, 2026, 18:13 UTC | [records/openclaw-openclaw/closed/73719.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73719.md) |
| [#73534](https://github.com/openclaw/openclaw/pull/73534) | fix(telegram): scope native quote streaming guard to real quotes (#73505) | closed externally after review | Apr 28, 2026, 18:11 UTC | [records/openclaw-openclaw/closed/73534.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73534.md) |
| [#57210](https://github.com/openclaw/openclaw/issues/57210) | [Feature Request] Multi-Session / New Chat Support | duplicate or superseded | Apr 28, 2026, 18:07 UTC | [records/openclaw-openclaw/closed/57210.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/57210.md) |
| [#72171](https://github.com/openclaw/openclaw/pull/72171) | fix(onboard): detect vision-capable models for custom providers | closed externally after review | Apr 28, 2026, 18:05 UTC | [records/openclaw-openclaw/closed/72171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72171.md) |
| [#73712](https://github.com/openclaw/openclaw/issues/73712) | Telegram /new sends empty OpenAI/Codex Responses request after reset | already implemented on main | Apr 28, 2026, 17:57 UTC | [records/openclaw-openclaw/closed/73712.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73712.md) |
| [#63700](https://github.com/openclaw/openclaw/issues/63700) | Feature: infer model run — multimodal support (--file for vision) | closed externally after review | Apr 28, 2026, 17:53 UTC | [records/openclaw-openclaw/closed/63700.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/63700.md) |
| [#65271](https://github.com/openclaw/openclaw/pull/65271) | shell: support custom shells on Windows | closed externally after review | Apr 28, 2026, 17:52 UTC | [records/openclaw-openclaw/closed/65271.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65271.md) |
| [#68997](https://github.com/openclaw/openclaw/issues/68997) | Bug: `task-registry-control.runtime.{js,ts}` missing from published npm tarballs, breaks `openclaw tasks cancel` | already implemented on main | Apr 28, 2026, 17:47 UTC | [records/openclaw-openclaw/closed/68997.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68997.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73683](https://github.com/openclaw/openclaw/issues/73683) | Session bootstrap race condition sends zero messages to zai/glm-5.1 causing 400 error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73683.md) | complete | Apr 28, 2026, 18:27 UTC |
| [#73725](https://github.com/openclaw/openclaw/pull/73725) | fix(webchat): create dashboard sessions from New Chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73725.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#73724](https://github.com/openclaw/openclaw/pull/73724) | fix(cli): avoid false local gateway unreachable on probe timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73724.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#42475](https://github.com/openclaw/openclaw/issues/42475) | [Feature]: Per-agent cost budget enforcement at the gateway level | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42475.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#73727](https://github.com/openclaw/openclaw/pull/73727) | feat(agents/cron): @default model sentinel resolves to defaults.primary at fire time | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73727.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#73691](https://github.com/openclaw/openclaw/issues/73691) | [Bug]: MEMORY.md grows unbounded → bootstrap overflow → Gateway freeze | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73691.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#42402](https://github.com/openclaw/openclaw/pull/42402) | fix(config): guard non-string values in env.vars to prevent TypeError | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/42402.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#73102](https://github.com/openclaw/openclaw/pull/73102) | Clear Codex app-server env keys case-insensitively on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73102.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#73681](https://github.com/openclaw/openclaw/issues/73681) | googlechat: REACTION_ADDED / REACTION_REMOVED webhook events are silently dropped | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73681.md) | complete | Apr 28, 2026, 18:26 UTC |
| [#73679](https://github.com/openclaw/openclaw/pull/73679) | fix(ui): preserve queued chat messages across session switches | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73679.md) | complete | Apr 28, 2026, 18:26 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 28, 2026, 18:15 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 273. Item numbers: 604,679,692,733,745,752,767,768,779,786,791,804,808,809,817,823,834,850,853,858,868,880,883,887,889,901,903,904,928,933,941,951,954,960,967,971,972,974,975,992,995,997,998,1010,1015,1017,1018,1020,1028,1032,1035,1039,1040,1041,1043,1044,1048,1049,1052,1053,1054,1063,1068,1080,1085,1088,1089,1092,1094,1100,1103,1110,1114,1116,1119,1121,1122,1125,1129,1133,1147,1148,1152,1153,1155,1156,1164,1168,1179,1180,1181,1186,1199,1201,1207,1212,1217,1230,1233,1256,1275,1287,1292,1368,1370,1371,1374,1376,1377,1379,1387,1389,1391,1393,1394,1396,1398,1400,1402,1403,1404,1406,1409,1411,1415,1416,1417,1418,1421,1423,1425,1426,1427,1431,1432,1433,1434,1435,1442,1443,1444,1446,1447,1450,1451,1457,1462,1463,1465,1471,1472,1473,1476,1480,1483,1494,1495,1500,1501,1503,1509,1511,1514,1516,1518,1519,1521,1522,1524,1525,1526,1528,1533,1534,1535,1538,1539,1540,1542,1543,1551,1552,1554,1559,1563,1565,1568,1569,1571,1576,1577,1578,1580,1582,1583,1585,1586,1589,1592,1595,1614,1620,1621,1624,1632,1639,1649,1653,1657,1659,1662,1668,1671,1673,1675,1678,1679,1680,1682,1689,1690,1691,1692,1703,1705,1707,1717,1720,1721,1733,1734,1735,1738,1741,1743,1744,1745,1746,1748,1768,1769,1770,1785,1788,1798,1799,1806,1808,1811,1812,1813,1814,1816,1817,1821,1826,1829,1831,1834,1838,1840,1848,1852,1853,1854,1855,1856,1858,1859,1862,1863,1864,1865.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25069191786](https://github.com/openclaw/clawsweeper/actions/runs/25069191786)
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
| Hourly cadence coverage | 33/51 current (18 due, 64.7%) |
| Hourly hot item cadence (<7d) | 33/51 current (18 due, 64.7%) |
| Daily cadence coverage | 222/222 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 201/201 current (0 due, 100%) |
| Weekly older issue cadence | 634/634 current (0 due, 100%) |
| Due now by cadence | 25 |

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
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 1 | 0 |
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
