import { Fragment, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
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

  const containerRef = useRef<HTMLDivElement>(null);
  const [selected, setSelected] = useState<{
    day: number;
    hour: number;
    count: number;
    x: number;
    y: number;
  } | null>(null);

  // close the tooltip when clicking anywhere else
  useEffect(() => {
    if (!selected) return;
    const close = (event: PointerEvent) => {
      if (!(event.target as Element).closest("[data-heatmap-cell]")) {
        setSelected(null);
      }
    };
    document.addEventListener("pointerdown", close);
    return () => document.removeEventListener("pointerdown", close);
  }, [selected]);

  const renderCell = (
    day: number,
    hour: number,
    count: number,
    className: string,
  ) => {
    const isSelected = selected?.day === day && selected.hour === hour;
    return (
      <button
        key={`${day}-${hour}`}
        type="button"
        data-heatmap-cell
        aria-label={`Tag ${day}, ${hour}–${hour + 1} Uhr: ${count} ${count === 1 ? "Lösung" : "Lösungen"}`}
        className={cn(
          "block w-full cursor-pointer outline-offset-1",
          isSelected && "outline outline-2 outline-foreground",
          className,
        )}
        style={{ backgroundColor: levelColor(levelOf(count)) }}
        onClick={(event) => {
          if (isSelected) return setSelected(null);
          const container = containerRef.current;
          if (!container) return;
          const cell = event.currentTarget.getBoundingClientRect();
          const box = container.getBoundingClientRect();
          setSelected({
            day,
            hour,
            count,
            x: Math.min(
              Math.max(cell.left - box.left + cell.width / 2, 70),
              box.width - 70,
            ),
            y: cell.top - box.top,
          });
        }}
      />
    );
  };

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
    <div
      ref={containerRef}
      className="relative font-plex-mono text-xs text-muted-foreground"
    >
      {selected && (
        <div
          role="status"
          className="pointer-events-none absolute z-10 w-max max-w-full -translate-x-1/2 -translate-y-full border bg-popover px-3 py-2 text-popover-foreground shadow-md"
          style={{
            left: selected.x,
            top: selected.y - 6,
          }}
        >
          <p className="font-semibold">
            Tag {selected.day} · {selected.hour}–{selected.hour + 1} Uhr
          </p>
          <p className="text-muted-foreground">
            {selected.count} {selected.count === 1 ? "Lösung" : "Lösungen"}
          </p>
        </div>
      )}
      {/* Mobile: days as columns, hours as rows */}
      <div className="sm:hidden">
        <div className="grid grid-cols-[1rem_1.25rem_repeat(12,minmax(0,1fr))] gap-0.5 items-center">
          <span className="text-center" style={{ gridColumn: "3 / -1" }}>
            Tag
          </span>
          <span style={{ gridColumn: "1 / 3" }} />
          {counts.map((_, i) => (
            <span key={i} className="text-center">
              {i + 1}
            </span>
          ))}
          <span
            className="flex items-center justify-center [writing-mode:vertical-rl] rotate-180"
            style={{ gridColumn: 1, gridRow: `3 / span ${HOURS.length}` }}
          >
            Uhrzeit (deutsche Zeit)
          </span>
          {HOURS.map((hour) => (
            <Fragment key={hour}>
              <span className="text-right leading-none">
                {hour % 3 === 0 ? hour : ""}
              </span>
              {counts.map((row, i) =>
                renderCell(i + 1, hour, row[hour], "h-3.5"),
              )}
            </Fragment>
          ))}
        </div>
        {legend}
      </div>

      {/* Desktop: days as rows, hours as columns */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[1rem_1.25rem_repeat(24,minmax(0,1fr))] gap-1 items-center">
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
              {row.map((count, hour) => renderCell(i + 1, hour, count, "h-5"))}
            </Fragment>
          ))}
        </div>
        {legend}
      </div>
    </div>
  );
}
