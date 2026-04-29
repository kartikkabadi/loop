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

Last dashboard update: Apr 29, 2026, 04:22 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4408 |
| Open PRs | 3484 |
| Open items total | 7892 |
| Reviewed files | 7502 |
| Unreviewed open items | 390 |
| Due now by cadence | 1749 |
| Proposed closes awaiting apply | 19 |
| Work candidates awaiting promotion | 420 |
| Closed by Codex apply | 10653 |
| Failed or stale reviews | 22 |
| Archived closed files | 13991 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6974 | 6592 | 382 | 1690 | 19 | 385 | 10647 | Apr 29, 2026, 04:19 UTC | Apr 29, 2026, 04:16 UTC | 530 |
| [ClawHub](https://github.com/openclaw/clawhub) | 918 | 910 | 8 | 59 | 0 | 35 | 6 | Apr 29, 2026, 04:20 UTC | Apr 29, 2026, 03:02 UTC | 516 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review publish complete | Apr 29, 2026, 04:19 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25090059310) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 04:21 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25090414184) |

### Fleet Activity

Latest review: Apr 29, 2026, 04:20 UTC. Latest close: Apr 29, 2026, 04:16 UTC. Latest comment sync: Apr 29, 2026, 04:21 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 233 | 11 | 222 | 4 | 7 | 42 | 0 |
| Last hour | 1019 | 36 | 983 | 12 | 25 | 1046 | 2 |
| Last 24 hours | 7157 | 438 | 6719 | 19 | 747 | 1935 | 30 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74046](https://github.com/openclaw/openclaw/pull/74046) | [codex] Bias group chat prompts toward subagent delegation | kept open | Apr 29, 2026, 04:16 UTC | [records/openclaw-openclaw/closed/74046.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74046.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73909](https://github.com/openclaw/openclaw/issues/73909) | [Bug]: Ollama cloud models (gemini-3-flash-preview:cloud, deepseek-v4-pro:cloud) fail with \"Assistant turn failed before producing content\" or silent fallback | closed externally after review | Apr 29, 2026, 04:14 UTC | [records/openclaw-openclaw/closed/73909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73909.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74058](https://github.com/openclaw/openclaw/issues/74058) | models.list is slow because it does provider startup and dependency installs on the hot path | duplicate or superseded | Apr 29, 2026, 04:11 UTC | [records/openclaw-openclaw/closed/74058.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74058.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74056](https://github.com/openclaw/openclaw/issues/74056) | OpenCode Go provider: deepseek-v4-pro and deepseek-v4-flash missing from model list | already implemented on main | Apr 29, 2026, 04:09 UTC | [records/openclaw-openclaw/closed/74056.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74056.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45268](https://github.com/openclaw/openclaw/issues/45268) | status: context usage is misleading when totalTokensFresh=false | closed externally after review | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/closed/45268.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/45268.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73578](https://github.com/openclaw/openclaw/issues/73578) | session status `Context:` line conflates cumulative session tokens with per-call context window | closed externally after review | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/closed/73578.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73578.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73660](https://github.com/openclaw/openclaw/issues/73660) | toAnthropicModelRef silently rewrites claude-cli/ model prefix to anthropic/, ignoring explicit provider intent | closed externally after review | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/closed/73660.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73660.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73985](https://github.com/openclaw/openclaw/pull/73985) | fix(imessage): normalize leading echo-cache corruption bytes | closed externally after review | Apr 29, 2026, 04:05 UTC | [records/openclaw-openclaw/closed/73985.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73985.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73891](https://github.com/openclaw/openclaw/pull/73891) | fix(imessage): normalize leading echo-cache corruption bytes | closed externally after review | Apr 29, 2026, 04:05 UTC | [records/openclaw-openclaw/closed/73891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73891.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#59973](https://github.com/openclaw/openclaw/issues/59973) | iMessage DM echo: corrupted prefix breaks text-based dedup (v2026.3.31+) | closed externally after review | Apr 29, 2026, 04:04 UTC | [records/openclaw-openclaw/closed/59973.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59973.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70407](https://github.com/openclaw/openclaw/issues/70407) | Breaking config change in v2026.4.21: dreaming.storage schema migration breaks CLI on upgrade | high | candidate | Apr 29, 2026, 04:13 UTC | [records/openclaw-openclaw/items/70407.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70407.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74003](https://github.com/openclaw/openclaw/issues/74003) | [Bug]: before_tool_call plugin approval fails with 'no approval route' — turnSourceChannel not passed to plugin.approval.request | high | candidate | Apr 29, 2026, 04:10 UTC | [records/openclaw-openclaw/items/74003.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74003.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70797](https://github.com/openclaw/openclaw/issues/70797) | Tool-call payload can leak into user-visible reply during background exec/process flows | high | candidate | Apr 29, 2026, 04:10 UTC | [records/openclaw-openclaw/items/70797.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70797.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72273](https://github.com/openclaw/openclaw/issues/72273) | Make `DISCORD_GATEWAY_READY_TIMEOUT_MS` configurable (15s too short for multi-account stagger) | high | candidate | Apr 29, 2026, 04:10 UTC | [records/openclaw-openclaw/items/72273.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72273.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71710](https://github.com/openclaw/openclaw/issues/71710) | [Bug]: openclaw-agent ignores SIGTERM under cron, accumulates hung process chains and exhausts host RAM/swap | high | candidate | Apr 29, 2026, 04:09 UTC | [records/openclaw-openclaw/items/71710.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71710.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71849](https://github.com/openclaw/openclaw/issues/71849) | Realtime voice consult is too slow/fragile for live calls; add fast memory context path | high | candidate | Apr 29, 2026, 04:09 UTC | [records/openclaw-openclaw/items/71849.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71849.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69249](https://github.com/openclaw/openclaw/issues/69249) | Gateway restart can silently abort an in-flight Discord turn, with no automatic recovery message to the user | high | candidate | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/items/69249.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69249.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70033](https://github.com/openclaw/openclaw/issues/70033) | Tool calls emit empty arguments `{}` when content parameter is large (write/exec) | high | candidate | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/items/70033.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70033.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70779](https://github.com/openclaw/openclaw/issues/70779) | [Regression] OpenAI-compatible Gemini backend enters streaming mode but completes immediately with no incremental content updates (4.19 OK, 4.21+/4.22 broken) | high | candidate | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/items/70779.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70779.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71865](https://github.com/openclaw/openclaw/issues/71865) | Auth login blocked by size-drop guard when openclaw.json was created by PowerShell (verbose/BOM format) | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-openclaw/items/71865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71865.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71178](https://github.com/openclaw/openclaw/issues/71178) | `openclaw update` run mid-turn causes total message loss on Telegram (and likely Discord) | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-openclaw/items/71178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71178.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71709](https://github.com/openclaw/openclaw/issues/71709) | [Bug]: slug-generator HTTP 400 misclassified as profile-wide billing failure (5h cooldown), kills all agents on profile | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-openclaw/items/71709.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71709.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69778](https://github.com/openclaw/openclaw/issues/69778) | [Bug]: Gateway restart resurrects ancient interrupted CLI subagent tasks regardless of age — old prompts auto-execute | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-openclaw/items/69778.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69778.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70643](https://github.com/openclaw/openclaw/issues/70643) | Concurrent writes to openclaw.json produce invalid (concatenated) JSON; gateway refuses config until auto-restore | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-openclaw/items/70643.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70643.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70347](https://github.com/openclaw/openclaw/issues/70347) | Cron outer timeout should emit lifecycle.error so sessions.json finalizes immediately | high | candidate | Apr 29, 2026, 04:05 UTC | [records/openclaw-openclaw/items/70347.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70347.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1649](https://github.com/openclaw/clawhub/issues/1649) | Add skill: recomby-ai/promptly-prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1649.md) | failed | Apr 29, 2026, 04:20 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | failed | Apr 29, 2026, 04:19 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#18915](https://github.com/openclaw/openclaw/pull/18915) | fix(telegram): pass video width/height to sendVideo to prevent portra… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/18915.md) | complete | Apr 29, 2026, 04:19 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74060](https://github.com/openclaw/openclaw/pull/74060) | [AI-assisted] fix(feishu): probe status with account credentials | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74060.md) | complete | Apr 29, 2026, 04:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#69270](https://github.com/openclaw/openclaw/pull/69270) | fix(compaction): restore session invariants across compaction and reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69270.md) | complete | Apr 29, 2026, 04:18 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73996](https://github.com/openclaw/openclaw/pull/73996) | fix: interpolate responsePrefix template variables in heartbeat replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73996.md) | complete | Apr 29, 2026, 04:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#51421](https://github.com/openclaw/openclaw/pull/51421) | fix(memory): memoryFlush fires every compaction cycle instead of every other | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51421.md) | complete | Apr 29, 2026, 04:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71792](https://github.com/openclaw/openclaw/pull/71792) | fix(session): persist memory on auto daily/idle rollover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71792.md) | complete | Apr 29, 2026, 04:17 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71830](https://github.com/openclaw/openclaw/pull/71830) | fix(whatsapp): sanitize tool XML and hide configured error text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71830.md) | complete | Apr 29, 2026, 04:16 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73620](https://github.com/openclaw/openclaw/pull/73620) | fix(cli/agents add): pre-fill peer-level workspace path in wizard (#71889) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73620.md) | complete | Apr 29, 2026, 04:16 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 04:19 UTC

State: Review publish complete

Merged review artifacts for run 25090059310. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25090059310](https://github.com/openclaw/clawsweeper/actions/runs/25090059310)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3530 |
| Open PRs | 3444 |
| Open items total | 6974 |
| Reviewed files | 6592 |
| Unreviewed open items | 382 |
| Archived closed files | 13973 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3341 |
| Proposed issue closes | 7 (0.2% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3244 |
| Proposed PR closes | 12 (0.4% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6585 |
| Proposed closes awaiting apply | 19 (0.3% of fresh reviews) |
| Work candidates awaiting promotion | 385 |
| Closed by Codex apply | 10647 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 393/975 current (582 due, 40.3%) |
| Hourly hot item cadence (<7d) | 393/975 current (582 due, 40.3%) |
| Daily cadence coverage | 3079/3804 current (725 due, 80.9%) |
| Daily PR cadence | 2280/2661 current (381 due, 85.7%) |
| Daily new issue cadence (<30d) | 799/1143 current (344 due, 69.9%) |
| Weekly older issue cadence | 1812/1813 current (1 due, 99.9%) |
| Due now by cadence | 1690 |

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

Latest review: Apr 29, 2026, 04:19 UTC. Latest close: Apr 29, 2026, 04:16 UTC. Latest comment sync: Apr 29, 2026, 04:20 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 210 | 11 | 199 | 2 | 7 | 19 | 0 |
| Last hour | 951 | 36 | 915 | 2 | 25 | 530 | 2 |
| Last 24 hours | 6229 | 435 | 5794 | 4 | 729 | 1010 | 30 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74046](https://github.com/openclaw/openclaw/pull/74046) | [codex] Bias group chat prompts toward subagent delegation | kept open | Apr 29, 2026, 04:16 UTC | [records/openclaw-openclaw/closed/74046.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74046.md) |
| [#73909](https://github.com/openclaw/openclaw/issues/73909) | [Bug]: Ollama cloud models (gemini-3-flash-preview:cloud, deepseek-v4-pro:cloud) fail with \"Assistant turn failed before producing content\" or silent fallback | closed externally after review | Apr 29, 2026, 04:14 UTC | [records/openclaw-openclaw/closed/73909.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73909.md) |
| [#74058](https://github.com/openclaw/openclaw/issues/74058) | models.list is slow because it does provider startup and dependency installs on the hot path | duplicate or superseded | Apr 29, 2026, 04:11 UTC | [records/openclaw-openclaw/closed/74058.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74058.md) |
| [#74056](https://github.com/openclaw/openclaw/issues/74056) | OpenCode Go provider: deepseek-v4-pro and deepseek-v4-flash missing from model list | already implemented on main | Apr 29, 2026, 04:09 UTC | [records/openclaw-openclaw/closed/74056.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74056.md) |
| [#45268](https://github.com/openclaw/openclaw/issues/45268) | status: context usage is misleading when totalTokensFresh=false | closed externally after review | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/closed/45268.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/45268.md) |
| [#73578](https://github.com/openclaw/openclaw/issues/73578) | session status `Context:` line conflates cumulative session tokens with per-call context window | closed externally after review | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/closed/73578.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73578.md) |
| [#73660](https://github.com/openclaw/openclaw/issues/73660) | toAnthropicModelRef silently rewrites claude-cli/ model prefix to anthropic/, ignoring explicit provider intent | closed externally after review | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/closed/73660.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73660.md) |
| [#73985](https://github.com/openclaw/openclaw/pull/73985) | fix(imessage): normalize leading echo-cache corruption bytes | closed externally after review | Apr 29, 2026, 04:05 UTC | [records/openclaw-openclaw/closed/73985.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73985.md) |
| [#73891](https://github.com/openclaw/openclaw/pull/73891) | fix(imessage): normalize leading echo-cache corruption bytes | closed externally after review | Apr 29, 2026, 04:05 UTC | [records/openclaw-openclaw/closed/73891.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73891.md) |
| [#59973](https://github.com/openclaw/openclaw/issues/59973) | iMessage DM echo: corrupted prefix breaks text-based dedup (v2026.3.31+) | closed externally after review | Apr 29, 2026, 04:04 UTC | [records/openclaw-openclaw/closed/59973.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/59973.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#70407](https://github.com/openclaw/openclaw/issues/70407) | Breaking config change in v2026.4.21: dreaming.storage schema migration breaks CLI on upgrade | high | candidate | Apr 29, 2026, 04:13 UTC | [records/openclaw-openclaw/items/70407.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70407.md) |
| [#74003](https://github.com/openclaw/openclaw/issues/74003) | [Bug]: before_tool_call plugin approval fails with 'no approval route' — turnSourceChannel not passed to plugin.approval.request | high | candidate | Apr 29, 2026, 04:10 UTC | [records/openclaw-openclaw/items/74003.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74003.md) |
| [#70797](https://github.com/openclaw/openclaw/issues/70797) | Tool-call payload can leak into user-visible reply during background exec/process flows | high | candidate | Apr 29, 2026, 04:10 UTC | [records/openclaw-openclaw/items/70797.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70797.md) |
| [#72273](https://github.com/openclaw/openclaw/issues/72273) | Make `DISCORD_GATEWAY_READY_TIMEOUT_MS` configurable (15s too short for multi-account stagger) | high | candidate | Apr 29, 2026, 04:10 UTC | [records/openclaw-openclaw/items/72273.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72273.md) |
| [#71710](https://github.com/openclaw/openclaw/issues/71710) | [Bug]: openclaw-agent ignores SIGTERM under cron, accumulates hung process chains and exhausts host RAM/swap | high | candidate | Apr 29, 2026, 04:09 UTC | [records/openclaw-openclaw/items/71710.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71710.md) |
| [#71849](https://github.com/openclaw/openclaw/issues/71849) | Realtime voice consult is too slow/fragile for live calls; add fast memory context path | high | candidate | Apr 29, 2026, 04:09 UTC | [records/openclaw-openclaw/items/71849.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71849.md) |
| [#69249](https://github.com/openclaw/openclaw/issues/69249) | Gateway restart can silently abort an in-flight Discord turn, with no automatic recovery message to the user | high | candidate | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/items/69249.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69249.md) |
| [#70033](https://github.com/openclaw/openclaw/issues/70033) | Tool calls emit empty arguments `{}` when content parameter is large (write/exec) | high | candidate | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/items/70033.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70033.md) |
| [#70779](https://github.com/openclaw/openclaw/issues/70779) | [Regression] OpenAI-compatible Gemini backend enters streaming mode but completes immediately with no incremental content updates (4.19 OK, 4.21+/4.22 broken) | high | candidate | Apr 29, 2026, 04:08 UTC | [records/openclaw-openclaw/items/70779.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70779.md) |
| [#71865](https://github.com/openclaw/openclaw/issues/71865) | Auth login blocked by size-drop guard when openclaw.json was created by PowerShell (verbose/BOM format) | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-openclaw/items/71865.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71865.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#18915](https://github.com/openclaw/openclaw/pull/18915) | fix(telegram): pass video width/height to sendVideo to prevent portra… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/18915.md) | complete | Apr 29, 2026, 04:19 UTC |
| [#74060](https://github.com/openclaw/openclaw/pull/74060) | [AI-assisted] fix(feishu): probe status with account credentials | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74060.md) | complete | Apr 29, 2026, 04:18 UTC |
| [#69270](https://github.com/openclaw/openclaw/pull/69270) | fix(compaction): restore session invariants across compaction and reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/69270.md) | complete | Apr 29, 2026, 04:18 UTC |
| [#73996](https://github.com/openclaw/openclaw/pull/73996) | fix: interpolate responsePrefix template variables in heartbeat replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73996.md) | complete | Apr 29, 2026, 04:17 UTC |
| [#51421](https://github.com/openclaw/openclaw/pull/51421) | fix(memory): memoryFlush fires every compaction cycle instead of every other | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/51421.md) | complete | Apr 29, 2026, 04:17 UTC |
| [#71792](https://github.com/openclaw/openclaw/pull/71792) | fix(session): persist memory on auto daily/idle rollover | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71792.md) | complete | Apr 29, 2026, 04:17 UTC |
| [#71830](https://github.com/openclaw/openclaw/pull/71830) | fix(whatsapp): sanitize tool XML and hide configured error text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71830.md) | complete | Apr 29, 2026, 04:16 UTC |
| [#73620](https://github.com/openclaw/openclaw/pull/73620) | fix(cli/agents add): pre-fill peer-level workspace path in wizard (#71889) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73620.md) | complete | Apr 29, 2026, 04:16 UTC |
| [#71738](https://github.com/openclaw/openclaw/pull/71738) | feat(matrix): isolate matrix thread history and reply placement | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71738.md) | complete | Apr 29, 2026, 04:15 UTC |
| [#71717](https://github.com/openclaw/openclaw/issues/71717) | exec tool returns EPERM on Windows, all commands fail | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/71717.md) | failed | Apr 29, 2026, 04:14 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 04:21 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1418,1434,1542,1554,1558,1563,1649,1685,1718,1743,1751,1771,1783,1789,1798,1813,1819,1823,1857,1860.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25090414184](https://github.com/openclaw/clawsweeper/actions/runs/25090414184)
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
| Archived closed files | 18 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 861 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 895 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 35 |
| Closed by Codex apply | 6 |
| Failed or stale reviews | 15 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 16/52 current (36 due, 30.8%) |
| Hourly hot item cadence (<7d) | 16/52 current (36 due, 30.8%) |
| Daily cadence coverage | 220/223 current (3 due, 98.7%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 199/202 current (3 due, 98.5%) |
| Weekly older issue cadence | 623/635 current (12 due, 98.1%) |
| Due now by cadence | 59 |

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

Latest review: Apr 29, 2026, 04:20 UTC. Latest close: Apr 29, 2026, 03:02 UTC. Latest comment sync: Apr 29, 2026, 04:21 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 23 | 0 | 23 | 2 | 0 | 23 | 0 |
| Last hour | 68 | 0 | 68 | 10 | 0 | 516 | 0 |
| Last 24 hours | 928 | 3 | 925 | 15 | 18 | 925 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
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
| [#1756](https://github.com/openclaw/clawhub/issues/1756) | Search results shift after initial render — high-relevance skills missing from top until scroll cycle | high | candidate | Apr 29, 2026, 03:21 UTC | [records/openclaw-clawhub/items/1756.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1756.md) |
| [#1364](https://github.com/openclaw/clawhub/issues/1364) | transfer request: handle argument not mapped to toUserHandle API field | high | candidate | Apr 29, 2026, 03:16 UTC | [records/openclaw-clawhub/items/1364.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1364.md) |
| [#1300](https://github.com/openclaw/clawhub/issues/1300) | Bug: transfer request, skill rename, and skill merge fail with double JSON serialization | high | candidate | Apr 29, 2026, 03:14 UTC | [records/openclaw-clawhub/items/1300.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1300.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 03:13 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#178](https://github.com/openclaw/clawhub/issues/178) | [Bug] clawhub update: fingerprint match always fails (false 'local changes' warning) | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/178.md) |
| [#117](https://github.com/openclaw/clawhub/issues/117) | Cannot delete own skills | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/117.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/117.md) |
| [#169](https://github.com/openclaw/clawhub/issues/169) | clawhub update always reports 'local changes (no match)' even on freshly installed skills | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/169.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/169.md) |
| [#48](https://github.com/openclaw/clawhub/issues/48) | publish: 'SKILL.md required' error despite file existing | high | candidate | Apr 29, 2026, 03:12 UTC | [records/openclaw-clawhub/items/48.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/48.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 02:47 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 02:46 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1649](https://github.com/openclaw/clawhub/issues/1649) | Add skill: recomby-ai/promptly-prompt | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1649.md) | failed | Apr 29, 2026, 04:20 UTC |
| [#1771](https://github.com/openclaw/clawhub/issues/1771) | Suspicous flag wrongly placed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1771.md) | failed | Apr 29, 2026, 04:19 UTC |
| [#1879](https://github.com/openclaw/clawhub/pull/1879) | fix(slug): enforce length, pattern, and reserved-word rules on skill & soul slugs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1879.md) | complete | Apr 29, 2026, 04:16 UTC |
| [#1813](https://github.com/openclaw/clawhub/issues/1813) | Skill being flagged as suspicious. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1813.md) | complete | Apr 29, 2026, 04:12 UTC |
| [#1743](https://github.com/openclaw/clawhub/issues/1743) | Can not search skill from Clawhub | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1743.md) | complete | Apr 29, 2026, 04:12 UTC |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1871.md) | complete | Apr 29, 2026, 04:12 UTC |
| [#1718](https://github.com/openclaw/clawhub/issues/1718) | False positive: rocky-know-how skill flagged as suspicious — benign experience/knowledge management skill | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1718.md) | complete | Apr 29, 2026, 04:12 UTC |
| [#1563](https://github.com/openclaw/clawhub/issues/1563) | Skill flagged suspicious, scan tagged benign | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1563.md) | complete | Apr 29, 2026, 04:12 UTC |
| [#1685](https://github.com/openclaw/clawhub/issues/1685) | Skill flagged — suspicious patterns detected deepdive OSINT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1685.md) | complete | Apr 29, 2026, 04:12 UTC |
| [#1823](https://github.com/openclaw/clawhub/issues/1823) | False positive: wangbatochn/gstack-dev v1.0.1 safety docs flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1823.md) | complete | Apr 29, 2026, 04:12 UTC |

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
