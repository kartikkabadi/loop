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

Last dashboard update: Apr 24, 2026, 10:17 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12535 |
| Fresh reviewed issues in the last 7 days | 4334 |
| Proposed issue closes | 2374 (54.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6595 |
| Fresh reviewed PRs in the last 7 days | 2249 |
| Proposed PR closes | 772 (34.3% of reviewed PRs) |
| Open items total | 19130 |
| Reviewed files | 6583 |
| Fresh verified reviews in the last 7 days | 6583 |
| Proposed closes awaiting apply | 3146 (47.8% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 12547 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#48693](https://github.com/openclaw/openclaw/issues/48693) | [Bug]: channels.feishu.appSecret: unresolved SecretRef | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48693.md) | complete | Apr 24, 2026, 10:17 UTC |
| [#48713](https://github.com/openclaw/openclaw/issues/48713) | [Bug]: Openclaw 向 vllm 最新版发送未支持参数 strict和store，vllm产生 warning 日志，openclaw没办法进行有效输出 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48713.md) | complete | Apr 24, 2026, 10:15 UTC |
| [#48723](https://github.com/openclaw/openclaw/issues/48723) | [Bug]: Heartbeat 在主会话中执行工具调用后陷入无限循环（~30秒触发一次） | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48723.md) | complete | Apr 24, 2026, 10:15 UTC |
| [#48729](https://github.com/openclaw/openclaw/issues/48729) | [Feature]: Support Openrouter API rotate | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48729.md) | complete | Apr 24, 2026, 10:15 UTC |
| [#48724](https://github.com/openclaw/openclaw/pull/48724) | fix(security): address findings #134/#135/#139 — token masking, port binding, action SHA pins | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48724.md) | complete | Apr 24, 2026, 10:15 UTC |
| [#48629](https://github.com/openclaw/openclaw/issues/48629) | [Feature]: Keep OpenClaw “agent-light” via a minimal delegation-invariants layer (Confirm / Stop / Receipts + hooks) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48629.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48718](https://github.com/openclaw/openclaw/issues/48718) | [Bug]: Browser tool times out in agent — proot-Ubuntu + arm64 + remote CDP attachOnly | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48718.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48687](https://github.com/openclaw/openclaw/issues/48687) | healthcheck: security audit falsely flags intentional group-level allowFrom wildcard as critical | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48687.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48714](https://github.com/openclaw/openclaw/pull/48714) | fix(gateway): check configured models before DEFAULT_PROVIDER in resolveSessionModelRef | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48714.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48732](https://github.com/openclaw/openclaw/pull/48732) | fix: healthcheck skill uses UTC instead of user's local timezone | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48732.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48686](https://github.com/openclaw/openclaw/issues/48686) | [Bug] Feishu images not always attached to prompt - some images show as 'image data removed' | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48686.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48683](https://github.com/openclaw/openclaw/pull/48683) | fix: normalizeProviders flip-flop bug when using env var apiKey references | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48683.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48743](https://github.com/openclaw/openclaw/issues/48743) | [Feature Request] 身份一致性配置支持 - agents.defaults.identity | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48743.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48701](https://github.com/openclaw/openclaw/issues/48701) | [Bug]: | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48701.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48709](https://github.com/openclaw/openclaw/issues/48709) | Gemini 2.5 Pro: textSignature bloat + think tags + mixed text/tool causes session failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48709.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48700](https://github.com/openclaw/openclaw/issues/48700) | [Feature]: | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48700.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48673](https://github.com/openclaw/openclaw/pull/48673) | fix(plugins): suppress duplicate warning for npm-installed plugin overriding bundled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48673.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48727](https://github.com/openclaw/openclaw/issues/48727) | 🇹🇼 Telegram API unreachable / extremely slow from Taiwan (中華電信 Chunghwa Telecom) — Complete fix guide included | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48727.md) | complete | Apr 24, 2026, 10:14 UTC |
| [#48689](https://github.com/openclaw/openclaw/issues/48689) | [Bug] google-vertex auth broken on Windows in 2026.3.13 — GOOGLE_APPLICATION_CREDENTIALS treated as API key | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/48689.md) | complete | Apr 24, 2026, 10:13 UTC |
| [#48661](https://github.com/openclaw/openclaw/issues/48661) | [Feature Request] Add minimal lifecycle hooks for agent dispatch, handoff, and memory retrieval | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/48661.md) | complete | Apr 24, 2026, 10:13 UTC |

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
