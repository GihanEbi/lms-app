"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuizzesPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#111921] font-sans text-[#0e141b] transition-colors duration-200">
      {/* Page Content Container */}
      <div className="p-8">
        {/* Page Title & Tabs */}
        <div className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#0e141b] dark:text-white">
              Assigned Quizzes
            </h2>
            <p className="text-sm text-[#4e7397] dark:text-slate-400 mt-1">
              You have 4 active assessments this week.
            </p>
          </div>

          {/* Status Tabs */}
          <div className="flex border-b border-[#d0dbe7] dark:border-slate-800 gap-8 overflow-x-auto">
            <button className="border-b-2 border-[#5048e5] text-[#5048e5] pb-3 font-semibold text-sm whitespace-nowrap">
              Available
            </button>
            <button className="border-b-2 border-transparent text-[#4e7397] hover:text-[#0e141b] dark:hover:text-white pb-3 font-semibold text-sm transition-colors whitespace-nowrap">
              Completed
            </button>
            <button className="border-b-2 border-transparent text-[#4e7397] hover:text-[#0e141b] dark:hover:text-white pb-3 font-semibold text-sm transition-colors whitespace-nowrap">
              Upcoming
            </button>
          </div>
        </div>

        {/* Info Banner */}
        <div className="mb-8 p-4 rounded-lg bg-[#5048e5]/5 border border-[#5048e5]/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 flex items-center justify-center rounded-full bg-[#5048e5]/10 text-[#5048e5] shrink-0">
              <span className="material-symbols-outlined">psychology</span>
            </div>
            <div>
              <p className="font-bold text-[#0e141b] dark:text-slate-100">
                Master your subjects with Practice Mode
              </p>
              <p className="text-sm text-[#4e7397] dark:text-slate-400">
                Practice quizzes don&apos;t affect your final grade. Use them to
                sharpen your skills before the exam.
              </p>
            </div>
          </div>
          <button className="bg-[#5048e5] hover:bg-[#5048e5]/90 text-white px-5 py-2 rounded-lg text-sm font-semibold transition-colors shrink-0">
            Learn More
          </button>
        </div>

        {/* Main Layout: Filters + Grid */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Filter Sidebar */}
          <aside className="w-full lg:w-64 shrink-0 space-y-8">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4e7397] mb-4">
                Course
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    defaultChecked
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    All Courses
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    Intro to AI
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    Data Structures
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    Human Computer Interaction
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4e7397] mb-4">
                Quiz Type
              </h3>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    defaultChecked
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    Graded
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    Practice
                  </span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input
                    className="h-5 w-5 rounded border-gray-300 text-[#5048e5] focus:ring-[#5048e5] dark:bg-slate-800 dark:border-slate-700"
                    type="checkbox"
                  />
                  <span className="text-sm font-medium text-[#4e7397] dark:text-slate-300 group-hover:text-[#5048e5] transition-colors">
                    Final Exam
                  </span>
                </label>
              </div>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#4e7397] mb-4">
                Due Date
              </h3>
              <select className="w-full h-10 px-3 bg-white dark:bg-slate-800 border-none rounded-lg text-sm text-[#4e7397] dark:text-slate-300 focus:ring-2 focus:ring-[#5048e5]/20">
                <option>Anytime</option>
                <option>Due this week</option>
                <option>Due next week</option>
                <option>Past due</option>
              </select>
            </div>
          </aside>

          {/* Quiz Grid Area */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Quiz Card 1: Active (Start Quiz) */}
            <div className="flex flex-col rounded-lg border border-[#d0dbe7] bg-white dark:bg-slate-900 dark:border-slate-800 hover:shadow-lg transition-all p-5 group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400">
                  Final Exam
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#4e7397]">
                  <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                  Available
                </div>
              </div>
              <h3 className="text-lg font-bold leading-tight text-[#0e141b] dark:text-white group-hover:text-[#5048e5] transition-colors">
                Intro to Neural Networks Final
              </h3>
              <p className="text-sm text-[#4e7397] mt-1 mb-4">
                Course: CS402 - Artificial Intelligence
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-[#4e7397] dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    timer
                  </span>
                  <span className="text-xs font-medium">90 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    quiz
                  </span>
                  <span className="text-xs font-medium">45 questions</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    history_edu
                  </span>
                  <span className="text-xs font-medium">1 attempt</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    calendar_month
                  </span>
                  <span className="text-xs font-medium">Due Oct 24</span>
                </div>
              </div>
              <button
                className="w-full py-3 bg-gradient-to-r from-[#5048e5] to-[#7c3aed] hover:to-[#5048e5] text-white rounded-lg font-bold text-sm transition-all shadow-md shadow-[#5048e5]/20"
                onClick={() => {
                  router.push("/users/student/portal/quizzes/quizzPlayer");
                }}
              >
                Start Quiz
              </button>
            </div>

            {/* Quiz Card 2: In-Progress (Resume Quiz) */}
            <div className="flex flex-col rounded-lg border border-[#d0dbe7] bg-white dark:bg-slate-900 dark:border-slate-800 hover:shadow-lg transition-all p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-blue-100 text-[#5048e5] dark:bg-[#5048e5]/20 dark:text-[#5048e5]">
                  Graded Quiz
                </span>
                <div className="flex items-center gap-1.5 text-xs text-orange-500 font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    schedule
                  </span>
                  In Progress
                </div>
              </div>
              <h3 className="text-lg font-bold leading-tight text-[#0e141b] dark:text-white">
                Binary Search Trees &amp; Graphs
              </h3>
              <p className="text-sm text-[#4e7397] mt-1 mb-4">
                Course: CS201 - Data Structures
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-[#4e7397] dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    timer
                  </span>
                  <span className="text-xs font-medium">40 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    quiz
                  </span>
                  <span className="text-xs font-medium">20 questions</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="mb-6">
                <div className="flex justify-between text-[10px] font-bold text-[#4e7397] mb-1.5">
                  <span>PROGRESS</span>
                  <span>75%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-[#5048e5] h-full rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>
              <button className="w-full py-3 bg-white dark:bg-transparent border-2 border-[#5048e5] text-[#5048e5] hover:bg-[#5048e5]/5 rounded-lg font-bold text-sm transition-all">
                Resume Quiz
              </button>
            </div>

            {/* Quiz Card 3: Completed (View Results) */}
            <div className="flex flex-col rounded-lg border border-[#d0dbe7] bg-white dark:bg-slate-900 dark:border-slate-800 hover:shadow-lg transition-all p-5">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-slate-100 text-[#4e7397] dark:bg-slate-800">
                  Practice
                </span>
                <div className="flex items-center gap-1.5 text-xs text-green-500 font-semibold">
                  <span className="material-symbols-outlined text-sm">
                    check_circle
                  </span>
                  Completed
                </div>
              </div>
              <h3 className="text-lg font-bold leading-tight text-[#0e141b] dark:text-white">
                Week 2: Heuristics &amp; Logic
              </h3>
              <p className="text-sm text-[#4e7397] mt-1 mb-4">
                Course: CS402 - Artificial Intelligence
              </p>

              <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4 mb-6 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-[#4e7397] uppercase">
                    Best Score
                  </p>
                  <p className="text-2xl font-black text-[#0e141b] dark:text-white">
                    92
                    <span className="text-sm font-normal text-[#4e7397]">
                      /100
                    </span>
                  </p>
                </div>
                <div className="h-10 w-10 flex items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900/30">
                  <span className="material-symbols-outlined">
                    emoji_events
                  </span>
                </div>
              </div>
              <button className="w-full py-3 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-[#0e141b] dark:text-white rounded-lg font-bold text-sm transition-all">
                View Results
              </button>
            </div>

            {/* Quiz Card 4: Another Active Card */}
            <div className="flex flex-col rounded-lg border border-[#d0dbe7] bg-white dark:bg-slate-900 dark:border-slate-800 hover:shadow-lg transition-all p-5 group">
              <div className="flex justify-between items-start mb-4">
                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider rounded bg-[#5048e5]/10 text-[#5048e5]">
                  Graded Quiz
                </span>
                <div className="flex items-center gap-1.5 text-xs text-[#4e7397]">
                  <span className="h-2 w-2 bg-green-500 rounded-full inline-block"></span>
                  Available
                </div>
              </div>
              <h3 className="text-lg font-bold leading-tight text-[#0e141b] dark:text-white group-hover:text-[#5048e5] transition-colors">
                Module 4: Usability Testing
              </h3>
              <p className="text-sm text-[#4e7397] mt-1 mb-4">
                Course: HCI305 - Human Factors
              </p>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-[#4e7397] dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    timer
                  </span>
                  <span className="text-xs font-medium">30 mins</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">
                    quiz
                  </span>
                  <span className="text-xs font-medium">15 questions</span>
                </div>
              </div>
              <button
                className="w-full py-3 bg-gradient-to-r from-[#5048e5] to-[#7c3aed] hover:to-[#5048e5] text-white rounded-lg font-bold text-sm transition-all shadow-md"
                onClick={() => {
                  router.push("/users/student/portal/quizzes/quizzPlayer");
                }}
              >
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
