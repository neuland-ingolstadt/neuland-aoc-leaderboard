import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/header";
import { DashboardCards } from "@/src/components/dashboard/dashboard-cards";
import { FinalResults } from "@/src/components/dashboard/final-results";
import { WinnerCard } from "@/src/components/dashboard/winner-card";

import { NavBar } from "@/src/components/nav-bar";
import { TopGlow } from "@/src/components/top-glow";
import { SnowBackground } from "@/src/components/snow-background";
import { CountdownLock } from "@/src/components/countdown-lock";
import type { Leaderboard } from "@/src/types/leaderboard";
import type { MessageKey } from "@/src/i18n/messages";
import { parseScreen, type Screen } from "@/src/lib/screen";
import { fetchDashboardData } from "@/src/server/leaderboard.functions";

const SECTIONS: { id: string; labelKey: MessageKey }[] = [
  { id: "infos", labelKey: "nav.info" },
  { id: "rangliste", labelKey: "nav.ranking" },
  { id: "rangverlauf", labelKey: "nav.progression" },
  { id: "aktivitaet", labelKey: "nav.activity" },
];

interface SearchParams {
  screen?: Screen;
}

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): SearchParams => {
    const screen = parseScreen(search.screen);
    return screen ? { screen } : {};
  },
  loaderDeps: ({ search }) => ({ screen: search.screen }),
  loader: ({ deps }) => fetchDashboardData({ data: { screen: deps.screen } }),
  component: Home,
});

function Home() {
  const data = Route.useLoaderData();
  if (data.locked)
    return (
      <CountdownLock unlockAt={data.unlockAt} inviteCode={data.inviteCode} />
    );
  return (
    <Dashboard
      parsedData={data.leaderboard}
      inviteCode={data.inviteCode}
      ended={data.ended}
    />
  );
}

function Dashboard({
  parsedData,
  inviteCode,
  ended,
}: {
  parsedData: Leaderboard;
  inviteCode: string;
  ended: boolean;
}) {
  const lastUpdated = parsedData.lastUpdated
    ? new Date(parsedData.lastUpdated)
    : new Date();

  return (
    <>
      <div className="absolute inset-0 h-full w-full -z-10 overflow-hidden pointer-events-none">
        <SnowBackground />
        <TopGlow />
      </div>
      <Header inviteCode={inviteCode} ended={ended} />
      <div className={"mx-auto w-full max-w-5xl px-1 md:px-5"}>
        <div>
          {ended ? (
            <div className="flex flex-col gap-4">
              <WinnerCard leaderboard={parsedData} />
              <FinalResults leaderboard={parsedData} />
            </div>
          ) : (
            <DashboardCards
              leaderboard={parsedData}
              lastUpdated={lastUpdated}
            />
          )}
        </div>
      </div>
      <NavBar sections={ended ? undefined : SECTIONS} />
    </>
  );
}
