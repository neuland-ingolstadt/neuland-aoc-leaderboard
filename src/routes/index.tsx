import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/layout/header";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScorePodium } from "@/src/components/dashboard/score-podium";
import { RankProgression } from "@/src/components/dashboard/rank-progression";
import { SubmissionHeatmap } from "@/src/components/dashboard/submission-heatmap";
import { LastUpdatedBadge } from "@/components/ui/last-updated-badge";

import { SectionNav } from "@/src/components/section-nav";
import { TopGlow } from "@/src/components/top-glow";
import { SnowBackground } from "@/src/components/snow-background";
import { CountdownLock } from "@/src/components/countdown-lock";
import type { Leaderboard } from "@/src/types/leaderboard";
import { useI18n } from "@/src/i18n/i18n";
import type { MessageKey } from "@/src/i18n/messages";
import { fetchDashboardData } from "@/src/server/leaderboard.functions";

const SECTIONS: { id: string; labelKey: MessageKey }[] = [
  { id: "infos", labelKey: "nav.info" },
  { id: "rangliste", labelKey: "nav.ranking" },
  { id: "rangverlauf", labelKey: "nav.progression" },
  { id: "aktivitaet", labelKey: "nav.activity" },
];

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): { dev?: true } =>
    search.dev === true || search.dev === "true" ? { dev: true } : {},
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
  const { t, locale } = useI18n();
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
        <TopGlow />
      </div>
      <Header inviteCode={inviteCode} />
      <div className={"mx-auto w-full max-w-5xl px-1 md:px-5"}>
        <div>
          <div className={"flex flex-col gap-4"}>
            <Card id="rangliste" className="scroll-mt-4 md:scroll-mt-20">
              <CardHeader className="max-sm:grid-cols-1!">
                <CardTitle>{t("ranking.title")}</CardTitle>
                <CardDescription>{t("ranking.description")}</CardDescription>
                <CardAction className="max-sm:col-start-1 max-sm:row-span-1 max-sm:row-start-auto max-sm:mt-1 max-sm:justify-self-start">
                  <LastUpdatedBadge date={lastUpdated} />
                </CardAction>
              </CardHeader>
              <CardContent>
                <ScorePodium members={memberListSortedByScore} />
              </CardContent>
            </Card>

            <Card id="rangverlauf" className="scroll-mt-4 md:scroll-mt-20">
              <CardHeader>
                <CardTitle>{t("progression.title")}</CardTitle>
                <CardDescription>
                  {t("progression.description")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RankProgression leaderboard={parsedData} />
              </CardContent>
            </Card>

            <Card id="aktivitaet" className="scroll-mt-4 md:scroll-mt-20">
              <CardHeader>
                <CardTitle>{t("heatmap.title")}</CardTitle>
                <CardDescription>{t("heatmap.description")}</CardDescription>
              </CardHeader>
              <CardContent>
                <SubmissionHeatmap leaderboard={parsedData} />
              </CardContent>
            </Card>
          </div>
          <p className="pt-5 pb-16 md:pb-0 text-[9px] text-center text-muted-foreground">
            {t("dashboard.loaded")}{" "}
            {lastUpdated.toLocaleTimeString(locale, {
              timeZone: "Europe/Berlin",
            })}
          </p>
        </div>
      </div>
      <SectionNav sections={SECTIONS} />
    </>
  );
}
