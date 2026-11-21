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

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Neuland Leaderboard: Advent Of Code" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/img/neuland_icon.svg" },
    ],
  }),
  component: RootComponent,
});

function RootComponent() {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <HeadContent />
      </head>
      <body className="font-plex-sans">
        <ThemeProvider>
          <div className="min-h-screen flex flex-col overflow-x-clip">
            <div className="flex-1 flex flex-col">
              <Outlet />
            </div>
            <Footer />
          </div>
        </ThemeProvider>
        <Scripts />
      </body>
    </html>
  );
}
