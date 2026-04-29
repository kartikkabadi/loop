export type GitHubRef = {
  repo: string;
  number: number;
  url: string;
};

export function parsePullRequestUrl(value: unknown): GitHubRef | null {
  const match = String(value ?? "")
    .trim()
    .match(/^https:\/\/github\.com\/([^/\s]+\/[^/\s]+)\/pull\/(\d+)(?:[/?#].*)?$/i);
  if (!match) return null;
  return {
    repo: match[1],
    number: Number(match[2]),
    url: `https://github.com/${match[1]}/pull/${match[2]}`,
  };
}

export function pullRequestNumberFromUrl(value: unknown): number {
  return parsePullRequestUrl(value)?.number ?? 0;
}

export function parseIssueOrPullRef(value: unknown, defaultRepo = ""): GitHubRef | null {
  const text = String(value ?? "").trim();
  const urlMatch = text.match(
    /^https:\/\/github\.com\/([^/]+\/[^/]+)\/(?:issues|pull)\/(\d+)(?:[/?#].*)?$/i,
  );
  if (urlMatch) {
    return {
      repo: urlMatch[1],
      number: Number(urlMatch[2]),
      url: `https://github.com/${urlMatch[1]}/issues/${urlMatch[2]}`,
    };
  }

  const shorthand = text.match(/^#?(\d+)$/);
  if (!shorthand || !defaultRepo) return null;
  return {
    repo: defaultRepo,
    number: Number(shorthand[1]),
    url: `https://github.com/${defaultRepo}/issues/${shorthand[1]}`,
  };
}

export function issueNumberFromRef(value: unknown, expectedRepo = ""): number {
  const shorthand = String(value ?? "")
    .trim()
    .match(/^#?(\d+)$/);
  if (shorthand) return Number(shorthand[1]);

  const parsed = parseIssueOrPullRef(value);
  if (!parsed) return 0;
  if (expectedRepo && parsed.repo.toLowerCase() !== expectedRepo.toLowerCase()) return 0;
  return parsed.number;
}
