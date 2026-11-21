import {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  LANG_COOKIE,
  LOCALES,
  messages,
  type Lang,
  type MessageKey,
} from "@/src/i18n/messages";

type Params = Record<string, string | number>;
type Tags = Record<string, (content: ReactNode) => ReactNode>;

interface I18n {
  lang: Lang;
  locale: string;
  setLang: (lang: Lang) => void;
  t: (key: MessageKey, params?: Params) => string;
  // singular/plural variants: keys "<key>.one" and "<key>.other"
  plural: (key: string, n: number, params?: Params) => string;
  // replaces <tag>content</tag> with the elements returned by `tags`
  rich: (key: MessageKey, tags: Tags, params?: Params) => ReactNode;
}

const I18nContext = createContext<I18n | null>(null);

function interpolate(text: string, params?: Params) {
  return params
    ? text.replace(/\{(\w+)\}/g, (match, name) =>
        name in params ? String(params[name]) : match,
      )
    : text;
}

export function LanguageProvider({
  initialLang,
  children,
}: {
  initialLang: Lang;
  children: ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    document.cookie = `${LANG_COOKIE}=${next}; path=/; max-age=31536000; samesite=lax`;
  }, []);

  const value = useMemo<I18n>(() => {
    const dictionary = messages[lang];
    const t = (key: MessageKey, params?: Params) =>
      interpolate(dictionary[key], params);
    return {
      lang,
      locale: LOCALES[lang],
      setLang,
      t,
      plural: (key, n, params) =>
        t(`${key}.${n === 1 ? "one" : "other"}` as MessageKey, {
          n,
          ...params,
        }),
      rich: (key, tags, params) => {
        const text = interpolate(dictionary[key], params);
        const parts: ReactNode[] = [];
        const pattern = /<(\w+)>([\s\S]*?)<\/\1>/g;
        let last = 0;
        let match: RegExpExecArray | null;
        while ((match = pattern.exec(text))) {
          if (match.index > last) parts.push(text.slice(last, match.index));
          const render = tags[match[1]];
          parts.push(render ? render(match[2]) : match[2]);
          last = pattern.lastIndex;
        }
        if (last < text.length) parts.push(text.slice(last));
        return parts.map((part, i) => <Fragment key={i}>{part}</Fragment>);
      },
    };
  }, [lang, setLang]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used within LanguageProvider");
  return context;
}
