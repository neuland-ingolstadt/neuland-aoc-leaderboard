"use client";

import { LeaderboardMember } from "@/src/types/leaderboard";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LabelList,
  Cell,
} from "recharts";
import { stringToColor } from "@/src/lib/color-utils";

const chartConfig = {

  local_score: {
    label: "Punkte",
    color: "var(--accent)",
  },
  label: {
    color: "var(--background)",
  },
} satisfies ChartConfig;

export interface Props {
  members: LeaderboardMember[];
}

export default function StarScoreChart({ members }: Props) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart
        accessibilityLayer
        data={members}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="name"
          tickLine={false}
          tickMargin={0}
          axisLine={false}
          tickFormatter={(value: string) =>
            value
              ? value.length > 11
                ? value.slice(0, 11) + "..."
                : value
              : "<Kein Name>"
          }
        />
        <YAxis
          type="number"
          tickLine={false}
          axisLine={false}
          tickMargin={0}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="local_score" radius={[4, 4, 0, 0]} fill="#56EF34">
          <LabelList
            dataKey="local_score"
            position="top"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>

      </BarChart>
    </ChartContainer>
  );
}
