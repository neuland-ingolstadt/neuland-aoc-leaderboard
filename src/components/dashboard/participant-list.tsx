import { ChevronDown } from "lucide-react";
import { useI18n } from "@/src/i18n/i18n";
import type { LeaderboardMember } from "@/src/types/leaderboard";

// Collapsible list of everyone on the leaderboard. The AoC API does not tell when somebody
// joined, so it shows what is available: stars and the time of the last solved star.
export function ParticipantList({ members }: { members: LeaderboardMember[] }) {
  const { t, locale } = useI18n();

  const sorted = members.slice().sort((a, b) =>
    (a.name ?? "￿").localeCompare(b.name ?? "￿", locale, {
      sensitivity: "base",
    }),
  );

  const formatTime = (timestamp: number) =>
    new Date(timestamp * 1000).toLocaleString(locale, {
      timeZone: "Europe/Berlin",
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <details className="group mt-6 border-t pt-4">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm [&::-webkit-details-marker]:hidden">
        <span className="font-medium">
          {t("participants.title", { n: members.length })}
        </span>
        <span className="flex items-center gap-2 text-muted-foreground transition-colors group-hover:text-foreground">
          <span className="group-open:hidden">{t("participants.show")}</span>
          <span className="hidden group-open:inline">
            {t("participants.hide")}
          </span>
          <ChevronDown
            className="size-4 transition-transform group-open:rotate-180"
            aria-hidden
          />
        </span>
      </summary>

      <div className="mt-4 text-sm">
        <div className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b pb-2 text-xs text-muted-foreground sm:gap-x-8">
          <span>{t("participants.name")}</span>
          <span className="text-right">{t("participants.stars")}</span>
          <span className="min-w-24 text-right sm:min-w-28">
            {t("participants.lastSolved")}
          </span>
        </div>
        <ul>
          {sorted.map((member) => (
            <li
              key={member.id}
              className="grid grid-cols-[1fr_auto_auto] gap-x-4 border-b py-2 last:border-b-0 sm:gap-x-8"
            >
              <span className="truncate">
                {member.name || t("common.noName")}
              </span>
              <span className="text-right font-plex-mono tabular-nums">
                {member.stars}
              </span>
              <span className="min-w-24 text-right font-plex-mono text-xs tabular-nums text-muted-foreground sm:min-w-28">
                {member.last_star_ts > 0
                  ? formatTime(member.last_star_ts)
                  : t("participants.none")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
