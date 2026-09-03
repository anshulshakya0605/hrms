import { useTheme } from "../../hooks/use-theme";

export function ThemeToggle() {

    const { theme, toggleTheme } = useTheme();

    return (
        <button
            type="button"
            onClick={toggleTheme}
            className="rounded-lg border border-border bg-card px-4 py-2 text-card-foreground
        transition hover:bg-secondary">
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    )
}