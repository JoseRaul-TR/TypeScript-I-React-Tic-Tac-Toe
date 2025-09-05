import { createContext, useState, ReactNode } from "react";
import type { Theme } from "../types/types";

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");

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
