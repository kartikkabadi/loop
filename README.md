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

Last dashboard update: Apr 24, 2026, 21:06 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 11636 |
| Fresh reviewed issues in the last 7 days | 8780 |
| Proposed issue closes | 4423 (50.4% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6460 |
| Fresh reviewed PRs in the last 7 days | 4787 |
| Proposed PR closes | 1320 (27.6% of reviewed PRs) |
| Open items total | 18096 |
| Reviewed files | 13567 |
| Archived closed files | 1101 |
| Fresh verified reviews in the last 7 days | 13567 |
| Proposed closes awaiting apply | 5743 (42.3% of fresh reviews) |
| Closed by Codex apply | 811 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 4529 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#63533](https://github.com/openclaw/openclaw/issues/63533) | [Feature]: Agent 无明确边界的重复工具调用导致无限循环 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63533.md) | complete | Apr 24, 2026, 21:06 UTC |
| [#63493](https://github.com/openclaw/openclaw/issues/63493) | message tool silently drops local file paths and external URLs in the media field | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63493.md) | complete | Apr 24, 2026, 21:06 UTC |
| [#63496](https://github.com/openclaw/openclaw/issues/63496) | WhatsApp creds.json corruption every ~30 minutes (non-atomic write) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63496.md) | complete | Apr 24, 2026, 21:05 UTC |
| [#63516](https://github.com/openclaw/openclaw/issues/63516) | [Bug]: Telegram polling stalls intermittently causing delayed/missed message delivery and heartbeat failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63516.md) | complete | Apr 24, 2026, 21:05 UTC |
| [#63486](https://github.com/openclaw/openclaw/issues/63486) | [Bug]: Matrix interaction is unresponsive. | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63486.md) | complete | Apr 24, 2026, 21:05 UTC |
| [#63526](https://github.com/openclaw/openclaw/issues/63526) | OpenClaw 2026.4.9 - Gateway memory usage abnormally high | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63526.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63476](https://github.com/openclaw/openclaw/issues/63476) | Image Tool returns \"no image\" when called from agent session — image data lost in tool invocation pipeline | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63476.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63518](https://github.com/openclaw/openclaw/pull/63518) | feat(plugins): add inference-guard for single-slot collision prevention | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63518.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63538](https://github.com/openclaw/openclaw/pull/63538) | docs(browser): prefer role refs for interactive actions | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63538.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63488](https://github.com/openclaw/openclaw/issues/63488) | [Bug]: ClawTalk WebSocket disconnect starves Slack Socket Mode event loop, causing stale-socket restart | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63488.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63461](https://github.com/openclaw/openclaw/issues/63461) | [Bug]: openclaw message send --media not working from CLI (WhatsApp) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63461.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63519](https://github.com/openclaw/openclaw/pull/63519) | fix: preserve threadId in announce target sessions.list fallback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63519.md) | complete | Apr 24, 2026, 21:04 UTC |
| [#63420](https://github.com/openclaw/openclaw/issues/63420) | Memory log (memory/YYYY-MM-DD.md) not generated since 4.8 upgrade — embedding API required but should not be | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63420.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63503](https://github.com/openclaw/openclaw/pull/63503) | feat(plugins): add model-switch extension for local LLM backend switching | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63503.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63530](https://github.com/openclaw/openclaw/pull/63530) | fix: harden session store recovery and gateway selection | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63530.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63536](https://github.com/openclaw/openclaw/pull/63536) | fix(session): prefer exact key match over freshest-updatedAt match | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63536.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63478](https://github.com/openclaw/openclaw/issues/63478) | [Bug]: QQBot session stuck in running state after subagent spawn failure/timeout | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63478.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63489](https://github.com/openclaw/openclaw/issues/63489) | [Bug] Cron isolated session first LLM call times out in 2026.4.2 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63489.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63421](https://github.com/openclaw/openclaw/issues/63421) | [Bug] agents.list[].workspace has no effect on bootstrap injection or file tool CWD (v2026.3.14) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/63421.md) | complete | Apr 24, 2026, 21:03 UTC |
| [#63474](https://github.com/openclaw/openclaw/pull/63474) | fix(config): strip legacy installs/plugins from channel configs before validation | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/63474.md) | complete | Apr 24, 2026, 21:03 UTC |

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
