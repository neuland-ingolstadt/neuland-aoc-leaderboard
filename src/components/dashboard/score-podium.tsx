import { LeaderboardMember } from "@/src/types/leaderboard";
import { cn } from "@/lib/utils";

interface Props {
  members: LeaderboardMember[];
}

const STEPS: Record<number, { height: string; tone: string }> = {
  1: { height: "h-40", tone: "bg-accent" },
  2: { height: "h-28", tone: "bg-accent/40" },
  3: { height: "h-20", tone: "bg-accent/20" },
};

const MAX_NAMES_PER_STEP = 3;

const displayName = (member: LeaderboardMember) => member.name || "<Kein Name>";

export function ScorePodium({ members }: Props) {
  const sorted = members.slice().sort((a, b) => b.local_score - a.local_score);
  const maxScore = sorted[0]?.local_score ?? 0;

  if (maxScore === 0) {
    return (
      <div className="border px-4 py-8 text-center text-sm text-muted-foreground">
        Noch keine Punkte vergeben.
        <br />
        Sobald die ersten Sterne gelöst sind, erscheint hier die Rangliste.
      </div>
    );
  }

  // Equal scores share a rank (1, 1, 3, ...)
  const ranked = sorted.map((member) => ({
    member,
    rank: sorted.findIndex((m) => m.local_score === member.local_score) + 1,
  }));

  const steps = [1, 2, 3]
    .map((rank) => ({
      rank,
      members: ranked.filter((r) => r.rank === rank).map((r) => r.member),
    }))
    .filter((step) => step.members.length > 0);
  // classic podium order: 2nd, 1st, 3rd
  const podium = [2, 1, 3]
    .map((rank) => steps.find((step) => step.rank === rank))
    .filter((step) => step !== undefined);

  const rest = ranked.filter((r) => r.rank > 3);

  return (
    <div className="flex flex-col gap-8">
      <div
        className={cn(
          "grid gap-2 items-end max-w-xl mx-auto w-full",
          podium.length === 1 && "max-w-xs",
          podium.length === 2 && "max-w-md",
        )}
        style={{
          gridTemplateColumns: `repeat(${podium.length}, minmax(0, 1fr))`,
        }}
      >
        {podium.map(({ rank, members: stepMembers }) => {
          const shown = stepMembers.slice(0, MAX_NAMES_PER_STEP);
          const hidden = stepMembers.length - shown.length;
          const { height, tone } = STEPS[rank];
          return (
            <div
              key={rank}
              className="flex flex-col items-stretch gap-2 min-w-0"
            >
              <div className="text-center min-w-0">
                {shown.map((member) => (
                  <p key={member.id} className="truncate font-medium">
                    {displayName(member)}
                  </p>
                ))}
                {hidden > 0 && (
                  <p className="text-sm text-muted-foreground">
                    + {hidden} weitere
                  </p>
                )}
                <p className="text-sm text-muted-foreground font-plex-mono">
                  {stepMembers[0].local_score} Punkte
                  {stepMembers.length === 1 && ` · ${stepMembers[0].stars} ★`}
                </p>
              </div>
              <div
                className={cn("flex items-center justify-center", height, tone)}
              >
                <span
                  className={cn(
                    "font-plex-mono font-semibold text-5xl",
                    rank === 1 ? "text-black" : "text-foreground",
                  )}
                >
                  {rank}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {rest.length > 0 && (
        <ol className="flex flex-col gap-1">
          {rest.map(({ member, rank }) => (
            <li
              key={member.id}
              className="relative flex items-center gap-3 px-3 py-2 overflow-hidden bg-muted/30"
            >
              <div
                className="absolute inset-y-0 left-0 bg-accent/15"
                style={{ width: `${(member.local_score / maxScore) * 100}%` }}
              />
              <span className="relative w-8 font-plex-mono text-muted-foreground">
                {rank}.
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
