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
preferred form is `@clawsweeper ...`. The router also accepts
`@clawsweeper[bot] ...`, `@openclaw-clawsweeper ...`,
`@openclaw-clawsweeper[bot] ...`, and legacy slash aliases such as
`/clawsweeper ...`, `/review`, `/automerge`, and `/autoclose <reason>`.

Common commands:

```text
@clawsweeper status
@clawsweeper re-review
@clawsweeper review
@clawsweeper fix ci
@clawsweeper address review
@clawsweeper rebase
@clawsweeper autofix
@clawsweeper automerge
@clawsweeper approve
@clawsweeper explain
@clawsweeper stop
@clawsweeper why did automerge stop here?
```

- `status` and `explain` post a short target summary.
- `review` and `re-review` dispatch a fresh ClawSweeper issue/PR review without
  starting repair.
- Command status replies are marker-backed and edited in place per
  issue/PR, intent, and head SHA, so repeated review nudges do not leave a
  trail of duplicate lobster notes.
- Freeform `@clawsweeper ...` mentions dispatch a read-only assist review that
  answers the maintainer request in the next ClawSweeper comment. Action-looking
  prose still maps through existing safe markers and deterministic gates.
- `fix ci`, `address review`, and `rebase` dispatch the repair worker only for
  ClawSweeper PRs or PRs already opted into `clawsweeper:autofix` or
  `clawsweeper:automerge`.
- `autofix` labels an open PR, creates or reuses the adopted job, dispatches
  review, and enters the bounded review/fix loop without merging.
- `automerge` labels an open PR, creates or reuses the adopted job, dispatches
  review, and enters the bounded review/fix/merge loop. Draft PRs are fix-only
  until GitHub marks them ready for review.
- User-facing OpenClaw `fix`, `feat`, and `perf` automerge PRs must include a
  `CHANGELOG.md` entry before ClawSweeper will merge them.
- Security-sensitive findings can be repaired only after explicit
  `autofix`/`automerge` opt-in; ClawSweeper still will not merge until a later
  exact-head review is clean.
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

