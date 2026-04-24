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

Last dashboard update: Apr 24, 2026, 09:47 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12529 |
| Fresh reviewed issues in the last 7 days | 4107 |
| Proposed issue closes | 2253 (54.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6594 |
| Fresh reviewed PRs in the last 7 days | 2076 |
| Proposed PR closes | 717 (34.5% of reviewed PRs) |
| Open items total | 19123 |
| Reviewed files | 6183 |
| Fresh verified reviews in the last 7 days | 6183 |
| Proposed closes awaiting apply | 2970 (48% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 12940 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#48024](https://github.com/openclaw/openclaw/pull/48024) | fix(telegram): don't persist failed update offsets | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48024.md) | complete | Apr 24, 2026, 09:47 UTC |
| [#48037](https://github.com/openclaw/openclaw/issues/48037) | [Feature]: Allow custom args for Chrome DevTools MCP server in existing-session profile | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48037.md) | complete | Apr 24, 2026, 09:45 UTC |
| [#48077](https://github.com/openclaw/openclaw/pull/48077) | fix(feishu): use routed account context for multi-account tool execution | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48077.md) | complete | Apr 24, 2026, 09:45 UTC |
| [#48060](https://github.com/openclaw/openclaw/pull/48060) | log optimize | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48060.md) | complete | Apr 24, 2026, 09:45 UTC |
| [#48039](https://github.com/openclaw/openclaw/pull/48039) | fix(ui): add CSS constraints for context-notice__icon to prevent overflow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48039.md) | complete | Apr 24, 2026, 09:45 UTC |
| [#48067](https://github.com/openclaw/openclaw/issues/48067) | TUI status bar shows agents.defaults.model instead of resolved agent model | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48067.md) | complete | Apr 24, 2026, 09:45 UTC |
| [#47957](https://github.com/openclaw/openclaw/issues/47957) | [Bug]: CI check/startup-memory/windows-tests globally broken after plugins refactor (2026-03-16) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/47957.md) | complete | Apr 24, 2026, 09:45 UTC |
| [#48084](https://github.com/openclaw/openclaw/issues/48084) | [Bug]: openclaw gateway restart unregisters LaunchAgent and TUI fails to reconnect (macOS) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48084.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48026](https://github.com/openclaw/openclaw/issues/48026) | [Feature]: Cron-on-additional-channels | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48026.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#47978](https://github.com/openclaw/openclaw/issues/47978) | One-shot cron jobs with webchat delivery fail with Telegram validation error | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/47978.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48085](https://github.com/openclaw/openclaw/pull/48085) | fix(cron): handle object model format in cron list (#44084) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48085.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48075](https://github.com/openclaw/openclaw/pull/48075) | fix(commands): support always/inbound/tagged for /tts command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48075.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48028](https://github.com/openclaw/openclaw/issues/48028) | 功能建议：支持 Chrome 146 内置 WebMCP | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48028.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48073](https://github.com/openclaw/openclaw/pull/48073) | Feat/xiaomai openclaw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48073.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48021](https://github.com/openclaw/openclaw/pull/48021) | fix(context): fall back to path basename for unnamed bootstrap files | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48021.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48045](https://github.com/openclaw/openclaw/issues/48045) | [Bug]: Browser tool silently discards downloads and throws \"Download is starting\" error when using CDP connection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48045.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48043](https://github.com/openclaw/openclaw/issues/48043) | [Bug]: Chrome User Profile Attach Broken on Windows | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48043.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48082](https://github.com/openclaw/openclaw/issues/48082) | [Bug]: exec tool SIGSEGV on Feiniu NAS (custom kernel 6.12.18-trim) /exec 工具在飞牛 NAS 上崩溃 (SIGSEGV，定制内核 6.12.18-trim) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48082.md) | complete | Apr 24, 2026, 09:44 UTC |
| [#48036](https://github.com/openclaw/openclaw/issues/48036) | Control UI WebSocket heartbeat timeout popup appears frequently | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48036.md) | complete | Apr 24, 2026, 09:43 UTC |
| [#48047](https://github.com/openclaw/openclaw/issues/48047) | Browser Relay Server 未启动（端口 18792 无响应） | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48047.md) | complete | Apr 24, 2026, 09:43 UTC |

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
