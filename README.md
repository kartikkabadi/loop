# ClawSweeper

ClawSweeper is a conservative OpenClaw maintainer bot. It reviews open issues and PRs in `openclaw/openclaw`, writes one regenerated markdown record per item, and closes only when the evidence is strong.

Allowed close reasons:

- already implemented on `main`
- cannot reproduce on current `main`
- belongs on ClawHub as a skill/plugin, not in core
- too incoherent to be actionable

Everything else stays open.

## Dashboard

Last dashboard update: 2026-04-23T23:34:22.711Z

Open items in `openclaw/openclaw`: 19152

Freshly reviewed in the last 7 days: 16

Todo for weekly coverage: 19136

Total local review files: 16

Recently reviewed:

- #6722: WhatsApp: Add link preview support (generateHighQualityLinkPreview) - keep_open, kept_open, complete, 2026-04-23T23:34:02.988Z
- #6617: [Feature]: Control UI agent reply supports inline image - keep_open, kept_open, complete, 2026-04-23T23:33:36.024Z
- #6820: Add openai-codex/gpt-5.2 to xhigh thinking whitelist - close, proposed_close, complete, 2026-04-23T23:33:08.757Z
- #147: feat: Brabble as Clawdis node for distributed voice wake - keep_open, kept_open, complete, 2026-04-23T23:32:27.261Z
- #6457: fix(telegram): register commands for group scope + preserve topic thread params - keep_open, kept_open, complete, 2026-04-23T23:24:48.965Z
- #1691: Add option to disable prompt_cache_key for local models - close, proposed_close, complete, 2026-04-23T23:24:15.418Z
- #1210: Images from Discord stored as base64 in session transcripts - keep_open, kept_open, complete, 2026-04-23T23:23:57.932Z
- #6654: [Feature]: Use zerobrew instead of homebrew - keep_open, kept_open, complete, 2026-04-23T23:23:55.425Z
- #6662: [UX] SubAgent results should display as Tool Output instead of user message - close, proposed_close, complete, 2026-04-23T23:23:53.155Z
- #7052: Feature Request: Auto-summarize/compress context before hitting token limit to prevent brain freeze - keep_open, kept_open, complete, 2026-04-23T23:23:48.642Z
- #2597: Context/state lost after unexpected compaction or session reset - keep_open, kept_open, complete, 2026-04-23T23:23:42.371Z
- #6691: [Feature Request] Context-aware dynamic skill loading/unloading to reduce token cost - close, proposed_close, complete, 2026-04-23T23:23:35.778Z
- #6633: [Feature]: Cryptographic envelope (\"brain protection\") - close, proposed_close, complete, 2026-04-23T23:23:24.738Z
- #6792: Feature: configPatch in plugin manifest — automatic config setup on install - keep_open, kept_open, complete, 2026-04-23T23:23:20.844Z
- #6808: [Feature]: More efficient cron job management on Web UI - keep_open, kept_open, complete, 2026-04-23T23:23:17.072Z
- #75: Linux/Windows Clawdbot Apps - keep_open, kept_open, complete, 2026-04-23T23:22:45.911Z

## How It Works

The normal workflow is proposal-only. It runs configurable parallel shards and never comments or closes unless `apply_closures=true` is explicitly set for a manual run.

Each review job:

1. Checks out this repo.
2. Checks out a full `openclaw/openclaw` working tree.
3. Selects the next open item by issue number, starting from `#1`.
4. Runs Codex with `gpt-5.4`, high reasoning, fast service tier, and a 10-minute per-item timeout inside the OpenClaw checkout.
5. Writes `items/<number>.md` with the decision, proposed close comment, and a GitHub snapshot hash.
6. Marks high-confidence allowed close decisions as `proposed_close`.

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
