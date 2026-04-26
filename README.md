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

Last dashboard update: Apr 26, 2026, 21:31 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 21:31 UTC

State: Hot intake comments synced

Synced durable Codex review comments for 20 hot-intake item(s). Item numbers: 17931,18548,20237,20756,20950,25621,28965,29384,64732,65309,70790,70856,71921,72031,72085,72132,72345,72347,72348,72349.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24967416755](https://github.com/openclaw/clawsweeper/actions/runs/24967416755)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3726 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3536 |
| Open items total | 7262 |
| Reviewed files | 7190 |
| Unreviewed open items | 72 |
| Archived closed files | 12539 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3709 |
| Proposed issue closes | 35 (0.9% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3479 |
| Proposed PR closes | 9 (0.3% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7188 |
| Proposed closes awaiting apply | 44 (0.6% of fresh reviews) |
| Closed by Codex apply | 9948 |
| Failed or stale reviews | 2 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 29/807 current (778 due, 3.6%) |
| Hourly hot item cadence (<7d) | 29/807 current (778 due, 3.6%) |
| Daily cadence coverage | 4426/4493 current (67 due, 98.5%) |
| Daily PR cadence | 2995/3053 current (58 due, 98.1%) |
| Daily new issue cadence (<30d) | 1431/1440 current (9 due, 99.4%) |
| Weekly older issue cadence | 1890/1890 current (0 due, 100%) |
| Due now by cadence | 917 |

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

Latest review: Apr 26, 2026, 21:29 UTC. Latest close: Apr 26, 2026, 19:53 UTC. Latest comment sync: Apr 26, 2026, 21:31 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 20 | 2 | 18 | 0 | 0 | 20 | 0 |
| Last hour | 226 | 7 | 219 | 0 | 0 | 42 | 1 |
| Last 24 hours | 9731 | 2537 | 7194 | 0 | 2037 | 2647 | 10 |

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
| [#71921](https://github.com/openclaw/openclaw/issues/71921) | Bedrock Claude models (Opus 4.7, Sonnet 4.6, Opus 4.6) missing vision capability in registry | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71921.md) | complete | Apr 26, 2026, 21:29 UTC |
| [#64732](https://github.com/openclaw/openclaw/issues/64732) | [Bug]: openclaw tool/help CLI surfaces break when plugins.allow omits synthetic command ids | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64732.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#70790](https://github.com/openclaw/openclaw/pull/70790) | fix(agents): strip empty tools/tool_choice from embedded runner payloads | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70790.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#72349](https://github.com/openclaw/openclaw/issues/72349) | [Bug]: Subagent spawn fails with \"No API key found for bedrock\" when using IAM Roles Anywhere (AWS_PROFILE + credential_process) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72349.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#72345](https://github.com/openclaw/openclaw/issues/72345) | voice-call: CLI `voicecall call` cannot run when gateway is owning the webhook port | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72345.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#65309](https://github.com/openclaw/openclaw/issues/65309) | [Bug]: Active Memory blocks direct-chat turns for ~30s and times out across multiple model configurations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65309.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#20950](https://github.com/openclaw/openclaw/issues/20950) | [Feature]: cron jobs.d/ directory support (one file per job, for NixOS/GitOps declarative setups) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/20950.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#70856](https://github.com/openclaw/openclaw/issues/70856) | [Bug]: WhatsApp listener repeatedly disconnects/stalls on Windows, causing \"No active WhatsApp Web listener\" and missed messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70856.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#29384](https://github.com/openclaw/openclaw/issues/29384) | [Feature]: Support for sandbox Docker parameters (--gpus all, --ipc=host) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/29384.md) | complete | Apr 26, 2026, 21:28 UTC |
| [#25621](https://github.com/openclaw/openclaw/issues/25621) | [Feature]: Error: Gateway service install not supported on openbsd | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/25621.md) | complete | Apr 26, 2026, 21:28 UTC |

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
