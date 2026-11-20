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
import { ScorePodium } from "@/src/components/dashboard/score-podium";
import { SubmissionHeatmap } from "@/src/components/dashboard/submission-heatmap";
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
            <Card>
              <CardHeader>
                <CardTitle>Rangliste</CardTitle>
                <CardDescription>
                  Der Punktestand legt die Platzierung fest
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScorePodium members={memberListSortedByScore} />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Lösungen pro Tag und Uhrzeit</CardTitle>
                <CardDescription>
                  Jedes Feld ist eine Stunde (deutsche Zeit): Je kräftiger das
                  Grün, desto mehr Sterne wurden dann eingereicht
                </CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionHeatmap leaderboard={parsedData} />
              </CardContent>
            </Card>

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
