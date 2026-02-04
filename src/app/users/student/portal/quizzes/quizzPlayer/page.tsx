"use client";

import React, { useState } from "react";

export default function QuizPlayerPage() {
  // State for the flag toggle
  const [isFlagged, setIsFlagged] = useState(false);
  // State for selected option
  const [selectedOption, setSelectedOption] = useState("A");

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#111921] text-[#0e141b] dark:text-slate-100 font-sans flex flex-col transition-colors duration-200">
      {/* Sticky Header */}
      <header className="sticky top-0 z-50 bg-white dark:bg-[#1a242e] border-b border-solid border-[#e7edf3] dark:border-slate-700 px-4 md:px-10 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
          <div className="flex flex-col">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Course
            </p>
            <p className="text-sm font-medium">Python Basics</p>
          </div>
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          {/* Timer */}
          <div className="flex items-center gap-2 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-700/50 px-3 py-1.5 rounded-lg">
            <span className="material-symbols-outlined text-yellow-600 dark:text-yellow-500 text-lg">
              timer
            </span>
            <div className="flex items-center gap-1 font-mono text-lg font-bold text-yellow-700 dark:text-yellow-500">
              <span>23</span>
              <span>:</span>
              <span>45</span>
            </div>
          </div>

          <div className="hidden md:flex flex-col items-end">
            <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <span className="material-symbols-outlined text-sm animate-pulse">
                cloud_done
              </span>
              <span className="text-xs font-medium">Auto-saving...</span>
            </div>
            <p className="text-sm font-bold text-[#197fe6]">Question 8 of 20</p>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col lg:flex-row max-w-[1440px] mx-auto w-full p-4 md:p-8 gap-8 pb-16">
        {/* Left Sidebar / Progress Ring */}
        <aside className="w-full lg:w-72 order-2 lg:order-1 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1a242e] rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#197fe6]">
                analytics
              </span>
              Overall Progress
            </h3>
            <div className="relative flex items-center justify-center py-2">
              <svg className="size-32 transform -rotate-90">
                <circle
                  className="text-slate-100 dark:text-slate-800"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="54"
                  stroke="currentColor"
                  strokeWidth="8"
                ></circle>
                <circle
                  className="text-[#197fe6] transition-all duration-300"
                  cx="64"
                  cy="64"
                  fill="transparent"
                  r="54"
                  stroke="currentColor"
                  strokeDasharray="339.292"
                  strokeDashoffset="135.7"
                  strokeLinecap="round"
                  strokeWidth="8"
                ></circle>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">60%</span>
                <span className="text-[10px] text-slate-400 font-bold">
                  COMPLETED
                </span>
              </div>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <div className="flex justify-between text-xs font-medium">
                <span className="text-slate-500">12 Answered</span>
                <span className="text-slate-500">8 Remaining</span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-1.5">
                <div
                  className="bg-[#197fe6] h-1.5 rounded-full"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>
          </div>

          {/* Question Navigator Grid */}
          <div className="bg-white dark:bg-[#1a242e] rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex-1">
            <h3 className="text-sm font-bold mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#197fe6]">
                grid_view
              </span>
              Question Navigator
            </h3>
            <div className="grid grid-cols-5 gap-2">
              {/* Completed */}
              {[1, 2, 3].map((num) => (
                <button
                  key={num}
                  className="aspect-square flex items-center justify-center rounded-lg bg-[#197fe6] text-white text-xs font-bold"
                >
                  {num}
                </button>
              ))}

              {/* Flagged */}
              <button className="aspect-square flex items-center justify-center rounded-lg bg-yellow-400 text-white text-xs font-bold relative">
                4
                <span className="absolute -top-1 -right-1 material-symbols-outlined text-[12px] text-yellow-600 fill-current bg-white rounded-full">
                  flag
                </span>
              </button>

              {/* Completed */}
              {[5, 6, 7].map((num) => (
                <button
                  key={num}
                  className="aspect-square flex items-center justify-center rounded-lg bg-[#197fe6] text-white text-xs font-bold"
                >
                  {num}
                </button>
              ))}

              {/* Current */}
              <button className="aspect-square flex items-center justify-center rounded-lg border-2 border-[#197fe6] text-[#197fe6] text-xs font-black bg-[#197fe6]/10">
                8
              </button>

              {/* Unanswered */}
              {Array.from({ length: 12 }, (_, i) => i + 9).map((num) => (
                <button
                  key={num}
                  className="aspect-square flex items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-400 text-xs font-bold"
                >
                  {num}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3">
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="size-3 rounded bg-[#197fe6]"></span>
                <span>Answered</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="size-3 rounded bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700"></span>
                <span>Unanswered</span>
              </div>
              <div className="flex items-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-400">
                <span className="size-3 rounded bg-yellow-400"></span>
                <span>Flagged for review</span>
              </div>
            </div>
          </div>
        </aside>

        {/* Question Body Area */}
        <section className="flex-1 order-1 lg:order-2 flex flex-col gap-6">
          <div className="bg-white dark:bg-[#1a242e] rounded-xl shadow-md border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col">
            <div className="p-8 flex flex-col gap-6">
              {/* Question Header */}
              <div className="flex flex-col gap-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#197fe6]/10 text-[#197fe6] rounded-full w-fit">
                  <span className="material-symbols-outlined text-sm font-bold">
                    code
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wide">
                    Logic & Loops
                  </span>
                </div>
                <h1 className="text-xl md:text-2xl font-bold leading-tight">
                  What is the output of the following list comprehension snippet
                  in Python?
                </h1>
              </div>

              {/* Code Snippet */}
              <div className="bg-slate-900 rounded-lg p-5 font-mono text-sm leading-relaxed overflow-x-auto border border-slate-800">
                <div className="flex gap-4">
                  <div className="text-slate-600 select-none text-right w-4">
                    1<br />2<br />3
                  </div>
                  <div className="text-slate-300">
                    <span className="text-pink-400">
                      # Python list comprehension
                    </span>
                    <br />
                    my_list = [x**<span className="text-orange-300">
                      2
                    </span>{" "}
                    <span className="text-blue-400">for</span> x{" "}
                    <span className="text-blue-400">in</span>{" "}
                    <span className="text-yellow-200">range</span>(
                    <span className="text-orange-300">5</span>){" "}
                    <span className="text-blue-400">if</span> x %{" "}
                    <span className="text-orange-300">2</span> =={" "}
                    <span className="text-orange-300">0</span>]<br />
                    <span className="text-yellow-200">print</span>(my_list)
                  </div>
                </div>
              </div>

              {/* Options List */}
              <div className="flex flex-col gap-4">
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">
                  Select one answer:
                </p>

                {/* Option A (Active) */}
                <label
                  className={`group flex items-center gap-4 rounded-xl border-2 p-5 cursor-pointer transition-colors ${selectedOption === "A" ? "border-[#197fe6] bg-[#197fe6]/5" : "border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                >
                  <input
                    type="radio"
                    name="quiz-options"
                    className="h-5 w-5 border-2 border-[#d0dbe7] bg-transparent text-transparent checked:border-[#197fe6] checked:bg-[image:var(--radio-dot-svg)] focus:outline-none focus:ring-0"
                    style={
                      {
                        "--radio-dot-svg":
                          "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(25,127,230)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
                      } as React.CSSProperties
                    }
                    checked={selectedOption === "A"}
                    onChange={() => setSelectedOption("A")}
                  />
                  <div className="flex grow items-center justify-between">
                    <div className="flex flex-col">
                      <p
                        className={`font-bold ${selectedOption === "A" ? "text-[#197fe6]" : "text-slate-700 dark:text-slate-200"}`}
                      >
                        [0, 4, 16]
                      </p>
                      <p
                        className={`${selectedOption === "A" ? "text-[#197fe6]/70" : "text-slate-400 dark:text-slate-500"} text-xs font-medium`}
                      >
                        Option A
                      </p>
                    </div>
                    {selectedOption === "A" && (
                      <span className="material-symbols-outlined text-[#197fe6] fill-current">
                        check_circle
                      </span>
                    )}
                  </div>
                </label>

                {/* Option B */}
                <label
                  className={`group flex items-center gap-4 rounded-xl border p-5 cursor-pointer transition-all ${selectedOption === "B" ? "border-[#197fe6] bg-[#197fe6]/5" : "border-slate-200 dark:border-slate-700 hover:border-[#197fe6]/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                >
                  <input
                    type="radio"
                    name="quiz-options"
                    className="h-5 w-5 border-2 border-slate-300 dark:border-slate-600 bg-transparent text-transparent checked:border-[#197fe6] checked:bg-[image:var(--radio-dot-svg)] focus:outline-none focus:ring-0"
                    style={
                      {
                        "--radio-dot-svg":
                          "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(25,127,230)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
                      } as React.CSSProperties
                    }
                    checked={selectedOption === "B"}
                    onChange={() => setSelectedOption("B")}
                  />
                  <div className="flex grow flex-col">
                    <p className="text-slate-700 dark:text-slate-200 font-medium">
                      [0, 1, 4, 9, 16]
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                      Option B
                    </p>
                  </div>
                </label>

                {/* Option C */}
                <label
                  className={`group flex items-center gap-4 rounded-xl border p-5 cursor-pointer transition-all ${selectedOption === "C" ? "border-[#197fe6] bg-[#197fe6]/5" : "border-slate-200 dark:border-slate-700 hover:border-[#197fe6]/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                >
                  <input
                    type="radio"
                    name="quiz-options"
                    className="h-5 w-5 border-2 border-slate-300 dark:border-slate-600 bg-transparent text-transparent checked:border-[#197fe6] checked:bg-[image:var(--radio-dot-svg)] focus:outline-none focus:ring-0"
                    style={
                      {
                        "--radio-dot-svg":
                          "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(25,127,230)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
                      } as React.CSSProperties
                    }
                    checked={selectedOption === "C"}
                    onChange={() => setSelectedOption("C")}
                  />
                  <div className="flex grow flex-col">
                    <p className="text-slate-700 dark:text-slate-200 font-medium">
                      [4, 16]
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                      Option C
                    </p>
                  </div>
                </label>

                {/* Option D */}
                <label
                  className={`group flex items-center gap-4 rounded-xl border p-5 cursor-pointer transition-all ${selectedOption === "D" ? "border-[#197fe6] bg-[#197fe6]/5" : "border-slate-200 dark:border-slate-700 hover:border-[#197fe6]/50 hover:bg-slate-50 dark:hover:bg-slate-800/50"}`}
                >
                  <input
                    type="radio"
                    name="quiz-options"
                    className="h-5 w-5 border-2 border-slate-300 dark:border-slate-600 bg-transparent text-transparent checked:border-[#197fe6] checked:bg-[image:var(--radio-dot-svg)] focus:outline-none focus:ring-0"
                    style={
                      {
                        "--radio-dot-svg":
                          "url('data:image/svg+xml,%3csvg viewBox=%270 0 16 16%27 fill=%27rgb(25,127,230)%27 xmlns=%27http://www.w3.org/2000/svg%27%3e%3ccircle cx=%278%27 cy=%278%27 r=%273%27/%3e%3c/svg%3e')",
                      } as React.CSSProperties
                    }
                    checked={selectedOption === "D"}
                    onChange={() => setSelectedOption("D")}
                  />
                  <div className="flex grow flex-col">
                    <p className="text-slate-700 dark:text-slate-200 font-medium">
                      [0, 2, 4]
                    </p>
                    <p className="text-slate-400 dark:text-slate-500 text-xs font-medium">
                      Option D
                    </p>
                  </div>
                </label>
              </div>
            </div>

            {/* Footer Section Inside Card */}
            <div className="bg-slate-50 dark:bg-slate-800/30 border-t border-slate-200 dark:border-slate-700 p-6 flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-6 w-full md:w-auto">
                <label className="flex items-center cursor-pointer group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isFlagged}
                      onChange={() => setIsFlagged(!isFlagged)}
                    />
                    <div
                      className={`w-10 h-6 rounded-full shadow-inner transition-colors ${isFlagged ? "bg-yellow-400" : "bg-slate-200 dark:bg-slate-700 group-hover:bg-slate-300"}`}
                    ></div>
                    <div
                      className={`dot absolute left-1 top-1 bg-white size-4 rounded-full transition-transform ${isFlagged ? "translate-x-4" : ""}`}
                    ></div>
                  </div>
                  <div className="ml-3 flex items-center gap-1.5 text-slate-600 dark:text-slate-400 font-medium text-sm select-none">
                    <span
                      className={`material-symbols-outlined text-lg ${isFlagged ? "text-yellow-500" : ""}`}
                    >
                      flag
                    </span>
                    Flag for Review
                  </div>
                </label>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 dark:border-slate-600 rounded-xl font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                  <span className="material-symbols-outlined">arrow_back</span>
                  Previous
                </button>
                <button className="flex-1 md:flex-none flex items-center justify-center gap-2 px-8 py-3 bg-[#197fe6] text-white rounded-xl font-bold hover:shadow-lg hover:bg-[#197fe6]/90 transition-all">
                  Next Question
                  <span className="material-symbols-outlined">
                    arrow_forward
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Hint / Accessibility Note */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 dark:bg-[#197fe6]/10 rounded-xl border border-blue-100 dark:border-[#197fe6]/20">
            <span className="material-symbols-outlined text-[#197fe6]">
              info
            </span>
            <p className="text-sm text-blue-800 dark:text-[#197fe6] leading-relaxed">
              <strong>Hint:</strong> Remember that{" "}
              <code className="bg-blue-100 dark:bg-[#197fe6]/20 px-1 rounded">
                range(5)
              </code>{" "}
              generates numbers from 0 to 4. The{" "}
              <code className="bg-blue-100 dark:bg-[#197fe6]/20 px-1 rounded">
                if x % 2 == 0
              </code>{" "}
              clause filters for even numbers.
            </p>
          </div>
        </section>
      </main>

      {/* Global Progress Bar Component (Bottom) */}
      <div className="fixed bottom-0 left-0 w-full h-1 bg-slate-100 dark:bg-slate-800 z-[60]">
        <div className="h-full bg-[#197fe6]" style={{ width: "40%" }}></div>
      </div>
    </div>
  );
}
