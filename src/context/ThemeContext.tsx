import { createContext, useEffect, useState, ReactNode } from "react";
import type { Theme } from "../types/types";

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

  // Detect system theme in first render
  useEffect(() => {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)");

    // Set initial
    setTheme(prefersDark.matches ? "dark" : "light");

    // Listener for dinamic changes
    const handleChange = (e: MediaQueryListEvent) => {
      setTheme(e.matches ? "dark" : "light");
    };

    prefersDark.addEventListener("change", handleChange);

    return () => {
      prefersDark.removeEventListener("change", handleChange);
    };
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div
        className={
          theme === "light"
            ? "bg-gray-100 text-gray-900 min-h-screen transition-colors"
            : "bg-gray-900 text-gray-100 min-h-screen transition-colors"
        }
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
}
