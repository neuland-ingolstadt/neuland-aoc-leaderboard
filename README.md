# Neuland AoC Leaderboard

The leaderboard for the [Advent of Code](https://adventofcode.com) competition run by [Neuland Ingolstadt e.V.](https://neuland-ingolstadt.de).

Before the start, the site shows a countdown with the invite code and the list of people who have signed up. During the competition it shows the ranking, rank progression and activity. After the end it shows the winners. The site is available in German and English, with light and dark themes.

## Tech stack

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router) with Vite and Nitro
- Tailwind CSS 4, Radix UI, Recharts
- [Bun](https://bun.sh) as package manager (version in `.bun-version`)

## Getting started

```bash
bun install
bun run dev
```

Without configuration (or if fetching from the AoC API fails), the mock data from `src/mocks/` is used.

## Configuration

Configuration is done via environment variables:

| Variable              | Description                                                                                                      |
| --------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `AOC_LEADERBOARD_URL` | JSON URL of the private AoC leaderboard, e.g. `https://adventofcode.com/2026/leaderboard/private/view/<id>.json` |
| `AOC_SESSION_TOKEN`   | Optional: session cookie from adventofcode.com. Not needed if the URL contains a `view_key`.                     |
| `AOC_INVITE_CODE`     | Invite code of the leaderboard, shown on the site so it can be copied.                                           |

Leaderboard data is fetched on the server and cached for 20 minutes. If a refresh fails, the last successfully fetched data is served.

## Schedule and views

The start and end of the competition are defined in `src/lib/unlock.ts` (start: 1 December 2026, 05:00 UTC; end: 13 December 2026, 05:00 UTC). No scores are sent to the client before the start.

The start page follows the clock. You can switch the view with `/?screen=landing|dashboard|end`. `landing` works everywhere, `dashboard` and `end` only in development mode.

## Scripts

| Command         | Description                      |
| --------------- | -------------------------------- |
| `bun run dev`   | Development server               |
| `bun run build` | Production build to `.output/`   |
| `bun run start` | Start the production build       |
| `bun run lint`  | ESLint                           |

## Project structure

```
components/   Layout and base UI components (shadcn/ui)
src/
  components/ Dashboard and page components
  content/    Texts, e.g. the terms of participation
  i18n/       Translations (de/en)
  lib/        Helpers (schedule, data processing)
  mocks/      Sample data
  routes/     Pages (TanStack Router)
  server/     Server functions and AoC API integration
```
