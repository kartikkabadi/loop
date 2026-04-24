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

Last dashboard update: Apr 24, 2026, 07:53 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12511 |
| Fresh reviewed issues in the last 7 days | 3088 |
| Proposed issue closes | 1638 (53% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6583 |
| Fresh reviewed PRs in the last 7 days | 1498 |
| Proposed PR closes | 491 (32.8% of reviewed PRs) |
| Open items total | 19094 |
| Reviewed files | 4586 |
| Fresh verified reviews in the last 7 days | 4586 |
| Proposed closes awaiting apply | 2129 (46.4% of fresh reviews) |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 14508 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#44854](https://github.com/openclaw/openclaw/issues/44854) | Config parse: ANTHROPIC_MODEL_ALIASES ReferenceError in applyContextPruningDefaults | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44854.md) | complete | Apr 24, 2026, 07:53 UTC |
| [#44877](https://github.com/openclaw/openclaw/pull/44877) | Fix exec approval follow-ups for internal sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44877.md) | complete | Apr 24, 2026, 07:53 UTC |
| [#44818](https://github.com/openclaw/openclaw/issues/44818) | [Bug]: .env proxy (HTTPS_PROXY) works for Gemini web search but not for Gemini memory embedding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44818.md) | complete | Apr 24, 2026, 07:52 UTC |
| [#44862](https://github.com/openclaw/openclaw/pull/44862) | fix(agents): use correct bootstrap files for subagents | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44862.md) | complete | Apr 24, 2026, 07:52 UTC |
| [#44879](https://github.com/openclaw/openclaw/pull/44879) | fix: avoid TDZ on Anthropic model aliases in context pruning defaults | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44879.md) | complete | Apr 24, 2026, 07:52 UTC |
| [#44835](https://github.com/openclaw/openclaw/issues/44835) | [Bug]: [v2026.3.12] Configuration loop: Web UI validation error 'models.0.id undefined' despite fields being filled | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44835.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44848](https://github.com/openclaw/openclaw/issues/44848) | [Bug] Feishu Plugin Registered Multiple Times in CLI Output (2026.3.12) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44848.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44786](https://github.com/openclaw/openclaw/issues/44786) | [Bug]: Provider-level contextWindow config ignored — overwritten by model metadata on gateway restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44786.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44876](https://github.com/openclaw/openclaw/issues/44876) | Feature Request: Built-in safe upgrade/config-change command with backup, verification, and auto-rollback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44876.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44872](https://github.com/openclaw/openclaw/pull/44872) | feat: add /default_model command to set default model persistently | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44872.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44801](https://github.com/openclaw/openclaw/issues/44801) | [Feature]: Design Proposal: toward a task-centric runtime for resumable work, approvals, and task-linked surfaces | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44801.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44863](https://github.com/openclaw/openclaw/pull/44863) | feat: session-level message coalescing to reduce redundant LLM calls | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44863.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44829](https://github.com/openclaw/openclaw/pull/44829) | fix(feishu): avoid post text truncation when line ends with colon | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44829.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44833](https://github.com/openclaw/openclaw/issues/44833) | [Bug]: Telegram group photo-only messages do not trigger image understanding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44833.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44866](https://github.com/openclaw/openclaw/issues/44866) | [Bug]: Feishu DM (p2p) messages routed to webchat instead of feishu channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44866.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44870](https://github.com/openclaw/openclaw/issues/44870) | [Bug]: I have been unable to verify using the codex from the transfer station | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44870.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44878](https://github.com/openclaw/openclaw/pull/44878) | feat(memory): support separate fallback remote config for memorySearch | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44878.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44882](https://github.com/openclaw/openclaw/issues/44882) | [BUG] 认证机制硬编码缺陷：无法手动配置Ollama / Authentication hardcoded defect: Cannot manually configure Ollama provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44882.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44881](https://github.com/openclaw/openclaw/issues/44881) | Gateway holds port after npm upgrade — new process crash-loops until openclaw gateway stop is run | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/44881.md) | complete | Apr 24, 2026, 07:51 UTC |
| [#44826](https://github.com/openclaw/openclaw/issues/44826) | Feature Request: Per-Agent Model Fallback Control | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/44826.md) | complete | Apr 24, 2026, 07:50 UTC |

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
