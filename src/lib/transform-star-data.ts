import { Leaderboard } from "../types/leaderboard";

type DataPoint = {
  label: string;
  [id: string]: number | string;
};

export type TransformStarDataReturnType = DataPoint[];

export default function transformStarData(
  leaderboardData: Leaderboard,
  startDate: Date,
  endDate: Date
): TransformStarDataReturnType {
  const members = leaderboardData.members;

  const history: TransformStarDataReturnType = [];

  for (let i = startDate; i <= endDate; i.setHours(i.getHours() + 12)) {
    const dataPoint: DataPoint = {
      label: `Tag ${i.getDate()}`,
    };

    // Für jedes Mitglied zusammenfassen, welche / wie viele Sterne vor dem Enddatum geholt wurden
    Object.values(members).forEach((member) => {
      let starCount = 0;

      Object.values(member.completion_day_level).forEach((level) => {
        if (level["1"] && new Date(level["1"].get_star_ts * 1000) < i) {
          starCount++;
        }

        if (level["2"] && new Date(level["2"].get_star_ts * 1000) < i) {
          starCount++;
        }
      });

      const name = member.name || "Anonym";

      dataPoint[name] = starCount;
    });
    history.push(dataPoint);
  }

  return history;
}
