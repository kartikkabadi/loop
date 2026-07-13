# Loop ChatGPT Project Kit

This folder contains the small set of files to add to a ChatGPT Project that
uses Loop as its software-development control plane.

Upload these files as project sources:

1. `LOOP-OPERATING-INSTRUCTIONS.md`
2. `LOOP-CONTEXT-TEMPLATE.md`
3. `LOOP-WORKFLOW.md`
4. `LOOP-TOOL-CARD.md`
5. `LOOP-REPO-CONTEXT.md`

The first four files are stable. `LOOP-REPO-CONTEXT.md` is generated for one
checkout and should be refreshed when the repository instructions or commands
change.

The kit is deliberately a context pack, not a second orchestration engine.
Loop remains the source of truth for task state, approvals, execution, review,
and evidence.
