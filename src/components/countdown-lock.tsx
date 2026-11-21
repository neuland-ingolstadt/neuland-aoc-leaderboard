import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useI18n } from "@/src/i18n/i18n";
import type { MessageKey } from "@/src/i18n/messages";
import { TopGlow } from "@/src/components/top-glow";
import { SnowBackground } from "@/src/components/snow-background";
import { Lock } from "lucide-react";
import { InfoCards } from "@/components/layout/header";

const UNITS: { labelKey: MessageKey; ms: number }[] = [
  { labelKey: "countdown.days", ms: 86_400_000 },
  { labelKey: "countdown.hours", ms: 3_600_000 },
  { labelKey: "countdown.minutes", ms: 60_000 },
  { labelKey: "countdown.seconds", ms: 1_000 },
];

export function CountdownLock({
  unlockAt,
  inviteCode,
}: {
  unlockAt: number;
  inviteCode: string;
}) {
  const router = useRouter();
  const { t } = useI18n();
  // null until mounted to avoid a server/client hydration mismatch
  const [now, setNow] = useState<number | null>(null);

  useEffect(() => {
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, []);

  const remaining = now === null ? null : Math.max(0, unlockAt - now);

  useEffect(() => {
    if (remaining === 0) router.invalidate();
  }, [remaining, router]);

  const values = UNITS.map(({ labelKey, ms }, i) => {
    const total = remaining ?? 0;
    const larger = i === 0 ? Infinity : UNITS[i - 1].ms;
    return { labelKey, value: Math.floor((total % larger) / ms) };
  });

  return (
    <main className="relative flex min-h-screen items-center overflow-hidden px-4 py-12 md:px-10">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SnowBackground />
        <TopGlow />
      </div>
      <div className="mx-auto grid w-full max-w-6xl content-center items-center gap-12 lg:grid-cols-2">
        <div className="flex flex-col items-center gap-10">
          <div className="flex flex-col items-center gap-5 text-center">
            <img
              src="/img/neuland_icon.svg"
              alt="Neuland Logo"
              width={64}
              height={64}
              className="brightness-0 dark:invert"
            />
            <p className="text-2xl">{t("header.title")}</p>
            <h1 className="lg:text-7xl text-5xl font-plex-mono font-semibold text-center">
              Advent Of
              <br />
              Code 2026
            </h1>
          </div>
          <div className="w-full bg-background border">
            <div className="grid grid-cols-4 divide-x">
              {values.map(({ labelKey, value }) => (
                <div
                  key={labelKey}
                  className="flex flex-col items-center gap-1 px-2 py-3 md:px-4 md:py-4"
                >
                  <span className="font-plex-mono font-semibold text-2xl md:text-4xl tabular-nums">
                    {remaining === null ? "--" : String(value).padStart(2, "0")}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {t(labelKey)}
                  </span>
                </div>
              ))}
            </div>
            <div className="flex items-center justify-center gap-3 border-t px-4 py-3 text-center">
              <Lock
                className="size-6 shrink-0 text-foreground dark:text-accent"
                strokeWidth={1.5}
              />
              <p className="text-muted-foreground">{t("countdown.unlock")}</p>
            </div>
          </div>
        </div>
        <InfoCards inviteCode={inviteCode} className="md:grid-cols-1" />
      </div>
    </main>
  );
}
