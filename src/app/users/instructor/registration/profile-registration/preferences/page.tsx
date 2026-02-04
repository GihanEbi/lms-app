"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorRegistrationStep2() {
  const router = useRouter();
  const [studentCapacity, setStudentCapacity] = useState(50);

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding to step 3...");
    router.push(
      "/users/instructor/registration/profile-registration/verification",
    );
  };

  const handleBack = () => {
    router.push(
      "/users/instructor/registration/profile-registration/personal_info",
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {/* --- Progress Steps --- */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Step 1: Completed */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Personal Info
              </span>
            </div>
            <div className="h-1 flex-1 bg-emerald-500 mx-2 -mt-6"></div>

            {/* Step 2: Active */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-[#5048e5] text-white flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-xs font-bold text-[#5048e5]">
                Preferences
              </span>
            </div>
            <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 mx-2 -mt-6"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-xs font-medium text-slate-500">
                Verification
              </span>
            </div>
            <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 mx-2 -mt-6"></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <span className="text-xs font-medium text-slate-500">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* --- Left Column: Preferences Form --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <form className="space-y-10" onSubmit={handleNext}>
                {/* Areas of Expertise */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      psychology
                    </span>
                    Areas of Expertise
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Select the subjects you are qualified to teach. This helps
                    us match you with the right students.
                  </p>
                  <div className="space-y-4">
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                        search
                      </span>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border-slate-200 dark:border-slate-700 rounded-xl pl-11 pr-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        placeholder="Search subjects (e.g. Data Science, UI Design...)"
                        type="text"
                      />
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Computer Science",
                        "Data Science",
                        "Machine Learning",
                      ].map((subject) => (
                        <span
                          key={subject}
                          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-xs font-bold border border-blue-100 dark:border-blue-800"
                        >
                          {subject}{" "}
                          <button
                            type="button"
                            className="material-symbols-outlined text-base hover:text-blue-900 dark:hover:text-blue-100"
                          >
                            close
                          </button>
                        </span>
                      ))}
                      <button
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 rounded-full text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-base">
                          add
                        </span>{" "}
                        Add Subject
                      </button>
                    </div>
                  </div>
                </section>

                {/* Teaching Methodology */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      history_edu
                    </span>
                    Teaching Methodology
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">
                    Describe your unique approach to teaching and how you engage
                    with learners.
                  </p>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="bg-[#f6f6f8] dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-2 flex gap-1">
                      {[
                        "format_bold",
                        "format_italic",
                        "format_list_bulleted",
                        "link",
                      ].map((icon) => (
                        <button
                          key={icon}
                          type="button"
                          className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined text-lg">
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="w-full bg-white dark:bg-[#1a192e] border-none px-4 py-4 text-sm focus:ring-0 min-h-[160px] outline-none dark:text-white resize-none"
                      placeholder="I believe in a project-based learning approach where students apply theoretical concepts to real-world scenarios immediately..."
                    ></textarea>
                  </div>
                </section>

                {/* Availability Grid */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#5048e5]">
                        calendar_month
                      </span>
                      Weekly Availability
                    </h3>
                    <span className="text-xs text-slate-500 bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded">
                      Timezone: UTC -05:00
                    </span>
                  </div>
                  <div className="overflow-x-auto pb-2">
                    <div className="min-w-[600px]">
                      <div className="grid grid-cols-8 gap-0 text-sm">
                        {/* Header Row */}
                        <div className="p-2"></div>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(
                          (day, i) => (
                            <div
                              key={day}
                              className={`p-2 text-center text-xs font-bold uppercase ${i >= 5 ? "text-[#5048e5]" : "text-slate-500"}`}
                            >
                              {day}
                            </div>
                          ),
                        )}

                        {/* Morning Row */}
                        <div className="p-2 text-[10px] font-bold text-slate-400 flex items-center justify-end">
                          09:00 AM
                        </div>
                        {[true, true, true, true, true, false, false].map(
                          (active, i) => (
                            <div
                              key={`am-${i}`}
                              className={`h-8 border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-[#5048e5]/10 transition-colors ${active ? "bg-[#5048e5]/20 border-[#5048e5]/30" : ""}`}
                            ></div>
                          ),
                        )}

                        {/* Afternoon Row */}
                        <div className="p-2 text-[10px] font-bold text-slate-400 flex items-center justify-end">
                          12:00 PM
                        </div>
                        {[false, false, false, false, false, true, true].map(
                          (active, i) => (
                            <div
                              key={`pm-${i}`}
                              className={`h-8 border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-[#5048e5]/10 transition-colors ${active ? "bg-[#5048e5]/20 border-[#5048e5]/30" : ""}`}
                            ></div>
                          ),
                        )}

                        {/* Evening Row */}
                        <div className="p-2 text-[10px] font-bold text-slate-400 flex items-center justify-end">
                          03:00 PM
                        </div>
                        {[true, true, true, true, true, false, false].map(
                          (active, i) => (
                            <div
                              key={`eve-${i}`}
                              className={`h-8 border border-slate-100 dark:border-slate-800 cursor-pointer hover:bg-[#5048e5]/10 transition-colors ${active ? "bg-[#5048e5]/20 border-[#5048e5]/30" : ""}`}
                            ></div>
                          ),
                        )}
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 mt-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">
                      info
                    </span>
                    Click or drag to highlight your available slots for live
                    sessions and office hours.
                  </p>
                </section>

                {/* Capacity Slider */}
                <section>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#5048e5]">
                        group
                      </span>
                      Student Capacity
                    </h3>
                    <div className="px-4 py-1.5 bg-[#5048e5]/10 text-[#5048e5] rounded-lg text-sm font-bold">
                      Max <span>{studentCapacity}</span> Students
                    </div>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="200"
                    step="5"
                    value={studentCapacity}
                    onChange={(e) => setStudentCapacity(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-[#5048e5]"
                  />
                  <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    <span>Small Group (5)</span>
                    <span>Medium (100)</span>
                    <span>Large (200+)</span>
                  </div>
                </section>

                {/* Links */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      share
                    </span>
                    Professional Links
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        LinkedIn Profile
                      </label>
                      <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-xs uppercase">
                          linkedin.com/in/
                        </span>
                        <input
                          className="w-full bg-[#f6f6f8] dark:bg-[#121121] border-slate-200 dark:border-slate-700 rounded-xl pl-28 pr-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                          placeholder="username"
                          type="text"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Personal Website / Portfolio
                      </label>
                      <div className="relative">
                        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                          language
                        </span>
                        <input
                          className="w-full bg-[#f6f6f8] dark:bg-[#121121] border-slate-200 dark:border-slate-700 rounded-xl pl-11 pr-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                          placeholder="https://yourwebsite.com"
                          type="url"
                        />
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <button
                onClick={handleBack}
                className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Previous Step
              </button>
              <button
                onClick={handleNext}
                className="bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] hover:opacity-90 text-white font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-[#5048e5]/20 active:scale-95"
              >
                Next: Verification
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* --- Right Column: Sidebar Info --- */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Teaching Tips */}
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Teaching Tips
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-10 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">
                      tips_and_updates
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Expertise Tags
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Select at least 3 core subjects to improve your course
                      discoverability by 40%.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">
                      video_camera_front
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Live Session Capacity
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      We recommend starting with 25-50 students for live
                      sessions to ensure high engagement.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">forum</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Methodology Matters
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Instructors who describe active learning techniques see 2x
                      higher enrollment rates.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#5048e5]/5 dark:bg-[#5048e5]/10 rounded-xl border border-[#5048e5]/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#5048e5] text-sm">
                    groups
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    Community Insights
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Join our <span className="font-bold">Instructor Guild</span>{" "}
                  to join monthly webinars on AI-enhanced pedagogy.
                </p>
                <button className="mt-3 text-[#5048e5] text-xs font-bold hover:underline">
                  View Guild Calendar
                </button>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-emerald-500/5 rounded-2xl border border-emerald-500/10 p-6 italic text-slate-600 dark:text-slate-400">
              <p className="text-sm">
                &quot;The availability grid makes scheduling live labs so much
                easier. Students from across the globe know exactly when they
                can reach me.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3 not-italic">
                <div
                  className="size-8 rounded-full bg-slate-300 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://ui-avatars.com/api/?name=Aris+Thorne&background=random")',
                  }}
                ></div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Dr. Aris Thorne
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Physics & Quantum Computing
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-7xl mx-auto px-8 py-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© 2023 EduLearn LMS Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[#5048e5]">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#5048e5]">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-[#5048e5]">
            Instructor Agreement
          </Link>
        </div>
      </footer>
    </div>
  );
}
