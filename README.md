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

Last dashboard update: Apr 24, 2026, 02:06 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19135 |
| Reviewed / proposed closes | 486 / 214 |
| Reviewed files | 486 |
| Fresh verified reviews in the last 7 days | 486 |
| Proposed closes awaiting apply | 214 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18649 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#13599](https://github.com/openclaw/openclaw/issues/13599) | Add detailed node pairing setup guide with examples | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13599.md) | complete | Apr 24, 2026, 02:05 UTC |
| [#13609](https://github.com/openclaw/openclaw/issues/13609) | Add retry logic for failed cron jobs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13609.md) | complete | Apr 24, 2026, 02:05 UTC |
| [#13593](https://github.com/openclaw/openclaw/issues/13593) | Add logging and warnings for cron job execution failures | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13593.md) | complete | Apr 24, 2026, 02:05 UTC |
| [#13610](https://github.com/openclaw/openclaw/issues/13610) | Add native secrets management integration (AWS Secrets Manager, Vault, etc.) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13610.md) | complete | Apr 24, 2026, 02:05 UTC |
| [#13616](https://github.com/openclaw/openclaw/issues/13616) | Add backup/restore utility for config, cron jobs, and session history | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13616.md) | complete | Apr 24, 2026, 02:04 UTC |
| [#13562](https://github.com/openclaw/openclaw/issues/13562) | [Feature]: Ollama Memory Search Provider | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13562.md) | complete | Apr 24, 2026, 02:04 UTC |
| [#13583](https://github.com/openclaw/openclaw/issues/13583) | [Feature] Pre-response enforcement hooks (hard gates) for mandatory tool-call / policy rules | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13583.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13615](https://github.com/openclaw/openclaw/issues/13615) | Add rate limiting and throttling for external API calls | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13615.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13601](https://github.com/openclaw/openclaw/issues/13601) | Add persistent cron job execution history with filtering | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13601.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13607](https://github.com/openclaw/openclaw/issues/13607) | Feature: global default for reasoning visiblity | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13607.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13597](https://github.com/openclaw/openclaw/issues/13597) | Add comprehensive AWS deployment guide (EC2, ECS, Lambda) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13597.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13553](https://github.com/openclaw/openclaw/issues/13553) | [Feature]: Save whatsapp/iMessage attachments to ~/clawd/temp for upload | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13553.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13587](https://github.com/openclaw/openclaw/issues/13587) | Feature Request: Native Cross-Session Prompt Logging | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13587.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13423](https://github.com/openclaw/openclaw/issues/13423) | [Bug]: [CRITICAL SECURITY] Agent Routing System Complete Failure - Communication Misdirection | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13423.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13392](https://github.com/openclaw/openclaw/issues/13392) | Feature Request: session:spawn and session:complete hook events | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13392.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13499](https://github.com/openclaw/openclaw/issues/13499) | Feature Request: Auto-spawn at context threshold | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13499.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13617](https://github.com/openclaw/openclaw/issues/13617) | Add testing framework for cron jobs and skills (dry-run mode) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13617.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13570](https://github.com/openclaw/openclaw/issues/13570) | context-pruning: forcePruneRatio to bypass TTL at high usage | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13570.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13598](https://github.com/openclaw/openclaw/issues/13598) | Add cron troubleshooting playbook to docs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/13598.md) | complete | Apr 24, 2026, 02:03 UTC |
| [#13487](https://github.com/openclaw/openclaw/issues/13487) | Discord routing: mention > reply-target > default owner (suppress default owner when targeted) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/13487.md) | complete | Apr 24, 2026, 02:03 UTC |

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
npm run plan -- --batch-size 5 --shard-count 20 --max-pages 250 --codex-model gpt-5.4 --codex-reasoning-effort medium --codex-service-tier fast
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
