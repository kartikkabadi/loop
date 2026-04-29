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

Last dashboard update: Apr 29, 2026, 17:52 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4254 |
| Open PRs | 3267 |
| Open items total | 7521 |
| Reviewed files | 7521 |
| Unreviewed open items | 0 |
| Due now by cadence | 2705 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 801 |
| Closed by Codex apply | 10840 |
| Failed or stale reviews | 18 |
| Archived closed files | 14436 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6598 | 6598 | 0 | 2664 | 0 | 754 | 10832 | Apr 29, 2026, 17:50 UTC | Apr 29, 2026, 17:48 UTC | 571 |
| [ClawHub](https://github.com/openclaw/clawhub) | 920 | 920 | 0 | 38 | 0 | 46 | 8 | Apr 29, 2026, 17:47 UTC | Apr 29, 2026, 17:17 UTC | 789 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 3 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 17:52 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25124947928) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 17:51 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25122323390) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 17:50 UTC. Latest close: Apr 29, 2026, 17:48 UTC. Latest comment sync: Apr 29, 2026, 17:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 37 | 1 | 36 | 2 | 5 | 611 | 0 |
| Last hour | 1224 | 5 | 1219 | 12 | 16 | 1360 | 1 |
| Last 24 hours | 5904 | 327 | 5577 | 14 | 734 | 1873 | 27 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74505](https://github.com/openclaw/openclaw/issues/74505) | Support per-server requestTimeoutMs in MCP config | duplicate or superseded | Apr 29, 2026, 17:48 UTC | [records/openclaw-openclaw/closed/74505.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74505.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70278](https://github.com/openclaw/openclaw/pull/70278) | docs(memory-wiki): fix QMD + bridge config example nesting | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/70278.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70278.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69197](https://github.com/openclaw/openclaw/pull/69197) | fix(exec): suppress ghost notifications when poll is actively consuming output | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/69197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69197.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68852](https://github.com/openclaw/openclaw/pull/68852) | fix(memory-wiki): skip fenced code blocks when extracting wiki links | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/68852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68852.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68639](https://github.com/openclaw/openclaw/pull/68639) | fix(memory-wiki): forward sessionKey to shared memory search | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/68639.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68639.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74496](https://github.com/openclaw/openclaw/issues/74496) | claude-max-api-proxy: `messagesToPrompt` stringifies content-block arrays as `[object Object]` (Sonnet/Opus reply with confused 'you sent an object' messages) | duplicate or superseded | Apr 29, 2026, 17:28 UTC | [records/openclaw-openclaw/closed/74496.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74496.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74457](https://github.com/openclaw/openclaw/pull/74457) | fix(reply): harden headless cron exec prompt defaults | closed externally after review | Apr 29, 2026, 17:20 UTC | [records/openclaw-openclaw/closed/74457.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74457.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1434](https://github.com/openclaw/clawhub/issues/1434) | Sonarbay-skill incorrectly flaged. | closed externally after review | Apr 29, 2026, 17:17 UTC | [records/openclaw-clawhub/closed/1434.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1434.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1376](https://github.com/openclaw/clawhub/issues/1376) | False positive: openclaw-workspace-sync flagged as suspicious | closed externally after review | Apr 29, 2026, 17:06 UTC | [records/openclaw-clawhub/closed/1376.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1376.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74423](https://github.com/openclaw/openclaw/issues/74423) | [Bug]: `/models` and Web chat model dropdown show full catalog (900+ models) instead of only configured providers | closed externally after review | Apr 29, 2026, 17:05 UTC | [records/openclaw-openclaw/closed/74423.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74423.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#52276](https://github.com/openclaw/openclaw/pull/52276) | [codex] fix(dedupe): preserve route-scoped suppression context | high | candidate | Apr 29, 2026, 17:34 UTC | [records/openclaw-openclaw/items/52276.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52276.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#53486](https://github.com/openclaw/openclaw/issues/53486) | [Bug] Feishu: message(action=send) renders card JSON as plain text instead of interactive card (regression) | high | candidate | Apr 29, 2026, 17:33 UTC | [records/openclaw-openclaw/items/53486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53486.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | high | candidate | Apr 29, 2026, 17:33 UTC | [records/openclaw-openclaw/items/62120.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62120.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 17:25 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 17:25 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 17:24 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68391](https://github.com/openclaw/openclaw/issues/68391) | CLI: `openclaw models --agent <id> set` silently writes to global default instead of agent scope | high | candidate | Apr 29, 2026, 17:22 UTC | [records/openclaw-openclaw/items/68391.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68391.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#737](https://github.com/openclaw/clawhub/issues/737) | Remove duplicate label on @nexecuteinc/cmdbcompass | high | candidate | Apr 29, 2026, 17:22 UTC | [records/openclaw-clawhub/items/737.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/737.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 17:21 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 17:21 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#651](https://github.com/openclaw/clawhub/issues/651) | why | high | candidate | Apr 29, 2026, 17:21 UTC | [records/openclaw-clawhub/items/651.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/651.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74487](https://github.com/openclaw/openclaw/issues/74487) | [Bug]: Ollama Kimi tool call fails with \"Tool exec not found\" despite /tools showing exec | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-openclaw/items/74487.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74487.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74489](https://github.com/openclaw/openclaw/pull/74489) | fix(discord): cool down Cloudflare 429 responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74489.md) | complete | Apr 29, 2026, 17:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 29, 2026, 17:50 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74508](https://github.com/openclaw/openclaw/pull/74508) | fix(telegram): chain reasoning messages on overflow instead of stopping | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74508.md) | complete | Apr 29, 2026, 17:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74446](https://github.com/openclaw/openclaw/pull/74446) | fix(auto-reply): honor direct silent reply allow policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74446.md) | complete | Apr 29, 2026, 17:49 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74507](https://github.com/openclaw/openclaw/pull/74507) | fix(models): reject suppressed inline model rows with api | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74507.md) | complete | Apr 29, 2026, 17:48 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74506](https://github.com/openclaw/openclaw/pull/74506) | [codex] Add Discord mention formatting prompt guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74506.md) | complete | Apr 29, 2026, 17:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70864](https://github.com/openclaw/openclaw/pull/70864) | feat: add scoped mention pattern policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70864.md) | complete | Apr 29, 2026, 17:47 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1725](https://github.com/openclaw/clawhub/issues/1725) | [Skill Review] weiliaozi-skill flagged as suspicious due to prompt pattern — likely false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1725.md) | failed | Apr 29, 2026, 17:47 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74491](https://github.com/openclaw/openclaw/issues/74491) | [Bug]: 10–15s per-message delay before WebChat/Telegram dispatch to LM Studio on macOS direct install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74491.md) | complete | Apr 29, 2026, 17:46 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74499](https://github.com/openclaw/openclaw/pull/74499) | fix(ollama): normalize prefixed tool-call names before Ollama dispatch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74499.md) | complete | Apr 29, 2026, 17:45 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 17:52 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25124947928](https://github.com/openclaw/clawsweeper/actions/runs/25124947928)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3368 |
| Open PRs | 3230 |
| Open items total | 6598 |
| Reviewed files | 6598 |
| Unreviewed open items | 0 |
| Archived closed files | 14410 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3362 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3226 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6588 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 754 |
| Closed by Codex apply | 10832 |
| Failed or stale reviews | 10 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 84/1119 current (1035 due, 7.5%) |
| Hourly hot item cadence (<7d) | 84/1119 current (1035 due, 7.5%) |
| Daily cadence coverage | 2050/3673 current (1623 due, 55.8%) |
| Daily PR cadence | 1420/2565 current (1145 due, 55.4%) |
| Daily new issue cadence (<30d) | 630/1108 current (478 due, 56.9%) |
| Weekly older issue cadence | 1800/1806 current (6 due, 99.7%) |
| Due now by cadence | 2664 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 12:49 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72537,72539,72541`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6950 |
| Missing eligible open records | 270 |
| Missing maintainer-authored open records | 36 |
| Missing protected open records | 25 |
| Missing recently-created open records | 27 |
| Archived records that are open again | 0 |
| Stale item records | 3 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 11 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 17:50 UTC. Latest close: Apr 29, 2026, 17:48 UTC. Latest comment sync: Apr 29, 2026, 17:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 16 | 1 | 15 | 0 | 5 | 132 | 0 |
| Last hour | 574 | 5 | 569 | 4 | 14 | 571 | 1 |
| Last 24 hours | 4967 | 327 | 4640 | 6 | 718 | 1068 | 27 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74505](https://github.com/openclaw/openclaw/issues/74505) | Support per-server requestTimeoutMs in MCP config | duplicate or superseded | Apr 29, 2026, 17:48 UTC | [records/openclaw-openclaw/closed/74505.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74505.md) |
| [#70278](https://github.com/openclaw/openclaw/pull/70278) | docs(memory-wiki): fix QMD + bridge config example nesting | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/70278.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70278.md) |
| [#69197](https://github.com/openclaw/openclaw/pull/69197) | fix(exec): suppress ghost notifications when poll is actively consuming output | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/69197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/69197.md) |
| [#68852](https://github.com/openclaw/openclaw/pull/68852) | fix(memory-wiki): skip fenced code blocks when extracting wiki links | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/68852.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68852.md) |
| [#68639](https://github.com/openclaw/openclaw/pull/68639) | fix(memory-wiki): forward sessionKey to shared memory search | closed externally after review | Apr 29, 2026, 17:40 UTC | [records/openclaw-openclaw/closed/68639.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68639.md) |
| [#74496](https://github.com/openclaw/openclaw/issues/74496) | claude-max-api-proxy: `messagesToPrompt` stringifies content-block arrays as `[object Object]` (Sonnet/Opus reply with confused 'you sent an object' messages) | duplicate or superseded | Apr 29, 2026, 17:28 UTC | [records/openclaw-openclaw/closed/74496.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74496.md) |
| [#74457](https://github.com/openclaw/openclaw/pull/74457) | fix(reply): harden headless cron exec prompt defaults | closed externally after review | Apr 29, 2026, 17:20 UTC | [records/openclaw-openclaw/closed/74457.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74457.md) |
| [#74423](https://github.com/openclaw/openclaw/issues/74423) | [Bug]: `/models` and Web chat model dropdown show full catalog (900+ models) instead of only configured providers | closed externally after review | Apr 29, 2026, 17:05 UTC | [records/openclaw-openclaw/closed/74423.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74423.md) |
| [#74477](https://github.com/openclaw/openclaw/pull/74477) | fix(models): hide unauthenticated catalog entries | closed externally after review | Apr 29, 2026, 17:05 UTC | [records/openclaw-openclaw/closed/74477.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74477.md) |
| [#74478](https://github.com/openclaw/openclaw/issues/74478) | [Bug]: Agent ignores all proxy settings, cannot connect to Telegram behind DPI | already implemented on main | Apr 29, 2026, 17:02 UTC | [records/openclaw-openclaw/closed/74478.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74478.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#52276](https://github.com/openclaw/openclaw/pull/52276) | [codex] fix(dedupe): preserve route-scoped suppression context | high | candidate | Apr 29, 2026, 17:34 UTC | [records/openclaw-openclaw/items/52276.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/52276.md) |
| [#53486](https://github.com/openclaw/openclaw/issues/53486) | [Bug] Feishu: message(action=send) renders card JSON as plain text instead of interactive card (regression) | high | candidate | Apr 29, 2026, 17:33 UTC | [records/openclaw-openclaw/items/53486.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/53486.md) |
| [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | high | candidate | Apr 29, 2026, 17:33 UTC | [records/openclaw-openclaw/items/62120.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62120.md) |
| [#68391](https://github.com/openclaw/openclaw/issues/68391) | CLI: `openclaw models --agent <id> set` silently writes to global default instead of agent scope | high | candidate | Apr 29, 2026, 17:22 UTC | [records/openclaw-openclaw/items/68391.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68391.md) |
| [#74487](https://github.com/openclaw/openclaw/issues/74487) | [Bug]: Ollama Kimi tool call fails with \"Tool exec not found\" despite /tools showing exec | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-openclaw/items/74487.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74487.md) |
| [#74286](https://github.com/openclaw/openclaw/issues/74286) | Bug: sub-agent announce completion causes parent session to generate out-of-context replies | high | candidate | Apr 29, 2026, 17:16 UTC | [records/openclaw-openclaw/items/74286.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74286.md) |
| [#68066](https://github.com/openclaw/openclaw/issues/68066) | Gateway writes streamed usage.cost.total for OpenRouter calls — up to 4× under actual billed amount on tier-priced models | high | candidate | Apr 29, 2026, 17:15 UTC | [records/openclaw-openclaw/items/68066.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68066.md) |
| [#67203](https://github.com/openclaw/openclaw/pull/67203) | fix(mistral): handle content blocks array in reasoning stream | high | candidate | Apr 29, 2026, 17:15 UTC | [records/openclaw-openclaw/items/67203.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/67203.md) |
| [#68046](https://github.com/openclaw/openclaw/pull/68046) | fix: pass through image/audio/resource content blocks in MCP HTTP gateway | high | candidate | Apr 29, 2026, 17:15 UTC | [records/openclaw-openclaw/items/68046.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68046.md) |
| [#68162](https://github.com/openclaw/openclaw/issues/68162) | [Bug] Control UI (webchat) creates new session on WebSocket reconnection instead of resuming | high | candidate | Apr 29, 2026, 17:15 UTC | [records/openclaw-openclaw/items/68162.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/68162.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#74489](https://github.com/openclaw/openclaw/pull/74489) | fix(discord): cool down Cloudflare 429 responses | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74489.md) | complete | Apr 29, 2026, 17:50 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 29, 2026, 17:50 UTC |
| [#74508](https://github.com/openclaw/openclaw/pull/74508) | fix(telegram): chain reasoning messages on overflow instead of stopping | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74508.md) | complete | Apr 29, 2026, 17:49 UTC |
| [#74446](https://github.com/openclaw/openclaw/pull/74446) | fix(auto-reply): honor direct silent reply allow policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74446.md) | complete | Apr 29, 2026, 17:49 UTC |
| [#74507](https://github.com/openclaw/openclaw/pull/74507) | fix(models): reject suppressed inline model rows with api | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74507.md) | complete | Apr 29, 2026, 17:48 UTC |
| [#74506](https://github.com/openclaw/openclaw/pull/74506) | [codex] Add Discord mention formatting prompt guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74506.md) | complete | Apr 29, 2026, 17:47 UTC |
| [#70864](https://github.com/openclaw/openclaw/pull/70864) | feat: add scoped mention pattern policy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70864.md) | complete | Apr 29, 2026, 17:47 UTC |
| [#74491](https://github.com/openclaw/openclaw/issues/74491) | [Bug]: 10–15s per-message delay before WebChat/Telegram dispatch to LM Studio on macOS direct install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74491.md) | complete | Apr 29, 2026, 17:46 UTC |
| [#74499](https://github.com/openclaw/openclaw/pull/74499) | fix(ollama): normalize prefixed tool-call names before Ollama dispatch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74499.md) | complete | Apr 29, 2026, 17:45 UTC |
| [#74503](https://github.com/openclaw/openclaw/pull/74503) | fix(agents): disable pi-agent auto-retry + thinking repetition detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74503.md) | complete | Apr 29, 2026, 17:45 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 17:51 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 472. Item numbers: 3,15,17,18,23,26,32,33,48,49,51,52,60,62,65,72,77,79,84,86,88,95,96,97,99,100,102,115,117,120,127,128,129,131,134,137,151,156,162,169,170,171,173,174,178,184,192,205,211,224,225,226,227,228,231,234,236,237,238,243,248,256,265,268,275,277,279,284,287,288,290,314,321,323,328,329,337,340,345,348,349,351,353,364,367,369,371,373,378,379,380,382,385,386,387,388,390,392,393,397,402,410,420,423,424,425,437,438,442,443,447,450,454,459,463,469,471,478,479,480,481,485,487,488,489,494,495,498,501,503,516,528,531,532,535,539,541,553,563,567,568,573,574,576,580,581,586,589,593,600,604,606,613,614,615,625,631,636,637,642,646,647,651,652,653,654,657,658,661,664,667,668,670,672,673,674,675,676,679,680,683,686,700,702,705,706,711,713,718,722,730,737,747,756,758,764,765,767,770,772,786,789,809,811,822,849,852,853,856,861,862,867,878,887,888,912,915,939,940,966,997,1002,1007,1011,1017,1018,1021,1028,1038,1039,1040,1043,1045,1046,1047,1052,1061,1064,1068,1070,1072,1075,1084,1088,1090,1091,1094,1097,1098,1104,1106,1107,1111,1112,1114,1119,1122,1125,1126,1128,1131,1133,1140,1145,1146,1147,1148,1154,1156,1159,1167,1177,1179,1188,1201,1204,1206,1208,1210,1211,1212,1217,1218,1219,1222,1223,1224,1226,1227,1229,1231,1233,1235,1236,1237,1239,1243,1244,1247,1249,1250,1254,1256,1257,1260,1261,1264,1265,1267,1268,1269,1271,1272,1273,1274,1275,1276,1277,1278,1279,1280,1282,1285,1287,1288,1289,1290,1292,1293,1294,1296,1298,1299,1301,1302,1307,1308,1309,1310,1312,1313,1314,1315,1316,1318,1320,1325,1326,1329,1334,1336,1338,1341,1345,1347,1350,1351,1353,1354,1358,1361,1364,1366,1367,1368,1370,1371,1374,1377,1378,1379,1381,1382,1383,1384,1385,1387,1391,1392,1393,1394,1397,1398,1400,1401,1402,1403,1404,1405,1406,1408,1409,1410,1411,1412,1413,1414,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1428,1430,1431,1432,1433,1435,1437,1442,1443,1444,1445,1446,1447,1448,1450,1451,1457,1462,1463,1465,1471,1472,1473,1476,1477,1480,1494,1495,1500,1503,1509,1511,1515,1516,1518,1519,1520,1521,1523,1526,1528,1529,1530,1533,1535,1538,1542,1543,1551,1553,1554,1558,1559,1563,1572,1574,1575,1576,1578,1582,1583,1584,1585,1586,1587,1588,1589,1591,1592,1594,1595,1614,1631,1632,1649,1653,1654,1657,1658,1659,1666,1667,1670,1678,1680,1689,1712,1725,1748,1751,1760,1767,1896.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25122323390](https://github.com/openclaw/clawsweeper/actions/runs/25122323390)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 886 |
| Open PRs | 34 |
| Open items total | 920 |
| Reviewed files | 920 |
| Unreviewed open items | 0 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 878 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 912 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 46 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 27/57 current (30 due, 47.4%) |
| Hourly hot item cadence (<7d) | 27/57 current (30 due, 47.4%) |
| Daily cadence coverage | 208/210 current (2 due, 99%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 187/189 current (2 due, 98.9%) |
| Weekly older issue cadence | 647/653 current (6 due, 99.1%) |
| Due now by cadence | 38 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 12:49 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 927 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 5 |
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

Latest review: Apr 29, 2026, 17:47 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 17:51 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 21 | 0 | 21 | 2 | 0 | 479 | 0 |
| Last hour | 650 | 0 | 650 | 8 | 2 | 789 | 0 |
| Last 24 hours | 934 | 0 | 934 | 8 | 16 | 802 | 0 |

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
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 17:25 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 17:25 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 17:24 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |
| [#737](https://github.com/openclaw/clawhub/issues/737) | Remove duplicate label on @nexecuteinc/cmdbcompass | high | candidate | Apr 29, 2026, 17:22 UTC | [records/openclaw-clawhub/items/737.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/737.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 17:21 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#379](https://github.com/openclaw/clawhub/issues/379) | VirusTotal badge shows 'Suspicious' despite 0/54 clean scan | high | candidate | Apr 29, 2026, 17:21 UTC | [records/openclaw-clawhub/items/379.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/379.md) |
| [#651](https://github.com/openclaw/clawhub/issues/651) | why | high | candidate | Apr 29, 2026, 17:21 UTC | [records/openclaw-clawhub/items/651.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/651.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 17:20 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1725](https://github.com/openclaw/clawhub/issues/1725) | [Skill Review] weiliaozi-skill flagged as suspicious due to prompt pattern — likely false positive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1725.md) | failed | Apr 29, 2026, 17:47 UTC |
| [#1574](https://github.com/openclaw/clawhub/issues/1574) | clawhub explore --json returns empty items[] (authenticated, all sort modes) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1574.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#997](https://github.com/openclaw/clawhub/issues/997) | Account locked out — tokens:listMine Server Error on /settings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/997.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1125](https://github.com/openclaw/clawhub/pull/1125) | feat: check OS requirements when clawdhub install | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1125.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1896](https://github.com/openclaw/clawhub/issues/1896) | clawhub is scanning skills wrong way | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1896.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1657](https://github.com/openclaw/clawhub/pull/1657) | feat: detect phantom dependencies in skill bundle files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1657.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1563](https://github.com/openclaw/clawhub/issues/1563) | Skill flagged suspicious, scan tagged benign | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1563.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1167](https://github.com/openclaw/clawhub/issues/1167) | [Security / Release Slug] Hard delete SKILL and purge all historical versions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1167.md) | complete | Apr 29, 2026, 17:39 UTC |
| [#1649](https://github.com/openclaw/clawhub/issues/1649) | Add skill: recomby-ai/promptly-prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1649.md) | complete | Apr 29, 2026, 17:39 UTC |

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
| Open PRs | 3 |
| Open items total | 3 |
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
