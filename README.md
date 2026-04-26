# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, publishes a single durable Codex automated review comment when appropriate, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- duplicate or superseded by a canonical issue/PR
- concrete but not actionable in this source repo
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 26, 2026, 02:00 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 02:00 UTC

State: Hot intake publish complete

Merged hot intake artifacts for run 24945724917. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24945724917](https://github.com/openclaw/clawsweeper/actions/runs/24945724917)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5343 |
| Fresh reviewed issues in the last 7 days | 5294 |
| Proposed issue closes | 833 (15.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4252 |
| Fresh reviewed PRs in the last 7 days | 4149 |
| Proposed PR closes | 83 (2% of reviewed PRs) |
| Open items total | 9595 |
| Reviewed files | 9444 |
| Unreviewed open items | 151 |
| Archived closed files | 9853 |
| Fresh verified reviews in the last 7 days | 9443 |
| Proposed closes awaiting apply | 916 (9.7% of fresh reviews) |
| Closed by Codex apply | 7632 |
| Failed or stale reviews | 1 |
| Hourly cadence coverage | 23/1057 current (1034 due, 2.2%) |
| Hourly hot item cadence (<7d) | 23/1057 current (1034 due, 2.2%) |
| Daily cadence coverage | 5630/5762 current (132 due, 97.7%) |
| Daily PR cadence | 3579/3671 current (92 due, 97.5%) |
| Daily new issue cadence (<30d) | 2051/2091 current (40 due, 98.1%) |
| Weekly older issue cadence | 2624/2625 current (1 due, 100%) |
| Due now by cadence | 1318 |

### Latest Run Activity

Latest review: Apr 26, 2026, 01:59 UTC. Latest close: Apr 26, 2026, 01:49 UTC. Latest comment sync: Apr 26, 2026, 01:49 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 157 | 17 | 140 | 0 | 8 | 71 | 0 |
| Last hour | 772 | 122 | 650 | 1 | 49 | 372 | 6 |
| Last 24 hours | 11657 | 2869 | 8788 | 15 | 5640 | 435 | 201 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#38945](https://github.com/openclaw/openclaw/pull/38945) | fix(memory): Unicode support for MMR and FTS tokenizers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38945.md) | complete | Apr 26, 2026, 01:59 UTC |
| [#38609](https://github.com/openclaw/openclaw/pull/38609) | fix(feishu): fix card action context fields and chat_type detection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38609.md) | complete | Apr 26, 2026, 01:59 UTC |
| [#38607](https://github.com/openclaw/openclaw/issues/38607) | Discord: CJK text splits at wrong character boundaries when message exceeds 2000 chars | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38607.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38781](https://github.com/openclaw/openclaw/pull/38781) | adding system.run.prepare | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38781.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38744](https://github.com/openclaw/openclaw/pull/38744) | feat(ios): add ElevenLabs realtime WebSocket STT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38744.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#39001](https://github.com/openclaw/openclaw/pull/39001) | fix(feishu): preserve sender identity and resolve mentions in merge_forward messages | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39001.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38597](https://github.com/openclaw/openclaw/issues/38597) | CJK text splitting breaks mid-character at Discord 2000-char boundary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38597.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38881](https://github.com/openclaw/openclaw/pull/38881) | Fix imageModel auto-switch when primary model doesn't support vision | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38881.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38729](https://github.com/openclaw/openclaw/pull/38729) | feat(thinking): register supportsXHighThinking for Anthropic provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38729.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38939](https://github.com/openclaw/openclaw/pull/38939) | feishu: arbitrate group mentions across main and specialists | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38939.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38670](https://github.com/openclaw/openclaw/pull/38670) | feat(hooks): add agent-scoped internal hook policy overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38670.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38502](https://github.com/openclaw/openclaw/pull/38502) | fix(tui): clarify Ctrl+C status when run is still active | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38502.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#66864](https://github.com/openclaw/openclaw/issues/66864) | /new session reset doesn't purge system-events queue — stale events leak into fresh session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66864.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38932](https://github.com/openclaw/openclaw/pull/38932) | docs(gateway): add Windows no-Docker hardening fallback guide | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38932.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38713](https://github.com/openclaw/openclaw/pull/38713) | fix(skills): resolve `skills info` name mismatches | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38713.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38846](https://github.com/openclaw/openclaw/pull/38846) | security(windows): enhance command argument validation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38846.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#67049](https://github.com/openclaw/openclaw/pull/67049) | fix: drain system events on /new session reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67049.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#71379](https://github.com/openclaw/openclaw/pull/71379) | fix: expose image edit geometry flags in capability cli | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71379.md) | complete | Apr 26, 2026, 01:58 UTC |
| [#38664](https://github.com/openclaw/openclaw/pull/38664) | docs: Add security scan workflow template (Trivy + KICS + TruffleHog) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38664.md) | complete | Apr 26, 2026, 01:57 UTC |
| [#38780](https://github.com/openclaw/openclaw/pull/38780) | feat: context-pressure-aware continuation (CONTINUE_WORK / CONTINUE_DELEGATE) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38780.md) | complete | Apr 26, 2026, 01:57 UTC |

## How It Works

The normal review workflow is proposal-only. It runs configurable parallel shards and never closes during review. A hot-intake publish step may sync the durable Codex automated review comment for newly reviewed items, but close actions are reserved for the separate apply/comment-sync workflow. Apply mode updates the durable review comment in place and closes only unchanged high-confidence proposals.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments, plus a small best-effort local title search over existing reports for likely duplicates/superseded work.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout. The review prompt requires source/docs/tests/history inspection, adjacent-code reading, and reason-specific evidence before Codex can mark a close as high-confidence.
6. Writes `items/<number>.md` with the decision, best possible solution, proposed review comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is hourly for items with activity since the last stored snapshot and for anything created in the last 7 days, daily for older PRs and issues younger than 30 days, and weekly for older inactive issues. A separate hot-intake lane runs every 5 minutes with `batch_size=1`, up to 20 shards, and a two-page newest/most-recently-updated scan so brand-new issues and PRs get individual review workers quickly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then hot new items, then PRs, then recent issues, then older weekly reviews. The dashboard reports local cadence coverage for hourly hot items, daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To sync comments or close later without rerunning Codex, dispatch the workflow with `apply_existing=true` or let the scheduled apply lane run at minute 37 each hour. That mode reads existing `items/*.md`, refetches the issue/PR context, updates the single marker-backed Codex automated review comment in place, and only closes if nothing except that review comment changed since the proposal was written. It never posts a second close comment; closing reuses the durable review comment and then closes the item. Comment and close mutations use the `openclaw-ci` GitHub App installation token, so new automated GitHub comments are attributed to `clawsweeper[bot]` instead of a maintainer account. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

`npm run audit` compares live open GitHub items with the generated `items/` and `closed/` records without moving files. It reports missing open records, open records still archived under `closed/`, stale `items/` records that no longer appear open, duplicate markdown records, protected-label proposed closes, and stale review-status records. Use `--output audit-report.json` for the full report, `--sample-limit N` to control console samples, and `--strict` to exit non-zero when state drift is present.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 50 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run audit -- --max-pages 250 --sample-limit 25
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs are proposal-only even if `--apply-closures` or workflow input `apply_closures=true` is set. Use `apply_existing=true` to apply unchanged proposals later.

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

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex token environment variables. Parent ClawSweeper code uses the `openclaw-ci` GitHub App installation token for read-heavy target and related GitHub context before invoking Codex, falling back to `OPENCLAW_GH_TOKEN` only if the App secrets are absent. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. Apply mode uses the `openclaw-ci` GitHub App installation token for `openclaw/openclaw` review comments and closes, so automated mutations are attributed to `clawsweeper[bot]`. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.

The `openclaw-ci` GitHub App installation must have read access for target scan context and write access to `openclaw/openclaw` issues and pull requests. Grant Actions write on `openclaw/clawsweeper` only if app-token-based run cancellation or dispatch is needed; normal workflow execution can still use the repository `GITHUB_TOKEN` for ClawSweeper commits and workflow orchestration.
