import type {
  LoopRepositoryAdapter,
  LoopPublishedChange,
  LoopRepositorySnapshot,
} from "./orchestrator.js";
import type { LoopTaskContract } from "./task-contract.js";
import {
  LOOP_DRAFT_LABEL,
  LOOP_READY_LABEL,
  LOOP_REVIEW_READY_LABEL,
  renderLoopContractBlock,
} from "./github-intake.js";

type GitHubRequest = Readonly<{
  method: "GET" | "POST" | "PATCH";
  path: string;
  body?: Readonly<Record<string, unknown>>;
}>;

export interface LoopGitHubClient {
  request(input: GitHubRequest): Promise<unknown>;
}

export interface LoopGitHubIssuePublisher {
  createIssue(
    input: Readonly<{
      contract: LoopTaskContract;
      draft?: boolean;
    }>,
  ): Promise<Readonly<{ number: number; url?: string; draft: boolean }>>;
  markIssueReady(
    input: Readonly<{
      owner: string;
      repository: string;
      issueNumber: number;
    }>,
  ): Promise<Readonly<{ number: number; url?: string }>>;
}

export type GitHubFetchClientOptions = Readonly<{
  token: string;
  fetch?: typeof globalThis.fetch;
  apiOrigin?: string;
}>;

function nonEmpty(value: unknown, label: string): string {
  if (typeof value !== "string" || value.length === 0 || value.includes("\0"))
    throw new Error(`${label} must be a non-empty string`);
  return value;
}

function sha(value: unknown, label: string): string {
  const result = nonEmpty(value, label);
  if (!/^[0-9a-f]{7,64}$/i.test(result)) throw new Error(`${label} must be a git SHA`);
  return result;
}

function record(value: unknown, label: string): Record<string, unknown> {
  if (!value || typeof value !== "object" || Array.isArray(value))
    throw new Error(`${label} must be an object`);
  return value as Record<string, unknown>;
}

function repositoryPath(contract: LoopTaskContract): string {
  return `repos/${encodeURIComponent(contract.repository.owner)}/${encodeURIComponent(contract.repository.name)}`;
}

function branchPath(branch: string): string {
  return branch
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");
}

function positiveInteger(value: unknown, label: string): number {
  if (typeof value !== "number" || !Number.isSafeInteger(value) || value < 1)
    throw new Error(`${label} must be a positive integer`);
  return value;
}

function issueRepositoryPath(owner: string, repository: string): string {
  return `repos/${encodeURIComponent(nonEmpty(owner, "GitHub owner"))}/${encodeURIComponent(nonEmpty(repository, "GitHub repository"))}`;
}

/** GitHub issue projection for the ChatGPT -> plan -> ready intake path. */
export class GitHubLoopIssuePublisher implements LoopGitHubIssuePublisher {
  readonly #client: LoopGitHubClient;

  constructor(client: LoopGitHubClient) {
    this.#client = client;
  }

  async createIssue(input: Readonly<{ contract: LoopTaskContract; draft?: boolean }>) {
    const draft = input.draft ?? true;
    const repository = issueRepositoryPath(
      input.contract.repository.owner,
      input.contract.repository.name,
    );
    const result = record(
      await this.#client.request({
        method: "POST",
        path: `${repository}/issues`,
        body: {
          title: input.contract.identity.title,
          body: renderLoopContractBlock(input.contract),
          labels: [draft ? LOOP_DRAFT_LABEL : LOOP_READY_LABEL],
        },
      }),
      "GitHub issue response",
    );
    return {
      number: positiveInteger(result.number, "issue number"),
      ...(typeof result.html_url === "string" ? { url: result.html_url } : {}),
      draft,
    };
  }

  async markIssueReady(
    input: Readonly<{ owner: string; repository: string; issueNumber: number }>,
  ) {
    const repository = issueRepositoryPath(input.owner, input.repository);
    const issueNumber = positiveInteger(input.issueNumber, "issue number");
    await this.#client.request({
      method: "POST",
      path: `${repository}/issues/${issueNumber}/labels`,
      body: { labels: [LOOP_READY_LABEL] },
    });
    return {
      number: issueNumber,
    };
  }
}

export type LoopCheckPublication = Readonly<{
  name: string;
  headSha: string;
  status: "queued" | "in_progress" | "completed";
  conclusion?:
    | "action_required"
    | "cancelled"
    | "failure"
    | "neutral"
    | "skipped"
    | "stale"
    | "success"
    | "timed_out";
  summary: string;
  detailsUrl?: string;
  annotations?: readonly Readonly<{
    path: string;
    start_line: number;
    end_line: number;
    message: string;
  }>[];
}>;

