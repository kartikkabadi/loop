# Loop Project Context

Copy this file for a connected repository and fill in the values that are
known. Leave a value as `unknown` or `needs discovery` when it cannot be
verified yet.

## Project identity

- Project name: `unknown`
- Repository: `unknown`
- Repository mode: `owned | fork contribution | external contribution | unknown`
- Upstream repository, if any: `unknown`
- Default branch: `needs discovery`
- Current task or issue: `none`

## Authority and context

- Primary product or architecture document: `needs discovery`
- Repository instruction files: `needs discovery`
- Contribution or security policy: `needs discovery`
- Plans or task ledger: `needs discovery`
- Relevant source paths: `needs discovery`
- Paths that must not be changed: `none declared`

## Verification contract

- Package manager and runtime: `needs discovery`
- Install command: `needs discovery`
- Fast checks: `needs discovery`
- Full checks: `needs discovery`
- Browser or UI proof required: `unknown`
- Live or staging proof required: `unknown`
- Visual evidence format: `screenshots, GIFs, or video when useful`
- Required proof artifacts: `needs discovery`

## Safety and approvals

- Allowed Loop automation: `plan only | draft issues | approved runs | unknown`
- Human who approves plans: `needs discovery`
- Human who reviews exact heads: `needs discovery`
- Human who accepts completion: `needs discovery`
- Merge authority: `human only`
- Production access: `human only unless explicitly scoped`
- Secret policy: `never place secrets in ChatGPT Project files, issues, prompts,
  logs, or agent output`

## Provider and environment defaults

- Execution provider: `configured provider`
- Execution model: `configured model`
- Workspace: `isolated workspace`
- Browser tool: `agent-browser when required by the contract`
- Firewall: `sfw when available and required by the workspace bootstrap`
- Network policy: `needs discovery`
- Review provider: `human, with optional independent model review`

## Update rule

This file is a compact contract, not a substitute for the repository's own
authority files or Loop's durable state. Refresh it after changes to the
repository, package commands, verification policy, or human approval policy.
