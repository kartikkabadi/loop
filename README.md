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

Last dashboard update: Apr 27, 2026, 08:21 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 08:21 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 452. Item numbers: 6457,15591,16251,17684,18915,19362,19482,20802,25222,25295,25789,27061,27771,30142,32558,34542,34581,38709,39115,39137,39166,40144,40147,40155,40165,40194,40207,40210,40216,40217,40218,40220,40230,40236,40238,40268,40277,40287,40289,40290,40296,40311,40314,40317,40332,40352,40355,40366,40387,40402,40418,40421,40423,40427,40438,40440,40446,40447,40453,40463,40464,40472,40481,40485,40502,40527,40530,40534,40540,40578,40602,40611,40618,40641,40644,40652,40654,40663,40665,40673,40678,40694,40697,40703,40716,40723,40732,40744,40747,40756,40760,40764,40875,41025,41108,41165,41195,41201,41265,41299,41308,41419,41494,41581,41624,41716,41954,41955,41956,41957,41964,41965,41966,41983,41986,41991,41993,42001,42007,42009,42010,42011,42014,42026,42027,42039,42052,42059,42065,42079,42099,42106,42131,42139,42156,42157,42165,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42291,42294,42301,42303,42304,42317,42319,42322,42327,42330,42350,42351,42354,42361,42373,42381,42391,42402,42408,42424,42452,42461,42472,42475,42476,42480,42482,42496,42497,42504,42510,42531,42533,42538,42539,42544,42555,42571,42585,42586,42591,42592,42617,42631,42636,42646,42647,42648,42650,42651,42652,42654,42656,42663,42669,42674,42675,42677,42680,42683,42690,42698,42707,42713,42715,42729,42771,42797,42798,42802,42803,42809,42810,42819,42824,42832,42837,42840,42841,42843,42847,42853,42854,42856,42858,42859,42862,42867,42873,42877,42895,42898,42904,42908,42933,42936,42952,42961,42962,42978,42987,42998,42999,43005,43006,43009,43013,43015,43028,43061,43063,43064,43065,43068,43095,43097,43117,43141,43145,43151,43165,43176,43195,43202,43204,43211,43231,43244,43249,43253,43260,43276,43286,43288,43291,43300,43341,43390,43404,43440,43441,43467,43480,43495,43512,43527,43557,43562,43564,43565,43568,43585,43588,43656,43658,43673,43690,43712,43752,43775,43791,43794,43808,43835,43848,43866,43938,43951,43953,43978,43984,43992,44011,44013,44023,58070,63807,66521,66771,66828,66926,67019,67035,67177,67181,67191,67202,67244,67332,67333,67341,67345,67350,67363,67366,67376,67378,67393,67394,67404,67434,67444,67460,67461,67466,67472,67477,67488,67493,67506,67547,67551,67552,67569,67584,67587,67593,67594,67595,67621,67623,67626,67629,67631,67639,67655,67661,67662,67669,67670,67680,67682,67687,67690,67692,67693,67694,67701,67702,67703,67706,67709,67716,67727,67731,67734,67750,67751,67758,67759,67761,67766,67779,67781,67782,67783,67792,67793,67796,67805,67817,67826,67832,67836,67841,67842,67843,67872,67910,67916,67917,67935,67943,67946,67952,67966,67967,67971,67977,67990,68015,68019,68037,68041,68045,68046,68047,68054,68061,68064,68065,68066,68070,68089,68101,68103,68105,68106,68109,68112,68113,68115,68116,68124,68126,68127,68129,68146,68149,68152,68155,68160,68161,68162,68164,68170,68176,68180,68181,68188,68196,68197,68204,68209,68222,68226,68240,68257,68258,70568,70584,70734,71069,71157,71170,71216,71243,71382,71396,71731,71902,72016,72101,72216,72404,72416.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24982810262](https://github.com/openclaw/clawsweeper/actions/runs/24982810262)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3597 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3503 |
| Open items total | 7100 |
| Reviewed files | 6863 |
| Unreviewed open items | 237 |
| Archived closed files | 12935 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3529 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3327 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6856 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Closed by Codex apply | 10176 |
| Failed or stale reviews | 7 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 126/717 current (591 due, 17.6%) |
| Hourly hot item cadence (<7d) | 126/717 current (591 due, 17.6%) |
| Daily cadence coverage | 2773/4292 current (1519 due, 64.6%) |
| Daily PR cadence | 1589/2929 current (1340 due, 54.3%) |
| Daily new issue cadence (<30d) | 1184/1363 current (179 due, 86.9%) |
| Weekly older issue cadence | 1854/1854 current (0 due, 100%) |
| Due now by cadence | 2347 |

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

Latest review: Apr 27, 2026, 08:06 UTC. Latest close: Apr 27, 2026, 08:02 UTC. Latest comment sync: Apr 27, 2026, 08:21 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 452 | 1 |
| Last hour | 945 | 16 | 929 | 1 | 10 | 923 | 4 |
| Last 24 hours | 6181 | 927 | 5254 | 4 | 815 | 2261 | 10 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72460](https://github.com/openclaw/openclaw/pull/72460) | fix(gateway): align UI thinking default with runtime resolver | already implemented on main | Apr 27, 2026, 08:02 UTC | [closed/72460.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72460.md) |
| [#72458](https://github.com/openclaw/openclaw/pull/72458) | Fix/skills snapshot stale after restart | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72458.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72458.md) |
| [#72457](https://github.com/openclaw/openclaw/pull/72457) | Fix/onboard trim typeerror | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72457.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72457.md) |
| [#72456](https://github.com/openclaw/openclaw/pull/72456) | Fix/minimax m2.7 vlm support | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72456.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72456.md) |
| [#72453](https://github.com/openclaw/openclaw/pull/72453) | Fix/freebsd homebrew onboard | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72453.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72453.md) |
| [#72451](https://github.com/openclaw/openclaw/pull/72451) | Fix/exec approvals source field | already implemented on main | Apr 27, 2026, 08:01 UTC | [closed/72451.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72451.md) |
| [#72447](https://github.com/openclaw/openclaw/issues/72447) | Feature: Typing indicator during agent active processing | already implemented on main | Apr 27, 2026, 08:01 UTC | [closed/72447.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72447.md) |
| [#72444](https://github.com/openclaw/openclaw/pull/72444) | fix: follow symlinks to plugin directories in global extensions | duplicate or superseded | Apr 27, 2026, 08:01 UTC | [closed/72444.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72444.md) |
| [#71349](https://github.com/openclaw/openclaw/issues/71349) | memory-lancedb: autoCapture rarely fires; only 2 entries persisted across many sessions | already implemented on main | Apr 27, 2026, 07:41 UTC | [closed/71349.md](https://github.com/openclaw/clawsweeper/blob/main/closed/71349.md) |
| [#67207](https://github.com/openclaw/openclaw/pull/67207) | fix(discord): add regression tests and diagnostics for https URL preservation | cannot reproduce on current main | Apr 27, 2026, 07:41 UTC | [closed/67207.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67207.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67910](https://github.com/openclaw/openclaw/pull/67910) | fix(memory status): show light/deep/rem dreaming phase state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67910.md) | complete | Apr 27, 2026, 08:06 UTC |
| [#42978](https://github.com/openclaw/openclaw/pull/42978) | fix(auth): add bailian to PROVIDER_ENV_API_KEY_CANDIDATES | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42978.md) | complete | Apr 27, 2026, 08:04 UTC |
| [#42294](https://github.com/openclaw/openclaw/pull/42294) | fix(telegram): preserve audioAsVoice in outbound media sends | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/42294.md) | failed | Apr 27, 2026, 08:02 UTC |
| [#67990](https://github.com/openclaw/openclaw/issues/67990) | Proposal: Improved Backup Design with Configurable Exclusion Rules and Service-Aware Archiving | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67990.md) | complete | Apr 27, 2026, 07:59 UTC |
| [#68116](https://github.com/openclaw/openclaw/pull/68116) | feat(memory-lancedb): support reindex and drop-index command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68116.md) | complete | Apr 27, 2026, 07:59 UTC |
| [#67690](https://github.com/openclaw/openclaw/issues/67690) | Feature request: Improve context pruning/trimming mechanism visibility and control | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67690.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#68209](https://github.com/openclaw/openclaw/issues/68209) | [Bug]: Switching from openai-codex/gpt-5.4 to codex/gpt-5.4 can trigger runaway context growth and off-task workspace contamination | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68209.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#68037](https://github.com/openclaw/openclaw/issues/68037) | HTTP MCP gateway strips image/audio/resource fields from tool results (normalizeToolCallContent) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68037.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#72216](https://github.com/openclaw/openclaw/pull/72216) | fix(nostr): keep setup status off full surface | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72216.md) | complete | Apr 27, 2026, 07:58 UTC |
| [#68115](https://github.com/openclaw/openclaw/issues/68115) | [Feature]: First-class tool-plugin setup hook for global `openclaw setup` | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68115.md) | complete | Apr 27, 2026, 07:58 UTC |

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
