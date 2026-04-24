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

Last dashboard update: Apr 24, 2026, 19:14 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12151 |
| Fresh reviewed issues in the last 7 days | 8765 |
| Proposed issue closes | 4843 (55.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6600 |
| Fresh reviewed PRs in the last 7 days | 4632 |
| Proposed PR closes | 1420 (30.7% of reviewed PRs) |
| Open items total | 18751 |
| Reviewed files | 13397 |
| Archived closed files | 182 |
| Fresh verified reviews in the last 7 days | 13397 |
| Proposed closes awaiting apply | 6263 (46.7% of fresh reviews) |
| Closed by Codex apply | 170 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 5354 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#61617](https://github.com/openclaw/openclaw/issues/61617) | Bug: Cron scheduler triggers duplicate executions for the same job | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61617.md) | complete | Apr 24, 2026, 19:14 UTC |
| [#61628](https://github.com/openclaw/openclaw/issues/61628) | [Feature]: Website interaction | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61628.md) | complete | Apr 24, 2026, 19:13 UTC |
| [#61622](https://github.com/openclaw/openclaw/issues/61622) | [Bug]: No circuit breaker for model_cooldown — session retries indefinitely against hours-long cooldown | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61622.md) | complete | Apr 24, 2026, 19:13 UTC |
| [#61633](https://github.com/openclaw/openclaw/issues/61633) | Fix cron isolated runs stuck in \"running\" causing unbounded session accumulation and gateway OOM crash loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61633.md) | complete | Apr 24, 2026, 19:13 UTC |
| [#61653](https://github.com/openclaw/openclaw/issues/61653) | [Bug]: # Bug Report: exec approval 的命令哈希机制导致 allow-always 无法有效覆盖常用命令 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61653.md) | complete | Apr 24, 2026, 19:12 UTC |
| [#61668](https://github.com/openclaw/openclaw/issues/61668) | Native reply-dispatch path lacks universal pre-send structured-output validation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61668.md) | complete | Apr 24, 2026, 19:12 UTC |
| [#61602](https://github.com/openclaw/openclaw/pull/61602) | docs: add Japanese translations and new documentation for various fea… | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61602.md) | complete | Apr 24, 2026, 19:12 UTC |
| [#61618](https://github.com/openclaw/openclaw/pull/61618) | fix(win): re-enable native jiti loading for dist .js to prevent dual module instances | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61618.md) | complete | Apr 24, 2026, 19:12 UTC |
| [#61667](https://github.com/openclaw/openclaw/issues/61667) | [Bug]: Exact command hashing in `exec` approvals renders `allow-always` ineffective for dynamic commands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61667.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61632](https://github.com/openclaw/openclaw/issues/61632) | iMessage channel shows as unavailable despite being enabled | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61632.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61625](https://github.com/openclaw/openclaw/pull/61625) | voice-call: make agent ID configurable instead of hardcoding main | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61625.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61659](https://github.com/openclaw/openclaw/issues/61659) | [Feature]: Distribute ready-to-use Desktop Installers (.dmg / .exe) via GitHub Releases | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61659.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61549](https://github.com/openclaw/openclaw/issues/61549) | [Bug] CLI fallback constructs MCP config path from cron task prompt string (2026.4.2) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61549.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61616](https://github.com/openclaw/openclaw/issues/61616) | [Bug]: [WSL2] Global 30-min gateway stall (:29/:59) affects Telegram + Control UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61616.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61606](https://github.com/openclaw/openclaw/pull/61606) | [Phase 1] 工具并发执行、Microcompact 和 Autocompact 改进 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61606.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61615](https://github.com/openclaw/openclaw/issues/61615) | AGENTS.md: outdated gateway launch mechanism docs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61615.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61623](https://github.com/openclaw/openclaw/pull/61623) | fix: clean up seqByRun entries when agent runs end | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61623.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61539](https://github.com/openclaw/openclaw/issues/61539) | bug: failed/errored ACP sessions not evicted from concurrent session count | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61539.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61532](https://github.com/openclaw/openclaw/pull/61532) | Lint: enable bundled extension linting incrementally | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61532.md) | complete | Apr 24, 2026, 19:11 UTC |
| [#61612](https://github.com/openclaw/openclaw/pull/61612) | perf(cli): add help fast path for built-in and plugin subcommands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61612.md) | complete | Apr 24, 2026, 19:11 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`.

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
