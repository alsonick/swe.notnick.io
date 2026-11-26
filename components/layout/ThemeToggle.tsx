import { useCallback, useEffect, useRef, useState } from "react";
import { FiMoon, FiSun } from "react-icons/fi";
import { FOCUS_RING } from "../../lib/styles";

type Theme = "light" | "dark";

// Keep in sync with the `.theme-transition` duration in globals.css.
const THEME_FADE_MS = 150;

export const ThemeToggle = () => {
  // The class on <html> is set before first paint by the script in
  // _document.tsx, so read the real theme from there once mounted.
  const [theme, setTheme] = useState<Theme | null>(null);
  const fadeTimeout = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    setTheme(
      document.documentElement.classList.contains("dark") ? "dark" : "light"
    );
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === "light" ? "dark" : "light";
    const html = document.documentElement;

    // Fade every colour together for just this toggle.
    html.classList.add("theme-transition");
    clearTimeout(fadeTimeout.current);
    fadeTimeout.current = setTimeout(
      () => html.classList.remove("theme-transition"),
      THEME_FADE_MS
    );

    html.classList.toggle("dark", next === "dark");
    try {
      localStorage.setItem("theme", next);
    } catch {
      // Storage unavailable: the theme still changes for this visit.
    }
    setTheme(next);
  }, [theme]);

  // Ctrl+T, same shortcut as notnick.io.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && (e.key === "t" || e.key === "T")) {
        e.preventDefault();
        toggle();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggle]);

  const label = `Switch to ${theme === "dark" ? "light" : "dark"} theme`;

  return (
    <button
      onClick={toggle}
      aria-label={label}
      title={`${label} (Ctrl+T)`}
      className={`flex items-center justify-center bg-gray-100 text-black h-9 w-9 duration-300
      md:hover:bg-gray-200 dark:bg-gray-800 md:dark:hover:bg-gray-900 dark:text-white rounded-lg
      border border-gray-300 dark:border-gray-700 ${FOCUS_RING}`}
    >
      {theme === "light" ? (
        <FiMoon aria-hidden className="text-base duration-150 md:hover:scale-110" />
      ) : (
        <FiSun aria-hidden className="text-base duration-150 md:hover:scale-110" />
      )}
    </button>
  );
};
