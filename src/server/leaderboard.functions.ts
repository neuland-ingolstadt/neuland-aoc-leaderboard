import { createServerFn } from "@tanstack/react-start";
import { UNLOCK_AT } from "@/src/lib/unlock";
import { getLeaderboardData } from "./leaderboard";

export const fetchDashboardData = createServerFn({ method: "GET" })
  .validator((data: { dev?: boolean; showLanding?: boolean }) => data)
  .handler(async ({ data }) => {
    // Don't send any data before the event starts (the dev preview is only honored in
    // development builds). ?showLanding always shows the landing page, even after the start.
    const preview = import.meta.env.DEV && data.dev;
    const beforeStart = !preview && Date.now() < UNLOCK_AT;
    if (data.showLanding || beforeStart) {
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
