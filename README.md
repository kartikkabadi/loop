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

Last dashboard update: Apr 26, 2026, 09:41 UTC

### Current Run

<!-- clawsweeper-status:start -->
**Workflow status**

Updated: Apr 26, 2026, 09:41 UTC

State: Review publish complete

Merged review artifacts for run 24953294407. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24953294407](https://github.com/openclaw/clawsweeper/actions/runs/24953294407)
<!-- clawsweeper-status:end -->

### Queue

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3938 |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 3593 |
| Open items total | 7531 |
| Reviewed files | 7280 |
| Unreviewed open items | 251 |
| Archived closed files | 12032 |

### Review Outcomes

| Metric | Count |
| --- | ---: |
| Fresh reviewed issues in the last 7 days | 3793 |
| Proposed issue closes | 61 (1.6% of reviewed issues) |
| Fresh reviewed PRs in the last 7 days | 3411 |
| Proposed PR closes | 22 (0.6% of reviewed PRs) |
| Fresh verified reviews in the last 7 days | 7204 |
| Proposed closes awaiting apply | 83 (1.2% of fresh reviews) |
| Closed by Codex apply | 9505 |
| Failed or stale reviews | 76 |

### Cadence

| Metric | Coverage |
| --- | ---: |
| Hourly cadence coverage | 118/779 current (661 due, 15.1%) |
| Hourly hot item cadence (<7d) | 118/779 current (661 due, 15.1%) |
| Daily cadence coverage | 4421/4541 current (120 due, 97.4%) |
| Daily PR cadence | 2987/3073 current (86 due, 97.2%) |
| Daily new issue cadence (<30d) | 1434/1468 current (34 due, 97.7%) |
| Weekly older issue cadence | 1954/1960 current (6 due, 99.7%) |
| Due now by cadence | 1038 |

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

Latest review: Apr 26, 2026, 09:40 UTC. Latest close: Apr 26, 2026, 09:38 UTC. Latest comment sync: Apr 26, 2026, 09:38 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 500 | 40 | 460 | 0 | 11 | 316 | 9 |
| Last hour | 2016 | 209 | 1807 | 1 | 240 | 902 | 9 |
| Last 24 hours | 9987 | 2592 | 7395 | 89 | 5078 | 2346 | 39 |

<details>
<summary>Recently Reviewed (latest 10)</summary>

<br>

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#48694](https://github.com/openclaw/openclaw/issues/48694) | Slack Socket Mode bots return account_inactive loop despite valid tokens (2026.2.23) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48694.md) | complete | Apr 26, 2026, 09:40 UTC |
| [#48526](https://github.com/openclaw/openclaw/issues/48526) | [Bug]: Anthropic provider stuck in “billing issue” state even after credits + new API key + clean onboard | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48526.md) | complete | Apr 26, 2026, 09:40 UTC |
| [#47852](https://github.com/openclaw/openclaw/issues/47852) | Feature: Per-agent generation parameter configuration (temperature, top_p, top_k, penalties, max_tokens) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47852.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#49609](https://github.com/openclaw/openclaw/issues/49609) | [Bug]: sandbox-browser noVNC clipboard garbles non-Latin-1 characters (CJK, Cyrillic, etc.) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49609.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#49205](https://github.com/openclaw/openclaw/issues/49205) | [Bug]: Control UI messages can reach shared context but still not appear in Open WebUI visible chat history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/49205.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#48874](https://github.com/openclaw/openclaw/issues/48874) | [RFC] Multi-Session Architecture: Shared LLM + Isolated Sessions + Public Knowledge Base | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48874.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#71589](https://github.com/openclaw/openclaw/pull/71589) | fix(agent): suppress tool-use assistant text | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71589.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#48628](https://github.com/openclaw/openclaw/issues/48628) | Feature: Pass raw audio to multimodal models instead of (or alongside) STT transcription | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48628.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#55084](https://github.com/openclaw/openclaw/pull/55084) | fix(discord): deactivate native command guard on abort to prevent stale interaction races | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/55084.md) | complete | Apr 26, 2026, 09:39 UTC |
| [#48644](https://github.com/openclaw/openclaw/issues/48644) | Gateway startup takes 4-10 minutes (603 JS chunks, 2.2GB memory peak) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48644.md) | complete | Apr 26, 2026, 09:39 UTC |

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
