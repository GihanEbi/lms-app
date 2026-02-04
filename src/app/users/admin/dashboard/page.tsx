"use client";

import React from "react";

export default function AdminDashboardPage() {
  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <div className="p-4 md:p-8 space-y-8 max-w-7xl mx-auto">
        {/* --- Executive Overview Header --- */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl md:text-3xl font-black tracking-tight">
              Executive Overview
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Platform growth and instructor performance analytics.
            </p>
          </div>
          <div className="flex items-center gap-1 bg-white dark:bg-[#1a192e] p-1 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm w-fit">
            <button className="px-4 py-1.5 text-xs font-bold rounded-lg bg-[#5048e5] text-white">
              30 Days
            </button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
              90 Days
            </button>
            <button className="px-4 py-1.5 text-xs font-bold rounded-lg text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800">
              1 Year
            </button>
          </div>
        </div>

        {/* --- Stats Grid --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {[
            {
              label: "Total Students",
              value: "12,482",
              trend: "+5.2%",
              color: "blue",
              icon: "group",
            },
            {
              label: "Instructors",
              value: "1,204",
              trend: "+1.8%",
              color: "purple",
              icon: "badge",
            },
            {
              label: "Total Courses",
              value: "842",
              trend: "Stable",
              color: "amber",
              icon: "menu_book",
            },
            {
              label: "Revenue",
              value: "$45,210",
              trend: "+12%",
              color: "indigo",
              icon: "payments",
            },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white dark:bg-[#1a192e] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-between items-start mb-4">
                <div
                  className={`size-12 rounded-xl flex items-center justify-center 
                  ${stat.color === "blue" ? "bg-blue-50 text-blue-600 dark:bg-blue-500/10" : ""}
                  ${stat.color === "purple" ? "bg-purple-50 text-purple-600 dark:bg-purple-500/10" : ""}
                  ${stat.color === "amber" ? "bg-amber-50 text-amber-600 dark:bg-amber-500/10" : ""}
                  ${stat.color === "indigo" ? "bg-[#5048e5]/5 text-[#5048e5] dark:bg-[#5048e5]/10" : ""}
                `}
                >
                  <span className="material-symbols-outlined">{stat.icon}</span>
                </div>
                <span
                  className={`text-[11px] font-black px-2 py-0.5 rounded-lg 
                  ${stat.trend.includes("+") ? "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10" : "text-slate-400 bg-slate-50 dark:bg-slate-800"}
                `}
                >
                  {stat.trend}
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                {stat.label}
              </p>
              <p className="text-2xl font-black mt-1">{stat.value}</p>
              <div className="mt-4 h-8 w-full opacity-50">
                <svg
                  className="w-full h-full"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 30"
                >
                  <path
                    d="M0 25 Q10 20, 20 22 T40 15 T60 18 T80 5 T100 10"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    className={
                      stat.color === "indigo"
                        ? "text-[#5048e5]"
                        : `text-${stat.color}-500`
                    }
                  />
                </svg>
              </div>
            </div>
          ))}
        </div>

        {/* --- User Acquisition Trend Chart --- */}
        <div className="bg-white dark:bg-[#1a192e] p-5 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h3 className="text-lg font-bold">User Acquisition Trends</h3>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#5048e5]"></span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Total Users
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                  <span className="text-[11px] font-bold text-slate-500 uppercase">
                    Active Daily
                  </span>
                </div>
              </div>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Export Data{" "}
              <span className="material-symbols-outlined text-[16px]">
                download
              </span>
            </button>
          </div>

          <div className="h-[250px] md:h-[320px] w-full relative">
            <svg
              className="w-full h-full"
              preserveAspectRatio="none"
              viewBox="0 0 1000 300"
            >
              <defs>
                <linearGradient id="chartGradient" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#5048e5" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#5048e5" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d="M0 250 L0 180 Q100 160 200 190 T400 140 T600 160 T800 100 T1000 120 L1000 250 Z"
                fill="url(#chartGradient)"
              />
              <path
                d="M0 180 Q100 160 200 190 T400 140 T600 160 T800 100 T1000 120"
                fill="none"
                stroke="#5048e5"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d="M0 220 Q100 210 200 230 T400 190 T600 210 T800 160 T1000 180"
                fill="none"
                stroke="#cbd5e1"
                strokeDasharray="6"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 tracking-widest uppercase">
              <span>SEP 01</span>
              <span className="hidden md:block">SEP 10</span>
              <span className="hidden md:block">SEP 20</span>
              <span>Today</span>
            </div>
          </div>
        </div>

        {/* --- Bottom Grid: Courses & Activity --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {/* Top Performing Courses */}
          <div className="bg-white dark:bg-[#1a192e] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold">Top Performing Courses</h3>
              <button className="text-[#5048e5] text-xs font-bold hover:underline">
                View Detailed List
              </button>
            </div>
            <div className="space-y-6">
              {[
                {
                  name: "AI Fundamentals",
                  count: "2.4k",
                  progress: 85,
                  color: "bg-[#5048e5]",
                },
                {
                  name: "Modern UI Design",
                  count: "1.8k",
                  progress: 65,
                  color: "bg-blue-400",
                },
                {
                  name: "Data Science 101",
                  count: "1.2k",
                  progress: 45,
                  color: "bg-purple-400",
                },
                {
                  name: "React Patterns",
                  count: "940",
                  progress: 35,
                  color: "bg-orange-400",
                },
              ].map((course, i) => (
                <div key={i} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-bold text-slate-700 dark:text-slate-200">
                      {course.name}
                    </span>
                    <span className="text-slate-400 font-bold text-xs">
                      {course.count} Enrolled
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${course.color} transition-all duration-1000`}
                      style={{ width: `${course.progress}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity Feed */}
          <div className="bg-white dark:bg-[#1a192e] p-6 md:p-8 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-lg font-bold">Platform Activity</h3>
              <button className="p-2 rounded-lg border border-slate-100 dark:border-slate-800 hover:bg-slate-50 transition-colors">
                <span className="material-symbols-outlined text-[18px]">
                  filter_list
                </span>
              </button>
            </div>
            <div className="relative space-y-8 before:absolute before:inset-0 before:ml-5 before:-translate-x-px before:h-full before:w-0.5 before:bg-slate-100 dark:before:bg-slate-800">
              {[
                {
                  title: "New Instructor Onboarded",
                  time: "2 mins ago",
                  icon: "person_add",
                  color:
                    "text-emerald-600 bg-emerald-50 dark:bg-emerald-500/10",
                },
                {
                  title: "Course 'Python 101' Approved",
                  time: "45 mins ago",
                  icon: "verified",
                  color: "text-blue-600 bg-blue-50 dark:bg-blue-500/10",
                },
                {
                  title: "Revenue Milestone Reached",
                  time: "3 hours ago",
                  icon: "stars",
                  color: "text-[#5048e5] bg-[#5048e5]/5",
                },
                {
                  title: "Student Support Ticket #234",
                  time: "5 hours ago",
                  icon: "report",
                  color: "text-orange-600 bg-orange-50 dark:bg-orange-500/10",
                },
              ].map((activity, i) => (
                <div key={i} className="relative flex items-center gap-4">
                  <div
                    className={`size-10 rounded-full flex items-center justify-center shrink-0 z-10 border-4 border-white dark:border-[#1a192e] ${activity.color}`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {activity.icon}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-slate-400 mt-0.5 font-medium">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
