# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per open item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 25, 2026, 20:49 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 20:44 UTC

State: Review publish complete

Merged review artifacts for run 24940065700. Folder reconciliation moved tracked files to match current GitHub open/closed state, and the dashboard reflects completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24940065700](https://github.com/openclaw/clawsweeper/actions/runs/24940065700)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5514 |
| Fresh reviewed issues in the last 7 days | 5502 |
| Proposed issue closes | 126 (2.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4282 |
| Fresh reviewed PRs in the last 7 days | 4219 |
| Proposed PR closes | 31 (0.7% of reviewed PRs) |
| Open items total | 9796 |
| Reviewed files | 9721 |
| Unreviewed open items | 75 |
| Archived closed files | 9576 |
| Fresh verified reviews in the last 7 days | 9721 |
| Proposed closes awaiting apply | 157 (1.6% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6779/6955 current (176 due, 97.5%) |
| Daily PR cadence | 4110/4219 current (109 due, 97.4%) |
| Daily new issue cadence (<30d) | 2669/2736 current (67 due, 97.6%) |
| Weekly older issue cadence | 2766/2766 current (0 due, 100%) |
| Due now by cadence | 251 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#62848](https://github.com/openclaw/openclaw/issues/62848) | [Bug] Main lane failover is too slow for provider transport failures, allowing TUI/Telegram degradation before fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62848.md) | complete | Apr 25, 2026, 20:43 UTC |
| [#62735](https://github.com/openclaw/openclaw/issues/62735) | Regression: `api: \"ollama\"` rejected for custom-URL providers; no working path for `num_ctx` injection through a local proxy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62735.md) | complete | Apr 25, 2026, 20:42 UTC |
| [#62754](https://github.com/openclaw/openclaw/issues/62754) | Gateway: unhandled promise rejection from pi-agent-core Agent.processEvents after run abort/timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62754.md) | complete | Apr 25, 2026, 20:42 UTC |
| [#62763](https://github.com/openclaw/openclaw/issues/62763) | openclaw doctor --fix corrupts signal multi-account config by inventing a phantom accounts.default block | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62763.md) | complete | Apr 25, 2026, 20:42 UTC |
| [#62791](https://github.com/openclaw/openclaw/issues/62791) | [Bug]: Gateway crashes on Node 24.14.0 — two distinct causes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62791.md) | complete | Apr 25, 2026, 20:42 UTC |
| [#62839](https://github.com/openclaw/openclaw/issues/62839) | [Bug]: openclaw update persists HTTP_PROXY into systemd service, breaking Feishu integration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62839.md) | complete | Apr 25, 2026, 20:42 UTC |
| [#62762](https://github.com/openclaw/openclaw/issues/62762) | Gateway 1006 closed-before-connect repro still present on 2026.4.12 after Node 24 normalization and ACP/Discord isolation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62762.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62777](https://github.com/openclaw/openclaw/issues/62777) | cron: failureAlert never fires + channel: prefix stripped in delivery path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62777.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62820](https://github.com/openclaw/openclaw/issues/62820) | [Bug]: Models generating text-based tool calls send raw XML to messaging channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62820.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62847](https://github.com/openclaw/openclaw/issues/62847) | [Bug] Main session can brick on arcee/trinity-large-thinking: repeated connection errors, TUI spam, Telegram nonresponsive until delayed fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62847.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62711](https://github.com/openclaw/openclaw/issues/62711) | [Bug]: OpenClaw cannot receive Signal messages | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62711.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62743](https://github.com/openclaw/openclaw/issues/62743) | [Bug]: 详细描述“始终允许”按钮故障的问题 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62743.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62851](https://github.com/openclaw/openclaw/issues/62851) | [Bug] arcee/trinity-large-thinking works as subagent but fails as main session, suggesting lane/path mismatch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62851.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62717](https://github.com/openclaw/openclaw/issues/62717) | v2026.4.2 gateway memory leak: RSS grows to 3-4GB within 1-2 hours, silent OOM crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62717.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62854](https://github.com/openclaw/openclaw/issues/62854) | Bug: update_plan tool causes problems on OpenAI/Codex providers in v2026.4.5 (regression vs 2026.4.2) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62854.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62692](https://github.com/openclaw/openclaw/issues/62692) | web_search tool not injected for local models (llama-server / OpenAI-compatible backends) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62692.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62842](https://github.com/openclaw/openclaw/issues/62842) | [Bug]: openclaw config command extremely slow (6-9 seconds) while other commands are fast | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62842.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62700](https://github.com/openclaw/openclaw/issues/62700) | feat(plugins): Native per-agent plugin scoping via agents.list[].plugins.allow/deny config | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62700.md) | complete | Apr 25, 2026, 20:41 UTC |
| [#62725](https://github.com/openclaw/openclaw/issues/62725) | Per-agent typingMode support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62725.md) | complete | Apr 25, 2026, 20:40 UTC |
| [#62780](https://github.com/openclaw/openclaw/issues/62780) | Feature: message:before_send hook to enable content-quality fallback gating | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62780.md) | complete | Apr 25, 2026, 20:40 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes during review. `apply_existing=true` is the only workflow mode that comments or closes items.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
6. Writes `items/<number>.md` with the decision, proposed close comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. A review policy change, including model, reasoning effort, sandbox, service tier, prompt, or schema changes, also makes old reports due again. When more items are due than fit in a run, the planner prioritizes active items first, then policy-stale reports, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Transient GitHub API/network failures use shorter retries so long scans can survive connection resets or gateway errors. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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

The workflow logs Codex in with `OPENAI_API_KEY`, then runs review shards without OpenAI, Codex, or GitHub token environment variables. Parent ClawSweeper code uses `OPENCLAW_GH_TOKEN` to gather target and related GitHub context before invoking Codex. `codex exec` uses the prepared login state, and the shard fails instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
