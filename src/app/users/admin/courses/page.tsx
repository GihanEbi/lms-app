"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AdminCourseCatalog() {
  const [activeTab, setActiveTab] = useState("All Courses");

  const courses = [
    {
      title: "Advanced React Frameworks",
      instructor: "Dr. Sarah Jenkins",
      category: "Development",
      duration: "12h 30m",
      rating: "4.9",
      reviews: "2.4k",
      enrollment: "12,482",
      status: "Published",
      color: "blue",
    },
    {
      title: "Machine Learning Basics",
      instructor: "Prof. David Chen",
      category: "AI & Data",
      duration: "18h 45m",
      rating: "--",
      reviews: "0",
      enrollment: "0",
      status: "Under Review",
      color: "purple",
    },
    {
      title: "Creative Typography",
      instructor: "Elena Rodriguez",
      category: "Design",
      duration: "4h 15m",
      rating: "4.7",
      reviews: "128",
      enrollment: "542",
      status: "Draft",
      color: "rose",
    },
    {
      title: "Digital Marketing Mastery",
      instructor: "Marcus Thorne",
      category: "Business",
      duration: "10h 00m",
      rating: "4.8",
      reviews: "4.1k",
      enrollment: "8,930",
      status: "Published",
      color: "emerald",
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* --- Page Title & Tabs --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Course Catalog
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Review, moderate, and organize all platform learning content.
            </p>
          </div>

          <div className="flex bg-white dark:bg-[#1a192e] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit overflow-x-auto no-scrollbar">
            {["All Courses", "Active", "Review", "Drafts"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 md:px-6 py-1.5 text-xs font-bold rounded-lg transition-all whitespace-nowrap ${
                  activeTab === tab
                    ? "bg-[#5048e5] text-white shadow-sm"
                    : "text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* --- Course Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {courses.map((course, i) => (
            <div
              key={i}
              className="group bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-[#5048e5]/5 transition-all duration-300 flex flex-col"
            >
              <div className="relative h-44 w-full overflow-hidden bg-slate-200 dark:bg-slate-800">
                {/* Placeholder for images */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg shadow-sm text-white
                    ${course.status === "Published" ? "bg-emerald-500" : ""}
                    ${course.status === "Under Review" ? "bg-amber-500" : ""}
                    ${course.status === "Draft" ? "bg-slate-400" : ""}
                  `}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2 py-0.5 rounded text-[9px] font-black uppercase tracking-tighter
                    ${course.color === "blue" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10" : ""}
                    ${course.color === "purple" ? "bg-purple-50 text-purple-600 dark:bg-purple-500/10" : ""}
                    ${course.color === "rose" ? "bg-rose-50 text-rose-600 dark:bg-rose-500/10" : ""}
                    ${course.color === "emerald" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : ""}
                  `}
                  >
                    {course.category}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400">
                    • {course.duration}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white leading-tight mb-2 group-hover:text-[#5048e5] transition-colors">
                  {course.title}
                </h3>

                <p className="text-xs text-slate-500 flex items-center gap-1.5 mb-6">
                  <span className="material-symbols-outlined text-[14px]">
                    person
                  </span>
                  {course.instructor}
                </p>

                <div className="mt-auto pt-4 border-t border-slate-50 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <span className="material-symbols-outlined text-[16px] text-amber-400 fill-[1]">
                      star
                    </span>
                    <span className="text-sm font-bold">{course.rating}</span>
                    <span className="text-[10px] font-bold text-slate-400">
                      ({course.reviews})
                    </span>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] text-slate-400 uppercase font-black leading-none mb-1">
                      Students
                    </p>
                    <p className="text-sm font-black text-slate-900 dark:text-white">
                      {course.enrollment}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- Pagination --- */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 py-6 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-tight">
            Showing <span className="text-slate-900 dark:text-white">6</span> of{" "}
            <span className="text-slate-900 dark:text-white">842</span> courses
          </p>
          <div className="flex items-center gap-2">
            <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">
                chevron_left
              </span>
            </button>
            <button className="size-9 flex items-center justify-center rounded-lg bg-[#5048e5] text-white font-black text-xs">
              1
            </button>
            <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-xs hover:text-[#5048e5]">
              2
            </button>
            <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 font-bold text-xs hover:text-[#5048e5]">
              3
            </button>
            <button className="size-9 flex items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 hover:bg-white dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined text-xl">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
