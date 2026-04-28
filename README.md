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

Last dashboard update: Apr 28, 2026, 04:57 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 04:57 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 447. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,65,72,77,79,84,85,86,88,95,96,97,99,100,102,115,117,120,125,127,128,129,131,134,137,151,156,162,169,170,171,173,174,178,184,192,205,208,211,224,225,226,227,228,231,234,236,237,238,243,248,256,265,268,275,277,279,284,287,288,290,314,321,323,328,329,330,337,340,345,348,349,351,353,364,367,369,371,373,374,378,379,380,382,385,386,387,388,390,392,393,397,402,406,410,420,423,424,425,426,437,438,442,443,447,448,449,450,451,454,455,459,463,469,471,474,478,479,480,481,482,484,485,487,488,489,494,495,498,501,503,504,509,516,528,531,532,535,539,541,549,553,563,566,567,568,573,574,575,576,579,580,581,586,589,593,600,604,606,609,613,614,615,618,619,621,625,630,631,635,636,637,642,645,646,647,650,651,652,653,654,655,656,657,658,661,662,664,666,667,668,669,670,672,673,674,675,676,677,678,679,680,681,683,686,692,694,699,700,701,702,705,706,707,708,711,712,713,716,717,718,722,723,729,730,731,733,903,915,963,1110,1125,1132,1133,1230,1233,1240,1256,1287,1292,1324,1368,1370,1371,1374,1376,1377,1378,1379,1381,1382,1383,1384,1385,1387,1389,1391,1392,1393,1394,1395,1396,1397,1398,1400,1401,1402,1403,1404,1405,1406,1407,1408,1409,1410,1411,1412,1413,1414,1415,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1427,1428,1430,1431,1432,1433,1434,1435,1437,1440,1442,1443,1444,1445,1446,1447,1448,1450,1451,1452,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1483,1494,1495,1500,1501,1503,1509,1511,1514,1515,1516,1517,1518,1519,1520,1521,1522,1523,1524,1525,1526,1528,1529,1530,1533,1534,1535,1538,1539,1540,1541,1542,1543,1551,1552,1553,1554,1557,1558,1559,1563,1565,1568,1569,1571,1572,1574,1575,1576,1577,1578,1580,1581,1582,1583,1584,1585,1586,1587,1588,1589,1591,1592,1594,1595,1614,1617,1620,1621,1624,1631,1632,1639,1649,1653,1654,1657,1658,1659,1662,1666,1667,1668,1669,1670,1671,1672,1673,1674,1675,1676,1677,1678,1679,1680,1681,1682,1683,1684,1685,1689,1690,1691,1692,1694,1695,1699,1702,1703,1705,1706,1707,1710,1711,1712,1717,1718,1719,1720,1721,1725,1726,1733,1734,1735,1736,1738,1741,1742,1743,1744,1745,1746,1747,1748,1749,1751,1755,1798,1799,1806,1808,1811,1812,1813,1814,1815,1816,1817,1818,1819,1821,1823,1824,1826,1828,1829,1830,1831,1833,1834,1838,1840,1841,1842,1848,1849.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25034116918](https://github.com/openclaw/clawsweeper/actions/runs/25034116918)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues in [openclaw/clawhub](https://github.com/openclaw/clawhub) | 876 |
| Open PRs in [openclaw/clawhub](https://github.com/openclaw/clawhub) | 34 |
| Open items total | 910 |
| Reviewed files | 520 |
| Unreviewed open items | 390 |
| Archived closed files | 0 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 492 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 28 |
| Proposed PR closes | 3 (10.7% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 520 |
| Proposed closes awaiting apply | 3 (0.6% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 48/48 current (0 due, 100%) |
| Hourly hot item cadence (<7d) | 48/48 current (0 due, 100%) |
| Daily cadence coverage | 233/233 current (0 due, 100%) |
| Daily PR cadence | 24/24 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 209/209 current (0 due, 100%) |
| Weekly older issue cadence | 239/239 current (0 due, 100%) |
| Due now by cadence | 390 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 27, 2026, 07:11 UTC

Status: **Action needed**

Targeted review input: `64563,65635,56915,61960,62112,62431,64150,71072`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7132 |
| Missing eligible open records | 2 |
| Missing maintainer-authored open records | 94 |
| Missing protected open records | 1 |
| Missing recently-created open records | 149 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 6 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#64563](https://github.com/openclaw/openclaw/pull/64563) | Missing eligible open | fix(whatsapp): lazy default auth dir for profile state (#64555) | eligible |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#56915](https://github.com/openclaw/openclaw/issues/56915) | Stale review | [Bug]: [Bug] Skills scanner ignores subdirectories under ~/.openclaw/skills/ | records/openclaw-openclaw/items/56915.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 28, 2026, 04:44 UTC. Latest close: unknown. Latest comment sync: Apr 28, 2026, 04:57 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 36 | 0 | 36 | 0 | 0 | 447 | 0 |
| Last hour | 520 | 3 | 517 | 0 | 0 | 467 | 0 |
| Last 24 hours | 520 | 3 | 517 | 0 | 0 | 467 | 0 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1842](https://github.com/openclaw/clawhub/pull/1842) | fix: constrain plugin catalog queries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1842.md) | complete | Apr 28, 2026, 04:44 UTC |
| [#1811](https://github.com/openclaw/clawhub/issues/1811) | Skill flagged — suspicious patterns detected (trade-router, re-bruce-wayne) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1811.md) | complete | Apr 28, 2026, 04:44 UTC |
| [#1826](https://github.com/openclaw/clawhub/issues/1826) | False positives: powerloom-bot/powerloom-bds-univ3 flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1826.md) | complete | Apr 28, 2026, 04:44 UTC |
| [#1743](https://github.com/openclaw/clawhub/issues/1743) | Can not search skill from Clawhub | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1743.md) | complete | Apr 28, 2026, 04:44 UTC |
| [#1583](https://github.com/openclaw/clawhub/issues/1583) | False Positive: Suspicious patterns / Unicode flags on beckmann-knowledge-graph | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1583.md) | complete | Apr 28, 2026, 04:43 UTC |
| [#1744](https://github.com/openclaw/clawhub/issues/1744) | Request: delete stale plugin entries claw-pay-plugin (v0.27, v0.25) from Publisher Plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1744.md) | complete | Apr 28, 2026, 04:43 UTC |
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | complete | Apr 28, 2026, 04:43 UTC |
| [#1559](https://github.com/openclaw/clawhub/issues/1559) | False positive: solana-token-monitor flagged as suspicious — legitimate public API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1559.md) | complete | Apr 28, 2026, 04:43 UTC |
| [#1707](https://github.com/openclaw/clawhub/issues/1707) | Bug Summary: Missing Token in search and explore Commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1707.md) | complete | Apr 28, 2026, 04:43 UTC |
| [#1815](https://github.com/openclaw/clawhub/issues/1815) | Appeal for Skill Flag Review(Why Flagged Patterns Are Not Suspicious) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1815.md) | complete | Apr 28, 2026, 04:43 UTC |

</details>

## How It Works

ClawSweeper is split into a scheduler, a review lane, and an apply lane.

### Scheduler

The scheduler decides what to scan and how often. New and active items get more
attention; older quiet items fall back to a slower cadence.

- hot/new and recently active items are checked hourly, with a 5-minute intake
  schedule for the newest queue edge
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
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy target API calls, and apply/comment-sync jobs use the app token for comments and closes.

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
