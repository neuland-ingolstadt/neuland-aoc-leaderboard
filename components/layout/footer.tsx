import { Link, useMatch } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
import { useI18n } from "@/src/i18n/i18n";

export default function Footer() {
  const { t, locale } = useI18n();
  // On the dashboard the footer also shows when the leaderboard data was last loaded
  const home = useMatch({ from: "/", shouldThrow: false });
  const data = home?.loaderData;
  const dashboard = data && !data.locked ? data : null;
  const loadedAt = dashboard?.leaderboard.lastUpdated
    ? new Date(dashboard.leaderboard.lastUpdated)
    : null;

  return (
    // room for the section navigation pill that is fixed to the bottom on mobile
    <div
      className={cn(
        "w-full border-t border-border mt-8",
        dashboard && !dashboard.ended && "max-md:pb-16",
      )}
    >
      <div className="container max-w-200 mx-auto px-4 py-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
        <img
          src="/img/neuland_icon.svg"
          alt="Neuland Icon"
          width={100}
          height={100}
          className="h-8 w-auto brightness-0 dark:invert"
        />
        <div className="flex flex-col gap-2">
          <p className="text-center md:text-left">{t("footer.disclaimer")}</p>
          <p className="text-center md:text-left text-xs opacity-50">
            {t("footer.trademark")}
          </p>
          {loadedAt && (
            <p className="text-center md:text-left text-xs opacity-50">
              {t("dashboard.loaded")}{" "}
              {loadedAt.toLocaleTimeString(locale, {
                timeZone: "Europe/Berlin",
              })}
            </p>
          )}
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Link
            to="/teilnahmebedingungen"
            className="underline underline-offset-4 hover:text-foreground"
          >
            {t("footer.terms")}
          </Link>
        </div>
      </div>
    </div>
  );
}
