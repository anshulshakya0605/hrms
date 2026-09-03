import { createContext, useEffect, useMemo, useState, type ReactNode } from "react";


type Theme = "light" | "dark"

interface ThemeContextValue {
    theme: Theme,
    toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

interface ThemeProviderProps {
    children: ReactNode;
}

const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === 'light' || savedTheme === "dark") {
         return savedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function ThemeProvider({children}: ThemeProviderProps) {

    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        const root = document.documentElement;

        root.classList.remove("light", "dark")
        root.classList.add(theme)

        localStorage.setItem("theme", theme);

    }, [theme])

    const toggleTheme = () => {
        setTheme((currentTheme) => currentTheme === "light" ? "dark" : "light" )
    }

    const value = useMemo(() => ({
        theme, toggleTheme
    }),[theme])

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )

} 