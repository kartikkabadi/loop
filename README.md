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

Last dashboard update: Apr 25, 2026, 04:03 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 04:03 UTC

State: Review in progress

Planned 200 items across 40 shards. Capacity is 200 items. Review shards are starting; publish will merge artifacts when they finish.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24922096942](https://github.com/openclaw/clawsweeper/actions/runs/24922096942)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9903 |
| Fresh reviewed issues in the last 7 days | 8911 |
| Proposed issue closes | 3823 (42.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6296 |
| Fresh reviewed PRs in the last 7 days | 5568 |
| Proposed PR closes | 1479 (26.6% of reviewed PRs) |
| Open items total | 16199 |
| Reviewed files | 14479 |
| Archived closed files | 2548 |
| Fresh verified reviews in the last 7 days | 14479 |
| Proposed closes awaiting apply | 5302 (36.6% of fresh reviews) |
| Closed by Codex apply | 1783 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 1720 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67639](https://github.com/openclaw/openclaw/pull/67639) | fix(status): preserve activation source config for memory probe | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67639.md) | complete | Apr 25, 2026, 04:00 UTC |
| [#67606](https://github.com/openclaw/openclaw/issues/67606) | Bug: Sending photos via Telegram crashes session with ollama/glm-5.1 (text-only primary model) — provider rejects format error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67606.md) | complete | Apr 25, 2026, 04:00 UTC |
| [#67655](https://github.com/openclaw/openclaw/pull/67655) | fix(exec): fail closed on Windows shell wrappers in allowlist mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67655.md) | complete | Apr 25, 2026, 04:00 UTC |
| [#67647](https://github.com/openclaw/openclaw/pull/67647) | fix(compact): use resolved context tokens in summary | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67647.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67609](https://github.com/openclaw/openclaw/issues/67609) | [Bug]: google-gemini-cli provider routes OAuth requests to generativelanguage.googleapis.com (403) instead of cloudcode-pa.googleapis.com | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67609.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67653](https://github.com/openclaw/openclaw/issues/67653) | [Bug]: Windows: Gateway startup takes ~60s before Discord comes online | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67653.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67573](https://github.com/openclaw/openclaw/issues/67573) | /new and /reset commands should clear session-level model override to respect agents.defaults.model configuration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67573.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67631](https://github.com/openclaw/openclaw/issues/67631) | [Bug]: Mac App and npm CLI both install same LaunchAgent label causing duplicate gateway processes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67631.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67626](https://github.com/openclaw/openclaw/issues/67626) | [Bug]: 越更新越更的像屎一样 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67626.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67590](https://github.com/openclaw/openclaw/issues/67590) | [Feature] 渠道绑定配置 - 工具调用过程流式输出到频道 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67590.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67636](https://github.com/openclaw/openclaw/issues/67636) | feat: cost-observer skill — per-agent/channel/user spend tracking | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67636.md) | complete | Apr 25, 2026, 03:59 UTC |
| [#67648](https://github.com/openclaw/openclaw/issues/67648) | [Bug]: SKILL.md changes don't auto-execute - category-mapping.json not read | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67648.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67662](https://github.com/openclaw/openclaw/pull/67662) | fix(run): preserve model-scoped cooldown writes on incomplete turns | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67662.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67619](https://github.com/openclaw/openclaw/issues/67619) | [Bug]: Agent response context lost after switching between chat sessions without explicit save | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67619.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67630](https://github.com/openclaw/openclaw/pull/67630) | fix(memory): guard against stale qmdManagerCache singleton causing memory_search TypeError | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67630.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67611](https://github.com/openclaw/openclaw/issues/67611) | [Feature]: Automatic Cleanup of Dreaming sessions. | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67611.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67652](https://github.com/openclaw/openclaw/pull/67652) | fix(reply-payload): preserve media alias attachments | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67652.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67610](https://github.com/openclaw/openclaw/issues/67610) | [Bug]: requireSandboxBackendFactory throw error after sandbox plugin registered in openclaw starting stage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67610.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67671](https://github.com/openclaw/openclaw/issues/67671) | [Feature]: add single-job inspection by id | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67671.md) | complete | Apr 25, 2026, 03:58 UTC |
| [#67623](https://github.com/openclaw/openclaw/pull/67623) | fix: Change the scope of the variable SANDBOX_BACKEND_FACTORIES from … | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67623.md) | complete | Apr 25, 2026, 03:58 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Uses a planner job that selects the next open items once, starting from `#1`, and hands explicit item-number batches to review shards.
3. Checks out `openclaw/openclaw` at `main`, with cached git objects for faster startup.
4. Runs Codex with `gpt-5.4`, medium reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before every review, makes the checkout read-only in CI, checks it again after review, and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

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
