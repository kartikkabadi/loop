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

Last dashboard update: Apr 24, 2026, 05:18 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19104 |
| Reviewed / proposed closes | 2386 / 1090 |
| Reviewed files | 2386 |
| Fresh verified reviews in the last 7 days | 2386 |
| Proposed closes awaiting apply | 1090 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 16718 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#40560](https://github.com/openclaw/openclaw/pull/40560) | feat(gateway): add actionable fix suggestions to config errors | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40560.md) | complete | Apr 24, 2026, 05:18 UTC |
| [#40531](https://github.com/openclaw/openclaw/issues/40531) | [Bug]: Cron announce delivery to Feishu fails with \"Action send requires a target\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40531.md) | complete | Apr 24, 2026, 05:17 UTC |
| [#40525](https://github.com/openclaw/openclaw/issues/40525) | 请求添加网页搜索/浏览功能 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40525.md) | complete | Apr 24, 2026, 05:17 UTC |
| [#40576](https://github.com/openclaw/openclaw/issues/40576) | [Bug]:   Critical Error: \"Invalid URL\" in Chat and Terminal after recent update (v2026.3.7/8) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40576.md) | complete | Apr 24, 2026, 05:17 UTC |
| [#40563](https://github.com/openclaw/openclaw/issues/40563) | [Bug]: Bug]: [Windows] Agent/auth lookup uses wrong state directory path (missing backslash between username and .openclaw)  Agent/auth 查找使用错误的状态目录路径（用户名与 .openclaw 之间缺少反斜杠） | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40563.md) | complete | Apr 24, 2026, 05:17 UTC |
| [#40568](https://github.com/openclaw/openclaw/issues/40568) | [Bug]: 百炼 GLM-5 tool calling fails with \"at '/required': got null, want array\ | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40568.md) | complete | Apr 24, 2026, 05:17 UTC |
| [#40585](https://github.com/openclaw/openclaw/pull/40585) | fix(ws): hard-fallback when replay boundary/tool-call pairing is invalid | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40585.md) | complete | Apr 24, 2026, 05:17 UTC |
| [#40550](https://github.com/openclaw/openclaw/issues/40550) | [Bug] openclaw gateway stop/start fails to recover on macOS 26 — service removed but never re-registered | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40550.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40562](https://github.com/openclaw/openclaw/issues/40562) | Feature: Cross-App Control — interact with native apps (macOS/iOS) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40562.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40605](https://github.com/openclaw/openclaw/issues/40605) | [Bug]: Sub-agent completion trigger message skipped when direct delivery succeeds (group topic sessions) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40605.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40472](https://github.com/openclaw/openclaw/pull/40472) | fix(tui): refresh on external session reset and clear stale run state | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40472.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40529](https://github.com/openclaw/openclaw/issues/40529) | [Bug] \"request ended without sending any chunks\" not classified as retryable error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40529.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40535](https://github.com/openclaw/openclaw/pull/40535) | fix(exec-approvals): reject non-persistable allow-always approvals | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40535.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40536](https://github.com/openclaw/openclaw/issues/40536) | [Feature]: Per-Skill Model Override | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40536.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40546](https://github.com/openclaw/openclaw/issues/40546) | Partial landing of PR #22304 in 2026.3.7? launchd runtime shows stopped, but lifecycle-core still hint-only on not-loaded | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40546.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40547](https://github.com/openclaw/openclaw/issues/40547) | [Bug]: Exec Approval is in a mess. Indepedent multi-agent has conflicting exec permission at times | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40547.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40589](https://github.com/openclaw/openclaw/pull/40589) | Add Baidu Qianfan Coding provider | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40589.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40447](https://github.com/openclaw/openclaw/pull/40447) | docs: fix message send flag and claude-max-api-proxy links (#10458, #… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40447.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40580](https://github.com/openclaw/openclaw/pull/40580) | docs(zh-CN): fix Lark link format in Feishu documentation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/40580.md) | complete | Apr 24, 2026, 05:16 UTC |
| [#40534](https://github.com/openclaw/openclaw/pull/40534) | fix(cron): filter reasoning/thinking payloads from announce delivery | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/40534.md) | complete | Apr 24, 2026, 05:16 UTC |

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
