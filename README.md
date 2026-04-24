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

Last dashboard update: Apr 24, 2026, 20:51 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11702 |
| Fresh reviewed issues in the last 7 days | 8776 |
| Proposed issue closes | 4520 (51.5% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6469 |
| Fresh reviewed PRs in the last 7 days | 4751 |
| Proposed PR closes | 1336 (28.1% of reviewed PRs) |
| Open items total | 18171 |
| Reviewed files | 13527 |
| Archived closed files | 941 |
| Fresh verified reviews in the last 7 days | 13527 |
| Proposed closes awaiting apply | 5856 (43.3% of fresh reviews) |
| Closed by Codex apply | 651 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 4644 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63194](https://github.com/openclaw/openclaw/issues/63194) | Built-in exec from Control UI always fails with \"pairing required\" on local Windows gateway, even with auth disabled and full local exec approvals | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63194.md) | complete | Apr 24, 2026, 20:51 UTC |
| [#63188](https://github.com/openclaw/openclaw/issues/63188) | [Feature]: Agent Runtime: Configurable stopReason=\"length\" catch-and-continue for mode:\"run\" sessions | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63188.md) | complete | Apr 24, 2026, 20:49 UTC |
| [#63152](https://github.com/openclaw/openclaw/issues/63152) | [Bug]: Distillation pipeline edit race condition causing offset mismatch errors | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63152.md) | complete | Apr 24, 2026, 20:49 UTC |
| [#63150](https://github.com/openclaw/openclaw/issues/63150) | [Feature]: Support Asynchronous Callback and Result Persistence for Skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63150.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63141](https://github.com/openclaw/openclaw/issues/63141) | [Feature] Auto-tune or warn on session.parentForkMaxTokens instead of silent skip | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63141.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63167](https://github.com/openclaw/openclaw/pull/63167) | fix(memory): report missing qmd workspace cwd | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63167.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63173](https://github.com/openclaw/openclaw/issues/63173) | [Bug]:  Kimi Code (Moonshot) Provider enters an infinite loop during tasks | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63173.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63187](https://github.com/openclaw/openclaw/issues/63187) | [Feature]: 需要能够获取模型推理的TTFT | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63187.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63204](https://github.com/openclaw/openclaw/issues/63204) | Feature Request: Support custom display names for sessions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63204.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63168](https://github.com/openclaw/openclaw/pull/63168) | plugins: preserve gateway-bindable hook runner | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63168.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63170](https://github.com/openclaw/openclaw/issues/63170) | Feature: Feishu interactive card buttons for exec approval | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63170.md) | complete | Apr 24, 2026, 20:48 UTC |
| [#63118](https://github.com/openclaw/openclaw/issues/63118) | [Feature]:  Missing Session Management Commands in OpenClaw | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63118.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63189](https://github.com/openclaw/openclaw/issues/63189) | [Bug]: Streaming never ends (UI stuck) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63189.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63203](https://github.com/openclaw/openclaw/issues/63203) | DGX Spark voice-local: STT/TTS を GPU 対応にしてターン遅延を数秒化する | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63203.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63176](https://github.com/openclaw/openclaw/pull/63176) | feat(plugins): expose ACP spawn and prompt in plugin runtime | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63176.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63153](https://github.com/openclaw/openclaw/issues/63153) | [Bug]: Bonjour advertiser stalling triggers Gateway self-healing loop with log flooding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63153.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63145](https://github.com/openclaw/openclaw/issues/63145) | [Feature]: openclaw models status --probe --all — per-model health check across all configured models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63145.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63074](https://github.com/openclaw/openclaw/pull/63074) | fix(security): classify dangerous Windows sandbox binds first | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63074.md) | complete | Apr 24, 2026, 20:47 UTC |
| [#63172](https://github.com/openclaw/openclaw/issues/63172) | Bug: WeChat context_token not loaded in isolated sessions and Gateway CLI | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63172.md) | complete | Apr 24, 2026, 20:46 UTC |
| [#63085](https://github.com/openclaw/openclaw/issues/63085) | [Bug]:OpenClaw and Ollama remote server (in local network) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63085.md) | complete | Apr 24, 2026, 20:46 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. In workflow apply mode, the dashboard is left to the proposal publisher so apply and review lanes can push concurrently without racing on `README.md`. Apply runs also cap total processed items separately from fresh closes, which keeps recovery-heavy runs bounded. Apply mode defaults to `apply_min_age_days=30` and `apply_kind=issue`, so new items and PRs are not auto-closed by the issue cleanup lane.

Maintainer-authored items are never auto-closed. Candidate planning and apply mode both read GitHub's `author_association` field and exclude `OWNER`, `MEMBER`, and `COLLABORATOR` items from automated close actions.

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
