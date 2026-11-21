import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/teilnahmebedingungen")({
  head: () => ({
    meta: [{ title: "Teilnahmebedingungen: Neuland Leaderboard" }],
  }),
  component: Teilnahmebedingungen,
});

const sections = [
  {
    title: "1. Veranstalter",
    text: "Das Neuland Leaderboard zum Advent of Code wird von Neuland Ingolstadt e.V. angeboten. Der Advent of Code selbst ist ein eigenständiger Wettbewerb von Eric Wastl. Neuland Ingolstadt e.V. steht in keiner Verbindung zum Advent of Code.",
  },
  {
    title: "2. Teilnahme",
    text: "Teilnehmen kann, wer über den Einladungscode dem privaten Neuland Leaderboard auf adventofcode.com beitritt. Die Teilnahme ist kostenlos. Mit dem Beitritt erklärst du dich mit diesen Teilnahmebedingungen einverstanden.",
  },
  {
    title: "3. Ermittlung der Gewinnerin oder des Gewinners",
    text: "Gewonnen hat, wer nach dem letzten Rätseltag (12. Dezember 2026) auf Platz 1 des Neuland Leaderboards steht. Maßgeblich ist der Punktestand auf adventofcode.com. Bei Punktgleichstand entscheidet der Verein nach eigenem Ermessen, zum Beispiel per Losverfahren.",
  },
  {
    title: "4. Gewinn",
    text: "Die Gewinnerin oder der Gewinner darf sich ein T-Shirt aus dem Merch Shop von Neuland Ingolstadt e.V. aussuchen. Eine Barauszahlung oder ein Umtausch in andere Leistungen ist nicht möglich. Der Anspruch ist nicht übertragbar.",
  },
  {
    title: "5. Fairness und Ausschluss",
    text: "Alle Teilnehmenden lösen die Rätsel selbstständig und halten sich an die Regeln des Advent of Code. Wer manipuliert, täuscht oder gegen die Regeln des Advent of Code verstößt, kann vom Leaderboard und von der Preisvergabe ausgeschlossen werden.",
  },
  {
    title: "6. Datenschutz",
    text: "Auf dem Leaderboard werden der auf adventofcode.com hinterlegte Anzeigename, die Punktzahl und die Zeitpunkte der gelösten Rätsel angezeigt. Diese Daten stammen vom Advent of Code. Weitere personenbezogene Daten erheben wir nicht.",
  },
  {
    title: "7. Haftung",
    text: "Neuland Ingolstadt e.V. haftet nicht für die Verfügbarkeit des Leaderboards oder des Advent of Code und nicht für Fehler in der Punkteberechnung. Dies gilt nicht bei Vorsatz oder grober Fahrlässigkeit.",
  },
  {
    title: "8. Änderungen",
    text: "Neuland Ingolstadt e.V. kann diese Teilnahmebedingungen ändern oder die Aktion vorzeitig beenden, wenn ein wichtiger Grund vorliegt. Die jeweils aktuelle Fassung steht auf dieser Seite.",
  },
];

function Teilnahmebedingungen() {
  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 md:py-20">
      <Link
        to="/"
        className="mb-6 inline-flex md:mb-8 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" />
        Zurück zum Leaderboard
      </Link>

      <h1 className="font-plex-mono text-2xl font-semibold break-words sm:text-3xl md:text-4xl">
        Teilnahmebedingungen
      </h1>

      <p className="mt-5 border bg-card px-3 py-3 text-sm md:mt-6 md:px-4 text-muted-foreground">
        Dies ist ein Beispieltext und noch keine rechtsverbindliche Fassung.
      </p>

      <div className="mt-8 flex flex-col gap-6 md:mt-10 md:gap-8">
        {sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-2">
            <h2 className="text-base font-semibold md:text-lg">
              {section.title}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
              {section.text}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-10 text-sm text-muted-foreground md:mt-12">
        Stand: Dezember 2026
      </p>
    </main>
  );
}
