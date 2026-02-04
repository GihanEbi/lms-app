"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CourseReviewPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      {/* --- Sticky Header (Consistent with Steps 1-3) --- */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            {/* Title & Back */}
            <div className="flex items-center gap-3">
              <Link
                href="/users/instructor/portal/courses/create-course/pricing"
                className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  Review Course
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Step 4 of 4: Final Review
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
                    "/users/instructor/portal/courses",
                  );
                }}
              >
                Publish Course
                <span className="material-symbols-outlined text-lg">
                  rocket_launch
                </span>
              </button>
            </div>
          </div>

          {/* Stepper Progress */}
          <div className="flex items-center justify-between pb-4 max-w-2xl mx-auto px-4">
            {[
              { label: "Details", active: true },
              { label: "Curriculum", active: true },
              { label: "Pricing", active: true },
              { label: "Review", active: true },
            ].map((step, idx) => (
              <React.Fragment key={step.label}>
                <div className="flex flex-col items-center gap-1.5 flex-1">
                  <div
                    className={`h-1.5 w-full rounded-full ${step.active ? "bg-[#5048e5]" : "bg-slate-200 dark:bg-slate-800"}`}
                  ></div>
                  <span
                    className={`text-[10px] sm:text-xs font-bold uppercase tracking-wider ${step.active ? "text-[#5048e5]" : "text-slate-400"}`}
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
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 flex-1">
        <div className="grid grid-cols-12 gap-6 md:gap-8">
          {/* Left Column: Review Sections */}
          <div className="col-span-12 lg:col-span-8 space-y-4">
            {/* Section 1: Details */}
            <details
              className="group bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm"
              open
            >
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                    <span className="material-symbols-outlined">info</span>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold">
                      Course Details
                    </h3>
                    <p className="text-xs text-slate-500">
                      Title, Subtitle, and Description
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-[#5048e5] hover:bg-[#5048e5]/10 px-3 py-1.5 rounded-lg transition-colors">
                    <span className="material-symbols-outlined !text-sm">
                      edit
                    </span>{" "}
                    Edit
                  </button>
                  <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                    expand_more
                  </span>
                </div>
              </summary>
              <div className="px-5 md:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-6">
                <div className="mt-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Title
                  </h4>
                  <p className="font-bold text-slate-900 dark:text-white">
                    Advanced React Masterclass: Built for Scale
                  </p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Description
                  </h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    Go beyond the basics. This course dives deep into internal
                    workings of React, covering concurrent mode, server
                    components, and enterprise-grade state management.
                  </p>
                </div>
                <div className="aspect-video w-full max-w-sm rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="w-full h-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-400">
                    <span className="material-symbols-outlined text-4xl">
                      image
                    </span>
                  </div>
                </div>
              </div>
            </details>

            {/* Section 2: Curriculum Overview */}
            <details className="group bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-purple-50 dark:bg-purple-900/20 flex items-center justify-center text-purple-600">
                    <span className="material-symbols-outlined">menu_book</span>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold">
                      Curriculum
                    </h3>
                    <p className="text-xs text-slate-500">
                      12 Sections • 48 Lessons • 14.5 Hours
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-6 pt-2 border-t border-slate-100 dark:border-slate-800 space-y-3">
                {[
                  {
                    id: "01",
                    title: "Introduction to Architecture",
                    lessons: 4,
                  },
                  {
                    id: "02",
                    title: "Advanced State Synchronization",
                    lessons: 8,
                  },
                  { id: "03", title: "Performance Profiling", lessons: 12 },
                ].map((sec) => (
                  <div
                    key={sec.id}
                    className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-100 dark:border-slate-800/50"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-black text-slate-400">
                        {sec.id}
                      </span>
                      <span className="text-sm font-semibold">{sec.title}</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      {sec.lessons} Lessons
                    </span>
                  </div>
                ))}
              </div>
            </details>

            {/* Section 3: Pricing */}
            <details className="group bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
              <summary className="flex items-center justify-between p-5 md:p-6 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors list-none">
                <div className="flex items-center gap-4">
                  <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 flex items-center justify-center text-emerald-600">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-bold">Pricing</h3>
                    <p className="text-xs text-slate-500">
                      Tier: Paid • List Price: $89.99
                    </p>
                  </div>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-open:rotate-180 transition-transform">
                  expand_more
                </span>
              </summary>
              <div className="px-5 md:px-6 pb-6 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Price
                  </p>
                  <p className="text-xl font-bold text-[#5048e5]">
                    $89.99{" "}
                    <span className="text-xs text-slate-400 font-normal">
                      USD
                    </span>
                  </p>
                </div>
                <div className="p-4 rounded-xl border border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                    Coupon
                  </p>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-900/40 px-2 py-0.5 rounded">
                      EARLYBIRD50
                    </span>
                  </div>
                </div>
              </div>
            </details>
          </div>

          {/* Right Column: AI Audit & Score (Sticky) */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-48 space-y-6">
              <div className="bg-[#1a192e] rounded-2xl border border-slate-800 overflow-hidden shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="size-8 rounded-lg bg-[#5048e5]/20 flex items-center justify-center">
                      <span className="material-symbols-outlined text-[#5048e5]">
                        auto_awesome
                      </span>
                    </div>
                    <h3 className="text-lg font-bold text-white">
                      AI Quality Audit
                    </h3>
                  </div>

                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <p className="text-3xl font-black text-white">94/100</p>
                      <p className="text-xs text-slate-400 font-medium">
                        Quality Score
                      </p>
                    </div>
                    <div className="size-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-500 flex items-center justify-center">
                      <span className="text-[10px] font-black text-emerald-500">
                        EXCEL
                      </span>
                    </div>
                  </div>

                  <div className="space-y-5">
                    <div>
                      <h4 className="text-[10px] font-black text-[#5048e5] uppercase tracking-widest mb-3">
                        Strengths
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2.5 text-xs text-slate-300">
                          <span className="material-symbols-outlined text-emerald-400 !text-sm">
                            verified
                          </span>
                          High audio clarity recorded
                        </li>
                        <li className="flex items-start gap-2.5 text-xs text-slate-300">
                          <span className="material-symbols-outlined text-emerald-400 !text-sm">
                            verified
                          </span>
                          Structural pacing is excellent
                        </li>
                      </ul>
                    </div>
                    <div className="pt-4 border-t border-slate-800">
                      <h4 className="text-[10px] font-black text-amber-500 uppercase tracking-widest mb-3">
                        Recommendations
                      </h4>
                      <ul className="space-y-2">
                        <li className="flex items-start gap-2.5 text-xs text-slate-300">
                          <span className="material-symbols-outlined text-amber-400 !text-sm">
                            warning
                          </span>
                          Add quizzes to Section 3
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 text-center border-t border-slate-800">
                  <p className="text-[10px] text-slate-500 italic uppercase font-bold tracking-tighter">
                    Ready for marketplace standards
                  </p>
                </div>
              </div>

              {/* Tips */}
              <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
                <h4 className="font-bold text-sm mb-4">Final Check</h4>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Make sure your welcome message is engaging. You can edit
                  content even after the course goes live.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* --- Sticky Footer --- */}
      <footer className="sticky bottom-0 z-50 bg-white dark:bg-[#1a192e] border-t border-slate-200 dark:border-slate-800 px-4 sm:px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <p className="text-xs text-slate-500 hidden md:block">
            <span className="font-bold">Final Review:</span> Verify all details
            before publishing.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
            onClick={() =>
              router.push(
                "/users/instructor/portal/courses/create-course/basic-info",
              )
            }
          >
            Edit
          </button>
          <button className="px-8 py-3 bg-[#5048e5] text-white rounded-xl text-sm font-black shadow-lg shadow-[#5048e5]/25 hover:shadow-xl hover:-translate-y-0.5 transition-all">
            CONFIRM & PUBLISH
          </button>
        </div>
      </footer>
    </div>
  );
}
