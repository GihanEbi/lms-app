"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseCreationPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Sticky Header --- */}
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
                  Create New Course
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Step 1 of 4: Course Details
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
                    "/users/instructor/portal/courses/create-course/curriculum",
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
              { label: "Curriculum", active: false },
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
          {/* Form Column */}
          <div className="col-span-12 lg:col-span-8 space-y-6 md:space-y-8">
            {/* 1. Basic Info */}
            <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">info</span>
                </div>
                <h3 className="text-lg font-bold">Basic Information</h3>
              </div>

              <div className="space-y-5 md:space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Course Title
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] focus:border-transparent outline-none transition-all text-sm md:text-base"
                    placeholder="e.g. Mastering Next.js 14"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] focus:border-transparent outline-none transition-all text-sm"
                    placeholder="Short summary to grab student attention"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Category
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm cursor-pointer">
                      <option>Development</option>
                      <option>Design</option>
                      <option>Business</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Experience Level
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm cursor-pointer">
                      <option>Beginner</option>
                      <option>Intermediate</option>
                      <option>Advanced</option>
                    </select>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Description */}
            <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">description</span>
                </div>
                <h3 className="text-lg font-bold">Course Description</h3>
              </div>

              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-[#5048e5] transition-all">
                <div className="bg-slate-50 dark:bg-slate-800/50 p-2 border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-1">
                  {[
                    "format_bold",
                    "format_italic",
                    "format_list_bulleted",
                    "link",
                    "undo",
                    "redo",
                  ].map((icon) => (
                    <button
                      key={icon}
                      className="p-2 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition-colors text-slate-600 dark:text-slate-400"
                    >
                      <span className="material-symbols-outlined !text-xl">
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
                <textarea
                  rows={8}
                  className="w-full px-4 py-4 bg-transparent border-none focus:ring-0 text-sm outline-none dark:text-slate-200 resize-none"
                  placeholder="What will students learn in your course?"
                ></textarea>
              </div>
            </section>

            {/* 3. Media */}
            <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">
                    movie_filter
                  </span>
                </div>
                <h3 className="text-lg font-bold">Media Assets</h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <p className="text-sm font-bold mb-3">Course Thumbnail</p>
                  <div className="aspect-video w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/30 hover:border-[#5048e5]/50 transition-all cursor-pointer group">
                    <span className="material-symbols-outlined text-3xl text-slate-400 group-hover:text-[#5048e5] mb-2 transition-colors">
                      cloud_upload
                    </span>
                    <p className="text-xs font-bold">Upload Image</p>
                    <p className="text-[10px] text-slate-500 mt-1">
                      1280x720 (PNG, JPG)
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-bold mb-3">Promo Video URL</p>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                        link
                      </span>
                      <input
                        type="text"
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm transition-all"
                        placeholder="Youtube or Vimeo link"
                      />
                    </div>
                  </div>
                  <div className="p-4 bg-indigo-50 dark:bg-[#5048e5]/10 rounded-xl border border-indigo-100 dark:border-[#5048e5]/20 flex gap-3">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      lightbulb
                    </span>
                    <p className="text-[11px] text-indigo-800 dark:text-indigo-300 leading-relaxed">
                      Courses with a high-quality promo video have an **80%
                      higher** enrollment rate.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Mobile Actions (Visible only on mobile at bottom of form) */}
            <div className="flex md:hidden justify-between items-center pt-4">
              <button className="text-slate-500 font-bold text-sm px-4">
                Cancel
              </button>
              <button className="px-8 py-3 bg-[#5048e5] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#5048e5]/20">
                Continue
              </button>
            </div>
          </div>

          {/* Right Column: AI & Help (Desktop Side, Mobile Stack) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-48 space-y-6">
              {/* AI Assistant Card */}
              <div className="bg-[#1a192e] rounded-2xl p-6 text-white shadow-xl relative overflow-hidden border border-slate-800">
                <div className="absolute -right-6 -top-6 size-24 bg-[#5048e5]/20 rounded-full blur-2xl"></div>

                <div className="flex items-center gap-2 mb-6">
                  <div className="size-8 rounded-lg bg-[#5048e5] flex items-center justify-center">
                    <span className="material-symbols-outlined text-white text-lg">
                      auto_awesome
                    </span>
                  </div>
                  <h4 className="font-bold text-sm">AI Content Assistant</h4>
                </div>

                <div className="space-y-5">
                  <div>
                    <div className="flex justify-between items-end mb-2">
                      <p className="text-[10px] font-black uppercase tracking-[0.1em] text-[#5048e5]">
                        Optimizing Score
                      </p>
                      <span className="text-xs font-bold text-indigo-400">
                        42%
                      </span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-[#5048e5] w-[42%] transition-all duration-1000"></div>
                    </div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs text-slate-300 leading-relaxed italic">
                      &quot;Try adding keywords like{" "}
                      <span className="text-white font-medium">Full-stack</span>{" "}
                      or{" "}
                      <span className="text-white font-medium">Hands-on</span>{" "}
                      to your title to increase search reach.&quot;
                    </p>
                  </div>
                </div>

                <button className="w-full mt-6 py-3 bg-[#5048e5] hover:bg-[#5048e5]/80 rounded-xl text-xs font-bold transition-all shadow-lg shadow-[#5048e5]/20">
                  Optimize My Content
                </button>
              </div>

              {/* Help Card */}
              <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
                <h4 className="font-bold text-sm mb-4">Instructor Tips</h4>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      check_circle
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Title should be catchy but clearly explain the outcome.
                    </p>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-slate-400 text-lg">
                      check_circle
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Subtitles should be under 120 characters.
                    </p>
                  </li>
                </ul>
                <hr className="my-5 border-slate-100 dark:border-slate-800" />
                <Link
                  href="#"
                  className="flex items-center justify-center gap-2 text-xs font-bold text-[#5048e5] hover:underline"
                >
                  View Quality Standards
                  <span className="material-symbols-outlined text-sm">
                    open_in_new
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
