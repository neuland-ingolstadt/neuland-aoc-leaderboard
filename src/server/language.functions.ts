import { createServerFn } from "@tanstack/react-start";
import { getCookie, getRequestHeader } from "@tanstack/react-start/server";
import {
  LANG_COOKIE,
  langFromAcceptLanguage,
  parseLang,
} from "@/src/i18n/messages";

// Language of the request: saved choice first, then the browser preference
export const getInitialLanguage = createServerFn({ method: "GET" }).handler(
  async () => ({
    lang:
      parseLang(getCookie(LANG_COOKIE)) ??
      langFromAcceptLanguage(getRequestHeader("accept-language")),
  }),
);
