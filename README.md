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

Last dashboard update: Apr 28, 2026, 07:08 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 28, 2026, 07:08 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 347. Item numbers: 10356,15591,17311,17684,18915,19362,19482,20802,23096,25222,27061,30142,34542,34581,38327,38502,39102,39115,39137,39166,40147,40194,40207,40210,40216,40218,40220,40236,40238,40255,40268,40289,40290,40296,40311,40314,40317,40332,40352,40355,40418,40421,40427,40438,40440,40447,40453,40464,40481,40485,40502,40527,40530,40534,40540,40578,40602,40618,40644,40652,40654,40663,40665,40678,40697,40703,40723,40732,40744,40747,40756,40760,40764,40768,40782,40786,40791,40808,40820,40828,40829,40840,40846,40847,40848,40864,40873,40880,40894,40895,40919,40945,40948,40950,40953,40958,40961,40970,40982,40991,41009,41013,41022,41031,41037,41038,41048,41064,41067,41140,41172,41204,41206,41254,41255,41256,41259,41268,41275,41284,41296,41306,41320,41324,41332,41351,41368,41398,41421,41545,41546,41552,41559,41598,41613,41614,41621,41628,41637,41651,41653,41659,41660,41696,41714,41734,41737,41745,41783,41792,41807,41812,41824,41851,41860,41880,41946,41956,41957,41966,41985,41987,41991,42026,42139,42165,42291,42294,42350,42472,42475,42480,42497,42504,42541,42542,42544,42555,42591,42617,42648,42651,42652,42654,42656,42803,42824,42840,42856,42867,42895,43013,43238,43286,43454,43456,43469,43565,43574,43605,43690,43735,43797,43832,43866,43950,43976,43996,44329,45315,45320,45342,45344,45374,45383,45393,45417,45421,45449,45454,45465,45523,45524,45525,45530,45535,45592,45594,45602,45612,45613,45626,45662,45664,45673,45677,45683,45684,45704,45712,45739,45751,45760,45782,45783,45784,45808,45831,45832,45863,45870,45871,45876,45887,45899,45901,45912,45921,45925,45930,45937,45979,45990,46055,46131,46168,46177,46221,46258,46268,46291,46300,46362,46371,46373,46377,46380,46405,46406,46423,46455,46472,46485,46502,46506,46537,46559,46589,46593,46607,46626,46653,46660,46693,46697,46698,46720,46740,46752,46753,46782,46805,46834,46837,46858,46881,46895,46904,46926,46940,46947,46949,46956,46962,46985,46992,47007,47029,47069,47083,47087,47162,47181,47187,47216,47225,47234,47243,47245,47255,47277,47285,47291,47302,47318,47327,47365,47377,47384,47387,47393,47398,47399,47407,47446,47479,47486,47491,47493,47505,47540,47542,47562,47566,47582,47589,47613,47631,47651,47654,47663,47672,47677,47693,47696,47706,47710,47723,47739,47743,47754,47788,47859,47878,47933,47935,47961,47992,47996,48133,48200,48260,48406,48476,48554,48606,50276,51455,52244,52664,53643,54607,54786,55085,55761,55943,55986,56383,56651,56693,57449,58277,58942,58987,59411,59752,59998,60127,60226,60444,60485,60542,60858,60934,62204,62727,63463,63760,63855,63884,63892,63941,64046,64060,64103,64175,64220,64315,64334,64426,64540,64555,64613,64758,65065,65385,66076,66342,66395,66551,66657,66911,66913,66985,67221,67243,67333,67350,67431,67443,67670,68121,68186,68259,68280,68314,68339,68680,68683,68779,68850,68864,68876,68893,69056,69270,69634,70268,70472,70586,70638,70682,70811,70812,70859,70864,71127,71142,71185,71736,71792,71820,71841,71853,71857,72015,72044,72101,72129,72171,72268,72293,72338,72341,72363,72373,72449,72454,72480,72491.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25037687176](https://github.com/openclaw/clawsweeper/actions/runs/25037687176)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3566 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3462 |
| Open items total | 7028 |
| Reviewed files | 6580 |
| Unreviewed open items | 448 |
| Archived closed files | 13305 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3370 |
| Proposed issue closes | 10 (0.3% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3188 |
| Proposed PR closes | 8 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6558 |
| Proposed closes awaiting apply | 18 (0.3% of fresh reviews) |
| Closed by Codex apply | 10255 |
| Failed or stale reviews | 22 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 109/635 current (526 due, 17.2%) |
| Hourly hot item cadence (<7d) | 109/635 current (526 due, 17.2%) |
| Daily cadence coverage | 1487/4097 current (2610 due, 36.3%) |
| Daily PR cadence | 1063/2834 current (1771 due, 37.5%) |
| Daily new issue cadence (<30d) | 424/1263 current (839 due, 33.6%) |
| Weekly older issue cadence | 1844/1848 current (4 due, 99.8%) |
| Due now by cadence | 3588 |

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

Latest review: Apr 28, 2026, 06:53 UTC. Latest close: Apr 28, 2026, 06:50 UTC. Latest comment sync: Apr 28, 2026, 07:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 366 | 3 |
| Last hour | 862 | 27 | 835 | 2 | 4 | 834 | 8 |
| Last 24 hours | 2419 | 118 | 2301 | 10 | 65 | 1309 | 17 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73353](https://github.com/openclaw/openclaw/issues/73353) | 60s startup hang in sidecars.channels — synchronous plugin manifest re-discovery on every cold start (v2026.4.26) | already implemented on main | Apr 28, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73353.md) |
| [#73348](https://github.com/openclaw/openclaw/issues/73348) | openclaw update can succeed while the running gateway stays on an older version, causing plugin/config version skew | already implemented on main | Apr 28, 2026, 06:50 UTC | [records/openclaw-openclaw/closed/73348.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73348.md) |
| [#73344](https://github.com/openclaw/openclaw/issues/73344) | [Bug]: /new on openai-codex/* (Responses API) returns \"One of input/previous_response_id/prompt/conversation_id must be provided\" — regression in 2026.4.26 | already implemented on main | Apr 28, 2026, 06:45 UTC | [records/openclaw-openclaw/closed/73344.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73344.md) |
| [#73331](https://github.com/openclaw/openclaw/issues/73331) | v2026.4.26: Gateway busy-loops on bundled openai SDK directory walk; stops accepting connections | already implemented on main | Apr 28, 2026, 06:22 UTC | [records/openclaw-openclaw/closed/73331.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73331.md) |
| [#73329](https://github.com/openclaw/openclaw/issues/73329) | [Bug]: Gateway hard-couples to OpenRouter + LiteLLM pricing fetches at boot; no opt-out | duplicate or superseded | Apr 28, 2026, 06:20 UTC | [records/openclaw-openclaw/closed/73329.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73329.md) |
| [#72512](https://github.com/openclaw/openclaw/pull/72512) | fix(webchat): guard Enter-to-send when a request is already in flight (#72157) | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72512.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72512.md) |
| [#72507](https://github.com/openclaw/openclaw/issues/72507) | Bug: sessions.json grows unbounded due to static schema serialized into dynamic session state | duplicate or superseded | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72507.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72507.md) |
| [#72286](https://github.com/openclaw/openclaw/pull/72286) | Add Google Live browser Talk sessions | already implemented on main | Apr 28, 2026, 03:52 UTC | [records/openclaw-openclaw/closed/72286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72286.md) |
| [#70597](https://github.com/openclaw/openclaw/pull/70597) | yuanbao channel | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/70597.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70597.md) |
| [#65147](https://github.com/openclaw/openclaw/pull/65147) | fix: add --force flag to npm install -g for container updates | already implemented on main | Apr 28, 2026, 03:51 UTC | [records/openclaw-openclaw/closed/65147.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/65147.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73350](https://github.com/openclaw/openclaw/issues/73350) | MiniMax-only configuration still invokes claude-cli/codex-cli and can hang TUI/model execution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73350.md) | complete | Apr 28, 2026, 06:53 UTC |
| [#60444](https://github.com/openclaw/openclaw/pull/60444) | fix: replace structuredClone with JSON cloning in session store cache | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60444.md) | complete | Apr 28, 2026, 06:53 UTC |
| [#55761](https://github.com/openclaw/openclaw/pull/55761) | fix(hooks): suppress silent shared-hook fallback while preserving error surfacing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55761.md) | complete | Apr 28, 2026, 06:51 UTC |
| [#73347](https://github.com/openclaw/openclaw/pull/73347) | fix(wizard): use setup token for onboarding health check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73347.md) | complete | Apr 28, 2026, 06:50 UTC |
| [#72069](https://github.com/openclaw/openclaw/pull/72069) | fix(agents): seed claude-cli fallback prompts with prior-session context (#69973) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72069.md) | complete | Apr 28, 2026, 06:49 UTC |
| [#72899](https://github.com/openclaw/openclaw/issues/72899) | Empty-text ContentBlock persisted to transcript permanently bricks a session (Bedrock validation error: messages.N.content.0 is blank) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72899.md) | complete | Apr 28, 2026, 06:49 UTC |
| [#46406](https://github.com/openclaw/openclaw/pull/46406) | fix(bootstrap-cache): invalidate on mtime + fix(exec): skip resolveWorkdir for host=node (#46396, #46395) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46406.md) | complete | Apr 28, 2026, 06:49 UTC |
| [#72973](https://github.com/openclaw/openclaw/pull/72973) | fix(media): strip control and bidi characters from outbound filenames | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72973.md) | complete | Apr 28, 2026, 06:49 UTC |
| [#72997](https://github.com/openclaw/openclaw/issues/72997) | Feature request: channel reload <provider> command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72997.md) | complete | Apr 28, 2026, 06:49 UTC |
| [#72995](https://github.com/openclaw/openclaw/issues/72995) | [Bug]: web_search tool aborts silently with Gemini provider — instantaneous abort, no err.log entry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72995.md) | complete | Apr 28, 2026, 06:48 UTC |

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
