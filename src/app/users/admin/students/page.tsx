"use client";

import React from "react";

export default function StudentManagementPage() {
  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* --- Page Header & Search --- */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Student Management
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage, monitor, and support your global student community.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:min-w-[300px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-[#5048e5]/20 text-sm outline-none"
                placeholder="Search by name, email or ID..."
                type="text"
              />
            </div>
            <button className="flex items-center justify-center gap-2 px-4 py-2 bg-[#5048e5] text-white rounded-xl text-sm font-bold hover:bg-[#5048e5]/90 transition-all shadow-lg shadow-[#5048e5]/20">
              <span className="material-symbols-outlined text-[20px]">
                person_add
              </span>
              Add Student
            </button>
          </div>
        </div>

        {/* --- Action Cards --- */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 transition-colors">
            <span className="material-symbols-outlined text-[18px]">
              download
            </span>
            Export CSV
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-indigo-50 dark:bg-[#5048e5]/10 text-[#5048e5] rounded-xl text-xs font-bold hover:bg-indigo-100 transition-colors border border-[#5048e5]/20">
            <span className="material-symbols-outlined text-[18px]">
              campaign
            </span>
            Send Announcement
          </button>
        </div>

        {/* --- Quick Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Active Students",
              value: "8,432",
              icon: "group",
              color: "blue",
            },
            {
              label: "Avg. Completion",
              value: "76.4%",
              icon: "trending_up",
              color: "emerald",
            },
            {
              label: "New Enrolled",
              value: "124",
              icon: "history",
              color: "amber",
            },
            { label: "Suspended", value: "12", icon: "block", color: "red" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1a192e] p-5 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4 shadow-sm"
            >
              <div
                className={`size-12 rounded-xl flex items-center justify-center shrink-0
                ${stat.color === "blue" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10" : ""}
                ${stat.color === "emerald" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : ""}
                ${stat.color === "amber" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10" : ""}
                ${stat.color === "red" ? "bg-red-50 text-red-600 dark:bg-red-500/10" : ""}
              `}
              >
                <span className="material-symbols-outlined">{stat.icon}</span>
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  {stat.label}
                </p>
                <p className="text-xl font-black text-slate-900 dark:text-white">
                  {stat.value}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* --- Main Table Section --- */}
        <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          {/* Table Filters */}
          <div className="p-4 md:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-1 p-1 bg-slate-50 dark:bg-slate-800/50 rounded-xl w-full md:w-fit">
              <button className="flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg bg-[#5048e5] text-white">
                All Students
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800">
                Recently Active
              </button>
              <button className="flex-1 md:flex-none px-4 py-2 text-xs font-bold rounded-lg text-slate-500 hover:bg-white dark:hover:bg-slate-800">
                At Risk
              </button>
            </div>
            <div className="flex items-center gap-3 w-full md:w-auto">
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">
                  filter_list
                </span>{" "}
                Filter
              </button>
              <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-3 py-2 border border-slate-200 dark:border-slate-800 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">
                  sort
                </span>{" "}
                Sort
              </button>
            </div>
          </div>

          {/* Responsive Table Wrapper */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                  <th className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <input
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                        type="checkbox"
                      />
                      Profile
                    </div>
                  </th>
                  <th className="px-6 py-4">Enrollment Date</th>
                  <th className="px-6 py-4">Active Courses</th>
                  <th className="px-6 py-4">Progress</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    name: "Emma Thompson",
                    email: "emma.t@example.com",
                    date: "Sep 12, 2023",
                    progress: 85,
                    status: "Active",
                    color: "bg-[#5048e5]",
                  },
                  {
                    name: "Marcus Chen",
                    email: "m.chen@example.com",
                    date: "Aug 28, 2023",
                    progress: 42,
                    status: "Pending",
                    color: "bg-amber-400",
                  },
                  {
                    name: "Sophia Rodriguez",
                    email: "sophia.r@example.com",
                    date: "Oct 05, 2023",
                    progress: 12,
                    status: "Suspended",
                    color: "bg-red-400",
                  },
                  {
                    name: "James Wilson",
                    email: "j.wilson@example.com",
                    date: "Sep 20, 2023",
                    progress: 92,
                    status: "Active",
                    color: "bg-[#5048e5]",
                  },
                ].map((student, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <input
                          className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                          type="checkbox"
                        />
                        <div className="size-10 rounded-full bg-slate-200 shrink-0"></div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">
                            {student.name}
                          </p>
                          <p className="text-xs text-slate-500">
                            {student.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-xs font-medium text-slate-500">
                      {student.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex -space-x-2">
                        <div className="size-7 rounded-full border-2 border-white dark:border-[#1a192e] bg-blue-100 flex items-center justify-center text-[9px] font-bold text-blue-600">
                          AI
                        </div>
                        <div className="size-7 rounded-full border-2 border-white dark:border-[#1a192e] bg-purple-100 flex items-center justify-center text-[9px] font-bold text-purple-600">
                          UI
                        </div>
                        <div className="size-7 rounded-full border-2 border-white dark:border-[#1a192e] bg-slate-100 flex items-center justify-center text-[9px] font-bold text-slate-600">
                          +2
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="w-32">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-[10px] font-bold text-slate-400">
                            {student.progress}%
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${student.color}`}
                            style={{ width: `${student.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wide
                        ${student.status === "Active" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : ""}
                        ${student.status === "Pending" ? "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400" : ""}
                        ${student.status === "Suspended" ? "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400" : ""}
                      `}
                      >
                        {student.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-1 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400">
                        <span className="material-symbols-outlined text-[20px]">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs font-bold text-slate-500 tracking-tight">
              Showing 1 to 10 of 8,432 students
            </p>
            <div className="flex items-center gap-1">
              <button
                className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50 disabled:opacity-30"
                disabled
              >
                <span className="material-symbols-outlined text-[18px]">
                  chevron_left
                </span>
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg bg-[#5048e5] text-white text-xs font-bold">
                1
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
                2
              </button>
              <button className="size-8 flex items-center justify-center rounded-lg text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800">
                3
              </button>
              <span className="px-2 text-slate-400 font-bold">...</span>
              <button className="p-2 border border-slate-200 dark:border-slate-800 rounded-lg hover:bg-slate-50">
                <span className="material-symbols-outlined text-[18px]">
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
