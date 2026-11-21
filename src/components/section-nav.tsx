import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface NavSection {
  id: string;
  label: string;
}

// Small fixed bar (bottom on mobile, top on desktop) that scrolls to a dashboard section and highlights
// the one currently in view.
export function SectionNav({ sections }: { sections: NavSection[] }) {
  const [activeId, setActiveId] = useState<string>();

  useEffect(() => {
    const update = () => {
      // the last section whose top has passed the upper third of the viewport
      const line = window.innerHeight / 3;
      let current: string | undefined;
      for (const { id } of sections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
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
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    document.getElementById(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <nav
      aria-label="Statistiken"
      className="fixed inset-x-0 bottom-4 z-20 md:bottom-auto md:top-4 flex justify-center px-4 pointer-events-none"
    >
      <ul className="pointer-events-auto flex max-w-full gap-0.5 border bg-background/80 p-1 shadow-md backdrop-blur">
        {sections.map(({ id, label }) => (
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
              {label}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
