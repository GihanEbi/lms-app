"use client";

import React from "react";
import { useSidebar } from "@/src/context/SidebarContext";

export function Navbar() {
  const { toggle } = useSidebar(); // Get toggle function

  return (
    <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#121121]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex items-center justify-between gap-4 md:gap-8 transition-colors">
      {/* Mobile Menu Button - Triggers Toggle */}
      <button
        onClick={toggle}
        className="md:hidden p-2 -ml-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
      >
        <span className="material-symbols-outlined">menu</span>
      </button>

      {/* Search Bar */}
      <div className="flex-1 max-w-md relative">
        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
          search
        </span>
        <input
          className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-lg pl-11 pr-4 py-2 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:ring-2 focus:ring-[#5048e5] outline-none transition-all"
          placeholder="Search courses..."
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 md:gap-4">
        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 relative hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined">notifications</span>
          <span className="absolute top-2 right-2 size-2 bg-red-500 rounded-full border-2 border-white dark:border-[#121121]"></span>
        </button>
        <button className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
          <span className="material-symbols-outlined">chat</span>
        </button>
      </div>
    </header>
  );
}
