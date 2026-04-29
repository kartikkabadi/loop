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
  Pull request comments include hidden verdict markers, and actionable PR
  follow-up includes a hidden `clawsweeper-action:fix-required` marker for the
  trusted Clownfish repair loop. See
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

Last dashboard update: Apr 29, 2026, 05:27 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4408 |
| Open PRs | 3476 |
| Open items total | 7884 |
| Reviewed files | 7503 |
| Unreviewed open items | 381 |
| Due now by cadence | 2068 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 467 |
| Closed by Codex apply | 10679 |
| Failed or stale reviews | 13 |
| Archived closed files | 14032 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6966 | 6591 | 375 | 2005 | 0 | 431 | 10672 | Apr 29, 2026, 05:26 UTC | Apr 29, 2026, 05:18 UTC | 725 |
| [ClawHub](https://github.com/openclaw/clawhub) | 918 | 912 | 6 | 63 | 0 | 36 | 7 | Apr 29, 2026, 05:26 UTC | Apr 29, 2026, 05:13 UTC | 384 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Planning review | Apr 29, 2026, 05:21 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25092306925) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 05:27 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25092306925) |

### Fleet Activity

Latest review: Apr 29, 2026, 05:26 UTC. Latest close: Apr 29, 2026, 05:18 UTC. Latest comment sync: Apr 29, 2026, 05:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 42 | 1 | 41 | 0 | 20 | 42 | 6 |
| Last hour | 581 | 9 | 572 | 1 | 39 | 1109 | 6 |
| Last 24 hours | 7194 | 443 | 6751 | 9 | 769 | 2589 | 35 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74016](https://github.com/openclaw/openclaw/pull/74016) | fix: reject unknown plugin ids in plugins enable/disable | duplicate or superseded | Apr 29, 2026, 05:18 UTC | [records/openclaw-openclaw/closed/74016.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74016.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73936](https://github.com/openclaw/openclaw/pull/73936) | fix(whatsapp): detect group @mentions when self is in allowFrom | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/73936.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73936.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72202](https://github.com/openclaw/openclaw/issues/72202) | [Windows] gpt-image-2 falls back to Codex route despite no Codex OAuth configured (HTTP 400) | already implemented on main | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/72202.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72202.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72157](https://github.com/openclaw/openclaw/issues/72157) | [Bug] Webchat: Enter key sends duplicate messages when pressed rapidly | already implemented on main | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/72157.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72157.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71882](https://github.com/openclaw/openclaw/pull/71882) | fix(status): support lancedb memory runtime probes | already implemented on main | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/71882.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71882.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71257](https://github.com/openclaw/openclaw/pull/71257) | fix(session-memory): sanitize model artifacts before reuse | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/71257.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71257.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71158](https://github.com/openclaw/openclaw/pull/71158) | fix(qqbot): require auth for bot-clear-storage | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/71158.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71158.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70824](https://github.com/openclaw/openclaw/pull/70824) | fix: merge mode no longer drops image attachments when one provider lacks apiKey | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/70824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70824.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70783](https://github.com/openclaw/openclaw/issues/70783) | [Feature]: Add tab system for managing multiple chat sessions | duplicate or superseded | Apr 29, 2026, 05:16 UTC | [records/openclaw-openclaw/closed/70783.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70783.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70599](https://github.com/openclaw/openclaw/pull/70599) | fix: preserve cron silent NO_REPLY tool completions | already implemented on main | Apr 29, 2026, 05:16 UTC | [records/openclaw-openclaw/closed/70599.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70599.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74093](https://github.com/openclaw/openclaw/issues/74093) | Bug: /new reset can be queued behind active run when queue mode is steer | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/74093.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74093.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74085](https://github.com/openclaw/openclaw/issues/74085) | Bug: openclaw status --usage --json hangs/fails from non-TTY subprocess in 2026.4.26 | high | candidate | Apr 29, 2026, 05:04 UTC | [records/openclaw-openclaw/items/74085.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74085.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74079](https://github.com/openclaw/openclaw/issues/74079) | [Bug] Billing-error classifier misses snake_case top-level `{\"error\":\"insufficient_balance\",…}` payloads — raw JSON leaks to user-facing chat | high | candidate | Apr 29, 2026, 04:52 UTC | [records/openclaw-openclaw/items/74079.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74079.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45326](https://github.com/openclaw/openclaw/issues/45326) | [Bug]: TUI: Input typed during model generation is swallowed and incorrectly queued for the next turn (Interrupt failure) | high | candidate | Apr 29, 2026, 04:49 UTC | [records/openclaw-openclaw/items/45326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45326.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45494](https://github.com/openclaw/openclaw/issues/45494) | [Bug]: Cron agent jobs silently time out during sustained LLM API outages instead of fast-failing on definitive errors | high | candidate | Apr 29, 2026, 04:48 UTC | [records/openclaw-openclaw/items/45494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45494.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44134](https://github.com/openclaw/openclaw/issues/44134) | [Google Antigravity Ban] Frequent Tool Schema Reloading Causes False Positive Anti-Abuse Detection | high | candidate | Apr 29, 2026, 04:47 UTC | [records/openclaw-openclaw/items/44134.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44134.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74019](https://github.com/openclaw/openclaw/issues/74019) | [Bug]: Lobster workflow calling llm-task fails with “No callable tools remain” when tools.alsoAllow includes lobster/llm-task | high | candidate | Apr 29, 2026, 04:46 UTC | [records/openclaw-openclaw/items/74019.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74019.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | high | candidate | Apr 29, 2026, 04:46 UTC | [records/openclaw-openclaw/items/45573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45573.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44428](https://github.com/openclaw/openclaw/issues/44428) | [Bug]: Isolated cron with delivery.bestEffort:true blocks for full timeout when fire-and-forget subagents are active | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44428.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44428.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44584](https://github.com/openclaw/openclaw/issues/44584) | [Bug]: Discord threads - volatile metadata re-injection + CLI routing to wrong session | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44584.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44584.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44353](https://github.com/openclaw/openclaw/issues/44353) | Fallback models not triggered on provider-level errors (e.g., AWS Bedrock model ID changes) | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44353.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44353.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44375](https://github.com/openclaw/openclaw/issues/44375) | Adding ACP agent to agents.list silently hijacks all routing from implicit main agent | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44375.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44375.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44148](https://github.com/openclaw/openclaw/issues/44148) | [Bug]:WhatsApp: Pause bot when human operator replies manually (outgoing message detection | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44148.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44148.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44502](https://github.com/openclaw/openclaw/issues/44502) | [Bug]: Discord routing / mention-gating issue in OpenClaw | high | candidate | Apr 29, 2026, 04:44 UTC | [records/openclaw-openclaw/items/44502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44502.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1068](https://github.com/openclaw/clawhub/issues/1068) | False positive: memory-vault skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1068.md) | complete | Apr 29, 2026, 05:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73554](https://github.com/openclaw/openclaw/pull/73554) | fix(cli): reject missing plugin ids before config writes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73554.md) | complete | Apr 29, 2026, 05:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73893](https://github.com/openclaw/openclaw/pull/73893) | fix(gateway): honor configured image capability for provider models | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73893.md) | complete | Apr 29, 2026, 05:25 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1881.md) | complete | Apr 29, 2026, 05:25 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 29, 2026, 05:25 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 29, 2026, 05:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74068](https://github.com/openclaw/openclaw/pull/74068) | fix(gateway): reject invalid cron patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74068.md) | complete | Apr 29, 2026, 05:25 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1522](https://github.com/openclaw/clawhub/issues/1522) | Skill flagged — suspicious patterns detected ClawHub Security flagged this skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1522.md) | complete | Apr 29, 2026, 05:24 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 29, 2026, 05:24 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70500](https://github.com/openclaw/openclaw/pull/70500) | docs: warn about node Accessibility grants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70500.md) | complete | Apr 29, 2026, 05:24 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 05:21 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25092306925](https://github.com/openclaw/clawsweeper/actions/runs/25092306925)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3530 |
| Open PRs | 3436 |
| Open items total | 6966 |
| Reviewed files | 6591 |
| Unreviewed open items | 375 |
| Archived closed files | 14012 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3347 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3236 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6583 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 431 |
| Closed by Codex apply | 10672 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 84/988 current (904 due, 8.5%) |
| Hourly hot item cadence (<7d) | 84/988 current (904 due, 8.5%) |
| Daily cadence coverage | 3071/3795 current (724 due, 80.9%) |
| Daily PR cadence | 2274/2655 current (381 due, 85.6%) |
| Daily new issue cadence (<30d) | 797/1140 current (343 due, 69.9%) |
| Weekly older issue cadence | 1806/1808 current (2 due, 99.9%) |
| Due now by cadence | 2005 |

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

Latest review: Apr 29, 2026, 05:26 UTC. Latest close: Apr 29, 2026, 05:18 UTC. Latest comment sync: Apr 29, 2026, 05:26 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 1 | 19 | 0 | 19 | 20 | 6 |
| Last hour | 559 | 9 | 550 | 1 | 38 | 725 | 6 |
| Last 24 hours | 6268 | 443 | 5825 | 4 | 753 | 1665 | 35 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74016](https://github.com/openclaw/openclaw/pull/74016) | fix: reject unknown plugin ids in plugins enable/disable | duplicate or superseded | Apr 29, 2026, 05:18 UTC | [records/openclaw-openclaw/closed/74016.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74016.md) |
| [#73936](https://github.com/openclaw/openclaw/pull/73936) | fix(whatsapp): detect group @mentions when self is in allowFrom | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/73936.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73936.md) |
| [#72202](https://github.com/openclaw/openclaw/issues/72202) | [Windows] gpt-image-2 falls back to Codex route despite no Codex OAuth configured (HTTP 400) | already implemented on main | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/72202.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72202.md) |
| [#72157](https://github.com/openclaw/openclaw/issues/72157) | [Bug] Webchat: Enter key sends duplicate messages when pressed rapidly | already implemented on main | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/72157.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/72157.md) |
| [#71882](https://github.com/openclaw/openclaw/pull/71882) | fix(status): support lancedb memory runtime probes | already implemented on main | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/71882.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71882.md) |
| [#71257](https://github.com/openclaw/openclaw/pull/71257) | fix(session-memory): sanitize model artifacts before reuse | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/71257.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71257.md) |
| [#71158](https://github.com/openclaw/openclaw/pull/71158) | fix(qqbot): require auth for bot-clear-storage | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/71158.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71158.md) |
| [#70824](https://github.com/openclaw/openclaw/pull/70824) | fix: merge mode no longer drops image attachments when one provider lacks apiKey | duplicate or superseded | Apr 29, 2026, 05:17 UTC | [records/openclaw-openclaw/closed/70824.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70824.md) |
| [#70783](https://github.com/openclaw/openclaw/issues/70783) | [Feature]: Add tab system for managing multiple chat sessions | duplicate or superseded | Apr 29, 2026, 05:16 UTC | [records/openclaw-openclaw/closed/70783.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70783.md) |
| [#70599](https://github.com/openclaw/openclaw/pull/70599) | fix: preserve cron silent NO_REPLY tool completions | already implemented on main | Apr 29, 2026, 05:16 UTC | [records/openclaw-openclaw/closed/70599.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/70599.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74093](https://github.com/openclaw/openclaw/issues/74093) | Bug: /new reset can be queued behind active run when queue mode is steer | high | candidate | Apr 29, 2026, 05:22 UTC | [records/openclaw-openclaw/items/74093.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74093.md) |
| [#74085](https://github.com/openclaw/openclaw/issues/74085) | Bug: openclaw status --usage --json hangs/fails from non-TTY subprocess in 2026.4.26 | high | candidate | Apr 29, 2026, 05:04 UTC | [records/openclaw-openclaw/items/74085.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74085.md) |
| [#74079](https://github.com/openclaw/openclaw/issues/74079) | [Bug] Billing-error classifier misses snake_case top-level `{\"error\":\"insufficient_balance\",…}` payloads — raw JSON leaks to user-facing chat | high | candidate | Apr 29, 2026, 04:52 UTC | [records/openclaw-openclaw/items/74079.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74079.md) |
| [#45326](https://github.com/openclaw/openclaw/issues/45326) | [Bug]: TUI: Input typed during model generation is swallowed and incorrectly queued for the next turn (Interrupt failure) | high | candidate | Apr 29, 2026, 04:49 UTC | [records/openclaw-openclaw/items/45326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45326.md) |
| [#45494](https://github.com/openclaw/openclaw/issues/45494) | [Bug]: Cron agent jobs silently time out during sustained LLM API outages instead of fast-failing on definitive errors | high | candidate | Apr 29, 2026, 04:48 UTC | [records/openclaw-openclaw/items/45494.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45494.md) |
| [#44134](https://github.com/openclaw/openclaw/issues/44134) | [Google Antigravity Ban] Frequent Tool Schema Reloading Causes False Positive Anti-Abuse Detection | high | candidate | Apr 29, 2026, 04:47 UTC | [records/openclaw-openclaw/items/44134.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44134.md) |
| [#74019](https://github.com/openclaw/openclaw/issues/74019) | [Bug]: Lobster workflow calling llm-task fails with “No callable tools remain” when tools.alsoAllow includes lobster/llm-task | high | candidate | Apr 29, 2026, 04:46 UTC | [records/openclaw-openclaw/items/74019.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74019.md) |
| [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | high | candidate | Apr 29, 2026, 04:46 UTC | [records/openclaw-openclaw/items/45573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45573.md) |
| [#44428](https://github.com/openclaw/openclaw/issues/44428) | [Bug]: Isolated cron with delivery.bestEffort:true blocks for full timeout when fire-and-forget subagents are active | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44428.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44428.md) |
| [#44584](https://github.com/openclaw/openclaw/issues/44584) | [Bug]: Discord threads - volatile metadata re-injection + CLI routing to wrong session | high | candidate | Apr 29, 2026, 04:45 UTC | [records/openclaw-openclaw/items/44584.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44584.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#73554](https://github.com/openclaw/openclaw/pull/73554) | fix(cli): reject missing plugin ids before config writes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73554.md) | complete | Apr 29, 2026, 05:26 UTC |
| [#73893](https://github.com/openclaw/openclaw/pull/73893) | fix(gateway): honor configured image capability for provider models | [close / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73893.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#74068](https://github.com/openclaw/openclaw/pull/74068) | fix(gateway): reject invalid cron patterns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74068.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#70500](https://github.com/openclaw/openclaw/pull/70500) | docs: warn about node Accessibility grants | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70500.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#74097](https://github.com/openclaw/openclaw/pull/74097) | perf(agents/tools): lazily list capability providers in tool model-config resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74097.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#74096](https://github.com/openclaw/openclaw/issues/74096) | image/video/music generate tools eagerly list capability providers, causing ~15-18s reload per turn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74096.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#74095](https://github.com/openclaw/openclaw/issues/74095) | feat(tasks): normalize blocker and failure taxonomy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74095.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#74094](https://github.com/openclaw/openclaw/issues/74094) | feat(tasks): add compressed operational summaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74094.md) | complete | Apr 29, 2026, 05:23 UTC |
| [#73008](https://github.com/openclaw/openclaw/pull/73008) | fix(deepseek): expose V4 max thinking levels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73008.md) | complete | Apr 29, 2026, 05:23 UTC |
| [#74093](https://github.com/openclaw/openclaw/issues/74093) | Bug: /new reset can be queued behind active run when queue mode is steer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74093.md) | complete | Apr 29, 2026, 05:22 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 05:27 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1054,1068,1128,1156,1227,1515,1518,1522,1524,1534,1578,1580,1585,1594,1653,1657,1678,1681,1770,1831.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25092306925](https://github.com/openclaw/clawsweeper/actions/runs/25092306925)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 878 |
| Open PRs | 40 |
| Open items total | 918 |
| Reviewed files | 912 |
| Unreviewed open items | 6 |
| Archived closed files | 20 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 873 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 907 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 36 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 5 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 2/54 current (52 due, 3.7%) |
| Hourly hot item cadence (<7d) | 2/54 current (52 due, 3.7%) |
| Daily cadence coverage | 221/221 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 200/200 current (0 due, 100%) |
| Weekly older issue cadence | 632/637 current (5 due, 99.2%) |
| Due now by cadence | 63 |

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

Latest review: Apr 29, 2026, 05:26 UTC. Latest close: Apr 29, 2026, 05:13 UTC. Latest comment sync: Apr 29, 2026, 05:27 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 22 | 0 | 22 | 0 | 1 | 22 | 0 |
| Last hour | 22 | 0 | 22 | 0 | 1 | 384 | 0 |
| Last 24 hours | 926 | 0 | 926 | 5 | 16 | 924 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |
| [#993](https://github.com/openclaw/clawhub/issues/993) | False positive flag on `Scrapling Official Skill` | closed externally after review | Apr 28, 2026, 18:47 UTC | [records/openclaw-clawhub/closed/993.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/993.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 04:07 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 04:06 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 04:05 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 04:04 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1068](https://github.com/openclaw/clawhub/issues/1068) | False positive: memory-vault skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1068.md) | complete | Apr 29, 2026, 05:26 UTC |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1881.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#1770](https://github.com/openclaw/clawhub/issues/1770) | [Request] Purge soft-deleted slug \"creator-scraper-cv\" to allow rename | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1770.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#1678](https://github.com/openclaw/clawhub/issues/1678) | clawhub package publish — two issues with org namespaces and monorepo subdirectories | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1678.md) | complete | Apr 29, 2026, 05:25 UTC |
| [#1522](https://github.com/openclaw/clawhub/issues/1522) | Skill flagged — suspicious patterns detected ClawHub Security flagged this skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1522.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1227](https://github.com/openclaw/clawhub/issues/1227) | False positive: central-intelligence skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1227.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1657](https://github.com/openclaw/clawhub/pull/1657) | feat: detect phantom dependencies in skill bundle files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1657.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1128](https://github.com/openclaw/clawhub/issues/1128) | False positive: Manifest LLM Router flagged for documented, opt-in plugin behavior | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1128.md) | complete | Apr 29, 2026, 05:24 UTC |
| [#1054](https://github.com/openclaw/clawhub/issues/1054) | Login succeeds but user session not created after account deletion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1054.md) | complete | Apr 29, 2026, 05:24 UTC |

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
- PR review comments use hidden verdict/action markers for the trusted
  Clownfish repair loop; see
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
