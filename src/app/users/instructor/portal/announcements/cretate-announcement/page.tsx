"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreateAnnouncementPage() {
  const [title, setTitle] = useState(
    "New Resource: Module 4 Supplementary Materials",
  );
  const [content, setContent] = useState(
    `Hello Students,\n\nI've just uploaded a series of supplementary reading materials for Module 4: Neural Architectures. These will help you better understand the concepts we discussed in Monday's lecture.\n\nYou can find them under the 'Resources' tab in the course portal.\n\nHappy studying!\nProf. Sarah Jenkins`,
  );
  const [course, setCourse] = useState("CS101: Introduction to Deep Learning");

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100 flex flex-col overflow-hidden relative">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Create New Announcement
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end mr-2">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Draft Status
            </p>
            <p className="text-xs font-semibold text-emerald-500">
              Auto-saved 2m ago
            </p>
          </div>
        </div>
      </header>

      {/* --- Main Split Content --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left: Editor */}
        <div className="w-1/2 p-8 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a192e]/50">
          <div className="max-w-2xl mx-auto space-y-10 pb-24">
            {/* Step 1 */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  General Information
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Announcement Title
                  </label>
                  <input
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white transition-all"
                    placeholder="e.g., Welcome to the course!"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Target Course
                  </label>
                  <select
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                  >
                    <option>Select a course</option>
                    <option>CS101: Introduction to Deep Learning</option>
                    <option>DS204: Advanced Data Visualization</option>
                    <option>MATH502: Stochastic Processes</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Step 2 */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Message
                </h3>
              </div>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1 p-2 bg-[#f6f7f8] dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 overflow-x-auto">
                  {[
                    "format_bold",
                    "format_italic",
                    "format_underlined",
                    "link",
                    "format_list_bulleted",
                    "format_list_numbered",
                    "image",
                    "code",
                  ].map((icon, i) => (
                    <React.Fragment key={icon}>
                      {(i === 3 || i === 6) && (
                        <div className="w-[1px] h-6 bg-slate-200 dark:bg-slate-600 mx-1"></div>
                      )}
                      <button
                        className={`p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400 ${icon === "code" ? "ml-auto" : ""}`}
                      >
                        <span className="material-symbols-outlined !text-xl font-bold">
                          {icon}
                        </span>
                      </button>
                    </React.Fragment>
                  ))}
                </div>
                <textarea
                  className="w-full bg-white dark:bg-[#1a192e] border-none px-6 py-6 text-sm text-slate-700 dark:text-slate-300 min-h-[300px] focus:ring-0 outline-none resize-none"
                  placeholder="Write your announcement message here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                ></textarea>
              </div>
            </section>
          </div>
        </div>

        {/* Right: Preview & Settings */}
        <div className="w-1/2 p-8 overflow-y-auto bg-[#f6f7f8] dark:bg-[#111921]/50">
          <div className="max-w-2xl mx-auto space-y-8 pb-24">
            {/* Step 3 */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Delivery Settings
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <label className="relative flex flex-col p-4 border-2 border-[#5048e5] bg-[#5048e5]/5 rounded-xl cursor-pointer">
                  <input
                    type="radio"
                    name="delivery"
                    defaultChecked
                    className="absolute top-4 right-4 text-[#5048e5] focus:ring-[#5048e5]"
                  />
                  <span className="material-symbols-outlined text-[#5048e5] mb-2">
                    send
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Send Immediately
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Blast to all students now
                  </span>
                </label>
                <label className="relative flex flex-col p-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a192e] rounded-xl cursor-pointer hover:border-slate-300 transition-colors">
                  <input
                    type="radio"
                    name="delivery"
                    className="absolute top-4 right-4 text-[#5048e5] focus:ring-[#5048e5]"
                  />
                  <span className="material-symbols-outlined text-slate-400 mb-2">
                    schedule
                  </span>
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    Schedule for later
                  </span>
                  <span className="text-xs text-slate-500 mt-1">
                    Set a date and time
                  </span>
                </label>
              </div>

              <div className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                  Notification Channels
                </h4>
                <div className="space-y-3">
                  {[
                    {
                      icon: "mail",
                      label: "Email Notification",
                      sub: "Standard delivery",
                    },
                    {
                      icon: "notifications",
                      label: "In-app Alert",
                      sub: "Dashboard banner",
                    },
                    {
                      icon: "smartphone",
                      label: "Mobile Push",
                      sub: "iOS & Android",
                    },
                  ].map((channel, i) => (
                    <label
                      key={i}
                      className="flex items-center gap-3 p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        defaultChecked
                        className="size-5 rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />
                      <div className="flex flex-col">
                        <span className="text-sm font-semibold text-slate-700 dark:text-slate-200">
                          {channel.label}
                        </span>
                        <span className="text-[10px] text-slate-400 uppercase font-bold">
                          {channel.sub}
                        </span>
                      </div>
                      <span className="material-symbols-outlined text-slate-400 ml-auto !text-lg">
                        {channel.icon}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </section>

            {/* Preview Card */}
            <div className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-slate-300"></div>
                  <div className="size-2.5 rounded-full bg-slate-300"></div>
                  <div className="size-2.5 rounded-full bg-slate-300"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Student Preview
                </span>
                <span className="material-symbols-outlined text-slate-400 !text-sm">
                  visibility
                </span>
              </div>
              <div className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="size-12 rounded-full bg-[#5048e5]/10 flex items-center justify-center text-[#5048e5]">
                    <span className="material-symbols-outlined">campaign</span>
                  </div>
                  <div>
                    <h2 className="text-xl font-black text-slate-900 dark:text-white leading-tight">
                      {title || "Announcement Title"}
                    </h2>
                    <p className="text-xs text-slate-500">
                      From: Prof. Sarah Jenkins • Today, 10:30 AM
                    </p>
                  </div>
                </div>
                <div className="prose prose-sm max-w-none text-slate-700 dark:text-slate-300 leading-relaxed space-y-4 whitespace-pre-wrap">
                  {content || "Announcement content preview..."}
                </div>
                <div className="mt-8 pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase">
                    {course.split(":")[0]}
                  </span>
                  <div className="flex gap-2">
                    <span className="material-symbols-outlined text-slate-300 !text-lg">
                      thumb_up
                    </span>
                    <span className="material-symbols-outlined text-slate-300 !text-lg">
                      comment
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer --- */}
      <footer className="fixed bottom-0 right-0 w-1/2 bg-white/90 dark:bg-[#1a192e]/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            Discard Draft
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Save as Draft
          </button>
          <button className="px-8 py-2.5 text-sm font-bold text-white bg-[#5048e5] rounded-xl hover:bg-[#5048e5]/90 transition-all shadow-lg shadow-[#5048e5]/25 flex items-center gap-2">
            Post Announcement
            <span className="material-symbols-outlined !text-sm">send</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
