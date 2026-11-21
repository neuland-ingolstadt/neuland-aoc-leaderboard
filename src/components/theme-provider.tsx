import * as React from "react";

type Theme = "light" | "dark";

const STORAGE_KEY = "theme";
const DEFAULT_THEME: Theme = "dark";

// Runs before hydration so the correct class is set without a flash. Without a saved choice the
// device setting (prefers-color-scheme) decides.
export const themeInitScript = `(function(){try{var t=localStorage.getItem("${STORAGE_KEY}");if(t!=="light"&&t!=="dark")t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var c=document.documentElement.classList;c.remove("light","dark");c.add(t);document.documentElement.style.colorScheme=t;}catch(e){}})();`;

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

// The init script has already put the active theme on <html>, so that is the source of truth.
function getSnapshot(): Theme {
  return document.documentElement.classList.contains("light")
    ? "light"
    : "dark";
}

function getServerSnapshot(): Theme {
  return DEFAULT_THEME;
}

function applyTheme(next: Theme) {
  const root = document.documentElement;
  root.classList.remove("light", "dark");
  root.classList.add(next);
  root.style.colorScheme = next;
  listeners.forEach((listener) => listener());
}

function setTheme(next: Theme) {
  applyTheme(next);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // storage unavailable (e.g. private mode): theme just won't persist
  }
}

function hasSavedTheme() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved === "light" || saved === "dark";
  } catch {
    return false;
  }
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Follow the device while the user has not picked a theme themselves
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = (event: MediaQueryListEvent) => {
      if (!hasSavedTheme()) applyTheme(event.matches ? "dark" : "light");
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  return <>{children}</>;
}

export function useTheme() {
  const theme = React.useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot,
  );
  return { theme, setTheme };
}
