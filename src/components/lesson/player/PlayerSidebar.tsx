"use client";

import React from "react";

export function PlayerSidebar() {
  return (
    <aside className="w-80 flex-shrink-0 border-r border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192e] flex flex-col h-full overflow-hidden">
      {/* Course Info Header */}
      <div className="p-5 border-b border-[#e8e8f3] dark:border-[#2a293d] flex-shrink-0">
        <h1 className="text-[#0f0e1b] dark:text-white text-base font-bold mb-1 truncate">
          Deep Learning Foundations
        </h1>
        <div className="flex items-center justify-between mb-3">
          <p className="text-[#545095] dark:text-gray-400 text-xs font-medium">
            65% Course Completed
          </p>
          <span className="text-xs font-bold text-[#5048e5]">8/12</span>
        </div>
        <div className="w-full bg-[#e8e8f3] dark:bg-[#2a293d] h-1.5 rounded-full overflow-hidden">
          <div className="bg-[#5048e5] h-full w-[65%]"></div>
        </div>
      </div>

      {/* Modules List */}
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-1">
        {/* Module 1 */}
        <div className="px-3 py-2 text-[11px] font-bold text-[#545095] dark:text-gray-500 uppercase tracking-wider">
          Module 1: Introduction
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#545095] hover:bg-[#f6f6f8] dark:hover:bg-[#2a293d] cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-green-500 text-lg">
            check_circle
          </span>
          <p className="text-sm font-medium line-clamp-1">
            01. What is Deep Learning?
          </p>
        </div>

        {/* Module 2 */}
        <div className="px-3 py-2 text-[11px] font-bold text-[#545095] dark:text-gray-500 uppercase tracking-wider mt-4">
          Module 2: AI Basics
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#545095] hover:bg-[#f6f6f8] dark:hover:bg-[#2a293d] cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-green-500 text-lg">
            check_circle
          </span>
          <p className="text-sm font-medium line-clamp-1">
            02. Linear Regression Recap
          </p>
        </div>

        {/* Active Lesson */}
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-[#5048e5]/10 border border-[#5048e5]/20 text-[#5048e5] cursor-pointer">
          <span
            className="material-symbols-outlined text-lg"
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            play_circle
          </span>
          <p className="text-sm font-bold line-clamp-1">
            03. Neural Network Architectures
          </p>
        </div>

        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#0f0e1b] dark:text-gray-300 hover:bg-[#f6f6f8] dark:hover:bg-[#2a293d] cursor-pointer transition-colors">
          <span className="material-symbols-outlined text-lg">assignment</span>
          <p className="text-sm font-medium line-clamp-1">
            04. Quiz: Layer Foundations
          </p>
        </div>

        {/* Module 3 */}
        <div className="px-3 py-2 text-[11px] font-bold text-[#545095] dark:text-gray-500 uppercase tracking-wider mt-4">
          Module 3: Optimization
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#545095] opacity-50 cursor-not-allowed">
          <span className="material-symbols-outlined text-lg">lock</span>
          <p className="text-sm font-medium line-clamp-1">
            05. Backpropagation Theory
          </p>
        </div>
        <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-[#545095] opacity-50 cursor-not-allowed">
          <span className="material-symbols-outlined text-lg">lock</span>
          <p className="text-sm font-medium line-clamp-1">
            06. Stochastic Gradient Descent
          </p>
        </div>
      </div>

      {/* Expand Button */}
      <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2a293d] flex-shrink-0">
        <button className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[#f6f6f8] dark:bg-[#2a293d] text-[#0f0e1b] dark:text-white text-sm font-bold border border-[#d2d1e6] dark:border-[#3a3952] hover:bg-gray-200 dark:hover:bg-[#333152] transition-colors">
          <span className="material-symbols-outlined text-lg">unfold_more</span>
          Expand All Modules
        </button>
      </div>
    </aside>
  );
}
