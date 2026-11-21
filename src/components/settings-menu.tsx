import { useEffect, useRef, useState } from "react";
import { Moon, Settings, Sun } from "lucide-react";
import { cn } from "@/lib/utils";
import { LanguageToggle } from "@/src/components/language-toggle";
import { useTheme } from "@/src/components/theme-provider";
import { useI18n } from "@/src/i18n/i18n";

// Gear button that opens a small menu with the language and the color mode.
// `menuClassName` positions the menu relative to the button.
export function SettingsMenu({ menuClassName }: { menuClassName?: string }) {
  const { t } = useI18n();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  const modes = [
    { value: "light", label: t("settings.light"), icon: Sun },
    { value: "dark", label: t("settings.dark"), icon: Moon },
  ] as const;

  return (
    <div ref={rootRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={t("settings.open")}
        className={cn(
          "flex size-8 items-center justify-center text-muted-foreground transition-colors hover:text-foreground",
          open && "bg-muted-foreground/20 text-foreground",
        )}
      >
        <Settings className="size-4" aria-hidden />
      </button>

      {open && (
        <div
          role="group"
          aria-label={t("settings.open")}
          className={cn(
            "absolute right-0 z-40 flex w-60 flex-col gap-3 border bg-popover p-3 text-sm text-popover-foreground shadow-md",
            menuClassName,
          )}
        >
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">
              {t("common.language")}
            </span>
            <LanguageToggle />
          </div>
          <div className="flex items-center justify-between gap-3">
            <span className="text-muted-foreground">{t("settings.theme")}</span>
            <div className="flex border text-xs">
              {modes.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setTheme(value)}
                  aria-pressed={theme === value}
                  className={cn(
                    "flex items-center gap-1.5 px-2 py-1.5 font-medium transition-colors",
                    theme === value
                      ? "bg-muted-foreground/20 text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  <Icon className="size-3.5" aria-hidden />
                  {label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
