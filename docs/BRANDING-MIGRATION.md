# Loop branding migration

Loop is the product name and the user-facing vocabulary for the control plane.
Product documentation should use these universal terms:

| Product concept | Preferred term |
| --- | --- |
| Repository intake, branch/PR projection, and repository policy | repository operations |
| Disposable execution resource and its acquire/sync/stop lifecycle | workspace |
| Model or agent backend used to execute a task | execution provider |
| Human or independent model assessment of an exact head | review |

## Intentionally preserved names

- **ClawSweeper** remains the name of the repository-maintenance subsystem in
  `src/clawsweeper.ts`, `src/repair/`, and its compatibility documentation.
- **Crabbox** remains the name of the workspace lifecycle adapter and its CLI
  integration. It is an implementation boundary, not the product name.
- Provider names, model names, CLI commands, environment variables, module
  names, and protocol names remain where they identify a real external
  contract, test fixture, or adapter implementation.

## Phased plan

1. Keep new product-facing README, ChatGPT Project, MCP, and status language
   provider-neutral and workspace-oriented.
2. Update adjacent Loop architecture and operations prose when it describes a
   product workflow, while retaining exact adapter names in boundary sections.
3. During future provider or workspace-adapter additions, expose the generic
   Loop terms in contracts and UI first; keep provider-specific names behind
   adapters and diagnostics.
4. Remove remaining legacy names only when their compatibility surface or
   external contract is retired, with tests and a migration note for any
   persisted identifiers.
