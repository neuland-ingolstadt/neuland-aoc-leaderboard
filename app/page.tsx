import Header from "@/components/layout/header";
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

export default async function Home() {
  const data = await fetch("http://localhost:3000/api/leaderboard");
  const parsedData: Leaderboard = await data.json();

  const memberList = Object.values(parsedData.members);
  const memberListSorted = memberList.slice().sort((a, b) => {
    return a.local_score - b.local_score;
  });

  return (
    <>
      <Header></Header>
      <div className={"grid grid-cols-1 gap-4 px-100"}>
        <div className={"flex flex-row gap-4"}>
          <Card className={"grow"}>
            <CardHeader>
              <CardTitle>🥇 Aktuell 1. Platz</CardTitle>
              <CardDescription>
                {highScoreMember.local_score + " Punkten"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={"text-3xl"}>{highScoreMember.name}</p>
            </CardContent>
          </Card>
          <Card className={"grow"}>
            <CardHeader>
              <CardTitle>⭐ Meiste Sterne</CardTitle>
              <CardDescription>
                {highStarsMember.stars + " Sterne"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={"text-3xl"}>{highStarsMember.name}</p>
            </CardContent>
          </Card>
          <Card className={"grow"}>
            <CardHeader>
              <CardTitle>⏰ Neuste Lösung</CardTitle>
              <CardDescription>
                {"Am " +
                  new Date(newestCommitMember.last_star_ts).toLocaleDateString(
                    "de-DE"
                  ) +
                  " um " +
                  new Date(newestCommitMember.last_star_ts).toLocaleTimeString(
                    "de-DE"
                  )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className={"text-3xl"}>{highStarsMember.name}</p>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Verhältnis Anzahl Punkte / Sterne</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
          <CardContent>
            <StarScoreChart members={memberListSorted}></StarScoreChart>
          </CardContent>
        </Card>
        <LeaderboardTable
          columns={columns}
          data={memberList}
        ></LeaderboardTable>
      </div>
    </>
  );
}
