"use client";

import { LeaderboardMember } from "@/src/types/leaderboard";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis } from "recharts";

const chartConfig = {
  stars: {
    label: "Sterne",
  },
  local_score: {
    label: "Punkte",
  },
} satisfies ChartConfig;

export interface Props {
  members: LeaderboardMember[];
}

export default function StarScoreChart({ members }: Props) {
  return (
    <>
      <ChartContainer config={chartConfig}>
        <BarChart data={members}>
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="local_score" fill="var(--accent)" radius={5}></Bar>
          <Bar dataKey="stars" fill="var(--accent-muted)" radius={5}></Bar>
          <XAxis
            dataKey="name"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value: string) =>
              value
                ? value.length > 11
                  ? value.slice(0, 11) + "..."
                  : value
                : "<Kein Name>"
            }
          />
        </BarChart>
      </ChartContainer>
    </>
  );
}
