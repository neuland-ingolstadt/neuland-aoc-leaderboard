import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/src/i18n/i18n";

export default function Footer() {
  const { dev } = useSearch({ strict: false }) as { dev?: boolean };
  const { t } = useI18n();
  return (
    <div className="w-full border-t border-border mt-8">
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
        </div>
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Link
            to="/teilnahmebedingungen"
            className="underline underline-offset-4 hover:text-foreground"
          >
            {t("footer.terms")}
          </Link>
          <div className="flex items-center gap-2">
            {import.meta.env.DEV && (
              <Button asChild variant="outline" size="sm">
                <Link to="/" search={{ dev: dev ? undefined : true }}>
                  Dev: {dev ? "Landing Page" : "Dashboard"}
                </Link>
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
