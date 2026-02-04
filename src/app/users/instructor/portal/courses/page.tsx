"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function InstructorCoursesPage() {
  const router = useRouter();

  const navigate = () => {
    router.push("/users/instructor/portal/courses/1");
  };

  const courses = [
    {
      id: 1,
      title: "Full Stack Web Development",
      students: "1,284",
      rating: "4.8",
      status: "Published",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuD7JV2BJzqd9ECjFqsaqUZgu-Z_V0w2AA_sNOKB_JoGGYbgCc31WkKVmfaTMdldjRzBzgiSXFggvNmn6w2D5nj3OqOJKtFy0KZXe_s6jwgDLDNSHzu9E5LVFnBXwXfqCG_XSTraGUc6oIhxpkJUFdyuD0JavS7yBqSMBeun_2AxNIlLwvy9URAzYwxdzH_MR4KIlqKBrz8fr4I4aY_PqzYoBRsyER0NJgb4-TW8kMP0cBqxpo17tMptyapRWrRl-_Ae2ELauS5C09o",
      trend: "+12%",
      bars: [40, 60, 45, 70, 55, 90, 80],
      active: true,
    },
    {
      id: 2,
      title: "Advanced React Patterns",
      students: "856",
      rating: "4.9",
      status: "Published",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCqD2-tGVxfyIKdx-uC2nJzwN_GKCi4o8juJG6XvxJYH36MaQdXNNKicO2w7CHKLwE-l9nUjb_wszs9THSa8NFEBLIOjCkJyjaFIF21LsiUJuXQ4GNctDwDiWIholFc2AXGuOinWCT2l4mfn_ZPUwODN4IhLJ2iPmKCXM9pq0XvulRtp9J2pPX0UphebdAZlJNPaPGpLxfploZ1ZZvLIzelkH1Im0rg4xjlXzqinOcjYiT6aCnhrgmbs-6i7E_RdazG5kwpsUCDoFc",
      trend: "+5%",
      bars: [80, 70, 75, 85, 60, 70, 75],
      active: true,
    },
    {
      id: 3,
      title: "UI Design Fundamentals",
      students: "0",
      rating: "--",
      status: "Draft",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAE0zKARjo7l6pS0O04X15zL8W4is7svQAObNKhya6unWu1zKyDGtgOYXSeXcZORrKCmSkuAIGbUqKf_IaBl-mohYHlAXFNHLIsZzGb5awBFD8B7dCfhyL_-48LDb6gOsEEnLC0fROfJesC5kEiUGKb83exIlREZapO-9LjXkPyodeckx8nLwqGyi5lRDUfzzghNhWME0Ck3FfOSHOJrcYRCWqNdxot6lA1Zu1bFK35yETn1CZB7YDZdiWjmCGdTiarrRVNHwAch54",
      trend: "No data",
      bars: [10, 10, 10, 10, 10, 10, 10],
      active: false,
    },
    {
      id: 4,
      title: "Node.js Microservices",
      students: "0",
      rating: "--",
      status: "Pending",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBRazrHMRLkHS2ao8nP53nLV6rSufDaI1qduktYfWrUTOABfBp3zGHVUUoCdv0QKNT__d9Dr1FWeQPP2Ja82MyQnsICtC944hAoEGitt5QRVjb3kEEBbcSH-l_fIxSlJP7G62PcBmfiFgyvenMpGLhwe-lyQqBDomCMrWbvryoZOPXm2RsSuH3Wc-e7kjsLGaFpZAIlWmalluAPyYSWxCestHLCEBQRxkmWJByYvUSU8dVIr_GqXvkjfsnWZfAB3zWIo8IQniIEy7k",
      trend: "Reviewing...",
      bars: [10, 10, 10, 10, 10, 10, 10],
      active: false,
    },
    {
      id: 5,
      title: "Python for Data Science",
      students: "2,105",
      rating: "4.7",
      status: "Published",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuACNwn42rdwuE2SyqtXRNvztScJQrYqgRKK3e9leVxHeMqtLkn-mnstDYSfX6rMWL9PJvgfmcd_tzyLTCOb-B1eMH7LUZrkAtlUFA_47ZwEdCWxj-0mBIAkWornDfh8FUnbuhrldb1HdtDVxRdgR_qEP6QKUiQIq4mBg4quSgggLs_cfwcB95CXGH741oEHCJk8CIs_p6z4N_axUE0Lik5bTzgUlRjtnSrXsFvbGh8Z5J-7gSdv-NUzVK_5Tl3ReWGhNn3DeYwNnxY",
      trend: "+18%",
      bars: [30, 40, 50, 65, 80, 95, 100],
      active: true,
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Top Navbar --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 md:px-8 py-4 md:py-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
            My Courses
          </h2>
          <p className="text-sm text-slate-500 font-medium">
            Manage and monitor your course content
          </p>
        </div>

        <div className="flex w-full md:w-auto items-center gap-4 flex-1 justify-end">
          <div className="relative w-full md:max-w-xs group">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg group-focus-within:text-[#5048e5]">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#5048e5]/20 text-slate-900 dark:text-white placeholder-slate-500 outline-none transition-all"
              placeholder="Search..."
              type="text"
            />
          </div>
          <button
            className="hidden md:flex items-center gap-2 px-5 py-2.5 bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#5048e5]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all whitespace-nowrap"
            onClick={() => {
              router.push(
                "/users/instructor/portal/courses/create-course/basic-info",
              );
            }}
          >
            <span className="material-symbols-outlined text-lg">add</span>
            Create New Course
          </button>
        </div>
      </header>

      {/* --- Mobile Action Button (Visible only on small screens) --- */}
      <div className="md:hidden px-4 pt-4">
        <button
          className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white rounded-xl text-sm font-bold shadow-lg"
          onClick={() => {
            router.push(
              "/users/instructor/portal/courses/create-course/basic-info",
            );
          }}
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Create New Course
        </button>
      </div>

      {/* --- Content Area --- */}
      <div className="p-4 md:p-8">
        {/* Scrollable Tabs */}
        <div className="flex items-center gap-6 md:gap-8 mb-6 md:mb-8 border-b border-slate-200 dark:border-slate-800 overflow-x-auto no-scrollbar pb-1">
          <button className="pb-3 md:pb-4 text-sm font-bold text-[#5048e5] border-b-2 border-[#5048e5] whitespace-nowrap">
            All Courses (12)
          </button>
          <button className="pb-3 md:pb-4 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
            Published (8)
          </button>
          <button className="pb-3 md:pb-4 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
            Drafts (3)
          </button>
          <button className="pb-3 md:pb-4 text-sm font-bold text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
            Archived (1)
          </button>
        </div>

        {/* Course Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4 md:gap-6 pb-20">
          {courses.map((course) => (
            <div
              key={course.id}
              className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
            >
              {/* Course Image */}
              <div className="relative h-40 md:h-44 bg-slate-100 dark:bg-slate-800 overflow-hidden shrink-0">
                <img
                  alt={course.title}
                  className="w-full h-full object-cover"
                  src={course.image}
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`px-3 py-1 text-[10px] font-black uppercase rounded-full shadow-sm ${
                      course.status === "Published"
                        ? "bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400"
                        : course.status === "Pending"
                          ? "bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400"
                          : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                    }`}
                  >
                    {course.status}
                  </span>
                </div>
              </div>

              {/* Course Details */}
              <div className="p-4 md:p-5 flex flex-col flex-1">
                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 line-clamp-2 min-h-[3rem]">
                  {course.title}
                </h3>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center text-blue-600 shrink-0">
                      <span className="material-symbols-outlined !text-lg">
                        group
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {course.students}
                      </p>
                      <p className="text-[10px] text-slate-500">Students</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="size-8 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-center justify-center text-amber-600 shrink-0">
                      <span className="material-symbols-outlined !text-lg">
                        star
                      </span>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-slate-900 dark:text-white">
                        {course.rating}/5.0
                      </p>
                      <p className="text-[10px] text-slate-500">Rating</p>
                    </div>
                  </div>
                </div>

                {/* Mini Analytics (Push to bottom if needed) */}
                <div
                  className={`mb-6 mt-auto ${!course.active && "opacity-40"}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      Quick Analytics
                    </p>
                    <span
                      className={`text-[10px] font-bold ${course.active ? "text-emerald-500" : "text-slate-500"}`}
                    >
                      {course.trend}
                    </span>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    {course.bars.map((height, i) => (
                      <div
                        key={i}
                        className={`flex-1 rounded-t-sm ${course.active ? "bg-[#5048e5]/20" : "bg-slate-200 dark:bg-slate-700"}`}
                        style={{ height: `${height}%` }}
                      ></div>
                    ))}
                  </div>
                </div>

                {/* Action Button */}
                <button
                  className={`w-full py-2.5 font-bold text-sm rounded-xl transition-colors ${
                    course.status === "Published"
                      ? "bg-[#5048e5]/10 hover:bg-[#5048e5]/20 text-[#5048e5]"
                      : course.status === "Draft"
                        ? "bg-slate-100 hover:bg-slate-200 text-slate-600 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
                        : "bg-slate-100 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600"
                  }`}
                  onClick={() => {
                    navigate();
                  }}
                >
                  {course.status === "Published"
                    ? "Manage Course"
                    : course.status === "Draft"
                      ? "Continue Editing"
                      : "Awaiting Review"}
                </button>
              </div>
            </div>
          ))}

          {/* New Course Card Placeholder */}
          <div className="bg-slate-50 dark:bg-[#1a192e]/50 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 flex flex-col items-center justify-center p-8 group hover:border-[#5048e5]/50 transition-colors cursor-pointer min-h-[380px]">
            <div
              className="size-14 rounded-full bg-white dark:bg-[#1a192e] flex items-center justify-center text-slate-400 group-hover:text-[#5048e5] transition-colors shadow-sm mb-4"
              onClick={() => {
                router.push(
                  "/users/instructor/portal/courses/create-course/basic-info",
                );
              }}
            >
              <span className="material-symbols-outlined text-3xl">add</span>
            </div>
            <p className="text-sm font-bold text-slate-900 dark:text-white">
              Create a New Course
            </p>
            <p className="text-xs text-slate-500 text-center mt-2">
              Start your next educational journey today
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
