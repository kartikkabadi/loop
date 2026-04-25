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

Last dashboard update: Apr 25, 2026, 05:56 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 05:56 UTC

State: Review publish complete

Merged review artifacts for run 24923896019. Dashboard reflects the latest files and proposed closes from completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24923896019](https://github.com/openclaw/clawsweeper/actions/runs/24923896019)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9133 |
| Fresh reviewed issues in the last 7 days | 8775 |
| Proposed issue closes | 3408 (38.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6178 |
| Fresh reviewed PRs in the last 7 days | 6206 |
| Proposed PR closes | 1580 (25.5% of reviewed PRs) |
| Open items total | 15311 |
| Reviewed files | 14981 |
| Archived closed files | 3269 |
| Fresh verified reviews in the last 7 days | 14981 |
| Proposed closes awaiting apply | 4988 (33.3% of fresh reviews) |
| Closed by Codex apply | 2483 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 330 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#70465](https://github.com/openclaw/openclaw/pull/70465) | fix(gateway): cleanup MCP runtime for nested-lane agent runs to plug sessions_send leak (#70364) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70465.md) | complete | Apr 25, 2026, 05:56 UTC |
| [#70301](https://github.com/openclaw/openclaw/pull/70301) | fix(qqbot): auth-gate bot approve command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70301.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70473](https://github.com/openclaw/openclaw/pull/70473) | fix(agents): derive overflow budgets from provider errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70473.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70394](https://github.com/openclaw/openclaw/pull/70394) | fix(plugins): degrade gracefully instead of crashing worker on invalid config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70394.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70409](https://github.com/openclaw/openclaw/pull/70409) | feat(memory-core): stage-only dreaming maintenance with apply/rollback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70409.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70403](https://github.com/openclaw/openclaw/pull/70403) | fix(memory-core): keep Dream Diary to one entry per sweep | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70403.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70293](https://github.com/openclaw/openclaw/pull/70293) | tasks: avoid false inconsistent_timestamps warnings for pre-started runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70293.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70449](https://github.com/openclaw/openclaw/pull/70449) | google: nest thought_signature under functionCall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70449.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70363](https://github.com/openclaw/openclaw/pull/70363) | feat(auto-reply):\n  run-generation fence for stronger interruptibility (refs #70319) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70363.md) | complete | Apr 25, 2026, 05:55 UTC |
| [#70306](https://github.com/openclaw/openclaw/pull/70306) | fix(acp+gateway): clean final emit, fallback visibility, legacy unit resolve | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70306.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70471](https://github.com/openclaw/openclaw/pull/70471) | Feishu: harden comment reply delivery and bot identity refresh | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70471.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70368](https://github.com/openclaw/openclaw/pull/70368) | fix(security): downgrade trusted_proxies_missing to info on loopback bind | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70368.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70391](https://github.com/openclaw/openclaw/pull/70391) | fix(ui): avoid redundant reload after final chat event | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70391.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70434](https://github.com/openclaw/openclaw/pull/70434) | fix(agents): harden subagent lifecycle calls against transient gateway readiness failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70434.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70372](https://github.com/openclaw/openclaw/pull/70372) | fix: suppress thinking narration leaking into channel messages for Anthropic/Bedrock | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70372.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70448](https://github.com/openclaw/openclaw/pull/70448) | [AGE-6435] Add worktree discipline section to AGENTS.md | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70448.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70268](https://github.com/openclaw/openclaw/pull/70268) | fix: route wake hooks to explicit sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70268.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70397](https://github.com/openclaw/openclaw/pull/70397) | docs: add MLflow AI Gateway provider page | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70397.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70046](https://github.com/openclaw/openclaw/pull/70046) | fix(cron): support HH:MM time-only strings in --at; apply --tz to time-only input | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/70046.md) | complete | Apr 25, 2026, 05:54 UTC |
| [#70444](https://github.com/openclaw/openclaw/pull/70444) | feat: implement OpenWrt extension with WebSocket bridge, device manag… | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/70444.md) | complete | Apr 25, 2026, 05:54 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that scans open items, prioritizes due activity, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically. Review cadence is daily for items with activity since the last stored snapshot, all PRs, and issues younger than 30 days. Older inactive issues are reviewed weekly. When more items are due than fit in a run, the planner prioritizes active items first, then PRs, then new issues, then older weekly reviews.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run plan -- --batch-size 5 --shard-count 40 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
npm run review -- --openclaw-dir ../openclaw --batch-size 5 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast --codex-timeout-ms 600000
npm run apply-artifacts -- --artifact-dir artifacts/reviews
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

- `OPENAI_API_KEY`: OpenAI API key used by Codex.
- `CODEX_API_KEY`: same API key for `codex exec` CI auth.
- `OPENCLAW_GH_TOKEN`: GitHub token with write access to `openclaw/openclaw` issues and PRs.

The workflow logs Codex in with `OPENAI_API_KEY`, passes `CODEX_API_KEY` to `codex exec`, and fails the shard instead of writing fallback review markdown if Codex auth/output fails. It uses `OPENCLAW_GH_TOKEN` for `openclaw/openclaw` comments/closes. The built-in `GITHUB_TOKEN` commits review markdown back to this repo.
