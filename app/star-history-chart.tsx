"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import transformStarData, {
  TransformStarDataReturnType,
} from "@/src/lib/transform-star-data";
import { useEffect, useState } from "react";
import { Leaderboard } from "@/src/types/leaderboard";
import { stringToColor } from "@/src/lib/color-utils";

interface props {
  leaderboard: Leaderboard;
  startDate: Date;
  endDate: Date;
}

const chartConfig = {
};

export function StarHistoryChart({ leaderboard, startDate, endDate }: props) {
  const [formattedChartData, setFormattedChartData] =
    useState<TransformStarDataReturnType | null>(null);

  useEffect(() => {
    if (leaderboard && leaderboard.members) {
      const data: TransformStarDataReturnType = transformStarData(
        leaderboard,
        startDate,
        endDate
      );

      setFormattedChartData(data);
    }
  }, [leaderboard, startDate, endDate]);

  // Check if no data
  if (!formattedChartData) {
    return (
      <Card>
        <CardContent>Lade Diagramm...</CardContent>
      </Card>
    );
  }

  if (formattedChartData.length == 0) {
    return (
      <Card>
        <CardContent>Keine Daten verfügbar</CardContent>
      </Card>
    );
  }

  return (
    <ChartContainer config={{}}>
      <LineChart
        accessibilityLayer
        data={formattedChartData}
        margin={{ left: 0, right: 0 }}
      >
        <CartesianGrid vertical={true} />
        <ChartTooltip
          cursor={false}
          content={
            <ChartTooltipContent indicator="dot" nameKey="starCount" />
          }
        />
        <XAxis
          dataKey="label"
          type="category"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value: string) =>
            value.length > 15 ? value.slice(0, 7) + "..." : value
          }
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={0}
          width={30}
        />

        {Object.keys(formattedChartData[0]).map((name) => {
          if (name == "label") return;

          const color = stringToColor(name);

          return (
            <Line
              type={"bump"}
              dataKey={name}
              stroke={color}
              strokeWidth={5}
              dot={false}
            />
          );
        })}
      </LineChart>
    </ChartContainer>
  );
}