export type LoopStatusCommentInput = Readonly<{
  issueNumber: number;
  taskId: string;
  runId: string;
  generation: number;
  body: string;
}>;

const CHECK_ANNOTATION_LIMIT = 50;

function checkPayload(input: LoopCheckPublication, externalId: string): Record<string, unknown> {
  const status = input.status;
  if (status === "completed" && !input.conclusion)
    throw new Error(`completed check ${input.name} requires a conclusion`);
  if (status !== "completed" && input.conclusion)
    throw new Error(`non-completed check ${input.name} cannot have a conclusion`);
  return {
    name: nonEmpty(input.name, "check name"),
    head_sha: sha(input.headSha, "check head SHA"),
    status,
    ...(input.conclusion ? { conclusion: input.conclusion } : {}),
    external_id: externalId,
    ...(input.detailsUrl ? { details_url: nonEmpty(input.detailsUrl, "check details URL") } : {}),
    output: {
      title: `Loop / ${input.name}`,
      summary: nonEmpty(input.summary, "check summary"),
      ...(input.annotations
        ? { annotations: input.annotations.slice(0, CHECK_ANNOTATION_LIMIT) }
        : {}),
    },
  };
}

/** Fetch-based client. The token is held only by the caller's process. */
export function createLoopGitHubFetchClient(options: GitHubFetchClientOptions): LoopGitHubClient {
  const token = nonEmpty(options.token, "GitHub token");
  const request = options.fetch ?? globalThis.fetch;
  const origin = options.apiOrigin ?? "https://api.github.com";
  return {
    async request(input) {
      const response = await request(`${origin}/${input.path}`, {
        method: input.method,
        headers: {
          accept: "application/vnd.github+json",
          authorization: `Bearer ${token}`,
          "x-github-api-version": "2022-11-28",
          ...(input.body ? { "content-type": "application/json" } : {}),
        },
        ...(input.body ? { body: JSON.stringify(input.body) } : {}),
      });
      const text = await response.text();
      let body: unknown = null;
      if (text.length > 0) {
        try {
          body = JSON.parse(text);
        } catch {
          body = text;
        }
      }
      if (!response.ok) throw new Error(`GitHub API ${response.status}: ${JSON.stringify(body)}`);
      return body;
    },
  };
}

export type LoopGitHubAppClientOptions = Readonly<{
  appId: string;
  installationId: string;
  privateKeyPem: string;
  fetch?: typeof globalThis.fetch;
  apiOrigin?: string;
  now?: () => number;
}>;

