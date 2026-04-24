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

Last dashboard update: Apr 24, 2026, 14:23 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12570 |
| Fresh reviewed issues in the last 7 days | 6513 |
| Proposed issue closes | 3642 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6618 |
| Fresh reviewed PRs in the last 7 days | 3466 |
| Proposed PR closes | 1133 (32.7% of reviewed PRs) |
| Open items total | 19188 |
| Reviewed files | 9979 |
| Fresh verified reviews in the last 7 days | 9979 |
| Proposed closes awaiting apply | 4775 (47.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 9209 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#54949](https://github.com/openclaw/openclaw/issues/54949) | Duplicate Feishu plugin registration logs in 2026.3.24 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54949.md) | complete | Apr 24, 2026, 14:23 UTC |
| [#54964](https://github.com/openclaw/openclaw/issues/54964) | Session enters zombie state after embedded agent init failure (deactivated_workspace) — no auto-recovery | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54964.md) | complete | Apr 24, 2026, 14:23 UTC |
| [#54955](https://github.com/openclaw/openclaw/issues/54955) | 多渠道会话上下文共享 / Cross-channel context sharing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54955.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54976](https://github.com/openclaw/openclaw/pull/54976) | Add Docker Compose + Ollama (qwen2.5:7b) setup for local running order | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54976.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54921](https://github.com/openclaw/openclaw/pull/54921) | fix: Telegram and core channels not loading when plugin allowlist is enabled | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54921.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54919](https://github.com/openclaw/openclaw/issues/54919) | [Feature]: agents.defaults.thinkingDefault config field not working | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54919.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54934](https://github.com/openclaw/openclaw/pull/54934) | Feishu: reject empty message cards | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54934.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54917](https://github.com/openclaw/openclaw/pull/54917) | fix: resolve gateway handshake race with withProgress spinner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54917.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54928](https://github.com/openclaw/openclaw/issues/54928) | Feature: support custom Exa web_search baseUrl (or fail with explicit schema/docs guidance) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54928.md) | complete | Apr 24, 2026, 14:21 UTC |
| [#54883](https://github.com/openclaw/openclaw/issues/54883) | Telegram routed agent sessions do not honor agents.list[].model per-agent override | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54883.md) | complete | Apr 24, 2026, 14:20 UTC |
| [#54865](https://github.com/openclaw/openclaw/issues/54865) | tools.media with LiteLLM tier aliases (e.g. model=vision) is brittle / misleading | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54865.md) | complete | Apr 24, 2026, 14:20 UTC |
| [#54941](https://github.com/openclaw/openclaw/pull/54941) | fix(ui): include sourceChannel in exec.approval.resolve from Control UI to fix multi-channel setups | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54941.md) | complete | Apr 24, 2026, 14:20 UTC |
| [#54874](https://github.com/openclaw/openclaw/issues/54874) | [Bug] Slow typing in webchat input with keystroke delay | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54874.md) | complete | Apr 24, 2026, 14:20 UTC |
| [#54952](https://github.com/openclaw/openclaw/issues/54952) | Diagnostics gap: no operator-facing way to confirm which routing rule matched for Feishu group chats | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54952.md) | complete | Apr 24, 2026, 14:20 UTC |
| [#54972](https://github.com/openclaw/openclaw/issues/54972) | Feishu: CardKit streaming cards show [Interactive Card] instead of actual content when read by other agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54972.md) | complete | Apr 24, 2026, 14:19 UTC |
| [#54990](https://github.com/openclaw/openclaw/pull/54990) | security(54737): sanitize group metadata to prevent prompt injection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54990.md) | complete | Apr 24, 2026, 14:19 UTC |
| [#54986](https://github.com/openclaw/openclaw/pull/54986) | style(auto): 清理 XXX 注释 — extensions/feishu/src/bitable.ts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54986.md) | complete | Apr 24, 2026, 14:19 UTC |
| [#54836](https://github.com/openclaw/openclaw/issues/54836) | [Bug]: WhatsApp: responses sent twice (duplicate messages) via webchat surface | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/54836.md) | complete | Apr 24, 2026, 14:19 UTC |
| [#54959](https://github.com/openclaw/openclaw/pull/54959) | docs: add OpenShell deployment guide | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54959.md) | complete | Apr 24, 2026, 14:19 UTC |
| [#54983](https://github.com/openclaw/openclaw/issues/54983) | feat: Add vLLM reasoning/thinking toggle support (enable_thinking parameter) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/54983.md) | complete | Apr 24, 2026, 14:19 UTC |

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
