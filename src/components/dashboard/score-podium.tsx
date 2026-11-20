import { LeaderboardMember } from "@/src/types/leaderboard";
import { cn } from "@/lib/utils";

interface Props {
  members: LeaderboardMember[];
}

const PODIUM = [
  { index: 1, height: "h-28", tone: "bg-accent/40" },
  { index: 0, height: "h-40", tone: "bg-accent" },
  { index: 2, height: "h-20", tone: "bg-accent/20" },
];

const displayName = (member: LeaderboardMember) => member.name || "<Kein Name>";

export function ScorePodium({ members }: Props) {
  const rest = members.slice(3);
  const maxScore = Math.max(members[0]?.local_score ?? 0, 1);

  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-3 gap-2 items-end max-w-xl mx-auto w-full">
        {PODIUM.map(({ index, height, tone }) => {
          const member = members[index];
          if (!member) return <div key={index} />;
          return (
            <div
              key={index}
              className="flex flex-col items-stretch gap-2 min-w-0"
            >
              <div className="text-center min-w-0">
                <p className="truncate font-medium">{displayName(member)}</p>
                <p className="text-sm text-muted-foreground font-plex-mono">
                  {member.local_score} Punkte · {member.stars} ★
                </p>
              </div>
              <div
                className={cn(
                  "flex items-center justify-center border",
                  height,
                  tone,
                )}
              >
                <span
                  className={cn(
                    "font-plex-mono font-semibold text-5xl",
                    index === 0 ? "text-black" : "text-foreground",
                  )}
                >
                  {index + 1}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {rest.length > 0 && (
        <ol className="flex flex-col gap-1">
          {rest.map((member, i) => (
            <li
              key={member.id}
              className="relative flex items-center gap-3 px-3 py-2 border overflow-hidden"
            >
              <div
                className="absolute inset-y-0 left-0 bg-accent/15"
                style={{ width: `${(member.local_score / maxScore) * 100}%` }}
              />
              <span className="relative w-8 font-plex-mono text-muted-foreground">
                {i + 4}.
              </span>
              <span className="relative flex-1 truncate">
                {displayName(member)}
              </span>
              <span className="relative font-plex-mono">
                {member.local_score}
              </span>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
