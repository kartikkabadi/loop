# ClawSweeper

ClawSweeper is the conservative OpenClaw maintenance bot for
`openclaw/openclaw`.

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

## Dashboard

Last dashboard update: Apr 27, 2026, 09:55 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 09:55 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 355. Item numbers: 6457,17098,24754,25295,25789,27771,32558,39604,40155,40165,40209,40215,40230,40277,40287,40387,40392,40402,40423,40463,40472,40522,40611,40641,40673,40694,40716,40875,41025,41108,41195,41265,41299,41308,41494,41624,41670,41954,41955,41964,41983,41986,41991,41993,42001,42007,42009,42010,42011,42014,42027,42039,42052,42059,42065,42079,42099,42106,42131,42156,42157,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42301,42303,42304,42317,42319,42322,42327,42330,42351,42354,42361,42373,42381,42391,42402,42408,42424,42425,42452,42461,42475,42476,42480,42482,42497,42504,42510,42533,42538,42539,42544,42555,42571,42585,42586,42591,42592,42606,42617,42631,42636,42637,42646,42647,42648,42650,42651,42652,42654,42656,42663,42669,42674,42675,42677,42683,42690,42698,42707,42713,42715,42729,42771,42798,42802,42809,42810,42820,42824,42832,42837,42840,42841,42843,42847,42853,42854,42858,42859,42862,42867,42873,42877,42895,42898,42904,42908,42933,42936,42937,42952,42961,42962,42978,42986,42987,42998,42999,43006,43013,43015,43028,43061,43063,43064,43065,43068,43095,43097,43117,43141,43145,43151,43165,43176,43195,43202,43204,43211,43231,43243,43244,43249,43253,43260,43276,43286,43300,43306,43341,43348,43357,43367,43390,43404,43410,43411,43416,43440,43441,43443,43467,43481,43495,43512,43527,43529,43557,43562,43563,43565,43568,43570,43585,43588,43609,43614,43618,43656,43658,43659,43673,43690,43737,43752,43775,43790,43791,43794,43808,43810,43816,43835,43848,43935,43938,43951,43953,43984,43992,44013,44023,44027,44996,50429,50982,52115,52894,52928,52963,53008,53311,53390,53881,53889,56161,56915,58070,61151,62431,64086,64127,66521,66614,66771,66828,66926,67019,67035,67088,67097,67107,67113,67177,67181,67191,67202,67244,67332,67333,67341,67345,67350,67363,67366,67376,67378,67393,67394,67404,67433,67434,67444,67460,67461,67466,67472,67477,67488,67493,67506,67547,67552,67569,67584,67587,67593,67594,67595,67600,67621,67626,67629,67639,67655,67661,67662,67669,67670,67680,67682,67687,67690,67692,67693,67694,67703,67706,67709,67716,67727,67731,67734,67750,67751,67758,67759,67761,67766,67779,67781,67782,67783,67792,67793,67796,67805,67817,67826,67832,67836,67841,67842,67872,67910,67916,67917,67935,67943,67946,67966,67967,67971,67977,67990,68015,68019,68037,68041,68045,68046,68047,68054,68061,68064,68065,68066,68070,68089,68101,68103,68105,68106,68109,68113,68183,68186,68191,68216,68242,68248,68252,68285,68290,68303,68305,68306,68316,68322,68353,68365,68374,68377,68384,68386,68389,68391,68400,68401,68408,68416,68417,68418,68422,68429,68435,68438,68442,68444,68445,68450,68455,68457,68462,68464,68466,68481,68501,68503,68524,68538,68555,68556,68562,68575,68589,68590,68597,68619,68620,69340,70334,70368,70886,71072,71731,71828,72189.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24987105929](https://github.com/openclaw/clawsweeper/actions/runs/24987105929)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3575 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3477 |
| Open items total | 7052 |
| Reviewed files | 6830 |
| Unreviewed open items | 222 |
| Archived closed files | 12985 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3505 |
| Proposed issue closes | 4 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3320 |
| Proposed PR closes | 9 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6825 |
| Proposed closes awaiting apply | 13 (0.2% of fresh reviews) |
| Closed by Codex apply | 10182 |
| Failed or stale reviews | 5 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 86/722 current (636 due, 11.9%) |
| Hourly hot item cadence (<7d) | 86/722 current (636 due, 11.9%) |
| Daily cadence coverage | 1723/4255 current (2532 due, 40.5%) |
| Daily PR cadence | 1055/2910 current (1855 due, 36.3%) |
| Daily new issue cadence (<30d) | 668/1345 current (677 due, 49.7%) |
| Weekly older issue cadence | 1853/1853 current (0 due, 100%) |
| Due now by cadence | 3390 |

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
| [#56915](https://github.com/openclaw/openclaw/issues/56915) | Stale review | [Bug]: [Bug] Skills scanner ignores subdirectories under ~/.openclaw/skills/ | items/56915.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 27, 2026, 09:39 UTC. Latest close: Apr 27, 2026, 09:22 UTC. Latest comment sync: Apr 27, 2026, 09:55 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 360 | 1 |
| Last hour | 969 | 14 | 955 | 1 | 2 | 736 | 4 |
| Last 24 hours | 4231 | 609 | 3622 | 3 | 456 | 1681 | 21 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72206](https://github.com/openclaw/openclaw/issues/72206) | New claude-cli live session fails immediately with FailoverError while session reuse succeeds | already implemented on main | Apr 27, 2026, 09:22 UTC | [closed/72206.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72206.md) |
| [#72466](https://github.com/openclaw/openclaw/pull/72466) | Add denylist support for exec approvals (block high-risk commands by pattern) | duplicate or superseded | Apr 27, 2026, 09:03 UTC | [closed/72466.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72466.md) |
| [#43288](https://github.com/openclaw/openclaw/issues/43288) | CLI backend: pickSessionId accepts non-UUID strings like 'rate-limited' causing resume failure | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/43288.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43288.md) |
| [#42680](https://github.com/openclaw/openclaw/pull/42680) | fix(cron): start job timeout after execution begins, not at enqueue time | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/42680.md](https://github.com/openclaw/clawsweeper/blob/main/closed/42680.md) |
| [#42531](https://github.com/openclaw/openclaw/pull/42531) | fix(memory-lancedb): preserve dimensions for baseUrl embeddings | already implemented on main | Apr 27, 2026, 08:23 UTC | [closed/42531.md](https://github.com/openclaw/clawsweeper/blob/main/closed/42531.md) |
| [#40446](https://github.com/openclaw/openclaw/pull/40446) | feat(agents): add passive execution health monitoring for death spiral detection | belongs on ClawHub | Apr 27, 2026, 08:23 UTC | [closed/40446.md](https://github.com/openclaw/clawsweeper/blob/main/closed/40446.md) |
| [#72460](https://github.com/openclaw/openclaw/pull/72460) | fix(gateway): align UI thinking default with runtime resolver | already implemented on main | Apr 27, 2026, 08:02 UTC | [closed/72460.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72460.md) |
| [#72458](https://github.com/openclaw/openclaw/pull/72458) | Fix/skills snapshot stale after restart | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72458.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72458.md) |
| [#72457](https://github.com/openclaw/openclaw/pull/72457) | Fix/onboard trim typeerror | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72457.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72457.md) |
| [#72456](https://github.com/openclaw/openclaw/pull/72456) | Fix/minimax m2.7 vlm support | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72456.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72456.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68285](https://github.com/openclaw/openclaw/issues/68285) | [Bug]: 100% CPU usage, broken tools, and no long-term memory on Node v25.9 / Matrix | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68285.md) | complete | Apr 27, 2026, 09:39 UTC |
| [#67366](https://github.com/openclaw/openclaw/issues/67366) | TypeError during `openclaw onboard` when replacing Telegram token | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67366.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#67967](https://github.com/openclaw/openclaw/pull/67967) | fix(minimax): disable tool call ID sanitization for Anthropic-compatible API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67967.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#68457](https://github.com/openclaw/openclaw/issues/68457) | Add channels.whatsapp.silentErrorReplies (parity with Telegram) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68457.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#68216](https://github.com/openclaw/openclaw/issues/68216) | [Bug]: Openclaw with Gemini CLI model provider fails to write to Identity.md and other workspace files. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68216.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#67758](https://github.com/openclaw/openclaw/pull/67758) | fix(google): correct gemini preview model versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67758.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#68445](https://github.com/openclaw/openclaw/pull/68445) | fix: exec tool gateway crash (#68376) and memory-core dreaming bloat (#68379) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68445.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#68070](https://github.com/openclaw/openclaw/pull/68070) | fix: prevent infinite retry loops on tool parameter validation errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68070.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#66828](https://github.com/openclaw/openclaw/issues/66828) | Cron lane remapped to Nested and subagent cleanup packaging regression in v2026.4.12 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66828.md) | complete | Apr 27, 2026, 09:38 UTC |
| [#68365](https://github.com/openclaw/openclaw/pull/68365) | docs: fix broken links and display text consistency (fixes #50828) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68365.md) | complete | Apr 27, 2026, 09:38 UTC |

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
- Each shard checks out `openclaw/openclaw` at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes `items/<number>.md` with the decision, evidence, suggested
  comment, runtime metadata, and GitHub snapshot hash.
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
- Moves closed or already-closed reports to `closed/<number>.md`.
- Moves reopened archived reports back to `items/<number>.md` as stale.
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
- CI makes the OpenClaw checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

### Audit

`npm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Protected proposed closes are reported only for active `items/` records because
archived `closed/` records are historical and cannot be applied.
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
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25 --update-dashboard
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20 --apply-kind all
```

Sync durable review comments without closing:

```bash
source ~/.profile
npm run apply-decisions -- --sync-comments-only --comment-sync-min-age-days 7 --processed-limit 1000 --limit 0
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default; pass `apply_kind=issue` or `apply_kind=pull_request` to narrow a manual run.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy `openclaw/openclaw` scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls, and apply/comment-sync jobs use the app token for comments and closes.

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
- write access to `openclaw/openclaw` issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
