import { Leaderboard } from "@/src/types/leaderboard";

let cachedData: Leaderboard | null = null;
let lastFetchTime: number = 0;
const CACHE_DURATION_MS = 15 * 60 * 1000;

export async function getLeaderboardData(): Promise<Leaderboard> {
    const now = Date.now();

    if (cachedData && now - lastFetchTime < CACHE_DURATION_MS) {
        return cachedData;
    }

    const leaderboardUrl = process.env.AOC_LEADERBOARD_URL;
    const sessionToken = process.env.AOC_SESSION_TOKEN;

    if (!leaderboardUrl || !sessionToken) {
        throw new Error("AOC_LEADERBOARD_URL or AOC_SESSION_TOKEN not configured");
    }

    try {
        const response = await fetch(leaderboardUrl, {
            headers: {
                Cookie: `session=${sessionToken}`,
                "User-Agent":
                    "Neuland-AoC-Leaderboard",
            },
            cache: "no-store",
        });

        if (!response.ok) {
            throw new Error(
                `Failed to fetch from AoC API: ${response.status} ${response.statusText}`
            );
        }

        const data = await response.json();
        cachedData = {
            ...data,
            lastUpdated: new Date().toISOString(),
        };
        lastFetchTime = Date.now();

        return cachedData;
    } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        if (cachedData) {
            return cachedData;
        }
        throw error;
    }
}
