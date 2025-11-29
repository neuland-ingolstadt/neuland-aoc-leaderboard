import Image from "next/image";

export default function Footer() {
    return (
        <div className="w-full border-t border-border py-4 mt-8">
            <div className="container w-200 mx-auto px-4 flex flex-col md:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
                <Image
                    src="/img/neuland_logo.svg"
                    alt="Neuland Logo"
                    width={150}
                    height={40}
                    className="h-8 w-auto brightness-0 invert"
                />
                <p className="text-center md:text-left">
                    Neuland ist nicht für den Inhalt des Wettbewerbs verantwortlich sondern bietet
                    nur das Leaderboard mit Preisverleihung an.
                </p>
            </div>
        </div>
    );
}
