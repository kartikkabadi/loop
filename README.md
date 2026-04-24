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

Last dashboard update: Apr 24, 2026, 16:57 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12526 |
| Fresh reviewed issues in the last 7 days | 7834 |
| Proposed issue closes | 4390 (56% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6614 |
| Fresh reviewed PRs in the last 7 days | 4103 |
| Proposed PR closes | 1295 (31.6% of reviewed PRs) |
| Open items total | 19140 |
| Reviewed files | 11937 |
| Archived closed files | 42 |
| Fresh verified reviews in the last 7 days | 11937 |
| Proposed closes awaiting apply | 5685 (47.6% of fresh reviews) |
| Closed by Codex apply | 30 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 7203 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#58698](https://github.com/openclaw/openclaw/pull/58698) | feat(security): Add runtime security modules for enhanced protection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58698.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58660](https://github.com/openclaw/openclaw/issues/58660) | openclawwechat 插件安装被误拦截 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58660.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58711](https://github.com/openclaw/openclaw/issues/58711) | Feature request: configurable provider response timeout with user notification and auto-fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58711.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58679](https://github.com/openclaw/openclaw/pull/58679) | feat(config): add provenance tracking and explain command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58679.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58712](https://github.com/openclaw/openclaw/issues/58712) | [Bug]: [Follow-up] memos-memory-guide skill shows disabled but works correctly - WSL path issue? | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58712.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58674](https://github.com/openclaw/openclaw/issues/58674) | Slash model commands can be ignored when command is wrapped by metadata text | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58674.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58684](https://github.com/openclaw/openclaw/pull/58684) | feat: guard memory writes for non-main sessions (cron/isolated/subagent) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58684.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58654](https://github.com/openclaw/openclaw/pull/58654) | fix: strip SecretRef marker values from getApiKeyAndHeaders result (#58087) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58654.md) | complete | Apr 24, 2026, 16:56 UTC |
| [#58696](https://github.com/openclaw/openclaw/issues/58696) | [Feature]: The search content should be supplemented with a summary | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58696.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58667](https://github.com/openclaw/openclaw/pull/58667) | Feat/tool template generator | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58667.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58592](https://github.com/openclaw/openclaw/issues/58592) | Cron isolated sessions fail with LiveSessionModelSwitchError when agent primary model differs from payload.model | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58592.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58657](https://github.com/openclaw/openclaw/issues/58657) | [Bug]: Codex ACP session archive self-ingestion can bloat ACP history, OOM codex-acp, and crash the host | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58657.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58702](https://github.com/openclaw/openclaw/issues/58702) | [Bug] WebChat: Message text covered by action icons after upgrade to 2026.3.31 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58702.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58687](https://github.com/openclaw/openclaw/issues/58687) | [Bug]: Security prompt is too long to approve, and clicking \"Allow All\" on the security prompt is ineffective | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58687.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58649](https://github.com/openclaw/openclaw/issues/58649) | Subagent Session Timeout and Unresponsiveness in Production Use | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58649.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58704](https://github.com/openclaw/openclaw/issues/58704) | WhatsApp bridge: assistant output can leak into user messages during /new or /reset session transition | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58704.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58648](https://github.com/openclaw/openclaw/pull/58648) | fix(agents): gate session-derived threadId on isThreadSessionKey in announce routing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58648.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58713](https://github.com/openclaw/openclaw/issues/58713) | Feature Request: Ephemeral sessions for agent-to-agent communication | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/58713.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58673](https://github.com/openclaw/openclaw/pull/58673) | fix(feishu): prevent timing side-channel in webhook signature comparison | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58673.md) | complete | Apr 24, 2026, 16:55 UTC |
| [#58646](https://github.com/openclaw/openclaw/issues/58646) | [Bug]: Remote CDP profiles (Browserbase) lose session between commands — multi-step workflows impossible | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/58646.md) | complete | Apr 24, 2026, 16:55 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking.

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
