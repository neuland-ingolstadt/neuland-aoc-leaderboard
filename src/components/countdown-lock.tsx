import { useEffect, useState } from "react";
import { useRouter } from "@tanstack/react-router";
import { SnowBackground } from "@/src/components/snow-background";
import { Lock } from "lucide-react";
import { InfoCards } from "@/components/layout/header";

const UNITS = [
  { label: "Tage", ms: 86_400_000 },
  { label: "Stunden", ms: 3_600_000 },
  { label: "Minuten", ms: 60_000 },
  { label: "Sekunden", ms: 1_000 },
];

export function CountdownLock({
  unlockAt,
  inviteCode,
}: {
  unlockAt: number;
  inviteCode: string;
}) {
  const router = useRouter();
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

  const values = UNITS.map(({ label, ms }, i) => {
    const total = remaining ?? 0;
    const larger = i === 0 ? Infinity : UNITS[i - 1].ms;
    return { label, value: Math.floor((total % larger) / ms) };
  });

  return (
    <main className="relative min-h-screen grid lg:grid-cols-2 content-center items-center gap-12 px-4 py-12 md:px-10 xl:px-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <SnowBackground />
        <div className="absolute left-0 top-1/2 w-[600px] h-[600px] bg-accent/15 rounded-full blur-[120px] -translate-x-1/3 -translate-y-1/2"></div>
      </div>
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-5 text-center">
          <img
            src="/img/neuland_icon.svg"
            alt="Neuland Logo"
            width={64}
            height={64}
            className="brightness-0 dark:invert"
          />
          <p className="text-2xl">Neuland Leaderboard</p>
          <h1 className="lg:text-7xl text-5xl font-plex-mono font-semibold text-center text-accent">
            Advent Of
            <br />
            Code 2026
          </h1>
        </div>
        <div className="grid grid-cols-4 gap-3 md:gap-6">
          {values.map(({ label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 bg-background border rounded-lg px-3 py-4 md:px-6 md:py-6 min-w-16 md:min-w-28"
            >
              <span className="font-plex-mono font-semibold text-3xl md:text-6xl tabular-nums">
                {remaining === null ? "--" : String(value).padStart(2, "0")}
              </span>
              <span className="text-xs md:text-sm text-muted-foreground">
                {label}
              </span>
            </div>
          ))}
        </div>
      </div>
      <InfoCards inviteCode={inviteCode} className="md:grid-cols-1" />
      <div className="flex items-center justify-self-center lg:col-span-2 gap-3 bg-background border rounded-lg px-4 py-3 text-center">
        <Lock className="size-6 shrink-0 text-accent" strokeWidth={1.5} />
        <p className="text-muted-foreground">
          Das Leaderboard wird am 1. Dezember freigeschaltet.
        </p>
      </div>
    </main>
  );
}
