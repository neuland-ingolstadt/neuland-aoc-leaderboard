import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Mountain, Rocket, RollerCoaster, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useI18n } from "@/src/i18n/i18n";
import type { MessageKey } from "@/src/i18n/messages";
import { Leaderboard } from "@/src/types/leaderboard";

interface Props {
  leaderboard: Leaderboard;
  days?: number;
}

interface Series {
  id: number;
  name: string; // empty if the member has no name
  ranks: number[]; // rank after each day, index 0 = day 1
  points: number[]; // cumulative points after each day
}

const MARGIN_TOP = 12;
const MARGIN_BOTTOM = 36;
const MARGIN_LEFT = 40;
const WIDE_BREAKPOINT = 560;
// A steep climb: a place gained on each of the last few days
const CLIMB_DAYS = 3;
// "Rock": largest allowed rank change on any single day
const ROCK_MAX_MOVE = 1;
const MIN_DAYS_FOR_STABILITY = 4;

// Re-creates the AoC local scoring (N - position points per star) day by day
// to get the cumulative score and the rank after each puzzle day.
function computeSeries(leaderboard: Leaderboard, days: number) {
  const members = Object.values(leaderboard.members);
  const n = members.length;
  const gained = new Map(members.map((m) => [m.id, Array(days).fill(0)]));
  let lastDay = 0;

  for (let day = 1; day <= days; day++) {
    for (const part of ["1", "2"]) {
      const solved = members
        .map((member) => ({
          member,
          ts: member.completion_day_level[day]?.[part]?.get_star_ts ?? null,
        }))
        .filter(
          (entry): entry is { member: typeof entry.member; ts: number } =>
            entry.ts !== null,
        )
        .sort((a, b) => a.ts - b.ts);
      solved.forEach(({ member }, position) => {
        gained.get(member.id)![day - 1] += n - position;
      });
      if (solved.length > 0) lastDay = day;
    }
  }

  const cumulative = new Map(
    members.map((m) => {
      let sum = 0;
      return [
        m.id,
        gained
          .get(m.id)!
          .slice(0, lastDay)
          .map((g) => (sum += g)),
      ];
    }),
  );

  const ranks = new Map(members.map((m) => [m.id, [] as number[]]));
  for (let d = 0; d < lastDay; d++) {
    members
      .slice()
      .sort(
        (a, b) =>
          cumulative.get(b.id)![d] - cumulative.get(a.id)![d] ||
          cumulative.get(b.id)![lastDay - 1] -
            cumulative.get(a.id)![lastDay - 1] ||
          a.id - b.id,
      )
      .forEach((m, i) => ranks.get(m.id)!.push(i + 1));
  }

  const series: Series[] = members
    .map((m) => ({
      id: m.id,
      name: m.name ?? "",
      ranks: ranks.get(m.id)!,
      points: cumulative.get(m.id)!,
    }))
    .sort((a, b) => a.ranks[lastDay - 1] - b.ranks[lastDay - 1]);

  return { lastDay, series };
}

// Places gained over the last CLIMB_DAYS days, or 0 unless the rank improved
// on every single one of those days
const climbGain = (s: Series) => {
  const recent = s.ranks.slice(-(CLIMB_DAYS + 1));
  if (recent.length < CLIMB_DAYS + 1) return 0;
  const climbing = recent.every((rank, i) => i === 0 || rank < recent[i - 1]);
  return climbing ? recent[0] - recent[recent.length - 1] : 0;
};

// Day-to-day rank changes (absolute)
const rankSteps = (s: Series) =>
  s.ranks.slice(1).map((rank, i) => Math.abs(rank - s.ranks[i]));

// Sum of squared daily rank changes: lots of movement counts, but big jumps
// count much more than many small ones
const volatility = (s: Series) =>
  rankSteps(s).reduce((sum, step) => sum + step * step, 0);

type BadgeKey = "rocket" | "rock" | "rollercoaster";

interface Badge {
  key: BadgeKey;
  // rocket: places gained, rock: allowed move, rollercoaster: biggest jump
  value: number;
}

const BADGE_META: Record<BadgeKey, { icon: LucideIcon; color: string }> = {
  rocket: { icon: Rocket, color: "text-orange-500" },
  rock: { icon: Mountain, color: "text-sky-500" },
  rollercoaster: { icon: RollerCoaster, color: "text-fuchsia-500" },
};

type Translate = (key: MessageKey, params?: Record<string, number>) => string;

const badgeName = (t: Translate, key: BadgeKey) =>
  t(`badge.${key}.name` as MessageKey);

const badgeDescription = (t: Translate, key: BadgeKey) =>
  t(`badge.${key}.description` as MessageKey, {
    n: key === "rocket" ? CLIMB_DAYS : ROCK_MAX_MOVE,
  });

const badgeTooltip = (t: Translate, { key, value }: Badge) =>
  t(`badge.${key}.tooltip` as MessageKey, {
    n: key === "rocket" ? CLIMB_DAYS : key === "rock" ? ROCK_MAX_MOVE : value,
    gain: value,
  });

