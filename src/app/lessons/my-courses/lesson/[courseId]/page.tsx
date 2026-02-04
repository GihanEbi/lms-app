"use client";

import React, { useState } from "react";
import { PlayerHeader } from "@/src/components/lesson/player/PlayerHeader";
import { PlayerSidebar } from "@/src/components/lesson/player/PlayerSidebar";
import { PlayerRightPanel } from "@/src/components/lesson/player/PlayerRightPanel";

type MobileTab = "lesson" | "course" | "ai";

export default function CoursePlayerPage() {
  const [mobileTab, setMobileTab] = useState<MobileTab>("lesson");

  return (
    <div className="flex flex-col h-screen bg-[#f6f6f8] dark:bg-[#0a0a0c] font-sans overflow-hidden">
      {/* 1. Header (Always Visible) */}
      <PlayerHeader />

      {/* 2. Mobile Tab Navigation (Hidden on Large Screens) */}
      <div className="lg:hidden flex items-center border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a192e] shrink-0">
        <button
          onClick={() => setMobileTab("lesson")}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
            mobileTab === "lesson"
              ? "border-[#5048e5] text-[#5048e5]"
              : "border-transparent text-slate-500"
          }`}
        >
          Lesson
        </button>
        <button
          onClick={() => setMobileTab("course")}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
            mobileTab === "course"
              ? "border-[#5048e5] text-[#5048e5]"
              : "border-transparent text-slate-500"
          }`}
        >
          Course
        </button>
        <button
          onClick={() => setMobileTab("ai")}
          className={`flex-1 py-3 text-sm font-bold text-center border-b-2 transition-colors ${
            mobileTab === "ai"
              ? "border-[#5048e5] text-[#5048e5]"
              : "border-transparent text-slate-500"
          }`}
        >
          AI & Notes
        </button>
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* --- LEFT SIDEBAR (Course Outline) --- */}
        {/* Visible on Desktop OR when Mobile Tab is 'course' */}
        <div
          className={`
            bg-white dark:bg-[#1a192e] border-r border-slate-200 dark:border-slate-800
            transition-all duration-300
            ${mobileTab === "course" ? "flex w-full absolute inset-0 z-20" : "hidden lg:block lg:w-80 lg:relative"}
          `}
        >
          {/* We wrap the component to ensure it takes full height/width available in this container */}
          <div className="w-full h-full">
            <PlayerSidebar />
          </div>
        </div>

        {/* --- CENTER CONTENT (Video & Text) --- */}
        {/* Visible on Desktop OR when Mobile Tab is 'lesson' */}
        <section
          className={`
            flex-1 flex-col bg-[#f6f6f8] dark:bg-[#0a0a0c] overflow-y-auto custom-scrollbar relative
            ${mobileTab === "lesson" ? "flex" : "hidden lg:flex"}
          `}
        >
          {/* Video Player */}
          <div className="p-4 md:p-6">
            <div className="relative group bg-black aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
              <div
                className="absolute inset-0 flex items-center justify-center bg-cover bg-center opacity-80"
                style={{
                  backgroundImage:
                    'url("https://picsum.photos/1280/720?random=1")',
                }}
              >
                <button className="size-16 md:size-20 rounded-full bg-[#5048e5]/90 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <span
                    className="material-symbols-outlined text-3xl md:text-4xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </button>
              </div>

              {/* Fake Controls */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex h-1.5 w-full items-center mb-4 cursor-pointer">
                  <div className="h-full bg-[#5048e5] w-1/3 rounded-l-full relative">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 size-4 bg-white rounded-full shadow-md scale-100"></div>
                  </div>
                  <div className="h-full bg-white/30 flex-1 rounded-r-full"></div>
                </div>
                <div className="flex items-center justify-between text-white">
                  <div className="flex items-center gap-4">
                    <span className="material-symbols-outlined cursor-pointer">
                      pause
                    </span>
                    <span className="material-symbols-outlined cursor-pointer">
                      skip_next
                    </span>
                    <span className="material-symbols-outlined cursor-pointer">
                      volume_up
                    </span>
                    <span className="text-xs font-mono">08:42 / 24:15</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold px-2 py-0.5 border border-white/20 rounded hidden sm:block">
                      1.25x
                    </span>
                    <span className="material-symbols-outlined cursor-pointer">
                      fullscreen
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Details */}
          <div className="px-4 md:px-6 pb-24">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h2 className="text-xl md:text-2xl font-black text-[#0f0e1b] dark:text-white mb-1">
                  03. Neural Network Architectures
                </h2>
                <div className="flex items-center gap-3">
                  <div
                    className="size-6 rounded-full bg-cover"
                    style={{
                      backgroundImage:
                        'url("https://ui-avatars.com/api/?name=Sarah+Chen&background=random")',
                    }}
                  ></div>
                  <p className="text-xs md:text-sm text-[#545095] dark:text-gray-400">
                    Instructor:{" "}
                    <span className="font-bold text-[#0f0e1b] dark:text-white">
                      Dr. Sarah Chen
                    </span>{" "}
                    • Published Dec 2023
                  </p>
                </div>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a192e] text-sm font-bold border border-[#e8e8f3] dark:border-[#2a293d] hover:bg-gray-50 dark:hover:bg-[#25243d] transition-colors text-slate-700 dark:text-white">
                  <span className="material-symbols-outlined text-lg">
                    download
                  </span>{" "}
                  <span className="hidden sm:inline">Resources</span>
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-white dark:bg-[#1a192e] text-sm font-bold border border-[#e8e8f3] dark:border-[#2a293d] hover:bg-gray-50 dark:hover:bg-[#25243d] transition-colors text-slate-700 dark:text-white">
                  <span className="material-symbols-outlined text-lg">
                    share
                  </span>{" "}
                  <span className="hidden sm:inline">Share</span>
                </button>
              </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-[#d2d1e6] dark:border-[#2a293d] flex gap-4 md:gap-8 mb-6 overflow-x-auto no-scrollbar">
              <button className="border-b-2 border-[#5048e5] text-[#5048e5] pb-3 text-sm font-bold whitespace-nowrap">
                Overview
              </button>
              <button className="text-[#545095] dark:text-gray-400 pb-3 text-sm font-bold hover:text-[#5048e5] transition-colors whitespace-nowrap">
                Transcript
              </button>
              <button className="text-[#545095] dark:text-gray-400 pb-3 text-sm font-bold hover:text-[#5048e5] transition-colors whitespace-nowrap">
                Discussions (24)
              </button>
              <button className="text-[#545095] dark:text-gray-400 pb-3 text-sm font-bold hover:text-[#5048e5] transition-colors whitespace-nowrap">
                Reviews
              </button>
            </div>

            {/* Description Text */}
            <div className="prose dark:prose-invert max-w-none text-[#545095] dark:text-gray-300 text-sm md:text-base">
              <p className="mb-4">
                In this lesson, we explore the fundamental building blocks of
                neural networks. We&apos;ll cover the transition from simple
                perceptrons to multi-layer architectures, discussing the
                mathematical foundations of input, hidden, and output layers.
              </p>
              <h4 className="text-[#0f0e1b] dark:text-white font-bold mb-2">
                Key Takeaways:
              </h4>
              <ul className="list-disc pl-5 space-y-1 mb-6">
                <li>Understanding Weight Matrices and Biases</li>
                <li>Non-linear Activation Functions (ReLU, Sigmoid, Tanh)</li>
                <li>Forward Propagation Mechanics</li>
              </ul>
            </div>
          </div>
        </section>

        {/* --- RIGHT PANEL (AI & Notes) --- */}
        {/* Visible on Desktop (xl) OR when Mobile Tab is 'ai' */}
        <div
          className={`
            bg-white dark:bg-[#1a192e] border-l border-slate-200 dark:border-slate-800
            transition-all duration-300
            ${mobileTab === "ai" ? "flex w-full absolute inset-0 z-20" : "hidden xl:block xl:w-[400px] xl:relative"}
          `}
        >
          <div className="w-full h-full">
            <PlayerRightPanel />
          </div>
        </div>
      </div>

      {/* 4. Footer Navigation (Fixed Bottom) */}
      <footer className="h-16 bg-white dark:bg-[#1a192e] border-t border-[#e8e8f3] dark:border-[#2a293d] fixed bottom-0 left-0 right-0 z-50 flex items-center px-4 md:px-6 justify-between">
        <div className="flex items-center gap-3 md:gap-4">
          <button className="flex items-center gap-2 px-3 md:px-4 py-2 rounded-xl text-sm font-bold text-[#545095] dark:text-gray-400 hover:bg-[#f6f6f8] dark:hover:bg-[#2a293d] transition-colors">
            <span className="material-symbols-outlined">chevron_left</span>{" "}
            <span className="hidden sm:inline">Previous</span>
          </button>
          <div className="h-8 w-px bg-[#e8e8f3] dark:bg-[#2a293d]"></div>
          <button className="flex items-center gap-2 px-4 md:px-6 py-2 rounded-xl text-sm font-bold bg-[#5048e5] text-white hover:bg-[#5048e5]/90 transition-shadow shadow-lg shadow-[#5048e5]/20">
            <span className="hidden sm:inline">Next Lesson</span>
            <span className="sm:hidden">Next</span>
            <span className="material-symbols-outlined">chevron_right</span>
          </button>
        </div>

        {/* Center Progress (Hidden on mobile) */}
        <div className="hidden lg:flex flex-1 items-center justify-center px-20">
          <div className="w-full max-w-md flex items-center gap-4">
            <span className="text-xs font-bold text-[#545095] dark:text-gray-400 whitespace-nowrap">
              8 of 12 Lessons
            </span>
            <div className="flex-1 bg-[#f6f6f8] dark:bg-[#2a293d] h-2 rounded-full">
              <div className="bg-[#5048e5] h-full w-[66%] rounded-full shadow-[0_0_8px_rgba(80,72,229,0.4)]"></div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-3">
          <button className="p-2 text-[#545095] dark:text-gray-400 hover:bg-[#f6f6f8] dark:hover:bg-[#2a293d] rounded-lg hidden sm:block">
            <span className="material-symbols-outlined">playlist_add</span>
          </button>
          <button className="p-2 text-[#5048e5] bg-[#5048e5]/10 rounded-lg">
            <span className="material-symbols-outlined">bookmark</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
