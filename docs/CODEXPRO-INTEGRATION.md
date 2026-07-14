# CodexPro MCP integration

Loop uses [rebel0789/codexpro](https://github.com/rebel0789/codexpro) as a
reference for the ChatGPT-facing MCP experience, not as the orchestration
engine.

## Two complementary MCP surfaces

```text
ChatGPT
  ├── hosted Loop MCP → account-wide tasks, approvals, runs, evidence, reviews
  └── optional CodexPro MCP → one deliberately selected local checkout
```

The hosted Loop endpoint remains the source of truth for task lifecycle and
provider execution. CodexPro is useful when ChatGPT should inspect or work on a
checkout that is already on the operator's machine.

## Patterns adopted from CodexPro

Loop's MCP protocol now includes:

- server instructions that describe the safe task-first workflow;
- concrete JSON Schemas for every tool instead of one permissive schema;
- read-only/write annotations and per-tool OAuth security metadata;
- bounded `structuredContent` and compact text results;
- an MCP-native `mcp/www_authenticate` challenge when a tool scope is missing;
- explicit optimistic-concurrency and idempotency fields on state-changing tools.

These patterns improve tool selection and retry behavior without exposing local
shell, raw provider controls, credentials, or merge operations.

## Local CodexPro mode

For an intentional local-repository session, install and run CodexPro from the
checkout you want to expose:

```bash
npm install -g codexpro
cd /absolute/path/to/repository
codexpro start --root /absolute/path/to/repository --bash safe --tunnel cloudflare
```

Use CodexPro's workspace root and path/symlink guards. Keep generic writes off
unless the local session is trusted, and use `--no-bash` when inspection is
enough. Read CodexPro's [security policy](https://github.com/rebel0789/codexpro/blob/main/SECURITY.md)
before exposing a tunnel.

CodexPro's URL-token mode is suitable for a personal local prototype, but Loop
does not use bearer tokens in connector URLs. The hosted Loop path uses
OAuth/Auth0 bearer tokens in the `Authorization` header, verifies issuer,
audience, expiry, signature, subject, and scope, and keeps publication and
execution behind server-side adapters.

## ChatGPT workflow for hosted Loop

Once the Auth0 tenant is configured, register the deployed `/mcp` URL in a
ChatGPT Developer Mode app. The intended sequence is:

1. `loop.tasks.create_draft`
2. `loop.tasks.validate`
3. `loop.tasks.approve`
4. `loop.runs.start`
5. `loop.tasks.get`, `loop.review.get`, and `loop.evidence.*`
6. `loop.review.submit`, followed by completion approval when appropriate

Every write should carry `expectedVersion` and a stable `idempotencyKey` so a
ChatGPT retry cannot silently advance state twice.

## Deliberate boundary

Loop does not vendor CodexPro's local file or shell tools into the hosted
Worker. A public MCP server that can write arbitrary paths or execute shell
commands would collapse the distinction between planning and execution and
would bypass Loop's Box, GitHub, review, and audit controls. The two MCP
surfaces can coexist, but they have different trust scopes.
