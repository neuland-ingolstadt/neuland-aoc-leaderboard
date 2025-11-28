"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import transformStarData, {
  TransformStarDataReturnType,
} from "@/src/lib/transform-star-data";
import { useEffect, useState } from "react";
import { Leaderboard } from "@/src/types/leaderboard";

interface props {
  leaderboard: Leaderboard;
  startDate: Date;
  endDate: Date;
}

const chartConfig = {
  height: 400,
};

type DateDisplay = {
  start: string;
  end: string;
};

export function StarHistoryChart({ leaderboard, startDate, endDate }: props) {
  const [formattedChartData, setFormattedChartData] =
    useState<TransformStarDataReturnType | null>(null);

  const [dateDisplay, setDateDisplay] = useState<DateDisplay | null>(null);

  useEffect(() => {
    setDateDisplay({
      start: startDate.toLocaleDateString("de-DE"),
      end: endDate.toLocaleDateString("de-DE"),
    });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Entwicklung Anzahl Sterne</CardTitle>
        <CardDescription>
          {dateDisplay?.start + " - " + dateDisplay?.end}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="w-full" config={{}}>
          <LineChart
            accessibilityLayer
            data={formattedChartData}
            margin={{
              top: 24,
              right: 24,
            }}
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
              tickMargin={5}
              axisLine={false}
              tickFormatter={(value: string) =>
                value.length > 15 ? value.slice(0, 7) + "..." : value
              }
            />
            <YAxis></YAxis>

            {Object.keys(formattedChartData[0]).map((name) => {
              if (name == "label") return;

              const randomColor = `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`;

              return (
                <Line
                  type={"bump"}
                  dataKey={name}
                  stroke={randomColor}
                  strokeWidth={5}
                  dot={false}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
        <p>
          Die Darstellung der Historie erfolgt in Halbtagesschritten
          (12-Stunden-Intervall)
        </p>
      </CardFooter>
    </Card>
  );
}
