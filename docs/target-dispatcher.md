# Target Repository Dispatcher

`openclaw/clawsweeper` cannot receive native `issues` or `pull_request` events
from sibling repositories directly. Target repositories should forward those
events with `repository_dispatch` so ClawSweeper can run a single-job exact
one-item review, sync the durable review comment, and immediately apply a safe
close proposal for that same item.

Copy this workflow into each target repository as
`.github/workflows/clawsweeper-dispatch.yml`:

```yaml
name: ClawSweeper Dispatch

on:
  issues:
    types: [opened, reopened, edited, labeled, unlabeled]
  pull_request_target:
    types: [opened, reopened, synchronize, ready_for_review, edited, labeled, unlabeled]

permissions:
  contents: read

jobs:
  dispatch:
    runs-on: ubuntu-latest
    steps:
      - name: Create ClawSweeper dispatch token
        id: token
        uses: actions/create-github-app-token@v2
        with:
          app-id: ${{ secrets.CLAWSWEEPER_APP_ID }}
          private-key: ${{ secrets.CLAWSWEEPER_APP_PRIVATE_KEY }}
          owner: openclaw
          repositories: clawsweeper

      - name: Dispatch exact ClawSweeper review
        env:
          GH_TOKEN: ${{ steps.token.outputs.token }}
          TARGET_REPO: ${{ github.repository }}
          ITEM_NUMBER: ${{ github.event.issue.number || github.event.pull_request.number }}
          ITEM_KIND: ${{ github.event_name == 'pull_request_target' && 'pull_request' || 'issue' }}
        run: |
          payload="$(jq -nc \
            --arg target_repo "$TARGET_REPO" \
            --argjson item_number "$ITEM_NUMBER" \
            --arg item_kind "$ITEM_KIND" \
            '{event_type:"clawsweeper_item",client_payload:{target_repo:$target_repo,item_number:$item_number,item_kind:$item_kind}}')"
          gh api repos/openclaw/clawsweeper/dispatches \
            --method POST \
            --input - <<< "$payload"
```

The receiver keeps the review lane proposal-only, then runs exact apply for the
selected item with only immediate-safe close reasons enabled:
`implemented_on_main` and `duplicate_or_superseded`. Normal scheduled apply
still handles the broader backlog, with `stale_insufficient_info` blocked until
the item is at least 30 days old.

The event job creates only a target read token before Codex runs. The target
write token and the repository push token are introduced after Codex exits, and
the same `apply-decisions` guard path still re-fetches the item before any
comment or close mutation.
