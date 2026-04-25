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

Last dashboard update: Apr 25, 2026, 20:33 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 20:34 UTC

State: Planning review

Planner is scanning GitHub for the next review candidates. Candidate counts and shard details will be posted after planning completes.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24940065700](https://github.com/openclaw/clawsweeper/actions/runs/24940065700)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 5513 |
| Fresh reviewed issues in the last 7 days | 5500 |
| Proposed issue closes | 106 (1.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 4283 |
| Fresh reviewed PRs in the last 7 days | 4217 |
| Proposed PR closes | 30 (0.7% of reviewed PRs) |
| Open items total | 9796 |
| Reviewed files | 9717 |
| Unreviewed open items | 79 |
| Archived closed files | 9573 |
| Fresh verified reviews in the last 7 days | 9717 |
| Proposed closes awaiting apply | 136 (1.4% of fresh reviews) |
| Closed by Codex apply | 7495 |
| Failed or stale reviews | 0 |
| Daily cadence coverage | 6785/6952 current (167 due, 97.6%) |
| Daily PR cadence | 4151/4217 current (66 due, 98.4%) |
| Daily new issue cadence (<30d) | 2634/2735 current (101 due, 96.3%) |
| Weekly older issue cadence | 2765/2765 current (0 due, 100%) |
| Due now by cadence | 246 |

Recently reviewed:

| Item | Title | Outcome | Status | Review Runtime | Reviewed |
| --- | --- | --- | --- | --- | --- |
| [#62182](https://github.com/openclaw/openclaw/issues/62182) | Config validation rejects `bootstrapMaxCharsPerFile` as unrecognized key (2026.4.5) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62182.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:32 UTC |
| [#62321](https://github.com/openclaw/openclaw/issues/62321) | [Bug] OOM crash when running large parallel subagent tasks — no concurrency cap or memory pressure circuit breaker | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62321.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:32 UTC |
| [#62317](https://github.com/openclaw/openclaw/issues/62317) | /model status shows phantom provider extracted from OpenRouter model ID prefix | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62317.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:32 UTC |
| [#62306](https://github.com/openclaw/openclaw/issues/62306) | [Bug]: Subagent completion announce leaks internal runtime context into Control UI chat and persists it in session history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62306.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62056](https://github.com/openclaw/openclaw/issues/62056) | Feature: Expose Feishu bot added/removed events as hook events | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62056.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62261](https://github.com/openclaw/openclaw/issues/62261) | [Bug]: Dev channel fails to build (preflight lint fails) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62261.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62120](https://github.com/openclaw/openclaw/issues/62120) | [Bug] openclaw-weixin login hangs before QR code appears on OpenClaw 2026.4.5 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62120.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62066](https://github.com/openclaw/openclaw/issues/62066) | Add requireMention: \"strict\" mode to disable implicit thread mention bypass | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62066.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62276](https://github.com/openclaw/openclaw/issues/62276) | [Bug]: 18789 port is in use when the startup of OpenClaw 2026.4.5, when configuring the new dreaming schedule | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62276.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62284](https://github.com/openclaw/openclaw/issues/62284) | feat: time-bounded exec approvals (approve for N minutes/hours) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62284.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:31 UTC |
| [#62226](https://github.com/openclaw/openclaw/issues/62226) | [Bug]: TypeError: undefined is not iterable (cannot read property Symbol(Symbol.iterator)) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62226.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#62140](https://github.com/openclaw/openclaw/issues/62140) | 2026.4.5 post-update recovery can leave launchd gateway token drift after config migration repair | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62140.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#61741](https://github.com/openclaw/openclaw/issues/61741) | [Bug]: Race condition in subagent/session cleanup causes late child stdout to hit cleared active run, leading to announce timeout, missing-session-entry, and orphaned child processes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61741.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#62267](https://github.com/openclaw/openclaw/issues/62267) | Performance: Slow Ollama qwen3:14b prompt ingestion in long-context OpenClaw runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62267.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#62145](https://github.com/openclaw/openclaw/issues/62145) | [Feature]: Rethink login-gate | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62145.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#62051](https://github.com/openclaw/openclaw/issues/62051) | v2026.4.5 regression: worker processes load all plugins, causing CPU saturation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62051.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#61941](https://github.com/openclaw/openclaw/issues/61941) | Gateway does not dispatch LLM hooks to plugin-registered services (opik traces never fire) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61941.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#61922](https://github.com/openclaw/openclaw/issues/61922) | 2026.4.5: `openclaw dashboard` crashes with Maximum call stack size exceeded | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61922.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#62167](https://github.com/openclaw/openclaw/issues/62167) | [Feature]: token usage widged in chat UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62167.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |
| [#62102](https://github.com/openclaw/openclaw/issues/62102) | Paperclip Gateway adapter sends unsupported 'paperclip' field in agent params | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62102.md) | complete | model gpt-5.5, reasoning high | Apr 25, 2026, 20:30 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Pre-hydrates compact related issue/PR context referenced from the item body, comments, timeline, or PR review comments.
5. Runs Codex with `gpt-5.5`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
6. Writes `items/<number>.md` with the decision, proposed close comment, review runtime (`review_model`, `review_reasoning_effort`, sandbox, service tier), and a GitHub snapshot hash.
7. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, runs Codex without the nested Linux sandbox that blocks shell inspection on GitHub runners, checks the checkout again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews. The dashboard reports local cadence coverage for daily PRs, daily new issues, and weekly older issues; activity-based promotion is applied by the planner while scanning GitHub snapshots.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Folder reconciliation also compares tracked files with the current GitHub open set: externally closed items move from `items/` to `closed/`, and reopened archived items move back to `items/` as stale so the planner reviews them again. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. When GitHub secondary throttling triggers a long retry sleep, apply mode posts a best-effort throttle heartbeat to the dashboard with the checkpoint, processed count, and next retry delay. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.5 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
npm run reconcile -- --dry-run
```

Apply unchanged proposals later:

```bash
source ~/.profile
npm run apply-decisions -- --limit 20
```

Manual review runs can set `--apply-closures` or workflow input `apply_closures=true`, but the safer path is proposal first, then `apply_existing=true`.

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
