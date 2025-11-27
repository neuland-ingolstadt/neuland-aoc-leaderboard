"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Dot, Line, LineChart, XAxis, YAxis } from "recharts";

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

export const description = "A line chart with dots and colors";

const chartData = [
  { browser: "chrome", visitors: 275, fill: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, fill: "var(--color-safari)" },
  { browser: "firefox", visitors: 187, fill: "var(--color-firefox)" },
  { browser: "edge", visitors: 173, fill: "var(--color-edge)" },
  { browser: "other", visitors: 90, fill: "var(--color-other)" },
];

const chartConfig = {} satisfies ChartConfig;

interface props {
  chartData: any;
}

export function StarHistoryChart({ chartData }: props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Entwicklung Anzahl Sterne</CardTitle>
        <CardDescription>1. Dezember - 24. Dezember</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              top: 24,
              left: 24,
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

            {Object.keys(chartData[0]).map((name) => {
              if (name == "label" || name == "ts") return;

              const randomColor = `#${Math.floor(Math.random() * 16777215)
                .toString(16)
                .padStart(6, "0")}`;

              return (
                <Line
                  type={"bump"}
                  dataKey={name}
                  stroke={randomColor}
                  strokeWidth={5}
                />
              );
            })}
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
