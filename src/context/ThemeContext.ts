import { createContext } from "react";
import type { Theme } from "../types/types";

export const ThemeContext = createContext<{
  theme: Theme;
  toggleTheme: () => void;
} | null>(null);
