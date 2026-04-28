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

Last dashboard update: Apr 28, 2026, 05:14 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 05:14 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 383. Item numbers: 734,737,740,745,747,752,755,756,758,760,761,762,764,765,767,768,769,770,772,779,780,782,784,785,786,789,791,792,794,798,800,804,807,808,809,811,816,817,819,822,823,824,834,835,838,845,846,847,848,849,850,851,852,853,854,856,858,860,861,862,863,865,867,868,869,870,871,873,874,875,876,878,879,880,881,882,883,886,887,888,889,890,892,895,896,897,899,900,901,904,905,906,907,908,909,910,911,912,913,914,917,920,921,922,923,925,927,928,930,932,933,935,936,937,938,939,940,941,943,946,951,952,954,958,959,960,962,966,967,969,970,971,972,974,975,982,984,985,987,988,989,990,992,993,994,995,997,998,999,1001,1002,1003,1004,1005,1006,1007,1008,1009,1010,1011,1013,1015,1016,1017,1018,1020,1021,1022,1024,1026,1027,1028,1030,1032,1033,1035,1036,1037,1038,1039,1040,1041,1042,1043,1044,1045,1046,1047,1048,1049,1050,1051,1052,1053,1054,1058,1059,1061,1062,1063,1064,1068,1069,1070,1072,1075,1079,1080,1081,1082,1083,1084,1085,1088,1089,1090,1091,1092,1094,1097,1098,1099,1100,1102,1103,1104,1105,1106,1107,1109,1111,1112,1113,1114,1116,1118,1119,1120,1121,1122,1124,1126,1128,1129,1131,1136,1137,1138,1140,1141,1142,1145,1146,1147,1148,1149,1152,1153,1154,1155,1156,1159,1164,1167,1168,1169,1170,1171,1172,1173,1175,1176,1177,1179,1180,1181,1182,1184,1186,1188,1193,1195,1197,1199,1201,1204,1205,1206,1207,1208,1210,1211,1212,1213,1217,1218,1219,1220,1221,1222,1223,1224,1226,1227,1228,1229,1231,1235,1236,1237,1239,1243,1244,1247,1248,1249,1250,1253,1254,1257,1260,1261,1264,1265,1266,1267,1268,1269,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1282,1283,1285,1288,1289,1290,1293,1294,1296,1298,1299,1300,1301,1302,1307,1308,1309,1310,1312,1313,1314,1315,1316,1318,1320,1325,1326,1327,1329,1334,1336,1338,1341,1345,1347,1350,1351,1353,1354,1358,1359,1361,1364,1366,1367.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25034741838](https://github.com/openclaw/clawsweeper/actions/runs/25034741838)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues in [openclaw/clawhub](https://github.com/openclaw/clawhub) | 877 |
| Open PRs in [openclaw/clawhub](https://github.com/openclaw/clawhub) | 33 |
| Open items total | 910 |
| Reviewed files | 902 |
| Unreviewed open items | 8 |
| Archived closed files | 1 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 875 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 27 |
| Proposed PR closes | 3 (11.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 902 |
| Proposed closes awaiting apply | 3 (0.3% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 28/47 current (19 due, 59.6%) |
| Hourly hot item cadence (<7d) | 28/47 current (19 due, 59.6%) |
| Daily cadence coverage | 233/233 current (0 due, 100%) |
| Daily PR cadence | 24/24 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 209/209 current (0 due, 100%) |
| Weekly older issue cadence | 622/622 current (0 due, 100%) |
| Due now by cadence | 27 |

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

Latest review: Apr 28, 2026, 05:05 UTC. Latest close: unknown. Latest comment sync: Apr 28, 2026, 05:14 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 372 | 0 | 372 | 0 | 0 | 383 | 0 |
| Last hour | 883 | 3 | 880 | 0 | 0 | 830 | 0 |
| Last 24 hours | 903 | 3 | 900 | 0 | 0 | 850 | 0 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1261](https://github.com/openclaw/clawhub/issues/1261) | False Skill flagged — suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1261.md) | complete | Apr 28, 2026, 05:05 UTC |
| [#1260](https://github.com/openclaw/clawhub/issues/1260) | wrong Skill flagged — suspicious patterns detected | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1260.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1099](https://github.com/openclaw/clawhub/issues/1099) | Why was the skill \"solidity-audit\" flagged as suspicious, and how can I resolve this? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1099.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1367](https://github.com/openclaw/clawhub/issues/1367) | [False Positive] Request to whitelist \"tabular data processing and analysis\" v1.0.2 (VirusTotal 'Suspicious' flag) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1367.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1359](https://github.com/openclaw/clawhub/issues/1359) | False positive: markster-os flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1359.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1247](https://github.com/openclaw/clawhub/issues/1247) | My skills were flagged as suspicious, but the report shows they are clean. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1247.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1298](https://github.com/openclaw/clawhub/issues/1298) | [False Positive] driftguard flagged — local integrity scanner incorrectly marked as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1298.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1224](https://github.com/openclaw/clawhub/issues/1224) | Appeal for suspicious and I need to remove access token related content but no way! | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1224.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1312](https://github.com/openclaw/clawhub/issues/1312) | help to delete test versions, Thanks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1312.md) | complete | Apr 28, 2026, 05:04 UTC |
| [#1280](https://github.com/openclaw/clawhub/issues/1280) | didi-ride-skill flagged as suspicious — necessity   explanation for each pattern | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1280.md) | complete | Apr 28, 2026, 05:04 UTC |

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
