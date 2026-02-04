"use client";

import React, { useState } from "react";

export default function SchedulePage() {
  // State to manage mobile view switching
  const [mobileView, setMobileView] = useState<
    "calendar" | "timeline" | "filters"
  >("calendar");

  return (
    <div className="flex h-full bg-[#f6f6f8] dark:bg-[#121121] overflow-hidden font-sans text-slate-900 dark:text-slate-100 relative">
      {/* 
        --- LEFT FILTER SIDEBAR --- 
        - Mobile: Full screen absolute positioning when active
        - Desktop (xl): Fixed width sidebar
      */}
      <aside
        className={`
          flex-col gap-6 overflow-y-auto shrink-0 bg-white dark:bg-[#121121] p-6 border-r border-slate-200 dark:border-slate-800
          transition-all duration-300
          ${mobileView === "filters" ? "flex absolute inset-0 z-30 w-full" : "hidden"}
          xl:flex xl:static xl:w-72 xl:z-0
        `}
      >
        <div className="flex items-center justify-between xl:hidden mb-2">
          <h2 className="text-xl font-bold">Filters</h2>
          <button
            onClick={() => setMobileView("calendar")}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div>
          <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
            Course Filters
          </h3>
          <div className="space-y-3">
            {/* Filter Item: Math */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-[#3b82f6]"></div>
                <span className="text-sm font-medium group-hover:text-[#5048e5] transition-colors">
                  Mathematics 101
                </span>
              </div>
              <input
                defaultChecked
                className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none checked:bg-[#5048e5] relative transition-all cursor-pointer before:content-[''] before:absolute before:size-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-all"
                type="checkbox"
              />
            </label>

            {/* Filter Item: CS */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-[#f59e0b]"></div>
                <span className="text-sm font-medium group-hover:text-[#5048e5] transition-colors">
                  Computer Science
                </span>
              </div>
              <input
                defaultChecked
                className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none checked:bg-[#5048e5] relative transition-all cursor-pointer before:content-[''] before:absolute before:size-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-all"
                type="checkbox"
              />
            </label>

            {/* Filter Item: Chemistry */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-[#8b5cf6]"></div>
                <span className="text-sm font-medium group-hover:text-[#5048e5] transition-colors">
                  Organic Chemistry
                </span>
              </div>
              <input
                defaultChecked
                className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none checked:bg-[#5048e5] relative transition-all cursor-pointer before:content-[''] before:absolute before:size-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-all"
                type="checkbox"
              />
            </label>

            {/* Filter Item: Art */}
            <label className="flex items-center justify-between cursor-pointer group">
              <div className="flex items-center gap-3">
                <div className="size-3 rounded-full bg-slate-400"></div>
                <span className="text-sm font-medium group-hover:text-[#5048e5] transition-colors">
                  Art History
                </span>
              </div>
              <input
                className="w-9 h-5 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none checked:bg-[#5048e5] relative transition-all cursor-pointer before:content-[''] before:absolute before:size-4 before:bg-white before:rounded-full before:top-0.5 before:left-0.5 checked:before:translate-x-4 before:transition-all"
                type="checkbox"
              />
            </label>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-[#5048e5]/5 rounded-2xl p-4 border border-[#5048e5]/10">
            <div className="flex items-center gap-2 mb-3">
              <span className="material-symbols-outlined text-[#5048e5] text-xl">
                calendar_add_on
              </span>
              <h4 className="text-sm font-bold text-[#5048e5]">Quick Add</h4>
            </div>
            <p className="text-xs text-slate-500 mb-4">
              Sync with your personal Google or Outlook calendar.
            </p>
            <button className="w-full py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              Integrate Calendars
            </button>
          </div>
        </div>
      </aside>

      {/* 
        --- MAIN CALENDAR SECTION --- 
        - Visible on Mobile if mobileView === 'calendar'
        - Always visible on Desktop
      */}
      <section
        className={`
          flex-1 p-4 sm:p-6 flex-col gap-6 overflow-y-auto pb-24 xl:pb-6
          ${mobileView === "calendar" ? "flex" : "hidden xl:flex"}
        `}
      >
        {/* Calendar Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              October 2024
            </h2>
            <div className="flex bg-white dark:bg-[#1a242e] border border-slate-200 dark:border-slate-800 rounded-lg p-1">
              <button className="size-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">
                  chevron_left
                </span>
              </button>
              <button className="px-3 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-slate-700 dark:text-slate-300">
                Today
              </button>
              <button className="size-8 flex items-center justify-center hover:bg-slate-100 dark:hover:bg-slate-800 rounded-md transition-colors text-slate-600 dark:text-slate-400">
                <span className="material-symbols-outlined text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
          <div className="flex bg-slate-200 dark:bg-slate-800 rounded-lg p-1 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-md bg-white dark:bg-slate-700 shadow-sm text-xs font-bold text-slate-900 dark:text-white">
              Month
            </button>
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Week
            </button>
            <button className="flex-1 sm:flex-none px-4 py-1.5 rounded-md text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300">
              Day
            </button>
          </div>
        </div>

        {/* Calendar Grid Container (Scrollable on Mobile) */}
        <div className="flex-1 bg-white dark:bg-[#1a242e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col min-h-[600px] shadow-sm relative">
          <div className="overflow-x-auto h-full flex flex-col">
            <div className="min-w-[600px] flex-1 flex flex-col h-full">
              {/* Days Header */}
              <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50">
                {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                  (day) => (
                    <div
                      key={day}
                      className="py-3 text-center text-xs font-bold text-slate-400 uppercase tracking-wider"
                    >
                      {day}
                    </div>
                  ),
                )}
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 flex-1 auto-rows-fr">
                {/* Previous Month */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 min-h-[100px] text-slate-400 text-xs font-medium">
                  29
                </div>
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 bg-slate-50/30 dark:bg-slate-900/30 min-h-[100px] text-slate-400 text-xs font-medium">
                  30
                </div>

                {/* Day 1 */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  1
                </div>

                {/* Day 2 */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  2
                </div>

                {/* Day 3 (Event) */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  3
                  <div className="mt-1 space-y-1">
                    <div className="px-2 py-1 bg-[#3b82f6]/10 border-l-2 border-[#3b82f6] text-[10px] text-[#3b82f6] font-bold rounded truncate">
                      Math Lecture
                    </div>
                  </div>
                </div>

                {/* Day 4-6 */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  4
                </div>
                <div className="p-2 border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  5
                </div>
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  6
                </div>

                {/* Day 7 (Multiple Events) */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  7
                  <div className="mt-1 space-y-1">
                    <div className="px-2 py-1 bg-[#f59e0b]/10 border-l-2 border-[#f59e0b] text-[10px] text-[#f59e0b] font-bold rounded truncate">
                      CS Project Due
                    </div>
                    <div className="px-2 py-1 bg-[#8b5cf6]/10 border-l-2 border-[#8b5cf6] text-[10px] text-[#8b5cf6] font-bold rounded truncate">
                      Study Session
                    </div>
                  </div>
                </div>

                {/* Day 8 */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  8
                </div>

                {/* Day 9 (Current Day) */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold bg-[#5048e5]/5 ring-1 ring-inset ring-[#5048e5]/20">
                  9
                  <div className="mt-1 space-y-1">
                    <div className="px-2 py-1 bg-[#3b82f6]/10 border-l-2 border-[#3b82f6] text-[10px] text-[#3b82f6] font-bold rounded truncate">
                      Bio Seminar
                    </div>
                    <div className="px-2 py-1 bg-[#5048e5] text-white text-[10px] font-bold rounded truncate">
                      Current Time
                    </div>
                  </div>
                </div>

                {/* Day 10-15 */}
                {[10, 11, 12, 13, 14, 15].map((day) => (
                  <div
                    key={day}
                    className={`p-2 ${day % 7 === 0 ? "border-b" : "border-r border-b"} border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold`}
                  >
                    {day}
                  </div>
                ))}

                {/* Day 16 (Event) */}
                <div className="p-2 border-r border-b border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold">
                  16
                  <div className="mt-1 space-y-1">
                    <div className="px-2 py-1 bg-[#3b82f6]/10 border-l-2 border-[#3b82f6] text-[10px] text-[#3b82f6] font-bold rounded truncate">
                      Ethics Workshop
                    </div>
                  </div>
                </div>

                {/* Rest of the month */}
                {Array.from({ length: 10 }, (_, i) => i + 17).map((day) => (
                  <div
                    key={day}
                    className={`p-2 ${day === 19 || day === 26 ? "border-b" : "border-r border-b"} border-slate-100 dark:border-slate-800 min-h-[100px] text-slate-900 dark:text-white text-xs font-bold`}
                  >
                    {day}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        --- RIGHT TIMELINE SIDEBAR --- 
        - Mobile: Full screen absolute positioning when active
        - Desktop (2xl): Fixed width sidebar
      */}
      <aside
        className={`
          flex-col gap-8 overflow-y-auto shrink-0 bg-white dark:bg-[#121121] p-6 border-l border-slate-200 dark:border-slate-800
          transition-all duration-300
          ${mobileView === "timeline" ? "flex absolute inset-0 z-30 w-full" : "hidden"}
          2xl:flex 2xl:static 2xl:w-80 2xl:bg-white/50 2xl:dark:bg-[#1a242e]/50
        `}
      >
        <div className="flex items-center justify-between xl:hidden mb-2">
          <h2 className="text-xl font-bold">Timeline</h2>
          <button
            onClick={() => setMobileView("calendar")}
            className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        <div>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Upcoming Today
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Oct 9
            </span>
          </div>

          <div className="space-y-6">
            {/* Timeline Item 1 */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[7px] before:top-[24px] before:bottom-[-24px] before:w-[2px] before:bg-slate-200 dark:before:bg-slate-700">
              <div className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-[#3b82f6] bg-white dark:bg-[#1a242e] z-10"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#3b82f6] mb-1">
                  10:00 AM — 11:30 AM
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Organic Chemistry Lecture
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Hall B • Prof. Simmons
                </p>
              </div>
            </div>

            {/* Timeline Item 2 */}
            <div className="relative pl-6 before:content-[''] before:absolute before:left-[7px] before:top-[24px] before:bottom-[-24px] before:w-[2px] before:bg-slate-200 dark:before:bg-slate-700">
              <div className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-[#8b5cf6] bg-white dark:bg-[#1a242e] z-10"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#8b5cf6] mb-1">
                  01:00 PM — 02:30 PM
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  Personal Study: Math Lab
                </h4>
                <p className="text-xs text-slate-500 mt-1">Library 2nd Floor</p>
              </div>
            </div>

            {/* Timeline Item 3 */}
            <div className="relative pl-6">
              <div className="absolute left-0 top-1.5 size-4 rounded-full border-2 border-[#f59e0b] bg-white dark:bg-[#1a242e] z-10"></div>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-[#f59e0b] mb-1">
                  11:59 PM
                </span>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  History Essay Submission
                </h4>
                <p className="text-xs text-slate-500 mt-1">
                  Digital Submission Only
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-auto">
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-5 text-white relative overflow-hidden shadow-xl border border-white/10">
            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <span className="material-symbols-outlined text-[#5048e5] text-xl">
                  auto_awesome
                </span>
                <h4 className="text-sm font-bold">AI Smart Scheduler</h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed mb-5">
                I&apos;ve noticed you have a{" "}
                <span className="text-white font-bold">CS Final</span> in 4
                days. Would you like me to block out{" "}
                <span className="text-[#5048e5] font-bold">
                  2 hours tomorrow
                </span>{" "}
                for deep focus?
              </p>
              <div className="space-y-2">
                <button className="w-full py-2.5 bg-[#5048e5] text-white rounded-xl text-xs font-bold hover:bg-[#5048e5]/90 transition-all">
                  Accept Suggestion
                </button>
                <button className="w-full py-2.5 bg-white/10 text-white border border-white/10 rounded-xl text-xs font-bold hover:bg-white/20 transition-all">
                  Adjust Time
                </button>
              </div>
            </div>
            <div className="absolute -right-8 -bottom-8 size-32 bg-[#5048e5]/20 rounded-full blur-3xl"></div>
          </div>
        </div>
      </aside>

      {/* Floating Action Button */}
      <button className="fixed bottom-24 xl:bottom-8 right-6 size-14 bg-[#5048e5] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform z-40">
        <span className="material-symbols-outlined text-3xl">add</span>
      </button>

      {/* 
        --- MOBILE BOTTOM NAVIGATION ---
        Only visible on small screens to switch views
      */}
      <div className="xl:hidden fixed bottom-0 w-full bg-white dark:bg-[#1a242e] border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-50 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <button
          onClick={() => setMobileView("filters")}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${mobileView === "filters" ? "text-[#5048e5]" : "text-slate-500"}`}
        >
          <span className="material-symbols-outlined">filter_list</span>
          Filters
        </button>
        <button
          onClick={() => setMobileView("calendar")}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${mobileView === "calendar" ? "text-[#5048e5]" : "text-slate-500"}`}
        >
          <span className="material-symbols-outlined">calendar_month</span>
          Calendar
        </button>
        <button
          onClick={() => setMobileView("timeline")}
          className={`flex flex-col items-center gap-1 text-xs font-medium ${mobileView === "timeline" ? "text-[#5048e5]" : "text-slate-500"}`}
        >
          <span className="material-symbols-outlined">view_timeline</span>
          Timeline
        </button>
      </div>
    </div>
  );
}
