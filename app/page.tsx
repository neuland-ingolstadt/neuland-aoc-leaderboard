import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaderboard, LeaderboardMember } from "@/src/types/leaderboard";
import { LeaderboardTable } from "./leaderboard-data-table";
import { columns } from "./leaderboard-column";
import StarScoreChart from "./star-score-chart";
import StarScoreChartHorizontal from "./star-score-chart-horizontal";
import { StarHistoryChart } from "./star-history-chart";
import { StarChallengeChart } from "./star-challenge-chart";
import { LastUpdatedBadge } from "@/components/ui/last-updated-badge";

import { getLeaderboardData } from "@/src/lib/leaderboard-api";

// Start and end date to display statistics for
const startDate = new Date("2025-12-1");
const endDate = new Date("2025-12-24");

export default async function Home() {
  const parsedData: Leaderboard = await getLeaderboardData();
  const lastUpdated = parsedData.lastUpdated ? new Date(parsedData.lastUpdated) : new Date();

  const memberList = Object.values(parsedData.members);
  const memberListSortedByScore = memberList.slice().sort((a, b) => {
    return b.local_score - a.local_score;
  });

  const memberListSortedByStars = memberList.slice().sort((a, b) => {
    return b.stars - a.stars;
  });

  const memberListSortedByLastStar = memberList.slice().sort((a, b) => {
    return b.last_star_ts - a.last_star_ts;
  });

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-[600px] -z-10 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:linear-gradient(to_bottom,black,transparent)]"></div>
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-green-500/15 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
      </div>
      <Header />
      <div className={"px-1 md:px-5 xl:px-40 2xl:px-80"}>
        <div className="bg-black p-4 md:p-6 border rounded-lg">
          <div className={"flex flex-col gap-4"}>
            <div className={"flex justify-between"}><h2>Leaderboard</h2><LastUpdatedBadge date={lastUpdated} /></div>
            <div className={"flex flex-col md:grid md:grid-cols-3 gap-4"}>
              <Card className={"grow overflow-hidden"}>
                <CardHeader>
                  <CardTitle className="truncate">🥇 Aktuell 1. Platz</CardTitle>
                  <CardDescription className="truncate">
                    {memberListSortedByScore[0] && memberListSortedByScore[0].local_score > 0
                      ? memberListSortedByScore[0].local_score + " Punkten"
                      : "Noch nicht genügend Daten"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={"text-3xl truncate"}>
                    {memberListSortedByScore[0] && memberListSortedByScore[0].local_score > 0
                      ? memberListSortedByScore[0].name
                      : "-"}
                  </p>
                </CardContent>
              </Card>
              <Card className={"grow overflow-hidden"}>
                <CardHeader>
                  <CardTitle className="truncate">⭐ Meiste Sterne</CardTitle>
                  <CardDescription className="truncate">
                    {memberListSortedByStars[0] && memberListSortedByStars[0].stars > 0
                      ? memberListSortedByStars[0].stars + " Sterne"
                      : "Noch nicht genügend Daten"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={"text-3xl truncate"}>
                    {memberListSortedByStars[0] && memberListSortedByStars[0].stars > 0
                      ? memberListSortedByStars[0].name
                      : "-"}
                  </p>
                </CardContent>
              </Card>
              <Card className={"grow overflow-hidden"}>
                <CardHeader>
                  <CardTitle className="text-nowrap truncate">⏰ Neuste Lösung</CardTitle>
                  <CardDescription className="text-nowrap truncate">
                    {memberListSortedByLastStar[0] && memberListSortedByLastStar[0].last_star_ts > 0
                      ? "Am " +
                      new Date(memberListSortedByLastStar[0].last_star_ts * 1000).toLocaleDateString(
                        "de-DE"
                      ) +
                      " um " +
                      new Date(memberListSortedByLastStar[0].last_star_ts * 1000).toLocaleTimeString(
                        "de-DE"
                      )
                      : "Noch nicht genügend Daten"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={"text-3xl truncate"}>
                    {memberListSortedByLastStar[0] && memberListSortedByLastStar[0].last_star_ts > 0
                      ? memberListSortedByLastStar[0].name
                      : "-"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Punkte & Sterne pro Teilnehmer</CardTitle>
                <CardDescription></CardDescription>
              </CardHeader>
              <CardContent>
                <div className="hidden md:block">
                  <StarScoreChart members={memberListSortedByScore}></StarScoreChart>
                </div>
                <div className="block md:hidden">
                  <StarScoreChartHorizontal members={memberListSortedByScore}></StarScoreChartHorizontal>
                </div>
              </CardContent>
            </Card>

            <div className={"grid lg:grid-cols-2 gap-4"}>
              <Card>
                <CardHeader>
                  <CardTitle>
                    Lösungen erster Teil / zweiter Teil
                  </CardTitle>
                  <CardDescription>
                    Wie oft wurde insgesamt der erste Teil und der zweite Teil eines Rätsels gelöst (alle Teilnehmer zusammen)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StarChallengeChart leaderboardData={parsedData}></StarChallengeChart>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Verlauf der Sterne</CardTitle>
                  <CardDescription>{startDate.toLocaleDateString("de-DE") + " bis " + endDate.toLocaleDateString("de-DE")}</CardDescription>
                </CardHeader>
                <CardContent className="">
                  <StarHistoryChart
                    leaderboard={parsedData}
                    startDate={startDate}
                    endDate={endDate}
                  ></StarHistoryChart>
                </CardContent>
              </Card>
            </div>
            <Card>
              <CardHeader>
                <CardTitle>Liste aller Teilnehmer</CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable
                  columns={columns}
                  data={memberListSortedByScore}
                ></LeaderboardTable>
              </CardContent>
            </Card>
          </div>
        </div >
      </div >
      <Footer />
    </>
  );
}
