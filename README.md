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

Last dashboard update: Apr 24, 2026, 03:15 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19141 |
| Reviewed / proposed closes | 1086 / 475 |
| Reviewed files | 1086 |
| Fresh verified reviews in the last 7 days | 1086 |
| Proposed closes awaiting apply | 475 |
| Closed by Codex apply | 0 |
| Failed or stale reviews | 0 |
| Todo for weekly coverage | 18055 |

Recently reviewed:

| Item | Title | Outcome | Status | Reviewed |
| --- | --- | --- | --- | --- |
| [#35532](https://github.com/openclaw/openclaw/issues/35532) | [Feature]:  Health monitor stale-socket threshold should be configurable (gateway.staleEventThresholdMinutes) | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35532.md) | complete | Apr 24, 2026, 03:15 UTC |
| [#35675](https://github.com/openclaw/openclaw/issues/35675) | Feature: Auto-populate session label with chat/group name from messaging providers | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35675.md) | complete | Apr 24, 2026, 03:14 UTC |
| [#35802](https://github.com/openclaw/openclaw/issues/35802) | [Bug] No centralized agent registry - orchestrator blind to running agents at scale | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35802.md) | complete | Apr 24, 2026, 03:14 UTC |
| [#35515](https://github.com/openclaw/openclaw/issues/35515) | Request: Android APK release | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35515.md) | complete | Apr 24, 2026, 03:13 UTC |
| [#35447](https://github.com/openclaw/openclaw/issues/35447) | [Feature]:  `cron` tool: add per-agent/session isolation for job visibility and mutations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35447.md) | complete | Apr 24, 2026, 03:13 UTC |
| [#35653](https://github.com/openclaw/openclaw/issues/35653) | [Feature]: 添加文件系统操作工具权限给AI助手 | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35653.md) | complete | Apr 24, 2026, 03:13 UTC |
| [#35573](https://github.com/openclaw/openclaw/issues/35573) | [Feature]: Native fal.ai provider support | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35573.md) | complete | Apr 24, 2026, 03:13 UTC |
| [#35028](https://github.com/openclaw/openclaw/issues/35028) | ACP sessions: sessions_spawn(acp) produces empty sessions_history; identity reconcile fails; transcriptPath null | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35028.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35682](https://github.com/openclaw/openclaw/issues/35682) | Feature: Add session delete commands (rm/clear) without full reset | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35682.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35807](https://github.com/openclaw/openclaw/issues/35807) | [Bug] Exec tool corrupts PowerShell pipeline variables on Windows - \\ stripped, -f operator broken | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35807.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35023](https://github.com/openclaw/openclaw/issues/35023) | [Bug] Sub-agent sessions fail on turn 2 when thinking is enabled — thinking blocks stripped from tool-call history replay | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35023.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35805](https://github.com/openclaw/openclaw/issues/35805) | [Bug] No governance file drift detection - stale agent context causes silent coordination failures | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35805.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35560](https://github.com/openclaw/openclaw/issues/35560) | Doctor injects orphan top-level keys into multi-account telegram config on every CLI command | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35560.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35804](https://github.com/openclaw/openclaw/issues/35804) | [Bug] No reproducible agent onboarding - 10+ manual files, no validation, no automation | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35804.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35568](https://github.com/openclaw/openclaw/issues/35568) | Request: Retain support for the imsg iMessage integration | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35568.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35735](https://github.com/openclaw/openclaw/pull/35735) | feat(sessions): add rm and clear subcommands | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35735.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35152](https://github.com/openclaw/openclaw/pull/35152) | feat(doctor): detect duplicate openclaw installations | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/35152.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#34986](https://github.com/openclaw/openclaw/issues/34986) | [Feature]: Heartbeat pre-flight check | [keep_open / kept_open](https://github.com/openclaw/clawsweeper/blob/main/items/34986.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35922](https://github.com/openclaw/openclaw/pull/35922) | fix(version): add more candidate paths for Homebrew installs | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35922.md) | complete | Apr 24, 2026, 03:12 UTC |
| [#35466](https://github.com/openclaw/openclaw/issues/35466) | fix(telegram): enforce single streamed reply per turn and prevent duplicate final resend | [close / proposed_close](https://github.com/openclaw/clawsweeper/blob/main/items/35466.md) | complete | Apr 24, 2026, 03:12 UTC |

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
