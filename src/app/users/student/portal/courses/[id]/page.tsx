"use client";

import React from "react";
import Link from "next/link";

export default function CourseDetailsPage() {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 overflow-y-auto">
      {/* --- Hero Section --- */}
      <div className="bg-slate-900 text-white p-8 lg:px-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h1 className="text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Full Stack Web Development: From Zero to Mastery
              </h1>
              <p className="text-lg text-slate-300 mb-8 max-w-2xl leading-relaxed">
                Learn the most in-demand skills of 2024. Master HTML5, CSS3,
                JavaScript, React, Node.js, and MongoDB with hands-on
                AI-assisted learning.
              </p>

              <div className="flex flex-wrap items-center gap-6">
                <div className="flex items-center gap-3">
                  <img
                    alt="Instructor"
                    className="size-12 rounded-full border-2 border-white/20"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDeRO7_vPj6XUXTHBMBAZ4Jde4AfBYeEwQQ0axdM62ssLJeXnIfcyFHkIoO8-PN6w_k13PHBCPM68yBAzEv8neiViUMwmGVw2fb4Bi8LX3EJUrzXO0Ji7KEmHHB864fut_9BTVM0fQW_53fBI7XC84AoBOFzpPs0N7fhbC98KUX316_cP1OcPzPRwRSJGh4cX9dKbg7A2BODSchSniQ8QpeD-RHypKg8COXQLwb5xNwdPT-WvlhN9AAIXYelamDGCckYXYtCFzd07o"
                  />
                  <div>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                      Instructor
                    </p>
                    <p className="font-bold">Prof. Jonathan Miles</p>
                  </div>
                </div>

                <div className="h-10 w-px bg-white/10 hidden md:block"></div>

                <div className="flex items-center gap-2">
                  <div className="flex text-amber-400">
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span
                      className="material-symbols-outlined text-xl"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    <span className="material-symbols-outlined text-xl">
                      star_half
                    </span>
                  </div>
                  <span className="font-bold">4.8</span>
                  <span className="text-slate-400 text-sm">
                    (12,450 ratings)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Main Content --- */}
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-10">
        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-12 relative">
          {/* Left Column: Details */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tabs */}
            <div className="flex border-b border-slate-200 dark:border-slate-800 sticky top-0 bg-[#f6f6f8] dark:bg-[#121121] z-20 overflow-x-auto">
              <button className="px-6 py-4 text-sm font-bold text-[#5048e5] border-b-2 border-[#5048e5] whitespace-nowrap">
                Overview
              </button>
              <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
                Curriculum
              </button>
              <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
                Instructor
              </button>
              <button className="px-6 py-4 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors whitespace-nowrap">
                Reviews
              </button>
            </div>

            {/* Description */}
            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                Course Description
              </h2>
              <div className="prose dark:prose-invert max-w-none text-slate-600 dark:text-slate-400 leading-relaxed">
                This comprehensive course is designed for absolute beginners and
                junior developers looking to level up. We cover everything from
                the basic structural components of the web to deploying
                enterprise-grade applications.
              </div>

              <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800">
                <h3 className="font-bold mb-4 text-slate-900 dark:text-white">
                  What you&apos;ll learn
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-slate-700 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#5048e5] text-xl">
                      check_circle
                    </span>
                    <span className="text-sm">
                      Build 15+ real-world web applications for your portfolio.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#5048e5] text-xl">
                      check_circle
                    </span>
                    <span className="text-sm">
                      Master React Hooks, Context API, and Redux.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#5048e5] text-xl">
                      check_circle
                    </span>
                    <span className="text-sm">
                      Build secure RESTful APIs with Node.js and Express.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-[#5048e5] text-xl">
                      check_circle
                    </span>
                    <span className="text-sm">
                      Implement User Authentication and Authorization.
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* AI Personalization Widget */}
            <section className="bg-gradient-to-br from-[#5048e5]/10 to-indigo-600/10 rounded-2xl p-8 border border-[#5048e5]/20 relative overflow-hidden">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <span
                      className="material-symbols-outlined text-[#5048e5]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      auto_awesome
                    </span>
                    <span className="text-sm font-bold text-[#5048e5] uppercase tracking-widest">
                      AI Personalization
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-4 text-slate-900 dark:text-white">
                    Your Smart Learning Path
                  </h2>
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                    Our AI analyzed your previous &quot;Javascript Basics&quot;
                    score and optimized this curriculum. We&apos;ve fast-tracked
                    the Intro module and added a 1:1 session for Database
                    Design.
                  </p>
                  <button className="bg-[#5048e5] text-white px-6 py-2.5 rounded-xl font-bold text-sm shadow-lg shadow-[#5048e5]/20 hover:scale-105 transition-transform">
                    View Personalized Path
                  </button>
                </div>

                <div className="w-full md:w-64 space-y-3">
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-[#5048e5]/20 flex items-center gap-3">
                    <div className="size-8 rounded bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">
                      <span className="material-symbols-outlined text-sm">
                        fast_forward
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-white">
                      Intro HTML (Skipped)
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-[#5048e5]/20 flex items-center gap-3">
                    <div className="size-8 rounded bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                      <span className="material-symbols-outlined text-sm">
                        psychology
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-white">
                      New: DB Modeling Lab
                    </span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-3 rounded-lg border border-[#5048e5]/20 flex items-center gap-3 opacity-50">
                    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                      <span className="material-symbols-outlined text-sm">
                        lock
                      </span>
                    </div>
                    <span className="text-xs font-bold text-slate-700 dark:text-white">
                      Deployment Phase
                    </span>
                  </div>
                </div>
              </div>
              <span className="material-symbols-outlined absolute -right-8 -bottom-8 text-[120px] text-[#5048e5]/5 rotate-12 select-none">
                psychology
              </span>
            </section>

            {/* Curriculum Accordion */}
            <section className="space-y-6">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                  Course Curriculum
                </h2>
                <p className="text-sm font-medium text-slate-500">
                  12 Sections • 145 Lectures • 62h total length
                </p>
              </div>

              <div className="space-y-3">
                {/* Section 1 (Open) */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                  <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-slate-400">
                        expand_more
                      </span>
                      <span className="font-bold">
                        Section 1: The Modern Web Ecosystem
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      4 lectures • 45min
                    </span>
                  </button>
                  <div className="px-6 pb-4 border-t border-slate-100 dark:border-slate-800">
                    <div className="py-3 flex items-center justify-between group cursor-pointer text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400 group-hover:text-[#5048e5]">
                          play_circle
                        </span>
                        <span className="text-sm">Welcome to the Course</span>
                      </div>
                      <span className="text-xs font-bold text-[#5048e5]">
                        Preview
                      </span>
                    </div>
                    <div className="py-3 flex items-center justify-between group cursor-pointer opacity-70 text-slate-700 dark:text-slate-300">
                      <div className="flex items-center gap-3">
                        <span className="material-symbols-outlined text-slate-400">
                          play_circle
                        </span>
                        <span className="text-sm">How the Internet Works</span>
                      </div>
                      <span className="text-xs text-slate-400">08:20</span>
                    </div>
                  </div>
                </div>

                {/* Section 2 (Closed) */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                  <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-slate-400">
                        chevron_right
                      </span>
                      <span className="font-bold">
                        Section 2: Mastering Modern CSS & Grid
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      12 lectures • 4h 12min
                    </span>
                  </button>
                </div>

                {/* Section 3 (Closed) */}
                <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden bg-white dark:bg-slate-900">
                  <button className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors text-slate-900 dark:text-white">
                    <div className="flex items-center gap-4">
                      <span className="material-symbols-outlined text-slate-400">
                        chevron_right
                      </span>
                      <span className="font-bold">
                        Section 3: Javascript Fundamentals (Deep Dive)
                      </span>
                    </div>
                    <span className="text-xs text-slate-500">
                      25 lectures • 8h 45min
                    </span>
                  </button>
                </div>
              </div>

              <button className="w-full py-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-slate-500 font-bold hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all">
                Show All 12 Sections
              </button>
            </section>
          </div>

          {/* Right Column: Sticky Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* Course Card */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
                <div className="aspect-video relative group cursor-pointer">
                  <img
                    alt="Course Thumbnail"
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC136ACEuX99xEORU4rljwUrahHRMkeypCSaa9TCDdg0jJmGAppQ3huqtZ_F2i_gAV9AFApVb0YS89IgwiEm-QMlOC2JbkvlXxIU8YDSefyJyOZKeHpQETU9jqOrSbZp69O-DLsjNl7--U4miBdEXtxvC6a1PvnB7lB4PujR6SuNcmMZvy19fSxyl_tn8k1fTeu-QfUgkcy8TghzBbN6agJABzsGbg88Mp0iN3vl2lWlRnd7zgN2l97nqXV3LyJt_Tewnz2wesKJ2c"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="size-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <span
                        className="material-symbols-outlined text-white text-4xl"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        play_arrow
                      </span>
                    </div>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-3xl font-bold text-slate-900 dark:text-white">
                      $89.99
                    </span>
                    <span className="text-slate-400 line-through text-sm">
                      $149.99
                    </span>
                    <span className="text-green-600 dark:text-green-400 text-sm font-bold">
                      40% OFF
                    </span>
                  </div>
                  <button className="w-full py-4 bg-gradient-to-r from-[#5048e5] to-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-[#5048e5]/30 hover:shadow-[#5048e5]/40 transition-all mb-4">
                    Enroll Now
                  </button>
                  <button className="w-full py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors mb-6">
                    Add to Wishlist
                  </button>

                  <div className="space-y-4">
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                      This course includes:
                    </p>
                    <ul className="space-y-3 text-slate-700 dark:text-slate-300">
                      <li className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          videocam
                        </span>
                        <span>62 hours on-demand video</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          description
                        </span>
                        <span>15 articles & 12 downloadable resources</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          assignment
                        </span>
                        <span>8 coding assignments</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          workspace_premium
                        </span>
                        <span>Certificate of completion</span>
                      </li>
                      <li className="flex items-center gap-3 text-sm">
                        <span className="material-symbols-outlined text-slate-400 text-lg">
                          all_inclusive
                        </span>
                        <span>Full lifetime access</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Team Widget */}
              <div className="bg-[#5048e5]/5 dark:bg-[#5048e5]/10 rounded-2xl p-6 border border-[#5048e5]/20">
                <h4 className="font-bold text-sm mb-3 flex items-center gap-2 text-slate-900 dark:text-white">
                  <span className="material-symbols-outlined text-[#5048e5] text-xl">
                    corporate_fare
                  </span>
                  For Teams
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed mb-4">
                  Upskill your entire engineering team. Get 50% discount for 5+
                  seats.
                </p>
                <button className="text-[#5048e5] text-xs font-bold hover:underline">
                  EduLearn for Business →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
