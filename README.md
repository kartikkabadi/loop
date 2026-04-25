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

Last dashboard update: Apr 25, 2026, 03:48 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 03:48 UTC

State: Review publish complete

Merged review artifacts for run 24921620285. Dashboard reflects the latest files and proposed closes from completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24921620285](https://github.com/openclaw/clawsweeper/actions/runs/24921620285)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 9968 |
| Fresh reviewed issues in the last 7 days | 8844 |
| Proposed issue closes | 3819 (43.2% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6307 |
| Fresh reviewed PRs in the last 7 days | 5488 |
| Proposed PR closes | 1464 (26.7% of reviewed PRs) |
| Open items total | 16275 |
| Reviewed files | 14332 |
| Archived closed files | 2495 |
| Fresh verified reviews in the last 7 days | 14332 |
| Proposed closes awaiting apply | 5283 (36.9% of fresh reviews) |
| Closed by Codex apply | 1733 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 1943 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#67273](https://github.com/openclaw/openclaw/pull/67273) | Fix heartbeat async exec delivery leaks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67273.md) | complete | Apr 25, 2026, 03:47 UTC |
| [#67270](https://github.com/openclaw/openclaw/issues/67270) | [Bug] Exec preflight scanner false positives: python3 -c and cd && python3 blocked as obfuscated | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67270.md) | complete | Apr 25, 2026, 03:47 UTC |
| [#67305](https://github.com/openclaw/openclaw/issues/67305) | Feature: readiness-aware queue collect/until-ready flush mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67305.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67243](https://github.com/openclaw/openclaw/pull/67243) | context-engine: pass runtime context to ContextEngineFactory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67243.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67304](https://github.com/openclaw/openclaw/pull/67304) | feat(plugins): add OPENCLAW_JITI_CACHE_DIR env var for jiti fsCache [AI] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67304.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67297](https://github.com/openclaw/openclaw/pull/67297) | fix(compaction): use reserveTokens instead of reserveTokensFloor for memoryFlush and preflight thresholds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67297.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67256](https://github.com/openclaw/openclaw/issues/67256) | [Bug]:在 WeCom（企业微信）通道下，使用 `MEDIA:` 指令发送文件时，文件无法发送。 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67256.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67247](https://github.com/openclaw/openclaw/issues/67247) | [Bug]: [Telegram] Native command menu disappears after upgrade to 4.14 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67247.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67292](https://github.com/openclaw/openclaw/pull/67292) | fix(openai-transport): handle Mistral reasoning_content as non-string delta content | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67292.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67251](https://github.com/openclaw/openclaw/issues/67251) | Windows: CLI subcommands hang with SIGKILL in exec environment (2026.4.14) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67251.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67272](https://github.com/openclaw/openclaw/issues/67272) | [Feature]: Session trigger metadata + exclude cron-triggered sessions from memory-core Dreaming ingestion by default | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67272.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67206](https://github.com/openclaw/openclaw/pull/67206) | fix(logging): invalidate subsystem file loggers when parent logger is rebuilt (#67168) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67206.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67260](https://github.com/openclaw/openclaw/issues/67260) | [Bug]: Native Ollama primary falls back in long-lived Telegram session while fresh runs succeed | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67260.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67307](https://github.com/openclaw/openclaw/issues/67307) | Feature: heartbeat/session ownership claims to avoid duplicate pickup | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67307.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67250](https://github.com/openclaw/openclaw/issues/67250) | [Bug]: Control UI: streaming text disappears when tool calls display is hidden (4.14 regression) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67250.md) | complete | Apr 25, 2026, 03:46 UTC |
| [#67235](https://github.com/openclaw/openclaw/issues/67235) | [Bug]: `models status --probe --agent <id>` uses main auth store instead of the target agent auth store | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67235.md) | complete | Apr 25, 2026, 03:45 UTC |
| [#67290](https://github.com/openclaw/openclaw/pull/67290) | fix(ui): remove duplicate usage page header | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67290.md) | complete | Apr 25, 2026, 03:45 UTC |
| [#67285](https://github.com/openclaw/openclaw/issues/67285) | [Bug] Exec approval errors injected as raw messages into active Telegram channels | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67285.md) | complete | Apr 25, 2026, 03:45 UTC |
| [#67225](https://github.com/openclaw/openclaw/pull/67225) | fix: honor agent-specific thinking defaults on ingress runs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/67225.md) | complete | Apr 25, 2026, 03:45 UTC |
| [#67246](https://github.com/openclaw/openclaw/issues/67246) | fix(ui/markdown.test.ts): remove console.log debug statements | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/67246.md) | complete | Apr 25, 2026, 03:45 UTC |

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
