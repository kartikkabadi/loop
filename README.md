# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently covers `openclaw/openclaw` and `openclaw/clawhub`.

It has two independent lanes:

- issue/PR sweeper: keeps one markdown report per open issue or PR, publishes
  one durable Codex automated review comment when useful, and only closes items
  when the evidence is strong
- commit sweeper: reviews code-bearing commits that land on `main`, writes one
  canonical markdown report per commit, and optionally publishes a GitHub Check
  Run for that commit

## Capabilities

- **Repository profiles:** per-repository rules live in
  `src/repository-profiles.ts`, so OpenClaw and ClawHub can share the same
  engine while keeping different apply limits.
- **Issue and PR intake:** scheduled runs scan open issues and pull requests,
  while target repositories can forward exact issue/PR events with
  `repository_dispatch` for low-latency one-item reviews.
- **Codex review reports:** each issue or PR becomes
  `records/<repo-slug>/items/<number>.md` with the decision, evidence, proposed
  maintainer-facing comment, runtime metadata, and GitHub snapshot hash.
- **Durable review comments:** ClawSweeper syncs one marker-backed public review
  comment per item and edits it in place instead of posting repeated comments.
- **Guarded apply:** apply mode re-fetches live GitHub state, checks labels,
  maintainer authorship, paired issue/PR state, snapshot drift, and repository
  profile rules before commenting or closing anything.
- **Archive and reopen handling:** closed or already-closed reports move to
  `records/<repo-slug>/closed/<number>.md`; reopened archived items move back to
  `items/` as stale work.
- **Dashboard:** this README contains the generated fleet dashboard with current
  run state, cadence health, recent reviews, recent closes, and work candidates.
- **Workflow status markers:** `pnpm run status` updates per-repository README
  status blocks so long-running workflows can publish progress without changing
  report data.
- **Audit:** `pnpm run audit` compares live GitHub state with report storage and
  can publish Audit Health into this README without mutating issues or PRs.
- **Reconcile:** `pnpm run reconcile` repairs report placement drift such as
  reopened archived records or closed items still sitting in `items/`.
- **Work candidates:** valid, narrow items can be marked as
  `queue_fix_pr` candidates for manual ProjectClownfish promotion; ClawSweeper
  itself does not open implementation PRs.
- **Commit review:** push events on target `main` branches can dispatch to
  `.github/workflows/commit-review.yml`, which expands the commit range, skips
  non-code-only commits cheaply, starts one Codex worker per code-bearing
  commit, and writes `records/<repo-slug>/commits/<sha>.md`.
- **Manual reruns and backfills:** both lanes support manual workflow dispatch.
  Commit review supports exact SHAs, historic ranges with `before_sha`, and an
  `additional_prompt` input for one-off review instructions.
- **Commit report queries:** `pnpm commit-reports -- --since 24h`,
  `--findings`, `--non-clean`, `--repo`, and `--author` make the flat per-SHA
  commit storage easy to review by time window without date folders.
- **Optional commit checks:** commit reports are the source of truth; target
  commit Check Runs are disabled by default and can be enabled per run or repo.
- **Clownfish repair dispatch:** commit reports with `result: findings` can
  dispatch to Clownfish, where a separate intake writes an audit record and only
  creates a PR when the finding is narrow, non-security, and still relevant on
  latest `main`.

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

