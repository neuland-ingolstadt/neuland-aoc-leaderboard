import { useEffect } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { NavBar } from "@/src/components/nav-bar";
import { useI18n } from "@/src/i18n/i18n";
import { messages, type Lang, type MessageKey } from "@/src/i18n/messages";

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

const SECTIONS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => ({
  title: `terms.s${n}.title` as MessageKey,
  text: `terms.s${n}.text` as MessageKey,
}));

function Teilnahmebedingungen() {
  const { t } = useI18n();

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

        <h1 className="font-plex-mono text-2xl font-semibold break-words sm:text-3xl md:text-4xl">
          {t("terms.title")}
        </h1>

        <p className="mt-5 border bg-card px-3 py-3 text-sm md:mt-6 md:px-4 text-muted-foreground">
          {t("terms.notice")}
        </p>

        <div className="mt-8 flex flex-col gap-6 md:mt-10 md:gap-8">
          {SECTIONS.map((section) => (
            <section key={section.title} className="flex flex-col gap-2">
              <h2 className="text-base font-semibold md:text-lg">
                {t(section.title)}
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                {t(section.text)}
              </p>
            </section>
          ))}
        </div>

        <p className="mt-10 text-sm text-muted-foreground md:mt-12">
          {t("terms.updated")}
        </p>
      </main>
    </>
  );
}
