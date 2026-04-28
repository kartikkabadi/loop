# Commit Review Dispatcher

`openclaw/clawsweeper` can review commits that land on a target repository's
`main` branch. The target repository forwards `push` events with
`repository_dispatch`; ClawSweeper expands the pushed range into one worker per
commit, writes one markdown report per commit, and optionally creates a GitHub
Check Run on each reviewed commit.

Reports are stored at:

```text
records/<repo-slug>/commits/<40-char-sha>.md
```

That path is canonical. Rerunning a commit review overwrites the existing report
for that SHA, including manual reruns with an additional prompt.

Copy this workflow into each target repository as
`.github/workflows/clawsweeper-commit-dispatch.yml`:

```yaml
name: ClawSweeper Commit Dispatch

on:
  push:
    branches: [main]

permissions:
  contents: read

concurrency:
  group: clawsweeper-commit-dispatch-${{ github.repository }}-${{ github.sha }}
  cancel-in-progress: false

jobs:
  dispatch:
    runs-on: ubuntu-latest
    if: ${{ vars.CLAWSWEEPER_COMMIT_REVIEW_ENABLED != 'false' }}
    env:
      HAS_CLAWSWEEPER_APP_PRIVATE_KEY: ${{ secrets.CLAWSWEEPER_APP_PRIVATE_KEY != '' }}
      CLAWSWEEPER_APP_CLIENT_ID: Iv23liOECG0slfuhz093
    steps:
      - name: Create ClawSweeper dispatch token
        id: token
        if: ${{ env.HAS_CLAWSWEEPER_APP_PRIVATE_KEY == 'true' }}
        uses: actions/create-github-app-token@1b10c78c7865c340bc4f6099eb2f838309f1e8c3 # v3.1.1
        with:
          client-id: ${{ env.CLAWSWEEPER_APP_CLIENT_ID }}
          private-key: ${{ secrets.CLAWSWEEPER_APP_PRIVATE_KEY }}
          owner: openclaw
          repositories: clawsweeper

      - name: Dispatch commit review
        env:
          GH_TOKEN: ${{ steps.token.outputs.token || secrets.OPENCLAW_GH_TOKEN }}
          TARGET_REPO: ${{ github.repository }}
          BEFORE_SHA: ${{ github.event.before }}
          AFTER_SHA: ${{ github.sha }}
        run: |
          if [ -z "$GH_TOKEN" ]; then
            echo "::notice::Skipping commit review dispatch because no dispatch credential is configured."
            exit 0
          fi
          payload="$(jq -nc \
            --arg target_repo "$TARGET_REPO" \
            --arg before_sha "$BEFORE_SHA" \
            --arg after_sha "$AFTER_SHA" \
            --arg ref "refs/heads/main" \
            '{event_type:"clawsweeper_commit_review",client_payload:{target_repo:$target_repo,before_sha:$before_sha,after_sha:$after_sha,ref:$ref,enabled:true,create_checks:true}}')"
          gh api repos/openclaw/clawsweeper/dispatches \
            --method POST \
            --input - <<< "$payload"
```

Disable the lane per target repo with:

```text
CLAWSWEEPER_COMMIT_REVIEW_ENABLED=false
```

Manual reviews can be started from the `ClawSweeper Commit Review` workflow in
this repository. Inputs:

- `target_repo`: target repository, default `openclaw/openclaw`
- `commit_sha`: exact commit SHA
- `before_sha`: optional base SHA; when present, the workflow reviews every
  commit in `before_sha..commit_sha`
- `additional_prompt`: appended to the commit-review prompt for that run
- `create_checks`: create/update the target commit Check Run
- `enabled`: emergency no-op switch

Large ranges are paged automatically. Each workflow run starts one matrix worker
per commit for up to GitHub's matrix limit, then dispatches the next page until
the whole range has one report per commit.

The check name is `ClawSweeper Commit Review`. Clean high-confidence reports use
`success`; high-confidence high/critical findings use `failure`; inconclusive
or lower-confidence findings use `neutral`.
