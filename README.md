# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable
- stale issue older than 60 days with insufficient data to verify the bug

Everything else stays open.

## Dashboard

Last dashboard update: Apr 24, 2026, 04:04 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19154 |
| Reviewed / proposed closes | 1486 / 661 |
| Reviewed files | 1486 |
| Fresh verified reviews in the last 7 days | 1486 |
| Proposed closes awaiting apply | 661 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17668 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#38538](https://github.com/openclaw/openclaw/pull/38538) | feat(memory): add proxy support for Gemini embedding API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38538.md) | complete | Apr 24, 2026, 04:04 UTC |
| [#38522](https://github.com/openclaw/openclaw/issues/38522) | Feature: Subagent barrier primitive — spawn N, await all, receive combined results | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38522.md) | complete | Apr 24, 2026, 04:04 UTC |
| [#38520](https://github.com/openclaw/openclaw/issues/38520) | Feature: Pre-compaction agent notification, structured handoff window, and deferral mechanism | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38520.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38519](https://github.com/openclaw/openclaw/issues/38519) | Feature: Browser download capture — return downloaded files to agent context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38519.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38540](https://github.com/openclaw/openclaw/pull/38540) | fix(tui): show active run hint on Ctrl+C | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38540.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38534](https://github.com/openclaw/openclaw/pull/38534) | feat(config): add autoDiscover flag to disable Ollama auto-discovery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38534.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38547](https://github.com/openclaw/openclaw/issues/38547) | Feature: native remote session delegation via sessions_spawn with gatewayUrl | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38547.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38544](https://github.com/openclaw/openclaw/pull/38544) | fix(plugins): suppress false-positive duplicate-id warning when user overrides bundled plugin (#38437) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38544.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38517](https://github.com/openclaw/openclaw/issues/38517) | [Bug]: 500: \"Parameters of tool web_search must only have these properties:query\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38517.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38536](https://github.com/openclaw/openclaw/pull/38536) | fix(error): sanitize provider error JSON before displaying to users | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38536.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38504](https://github.com/openclaw/openclaw/pull/38504) | fix(plugins): reorder plugin discovery to prevent duplicate warnings | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38504.md) | complete | Apr 24, 2026, 04:03 UTC |
| [#38476](https://github.com/openclaw/openclaw/pull/38476) | fix(browser): screenshot returns file path instead of embedding base64 in context | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38476.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38487](https://github.com/openclaw/openclaw/issues/38487) | [Bug]: Discord: synthetic channel route uses sender ID as channel ID, causing Unknown Channel delivery failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38487.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38554](https://github.com/openclaw/openclaw/issues/38554) | [Bug]: feishu replying with mp4 msg error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38554.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38532](https://github.com/openclaw/openclaw/pull/38532) | fix(tools): rename web_search tool to oc_web_search to avoid provider collision | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38532.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38507](https://github.com/openclaw/openclaw/issues/38507) | Gateway: provider server_error leaks raw JSON into user-visible chat | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38507.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38549](https://github.com/openclaw/openclaw/pull/38549) | Add ClawNexus community plugin | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/38549.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38497](https://github.com/openclaw/openclaw/issues/38497) | 消息处理 Bug：前置策略配置块导致模型忽略用户实际内容（'吞消息'） | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38497.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38546](https://github.com/openclaw/openclaw/issues/38546) | Title: Skills show as \"ready\" in list but \"not found\" in info, and can't be used by agent Steps to reproduce: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38546.md) | complete | Apr 24, 2026, 04:02 UTC |
| [#38506](https://github.com/openclaw/openclaw/pull/38506) | Add /learn and memory | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/38506.md) | complete | Apr 24, 2026, 04:02 UTC |

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

Parallel workflow shards only receive planned item numbers. The final job merges artifacts and updates this README so the dashboard reflects progress. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

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
