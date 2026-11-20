import { createServerFn } from "@tanstack/react-start";
import { getLeaderboardData } from "./leaderboard";

export const fetchDashboardData = createServerFn({ method: "GET" }).handler(
  async () => ({
    leaderboard: await getLeaderboardData(),
    inviteCode: process.env.AOC_INVITE_CODE || "CODE NICHT VERFÜGBAR",
  })
);
