"use client";

import React from "react";

export default function InstructorDashboardPage() {
  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Main Dashboard Content --- */}
      <div className="p-8 max-w-7xl mx-auto">
        {/* Page Heading */}
        <div className="mb-8">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            Welcome back, Dr. Sarah
          </h2>
          <p className="text-slate-500 font-medium mt-1">
            Tuesday, October 24th, 2023 • You have 3 reviews due today
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Stat 1 */}
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-[#5048e5]/10 text-[#5048e5] rounded-lg">
                <span className="material-symbols-outlined">menu_book</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold">
                +0% this month
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Active Courses</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              5
            </h3>
          </div>

          {/* Stat 2 */}
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded-lg">
                <span className="material-symbols-outlined">person</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold">+12.5%</span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Total Students</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              347
            </h3>
          </div>

          {/* Stat 3 */}
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-[#5048e5]/20 dark:border-slate-800 shadow-sm border-l-4 border-l-orange-500">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-600 rounded-lg">
                <span className="material-symbols-outlined">rate_review</span>
              </div>
              <span className="text-orange-500 text-xs font-bold">
                Action Required
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">
              Pending Reviews
            </p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              23
            </h3>
          </div>

          {/* Stat 4 */}
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 bg-amber-100 dark:bg-amber-900/30 text-amber-600 rounded-lg">
                <span className="material-symbols-outlined">star</span>
              </div>
              <span className="text-emerald-500 text-xs font-bold">
                +0.2 pts
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium">Course Rating</p>
            <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
              4.8
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* --- Left Column (Main) --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            {/* Alert Banner */}
            <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-xl p-4 flex items-center gap-4">
              <div className="bg-red-100 dark:bg-red-900/40 p-2 rounded-full text-red-600">
                <span className="material-symbols-outlined">warning</span>
              </div>
              <div className="flex-1">
                <h4 className="text-red-800 dark:text-red-400 font-bold text-sm">
                  AI Alert: 4 Students At-Risk
                </h4>
                <p className="text-red-600 dark:text-red-500 text-xs">
                  Low engagement detected in &apos;Introduction to AI&apos;
                  module.
                </p>
              </div>
              <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">
                View Students
              </button>
            </div>

            {/* Courses Section */}
            <div>
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  Your Courses
                </h3>
                <a
                  className="text-[#5048e5] text-sm font-bold hover:underline"
                  href="#"
                >
                  View All
                </a>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Course Card 1 */}
                <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow group">
                  <div
                    className="h-32 bg-slate-200 bg-cover bg-center relative"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuDLWUDzc5ZJXcxPDNRuseEqCoaiEsms_x5CGvEVXUpV-jSrq1isxgYuNRtWOpwhHyY_FsVALeldsJs410ENGsjx_oRo5x3bi0Uvfj-AGXrUuBahacXCTBSGsdxO21Ij6bwzQ9x_vuJ4RI01o16ZpbZHL6hsRn1QXYCvg1VVVHUY2c1aIWgvu25q2nhJgVzHdWfY99tajUQW_7ooT7iItzS4houGsagywl-jVXx0hEEYunlVABSeVX8-UsagRDeiLyeyq2Ec5NdbiTY')",
                    }}
                  >
                    <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-full">
                      Published
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#5048e5] transition-colors">
                      Full Stack Web Development
                    </h4>
                    <div className="flex items-center gap-4 text-slate-500 text-xs font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined !text-sm">
                          group
                        </span>{" "}
                        128 Students
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined !text-sm">
                          update
                        </span>{" "}
                        2h ago
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Engagement Trend</span>
                        <span className="text-emerald-500">+14%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#5048e5] w-[70%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Course Card 2 */}
                <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-md transition-shadow group">
                  <div
                    className="h-32 bg-slate-200 bg-cover bg-center relative"
                    style={{
                      backgroundImage:
                        "url('https://lh3.googleusercontent.com/aida-public/AB6AXuC3vRb2U61zQjHvUoh59YimSCZgxvq9KDjqOODHZK9Rf6k8AXrypjVjTStun6CHsN59w4S56exhTGD0HQqvIZG4Boo3JyDXerKpByqfjE5-qLPYhWqnPbh1152OA9afJv_r3xRO4q4tvLZ-XHfJbtTJuJbnfSqievnCRJZrNw1uFmk797Qib9bjU8NmUBtZDfxYI6JTYgQy1Rtn7_ScFUlb0uwhr4YFTUD1Svcm5_NJriBxxKwlTEmkCmOjRHMJm-W-7wXOH6SMLCA')",
                    }}
                  >
                    <div className="absolute top-3 left-3 px-3 py-1 bg-emerald-500 text-white text-[10px] font-black uppercase rounded-full">
                      Published
                    </div>
                  </div>
                  <div className="p-5">
                    <h4 className="font-bold text-slate-900 dark:text-white mb-2 group-hover:text-[#5048e5] transition-colors">
                      Introduction to Artificial Intelligence
                    </h4>
                    <div className="flex items-center gap-4 text-slate-500 text-xs font-medium mb-4">
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined !text-sm">
                          group
                        </span>{" "}
                        84 Students
                      </span>
                      <span className="flex items-center gap-1">
                        <span className="material-symbols-outlined !text-sm">
                          update
                        </span>{" "}
                        5h ago
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                        <span>Engagement Trend</span>
                        <span className="text-amber-500">-2%</span>
                      </div>
                      <div className="h-1 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-[#5048e5] w-[45%] rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* --- Right Column (Sidebar) --- */}
          <div className="col-span-12 lg:col-span-4 space-y-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
                Quick Actions
              </h3>
              <div className="flex flex-col gap-3">
                <button className="w-full py-3 px-4 bg-[#5048e5] text-white font-bold rounded-xl flex items-center justify-between hover:opacity-90 transition-opacity">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined">add</span>
                    New Course
                  </span>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
                <button className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl flex items-center justify-between hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined">grading</span>
                    Grade Assignments
                  </span>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
                <button className="w-full py-3 px-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white font-bold rounded-xl flex items-center justify-between hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                  <span className="flex items-center gap-2">
                    <span className="material-symbols-outlined">mail</span>
                    Blast Announcement
                  </span>
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Recent Activity
              </h3>
              <div className="relative space-y-6 before:absolute before:left-[11px] before:top-2 before:h-[calc(100%-16px)] before:w-[2px] before:bg-slate-100 dark:before:bg-slate-800">
                {/* Item 1 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 size-6 rounded-full bg-white dark:bg-[#1a192e] border-2 border-[#5048e5] flex items-center justify-center z-10">
                    <div className="size-2 rounded-full bg-[#5048e5]"></div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    New enrollment in React Basics
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Marco Silva joined 12m ago
                  </p>
                </div>

                {/* Item 2 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 size-6 rounded-full bg-white dark:bg-[#1a192e] border-2 border-emerald-500 flex items-center justify-center z-10">
                    <div className="size-2 rounded-full bg-emerald-500"></div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    Assignment submitted
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    John Doe • Data Science 101 • 1h ago
                  </p>
                </div>

                {/* Item 3 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 size-6 rounded-full bg-white dark:bg-[#1a192e] border-2 border-purple-500 flex items-center justify-center z-10">
                    <div className="size-2 rounded-full bg-purple-500"></div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    New student question
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Question regarding Module 4 quiz • 3h ago
                  </p>
                </div>

                {/* Item 4 */}
                <div className="relative pl-8">
                  <div className="absolute left-0 top-1.5 size-6 rounded-full bg-white dark:bg-[#1a192e] border-2 border-[#5048e5] flex items-center justify-center z-10">
                    <div className="size-2 rounded-full bg-[#5048e5]"></div>
                  </div>
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    New enrollment in AI
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    Sarah Wei joined 5h ago
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
