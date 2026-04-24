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

Last dashboard update: Apr 24, 2026, 05:06 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19103 |
| Reviewed / proposed closes | 2186 / 988 |
| Reviewed files | 2186 |
| Fresh verified reviews in the last 7 days | 2186 |
| Proposed closes awaiting apply | 988 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 16917 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#40154](https://github.com/openclaw/openclaw/issues/40154) | [Bug]: Custom workspace skills with `~/.openclaw/workspace/skills/...` are skipped as “outside configured root” in v2026.3.7 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40154.md) | complete | Apr 24, 2026, 05:05 UTC |
| [#40145](https://github.com/openclaw/openclaw/issues/40145) | [Bug]: Webchat sessions on 2026.3.7 expose zero tools (no web_search/exec even with tools.allow set) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40145.md) | complete | Apr 24, 2026, 05:03 UTC |
| [#40168](https://github.com/openclaw/openclaw/issues/40168) | Agent config model shows 'not found' on gateway restart but works via /model command | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40168.md) | complete | Apr 24, 2026, 05:03 UTC |
| [#40151](https://github.com/openclaw/openclaw/pull/40151) | fix: install bundled extension deps via postinstall hook | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40151.md) | complete | Apr 24, 2026, 05:03 UTC |
| [#40179](https://github.com/openclaw/openclaw/issues/40179) | [Bug]: exec tool does not inherit gateway's environment variables (launchd) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40179.md) | complete | Apr 24, 2026, 05:02 UTC |
| [#40169](https://github.com/openclaw/openclaw/issues/40169) | [Bug]: node work not good | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40169.md) | complete | Apr 24, 2026, 05:02 UTC |
| [#40156](https://github.com/openclaw/openclaw/issues/40156) | [Bug]: v2026.3.7's docker-setup doesn't work | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40156.md) | complete | Apr 24, 2026, 05:02 UTC |
| [#40152](https://github.com/openclaw/openclaw/issues/40152) | Google provider/model resolution: google/<model> ids not normalized (e.g. google/gemini-2.5-flash) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40152.md) | complete | Apr 24, 2026, 05:02 UTC |
| [#40127](https://github.com/openclaw/openclaw/issues/40127) | [Feature] Control UI Login Page 改进 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40127.md) | complete | Apr 24, 2026, 05:02 UTC |
| [#40072](https://github.com/openclaw/openclaw/issues/40072) | chore: remaining unused files and dependencies from knip scan | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40072.md) | complete | Apr 24, 2026, 05:02 UTC |
| [#40131](https://github.com/openclaw/openclaw/issues/40131) | [Bug]: Bundled voice-call plugin (v2026.3.2) returns 200 OK on Telnyx webhooks but does not process inbound calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40131.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40174](https://github.com/openclaw/openclaw/issues/40174) | Test issue | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40174.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40183](https://github.com/openclaw/openclaw/issues/40183) | [Feature] Backend: 统一媒体路径验证逻辑，修复 symlink 工作区问题 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40183.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40155](https://github.com/openclaw/openclaw/issues/40155) | [Bug]: Telegram channel generates different results to WebUI chat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40155.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40144](https://github.com/openclaw/openclaw/issues/40144) | loopDetection: toolCallHistory persists across heartbeat cycles, causing false positives | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40144.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40065](https://github.com/openclaw/openclaw/issues/40065) | Web UI default agent model editor writes to agents.list override instead of agents.defaults.model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40065.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40181](https://github.com/openclaw/openclaw/issues/40181) | LocalMediaAccessError: fs.realpath() breaks media access for symlinked agent workspaces | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40181.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40089](https://github.com/openclaw/openclaw/issues/40089) | Gateway restart (update.run) can leave service dead: bootout without bootstrap | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40089.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40129](https://github.com/openclaw/openclaw/pull/40129) | feat(plugins): add registerOutboundTransform API for outbound text transforms  | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40129.md) | complete | Apr 24, 2026, 05:01 UTC |
| [#40081](https://github.com/openclaw/openclaw/pull/40081) | Fix ACP session init fallback and persist ACP child transcripts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40081.md) | complete | Apr 24, 2026, 05:01 UTC |

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
