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

Last dashboard update: Apr 24, 2026, 00:06 UTC

| Metric | Count |
| --- | ---: |
| Open items in [openclaw/openclaw](https://github.com/openclaw/openclaw) | 19148 |
| Fresh verified reviews in the last 7 days | 28 |
| Todo for weekly coverage | 19120 |
| Local review files | 31 |

Recently reviewed:

| Item | Report | Title | Decision | Action | Status | Reviewed |
| --- | --- | --- | --- | --- | --- | --- |
| [#7679](https://github.com/openclaw/openclaw/issues/7679) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7679.md) | Telegram should default to allowlist mode with owner ID | close | proposed_close | complete | Apr 24, 2026, 00:06 UTC |
| [#6820](https://github.com/openclaw/openclaw/issues/6820) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6820.md) | Add openai-codex/gpt-5.2 to xhigh thinking whitelist | keep_open | kept_open | complete | Apr 24, 2026, 00:06 UTC |
| [#2597](https://github.com/openclaw/openclaw/issues/2597) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/2597.md) | Context/state lost after unexpected compaction or session reset | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#6691](https://github.com/openclaw/openclaw/issues/6691) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6691.md) | [Feature Request] Context-aware dynamic skill loading/unloading to reduce token cost | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#6615](https://github.com/openclaw/openclaw/issues/6615) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6615.md) | Feature: Add denylist support for exec-approvals | close | proposed_close | complete | Apr 24, 2026, 00:05 UTC |
| [#1210](https://github.com/openclaw/openclaw/issues/1210) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/1210.md) | Images from Discord stored as base64 in session transcripts | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#6757](https://github.com/openclaw/openclaw/issues/6757) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6757.md) | Feature Request: Agent-triggered context compaction (self-compact tool) | close | proposed_close | complete | Apr 24, 2026, 00:05 UTC |
| [#6717](https://github.com/openclaw/openclaw/issues/6717) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6717.md) | [Feature Request] Natural language model switching in conversation | close | proposed_close | complete | Apr 24, 2026, 00:05 UTC |
| [#7406](https://github.com/openclaw/openclaw/issues/7406) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7406.md) | [Feature]: Human-readable Telegram topic names in session dropdown | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#7052](https://github.com/openclaw/openclaw/issues/7052) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7052.md) | Feature Request: Auto-summarize/compress context before hitting token limit to prevent brain freeze | close | proposed_close | complete | Apr 24, 2026, 00:05 UTC |
| [#6731](https://github.com/openclaw/openclaw/issues/6731) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6731.md) | [Feature]: safe/unsafe ClawdBot | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#6900](https://github.com/openclaw/openclaw/issues/6900) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6900.md) | [Feature]: docker support for node | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#6792](https://github.com/openclaw/openclaw/issues/6792) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6792.md) | Feature: configPatch in plugin manifest — automatic config setup on install | keep_open | kept_open | complete | Apr 24, 2026, 00:05 UTC |
| [#6457](https://github.com/openclaw/openclaw/pull/6457) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6457.md) | fix(telegram): register commands for group scope + preserve topic thread params | keep_open | kept_open | complete | Apr 24, 2026, 00:04 UTC |
| [#147](https://github.com/openclaw/openclaw/issues/147) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/147.md) | feat: Brabble as Clawdis node for distributed voice wake | keep_open | kept_open | complete | Apr 24, 2026, 00:04 UTC |
| [#6823](https://github.com/openclaw/openclaw/issues/6823) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6823.md) | Feature Request: Execution Guardrails for Tool Safety | close | proposed_close | complete | Apr 24, 2026, 00:04 UTC |
| [#7280](https://github.com/openclaw/openclaw/issues/7280) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7280.md) | Feature: Add instructions field to extend SOUL.md instead of replacing systemPrompt | keep_open | kept_open | complete | Apr 24, 2026, 00:04 UTC |
| [#7338](https://github.com/openclaw/openclaw/issues/7338) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/7338.md) | [Feature]: Agent Attestation Headers | keep_open | kept_open | complete | Apr 24, 2026, 00:04 UTC |
| [#6654](https://github.com/openclaw/openclaw/issues/6654) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6654.md) | [Feature]: Use zerobrew instead of homebrew | keep_open | kept_open | complete | Apr 24, 2026, 00:04 UTC |
| [#6722](https://github.com/openclaw/openclaw/issues/6722) | [report](https://github.com/openclaw/clawsweeper/blob/main/items/6722.md) | WhatsApp: Add link preview support (generateHighQualityLinkPreview) | keep_open | kept_open | complete | Apr 24, 2026, 00:04 UTC |

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Checks out a full `openclaw/openclaw` working tree.
3. Selects the next open item by issue number, starting from `#1`.
4. Runs Codex with `gpt-5.4`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

Codex runs without GitHub write tokens. The runner checks the OpenClaw checkout before and after every review and fails the item if Codex leaves any tracked or untracked change behind.

Parallel workflow shards each own a different slice of the open-item list. The final job merges artifacts and updates this README so the dashboard reflects progress.

To close later without rerunning Codex, dispatch the workflow with `apply_existing=true`. That mode reads existing `items/*.md`, refetches the issue/PR context, recomputes the snapshot hash, and only comments/closes if nothing changed since the proposal was written.

## Local Run

Requires Node 24.

```bash
source ~/.profile
npm install
npm run build
npm run review -- --openclaw-dir ../openclaw --batch-size 1 --max-pages 250 --artifact-dir artifacts/reviews --codex-model gpt-5.4 --codex-reasoning-effort high --codex-service-tier fast --codex-timeout-ms 600000
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
