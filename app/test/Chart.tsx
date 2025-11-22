"use client"

import { TrendingUp } from "lucide-react"
import { Bar, BarChart, XAxis, YAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart"
import {LeaderboardMember} from "@/src/types/leaderboard";

const chartConfig = {
    local_score: {
        label: "Score",
        color: "#69d804",
    },
} satisfies ChartConfig

interface Props {
    members: LeaderboardMember[];
    lastUpdated: Date;
}

export default function Chart({ members, lastUpdated }: Props) {
    return (
        <div className={"flex h-dvh justify-center items-center"}>
            <Card className={""}>
                <CardHeader>
                    <CardTitle>Total Score</CardTitle>
                    <CardDescription>Last updated: {lastUpdated.toLocaleTimeString("de-DE") + " " + lastUpdated.toLocaleDateString("de-DE")}</CardDescription>
                </CardHeader>
                <CardContent className="w-5xl">
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
                                tickMargin={0}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 10) + "..."}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                            <Bar dataKey="local_score" fill="#238192" radius={5} />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
