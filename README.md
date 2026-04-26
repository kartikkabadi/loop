# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

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

Last dashboard update: Apr 26, 2026, 00:43 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 00:43 UTC

State: Review publish complete

Merged review artifacts for run 24944234053. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24944234053](https://github.com/openclaw/clawsweeper/actions/runs/24944234053)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5422 |
| Fresh reviewed issues in the last 7 days | 5375 |
| Proposed issue closes | 817 (15.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4248 |
| Fresh reviewed PRs in the last 7 days | 4152 |
| Proposed PR closes | 45 (1.1% of reviewed PRs) |
| Open items total | 9670 |
| Reviewed files | 9538 |
| Unreviewed open items | 132 |
| Archived closed files | 9759 |
| Fresh verified reviews in the last 7 days | 9527 |
| Proposed closes awaiting apply | 862 (9% of fresh reviews) |
| Closed by Codex apply | 7555 |
| Failed or stale reviews | 11 |
| Hourly cadence coverage | 24/1073 current (1049 due, 2.2%) |
| Hourly hot item cadence (<7d) | 24/1073 current (1049 due, 2.2%) |
| Daily cadence coverage | 5278/5762 current (484 due, 91.6%) |
| Daily PR cadence | 3443/3669 current (226 due, 93.8%) |
| Daily new issue cadence (<30d) | 1835/2093 current (258 due, 87.7%) |
| Weekly older issue cadence | 2700/2703 current (3 due, 99.9%) |
| Due now by cadence | 1668 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63005](https://github.com/openclaw/openclaw/issues/63005) | [Bug]: external raw session keys can split after sessions_send / nested agent canonicalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63005.md) | complete | Apr 26, 2026, 00:42 UTC |
| [#62956](https://github.com/openclaw/openclaw/pull/62956) | fix(tui): surface error details and elapsed time in status bar on agent failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62956.md) | complete | Apr 26, 2026, 00:42 UTC |
| [#63015](https://github.com/openclaw/openclaw/pull/63015) | fix: honor filePath/path/media fallbacks in outbound reply normalization | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63015.md) | complete | Apr 26, 2026, 00:42 UTC |
| [#63069](https://github.com/openclaw/openclaw/issues/63069) | [Bug]: hell completion writes to wrong profile path when ZDOTDIR or XDG_CONFIG_HOME is set | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63069.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63002](https://github.com/openclaw/openclaw/issues/63002) | High CPU usage (>140%) and service stalls on Debian 13 after upgrading to 2026.4.8 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63002.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63042](https://github.com/openclaw/openclaw/issues/63042) | [Bug]: No documentation or setup path for custom provider auth in isolated cron sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63042.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63034](https://github.com/openclaw/openclaw/issues/63034) | Bug: OpenRouter path does not apply cache_control to conversation messages (only system prompt) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63034.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#62974](https://github.com/openclaw/openclaw/issues/62974) | Feature: cache-aware sticky fallback to prevent prompt cache bouncing across providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62974.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#62968](https://github.com/openclaw/openclaw/issues/62968) | bug: subagent announce direct-send error silently swallowed when queue fallback recovers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62968.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63135](https://github.com/openclaw/openclaw/issues/63135) | [Bug]: Agents respond they are working on a request but then fail to perform any actions. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63135.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#62966](https://github.com/openclaw/openclaw/pull/62966) | feat: expose replyToId in inbound_claim hook metadata | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62966.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63025](https://github.com/openclaw/openclaw/pull/63025) | fix(auto-reply): avoid silent completion when dispatch produces no sendable reply | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63025.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63050](https://github.com/openclaw/openclaw/pull/63050) | fix(auth): add --token flag to paste-token and surface validTypes in invalid_type warning | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63050.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#54919](https://github.com/openclaw/openclaw/issues/54919) | [Feature]: agents.defaults.thinkingDefault config field not working | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54919.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63113](https://github.com/openclaw/openclaw/pull/63113) | feat: add local coding agent bootstrap and selftests | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63113.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63009](https://github.com/openclaw/openclaw/issues/63009) | [Feature]: automatic rollback for self-modification failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63009.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63125](https://github.com/openclaw/openclaw/issues/63125) | [Bug]: Multiple regressions in 2026.4.8 - Gateway high CPU, CLI timeout, Discord voice broken, Messenger bot broken | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63125.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63062](https://github.com/openclaw/openclaw/pull/63062) | fix: apply cache_control to conversation messages on OpenRouter path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63062.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63007](https://github.com/openclaw/openclaw/pull/63007) | Pass outbound session identity into message_sending and surface guarded gateway send denial | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63007.md) | complete | Apr 26, 2026, 00:41 UTC |
| [#63030](https://github.com/openclaw/openclaw/issues/63030) | System prompt assembled differently across code paths (chat/heartbeat/announce), causing continuous Anthropic cache invalidation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63030.md) | complete | Apr 26, 2026, 00:41 UTC |

## How It Works

The normal review workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. The apply/comment-sync workflow is separate; it updates the durable Codex automated review comment in place and closes only unchanged high-confidence proposals.

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

To sync comments or close later without rerunning Codex, dispatch the workflow with `apply_existing=true` or let the scheduled apply lane run at minute 37 each hour. That mode reads existing `items/*.md`, refetches the issue/PR context, updates the single marker-backed Codex automated review comment in place, and only closes if nothing except that review comment changed since the proposal was written. It never posts a second close comment; closing reuses the durable review comment and then closes the item. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.
- `CLAWSWEEPER_APP_ID`: optional GitHub App ID for the read-only OpenClaw scan token. Currently `3306130` for `openclaw-ci`.
- `CLAWSWEEPER_APP_PRIVATE_KEY`: optional private key for `openclaw-ci`; when present, plan/review jobs use a short-lived GitHub App installation token for read-heavy `openclaw/openclaw` API calls.

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI or Codex token environment variables. Parent ClawSweeper code uses the `openclaw-ci` GitHub App installation token for read-heavy target and related GitHub context before invoking Codex, falling back to `OPENCLAW_GH_TOKEN` only if the App secrets are absent. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. Apply mode still uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
