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

Last dashboard update: Apr 29, 2026, 07:37 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 2 |
| Open issues | 4412 |
| Open PRs | 3491 |
| Open items total | 7903 |
| Reviewed files | 7531 |
| Unreviewed open items | 372 |
| Due now by cadence | 2263 |
| Proposed closes awaiting apply | 0 |
| Work candidates awaiting promotion | 522 |
| Closed by Codex apply | 10725 |
| Failed or stale reviews | 26 |
| Archived closed files | 14106 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6979 | 6613 | 366 | 2191 | 0 | 485 | 10718 | Apr 29, 2026, 07:35 UTC | Apr 29, 2026, 07:37 UTC | 447 |
| [ClawHub](https://github.com/openclaw/clawhub) | 924 | 918 | 6 | 72 | 0 | 37 | 7 | Apr 29, 2026, 07:33 UTC | Apr 29, 2026, 05:31 UTC | 174 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Apply finished | Apr 29, 2026, 07:37 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25096601960) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 07:14 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25095598945) |

### Fleet Activity

Latest review: Apr 29, 2026, 07:35 UTC. Latest close: Apr 29, 2026, 07:37 UTC. Latest comment sync: Apr 29, 2026, 07:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 22 | 3 | 19 | 0 | 4 | 21 | 1 |
| Last hour | 520 | 12 | 508 | 4 | 36 | 621 | 2 |
| Last 24 hours | 6957 | 443 | 6514 | 22 | 760 | 2676 | 29 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74181](https://github.com/openclaw/openclaw/issues/74181) | [Bug]: Session compaction deadlock blocks child subagent SessionManager.open() | cannot reproduce on current main | Apr 29, 2026, 07:37 UTC | [records/openclaw-openclaw/closed/74181.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74181.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#68365](https://github.com/openclaw/openclaw/pull/68365) | docs: fix broken links and display text consistency (fixes #50828) | closed externally after review | Apr 29, 2026, 07:34 UTC | [records/openclaw-openclaw/closed/68365.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68365.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74133](https://github.com/openclaw/openclaw/pull/74133) | fix: Found one low-severity cancellation regression in the Ollama time | closed externally after review | Apr 29, 2026, 07:34 UTC | [records/openclaw-openclaw/closed/74133.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74133.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74180](https://github.com/openclaw/openclaw/pull/74180) | fix(ci): gate extension aggregate on shard matrix | already implemented on main | Apr 29, 2026, 07:24 UTC | [records/openclaw-openclaw/closed/74180.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74180.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74172](https://github.com/openclaw/openclaw/pull/74172) | fix: add sharp back to dependencies for image attachment processing | closed externally after skipped_invalid_decision | Apr 29, 2026, 07:22 UTC | [records/openclaw-openclaw/closed/74172.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74172.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74178](https://github.com/openclaw/openclaw/issues/74178) | [Bug]: Gateway startup pricing fetch fails despite network being available — OpenRouter TypeError + LiteLLM 60s timeout on Windows 11 | duplicate or superseded | Apr 29, 2026, 07:21 UTC | [records/openclaw-openclaw/closed/74178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74178.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74177](https://github.com/openclaw/openclaw/pull/74177) | chore(ci): add memory CodeQL quality shard | kept open | Apr 29, 2026, 07:18 UTC | [records/openclaw-openclaw/closed/74177.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74177.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74167](https://github.com/openclaw/openclaw/pull/74167) | ci: react to maintainer PR commands | closed externally after review | Apr 29, 2026, 07:15 UTC | [records/openclaw-openclaw/closed/74167.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74167.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73575](https://github.com/openclaw/openclaw/pull/73575) | fix: resolve slash-form model aliases before provider parsing | closed externally after review | Apr 29, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73575.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74033](https://github.com/openclaw/openclaw/pull/74033) | fix: skip external CLI credential reads when no profile exists | duplicate or superseded | Apr 29, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/74033.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74033.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 06:49 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44734](https://github.com/openclaw/openclaw/issues/44734) | [Bug]: Memory Multimodal Indexing - Gemini API rejects OGG/Opus audio files | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/44734.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44734.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45326](https://github.com/openclaw/openclaw/issues/45326) | [Bug]: TUI: Input typed during model generation is swallowed and incorrectly queued for the next turn (Interrupt failure) | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/45326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45326.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44148](https://github.com/openclaw/openclaw/issues/44148) | [Bug]:WhatsApp: Pause bot when human operator replies manually (outgoing message detection | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44148.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44148.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44179](https://github.com/openclaw/openclaw/issues/44179) | GLM-5 token leak: stripModelSpecialTokens not applied to main output path | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44179.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/45573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45573.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44502](https://github.com/openclaw/openclaw/issues/44502) | [Bug]: Discord routing / mention-gating issue in OpenClaw | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44502.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44584](https://github.com/openclaw/openclaw/issues/44584) | [Bug]: Discord threads - volatile metadata re-injection + CLI routing to wrong session | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44584.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44584.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44428](https://github.com/openclaw/openclaw/issues/44428) | [Bug]: Isolated cron with delivery.bestEffort:true blocks for full timeout when fire-and-forget subagents are active | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44428.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44428.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#39223](https://github.com/openclaw/openclaw/issues/39223) | [Bug]: Configure wizard hangs at Gateway selection - blocks OAuth auth flow | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/39223.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39223.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#38570](https://github.com/openclaw/openclaw/issues/38570) | Inter-agent sessions_send: sender attributed as wrong agent (missing identity name) | high | candidate | Apr 29, 2026, 06:42 UTC | [records/openclaw-openclaw/items/38570.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/38570.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#44448](https://github.com/openclaw/openclaw/issues/44448) | [Bug] v2026.3.11: CLI 'openclaw agent --channel discord --to' routes to agent:*:main instead of live channel session | high | candidate | Apr 29, 2026, 06:41 UTC | [records/openclaw-openclaw/items/44448.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44448.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72276.md) | complete | Apr 29, 2026, 07:35 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74189](https://github.com/openclaw/openclaw/pull/74189) | Agents: add inferred commitments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74189.md) | complete | Apr 29, 2026, 07:34 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1889.md) | complete | Apr 29, 2026, 07:33 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74187](https://github.com/openclaw/openclaw/pull/74187) | fix(feishu): keep quick actions and status responsive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74187.md) | complete | Apr 29, 2026, 07:33 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74188](https://github.com/openclaw/openclaw/pull/74188) | fix(agents): recognize flat JSON billing payloads and snake_case error codes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74188.md) | complete | Apr 29, 2026, 07:33 UTC |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1890](https://github.com/openclaw/clawhub/issues/1890) | False positive: solidclaw flagged as suspicious — env var + network is standard SOLID OIDC auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1890.md) | complete | Apr 29, 2026, 07:31 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73767](https://github.com/openclaw/openclaw/pull/73767) | [codex] Finalize RuntimePlan embedded-runner cleanup stack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73767.md) | complete | Apr 29, 2026, 07:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 29, 2026, 07:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72782](https://github.com/openclaw/openclaw/pull/72782) | fix(security): replace console.warn with structured logger in windows… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72782.md) | complete | Apr 29, 2026, 07:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70888](https://github.com/openclaw/openclaw/pull/70888) | fix: restore explicit requester depth lookup without cfg | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70888.md) | complete | Apr 29, 2026, 07:27 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 07:37 UTC

State: Apply finished

Apply/comment-sync run finished with 1 fresh closes out of requested limit 1. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25096601960](https://github.com/openclaw/clawsweeper/actions/runs/25096601960)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3528 |
| Open PRs | 3451 |
| Open items total | 6979 |
| Reviewed files | 6613 |
| Unreviewed open items | 366 |
| Archived closed files | 14085 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3345 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3254 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6599 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 485 |
| Closed by Codex apply | 10718 |
| Failed or stale reviews | 14 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 94/1024 current (930 due, 9.2%) |
| Hourly hot item cadence (<7d) | 94/1024 current (930 due, 9.2%) |
| Daily cadence coverage | 2895/3787 current (892 due, 76.4%) |
| Daily PR cadence | 2173/2647 current (474 due, 82.1%) |
| Daily new issue cadence (<30d) | 722/1140 current (418 due, 63.3%) |
| Weekly older issue cadence | 1799/1802 current (3 due, 99.8%) |
| Due now by cadence | 2191 |

### Audit Health

<!-- clawsweeper-audit:openclaw-openclaw:start -->
Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Last audit: Apr 29, 2026, 07:05 UTC

Status: **Action needed**

Targeted review input: `65635,72522,72527,72529,72531,72532,72535,72536,72537,72539`

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 6973 |
| Missing eligible open records | 264 |
| Missing maintainer-authored open records | 63 |
| Missing protected open records | 1 |
| Missing recently-created open records | 43 |
| Archived records that are open again | 0 |
| Stale item records | 0 |
| Duplicate records | 0 |
| Protected proposed closes | 0 |
| Stale reviews | 7 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#65635](https://github.com/openclaw/openclaw/pull/65635) | Missing eligible open | fix(gateway): keep explicit loopback binds on 127.0.0.1 | eligible |
| [#72522](https://github.com/openclaw/openclaw/pull/72522) | Missing eligible open | fix(control-ui): keep chat UI mounted across transient reconnects | eligible |
| [#72527](https://github.com/openclaw/openclaw/issues/72527) | Missing eligible open | [Bug]: Downgrading from 2026.4.x to 2026.3.2 leaves openclaw.json in invalid/broken state with no warning | eligible |
<!-- clawsweeper-audit:openclaw-openclaw:end -->

#### Latest Run Activity

Latest review: Apr 29, 2026, 07:35 UTC. Latest close: Apr 29, 2026, 07:37 UTC. Latest comment sync: Apr 29, 2026, 07:36 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 3 | 17 | 0 | 4 | 19 | 1 |
| Last hour | 497 | 12 | 485 | 4 | 36 | 447 | 2 |
| Last 24 hours | 6028 | 443 | 5585 | 10 | 746 | 1850 | 29 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74181](https://github.com/openclaw/openclaw/issues/74181) | [Bug]: Session compaction deadlock blocks child subagent SessionManager.open() | cannot reproduce on current main | Apr 29, 2026, 07:37 UTC | [records/openclaw-openclaw/closed/74181.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74181.md) |
| [#68365](https://github.com/openclaw/openclaw/pull/68365) | docs: fix broken links and display text consistency (fixes #50828) | closed externally after review | Apr 29, 2026, 07:34 UTC | [records/openclaw-openclaw/closed/68365.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/68365.md) |
| [#74133](https://github.com/openclaw/openclaw/pull/74133) | fix: Found one low-severity cancellation regression in the Ollama time | closed externally after review | Apr 29, 2026, 07:34 UTC | [records/openclaw-openclaw/closed/74133.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74133.md) |
| [#74180](https://github.com/openclaw/openclaw/pull/74180) | fix(ci): gate extension aggregate on shard matrix | already implemented on main | Apr 29, 2026, 07:24 UTC | [records/openclaw-openclaw/closed/74180.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74180.md) |
| [#74172](https://github.com/openclaw/openclaw/pull/74172) | fix: add sharp back to dependencies for image attachment processing | closed externally after skipped_invalid_decision | Apr 29, 2026, 07:22 UTC | [records/openclaw-openclaw/closed/74172.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74172.md) |
| [#74178](https://github.com/openclaw/openclaw/issues/74178) | [Bug]: Gateway startup pricing fetch fails despite network being available — OpenRouter TypeError + LiteLLM 60s timeout on Windows 11 | duplicate or superseded | Apr 29, 2026, 07:21 UTC | [records/openclaw-openclaw/closed/74178.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74178.md) |
| [#74177](https://github.com/openclaw/openclaw/pull/74177) | chore(ci): add memory CodeQL quality shard | kept open | Apr 29, 2026, 07:18 UTC | [records/openclaw-openclaw/closed/74177.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74177.md) |
| [#74167](https://github.com/openclaw/openclaw/pull/74167) | ci: react to maintainer PR commands | closed externally after review | Apr 29, 2026, 07:15 UTC | [records/openclaw-openclaw/closed/74167.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74167.md) |
| [#73575](https://github.com/openclaw/openclaw/pull/73575) | fix: resolve slash-form model aliases before provider parsing | closed externally after review | Apr 29, 2026, 07:06 UTC | [records/openclaw-openclaw/closed/73575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73575.md) |
| [#74033](https://github.com/openclaw/openclaw/pull/74033) | fix: skip external CLI credential reads when no profile exists | duplicate or superseded | Apr 29, 2026, 07:05 UTC | [records/openclaw-openclaw/closed/74033.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74033.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#39032](https://github.com/openclaw/openclaw/issues/39032) | Subagent completion output leaks internal tool-failure reasoning to requester session | high | candidate | Apr 29, 2026, 06:49 UTC | [records/openclaw-openclaw/items/39032.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/39032.md) |
| [#32868](https://github.com/openclaw/openclaw/issues/32868) | Block streaming: block replies not delivered before tool execution (same-channel) | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/32868.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/32868.md) |
| [#44734](https://github.com/openclaw/openclaw/issues/44734) | [Bug]: Memory Multimodal Indexing - Gemini API rejects OGG/Opus audio files | high | candidate | Apr 29, 2026, 06:47 UTC | [records/openclaw-openclaw/items/44734.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44734.md) |
| [#44354](https://github.com/openclaw/openclaw/issues/44354) | Bug: openclaw health --json reports stale Discord state | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/44354.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44354.md) |
| [#74159](https://github.com/openclaw/openclaw/issues/74159) | github-copilot: Gemini models route to unsupported /responses endpoint, and openai-completions transport bypasses Copilot IDE auth headers | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/74159.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74159.md) |
| [#45326](https://github.com/openclaw/openclaw/issues/45326) | [Bug]: TUI: Input typed during model generation is swallowed and incorrectly queued for the next turn (Interrupt failure) | high | candidate | Apr 29, 2026, 06:45 UTC | [records/openclaw-openclaw/items/45326.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45326.md) |
| [#44148](https://github.com/openclaw/openclaw/issues/44148) | [Bug]:WhatsApp: Pause bot when human operator replies manually (outgoing message detection | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44148.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44148.md) |
| [#44179](https://github.com/openclaw/openclaw/issues/44179) | GLM-5 token leak: stripModelSpecialTokens not applied to main output path | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/44179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44179.md) |
| [#45573](https://github.com/openclaw/openclaw/issues/45573) | Group chat sessions not persisted — only 1 session from 166+ messages | high | candidate | Apr 29, 2026, 06:44 UTC | [records/openclaw-openclaw/items/45573.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/45573.md) |
| [#44502](https://github.com/openclaw/openclaw/issues/44502) | [Bug]: Discord routing / mention-gating issue in OpenClaw | high | candidate | Apr 29, 2026, 06:43 UTC | [records/openclaw-openclaw/items/44502.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/44502.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72276](https://github.com/openclaw/openclaw/pull/72276) | [codex] Consolidate embedded runner structural splits | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72276.md) | complete | Apr 29, 2026, 07:35 UTC |
| [#74189](https://github.com/openclaw/openclaw/pull/74189) | Agents: add inferred commitments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74189.md) | complete | Apr 29, 2026, 07:34 UTC |
| [#74187](https://github.com/openclaw/openclaw/pull/74187) | fix(feishu): keep quick actions and status responsive | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74187.md) | complete | Apr 29, 2026, 07:33 UTC |
| [#74188](https://github.com/openclaw/openclaw/pull/74188) | fix(agents): recognize flat JSON billing payloads and snake_case error codes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74188.md) | complete | Apr 29, 2026, 07:33 UTC |
| [#73767](https://github.com/openclaw/openclaw/pull/73767) | [codex] Finalize RuntimePlan embedded-runner cleanup stack | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73767.md) | complete | Apr 29, 2026, 07:29 UTC |
| [#73384](https://github.com/openclaw/openclaw/pull/73384) | [plugin sdk] Consolidate workflow seams, fixtures, and host-hook recipes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73384.md) | complete | Apr 29, 2026, 07:28 UTC |
| [#72782](https://github.com/openclaw/openclaw/pull/72782) | fix(security): replace console.warn with structured logger in windows… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72782.md) | complete | Apr 29, 2026, 07:28 UTC |
| [#70888](https://github.com/openclaw/openclaw/pull/70888) | fix: restore explicit requester depth lookup without cfg | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70888.md) | complete | Apr 29, 2026, 07:27 UTC |
| [#70936](https://github.com/openclaw/openclaw/pull/70936) | fix(pdf): resolve standard fonts from pdfjs package root | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70936.md) | complete | Apr 29, 2026, 07:27 UTC |
| [#70497](https://github.com/openclaw/openclaw/pull/70497) | fix(agents): strip Gemini conditional schema keywords | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70497.md) | complete | Apr 29, 2026, 07:26 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 07:14 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 20. Item numbers: 1028,1090,1301,1515,1518,1519,1522,1524,1534,1539,1578,1580,1585,1594,1653,1657,1678,1681,1770,1831.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25095598945](https://github.com/openclaw/clawsweeper/actions/runs/25095598945)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 884 |
| Open PRs | 40 |
| Open items total | 924 |
| Reviewed files | 918 |
| Unreviewed open items | 6 |
| Archived closed files | 21 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 872 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 34 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 906 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 37 |
| Closed by Codex apply | 7 |
| Failed or stale reviews | 12 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 4/58 current (54 due, 6.9%) |
| Hourly hot item cadence (<7d) | 4/58 current (54 due, 6.9%) |
| Daily cadence coverage | 218/218 current (0 due, 100%) |
| Daily PR cadence | 21/21 current (0 due, 100%) |
| Daily new issue cadence (<30d) | 197/197 current (0 due, 100%) |
| Weekly older issue cadence | 630/642 current (12 due, 98.1%) |
| Due now by cadence | 72 |

### Audit Health

<!-- clawsweeper-audit:openclaw-clawhub:start -->
Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Last audit: Apr 29, 2026, 07:05 UTC

Status: **Passing**

Targeted review input: _none_

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 922 |
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

Latest review: Apr 29, 2026, 07:33 UTC. Latest close: Apr 29, 2026, 05:31 UTC. Latest comment sync: Apr 29, 2026, 07:33 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 2 | 0 | 2 | 0 | 0 | 2 | 0 |
| Last hour | 23 | 0 | 23 | 0 | 0 | 174 | 0 |
| Last 24 hours | 929 | 0 | 929 | 12 | 14 | 826 | 0 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#1881](https://github.com/openclaw/clawhub/pull/1881) | chore(ci): update package publish artifact action | closed externally after review | Apr 29, 2026, 05:31 UTC | [records/openclaw-clawhub/closed/1881.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1881.md) |
| [#1880](https://github.com/openclaw/clawhub/pull/1880) | feat: add featured plugin curation | kept open | Apr 29, 2026, 05:13 UTC | [records/openclaw-clawhub/closed/1880.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1880.md) |
| [#1871](https://github.com/openclaw/clawhub/pull/1871) | [codex] Add skills/plugins search typeahead | closed externally after review | Apr 29, 2026, 04:24 UTC | [records/openclaw-clawhub/closed/1871.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1871.md) |
| [#1878](https://github.com/openclaw/clawhub/pull/1878) | feat: add ClawHub rescan guidance workflow | kept open | Apr 29, 2026, 03:02 UTC | [records/openclaw-clawhub/closed/1878.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1878.md) |
| [#1875](https://github.com/openclaw/clawhub/pull/1875) | fix: move stars link into settings | closed externally after review | Apr 29, 2026, 02:50 UTC | [records/openclaw-clawhub/closed/1875.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1875.md) |
| [#1874](https://github.com/openclaw/clawhub/pull/1874) | ci: check oxfmt on pull requests | closed externally after review | Apr 29, 2026, 01:22 UTC | [records/openclaw-clawhub/closed/1874.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1874.md) |
| [#1873](https://github.com/openclaw/clawhub/pull/1873) | fix: add skill upload button to header | kept open | Apr 29, 2026, 00:32 UTC | [records/openclaw-clawhub/closed/1873.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1873.md) |
| [#1861](https://github.com/openclaw/clawhub/pull/1861) | feat: add owner rescan security surfaces | closed externally after review | Apr 28, 2026, 23:32 UTC | [records/openclaw-clawhub/closed/1861.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1861.md) |
| [#1870](https://github.com/openclaw/clawhub/pull/1870) | fix: hide admin CLI help from non-admins | kept open | Apr 28, 2026, 23:24 UTC | [records/openclaw-clawhub/closed/1870.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1870.md) |
| [#1869](https://github.com/openclaw/clawhub/pull/1869) | [codex] Use GitHub App auth for publish gate lookups | closed externally after review | Apr 28, 2026, 22:18 UTC | [records/openclaw-clawhub/closed/1869.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/closed/1869.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#1171](https://github.com/openclaw/clawhub/issues/1171) | Import + publish fails with Convex paginated query error after successful GitHub detection | high | candidate | Apr 29, 2026, 06:28 UTC | [records/openclaw-clawhub/items/1171.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1171.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:27 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1184](https://github.com/openclaw/clawhub/issues/1184) | clawhub publish fails: multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 06:25 UTC | [records/openclaw-clawhub/items/1184.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1184.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 06:19 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1201](https://github.com/openclaw/clawhub/issues/1201) | CLI publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1201.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1201.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 06:18 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#1175](https://github.com/openclaw/clawhub/issues/1175) | Publish fails: Convex pagination error in ensurePersonalPublisherForUser | high | candidate | Apr 29, 2026, 06:17 UTC | [records/openclaw-clawhub/items/1175.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1175.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1199](https://github.com/openclaw/clawhub/issues/1199) | Cannot update personal settings, server error when clicking Save | high | candidate | Apr 29, 2026, 06:16 UTC | [records/openclaw-clawhub/items/1199.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1199.md) |
| [#960](https://github.com/openclaw/clawhub/issues/960) | Published skill not indexed in search (amazon-seller-research) | high | candidate | Apr 29, 2026, 06:15 UTC | [records/openclaw-clawhub/items/960.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/960.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1889](https://github.com/openclaw/clawhub/pull/1889) | fix: restore ClawHub public UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1889.md) | complete | Apr 29, 2026, 07:33 UTC |
| [#1890](https://github.com/openclaw/clawhub/issues/1890) | False positive: solidclaw flagged as suspicious — env var + network is standard SOLID OIDC auth | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1890.md) | complete | Apr 29, 2026, 07:31 UTC |
| [#1585](https://github.com/openclaw/clawhub/issues/1585) | Bc Calc flagged with 'suspicious patterns' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1585.md) | complete | Apr 29, 2026, 07:12 UTC |
| [#1028](https://github.com/openclaw/clawhub/issues/1028) | [False Positive Appeal] baidu-netdisk-skill Flagged as Suspicious - Request Review | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1028.md) | complete | Apr 29, 2026, 07:12 UTC |
| [#1518](https://github.com/openclaw/clawhub/issues/1518) | [Appeal] Skill Wrongly Flagged: anson125chen/data-sentinel-pro | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1518.md) | complete | Apr 29, 2026, 07:11 UTC |
| [#1519](https://github.com/openclaw/clawhub/issues/1519) | False: Skill flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1519.md) | complete | Apr 29, 2026, 07:11 UTC |
| [#1657](https://github.com/openclaw/clawhub/pull/1657) | feat: detect phantom dependencies in skill bundle files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1657.md) | complete | Apr 29, 2026, 07:11 UTC |
| [#1580](https://github.com/openclaw/clawhub/issues/1580) | This skill has been incorrectly flagged | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1580.md) | complete | Apr 29, 2026, 07:11 UTC |
| [#1653](https://github.com/openclaw/clawhub/issues/1653) | add skill: robert0812/maton-browse-plan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1653.md) | complete | Apr 29, 2026, 07:11 UTC |
| [#1831](https://github.com/openclaw/clawhub/issues/1831) | Application to Remove adb-assistant & testcase-template | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1831.md) | complete | Apr 29, 2026, 07:11 UTC |

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
