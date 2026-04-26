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

Last dashboard update: Apr 26, 2026, 00:23 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 00:23 UTC

State: Apply in progress

Checkpoint 1 finished. Fresh closes in checkpoint: 10. Total fresh closes in this run: 10/20. Result records in checkpoint: 69, including durable review comment syncs.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24944116411](https://github.com/openclaw/clawsweeper/actions/runs/24944116411)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5478 |
| Fresh reviewed issues in the last 7 days | 5440 |
| Proposed issue closes | 764 (14% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4257 |
| Fresh reviewed PRs in the last 7 days | 4162 |
| Proposed PR closes | 43 (1% of reviewed PRs) |
| Open items total | 9735 |
| Reviewed files | 9605 |
| Unreviewed open items | 130 |
| Archived closed files | 9692 |
| Fresh verified reviews in the last 7 days | 9602 |
| Proposed closes awaiting apply | 807 (8.4% of fresh reviews) |
| Closed by Codex apply | 7505 |
| Failed or stale reviews | 3 |
| Hourly cadence coverage | 20/1079 current (1059 due, 1.9%) |
| Hourly hot item cadence (<7d) | 20/1079 current (1059 due, 1.9%) |
| Daily cadence coverage | 5228/5772 current (544 due, 90.6%) |
| Daily PR cadence | 3421/3675 current (254 due, 93.1%) |
| Daily new issue cadence (<30d) | 1807/2097 current (290 due, 86.2%) |
| Weekly older issue cadence | 2754/2754 current (0 due, 100%) |
| Due now by cadence | 1733 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70577](https://github.com/openclaw/openclaw/issues/70577) | memory_search tool can fail with CredentialsProviderError while CLI works after switching to local embeddings | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70577.md) | complete | Apr 26, 2026, 00:16 UTC |
| [#71429](https://github.com/openclaw/openclaw/issues/71429) | [Bug] Telegram gateway drops in-flight messages on sendChatAction network failure during hot reload | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71429.md) | complete | Apr 26, 2026, 00:16 UTC |
| [#71452](https://github.com/openclaw/openclaw/issues/71452) | feat(message): list chat / list messages should support pagination instead of hardcoded 25 limit | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71452.md) | complete | Apr 26, 2026, 00:16 UTC |
| [#71416](https://github.com/openclaw/openclaw/issues/71416) | CLI silently falls back to embedded mode when gateway is unreachable | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71416.md) | complete | Apr 26, 2026, 00:16 UTC |
| [#71398](https://github.com/openclaw/openclaw/issues/71398) | QQ Bot channel fails with 'invalid appid or secret' after upgrade to v2026.4.23 when using secretref | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71398.md) | complete | Apr 26, 2026, 00:16 UTC |
| [#71614](https://github.com/openclaw/openclaw/pull/71614) | fix(bundled-runtime-deps): fallback to os.tmpdir() for npm cache + skip disabled channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71614.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71485](https://github.com/openclaw/openclaw/issues/71485) | Feishu card renderMode shows unwanted `main` header/title and there is no config to disable it | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/71485.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71428](https://github.com/openclaw/openclaw/issues/71428) | RFC: allowConversationAccess as plugin manifest field (replaces 2 schema patches) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71428.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#65730](https://github.com/openclaw/openclaw/pull/65730) | fix(auto-reply): resolve short referential follow-ups from thread context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65730.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71399](https://github.com/openclaw/openclaw/pull/71399) | feat(hooks): add agent:turn:end internal hook event | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71399.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71487](https://github.com/openclaw/openclaw/issues/71487) | Web UI: add a clear TTS toggle and default voice picker in Settings | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71487.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71178](https://github.com/openclaw/openclaw/issues/71178) | `openclaw update` run mid-turn causes total message loss on Telegram (and likely Discord) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71178.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71686](https://github.com/openclaw/openclaw/pull/71686) | fix: stabilize heartbeat routing and avatar overrides | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71686.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71400](https://github.com/openclaw/openclaw/pull/71400) | feat(sessions): add adaptive reset mode with daily AND idle semantics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71400.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#58823](https://github.com/openclaw/openclaw/pull/58823) | fix(agents): restore global subagent model default priority over agent own model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58823.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#16085](https://github.com/openclaw/openclaw/pull/16085) | Signal: add REST API support for containerized deployments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/16085.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#68677](https://github.com/openclaw/openclaw/pull/68677) | Agents/tool-images: memoize resize to avoid per-turn sharp decode (#64418) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/68677.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71486](https://github.com/openclaw/openclaw/pull/71486) | fix(model): preserve LM Studio \"@\" quant suffixes in model name resolution | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71486.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71582](https://github.com/openclaw/openclaw/pull/71582) | Fix heartbeat exec-event delivery source routing | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71582.md) | complete | Apr 26, 2026, 00:15 UTC |
| [#71412](https://github.com/openclaw/openclaw/issues/71412) | stopChannel abort-timeout leaves zombie task in store, preventing health-monitor restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/71412.md) | complete | Apr 26, 2026, 00:15 UTC |

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
