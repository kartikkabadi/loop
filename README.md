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

Last dashboard update: Apr 24, 2026, 19:30 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12044 |
| Fresh reviewed issues in the last 7 days | 8921 |
| Proposed issue closes | 4937 (55.3% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6583 |
| Fresh reviewed PRs in the last 7 days | 4676 |
| Proposed PR closes | 1437 (30.7% of reviewed PRs) |
| Open items total | 18627 |
| Reviewed files | 13597 |
| Archived closed files | 182 |
| Fresh verified reviews in the last 7 days | 13597 |
| Proposed closes awaiting apply | 6374 (46.9% of fresh reviews) |
| Closed by Codex apply | 170 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 5030 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#62031](https://github.com/openclaw/openclaw/issues/62031) | [Bug]: Telegram channel fails to initialize after gateway restart - silent failure | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62031.md) | complete | Apr 24, 2026, 19:30 UTC |
| [#62051](https://github.com/openclaw/openclaw/issues/62051) | v2026.4.5 regression: worker processes load all plugins, causing CPU saturation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62051.md) | complete | Apr 24, 2026, 19:29 UTC |
| [#62017](https://github.com/openclaw/openclaw/issues/62017) | Heartbeat agent ignores its own fallback chain, uses agents.defaults.model.fallbacks instead | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62017.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#62020](https://github.com/openclaw/openclaw/issues/62020) | conversation_messages table missing parent_message_id column (gateway crashes on every message) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62020.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#62054](https://github.com/openclaw/openclaw/issues/62054) | Subagent announce silently drops results after retry exhaustion | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62054.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#61994](https://github.com/openclaw/openclaw/issues/61994) | [Feishu] Group chat session abnormally ends (status: done) causing no response to group messages, DM works fine | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61994.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#62047](https://github.com/openclaw/openclaw/issues/62047) | [Bug]: fallover loop | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62047.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#61993](https://github.com/openclaw/openclaw/issues/61993) | [Docs]: Document valid `models.providers.<name>.api` format options and baseUrl behavior | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61993.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#61992](https://github.com/openclaw/openclaw/issues/61992) | [Feature] Make typing indicator timeout configurable by users | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61992.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#61958](https://github.com/openclaw/openclaw/issues/61958) | CLI crashes with ERR_INTERNAL_ASSERTION at loadChannelConfigSurfaceModuleSync in v2026.4.5 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/61958.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#62046](https://github.com/openclaw/openclaw/issues/62046) | Discord: intents.messageContent config key missing — Message Content Intent not requestable | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62046.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#62026](https://github.com/openclaw/openclaw/issues/62026) | [MCP] Process pool lifecycle bug: uvx minimax-coding-plan-mcp processes never cleaned up, causing memory leak (88 processes, ~6GB) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62026.md) | complete | Apr 24, 2026, 19:28 UTC |
| [#62024](https://github.com/openclaw/openclaw/issues/62024) | [Bug]: Discord cron delivery fix — 2026-04-02 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62024.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#62036](https://github.com/openclaw/openclaw/issues/62036) | Telegram messages truncated/split incorrectly in forum topics | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62036.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#62042](https://github.com/openclaw/openclaw/issues/62042) | Slack proactive DM delivery fails while direct chat.postMessage to user ID succeeds | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62042.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#62055](https://github.com/openclaw/openclaw/issues/62055) | Windows: CLI crashes with stack overflow / heap OOM on v2026.4.5 (large ESM module graph exceeds V8 default stack) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/62055.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#61997](https://github.com/openclaw/openclaw/issues/61997) | LM Studio local model timeout with Invalid type for input error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/61997.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#62049](https://github.com/openclaw/openclaw/issues/62049) | [Bug]: False-positive \"plugins.allow is empty\" warning in openclaw status (2026.4.5) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62049.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#62041](https://github.com/openclaw/openclaw/issues/62041) | Possible regression: less explicit prompt/tooling guidance may increase wrong media-send tool choice in v2026.4.5 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62041.md) | complete | Apr 24, 2026, 19:27 UTC |
| [#62048](https://github.com/openclaw/openclaw/pull/62048) | fix: use dist/extensions for OPENCLAW_BUNDLED_PLUGINS_DIR to fix Node 24 crash | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/62048.md) | complete | Apr 24, 2026, 19:27 UTC |

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
