"use client";

import { useSyncExternalStore } from "react";
import { Icon } from "@/components/icons";

type Theme = "light" | "dark";

const themeEvent = "studyflow-theme-change";

function getThemeSnapshot(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

function subscribeToTheme(onChange: () => void) {
  const media = window.matchMedia("(prefers-color-scheme: dark)");
  const syncSystemTheme = () => {
    const savedTheme = localStorage.getItem("studyflow-theme");
    if (savedTheme !== "light" && savedTheme !== "dark") {
      const systemTheme = media.matches ? "dark" : "light";
      document.documentElement.dataset.theme = systemTheme;
      document.documentElement.style.colorScheme = systemTheme;
      onChange();
    }
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === "studyflow-theme") {
      const storedTheme = event.newValue;
      const nextTheme =
        storedTheme === "dark" || storedTheme === "light"
          ? storedTheme
          : media.matches
            ? "dark"
            : "light";
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme;
      onChange();
    }
  };

  window.addEventListener(themeEvent, onChange);
  window.addEventListener("storage", onStorage);
  media.addEventListener("change", syncSystemTheme);

  return () => {
    window.removeEventListener(themeEvent, onChange);
    window.removeEventListener("storage", onStorage);
    media.removeEventListener("change", syncSystemTheme);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    () => "light",
  );

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    document.documentElement.style.colorScheme = nextTheme;
    localStorage.setItem("studyflow-theme", nextTheme);
    window.dispatchEvent(new Event(themeEvent));
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối"}
      title={theme === "dark" ? "Giao diện sáng" : "Giao diện tối"}
      className="inline-flex size-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-500 shadow-sm transition hover:border-indigo-200 hover:text-indigo-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300"
    >
      <Icon name={theme === "dark" ? "sun" : "moon"} size={18} />
    </button>
  );
}
