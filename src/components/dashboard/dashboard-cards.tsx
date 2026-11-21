import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LastUpdatedBadge } from "@/components/ui/last-updated-badge";
import { RankProgression } from "@/src/components/dashboard/rank-progression";
import { ScorePodium } from "@/src/components/dashboard/score-podium";
import { SubmissionHeatmap } from "@/src/components/dashboard/submission-heatmap";
import { useI18n } from "@/src/i18n/i18n";
import type { Leaderboard } from "@/src/types/leaderboard";

// The three result cards: ranking, rank progression and the solutions heatmap
export function DashboardCards({
  leaderboard,
  lastUpdated,
}: {
  leaderboard: Leaderboard;
  // shows the "updated x minutes ago" badge while the competition is still running
  lastUpdated?: Date;
}) {
  const { t } = useI18n();
  const members = Object.values(leaderboard.members).sort(
    (a, b) => b.local_score - a.local_score,
  );

  return (
    <div className="flex flex-col gap-4">
      <Card id="rangliste" className="scroll-mt-4 md:scroll-mt-20">
        <CardHeader className="max-sm:grid-cols-1!">
          <CardTitle>{t("ranking.title")}</CardTitle>
          <CardDescription>{t("ranking.description")}</CardDescription>
          {lastUpdated && (
            <CardAction className="max-sm:col-start-1 max-sm:row-span-1 max-sm:row-start-auto max-sm:mt-1 max-sm:justify-self-start">
              <LastUpdatedBadge date={lastUpdated} />
            </CardAction>
          )}
        </CardHeader>
        <CardContent>
          <ScorePodium members={members} />
        </CardContent>
      </Card>

      <Card id="rangverlauf" className="scroll-mt-4 md:scroll-mt-20">
        <CardHeader>
          <CardTitle>{t("progression.title")}</CardTitle>
          <CardDescription>{t("progression.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <RankProgression leaderboard={leaderboard} />
        </CardContent>
      </Card>

      <Card id="aktivitaet" className="scroll-mt-4 md:scroll-mt-20">
        <CardHeader>
          <CardTitle>{t("heatmap.title")}</CardTitle>
          <CardDescription>{t("heatmap.description")}</CardDescription>
        </CardHeader>
        <CardContent>
          <SubmissionHeatmap leaderboard={leaderboard} />
        </CardContent>
      </Card>
    </div>
  );
}
