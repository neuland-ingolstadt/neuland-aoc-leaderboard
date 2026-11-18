"use client";

import { LeaderboardMember } from "@/src/types/leaderboard";
import { createColumnHelper, tableFeatures } from "@tanstack/react-table";

export const tableFeaturesConfig = tableFeatures({});

const helper = createColumnHelper<typeof tableFeaturesConfig, LeaderboardMember>();

export const columns = helper.columns([
  helper.accessor("name", {
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") ?? "((Kein Name))";
      return name;
    },
  }),
  helper.accessor("local_score", {
    header: "Punkte",
  }),
  helper.accessor("stars", {
    header: "Sterne",
  }),
  helper.accessor("last_star_ts", {
    header: "Zuletzt Lösung eingereicht",
    cell: ({ row }) => {
      const timestamp = parseInt(row.getValue("last_star_ts"));
      if (timestamp === 0) return "-";
      const date = new Date(timestamp * 1000);
      return (
        date.toLocaleTimeString("de-DE") +
        " " +
        date.toLocaleDateString("de-DE")
      );
    },
  }),
]);
