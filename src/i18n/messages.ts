import de from "@/src/i18n/de.json";
import en from "@/src/i18n/en.json";

export const LANGUAGES = ["de", "en"] as const;
export type Lang = (typeof LANGUAGES)[number];
export const DEFAULT_LANG: Lang = "de";
export const LANG_COOKIE = "lang";

// The texts live in de.json and en.json. German is the reference: English has to provide
// exactly the same keys, otherwise the type check fails.
// Rich text: <tag>content</tag> is rendered through the component passed for "tag"
// (see `rich` in i18n.tsx), {name} is replaced by a value.
export type MessageKey = keyof typeof de;

const english: Record<MessageKey, string> = en;

export const messages: Record<Lang, Record<MessageKey, string>> = {
  de,
  en: english,
};

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
