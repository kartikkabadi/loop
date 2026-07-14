# GitHub App, Auth0, and MCP setup

This is the operator checklist for running Loop against any GitHub repository.
It describes the current implementation; it does not create GitHub, Auth0, or
Cloudflare resources automatically.

## Trust boundaries

| Boundary | Purpose | Configuration |
| --- | --- | --- |
| Auth0 | Authenticate MCP callers and map JWT scope claims to Loop scopes | AUTH0_ISSUER, AUTH0_AUDIENCE, optional subject/email allowlists |
| GitHub App | Read repository state and publish issues, draft PRs, checks, labels, and comments | LOOP_GITHUB_APP_ID, LOOP_GITHUB_INSTALLATION_ID, LOOP_GITHUB_APP_PRIVATE_KEY |
| HMAC event channels | Authenticate GitHub webhooks and host-owned runner events | GITHUB_WEBHOOK_SECRET, LOOP_WORKFLOW_EVENT_SECRET |

The GitHub App key is used only by the Worker to mint short-lived installation
tokens. It is never an MCP argument, Box secret, or Devin credential. MCP is an
intent-level API and does not expose shell, raw GitHub tokens, provider
controls, or merge operations.

## Operator-owned actions

An operator with authority over the target systems must:

- Create the GitHub App, generate/download its private key, and install it on
  each target repository.
- Choose the repository access boundary. For universal onboarding, select
  “Only select repositories” and add each repository explicitly. Use “All
  repositories” only when that broad grant is intentional.
- Configure the App or repository webhook. The current Worker expects POST
  /webhooks/github.
- Create/configure the Auth0 tenant, API audience, client, callback/origin
  settings, users, and connections.
- Decide which Auth0 subject or verified email may operate the deployment and
  which Loop scopes that principal receives.
- Create the Cloudflare Worker, D1, R2, Queue, Durable Object, and Workflow
  resources, apply migrations, and provision secrets.
- Provide Devin/Box/provider credentials to host-owned execution adapters.

These actions cannot be completed safely from repository code without operator
credentials or authorization. Never paste private keys, client secrets, bearer
tokens, webhook secrets, or provider credentials into source, issues, ChatGPT
project files, task contracts, logs, or evidence artifacts.

## GitHub App permissions

Create the App with this least-privilege repository permission set:

| Permission | Access | Current use |
| --- | --- | --- |
| Metadata | Read-only | Required baseline repository metadata |
| Contents | Read-only | Resolve the base branch ref and authoritative base SHA |
| Issues | Read and write | Create Loop issues, add labels, and upsert issue comments |
| Pull requests | Read and write | Inspect/open PRs, create draft PRs, update PR bodies and draft state |
| Checks | Read and write | Find and create/update deterministic check runs |

Do not grant Actions, Administration, Members, Secrets, Variables, Deployments,
Pages, Workflows, Discussions, or Commit statuses. The App does not merge PRs,
push branches, or create branches; host publication code owns workspace git
operations and the App publishes the GitHub projection.

## Events and webhook expectations

Enable these App/repository events:

- Issues — required for loop:ready issue intake and issue lifecycle delivery.
- Issue comment — required for the optional @loop status|dispatch|verify|retry|stop|resume|explain|review command bridge.

Deliver to:

~~~text
https://YOUR_WORKER_HOST/webhooks/github
~~~

The Worker requires X-GitHub-Delivery, X-GitHub-Event,
X-Hub-Signature-256 (computed with GITHUB_WEBHOOK_SECRET), and a JSON object
body no larger than 128 KiB. It acknowledges valid deliveries with 202,
deduplicates delivery IDs for seven days, and processes them through the Queue.
The webhook secret is distinct from the App private key.

Only issues and issue_comment are dispatched by the current processor.
pull_request, pull_request_review, and other events do not add behavior until
code explicitly handles them.

## Auth0 and MCP authorization

The Worker validates Auth0 RS256 JWTs against issuer JWKS:

~~~text
AUTH0_ISSUER=https://YOUR_TENANT_REGION.auth0.com/
AUTH0_AUDIENCE=https://YOUR_LOOP_API
LOOP_REQUIRE_VERIFIED_EMAIL=true
~~~

The issuer must use HTTPS. Tokens need matching iss and audience claims, valid
exp/optional nbf, sub, and (by default) email_verified=true. Optional fail-closed
restrictions are LOOP_ALLOWED_SUBJECT and LOOP_ALLOWED_EMAIL.

Configure these exact OAuth/MCP scopes in the Auth0 API permissions/scope claims:

~~~text
loop:read       list/get work, capacity, reviews, and evidence
loop:plan       create drafts and validate plans
loop:dispatch   approve/start/pause/resume/cancel/recover/escalate tasks and mark issues ready
loop:repair     request bounded repair
loop:approve    submit review and approve/complete tasks
~~~

Unknown scopes are ignored. Grant loop:read first and grant write scopes only
to named operators. Keep loop:approve separate from the reviewer when
independent approval is required.

