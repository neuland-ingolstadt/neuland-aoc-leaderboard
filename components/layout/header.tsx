import { useEffect, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { Trophy } from "lucide-react";
import { CopyCodeInput } from "@/src/components/CopyCodeInput";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

import { cn } from "@/lib/utils";
import { END_AT } from "@/src/lib/unlock";
import { splitDuration, useCountdown } from "@/src/lib/use-countdown";
import { useRouter } from "@tanstack/react-router";
import { useI18n } from "@/src/i18n/i18n";

export function InfoCards({
  inviteCode,
  className,
}: {
  inviteCode: string;
  className?: string;
}) {
  const { t, rich } = useI18n();
  const externalLink =
    (href: string, className: string) => (content: ReactNode) => (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    );
  return (
    <div
      id="infos"
      className={cn(
        "w-full grid md:grid-cols-2 gap-5 scroll-mt-4 md:scroll-mt-20",
        className,
      )}
    >
      <Card>
        <CardHeader>
          <CardTitle className={"text-xl"}>{t("about.title")}</CardTitle>
          <CardDescription>
            {rich("about.text", {
              link: externalLink(
                "https://adventofcode.com/2026/about",
                "underline underline-offset-2 hover:text-foreground",
              ),
            })}
          </CardDescription>
        </CardHeader>
      </Card>
      <Card className="@container relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* soft green glow behind the shirts */}
          <div className="absolute -right-10 top-1/2 hidden size-96 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_22%,transparent),transparent)] sm:block" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--accent)_25%,transparent),transparent_70%)] sm:hidden" />
          {/* desktop: three shirts stacked diagonally, sized by the card height */}
          <div className="absolute inset-y-0 right-0 hidden w-[50%] sm:block">
            <img
              src="/img/shirts/shirt-2.png"
              alt=""
              loading="lazy"
              className="absolute -right-[4%] -top-[7%] z-0 h-[56%] w-auto max-w-none"
            />
            <img
              src="/img/shirts/shirt-4.png"
              alt=""
              loading="lazy"
              className="absolute left-[14%] top-[28%] z-10 h-[54%] w-auto max-w-none"
            />
            <img
              src="/img/shirts/shirt-3.png"
              alt=""
              loading="lazy"
              className="absolute -bottom-[3%] -left-[3%] z-20 h-[50%] w-auto max-w-none drop-shadow-[-8px_10px_16px_rgba(0,0,0,0.65)]"
            />
          </div>
          {/* Mobile: shirts peek in from the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 flex translate-y-[40%] justify-center -space-x-6 sm:hidden">
            {["shirt-3", "shirt-4", "shirt-2"].map((name) => (
              <img
                key={name}
                src={`/img/shirts/${name}.png`}
                alt=""
                loading="lazy"
                className="w-[36%] h-auto"
              />
            ))}
          </div>
          <div className="absolute inset-0 hidden sm:block bg-[linear-gradient(to_right,var(--card)_0%,color-mix(in_oklch,var(--card)_95%,transparent)_30%,color-mix(in_oklch,var(--card)_82%,transparent)_42%,color-mix(in_oklch,var(--card)_58%,transparent)_52%,color-mix(in_oklch,var(--card)_32%,transparent)_62%,color-mix(in_oklch,var(--card)_11%,transparent)_74%,color-mix(in_oklch,var(--card)_0%,transparent)_88%)]" />
        </div>
        <CardHeader className="relative z-10 sm:pr-[52%]">
          <CardTitle className={"text-xl"}>{t("join.title")}</CardTitle>
          <CardDescription>
            {rich("join.text", { strong: (c) => <strong>{c}</strong> })}
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-1 flex-col justify-end sm:pr-[52%]">
          <p className="text-xs text-muted-foreground">
            {rich("join.terms", {
              link: (c) => (
                <Link
                  to="/teilnahmebedingungen"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  {c}
                </Link>
              ),
            })}
          </p>
        </CardContent>
        <div className="relative z-10 px-6 pb-32 sm:pb-0 sm:pr-[52%]">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                size={"lg"}
                variant="accent"
                className="group h-12 w-full text-base hover:cursor-pointer"
              >
                <Trophy
                  className="size-5 transition-transform duration-200 group-hover:-rotate-12 group-hover:scale-110"
                  aria-hidden
                />
                {t("join.button")}
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={"text-2xl"}>
                  {t("join.dialogTitle")}
                </DialogTitle>
              </DialogHeader>
              <div className={"grid gap-5"}>
                <div className={"flex gap-3 items-start"}>
                  <Card className={"grow bg-background"}>
                    <CardHeader>
                      <CardTitle>{t("join.step1Title")}</CardTitle>
                      <CardDescription>
                        {rich("join.step1Text", {
                          link: externalLink(
                            "https://adventofcode.com/2026/auth/login",
                            "underline hover:cursor-pointer",
                          ),
                        })}
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className={"flex gap-3 items-start"}>
                  <Card className={"grow"}>
                    <CardHeader>
                      <CardTitle>{t("join.step2Title")}</CardTitle>
                      <CardDescription>
                        {rich("join.step2Text", {
                          link: externalLink(
                            "https://adventofcode.com/2026/leaderboard/private",
                            "underline",
                          ),
                          strong: (c) => <strong>{c}</strong>,
                        })}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CopyCodeInput
                        code={inviteCode || t("join.codeUnavailable")}
                      />
                    </CardContent>
                  </Card>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </Card>
    </div>
  );
}

export default function Header({
  inviteCode,
  ended = false,
}: {
  inviteCode: string;
  // after the end of the challenge the counter, join and info cards make no sense
  ended?: boolean;
}) {
  const { t } = useI18n();
  const router = useRouter();
  const remaining = useCountdown(END_AT);
  const parts = splitDuration(remaining ?? 0);

  // once the end is reached while the page is open, reload so the winner view takes over
  useEffect(() => {
    if (remaining === 0 && !ended) router.invalidate();
  }, [remaining, ended, router]);

  return (
    <div
      id="header-section"
      className={
        "mx-auto flex w-full max-w-5xl flex-col items-center gap-20 px-1 md:px-5 py-10 pt-30"
      }
    >
      <div className="flex flex-col items-center gap-5">
        <img
          src="/img/neuland_icon.svg"
          alt="Neuland Logo"
          width={64}
          height={64}
          className="brightness-0 dark:invert"
        />
        <p className="text-2xl">{t("header.title")}</p>
        <h1
          className={cn(
            "lg:text-7xl text-5xl font-plex-mono font-semibold text-center",
            ended ? "leading-tight" : "leading-[1.45]",
          )}
        >
          {/* after the end only the winner carries the marker */}
          {ended ? (
            <>
              Advent Of
              <br />
              Code 2026
            </>
          ) : (
            <>
              <span className="accent-marker-line marker-a">Advent Of</span>
              <br />
              <span className="accent-marker-line marker-b">Code 2026</span>
            </>
          )}
        </h1>
        {!ended && (
          <div className="flex flex-col items-center gap-1.5">
            <p className="text-sm text-muted-foreground">
              {t("header.endsIn")}
            </p>
            <div
              className="flex divide-x border bg-background"
              role="timer"
              aria-label={t("header.endsIn")}
            >
              {(
                [
                  ["days", "countdown.short.days"],
                  ["hours", "countdown.short.hours"],
                  ["minutes", "countdown.short.minutes"],
                  ["seconds", "countdown.short.seconds"],
                ] as const
              ).map(([unit, labelKey]) => (
                <div
                  key={unit}
                  className="flex min-w-12 flex-col items-center px-2.5 py-1.5"
                >
                  <span className="font-plex-mono text-lg font-semibold leading-none tabular-nums">
                    {remaining === null
                      ? "--"
                      : String(parts[unit]).padStart(2, "0")}
                  </span>
                  <span className="mt-1 text-[10px] leading-none text-muted-foreground">
                    {t(labelKey)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {!ended && <InfoCards inviteCode={inviteCode} />}
    </div>
  );
}
