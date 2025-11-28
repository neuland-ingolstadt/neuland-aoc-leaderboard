import Header from "@/components/layout/header";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Leaderboard, LeaderboardMember } from "@/src/types/leaderboard";
import { LeaderboardTable } from "./leaderboard-data-table";
import { columns } from "./leaderboard-column";
import StarScoreChart from "./star-score-chart";
import { StarHistoryChart } from "./star-history-chart";
import { StarChallengeChart } from "./star-challenge-chart";

const highScoreMember: LeaderboardMember = {
  id: 1,
  completion_day_level: {},
  last_star_ts: 211,
  local_score: 203,
  name: "Nerd203",
  stars: 7,
};

const highStarsMember: LeaderboardMember = {
  id: 1,
  completion_day_level: {},
  last_star_ts: 102,
  local_score: 203,
  name: "Nerd104",
  stars: 7,
};

const newestCommitMember: LeaderboardMember = highStarsMember;

// Start and end date to display statistics for
const startDate = new Date("2025-12-1");
const endDate = new Date("2025-12-12");

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
      <Header></Header>
      <div className={"grid grid-cols-1 gap-4 px-40"}>
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
          <CardFooter>
            Die Daten werden in Halbtagesschritten angezeigt.
          </CardFooter>
        </Card>
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
      </div>
    </>
  );
}
