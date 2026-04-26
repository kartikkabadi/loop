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

Last dashboard update: Apr 26, 2026, 01:30 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 01:25 UTC

State: Apply in progress

Starting apply/comment-sync run for up to 20 fresh issue closes. Existing Codex automated review comments are updated in place; checkpoints commit every 50 fresh closes; close delay is 5000ms; sync-comments-only=false; item numbers=all.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24945189657](https://github.com/openclaw/clawsweeper/actions/runs/24945189657)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5386 |
| Fresh reviewed issues in the last 7 days | 5335 |
| Proposed issue closes | 828 (15.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4251 |
| Fresh reviewed PRs in the last 7 days | 4153 |
| Proposed PR closes | 66 (1.6% of reviewed PRs) |
| Open items total | 9637 |
| Reviewed files | 9495 |
| Unreviewed open items | 142 |
| Archived closed files | 9802 |
| Fresh verified reviews in the last 7 days | 9488 |
| Proposed closes awaiting apply | 894 (9.4% of fresh reviews) |
| Closed by Codex apply | 7593 |
| Failed or stale reviews | 7 |
| Hourly cadence coverage | 12/1065 current (1053 due, 1.1%) |
| Hourly hot item cadence (<7d) | 12/1065 current (1053 due, 1.1%) |
| Daily cadence coverage | 5521/5764 current (243 due, 95.8%) |
| Daily PR cadence | 3547/3670 current (123 due, 96.6%) |
| Daily new issue cadence (<30d) | 1974/2094 current (120 due, 94.3%) |
| Weekly older issue cadence | 2663/2666 current (3 due, 99.9%) |
| Due now by cadence | 1441 |

### Latest Run Activity

Latest review: Apr 26, 2026, 01:21 UTC. Latest close: Apr 26, 2026, 01:21 UTC. Latest comment sync: Apr 26, 2026, 01:24 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 3 | 2 | 1 | 0 | 10 | 218 | 6 |
| Last hour | 752 | 110 | 642 | 1 | 40 | 442 | 12 |
| Last 24 hours | 11603 | 2858 | 8745 | 21 | 5618 | 468 | 204 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63713](https://github.com/openclaw/openclaw/pull/63713) | Preserve authored and runtime prompt metadata in chat transcripts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63713.md) | complete | Apr 26, 2026, 01:21 UTC |
| [#63631](https://github.com/openclaw/openclaw/issues/63631) | [Bug]: too much information pop out, I can't approve it without button to press | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63631.md) | complete | Apr 26, 2026, 01:19 UTC |
| [#63410](https://github.com/openclaw/openclaw/issues/63410) | WhatsApp: Persistent 408 session timeout loop — WebSocket keepalive not preventing server-side idle disconnect | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63410.md) | complete | Apr 26, 2026, 01:17 UTC |
| [#63249](https://github.com/openclaw/openclaw/issues/63249) | [Bug] v2026.4.8 — openclaw cron list, openclaw message …, openclaw channels list enter 99% CPU busy-wait and never return | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63249.md) | complete | Apr 26, 2026, 01:15 UTC |
| [#63706](https://github.com/openclaw/openclaw/issues/63706) | [Bug]: Discord voice-note handling inconsistent after update to 2026.4.9 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63706.md) | complete | Apr 26, 2026, 01:13 UTC |
| [#63667](https://github.com/openclaw/openclaw/issues/63667) | [Bug] Image tool fails with 'chat content is empty' after 2026.4.9 upgrade | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63667.md) | complete | Apr 26, 2026, 01:13 UTC |
| [#63784](https://github.com/openclaw/openclaw/issues/63784) | Session lock file not released after LLM idle timeout (no gateway restart) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63784.md) | complete | Apr 26, 2026, 01:13 UTC |
| [#63845](https://github.com/openclaw/openclaw/issues/63845) | Tool granularity vs server-side aggregation — best practices for high-count skills / tools (65+)? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63845.md) | complete | Apr 26, 2026, 01:13 UTC |
| [#63839](https://github.com/openclaw/openclaw/pull/63839) | fix: surface context overflow error for model_context_window_exceeded stop reason | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63839.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#63719](https://github.com/openclaw/openclaw/issues/63719) | openclaw update can leave the global openclaw bin missing after npm global update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63719.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#63823](https://github.com/openclaw/openclaw/issues/63823) | MiniMax plugin manifest missing providerAuthAliases after provider auth aliases system update | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63823.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#23896](https://github.com/openclaw/openclaw/issues/23896) | [Feature]: requireMentionFromIds | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/23896.md) | failed | Apr 26, 2026, 01:12 UTC |
| [#63756](https://github.com/openclaw/openclaw/issues/63756) | [Windows] qmd memory backend unavailable — .cmd wrapper not resolved | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63756.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#27771](https://github.com/openclaw/openclaw/pull/27771) | ability to set config path for signal-cli | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/27771.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#63743](https://github.com/openclaw/openclaw/issues/63743) | [Feature]: Gateway does not support IPv6 listening | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63743.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#63836](https://github.com/openclaw/openclaw/pull/63836) | feat: add SiliconFlow model provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63836.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#63827](https://github.com/openclaw/openclaw/pull/63827) | fix(security): preserve dmPolicy settings during wizard runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63827.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#63714](https://github.com/openclaw/openclaw/pull/63714) | feat(ingress): lift Slack/Telegram work requests into deterministic stage orchestration | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63714.md) | complete | Apr 26, 2026, 01:12 UTC |
| [#69494](https://github.com/openclaw/openclaw/pull/69494) | fix: resolve SecretRef keychain tokens in desktop app browser proxy | [keep_open / skipped_changed_since_review](https://github.com/openclaw/clawsweeper/blob/main/items/69494.md) | complete | Apr 26, 2026, 01:11 UTC |
| [#63773](https://github.com/openclaw/openclaw/issues/63773) | Bug: Subagent session JSONL does not record token usage (usage fields always 0) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63773.md) | complete | Apr 26, 2026, 01:11 UTC |

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
