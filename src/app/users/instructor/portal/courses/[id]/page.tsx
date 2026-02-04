"use client";

import React from "react";
import Link from "next/link";

export default function CourseManagementPage() {
  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Top Navbar --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight break-words">
                Full Stack Web Development
              </h2>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-slate-500 font-medium flex items-center gap-1">
                  <span className="material-symbols-outlined !text-[14px]">
                    public
                  </span>{" "}
                  Published
                </span>
                <a
                  className="text-xs text-[#5048e5] font-bold hover:underline"
                  href="#"
                >
                  View as Student
                </a>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-lg text-sm font-semibold hover:bg-slate-200 transition-all">
              <span className="material-symbols-outlined !text-sm">share</span>{" "}
              Share
            </button>
            <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2 bg-[#5048e5] text-white rounded-lg text-sm font-bold shadow-lg shadow-[#5048e5]/20 hover:bg-[#5048e5]/90 transition-all">
              <span className="material-symbols-outlined !text-sm">edit</span>{" "}
              Edit Course
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-7xl mx-auto p-4 md:p-8 grid grid-cols-12 gap-6 md:gap-8">
        {/* --- Left Column: Analytics & Stats --- */}
        <div className="col-span-12 xl:col-span-9 space-y-6 md:space-y-8">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                label: "Total Students",
                value: "1,284",
                icon: "groups",
                trend: "+12%",
                color: "blue",
              },
              {
                label: "Total Revenue",
                value: "$42,850",
                icon: "payments",
                trend: "+8.2%",
                color: "emerald",
              },
              {
                label: "Avg. Completion",
                value: "76%",
                icon: "task_alt",
                trend: "Stable",
                color: "purple",
              },
              {
                label: "Current Rating",
                value: "4.8",
                icon: "star",
                trend: "4.9/5.0",
                color: "amber",
              },
            ].map((stat, idx) => (
              <div
                key={idx}
                className="bg-white dark:bg-[#1a192e] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <div
                    className={`size-10 rounded-lg flex items-center justify-center 
                    ${stat.color === "blue" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : ""}
                    ${stat.color === "emerald" ? "bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600" : ""}
                    ${stat.color === "purple" ? "bg-purple-50 dark:bg-purple-900/20 text-purple-600" : ""}
                    ${stat.color === "amber" ? "bg-amber-50 dark:bg-amber-900/20 text-amber-500" : ""}
                  `}
                  >
                    <span className="material-symbols-outlined">
                      {stat.icon}
                    </span>
                  </div>
                  <span
                    className={`text-xs font-bold ${stat.trend.includes("+") ? "text-emerald-500" : "text-slate-400"}`}
                  >
                    {stat.trend}
                  </span>
                </div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </p>
                <h4 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                  {stat.value}
                </h4>
              </div>
            ))}
          </div>

          {/* Engagement Chart */}
          <div className="bg-white dark:bg-[#1a192e] p-4 md:p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Engagement Trend
                </h3>
                <p className="text-xs text-slate-500">
                  Student activity over the last 30 days
                </p>
              </div>
              <select className="bg-slate-50 dark:bg-slate-800 border-none rounded-lg text-xs font-bold text-slate-600 px-3 py-1.5 focus:ring-[#5048e5] w-full sm:w-auto">
                <option>Last 30 Days</option>
                <option>Last 6 Months</option>
              </select>
            </div>

            {/* Chart Area */}
            <div className="h-48 md:h-64 w-full relative flex items-end justify-between gap-1 md:gap-2 px-1">
              <div className="absolute inset-0 border-b border-slate-100 dark:border-slate-800 flex flex-col justify-between pointer-events-none">
                {[1, 2, 3, 4].map((_, i) => (
                  <div
                    key={i}
                    className="w-full border-t border-slate-50 dark:border-slate-800/50"
                  ></div>
                ))}
              </div>
              {/* Bars */}
              {[40, 55, 45, 70, 85, 60, 95, 80, 75, 65, 50, 90].map((h, i) => (
                <div
                  key={i}
                  className={`rounded-t-sm w-full transition-all ${i === 11 ? "bg-[#5048e5]/60" : "bg-[#5048e5]/20 hover:bg-[#5048e5]/40"}`}
                  style={{ height: `${h}%` }}
                ></div>
              ))}
            </div>
            <div className="flex justify-between mt-4 px-1 text-[9px] md:text-[10px] font-bold text-slate-400 uppercase">
              <span>Day 1</span>
              <span className="hidden sm:inline">Day 10</span>
              <span className="hidden sm:inline">Day 20</span>
              <span>Today</span>
            </div>
          </div>

          {/* Lower Grid: Questions & Top Lessons */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
            {/* Recent Questions */}
            <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Student Questions
                </h3>
                <button className="text-[#5048e5] text-xs font-bold hover:underline">
                  View All
                </button>
              </div>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    name: "Alex Rivera",
                    time: "2 hours ago",
                    lesson: "React State",
                    text: "I'm struggling to understand when to use useMemo vs useCallback...",
                  },
                  {
                    name: "Jordan Smith",
                    time: "5 hours ago",
                    lesson: "Module 2 Setup",
                    text: "The installation command is throwing a peer dependency error...",
                  },
                ].map((q, i) => (
                  <div
                    key={i}
                    className="p-5 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
                  >
                    <div className="flex gap-3 mb-2">
                      <div className="size-8 rounded-full bg-slate-200 shrink-0 overflow-hidden">
                        <div className="w-full h-full bg-slate-300 animate-pulse" />{" "}
                        {/* Placeholder for images */}
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {q.name}
                        </p>
                        <p className="text-[10px] text-slate-500">
                          {q.time} • {q.lesson}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 italic">
                      &quot;{q.text}&quot;
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Lessons */}
            <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
              <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Top Performing
                </h3>
                <button className="text-[#5048e5] text-xs font-bold hover:underline">
                  Full Analytics
                </button>
              </div>
              <div className="p-5 space-y-5">
                {[
                  {
                    id: 1,
                    title: "Introduction to Tailwind CSS",
                    views: "4.2k",
                    rate: "98%",
                    color: "blue",
                  },
                  {
                    id: 2,
                    title: "Async/Await Deep Dive",
                    views: "3.8k",
                    rate: "92%",
                    color: "slate",
                  },
                  {
                    id: 3,
                    title: "Deployment to Vercel",
                    views: "3.5k",
                    rate: "89%",
                    color: "slate",
                  },
                ].map((lesson, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div
                      className={`size-10 rounded-lg ${lesson.color === "blue" ? "bg-blue-50 dark:bg-blue-900/20 text-blue-600" : "bg-slate-50 dark:bg-slate-800 text-slate-600"} flex items-center justify-center font-bold shrink-0 text-sm`}
                    >
                      #{lesson.id}
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                        {lesson.title}
                      </p>
                      <div className="flex items-center gap-3 mt-1">
                        <span className="text-[10px] text-slate-500 flex items-center gap-1">
                          <span className="material-symbols-outlined !text-[12px]">
                            visibility
                          </span>{" "}
                          {lesson.views}
                        </span>
                        <span className="text-[10px] text-emerald-500 font-bold">
                          {lesson.rate} Done
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Column: Sidebar Actions --- */}
        <aside className="col-span-12 xl:col-span-3 space-y-6">
          <div className="xl:sticky xl:top-24 space-y-6">
            {/* Management Links */}
            <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <span className="material-symbols-outlined text-[#5048e5] !text-lg">
                  tune
                </span>
                Management
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 xl:grid-cols-1 gap-3">
                {[
                  { icon: "list_alt", label: "Curriculum" },
                  { icon: "sell", label: "Pricing" },
                  { icon: "person_search", label: "Students" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href="#"
                    className="flex items-center justify-between p-3 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 group transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-slate-400 group-hover:text-[#5048e5] transition-colors">
                        {item.icon}
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                        {item.label}
                      </span>
                    </div>
                    <span className="material-symbols-outlined text-slate-300 text-sm hidden xl:block">
                      chevron_right
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Broadcast Widget */}
            <div className="bg-[#5048e5] p-6 rounded-xl text-white shadow-lg shadow-[#5048e5]/20 relative overflow-hidden">
              <div className="absolute -right-4 -top-4 opacity-10">
                <span className="material-symbols-outlined !text-[100px]">
                  campaign
                </span>
              </div>
              <h4 className="font-bold text-sm mb-2 relative z-10">
                New Update?
              </h4>
              <p className="text-xs text-white/80 mb-5 leading-relaxed relative z-10">
                Notify your 1,284 students about recent changes.
              </p>
              <button className="w-full py-2.5 bg-white text-[#5048e5] font-bold text-xs rounded-lg hover:bg-slate-50 transition-colors shadow-sm relative z-10">
                Broadcast Message
              </button>
            </div>

            {/* Cohort Widget */}
            <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">
                Next Cohort
              </p>
              <div className="flex items-center gap-4">
                <div className="flex flex-col items-center justify-center size-12 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-800 shrink-0">
                  <span className="text-[10px] font-bold text-red-500 uppercase">
                    Dec
                  </span>
                  <span className="text-lg font-black text-slate-900 dark:text-white leading-none">
                    15
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">
                    Winter 2024
                  </p>
                  <p className="text-[10px] text-slate-500 mt-0.5">
                    45/150 spots filled
                  </p>
                </div>
              </div>
              <div className="mt-4 w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div className="w-[30%] h-full bg-[#5048e5] rounded-full"></div>
              </div>
            </div>
          </div>
        </aside>
      </main>
    </div>
  );
}
