"use client";

import React from "react";
import Link from "next/link";

export default function InstructorManagementPage() {
  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <main className="max-w-7xl mx-auto p-4 md:p-8 space-y-8">
        {/* --- Section Title & Global Actions --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Instructor Management
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Manage and verify your global network of expert instructors.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button className="flex-1 md:flex-none px-5 py-2.5 bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold shadow-sm hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                payments
              </span>
              Payouts
            </button>
            <button className="flex-1 md:flex-none px-5 py-2.5 bg-indigo-50 dark:bg-[#5048e5]/10 text-[#5048e5] rounded-xl text-xs font-bold border border-[#5048e5]/20 hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
              <span className="material-symbols-outlined text-[18px]">
                verified_user
              </span>
              Verify Accounts
            </button>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Pending Apps",
              value: "24",
              status: "Action Needed",
              icon: "pending_actions",
              color: "amber",
            },
            {
              label: "Top Rated",
              value: "112",
              status: "Top 5%",
              icon: "star",
              color: "indigo",
            },
            {
              label: "Total Courses",
              value: "2,842",
              status: "Active",
              icon: "library_books",
              color: "purple",
            },
            {
              label: "Monthly Payouts",
              value: "$128.4k",
              status: "+14%",
              icon: "account_balance",
              color: "emerald",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1a192e] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`size-12 rounded-xl flex items-center justify-center 
                  ${stat.color === "amber" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10" : ""}
                  ${stat.color === "indigo" ? "bg-[#5048e5]/5 text-[#5048e5] dark:bg-[#5048e5]/10" : ""}
                  ${stat.color === "purple" ? "bg-purple-50 text-purple-600 dark:bg-purple-500/10" : ""}
                  ${stat.color === "emerald" ? "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10" : ""}
                `}
                >
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span
                  className={`text-[10px] font-black px-2 py-0.5 rounded-lg uppercase tracking-tighter
                  ${stat.color === "amber" ? "text-amber-600 bg-amber-50" : "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10"}
                `}
                >
                  {stat.status}
                </span>
              </div>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-2xl font-black mt-1">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* --- Instructor Table --- */}
        <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row justify-between items-center gap-4">
            <h3 className="text-lg font-bold">Active Instructors</h3>
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <select className="flex-1 sm:w-40 bg-slate-50 dark:bg-slate-800/50 border-none rounded-xl text-xs font-bold focus:ring-2 focus:ring-[#5048e5]/20 py-2">
                <option>All Expertise</option>
                <option>Data Science</option>
                <option>UI/UX Design</option>
              </select>
              <button className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800">
                <span className="material-symbols-outlined text-[20px] text-slate-500">
                  filter_list
                </span>
              </button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="bg-slate-50/50 dark:bg-slate-800/30 text-[10px] font-black text-slate-400 uppercase tracking-widest border-b border-slate-100 dark:border-slate-800">
                  <th className="px-6 py-4">Instructor</th>
                  <th className="px-6 py-4">Expertise</th>
                  <th className="px-6 py-4 text-center">Courses</th>
                  <th className="px-6 py-4">Revenue</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {[
                  {
                    name: "Dr. Sarah Jenkins",
                    email: "sarah.j@edulearn.com",
                    exp: ["Data Science", "Python"],
                    courses: 12,
                    rev: "$42,500",
                    status: "Verified",
                  },
                  {
                    name: "Marcus Thorne",
                    email: "m.thorne@design.io",
                    exp: ["UI/UX", "Figma"],
                    courses: 8,
                    rev: "$31,200",
                    status: "Pending",
                  },
                  {
                    name: "Elena Rodriguez",
                    email: "elena.rod@growth.com",
                    exp: ["Marketing", "SEO"],
                    courses: 15,
                    rev: "$58,900",
                    status: "Verified",
                  },
                ].map((inst, i) => (
                  <tr
                    key={i}
                    className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="size-10 rounded-full bg-slate-200 shrink-0"></div>
                        <div>
                          <p className="text-sm font-bold">{inst.name}</p>
                          <p className="text-xs text-slate-500">{inst.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1.5">
                        {inst.exp.map((e) => (
                          <span
                            key={e}
                            className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-[10px] font-bold rounded"
                          >
                            {e}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center text-sm font-bold">
                      {inst.courses}
                    </td>
                    <td className="px-6 py-4 text-sm font-black text-[#5048e5]">
                      {inst.rev}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wide
                        ${inst.status === "Verified" ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400" : "bg-amber-50 text-amber-700 dark:bg-amber-500/10 dark:text-amber-400"}
                      `}
                      >
                        <span
                          className={`size-1.5 rounded-full ${inst.status === "Verified" ? "bg-emerald-500" : "bg-amber-500"}`}
                        ></span>
                        {inst.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="text-slate-400 hover:text-slate-600">
                        <span className="material-symbols-outlined">
                          more_vert
                        </span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* --- Bottom Widgets --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Distribution Chart (Simple Bar Mockup) */}
          <div className="bg-white dark:bg-[#1a192e] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <h3 className="text-lg font-bold mb-8">Course Distribution</h3>
            <div className="space-y-5">
              {[
                { label: "Technology", val: "75%", color: "bg-[#5048e5]" },
                { label: "Design", val: "45%", color: "bg-purple-500" },
                { label: "Business", val: "32%", color: "bg-blue-500" },
                { label: "Health", val: "18%", color: "bg-emerald-500" },
              ].map((item, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-xs font-bold">
                    <span className="text-slate-500 uppercase tracking-widest">
                      {item.label}
                    </span>
                    <span>{item.val}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: item.val }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Verification Requests */}
          <div className="bg-white dark:bg-[#1a192e] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold">Pending Verifications</h3>
              <button className="text-[#5048e5] text-xs font-bold hover:underline">
                View All
              </button>
            </div>
            <div className="space-y-4">
              {[
                { name: "Liam Hudson", time: "2h ago", initials: "LH" },
                { name: "Sophia Chen", time: "5h ago", initials: "SC" },
                { name: "Daniel Kim", time: "Yesterday", initials: "DK" },
              ].map((req, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 group hover:border-[#5048e5]/40 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="size-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold text-slate-500">
                      {req.initials}
                    </div>
                    <div>
                      <p className="text-sm font-bold">{req.name}</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase">
                        {req.time}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-1.5 bg-[#5048e5] text-white text-[10px] font-black rounded-lg uppercase tracking-wider shadow-md shadow-[#5048e5]/20 hover:scale-105 transition-all">
                    Review
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
