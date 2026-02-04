"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreateQuizPage() {
  const [formData, setFormData] = useState({
    title: "Neural Network Fundamentals",
    category: "Artificial Intelligence",
    timeLimit: 30,
    passingScore: 70,
    randomize: true,
  });

  const handleChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="flex-1 flex flex-col min-h-screen bg-[#f6f6f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100 overflow-hidden relative">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Create New Quiz
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex flex-col items-end mr-2">
            <p className="text-xs font-bold text-slate-400 uppercase">
              Draft Status
            </p>
            <p className="text-xs font-semibold text-emerald-500">
              Auto-saved 1m ago
            </p>
          </div>
        </div>
      </header>

      {/* --- Main Content Split View --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form Editor */}
        <div className="w-1/2 p-8 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a192e]/50">
          <div className="max-w-2xl mx-auto space-y-10 pb-24">
            {/* Step 1: Basic Details */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Basic Details
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Quiz Title
                  </label>
                  <input
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white transition-all"
                    placeholder="e.g., Introduction to Deep Learning Concepts"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Category
                  </label>
                  <select
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                    value={formData.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                  >
                    <option>Computer Science</option>
                    <option>Artificial Intelligence</option>
                    <option>Data Science</option>
                    <option>Mathematics</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Step 2: Quiz Settings */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Quiz Settings
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Time Limit (Minutes)
                  </label>
                  <input
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                    type="number"
                    value={formData.timeLimit}
                    onChange={(e) => handleChange("timeLimit", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Passing Score (%)
                  </label>
                  <input
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                    type="number"
                    value={formData.passingScore}
                    onChange={(e) =>
                      handleChange("passingScore", e.target.value)
                    }
                  />
                </div>
                <div className="col-span-2">
                  <label className="flex items-center gap-3 p-4 border border-slate-200 dark:border-slate-700 rounded-xl cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    <input
                      type="checkbox"
                      checked={formData.randomize}
                      onChange={(e) =>
                        handleChange("randomize", e.target.checked)
                      }
                      className="size-5 rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                    />
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-slate-900 dark:text-white">
                        Randomize Questions
                      </span>
                      <span className="text-xs text-slate-500">
                        Each student gets questions in a different order
                      </span>
                    </div>
                  </label>
                </div>
              </div>
            </section>

            {/* Step 3: Question Builder */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-blue-100 dark:bg-blue-900/20 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Question Builder
                </h3>
              </div>
              <div className="space-y-4">
                {/* Question Item */}
                <div className="p-4 border border-slate-200 dark:border-slate-800 rounded-xl bg-slate-50/50 dark:bg-slate-800/30">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-400">
                        Q1
                      </span>
                      <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 text-[10px] font-bold uppercase">
                        Multiple Choice
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <button className="text-slate-400 hover:text-[#5048e5]">
                        <span className="material-symbols-outlined !text-lg">
                          edit
                        </span>
                      </button>
                      <button className="text-slate-400 hover:text-red-500">
                        <span className="material-symbols-outlined !text-lg">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-4">
                    What is the primary function of an activation function in a
                    neural network?
                  </p>
                  <div className="space-y-2">
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-100 dark:border-emerald-800/50">
                      <span className="material-symbols-outlined text-emerald-500 !text-sm">
                        check_circle
                      </span>
                      <span className="text-xs text-slate-700 dark:text-slate-300">
                        To introduce non-linearity into the model.
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                      <span className="size-4 rounded-full border border-slate-300"></span>
                      <span className="text-xs text-slate-700 dark:text-slate-300">
                        To speed up training time.
                      </span>
                    </div>
                  </div>
                </div>

                {/* Add New Buttons */}
                <div className="grid grid-cols-3 gap-3">
                  <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#5048e5] mb-1">
                      list
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Multiple Choice
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#5048e5] mb-1">
                      toggle_on
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      True/False
                    </span>
                  </button>
                  <button className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#5048e5] mb-1">
                      short_text
                    </span>
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      Short Answer
                    </span>
                  </button>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Right Column: Live Preview & AI */}
        <div className="w-1/2 p-8 overflow-y-auto bg-[#f6f7f8] dark:bg-[#111921]/50">
          <div className="max-w-2xl mx-auto space-y-8 pb-24">
            {/* AI Assistant */}
            <div className="bg-gradient-to-br from-[#5048e5]/5 to-indigo-500/5 border border-[#5048e5]/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5048e5]">
                    psychology
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    AI Quiz Assistant
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#5048e5]/10 text-[#5048e5] text-[10px] font-bold uppercase">
                  Pro
                </span>
              </div>
              <div className="space-y-4">
                <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-[#5048e5]/10">
                  <p className="text-xs text-slate-500 font-bold mb-2 uppercase">
                    Topic Suggestions
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                      Backpropagation
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                      Gradient Descent
                    </span>
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-700 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300">
                      CNN Basics
                    </span>
                  </div>
                </div>
                <div className="bg-[#5048e5]/5 p-4 rounded-xl border border-[#5048e5]/20">
                  <p className="text-xs text-[#5048e5] font-bold mb-2 uppercase">
                    Suggested Question
                  </p>
                  <p className="text-sm text-slate-700 dark:text-slate-300 mb-3">
                    &quot;Explain the vanishing gradient problem and how ReLU
                    helps mitigate it.&quot;
                  </p>
                  <button className="text-[#5048e5] text-xs font-bold flex items-center gap-1 hover:underline">
                    <span className="material-symbols-outlined !text-sm">
                      add_circle
                    </span>
                    Add to Question Builder
                  </button>
                </div>
              </div>
            </div>

            {/* Student View Preview */}
            <div className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-xl shadow-slate-200/50 dark:shadow-none">
              <div className="bg-slate-100 dark:bg-slate-800 px-6 py-3 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <div className="size-2.5 rounded-full bg-slate-300"></div>
                  <div className="size-2.5 rounded-full bg-slate-300"></div>
                  <div className="size-2.5 rounded-full bg-slate-300"></div>
                </div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                  Student View Preview
                </span>
                <span className="material-symbols-outlined text-slate-400 !text-sm">
                  open_in_new
                </span>
              </div>

              <div className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-1">
                      {formData.title}
                    </h2>
                    <p className="text-xs text-slate-500">
                      Topic: {formData.category}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-[#5048e5]">
                      {formData.timeLimit}:00
                    </div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase">
                      Remaining
                    </div>
                  </div>
                </div>

                <div className="space-y-8">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                        Question 1 of 10
                      </span>
                      <span className="text-xs font-medium text-slate-400">
                        Point: 1.0
                      </span>
                    </div>
                    <p className="text-base text-slate-800 dark:text-slate-100 font-medium leading-relaxed mb-6">
                      What is the primary function of an activation function in
                      a neural network?
                    </p>
                    <div className="space-y-3">
                      <button className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#5048e5] hover:bg-blue-50/30 transition-all text-sm text-slate-700 dark:text-slate-300">
                        A) To speed up training time.
                      </button>
                      <button className="w-full text-left p-4 rounded-xl border border-[#5048e5] bg-[#5048e5]/5 text-sm font-semibold text-slate-900 dark:text-white">
                        B) To introduce non-linearity into the model.
                      </button>
                      <button className="w-full text-left p-4 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-[#5048e5] hover:bg-blue-50/30 transition-all text-sm text-slate-700 dark:text-slate-300">
                        C) To initialize weights to zero.
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                  <button className="px-6 py-2.5 text-sm font-bold text-slate-400 bg-slate-100 dark:bg-slate-800 rounded-xl cursor-not-allowed">
                    Previous
                  </button>
                  <button className="px-8 py-2.5 text-sm font-bold text-white bg-[#5048e5] rounded-xl flex items-center gap-2">
                    Next Question
                    <span className="material-symbols-outlined !text-sm">
                      chevron_right
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Bottom Actions Footer --- */}
      <footer className="fixed bottom-0 right-0 w-1/2 bg-white/90 dark:bg-[#1a192e]/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors">
            Discard Changes
          </button>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            Save as Draft
          </button>
          <button className="px-8 py-2.5 text-sm font-bold text-white bg-[#5048e5] rounded-xl hover:bg-[#5048e5]/90 transition-all shadow-lg shadow-[#5048e5]/25">
            Publish Quiz
          </button>
        </div>
      </footer>
    </div>
  );
}
