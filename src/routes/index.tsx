import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScorePodium } from "@/src/components/dashboard/score-podium";
import { RankProgression } from "@/src/components/dashboard/rank-progression";
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
  if (data.locked)
    return (
      <CountdownLock unlockAt={data.unlockAt} inviteCode={data.inviteCode} />
    );
  return (
    <Dashboard parsedData={data.leaderboard} inviteCode={data.inviteCode} />
  );
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
        <div className="absolute right-0 top-0 size-[1100px] translate-x-1/3 -translate-y-1/3 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_22%,transparent),transparent)]"></div>
      </div>
      <Header inviteCode={inviteCode} />
      <div className={"px-1 md:px-5 xl:px-40 2xl:px-80"}>
        <div>
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
                <CardTitle>Rangverlauf</CardTitle>
                <CardDescription>
                  Platzierung der Top 10 nach jedem Rätseltag. Wähle einen Namen
                  aus, um den Verlauf hervorzuheben
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RankProgression leaderboard={parsedData} />
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
