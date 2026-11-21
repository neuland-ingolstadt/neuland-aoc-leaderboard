# Neuland AoC Leaderboard

Das Leaderboard für den [Advent of Code](https://adventofcode.com)-Wettbewerb von [Neuland Ingolstadt e.V.](https://neuland-ingolstadt.de).

Die Seite zeigt vor dem Start einen Countdown samt Einladungscode und der Liste der Angemeldeten. Während des Wettbewerbs zeigt sie Rangliste, Rangverlauf und Aktivität. Nach dem Ende zeigt sie die Gewinner:innen. Die Seite gibt es auf Deutsch und Englisch, mit hellem und dunklem Theme.

## Tech-Stack

- [TanStack Start](https://tanstack.com/start) (React 19, TanStack Router) mit Vite und Nitro
- Tailwind CSS 4, Radix UI, Recharts
- [Bun](https://bun.sh) als Paketmanager (Version in `.bun-version`)

## Lokal starten

```bash
bun install
bun run dev
```

Ohne Konfiguration (oder wenn der Abruf der AoC-API fehlschlägt) werden die Mock-Daten aus `src/mocks/` verwendet.

## Konfiguration

Die Konfiguration erfolgt über Umgebungsvariablen:

| Variable              | Beschreibung                                                                                          |
| --------------------- | ----------------------------------------------------------------------------------------------------- |
| `AOC_LEADERBOARD_URL` | JSON-URL des privaten AoC-Leaderboards, z. B. `https://adventofcode.com/2026/leaderboard/private/view/<id>.json` |
| `AOC_SESSION_TOKEN`   | Optional: Session-Cookie von adventofcode.com. Nicht nötig, wenn die URL einen `view_key` enthält.    |
| `AOC_INVITE_CODE`     | Einladungscode des Leaderboards, wird auf der Seite zum Kopieren angezeigt.                           |

Die Leaderboard-Daten werden serverseitig geholt und 20 Minuten zwischengespeichert. Schlägt ein Update fehl, werden die zuletzt erfolgreich geladenen Daten ausgeliefert.

## Zeitplan und Ansichten

Start und Ende des Wettbewerbs stehen in `src/lib/unlock.ts` (Start: 1. Dezember 2026, 05:00 UTC, Ende: 13. Dezember 2026, 05:00 UTC). Vor dem Start werden keine Punktestände an den Client ausgeliefert.

Die Startseite folgt der Uhrzeit. Mit `/?screen=landing|dashboard|end` kann die Ansicht gewechselt werden. `landing` funktioniert überall, `dashboard` und `end` nur im Entwicklungsmodus.

## Skripte

| Befehl          | Beschreibung                       |
| --------------- | ---------------------------------- |
| `bun run dev`   | Entwicklungsserver                 |
| `bun run build` | Produktions-Build nach `.output/`  |
| `bun run start` | Produktions-Build starten          |
| `bun run lint`  | ESLint                             |

## Projektstruktur

```
components/   Layout- und UI-Basiskomponenten (shadcn/ui)
src/
  components/ Dashboard- und Seitenkomponenten
  content/    Texte, z. B. die Teilnahmebedingungen
  i18n/       Übersetzungen (de/en)
  lib/        Hilfsfunktionen (Zeitplan, Datenaufbereitung)
  mocks/      Beispieldaten
  routes/     Seiten (TanStack Router)
  server/     Serverfunktionen und AoC-API-Anbindung
```
