"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function QuizResultsPage() {
  const router = useRouter();
  //   navigate to detail page

  const navigate = () => {
    router.push("/users/instructor/portal/quizzes/detailed-view");
  };
  const submissions = [
    {
      id: 1,
      name: "Alex Rivera",
      email: "arivera@university.edu",
      score: 94,
      time: "18m 24s",
      date: "Oct 24, 2024",
      status: "Completed",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD9Rqz8mKOZvLsG3Aq7MjvitYH83IqOhCOTouVp832yHW5KlX60FAjqsr8-r4UTgD4H_LmSo7MHAqNJgUn3mknRG00K6k41if6ZK9amQlmU1yAVw8ysUNXwHZqHzXkmhFMT9rRgtwWj0qRXSeGWezXVm0EWtk3vQikLe38vi10t-iZSs1ljXnTEoVezFA2NpBWteRrc6NTJi5m2r2zJ-NfO0gp8SIPRQnI5RtRKBbiyot9PVknLW29yBt2szM1vrOfnd1b8WtiiY7k",
    },
    {
      id: 2,
      name: "Sarah Chen",
      email: "schen@university.edu",
      score: 68,
      time: "24m 10s",
      date: "Oct 24, 2024",
      status: "Completed",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCcgnFGCjBVcCsnOpbyYDSqhUqMaZ02yMAEBWhM9_zboViPkLtiQ6gOqvDVzhlKWG7a93axVj_tSIWSUqY0v0EqyJKxbEiTJnqTceug_HOsYVNxiZtfX5wGLeMj-LjO0lqFMFQkmHl8hxsOupSVwuULrI8RoXpCLD2uPGfFxMRfPXQLMQGNSgiG3MEsIXyk-7krACim1l5HHZKUbV069mEy1a12wJUWapKNnJpfViaqg36XJoL_nvw8oRp6NNjcr-xsB-DxpVOuW1E",
    },
    {
      id: 3,
      name: "Jordan Smith",
      email: "jsmith@university.edu",
      score: 42,
      time: "12m 55s",
      date: "Oct 23, 2024",
      status: "Completed",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA-TQAqtPVdLSz0e-IJegcP9xLMxesdG6KmneOBMKebYZWtwSQ5krOJIkr6iRtY1u0kMNS0QmirdNXLrysXw1kXouMWAxE3Gq3WNEeBjoiXv04pfNGB7TPrjGmHYCdGp61fKzoxcq91F92TF2rZ2sR9VHOGA3_uUuoh0ja5r5sb8jfnsaZHLzMt23aKTTZGkrO5eP9tV1gqowvLk_h34vaHTJtD-TQ59Tg4WVg93JQLjMrGpt0uY0wf13hQV7EEtQ4nQCsZAGyYZTA",
    },
    {
      id: 4,
      name: "Maria Garcia",
      email: "mgarcia@university.edu",
      score: null,
      time: "--",
      date: "--",
      status: "In Progress",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDEWBuKRxuREnIjFiYRuDYBLkU0zVLyvQmRXdACJ_Yc0mmsFA71bHLZBo1VPKVZXGHdxh3WrrhvJgRNsYUQWTaeU6gnMlXKzEKY00OqOyK2-7og3IQ0e_LoInSSNyi6s1BaaYUICiMo48KyNj9fiWSDLnWaiMPJmZx_8hD9mLnaQ9jPTeXcyFV1tJgonjnw2EKrORM-sApDwGv9lxlgLOyoXMKPSTCFAfGpTOqf_4mzE_zBea4jtfrKJb5qG1MW63P7emRUo9Y6NLA",
    },
  ];

  const getScoreStyle = (score: number | null) => {
    if (score === null) return "text-slate-400 italic";
    if (score >= 80)
      return "text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20";
    if (score >= 60) return "text-amber-600 bg-amber-50 dark:bg-amber-900/20";
    return "text-rose-600 bg-rose-50 dark:bg-rose-900/20";
  };

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Python Basics Quiz
            </h2>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-sm font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined !text-xl">
                download
              </span>
              Export CSV
            </button>
          </div>
        </div>

        {/* Top Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#5048e5]">
              <span className="material-symbols-outlined">monitoring</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Average Score
              </p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                76%
              </h3>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/30 flex items-center justify-center text-emerald-600">
              <span className="material-symbols-outlined">checklist_rtl</span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Completion Rate
              </p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                92%
              </h3>
            </div>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800/50 rounded-2xl p-4 border border-slate-100 dark:border-slate-800 flex items-center gap-4">
            <div className="size-12 rounded-xl bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center text-amber-600">
              <span className="material-symbols-outlined">
                workspace_premium
              </span>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase">
                Highest Grade
              </p>
              <h3 className="text-xl font-black text-slate-900 dark:text-white leading-none">
                100%
              </h3>
            </div>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="p-8 space-y-8 pb-32">
        {/* Submissions Table */}
        <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between bg-slate-50/50 dark:bg-[#1a192e]">
            <div className="flex items-center gap-4 flex-1">
              <div className="relative w-full max-w-md">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-xl">
                  search
                </span>
                <input
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                  placeholder="Search students by name or email..."
                  type="text"
                />
              </div>
              <select className="bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2 text-sm focus:border-[#5048e5] outline-none">
                <option>All Statuses</option>
                <option>Completed</option>
                <option>In Progress</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-slate-500">
                Showing 48 submissions
              </span>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Student Profile
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-center">
                    Score
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Time Taken
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Date Attempted
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {submissions.map((sub) => (
                  <tr
                    key={sub.id}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="size-10 rounded-full border-2 border-slate-100 dark:border-slate-800 bg-cover bg-center"
                          style={{ backgroundImage: `url('${sub.image}')` }}
                        ></div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                            {sub.name}
                          </p>
                          <p className="text-xs text-slate-500">{sub.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <span
                        className={`inline-flex items-center justify-center font-black px-3 py-1 rounded-full text-sm ${getScoreStyle(sub.score)}`}
                      >
                        {sub.score !== null ? `${sub.score}/100` : "No score"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {sub.time}
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">
                      {sub.date}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`flex items-center gap-1.5 text-xs font-bold uppercase ${sub.status === "Completed" ? "text-emerald-500" : "text-blue-500"}`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${sub.status === "Completed" ? "bg-emerald-500" : "bg-blue-500"}`}
                        ></span>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        className={`text-sm font-bold hover:underline ${sub.status === "Completed" ? "text-[#5048e5]" : "text-slate-400 cursor-not-allowed"}`}
                        disabled={sub.status !== "Completed"}
                        onClick={navigate}
                      >
                        View Detailed Answers
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Analytics Section */}
        <section className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Question Difficulty Analytics
              </h3>
              <p className="text-sm text-slate-500">
                Analysis of correct vs. incorrect responses per question
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="size-3 rounded bg-emerald-500"></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                  Correct
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-3 rounded bg-rose-500"></div>
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase">
                  Incorrect
                </span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { q: "Q1: Python Syntax & Variables", success: 95 },
              { q: "Q2: List Comprehensions", success: 62 },
              {
                q: "Q3: Dictionaries & Key Errors",
                success: 34,
                label: "(Highest Difficulty)",
              },
              { q: "Q4: Functional Programming Concepts", success: 78 },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-slate-700 dark:text-slate-300">
                    {item.q}
                  </span>
                  <span className="text-slate-500">
                    {item.success}% Success {item.label}
                  </span>
                </div>
                <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-emerald-500"
                    style={{ width: `${item.success}%` }}
                  ></div>
                  <div
                    className="h-full bg-rose-500"
                    style={{ width: `${100 - item.success}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
