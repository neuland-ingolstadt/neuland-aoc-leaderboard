export const LANGUAGES = ["de", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = "de";
export const LANG_COOKIE = "lang";

// Rich text: <tag>content</tag> is rendered through the component passed for
// "tag" (see `t.rich`), {name} is replaced by a value.
const de = {
  "meta.title": "Neuland Leaderboard: Advent Of Code",
  "meta.termsTitle": "Teilnahmebedingungen: Neuland Leaderboard",

  "common.noName": "<Kein Name>",
  "common.day": "Tag",
  "common.points": "Punkte",
  "common.stars": "Sterne",
  "common.copy": "kopieren",
  "common.close": "Schließen",
  "common.language": "Sprache",

  "countdown.days": "Tage",
  "countdown.hours": "Stunden",
  "countdown.minutes": "Minuten",
  "countdown.seconds": "Sekunden",
  "countdown.short.days": "Tg",
  "countdown.short.hours": "Std",
  "countdown.short.minutes": "Min",
  "countdown.short.seconds": "Sek",
  "countdown.unlock": "Das Leaderboard wird am 1. Dezember freigeschaltet.",

  "header.title": "Neuland Leaderboard",
  "header.endsIn": "Die Challenge endet in",

  "about.title": "Über den Advent Of Code",
  "about.text":
    "Der Advent of Code (AoC) ist ein jährliches globales Event in Form eines Adventskalenders für Programmierer. Statt Schokolade gibt es 12 Programmierrätsel, die man in einer beliebigen Sprache lösen kann. Es geht um den Spaß an der Problemlösung - jeder ist herzlich dazu eingeladen, sich an den Rätseln zu versuchen. Mehr darüber erfährst du auf der <link>offiziellen Website des Advent of Code</link>.",

  "join.title": "Mitmachen und Merch abstauben",
  "join.text":
    "Neuland stellt euch ein vereinsinternes Leaderboard zur Verfügung, auf dem ihr euch mit anderen Mitgliedern messen könnt. <strong>Wer am Ende auf Platz 1 landet, darf sich als Gewinn ein T-Shirt aus unserem Merch Shop selbst aussuchen.</strong>",
  "join.terms": "Beachte die <link>Teilnahmebedingungen</link>.",
  "join.button": "Mitmachen",
  "join.dialogTitle": "Dem Leaderboard beitreten",
  "join.step1Title": "1. Anmelden bei Advent Of Code",
  "join.step1Text":
    "Melde dich auf der <link>offiziellen Website des AoC</link> an.",
  "join.step2Title": "2. Einladungscode eingeben",
  "join.step2Text":
    "Navigiere auf der AoC-Website zur <link>Leaderboard-Page</link> und trage den untenstehenden Einladungscode ein. <strong>Fertig!</strong> Es dauert ein paar Minuten, bis dein Eintrag übernommen wird. Dann bist du mit dabei und wirst auf dem Neuland Leaderboard angezeigt.",
  "join.codeUnavailable": "CODE NICHT VERFÜGBAR",

  "nav.label": "Statistiken",
  "nav.info": "Infos",
  "nav.ranking": "Rangliste",
  "nav.progression": "Rangverlauf",
  "nav.activity": "Aktivität",

  "settings.open": "Einstellungen",
  "settings.theme": "Design",
  "settings.light": "Hell",
  "settings.dark": "Dunkel",

  "end.winner": "Gewonnen hat",
  "end.tie": "Gleichstand an der Spitze",
  "end.stats": "{points} Punkte · {stars} Sterne",
  "end.congrats":
    "Herzlichen Glückwunsch! Als Gewinn darf sich die Gewinnerin oder der Gewinner ein T-Shirt aus unserem Merch Shop aussuchen. Bitte checke deine Nachrichten, wenn das Orga-Team dich kontaktiert.",
  "end.tieText":
    "Bei Punktgleichstand entscheidet der Verein, wer gewinnt. Mehr dazu in den <link>Teilnahmebedingungen</link>.",
  "end.noWinner":
    "Es wurden keine Punkte vergeben, daher gibt es keinen Gewinner.",
  "end.results": "Finale Ergebnisse",
  "end.show": "anzeigen",
  "end.hide": "ausblenden",

  "updated.one": "Vor {n} Minute aktualisiert",
  "updated.other": "Vor {n} Minuten aktualisiert",
  "dashboard.loaded": "Daten zuletzt vom AoC Server geladen:",

  "ranking.title": "Rangliste",
  "ranking.description": "Der Punktestand legt die Platzierung fest",
  "ranking.empty":
    "Noch keine Punkte vergeben.\nSobald die ersten Sterne gelöst sind, erscheint hier die Rangliste.",
  "ranking.more": "{n} weitere anzeigen",
  "ranking.less": "Weniger anzeigen",
  "ranking.andMore": "+ {n} weitere",

  "progression.title": "Rangverlauf",
  "progression.description":
    "Platzierung aller Teilnehmenden nach jedem Rätseltag. Wähle einen Namen aus, um den Verlauf hervorzuheben",
  "progression.empty": "Noch nicht genügend Daten.",
  "progression.aria": "Verlauf der Platzierungen nach Tagen",
  "progression.axisDay": "Tag",
  "progression.axisRank": "Platz",
  "progression.summary":
    "Aktuell Platz {rank} · {points} Punkte · Rekord: Platz {best}",
  "badge.rocket.name": "Rakete",
  "badge.rocket.description": "Platz an jedem der letzten {n} Tage verbessert",
  "badge.rocket.tooltip": "Steiler Aufstieg: +{gain} Plätze in {n} Tagen",
  "badge.rock.name": "Fels",
  "badge.rock.description": "Platz ändert sich an keinem Tag um mehr als {n}",
  "badge.rock.tooltip":
    "Felsenfest: nie mehr als {n} Platz Schwankung an einem Tag",
  "badge.rollercoaster.name": "Achterbahn",
  "badge.rollercoaster.description":
    "Unruhigster Verlauf, vor allem durch große Sprünge",
  "badge.rollercoaster.tooltip":
    "Achterbahn: größter Sprung {n} Plätze an einem Tag",

  "heatmap.title": "Lösungen pro Tag und Uhrzeit",
  "heatmap.description":
    "Jedes Feld ist eine Stunde (deutsche Zeit): Je kräftiger das Grün, desto mehr Sterne wurden dann eingereicht",
  "heatmap.axisTime": "Uhrzeit (deutsche Zeit)",
  "heatmap.less": "weniger",
  "heatmap.more": "mehr",
  "heatmap.hours": "{from}–{to} Uhr",
  "heatmap.solutions.one": "{n} Lösung",
  "heatmap.solutions.other": "{n} Lösungen",

  "footer.disclaimer":
    "Neuland Ingolstadt e.V. steht in keiner Verbindung mit dem Advent of Code Wettbewerb und ist nicht für den Inhalt des Wettbewerbs verantwortlich sondern bietet nur das Leaderboard mit Preisverleihung an.",
  "footer.trademark":
    "Advent of Code ist eine eingetragene Marke in den Vereinigten Staaten. Die Designelemente, Sprache, Stile und das Konzept von Advent of Code sind das alleinige Eigentum von Advent of Code und dürfen nicht ohne ausdrückliche schriftliche Genehmigung von Advent of Code vervielfältigt oder von einer anderen Person oder Organisation verwendet werden.",
  "footer.terms": "Teilnahmebedingungen",

  "terms.back": "Zurück zum Leaderboard",
  "terms.title": "Teilnahmebedingungen",
  "terms.notice":
    "Dies ist ein Beispieltext und noch keine rechtsverbindliche Fassung.",
  "terms.updated": "Stand: Dezember 2026",
  "terms.s1.title": "1. Veranstalter",
  "terms.s1.text":
    "Das Neuland Leaderboard zum Advent of Code wird von Neuland Ingolstadt e.V. angeboten. Der Advent of Code selbst ist ein eigenständiger Wettbewerb von Eric Wastl. Neuland Ingolstadt e.V. steht in keiner Verbindung zum Advent of Code.",
  "terms.s2.title": "2. Teilnahme",
  "terms.s2.text":
    "Teilnehmen kann, wer über den Einladungscode dem privaten Neuland Leaderboard auf adventofcode.com beitritt. Die Teilnahme ist kostenlos. Mit dem Beitritt erklärst du dich mit diesen Teilnahmebedingungen einverstanden.",
  "terms.s3.title": "3. Ermittlung der Gewinnerin oder des Gewinners",
  "terms.s3.text":
    "Gewonnen hat, wer nach dem letzten Rätseltag (12. Dezember 2026) auf Platz 1 des Neuland Leaderboards steht. Maßgeblich ist der Punktestand auf adventofcode.com. Bei Punktgleichstand entscheidet der Verein nach eigenem Ermessen, zum Beispiel per Losverfahren.",
  "terms.s4.title": "4. Gewinn",
  "terms.s4.text":
    "Die Gewinnerin oder der Gewinner darf sich ein T-Shirt aus dem Merch Shop von Neuland Ingolstadt e.V. aussuchen. Eine Barauszahlung oder ein Umtausch in andere Leistungen ist nicht möglich. Der Anspruch ist nicht übertragbar.",
  "terms.s5.title": "5. Fairness und Ausschluss",
  "terms.s5.text":
    "Alle Teilnehmenden lösen die Rätsel selbstständig und halten sich an die Regeln des Advent of Code. Wer manipuliert, täuscht oder gegen die Regeln des Advent of Code verstößt, kann vom Leaderboard und von der Preisvergabe ausgeschlossen werden.",
  "terms.s6.title": "6. Datenschutz",
  "terms.s6.text":
    "Auf dem Leaderboard werden der auf adventofcode.com hinterlegte Anzeigename, die Punktzahl und die Zeitpunkte der gelösten Rätsel angezeigt. Diese Daten stammen vom Advent of Code. Weitere personenbezogene Daten erheben wir nicht.",
  "terms.s7.title": "7. Haftung",
  "terms.s7.text":
    "Neuland Ingolstadt e.V. haftet nicht für die Verfügbarkeit des Leaderboards oder des Advent of Code und nicht für Fehler in der Punkteberechnung. Dies gilt nicht bei Vorsatz oder grober Fahrlässigkeit.",
  "terms.s8.title": "8. Änderungen",
  "terms.s8.text":
    "Neuland Ingolstadt e.V. kann diese Teilnahmebedingungen ändern oder die Aktion vorzeitig beenden, wenn ein wichtiger Grund vorliegt. Die jeweils aktuelle Fassung steht auf dieser Seite.",
} as const;

export type MessageKey = keyof typeof de;

const en: Record<MessageKey, string> = {
  "meta.title": "Neuland Leaderboard: Advent Of Code",
  "meta.termsTitle": "Terms of Participation: Neuland Leaderboard",

  "common.noName": "<No name>",
  "common.day": "Day",
  "common.points": "points",
  "common.stars": "stars",
  "common.copy": "copy",
  "common.close": "Close",
  "common.language": "Language",

  "countdown.days": "Days",
  "countdown.hours": "Hours",
  "countdown.minutes": "Minutes",
  "countdown.seconds": "Seconds",
  "countdown.short.days": "d",
  "countdown.short.hours": "h",
  "countdown.short.minutes": "min",
  "countdown.short.seconds": "s",
  "countdown.unlock": "The leaderboard unlocks on December 1.",

  "header.title": "Neuland Leaderboard",
  "header.endsIn": "The challenge ends in",

  "about.title": "About Advent Of Code",
  "about.text":
    "Advent of Code (AoC) is an annual global event in the form of an advent calendar for programmers. Instead of chocolate, you get 12 programming puzzles that you can solve in any language you like. It is all about the joy of problem solving - everyone is warmly invited to give the puzzles a try. You can find out more on the <link>official Advent of Code website</link>.",

  "join.title": "Join in and grab some merch",
  "join.text":
    "Neuland provides you with a club-internal leaderboard where you can compete against other members. <strong>Whoever ends up in 1st place wins and gets to pick a T-shirt from our merch shop.</strong>",
  "join.terms": "Please note the <link>terms of participation</link>.",
  "join.button": "Join in",
  "join.dialogTitle": "Join the leaderboard",
  "join.step1Title": "1. Sign in to Advent Of Code",
  "join.step1Text": "Sign in on the <link>official AoC website</link>.",
  "join.step2Title": "2. Enter the invite code",
  "join.step2Text":
    "On the AoC website, go to the <link>leaderboard page</link> and enter the invite code below. <strong>Done!</strong> It takes a few minutes until your entry is picked up. After that you are in and will be shown on the Neuland Leaderboard.",
  "join.codeUnavailable": "CODE NOT AVAILABLE",

  "nav.label": "Statistics",
  "nav.info": "Info",
  "nav.ranking": "Ranking",
  "nav.progression": "Progression",
  "nav.activity": "Activity",

  "settings.open": "Settings",
  "settings.theme": "Theme",
  "settings.light": "Light",
  "settings.dark": "Dark",

  "end.winner": "The winner is",
  "end.tie": "A tie at the top",
  "end.stats": "{points} points · {stars} stars",
  "end.congrats":
    "Congratulations! The winner gets to pick a T-shirt from our merch shop as the prize. Please check your messages when the organizing team contacts you.",
  "end.tieText":
    "In the event of a tie, the club decides who wins. Find out more in the <link>terms of participation</link>.",
  "end.noWinner": "No points were awarded, so there is no winner.",
  "end.results": "Final results",
  "end.show": "show",
  "end.hide": "hide",

  "updated.one": "Updated {n} minute ago",
  "updated.other": "Updated {n} minutes ago",
  "dashboard.loaded": "Data last loaded from the AoC server:",

  "ranking.title": "Ranking",
  "ranking.description": "Points determine the ranking",
  "ranking.empty":
    "No points awarded yet.\nThe ranking will appear here as soon as the first stars are solved.",
  "ranking.more": "Show {n} more",
  "ranking.less": "Show less",
  "ranking.andMore": "+ {n} more",

  "progression.title": "Rank progression",
  "progression.description":
    "Rank of all participants after each puzzle day. Select a name to highlight their course",
  "progression.empty": "Not enough data yet.",
  "progression.aria": "Course of the rankings by day",
  "progression.axisDay": "Day",
  "progression.axisRank": "Rank",
  "progression.summary":
    "Currently rank {rank} · {points} points · Record: rank {best}",
  "badge.rocket.name": "Rocket",
  "badge.rocket.description": "Improved rank on each of the last {n} days",
  "badge.rocket.tooltip": "Steep climb: +{gain} places in {n} days",
  "badge.rock.name": "Rock",
  "badge.rock.description": "Rank never changes by more than {n} on any day",
  "badge.rock.tooltip":
    "Rock solid: never more than {n} place of change on a day",
  "badge.rollercoaster.name": "Rollercoaster",
  "badge.rollercoaster.description": "Wildest course, mainly due to big jumps",
  "badge.rollercoaster.tooltip":
    "Rollercoaster: biggest jump {n} places in a single day",

  "heatmap.title": "Solutions by day and time",
  "heatmap.description":
    "Each cell is one hour (German time): the stronger the green, the more stars were submitted then",
  "heatmap.axisTime": "Time of day (German time)",
  "heatmap.less": "less",
  "heatmap.more": "more",
  "heatmap.hours": "{from}:00–{to}:00",
  "heatmap.solutions.one": "{n} solution",
  "heatmap.solutions.other": "{n} solutions",

  "footer.disclaimer":
    "Neuland Ingolstadt e.V. is not affiliated with the Advent of Code competition and is not responsible for its content, but only provides the leaderboard with a prize.",
  "footer.trademark":
    "Advent of Code is a registered trademark in the United States. The design elements, language, styles and concept of Advent of Code are the sole property of Advent of Code and may not be reproduced or used by any other person or organization without the express written permission of Advent of Code.",
  "footer.terms": "Terms of participation",

  "terms.back": "Back to the leaderboard",
  "terms.title": "Terms of Participation",
  "terms.notice":
    "This is placeholder text and not yet a legally binding version.",
  "terms.updated": "Last updated: December 2026",
  "terms.s1.title": "1. Organizer",
  "terms.s1.text":
    "The Neuland Leaderboard for Advent of Code is offered by Neuland Ingolstadt e.V. Advent of Code itself is an independent competition by Eric Wastl. Neuland Ingolstadt e.V. is not affiliated with Advent of Code.",
  "terms.s2.title": "2. Participation",
  "terms.s2.text":
    "Anyone who joins the private Neuland Leaderboard on adventofcode.com using the invite code can take part. Participation is free of charge. By joining, you agree to these terms of participation.",
  "terms.s3.title": "3. Determining the winner",
  "terms.s3.text":
    "The winner is whoever is in 1st place on the Neuland Leaderboard after the last puzzle day (December 12, 2026). The score on adventofcode.com is decisive. In the event of a tie, the club decides at its own discretion, for example by drawing lots.",
  "terms.s4.title": "4. Prize",
  "terms.s4.text":
    "The winner may choose a T-shirt from the merch shop of Neuland Ingolstadt e.V. A cash payout or an exchange for other benefits is not possible. The entitlement is not transferable.",
  "terms.s5.title": "5. Fairness and exclusion",
  "terms.s5.text":
    "All participants solve the puzzles on their own and follow the rules of Advent of Code. Anyone who manipulates, cheats or violates the rules of Advent of Code may be excluded from the leaderboard and from the prize.",
  "terms.s6.title": "6. Data protection",
  "terms.s6.text":
    "The leaderboard shows the display name stored on adventofcode.com, the score and the times at which puzzles were solved. This data comes from Advent of Code. We do not collect any further personal data.",
  "terms.s7.title": "7. Liability",
  "terms.s7.text":
    "Neuland Ingolstadt e.V. is not liable for the availability of the leaderboard or of Advent of Code, nor for errors in the score calculation. This does not apply in cases of intent or gross negligence.",
  "terms.s8.title": "8. Changes",
  "terms.s8.text":
    "Neuland Ingolstadt e.V. may change these terms of participation or end the promotion early if there is an important reason. The current version is always available on this page.",
};

export const messages: Record<Lang, Record<MessageKey, string>> = { de, en };

export const LOCALES: Record<Lang, string> = { de: "de-DE", en: "en-GB" };

export function parseLang(value: string | null | undefined): Lang | null {
  return LANGUAGES.find((lang) => lang === value) ?? null;
}

// First matching language of an Accept-Language header, German by default
export function langFromAcceptLanguage(
  header: string | null | undefined,
): Lang {
  for (const part of (header ?? "").split(",")) {
    const code = part.trim().slice(0, 2).toLowerCase();
    const lang = parseLang(code);
    if (lang) return lang;
  }
  return DEFAULT_LANG;
}
