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

Last dashboard update: Apr 25, 2026, 04:21 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 04:21 UTC

State: Apply finished

Apply run finished with 500 fresh closes out of requested limit 500. See apply-report.json for per-item results.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920206705](https://github.com/openclaw/clawsweeper/actions/runs/24920206705)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9792 |
| Fresh reviewed issues in the last 7 days | 8937 |
| Proposed issue closes | 3789 (42.4% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6244 |
| Fresh reviewed PRs in the last 7 days | 5638 |
| Proposed PR closes | 1489 (26.4% of reviewed PRs) |
| Open items total | 16036 |
| Reviewed files | 14575 |
| Archived closed files | 2652 |
| Fresh verified reviews in the last 7 days | 14575 |
| Proposed closes awaiting apply | 5278 (36.2% of fresh reviews) |
| Closed by Codex apply | 1883 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 1461 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67973](https://github.com/openclaw/openclaw/issues/67973) | semantic-recall hook passes unsanitized message text as shell CLI argument | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67973.md) | complete | Apr 25, 2026, 04:14 UTC |
| [#67967](https://github.com/openclaw/openclaw/pull/67967) | fix(minimax): disable tool call ID sanitization for Anthropic-compatible API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67967.md) | complete | Apr 25, 2026, 04:14 UTC |
| [#68033](https://github.com/openclaw/openclaw/issues/68033) | openai-codex provider broken since 2026.4.5 — Cloudflare challenge + missing OAuth scope | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68033.md) | complete | Apr 25, 2026, 04:14 UTC |
| [#68012](https://github.com/openclaw/openclaw/issues/68012) | Gateway drops image attachments for custom providers despite image input configured | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68012.md) | complete | Apr 25, 2026, 04:14 UTC |
| [#67976](https://github.com/openclaw/openclaw/issues/67976) | [Bug] imageModel调用火山引擎API返回404错误 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67976.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#68032](https://github.com/openclaw/openclaw/issues/68032) | Bug: SELF_IMPROVEMENT_REMINDER.md duplicated 30+ times on compaction loop, causing context overflow and session reset | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68032.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#67902](https://github.com/openclaw/openclaw/issues/67902) | subagent sessions left as \"running\" in sessions.json after crash — no cleanup mechanism | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67902.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#67999](https://github.com/openclaw/openclaw/issues/67999) | Control UI doesn't render new messages dynamically — requires hard refresh | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67999.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#68026](https://github.com/openclaw/openclaw/issues/68026) | [Bug]: 工具参数验证错误触发无限循环（read/web_fetch 等） | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68026.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#67911](https://github.com/openclaw/openclaw/issues/67911) | [FEATURE] Session End Hook for Automatic Commitment/Memory Capture | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67911.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#68018](https://github.com/openclaw/openclaw/issues/68018) | Bug: Subagent deliveryContext does not inherit parent group session — falls back to DM | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68018.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#68013](https://github.com/openclaw/openclaw/issues/68013) | [Bug]: `TypeError: Cannot read properties of undefined (reading 'startsWith') in subsystem file after v2026.4.15 update | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68013.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#67983](https://github.com/openclaw/openclaw/pull/67983) | feat(plugins): expose tool list on llm_input hook event | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67983.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#68021](https://github.com/openclaw/openclaw/issues/68021) | WebChat/Control-UI: Image uploads silently fail — no POST request, no attachments in metadata (2026.4.15) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68021.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#67969](https://github.com/openclaw/openclaw/pull/67969) | fix: surface billing/surface_error chat event to web UI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67969.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#67986](https://github.com/openclaw/openclaw/issues/67986) | [Bug]: Gateway wedges silently mid-session after 2026.4.15 — only recovers on WhatsApp 408 + health monitor restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67986.md) | complete | Apr 25, 2026, 04:13 UTC |
| [#68023](https://github.com/openclaw/openclaw/pull/68023) | feat(gateway): warn when proxy env vars detected but providers not using them | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/68023.md) | complete | Apr 25, 2026, 04:12 UTC |
| [#67966](https://github.com/openclaw/openclaw/issues/67966) | [Feature] Enable Playwright navigation interception for local-managed browser mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67966.md) | complete | Apr 25, 2026, 04:12 UTC |
| [#67975](https://github.com/openclaw/openclaw/issues/67975) | [Bug]: ACPX runtime probes for codex on every startup regardless of allowedAgents — causes EPIPE crash | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67975.md) | complete | Apr 25, 2026, 04:12 UTC |
| [#67988](https://github.com/openclaw/openclaw/issues/67988) | Control UI: Model dropdown shows alias/key instead of display name for Claude Opus 4.7 and Claude Sonnet 4.6 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67988.md) | complete | Apr 25, 2026, 04:12 UTC |

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
