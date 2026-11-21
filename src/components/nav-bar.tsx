import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { SettingsMenu } from "@/src/components/settings-menu";
import { useI18n } from "@/src/i18n/i18n";
import type { MessageKey } from "@/src/i18n/messages";

export interface NavSection {
  id: string;
  labelKey: MessageKey;
}

// Small fixed pill (bottom on mobile, top on desktop) with links to the page sections and a
// settings menu. Without sections only the settings button is shown, in the top right corner.
export function NavBar({ sections = [] }: { sections?: NavSection[] }) {
  const { t } = useI18n();
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    if (sections.length === 0) return;
    const update = () => {
      // the last section whose top has passed the upper third of the viewport
      const line = window.innerHeight / 3;
      let current: string | undefined;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // a last section that is too short to reach the line still counts once the page ends
      const atBottom =
        window.scrollY + window.innerHeight >=
        document.documentElement.scrollHeight - 2;
      if (atBottom) current = sections[sections.length - 1].id;
      setActiveId(current);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [sections]);

  const scrollTo = (id: string) => {
    setActiveId(id);
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  if (sections.length === 0) {
    return (
      <div className="fixed right-4 top-4 z-30 border bg-background/80 p-1 shadow-md backdrop-blur">
        <SettingsMenu menuClassName="top-full mt-3" />
      </div>
    );
  }

  return (
    <nav
      aria-label={t("nav.label")}
      className="pointer-events-none fixed inset-x-0 bottom-4 z-30 flex justify-center px-4 md:bottom-auto md:top-4"
    >
      <div className="pointer-events-auto flex max-w-full items-center gap-0.5 border bg-background/80 p-1 shadow-md backdrop-blur">
        <ul className="flex gap-0.5">
          {sections.map(({ id, labelKey }) => (
            <li key={id}>
              <button
                type="button"
                onClick={() => scrollTo(id)}
                aria-current={id === activeId ? "true" : undefined}
                className={cn(
                  "px-2 py-1.5 text-xs transition-colors sm:px-3",
                  id === activeId
                    ? "bg-muted-foreground/20 text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {t(labelKey)}
              </button>
            </li>
          ))}
        </ul>
        <span className="mx-0.5 h-5 w-px bg-border" aria-hidden />
        <SettingsMenu menuClassName="bottom-full mb-3 md:bottom-auto md:top-full md:mt-3" />
      </div>
    </nav>
  );
}
