// src/hooks/useTheme.ts
import { useEffect, useState, useCallback } from "react";

type Theme = "light" | "dark";

const THEME_KEY = "theme";

function getSystemPrefersDark() {
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches;
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const saved = localStorage.getItem(THEME_KEY) as Theme | null;
    return saved ?? (getSystemPrefersDark() ? "dark" : "light");
  });

  // Apply class to <html>
  const applyTheme = useCallback((t: Theme) => {
    const root = document.documentElement;
    if (t === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
  }, []);

  // Toggle handler
  const toggleTheme = useCallback(() => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  }, []);

  // Watch state & persist
  useEffect(() => {
    applyTheme(theme);
    localStorage.setItem(THEME_KEY, theme);
  }, [theme, applyTheme]);

  // React to system changes
  useEffect(() => {
    const mq = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      const saved = localStorage.getItem(THEME_KEY);
      if (!saved) {
        // Only auto-switch if user hasn’t chosen explicitly
        setTheme(getSystemPrefersDark() ? "dark" : "light");
      }
    };
    mq.addEventListener?.("change", onChange);
    return () => mq.removeEventListener?.("change", onChange);
  }, []);

  // Sync across tabs
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === THEME_KEY && e.newValue) {
        setTheme(e.newValue as Theme);
      }
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  return { theme, toggleTheme };
}
