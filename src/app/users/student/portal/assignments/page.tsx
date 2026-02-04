"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function AssignmentsPage() {
  const router = useRouter();
  return (
    <div className="flex h-full bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Left Filter Sidebar --- */}
      <div className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-[#121121]/50 p-6 overflow-y-auto hidden lg:block shrink-0 h-[calc(100vh-80px)] sticky top-0">
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-bold text-slate-900 dark:text-white">Filters</h3>
          <button className="text-xs text-[#5048e5] font-bold hover:underline">
            Clear all
          </button>
        </div>

        <div className="space-y-8">
          {/* Course Filter */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              By Course
            </p>
            <div className="space-y-2">
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  defaultChecked
                  className="rounded text-[#5048e5] focus:ring-[#5048e5] border-slate-300 dark:bg-slate-800"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Philosophy 101
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  defaultChecked
                  className="rounded text-[#5048e5] focus:ring-[#5048e5] border-slate-300 dark:bg-slate-800"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Computer Science
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded text-[#5048e5] focus:ring-[#5048e5] border-slate-300 dark:bg-slate-800"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Advanced Math
                </span>
              </label>
              <label className="flex items-center gap-3 cursor-pointer group">
                <input
                  className="rounded text-[#5048e5] focus:ring-[#5048e5] border-slate-300 dark:bg-slate-800"
                  type="checkbox"
                />
                <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                  Global History
                </span>
              </label>
            </div>
          </div>

          {/* Due Date Filter */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Due Date
            </p>
            <select className="w-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm px-3 py-2 focus:ring-[#5048e5] focus:border-[#5048e5] outline-none">
              <option>Anytime</option>
              <option>Due this week</option>
              <option>Due next week</option>
              <option>Due next month</option>
            </select>
          </div>

          {/* Points Range Filter */}
          <div className="space-y-4">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Points Range (0-100)
            </p>
            <input
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#5048e5]"
              type="range"
            />
            <div className="flex justify-between text-xs text-slate-500 font-medium">
              <span>0 pts</span>
              <span>100 pts</span>
            </div>
          </div>

          {/* Difficulty Filter */}
          <div className="space-y-3">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Difficulty
            </p>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:border-[#5048e5] transition-colors">
                Easy
              </button>
              <button className="px-3 py-1.5 rounded-full text-xs font-bold bg-[#5048e5] text-white border border-[#5048e5]">
                Medium
              </button>
              <button className="px-3 py-1.5 rounded-full text-xs font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:border-[#5048e5] transition-colors">
                Hard
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main List Area --- */}
      <div className="flex-1 p-6 md:p-8 overflow-y-auto">
        {/* Page Heading */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
          <div>
            <h2 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Assignments
            </h2>
            <p className="text-slate-500 mt-1 font-medium">
              You have 4 pending assignments for this week.
            </p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-sm font-bold shadow-sm hover:shadow-md transition-all active:scale-95">
            <span className="material-symbols-outlined text-lg">refresh</span>
            <span>Refresh List</span>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 dark:border-slate-800 gap-8 mb-8 overflow-x-auto">
          <button className="flex items-center justify-center border-b-2 border-[#5048e5] text-[#5048e5] pb-4 px-1 font-bold text-sm tracking-wide whitespace-nowrap">
            All
          </button>
          <button className="flex items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 pb-4 px-1 font-bold text-sm tracking-wide transition-all relative whitespace-nowrap">
            Pending
            <span className="ml-2 bg-[#5048e5]/10 text-[#5048e5] text-[10px] px-1.5 py-0.5 rounded-full">
              4
            </span>
          </button>
          <button className="flex items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 pb-4 px-1 font-bold text-sm tracking-wide transition-all whitespace-nowrap">
            Submitted
          </button>
          <button className="flex items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 pb-4 px-1 font-bold text-sm tracking-wide transition-all whitespace-nowrap">
            Graded
          </button>
          <button className="flex items-center justify-center border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-300 pb-4 px-1 font-bold text-sm tracking-wide transition-all whitespace-nowrap">
            Overdue
          </button>
        </div>

        {/* Assignment List */}
        <div className="space-y-4">
          {/* Assignment Card 1 */}
          <div className="group bg-white dark:bg-[#121121] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden transition-all hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700">
            {/* Status Stripe */}
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-yellow-400"></div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-[#5048e5] uppercase tracking-wider">
                  Philosophy 101
                </span>
                <span className="size-1 rounded-full bg-slate-300"></span>
                <span className="bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Medium
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Introduction to AI Ethics
              </h3>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-1.5 text-yellow-600 dark:text-yellow-500 font-semibold text-sm">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                  <span>2 days left</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                  <span className="material-symbols-outlined text-lg">
                    database
                  </span>
                  <span>100 Points</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                className="px-5 py-2.5 bg-[#5048e5] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-[#5048e5]/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => {
                  router.push(
                    "/users/student/portal/assignments/submit-assginment/1",
                  );
                }}
              >
                Start Assignment
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Assignment Card 2 */}
          <div className="group bg-white dark:bg-[#121121] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden transition-all hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-500"></div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-[#5048e5] uppercase tracking-wider">
                  Computer Science
                </span>
                <span className="size-1 rounded-full bg-slate-300"></span>
                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Hard
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Neural Networks Lab
              </h3>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-1.5 text-red-500 font-semibold text-sm">
                  <span className="material-symbols-outlined text-lg">
                    error
                  </span>
                  <span>Overdue (3h)</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                  <span className="material-symbols-outlined text-lg">
                    database
                  </span>
                  <span>50 Points</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                className="px-5 py-2.5 bg-[#5048e5] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-[#5048e5]/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => {
                  router.push(
                    "/users/student/portal/assignments/submit-assginment/1",
                  );
                }}
              >
                Complete Now
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Assignment Card 3 (Graded) */}
          <div className="group bg-slate-100/50 dark:bg-[#121121]/30 border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden transition-all">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-green-500"></div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1 opacity-70">
                <span className="text-xs font-bold text-[#5048e5] uppercase tracking-wider">
                  Computer Science
                </span>
                <span className="size-1 rounded-full bg-slate-300"></span>
                <span className="bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Easy
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Data Structures Quiz
              </h3>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-1.5 text-green-600 dark:text-green-500 font-semibold text-sm">
                  <span className="material-symbols-outlined text-lg">
                    check_circle
                  </span>
                  <span>Graded: 95/100</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-400 font-medium text-sm">
                  <span className="material-symbols-outlined text-lg">
                    calendar_today
                  </span>
                  <span>Submitted June 12</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-md transition-all active:scale-95">
                View Feedback
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>

          {/* Assignment Card 4 */}
          <div className="group bg-white dark:bg-[#121121] border border-slate-200 dark:border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center gap-6 relative overflow-hidden transition-all hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700">
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-slate-200 dark:bg-slate-700"></div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="text-xs font-bold text-[#5048e5] uppercase tracking-wider">
                  Advanced Math
                </span>
                <span className="size-1 rounded-full bg-slate-300"></span>
                <span className="bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                  Hard
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Differential Equations P-Set 4
              </h3>
              <div className="flex items-center gap-5 mt-3">
                <div className="flex items-center gap-1.5 text-slate-500 font-semibold text-sm">
                  <span className="material-symbols-outlined text-lg">
                    schedule
                  </span>
                  <span>Due in 6 days</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                  <span className="material-symbols-outlined text-lg">
                    database
                  </span>
                  <span>75 Points</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 self-end md:self-auto">
              <button
                className="px-5 py-2.5 bg-[#5048e5] text-white text-sm font-bold rounded-xl shadow-sm hover:shadow-[#5048e5]/30 transition-all hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => {
                  router.push(
                    "/users/student/portal/assignments/submit-assginment/1",
                  );
                }}
              >
                Start Assignment
              </button>
              <button className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                <span className="material-symbols-outlined">more_vert</span>
              </button>
            </div>
          </div>
        </div>

        {/* Pagination/Load More */}
        <div className="mt-8 flex justify-center pb-10">
          <button className="text-sm font-bold text-slate-400 hover:text-[#5048e5] transition-colors flex items-center gap-2">
            Show more completed assignments
            <span className="material-symbols-outlined">expand_more</span>
          </button>
        </div>
      </div>
    </div>
  );
}
