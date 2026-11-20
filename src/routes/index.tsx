import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LeaderboardTable } from "@/src/components/dashboard/leaderboard-data-table";
import { columns } from "@/src/components/dashboard/leaderboard-column";
import StarScoreChart from "@/src/components/dashboard/star-score-chart";
import StarScoreChartHorizontal from "@/src/components/dashboard/star-score-chart-horizontal";
import { StarHistoryChart } from "@/src/components/dashboard/star-history-chart";
import { StarChallengeChart } from "@/src/components/dashboard/star-challenge-chart";
import { LastUpdatedBadge } from "@/components/ui/last-updated-badge";

import { SnowBackground } from "@/src/components/snow-background";
import { CountdownLock } from "@/src/components/countdown-lock";
import type { Leaderboard } from "@/src/types/leaderboard";
import { fetchDashboardData } from "@/src/server/leaderboard.functions";

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>) => ({
    dev: search.dev === true || search.dev === "true" ? true : undefined,
  }),
  loaderDeps: ({ search }) => ({ dev: search.dev }),
  loader: ({ deps }) => fetchDashboardData({ data: { dev: deps.dev } }),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  if (data.locked) return <CountdownLock unlockAt={data.unlockAt} inviteCode={data.inviteCode} />;
  return <Dashboard parsedData={data.leaderboard} inviteCode={data.inviteCode} />;
}

function Dashboard({
  parsedData,
  inviteCode,
}: {
  parsedData: Leaderboard;
  inviteCode: string;
}) {
  const lastUpdated = parsedData.lastUpdated
    ? new Date(parsedData.lastUpdated)
    : new Date();

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

  // Start and end date to display statistics for
  const startDate = new Date("2026-12-1");
  const endDate = new Date();

  let mostStarsText: string;
  let mostStarsName: string;

  if (
    memberListSortedByStars.length > 1 &&
    memberListSortedByStars[0].stars === memberListSortedByStars[1].stars
  ) {
    mostStarsText = memberListSortedByStars[0].stars + " Sterne";
    mostStarsName = "Unentschieden";
  } else {
    mostStarsText = memberListSortedByStars[0].stars + " Sterne";
    mostStarsName = memberListSortedByStars[0].name || "Kein Name";
  }

  if (memberListSortedByStars[0].stars === 0) {
    mostStarsName = "-";
    mostStarsText = "Nicht genügend Daten";
  }

  return (
    <>
      <div className="absolute inset-0 h-full w-full -z-10 overflow-hidden pointer-events-none">
        <SnowBackground />
        <div className="absolute right-0 top-0 w-[800px] h-[800px] bg-accent/15 rounded-full blur-[120px] translate-x-1/3 -translate-y-1/3"></div>
      </div>
      <Header inviteCode={inviteCode} />
      <div className={"px-1 md:px-5 xl:px-40 2xl:px-80"}>
        <div className="bg-background p-4 md:p-6 border rounded-lg">
          <div className={"flex flex-col gap-4"}>
            <div className={"flex justify-between"}>
              <h2>Leaderboard</h2>
              <LastUpdatedBadge date={lastUpdated} />
            </div>
            <div className={"flex flex-col md:grid md:grid-cols-3 gap-4"}>
              <Card className={"grow overflow-hidden"}>
                <CardHeader>
                  <CardTitle className="truncate">
                    🥇 Aktuell 1. Platz
                  </CardTitle>
                  <CardDescription className="truncate">
                    {memberListSortedByScore[0] &&
                    memberListSortedByScore[0].local_score > 0
                      ? memberListSortedByScore[0].local_score + " Punkte"
                      : "Noch nicht genügend Daten"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={"text-3xl truncate"}>
                    {memberListSortedByScore[0] &&
                    memberListSortedByScore[0].local_score > 0
                      ? memberListSortedByScore[0].name
                      : "-"}
                  </p>
                </CardContent>
              </Card>
              <Card className={"grow overflow-hidden"}>
                <CardHeader>
                  <CardTitle className="truncate">⭐ Meiste Sterne</CardTitle>
                  <CardDescription className="truncate">
                    {mostStarsText}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={"text-3xl truncate"}>{mostStarsName}</p>
                </CardContent>
              </Card>
              <Card className={"grow overflow-hidden"}>
                <CardHeader>
                  <CardTitle className="text-nowrap truncate">
                    ⏰ Neuste Lösung
                  </CardTitle>
                  <CardDescription className="text-nowrap truncate">
                    {memberListSortedByLastStar[0] &&
                    memberListSortedByLastStar[0].last_star_ts > 0
                      ? "Am " +
                        new Date(
                          memberListSortedByLastStar[0].last_star_ts * 1000
                        ).toLocaleDateString("de-DE") +
                        " um " +
                        new Date(
                          memberListSortedByLastStar[0].last_star_ts * 1000
                        ).toLocaleTimeString("de-DE", {
                          timeZone: "Europe/Berlin",
                        })
                      : "Noch nicht genügend Daten"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className={"text-3xl truncate"}>
                    {memberListSortedByLastStar[0] &&
                    memberListSortedByLastStar[0].last_star_ts > 0
                      ? memberListSortedByLastStar[0].name
                      : "-"}
                  </p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Punkte pro Teilnehmer</CardTitle>
                <CardDescription>
                  Der Punktestand legt die Platzierung fest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="hidden md:block">
                  <StarScoreChart
                    members={memberListSortedByScore}
                  ></StarScoreChart>
                </div>
                <div className="block md:hidden">
                  <StarScoreChartHorizontal
                    members={memberListSortedByScore}
                  ></StarScoreChartHorizontal>
                </div>
              </CardContent>
            </Card>

            <div className={"grid lg:grid-cols-2 gap-4"}>
              <Card>
                <CardHeader>
                  <CardTitle>Lösungen erster Teil / zweiter Teil</CardTitle>
                  <CardDescription>
                    Wie oft wurde insgesamt der erste Teil und der zweite Teil
                    eines Rätsels gelöst (alle Teilnehmer zusammen)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <StarChallengeChart
                    leaderboardData={parsedData}
                  ></StarChallengeChart>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Verlauf der Sterne</CardTitle>
                  <CardDescription>
                    {startDate.toLocaleDateString("de-DE") +
                      " bis " +
                      endDate.toLocaleDateString("de-DE")}
                  </CardDescription>
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
          <p className="pt-5 text-[9px] text-center text-muted-foreground">
            Daten zuletzt vom AoC Server geladen:{" "}
            {lastUpdated.toLocaleTimeString("de-DE", {
              timeZone: "Europe/Berlin",
            })}
          </p>
        </div>
      </div>
    </>
  );
}
