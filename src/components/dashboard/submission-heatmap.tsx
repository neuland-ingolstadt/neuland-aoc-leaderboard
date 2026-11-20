import { Fragment } from "react";
import { Leaderboard } from "@/src/types/leaderboard";

interface Props {
  leaderboard: Leaderboard;
  days?: number;
}

const HOURS = Array.from({ length: 24 }, (_, i) => i);

// GitHub-like discrete green scale, level 0 keeps a faint tint
const LEVEL_PERCENT = [8, 30, 50, 75, 100];
const levelColor = (level: number) =>
  `color-mix(in oklch, var(--accent) ${LEVEL_PERCENT[level]}%, transparent)`;

const hourFormat = new Intl.DateTimeFormat("de-DE", {
  hour: "numeric",
  hourCycle: "h23",
  timeZone: "Europe/Berlin",
});

export function SubmissionHeatmap({ leaderboard, days = 12 }: Props) {
  // counts[day - 1][hour]: solved stars per puzzle day and hour of day (Berlin time)
  const counts = Array.from({ length: days }, () => HOURS.map(() => 0));

  for (const member of Object.values(leaderboard.members)) {
    for (const [day, parts] of Object.entries(member.completion_day_level)) {
      const row = counts[Number(day) - 1];
      if (!row) continue;
      for (const star of Object.values(parts)) {
        const hour = Number(
          hourFormat
            .formatToParts(new Date(star.get_star_ts * 1000))
            .find((part) => part.type === "hour")?.value,
        );
        row[hour]++;
      }
    }
  }

  const max = Math.max(1, ...counts.flat());
  const levelOf = (count: number) =>
    count === 0 ? 0 : Math.ceil((count / max) * 4);

  const cellTitle = (day: number, hour: number, count: number) =>
    `Tag ${day}, ${hour}–${hour + 1} Uhr: ${count} ${count === 1 ? "Lösung" : "Lösungen"}`;

  const legend = (
    <div className="flex items-center justify-end gap-1 pt-2">
      <span className="pr-1">weniger</span>
      {LEVEL_PERCENT.map((_, level) => (
        <div
          key={level}
          className="size-3"
          style={{ backgroundColor: levelColor(level) }}
        />
      ))}
      <span className="pl-1">mehr</span>
    </div>
  );

  return (
    <div className="font-plex-mono text-xs text-muted-foreground">
      <div>
        <div className="grid grid-cols-[1rem_1.25rem_repeat(24,minmax(0,1fr))] gap-0.5 sm:gap-1 sm:grid-cols-[1rem_1.5rem_repeat(24,minmax(0,1fr))] items-center">
          <span className="text-center" style={{ gridColumn: "3 / 27" }}>
            Uhrzeit (deutsche Zeit)
          </span>
          <span style={{ gridColumn: "1 / 3" }} />
          {HOURS.map((hour) => (
            <span key={hour} className="whitespace-nowrap">
              {hour % 3 === 0 ? hour : ""}
            </span>
          ))}
          <span
            className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180"
            style={{ gridColumn: 1, gridRow: `3 / span ${days}` }}
          >
            Tag
          </span>
          {counts.map((row, i) => (
            <Fragment key={i}>
              <span className="text-right">{i + 1}</span>
              {row.map((count, hour) => (
                <div
                  key={hour}
                  title={cellTitle(i + 1, hour, count)}
                  className="h-4 sm:h-5"
                  style={{ backgroundColor: levelColor(levelOf(count)) }}
                />
              ))}
            </Fragment>
          ))}
        </div>
        {legend}
      </div>
    </div>
  );
}
