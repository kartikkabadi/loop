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

Last dashboard update: Apr 27, 2026, 06:46 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 27, 2026, 06:46 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 490. Item numbers: 6457,15591,16251,17684,18915,19362,19482,20802,25222,25295,25789,27061,27771,30142,32558,34542,34581,38709,39115,39137,39166,40144,40147,40155,40165,40194,40207,40210,40216,40217,40218,40220,40230,40236,40238,40268,40277,40287,40289,40290,40296,40311,40314,40317,40332,40352,40355,40366,40387,40402,40418,40421,40423,40427,40438,40440,40446,40447,40453,40463,40464,40472,40481,40485,40502,40527,40530,40534,40540,40578,40602,40611,40618,40641,40644,40652,40654,40663,40665,40673,40678,40694,40697,40703,40716,40723,40732,40744,40747,40756,40760,40764,40875,41025,41108,41165,41195,41201,41265,41299,41308,41419,41494,41581,41624,41716,41954,41955,41956,41957,41964,41965,41966,41983,41986,41991,41993,42001,42007,42009,42010,42011,42014,42026,42027,42039,42052,42059,42065,42079,42083,42099,42106,42131,42139,42156,42157,42165,42174,42196,42197,42201,42207,42208,42213,42222,42223,42243,42245,42252,42253,42258,42259,42261,42271,42273,42291,42294,42301,42303,42304,42317,42319,42322,42327,42330,42350,42351,42354,42361,42373,42381,42391,42402,42408,42424,42452,42461,42472,42475,42476,42480,42482,42496,42497,42504,42510,42531,42533,42538,42539,42544,42555,42571,42585,42586,42591,42592,42617,42631,42636,42646,42647,42648,42650,42651,42652,42654,42656,42663,42669,42674,42675,42677,42680,42683,42690,42698,42707,42713,42715,42729,42771,42797,42798,42802,42803,42809,42810,42819,42824,42832,42837,42840,42841,42843,42847,42853,42854,42856,42858,42859,42862,42867,42873,42877,42895,42898,42904,42908,42933,42936,42952,42961,42962,42978,42987,42998,42999,43005,43006,43009,43013,43015,43028,43061,43063,43064,43065,43068,43095,43097,43117,43141,43145,43151,43165,43176,43195,43202,43204,43211,43231,43244,43249,43253,43260,43276,43286,43288,43291,43300,43341,43390,43404,43440,43441,43467,43480,43495,43512,43527,43557,43562,43564,43565,43568,43585,43588,43616,43656,43658,43673,43690,43712,43743,43752,43775,43791,43794,43808,43835,43848,43866,43938,43951,43953,43978,43984,43992,44011,44013,44023,58070,66521,66771,66926,67019,67035,67177,67181,67191,67202,67244,67332,67333,67335,67341,67345,67350,67363,67366,67376,67378,67393,67394,67404,67434,67444,67460,67461,67466,67472,67477,67488,67493,67506,67547,67551,67552,67569,67584,67587,67593,67594,67595,67621,67623,67626,67629,67631,67639,67655,67661,67662,67669,67670,67680,67682,67687,67690,67692,67693,67694,67701,67702,67703,67706,67709,67716,67727,67728,67731,67734,67750,67751,67758,67759,67761,67766,67779,67781,67782,67783,67784,67792,67793,67796,67805,67817,67826,67832,67836,67841,67842,67843,67868,67872,67910,67916,67917,67924,67935,67943,67946,67952,67959,67966,67967,67971,67976,67977,67986,67988,67990,68010,68015,68019,68037,68041,68045,68046,68047,68054,68061,68064,68065,68066,68070,68089,68101,68103,68105,68106,68109,68112,68113,68115,68116,68124,68126,68127,68129,68146,68149,68152,68155,68160,68161,68162,68164,68170,68176,68179,68180,68181,68188,68196,68197,68204,68209,68222,68226,68240,68257,68258,68264,71902,72216,72433.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24979651048](https://github.com/openclaw/clawsweeper/actions/runs/24979651048)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3623 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3523 |
| Open items total | 7146 |
| Reviewed files | 6916 |
| Unreviewed open items | 230 |
| Archived closed files | 12865 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3550 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3349 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6899 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Closed by Codex apply | 10162 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 102/729 current (627 due, 14%) |
| Hourly hot item cadence (<7d) | 102/729 current (627 due, 14%) |
| Daily cadence coverage | 3796/4330 current (534 due, 87.7%) |
| Daily PR cadence | 2512/2955 current (443 due, 85%) |
| Daily new issue cadence (<30d) | 1284/1375 current (91 due, 93.4%) |
| Weekly older issue cadence | 1857/1857 current (0 due, 100%) |
| Due now by cadence | 1391 |

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

Latest review: Apr 27, 2026, 06:32 UTC. Latest close: Apr 27, 2026, 05:46 UTC. Latest comment sync: Apr 27, 2026, 06:46 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 0 | 3 | 0 | 0 | 490 | 3 |
| Last hour | 1000 | 10 | 990 | 0 | 0 | 1151 | 6 |
| Last 24 hours | 7544 | 1170 | 6374 | 1 | 1073 | 2643 | 13 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72433](https://github.com/openclaw/openclaw/pull/72433) | test(gateway): move SecretInputs probe auth regression | duplicate or superseded | Apr 27, 2026, 06:42 UTC | [closed/72433.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72433.md) |
| [#68179](https://github.com/openclaw/openclaw/pull/68179) | fix(discord): use normalized target in parseDiscordExplicitTarget | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/68179.md](https://github.com/openclaw/clawsweeper/blob/main/closed/68179.md) |
| [#67959](https://github.com/openclaw/openclaw/pull/67959) | fix(channels): parallelize status probes | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/67959.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67959.md) |
| [#67924](https://github.com/openclaw/openclaw/pull/67924) | fix(exec): tolerate  inside Python/JS string literals during preflight | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/67924.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67924.md) |
| [#67335](https://github.com/openclaw/openclaw/issues/67335) | Bug: gateway LaunchAgent is sometimes removed from launchd domain and requires doctor/re-bootstrap | already implemented on main | Apr 27, 2026, 06:42 UTC | [closed/67335.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67335.md) |
| [#67292](https://github.com/openclaw/openclaw/pull/67292) | fix(openai-transport): handle Mistral reasoning_content as non-string delta content | duplicate or superseded | Apr 27, 2026, 06:42 UTC | [closed/67292.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67292.md) |
| [#67236](https://github.com/openclaw/openclaw/issues/67236) | [qqbot] 同一条消息触发 Agent 重复回复 2-3 次 | already implemented on main | Apr 27, 2026, 06:41 UTC | [closed/67236.md](https://github.com/openclaw/clawsweeper/blob/main/closed/67236.md) |
| [#66546](https://github.com/openclaw/openclaw/pull/66546) | feat(sessions): add transcriptRotateBytes and transcriptMaxLines to cap .jsonl growth | duplicate or superseded | Apr 27, 2026, 06:41 UTC | [closed/66546.md](https://github.com/openclaw/clawsweeper/blob/main/closed/66546.md) |
| [#56538](https://github.com/openclaw/openclaw/pull/56538) | fix: use TextDecoder for proper GBK encoding support on Windows | duplicate or superseded | Apr 27, 2026, 06:41 UTC | [closed/56538.md](https://github.com/openclaw/clawsweeper/blob/main/closed/56538.md) |
| [#43743](https://github.com/openclaw/openclaw/issues/43743) | [Bug]: WebUI chat, Chinese characters cannot be displayed properly in thinking/working output card | already implemented on main | Apr 27, 2026, 06:41 UTC | [closed/43743.md](https://github.com/openclaw/clawsweeper/blob/main/closed/43743.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#68010](https://github.com/openclaw/openclaw/pull/68010) | fix(providers): defer OpenRouter env var candidates to lazy proxy (#67989) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68010.md) | complete | Apr 27, 2026, 06:32 UTC |
| [#67784](https://github.com/openclaw/openclaw/issues/67784) | Mattermost message tool handler ignores threadId, filePath/path, and mediaLocalRoots | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67784.md) | complete | Apr 27, 2026, 06:32 UTC |
| [#67868](https://github.com/openclaw/openclaw/issues/67868) | memory status reports \"Dreaming: off\" when only light phase is enabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67868.md) | complete | Apr 27, 2026, 06:32 UTC |
| [#67986](https://github.com/openclaw/openclaw/issues/67986) | [Bug]: Gateway wedges silently mid-session after 2026.4.15 — only recovers on WhatsApp 408 + health monitor restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67986.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#68264](https://github.com/openclaw/openclaw/issues/68264) | [Bug] Canvas/Browser UI Visualization Fails to Render in Chat Environment | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68264.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67988](https://github.com/openclaw/openclaw/issues/67988) | Control UI: Model dropdown shows alias/key instead of display name for Claude Opus 4.7 and Claude Sonnet 4.6 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67988.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67728](https://github.com/openclaw/openclaw/issues/67728) | Browser: Remote CDP WebSocket needs auto-reconnect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67728.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67976](https://github.com/openclaw/openclaw/issues/67976) | [Bug] imageModel调用火山引擎API返回404错误 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67976.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67692](https://github.com/openclaw/openclaw/pull/67692) | Feat/acp tui lazy init | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/67692.md) | complete | Apr 27, 2026, 06:31 UTC |
| [#67990](https://github.com/openclaw/openclaw/issues/67990) | Proposal: Improved Backup Design with Configurable Exclusion Rules and Service-Aware Archiving | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67990.md) | complete | Apr 27, 2026, 06:31 UTC |

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
