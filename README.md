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

Last dashboard update: Apr 25, 2026, 02:58 UTC

<!-- clawsweeper-status:start -->
### Workflow Status

Updated: Apr 25, 2026, 02:58 UTC

State: Apply in progress

Checkpoint 4 finished. Fresh closes in checkpoint: 50. Total fresh closes in this run: 200/500. Result records in checkpoint: 52.
Run: [https://github.com/openclaw/clawsweeper/actions/runs/24920206705](https://github.com/openclaw/clawsweeper/actions/runs/24920206705)
<!-- clawsweeper-status:end -->

| Metric | Count |
| --- | ---: |
| Open issues in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 10210 |
| Fresh reviewed issues in the last 7 days | 8470 |
| Proposed issue closes | 3717 (43.9% of reviewed issues) |
| Open PRs in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 6338 |
| Fresh reviewed PRs in the last 7 days | 5216 |
| Proposed PR closes | 1408 (27% of reviewed PRs) |
| Open items total | 16548 |
| Reviewed files | 13686 |
| Archived closed files | 2341 |
| Fresh verified reviews in the last 7 days | 13686 |
| Proposed closes awaiting apply | 5125 (37.4% of fresh reviews) |
| Closed by Codex apply | 1583 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 2862 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#65832](https://github.com/openclaw/openclaw/issues/65832) | [Bug]: image tool fails with custom provider — ModelRegistry doesn't recognize custom providers from models.json | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65832.md) | complete | Apr 25, 2026, 02:50 UTC |
| [#65798](https://github.com/openclaw/openclaw/issues/65798) | Browser tools intermittently fail with draft 2020-12 schema error after 2026.4.11 | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65798.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65849](https://github.com/openclaw/openclaw/issues/65849) | message tool: Discord send fails unless components.modal is populated (should be optional) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65849.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65794](https://github.com/openclaw/openclaw/issues/65794) | [Bug]: Web Chat tool-call blocks truncate tool arguments / parameters | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65794.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65854](https://github.com/openclaw/openclaw/issues/65854) | Video-only providers (runway, alibaba) default to text-inference onboarding scope | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65854.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65844](https://github.com/openclaw/openclaw/issues/65844) | [Bug]: Codex multi-profile auth collapsed to openai-codex:default on 2026.4.11, causing auth.order to exclude the only remaining profile | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65844.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65803](https://github.com/openclaw/openclaw/pull/65803) | fix: media understanding silently fails when Codex CLI is authorized | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65803.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65837](https://github.com/openclaw/openclaw/pull/65837) | Fix image tool custom provider resolution for models.json | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65837.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65811](https://github.com/openclaw/openclaw/issues/65811) | [Feature] Add ATOM as a bundled self-hosted provider (AMD GPU native inference) | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65811.md) | complete | Apr 25, 2026, 02:49 UTC |
| [#65847](https://github.com/openclaw/openclaw/issues/65847) | Bug: agents.defaults.heartbeat.to corrupts deliveryContext, causing private messages to leak to group with different content | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65847.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65828](https://github.com/openclaw/openclaw/pull/65828) | fix(minimax): include MINIMAX_API_KEY in web search auto-detection and onboarding | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65828.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65838](https://github.com/openclaw/openclaw/issues/65838) | [Feature Request] Add option to disable Bonjour/mDNS advertiser on Windows | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65838.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65801](https://github.com/openclaw/openclaw/issues/65801) | [Bug]: Messages are not passed to ACP | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65801.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65810](https://github.com/openclaw/openclaw/issues/65810) | [Bug]: Fallbacks does not work. Connection errors (ECONNREFUSED, network offline) should trigger model fallback to cloud providers | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65810.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65857](https://github.com/openclaw/openclaw/pull/65857) | fix(security): propagate --dangerously-force-unsafe-install to dependency denylist scans | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65857.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65824](https://github.com/openclaw/openclaw/issues/65824) | [Meta] Feature request bundle: 11 platform gaps from intensive daily use | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65824.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65859](https://github.com/openclaw/openclaw/issues/65859) | [Feature]: Add audio upload and playback support in webchat | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65859.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65813](https://github.com/openclaw/openclaw/issues/65813) | openai-codex auth profile rotation burns through both profiles before escalating to model fallback | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/65813.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65793](https://github.com/openclaw/openclaw/pull/65793) | feat(skills): add adaptive-memory skill | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65793.md) | complete | Apr 25, 2026, 02:48 UTC |
| [#65840](https://github.com/openclaw/openclaw/issues/65840) | [Bug]: image tool reports \"Unknown model\" for registered imageModel (qwen/qwen3.6-plus) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/65840.md) | complete | Apr 25, 2026, 02:48 UTC |

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