// Badges per member id, derived from the rank progression only
function computeBadges(series: Series[], lastDay: number) {
  const badges = new Map<number, Badge[]>(series.map((s) => [s.id, []]));

  for (const s of series) {
    const gain = climbGain(s);
    if (gain > 0) {
      badges.get(s.id)!.push({ key: "rocket", value: gain });
    }
  }

  // Rock and rollercoaster need a few days of history to mean anything
  if (lastDay >= MIN_DAYS_FOR_STABILITY) {
    let wildest: Series | undefined;
    for (const s of series) {
      const steps = rankSteps(s);
      if (Math.max(...steps) <= ROCK_MAX_MOVE) {
        badges.get(s.id)!.push({ key: "rock", value: ROCK_MAX_MOVE });
      } else if (!wildest || volatility(s) > volatility(wildest)) {
        wildest = s;
      }
    }
    if (wildest) {
      badges.get(wildest.id)!.push({
        key: "rollercoaster",
        value: Math.max(...rankSteps(wildest)),
      });
    }
  }

  return badges;
}

function BadgeIcons({ badges }: { badges: Badge[] }) {
  const { t } = useI18n();
  return badges.map((badge) => {
    const { key } = badge;
    const { icon: Icon, color } = BADGE_META[key];
    return (
      <span
        key={key}
        className="group relative ml-1 inline-block align-[-0.125em]"
      >
        <Icon className={cn("size-[1em]", color)} aria-hidden />
        <span
          role="tooltip"
          className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1.5 -translate-x-1/2 whitespace-nowrap border bg-popover px-2 py-1 text-xs font-normal text-popover-foreground opacity-0 shadow-md transition-opacity group-hover:opacity-100"
        >
          {badgeTooltip(t, badge)}
        </span>
      </span>
    );
  });
}

function ChartLabel({
  x,
  y,
  name,
  isActive,
  badges,
  onSelect,
}: {
  x: number;
  y: number;
  name: string;
  isActive: boolean;
  badges: Badge[];
  onSelect: () => void;
}) {
  const { t } = useI18n();
  const textRef = useRef<SVGTextElement>(null);
  const [textWidth, setTextWidth] = useState(0);
  const label = name.length > 16 ? name.slice(0, 16) + "…" : name;

  useLayoutEffect(() => {
    setTextWidth(textRef.current?.getComputedTextLength() ?? 0);
  }, [label, isActive]);

  return (
    <g className="cursor-pointer" onClick={onSelect} onMouseEnter={onSelect}>
      <text
        ref={textRef}
        x={x}
        y={y}
        dy={4}
        fontSize={12}
        fontWeight={isActive ? 600 : 400}
        fill={isActive ? "var(--foreground)" : "currentColor"}
      >
        {label}
      </text>
      {badges.map((badge, i) => {
        const { key } = badge;
        const { icon: Icon, color } = BADGE_META[key];
        return (
          <Icon
            key={key}
            x={x + textWidth + 4 + i * 15}
            y={y - 6}
            width={12}
            height={12}
            className={color}
          >
            <title>{badgeTooltip(t, badge)}</title>
          </Icon>
        );
      })}
    </g>
  );
}

