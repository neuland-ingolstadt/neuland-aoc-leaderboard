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
  stars: {
    label: "Sterne",
    color: "var(--accent-muted)",
  },
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
        layout="vertical"
        margin={{
          right: 30,
        }}
      >
        <CartesianGrid horizontal={false} />
        <YAxis
          dataKey="name"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          width={100}
        />
        <XAxis type="number" hide />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="line" />}
        />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="local_score" layout="vertical" radius={4} fill="#56EF34">
          <LabelList
            dataKey="local_score"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
        <Bar dataKey="stars" layout="vertical" radius={4} fill="#2e4c28">
          <LabelList
            dataKey="stars"
            position="right"
            offset={8}
            className="fill-foreground"
            fontSize={12}
          />
        </Bar>
      </BarChart>
    </ChartContainer>
  );
}
