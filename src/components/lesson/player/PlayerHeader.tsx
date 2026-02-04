"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export function PlayerHeader() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192e] px-6 py-3 sticky top-0 z-50 h-[64px]">
      <div className="flex items-center gap-8">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 text-[#5048e5]"
        >
          <div className="size-8 bg-[#5048e5] rounded-lg flex items-center justify-center text-white">
            <span className="material-symbols-outlined text-2xl">school</span>
          </div>
          <h2 className="text-[#0f0e1b] dark:text-white text-xl font-bold leading-tight tracking-tight">
            EduLearn
          </h2>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <Link
            href="/users/student/portal/dashboard"
            className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors"
          >
            My Dashboard
          </Link>
          <Link
            href="/users/student/portal/my_learning"
            className="text-[#545095] dark:text-gray-400 text-sm font-medium hover:text-[#5048e5] transition-colors"
          >
            Catalog
          </Link>
          <span className="text-[#5048e5] text-sm font-bold border-b-2 border-[#5048e5] pb-0.5 cursor-default">
            Learning Player
          </span>
        </nav>
      </div>

      <div className="flex items-center gap-4">
        {/* Theme Toggle Mini */}
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2 text-[#545095] dark:text-gray-400 hover:bg-[#f6f6f8] dark:hover:bg-[#2a293d] rounded-lg"
        >
          <span className="material-symbols-outlined text-xl">
            {theme === "dark" ? "light_mode" : "dark_mode"}
          </span>
        </button>

        <label className="hidden sm:flex items-center min-w-40 h-10 max-w-64 relative">
          <span className="material-symbols-outlined absolute left-3 text-[#545095]">
            search
          </span>
          <input
            className="w-full rounded-xl text-sm border-none bg-[#f6f6f8] dark:bg-[#2a293d] pl-10 pr-4 h-full focus:ring-2 focus:ring-[#5048e5]/50 outline-none text-[#0f0e1b] dark:text-white placeholder-slate-400"
            placeholder="Search lessons..."
          />
        </label>
        <div
          className="size-10 rounded-full border-2 border-[#5048e5]/20 bg-cover bg-center"
          style={{
            backgroundImage:
              'url("https://ui-avatars.com/api/?name=User&background=random")',
          }}
        ></div>
      </div>
    </header>
  );
}
