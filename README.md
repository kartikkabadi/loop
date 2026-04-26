# ClawSweeper

ClawSweeper is the conservative OpenClaw maintenance bot for
`openclaw/openclaw`.

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

## Dashboard

Last dashboard update: Apr 26, 2026, 20:51 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 20:51 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 24966676929. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24966676929](https://github.com/openclaw/clawsweeper/actions/runs/24966676929)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3724 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3539 |
| Open items total | 7263 |
| Reviewed files | 7190 |
| Unreviewed open items | 73 |
| Archived closed files | 12534 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3709 |
| Proposed issue closes | 34 (0.9% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3479 |
| Proposed PR closes | 9 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7188 |
| Proposed closes awaiting apply | 43 (0.6% of fresh reviews) |
| Closed by Codex apply | 9948 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 803/807 current (4 due, 99.5%) |
| Hourly hot item cadence (<7d) | 803/807 current (4 due, 99.5%) |
| Daily cadence coverage | 4427/4494 current (67 due, 98.5%) |
| Daily PR cadence | 2993/3051 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1434/1443 current (9 due, 99.4%) |
| Weekly older issue cadence | 1889/1889 current (0 due, 100%) |
| Due now by cadence | 144 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 26, 2026, 18:26 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 7283 |
| Missing eligible open records | 0 |
| Missing maintainer-authored open records | 68 |
| Missing protected open records | 1 |
| Missing recently-created open records | 2 |
| Archived records that are open again | 0 |
| Stale item records | 1 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 2 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#57413](https://github.com/openclaw/openclaw/pull/57413) | Protected proposed close | feat(whatsapp): add reply quoting via replyToMode | closed/57413.md |
| [#60460](https://github.com/openclaw/openclaw/pull/60460) | Protected proposed close | Enforce browser profile CDP policy | closed/60460.md |
| [#61960](https://github.com/openclaw/openclaw/pull/61960) | Stale review | docs: require i18n postprocess before skip | items/61960.md |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 20:50 UTC. Latest close: Apr 26, 2026, 19:53 UTC. Latest comment sync: Apr 26, 2026, 20:30 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 28 | 1 | 27 | 0 | 0 | 0 | 0 |
| Last hour | 1156 | 43 | 1113 | 0 | 1 | 519 | 3 |
| Last 24 hours | 9726 | 2536 | 7190 | 0 | 2037 | 2607 | 10 |

### Recently Closed

| Item | Title | Reason | Closed | Report |
| --- | --- | --- | --- | --- |
| [#32932](https://github.com/openclaw/openclaw/issues/32932) | [Feature]: Suggestion for scheduled task,  WebHook URL function | duplicate or superseded | Apr 26, 2026, 19:53 UTC | [closed/32932.md](https://github.com/openclaw/clawsweeper/blob/main/closed/32932.md) |
| [#72320](https://github.com/openclaw/openclaw/issues/72320) | Bug: tasks cancel fails because dist/task-registry-control.runtime.js is missing from published package | duplicate or superseded | Apr 26, 2026, 19:01 UTC | [closed/72320.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72320.md) |
| [#72313](https://github.com/openclaw/openclaw/issues/72313) | Paperclip adapter sends 'paperclip' property rejected by AgentParamsSchema (additionalProperties: false) | duplicate or superseded | Apr 26, 2026, 19:01 UTC | [closed/72313.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72313.md) |
| [#72312](https://github.com/openclaw/openclaw/issues/72312) | [FAL] queue.fal.ai DNS NXDOMAIN — all FAL image generation broken | already implemented on main | Apr 26, 2026, 19:01 UTC | [closed/72312.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72312.md) |
| [#72311](https://github.com/openclaw/openclaw/issues/72311) | [Bug]: Agent very slow on onboarding and after, tries to install missing deps on every command | already implemented on main | Apr 26, 2026, 19:01 UTC | [closed/72311.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72311.md) |
| [#72307](https://github.com/openclaw/openclaw/issues/72307) | Bonjour plugin crash loop on gateway startup (v2026.4.24 regression) | already implemented on main | Apr 26, 2026, 19:01 UTC | [closed/72307.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72307.md) |
| [#72303](https://github.com/openclaw/openclaw/issues/72303) | [Bug]: Bonjour plugin failure causes infinite restart loop in 2026.4.24 when running in a bridged container | already implemented on main | Apr 26, 2026, 19:00 UTC | [closed/72303.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72303.md) |
| [#72302](https://github.com/openclaw/openclaw/issues/72302) | [Bug]: ERR_UNSUPPORTED_ESM_URL_SCHEME on Windows with Node v22/v24 | already implemented on main | Apr 26, 2026, 19:00 UTC | [closed/72302.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72302.md) |
| [#72288](https://github.com/openclaw/openclaw/issues/72288) | Every user message is processed twice: rewriteSubmittedPromptTranscript branches after agent reply, triggering duplicate run | already implemented on main | Apr 26, 2026, 19:00 UTC | [closed/72288.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72288.md) |
| [#72279](https://github.com/openclaw/openclaw/issues/72279) | [Bug][Windows] openclaw update still hangs with stuck findstr on 2026.4.24 — prior fixes (#57682, #44693, #27802, #41804) are incomplete | already implemented on main | Apr 26, 2026, 19:00 UTC | [closed/72279.md](https://github.com/openclaw/clawsweeper/blob/main/closed/72279.md) |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#18860](https://github.com/openclaw/openclaw/pull/18860) | feat(agents): expose tools and their schemas via new after_tools_resolved hook [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18860.md) | complete | Apr 26, 2026, 20:50 UTC |
| [#72352](https://github.com/openclaw/openclaw/pull/72352) | fix(agents): scope provider discovery from configured models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72352.md) | complete | Apr 26, 2026, 20:50 UTC |
| [#72351](https://github.com/openclaw/openclaw/pull/72351) | fix(tui): handle zero history limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72351.md) | complete | Apr 26, 2026, 20:50 UTC |
| [#40530](https://github.com/openclaw/openclaw/pull/40530) | feat(feishu): add requireMentionInThread to allow thread replies without @mention | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40530.md) | complete | Apr 26, 2026, 20:41 UTC |
| [#39612](https://github.com/openclaw/openclaw/issues/39612) | Feature: Graceful error handling for LLM failures — never expose raw errors to users | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39612.md) | complete | Apr 26, 2026, 20:40 UTC |
| [#40366](https://github.com/openclaw/openclaw/pull/40366) | fix(slack): harden no-reply fallback delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40366.md) | complete | Apr 26, 2026, 20:37 UTC |
| [#40694](https://github.com/openclaw/openclaw/issues/40694) | Browser-opened temporary tabs/windows should close automatically after task completion | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40694.md) | complete | Apr 26, 2026, 20:37 UTC |
| [#40697](https://github.com/openclaw/openclaw/pull/40697) | feat(feishu): add delete_record tool for bitable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40697.md) | complete | Apr 26, 2026, 20:37 UTC |
| [#40703](https://github.com/openclaw/openclaw/pull/40703) | Fail fast on startup when default model auth is missing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40703.md) | complete | Apr 26, 2026, 20:37 UTC |
| [#40540](https://github.com/openclaw/openclaw/issues/40540) | [Bug]: `openclaw update` command fails with EBUSY error on Windows | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40540.md) | complete | Apr 26, 2026, 20:37 UTC |

</details>

## How It Works

ClawSweeper has two independent lanes.

### Review Lane

Review is proposal-only. It never closes items.

- A planner scans open issues and PRs, then assigns exact item numbers to shards.
- Manual runs can pass `item_number` or comma-separated `item_numbers` to review
  exact Audit Health findings without scanning for a normal batch.
- Each shard checks out `openclaw/openclaw` at `main`.
- Codex reviews with `gpt-5.5`, high reasoning, fast service tier, and a
  10-minute per-item timeout.
- Each item becomes `items/<number>.md` with the decision, evidence, suggested
  comment, runtime metadata, and GitHub snapshot hash.
- High-confidence allowed close decisions become `proposed_close`.

Cadence:

- hourly for items with activity since the last snapshot
- hourly for anything created in the last 7 days
- daily for older PRs and issues younger than 30 days
- weekly for older inactive issues
- immediate-ish hot intake every 5 minutes for newest/active items

### Apply Lane

Apply reads existing reports and mutates GitHub only when the stored review is
still valid.

- Updates the single marker-backed Codex automated review comment in place.
- Closes only unchanged high-confidence proposals.
- Reuses the review comment when closing; no duplicate close comment.
- Moves closed or already-closed reports to `closed/<number>.md`.
- Moves reopened archived reports back to `items/<number>.md` as stale.
- Commits checkpoints and dashboard heartbeats during long runs.

Apply wakes every 15 minutes, no-ops when there are no unchanged
high-confidence close proposals, and narrows scheduled runs to the currently
eligible proposal list so idle runs do not scan unrelated keep-open records.
It defaults to all item kinds, no age floor, a 2-second close delay, and 50
fresh closes per checkpoint. If it reaches the requested limit, it queues
another apply run with the same settings.

### Safety Model

- Maintainer-authored items are excluded from automated closes.
- Protected labels block close proposals.
- Codex runs without GitHub write tokens.
- CI makes the OpenClaw checkout read-only for reviews.
- Reviews fail if Codex leaves tracked or untracked changes behind.
- Snapshot changes block apply unless the only change is the bot’s own review
  comment.

### Audit

`npm run audit` compares live GitHub state with generated records without moving
files. It reports missing open records, archived open records, stale records,
duplicates, protected-label proposed closes, and stale review-status records.
Missing open records are classified as eligible, maintainer-authored, protected,
or recently created so strict audit mode can flag actionable drift without
treating expected queue lag or excluded items as failures.
Use `--update-dashboard` to publish the latest audit health into this README
without making every normal dashboard heartbeat scan all open GitHub items.
The workflow refreshes Audit Health on a separate six-hour schedule, and it can
be run manually with `audit_dashboard=true`.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 100 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25 --update-dashboard
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20 --apply-kind all
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later. Scheduled apply runs process both issues and pull requests by default; pass `apply_kind=issue` or `apply_kind=pull_request` to narrow a manual run.

## Checks

```bash
npm run check
npm run oxformat
```

`oxformat` is an alias for `oxfmt`; there is no separate `oxformat` npm package.

## GitHub Actions Setup

Required secrets:

- `OPENAI_API_KEY`: OpenAI API key used to log Codex in before review shards run.
- `CODEX_API_KEY`: optional compatibility alias for the same key during the login check.
- `OPENCLAW_GH_TOKEN`: optional fallback GitHub token for read-heavy `openclaw/openclaw` scans and artifact publish reconciliation when the GitHub App token is unavailable.
- `CLAWSWEEPER_APP_ID`: GitHub App ID for `openclaw-ci`. Currently `3306130`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: private key for `openclaw-ci`; plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls, and apply/comment-sync jobs use the app token for comments and closes.

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
- write access to `openclaw/openclaw` issues and pull requests
- optional Actions write on `openclaw/clawsweeper` for app-token-based run
  cancellation or dispatch
