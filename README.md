# ClawSweeper

ClawSweeper is the conservative maintenance bot for OpenClaw repositories. It
currently covers `openclaw/openclaw`, `openclaw/clawhub`, and self-review for
`openclaw/clawsweeper`.

It has two independent lanes:

- issue/PR sweeper: keeps one markdown report per open issue or PR, publishes
  one durable Codex automated review comment when useful, and only closes items
  when the evidence is strong
- commit sweeper: reviews code-bearing commits that land on `main`, writes one
  canonical markdown report per commit, and optionally publishes a GitHub Check
  Run for that commit

## Capabilities

- **Repository profiles:** per-repository rules live in
  `src/repository-profiles.ts`, so OpenClaw, ClawHub, and ClawSweeper can share
  the same engine while keeping different apply limits.
- **Issue and PR intake:** scheduled runs scan open issues and pull requests,
  while target repositories can forward exact issue/PR events with
  `repository_dispatch` for low-latency one-item reviews.
- **Codex review reports:** each issue or PR becomes
  `records/<repo-slug>/items/<number>.md` with the decision, evidence, proposed
  maintainer-facing comment, runtime metadata, and GitHub snapshot hash.
- **Durable review comments:** ClawSweeper syncs one marker-backed public review
  comment per item and edits it in place instead of posting repeated comments.
  When a review starts and no ClawSweeper comment exists yet, it posts a short
  crustacean-friendly status placeholder first, then replaces that same comment
  with the completed review. Completed comments include a dedicated security
  review section for supply-chain, permission, secret-handling, and code
  execution concerns. Pull request comments include hidden verdict markers, and
  actionable PR follow-up includes a hidden
  `clawsweeper-action:fix-required` marker for the trusted ClawSweeper repair
  loop. See
  [`docs/pr-review-comments.md`](docs/pr-review-comments.md).
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
  `queue_fix_pr` candidates for manual ClawSweeper repair promotion.
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
- **ClawSweeper repair dispatch:** commit reports with `result: findings` can
  dispatch to the repair intake, where an audit record is written and a PR is
  created only when the finding is narrow, non-security, and still relevant on
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

Repository profiles can further narrow apply. ClawHub and ClawSweeper self-review
are intentionally stricter: they review issues and PRs, but apply may close only
PRs where current `main` already implements the proposed change with
source-backed evidence.

## Maintainer Commands

Maintainers can steer ClawSweeper from target-repo issue and PR comments. The
router accepts `/clawsweeper ...`, `/automerge`, `/autoclose <reason>`,
`@clawsweeper ...`, `@clawsweeper[bot] ...`, `@openclaw-clawsweeper ...`, and
`@openclaw-clawsweeper[bot] ...`.

Common commands:

```text
/review
/clawsweeper status
/clawsweeper re-review
/clawsweeper fix ci
/clawsweeper address review
/clawsweeper rebase
/clawsweeper automerge
/clawsweeper approve
/clawsweeper explain
/clawsweeper stop
/automerge
/autoclose <maintainer close reason>
@clawsweeper re-review
@clawsweeper review
```

- `status` and `explain` post a short target summary.
- `review` and `re-review` dispatch a fresh ClawSweeper issue/PR review without
  starting repair.
- `fix ci`, `address review`, and `rebase` dispatch the repair worker only for
  ClawSweeper PRs or PRs already opted into `clawsweeper:automerge`.
- `automerge` labels an open PR, creates or reuses the adopted job, dispatches
  review, and enters the bounded review/fix/merge loop.
- `approve` lets a maintainer clear a ClawSweeper human-review pause and merge
  only after the normal exact-head, checks, mergeability, and gate checks pass.
- `stop` adds `clawsweeper:human-review`; `/autoclose <reason>` closes the
  item and bounded linked same-repo targets with an explicit maintainer reason.

Only maintainers are accepted. The router checks repository collaborator
permission (`admin`, `maintain`, or `write`) and falls back to trusted
`author_association` values when permission lookup is unavailable. Contributor
commands are ignored without a reply. Scheduled comment routing is dry unless
`CLAWSWEEPER_COMMENT_ROUTER_EXECUTE=1`; workflow dispatch with `execute=true`
can be used for one-off live routing.

