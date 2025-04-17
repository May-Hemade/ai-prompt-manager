import { Moon, Sun } from "lucide-react";
import React, { useEffect, useState } from "react";

interface NavProps {
  title?: string;
}

const NavBar: React.FC<NavProps> = ({ title }) => {
  const [mode, setMode] = useState<"dark" | "light">("light");

  const applyTheme = (theme: "dark" | "light") => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    setMode(theme);
    localStorage.setItem("theme", theme);
  };

  const toggleMode = () => {
    applyTheme(mode === "dark" ? "light" : "dark");
  };

  useEffect(() => {
    const stored = localStorage.getItem("theme") as "dark" | "light" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;

    if (stored) {
      applyTheme(stored);
    } else {
      applyTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  return (
    <nav className="bg-[var(--pm-bg)] text-[var(--pm-text)] sticky top-0 z-20 border-b border-[var(--pm-border)] shadow-sm">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-[var(--pm-primary)] tracking-tight">
          {title}
        </h1>
        <button
          onClick={toggleMode}
          className="text-[var(--pm-primary)] hover:opacity-80 transition"
          aria-label="Toggle Theme"
        >
          {mode === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
