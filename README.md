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

Last dashboard update: Apr 24, 2026, 18:22 UTC

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 12489 |
| Fresh reviewed issues in the last 7 days | 8490 |
| Proposed issue closes | 4749 (55.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6609 |
| Fresh reviewed PRs in the last 7 days | 4417 |
| Proposed PR closes | 1362 (30.8% of reviewed PRs) |
| Open items total | 19098 |
| Reviewed files | 12907 |
| Archived closed files | 72 |
| Fresh verified reviews in the last 7 days | 12907 |
| Proposed closes awaiting apply | 6111 (47.3% of fresh reviews) |
| Closed by Codex apply | 60 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 6191 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#60539](https://github.com/openclaw/openclaw/issues/60539) | 建议：改进主从节点权限配置的用户体验和错误提示 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60539.md) | complete | Apr 24, 2026, 18:22 UTC |
| [#60496](https://github.com/openclaw/openclaw/issues/60496) | Control UI: Long command outputs push approval buttons off screen | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60496.md) | complete | Apr 24, 2026, 18:21 UTC |
| [#60512](https://github.com/openclaw/openclaw/issues/60512) | config.patch rejects compaction.model, customInstructions, postCompactionSections despite schema advertising them | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60512.md) | complete | Apr 24, 2026, 18:21 UTC |
| [#60502](https://github.com/openclaw/openclaw/pull/60502) | feat(gateway): add A2A (Agent-to-Agent) protocol support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60502.md) | complete | Apr 24, 2026, 18:21 UTC |
| [#60500](https://github.com/openclaw/openclaw/pull/60500) | feat(web): support PDF file uploads in web chat UI | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60500.md) | complete | Apr 24, 2026, 18:21 UTC |
| [#60515](https://github.com/openclaw/openclaw/issues/60515) | Gateway crashes on transient ENETUNREACH — uncaughtException handler lacks isTransientNetworkError check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60515.md) | complete | Apr 24, 2026, 18:21 UTC |
| [#60490](https://github.com/openclaw/openclaw/issues/60490) | [Bug]: Gateway not starting on Windows automatically (need to start manually) – Dashboard unreachable (127.0.0.1 refused to connect) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60490.md) | complete | Apr 24, 2026, 18:21 UTC |
| [#60550](https://github.com/openclaw/openclaw/issues/60550) | Read tool path validation misses filePath and file aliases | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60550.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60549](https://github.com/openclaw/openclaw/issues/60549) | TUI sessions lost on reconnect — gateway returns 'No session found' for existing session | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60549.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60545](https://github.com/openclaw/openclaw/pull/60545) | fix: preserve retry intent, clean session rollover, machine-clean JSON, and one-shot sandbox teardown | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60545.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60520](https://github.com/openclaw/openclaw/pull/60520) | fix: normalize routed reply directives and thread transport | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60520.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60426](https://github.com/openclaw/openclaw/issues/60426) | exec approval followup dispatch fails with gateway timeout when user does not respond within approval window | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60426.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60470](https://github.com/openclaw/openclaw/issues/60470) | UX: Improve user feedback for transient rate-limiting to prevent false-negative panic | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60470.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60527](https://github.com/openclaw/openclaw/pull/60527) | fix: strip hostnameAllowlist from SSRF policy when validating explicit proxy | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60527.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60542](https://github.com/openclaw/openclaw/issues/60542) | BUG: Persisted main session row can become stale and diverge from transcript, wedging new input | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60542.md) | complete | Apr 24, 2026, 18:20 UTC |
| [#60450](https://github.com/openclaw/openclaw/issues/60450) | v2026.3.28: Runaway API calls burned entire monthly budget across all providers without user action | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60450.md) | complete | Apr 24, 2026, 18:19 UTC |
| [#60526](https://github.com/openclaw/openclaw/pull/60526) | feat: add setup-validator and plugin-integration skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/60526.md) | complete | Apr 24, 2026, 18:19 UTC |
| [#60510](https://github.com/openclaw/openclaw/issues/60510) | False-positive WARN: \"closed before connect\" floods logs from internal health probes | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60510.md) | complete | Apr 24, 2026, 18:19 UTC |
| [#60485](https://github.com/openclaw/openclaw/pull/60485) | fix(feishu): accept token-verified webhook challenges | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60485.md) | complete | Apr 24, 2026, 18:19 UTC |
| [#60521](https://github.com/openclaw/openclaw/issues/60521) | allowUnsafeExternalContent flag ignored in /hooks/agent dispatch path | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/60521.md) | complete | Apr 24, 2026, 18:19 UTC |

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
