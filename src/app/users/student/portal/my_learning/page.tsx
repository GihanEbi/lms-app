"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function MyLearningPage() {
  const router = useRouter();
  const activeCourses = [
    {
      id: 1,
      title: "The Complete Python Masterclass: From Beginner to Pro",
      instructor: "Dr. Sarah Jenkins",
      progress: 65,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAcBYJvPlGYYCLSVfFV3AGchxBKvmGYE7fZe9odtAP8cKYRCJsVzrszyozT8H9o97p_xMlgMHboY-xETEr1X6SF44nhfnZynAyYuQTtCjue6Pa355gs6WrhIPhMW-uH9XkX0hwhnEdsBxb8G6TUHwAfott6wIMfw_x8watJPNdxmt48kx-O1lzxkBKUn2lcTt8hM3H8hhQa1DhdU59j0JvtQLHLvV3SSNY26KF1wIlhjd645riWUy-_NEnng082h_A7x0k1cKtvr4A",
      status: "Resume Learning",
    },
    {
      id: 2,
      title: "Modern UX/UI Design Systems with Figma",
      instructor: "Marc Arlow",
      progress: 32,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDOWPTwkNaaRQQ0xplbXJaPwomxcRlUuIrtb7H1AqTT3gKn575bODxfpRInyYyS0S1iEDvo7p8139-ipB2hhvyDiqMVsdGVyaUJVCUF8_6jKjtcgl9x1IoUM7mBPrUx9paKJvV4VnGJLrPKMYcmpBbmhySOJMaO50gkzk_1lJIjcVGEs2ht7gnC-b17qK2mAtgW91RYAc_1XoArotjoMaAosE-8NB-xMLQHNqZQDF9JPzgTcyvy0SUwE8_jN4cC0jdqqJSU1FLJ43w",
      status: "Resume Learning",
    },
    {
      id: 3,
      title: "Full-Stack Web Development Bootcamp 2024",
      instructor: "Angela Wright",
      progress: 88,
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAVZcShOG2UWEO1fYk2nB21fQ6Yzpjz57KmAFtMwZw6H715oVL3WIg_F0nCq-IsY9Pt0pu0Gfublx1nrcCvT9hvbl7Pk71bPy27yV-fecTvNMelYRD_slWIQ54AcILT6MyUPYdTR6wFp8wcs5yFWpK2t9nK2efhopn8rKXHnpjcAjhjd4wcDdqtCBQ87-5Nl10L865dAYE77owHPcULpSweo2f2-YooKWFuPm7Uzw-2I1QYlSv2QMM5lJSbzlj4zLY_wD7LsD_Jj8E",
      status: "Resume Learning",
    },
  ];

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f6f6f8] dark:bg-[#121121] p-6 lg:p-8 font-sans text-slate-900 dark:text-slate-100">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">
              play_circle
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold">6</p>
            <p className="text-xs font-medium text-slate-500">
              Courses in Progress
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">
              check_circle
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold">2</p>
            <p className="text-xs font-medium text-slate-500">
              Completed Courses
            </p>
          </div>
        </div>
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 flex items-center gap-4">
          <div className="size-12 rounded-xl bg-amber-50 dark:bg-amber-900/20 text-amber-600 flex items-center justify-center">
            <span className="material-symbols-outlined text-2xl">
              workspace_premium
            </span>
          </div>
          <div>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs font-medium text-slate-500">
              Certificates Earned
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content Column */}
        <div className="flex-1">
          {/* Filters */}
          <div className="flex items-center gap-1 bg-white dark:bg-slate-900 p-1 rounded-xl border border-slate-200 dark:border-slate-800 w-fit mb-8 overflow-x-auto">
            <button className="px-6 py-2 rounded-lg bg-[#5048e5] text-white text-sm font-bold transition-all shadow-md shadow-[#5048e5]/20 whitespace-nowrap">
              All Courses
            </button>
            <button className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all whitespace-nowrap">
              In Progress
            </button>
            <button className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all whitespace-nowrap">
              Completed
            </button>
            <button className="px-6 py-2 rounded-lg text-slate-600 dark:text-slate-400 text-sm font-semibold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all whitespace-nowrap">
              Archived
            </button>
          </div>

          {/* Courses Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Active Course Cards */}
            {activeCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative h-44 overflow-hidden">
                  <img
                    alt={course.title}
                    className="w-full h-full object-cover"
                    src={course.image}
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-bold bg-[#5048e5]/90 px-2 py-1 rounded">
                      {course.status}
                    </span>
                  </div> */}
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                        {course.title}
                      </h3>
                      <p className="text-xs text-slate-500 font-medium">
                        {course.instructor}
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        Progress
                      </span>
                      <span className="text-xs font-bold text-[#5048e5]">
                        {course.progress}% Complete
                      </span>
                    </div>
                    <div className="h-2 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#5048e5] rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <button
                    className="w-full py-3 bg-[#5048e5] text-white hover:bg-[#5048e5]/90 rounded-xl text-sm font-bold shadow-lg shadow-[#5048e5]/20 transition-all flex items-center justify-center gap-2"
                    onClick={() => {
                      router.push("/lessons/my-courses/lesson/1");
                    }}
                  >
                    <span className="material-symbols-outlined text-lg">
                      play_arrow
                    </span>
                    Continue Learning
                  </button>
                </div>
              </div>
            ))}

            {/* Completed Course Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="relative h-44 overflow-hidden">
                <img
                  alt="Completed Course"
                  className="w-full h-full object-cover"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCM-V_WLsswZ3AxUnB6yj_iZHYZpblENMGUQZ6c6MGrbR5Afp5wq-Ir8hH7bPQxriRScPQBU8RJYKc7EoemowlM6f9rMj3BaBnAgZ1EjYpG3n0cTCP7eOEuCmtJtEnLfjo1dm-6bcp7CrrXukAgjsLDq18dm0I6h30UipXnKxggyuayzvu9hfa9GPhtLAkR7LUcJTvkWWrL9HSEJ-aDnpoT9j3zjlLEPTOJs7bLI3GE4GCkIXDvNrQvnEdJQNmL_3eaZXyvyrVXAJ8"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                  <span className="text-white text-xs font-bold bg-emerald-500/90 px-2 py-1 rounded">
                    Certificate Earned
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 line-clamp-1">
                      Practical Machine Learning for Data Scientists
                    </h3>
                    <p className="text-xs text-slate-500 font-medium">
                      Prof. Emily Chen
                    </p>
                  </div>
                </div>
                <div className="mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Status
                    </span>
                    <span className="text-xs font-bold text-emerald-500">
                      100% Completed
                    </span>
                  </div>
                  <div className="h-2 w-full bg-emerald-100 dark:bg-emerald-900/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: "100%" }}
                    ></div>
                  </div>
                </div>
                <button
                  className="w-full py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2"
                  onClick={() => {
                    router.push("/users/student/portal/my_learning/certificates");
                  }}
                >
                  <span className="material-symbols-outlined text-lg">
                    workspace_premium
                  </span>
                  View Certificate
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          {/* AI Assistant Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 relative overflow-hidden">
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="size-10 rounded-lg bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center">
                  <span className="material-symbols-outlined">
                    auto_awesome
                  </span>
                </div>
                <h3 className="font-bold text-sm">AI Learning Assistant</h3>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl mb-6">
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mb-2">
                  Today&apos;s Best Pick
                </p>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">
                  Module 4: Advanced Decorators
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Based on your activity, you should finish this lesson to meet
                  your Python project deadline in 2 days.
                </p>
                <button className="w-full py-2 bg-[#5048e5] text-white rounded-lg text-xs font-bold hover:bg-[#5048e5]/90 transition-colors">
                  Start This Lesson
                </button>
              </div>
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  Upcoming Deadlines
                </p>
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-amber-500"></div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Figma Prototypes Quiz</p>
                    <p className="text-[10px] text-slate-500">
                      Due tomorrow at 11:59 PM
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="size-2 rounded-full bg-red-500"></div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">
                      React Architecture Review
                    </p>
                    <p className="text-[10px] text-slate-500">Due in 4 hours</p>
                  </div>
                </div>
              </div>
            </div>
            <span className="material-symbols-outlined absolute -right-6 -bottom-6 text-8xl text-slate-100 dark:text-slate-800/50 -rotate-12 select-none pointer-events-none">
              psychology
            </span>
          </div>

          {/* Weekly Goal Widget */}
          <div className="bg-gradient-to-br from-[#5048e5] to-indigo-600 rounded-2xl p-6 text-white">
            <h4 className="font-bold text-sm mb-2">Weekly Goal</h4>
            <p className="text-xs text-white/80 mb-4">
              You&apos;ve completed 4.5 of your 6 hours goal this week. Keep it
              up!
            </p>
            <div className="h-1.5 w-full bg-white/20 rounded-full mb-6">
              <div
                className="h-full bg-white rounded-full"
                style={{ width: "75%" }}
              ></div>
            </div>
            <button className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-xs font-bold transition-colors">
              Set New Goal
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
