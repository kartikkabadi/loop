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

Last dashboard update: Apr 24, 2026, 11:15 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12541 |
| Fresh reviewed issues in the last 7 days | 4821 |
| Proposed issue closes | 2654 (55.1% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6599 |
| Fresh reviewed PRs in the last 7 days | 2558 |
| Proposed PR closes | 871 (34.1% of reviewed PRs) |
| Open items total | 19140 |
| Reviewed files | 7379 |
| Fresh verified reviews in the last 7 days | 7379 |
| Proposed closes awaiting apply | 3525 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 11761 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#50176](https://github.com/openclaw/openclaw/pull/50176) | fix(agents): ignore historical replies when subscribing to embedded sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50176.md) | complete | Apr 24, 2026, 11:15 UTC |
| [#50177](https://github.com/openclaw/openclaw/pull/50177) | fix(webchat): slash menu clipped by overflow and missing keyboard scroll | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50177.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50178](https://github.com/openclaw/openclaw/issues/50178) | [Bug]: 400 thinking is enabled, but reasoning_content is missing in assistant tool call message at index 12 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50178.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50159](https://github.com/openclaw/openclaw/pull/50159) | fix: add path existence check for config set command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50159.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50157](https://github.com/openclaw/openclaw/pull/50157) | fix: change Ollama connection failure log level from warn to debug | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50157.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50173](https://github.com/openclaw/openclaw/issues/50173) | [Bug]: memory_search tool not injected in new sessions despite plugin loaded | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50173.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50156](https://github.com/openclaw/openclaw/issues/50156) | Control UI shows two \"default\" model options when only one agent is configured[Bug]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50156.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50145](https://github.com/openclaw/openclaw/issues/50145) | interrupt queue mode replays previous assistant reply after abort | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50145.md) | complete | Apr 24, 2026, 11:14 UTC |
| [#50174](https://github.com/openclaw/openclaw/issues/50174) | [Bug]: Windows native: Telegram polling stalls every ~107s (UND_ERR_CONNECT_TIMEOUT) + Discord disconnect restarts while gateway stays healthy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50174.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50171](https://github.com/openclaw/openclaw/pull/50171) | fix(discord): gate exec approvals by turn source channel | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50171.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50190](https://github.com/openclaw/openclaw/issues/50190) | [Feature]: 对话框不能输出图片和视频，希望增加图片和视频的输出 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50190.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50158](https://github.com/openclaw/openclaw/pull/50158) | fix: add format validation for gateway.nodes.denyCommands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50158.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50195](https://github.com/openclaw/openclaw/issues/50195) | WhatsApp: support pre-built link previews in sendMessage + batch send RPC method | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50195.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50189](https://github.com/openclaw/openclaw/pull/50189) | fix(cron): report ok status when primary delivery succeeded despite follow-up errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50189.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50199](https://github.com/openclaw/openclaw/issues/50199) | Feature Request: Add Skill Priority Configuration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50199.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50107](https://github.com/openclaw/openclaw/issues/50107) | [Bug]: NVIDIA Provider Sends Anthropic-Style Message Format to OpenAI-Compatible API | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50107.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50154](https://github.com/openclaw/openclaw/issues/50154) | [Bug]: macOS LaunchAgent gateway fails to push to LAN GitLab over SSH, foreground gateway works | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50154.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50186](https://github.com/openclaw/openclaw/issues/50186) | [Feature]: Surface systemd gateway hygiene issues in doctor/status and consider safer KillMode defaults | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50186.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50193](https://github.com/openclaw/openclaw/pull/50193) | feat(ui): group model selector by provider in tree structure | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/50193.md) | complete | Apr 24, 2026, 11:13 UTC |
| [#50169](https://github.com/openclaw/openclaw/issues/50169) | [Bug]: openclaw cron` command causes Gateway restart failure (lock timeout) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/50169.md) | complete | Apr 24, 2026, 11:13 UTC |

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
