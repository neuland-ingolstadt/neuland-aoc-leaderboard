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

import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

export function InfoCards({
  inviteCode,
  className,
}: {
  inviteCode: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full grid md:grid-cols-2 gap-5", className)}>
      <Card>
        <CardHeader>
          <CardTitle className={"text-xl"}>Über den Advent Of Code</CardTitle>
          <CardDescription>
            Der Advent of Code (AoC) ist ein jährliches globales Event in Form
            eines Adventskalenders für Programmierer. Statt Schokolade gibt es
            12 Programmierrätsel, die man in einer beliebigen Sprache lösen
            kann. Es geht um den Spaß an der Problemlösung - jeder ist herzlich
            dazu eingeladen, sich an den Rätseln zu versuchen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href="https://adventofcode.com/2026/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 hover:bg-accent/25"
          >
            Mehr über den Advent of Code erfahren →
          </a>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {/* soft green glow behind the shirts */}
          <div className="absolute -right-10 top-1/2 hidden size-96 -translate-y-1/2 bg-[radial-gradient(closest-side,color-mix(in_oklch,var(--accent)_22%,transparent),transparent)] sm:block" />
          <div className="absolute inset-x-0 bottom-0 h-48 bg-[radial-gradient(ellipse_at_bottom,color-mix(in_oklch,var(--accent)_25%,transparent),transparent_70%)] sm:hidden" />
          {/* two staggered columns, sized by the card height so they fill the right side */}
          <div className="absolute inset-y-0 -right-6 hidden sm:flex">
            {[
              [["shirt-3", "shirt-4"], "-translate-y-[3%]"],
              [["shirt-1", "shirt-2"], "pt-[16%] -ml-8"],
            ].map(([names, offset], i) => (
              <div key={i} className={cn("flex h-full flex-col", offset)}>
                {(names as string[]).map((name) => (
                  <img
                    key={name}
                    src={`/img/shirts/${name}.png`}
                    alt=""
                    loading="lazy"
                    className="h-[52%] w-auto max-w-none shrink-0"
                  />
                ))}
              </div>
            ))}
          </div>
          {/* Mobile: shirts peek in from the bottom edge */}
          <div className="absolute inset-x-0 bottom-0 flex justify-center -space-x-6 translate-y-[40%] sm:hidden">
            {["shirt-3", "shirt-1", "shirt-2", "shirt-4"].map((name) => (
              <img
                key={name}
                src={`/img/shirts/${name}.png`}
                alt=""
                loading="lazy"
                className="w-[32%] h-auto"
              />
            ))}
          </div>
          <div className="absolute inset-0 hidden sm:block bg-gradient-to-r from-card from-50% to-transparent to-85%" />
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
        <CardContent className="relative z-10 pb-24 sm:pb-0">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size={"lg"}
                  variant="accent"
                  className={"hover:cursor-pointer"}
                >
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
                          <strong>Fertig!</strong> Du tauchst innerhalb der
                          nächsten Minuten auf dem Leaderboard auf.
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
        </CardContent>
      </Card>
    </div>
  );
}

export default function Header({ inviteCode }: { inviteCode: string }) {
  const today = new Date();
  const endDate = new Date("2026-12-24");
  const diffTime = Math.abs(endDate.getTime() - today.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div
      id="header-section"
      className={
        "flex flex-col items-center gap-20 px-1 md:px-5 xl:px-40 2xl:px-80 py-10 pt-30"
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
            "lg:text-7xl text-5xl font-plex-mono font-semibold text-center"
          }
        >
          <span className="accent-marker">
            Advent Of
            <br />
            Code 2026
          </span>
        </h1>
        <Badge variant={"secondary"} className="">
          {diffDays} Tage übrig
        </Badge>
      </div>
      <InfoCards inviteCode={inviteCode} />
    </div>
  );
}