export function RankProgression({ leaderboard, days = 12 }: Props) {
  const { t } = useI18n();
  const { lastDay, series } = useMemo(
    () => computeSeries(leaderboard, days),
    [leaderboard, days],
  );
  const badges = useMemo(
    () => computeBadges(series, lastDay),
    [series, lastDay],
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => setWidth(el.clientWidth));
    observer.observe(el);
    setWidth(el.clientWidth);
    return () => observer.disconnect();
  }, []);

  if (lastDay === 0 || series.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">{t("progression.empty")}</p>
    );
  }

  const activeId = selected ?? series[0].id;
  const active = series.find((s) => s.id === activeId) ?? series[0];

  const wide = width >= WIDE_BREAKPOINT;
  const marginRight = wide ? 140 : 14;
  const maxRank = Math.max(...series.flatMap((s) => s.ranks));
  // keep the chart compact when members fall far down the ranking
  const rowHeight = Math.min(
    wide ? 28 : 22,
    Math.max(wide ? 14 : 10, (wide ? 380 : 280) / Math.max(maxRank - 1, 1)),
  );
  const plotWidth = Math.max(width - MARGIN_LEFT - marginRight, 0);
  const height = MARGIN_TOP + MARGIN_BOTTOM + (maxRank - 1) * rowHeight;

  const x = (day: number) =>
    MARGIN_LEFT +
    (lastDay === 1 ? plotWidth / 2 : ((day - 1) / (lastDay - 1)) * plotWidth);
  const y = (rank: number) => MARGIN_TOP + (rank - 1) * rowHeight;

  const pathFor = (s: Series) =>
    s.ranks
      .map((rank, i) => {
        const px = x(i + 1);
        if (i === 0) return `M ${px} ${y(rank)}`;
        const prevX = x(i);
        const mid = (prevX + px) / 2;
        return `C ${mid} ${y(s.ranks[i - 1])}, ${mid} ${y(rank)}, ${px} ${y(rank)}`;
      })
      .join(" ");

  const rankTicks = Array.from({ length: maxRank }, (_, i) => i + 1).filter(
    (r) => maxRank <= 12 || r === 1 || r % 5 === 0,
  );
  const dayTicks = Array.from({ length: lastDay }, (_, i) => i + 1);
  const ordered = [...series.filter((s) => s.id !== active.id), active];
  const finalRank = active.ranks[lastDay - 1];
  const nameOf = (s: Series) => s.name || t("common.noName");

  return (
    <div className="flex flex-col gap-4">
      <div ref={containerRef} className="w-full text-muted-foreground">
        {width > 0 && (
          <svg
            width={width}
            height={height}
            role="img"
            aria-label={t("progression.aria")}
            className="block"
          >
            {rankTicks.map((rank) => (
              <g key={rank}>
                <line
                  x1={MARGIN_LEFT}
                  x2={MARGIN_LEFT + plotWidth}
                  y1={y(rank)}
                  y2={y(rank)}
                  stroke="currentColor"
                  strokeOpacity={0.15}
                />
                <text
                  x={MARGIN_LEFT - 10}
                  y={y(rank)}
                  dy={4}
                  textAnchor="end"
                  fontSize={11}
                  fill="currentColor"
                >
                  {rank}
                </text>
              </g>
            ))}
            {dayTicks.map((day) => (
              <text
                key={day}
                x={x(day)}
                y={height - MARGIN_BOTTOM + 16}
                textAnchor="middle"
                fontSize={11}
                fill="currentColor"
              >
                {day}
              </text>
            ))}
            <text
              x={MARGIN_LEFT + plotWidth / 2}
              y={height - 4}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
            >
              {t("progression.axisDay")}
            </text>
            <text
              transform={`translate(10 ${MARGIN_TOP + ((maxRank - 1) * rowHeight) / 2}) rotate(-90)`}
              textAnchor="middle"
              fontSize={11}
              fill="currentColor"
            >
              {t("progression.axisRank")}
            </text>

            {ordered.map((s) => {
              const isActive = s.id === active.id;
              return (
                <g key={s.id}>
                  <path
                    d={pathFor(s)}
                    fill="none"
                    stroke={isActive ? "var(--accent)" : "currentColor"}
                    strokeOpacity={isActive ? 1 : 0.35}
                    strokeWidth={isActive ? 3 : 1.5}
                  />
                  <path
                    d={pathFor(s)}
                    fill="none"
                    stroke="transparent"
                    strokeWidth={16}
                    className="cursor-pointer"
                    onClick={() => setSelected(s.id)}
                    onMouseEnter={() => setSelected(s.id)}
                  />
                  {isActive &&
                    s.ranks.map((rank, i) => (
                      <circle
                        key={i}
                        cx={x(i + 1)}
                        cy={y(rank)}
                        r={3.5}
                        fill="var(--accent)"
                      />
                    ))}
                  {wide && (
                    <ChartLabel
                      x={x(lastDay) + 12}
                      y={y(s.ranks[lastDay - 1])}
                      name={nameOf(s)}
                      isActive={isActive}
                      badges={badges.get(s.id) ?? []}
                      onSelect={() => setSelected(s.id)}
                    />
                  )}
                </g>
              );
            })}
          </svg>
        )}
      </div>

      <p className="text-sm">
        <span className="accent-marker font-semibold">{nameOf(active)}</span>
        <BadgeIcons badges={badges.get(active.id) ?? []} />
        <span className="text-muted-foreground">
          {" · "}
          {t("progression.summary", {
            rank: finalRank,
            points: active.points[lastDay - 1],
            best: Math.min(...active.ranks),
          })}
        </span>
      </p>

      <div className={cn("flex flex-wrap gap-1.5", wide && "hidden")}>
        {series.map((s) => (
          <button
            key={s.id}
            type="button"
            aria-pressed={s.id === active.id}
            onClick={() => setSelected(s.id)}
            className={cn(
              "border px-2 py-1 text-xs transition-colors",
              s.id === active.id
                ? "bg-muted-foreground/20 border-muted-foreground/40 text-foreground"
                : "hover:bg-muted",
            )}
          >
            {s.ranks[lastDay - 1]}. {nameOf(s)}
            <BadgeIcons badges={badges.get(s.id) ?? []} />
          </button>
        ))}
      </div>

      <ul className="flex flex-col gap-1.5 border-t pt-3 text-xs text-muted-foreground sm:flex-row sm:flex-wrap sm:gap-x-5">
        {(Object.keys(BADGE_META) as BadgeKey[]).map((key) => {
          const { icon: Icon, color } = BADGE_META[key];
          return (
            <li key={key} className="flex items-center gap-1.5">
              <Icon className={cn("size-3.5 shrink-0", color)} aria-hidden />
              <span>
                <span className="font-medium text-foreground">
                  {badgeName(t, key)}
                </span>
                : {badgeDescription(t, key)}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