Last dashboard update: May 1, 2026, 00:53 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 3662 |
| Open PRs | 3362 |
| Open items total | 7024 |
| Reviewed files | 7645 |
| Unreviewed open items | 60 |
| Due now by cadence | 1307 |
| Proposed closes awaiting apply | 8 |
| Work candidates awaiting promotion | 2054 |
| Closed by Codex apply | 11361 |
| Failed or stale reviews | 22 |
| Archived closed files | 15371 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6778 | 6718 | 60 | 1051 | 8 | 2008 | 11353 | May 1, 2026, 00:40 UTC | May 1, 2026, 00:37 UTC | 1005 |
| [ClawHub](https://github.com/openclaw/clawhub) | 246 | 924 | 0 | 253 | 0 | 45 | 8 | Apr 29, 2026, 22:22 UTC | Apr 29, 2026, 17:17 UTC | 0 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | May 1, 2026, 00:53 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25195760893) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review publish complete | Apr 29, 2026, 22:23 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25135463730) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: May 1, 2026, 00:40 UTC. Latest close: May 1, 2026, 00:37 UTC. Latest comment sync: May 1, 2026, 00:52 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 484 | 1 |
| Last hour | 788 | 15 | 773 | 2 | 5 | 1005 | 1 |
| Last 24 hours | 6744 | 466 | 6278 | 9 | 647 | 4058 | 24 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75318](https://github.com/openclaw/openclaw/issues/75318) | [Bug]:  4.29 openclaw status (fast) shows empty Channels table — channel visible only in --deep | duplicate or superseded | May 1, 2026, 00:37 UTC | [records/openclaw-openclaw/closed/75318.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75318.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74706](https://github.com/openclaw/openclaw/issues/74706) | Gateway RPC: add SDK-facing artifacts APIs | closed externally after review | May 1, 2026, 00:35 UTC | [records/openclaw-openclaw/closed/74706.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74706.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74926](https://github.com/openclaw/openclaw/pull/74926) | fix(gateway): harden artifact RPCs | closed externally after review | May 1, 2026, 00:35 UTC | [records/openclaw-openclaw/closed/74926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74926.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75311](https://github.com/openclaw/openclaw/pull/75311) | fix(ci): GitHub App active-PR-limit exemption regression | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75311.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75145](https://github.com/openclaw/openclaw/pull/75145) | docs: use American \"behavior\" spelling per contribution guide | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75145.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75145.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71227](https://github.com/openclaw/openclaw/issues/71227) | sessions.json parse+write blows past 60s run budget → agents silently return 'No reply from agent' | duplicate or superseded | Apr 30, 2026, 23:51 UTC | [records/openclaw-openclaw/closed/71227.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71227.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75307](https://github.com/openclaw/openclaw/issues/75307) | Background tasks stay 'running' forever after gateway crash/restart, blocking channel reload + saturating CPU | already implemented on main | Apr 30, 2026, 23:43 UTC | [records/openclaw-openclaw/closed/75307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75307.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75221](https://github.com/openclaw/openclaw/pull/75221) | test: add published upgrade survivor lane | closed externally after review | Apr 30, 2026, 23:39 UTC | [records/openclaw-openclaw/closed/75221.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75221.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75304](https://github.com/openclaw/openclaw/issues/75304) | [Bug]: OpenClaw 2026.4.29 — Telegram/Discord channels crash-loop due to missing ESM exports in bundled runtime deps | already implemented on main | Apr 30, 2026, 23:30 UTC | [records/openclaw-openclaw/closed/75304.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75304.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74817](https://github.com/openclaw/openclaw/issues/74817) | Feishu: @所有人 not delivered to bot + requireMention:false causes multi-bot echo loop | duplicate or superseded | Apr 30, 2026, 23:29 UTC | [records/openclaw-openclaw/closed/74817.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74817.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73704](https://github.com/openclaw/openclaw/pull/73704) | fix(safeguard): resolve compaction provider/model before registering runtime | high | candidate | May 1, 2026, 00:39 UTC | [records/openclaw-openclaw/items/73704.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73704.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75294](https://github.com/openclaw/openclaw/pull/75294) | fix(tui): bound shutdown after terminal hangup | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/75294.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75294.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73667](https://github.com/openclaw/openclaw/pull/73667) | Bound active-memory recall latency and jitter QMD startup | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73667.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73667.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75032](https://github.com/openclaw/openclaw/issues/75032) | [Feature]: Expose `installBundledRuntimeDeps: false` + make `isolatedExecutionRoot` default for bundled plugin runtime deps | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/75032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73711](https://github.com/openclaw/openclaw/pull/73711) | feat(chat/ios): photos-picker-style attachment thumbnails with persistent add-more tile | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73711.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73711.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73197](https://github.com/openclaw/openclaw/pull/73197) | fix(runtime): prevent resource leaks and silent failures [AI-assisted] | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73197.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74944](https://github.com/openclaw/openclaw/issues/74944) | [bug] launchd-submitted self-update script fails with \"env: node: No such file or directory\" (npm exit 127) on macOS Homebrew installs | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/74944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74944.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73505](https://github.com/openclaw/openclaw/issues/73505) | [Bug]: Telegram streaming.mode=\"partial\" completely disabled when replyToMode is not \"off\ | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73505.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73505.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74860](https://github.com/openclaw/openclaw/issues/74860) | Gateway 7-second event-loop stalls on 2026.4.27 — createOpenClawTools synchronously rebuilds plugin registry + provider-auth env-var resolution per tool-creation pass | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/74860.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74860.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73796](https://github.com/openclaw/openclaw/issues/73796) | Browser screenshot delivery to chat fails — MEDIA:~/... paths rejected by media-source validator | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73796.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73796.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73506](https://github.com/openclaw/openclaw/pull/73506) | fix(agents,failover): propagate sessionId/lane/provider attribution through FailoverError | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73506.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73506.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74956](https://github.com/openclaw/openclaw/issues/74956) | [Bug]: wal-protocol hook: message:received event lacks workspaceDir/agentId, all agent data written to main workspace | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/74956.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74956.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75280](https://github.com/openclaw/openclaw/pull/75280) | Feat/main session durable delivery pr | high | candidate | May 1, 2026, 00:37 UTC | [records/openclaw-openclaw/items/75280.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75280.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74650](https://github.com/openclaw/openclaw/issues/74650) | [Bug]: | high | candidate | May 1, 2026, 00:37 UTC | [records/openclaw-openclaw/items/74650.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74650.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75319](https://github.com/openclaw/openclaw/pull/75319) | feat(PR 3): Add transparent encryption for session transcripts and metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75319.md) | complete | May 1, 2026, 00:40 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73098](https://github.com/openclaw/openclaw/pull/73098) | Allow safe cache trace config patches | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73098.md) | complete | May 1, 2026, 00:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74460](https://github.com/openclaw/openclaw/pull/74460) | fix(dotenv): block Windows shell trust-root vars from workspace .env [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74460.md) | complete | May 1, 2026, 00:37 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75317](https://github.com/openclaw/openclaw/pull/75317) | fix(memory): retry transient embedding failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75317.md) | complete | May 1, 2026, 00:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75299](https://github.com/openclaw/openclaw/pull/75299) | feat(process): add priority support to command queue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75299.md) | complete | May 1, 2026, 00:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74354](https://github.com/openclaw/openclaw/issues/74354) | [Bug]: 通过 Control UI 发送纯数字时，数字会被自动添加千位分隔符（如 123456789 → 123-456-789） | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74354.md) | complete | May 1, 2026, 00:36 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75094](https://github.com/openclaw/openclaw/pull/75094) | feat(control-ui): use scoped assistant media tickets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75094.md) | complete | May 1, 2026, 00:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#75172](https://github.com/openclaw/openclaw/pull/75172) | fix(gateway): guard against undefined channelLogs entry in async channel lifecycle handlers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75172.md) | complete | May 1, 2026, 00:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74419](https://github.com/openclaw/openclaw/issues/74419) | feat: support Jina Embeddings v5 task parameter for task-specific adapters | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74419.md) | failed | May 1, 2026, 00:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73132](https://github.com/openclaw/openclaw/issues/73132) | [Bug] openclaw gateway stop / launchctl bootout doesn't terminate underlying node process — wedged binary persists across stop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73132.md) | complete | May 1, 2026, 00:34 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: May 1, 2026, 00:53 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 483. Item numbers: 7629,8299,9016,10118,10737,11146,11894,12394,13597,13601,13607,14133,16711,17217,25401,34528,35119,35208,37625,37804,38302,38458,39232,39554,39585,39589,39685,39722,39739,39780,39847,39913,40165,40215,41199,41272,48708,50818,50968,51005,51054,51073,51264,51268,51497,51549,51556,51594,51849,51889,52026,52276,52448,52487,52515,52571,52601,52636,52642,52762,52776,52912,53243,53441,53445,53522,53524,53526,53716,54361,54406,54759,54765,54802,54939,54962,54985,55390,55477,55485,55507,55519,55576,55644,55684,55688,55742,55810,55817,55830,55861,56133,56454,56858,56861,56866,57077,57088,57089,57135,57140,57146,57207,57293,57366,57510,57511,57971,58054,58079,58101,58112,58133,58184,58244,58248,58281,58309,58310,58311,58360,58373,58397,58405,58412,58421,58434,58439,58445,58455,58478,58482,58550,58552,58591,58636,58637,58640,58650,58679,58683,58685,58731,58732,58735,58789,58796,58800,58815,58822,58838,58874,58886,59022,59225,59509,59528,59666,59693,59710,59718,59728,59737,59782,59801,59808,59817,59881,59933,59945,59949,59966,60034,60078,60084,60103,60113,60191,60225,60274,60275,60339,60344,60380,60382,60422,60427,60450,60521,60572,60593,60612,60657,60659,60694,60712,60713,60759,60767,60799,60815,60827,60841,60868,60922,60955,60961,61006,61041,61128,61242,61338,61368,61430,61447,61484,61550,61569,61624,61668,61673,61713,61831,61885,61949,61972,61986,62055,62123,62195,62303,62328,62391,62413,62428,62455,62468,62495,62513,62604,62697,62801,63113,63302,63557,63753,64064,64335,64773,65564,67239,68505,69778,69961,70634,70643,70851,70882,70915,70960,70986,71116,71135,71140,71211,71335,71398,71412,71428,71429,71487,71563,71589,71590,71630,71638,71646,71648,71656,71712,71728,71736,71738,71786,71837,71856,71867,71885,71887,71899,71992,72004,72009,72021,72045,72055,72085,72087,72115,72128,72149,72176,72187,72201,72215,72218,72239,72251,72254,72266,72350,72352,72358,72359,72360,72362,72373,72387,72418,72449,72454,72499,72500,72529,72545,72546,72595,72611,72612,72627,72653,72762,72805,72810,72813,72858,72867,72873,72875,72879,72883,72884,72885,72887,72891,72892,72895,72896,72913,72922,72930,72948,72964,72973,72991,72997,73051,73119,73132,73149,73230,73272,73274,73298,73303,73305,73306,73327,73334,73343,73427,73432,73470,73492,73543,73546,73565,73569,73587,73594,73618,73620,73633,73641,73651,73656,73664,73681,73738,73746,73761,73765,73787,73788,73790,73867,73876,73895,73957,74068,74087,74128,74155,74165,74205,74209,74234,74255,74261,74275,74283,74285,74297,74298,74300,74305,74312,74313,74314,74316,74321,74325,74328,74335,74343,74345,74350,74352,74354,74356,74357,74358,74362,74363,74364,74365,74369,74370,74377,74380,74383,74385,74389,74398,74399,74403,74404,74406,74407,74408,74411,74413,74419,74436,74444,74447,74448,74460,74462,74664,74981,75001,75040,75045,75052,75068,75069,75070,75074,75116,75120,75122,75124,75134,75137,75156,75159,75162,75163,75166,75168,75169,75179,75180,75181,75185,75187,75189,75192,75197,75206,75211,75214,75244,75245,75250,75252,75264,75313,75314.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25195760893](https://github.com/openclaw/clawsweeper/actions/runs/25195760893)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3433 |
| Open PRs | 3345 |
| Open items total | 6778 |
| Reviewed files | 6718 |
| Unreviewed open items | 60 |
| Archived closed files | 15345 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3413 |
| Proposed issue closes | 2 (0.1% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3295 |
| Proposed PR closes | 6 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6708 |
| Proposed closes awaiting apply | 8 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 2008 |
| Closed by Codex apply | 11353 |
| Failed or stale reviews | 9 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 523/1451 current (928 due, 36%) |
| Hourly hot item cadence (<7d) | 523/1451 current (928 due, 36%) |
| Daily cadence coverage | 3423/3482 current (59 due, 98.3%) |
| Daily PR cadence | 2394/2448 current (54 due, 97.8%) |
| Daily new issue cadence (<30d) | 1029/1034 current (5 due, 99.5%) |
| Weekly older issue cadence | 1781/1785 current (4 due, 99.8%) |
| Due now by cadence | 1051 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 30, 2026, 18:44 UTC

Status: **Action needed**

Targeted review input: `51947,61960,62112,63037,73342`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6806 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 33 |
| Missing protected open records | 21 |
| Missing recently-created open records | 0 |
| Archived records that are open again | 0 |
| Stale item records | 4 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 5 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#51947](https://github.com/openclaw/openclaw/issues/51947) | Stale review | proactive send from DM may route to wrong conversation when user has multiple conversations | records/openclaw-openclaw/items/51947.md |
| [#61960](https://github.com/openclaw/openclaw/pull/61960) | Stale review | docs: require i18n postprocess before skip | records/openclaw-openclaw/items/61960.md |
| [#62112](https://github.com/openclaw/openclaw/pull/62112) | Stale review | fix(agents): preserve Anthropic refusal handling | records/openclaw-openclaw/items/62112.md |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: May 1, 2026, 00:40 UTC. Latest close: May 1, 2026, 00:37 UTC. Latest comment sync: May 1, 2026, 00:52 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 1 | 0 | 1 | 0 | 0 | 484 | 1 |
| Last hour | 788 | 15 | 773 | 2 | 5 | 1005 | 1 |
| Last 24 hours | 6744 | 466 | 6278 | 9 | 647 | 4058 | 24 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#75318](https://github.com/openclaw/openclaw/issues/75318) | [Bug]:  4.29 openclaw status (fast) shows empty Channels table — channel visible only in --deep | duplicate or superseded | May 1, 2026, 00:37 UTC | [records/openclaw-openclaw/closed/75318.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75318.md) |
| [#74706](https://github.com/openclaw/openclaw/issues/74706) | Gateway RPC: add SDK-facing artifacts APIs | closed externally after review | May 1, 2026, 00:35 UTC | [records/openclaw-openclaw/closed/74706.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74706.md) |
| [#74926](https://github.com/openclaw/openclaw/pull/74926) | fix(gateway): harden artifact RPCs | closed externally after review | May 1, 2026, 00:35 UTC | [records/openclaw-openclaw/closed/74926.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74926.md) |
| [#75311](https://github.com/openclaw/openclaw/pull/75311) | fix(ci): GitHub App active-PR-limit exemption regression | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75311.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75311.md) |
| [#75145](https://github.com/openclaw/openclaw/pull/75145) | docs: use American \"behavior\" spelling per contribution guide | closed externally after review | May 1, 2026, 00:10 UTC | [records/openclaw-openclaw/closed/75145.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75145.md) |
| [#71227](https://github.com/openclaw/openclaw/issues/71227) | sessions.json parse+write blows past 60s run budget → agents silently return 'No reply from agent' | duplicate or superseded | Apr 30, 2026, 23:51 UTC | [records/openclaw-openclaw/closed/71227.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71227.md) |
| [#75307](https://github.com/openclaw/openclaw/issues/75307) | Background tasks stay 'running' forever after gateway crash/restart, blocking channel reload + saturating CPU | already implemented on main | Apr 30, 2026, 23:43 UTC | [records/openclaw-openclaw/closed/75307.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75307.md) |
| [#75221](https://github.com/openclaw/openclaw/pull/75221) | test: add published upgrade survivor lane | closed externally after review | Apr 30, 2026, 23:39 UTC | [records/openclaw-openclaw/closed/75221.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75221.md) |
| [#75304](https://github.com/openclaw/openclaw/issues/75304) | [Bug]: OpenClaw 2026.4.29 — Telegram/Discord channels crash-loop due to missing ESM exports in bundled runtime deps | already implemented on main | Apr 30, 2026, 23:30 UTC | [records/openclaw-openclaw/closed/75304.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/75304.md) |
| [#74817](https://github.com/openclaw/openclaw/issues/74817) | Feishu: @所有人 not delivered to bot + requireMention:false causes multi-bot echo loop | duplicate or superseded | Apr 30, 2026, 23:29 UTC | [records/openclaw-openclaw/closed/74817.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74817.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#73704](https://github.com/openclaw/openclaw/pull/73704) | fix(safeguard): resolve compaction provider/model before registering runtime | high | candidate | May 1, 2026, 00:39 UTC | [records/openclaw-openclaw/items/73704.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73704.md) |
| [#75294](https://github.com/openclaw/openclaw/pull/75294) | fix(tui): bound shutdown after terminal hangup | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/75294.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75294.md) |
| [#73667](https://github.com/openclaw/openclaw/pull/73667) | Bound active-memory recall latency and jitter QMD startup | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73667.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73667.md) |
| [#75032](https://github.com/openclaw/openclaw/issues/75032) | [Feature]: Expose `installBundledRuntimeDeps: false` + make `isolatedExecutionRoot` default for bundled plugin runtime deps | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/75032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75032.md) |
| [#73711](https://github.com/openclaw/openclaw/pull/73711) | feat(chat/ios): photos-picker-style attachment thumbnails with persistent add-more tile | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73711.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73711.md) |
| [#73859](https://github.com/openclaw/openclaw/issues/73859) | [Bug]: Built-in plugins (minimax, google, talk-voice) fail with RangeError: Maximum call stack size exceeded on Windows | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73859.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73859.md) |
| [#73197](https://github.com/openclaw/openclaw/pull/73197) | fix(runtime): prevent resource leaks and silent failures [AI-assisted] | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73197.md) |
| [#74944](https://github.com/openclaw/openclaw/issues/74944) | [bug] launchd-submitted self-update script fails with \"env: node: No such file or directory\" (npm exit 127) on macOS Homebrew installs | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/74944.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74944.md) |
| [#73505](https://github.com/openclaw/openclaw/issues/73505) | [Bug]: Telegram streaming.mode=\"partial\" completely disabled when replyToMode is not \"off\ | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/73505.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73505.md) |
| [#74860](https://github.com/openclaw/openclaw/issues/74860) | Gateway 7-second event-loop stalls on 2026.4.27 — createOpenClawTools synchronously rebuilds plugin registry + provider-auth env-var resolution per tool-creation pass | high | candidate | May 1, 2026, 00:38 UTC | [records/openclaw-openclaw/items/74860.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74860.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#75319](https://github.com/openclaw/openclaw/pull/75319) | feat(PR 3): Add transparent encryption for session transcripts and metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75319.md) | complete | May 1, 2026, 00:40 UTC |
| [#73098](https://github.com/openclaw/openclaw/pull/73098) | Allow safe cache trace config patches | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73098.md) | complete | May 1, 2026, 00:37 UTC |
| [#74460](https://github.com/openclaw/openclaw/pull/74460) | fix(dotenv): block Windows shell trust-root vars from workspace .env [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74460.md) | complete | May 1, 2026, 00:37 UTC |
| [#75317](https://github.com/openclaw/openclaw/pull/75317) | fix(memory): retry transient embedding failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75317.md) | complete | May 1, 2026, 00:36 UTC |
| [#75299](https://github.com/openclaw/openclaw/pull/75299) | feat(process): add priority support to command queue | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75299.md) | complete | May 1, 2026, 00:36 UTC |
| [#74354](https://github.com/openclaw/openclaw/issues/74354) | [Bug]: 通过 Control UI 发送纯数字时，数字会被自动添加千位分隔符（如 123456789 → 123-456-789） | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74354.md) | complete | May 1, 2026, 00:36 UTC |
| [#75094](https://github.com/openclaw/openclaw/pull/75094) | feat(control-ui): use scoped assistant media tickets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75094.md) | complete | May 1, 2026, 00:35 UTC |
| [#75172](https://github.com/openclaw/openclaw/pull/75172) | fix(gateway): guard against undefined channelLogs entry in async channel lifecycle handlers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/75172.md) | complete | May 1, 2026, 00:35 UTC |
| [#74419](https://github.com/openclaw/openclaw/issues/74419) | feat: support Jina Embeddings v5 task parameter for task-specific adapters | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74419.md) | failed | May 1, 2026, 00:35 UTC |
| [#73132](https://github.com/openclaw/openclaw/issues/73132) | [Bug] openclaw gateway stop / launchctl bootout doesn't terminate underlying node process — wedged binary persists across stop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73132.md) | complete | May 1, 2026, 00:34 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 22:23 UTC

State: Review publish complete

Merged review artifacts for run 25135463730. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25135463730](https://github.com/openclaw/clawsweeper/actions/runs/25135463730)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 229 |
| Open PRs | 17 |
| Open items total | 246 |
| Reviewed files | 924 |
| Unreviewed open items | 0 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 877 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 911 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 45 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 13 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 0/57 current (57 due, 0%) |
| Hourly hot item cadence (<7d) | 0/57 current (57 due, 0%) |
| Daily cadence coverage | 0/189 current (189 due, 0%) |
| Daily PR cadence | 0/17 current (17 due, 0%) |
| Daily new issue cadence (<30d) | 0/172 current (172 due, 0%) |
| Weekly older issue cadence | 666/673 current (7 due, 99%) |
| Due now by cadence | 253 |

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

Latest review: Apr 29, 2026, 22:22 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 22:15 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last hour | 0 | 0 | 0 | 0 | 0 | 0 | 0 |
| Last 24 hours | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

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
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 22:11 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 22:09 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 22:05 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 22:04 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 22:03 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 22:02 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 22:02 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 22:02 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 22:01 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1683](https://github.com/openclaw/clawhub/issues/1683) | 显示 @yangzhichao814-cell/ apexsearch的重复项 | high | candidate | Apr 29, 2026, 21:42 UTC | [records/openclaw-clawhub/items/1683.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1683.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1525](https://github.com/openclaw/clawhub/issues/1525) | shejian ClawHub Skill has been tagged as suspicious but everything looks fine in the scan results from VirusTotal  Thanks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1525.md) | failed | Apr 29, 2026, 22:22 UTC |
| [#1538](https://github.com/openclaw/clawhub/issues/1538) | clawhub dashboard is unavailable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1538.md) | failed | Apr 29, 2026, 22:21 UTC |
| [#1818](https://github.com/openclaw/clawhub/issues/1818) | False positive: agenttrust-scanner flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1818.md) | failed | Apr 29, 2026, 22:20 UTC |
| [#1900](https://github.com/openclaw/clawhub/issues/1900) | accidently delete my account， cant create new one use github | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1900.md) | complete | Apr 29, 2026, 22:15 UTC |
| [#1862](https://github.com/openclaw/clawhub/issues/1862) | False positive: asr-hotwords flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1862.md) | complete | Apr 29, 2026, 22:14 UTC |
| [#1422](https://github.com/openclaw/clawhub/issues/1422) | ai-capability-analyzer has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1422.md) | complete | Apr 29, 2026, 22:14 UTC |
| [#1707](https://github.com/openclaw/clawhub/issues/1707) | Bug Summary: Missing Token in search and explore Commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1707.md) | failed | Apr 29, 2026, 22:13 UTC |
| [#1407](https://github.com/openclaw/clawhub/issues/1407) | Skill page shows stale SKILL.md content after publishing new versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1407.md) | complete | Apr 29, 2026, 22:13 UTC |
| [#1446](https://github.com/openclaw/clawhub/issues/1446) | False Positive: Skill [Memory Never Forget v2.2.2] incorrectly flagged as suspicious by OpenClaw Security Scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1446.md) | failed | Apr 29, 2026, 22:13 UTC |
| [#1503](https://github.com/openclaw/clawhub/issues/1503) | False positive: axonflow/governance-policies flagged as suspicious — security policy templates | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1503.md) | complete | Apr 29, 2026, 22:12 UTC |

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
| Last 24 hours | 0 | 0 | 0 | 0 | 0 | 0 | 0 |

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
- Before selecting and reviewing commits, the receiver waits 15 minutes by
  default (`CLAWSWEEPER_COMMIT_REVIEW_SETTLE_SECONDS=900`) so a push range has
  time to settle across GitHub and the runner.
- The plan job expands ranges, pages large backfills at GitHub's matrix limit,
  and classifies each commit before Codex starts.
- Pure documentation, changelog, README/license, and asset-only commits get a
  skipped report without spending Codex time.
- Mixed commits and code-bearing commits start one Codex worker per commit. The
  worker checks out current target `main` and reviews the selected commit by
  SHA/range instead of detaching the whole repository at that commit.
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
self-review smoke tests. Broad hot-intake sweeps cap scheduled fan-out at 50
one-item shards per run; exact event reviews still use one shard, and normal
review backfills can fan out to 100 shards when explicitly configured.

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
The `CI` GitHub Actions workflow uses the latest Node release and runs
`pnpm run check` on pushes, pull requests, and manual dispatches. The check gate
includes the full test suite, a strict changed-surface coverage threshold, and a
full compiled-repo coverage ratchet.

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
- optionally set `CLAWSWEEPER_COMMIT_REVIEW_SETTLE_SECONDS=0` for manual
  backfills where the target commit range is already settled; the default is
  `900`
