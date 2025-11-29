"use client";

import { LeaderboardMember } from "@/src/types/leaderboard";
import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<LeaderboardMember>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const name = row.getValue("name") ?? "((Kein Name))";
      return name;
    },
  },
  {
    accessorKey: "local_score",
    header: "Punkte",
  },
  {
    accessorKey: "stars",
    header: "Sterne",
  },
  {
    accessorKey: "last_star_ts",
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
  },
];
