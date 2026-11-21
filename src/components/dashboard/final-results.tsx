import { ChevronDown } from "lucide-react";
import { DashboardCards } from "@/src/components/dashboard/dashboard-cards";
import { useI18n } from "@/src/i18n/i18n";
import type { Leaderboard } from "@/src/types/leaderboard";

// Collapsed by default: the final ranking, rank progression and heatmap. The toggle sits on a
// divider line so it does not look like an empty box when it is opened.
export function FinalResults({ leaderboard }: { leaderboard: Leaderboard }) {
  const { t } = useI18n();

  return (
    <details className="group">
      <summary className="flex cursor-pointer list-none items-center gap-4 [&::-webkit-details-marker]:hidden">
        <span className="h-px flex-1 bg-border" />
        <span className="flex items-center gap-2 text-sm text-muted-foreground transition-colors group-hover:text-foreground">
          <span className="font-medium text-foreground">
            {t("end.results")}
          </span>
          <span aria-hidden>·</span>
          <span className="group-open:hidden">{t("end.show")}</span>
          <span className="hidden group-open:inline">{t("end.hide")}</span>
          <ChevronDown
            className="size-4 transition-transform group-open:rotate-180"
            aria-hidden
          />
        </span>
        <span className="h-px flex-1 bg-border" />
      </summary>
      <div className="mt-6">
        <DashboardCards leaderboard={leaderboard} />
      </div>
    </details>
  );
}
