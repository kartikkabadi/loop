# Loop / ClawSweeper to Devin Port Map

This document is the public architecture summary for the Devin migration.
Operator paths, account identifiers, host identities, secret names, and
credential risk tables are intentionally maintained outside the repository.

## Public architecture

```text
GitHub events and schedules
        |
        v
GitHub Actions coordinator
        |
        v
Worker environment with a narrow task capability
        |
        v
ACP client beside the Devin process
        |
        v
Validated result and evidence artifacts
        |
        v
Deterministic CI and authorized GitHub mutations
```

## Security boundaries

- The coordinator owns scheduling, repository policy, review decisions, and
  authorized mutations.
- The worker owns the task execution boundary, evidence generation, and
  cleanup of its temporary workspace.
- The agent receives only the task-scoped environment required for execution.
- Long-lived credentials, account identifiers, host identities, and raw
  session material are stored in the deployment environment, never in source
  files or committed evidence.
- Independent review uses a fresh session and a clean exact-head checkout.

## ACP contract

- The ACP client is colocated with the agent process.
- Session creation, prompting, cancellation, recovery, and result validation
  are explicit lifecycle operations.
- Cancellation is terminal for the current process; continuation uses a fresh
  session with host checkpoint rehydration.
- The transport layer is not treated as a persistent duplex ACP channel.

## Evidence policy

Public documentation records durable architectural conclusions and test
outcomes. Private operator records retain exact host details, provider IDs,
timestamps, raw session data, and deployment diagnostics when those details
are needed for incident response or reproducibility.
