import { cn } from "@/lib/utils";
import { useI18n } from "@/src/i18n/i18n";
import { LANGUAGES } from "@/src/i18n/messages";

export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();

  return (
    <div
      role="group"
      aria-label={t("common.language")}
      className="flex border text-xs"
    >
      {LANGUAGES.map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          aria-pressed={code === lang}
          lang={code}
          className={cn(
            "px-2 py-1.5 font-medium uppercase transition-colors",
            code === lang
              ? "bg-muted-foreground/20 text-foreground"
              : "text-muted-foreground hover:text-foreground",
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
}
