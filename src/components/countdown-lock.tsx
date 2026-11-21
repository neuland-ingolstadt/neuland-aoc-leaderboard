import { useEffect, useRef, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { useI18n } from "@/src/i18n/i18n";
import type { MessageKey } from "@/src/i18n/messages";
import { NavBar } from "@/src/components/nav-bar";
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
  participants,
}: {
  unlockAt: number;
  inviteCode: string;
  // names of everyone who has joined so far, null if they are not available
  participants: (string | null)[] | null;
}) {
  const router = useRouter();
  const { t } = useI18n();
  // null until mounted to avoid a server/client hydration mismatch
  const [now, setNow] = useState<number | null>(null);

  // true if the page was opened before the unlock, so it should switch over once it passes
  const waitedForUnlock = useRef(false);

  useEffect(() => {
    waitedForUnlock.current = unlockAt > Date.now();
    setNow(Date.now());
    const interval = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(interval);
  }, [unlockAt]);

  const remaining = now === null ? null : Math.max(0, unlockAt - now);

  useEffect(() => {
    if (remaining === 0 && waitedForUnlock.current) router.invalidate();
  }, [remaining, router]);

  // pick up new sign-ups without a manual reload (the server caches the data for a while)
  useEffect(() => {
    const interval = setInterval(() => router.invalidate(), 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [router]);

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
      <NavBar />
      <div className="mx-auto grid w-full max-w-6xl content-center items-center gap-x-12 gap-y-12 lg:grid-cols-2 lg:gap-y-10">
        <div className="flex flex-col items-center gap-10 lg:col-start-1 lg:row-start-1">
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
        <InfoCards
          inviteCode={inviteCode}
          className="md:grid-cols-1 lg:col-start-2 lg:row-span-2 lg:row-start-1"
        />
        {participants && (
          <section
            className="w-full lg:col-start-1 lg:row-start-2"
            aria-label={t("landing.joined", { n: participants.length })}
          >
            <h2 className="mb-3 text-center text-sm font-medium">
              {t("landing.joined", { n: participants.length })}
            </h2>
            {participants.length === 0 ? (
              <p className="text-center text-sm text-muted-foreground">
                {t("landing.none")}
              </p>
            ) : (
              <ul className="flex flex-wrap justify-center gap-1.5">
                {participants.map((name, i) => (
                  <li
                    key={i}
                    className="border bg-background px-2.5 py-1 text-xs"
                  >
                    {name || t("common.noName")}
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-center text-xs text-muted-foreground">
              {t("landing.note")}
            </p>
          </section>
        )}
      </div>
    </main>
  );
}
