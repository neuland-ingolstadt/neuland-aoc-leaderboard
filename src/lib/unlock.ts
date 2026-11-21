// AoC puzzles unlock at 00:00 EST (05:00 UTC)
export const UNLOCK_AT = Date.UTC(2026, 11, 1, 5, 0, 0);

// The last puzzle day is 12 December. AoC days run from midnight EST (05:00 UTC) to the next
// midnight EST, so the competition ends when "day 13" would unlock: 13 December, 05:00 UTC.
export const END_AT = Date.UTC(2026, 11, 13, 5, 0, 0);
