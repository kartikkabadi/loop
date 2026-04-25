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

Last dashboard update: Apr 25, 2026, 01:46 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 01:46 UTC

State: Review publish complete

Merged review artifacts for run 24919619772. Dashboard reflects the latest files and proposed closes from completed shards.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24919619772](https://github.com/openclaw/clawsweeper/actions/runs/24919619772)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10481 |
| Fresh reviewed issues in the last 7 days | 8128 |
| Proposed issue closes | 3644 (44.8% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6368 |
| Fresh reviewed PRs in the last 7 days | 4960 |
| Proposed PR closes | 1361 (27.4% of reviewed PRs) |
| Open items total | 16849 |
| Reviewed files | 13088 |
| Archived closed files | 2139 |
| Fresh verified reviews in the last 7 days | 13088 |
| Proposed closes awaiting apply | 5005 (38.2% of fresh reviews) |
| Closed by Codex apply | 1383 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 3761 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#64537](https://github.com/openclaw/openclaw/issues/64537) | OpenClaw is listed on Joy Trust Network — claim your profile | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64537.md) | complete | Apr 25, 2026, 01:41 UTC |
| [#64526](https://github.com/openclaw/openclaw/issues/64526) | Request iOS TestFlight Access | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64526.md) | complete | Apr 25, 2026, 01:41 UTC |
| [#64486](https://github.com/openclaw/openclaw/issues/64486) | Feature: Gate messages with unresolved future commitments rather than appending a disclaimer | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64486.md) | complete | Apr 25, 2026, 01:41 UTC |
| [#64519](https://github.com/openclaw/openclaw/issues/64519) | [Bug]: Gateway in-process self-call WS handshake fails with token_missing on token-mode loopback | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64519.md) | complete | Apr 24, 2026, 21:49 UTC |
| [#64524](https://github.com/openclaw/openclaw/issues/64524) | [Bug]: Gateway exits on startup when local Claude CLI auth is expired, even with remote OpenAI-compatible provider configured | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64524.md) | complete | Apr 24, 2026, 21:48 UTC |
| [#64454](https://github.com/openclaw/openclaw/issues/64454) | [Bug]: Slack extension: subagent completion messages bypass thread routing (missing subagent_delivery_target hook) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64454.md) | complete | Apr 24, 2026, 21:48 UTC |
| [#64465](https://github.com/openclaw/openclaw/issues/64465) | [Bug]: | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64465.md) | complete | Apr 24, 2026, 21:48 UTC |
| [#64509](https://github.com/openclaw/openclaw/issues/64509) | [Bug]: claude-cli/ backend returns \"out of extra usage\" while claude -p works fine | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64509.md) | complete | Apr 24, 2026, 21:48 UTC |
| [#64481](https://github.com/openclaw/openclaw/issues/64481) | Support tool_choice parameter for vLLM/gemma-4 models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64481.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64527](https://github.com/openclaw/openclaw/pull/64527) | fix(gateway): surface pairing reason in close frame and error message | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64527.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64497](https://github.com/openclaw/openclaw/issues/64497) | [Bug]: Isolated cron job sessions fail to spawn after main session inactivity | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64497.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64551](https://github.com/openclaw/openclaw/issues/64551) | [Bug]: macOS node connected but missing system.run.prepare, causing exec host=node to fail | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64551.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64518](https://github.com/openclaw/openclaw/pull/64518) | fix: clear model/provider override on /new and /reset | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64518.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64512](https://github.com/openclaw/openclaw/pull/64512) | feat(amazon-bedrock): support service_tier parameter for Bedrock models | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64512.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64523](https://github.com/openclaw/openclaw/issues/64523) | [Bug]: Control UI webchat re-injects assistant responses as new user input (hybrid mirror routing bug) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64523.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64416](https://github.com/openclaw/openclaw/pull/64416) | fix(acp): normalize completion delivery guidance | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64416.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64464](https://github.com/openclaw/openclaw/issues/64464) | [Bug]: browser control spawn chrome without setting env['DISPLAY'] = ':0' so chrome failed to initialize | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64464.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64553](https://github.com/openclaw/openclaw/issues/64553) | [Bug]: WhatsApp QR code expires silently (no rotation, no freshness indicator) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64553.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64407](https://github.com/openclaw/openclaw/issues/64407) | [Bug]: Window 2026.4.9: loopback gateway reachable, but system event/devices CLI connect fails after Qwen heartbeat config changes | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/64407.md) | complete | Apr 24, 2026, 21:47 UTC |
| [#64485](https://github.com/openclaw/openclaw/pull/64485) | fix(docker): add config dir defaults to prevent broken volume mounts | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/64485.md) | complete | Apr 24, 2026, 21:47 UTC |

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

Parallel workflow shards only receive planned item numbers. The planner posts a best-effort workflow status note to this README before shards start, each shard emits `[review]` progress lines, and the final job merges artifacts and updates the dashboard. Review jobs time out after 75 minutes so one stuck shard cannot hold the review concurrency group indefinitely. If the planner filled the current worker capacity, the publish job dispatches the next proposal-only sweep automatically.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 15-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded.

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
