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

Last dashboard update: Apr 29, 2026, 19:43 UTC

### Fleet

| Metric | Count |
| --- | ---: |
| Covered repositories | 3 |
| Open issues | 4426 |
| Open PRs | 3449 |
| Open items total | 7875 |
| Reviewed files | 7537 |
| Unreviewed open items | 341 |
| Due now by cadence | 3173 |
| Proposed closes awaiting apply | 4 |
| Work candidates awaiting promotion | 955 |
| Closed by Codex apply | 10879 |
| Failed or stale reviews | 15 |
| Archived closed files | 14496 |

### Repositories

| Repository | Open | Reviewed | Unreviewed | Due | Proposed closes | Work candidates | Closed | Latest review | Latest close | Comments synced, 1h |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | --- | --- | ---: |
| [OpenClaw](https://github.com/openclaw/openclaw) | 6947 | 6611 | 336 | 3104 | 4 | 909 | 10866 | Apr 29, 2026, 19:29 UTC | Apr 29, 2026, 19:26 UTC | 837 |
| [ClawHub](https://github.com/openclaw/clawhub) | 928 | 923 | 5 | 66 | 0 | 45 | 8 | Apr 29, 2026, 19:18 UTC | Apr 29, 2026, 17:17 UTC | 710 |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | 0 | 3 | 0 | 3 | 0 | 1 | 0 | Apr 29, 2026, 14:08 UTC | unknown | 0 |

### Current Runs

| Repository | State | Updated | Run |
| --- | --- | --- | --- |
| [OpenClaw](https://github.com/openclaw/openclaw) | Review comments checked | Apr 29, 2026, 19:42 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25128221071) |
| [ClawHub](https://github.com/openclaw/clawhub) | Review comments checked | Apr 29, 2026, 19:30 UTC | [run](https://github.com/openclaw/clawsweeper/actions/runs/25127786715) |
| [ClawSweeper](https://github.com/openclaw/clawsweeper) | Idle | unknown | _none_ |

### Fleet Activity

Latest review: Apr 29, 2026, 19:29 UTC. Latest close: Apr 29, 2026, 19:26 UTC. Latest comment sync: Apr 29, 2026, 19:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 0 | 4 | 0 | 0 | 451 | 1 |
| Last hour | 966 | 12 | 954 | 10 | 26 | 1547 | 1 |
| Last 24 hours | 5913 | 350 | 5563 | 11 | 739 | 2250 | 26 |

### Recently Closed Across Repos

| Repository | Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74514](https://github.com/openclaw/openclaw/pull/74514) | fix: The commit deletes the Discord runtime group-policy shim, but `ex | already implemented on main | Apr 29, 2026, 19:41 UTC | [records/openclaw-openclaw/closed/74514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74514.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#50506](https://github.com/openclaw/openclaw/pull/50506) | security: add missing response headers to media server | already implemented on main | Apr 29, 2026, 19:41 UTC | [records/openclaw-openclaw/closed/50506.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50506.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#43013](https://github.com/openclaw/openclaw/pull/43013) | fix(ui): Fix model selector default value display on initial load | already implemented on main | Apr 29, 2026, 19:41 UTC | [records/openclaw-openclaw/closed/43013.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43013.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#42656](https://github.com/openclaw/openclaw/pull/42656) | fix(synology-chat): add keywordFilterEnabled option for optional keyword filtering | duplicate or superseded | Apr 29, 2026, 19:40 UTC | [records/openclaw-openclaw/closed/42656.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42656.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74576](https://github.com/openclaw/openclaw/pull/74576) | fix: Found two actionable issues in the new memory-wiki people-routing | already closed before apply | Apr 29, 2026, 19:36 UTC | [records/openclaw-openclaw/closed/74576.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74576.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73611](https://github.com/openclaw/openclaw/pull/73611) | fix: gate startup context for sandboxed spawned sessions | closed externally after review | Apr 29, 2026, 19:35 UTC | [records/openclaw-openclaw/closed/73611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73611.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74566](https://github.com/openclaw/openclaw/pull/74566) | fix(ui): align sidebar trigger affordances | closed externally after review | Apr 29, 2026, 19:33 UTC | [records/openclaw-openclaw/closed/74566.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74566.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74351](https://github.com/openclaw/openclaw/issues/74351) | [Bug]: allowRfc2544BenchmarkRange SSRF exemption does not cover IPv6 ULA addresses from fake-ip proxies | closed externally after review | Apr 29, 2026, 19:31 UTC | [records/openclaw-openclaw/closed/74351.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74351.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74405](https://github.com/openclaw/openclaw/issues/74405) | [Bug]: prestageGatewayBundledRuntimeDeps ignores channels.X.enabled=false, installs deps for all bundled channels on startup | closed externally after skipped_invalid_decision | Apr 29, 2026, 19:31 UTC | [records/openclaw-openclaw/closed/74405.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74405.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#71841](https://github.com/openclaw/openclaw/pull/71841) | test(slack): cover formatSlackFileReference + formatSlackFileReferenceList | closed externally after review | Apr 29, 2026, 19:26 UTC | [records/openclaw-openclaw/closed/71841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71841.md) |

### Work Candidates Across Repos

| Repository | Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74574](https://github.com/openclaw/openclaw/issues/74574) | [Bug]: browser open and browser tabs ignore --json flag in 2026.4.26 (output goes to stderr as plain text) | high | candidate | Apr 29, 2026, 19:35 UTC | [records/openclaw-openclaw/items/74574.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74574.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74572](https://github.com/openclaw/openclaw/issues/74572) | active-memory + memory-core dont compose: lightweight sub-agent bootstrap excludes memory-kind plugin tools, allowlist resolves to empty, placeholder turn lands in transcript | high | candidate | Apr 29, 2026, 19:24 UTC | [records/openclaw-openclaw/items/74572.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74572.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66174](https://github.com/openclaw/openclaw/pull/66174) | Fix session transcript path canonicalization on save | high | candidate | Apr 29, 2026, 19:20 UTC | [records/openclaw-openclaw/items/66174.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66174.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66303](https://github.com/openclaw/openclaw/pull/66303) | fix(heartbeat): remove doc-display fences from HEARTBEAT.md template | high | candidate | Apr 29, 2026, 19:20 UTC | [records/openclaw-openclaw/items/66303.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66303.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#55044](https://github.com/openclaw/openclaw/issues/55044) | [Bug]: ignored an explicit stop/no-action instruction | high | candidate | Apr 29, 2026, 19:19 UTC | [records/openclaw-openclaw/items/55044.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55044.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#63998](https://github.com/openclaw/openclaw/issues/63998) | Session transcript doomloop: crash-restart cycle inflates transcript until gateway OOMs | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/63998.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63998.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66146](https://github.com/openclaw/openclaw/pull/66146) | fix(agents): forward model maxTokens as default stream option | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/66146.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66146.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66263](https://github.com/openclaw/openclaw/issues/66263) | [Bug]: Codex native compaction can leave post-compaction context usage stale or unknown | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/66263.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66263.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64609](https://github.com/openclaw/openclaw/issues/64609) | Telegram multi-account: group/topic systemPrompt silently ignored due to inconsistent config resolution | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/64609.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64609.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64530](https://github.com/openclaw/openclaw/issues/64530) | Bug: reopen can leave unresolved tail tool calls and relies on local transcript compensation | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/64530.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64530.md) |
| [openclaw/clawhub](https://github.com/openclaw/clawhub) | [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/62120.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/62120.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64411](https://github.com/openclaw/openclaw/issues/64411) | MCP/plugin failures should degrade fast instead of blocking main reply path | high | candidate | Apr 29, 2026, 19:17 UTC | [records/openclaw-openclaw/items/64411.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64411.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64126](https://github.com/openclaw/openclaw/pull/64126) | fix(diffs): reuse shared secret comparison helper for artifact token | high | candidate | Apr 29, 2026, 19:17 UTC | [records/openclaw-openclaw/items/64126.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64126.md) |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#64427](https://github.com/openclaw/openclaw/issues/64427) | [Bug]: Slack dmHistoryLimit not implemented — DM sessions start with zero history context | high | candidate | Apr 29, 2026, 19:17 UTC | [records/openclaw-openclaw/items/64427.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64427.md) |

<details>
<summary>Recently Reviewed Across Repos</summary>

<br>

| Repository | Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#46303](https://github.com/openclaw/openclaw/pull/46303) | fix: drain inbound debounce buffer and followup queues before SIGUSR1 reload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46303.md) | complete | Apr 29, 2026, 19:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74575](https://github.com/openclaw/openclaw/issues/74575) | [Feature]: Simplify Configuration. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74575.md) | complete | Apr 29, 2026, 19:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 19:29 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#72928](https://github.com/openclaw/openclaw/pull/72928) | fix(commands): scope owner allowlist prefixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72928.md) | complete | Apr 29, 2026, 19:28 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66198](https://github.com/openclaw/openclaw/pull/66198) | security: wrap Signal inbound DM body via wrapExternalContent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66198.md) | complete | Apr 29, 2026, 19:27 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66400](https://github.com/openclaw/openclaw/pull/66400) | fix(tui): tool events dropped when arriving before chat delta | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66400.md) | complete | Apr 29, 2026, 19:27 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#70813](https://github.com/openclaw/openclaw/pull/70813) | feat(whatsapp): support edit and unsend actions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70813.md) | complete | Apr 29, 2026, 19:26 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#74573](https://github.com/openclaw/openclaw/issues/74573) | [tool calls omitted] placeholder leaks into outgoing Telegram messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74573.md) | complete | Apr 29, 2026, 19:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#73323](https://github.com/openclaw/openclaw/issues/73323) | [Bug]: Gateway runtime degradation: pricing fetch 60s timeouts, Telegram polling stalls, slow RPC — chronic across 4.23/4.25/4.26 on Windows 11 + Node 24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73323.md) | complete | Apr 29, 2026, 19:25 UTC |
| [openclaw/openclaw](https://github.com/openclaw/openclaw) | [#66110](https://github.com/openclaw/openclaw/pull/66110) | fix(logging): support root log file overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66110.md) | complete | Apr 29, 2026, 19:24 UTC |

</details>

### Repository Details

<details>
<summary>OpenClaw (openclaw/openclaw)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-openclaw:start -->
**Workflow status**

Repository: [openclaw/openclaw](https://github.com/openclaw/openclaw)

Updated: Apr 29, 2026, 19:42 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 368. Item numbers: 9865,11517,12931,13593,13613,13616,14438,15073,15591,17098,17213,17684,18160,22439,24107,28300,30389,32438,38716,38817,39060,39137,39343,40207,40216,40218,40255,40355,40427,40440,40447,40464,40485,40502,40578,40663,40723,40732,40786,40808,40828,40880,40894,40953,40961,40970,41013,41022,41048,41172,41254,41275,41614,41685,41716,41737,42656,43013,43440,43441,43462,43467,43493,43549,43562,43563,43564,43588,43673,43770,43775,43803,43810,43816,43911,43938,43984,44011,44027,44202,44625,44845,44859,44886,44897,44900,44930,44935,44972,44986,45011,45017,45044,45082,45102,45158,45200,45209,45216,45220,45228,45262,45276,45288,45290,45301,45438,45686,45706,45952,46058,46221,46637,46701,46733,46844,47095,47335,47441,47487,47534,47540,47562,47613,47643,47651,47690,47706,47710,47739,47814,47834,47840,47961,47975,47983,47992,47996,48045,48200,48260,48510,48512,48684,48709,48786,48793,49099,49488,49692,49841,49944,50081,50090,50093,50126,50195,50248,50268,50274,50277,50287,50291,50374,50429,50442,50482,50490,50506,50530,50561,50563,50565,50590,50619,50642,50677,50681,50690,50719,50739,50768,50776,50795,50798,50809,50818,50880,50900,50972,51088,51421,51455,51594,51849,51903,52005,52192,52207,52244,52276,52342,52365,52400,52434,52448,52457,52480,52515,52521,52601,52614,52627,52636,52640,52642,52727,52751,52762,52776,52801,52803,52832,52894,52912,52921,52928,52943,52972,52993,53008,53015,53021,53030,53056,53088,53108,53243,53250,53259,53262,53281,53288,53321,53326,53329,53378,53408,53410,53441,53445,53454,53473,53486,53520,53524,53526,53528,53531,53533,53556,53590,53607,53629,53638,53641,53660,53670,53676,53677,53678,53716,53718,53720,53738,53762,53779,53780,53784,53787,53852,53881,53889,53922,53941,53942,53961,53965,53998,54032,54085,54132,54149,54153,54155,54157,54278,54306,54308,54311,54342,54343,54354,54361,54375,54386,54405,54414,54439,54470,54471,54518,54519,54524,54529,54549,54565,54574,54585,54591,54600,54602,54622,54647,54799,54812,54841,54879,54996,55027,55036,55044,55047,55121,55196,55654,55757,56502,56798,57608,58070,58189,58775,58805,58971,59330,59859,60497,60808,60824,60848,60946,61151,61443,62120,62364,62431,62891,62910,62924,62927,62937,62962,62966,62985,62989,63038,63050,63073,63082,63096,63133,63352,63411,63460,63497,63578,63581,63651,63673,63734,63740,63893,63920,63924,63990,63998,64004,64015,64026,64037,64044,64121,64126,64129,64181,64193,64267,64268,64294,64299,64310,64344,64408,64411,64416,64427,64436,64438,64443,64448,64473,64503,64512,64530,64609,64784,65023,65185,65212,65302,65504,65592,65685,65726,65771,65774,65777,65824,65828,65919,65940,65945,65963,65974,65992,66067,66081,66091,66098,66101,66110,66119,66126,66138,66146,66174,66196,66198,66199,66200,66235,66255,66263,66272,66278,66279,66303,66305,66327,66339,66344,66366,66377,66385,66399,66400,66414,66436,66465,66467,66468,66479,66489,66498,67016,67792,69663,71396,72081,73384,73567,73648,73710,73711,73735,73798,74051,74392,74490,74491,74494,74497,74498,74500,74502,74504,74510,74513,74514.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25128221071](https://github.com/openclaw/clawsweeper/actions/runs/25128221071)
<!-- clawsweeper-status:openclaw-openclaw:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/openclaw](https://github.com/openclaw/openclaw) |
| Open issues | 3537 |
| Open PRs | 3410 |
| Open items total | 6947 |
| Reviewed files | 6611 |
| Unreviewed open items | 336 |
| Archived closed files | 14460 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3364 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3239 |
| Proposed PR closes | 4 (0.1% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 6603 |
| Proposed closes awaiting apply | 4 (0.1% of fresh reviews) |
| Work candidates awaiting promotion | 909 |
| Closed by Codex apply | 10871 |
| Failed or stale reviews | 8 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 69/1140 current (1071 due, 6.1%) |
| Hourly hot item cadence (<7d) | 69/1140 current (1071 due, 6.1%) |
| Daily cadence coverage | 1970/3665 current (1695 due, 53.8%) |
| Daily PR cadence | 1313/2561 current (1248 due, 51.3%) |
| Daily new issue cadence (<30d) | 657/1104 current (447 due, 59.5%) |
| Weekly older issue cadence | 1804/1806 current (2 due, 99.9%) |
| Due now by cadence | 3104 |

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

Latest review: Apr 29, 2026, 19:29 UTC. Latest close: Apr 29, 2026, 19:26 UTC. Latest comment sync: Apr 29, 2026, 19:42 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 4 | 0 | 4 | 0 | 0 | 381 | 1 |
| Last hour | 579 | 12 | 567 | 3 | 26 | 837 | 1 |
| Last 24 hours | 4973 | 350 | 4623 | 4 | 724 | 1349 | 26 |

#### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#74514](https://github.com/openclaw/openclaw/pull/74514) | fix: The commit deletes the Discord runtime group-policy shim, but `ex | already implemented on main | Apr 29, 2026, 19:41 UTC | [records/openclaw-openclaw/closed/74514.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74514.md) |
| [#50506](https://github.com/openclaw/openclaw/pull/50506) | security: add missing response headers to media server | already implemented on main | Apr 29, 2026, 19:41 UTC | [records/openclaw-openclaw/closed/50506.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/50506.md) |
| [#43013](https://github.com/openclaw/openclaw/pull/43013) | fix(ui): Fix model selector default value display on initial load | already implemented on main | Apr 29, 2026, 19:41 UTC | [records/openclaw-openclaw/closed/43013.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/43013.md) |
| [#42656](https://github.com/openclaw/openclaw/pull/42656) | fix(synology-chat): add keywordFilterEnabled option for optional keyword filtering | duplicate or superseded | Apr 29, 2026, 19:40 UTC | [records/openclaw-openclaw/closed/42656.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/42656.md) |
| [#74576](https://github.com/openclaw/openclaw/pull/74576) | fix: Found two actionable issues in the new memory-wiki people-routing | already closed before apply | Apr 29, 2026, 19:36 UTC | [records/openclaw-openclaw/closed/74576.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74576.md) |
| [#73611](https://github.com/openclaw/openclaw/pull/73611) | fix: gate startup context for sandboxed spawned sessions | closed externally after review | Apr 29, 2026, 19:35 UTC | [records/openclaw-openclaw/closed/73611.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/73611.md) |
| [#74566](https://github.com/openclaw/openclaw/pull/74566) | fix(ui): align sidebar trigger affordances | closed externally after review | Apr 29, 2026, 19:33 UTC | [records/openclaw-openclaw/closed/74566.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74566.md) |
| [#74351](https://github.com/openclaw/openclaw/issues/74351) | [Bug]: allowRfc2544BenchmarkRange SSRF exemption does not cover IPv6 ULA addresses from fake-ip proxies | closed externally after review | Apr 29, 2026, 19:31 UTC | [records/openclaw-openclaw/closed/74351.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74351.md) |
| [#74405](https://github.com/openclaw/openclaw/issues/74405) | [Bug]: prestageGatewayBundledRuntimeDeps ignores channels.X.enabled=false, installs deps for all bundled channels on startup | closed externally after skipped_invalid_decision | Apr 29, 2026, 19:31 UTC | [records/openclaw-openclaw/closed/74405.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/74405.md) |
| [#71841](https://github.com/openclaw/openclaw/pull/71841) | test(slack): cover formatSlackFileReference + formatSlackFileReferenceList | closed externally after review | Apr 29, 2026, 19:26 UTC | [records/openclaw-openclaw/closed/71841.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/closed/71841.md) |

#### Work Candidates

| Item | Title | Priority | Status | Reviewed | Report |
| --- | --- | --- | --- | --- | --- |
| [#74574](https://github.com/openclaw/openclaw/issues/74574) | [Bug]: browser open and browser tabs ignore --json flag in 2026.4.26 (output goes to stderr as plain text) | high | candidate | Apr 29, 2026, 19:35 UTC | [records/openclaw-openclaw/items/74574.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74574.md) |
| [#74572](https://github.com/openclaw/openclaw/issues/74572) | active-memory + memory-core dont compose: lightweight sub-agent bootstrap excludes memory-kind plugin tools, allowlist resolves to empty, placeholder turn lands in transcript | high | candidate | Apr 29, 2026, 19:24 UTC | [records/openclaw-openclaw/items/74572.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74572.md) |
| [#66174](https://github.com/openclaw/openclaw/pull/66174) | Fix session transcript path canonicalization on save | high | candidate | Apr 29, 2026, 19:20 UTC | [records/openclaw-openclaw/items/66174.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66174.md) |
| [#66303](https://github.com/openclaw/openclaw/pull/66303) | fix(heartbeat): remove doc-display fences from HEARTBEAT.md template | high | candidate | Apr 29, 2026, 19:20 UTC | [records/openclaw-openclaw/items/66303.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66303.md) |
| [#55044](https://github.com/openclaw/openclaw/issues/55044) | [Bug]: ignored an explicit stop/no-action instruction | high | candidate | Apr 29, 2026, 19:19 UTC | [records/openclaw-openclaw/items/55044.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/55044.md) |
| [#63998](https://github.com/openclaw/openclaw/issues/63998) | Session transcript doomloop: crash-restart cycle inflates transcript until gateway OOMs | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/63998.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/63998.md) |
| [#66146](https://github.com/openclaw/openclaw/pull/66146) | fix(agents): forward model maxTokens as default stream option | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/66146.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66146.md) |
| [#66263](https://github.com/openclaw/openclaw/issues/66263) | [Bug]: Codex native compaction can leave post-compaction context usage stale or unknown | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/66263.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66263.md) |
| [#64609](https://github.com/openclaw/openclaw/issues/64609) | Telegram multi-account: group/topic systemPrompt silently ignored due to inconsistent config resolution | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/64609.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64609.md) |
| [#64530](https://github.com/openclaw/openclaw/issues/64530) | Bug: reopen can leave unresolved tail tool calls and relies on local transcript compensation | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-openclaw/items/64530.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/64530.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#46303](https://github.com/openclaw/openclaw/pull/46303) | fix: drain inbound debounce buffer and followup queues before SIGUSR1 reload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/46303.md) | complete | Apr 29, 2026, 19:29 UTC |
| [#74575](https://github.com/openclaw/openclaw/issues/74575) | [Feature]: Simplify Configuration. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74575.md) | complete | Apr 29, 2026, 19:29 UTC |
| [#74429](https://github.com/openclaw/openclaw/pull/74429) | feat: add config apply patch command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74429.md) | complete | Apr 29, 2026, 19:29 UTC |
| [#72928](https://github.com/openclaw/openclaw/pull/72928) | fix(commands): scope owner allowlist prefixes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/72928.md) | complete | Apr 29, 2026, 19:28 UTC |
| [#66198](https://github.com/openclaw/openclaw/pull/66198) | security: wrap Signal inbound DM body via wrapExternalContent | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66198.md) | complete | Apr 29, 2026, 19:27 UTC |
| [#66400](https://github.com/openclaw/openclaw/pull/66400) | fix(tui): tool events dropped when arriving before chat delta | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66400.md) | complete | Apr 29, 2026, 19:27 UTC |
| [#70813](https://github.com/openclaw/openclaw/pull/70813) | feat(whatsapp): support edit and unsend actions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/70813.md) | complete | Apr 29, 2026, 19:26 UTC |
| [#74573](https://github.com/openclaw/openclaw/issues/74573) | [tool calls omitted] placeholder leaks into outgoing Telegram messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/74573.md) | complete | Apr 29, 2026, 19:25 UTC |
| [#73323](https://github.com/openclaw/openclaw/issues/73323) | [Bug]: Gateway runtime degradation: pricing fetch 60s timeouts, Telegram polling stalls, slow RPC — chronic across 4.23/4.25/4.26 on Windows 11 + Node 24 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/73323.md) | complete | Apr 29, 2026, 19:25 UTC |
| [#66110](https://github.com/openclaw/openclaw/pull/66110) | fix(logging): support root log file overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-openclaw/items/66110.md) | complete | Apr 29, 2026, 19:24 UTC |

</details>

<details>
<summary>ClawHub (openclaw/clawhub)</summary>

<br>

#### Current Run

<!-- clawsweeper-status:openclaw-clawhub:start -->
**Workflow status**

Repository: [openclaw/clawhub](https://github.com/openclaw/clawhub)

Updated: Apr 29, 2026, 19:30 UTC

State: Review comments checked

Checked selected durable Codex review comments and synced missing or stale comments. Synced: 359. Item numbers: 120,171,208,330,364,374,387,406,424,426,448,449,450,451,455,474,482,484,504,509,549,566,575,579,609,618,619,621,630,635,645,650,652,655,656,662,666,669,677,678,681,692,694,699,701,707,708,712,716,717,723,729,731,733,734,740,745,752,755,756,760,761,762,768,769,779,780,782,784,785,791,792,794,798,804,807,816,817,819,822,823,824,834,835,838,845,846,847,848,850,851,854,858,860,863,869,870,871,873,875,876,879,880,881,882,883,886,887,889,890,895,896,897,899,900,901,903,904,905,906,907,908,909,910,911,913,914,915,917,920,921,922,927,928,930,932,933,935,936,937,943,946,951,952,958,959,962,963,969,971,972,974,975,984,987,988,990,995,997,998,999,1001,1003,1004,1006,1008,1009,1010,1013,1015,1016,1020,1022,1024,1026,1027,1030,1032,1033,1035,1036,1041,1042,1044,1045,1046,1048,1049,1051,1054,1058,1059,1069,1080,1082,1085,1092,1100,1102,1109,1110,1113,1118,1125,1133,1136,1137,1138,1140,1141,1142,1145,1148,1153,1155,1164,1167,1168,1170,1176,1177,1186,1193,1195,1197,1204,1205,1207,1208,1221,1226,1228,1229,1230,1235,1236,1239,1247,1250,1253,1254,1261,1264,1265,1266,1268,1271,1289,1292,1296,1301,1307,1308,1310,1312,1313,1315,1318,1320,1326,1327,1329,1341,1345,1351,1353,1354,1358,1359,1361,1366,1367,1368,1370,1374,1377,1378,1379,1381,1383,1384,1385,1391,1393,1394,1397,1398,1400,1402,1405,1406,1407,1408,1410,1411,1412,1414,1415,1416,1417,1418,1420,1421,1422,1423,1424,1425,1426,1430,1431,1432,1433,1435,1440,1442,1443,1444,1445,1446,1447,1448,1450,1451,1452,1457,1463,1465,1471,1472,1473,1476,1477,1480,1483,1494,1495,1500,1501,1503,1509,1511,1516,1518,1519,1521,1523,1526,1528,1529,1530,1533,1535,1538,1542,1543,1551,1553,1554,1558,1559,1563,1572,1574,1575,1576,1578,1582,1583,1584,1585,1586,1587,1594,1631,1649,1657,1678,1679,1690,1705,1770,1808,1876,1896.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/25127786715](https://github.com/openclaw/clawsweeper/actions/runs/25127786715)
<!-- clawsweeper-status:openclaw-clawhub:end -->

#### Queue

| Metric | Count |
| --- | ---: |
| Target repository | [openclaw/clawhub](https://github.com/openclaw/clawhub) |
| Open issues | 889 |
| Open PRs | 39 |
| Open items total | 928 |
| Reviewed files | 923 |
| Unreviewed open items | 5 |
| Archived closed files | 26 |

#### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 883 |
| Proposed issue closes | 0 (0% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 33 |
| Proposed PR closes | 0 (0% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 916 |
| Proposed closes awaiting apply | 0 (0% of fresh reviews) |
| Work candidates awaiting promotion | 45 |
| Closed by Codex apply | 8 |
| Failed or stale reviews | 7 |

#### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 6/60 current (54 due, 10%) |
| Hourly hot item cadence (<7d) | 6/60 current (54 due, 10%) |
| Daily cadence coverage | 207/210 current (3 due, 98.6%) |
| Daily PR cadence | 20/21 current (1 due, 95.2%) |
| Daily new issue cadence (<30d) | 187/189 current (2 due, 98.9%) |
| Weekly older issue cadence | 649/653 current (4 due, 99.4%) |
| Due now by cadence | 66 |

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

Latest review: Apr 29, 2026, 19:18 UTC. Latest close: Apr 29, 2026, 17:17 UTC. Latest comment sync: Apr 29, 2026, 19:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 0 | 0 | 0 | 0 | 0 | 70 | 0 |
| Last hour | 387 | 0 | 387 | 7 | 0 | 710 | 0 |
| Last 24 hours | 937 | 0 | 937 | 7 | 15 | 898 | 0 |

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
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | high | candidate | Apr 29, 2026, 19:18 UTC | [records/openclaw-clawhub/items/1575.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) |
| [#1432](https://github.com/openclaw/clawhub/issues/1432) | False 'suspicious' flag: registry metadata not extracting openclaw.requires.env from published files | high | candidate | Apr 29, 2026, 19:07 UTC | [records/openclaw-clawhub/items/1432.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1432.md) |
| [#1176](https://github.com/openclaw/clawhub/issues/1176) | publish/sync fails for all skills: \"multiple paginated queries\" Convex error | high | candidate | Apr 29, 2026, 19:05 UTC | [records/openclaw-clawhub/items/1176.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1176.md) |
| [#1195](https://github.com/openclaw/clawhub/issues/1195) | Publish fails: Convex paginated query error in syncSkillSearchDigestsForOwnerPublisherId | high | candidate | Apr 29, 2026, 19:05 UTC | [records/openclaw-clawhub/items/1195.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1195.md) |
| [#1226](https://github.com/openclaw/clawhub/issues/1226) | clawhub package publish fails with \"openclaw.plugin.json required\" error | high | candidate | Apr 29, 2026, 19:04 UTC | [records/openclaw-clawhub/items/1226.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1226.md) |
| [#1170](https://github.com/openclaw/clawhub/issues/1170) | [Bug] [Blocking] ClawHub Cli publish bug | high | candidate | Apr 29, 2026, 19:03 UTC | [records/openclaw-clawhub/items/1170.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1170.md) |
| [#1205](https://github.com/openclaw/clawhub/issues/1205) | clawhub publish fails: Convex multiple paginated queries in syncSkillSearchDigestsForOwnerPublisherId (CLI v0.9.0) | high | candidate | Apr 29, 2026, 19:03 UTC | [records/openclaw-clawhub/items/1205.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1205.md) |
| [#1197](https://github.com/openclaw/clawhub/issues/1197) | publish fails: \"multiple paginated queries\" Convex error on first publish | high | candidate | Apr 29, 2026, 19:02 UTC | [records/openclaw-clawhub/items/1197.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1197.md) |
| [#937](https://github.com/openclaw/clawhub/issues/937) | [Bug] clawhub update --all always reports 'local changes (no match)' after v0.8.0 — persists immediately after force-update | high | candidate | Apr 29, 2026, 19:02 UTC | [records/openclaw-clawhub/items/937.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/937.md) |
| [#1179](https://github.com/openclaw/clawhub/issues/1179) | clawhub publish + Web UI: Server Error on users:ensure and ensurePersonalPublisherForUser (first-time publisher) | high | candidate | Apr 29, 2026, 18:34 UTC | [records/openclaw-clawhub/items/1179.md](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1179.md) |

#### Recently Reviewed

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#1582](https://github.com/openclaw/clawhub/issues/1582) | ClawHub Security flagged skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1582.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1584](https://github.com/openclaw/clawhub/issues/1584) | False positive: cross-asset-intelligence flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1584.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1576](https://github.com/openclaw/clawhub/issues/1576) | False positive: DCL Sentinel Trace flagged as Suspicious — webhook is the product, not a risk | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1576.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1551](https://github.com/openclaw/clawhub/issues/1551) | feishu-quick-setup skill incorrectly flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1551.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1876](https://github.com/openclaw/clawhub/issues/1876) | False positive: skill aim-blog-write | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1876.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1587](https://github.com/openclaw/clawhub/issues/1587) | Skill flagged as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1587.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#822](https://github.com/openclaw/clawhub/issues/822) | Response to Security Flag: Soul Weaver Skill Safety Assessment and Corrections | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/822.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1586](https://github.com/openclaw/clawhub/issues/1586) | ClawHub Security flagged skill as suspicious | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1586.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1575](https://github.com/openclaw/clawhub/issues/1575) | Skill search indexing issue and ownership transfer request: realestate-deep-research | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1575.md) | complete | Apr 29, 2026, 19:18 UTC |
| [#1553](https://github.com/openclaw/clawhub/issues/1553) | Re-scan jarviyin/clawpk v5.0.0 — remove suspicious flag | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/records/openclaw-clawhub/items/1553.md) | complete | Apr 29, 2026, 19:18 UTC |

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
