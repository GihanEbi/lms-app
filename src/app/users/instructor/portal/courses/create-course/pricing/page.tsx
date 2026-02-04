"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function PricingSettingsPage() {
  const router = useRouter();
  const [pricingTier, setPricingTier] = useState("paid");

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between py-4 gap-4">
            {/* Title & Back */}
            <div className="flex items-center gap-3">
              <Link
                href="/users/instructor/portal/courses/create-course/curriculum"
                className="size-10 flex items-center justify-center rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 transition-colors"
              >
                <span className="material-symbols-outlined">arrow_back</span>
              </Link>
              <div>
                <h2 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-tight">
                  Pricing & Settings
                </h2>
                <p className="text-xs text-slate-500 font-medium">
                  Step 3 of 4: Course Publishing
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
                    "/users/instructor/portal/courses/create-course/review",
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
              { label: "Pricing", active: true },
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
            {/* 1. Pricing Selection */}
            <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">payments</span>
                </div>
                <h3 className="text-lg font-bold">Pricing Selection</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                <label
                  onClick={() => setPricingTier("paid")}
                  className={`relative cursor-pointer p-4 border-2 rounded-xl transition-all ${pricingTier === "paid" ? "border-[#5048e5] bg-[#5048e5]/5" : "border-slate-100 dark:border-slate-800"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">Paid Tier</span>
                    <div
                      className={`size-4 rounded-full border-2 flex items-center justify-center ${pricingTier === "paid" ? "border-[#5048e5]" : "border-slate-300"}`}
                    >
                      {pricingTier === "paid" && (
                        <div className="size-2 rounded-full bg-[#5048e5]"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Earn revenue from students globally.
                  </p>
                </label>

                <label
                  onClick={() => setPricingTier("free")}
                  className={`relative cursor-pointer p-4 border-2 rounded-xl transition-all ${pricingTier === "free" ? "border-[#5048e5] bg-[#5048e5]/5" : "border-slate-100 dark:border-slate-800"}`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className="font-bold text-sm">Free Tier</span>
                    <div
                      className={`size-4 rounded-full border-2 flex items-center justify-center ${pricingTier === "free" ? "border-[#5048e5]" : "border-slate-300"}`}
                    >
                      {pricingTier === "free" && (
                        <div className="size-2 rounded-full bg-[#5048e5]"></div>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-slate-500">
                    Max student reach for free.
                  </p>
                </label>
              </div>

              {pricingTier === "paid" && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 animate-in fade-in slide-in-from-top-2">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Currency
                    </label>
                    <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm">
                      <option>USD - US Dollar</option>
                      <option>EUR - Euro</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Price Point
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
                        $
                      </span>
                      <input
                        type="number"
                        className="w-full pl-8 pr-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm"
                        placeholder="89.99"
                      />
                    </div>
                  </div>
                </div>
              )}
            </section>

            {/* 2. Coupon Generator */}
            <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">sell</span>
                </div>
                <h3 className="text-lg font-bold">Coupon Code Generator</h3>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  className="flex-1 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm"
                  placeholder="e.g. EARLYBIRD50"
                />
                <select className="w-full sm:w-32 px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm">
                  <option>20% OFF</option>
                  <option>50% OFF</option>
                  <option>Free</option>
                </select>
                <button className="px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-colors">
                  Generate
                </button>
              </div>
            </section>

            {/* 3. Additional Settings */}
            <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-5 md:p-8 shadow-sm">
              <div className="flex items-center gap-3 mb-6 md:mb-8">
                <div className="size-10 rounded-lg bg-indigo-50 dark:bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                  <span className="material-symbols-outlined">
                    settings_applications
                  </span>
                </div>
                <h3 className="text-lg font-bold">Course Settings</h3>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Primary Language
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm">
                    <option>English (US)</option>
                    <option>Spanish</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Difficulty Level
                  </label>
                  <select className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-[#5048e5] outline-none text-sm">
                    <option>Beginner</option>
                    <option>Intermediate</option>
                    <option selected>Advanced</option>
                  </select>
                </div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/30 rounded-xl flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold">
                    Issue Completion Certificate
                  </p>
                  <p className="text-xs text-slate-500">
                    Allow students to earn a verified certificate.
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    defaultChecked
                  />
                  <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5048e5]"></div>
                </label>
              </div>
            </section>

            {/* Mobile Actions */}
            <div className="flex md:hidden justify-between items-center pt-4">
              <button className="text-slate-500 font-bold text-sm px-4">
                Cancel
              </button>
              <button className="px-8 py-3 bg-[#5048e5] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#5048e5]/20">
                Publish Course
              </button>
            </div>
          </div>

          {/* Right Column: Sticky Checklist */}
          <div className="col-span-12 lg:col-span-4 space-y-6">
            <div className="lg:sticky lg:top-48 space-y-6">
              <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-6">Publish Checklist</h3>
                  <div className="space-y-4 mb-8">
                    {[
                      {
                        label: "Curriculum",
                        status: "complete",
                        desc: "48 Lectures complete",
                      },
                      {
                        label: "Landing Page",
                        status: "complete",
                        desc: "Thumbnail optimized",
                      },
                      {
                        label: "Pricing Policy",
                        status: "info",
                        desc: "Review marketplace commission",
                      },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-3">
                        <span
                          className={`material-symbols-outlined !text-lg ${item.status === "complete" ? "text-emerald-500" : "text-[#5048e5]"}`}
                        >
                          {item.status === "complete" ? "check_circle" : "info"}
                        </span>
                        <div className="flex-1">
                          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">
                            {item.label}
                          </p>
                          <p className="text-xs text-slate-400">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-3">
                    <button className="w-full py-4 bg-[#5048e5] text-white rounded-xl text-sm font-black shadow-lg shadow-[#5048e5]/25 hover:-translate-y-0.5 transition-all">
                      PUBLISH COURSE
                    </button>
                    <button className="w-full py-3 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors">
                      Save as Draft
                    </button>
                  </div>
                </div>
              </div>

              {/* Tip Box */}
              <div className="bg-indigo-50 dark:bg-[#5048e5]/10 rounded-2xl border border-indigo-100 dark:border-[#5048e5]/20 p-5 flex gap-4">
                <span className="material-symbols-outlined text-[#5048e5]">
                  lightbulb
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  Courses priced between{" "}
                  <span className="font-bold text-[#5048e5]">$49.99</span> and{" "}
                  <span className="font-bold text-[#5048e5]">$99.99</span> see
                  the highest ROI.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
