import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full border-t border-border mt-8">
            <div className="container max-w-200 mx-auto px-4 py-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
                <Image
                    src="/img/neuland_icon.svg"
                    alt="Neuland Icon"
                    width={100}
                    height={100}
                    className="h-8 w-auto brightness-0 invert"
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
            </div>
        </div>
    );
}
