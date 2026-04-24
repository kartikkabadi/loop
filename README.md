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

Last dashboard update: Apr 24, 2026, 04:50 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19100 |
| Reviewed / proposed closes | 1986 / 889 |
| Reviewed files | 1986 |
| Fresh verified reviews in the last 7 days | 1986 |
| Proposed closes awaiting apply | 889 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 17114 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#39785](https://github.com/openclaw/openclaw/pull/39785) | fix(config): respect explicit input modalities override in provider model merge | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39785.md) | complete | Apr 24, 2026, 04:50 UTC |
| [#39779](https://github.com/openclaw/openclaw/issues/39779) | Control UI: Auto-fallback from localhost to 127.0.0.1 when WebSocket connection fails | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39779.md) | complete | Apr 24, 2026, 04:49 UTC |
| [#39692](https://github.com/openclaw/openclaw/pull/39692) | Localize control UI hardcoded strings to zh-CN | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39692.md) | complete | Apr 24, 2026, 04:48 UTC |
| [#39748](https://github.com/openclaw/openclaw/pull/39748) | fix(nostr): validate relay URLs require WebSocket protocol (wss/ws) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39748.md) | complete | Apr 24, 2026, 04:48 UTC |
| [#39774](https://github.com/openclaw/openclaw/pull/39774) | fix(synology-chat): preserve 0 rate limit and fallback invalid env to default | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39774.md) | complete | Apr 24, 2026, 04:48 UTC |
| [#39694](https://github.com/openclaw/openclaw/issues/39694) | [Feature]: Session lifecycle hooks — onBeforeNew / onBeforeCompact | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39694.md) | complete | Apr 24, 2026, 04:48 UTC |
| [#39773](https://github.com/openclaw/openclaw/pull/39773) | fix(session): correct totalTokensFresh flag for fallback path | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39773.md) | complete | Apr 24, 2026, 04:48 UTC |
| [#39718](https://github.com/openclaw/openclaw/issues/39718) | [Bug]: Telegram streaming replies briefly show Deleted message as the quoted reply target on OpenClaw 2026.3.7 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39718.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39772](https://github.com/openclaw/openclaw/pull/39772) | fix(telegram): apply reply_to only to first stream preview to avoid 'Deleted message' | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39772.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39676](https://github.com/openclaw/openclaw/pull/39676) | feat: add onQueued callback for user-visible feedback when messages are queued | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39676.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39685](https://github.com/openclaw/openclaw/issues/39685) | [Feature]: Network Access Control (allowedDomains / denyDomains) — Egress Firewall | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39685.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39780](https://github.com/openclaw/openclaw/issues/39780) | Control UI: Config upgrade/hardening suggestions should apply changes automatically with before/after diff and user acceptance, not direct users to edit files manually | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39780.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39612](https://github.com/openclaw/openclaw/issues/39612) | Feature: Graceful error handling for LLM failures — never expose raw errors to users | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39612.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39674](https://github.com/openclaw/openclaw/issues/39674) | [Bug]: agents.defaults.heartbeat.target的设置毫无作用 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39674.md) | complete | Apr 24, 2026, 04:47 UTC |
| [#39697](https://github.com/openclaw/openclaw/issues/39697) | llm-task plugin missing module: pi-embedded-runner.js | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39697.md) | complete | Apr 24, 2026, 04:46 UTC |
| [#39614](https://github.com/openclaw/openclaw/issues/39614) | [Feature]: Per-channel TTS voice — different voices for DMs, group chats, and topics | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39614.md) | complete | Apr 24, 2026, 04:46 UTC |
| [#39716](https://github.com/openclaw/openclaw/pull/39716) | fix: resolve Control UI token field mismatch between client and server | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/39716.md) | complete | Apr 24, 2026, 04:46 UTC |
| [#39714](https://github.com/openclaw/openclaw/pull/39714) | Sandbox: fix Dockerized browser bridge and tab creation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39714.md) | complete | Apr 24, 2026, 04:46 UTC |
| [#39766](https://github.com/openclaw/openclaw/pull/39766) | fix(config): make models.providers.<id>.models optional to allow credential-only entries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39766.md) | complete | Apr 24, 2026, 04:46 UTC |
| [#39661](https://github.com/openclaw/openclaw/issues/39661) | Feature: Discord channel-level per-user mention policy for agent replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/39661.md) | complete | Apr 24, 2026, 04:46 UTC |

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
