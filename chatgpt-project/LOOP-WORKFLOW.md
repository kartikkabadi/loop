# Loop Workflow

Loop turns a conversation into a reviewable software change through explicit
states. ChatGPT is the interface. Loop is the durable state machine. GitHub is
the code and review ledger. Workspaces are disposable execution environments.

```text
user goal
  -> discover context
  -> plan and acceptance criteria
  -> show draft in ChatGPT
  -> human approves creation
  -> draft task or issue
  -> validate contract
  -> human approves dispatch
  -> workspace bootstrap
  -> execution provider implements and tests
  -> exact-head independent verification
  -> draft PR and review packet
  -> human reviews or requests repair
  -> human accepts completion
```

## Decision table

| User intent | ChatGPT action | Durable result |
| --- | --- | --- |
| "I want X" | Discover and plan | No mutation |
| "Show me the issue" | Render a bounded draft | No mutation |
| "Create this issue" | Create an inert draft issue or task | `loop:draft` |
| "This is ready, run it" | Validate, then ask for or use explicit dispatch approval | `loop:ready` or queued |
| "What is happening?" | Read workday, task, capacity, and review state | No mutation |
| "Review this PR" | Read exact-head review packet and evidence | Review decision in chat |
| "Fix these findings" | Show repair scope, then request bounded repair after approval | Repair attempt |
| Rate limit or workspace failure | Read durable checkpoint and capacity state | Waiting, paused, or blocked |

## Draft versus ready

Drafts are safe planning artifacts. They may contain a proposed title, body,
labels, acceptance criteria, and verification plan. They must not trigger a
workspace, execution provider, GitHub branch, PR, or production action.

Ready means the complete contract passed validation and a human approved the
next transition. A task can still wait for provider capacity or a workspace without
being broken.

## What the user should see

The human view should answer five questions:

1. What is the goal?
2. What changed?
3. What was verified, against which exact head?
4. What remains uncertain or blocked?
5. What decision is needed from me?

Keep agent transcripts, raw logs, and detailed evidence available behind an
`Agent details` section or a task/evidence lookup. Do not force the human to
read them to understand the current state.

## Recovery

If an agent or workspace stops, Loop preserves the task contract, checkpoint, exact
head, failure reason, and next retry time. A replacement run resumes from that
durable handoff after re-running environment bootstrap. A rate limit changes
capacity and cooldown state. It does not discard the task or switch to a paid
model.
