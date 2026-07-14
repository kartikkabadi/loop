# Secrets and Deployment

This repository is public by design. A public clone must build, lint, test, and
produce Wrangler dry-run output without access to production credentials. A
production deployment is a separate trusted operation performed by GitHub
Actions and Cloudflare.

## Configuration classes

| Class | Examples | Where it lives |
| --- | --- | --- |
| Public code and contract | Worker code, binding names, migration files, safe feature defaults | Git |
| Non-secret coordinates | Cloudflare account ID, public status URL, ingest URL, worker name | GitHub repository variables or local environment |
| Secret credentials | Cloudflare API token, ingest token, App private key, webhook/HMAC secrets, Auth0 client secrets | GitHub Actions secrets and Cloudflare Worker secrets |
| Private evidence | Incident exports, operator notes, raw logs, credentials, deployment transcripts | Ignored local directories or a private evidence store |

Resource names and IDs identify infrastructure but do not authenticate to it.
They may remain in checked-in Wrangler configuration when they are useful for
reproducible migrations. Treat them as operational metadata, not as passwords;
move them to GitHub variables or a private generated config if their disclosure
is itself a concern.

## Build contract

The public build path has no production dependency:

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm run check
pnpm exec wrangler@4.107.0 deploy --dry-run --config dashboard/wrangler.toml
```

Tests use valid example URLs and local in-memory bindings. Missing optional
tokens cause notification/telemetry steps to skip. A configured token never
falls back to a fake URL: the endpoint is derived from the public status URL
or supplied through `CLAWSWEEPER_STATUS_INGEST_URL`.

Local secrets belong in ignored `.env` or `.dev.vars` files. Keep a
`.dev.vars.example` file limited to names and non-sensitive examples if a local
workflow needs one. Never commit a real key, token, cookie, signed payload,
private URL, or operator evidence.

## Production flow

1. GitHub Actions reads Cloudflare account coordinates from repository
   variables and credentials from Actions secrets.
2. Wrangler receives `CLOUDFLARE_ACCOUNT_ID` from the job environment; the
   account ID is not appended to a generated source file.
3. The dashboard workflow writes a short-lived JSON file in the runner's temp
   directory and runs `wrangler secret bulk` for `INGEST_TOKEN`,
   `CLAWSWEEPER_APP_PRIVATE_KEY`, and `CLAWSWEEPER_WEBHOOK_SECRET`.
4. Wrangler deploys the checked-in `dashboard/wrangler.toml`. Secret values are
   never placed in `[vars]`, committed, printed, or sent through a hand-built
   Cloudflare REST request.
5. A smoke test checks the public dashboard and the durable object path.

The gateway follows the same model. Use `wrangler secret put` or a reviewed
secret-bulk step for `AUTH0_ISSUER`, `AUTH0_AUDIENCE`, GitHub App credentials,
webhook secrets, and Loop workflow-event secrets. Migrations and resource
bindings remain in Wrangler configuration; credentials do not.

## Rotation and incident response

- Rotate a credential at its source first, then update the GitHub secret and
  Cloudflare Worker secret, then run the deployment smoke test.
- Revoke exposed credentials immediately. Redaction does not make a leaked
  credential safe.
- Add a narrow test or scanner rule for every incident class that was found.
- Keep historical comments and PR records when they are useful, but remove or
  replace sensitive body text and request GitHub Support to purge immutable
  pull-request refs when ordinary ref updates cannot reach them.
- Never assume `.gitignore` repairs Git history. It only prevents new files
  from being staged.

## Review rule

Before publishing a change, scan the current tree, reachable branch and tag
tips, generated artifacts, workflow logs/artifacts, open PR bodies/comments,
and deployment configuration separately. A clean current branch does not prove
that old GitHub Actions logs or retained pull-request refs are clean.
