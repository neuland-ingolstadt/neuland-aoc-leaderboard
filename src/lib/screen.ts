// Manual screen switch for the start page: /?screen=landing | dashboard | end
// Without it the screen follows the clock (landing page, dashboard, winner view).
// "landing" works everywhere; "dashboard" and "end" show data early, so only development
// builds honor them.
export const SCREENS = ["landing", "dashboard", "end"] as const;
export type Screen = (typeof SCREENS)[number];

export function parseScreen(value: unknown): Screen | undefined {
  return SCREENS.find((screen) => screen === value);
}
