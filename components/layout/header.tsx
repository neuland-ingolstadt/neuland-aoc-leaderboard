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

export function InfoCards({
  inviteCode,
  className,
}: {
  inviteCode: string;
  className?: string;
}) {
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
          <CardTitle className={"text-xl"}>Über den Advent Of Code</CardTitle>
          <CardDescription>
            Der Advent of Code (AoC) ist ein jährliches globales Event in Form
            eines Adventskalenders für Programmierer. Statt Schokolade gibt es
            12 Programmierrätsel, die man in einer beliebigen Sprache lösen
            kann. Es geht um den Spaß an der Problemlösung - jeder ist herzlich
            dazu eingeladen, sich an den Rätseln zu versuchen. Mehr darüber
            erfährst du auf der{" "}
            <a
              href="https://adventofcode.com/2026/about"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-foreground"
            >
              offiziellen Website des Advent of Code
            </a>
            .
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
          <CardTitle className={"text-xl"}>
            Mitmachen und Merch abstauben
          </CardTitle>
          <CardDescription>
            Neuland stellt euch ein vereinsinternes Leaderboard zur Verfügung,
            auf dem ihr euch mit anderen Mitgliedern messen könnt.{" "}
            <strong>
              Wer am Ende auf Platz 1 landet, darf sich als Gewinn ein T-Shirt
              aus unserem Merch Shop selbst aussuchen.
            </strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-1 flex-col justify-end sm:pr-[52%]">
          <p className="text-xs text-muted-foreground">
            Beachte die{" "}
            <Link
              to="/teilnahmebedingungen"
              className="underline underline-offset-2 hover:text-foreground"
            >
              Teilnahmebedingungen
            </Link>
            .
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
                Mitmachen
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className={"text-2xl"}>
                  Dem Leaderboard beitreten
                </DialogTitle>
              </DialogHeader>
              <div className={"grid gap-5"}>
                <div className={"flex gap-3 items-start"}>
                  <Card className={"grow bg-background"}>
                    <CardHeader>
                      <CardTitle>1. Anmelden bei Advent Of Code</CardTitle>
                      <CardDescription>
                        Melde dich auf der{" "}
                        <a
                          href={"https://adventofcode.com/2026/auth/login"}
                          target={"_blank"}
                          className={"underline hover:cursor-pointer"}
                        >
                          offiziellen Website des AoC
                        </a>{" "}
                        an.
                      </CardDescription>
                    </CardHeader>
                  </Card>
                </div>
                <div className={"flex gap-3 items-start"}>
                  <Card className={"grow"}>
                    <CardHeader>
                      <CardTitle>2. Einladungscode eingeben</CardTitle>
                      <CardDescription>
                        Navigiere auf der AoC-Website zur{" "}
                        <a
                          href={
                            "https://adventofcode.com/2026/leaderboard/private"
                          }
                          target={"_blank"}
                          className={"underline"}
                        >
                          Leaderboard-Page
                        </a>{" "}
                        und trage den untenstehenden Einladungscode ein.{" "}
                        <strong>Fertig!</strong> Es dauert ein paar Minuten, bis
                        dein Eintrag übernommen wird. Dann bist du mit dabei und
                        wirst auf dem Neuland Leaderboard angezeigt.
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CopyCodeInput code={inviteCode}></CopyCodeInput>
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

export default function Header({ inviteCode }: { inviteCode: string }) {
  const today = new Date();
  const diffDays = Math.max(
    0,
    Math.ceil((END_AT - today.getTime()) / (1000 * 60 * 60 * 24)),
  );

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
        <p className="text-2xl">Neuland Leaderboard</p>
        <h1
          className={
            "lg:text-7xl text-5xl font-plex-mono font-semibold text-center leading-[1.45]"
          }
        >
          <span className="accent-marker-line marker-a">Advent Of</span>
          <br />
          <span className="accent-marker-line marker-b">Code 2026</span>
        </h1>
        <div className="flex items-center gap-2.5 border bg-background px-4 py-2.5">
          {diffDays === 0 ? (
            <span className="text-sm leading-none text-muted-foreground">
              Der Wettbewerb ist beendet
            </span>
          ) : (
            <>
              <span className="font-plex-mono text-2xl font-semibold leading-none tabular-nums">
                {diffDays}
              </span>
              <span className="text-sm leading-none text-muted-foreground">
                {diffDays === 1 ? "Tag" : "Tage"} übrig
              </span>
            </>
          )}
        </div>
      </div>
      <InfoCards inviteCode={inviteCode} />
    </div>
  );
}
