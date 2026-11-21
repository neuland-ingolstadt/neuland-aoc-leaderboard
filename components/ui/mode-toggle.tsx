import { Moon, Sun } from "lucide-react"
import { useTheme } from "@/src/components/theme-provider"

import { Button } from "@/components/ui/button"
import { useI18n } from "@/src/i18n/i18n"

export function ModeToggle() {
    const { theme, setTheme } = useTheme()
    const { t } = useI18n()

    return (
        <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        >
            <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
            <span className="sr-only">{t("common.toggleTheme")}</span>
        </Button>
    )
}
