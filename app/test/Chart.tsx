"use client";

import { Bar, BarChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { LeaderboardMember } from "@/src/types/leaderboard";

const chartConfig = {
  local_score: {
    label: "Score",
    color: "#69d804",
  },
} satisfies ChartConfig;

interface Props {
  members: LeaderboardMember[];
  lastUpdated: Date;
}

export default function Chart({ members, lastUpdated }: Props) {
  return (
    <div className={"flex h-dvh justify-center items-center"}>
      <Card className={"w-200"}>
        <CardHeader>
          <CardTitle>Total Score</CardTitle>
          <CardDescription>
            Last updated:{" "}
            {lastUpdated.toLocaleTimeString("de-DE") +
              " " +
              lastUpdated.toLocaleDateString("de-DE")}
          </CardDescription>
        </CardHeader>
        <CardContent className="">
          <ChartContainer config={chartConfig}>
            <BarChart
              accessibilityLayer
              data={members}
              layout="horizontal"
              margin={{
                left: 0,
              }}
            >
              <YAxis type="number" dataKey="local_score" hide />
              <XAxis
                dataKey="name"
                type="category"
                tickLine={false}
                tickMargin={5}
                axisLine={false}
                tickFormatter={(value: string) =>
                  value.length > 15 ? value.slice(0, 7) + "..." : value
                }
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent hideLabel />}
              />
              <Bar dataKey="local_score" fill="var(--accent)" radius={5} />
              <Bar dataKey="stars" fill="var(--chart-4)" radius={5} />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
