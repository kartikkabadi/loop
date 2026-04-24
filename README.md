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

Last dashboard update: Apr 24, 2026, 07:25 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12507 |
| Fresh reviewed issues in the last 7 days | 2833 |
| Proposed issue closes | 1486 (52.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6582 |
| Fresh reviewed PRs in the last 7 days | 1353 |
| Proposed PR closes | 434 (32.1% of reviewed PRs) |
| Open items total | 19089 |
| Reviewed files | 4186 |
| Fresh verified reviews in the last 7 days | 4186 |
| Proposed closes awaiting apply | 1920 (45.9% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 14903 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#44127](https://github.com/openclaw/openclaw/issues/44127) | ACP liveness probe delivered as undifferentiated user prompt — agent executes it as a command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44127.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44168](https://github.com/openclaw/openclaw/pull/44168) | fix(agents): guard OpenAI WS first response timeouts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44168.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44138](https://github.com/openclaw/openclaw/issues/44138) | Manual /compact command fails with 'no real conversation messages' on Discord thread sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44138.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44147](https://github.com/openclaw/openclaw/issues/44147) | [Bug]: # OpenClaw 网页端无法显示问题 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44147.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44152](https://github.com/openclaw/openclaw/pull/44152) | feat(compaction): include sessionFile in before_compaction hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44152.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44136](https://github.com/openclaw/openclaw/pull/44136) | fix(copilot): respect user-configured baseUrl in token flow | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44136.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44120](https://github.com/openclaw/openclaw/pull/44120) | fix(memory): shouldSyncSessions skips sessions during full reindex | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44120.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44171](https://github.com/openclaw/openclaw/issues/44171) | Cron one-shot at jobs can disappear without leaving run history | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44171.md) | complete | Apr 24, 2026, 07:24 UTC |
| [#44144](https://github.com/openclaw/openclaw/pull/44144) | docs(skills): clarify model-usage portable input mode | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44144.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44110](https://github.com/openclaw/openclaw/issues/44110) | [Bug]: tool_choice: \"auto\" sent even when tools.allow: [] is configured | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44110.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44130](https://github.com/openclaw/openclaw/issues/44130) | [TUI] Scroll-jump / auto-scroll behavior is still disruptive in 2026.3.8 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44130.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44134](https://github.com/openclaw/openclaw/issues/44134) | [Google Antigravity Ban] Frequent Tool Schema Reloading Causes False Positive Anti-Abuse Detection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44134.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44153](https://github.com/openclaw/openclaw/issues/44153) | sessions_send from sub-agent flips parent session deliveryContext from Telegram to webchat | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44153.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44114](https://github.com/openclaw/openclaw/pull/44114) | fix(sandbox): preserve file permissions when editing via sandbox file-tool (#44077) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44114.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44143](https://github.com/openclaw/openclaw/pull/44143) | fix: serialize outbound deliveries per channel+recipient | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44143.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44166](https://github.com/openclaw/openclaw/issues/44166) | memory reindex aborts on transient embedding transport errors instead of retrying or splitting the batch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44166.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44164](https://github.com/openclaw/openclaw/pull/44164) | fix(cron): doctor reports already-normalized payload kinds as legacy | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44164.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44126](https://github.com/openclaw/openclaw/pull/44126) | feat(agents): add adaptive thinking level controls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44126.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44163](https://github.com/openclaw/openclaw/pull/44163) | feat(compaction): expose summary in after_compaction hooks | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44163.md) | complete | Apr 24, 2026, 07:23 UTC |
| [#44118](https://github.com/openclaw/openclaw/pull/44118) | fix(feishu): bypass mention gate for slash commands in group chats | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44118.md) | complete | Apr 24, 2026, 07:22 UTC |

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