function base64UrlBytes(value: Uint8Array): string {
  let binary = "";
  for (const byte of value) binary += String.fromCharCode(byte);
  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlText(value: string): string {
  return base64UrlBytes(new TextEncoder().encode(value));
}

function pemBytes(pem: string): Uint8Array {
  const normalized = pem.replaceAll("\\n", "\n").trim();
  const match = normalized.match(/^-----BEGIN ([A-Z ]+)-----([\s\S]+?)-----END \1-----$/);
  if (!match) throw new Error("GitHub App private key must be a PEM value");
  const encoded = match[2]!.replace(/\s/g, "");
  const bytes = atob(encoded);
  return Uint8Array.from(bytes, (character) => character.charCodeAt(0));
}

function derLength(length: number): Uint8Array {
  if (!Number.isSafeInteger(length) || length < 0) throw new Error("invalid DER length");
  if (length < 128) return Uint8Array.of(length);
  const bytes: number[] = [];
  let remaining = length;
  while (remaining > 0) {
    bytes.unshift(remaining & 0xff);
    remaining >>>= 8;
  }
  return Uint8Array.of(0x80 | bytes.length, ...bytes);
}

function derSequence(...parts: Uint8Array[]): Uint8Array {
  const content = new Uint8Array(parts.reduce((total, part) => total + part.length, 0));
  let offset = 0;
  for (const part of parts) {
    content.set(part, offset);
    offset += part.length;
  }
  return Uint8Array.of(0x30, ...derLength(content.length), ...content);
}

function derTlv(tag: number, value: Uint8Array): Uint8Array {
  return Uint8Array.of(tag, ...derLength(value.length), ...value);
}

function pkcs8PrivateKey(pem: string): Uint8Array {
  const normalized = pem.replaceAll("\\n", "\n").trim();
  const der = pemBytes(normalized);
  if (normalized.includes("BEGIN PRIVATE KEY")) return der;
  if (!normalized.includes("BEGIN RSA PRIVATE KEY"))
    throw new Error("GitHub App private key must be PKCS#8 or RSA PKCS#1 PEM");
  return derSequence(
    derTlv(0x02, Uint8Array.of(0x00)),
    derSequence(
      derTlv(0x06, Uint8Array.of(0x2a, 0x86, 0x48, 0x86, 0xf7, 0x0d, 0x01, 0x01, 0x01)),
      derTlv(0x05, new Uint8Array()),
    ),
    derTlv(0x04, der),
  );
}

function arrayBuffer(bytes: Uint8Array): ArrayBuffer {
  return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
}

async function signGitHubAppJwt(
  appId: string,
  privateKeyPem: string,
  now: number,
): Promise<string> {
  const header = base64UrlText(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const issuedAt = Math.floor(now / 1000) - 60;
  const payload = base64UrlText(
    JSON.stringify({ iat: issuedAt, exp: issuedAt + 9 * 60, iss: appId }),
  );
  const input = `${header}.${payload}`;
  const key = await crypto.subtle.importKey(
    "pkcs8",
    arrayBuffer(pkcs8PrivateKey(privateKeyPem)),
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign(
    "RSASSA-PKCS1-v1_5",
    key,
    new TextEncoder().encode(input),
  );
  return `${input}.${base64UrlBytes(new Uint8Array(signature))}`;
}

/**
 * GitHub App installation-token client. It mints short-lived tokens in
 * memory, caches one token per Worker isolate, and never accepts a PAT
 * fallback. The private key is used only for the JWT signing operation.
 */
export function createLoopGitHubAppClient(options: LoopGitHubAppClientOptions): LoopGitHubClient {
  const appId = nonEmpty(options.appId, "GitHub App ID");
  const installationId = nonEmpty(options.installationId, "GitHub installation ID");
  if (!/^\d+$/.test(appId) || !/^\d+$/.test(installationId))
    throw new Error("GitHub App ID and installation ID must be numeric");
  const privateKeyPem = nonEmpty(options.privateKeyPem, "GitHub App private key");
  const request = options.fetch ?? globalThis.fetch;
  const origin = options.apiOrigin ?? "https://api.github.com";
  const now = options.now ?? (() => Date.now());
  let cached: { token: string; expiresAt: number } | undefined;
  let pending: Promise<string> | undefined;

  async function accessToken(): Promise<string> {
    const currentTime = now();
    if (cached && cached.expiresAt - currentTime > 30_000) return cached.token;
    if (pending) return pending;
    pending = (async () => {
      const jwt = await signGitHubAppJwt(appId, privateKeyPem, currentTime);
      const response = await request(
        `${origin}/app/installations/${encodeURIComponent(installationId)}/access_tokens`,
        {
          method: "POST",
          headers: {
            accept: "application/vnd.github+json",
            authorization: `Bearer ${jwt}`,
            "x-github-api-version": "2022-11-28",
            "content-type": "application/json",
          },
        },
      );
      const body = await response.json().catch(() => null);
      if (!response.ok || !body || typeof body !== "object" || Array.isArray(body))
        throw new Error(`GitHub App token request failed with HTTP ${response.status}`);
      const token = (body as { token?: unknown }).token;
      const expiresAt = (body as { expires_at?: unknown }).expires_at;
      if (typeof token !== "string" || token.length === 0)
        throw new Error("GitHub App token response did not include a token");
      const parsedExpiry = typeof expiresAt === "string" ? Date.parse(expiresAt) : NaN;
      const expiry = Number.isFinite(parsedExpiry) ? parsedExpiry : currentTime + 9 * 60 * 1000;
      cached = { token, expiresAt: expiry };
      return token;
    })().finally(() => {
      pending = undefined;
    });
    return pending;
  }

  return {
    async request(input) {
      const token = await accessToken();
      return createLoopGitHubFetchClient({
        token,
        fetch: request,
        apiOrigin: origin,
      }).request(input);
    },
  };
}

/**
 * GitHub repository intake/publish adapter. It never creates a branch: the
 * agent is responsible for committing and pushing inside its workspace. This
 * adapter resolves the authoritative base SHA and opens the pull request only
 * after the agent reports its pushed head branch.
 */
export class GitHubLoopRepositoryAdapter implements LoopRepositoryAdapter {
  readonly #client: LoopGitHubClient;

  constructor(client: LoopGitHubClient) {
    this.#client = client;
  }

  async resolveSnapshot(contract: LoopTaskContract): Promise<LoopRepositorySnapshot> {
    const repository = repositoryPath(contract);
    const baseBranch = nonEmpty(contract.repository.baseBranch, "base branch");
    const ref = record(
      await this.#client.request({
        method: "GET",
        path: `${repository}/git/ref/heads/${branchPath(baseBranch)}`,
      }),
      "GitHub ref response",
    );
    const object = record(ref.object, "GitHub ref object");
    const baseSha = sha(object.sha, "base SHA");
    if (contract.repository.baseSha && contract.repository.baseSha !== baseSha) {
      throw new Error(
        `repository base SHA changed: contract=${contract.repository.baseSha}, live=${baseSha}`,
      );
    }
    if (contract.repository.existingPullRequest === undefined) return { baseSha };
    const pull = record(
      await this.#client.request({
        method: "GET",
        path: `${repository}/pulls/${contract.repository.existingPullRequest}`,
      }),
      "GitHub pull request response",
    );
    const head = record(pull.head, "GitHub pull request head");
    return { baseSha, currentHeadSha: sha(head.sha, "pull request head SHA") };
  }

  async publish(
    input: Readonly<{
      contract: LoopTaskContract;
      headBranch: string;
    }>,
  ): Promise<LoopPublishedChange> {
    const repository = repositoryPath(input.contract);
    const headBranch = nonEmpty(input.headBranch, "head branch");
    const head =
      input.contract.repository.mode === "external-contribution" && input.contract.repository.fork
        ? `${nonEmpty(input.contract.repository.fork.owner, "fork owner")}:${headBranch}`
        : headBranch;
    let pull: Record<string, unknown> | undefined;
    if (input.contract.repository.existingPullRequest !== undefined) {
      pull = record(
        await this.#client.request({
          method: "GET",
          path: `${repository}/pulls/${input.contract.repository.existingPullRequest}`,
        }),
        "GitHub existing pull request response",
      );
    } else {
      const open = await this.#client.request({
        method: "GET",
        path: `${repository}/pulls?head=${encodeURIComponent(head)}&state=open&per_page=100`,
      });
      const matches = Array.isArray(open)
        ? open.filter((entry): entry is Record<string, unknown> => {
            if (!entry || typeof entry !== "object" || Array.isArray(entry)) return false;
            const value = entry as Record<string, unknown>;
            const entryHead = value.head;
            const entryBase = value.base;
            return Boolean(
              entryHead &&
              typeof entryHead === "object" &&
              !Array.isArray(entryHead) &&
              (entryHead as Record<string, unknown>).ref === headBranch &&
              entryBase &&
              typeof entryBase === "object" &&
              !Array.isArray(entryBase) &&
              (entryBase as Record<string, unknown>).ref === input.contract.repository.baseBranch,
            );
          })
        : [];
      if (matches.length > 1) throw new Error("multiple deterministic Loop pull requests found");
      pull = matches[0];
    }
    if (!pull) {
      pull = record(
        await this.#client.request({
          method: "POST",
          path: `${repository}/pulls`,
          body: {
            title: input.contract.identity.title,
            head,
            base: input.contract.repository.baseBranch,
            draft: true,
            body: [
              `Loop task: ${input.contract.identity.taskId}`,
              "",
              input.contract.problem.desiredOutcome,
              "",
              "Completion remains gated by verification, review, and human acceptance.",
            ].join("\n"),
          },
        }),
        "GitHub pull request response",
      );
    }
    const pullHead = record(pull.head, "GitHub pull request head");
    const headSha = sha(pullHead.sha, "published head SHA");
    const pullRequestNumber = positiveInteger(pull.number, "pull request number");
    const htmlUrl = typeof pull.html_url === "string" ? pull.html_url : undefined;
    return {
      headSha,
      headBranch,
      pullRequestNumber,
      ...(htmlUrl ? { pullRequestUrl: htmlUrl } : {}),
    };
  }
}

