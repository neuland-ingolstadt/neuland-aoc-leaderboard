import { Link, useSearch } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";

export default function Footer() {
    const { dev } = useSearch({ strict: false }) as { dev?: boolean };
    return (
        <div className="w-full border-t border-border mt-8">
            <div className="container max-w-200 mx-auto px-4 py-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
                <img
                    src="/img/neuland_icon.svg"
                    alt="Neuland Icon"
                    width={100}
                    height={100}
                    className="h-8 w-auto brightness-0 dark:invert"
                />
                <div className="flex flex-col gap-2">
                    <p className="text-center md:text-left">
                        Neuland e.V. steht in keiner Verbindung mit dem Advent of Code Wettbewerb und ist nicht für den Inhalt des Wettbewerbs verantwortlich sondern bietet
                        nur das Leaderboard mit Preisverleihung an.
                    </p>
                    <p className="text-center md:text-left text-xs opacity-50">
                        Advent of Code ist eine eingetragene Marke in den Vereinigten Staaten. Die Designelemente, Sprache, Stile und das Konzept von Advent of Code sind das alleinige Eigentum von Advent of Code und dürfen nicht ohne ausdrückliche schriftliche Genehmigung von Advent of Code vervielfältigt oder von einer anderen Person oder Organisation verwendet werden.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    {import.meta.env.DEV && (
                        <Button asChild variant="outline" size="sm">
                            <Link to="/" search={{ dev: dev ? undefined : true }}>
                                Dev: {dev ? "Landing Page" : "Dashboard"}
                            </Link>
                        </Button>
                    )}
                    <ModeToggle />
                </div>
            </div>
        </div>
    );
}
