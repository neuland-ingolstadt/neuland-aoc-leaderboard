import { Link } from "@tanstack/react-router";
import { useI18n } from "@/src/i18n/i18n";
import type { Leaderboard } from "@/src/types/leaderboard";

// Announces the winner after the end of the challenge. Equal top scores are shown as a tie,
// because the terms of participation let the club decide in that case.
export function WinnerCard({ leaderboard }: { leaderboard: Leaderboard }) {
  const { t, rich } = useI18n();
  const members = Object.values(leaderboard.members).sort(
    (a, b) => b.local_score - a.local_score,
  );
  const topScore = members[0]?.local_score ?? 0;
  const winners =
    topScore > 0 ? members.filter((m) => m.local_score === topScore) : [];
  const isTie = winners.length > 1;
  const nameOf = (name: string | null) => name || t("common.noName");

  return (
    <section className="flex flex-col items-center gap-6 px-2 py-8 text-center md:py-12">
      {winners.length === 0 ? (
        <p className="max-w-md text-muted-foreground">{t("end.noWinner")}</p>
      ) : (
        <>
          <p className="font-plex-mono text-sm uppercase tracking-[0.2em] text-muted-foreground md:text-base">
            {isTie ? t("end.tie") : t("end.winner")}
          </p>
          <div className="flex flex-col items-center gap-4">
            {winners.map((winner) => (
              <p
                key={winner.id}
                className="font-plex-mono text-4xl font-semibold leading-snug break-words md:text-6xl"
              >
                <span className="accent-marker">{nameOf(winner.name)}</span>
              </p>
            ))}
          </div>
          <p className="font-plex-mono text-sm text-muted-foreground md:text-base">
            {t("end.stats", {
              points: topScore,
              stars: winners[0].stars,
            })}
          </p>
          <p className="max-w-lg text-sm text-muted-foreground">
            {isTie
              ? rich("end.tieText", {
                  link: (content) => (
                    <Link
                      to="/teilnahmebedingungen"
                      className="underline underline-offset-2 hover:text-foreground"
                    >
                      {content}
                    </Link>
                  ),
                })
              : t("end.congrats")}
          </p>
        </>
      )}
    </section>
  );
}
