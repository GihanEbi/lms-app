"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorQuizzesPage() {
  const router = useRouter();
  //   navigate to detail page

  const navigate = () => {
    router.push("/users/instructor/portal/quizzes/view-submissions");
  };
  const quizzes = [
    {
      id: 1,
      title: "Midterm: Intro to Algorithms",
      created: "Oct 12, 2024",
      course: "Computer Science 101",
      questions: 25,
      attempts: 142,
      status: "Active",
      statusClass:
        "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
      active: true,
    },
    {
      id: 2,
      title: "Neural Networks Deep Dive",
      created: "Oct 20, 2024",
      course: "Advanced Machine Learning",
      questions: 15,
      attempts: 0,
      status: "Draft",
      statusClass:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      active: false,
    },
    {
      id: 3,
      title: "UX Research Methodologies",
      created: "Sept 30, 2024",
      course: "UX Design Fundamentals",
      questions: 20,
      attempts: 89,
      status: "Scheduled",
      statusClass:
        "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
      active: true,
    },
    {
      id: 4,
      title: "Python Syntax Essentials",
      created: "Aug 15, 2024",
      course: "Computer Science 101",
      questions: 10,
      attempts: 210,
      status: "Completed",
      statusClass:
        "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400",
      active: true,
    },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            All Quizzes Dashboard
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="bg-[linear-gradient(135deg,#5048e5_0%,#1e40af_100%)] text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg shadow-[#5048e5]/20 hover:opacity-90 transition-all"
            onClick={() => {
              router.push("/users/instructor/portal/quizzes/create-quiz");
            }}
          >
            <span className="material-symbols-outlined !text-xl">add</span>
            Create New Quiz
          </button>
        </div>
      </header>

      {/* --- Filters Bar --- */}
      <div className="px-8 py-6 bg-white dark:bg-[#1a192e]/50 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <select className="appearance-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none">
              <option>All Courses</option>
              <option>Computer Science 101</option>
              <option>Advanced Machine Learning</option>
              <option>UX Design Fundamentals</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>
          <div className="relative">
            <select className="appearance-none bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 pr-10 text-sm font-medium text-slate-700 dark:text-slate-300 focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none">
              <option>Status: All</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Scheduled</option>
              <option>Completed</option>
            </select>
            <span className="material-symbols-outlined absolute right-3 top-2.5 text-slate-400 pointer-events-none">
              expand_more
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-slate-400 !text-xl">
              search
            </span>
            <input
              className="bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm w-64 focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
              placeholder="Search quizzes..."
              type="text"
            />
          </div>
        </div>
      </div>

      {/* --- Main Content: Table --- */}
      <div className="p-8 flex-1 overflow-y-auto">
        <div className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Quiz Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Questions
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Total Attempts
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {quizzes.map((quiz) => (
                <tr
                  key={quiz.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        {quiz.title}
                      </span>
                      <span className="text-xs text-slate-400">
                        Created {quiz.created}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {quiz.course}
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {quiz.questions} Questions
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                    {quiz.attempts} Students
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`px-2.5 py-1 rounded-full text-xs font-bold ${quiz.statusClass}`}
                    >
                      {quiz.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        className={`px-3 py-1.5 text-xs font-bold border rounded-lg transition-colors ${
                          quiz.active
                            ? "text-[#5048e5] border-[#5048e5]/20 bg-[#5048e5]/5 hover:bg-[#5048e5]/10"
                            : "text-slate-400 border-slate-200 cursor-not-allowed"
                        }`}
                        disabled={!quiz.active}
                        onClick={() => {
                          navigate();
                        }}
                      >
                        View Results
                      </button>
                      <button className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
                        <span className="material-symbols-outlined !text-xl">
                          more_vert
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs font-medium text-slate-500">
              Showing 4 of 24 quizzes
            </p>
            <div className="flex items-center gap-1">
              <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors">
                <span className="material-symbols-outlined !text-lg">
                  chevron_left
                </span>
              </button>
              <button className="size-8 rounded-lg bg-[#5048e5] text-white text-xs font-bold">
                1
              </button>
              <button className="size-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors">
                2
              </button>
              <button className="size-8 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 text-xs font-bold transition-colors">
                3
              </button>
              <button className="p-1.5 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-400 transition-colors">
                <span className="material-symbols-outlined !text-lg">
                  chevron_right
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
