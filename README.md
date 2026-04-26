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

Last dashboard update: Apr 26, 2026, 12:02 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 12:02 UTC

State: Review publish complete

Merged review artifacts for run 24955851771. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24955851771](https://github.com/openclaw/clawsweeper/actions/runs/24955851771)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3784 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3529 |
| Open items total | 7313 |
| Reviewed files | 7239 |
| Unreviewed open items | 74 |
| Archived closed files | 12298 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3767 |
| Proposed issue closes | 29 (0.8% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3469 |
| Proposed PR closes | 7 (0.2% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7236 |
| Proposed closes awaiting apply | 36 (0.5% of fresh reviews) |
| Closed by Codex apply | 9764 |
| Failed or stale reviews | 3 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 484/853 current (369 due, 56.7%) |
| Hourly hot item cadence (<7d) | 484/853 current (369 due, 56.7%) |
| Daily cadence coverage | 4435/4505 current (70 due, 98.4%) |
| Daily PR cadence | 2988/3051 current (63 due, 97.9%) |
| Daily new issue cadence (<30d) | 1447/1454 current (7 due, 99.5%) |
| Weekly older issue cadence | 1881/1881 current (0 due, 100%) |
| Due now by cadence | 513 |

### Audit Health

<!-- clawsweeper-audit:start -->
Last audit: Apr 26, 2026, 06:52 UTC

Status: **Action needed**

| Metric | Count |
| --- | ---: |
| Scan complete | yes |
| Open items seen | 8155 |
| Missing eligible open records | 5 |
| Missing maintainer-authored open records | 72 |
| Missing protected open records | 0 |
| Missing recently-created open records | 142 |
| Archived records that are open again | 0 |
| Stale item records | 7 |
| Duplicate records | 0 |
| Protected proposed closes | 2 |
| Stale reviews | 41 |

| Item | Category | Title | Detail |
| --- | --- | --- | --- |
| [#66922](https://github.com/openclaw/openclaw/issues/66922) | Missing eligible open | [Bug]: xAI grok reasoning models (grok-4-1-fast-reasoning) ignore workspace IDENTITY.md behavioral rules at 0% compliance rate | eligible |
| [#66923](https://github.com/openclaw/openclaw/issues/66923) | Missing eligible open | OpenClaw Model Registry: GPT-4.1 family passes through unmanaged | eligible |
| [#68655](https://github.com/openclaw/openclaw/issues/68655) | Missing eligible open | bug(web-ui): streaming markdown flickers — full DOM replacement on every token via unsafeHTML | eligible |
<!-- clawsweeper-audit:end -->

### Latest Run Activity

Latest review: Apr 26, 2026, 12:01 UTC. Latest close: Apr 26, 2026, 11:54 UTC. Latest comment sync: Apr 26, 2026, 11:54 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 500 | 36 | 464 | 0 | 20 | 21 | 1 |
| Last hour | 1020 | 39 | 981 | 0 | 20 | 40 | 2 |
| Last 24 hours | 10099 | 2737 | 7362 | 14 | 4509 | 1949 | 29 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#72117](https://github.com/openclaw/openclaw/issues/72117) | [Feature]: official `npm create openclaw-plugin` scaffolder for ClawHub-ready plugins | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72117.md) | complete | Apr 26, 2026, 12:01 UTC |
| [#72123](https://github.com/openclaw/openclaw/issues/72123) | LCM still sends deprecated temperature=0.2 to claude-opus-4-7 on v2026.4.24 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72123.md) | complete | Apr 26, 2026, 12:00 UTC |
| [#72129](https://github.com/openclaw/openclaw/pull/72129) | feat(huggingface): add text-to-image generation via hf-inference Inference Providers route | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72129.md) | complete | Apr 26, 2026, 12:00 UTC |
| [#72092](https://github.com/openclaw/openclaw/pull/72092) | fix(media): allow aws-sdk auth mode for image and audio/video paths | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72092.md) | complete | Apr 26, 2026, 12:00 UTC |
| [#72104](https://github.com/openclaw/openclaw/issues/72104) | [Bug] Gateway crashes during npm upgrade - SIGUSR1 arrives before files are written | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72104.md) | complete | Apr 26, 2026, 12:00 UTC |
| [#72140](https://github.com/openclaw/openclaw/issues/72140) | status: Context line shows pre-compaction size instead of current context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72140.md) | complete | Apr 26, 2026, 11:59 UTC |
| [#71957](https://github.com/openclaw/openclaw/issues/71957) | Gateway startup race: channels fire before anthropic plugin registers claude-cli harness | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71957.md) | complete | Apr 26, 2026, 11:59 UTC |
| [#72122](https://github.com/openclaw/openclaw/issues/72122) | [Feature] 客户端需要停止按钮 + 强制中断工具调用机制 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/72122.md) | complete | Apr 26, 2026, 11:59 UTC |
| [#72130](https://github.com/openclaw/openclaw/issues/72130) | Checkpoint store grows unbounded on VPS (18GB/session) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/72130.md) | complete | Apr 26, 2026, 11:59 UTC |
| [#71899](https://github.com/openclaw/openclaw/pull/71899) | fix(agents): keep added workspaces peer-level | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71899.md) | complete | Apr 26, 2026, 11:59 UTC |

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

Apply defaults to issue-only closes, no age floor, 2-second close delay, and
50 fresh closes per checkpoint. If it reaches the requested limit, it queues
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
