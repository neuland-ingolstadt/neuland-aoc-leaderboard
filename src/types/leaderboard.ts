export interface Leaderboard {
    event: string;
    owner_id: number;
    members: MemberList;
}

export interface MemberList {
    [id: string]: LeaderboardMember;
}

export interface LeaderboardMember {
    id: number;
    name: string | null;
    stars: number;
    local_score: number;
    last_star_ts: number;
    completion_day_level: CompletionDayLevel;
}

export interface CompletionDayLevel {
    [day: string]: DayLevel;
}

export interface DayLevel {
    [part: string]: Star;
}

export interface Star {
    get_star_ts: number;
}
