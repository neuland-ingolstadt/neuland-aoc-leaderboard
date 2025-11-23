import {Leaderboard} from "@/src/types/leaderboard";
import Chart from "@/app/test/Chart";

const chartData = [
    { month: "January", desktop: 186 },
    { month: "February", desktop: 300 },
    { month: "March", desktop: 237 },
    { month: "April", desktop: 73 },
    { month: "May", desktop: 209 },
    { month: "June", desktop: 214 },
]

export default async function Page() {
    const test = await fetch("http://localhost:3000/api/leaderboard");
    const fetchedData: Leaderboard = await test.json();
    const currentTime = new Date();

    const members = Object.values(fetchedData.members).sort((a, b) => b.local_score - a.local_score);

    return (
        <div>
            <h1 className={"text-4xl font-bold text-center font-mono"}>Willkommen zum Neuland Leaderboard für den Advent Of Code 2025</h1>
            <Chart members={members} lastUpdated={currentTime}/>
        </div>
    )
}
