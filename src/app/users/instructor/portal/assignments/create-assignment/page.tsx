"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function CreateAssignmentPage() {
  const [formData, setFormData] = useState({
    title: "",
    instructions: "",
    fileTypePdf: true,
    fileTypeDoc: true,
    fileTypePy: false,
    maxSize: "50 MB",
    points: 100,
    dueDate: "",
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
            Create New Assignment
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

      {/* --- Main Content Split View --- */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Column: Form Editor */}
        <div className="w-1/2 p-8 overflow-y-auto border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1a192e]/50">
          <div className="max-w-2xl mx-auto space-y-10 pb-24">
            {/* Step 1: Basic Details */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  1
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Basic Details
                </h3>
              </div>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Assignment Title
                  </label>
                  <input
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white transition-all"
                    placeholder="e.g., Final Project: Neural Network Architecture"
                    value={formData.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Instructions
                  </label>
                  <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                    <div className="bg-[#f6f7f8] dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700 p-2 flex gap-1">
                      {[
                        "format_bold",
                        "format_italic",
                        "format_list_bulleted",
                        "link",
                        "image",
                      ].map((icon) => (
                        <button
                          key={icon}
                          className="p-1.5 hover:bg-white dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-400"
                        >
                          <span className="material-symbols-outlined !text-xl">
                            {icon}
                          </span>
                        </button>
                      ))}
                    </div>
                    <textarea
                      className="w-full bg-white dark:bg-[#1a192e] border-none p-4 text-sm focus:ring-0 outline-none min-h-[200px] resize-y dark:text-white"
                      placeholder="Write detailed instructions for your students..."
                      value={formData.instructions}
                      onChange={(e) =>
                        handleChange("instructions", e.target.value)
                      }
                    ></textarea>
                  </div>
                </div>
              </div>
            </section>

            {/* Step 2: Submission Settings */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  2
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Submission Settings
                </h3>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Allowed File Types
                  </label>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fileTypePdf}
                        onChange={(e) =>
                          handleChange("fileTypePdf", e.target.checked)
                        }
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />{" "}
                      PDF (.pdf)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fileTypeDoc}
                        onChange={(e) =>
                          handleChange("fileTypeDoc", e.target.checked)
                        }
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />{" "}
                      Word (.docx)
                    </label>
                    <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.fileTypePy}
                        onChange={(e) =>
                          handleChange("fileTypePy", e.target.checked)
                        }
                        className="rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />{" "}
                      Python (.py)
                    </label>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Max File Size
                  </label>
                  <select
                    className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                    value={formData.maxSize}
                    onChange={(e) => handleChange("maxSize", e.target.value)}
                  >
                    <option>10 MB</option>
                    <option>50 MB</option>
                    <option>100 MB</option>
                    <option>500 MB</option>
                  </select>
                </div>
              </div>
            </section>

            {/* Step 3: Grading */}
            <section>
              <div className="flex items-center gap-2 mb-6">
                <span className="size-8 rounded-lg bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center font-bold text-sm">
                  3
                </span>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Grading
                </h3>
              </div>
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Points
                    </label>
                    <input
                      className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                      type="number"
                      value={formData.points}
                      onChange={(e) => handleChange("points", e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                      Due Date
                    </label>
                    <input
                      className="w-full bg-[#f6f7f8] dark:bg-slate-800 border-slate-200 dark:border-slate-700 rounded-xl px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white"
                      type="datetime-local"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
                    Grading Rubric
                  </label>
                  <button className="w-full border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 flex flex-col items-center gap-2 hover:bg-[#f6f7f8] dark:hover:bg-slate-800 transition-colors group">
                    <span className="material-symbols-outlined text-slate-400 group-hover:text-[#5048e5]">
                      table_chart
                    </span>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                      Click to build or upload a rubric
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
            {/* AI Optimizer Card */}
            <div className="bg-gradient-to-br from-[#5048e5]/5 to-indigo-500/5 border border-[#5048e5]/20 rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5048e5]">
                    auto_fix_high
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    AI Prompt Optimizer
                  </h4>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#5048e5]/10 text-[#5048e5] text-[10px] font-bold uppercase">
                  Beta
                </span>
              </div>
              <div className="bg-white/80 dark:bg-slate-800/80 p-4 rounded-xl border border-[#5048e5]/10 mb-4">
                <p className="text-xs text-slate-500 font-bold mb-2 uppercase">
                  Suggested Improvement
                </p>
                <p className="text-sm text-slate-700 dark:text-slate-300 italic">
                  &quot;Consider adding a specific word count requirement and a
                  formatting guide for the bibliography section to reduce
                  student confusion by 24%.&quot;
                </p>
              </div>
              <button className="w-full bg-[#5048e5] text-white font-bold py-2.5 rounded-xl hover:bg-[#5048e5]/90 transition-all text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#5048e5]/20">
                <span className="material-symbols-outlined !text-[18px]">
                  bolt
                </span>
                Apply Suggestions
              </button>
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
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 mb-2">
                  <span className="material-symbols-outlined !text-sm">
                    event
                  </span>
                  Due: November 15, 2024
                </div>
                <h2 className="text-2xl font-black text-slate-900 dark:text-white mb-4">
                  {formData.title || "Assignment Title"}
                </h2>

                <div className="flex gap-4 mb-6">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Points
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      {formData.points} pts
                    </span>
                  </div>
                  <div className="w-px h-8 bg-slate-200 dark:bg-slate-800"></div>
                  <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Submitting
                    </span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                      File Upload
                    </span>
                  </div>
                </div>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                  <p>
                    {formData.instructions ||
                      "Assignment instructions will appear here..."}
                  </p>
                  <ul className="list-disc pl-5 space-y-2">
                    <li>
                      Analyze the provided dataset using PyTorch or TensorFlow.
                    </li>
                    <li>Develop a 3-layer MLP architecture.</li>
                    <li>Document your gradient descent strategy.</li>
                  </ul>
                </div>

                <div className="mt-8 pt-8 border-t border-slate-100 dark:border-slate-800">
                  <button className="w-full border-2 border-[#5048e5] text-[#5048e5] font-bold py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-[#5048e5]/5 transition-colors">
                    <span className="material-symbols-outlined">upload</span>
                    Submit Assignment
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
            Publish Assignment
          </button>
        </div>
      </footer>
    </div>
  );
}
