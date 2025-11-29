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
} from "recharts";

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

export default function StarScoreChartHorizontal({ members }: Props) {
    // Calculate height based on number of members to ensure readability
    const height = Math.max(members.length * 60, 300);


    return (
        <ChartContainer
            config={chartConfig}
            className="w-full"
            style={{ height: height, aspectRatio: "auto" }}
        >
            <BarChart
                accessibilityLayer
                data={members}
                layout="vertical"
                margin={{ right: 40 }}
            >
                <CartesianGrid vertical={true} horizontal={false} />
                <XAxis type="number" hide />
                <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                    width={100}
                    tickFormatter={(value: string) =>
                        value
                            ? value.length > 11
                                ? value.slice(0, 11) + "..."
                                : value
                            : "<Kein Name>"
                    }
                />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar dataKey="local_score" radius={[0, 4, 4, 0]} fill="#56EF34">
                    <LabelList
                        dataKey="local_score"
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
