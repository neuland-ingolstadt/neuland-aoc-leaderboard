import { Leaderboard } from "@/src/types/leaderboard";
import data from "@/src/mocks/leaderboard-new.json";

let cachedData: Leaderboard | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION_MS = 20 * 60 * 1000; // 20 minutes

// Cached leaderboard from the AoC API. Falls back to the last good data if a refresh fails and
// throws if there is nothing to show.
async function loadLeaderboard(): Promise<Leaderboard> {
  const now = Date.now();

  if (cachedData && now - lastFetchTime < CACHE_DURATION_MS) {
    return cachedData;
  }

  const leaderboardUrl = process.env.AOC_LEADERBOARD_URL as string;
  // optional: a leaderboard URL with a view_key can be read without logging in
  const sessionToken = process.env.AOC_SESSION_TOKEN;

  try {
    const response = await fetch(leaderboardUrl, {
      headers: {
        ...(sessionToken && { Cookie: `session=${sessionToken}` }),
        "User-Agent": "Neuland Ingolstadt e.V. - info@neuland-ingolstadt.de",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(
        `Failed to fetch from AoC API: ${response.status} ${response.statusText}`,
      );
    }

    const data = await response.json();
    cachedData = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    lastFetchTime = Date.now();

    return cachedData!;
  } catch (error) {
    console.error("Error fetching leaderboard data:", error);
    if (cachedData) {
      return cachedData;
    }
    throw error;
  }
}

export async function getLeaderboardData(): Promise<Leaderboard> {
  try {
    return await loadLeaderboard();
  } catch {
    // Fallback to mock data if fetch fails (e.g. during build)
    return data as unknown as Leaderboard;
  }
}

// Names of everyone on the leaderboard (null for members without a name), or null if the real
// data is not available. Never falls back to mock data, so the landing page cannot show made-up
// participants.
export async function getParticipants(): Promise<(string | null)[] | null> {
  try {
    const leaderboard = await loadLeaderboard();
    return Object.values(leaderboard.members)
      .map((member) => member.name)
      .sort((a, b) => (a ?? "\uffff").localeCompare(b ?? "\uffff", "de"));
  } catch {
    return null;
  }
}
