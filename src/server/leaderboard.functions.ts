import { createServerFn } from "@tanstack/react-start";
import { END_AT, UNLOCK_AT } from "@/src/lib/unlock";
import type { Screen } from "@/src/lib/screen";
import { getLeaderboardData, getParticipants } from "./leaderboard";

export const fetchDashboardData = createServerFn({ method: "GET" })
  .validator((data: { screen?: Screen }) => data)
  .handler(async ({ data }) => {
    // The landing page can always be requested. The other screens show data before their time,
    // so they are only honored in development builds.
    const forced = import.meta.env.DEV ? data.screen : undefined;
    const now = Date.now();
    const locked =
      data.screen === "landing" ||
      (now < UNLOCK_AT && forced !== "dashboard" && forced !== "end");

    // Don't send any data before the event starts
    if (locked) {
      return {
        locked: true as const,
        unlockAt: UNLOCK_AT,
        inviteCode: process.env.AOC_INVITE_CODE || "",
        // only the names, so people see that their sign-up worked; no scores before the start
        participants: await getParticipants(),
      };
    }

    return {
      locked: false as const,
      // the winner view after the end of the challenge
      ended: forced ? forced === "end" : now >= END_AT,
      leaderboard: await getLeaderboardData(),
      inviteCode: process.env.AOC_INVITE_CODE || "",
    };
  });
