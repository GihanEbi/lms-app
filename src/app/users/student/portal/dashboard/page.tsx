"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  return (
    <div className="p-6 md:p-8 space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          Welcome back, Alex! 👋
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          You&apos;re on a 5-day streak. Keep it up!
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label: "Enrolled Courses",
            value: "12",
            change: "+2%",
            icon: "school",
            color: "text-[#5048e5]",
          },
          {
            label: "Pending Assignments",
            value: "3",
            change: null,
            icon: "pending_actions",
            color: "text-orange-500",
          },
          {
            label: "Completed Quizzes",
            value: "24",
            change: "-5%",
            icon: "task_alt",
            color: "text-green-500",
          },
          {
            label: "Overall Progress",
            value: "78%",
            change: "+12%",
            icon: "trending_up",
            color: "text-blue-500",
          },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-white dark:bg-[#121121] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col gap-2 transition-colors"
          >
            <div className="flex justify-between items-center text-slate-400 font-bold uppercase text-[10px]">
              <span>{stat.label}</span>
              <span className={`material-symbols-outlined ${stat.color}`}>
                {stat.icon}
              </span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900 dark:text-white">
                {stat.value}
              </span>
              {stat.change && (
                <span
                  className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.change.startsWith("+") ? "text-green-600 bg-green-50 dark:bg-green-900/20" : "text-red-600 bg-red-50 dark:bg-red-900/20"}`}
                >
                  {stat.change}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Continue Learning Carousel */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
            Continue Learning
          </h2>
          <button className="text-sm font-bold text-[#5048e5] hover:underline">
            View All
          </button>
        </div>
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex-none w-80 bg-white dark:bg-[#121121] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-all group cursor-pointer"
            >
              <div className="h-32 bg-slate-200 dark:bg-slate-800 relative overflow-hidden">
                <img
                  src={`https://picsum.photos/400/200?random=${i + 200}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                  alt="course"
                />
                <div className="absolute top-4 left-4 px-2 py-0.5 bg-[#5048e5] text-white text-[10px] font-bold rounded uppercase">
                  Current
                </div>
              </div>
              <div className="p-4 space-y-4">
                <h3 className="font-bold leading-tight line-clamp-1 text-slate-900 dark:text-white">
                  Learning Course Title {i}
                </h3>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold text-slate-400">
                    <span>Progress</span>
                    <span>{30 + i * 20}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#5048e5]"
                      style={{ width: `${30 + i * 20}%` }}
                    ></div>
                  </div>
                </div>
                <button
                  className="w-full py-2.5 bg-[#5048e5] text-white text-xs font-bold rounded-lg shadow-lg shadow-[#5048e5]/20 hover:bg-[#433cc7] transition-colors"
                  onClick={() => {
                    router.push("/lessons/my-courses/lesson/1")
                  }}
                >
                  Continue Lesson
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lower Section: Recommendations & Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recommended Column */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              AI Recommended for You
            </h2>
            <div className="flex items-center gap-1 text-[#5048e5]">
              <span className="material-symbols-outlined text-sm">
                auto_awesome
              </span>
              <span className="text-[10px] font-bold uppercase">
                AI Powered
              </span>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="bg-white dark:bg-[#121121] p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex gap-4 hover:shadow-md transition-all cursor-pointer"
              >
                <div className="size-20 rounded-lg bg-slate-100 dark:bg-slate-800 shrink-0 overflow-hidden">
                  <img
                    src={`https://picsum.photos/200/200?random=${i + 300}`}
                    className="w-full h-full object-cover"
                    alt="rec"
                  />
                </div>
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h4 className="text-sm font-bold line-clamp-1 text-slate-900 dark:text-white">
                      Recommended Skill {i}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-wider">
                      8h 45m • Instructor Name
                    </p>
                  </div>
                  <button className="text-[10px] font-bold text-[#5048e5] text-left hover:underline">
                    Start Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Sidebar Column */}
        <div className="space-y-8">
          {/* Streak Card */}
          <div className="bg-white dark:bg-[#121121] p-6 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm transition-colors">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold tracking-tight text-slate-900 dark:text-white">
                Learning Streak
              </h3>
              <div className="flex items-center gap-1 text-[#5048e5]">
                <span className="material-symbols-outlined text-sm font-bold">
                  local_fire_department
                </span>
                <span className="text-sm font-bold">5 Days</span>
              </div>
            </div>
            <div className="flex justify-between">
              {["M", "T", "W", "T", "F", "S", "S"].map((day, i) => (
                <div key={day + i} className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase">
                    {day}
                  </span>
                  <div
                    className={`size-8 rounded-lg flex items-center justify-center border-2 transition-colors ${i < 5 ? "bg-[#5048e5] text-white border-[#5048e5]" : "bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700"}`}
                  >
                    {i < 5 && (
                      <span className="material-symbols-outlined text-sm">
                        check
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
            <h3 className="font-bold tracking-tight px-1 text-slate-900 dark:text-white">
              Recent Activity
            </h3>
            <div className="space-y-3">
              {[
                {
                  label: "Submitted Math Assignment",
                  time: "2 hours ago",
                  icon: "check_circle",
                  color: "text-green-500 bg-green-50 dark:bg-green-900/20",
                },
                {
                  label: "Completed Quiz: Data structures",
                  time: "Yesterday, 4:30 PM",
                  icon: "quiz",
                  color: "text-blue-500 bg-blue-50 dark:bg-blue-900/20",
                },
              ].map((act) => (
                <div
                  key={act.label}
                  className="flex gap-4 p-3 rounded-xl hover:bg-white dark:hover:bg-[#1e1d2e] transition-all cursor-default"
                >
                  <div
                    className={`size-8 rounded-full flex items-center justify-center shrink-0 ${act.color}`}
                  >
                    <span className="material-symbols-outlined text-lg">
                      {act.icon}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {act.label}
                    </p>
                    <p className="text-xs text-slate-400">{act.time}</p>
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
