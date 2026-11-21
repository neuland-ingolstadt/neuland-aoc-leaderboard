import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Markdown } from "@/src/components/markdown";
import { NavBar } from "@/src/components/nav-bar";
import terms from "@/src/content/teilnahmebedingungen.md?raw";
import { useI18n } from "@/src/i18n/i18n";
import { messages, type Lang } from "@/src/i18n/messages";

export const Route = createFileRoute("/teilnahmebedingungen")({
  head: ({ matches }) => {
    // The root loader (see __root.tsx) holds the language of the request
    const rootLoaderData = (
      matches as { routeId: string; loaderData?: unknown }[]
    ).find((match) => match.routeId === "__root__")?.loaderData as
      { lang?: Lang } | undefined;
    return {
      meta: [
        { title: messages[rootLoaderData?.lang ?? "de"]["meta.termsTitle"] },
      ],
    };
  },
  component: Teilnahmebedingungen,
});

// The terms are maintained in src/content/teilnahmebedingungen.md (German only)
function Teilnahmebedingungen() {
  const { t, lang } = useI18n();

  // keep the tab title in sync when the language is switched on this page
  useEffect(() => {
    document.title = t("meta.termsTitle");
  }, [t]);

  return (
    <>
      <NavBar />
      <main className="mx-auto w-full max-w-3xl px-4 pb-8 pt-20 md:pb-20 md:pt-28">
        <Link
          to="/"
          className="mb-6 inline-flex md:mb-8 items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          {t("terms.back")}
        </Link>

        {lang !== "de" && (
          <p className="mb-6 border bg-card px-3 py-3 text-sm text-muted-foreground md:px-4">
            {t("terms.onlyGerman")}
          </p>
        )}

        <article lang="de">
          <Markdown source={terms} />
        </article>
      </main>
    </>
  );
}