Last dashboard update: Apr 29, 2026, 03:15 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4422 |
| Open PRs | 3485 |
| Open items total | 7907 |
| Reviewed files | 7510 |
| Unreviewed open items | 397 |
| Due now by cadence | 2004 |
| Proposed closes awaiting apply | 15 |
| Work candidates awaiting promotion | 342 |
| Closed by Codex apply | 10619 |
| Failed or stale reviews | 36 |
| Archived closed files | 13935 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6989 | 6600 | 389 | 1943 | 15 | 305 | 10614 | Apr 29, 2026, 03:02 UTC | Apr 29, 2026, 02:57 UTC | 510 |
| [ClawHub](https://github.com/openclaw/clawhub) | 918 | 910 | 8 | 61 | 0 | 37 | 5 | Apr 29, 2026, 03:02 UTC | Apr 29, 2026, 02:50 UTC | 1 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 03:15 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25087253354) |
| [ClawHub](https://github.com/openclaw/clawhub) | Hot intake publish complete | Apr 29, 2026, 03:03 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25088482974) |

### Fleet Activity

Latest review: Apr 29, 2026, 03:02 UTC. Latest close: Apr 29, 2026, 02:57 UTC. Latest comment sync: Apr 29, 2026, 03:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 6 | 2 | 4 | 1 | 0 | 431 | 1 |
| Last hour | 803 | 21 | 782 | 18 | 41 | 511 | 2 |
| Last 24 hours | 6954 | 414 | 6540 | 33 | 716 | 1450 | 29 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73514](https://github.com/openclaw/openclaw/pull/73514) | fix(feishu): support form_value in card action callbacks | closed externally after review | Apr 29, 2026, 03:09 UTC | [records/openclaw-openclaw/closed/73514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73514.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44841](https://github.com/openclaw/openclaw/pull/44841) | docs: use secret-scanner-safe credential placeholders | closed externally after review | Apr 29, 2026, 03:06 UTC | [records/openclaw-openclaw/closed/44841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44841.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73847](https://github.com/openclaw/openclaw/pull/73847) | fix(plugins): key web-provider snapshot cache on config-content fingerprint (#73730) | closed externally after review | Apr 29, 2026, 03:06 UTC | [records/openclaw-openclaw/closed/73847.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73847.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73871](https://github.com/openclaw/openclaw/pull/73871) | Set up Codex Computer Use during onboarding | closed externally after review | Apr 29, 2026, 03:05 UTC | [records/openclaw-openclaw/closed/73871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73871.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74018](https://github.com/openclaw/openclaw/issues/74018) | Feature request: Split chat from activity/workbench in Control UI | duplicate or superseded | Apr 29, 2026, 03:04 UTC | [records/openclaw-openclaw/closed/74018.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74018.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74011](https://github.com/openclaw/openclaw/issues/74011) | [Bug]: Slack channel provider crash-loops on Windows with ERR_UNSUPPORTED_ESM_URL_SCHEME ('Received protocol c:') after wizard-driven setup | already implemented on main | Apr 29, 2026, 02:57 UTC | [records/openclaw-openclaw/closed/74011.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74011.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73999](https://github.com/openclaw/openclaw/pull/73999) | feat(skills): add persist flag and trustedSources config for commercial use | closed externally after review | Apr 29, 2026, 02:53 UTC | [records/openclaw-openclaw/closed/73999.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73999.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71027](https://github.com/openclaw/openclaw/pull/71027) | build(deps): bump useblacksmith/build-push-action from 2.1.0 to 2.2.0 in the actions group across 1 directory | kept open | Apr 29, 2026, 02:53 UTC | [records/openclaw-openclaw/closed/71027.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71027.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69379](https://github.com/openclaw/openclaw/pull/69379) | fix(compaction): preflight/memoryFlush gates respect reserveTokens above floor | closed externally after review | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/closed/69379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69379.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74019](https://github.com/openclaw/openclaw/issues/74019) | [Bug]: Lobster workflow calling llm-task fails with “No callable tools remain” when tools.alsoAllow includes lobster/llm-task | high | candidate | Apr 29, 2026, 03:08 UTC | [records/openclaw-openclaw/items/74019.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74019.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74020](https://github.com/openclaw/openclaw/issues/74020) | Gateway startup: models.mode=replace should skip pricing fetches | high | candidate | Apr 29, 2026, 03:04 UTC | [records/openclaw-openclaw/items/74020.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74020.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73683](https://github.com/openclaw/openclaw/issues/73683) | Session bootstrap race condition sends zero messages to zai/glm-5.1 causing 400 error | high | candidate | Apr 29, 2026, 02:59 UTC | [records/openclaw-openclaw/items/73683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73683.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 02:57 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | Apr 29, 2026, 02:54 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 02:54 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73875](https://github.com/openclaw/openclaw/issues/73875) | BUG: ACP runtime sends unsupported config options to Claude ACP adapter | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/73875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73875.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73878.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/73865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73876](https://github.com/openclaw/openclaw/issues/73876) | [Bug]: Direct provider names inconsistency (Eg.  'moonshot' should be 'moonshotai' to match OpenRouter slug convention) | high | candidate | Apr 29, 2026, 02:50 UTC | [records/openclaw-openclaw/items/73876.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73876.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39223](https://github.com/openclaw/openclaw/issues/39223) | [Bug]: Configure wizard hangs at Gateway selection - blocks OAuth auth flow | high | candidate | Apr 29, 2026, 02:50 UTC | [records/openclaw-openclaw/items/39223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39223.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63098](https://github.com/openclaw/openclaw/issues/63098) | Discord voice: Bot joins channel then immediately leaves with \"The operation was aborted\" after 2026.4.5 update | high | candidate | Apr 29, 2026, 02:49 UTC | [records/openclaw-openclaw/items/63098.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63098.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69118](https://github.com/openclaw/openclaw/issues/69118) | Claude CLI sessions reset on every turn in group channels due to groupIntro drift in extraSystemPromptHash | high | candidate | Apr 29, 2026, 02:48 UTC | [records/openclaw-openclaw/items/69118.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69118.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38907](https://github.com/openclaw/openclaw/issues/38907) | ACP bridge sessions fail with acp_session_init_failed (echo + end_turn, no chunks) | high | candidate | Apr 29, 2026, 02:48 UTC | [records/openclaw-openclaw/items/38907.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38907.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | failed | Apr 29, 2026, 03:02 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1878.md) | complete | Apr 29, 2026, 03:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74017](https://github.com/openclaw/openclaw/issues/74017) | oc llm scorer incorrectly marks correct MCQ final answers wrong when ambiguity_flag=true | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74017.md) | complete | Apr 29, 2026, 03:02 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#49396](https://github.com/openclaw/openclaw/pull/49396) | fix(ui): use precise hourly message counts for Peak Error Hours | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49396.md) | complete | Apr 29, 2026, 03:01 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74015](https://github.com/openclaw/openclaw/issues/74015) | [Feature]: Support writable user prompt modification in existing Plugin SDK hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74015.md) | complete | Apr 29, 2026, 03:01 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74016](https://github.com/openclaw/openclaw/pull/74016) | fix: reject unknown plugin ids in plugins enable/disable | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74016.md) | complete | Apr 29, 2026, 03:01 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73911](https://github.com/openclaw/openclaw/pull/73911) | fix(tts): honor short explicit tagged speech text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73911.md) | complete | Apr 29, 2026, 03:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66911](https://github.com/openclaw/openclaw/pull/66911) | feat(auth): add models auth clean command to prune stale auth profiles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66911.md) | failed | Apr 29, 2026, 03:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71830](https://github.com/openclaw/openclaw/pull/71830) | fix(whatsapp): sanitize tool XML and hide configured error text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71830.md) | complete | Apr 29, 2026, 03:00 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73728](https://github.com/openclaw/openclaw/issues/73728) | Default DEFAULT_PLUGIN_DISCOVERY_CACHE_MS / DEFAULT_PLUGIN_MANIFEST_CACHE_MS of 1 second is too short for gateway use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73728.md) | complete | Apr 29, 2026, 02:59 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 03:15 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 427. Item numbers: 6457,6599,6615,6792,6946,7057,7338,7359,7379,7403,7406,7424,7433,7661,8724,9394,9465,9607,9865,10029,10137,10213,10354,10467,10872,10960,11040,11055,11414,11473,11489,11517,11655,11665,11703,11747,11955,11960,12008,12047,12198,12219,12398,12441,12505,12508,12512,12554,12602,12756,12831,12850,12931,13175,13219,13241,13271,13304,13337,13362,13387,13417,13440,13479,13487,13543,13570,13583,13593,13613,13615,13616,13617,13620,13627,13634,13676,13700,13736,13744,13751,13870,13911,13948,14079,14151,14206,14207,14251,14317,14344,14438,14526,14601,14629,14747,14785,14804,14850,14861,14874,14968,15073,15828,16085,16121,16142,16387,16555,16670,16896,17213,17215,17683,17810,17840,17876,17925,17931,18548,18571,18967,18985,19289,19680,19859,19929,20173,20230,20237,20321,20460,20756,20786,20837,20934,20935,20950,21207,22021,22358,22438,22439,22676,22770,22774,23014,23353,23451,23585,23896,23906,23916,23926,24107,24118,24196,24943,25493,25621,25883,26037,26137,26370,26428,26517,26926,27137,27445,27482,27526,27574,28025,28300,28303,28669,28847,28913,28965,29100,29132,29195,29369,29372,29384,29442,29487,29552,29707,29725,29736,29907,29945,30067,30381,30389,30452,30518,30759,30861,31172,31331,31379,31396,31583,32188,32438,32473,32496,32515,32530,32868,33102,33413,33478,33624,33838,33962,34129,34400,35406,35447,35735,35754,35799,35835,36212,36314,36525,36617,37131,37487,37584,37589,37626,37634,37661,37711,37748,37813,37816,37843,37855,37878,37943,37966,38066,38069,38076,38091,38138,38204,38212,38222,38235,38246,38255,38259,38260,38309,38346,38349,38364,38501,38520,38547,38570,38573,38580,38597,38601,38603,38604,38622,38625,38626,38650,38657,38661,38670,38683,38685,38714,38716,38721,38729,38730,38731,38744,38745,38762,38775,38780,38781,38806,38817,38829,38844,38846,38853,38881,38897,38907,38923,38924,38931,38932,38939,38945,38966,38981,39000,39001,39013,39022,39031,39032,39038,39060,39075,39097,39117,39120,39126,39141,39142,39168,39189,39223,39231,39269,39305,39307,39330,39341,39343,39365,39372,39373,39389,39400,39406,39457,39461,39513,39605,42245,43190,53638,54306,55840,58808,61443,62120,63098,64732,65867,66225,66911,67174,67472,67509,68280,68341,69030,69102,69110,69118,69123,69126,69135,69168,69196,69197,69242,69268,69271,69310,69312,69319,69337,69344,69363,69394,69423,69426,69494,69513,69544,69567,69582,69608,69618,69675,69701,69708,69729,69932,69961,69982,69999,70046,71072,71582,71830,72004,72154,72251,72449,72612,72645,72797,72817,72818,72819,73008,73334,73440,73456,73474,73476,73501,73514,73533,73536,73538,73543,73554,73566,73594,73620,73633,73643,73646,73648,73671,73683,73699,73717,73728,73738,73747,73755,73768,73787,73788,73790,73792,73793,73794,73798,73802,73812,73822,73827,73836,73837,73853,73859,73860,73861,73864,73865,73874,73875,73876,73878,73882,73883,73884,73886,73892,73894,73895,73897,73898,73900,73901,73903,73904,73905,73908,73909,73910,73911,73916,73921,73923,73925,73926,73928,73929,73930,73939,73941,73943,73944,73950,73951,73952.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25087253354](https://github.com/openclaw/clawsweeper/actions/runs/25087253354)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3544 |
| Open PRs | 3445 |
| Open items total | 6989 |
| Reviewed files | 6600 |
| Unreviewed open items | 389 |
| Archived closed files | 13918 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3348 |
| Proposed issue closes | 13 (0.4% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3237 |
| Proposed PR closes | 2 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6585 |
| Proposed closes awaiting apply | 15 (0.2% of fresh reviews) |
| Work candidates awaiting promotion | 305 |
| Closed by Codex apply | 10614 |
| Failed or stale reviews | 15 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 167/961 current (794 due, 17.4%) |
| Hourly hot item cadence (<7d) | 167/961 current (794 due, 17.4%) |
| Daily cadence coverage | 3065/3819 current (754 due, 80.3%) |
| Daily PR cadence | 2283/2667 current (384 due, 85.6%) |
| Daily new issue cadence (<30d) | 782/1152 current (370 due, 67.9%) |
| Weekly older issue cadence | 1814/1820 current (6 due, 99.7%) |
| Due now by cadence | 1943 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6951 |
| Missing eligible open records | 218 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 93 |
| Archived records that are open again | 0 |
| Stale item records | 2 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 4 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 03:02 UTC. Latest close: Apr 29, 2026, 02:57 UTC. Latest comment sync: Apr 29, 2026, 03:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 2 | 2 | 0 | 0 | 430 | 1 |
| Last hour | 576 | 21 | 555 | 9 | 40 | 510 | 2 |
| Last 24 hours | 6027 | 411 | 5616 | 12 | 699 | 953 | 29 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#73514](https://github.com/openclaw/openclaw/pull/73514) | fix(feishu): support form_value in card action callbacks | closed externally after review | Apr 29, 2026, 03:09 UTC | [records/openclaw-openclaw/closed/73514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73514.md) |
| [#44841](https://github.com/openclaw/openclaw/pull/44841) | docs: use secret-scanner-safe credential placeholders | closed externally after review | Apr 29, 2026, 03:06 UTC | [records/openclaw-openclaw/closed/44841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/44841.md) |
| [#73847](https://github.com/openclaw/openclaw/pull/73847) | fix(plugins): key web-provider snapshot cache on config-content fingerprint (#73730) | closed externally after review | Apr 29, 2026, 03:06 UTC | [records/openclaw-openclaw/closed/73847.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73847.md) |
| [#73871](https://github.com/openclaw/openclaw/pull/73871) | Set up Codex Computer Use during onboarding | closed externally after review | Apr 29, 2026, 03:05 UTC | [records/openclaw-openclaw/closed/73871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73871.md) |
| [#74018](https://github.com/openclaw/openclaw/issues/74018) | Feature request: Split chat from activity/workbench in Control UI | duplicate or superseded | Apr 29, 2026, 03:04 UTC | [records/openclaw-openclaw/closed/74018.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74018.md) |
| [#74011](https://github.com/openclaw/openclaw/issues/74011) | [Bug]: Slack channel provider crash-loops on Windows with ERR_UNSUPPORTED_ESM_URL_SCHEME ('Received protocol c:') after wizard-driven setup | already implemented on main | Apr 29, 2026, 02:57 UTC | [records/openclaw-openclaw/closed/74011.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74011.md) |
| [#73999](https://github.com/openclaw/openclaw/pull/73999) | feat(skills): add persist flag and trustedSources config for commercial use | closed externally after review | Apr 29, 2026, 02:53 UTC | [records/openclaw-openclaw/closed/73999.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73999.md) |
| [#71027](https://github.com/openclaw/openclaw/pull/71027) | build(deps): bump useblacksmith/build-push-action from 2.1.0 to 2.2.0 in the actions group across 1 directory | kept open | Apr 29, 2026, 02:53 UTC | [records/openclaw-openclaw/closed/71027.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71027.md) |
| [#69379](https://github.com/openclaw/openclaw/pull/69379) | fix(compaction): preflight/memoryFlush gates respect reserveTokens above floor | closed externally after review | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/closed/69379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69379.md) |
| [#59324](https://github.com/openclaw/openclaw/pull/59324) | fix(agents): prefer sessionKey in sessions_send | closed externally after review | Apr 29, 2026, 02:49 UTC | [records/openclaw-openclaw/closed/59324.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59324.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74019](https://github.com/openclaw/openclaw/issues/74019) | [Bug]: Lobster workflow calling llm-task fails with “No callable tools remain” when tools.alsoAllow includes lobster/llm-task | high | candidate | Apr 29, 2026, 03:08 UTC | [records/openclaw-openclaw/items/74019.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74019.md) |
| [#74020](https://github.com/openclaw/openclaw/issues/74020) | Gateway startup: models.mode=replace should skip pricing fetches | high | candidate | Apr 29, 2026, 03:04 UTC | [records/openclaw-openclaw/items/74020.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74020.md) |
| [#73683](https://github.com/openclaw/openclaw/issues/73683) | Session bootstrap race condition sends zero messages to zai/glm-5.1 causing 400 error | high | candidate | Apr 29, 2026, 02:59 UTC | [records/openclaw-openclaw/items/73683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73683.md) |
| [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 02:57 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | Apr 29, 2026, 02:54 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 02:54 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [#73875](https://github.com/openclaw/openclaw/issues/73875) | BUG: ACP runtime sends unsupported config options to Claude ACP adapter | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/73875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73875.md) |
| [#73878](https://github.com/openclaw/openclaw/issues/73878) | infer model run --gateway fails 'No callable tools remain' when modelRun:true + tools.allow has explicit entries (4.25) | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/73878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73878.md) |
| [#69708](https://github.com/openclaw/openclaw/issues/69708) | auth-profiles.json rejects \"type\": \"aws-sdk\" as invalid_type since 2026.4.1 — breaks Bedrock on EC2 (IMDS) | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/69708.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69708.md) |
| [#73865](https://github.com/openclaw/openclaw/issues/73865) | [Bug]: Gateway startup hangs indefinitely at pre-sidecar readiness path (never reaches 'ready') | high | candidate | Apr 29, 2026, 02:52 UTC | [records/openclaw-openclaw/items/73865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73865.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74017](https://github.com/openclaw/openclaw/issues/74017) | oc llm scorer incorrectly marks correct MCQ final answers wrong when ambiguity_flag=true | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74017.md) | complete | Apr 29, 2026, 03:02 UTC |
| [#49396](https://github.com/openclaw/openclaw/pull/49396) | fix(ui): use precise hourly message counts for Peak Error Hours | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/49396.md) | complete | Apr 29, 2026, 03:01 UTC |
| [#74015](https://github.com/openclaw/openclaw/issues/74015) | [Feature]: Support writable user prompt modification in existing Plugin SDK hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74015.md) | complete | Apr 29, 2026, 03:01 UTC |
| [#74016](https://github.com/openclaw/openclaw/pull/74016) | fix: reject unknown plugin ids in plugins enable/disable | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74016.md) | complete | Apr 29, 2026, 03:01 UTC |
| [#73911](https://github.com/openclaw/openclaw/pull/73911) | fix(tts): honor short explicit tagged speech text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73911.md) | complete | Apr 29, 2026, 03:00 UTC |
| [#66911](https://github.com/openclaw/openclaw/pull/66911) | feat(auth): add models auth clean command to prune stale auth profiles | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66911.md) | failed | Apr 29, 2026, 03:00 UTC |
| [#71830](https://github.com/openclaw/openclaw/pull/71830) | fix(whatsapp): sanitize tool XML and hide configured error text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71830.md) | complete | Apr 29, 2026, 03:00 UTC |
| [#73728](https://github.com/openclaw/openclaw/issues/73728) | Default DEFAULT_PLUGIN_DISCOVERY_CACHE_MS / DEFAULT_PLUGIN_MANIFEST_CACHE_MS of 1 second is too short for gateway use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73728.md) | complete | Apr 29, 2026, 02:59 UTC |
| [#69319](https://github.com/openclaw/openclaw/pull/69319) | gateway: register skills.uninstall RPC (mirror of skills.install) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69319.md) | complete | Apr 29, 2026, 02:59 UTC |
| [#74013](https://github.com/openclaw/openclaw/pull/74013) | Allow explicit self-hosted Firecrawl endpoints | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74013.md) | complete | Apr 29, 2026, 02:59 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 03:09 UTC

State: Review in progress

Planned 500 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25087398444](https://github.com/openclaw/clawsweeper/actions/runs/25087398444)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 878 |
| Open PRs | 40 |
| Open items total | 918 |
| Reviewed files | 910 |
| Unreviewed open items | 8 |
| Archived closed files | 17 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 855 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 889 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 37 |
| Closed by Codex apply | 5 |
| Failed or stale reviews | 21 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 20/53 current (33 due, 37.7%) |
| Hourly hot item cadence (<7d) | 20/53 current (33 due, 37.7%) |
| Daily cadence coverage | 223/223 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 202/202 current (0 due, 100%) |
| Weekly older issue cadence | 614/634 current (20 due, 96.8%) |
| Due now by cadence | 60 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 01:08 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 916 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 6 |
| Missing protected open records | 0 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 0 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| _None_ |  |  |  |
<!-- clawsweeper-audit:openclaw-clawhub:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 03:02 UTC. Latest close: Apr 29, 2026, 02:50 UTC. Latest comment sync: Apr 29, 2026, 03:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 1 | 0 | 1 | 0 |
| Last hour | 227 | 0 | 227 | 9 | 1 | 1 | 0 |
| Last 24 hours | 927 | 3 | 924 | 21 | 17 | 497 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | closed externally after review | Apr 29, 2026, 03:09 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |
| [#1841](https://github.com/openclaw/clawhub/pull/1841) | fix: calibrate VT Code Insight moderation | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1841.md) |
| [#1830](https://github.com/openclaw/clawhub/issues/1830) | False positive: skill-factory incorrectly flagged as suspicious | closed externally after review | Apr 28, 2026, 08:18 UTC | [records/openclaw-clawhub/closed/1830.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1830.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 02:47 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 02:46 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 02:45 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 02:44 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 02:44 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 02:43 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 02:43 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 02:37 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 02:35 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 02:35 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1824](https://github.com/openclaw/clawhub/issues/1824) | Namespace/security review request: `clawsec` slug conflicts with official ClawSec suite | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1824.md) | failed | Apr 29, 2026, 03:02 UTC |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1878.md) | complete | Apr 29, 2026, 03:02 UTC |
| [#1072](https://github.com/openclaw/clawhub/issues/1072) | false flag visual-qa | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1072.md) | complete | Apr 29, 2026, 02:56 UTC |
| [#1476](https://github.com/openclaw/clawhub/issues/1476) | [Appeal] Skill flagged suspicious: clevrpay | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1476.md) | complete | Apr 29, 2026, 02:56 UTC |
| [#975](https://github.com/openclaw/clawhub/issues/975) | False positive: 'vibe-reading' and 'vibe-reading-cn' skills flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/975.md) | complete | Apr 29, 2026, 02:55 UTC |
| [#992](https://github.com/openclaw/clawhub/issues/992) | False positive flag on telegram-whisper-transcribe skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/992.md) | failed | Apr 29, 2026, 02:54 UTC |
| [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 29, 2026, 02:54 UTC |
| [#1581](https://github.com/openclaw/clawhub/issues/1581) | [Auth] GitHub OAuth callback redirects to 127.0.0.1 instead of Convex production URL | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1581.md) | complete | Apr 29, 2026, 02:54 UTC |
| [#1022](https://github.com/openclaw/clawhub/issues/1022) | False positive flag on mind-security skill — legitimate AI security toolkit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1022.md) | failed | Apr 29, 2026, 02:54 UTC |
| [#1085](https://github.com/openclaw/clawhub/issues/1085) | PII-Redactor skill flagged as suspicious despite 0/66 VirusTotal Score | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1085.md) | failed | Apr 29, 2026, 02:54 UTC |

</details>

## How It Works

ClawSweeper is split into two operational systems:

- issue/PR sweeper: scheduler, review lane, apply lane, audit, reconcile, and
  dashboard publishing
- commit sweeper: main-branch commit dispatch, cheap code/non-code
  classification, one Codex review worker per code-bearing commit, report
  publishing, and optional target commit checks

### Scheduler

The issue/PR scheduler decides what to scan and how often. New and active items
get more attention; older quiet items fall back to a slower cadence.

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

### Commit Review Lane

Commit review is intentionally separate from issue/PR cleanup. It never closes
items, writes comments, or fixes code.

- Target repositories forward `push` events from `main` with
  `repository_dispatch`.
- Manual runs can pass `commit_sha`, optional `before_sha`, optional
  `additional_prompt`, `enabled`, and `create_checks`.
- The receiver verifies the selected commits are reachable from `origin/main`.
- The plan job expands ranges, pages large backfills at GitHub's matrix limit,
  and classifies each commit before Codex starts.
- Pure documentation, changelog, README/license, and asset-only commits get a
  skipped report without spending Codex time.
- Mixed commits and code-bearing commits start one Codex worker per commit.
- Codex is prompted to read beyond the diff: changed files, callers/callees,
  runtime entry points, adjacent tests/docs, dependency manifests, release
  notes, advisories, web sources, and focused live tests when useful.
- Each commit writes exactly one report at
  `records/<repo-slug>/commits/<40-char-sha>.md`.
- Reruns overwrite the same report, including reruns with an
  `additional_prompt`.
- Report results are `nothing_found`, `findings`, `inconclusive`, `failed`, or
  `skipped_non_code`.
- Optional GitHub Checks use the `ClawSweeper Commit Review` name on the target
  commit. Clean or skipped reports are green; high-confidence high/critical
  findings fail; lower-severity, inconclusive, and failed reviews are neutral.
- Finding reports are dispatched to Clownfish when
  `CLAWSWEEPER_CLOWNFISH_COMMIT_FINDINGS_ENABLED` is not `false`. Clownfish owns
  the audit log and any repair PR.

Use `pnpm commit-reports -- --since 24h` to review recent reports and add
`--findings`, `--non-clean`, `--repo`, or `--author` to narrow the list. The
storage stays flat so a rerun can overwrite exactly one file for a commit
without rediscovering a date bucket.

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Open PRs with GitHub closing references block issue closes until the PR is
  resolved.
- Open same-author issue/PR pairs block one-sided closes.
- Codex runs without GitHub write tokens.
- Issue/PR event jobs create target write and report-push credentials only after
  Codex exits.
- Commit review workers give Codex only a read-scoped target token as `GH_TOKEN`
  so it can inspect mentioned issues, PRs, workflow runs, and commit metadata.
- Commit write/check credentials are created only after Codex exits.
- CI makes the target checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.
- Commit Check Runs are optional and disabled by default.

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

Issue/PR sweeper:

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

List commit reports:

```bash
source ~/.profile
corepack enable
pnpm run build
pnpm commit-reports -- --since 24h
pnpm commit-reports -- --since 24h --findings
pnpm commit-reports -- --repo openclaw/openclaw --author steipete --since 7d
```

Manually rerun commit review through GitHub Actions:

```bash
gh workflow run commit-review.yml \
  --repo openclaw/clawsweeper \
  --ref main \
  -f target_repo=openclaw/openclaw \
  -f commit_sha=<commit-sha> \
  -f before_sha=<parent-or-range-start-sha> \
  -f create_checks=false \
  -f enabled=true \
  -f additional_prompt='Optional extra review focus.'
```

Omit `before_sha` for a single-commit review. Pass `before_sha` to review the
historic range `before_sha..commit_sha`.

Manual review runs are proposal-only even if `--apply-closures` or workflow
input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged
proposals later. Scheduled apply runs process both issues and pull requests by
default, subject to the selected repository profile; pass `target_repo`,
`apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

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

Target repositories can opt into main-branch commit review with
[docs/commit-dispatcher.md](docs/commit-dispatcher.md). That dispatcher sends
push ranges to this repository, where ClawSweeper expands the range and writes
one commit report per SHA.

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
- `CODEX_API_KEY`: optional compatibility alias for the same key during the
  login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy target
  scans and artifact publish reconciliation when the GitHub App token is
  unavailable.
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `openclaw-ci`.
  Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review
  jobs use a short-lived GitHub App installation token for read-heavy target API
  calls, commit review uses a read-scoped target token while Codex runs, and
  apply/comment-sync/check jobs use the app token for comments, closes, and
  optional checks.
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
- Commit review passes Codex only a read-scoped target token as `GH_TOKEN` for
  issue/PR/workflow/commit hydration, then creates write/check credentials only
  after Codex exits.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required app permissions:

- read access for target scan context
- write access to target repository issues and pull requests
- optional Checks write on target repositories for commit Check Runs
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation, dispatch, or commit-review continuations

Target repository setup:

- install the issue/PR dispatcher from
  [docs/target-dispatcher.md](docs/target-dispatcher.md) for exact item event
  reviews
- install the commit dispatcher from
  [docs/commit-dispatcher.md](docs/commit-dispatcher.md) for `main` commit
  reviews
- set `CLAWSWEEPER_COMMIT_REVIEW_ENABLED=false` to disable commit dispatch
  without code changes
- set `CLAWSWEEPER_COMMIT_REVIEW_CREATE_CHECKS=true` only if commit Check Runs
  should be published
