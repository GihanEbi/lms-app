"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CurriculumBuilderPage() {
  const router = useRouter();
  const [sections, setSections] = useState([
    { id: 1, title: "Introduction to Web Development" },
    { id: 2, title: "Setting up the Environment" },
  ]);

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Sticky Header (Consistent with Basic Info) --- */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            {/* Title & Back */}
            <div className="flex items-center gap-3">
              <Link
                href="/users/instructor/portal/courses/create-course/basic-info"
                className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  Build Curriculum
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Step 2 of 4: Course Content
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button className="flex-1 sm:flex-none px-4 md:px-6 py-2.5 text-slate-600 dark:text-slate-400 font-bold text-sm rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                Save Draft
              </button>
              <button
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 md:px-8 py-2.5 bg-[#5048e5] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#5048e5]/25 hover:bg-[#5048e5]/90 transition-all active:scale-95"
                onClick={() => {
                  router.push(
                    "/users/instructor/portal/courses/create-course/pricing",
                  );
                }}
              >
                Save & Next
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-between pb-4 max-w-2xl mx-auto">
            {[
              { label: "Details", active: true },
              { label: "Curriculum", active: true },
              { label: "Pricing", active: false },
              { label: "Review", active: false },
            ].map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`h-1.5 w-full rounded-full transition-colors ${
                      step.active
                        ? "bg-[#5048e5]"
                        : "bg-slate-200 dark:bg-slate-800"
                    }`}
                  ></div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${
                      step.active ? "text-[#5048e5]" : "text-slate-400"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < 3 && (
                  <div className="w-4 sm:w-8 h-px bg-transparent"></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Form Column (Left) */}
          <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">
                    account_tree
                  </span>
                </div>
                <h3 className="text-lg font-bold">Course Sections</h3>
              </div>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-[#5048e5]/10 text-[#5048e5] rounded-xl text-xs font-bold hover:bg-indigo-100 transition-all border border-[#5048e5]/20">
                <span className="material-symbols-outlined text-base">
                  auto_awesome
                </span>
                Generate with AI
              </button>
            </div>

            {/* Sections Builder */}
            <div className="space-y-6">
              {sections.map((section, idx) => (
                <div
                  key={section.id}
                  className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm"
                >
                  {/* Section Header */}
                  <div className="bg-slate-50 dark:bg-slate-800/50 px-4 md:px-6 py-4 flex items-center gap-3 border-b border-slate-200 dark:border-slate-800">
                    <span className="material-symbols-outlined text-slate-400 cursor-grab">
                      drag_indicator
                    </span>
                    <div className="flex flex-col sm:flex-row sm:items-center flex-1 gap-1">
                      <span className="text-[10px] font-black text-[#5048e5] uppercase tracking-widest">
                        Section {idx + 1}:
                      </span>
                      <input
                        className="flex-1 bg-transparent border-none p-0 text-sm font-bold focus:ring-0"
                        defaultValue={section.title}
                      />
                    </div>
                    <button className="text-slate-400 hover:text-red-500 transition-colors">
                      <span className="material-symbols-outlined text-xl">
                        delete
                      </span>
                    </button>
                  </div>

                  {/* Lessons List */}
                  <div className="p-4 space-y-3">
                    {/* Example Lesson Row */}
                    <div className="flex items-center gap-3 p-3 bg-white dark:bg-[#1a192e] border border-slate-100 dark:border-slate-800 rounded-xl hover:border-[#5048e5]/30 transition-all group">
                      <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined">
                          play_circle
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          className="w-full bg-transparent border-none p-0 text-sm font-semibold focus:ring-0 truncate"
                          defaultValue="Introduction to the framework"
                        />
                      </div>
                      <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-slate-800 rounded-lg">
                        <span className="material-symbols-outlined text-xs text-slate-400">
                          schedule
                        </span>
                        <span className="text-[10px] font-bold">05:00</span>
                      </div>
                      <button className="p-1 text-slate-300 hover:text-slate-600">
                        <span className="material-symbols-outlined text-lg">
                          settings
                        </span>
                      </button>
                    </div>

                    {/* Content Type Selector */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
                      {[
                        {
                          icon: "play_circle",
                          label: "VIDEO",
                          color: "hover:border-blue-400 hover:text-blue-500",
                        },
                        {
                          icon: "description",
                          label: "READING",
                          color:
                            "hover:border-emerald-400 hover:text-emerald-500",
                        },
                        {
                          icon: "quiz",
                          label: "QUIZ",
                          color:
                            "hover:border-purple-400 hover:text-purple-500",
                        },
                        {
                          icon: "assignment",
                          label: "TASK",
                          color: "hover:border-amber-400 hover:text-amber-500",
                        },
                      ].map((type) => (
                        <button
                          key={type.label}
                          className={`flex items-center justify-center gap-2 py-2 border border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-400 transition-all text-[10px] font-bold ${type.color}`}
                        >
                          <span className="material-symbols-outlined text-base">
                            {type.icon}
                          </span>
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <button className="w-full py-8 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center text-slate-400 hover:text-[#5048e5] hover:border-[#5048e5]/40 transition-all group bg-white dark:bg-transparent">
                <span className="material-symbols-outlined text-3xl mb-2">
                  add_box
                </span>
                <span className="text-sm font-bold uppercase tracking-widest">
                  Add New Section
                </span>
              </button>
            </div>
          </div>

          {/* Right Column (Sidebar Preview) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-48 space-y-6">
              <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <h4 className="font-bold text-sm">Student Preview</h4>
                  <span className="px-2 py-0.5 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 text-[10px] font-black uppercase rounded">
                    Live Update
                  </span>
                </div>
                <div className="p-5 space-y-4 max-h-[400px] overflow-y-auto">
                  <div className="space-y-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      1. Introduction
                    </p>
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                      <span className="material-symbols-outlined text-blue-500 text-lg">
                        play_circle
                      </span>
                      <span className="text-xs font-semibold truncate">
                        Introduction to the framework
                      </span>
                    </div>
                  </div>
                  <div className="h-20 border-2 border-dashed border-slate-100 dark:border-slate-800 rounded-xl flex items-center justify-center">
                    <p className="text-[10px] text-slate-400 italic">
                      Preview your sections here
                    </p>
                  </div>
                </div>
                <div className="p-5 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex justify-between text-xs font-bold mb-4">
                    <span className="text-slate-500">Total Lessons</span>
                    <span className="text-[#5048e5]">1 Lesson • 5m</span>
                  </div>
                  <button className="w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-xs font-bold flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined text-lg">
                      visibility
                    </span>
                    Course Player Preview
                  </button>
                </div>
              </div>

              {/* Tips Box */}
              <div className="bg-indigo-50 dark:bg-[#5048e5]/10 rounded-2xl border border-indigo-100 dark:border-[#5048e5]/20 p-5 flex gap-4">
                <span className="material-symbols-outlined text-[#5048e5]">
                  lightbulb
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Breaking sections into{" "}
                  <span className="font-bold">5-10 minute</span> videos helps
                  maintain student engagement and completion rates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- Mobile Actions (Visible only on mobile at bottom) --- */}
      <div className="flex md:hidden justify-between items-center p-4 bg-white dark:bg-[#1a192e] border-t border-slate-200 dark:border-slate-800 sticky bottom-0 z-50">
        <button className="text-slate-500 font-bold text-sm px-4">
          Cancel
        </button>
        <button className="px-8 py-3 bg-[#5048e5] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#5048e5]/20">
          Save & Next
        </button>
      </div>
    </div>
  );
}
