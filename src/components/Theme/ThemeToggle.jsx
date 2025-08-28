// src/components/theme/ThemeToggle.tsx
"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      className="inline-flex items-center justify-center  bg-card text-foreground shadow-sm hover:shadow-md transition"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Light mode" : "Dark mode"}
    >
      {/* Swap icons with a subtle cross-fade */}
      <Sun
        className={`h-5 w-5 -ml-5 transition-opacity ${isDark ? "opacity-0" : "opacity-100"}`}
      />
      <Moon
        className={`h-5 w-5 -ml-5 transition-opacity ${isDark ? "opacity-100" : "opacity-0"}`}
      />
    </button>
  );
}
