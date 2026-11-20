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
            Der Advent of Code (AoC) ist ein jährliches globales Event in Form eines Adventskalenders für Programmierer. Statt Schokolade gibt es 12 Programmierrätsel, die man in einer beliebigen Sprache lösen kann. Es geht um den Spaß an der Problemlösung - jeder ist herzlich dazu eingeladen, sich an den Rätseln zu versuchen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <a
            href="https://adventofcode.com/2026/about"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm underline underline-offset-4 hover:text-accent"
          >
            Mehr über den Advent of Code erfahren →
          </a>
        </CardContent>
      </Card>
      <Card className="relative overflow-hidden">
        <div aria-hidden className="absolute inset-0 pointer-events-none">
          {[
            "-right-6 -top-6 rotate-12",
            "right-24 -top-10 -rotate-6",
            "-right-8 -bottom-10 -rotate-12",
            "right-20 -bottom-12 rotate-6",
          ].map((position, i) => (
            <img
              key={position}
              src={`/img/shirts/shirt-${i + 1}.png`}
              alt=""
              loading="lazy"
              className={cn("absolute w-28 md:w-32 h-auto", position)}
            />
          ))}
          <div className="absolute inset-0 bg-card/90 sm:hidden" />
        </div>
        <CardHeader className="relative z-10 sm:pr-[45%]">
          <CardTitle className={"text-xl"}>Mitmachen und Merch abstauben</CardTitle>
          <CardDescription>
            Neuland stellt euch ein vereinsinternes Leaderboard zur Verfügung, auf dem ihr euch mit anderen Mitgliedern messen könnt. <strong>Wer am Ende auf Platz 1 landet, darf sich als Gewinn ein T-Shirt aus unserem Merch Shop selbst aussuchen.</strong>
          </CardDescription>
        </CardHeader>
        <CardContent className="relative z-10">
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"lg"} className={"hover:cursor-pointer bg-accent text-black hover:bg-accent/90"}>
                  Los geht's
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
                          und trage den untenstehenden Einladungscode ein. <strong>Fertig!</strong> Du tauchst innerhalb der nächsten Minuten auf dem Leaderboard auf.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <CopyCodeInput
                          code={inviteCode}
                        ></CopyCodeInput>
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
  const endDate = new Date('2026-12-24');
  const diffTime = Math.abs(endDate.getTime() - today.getTime());
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  return (
    <div
      id="header-section"
      className={"flex flex-col items-center gap-20 px-1 md:px-5 xl:px-40 2xl:px-80 py-10 pt-30"}
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
          className={"lg:text-7xl text-5xl font-plex-mono font-semibold text-center text-accent"}
        >Advent Of<br />Code 2026</h1>
        <Badge variant={"secondary"} className="">{diffDays} Tage übrig</Badge>
      </div>
      <InfoCards inviteCode={inviteCode} />
    </div >
  );
}
