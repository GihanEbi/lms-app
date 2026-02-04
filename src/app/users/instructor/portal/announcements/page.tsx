"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorAnnouncementsPage() {
  const router = useRouter();
  const [filterCourse, setFilterCourse] = useState("All Courses");
  const [filterStatus, setFilterStatus] = useState("All Status");

  //   navigate to detail page

  const navigate = () => {
    router.push("/users/instructor/portal/announcements/detailed-view");
  };
  const announcements = [
    {
      id: 1,
      title: "Welcome to Module 3: Generative Models",
      course: "Advanced Machine Learning",
      date: "Oct 24, 2023",
      status: "Published",
      seen: "142/150",
      icon: "campaign",
      iconColor: "text-[#197fe6] bg-blue-50 dark:bg-blue-900/20",
    },
    {
      id: 2,
      title: "Mid-term Quiz Guidelines & Practice Materials",
      course: "Neural Network Fundamentals",
      date: "Scheduled for Oct 28, 2023",
      status: "Scheduled",
      seen: "0/88",
      icon: "schedule",
      iconColor: "text-amber-600 bg-amber-50 dark:bg-amber-900/20",
    },
    {
      id: 3,
      title: "Extra Credit Opportunity: AI Ethics Case Study",
      course: "Ethics in Artificial Intelligence",
      date: "Last edited 2 hours ago",
      status: "Draft",
      seen: "--",
      icon: "edit_note",
      iconColor: "text-slate-500 bg-slate-100 dark:bg-slate-800",
    },
    {
      id: 4,
      title: "Updated Syllabus for Fall 2023",
      course: "Data Science Foundations",
      date: "Sent Oct 15, 2023",
      status: "Published",
      seen: "210/210",
      icon: "campaign",
      iconColor: "text-[#197fe6] bg-blue-50 dark:bg-blue-900/20",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-emerald-100 text-emerald-600";
      case "Scheduled":
        return "bg-amber-100 text-amber-600";
      case "Draft":
        return "bg-slate-200 text-slate-600";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#f6f7f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-6 flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">
            My Announcements
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-[linear-gradient(135deg,#5048e5_0%,#7C3AED_100%)] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#5048e5]/20 hover:scale-[1.02] transition-all"
            onClick={() => {
              router.push(
                "/users/instructor/portal/announcements/cretate-announcement",
              );
            }}
          >
            <span className="material-symbols-outlined !text-xl">add</span>
            Create Announcement
          </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="p-8 space-y-6">
        {/* Filter Bar */}
        <div className="bg-white dark:bg-[#1a192e] p-4 rounded-2xl border border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-4 shadow-sm">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 !text-xl">
                search
              </span>
              <input
                className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#197fe6]/20 placeholder:text-slate-400 dark:text-white"
                placeholder="Search announcements..."
                type="text"
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Course:
              </span>
              <select
                className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm py-2 px-4 focus:ring-2 focus:ring-[#197fe6]/20 min-w-[160px] text-slate-700 dark:text-slate-200"
                value={filterCourse}
                onChange={(e) => setFilterCourse(e.target.value)}
              >
                <option>All Courses</option>
                <option>Introduction to AI</option>
                <option>Deep Learning Fundamentals</option>
                <option>Neural Networks 101</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-400 uppercase">
                Status:
              </span>
              <select
                className="bg-slate-50 dark:bg-slate-800 border-none rounded-xl text-sm py-2 px-4 focus:ring-2 focus:ring-[#197fe6]/20 min-w-[140px] text-slate-700 dark:text-slate-200"
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
              >
                <option>All Status</option>
                <option>Published</option>
                <option>Scheduled</option>
                <option>Draft</option>
              </select>
            </div>
          </div>
        </div>

        {/* Announcements List */}
        <div className="space-y-4">
          {announcements.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between hover:shadow-md transition-shadow gap-4"
            >
              {/* Left Info */}
              <div className="flex items-start gap-5 flex-1">
                <div
                  className={`size-12 rounded-xl flex items-center justify-center ${item.iconColor}`}
                >
                  <span className="material-symbols-outlined">{item.icon}</span>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-slate-900 dark:text-white hover:text-[#197fe6] cursor-pointer transition-colors">
                      {item.title}
                    </h3>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-tight ${getStatusBadge(item.status)}`}
                    >
                      {item.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-slate-500 font-medium flex-wrap">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined !text-sm">
                        book
                      </span>
                      {item.course}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined !text-sm">
                        calendar_today
                      </span>
                      {item.date}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center gap-4 md:gap-12 justify-between md:justify-end w-full md:w-auto border-t md:border-none border-slate-100 dark:border-slate-800 pt-4 md:pt-0">
                <div
                  className={`flex flex-col items-center ${item.status === "Draft" ? "opacity-40" : ""}`}
                >
                  <span className="text-sm font-bold text-slate-900 dark:text-white">
                    {item.seen}
                  </span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Seen by students
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    className="px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 transition-colors"
                    onClick={navigate}
                  >
                    View Audience
                  </button>
                  <button className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors">
                    <span className="material-symbols-outlined">more_vert</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between py-4 border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-500 font-medium tracking-wide uppercase">
            Showing 4 of 12 announcements
          </p>
          <div className="flex items-center gap-2">
            <button className="size-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-400 cursor-not-allowed">
              <span className="material-symbols-outlined !text-sm">
                chevron_left
              </span>
            </button>
            <button className="size-8 rounded-lg bg-[#197fe6] text-white font-bold text-xs flex items-center justify-center shadow-md shadow-[#197fe6]/20">
              1
            </button>
            <button className="size-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              2
            </button>
            <button className="size-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              3
            </button>
            <button className="size-8 rounded-lg border border-slate-200 dark:border-slate-700 flex items-center justify-center text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              <span className="material-symbols-outlined !text-sm">
                chevron_right
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
