import { Leaderboard } from "../types/leaderboard";

export default function transformStarData(leaderboardData: Leaderboard) {
  const tsStart = 1764543600;
  const members = leaderboardData.members;
  const numDays = 10;

  const history = [];

  for (let i = 1; i <= numDays; i++) {
    const tsEndOfTheDay = tsStart + 86400 * i; // i Tage drauf addieren

    const dataPoint: any = {
      // Nur workaround
      label: `Dez ${i}`,
      ts: tsEndOfTheDay,
    };

    // Für jedes Mitglied zusammenfassen, welche / wie viele Sterne vor dem Enddatum geholt wurden
    Object.values(members).forEach((member) => {
      let starCount = 0;

      Object.values(member.completion_day_level).forEach((level) => {
        // console.log("----> " + level["1"].get_star_ts);
        if (level["1"] && level["1"].get_star_ts < tsEndOfTheDay) {
          starCount++;
        }

        if (level["2"] && level["2"].get_star_ts < tsEndOfTheDay) {
          starCount++;
        }
      });

      const name = member.name || "Anonym " + Math.random() * 100;

      dataPoint[name] = starCount === 0 ? null : starCount;
    });
    history.push(dataPoint);
  }

  return history;
}
