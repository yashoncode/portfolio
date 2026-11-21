import "server-only";

export type RepoCounts = Record<string, { stars: number; forks: number }>;

type Repository = {
  full_name: string;
  fork: boolean;
  stargazers_count: number;
  forks_count: number;
};

const endpoint = "https://api.github.com/users/yashoncode";
async function fetchList<T>(path: string, revalidate: number): Promise<T[] | null> {
  const token = process.env.GITHUB_TOKEN;
  try {
    const response = await fetch(`${endpoint}/${path}`, {
      headers: {
        Accept: "application/vnd.github+json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      next: { revalidate },
      signal: AbortSignal.timeout(10_000),
    });
    // Next only updates its fetch cache for HTTP 200, so a rate limit
    // response cannot replace the previous successful GitHub response.
    if (!response.ok) return null;
    const body: unknown = await response.json();
    return Array.isArray(body) ? body : null;
  } catch {
    return null;
  }
}

export async function getRepositoryStats() {
  const repos = await fetchList<Repository>("repos?per_page=100&type=owner", 3600);
  if (!repos?.length) return null;

  const counts: RepoCounts = {};
  let totalStars = 0;
  for (const repo of repos) {
    if (
      !repo || typeof repo.full_name !== "string" || typeof repo.fork !== "boolean" ||
      !Number.isSafeInteger(repo.stargazers_count) || !Number.isSafeInteger(repo.forks_count)
    ) {
      return null;
    }
    counts[repo.full_name.toLowerCase()] = { stars: repo.stargazers_count, forks: repo.forks_count };
    if (!repo.fork) totalStars += repo.stargazers_count;
  }
  return { counts, totalStars };
}