/**
 * Publishes deterministic, commit-bound GitHub checks and one marker-backed
 * status comment. It is intentionally separate from the domain state store:
 * GitHub is a projection and can be reconciled from Loop state.
 */
export class GitHubLoopPublicationAdapter {
  readonly #client: LoopGitHubClient;

  constructor(client: LoopGitHubClient) {
    this.#client = client;
  }

  /** Convert a verified draft PR into an explicit human-review handoff. */
  async markPullRequestReviewReady(
    contract: LoopTaskContract,
    input: Readonly<{ pullRequestNumber: number; headSha: string }>,
  ): Promise<Readonly<{ number: number; url?: string }>> {
    const repository = repositoryPath(contract);
    const pullRequestNumber = positiveInteger(input.pullRequestNumber, "pull request number");
    const pull = record(
      await this.#client.request({
        method: "GET",
        path: `${repository}/pulls/${pullRequestNumber}`,
      }),
      "GitHub pull request response",
    );
    const head = record(pull.head, "GitHub pull request head");
    if (sha(head.sha, "pull request head SHA") !== sha(input.headSha, "review head SHA"))
      throw new Error("refusing to mark a pull request ready at a different head SHA");
    if (pull.draft === true) {
      await this.#client.request({
        method: "PATCH",
        path: `${repository}/pulls/${pullRequestNumber}`,
        body: { draft: false },
      });
    }
    await this.#client.request({
      method: "POST",
      path: `${repository}/issues/${pullRequestNumber}/labels`,
      body: { labels: [LOOP_REVIEW_READY_LABEL] },
    });
    return {
      number: pullRequestNumber,
      ...(typeof pull.html_url === "string" ? { url: pull.html_url } : {}),
    };
  }

  async publishCheck(
    contract: LoopTaskContract,
    input: LoopCheckPublication,
  ): Promise<Readonly<{ id: number; action: "created" | "updated" }>> {
    const repository = repositoryPath(contract);
    const externalId = `loop:${contract.identity.taskId}:${input.name}`;
    const payload = checkPayload(input, externalId);
    const response = record(
      await this.#client.request({
        method: "GET",
        path: `${repository}/commits/${encodeURIComponent(input.headSha)}/check-runs?check_name=${encodeURIComponent(input.name)}&per_page=100`,
      }),
      "GitHub check-runs response",
    );
    const runs = Array.isArray(response.check_runs) ? response.check_runs : [];
    const existing = runs
      .map((entry) => (entry && typeof entry === "object" && !Array.isArray(entry) ? entry : null))
      .map((entry) => (entry ? (entry as Record<string, unknown>) : null))
      .find((entry) => entry?.external_id === externalId);
    if (existing) {
      const id = positiveInteger(existing.id, "check run id");
      await this.#client.request({
        method: "PATCH",
        path: `${repository}/check-runs/${id}`,
        body: payload,
      });
      return { id, action: "updated" };
    }
    const created = record(
      await this.#client.request({
        method: "POST",
        path: `${repository}/check-runs`,
        body: payload,
      }),
      "GitHub created check response",
    );
    return { id: positiveInteger(created.id, "check run id"), action: "created" };
  }

  async upsertStatusComment(
    contract: LoopTaskContract,
    input: LoopStatusCommentInput,
  ): Promise<Readonly<{ id: number; action: "created" | "updated" }>> {
    const repository = repositoryPath(contract);
    const issueNumber = positiveInteger(input.issueNumber, "issue number");
    const taskId = nonEmpty(input.taskId, "task id");
    const runId = nonEmpty(input.runId, "run id");
    const generation = positiveInteger(input.generation, "generation");
    const markerPrefix = `<!-- loop-status task=${taskId} run=${runId} `;
    const marker = `${markerPrefix}generation=${generation} -->`;
    const comments = await this.#client.request({
      method: "GET",
      path: `${repository}/issues/${issueNumber}/comments?per_page=100`,
    });
    const list = Array.isArray(comments) ? comments : [];
    const existing = list
      .map((entry) => (entry && typeof entry === "object" && !Array.isArray(entry) ? entry : null))
      .map((entry) => (entry ? (entry as Record<string, unknown>) : null))
      .find((entry) => typeof entry?.body === "string" && entry.body.includes(markerPrefix));
    const body = `${marker}\n${nonEmpty(input.body, "status comment body")}`;
    if (existing) {
      const id = positiveInteger(existing.id, "comment id");
      await this.#client.request({
        method: "PATCH",
        path: `${repository}/issues/comments/${id}`,
        body: { body },
      });
      return { id, action: "updated" };
    }
    const created = record(
      await this.#client.request({
        method: "POST",
        path: `${repository}/issues/${issueNumber}/comments`,
        body: { body },
      }),
      "GitHub created comment response",
    );
    return { id: positiveInteger(created.id, "comment id"), action: "created" };
  }
}
