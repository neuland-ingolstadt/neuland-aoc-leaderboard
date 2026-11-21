import { createServerFn } from "@tanstack/react-start";
import { UNLOCK_AT } from "@/src/lib/unlock";
import { getLeaderboardData } from "./leaderboard";

export const fetchDashboardData = createServerFn({ method: "GET" })
  .validator((data: { dev?: boolean }) => data)
  .handler(async ({ data }) => {
    // Don't send any data to the client before the event starts
    // (dev preview is only honored in development builds)
    const preview = import.meta.env.DEV && data.dev;
    if (!preview && Date.now() < UNLOCK_AT) {
      return {
        locked: true as const,
        unlockAt: UNLOCK_AT,
        inviteCode: process.env.AOC_INVITE_CODE || "",
      };
    }

    return {
      locked: false as const,
      leaderboard: await getLeaderboardData(),
      inviteCode: process.env.AOC_INVITE_CODE || "",
    };
  });