## Dashboard

Last dashboard update: Apr 29, 2026, 19:02 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4422 |
| Open PRs | 3457 |
| Open items total | 7879 |
| Reviewed files | 7537 |
| Unreviewed open items | 345 |
| Due now by cadence | 3186 |
| Proposed closes awaiting apply | 4 |
| Work candidates awaiting promotion | 924 |
| Closed by Codex apply | 10860 |
| Failed or stale reviews | 15 |
| Archived closed files | 14461 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6954 | 6614 | 340 | 3139 | 4 | 877 | 10852 | Apr 29, 2026, 18:48 UTC | Apr 29, 2026, 18:49 UTC | 855 |
| [ClawHub](https://github.com/openclaw/clawhub) | 925 | 920 | 5 | 44 | 0 | 46 | 8 | Apr 29, 2026, 18:48 UTC | Apr 29, 2026, 17:17 UTC | 401 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 19:02 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25126231202) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 18:49 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25125029414) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 18:48 UTC. Latest close: Apr 29, 2026, 18:49 UTC. Latest comment sync: Apr 29, 2026, 19:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 1 | 3 | 1 | 2 | 408 | 0 |
| Last hour | 976 | 20 | 956 | 10 | 20 | 1256 | 0 |
| Last 24 hours | 5798 | 341 | 5457 | 11 | 729 | 1918 | 25 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74550](https://github.com/openclaw/openclaw/issues/74550) | [Bug]: Telegram stuck session blocks processing — session stays in state=processing indefinitely (120s+), no auto-recovery | duplicate or superseded | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/closed/74550.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74550.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74538](https://github.com/openclaw/openclaw/pull/74538) | fix(device-pair): validate public setup urls | kept open | Apr 29, 2026, 18:47 UTC | [records/openclaw-openclaw/closed/74538.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74538.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74531](https://github.com/openclaw/openclaw/issues/74531) | Account Owner | not actionable in this repository | Apr 29, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/74531.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74531.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74546](https://github.com/openclaw/openclaw/issues/74546) | [Bug]: memory_search vector fallback can OOM gateway when sqlite-vec is unavailable on large memory DBs | already implemented on main | Apr 29, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/74546.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74546.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62981](https://github.com/openclaw/openclaw/issues/62981) | session file locked when gateway times out and falls back to embedded runner | closed externally after review | Apr 29, 2026, 18:38 UTC | [records/openclaw-openclaw/closed/62981.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62981.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74499](https://github.com/openclaw/openclaw/pull/74499) | fix(ollama): normalize prefixed tool-call names before Ollama dispatch | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74499.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74499.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74487](https://github.com/openclaw/openclaw/issues/74487) | [Bug]: Ollama Kimi tool call fails with \"Tool exec not found\" despite /tools showing exec | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74487.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74487.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74540](https://github.com/openclaw/openclaw/issues/74540) | Gateway crashes on EHOSTUNREACH from Telegram API (uncaught exception) | duplicate or superseded | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74540.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74540.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74543](https://github.com/openclaw/openclaw/pull/74543) | Fix gateway timeout embedded fallback session lock | kept open | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74543.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74543.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74542](https://github.com/openclaw/openclaw/pull/74542) | fix(matrix): close owner-side device verification loop on SAS confirm | kept open | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74542.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74542.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66657](https://github.com/openclaw/openclaw/issues/66657) | TypeError: Cannot read properties of undefined (reading 'trim') on Feishu group messages with empty content | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/66657.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66657.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60542](https://github.com/openclaw/openclaw/issues/60542) | BUG: Persisted main session row can become stale and diverge from transcript, wedging new input | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/60542.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60542.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74548.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72044](https://github.com/openclaw/openclaw/issues/72044) | DeepSeek-v4-pro thinking mode breaks on multi-turn tool-call flows (4.24 fix is incomplete) | high | candidate | Apr 29, 2026, 18:41 UTC | [records/openclaw-openclaw/items/72044.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72044.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68944](https://github.com/openclaw/openclaw/issues/68944) | [Bug]: CLI commands hang at WebSocket gateway handshake | high | candidate | Apr 29, 2026, 18:37 UTC | [records/openclaw-openclaw/items/68944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68944.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63840](https://github.com/openclaw/openclaw/pull/63840) | fix(slack): preserve thread context for Agents & Assistants DM root messages | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/63840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63840.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#60485](https://github.com/openclaw/openclaw/pull/60485) | fix(feishu): accept token-verified webhook challenges | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/60485.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60485.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67443](https://github.com/openclaw/openclaw/pull/67443) | fix(status): share model resolution and lock group activation defaults | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/67443.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67443.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67750](https://github.com/openclaw/openclaw/issues/67750) | [Bug]: Successful auto-compaction can still end in a 120s embedded timeout and generic `/new` fallback | high | candidate | Apr 29, 2026, 18:35 UTC | [records/openclaw-openclaw/items/67750.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67750.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#54488](https://github.com/openclaw/openclaw/issues/54488) | Session lane starvation: followup drain monopolizes session lane, blocks inbound dispatch for 20-30min | high | candidate | Apr 29, 2026, 18:35 UTC | [records/openclaw-openclaw/items/54488.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/54488.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64613](https://github.com/openclaw/openclaw/issues/64613) | chat.history leaks system-level memory injection blocks to WebChat UI | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-openclaw/items/64613.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64613.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53732](https://github.com/openclaw/openclaw/issues/53732) | Bug: Fallback models echo BOOT.md instructions instead of executing them | high | candidate | Apr 29, 2026, 18:33 UTC | [records/openclaw-openclaw/items/53732.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53732.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66543](https://github.com/openclaw/openclaw/pull/66543) | fix(cron): strip internal whitespace from model IDs in cron job normalization | high | candidate | Apr 29, 2026, 18:33 UTC | [records/openclaw-openclaw/items/66543.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66543.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1046](https://github.com/openclaw/clawhub/issues/1046) | ClawHub skill publish issue + account sign-in problem after deleting account | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1046.md) | failed | Apr 29, 2026, 18:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74508](https://github.com/openclaw/openclaw/pull/74508) | fix(telegram): chain reasoning messages on overflow instead of stopping | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74508.md) | complete | Apr 29, 2026, 18:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74549](https://github.com/openclaw/openclaw/pull/74549) | Fix Telegram EHOSTUNREACH gateway crash | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74549.md) | complete | Apr 29, 2026, 18:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#67682](https://github.com/openclaw/openclaw/issues/67682) | Per-agent MCP env var injection for multi-agent identity attribution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67682.md) | complete | Apr 29, 2026, 18:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74548.md) | complete | Apr 29, 2026, 18:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) | complete | Apr 29, 2026, 18:45 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74489](https://github.com/openclaw/openclaw/pull/74489) | fix(discord): cool down Cloudflare 429 responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74489.md) | complete | Apr 29, 2026, 18:44 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74488](https://github.com/openclaw/openclaw/pull/74488) | feat(openai): dynamic model catalog discovery from upstream /v1/models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74488.md) | complete | Apr 29, 2026, 18:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66924](https://github.com/openclaw/openclaw/pull/66924) | fix(google): do not inherit template 1M context window for gemma models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66924.md) | complete | Apr 29, 2026, 18:43 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#65670](https://github.com/openclaw/openclaw/pull/65670) | feat: keep vite-plus companion bin on daemon PATH | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65670.md) | complete | Apr 29, 2026, 18:43 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 19:02 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 405. Item numbers: 75,147,1210,6457,6599,6615,6792,6946,7057,7338,7359,7379,7403,7406,7424,7433,7661,8724,9394,9465,9607,10029,10137,10213,10354,10467,10872,10960,11040,11055,11414,11473,11489,11655,11665,11703,11955,11960,12008,12047,12198,12219,12398,12441,12505,12508,12512,12554,12590,12602,12756,12831,13219,13241,13271,13304,13337,13362,13387,13417,13440,13479,13487,13543,13570,13583,13615,13617,13620,13627,13634,13676,13700,13744,13751,13870,13911,13948,14079,14151,14206,14251,14317,14344,14526,14601,14629,14747,14785,14804,14850,14861,14874,14968,15828,16085,16121,16142,16387,16555,16670,16896,17098,17810,17876,17925,18548,18985,19680,19859,20237,20321,20950,22021,22438,23585,25295,26428,27137,29707,29736,32188,33845,36314,37589,38076,38501,38729,39038,39137,39605,40756,41165,41201,41581,42819,43383,43390,43404,43410,43411,43443,43447,43455,43480,43481,43512,43527,43549,43570,43585,43609,43618,43656,43679,43737,43747,43752,43795,43827,43848,43912,43951,43975,43982,43992,44013,44023,44925,46023,46109,46168,46544,46548,46656,46786,46809,47143,47235,47452,47555,47565,47604,47663,47677,47712,47723,47743,47856,47910,47975,48133,48486,48554,48606,48780,48785,48814,48920,49931,50040,50145,50165,50184,50199,50245,50276,50404,50481,50483,50611,50630,50887,51706,52571,52588,52655,52664,52747,52759,52875,53023,53209,53228,53302,53316,53436,53439,53496,53522,53540,53550,53557,53600,53645,53650,53654,53682,53684,53728,53732,53736,53741,53809,53810,54014,54041,54128,54138,54159,54165,54176,54192,54224,54240,54242,54310,54315,54373,54383,54392,54406,54416,54435,54463,54488,54496,54508,54531,54559,54577,54578,54607,54634,54663,54736,54794,54853,54882,54895,54909,54928,54959,54972,55071,55085,55126,55334,55840,55943,55986,56383,56651,56693,57449,58987,59411,60485,60542,60868,60934,62099,62204,62727,62872,62906,62939,62954,62981,63011,63057,63112,63125,63234,63257,63269,63312,63425,63463,63535,63612,63633,63760,63840,63884,63892,63901,63941,64030,64081,64103,64175,64182,64199,64212,64220,64236,64301,64315,64334,64347,64365,64399,64426,64507,64540,64555,64613,64624,64625,64633,64639,64640,64647,64649,64656,64658,64664,64676,64684,64695,64696,64699,64703,64707,64715,64717,64718,64719,64758,64783,65039,65065,65097,65490,65670,65687,65914,65962,66056,66093,66147,66257,66299,66342,66395,66543,66551,66657,66874,66894,66904,66913,66915,66924,66933,66936,66944,66946,66977,66979,67020,67031,67041,67052,67053,67055,67060,67062,67069,67077,67333,67350,67431,67443,67670,67680,67682,67690,67693,67694,67703,67706,67709,67716,67727,67731,67734,67750,67751,67758,67759,67761,68112,68186,68314,68483,68561,68587,68680,68683,68779,68850,68853,68864,68893,68944,69066,69634,69638,70074,70268,70472,70586,70682,70811,70814,70857,71127,71185,71417,71449,71459,71840,71841,71853,71857,72016,72044,72129,72132,72181,72208,72268,72290,72293,72476,72478,72480,72486,72490,72491,73668,74315,74320,74430,74453,74454,74458,74479,74480,74481,74483,74484,74485,74486,74487,74488,74493,74519.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25126231202](https://github.com/openclaw/clawsweeper/actions/runs/25126231202)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3536 |
| Open PRs | 3418 |
| Open items total | 6954 |
| Reviewed files | 6614 |
| Unreviewed open items | 340 |
| Archived closed files | 14435 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3365 |
| Proposed issue closes | 1 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3239 |
| Proposed PR closes | 3 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6604 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 877 |
| Closed by Codex apply | 10852 |
| Failed or stale reviews | 10 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 95/1137 current (1042 due, 8.4%) |
| Hourly hot item cadence (<7d) | 95/1137 current (1042 due, 8.4%) |
| Daily cadence coverage | 1918/3672 current (1754 due, 52.2%) |
| Daily PR cadence | 1261/2564 current (1303 due, 49.2%) |
| Daily new issue cadence (<30d) | 657/1108 current (451 due, 59.3%) |
| Weekly older issue cadence | 1802/1805 current (3 due, 99.8%) |
| Due now by cadence | 3139 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 18:45 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72537,72539,72541`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6960 |
| Missing eligible open records | 262 |
| Missing maintainer-authored open records | 35 |
| Missing protected open records | 23 |
| Missing recently-created open records | 28 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
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

Latest review: Apr 29, 2026, 18:48 UTC. Latest close: Apr 29, 2026, 18:49 UTC. Latest comment sync: Apr 29, 2026, 19:02 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 1 | 2 | 0 | 2 | 408 | 0 |
| Last hour | 586 | 20 | 566 | 5 | 20 | 855 | 0 |
| Last 24 hours | 4861 | 341 | 4520 | 6 | 714 | 1348 | 25 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74550](https://github.com/openclaw/openclaw/issues/74550) | [Bug]: Telegram stuck session blocks processing — session stays in state=processing indefinitely (120s+), no auto-recovery | duplicate or superseded | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/closed/74550.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74550.md) |
| [#74538](https://github.com/openclaw/openclaw/pull/74538) | fix(device-pair): validate public setup urls | kept open | Apr 29, 2026, 18:47 UTC | [records/openclaw-openclaw/closed/74538.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74538.md) |
| [#74531](https://github.com/openclaw/openclaw/issues/74531) | Account Owner | not actionable in this repository | Apr 29, 2026, 18:43 UTC | [records/openclaw-openclaw/closed/74531.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74531.md) |
| [#74546](https://github.com/openclaw/openclaw/issues/74546) | [Bug]: memory_search vector fallback can OOM gateway when sqlite-vec is unavailable on large memory DBs | already implemented on main | Apr 29, 2026, 18:40 UTC | [records/openclaw-openclaw/closed/74546.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74546.md) |
| [#62981](https://github.com/openclaw/openclaw/issues/62981) | session file locked when gateway times out and falls back to embedded runner | closed externally after review | Apr 29, 2026, 18:38 UTC | [records/openclaw-openclaw/closed/62981.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/62981.md) |
| [#74499](https://github.com/openclaw/openclaw/pull/74499) | fix(ollama): normalize prefixed tool-call names before Ollama dispatch | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74499.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74499.md) |
| [#74487](https://github.com/openclaw/openclaw/issues/74487) | [Bug]: Ollama Kimi tool call fails with \"Tool exec not found\" despite /tools showing exec | closed externally after review | Apr 29, 2026, 18:30 UTC | [records/openclaw-openclaw/closed/74487.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74487.md) |
| [#74540](https://github.com/openclaw/openclaw/issues/74540) | Gateway crashes on EHOSTUNREACH from Telegram API (uncaught exception) | duplicate or superseded | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74540.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74540.md) |
| [#74543](https://github.com/openclaw/openclaw/pull/74543) | Fix gateway timeout embedded fallback session lock | kept open | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74543.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74543.md) |
| [#74542](https://github.com/openclaw/openclaw/pull/74542) | fix(matrix): close owner-side device verification loop on SAS confirm | kept open | Apr 29, 2026, 18:29 UTC | [records/openclaw-openclaw/closed/74542.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74542.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#66657](https://github.com/openclaw/openclaw/issues/66657) | TypeError: Cannot read properties of undefined (reading 'trim') on Feishu group messages with empty content | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/66657.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66657.md) |
| [#60542](https://github.com/openclaw/openclaw/issues/60542) | BUG: Persisted main session row can become stale and diverge from transcript, wedging new input | high | candidate | Apr 29, 2026, 18:49 UTC | [records/openclaw-openclaw/items/60542.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60542.md) |
| [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74548.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74548.md) |
| [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | high | candidate | Apr 29, 2026, 18:45 UTC | [records/openclaw-openclaw/items/74547.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) |
| [#72044](https://github.com/openclaw/openclaw/issues/72044) | DeepSeek-v4-pro thinking mode breaks on multi-turn tool-call flows (4.24 fix is incomplete) | high | candidate | Apr 29, 2026, 18:41 UTC | [records/openclaw-openclaw/items/72044.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72044.md) |
| [#68944](https://github.com/openclaw/openclaw/issues/68944) | [Bug]: CLI commands hang at WebSocket gateway handshake | high | candidate | Apr 29, 2026, 18:37 UTC | [records/openclaw-openclaw/items/68944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68944.md) |
| [#63840](https://github.com/openclaw/openclaw/pull/63840) | fix(slack): preserve thread context for Agents & Assistants DM root messages | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/63840.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63840.md) |
| [#60485](https://github.com/openclaw/openclaw/pull/60485) | fix(feishu): accept token-verified webhook challenges | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/60485.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/60485.md) |
| [#67443](https://github.com/openclaw/openclaw/pull/67443) | fix(status): share model resolution and lock group activation defaults | high | candidate | Apr 29, 2026, 18:36 UTC | [records/openclaw-openclaw/items/67443.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67443.md) |
| [#67750](https://github.com/openclaw/openclaw/issues/67750) | [Bug]: Successful auto-compaction can still end in a 120s embedded timeout and generic `/new` fallback | high | candidate | Apr 29, 2026, 18:35 UTC | [records/openclaw-openclaw/items/67750.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67750.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74508](https://github.com/openclaw/openclaw/pull/74508) | fix(telegram): chain reasoning messages on overflow instead of stopping | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74508.md) | complete | Apr 29, 2026, 18:48 UTC |
| [#74549](https://github.com/openclaw/openclaw/pull/74549) | Fix Telegram EHOSTUNREACH gateway crash | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74549.md) | complete | Apr 29, 2026, 18:47 UTC |
| [#67682](https://github.com/openclaw/openclaw/issues/67682) | Per-agent MCP env var injection for multi-agent identity attribution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67682.md) | complete | Apr 29, 2026, 18:46 UTC |
| [#74548](https://github.com/openclaw/openclaw/issues/74548) | [Bug]: WebChat duplicate/collapsed messages after tool calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74548.md) | complete | Apr 29, 2026, 18:45 UTC |
| [#74547](https://github.com/openclaw/openclaw/issues/74547) | [Bug] Plugin loader rewraps require(ws) as namespace object instead of constructor — custom plugins silently break | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74547.md) | complete | Apr 29, 2026, 18:45 UTC |
| [#74489](https://github.com/openclaw/openclaw/pull/74489) | fix(discord): cool down Cloudflare 429 responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74489.md) | complete | Apr 29, 2026, 18:44 UTC |
| [#74488](https://github.com/openclaw/openclaw/pull/74488) | feat(openai): dynamic model catalog discovery from upstream /v1/models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74488.md) | complete | Apr 29, 2026, 18:43 UTC |
| [#66924](https://github.com/openclaw/openclaw/pull/66924) | fix(google): do not inherit template 1M context window for gemma models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66924.md) | complete | Apr 29, 2026, 18:43 UTC |
| [#65670](https://github.com/openclaw/openclaw/pull/65670) | feat: keep vite-plus companion bin on daemon PATH | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/65670.md) | complete | Apr 29, 2026, 18:43 UTC |
| [#64507](https://github.com/openclaw/openclaw/issues/64507) | Feature: Agent default delivery target for cross-session message calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64507.md) | complete | Apr 29, 2026, 18:43 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 18:59 UTC

State: Review in progress

Planned 384 items across 100 shards. Capacity is 500 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25127786715](https://github.com/openclaw/clawsweeper/actions/runs/25127786715)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 886 |
| Open PRs | 39 |
| Open items total | 925 |
| Reviewed files | 920 |
| Unreviewed open items | 5 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 881 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 915 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 46 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 22/57 current (35 due, 38.6%) |
| Hourly hot item cadence (<7d) | 22/57 current (35 due, 38.6%) |
| Daily cadence coverage | 210/210 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 189/189 current (0 due, 100%) |
| Weekly older issue cadence | 649/653 current (4 due, 99.4%) |
| Due now by cadence | 44 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 18:44 UTC

Status: **Passing**

Targeted review input: `756`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 925 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 5 |
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

Latest review: Apr 29, 2026, 18:48 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 18:58 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 1 | 0 | 0 | 0 |
| Last hour | 390 | 0 | 390 | 5 | 0 | 401 | 0 |
| Last 24 hours | 934 | 0 | 934 | 5 | 15 | 567 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1434](https://github.com/openclaw/clawhub/issues/1434) | Sonarbay-skill incorrectly flaged. | closed externally after review | Apr 29, 2026, 17:17 UTC | [records/openclaw-clawhub/closed/1434.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1434.md) |
| [#1376](https://github.com/openclaw/clawhub/issues/1376) | False positive: openclaw-workspace-sync flagged as suspicious | closed externally after review | Apr 29, 2026, 17:06 UTC | [records/openclaw-clawhub/closed/1376.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1376.md) |
| [#1812](https://github.com/openclaw/clawhub/issues/1812) | Skill be flagged as suspicious and being marked hidden | closed externally after review | Apr 29, 2026, 13:48 UTC | [records/openclaw-clawhub/closed/1812.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1812.md) |
| [#1891](https://github.com/openclaw/clawhub/pull/1891) | [codex] remove card link hover underlines | kept open | Apr 29, 2026, 08:25 UTC | [records/openclaw-clawhub/closed/1891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1891.md) |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | closed externally after review | Apr 29, 2026, 07:52 UTC | [records/openclaw-clawhub/closed/1889.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1889.md) |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 18:33 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#868](https://github.com/openclaw/clawhub/issues/868) | [Bug] clawhub sync fails: Slug is already taken | high | candidate | Apr 29, 2026, 18:32 UTC | [records/openclaw-clawhub/items/868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/868.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 18:31 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 18:30 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 18:29 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 18:29 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 18:28 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 18:00 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 17:59 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1046](https://github.com/openclaw/clawhub/issues/1046) | ClawHub skill publish issue + account sign-in problem after deleting account | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1046.md) | failed | Apr 29, 2026, 18:48 UTC |
| [#1876](https://github.com/openclaw/clawhub/issues/1876) | False positive: skill aim-blog-write | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1876.md) | failed | Apr 29, 2026, 18:42 UTC |
| [#822](https://github.com/openclaw/clawhub/issues/822) | Response to Security Flag: Soul Weaver Skill Safety Assessment and Corrections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/822.md) | failed | Apr 29, 2026, 18:41 UTC |
| [#323](https://github.com/openclaw/clawhub/issues/323) | False positive: wp-multi-tool (WordPress optimization plugin) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/323.md) | complete | Apr 29, 2026, 18:38 UTC |
| [#171](https://github.com/openclaw/clawhub/issues/171) | Managed browser time out issue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/171.md) | failed | Apr 29, 2026, 18:37 UTC |
| [#1212](https://github.com/openclaw/clawhub/issues/1212) | False positive: WORKSTATION.md skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1212.md) | complete | Apr 29, 2026, 18:36 UTC |
| [#1571](https://github.com/openclaw/clawhub/issues/1571) | tender-search \"Skill flagged — suspicious patterns detected\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1571.md) | complete | Apr 29, 2026, 18:35 UTC |
| [#1617](https://github.com/openclaw/clawhub/issues/1617) | Skill format: unclear how to declare optional env variables | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1617.md) | complete | Apr 29, 2026, 18:35 UTC |
| [#1299](https://github.com/openclaw/clawhub/issues/1299) | Request hard delete of soft-deleted skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1299.md) | complete | Apr 29, 2026, 18:35 UTC |
| [#1541](https://github.com/openclaw/clawhub/issues/1541) | False positive suspicious flag on emotion-shared-experience skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1541.md) | complete | Apr 29, 2026, 18:35 UTC |

</details>

<details>
<summary>ClawSweeper (openclaw/clawsweeper)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawsweeper:start -->
**Workflow status**

Repository: [openclaw/clawsweeper](https://github.com/openclaw/clawsweeper)

Updated: unknown

State: Idle

No workflow status has been published yet.
<!-- clawsweeper-status:openclaw-clawsweeper:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawsweeper](https://github.com/openclaw/clawsweeper) |
| Open issues | 0 |
| Open PRs | 0 |
| Open items total | 0 |
| Reviewed files | 3 |
| Unreviewed open items | 0 |
| Archived closed files | 0 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 0 |
| Proposed issue closes | 0 (- of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 3 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 1 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 0/3 current (3 due, 0%) |
| Hourly hot item cadence (<7d) | 0/3 current (3 due, 0%) |
| Daily cadence coverage | 0/0 current (0 due, -) |
| Daily PR cadence | 0/0 current (0 due, -) |
| Daily new issue cadence (<30d) | 0/0 current (0 due, -) |
| Weekly older issue cadence | 0/0 current (0 due, -) |
| Due now by cadence | 3 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawsweeper:start -->
No audit has been published yet. Run `npm run audit -- --update-dashboard` to refresh this section.
<!-- clawsweeper-audit:openclaw-clawsweeper:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 14:08 UTC. Latest close: unknown. Latest comment sync: Apr 29, 2026, 14:08 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last 24 hours | 3 | 0 | 3 | 0 | 0 | 3 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| _None_ |  |  |  |  |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#19](https://github.com/openclaw/clawsweeper/pull/19) | test: exercise automerge repair smoke | high | candidate | Apr 29, 2026, 13:41 UTC | [records/openclaw-clawsweeper/items/19.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/19.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#20](https://github.com/openclaw/clawsweeper/pull/20) | test: suppress duplicate remaining-risk prose | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/20.md) | complete | Apr 29, 2026, 14:08 UTC |
| [#19](https://github.com/openclaw/clawsweeper/pull/19) | test: exercise automerge repair smoke | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/19.md) | complete | Apr 29, 2026, 13:41 UTC |
| [#18](https://github.com/openclaw/clawsweeper/pull/18) | docs: document clawsweeper self smoke target | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawsweeper/items/18.md) | complete | Apr 29, 2026, 13:18 UTC |

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
  Codex `/review`-style PR findings, suggested comment, runtime metadata, and
  GitHub snapshot hash.
- High-confidence allowed close decisions become `proposed_close`.
- After publish, the lane checks the selected items' single marker-backed Codex
  review comment. Missing comments and missing metadata are synced immediately;
  existing comments are refreshed only when stale, currently weekly.
- PR review comments keep the top-level note concise, put source links and full
  evidence in collapsed details, and use hidden verdict/action markers for the
  trusted ClawSweeper repair loop; see
  [`docs/pr-review-comments.md`](docs/pr-review-comments.md).

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
- Finding reports are dispatched to the repair intake when
  `CLAWSWEEPER_COMMIT_FINDINGS_ENABLED` is not `false`. ClawSweeper owns
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

Manual review runs are proposal-only. Use `apply_existing=true` to apply unchanged
proposals later. Scheduled apply runs process both issues and pull requests by
default, subject to the selected repository profile; pass `target_repo`,
`apply_kind=issue`, or `apply_kind=pull_request` to narrow a manual run.

Scheduled runs cover the configured product profiles. `openclaw/openclaw` keeps
the existing cadence; `openclaw/clawhub` runs on offset review/apply/audit crons
so its reports live under `records/openclaw-clawhub/` without colliding with
default repo records. `openclaw/clawsweeper` is available for manual and event
self-review smoke tests.

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
- `CLAWSWEEPER_APP_CLIENT_ID`: public GitHub App client ID for `clawsweeper`.
  Currently `Iv23liOECG0slfuhz093`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `clawsweeper`; plan/review
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
- ClawSweeper uses the `clawsweeper` GitHub App token for read-heavy target
  context.
- Apply mode uses the same app token for review comments and closes, so GitHub
  attributes mutations to the app bot account instead of a PAT user.
- Commit review passes Codex only a read-scoped target token as `GH_TOKEN` for
  issue/PR/workflow/commit hydration, then creates write/check credentials only
  after Codex exits.
- The built-in `GITHUB_TOKEN` commits generated reports back to this repo.

Required `clawsweeper` app permissions:

- Contents: read/write, for report commits, repair branches, and repository
  dispatch inputs that need a contents-scoped installation token.
- Issues: read/write, for issue comments, labels, closes, and maintainer command
  authorization context.
- Pull requests: read/write, for PR comments, labels, merge readiness, repair PRs,
  and guarded automerge.
- Actions: read/write on `openclaw/clawsweeper`, for run cancellation, manual
  dispatch, self-heal, and commit-review continuations.
- Checks: write on target repositories when commit Check Runs should be
  published.

ClawSweeper no longer falls back to PAT-based write tokens. If the GitHub App
installation does not grant the requested permission set, the workflow fails at
token creation instead of silently switching identity.

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
