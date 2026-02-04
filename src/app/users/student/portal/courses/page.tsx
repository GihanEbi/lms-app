"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CoursesPage() {
  const router = useRouter();
  const courses = [
    {
      id: 1,
      title: "The Complete Python Masterclass: From Beginner to Pro",
      instructor: "Dr. Sarah Jenkins",
      category: "Programming",
      lessons: 12,
      rating: 4.9,
      reviews: "12.4k",
      students: "45k",
      price: "$49.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAcBYJvPlGYYCLSVfFV3AGchxBKvmGYE7fZe9odtAP8cKYRCJsVzrszyozT8H9o97p_xMlgMHboY-xETEr1X6SF44nhfnZynAyYuQTtCjue6Pa355gs6WrhIPhMW-uH9XkX0hwhnEdsBxb8G6TUHwAfott6wIMfw_x8watJPNdxmt48kx-O1lzxkBKUn2lcTt8hM3H8hhQa1DhdU59j0JvtQLHLvV3SSNY26KF1wIlhjd645riWUy-_NEnng082h_A7x0k1cKtvr4A",
      match: "98%",
      color: "blue",
    },
    {
      id: 2,
      title: "Modern UX/UI Design Systems with Figma",
      instructor: "Marc Arlow",
      category: "Design",
      lessons: 8,
      rating: 4.7,
      reviews: "5.8k",
      students: "18k",
      price: "$24.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDOWPTwkNaaRQQ0xplbXJaPwomxcRlUuIrtb7H1AqTT3gKn575bODxfpRInyYyS0S1iEDvo7p8139-ipB2hhvyDiqMVsdGVyaUJVCUF8_6jKjtcgl9x1IoUM7mBPrUx9paKJvV4VnGJLrPKMYcmpBbmhySOJMaO50gkzk_1lJIjcVGEs2ht7gnC-b17qK2mAtgW91RYAc_1XoArotjoMaAosE-8NB-xMLQHNqZQDF9JPzgTcyvy0SUwE8_jN4cC0jdqqJSU1FLJ43w",
      match: "92%",
      color: "purple",
    },
    {
      id: 3,
      title: "Practical Machine Learning for Data Scientists",
      instructor: "Prof. Emily Chen",
      category: "Data Science",
      lessons: 15,
      rating: 4.8,
      reviews: "8.2k",
      students: "32k",
      price: "Free",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuCM-V_WLsswZ3AxUnB6yj_iZHYZpblENMGUQZ6c6MGrbR5Afp5wq-Ir8hH7bPQxriRScPQBU8RJYKc7EoemowlM6f9rMj3BaBnAgZ1EjYpG3n0cTCP7eOEuCmtJtEnLfjo1dm-6bcp7CrrXukAgjsLDq18dm0I6h30UipXnKxggyuayzvu9hfa9GPhtLAkR7LUcJTvkWWrL9HSEJ-aDnpoT9j3zjlLEPTOJs7bLI3GE4GCkIXDvNrQvnEdJQNmL_3eaZXyvyrVXAJ8",
      match: "85%",
      color: "emerald",
    },
    {
      id: 4,
      title: "Digital Marketing Strategy: Content & SEO",
      instructor: "Liam O'Connell",
      category: "Marketing",
      lessons: 10,
      rating: 4.5,
      reviews: "4.1k",
      students: "12k",
      price: "$39.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDn4CVjVpxNtDWnr0SUm9VgYCwNDdtyb_RtBIVwjVTYGxPU0e2YOovM0OOL5QrFhYYfddRroh_5yowMSmPcRwN89gFUXAuleH43vh7UCmODJtOf4rSjRj7r4G3iSCwv1QcRzmGUQeZr6AeaM_xANh8vDlcecAq99YjzdJ5KLTgnaBRAVeupc0vYo5dLHl3K-1bNJblTCbWBd68k5K0wRYw9JrXFZkNAuAr1UQAl-PSK_Ql7zTKpBrTmwm1SG-_ykih0-VWaQgND_yY",
      match: "76%",
      color: "orange",
    },
    {
      id: 5,
      title: "Full-Stack Web Development Bootcamp 2024",
      instructor: "Angela Wright",
      category: "Programming",
      lessons: 22,
      rating: 4.9,
      reviews: "22.4k",
      students: "89k",
      price: "$89.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAVZcShOG2UWEO1fYk2nB21fQ6Yzpjz57KmAFtMwZw6H715oVL3WIg_F0nCq-IsY9Pt0pu0Gfublx1nrcCvT9hvbl7Pk71bPy27yV-fecTvNMelYRD_slWIQ54AcILT6MyUPYdTR6wFp8wcs5yFWpK2t9nK2efhopn8rKXHnpjcAjhjd4wcDdqtCBQ87-5Nl10L865dAYE77owHPcULpSweo2f2-YooKWFuPm7Uzw-2I1QYlSv2QMM5lJSbzlj4zLY_wD7LsD_Jj8E",
      match: "95%",
      color: "blue",
    },
    {
      id: 6,
      title: "Graphic Design Masterclass: Theory & Practice",
      instructor: "David Miller",
      category: "Design",
      lessons: 6,
      rating: 4.6,
      reviews: "3.2k",
      students: "9k",
      price: "$19.99",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuC7GwqENr0iSf9wGc98BNcdC1OMh008udRG_xe63qXJ70PGsWbENcv2WUwlXKX4vbizMIaYWIlhiPVE24hSBgMTz0HvzvLue-WubWsHZth-1pvzFF5PbFishTkMGIHqRa_YHLwnAa6shO15hYpgUTBag4063Y9tx7F6NK4nyVNB41DWa4GtoJzXMffBVYe6OmuZFGJNLHfg07vqluvjhvHDZnFxH6a6FO0NuKEE1cRH_ECSm7x7-h6cUJLrlwvDMNAnqkjtdfnMgvA",
      match: "81%",
      color: "purple",
    },
  ];

  // Helper to dynamically get color classes based on category color
  const getBadgeStyle = (color: string) => {
    const styles: Record<string, string> = {
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      purple:
        "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      emerald:
        "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400",
      orange:
        "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400",
    };
    return styles[color] || styles.blue;
  };

  return (
    <div className="flex-1 h-full overflow-y-auto bg-[#f6f6f8] dark:bg-[#121121] p-6 font-sans text-slate-900 dark:text-slate-100">
      {/* Top Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
          <button className="px-5 py-2 rounded-full bg-[#5048e5] text-white text-sm font-bold shadow-md">
            Trending
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Newest
          </button>
          <button className="px-5 py-2 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-sm font-medium border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Highest Rated
          </button>
        </div>
        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>Showing 1-12 of 148 courses</span>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-8">
        {/* Left Sidebar: Filters */}
        <aside className="w-full xl:w-64 shrink-0 space-y-6">
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-sm">Refine Search</h3>
              <button className="text-xs text-[#5048e5] font-bold hover:underline">
                Clear All
              </button>
            </div>

            <div className="space-y-6">
              {/* Category Filter */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Category
                </p>
                <div className="space-y-2">
                  {[
                    "Programming",
                    "Design & Creative",
                    "Data Science",
                    "Marketing",
                  ].map((cat, i) => (
                    <label
                      key={cat}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={i === 0}
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />
                      <span className="text-sm font-medium">{cat}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Level Filter */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Level
                </p>
                <div className="space-y-2">
                  {["Beginner", "Intermediate", "Advanced"].map((level, i) => (
                    <label
                      key={level}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        defaultChecked={i === 1}
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />
                      <span className="text-sm font-medium">{level}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Duration Filter */}
              <div>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Duration
                </p>
                <div className="space-y-2">
                  {["0-2 Hours", "3-6 Hours", "6+ Hours"].map((dur) => (
                    <label
                      key={dur}
                      className="flex items-center gap-3 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />
                      <span className="text-sm font-medium">{dur}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* AI Match Widget */}
          <div className="bg-gradient-to-br from-[#5048e5] to-indigo-600 rounded-xl p-5 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-sm mb-2">AI Course Match</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                We&apos;ve found 4 courses that match your career goals and
                previous learning history.
              </p>
              <button className="mt-4 w-full py-2 bg-white/20 hover:bg-white/30 rounded-lg text-xs font-bold transition-colors">
                See Matches
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-7xl text-white/10 rotate-12">
              auto_awesome
            </span>
          </div>
        </aside>

        {/* Main Content: Course Grid */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() =>
                  router.push(`/users/student/portal/courses/${course.id}`)
                }
              >
                {/* Course Image */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    alt={course.title}
                    className="w-full h-full object-cover"
                    src={course.image}
                  />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-white/95 dark:bg-slate-900/95 backdrop-blur px-2.5 py-1 rounded-lg text-[10px] font-bold text-[#5048e5] shadow-sm flex items-center gap-1">
                      <span className="material-symbols-outlined text-[14px]">
                        auto_awesome
                      </span>
                      {course.match} Match
                    </span>
                  </div>
                  <button className="absolute top-3 right-3 size-8 rounded-full bg-white/20 backdrop-blur text-white flex items-center justify-center hover:bg-white/40 transition-all">
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      favorite
                    </span>
                  </button>
                </div>

                {/* Course Details */}
                <div className="p-5 flex flex-col flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${getBadgeStyle(course.color)}`}
                    >
                      {course.category}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium">
                      • {course.lessons} Lessons
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {course.title}
                  </h3>
                  <p className="text-xs text-slate-500 mb-4 font-medium">
                    {course.instructor}
                  </p>

                  {/* Rating & Students */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-1 text-amber-500">
                      <span
                        className="material-symbols-outlined text-[18px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                        {course.rating}
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        ({course.reviews})
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-slate-500">
                      <span className="material-symbols-outlined text-[18px]">
                        group
                      </span>
                      <span className="text-xs font-medium">
                        {course.students} Students
                      </span>
                    </div>
                  </div>

                  {/* Footer Price & Action */}
                  <div className="mt-auto pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span
                      className={`text-lg font-bold ${course.price === "Free" ? "text-emerald-600 dark:text-emerald-400" : "text-slate-900 dark:text-white"}`}
                    >
                      {course.price}
                    </span>
                    <button className="px-4 py-2 bg-[#5048e5] text-white hover:opacity-90 rounded-lg text-sm font-bold shadow-lg shadow-[#5048e5]/20 transition-all">
                      Enroll Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-12 flex items-center justify-center gap-2 pb-10">
            <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#5048e5] transition-colors">
              <span className="material-symbols-outlined">chevron_left</span>
            </button>
            <button className="size-10 rounded-xl bg-[#5048e5] text-white font-bold text-sm">
              1
            </button>
            <button className="size-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:border-[#5048e5] transition-colors">
              2
            </button>
            <button className="size-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:border-[#5048e5] transition-colors">
              3
            </button>
            <span className="px-2 text-slate-400">...</span>
            <button className="size-10 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 font-bold text-sm hover:border-[#5048e5] transition-colors">
              12
            </button>
            <button className="size-10 flex items-center justify-center rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-400 hover:text-[#5048e5] transition-colors">
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
