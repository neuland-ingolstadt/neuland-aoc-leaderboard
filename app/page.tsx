import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaderboard, LeaderboardMember } from "@/src/types/leaderboard";
import { LeaderboardTable } from "./leaderboard-data-table";
import { columns } from "./leaderboard-column";
import StarScoreChart from "./star-score-chart";
import { StarHistoryChart } from "./star-history-chart";
import { StarChallengeChart } from "./star-challenge-chart";

// Start and end date to display statistics for
const startDate = new Date("2025-12-1");
const endDate = new Date("2025-12-5");

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/leaderboard");
  const parsedData: Leaderboard = await data.json();

  const memberList = Object.values(parsedData.members);
  const memberListSortedByScore = memberList.slice().sort((a, b) => {
    return b.local_score - a.local_score;
  });

  const memberListSortedByStars = memberList.slice().sort((a, b) => {
    return b.stars - a.stars;
  });

  const memberListSortedByLastStar = memberList.slice().sort((a, b) => {
    return b.last_star_ts - a.last_star_ts;
  });

  return (
    <>
      <Header />
      <div className={"grid grid-cols-1 gap-4 px-80 pt-20"}>
        <div className={"grid grid-cols-3 gap-4"}>
          <Card className={"grow"}>
            <CardHeader>
              <CardTitle>🥇 Aktuell 1. Platz</CardTitle>
              <CardDescription>
                {memberListSortedByScore[0].local_score + " Punkten"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={"text-3xl"}>{memberListSortedByScore[0].name}</p>
            </CardContent>
          </Card>
          <Card className={"grow"}>
            <CardHeader>
              <CardTitle>⭐ Meiste Sterne</CardTitle>
              <CardDescription>
                {memberListSortedByStars[0].stars + " Sterne"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={"text-3xl"}>{memberListSortedByStars[0].name}</p>
            </CardContent>
          </Card>
          <Card className={"grow"}>
            <CardHeader>
              <CardTitle>⏰ Neuste Lösung</CardTitle>
              <CardDescription>
                {"Am " +
                  new Date(memberListSortedByLastStar[0].last_star_ts * 1000).toLocaleDateString(
                    "de-DE"
                  ) +
                  " um " +
                  new Date(memberListSortedByLastStar[0].last_star_ts * 1000).toLocaleTimeString(
                    "de-DE"
                  )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={"text-3xl"}>{memberListSortedByLastStar[0].name}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Verhältnis Anzahl Punkte / Sterne</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <StarScoreChart members={memberListSortedByScore}></StarScoreChart>
          </CardContent>
        </Card>

        <div className={"grid grid-cols-2 gap-4"}>
          <Card>
            <CardHeader>
              <CardTitle>
                Verhältnis Lösungen erster Teil / zweiter Teil
              </CardTitle>
              <CardDescription>
                Wie oft wurde insgesamt der erste Teil und der zweite Teil eines Rätselsgelöst (alle Teilnehmer zusammen)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StarChallengeChart leaderboardData={parsedData}></StarChallengeChart>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Verlauf der Sterne</CardTitle>
              <CardDescription>{startDate.toLocaleDateString("de-DE") + " bis " + endDate.toLocaleDateString("de-DE")}</CardDescription>
            </CardHeader>
            <CardContent>
              <StarHistoryChart
                leaderboard={parsedData}
                startDate={startDate}
                endDate={endDate}
              ></StarHistoryChart>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Liste aller Teilnehmer</CardTitle>
          </CardHeader>
          <CardContent>
            <LeaderboardTable
              columns={columns}
              data={memberListSortedByScore}
            ></LeaderboardTable>
          </CardContent>
        </Card>
      </div>
      <Footer />
    </>
  );
}
