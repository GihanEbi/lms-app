"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function StudentRegHeader() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch by waiting for mount
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#121121] px-6 lg:px-10 py-3 sticky top-0 z-50 transition-colors duration-200">
      {/* Logo Section */}
      <div className="flex items-center gap-4 text-slate-900 dark:text-white">
        <span className="material-symbols-outlined text-[#5048e5] text-2xl font-bold">
          auto_stories
        </span>
        <h2 className="text-xl font-bold tracking-tight">EduLearn</h2>
      </div>

      {/* Actions Section */}
      <div className="flex items-center gap-4">
        {/* Theme Toggle Button */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-lg text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800 transition-all"
            aria-label="Toggle Dark Mode"
          >
            {theme === "dark" ? (
              <span className="material-symbols-outlined text-xl">
                light_mode
              </span>
            ) : (
              <span className="material-symbols-outlined text-xl">
                dark_mode
              </span>
            )}
          </button>
        )}

        {/* Help Button */}
        <button className="hidden sm:block px-4 py-2 bg-[#5048e5]/10 text-[#5048e5] text-sm font-bold rounded-lg hover:bg-[#5048e5]/20 transition-all">
          Help Center
        </button>

        {/* User Avatar */}
        <div
          className="size-10 rounded-full border-2 border-[#5048e5]/20 bg-cover bg-center cursor-pointer"
          style={{
            backgroundImage:
              'url("https://ui-avatars.com/api/?name=User&background=random")',
          }}
        ></div>
      </div>
    </header>
  );
}
