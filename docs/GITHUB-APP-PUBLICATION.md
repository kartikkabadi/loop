# GitHub App publication

Loop's repository publication adapter accepts a GitHub App installation token,
not a personal access token. `createLoopGitHubAppClient` mints the token from an
App JWT using Web Crypto, caches it only in the Worker isolate until shortly
before expiry, and fails closed when the token response is invalid.

Configure these as Worker secrets/vars only after creating the least-privilege
App described in the main spec:

- `LOOP_GITHUB_APP_ID`
- `LOOP_GITHUB_INSTALLATION_ID`
- `LOOP_GITHUB_APP_PRIVATE_KEY`

The current Worker does not enable publication merely because those names are
present; the adapter must be wired into the deterministic coordinator in the
deployment environment. No personal `gh` token is used as a fallback.
