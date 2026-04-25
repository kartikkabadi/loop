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

Last dashboard update: Apr 25, 2026, 02:30 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 02:30 UTC

State: Apply in progress

Checkpoint 2 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 100/500. Result records in checkpoint: 50.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920206705](https://github.com/openclaw/clawsweeper/actions/runs/24920206705)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10353 |
| Fresh reviewed issues in the last 7 days | 8300 |
| Proposed issue closes | 3685 (44.4% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6356 |
| Fresh reviewed PRs in the last 7 days | 5088 |
| Proposed PR closes | 1383 (27.2% of reviewed PRs) |
| Open items total | 16709 |
| Reviewed files | 13388 |
| Archived closed files | 2239 |
| Fresh verified reviews in the last 7 days | 13388 |
| Proposed closes awaiting apply | 5068 (37.9% of fresh reviews) |
| Closed by Codex apply | 1483 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 3321 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65195](https://github.com/openclaw/openclaw/issues/65195) | exec/runtime cannot reach LAN host on macOS while interactive shell can | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65195.md) | complete | Apr 25, 2026, 02:21 UTC |
| [#65165](https://github.com/openclaw/openclaw/issues/65165) | [Bug]:  图片上传失败：模型不支持图片，但配置了 input: [\"text\", \"image\"] | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65165.md) | complete | Apr 25, 2026, 02:21 UTC |
| [#65188](https://github.com/openclaw/openclaw/pull/65188) | fix(ui): prevent iOS Safari auto-zoom on chat input and form fields (#64651) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65188.md) | complete | Apr 25, 2026, 02:20 UTC |
| [#65177](https://github.com/openclaw/openclaw/issues/65177) | [Bug]: openclaw doctor --fix does not migrate Feishu botName to name after upgrade to 2026.4.11 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65177.md) | complete | Apr 25, 2026, 02:20 UTC |
| [#65192](https://github.com/openclaw/openclaw/issues/65192) | [Bug]:  too many dream sessions have led to accumulation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65192.md) | complete | Apr 25, 2026, 02:20 UTC |
| [#65186](https://github.com/openclaw/openclaw/pull/65186) | feat: add <example> trigger mechanism for Skills | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65186.md) | complete | Apr 25, 2026, 02:20 UTC |
| [#65137](https://github.com/openclaw/openclaw/pull/65137) | fix: [Bug]: tools.exec.security: full does not enable inline Python execution (strictInlineEval still blocks) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65137.md) | complete | Apr 25, 2026, 02:20 UTC |
| [#65194](https://github.com/openclaw/openclaw/pull/65194) | fix(imessage): avoid duplicate default monitor startup | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65194.md) | complete | Apr 25, 2026, 02:19 UTC |
| [#65156](https://github.com/openclaw/openclaw/issues/65156) | [Bug] Memory vector search broken in v4.11 — sqlite-vec loads but registers no functions (SQLite ABI mismatch) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65156.md) | complete | Apr 25, 2026, 02:19 UTC |
| [#65185](https://github.com/openclaw/openclaw/pull/65185) | fix(ios): allow plaintext ws:// for LAN/Tailscale hosts; prefer password over bootstrap token (#47887) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65185.md) | complete | Apr 25, 2026, 02:19 UTC |
| [#65191](https://github.com/openclaw/openclaw/issues/65191) | Bug: Plugin initialization fails due to config not loaded before plugin starts | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65191.md) | complete | Apr 25, 2026, 02:19 UTC |
| [#65105](https://github.com/openclaw/openclaw/issues/65105) | Update 2026.4.9 → 4.11 silently wipes channels.discord config and agents.list from openclaw.json | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65105.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65158](https://github.com/openclaw/openclaw/issues/65158) | [Feature Request] Cross-channel message synchronization | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65158.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65201](https://github.com/openclaw/openclaw/issues/65201) | doctor false positive warning on Gateway auth token handled in secrets | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65201.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65198](https://github.com/openclaw/openclaw/pull/65198) | test: cover string-backed non-streaming assistant replies | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65198.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65131](https://github.com/openclaw/openclaw/issues/65131) | Feature Request: Option to hide system messages from Control UI chat window | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65131.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65199](https://github.com/openclaw/openclaw/pull/65199) | fix(ui): humanize cron expressions in dreaming phase and cron job displays | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65199.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65136](https://github.com/openclaw/openclaw/issues/65136) | Task state not reconciled on gateway restart — stale running tasks accumulate | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65136.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65062](https://github.com/openclaw/openclaw/issues/65062) | Gateway high CPU caused by two runtime bugs: malformed QMD startup collections and unrelated extension plugins loaded during provider normalization | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65062.md) | complete | Apr 25, 2026, 02:18 UTC |
| [#65189](https://github.com/openclaw/openclaw/issues/65189) | OpenViking 记忆引擎的上下文块泄露到了 UI 层 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65189.md) | complete | Apr 25, 2026, 02:18 UTC |

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

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written. Successfully closed or already-closed items move to `closed/<number>.md`; `items/` stays focused on open items that still need tracking. Apply runs update the dashboard when each checkpoint commits, cap total processed items separately from fresh closes, leave enough scan room to skip changed or already-closed records while still reaching fresh closures, and emit `[apply]` progress lines during long close batches. Apply mode also posts best-effort start/checkpoint/finish notes to the dashboard. Apply mode defaults to `apply_min_age_days=0`, `apply_kind=issue`, a 5-second close delay, 50 fresh closes per checkpoint commit, and long retry backoff for GitHub secondary write throttling, so issue cleanup can apply high-confidence closes regardless of age while PRs remain excluded. If an apply run reaches its requested close limit, it queues another apply run with the same settings.

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
