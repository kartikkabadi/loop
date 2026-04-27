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

Last dashboard update: Apr 27, 2026, 05:22 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 05:22 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 397. Item numbers: 6457,15591,16251,17684,18915,19362,19482,20802,25222,25295,25789,27771,30142,32558,34542,34581,38709,39115,39137,39166,40144,40147,40155,40165,40194,40207,40210,40216,40217,40218,40220,40230,40236,40238,40268,40277,40287,40289,40290,40296,40311,40314,40317,40332,40352,40355,40366,40387,40402,40418,40421,40423,40427,40438,40440,40443,40446,40447,40453,40463,40464,40472,40481,40485,40502,40527,40530,40534,40540,40578,40602,40611,40618,40641,40644,40652,40654,40663,40665,40673,40678,40694,40697,40703,40716,40723,40732,40744,40747,40756,40760,40764,40875,41025,41108,41165,41195,41201,41419,41494,41581,41624,41716,41964,41965,41966,41983,41986,41993,42009,42010,42011,42014,42026,42027,42039,42059,42079,42083,42099,42105,42106,42139,42156,42157,42158,42165,42196,42201,42208,42213,42218,42243,42252,42253,42259,42261,42271,42273,42290,42291,42294,42301,42303,42304,42317,42319,42322,42327,42330,42350,42351,42354,42361,42373,42381,42391,42402,42408,42424,42425,42452,42461,42472,42475,42476,42480,42482,42496,42497,42504,42510,42518,42531,42533,42538,42539,42544,42555,42571,42573,42585,42586,42591,42592,42617,42631,42636,42646,42647,42648,42650,42651,42652,42654,42656,42663,42669,42673,42674,42675,42677,42680,42683,42690,42698,42707,42713,42715,42729,42771,42788,42797,42798,42802,42803,42809,42810,42819,42820,42824,42832,42837,42840,42841,42843,42847,42853,42854,42856,42858,42859,42862,42867,42873,42877,42895,42898,42904,42908,42933,42936,42937,42952,42961,42962,42978,42986,42987,42998,42999,43005,43006,43009,43013,43015,43020,43028,43043,43061,43063,43064,43065,43068,43093,43095,43097,43117,43137,43141,43143,43145,43151,43165,43170,43176,43195,43202,43204,43211,43216,43217,43223,43224,43231,43239,43243,43244,43246,43249,43253,43254,43260,43276,43286,43288,43291,43292,43295,43300,43306,43317,43327,43341,43348,43357,43367,43374,43383,43390,43404,43410,43411,43416,43440,43441,43443,43447,43454,43455,43456,43462,43467,43469,43480,43481,43493,43495,43512,43527,43529,43549,43557,43562,43563,43564,43565,43567,43568,43570,43573,43574,43585,43588,43594,43605,43609,43614,43616,43618,43631,43634,43656,43658,43659,43669,43671,43673,43679,43690,43712,43730,43735,43737,43743,43747,43750,43752,43760,43765,43770,43775,43789,43790,43791,43794,43795,43797,43803,43808,43810,43816,43821,43827,43835,43848,43866,43874,43892,43895,43901,43903,43910,43911,43912,43919,43935,43938,43942,43950,43951,43953,43954,43975,43976,43978,43982,43984,43992,43996,44002,44011,44013,44015,44023,44027,44049,44051,44062,44068,44077,44086,44098,44107,44108,44111,44118,44123,44126,44129,45280,45710,46542,47518,48504,48598,48914,50799,52133,52776,53565,53884,54105,55473,56242,56582,56706,57505,57524,58114,59245,60743,61536,62956,62968,63015,63034,63035,63069,63101,63106,63107,63121,63139,63145,63148,63167,63181,63454,63481,63530,63536,63552,63558,63572,63593,63626,63652,63680,63710,63769,63803,63807,63819,63893,63919,63940,63956,63959,63978,63992,64016,64027,64060,64065,64187,64271,64545,68839,72293.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24977237443](https://github.com/openclaw/clawsweeper/actions/runs/24977237443)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3645 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3533 |
| Open items total | 7178 |
| Reviewed files | 6987 |
| Unreviewed open items | 191 |
| Archived closed files | 12794 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3584 |
| Proposed issue closes | 20 (0.6% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3401 |
| Proposed PR closes | 28 (0.8% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6985 |
| Proposed closes awaiting apply | 48 (0.7% of fresh reviews) |
| Closed by Codex apply | 10103 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 33/737 current (704 due, 4.5%) |
| Hourly hot item cadence (<7d) | 33/737 current (704 due, 4.5%) |
| Daily cadence coverage | 4040/4387 current (347 due, 92.1%) |
| Daily PR cadence | 2731/2992 current (261 due, 91.3%) |
| Daily new issue cadence (<30d) | 1309/1395 current (86 due, 93.8%) |
| Weekly older issue cadence | 1863/1863 current (0 due, 100%) |
| Due now by cadence | 1242 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 27, 2026, 01:06 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7235 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 85 |
| Missing protected open records | 2 |
| Missing recently-created open records | 26 |
| Archived records that are open again | 0 |
| Stale item records | 7 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 5 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | Protected proposed close | feat(whatsapp): add reply quoting via replyToMode | closed/57413.md |
| [#60460](https://github.com/openclaw/openclaw/pull/60460) | Protected proposed close | Enforce browser profile CDP policy | closed/60460.md |
| [#40945](https://github.com/openclaw/openclaw/issues/40945) | Stale review | Control UI chat markdown only renders data URI images, not remote https image URLs | items/40945.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 27, 2026, 05:07 UTC. Latest close: Apr 27, 2026, 03:51 UTC. Latest comment sync: Apr 27, 2026, 05:22 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 397 | 3 |
| Last hour | 1013 | 46 | 967 | 0 | 0 | 973 | 7 |
| Last 24 hours | 8176 | 1578 | 6598 | 0 | 1252 | 2940 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#43954](https://github.com/openclaw/openclaw/pull/43954) | feat(feishu): add feishu_card tool for sending and updating interactive cards | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43954.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43954.md) |
| [#43901](https://github.com/openclaw/openclaw/pull/43901) | fix: remove L1 bootstrap snapshot cache to fix workspace file staleness | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43901.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43901.md) |
| [#43874](https://github.com/openclaw/openclaw/pull/43874) | feat(feishu): fix board tool SDK paths and add create_whiteboard action | belongs on ClawHub | Apr 27, 2026, 05:18 UTC | [closed/43874.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43874.md) |
| [#43789](https://github.com/openclaw/openclaw/pull/43789) | [AI-assisted] fix(agents): compact sandbox skill paths | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43789.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43789.md) |
| [#43634](https://github.com/openclaw/openclaw/pull/43634) | fix: restore export-html template placeholders and prevent reformatting | duplicate or superseded | Apr 27, 2026, 05:18 UTC | [closed/43634.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43634.md) |
| [#43594](https://github.com/openclaw/openclaw/pull/43594) | Cron: add opt-in isolated session reuse | already implemented on main | Apr 27, 2026, 05:18 UTC | [closed/43594.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43594.md) |
| [#43327](https://github.com/openclaw/openclaw/pull/43327) | Fix/tui shift enter newline | already implemented on main | Apr 27, 2026, 05:17 UTC | [closed/43327.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43327.md) |
| [#43317](https://github.com/openclaw/openclaw/pull/43317) | feat(sandbox): pluggable provider interface + Docker/gVisor backends | duplicate or superseded | Apr 27, 2026, 05:17 UTC | [closed/43317.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43317.md) |
| [#43223](https://github.com/openclaw/openclaw/pull/43223) | fix(scripts): update copy-hook-metadata script to correct destination… | already implemented on main | Apr 27, 2026, 05:17 UTC | [closed/43223.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43223.md) |
| [#43143](https://github.com/openclaw/openclaw/issues/43143) | Discussion: 10 active PR limit may throttle batch contributors | already implemented on main | Apr 27, 2026, 05:17 UTC | [closed/43143.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43143.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#56242](https://github.com/openclaw/openclaw/pull/56242) | fix: add CJK error patterns to failover classification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/56242.md) | complete | Apr 27, 2026, 05:07 UTC |
| [#62956](https://github.com/openclaw/openclaw/pull/62956) | fix(tui): surface error details and elapsed time in status bar on agent failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62956.md) | complete | Apr 27, 2026, 05:07 UTC |
| [#57505](https://github.com/openclaw/openclaw/pull/57505) | Matrix: stop no-progress bot loops with semantic judge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/57505.md) | complete | Apr 27, 2026, 05:07 UTC |
| [#43747](https://github.com/openclaw/openclaw/issues/43747) | [Bug]: Memory management is in chaos | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43747.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#64016](https://github.com/openclaw/openclaw/issues/64016) | BUG: heartbeat fires duplicate runs when external wake events (openclaw agent CLI) arrive during scheduled heartbeat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64016.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#47518](https://github.com/openclaw/openclaw/pull/47518) | fix(gemini-cli-auth): respect env proxy vars and fix hung exit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47518.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#43996](https://github.com/openclaw/openclaw/issues/43996) | [Bug]: Sandbox container exits immediately when no-new-privileges is applied (exec /usr/bin/sleep: operation not permitted) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/43996.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#63558](https://github.com/openclaw/openclaw/issues/63558) | Control UI: Dreaming tab has no agent selector — cannot switch between agent contexts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63558.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#63139](https://github.com/openclaw/openclaw/issues/63139) | before_model_resolve hook fires once per fallback iteration in runWithModelFallback, defeating runtime failover for routing plugins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63139.md) | complete | Apr 27, 2026, 05:06 UTC |
| [#46542](https://github.com/openclaw/openclaw/pull/46542) | feat(memory): add shared memory store for cross-agent document sharing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/46542.md) | complete | Apr 27, 2026, 05:06 UTC |

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
