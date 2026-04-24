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

Last dashboard update: Apr 24, 2026, 02:28 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19131 |
| Reviewed / proposed closes | 686 / 306 |
| Reviewed files | 686 |
| Fresh verified reviews in the last 7 days | 686 |
| Proposed closes awaiting apply | 306 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18445 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#18778](https://github.com/openclaw/openclaw/pull/18778) | Discord: Discord canvas! | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18778.md) | complete | Apr 24, 2026, 02:28 UTC |
| [#18823](https://github.com/openclaw/openclaw/pull/18823) | revert(browser): remove extraArgs config | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18823.md) | complete | Apr 24, 2026, 02:28 UTC |
| [#18889](https://github.com/openclaw/openclaw/pull/18889) | feat(hooks): add agent and tool lifecycle boundaries | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18889.md) | complete | Apr 24, 2026, 02:27 UTC |
| [#18571](https://github.com/openclaw/openclaw/issues/18571) | [Feature]: Expose sessionKey/runId to outbound message hook for deterministic verification | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18571.md) | complete | Apr 24, 2026, 02:27 UTC |
| [#18860](https://github.com/openclaw/openclaw/pull/18860) | feat(agents): expose tools and their schemas via new after_tools_resolved hook [AI-assisted] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18860.md) | complete | Apr 24, 2026, 02:27 UTC |
| [#17936](https://github.com/openclaw/openclaw/issues/17936) | [Security] message/sendAttachment allows local file exfiltration when sandboxRoot is unset | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/17936.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18967](https://github.com/openclaw/openclaw/issues/18967) | [Feature]: Parent-scoped sessions_send for sub-agents | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18967.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18813](https://github.com/openclaw/openclaw/issues/18813) | [Feature]: Add CI Checks to Enforce TLS Security Standards | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18813.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18598](https://github.com/openclaw/openclaw/issues/18598) | [Bug]: macOS Sequoia: OpenClaw isolated Chrome profile cannot download CSV (chrome://downloads entry is unclickable + wrong filename) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18598.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18920](https://github.com/openclaw/openclaw/issues/18920) | [Feature]: Implement Proper Message Dispatching in Nostr Extension | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18920.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18716](https://github.com/openclaw/openclaw/pull/18716) | msteams: fix DM image delivery + user target routing | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18716.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18565](https://github.com/openclaw/openclaw/issues/18565) | [Feature]: Per-user context files for single-agent, multi-user setups | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18565.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#17890](https://github.com/openclaw/openclaw/issues/17890) | [Bug]: macOS app: Skill binary detection doesn't respect `/etc/paths` or Homebrew PATH | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/17890.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18869](https://github.com/openclaw/openclaw/issues/18869) | [Feature]: Multi-Agent Group Chat Support with Turn-Taking Protocol | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18869.md) | complete | Apr 24, 2026, 02:26 UTC |
| [#18223](https://github.com/openclaw/openclaw/issues/18223) | Compaction triggers session.reset which SIGKILLs in-flight exec processes (regression in 2026.2.14+) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18223.md) | complete | Apr 24, 2026, 02:25 UTC |
| [#18844](https://github.com/openclaw/openclaw/issues/18844) | [Feature]: GLM-5 JSON error | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18844.md) | complete | Apr 24, 2026, 02:25 UTC |
| [#18160](https://github.com/openclaw/openclaw/issues/18160) | [Feature]: Direct Exec Mode for Cron Jobs | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18160.md) | complete | Apr 24, 2026, 02:25 UTC |
| [#18599](https://github.com/openclaw/openclaw/issues/18599) | [Feature]: Token- / Message-based History Limit per Channel | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18599.md) | complete | Apr 24, 2026, 02:25 UTC |
| [#18915](https://github.com/openclaw/openclaw/pull/18915) | fix(telegram): pass video width/height to sendVideo to prevent portra… | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/18915.md) | complete | Apr 24, 2026, 02:25 UTC |
| [#18633](https://github.com/openclaw/openclaw/issues/18633) | [Feature]: Stuck run recovery: auto-abort after timeout (compaction stalls block all messages) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/18633.md) | complete | Apr 24, 2026, 02:25 UTC |

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
