import {
  createRootRoute,
  HeadContent,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import appCss from "../styles.css?url";
import Footer from "@/components/layout/footer";
import {
  ThemeProvider,
  themeInitScript,
} from "@/src/components/theme-provider";
import { LanguageProvider } from "@/src/i18n/i18n";
import { messages } from "@/src/i18n/messages";
import { getInitialLanguage } from "@/src/server/language.functions";

export const Route = createRootRoute({
  // The language is read once on the server (cookie, then Accept-Language);
  // later changes happen client-side through the LanguageProvider.
  loader: () => getInitialLanguage(),
  staleTime: Infinity,
  head: ({ loaderData }) => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: messages[loaderData?.lang ?? "de"]["meta.title"] },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/img/neuland_icon.svg" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  const { lang } = Route.useLoaderData();
  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body className="font-plex-sans">
        <LanguageProvider initialLang={lang}>
          <ThemeProvider>
            <div className="min-h-screen flex flex-col overflow-x-clip">
              <div className="flex-1 flex flex-col">
                <Outlet />
              </div>
              <Footer />
            </div>
          </ThemeProvider>
        </LanguageProvider>
        <Scripts />
      </body>
    </html>
  );
}
