# Commit Sweeper

Commit Sweeper reviews commits that land on a target repository's `main` branch.
It is intentionally separate from the issue/PR cleanup sweeper: it does not
close items, write comments, or try to fix code. It produces one markdown report
per commit and publishes a GitHub Check Run for the commit.

## Goals

- Review every code-bearing commit on `main` for regressions, bugs, and security
  issues.
- Use one Codex worker per reviewed commit.
- Keep reports human-readable and markdown-first.
- Keep the storage path canonical so each commit has at most one report.
- Avoid spending Codex time on pure documentation, changelog, asset, or other
  non-code commits.
- Make the lane easy to disable, manually trigger, and backfill over historic
  ranges.

## Storage

Reports live at:

```text
records/<repo-slug>/commits/<40-char-sha>.md
```

That path is the source of truth. Rerunning a commit review overwrites the same
file. Manual reruns with an additional prompt also overwrite the same file.

Report front matter includes both commit timestamps and review timestamps:

- `commit_authored_at`: author timestamp from the target commit
- `commit_committed_at`: committer timestamp from the target commit
- `reviewed_at`: timestamp for the ClawSweeper report generation

Skipped non-code commits still get a report at the same path with
`result: skipped_non_code`. This preserves a complete audit trail without
starting Codex for commits that cannot affect runtime behavior.

Use the report lister for time windows instead of date-based storage folders:

```bash
pnpm run build
pnpm commit-reports -- --since 6h
pnpm commit-reports -- --since "24 hours ago" --findings
pnpm commit-reports -- --since 7d --non-clean
pnpm commit-reports -- --repo openclaw/openclaw --author steipete --since 7d
```

The canonical storage stays flat so a rerun can overwrite exactly one file for
the commit without first rediscovering a date bucket.

## Triggers

Target repositories dispatch `push` events from `main` to
`openclaw/clawsweeper` with `repository_dispatch`.

The receiver workflow is `.github/workflows/commit-review.yml`.

Manual workflow dispatch supports:

- `target_repo`: repository to inspect
- `commit_sha`: commit SHA to review, or end of a historic range
- `before_sha`: optional range start; when present, review every commit in
  `before_sha..commit_sha`
- `additional_prompt`: appended to the Codex prompt for this run
- `create_checks`: create/update GitHub Checks
- `enabled`: emergency no-op switch
- `commit_offset`: internal continuation offset

The receiver enforces that the commit is reachable from `origin/main`.

## Scaling

GitHub Actions matrices are capped at 256 jobs per workflow run. Commit Sweeper
therefore pages large ranges:

- select up to 256 commits
- classify them cheaply
- start one matrix worker per code-bearing commit
- write skipped reports for non-code commits
- commit all reports
- dispatch the next page when more commits remain

A 200-commit push runs in one workflow run. A 600-commit historic backfill runs
as multiple continuation runs.

## Cheap Classification

The plan job classifies each selected commit before creating the Codex matrix.
It uses `git diff --name-only` for normal commits and `git diff-tree` for root
commits.

Codex runs when any changed path looks reviewable:

- source files
- tests
- scripts and `bin/`
- GitHub workflows
- package manifests
- lockfiles
- build/runtime/config files

Codex is skipped when all changed paths are non-code:

- docs directories
- changelog-only changes
- README/license/notice-style files
- markdown/text documentation
- common image/video/PDF assets

Mixed commits are reviewed. A commit that changes both docs and code gets a
Codex worker.

## Codex Review

The prompt lives in `prompts/review-commit.md`.

Codex reviews the provided commit range and is expected to read beyond the diff:

- changed files in full
- callers/callees
- configuration and runtime entry points
- adjacent tests and docs when they define contracts
- dependency manifests and lockfiles when relevant
- package health, release notes, install scripts, and advisories when relevant
- general web sources when current external facts matter
- focused live tests or smoke checks when feasible

The time budget is 30 minutes per commit.

Codex returns markdown only. The front matter is small and stable so tooling can
index results and publish checks, but the body is meant for maintainers to read.

## Report Results

Expected `result` values:

- `nothing_found`: high-confidence clean review
- `findings`: concrete potential bug, regression, or security issue
- `inconclusive`: insufficient confidence or blocked verification
- `failed`: Codex/tooling failed before a reliable report
- `skipped_non_code`: cheap classifier skipped a non-code-only commit

Issue categories Codex looks for:

- bug
- regression
- security
- supply-chain
- data loss
- privacy
- reliability
- concurrency
- compatibility
- concrete test gaps that hide a plausible bug

The prompt explicitly excludes style nits, broad refactor taste, generic
cleanliness feedback, speculative security concerns without an executable path,
and test coverage complaints without a concrete risk.

## GitHub Checks

The check name is:

```text
ClawSweeper Commit Review
```

Check conclusions:

- `success`: high-confidence clean report or skipped non-code commit
- `failure`: high-confidence high/critical finding
- `neutral`: lower-severity finding, inconclusive review, or failed review
- `timed_out`: Codex timed out

Checks are created on the target repository commit by the ClawSweeper GitHub
App. They behave like CI in GitHub's UI, but are separate from the target
repository's normal test workflows.

Commit Sweeper does not post comments. Reports and checks are the only public
surfaces.

## Safety

The review worker receives only target read credentials while Codex runs.
Write/check credentials are created only after Codex exits.

The Codex environment strips GitHub and app secrets before subprocess launch.

Commit Sweeper is main-only. PR or branch review is deliberately out of scope
for this lane.

## Enable / Disable

Target repositories can disable hook-based dispatch with:

```text
CLAWSWEEPER_COMMIT_REVIEW_ENABLED=false
```

Manual dispatch can also set `enabled=false`.

Checks can be disabled per run with `create_checks=false`; reports are still
written.

## Related Files

- `.github/workflows/commit-review.yml`: receiver workflow
- `docs/commit-dispatcher.md`: target repository dispatch template
- `src/commit-sweeper.ts`: commit review CLI
- `src/commit-classifier.ts`: cheap path classifier and skipped reports
- `src/commit-checks.ts`: GitHub Check Run publishing
- `prompts/review-commit.md`: Codex review prompt