Discovery and MCP endpoints are:

~~~text
GET  https://YOUR_WORKER_HOST/.well-known/oauth-protected-resource
GET  https://YOUR_WORKER_HOST/docs/mcp
GET  https://YOUR_WORKER_HOST/mcp
POST https://YOUR_WORKER_HOST/mcp
~~~

Unauthenticated tool requests must fail closed with 401. Public GET discovery
does not grant tool access.

## Cloudflare secrets and deployment

Use checked-in configuration and migrations. Never put secret values in
gateway/wrangler.toml:

~~~bash
pnpm install
pnpm run gateway:typecheck
pnpm run gateway:migrate:remote

wrangler secret put AUTH0_ISSUER --config gateway/wrangler.toml
wrangler secret put AUTH0_AUDIENCE --config gateway/wrangler.toml
wrangler secret put GITHUB_WEBHOOK_SECRET --config gateway/wrangler.toml
wrangler secret put LOOP_WORKFLOW_EVENT_SECRET --config gateway/wrangler.toml
wrangler secret put LOOP_GITHUB_APP_PRIVATE_KEY --config gateway/wrangler.toml
wrangler secret put LOOP_GITHUB_APP_ID --config gateway/wrangler.toml
wrangler secret put LOOP_GITHUB_INSTALLATION_ID --config gateway/wrangler.toml
wrangler deploy --config gateway/wrangler.toml
~~~

Store the App key as PEM; the adapter accepts PKCS#8 or RSA PKCS#1 PEM and
normalizes escaped newlines. Rotate the App key and both HMAC secrets through
the provider's secret rotation process, then verify access before retiring old
values. Do not echo secret input.

For local development, use local-only secrets/vars and local D1 migrations.
Never reuse production D1, R2, Queue, App keys, Auth0 secrets, or webhook
secrets. A local wrangler dev process is not equivalent to the hosted Worker.

The Box runner sends signed /workflow-events messages with
LOOP_WORKFLOW_EVENT_SECRET. This is not a GitHub webhook and uses no GitHub
App permission. Keep it only on the host runner and Worker.

## Verification

Replace placeholders locally and do not commit real values:

~~~bash
BASE=https://YOUR_WORKER_HOST
curl --fail-with-body "$BASE/healthz"
curl --fail-with-body "$BASE/.well-known/oauth-protected-resource"
curl --fail-with-body "$BASE/docs/mcp"

# Public discovery must not make tool calls unauthenticated.
test "$(curl -sS -o /dev/null -w '%{http_code}' -X POST \
  -H 'content-type: application/json' \
  --data '{"jsonrpc":"2.0","id":1,"method":"tools/list"}' "$BASE/mcp")" = 401

# Requires operator GitHub credentials; verifies App installation on this repo.
gh api "repos/OWNER/REPOSITORY/installation" \
  --jq '{id: .id, app: .app_slug, repository: .repository_selection}'

# Lists names only; it does not print secret values.
wrangler secret list --config gateway/wrangler.toml
~~~

With an Auth0 access token containing loop:read:

~~~bash
curl --fail-with-body -X POST "$BASE/mcp" \
  -H "authorization: Bearer $LOOP_ACCESS_TOKEN" \
  -H 'content-type: application/json' \
  -H 'MCP-Protocol-Version: 2025-03-26' \
  --data '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"loop.tasks.list","arguments":{}}}'
~~~

For a harmless signed webhook smoke test, use an unsupported event payload
and confirm 202 plus Worker/Queue observability. Do not use a real loop:ready
issue or mutating comment unless the operator intends to create task state:

~~~bash
BODY='{"zen":"Loop webhook smoke test"}'
SIG="sha256=$(printf %s "$BODY" | openssl dgst -sha256 -hmac "$GITHUB_WEBHOOK_SECRET" -hex | sed 's/^.* //')"
curl --fail-with-body -X POST "$BASE/webhooks/github" \
  -H 'content-type: application/json' \
  -H 'x-github-delivery: local-smoke-REPLACE-ME' \
  -H 'x-github-event: ping' \
  -H "x-hub-signature-256: $SIG" \
  --data "$BODY"
~~~

Also inspect Worker logs, Queue/DLQ, D1 migration state, and one authenticated
read. Health/typecheck alone does not prove App installation, webhook signing,
Auth0 scopes, or publication permissions.

## Current limits

- The App setup is installation-based. Universal onboarding repeats
  installation and records the installation ID per target repository; code
  cannot safely discover or grant access.
- Auth0 client registration, consent, callbacks, and token issuance are
  identity-provider work. This repository validates tokens but does not issue
  them or implement a login UI.
- Publication is disabled until all three App values are present and the
  relevant adapter is wired into deployment. There is no PAT fallback.
- LOOP_ALLOWED_GITHUB_ACTOR is a separate exact-login allowlist for mutating
  GitHub comment commands; it is not an Auth0 scope.
