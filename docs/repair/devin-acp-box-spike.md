# Phase 0 — Box Transport and ACP Recovery

This is the public summary of the Box transport and Devin ACP validation work.
Detailed operator evidence remains outside the public repository.

## What was validated

- Remote workspace provisioning, repository sync, command execution, artifact
  collection, and cleanup completed through the transport boundary.
- The ACP client must run beside `devin acp` inside the worker environment;
  the outer transport is not a persistent duplex ACP pipe.
- Session recovery and resume were validated with a fresh process and a
  persisted session identity.
- Cancellation is terminal for the current ACP process; continuation uses a
  fresh session with host checkpoint rehydration.
- Independent review uses a separate clean checkout and exact-head validation.
- Credentials remain outside Git history and are not passed to the model or
  the public coordinator beyond the narrow capability required for a task.

## Public boundary

The public report intentionally omits host IPs, SSH endpoints, operator
usernames, Box and lease identifiers, provider subdomains, local filesystem
paths, raw session identifiers, account metadata, and one-time test values.
Those details are operational evidence, not part of the public architecture
contract.

## Result

The transport is suitable as an execution boundary when the worker-side ACP
client, capability policy, exact-head review, artifact validation, and cleanup
rules remain in force. Production rollout still depends on the repository's
normal CI and deployment gates.
