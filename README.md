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

Last dashboard update: Apr 28, 2026, 06:01 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 06:01 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 334. Item numbers: 6457,17098,18160,24754,25295,25789,27771,32558,38161,39604,40155,40165,40209,40215,40230,40277,40287,40366,40387,40392,40402,40423,40463,40472,40522,40611,40641,40673,40694,40716,40875,41025,41082,41088,41108,41111,41120,41135,41168,41195,41199,41243,41265,41272,41283,41299,41304,41346,41355,41366,41372,41410,41418,41444,41461,41473,41474,41483,41494,41495,41501,41517,41548,41555,41561,41572,41583,41588,41594,41608,41609,41619,41624,41649,41657,41665,41670,41671,41676,41685,41718,41722,41740,41744,41750,41755,41779,41795,41799,41803,41826,41833,41837,41853,41854,41858,41862,41866,41879,41882,41892,41897,41899,41933,41940,41943,41949,41954,41955,41964,41983,41986,41993,42001,42007,42009,42010,42011,42027,42039,42052,42059,42065,42099,42156,42157,42174,42196,42197,42201,42207,42208,42222,42223,42243,42245,42252,42258,42259,42261,42271,42273,42301,42303,42304,42317,42319,42322,42330,42351,42354,42361,42373,42381,42391,42402,42408,42424,42425,42452,42461,42533,42538,42571,42585,42592,42631,42636,42637,42646,42650,42663,42669,42674,42675,42677,42683,42690,42713,42715,42729,42771,42798,42802,42810,42820,42832,42837,42843,42847,42853,42859,42862,42877,42898,42904,42908,42933,42936,42952,42962,42986,42987,42998,42999,43015,43028,43064,43068,43117,43145,43195,43202,43211,43244,43249,43253,43260,43276,43341,43367,43390,43404,43411,43443,43467,43527,43563,43570,43588,43609,43658,43737,43775,43848,43938,43951,43974,43992,44130,44134,44136,44143,44148,44150,44160,44165,44166,44168,44178,44179,44205,44215,44223,44228,44255,44260,44281,44289,44291,44292,44293,44294,44296,44297,44309,44316,44319,44323,44346,44347,44348,44353,44354,44358,44363,44373,44375,44379,44382,44385,44391,44401,44424,44428,44431,44445,44448,44458,44460,44471,44475,44484,44502,44510,44523,44534,44539,44540,44555,44559,44561,44565,44569,44571,44578,44581,44584,44588,44599,44621,44628,44635,44640,44662,44671,44673,44676,44680,44683,44695,44710,44734,44735,44749,44759,44789,44794,44810,44811,44814,44816,44820,44824,44828,44829,44833,44841,44845,44859,44870,44881,44884,44886,44888,44896,44897,44900,44905,44910,44922,44925,44930,44935,44941,44957,44970,44972,44973,44986,44993,45011,45016,45017,45020,45028,45031,45041,45044,45049,45050,45062,45082,45102,45114,45129,45134,45158,45179,45184,45200,45209,45210,45216,45220,45224,45228,45262,45268,45269,45270,45271,45276,45288,45290,45301,45309,45710,49145,52894,52928,53881,55047,56161,58070,58805,58971,59787,60497,62353,62364,62431,62927,63073,63082,63418,64037,64512,64784,65023,65185,65685,65726,65824,65919,65945,65974,66146,66200,66251,66263,66279,66305,66327,66344,66377,66465,66509,66517,66534,66535,66573,66605,66631,66656,66685,66686,66700,66701,66705,66716,66744,66747,66761,66766,66781,66783,66791,66795,66804,66807,66830,66832,66838,66841,66846,66847,66862,66867,66953,68317,68561,68587,68615,68654,68719,68782,68783,68789,68793,68800,68815,68843,68847,68857,68860,68871,68896,68904,68916,69297,70898,71060,71903,72069,72081,72092,72174,72178,72384.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25035698384](https://github.com/openclaw/clawsweeper/actions/runs/25035698384)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3575 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3468 |
| Open items total | 7043 |
| Reviewed files | 6562 |
| Unreviewed open items | 481 |
| Archived closed files | 13269 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3382 |
| Proposed issue closes | 10 (0.3% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3180 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6562 |
| Proposed closes awaiting apply | 13 (0.2% of fresh reviews) |
| Closed by Codex apply | 10236 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 9/597 current (588 due, 1.5%) |
| Hourly hot item cadence (<7d) | 9/597 current (588 due, 1.5%) |
| Daily cadence coverage | 1315/4110 current (2795 due, 32%) |
| Daily PR cadence | 879/2842 current (1963 due, 30.9%) |
| Daily new issue cadence (<30d) | 436/1268 current (832 due, 34.4%) |
| Weekly older issue cadence | 1855/1855 current (0 due, 100%) |
| Due now by cadence | 3864 |

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

Latest review: Apr 28, 2026, 05:45 UTC. Latest close: Apr 28, 2026, 03:52 UTC. Latest comment sync: Apr 28, 2026, 06:01 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 334 | 2 |
| Last hour | 500 | 15 | 485 | 0 | 0 | 334 | 2 |
| Last 24 hours | 2189 | 103 | 2086 | 1 | 72 | 1063 | 15 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#72512](https://github.com/openclaw/openclaw/pull/72512) | fix(webchat): guard Enter-to-send when a request is already in flight (#72157) | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72512.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72512.md) |
| [#72507](https://github.com/openclaw/openclaw/issues/72507) | Bug: sessions.json grows unbounded due to static schema serialized into dynamic session state | duplicate or superseded | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72507.md) |
| [#72286](https://github.com/openclaw/openclaw/pull/72286) | Add Google Live browser Talk sessions | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72286.md) |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70597.md) |
| [#65147](https://github.com/openclaw/openclaw/pull/65147) | fix: add --force flag to npm install -g for container updates | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/65147.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65147.md) |
| [#64559](https://github.com/openclaw/openclaw/pull/64559) | fix(plugins): emit message_received hook for queued inbound messages (#64525) | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/64559.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/64559.md) |
| [#62976](https://github.com/openclaw/openclaw/issues/62976) | Doctor cannot recover from invalid third-party plugin config; gateway hard-fails to start | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/62976.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62976.md) |
| [#54740](https://github.com/openclaw/openclaw/issues/54740) | doctor: 3 false positives make health output unusable on any non-trivial install | duplicate or superseded | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/54740.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54740.md) |
| [#54665](https://github.com/openclaw/openclaw/issues/54665) | [2026.3.24] FATAL ERROR: RegExpCompiler Allocation failed — gateway crashes on startup, OOM in V8 regex compiler | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/54665.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/54665.md) |
| [#41593](https://github.com/openclaw/openclaw/pull/41593) | fix(daemon): include OrbStack and Docker Desktop in macOS LaunchAgent PATH | duplicate or superseded | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/41593.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/41593.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73295](https://github.com/openclaw/openclaw/pull/73295) | Add Discord stuck-session circuit breaker | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73295.md) | complete | Apr 28, 2026, 05:58 UTC |
| [#44814](https://github.com/openclaw/openclaw/pull/44814) | fix: make webui attachment maxBytes configurable (fixes #44757) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44814.md) | complete | Apr 28, 2026, 05:51 UTC |
| [#44640](https://github.com/openclaw/openclaw/pull/44640) | fix: three critical bug fixes for device pairing, Discord threads, and Feishu redirect | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44640.md) | complete | Apr 28, 2026, 05:51 UTC |
| [#44828](https://github.com/openclaw/openclaw/pull/44828) | fix(feishu): suppress NO_REPLY silent token before API send | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44828.md) | complete | Apr 28, 2026, 05:51 UTC |
| [#44671](https://github.com/openclaw/openclaw/pull/44671) | fix(docker): allow whitespace in config and workspace paths | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44671.md) | complete | Apr 28, 2026, 05:51 UTC |
| [#44735](https://github.com/openclaw/openclaw/pull/44735) | fix(doctor): skip feishu auto-enable when alternative feishu plugin is enabled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44735.md) | complete | Apr 28, 2026, 05:50 UTC |
| [#44824](https://github.com/openclaw/openclaw/pull/44824) | build(docs): make check:docs PowerShell-compatible | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44824.md) | complete | Apr 28, 2026, 05:50 UTC |
| [#44888](https://github.com/openclaw/openclaw/pull/44888) | fix(agents): compact Kimi tool schemas for openai-completions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44888.md) | complete | Apr 28, 2026, 05:50 UTC |
| [#44680](https://github.com/openclaw/openclaw/pull/44680) | Feat/backup checksum integrity | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44680.md) | complete | Apr 28, 2026, 05:50 UTC |
| [#44973](https://github.com/openclaw/openclaw/pull/44973) | fix(cron): deduplicate main-session systemEvent in heartbeat prompt (issue #44922) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44973.md) | complete | Apr 28, 2026, 05:50 UTC |

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
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
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
