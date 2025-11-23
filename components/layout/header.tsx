import { CopyCodeInput } from "@/src/components/CopyCodeInput";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";

export default function Header() {
  return (
    <div
      id="header-section"
      className={"flex flex-col items-center gap-10 px-100 py-10"}
    >
      <Badge className={"px-3 py-1 text-lg"} variant={"outline"}>
        Advent Of Code 2025 🎄
      </Badge>
      <h1
        className={"text-7xl font-azeret font-semibold text-center text-accent"}
      >
        Neuland
        <br />
        Leaderboard
      </h1>
      <div className={"w-full grid grid-cols-2 gap-5"}>
        <Card>
          <CardHeader>
            <CardTitle className={"text-xl"}>Über den Advent Of Code</CardTitle>
            <CardDescription>
              Der Advent of Code (AoC) ist ein jährliches globales Event in Form
              eines Adventskalenders für Programmierer, der von Eric Wastl
              erstellt wird. Statt Schokolade gibt es jeden Tag kleine,
              weihnachtlich verpackte Programmierrätsel, die man in einer
              beliebigen Sprache lösen kann. Es geht um Spaß, Problemlösung und
              oft auch darum, neue Technologien zu lernen.
            </CardDescription>
          </CardHeader>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className={"text-xl"}>Mitmachen</CardTitle>
            <CardDescription>
              Wir bieten dir eine geschlossene Rangliste, der du beitreten
              kannst, um dich mit anderen Neuland Mitgliedern zu messen.{" "}
              <strong className={"text-white"}>
                Der Gewinner erhält eine große 3D-gedruckte Ente als Preis.
              </strong>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button size={"lg"} className={"hover:cursor-pointer"}>Los geht's</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle className={"text-2xl"}>
                      Dem Leaderboard beitreten
                    </DialogTitle>
                  </DialogHeader>
                  <div className={"grid gap-5"}>
                    <div className={"flex gap-3 items-start"}>
                      <Badge variant={"outline"} className={"text-xl w-10"}>
                        1
                      </Badge>
                      <Card className={"grow bg-background"}>
                        <CardHeader>
                          <CardTitle>Anmelden bei Advent Of Code</CardTitle>
                          <CardDescription>
                            Melde dich auf der{" "}
                            <a
                              href={"https://adventofcode.com/2025/auth/login"}
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
                      <Badge variant={"outline"} className={"text-xl w-10"}>
                        2
                      </Badge>
                      <Card className={"grow"}>
                        <CardHeader>
                          <CardTitle>Einladungscode eingeben</CardTitle>
                          <CardDescription>
                            Navigiere auf der AoC-Website zur{" "}
                            <a
                              href={
                                "https://adventofcode.com/2025/leaderboard/private"
                              }
                              target={"_blank"}
                              className={"underline"}
                            >
                              Leaderboard-Page
                            </a>{" "}
                            und trage den untenstehenden Einladungscode ein.
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <CopyCodeInput
                            code={"CODEAUSTAUSCHEN"} // TODO: get invite code from .env file
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
    </div>
  );
}
