"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Leaderboard } from "@/src/types/leaderboard";

interface props {
  leaderboardData: Leaderboard;
}

type DataPoint = {
  challenge: number;
  starsChallengeOne: number;
  starsChallengeTwo: number;
};

type ChartData = [DataPoint?];

const chartConfig = {
  starsChallengeOne: {
    label: "Erster Teil",
  },
  starsChallengeTwo: {
    label: "Zweiter Teil",
  },
} satisfies ChartConfig;

export function StarChallengeChart({ leaderboardData }: props) {
  const members = Object.values(leaderboardData.members);

  const nrChallenges = 12;

  const chartData: ChartData = [];

  for (let i = 1; i <= nrChallenges; i++) {
    let nrStarOne = 0;
    let nrStarTwo = 0;

    members.forEach((member) => {
      if (
        member.completion_day_level[i] &&
        member.completion_day_level[i]["1"]
      ) {
        nrStarOne++;
      }

      if (
        member.completion_day_level[i] &&
        member.completion_day_level[i]["2"]
      ) {
        nrStarTwo++;
      }
    });

    const dataPoint: DataPoint = {
      challenge: i,
      starsChallengeOne: nrStarOne,
      starsChallengeTwo: nrStarTwo,
    };

    chartData.push(dataPoint);
  }

  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="challenge"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <ChartTooltip content={<ChartTooltipContent hideLabel />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar
          dataKey="starsChallengeOne"
          stackId="a"
          fill="#1f2b1cff"
          radius={[0, 0, 4, 4]}
        />
        <Bar
          dataKey="starsChallengeTwo"
          stackId="a"
          fill="#56EF34"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ChartContainer>
  );
}
