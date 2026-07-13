# PR review surface

Loop keeps the GitHub pull request useful for two readers at once.

The top of the PR is the human view:

- current status
- short summary
- gate table with evidence
- visual proof links when the task produces screenshots, GIFs, or videos
- a small Mermaid flow showing the path from plan to human acceptance

The technical section is collapsed under `Agent details`. It carries the task
identity, revision, commit, run metadata, and review findings without making a
human read the full agent transcript.

Every implementation starts as a draft PR. A runner result is publishable only
when every acceptance criterion is claimed satisfied, at least one verification
command passed, and the agent reports no blockers or scope deviations. That
claim is still not enough to make the PR ready. The independent verifier must
pass every required gate and the reviewer must approve the exact same commit.
Only then does Loop update the review surface and remove draft status. Human
acceptance remains a separate step before completion.

Visual proof is deliberately explicit. A trusted host may attach a GitHub URL
or a safe repository-relative artifact path. Loop rejects arbitrary URLs and
path traversal so review media cannot become an unsafe content injection path.
