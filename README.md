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

Last dashboard update: Apr 26, 2026, 01:53 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 26, 2026, 01:53 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24945688691](https://github.com/openclaw/clawsweeper/actions/runs/24945688691)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5349 |
| Fresh reviewed issues in the last 7 days | 5299 |
| Proposed issue closes | 834 (15.7% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4251 |
| Fresh reviewed PRs in the last 7 days | 4150 |
| Proposed PR closes | 82 (2% of reviewed PRs) |
| Open items total | 9600 |
| Reviewed files | 9450 |
| Unreviewed open items | 150 |
| Archived closed files | 9847 |
| Fresh verified reviews in the last 7 days | 9449 |
| Proposed closes awaiting apply | 916 (9.7% of fresh reviews) |
| Closed by Codex apply | 7632 |
| Failed or stale reviews | 1 |
| Hourly cadence coverage | 24/1059 current (1035 due, 2.3%) |
| Hourly hot item cadence (<7d) | 24/1059 current (1035 due, 2.3%) |
| Daily cadence coverage | 5695/5763 current (68 due, 98.8%) |
| Daily PR cadence | 3608/3671 current (63 due, 98.3%) |
| Daily new issue cadence (<30d) | 2087/2092 current (5 due, 99.8%) |
| Weekly older issue cadence | 2627/2628 current (1 due, 100%) |
| Due now by cadence | 1254 |

### Latest Run Activity

Latest review: Apr 26, 2026, 01:51 UTC. Latest close: Apr 26, 2026, 01:49 UTC. Latest comment sync: Apr 26, 2026, 01:49 UTC.

| Window | Reviews | Close decisions | Keep-open decisions | Failed/stale reviews | Closed | Comments synced | Apply skips |
| --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| Last 15 minutes | 250 | 22 | 228 | 0 | 19 | 120 | 0 |
| Last hour | 841 | 136 | 705 | 1 | 49 | 389 | 6 |
| Last 24 hours | 11775 | 2917 | 8858 | 15 | 5654 | 452 | 201 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64536](https://github.com/openclaw/openclaw/issues/64536) | ACPX: plugin-tools MCP bridge disconnects after sessions_send triggers new run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64536.md) | complete | Apr 26, 2026, 01:51 UTC |
| [#49469](https://github.com/openclaw/openclaw/issues/49469) | 飞书官方插件加载失败 - feishu-openclaw-plugin error 状态 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/49469.md) | complete | Apr 26, 2026, 01:51 UTC |
| [#64525](https://github.com/openclaw/openclaw/issues/64525) | [Bug]: message_received plugin hook does not fire for queued/in-flight inbound messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64525.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64476](https://github.com/openclaw/openclaw/issues/64476) | [Bug]: Windows local gateway has partial RPC failures/timeouts on v2026.4.9 even when gateway process is running | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64476.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64559](https://github.com/openclaw/openclaw/pull/64559) | fix(plugins): emit message_received hook for queued inbound messages (#64525) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64559.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64507](https://github.com/openclaw/openclaw/issues/64507) | Feature: Agent default delivery target for cross-session message calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64507.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64416](https://github.com/openclaw/openclaw/pull/64416) | fix(acp): normalize completion delivery guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64416.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64587](https://github.com/openclaw/openclaw/pull/64587) | feat(zai): add Z.AI Web Search API as a bundled web_search provider [AI] | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64587.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64490](https://github.com/openclaw/openclaw/pull/64490) | CLI: escape zsh completion descriptions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64490.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64448](https://github.com/openclaw/openclaw/issues/64448) | 🐛 [Feishu] 发送图片时偶发重复发送（WS重连导致） | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64448.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#66038](https://github.com/openclaw/openclaw/issues/66038) | [Bug] Upgrade: entry.js hardcode + non-atomic service restart + TOKEN plist pollution | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/66038.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64556](https://github.com/openclaw/openclaw/issues/64556) | [Bug]: hooks.mappings[].agentId and sessionKey silently ignored for action=\"wake\ | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64556.md) | complete | Apr 26, 2026, 01:50 UTC |
| [#64426](https://github.com/openclaw/openclaw/issues/64426) | [Proposal]: Add same-turn reread guard for first-class read tool to reduce token burn | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64426.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64551](https://github.com/openclaw/openclaw/issues/64551) | [Bug]: macOS node connected but missing system.run.prepare, causing exec host=node to fail | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64551.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64383](https://github.com/openclaw/openclaw/issues/64383) | [Feature]: Evaluate simplifying the sandbox browser CDP path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64383.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64444](https://github.com/openclaw/openclaw/pull/64444) | docs: add installation guide for IBM Z / s390x (LinuxONE) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64444.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64663](https://github.com/openclaw/openclaw/pull/64663) | fix: allow symlinked OPENCLAW_HOME in exec approvals path check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64663.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64463](https://github.com/openclaw/openclaw/issues/64463) | Feature request: session.maxDurationMinutes and session.maxTokensPerSession config keys | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64463.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64600](https://github.com/openclaw/openclaw/pull/64600) | Add bundled Servepath provider with onboarding + API-key setup | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64600.md) | complete | Apr 26, 2026, 01:49 UTC |
| [#64481](https://github.com/openclaw/openclaw/issues/64481) | Support tool_choice parameter for vLLM/gemma-4 models | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64481.md) | complete | Apr 26, 2026, 01:49 UTC |

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
