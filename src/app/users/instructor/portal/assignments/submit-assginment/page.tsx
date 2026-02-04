"use client";

import React from "react";
import Link from "next/link";

export default function AssignmentReviewPage() {
  const submissions = [
    {
      id: 1,
      name: "Alex Rivera",
      studentId: "#48291",
      submittedDate: "Oct 24, 2:15 PM",
      submissionStatus: "On Time",
      plagiarismScore: 2,
      plagiarismColor: "bg-emerald-500",
      status: "Graded (48/50)",
      statusClass: "bg-emerald-100 text-emerald-700",
      action: "Review",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCijqkbAPS-8QPaeSJvYHhVWWWB727eu6VCbJF5kOgSzrWA4khtxckWu4kBX2xR-3RJf1NUhhkSTvoej9c-e4f0TEWELOtY_6l1yTZ2niF_ipq3O4k7hTLO19uiNZTJW0Y4loLeKo5YVLcXlBlZnbwl-AeXF2dNApxY6HI76Sy5VB-aGXz_LIgd2qwuBErKHTC8SvNJqflMw4A5IHO3CYZLekwzxKhlZRKvOcWn_OcnTdbTC20b1_GJthq5tKpowJkXgDUonU5borI",
    },
    {
      id: 2,
      name: "Marcus Thompson",
      studentId: "#48295",
      submittedDate: "Oct 25, 9:05 AM",
      submissionStatus: "Late (12h)",
      submissionStatusColor: "text-amber-600",
      plagiarismScore: 14,
      plagiarismColor: "bg-amber-400",
      status: "Needs Grading",
      statusClass: "bg-amber-100 text-amber-700",
      action: "Grade Now",
      actionPrimary: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCijqkbAPS-8QPaeSJvYHhVWWWB727eu6VCbJF5kOgSzrWA4khtxckWu4kBX2xR-3RJf1NUhhkSTvoej9c-e4f0TEWELOtY_6l1yTZ2niF_ipq3O4k7hTLO19uiNZTJW0Y4loLeKo5YVLcXlBlZnbwl-AeXF2dNApxY6HI76Sy5VB-aGXz_LIgd2qwuBErKHTC8SvNJqflMw4A5IHO3CYZLekwzxKhlZRKvOcWn_OcnTdbTC20b1_GJthq5tKpowJkXgDUonU5borI",
    },
    {
      id: 3,
      name: "Sarah Wei",
      studentId: "#48288",
      submittedDate: "Oct 23, 11:45 PM",
      submissionStatus: "On Time",
      plagiarismScore: 42,
      plagiarismColor: "bg-red-500",
      plagiarismText: "text-red-600",
      status: "Flagged",
      statusClass: "bg-red-100 text-red-700",
      action: "Grade Now",
      actionPrimary: true,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCijqkbAPS-8QPaeSJvYHhVWWWB727eu6VCbJF5kOgSzrWA4khtxckWu4kBX2xR-3RJf1NUhhkSTvoej9c-e4f0TEWELOtY_6l1yTZ2niF_ipq3O4k7hTLO19uiNZTJW0Y4loLeKo5YVLcXlBlZnbwl-AeXF2dNApxY6HI76Sy5VB-aGXz_LIgd2qwuBErKHTC8SvNJqflMw4A5IHO3CYZLekwzxKhlZRKvOcWn_OcnTdbTC20b1_GJthq5tKpowJkXgDUonU5borI",
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Top Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <div className="flex items-center gap-2 text-xs font-bold text-[#5048e5] uppercase tracking-wider mb-0.5">
            <Link
              href="/instructor/courses"
              className="flex items-center hover:underline"
            >
              <span className="material-symbols-outlined !text-sm">
                chevron_left
              </span>
              Back to Course
            </Link>
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Data Analysis Project
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-2 px-4 py-2 bg-[#5048e5] text-white text-sm font-bold rounded-xl hover:bg-[#5048e5]/90 transition-colors shadow-sm">
            <span className="material-symbols-outlined !text-lg">download</span>
            Export Grades
          </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              Submitted
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                85%
              </h3>
              <span className="text-slate-400 text-xs font-bold pb-1.5">
                (295/347)
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              Graded
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-[#5048e5]">60%</h3>
              <span className="text-slate-400 text-xs font-bold pb-1.5">
                (177/295)
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">
              Avg. Score
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white">
                42/50
              </h3>
              <span className="text-emerald-500 text-xs font-bold pb-1.5 flex items-center gap-0.5">
                <span className="material-symbols-outlined !text-sm">
                  trending_up
                </span>{" "}
                Above Target
              </span>
            </div>
          </div>
        </div>

        {/* Submissions Table Section */}
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              Student Submissions
            </h3>
            <div className="flex items-center gap-4 w-full sm:w-auto">
              <div className="relative w-full sm:w-64">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  search
                </span>
                <input
                  className="w-full bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                  placeholder="Search student..."
                  type="text"
                />
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs font-bold text-slate-400 uppercase">
                  Filter:
                </span>
                <select className="text-sm font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 px-3 py-2 rounded-lg focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none">
                  <option>Grading Status</option>
                  <option>Graded</option>
                  <option>Needs Grading</option>
                  <option>Late</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Submission Date
                    </th>
                    <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                      Plagiarism Score
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
                  {submissions.map((sub) => (
                    <tr
                      key={sub.id}
                      className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-9 rounded-full bg-slate-200 bg-cover bg-center"
                            style={{ backgroundImage: `url('${sub.image}')` }}
                          ></div>
                          <div>
                            <p className="text-sm font-bold text-slate-900 dark:text-white">
                              {sub.name}
                            </p>
                            <p className="text-[10px] text-slate-400 font-medium">
                              ID: {sub.studentId}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700 dark:text-slate-300">
                          {sub.submittedDate}
                        </p>
                        <p
                          className={`text-[10px] font-bold uppercase ${sub.submissionStatusColor || "text-emerald-600"}`}
                        >
                          {sub.submissionStatus}
                        </p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <span
                            className={`text-sm font-bold ${sub.plagiarismText || "text-slate-700 dark:text-slate-300"}`}
                          >
                            {sub.plagiarismScore}%
                          </span>
                          <div className="w-16 bg-slate-100 dark:bg-slate-800 rounded-full h-1">
                            <div
                              className={`h-full rounded-full ${sub.plagiarismColor}`}
                              style={{ width: `${sub.plagiarismScore}%` }}
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${sub.statusClass}`}
                        >
                          {sub.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          className={`px-4 py-1.5 text-xs font-bold rounded-lg transition-colors ${
                            sub.actionPrimary
                              ? "bg-[#5048e5] text-white hover:bg-[#5048e5]/90"
                              : "border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                          }`}
                        >
                          {sub.action}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <p className="text-xs text-slate-500 font-medium">
                Showing 1-10 of 295 submissions
              </p>
              <div className="flex gap-2">
                <button
                  className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                  disabled
                >
                  Previous
                </button>
                <button className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Grading Distribution */}
        <div className="bg-white dark:bg-[#1a192e] p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Grading Distribution
              </h3>
              <p className="text-sm text-slate-500">
                Breakdown of student performance for this assignment.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                Exceeds Expectations
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                45
              </p>
              <p className="text-[10px] text-emerald-600 font-bold">
                Score &gt; 45/50
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                Meets Expectations
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                112
              </p>
              <p className="text-[10px] text-blue-600 font-bold">
                Score 35-45/50
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                Below Expectations
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                15
              </p>
              <p className="text-[10px] text-amber-600 font-bold">
                Score 25-35/50
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
              <p className="text-xs font-bold text-slate-400 uppercase mb-2">
                Needs Intervention
              </p>
              <p className="text-2xl font-black text-slate-900 dark:text-white">
                5
              </p>
              <p className="text-[10px] text-red-600 font-bold">
                Score &lt; 25/50
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
