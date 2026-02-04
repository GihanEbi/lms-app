"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useTheme } from "next-themes";

export default function AssignmentSubmissionPage() {
  const [activeTab, setActiveTab] = useState<
    "instructions" | "resources" | "rubric" | "discussion"
  >("instructions");
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);

  // Countdown Timer Logic
  const [timeLeft, setTimeLeft] = useState({ days: 4, hours: 12, mins: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.mins > 0) return { ...prev, mins: prev.mins - 1 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, mins: 59 };
        if (prev.days > 0)
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59 };
        return prev;
      });
    }, 60000); // Update every minute
    return () => clearInterval(timer);
  }, []);

  // Drag & Drop Handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      <main className="max-w-[1280px] mx-auto w-full px-6 lg:px-20 py-8 flex-1">
        {/* Page Heading & Timer */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Data Analysis Project
            </h1>
            <p className="text-slate-500 dark:text-slate-400 max-w-xl">
              Final assessment for the &apos;Advanced Statistics with
              Python&apos; module. Please follow all submission guidelines.
            </p>
          </div>

          {/* Countdown Widget */}
          <div className="flex gap-3 bg-white dark:bg-[#121121] p-4 rounded-xl shadow-sm border border-slate-200 dark:border-slate-800">
            {[
              { label: "Days", val: timeLeft.days },
              { label: "Hours", val: timeLeft.hours },
              { label: "Mins", val: timeLeft.mins },
            ].map((t) => (
              <div key={t.label} className="text-center w-14">
                <div className="bg-[#5048e5]/10 text-[#5048e5] font-bold text-xl py-2 rounded-lg">
                  {t.val.toString().padStart(2, "0")}
                </div>
                <span className="text-[10px] uppercase tracking-wider font-bold text-slate-400 mt-1 block">
                  {t.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Tabs Container */}
            <div className="bg-white dark:bg-[#121121] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden">
              <div className="flex border-b border-slate-200 dark:border-slate-800 px-2 overflow-x-auto scrollbar-hide">
                {[
                  {
                    id: "instructions",
                    label: "Instructions",
                    icon: "description",
                  },
                  { id: "resources", label: "Resources", icon: "folder_open" },
                  { id: "rubric", label: "Rubric", icon: "checklist" },
                  { id: "discussion", label: "Discussion", icon: "forum" },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`px-6 py-4 text-sm font-bold flex items-center gap-2 transition-colors whitespace-nowrap ${
                      activeTab === tab.id
                        ? "border-b-2 border-[#5048e5] text-[#5048e5]"
                        : "text-slate-500 hover:text-[#5048e5]"
                    }`}
                  >
                    <span className="material-symbols-outlined text-xl">
                      {tab.icon}
                    </span>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Tab Content Area */}
              <div className="p-8 space-y-6 leading-relaxed min-h-[400px]">
                {activeTab === "instructions" && (
                  <>
                    <section className="space-y-4">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Project Overview
                      </h3>
                      <p className="text-slate-600 dark:text-slate-400">
                        In this project, you will apply the data analysis
                        techniques learned throughout the course to a real-world
                        dataset. You are expected to clean the data, perform
                        exploratory data analysis (EDA), and build a predictive
                        model using linear regression.
                      </p>
                    </section>
                    <section className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Key Requirements
                      </h3>
                      <ul className="list-disc list-inside space-y-2 text-slate-600 dark:text-slate-400">
                        <li>
                          Data cleaning and handling missing values (min. 3
                          techniques).
                        </li>
                        <li>
                          Correlation matrix and feature importance analysis.
                        </li>
                        <li>Model implementation using Scikit-Learn.</li>
                        <li>
                          Visualization of results using Matplotlib or Seaborn.
                        </li>
                      </ul>
                    </section>
                    <section className="space-y-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Sample Code Hook
                      </h3>
                      <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                        <pre className="text-sm text-[#5048e5] dark:text-[#5048e5]/80 overflow-x-auto font-mono">
                          {`import pandas as pd
import seaborn as sns

# Load dataset
df = pd.read_csv('dataset.csv')
sns.heatmap(df.corr(), annot=True)`}
                        </pre>
                      </div>
                    </section>
                  </>
                )}

                {/* Simulated Resources Section embedded for the 'instructions' view as per original HTML flow, 
                    or shown explicitly if activeTab is 'resources' */}
                {(activeTab === "instructions" ||
                  activeTab === "resources") && (
                  <div className="pt-6 mt-6 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                        Project Files
                      </h3>
                      <button className="flex items-center gap-2 text-[#5048e5] font-bold text-sm hover:underline">
                        <span className="material-symbols-outlined text-lg">
                          download_for_offline
                        </span>
                        Download All
                      </button>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="size-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 flex items-center justify-center rounded-lg">
                          <span className="material-symbols-outlined">
                            table_chart
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
                            raw_data_2024.csv
                          </p>
                          <p className="text-xs text-slate-400">4.2 MB</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-[#5048e5]">
                          download
                        </span>
                      </div>
                      <div className="p-3 border border-slate-200 dark:border-slate-800 rounded-lg flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer group">
                        <div className="size-10 bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center rounded-lg">
                          <span className="material-symbols-outlined">
                            picture_as_pdf
                          </span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate text-slate-900 dark:text-white">
                            project_guidelines.pdf
                          </p>
                          <p className="text-xs text-slate-400">1.8 MB</p>
                        </div>
                        <span className="material-symbols-outlined text-slate-300 group-hover:text-[#5048e5]">
                          download
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Submission & Widgets */}
          <div className="space-y-6">
            {/* Submit Work Card */}
            <div className="bg-white dark:bg-[#121121] rounded-xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 flex flex-col gap-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Submit Work
                </h3>
                <span className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-600 text-xs font-bold rounded-full">
                  In Progress
                </span>
              </div>

              {/* Drag & Drop Area */}
              <div
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                className={`border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center gap-3 transition-all cursor-pointer ${
                  dragActive || file
                    ? "border-[#5048e5] bg-[#5048e5]/5"
                    : "border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/50 hover:border-[#5048e5]/50 hover:bg-[#5048e5]/5"
                }`}
              >
                <div className="size-12 bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center rounded-full">
                  <span className="material-symbols-outlined text-2xl">
                    {file ? "check" : "upload_file"}
                  </span>
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">
                    {file ? file.name : "Drag & drop files here"}
                  </p>
                  {!file && (
                    <p className="text-xs text-slate-500 mt-1">
                      or{" "}
                      <span className="text-[#5048e5] hover:underline">
                        browse files
                      </span>{" "}
                      on your computer
                    </p>
                  )}
                </div>
                <p className="text-[10px] text-slate-400 mt-2 uppercase tracking-widest">
                  Maximum file size: 50MB
                </p>
              </div>

              {/* Comments Area */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Comments
                </label>
                <textarea
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm focus:ring-[#5048e5] focus:border-[#5048e5] min-h-[100px] outline-none p-3 text-slate-900 dark:text-white"
                  placeholder="Add a note for your instructor..."
                ></textarea>
              </div>

              {/* Action Button */}
              <button className="w-full bg-gradient-to-r from-[#5048e5] to-[#7c3aed] text-white font-bold py-3 px-4 rounded-xl shadow-md shadow-[#5048e5]/20 hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <span>Submit Assignment</span>
                <span className="material-symbols-outlined">send</span>
              </button>

              {/* Stats & AI Sidebar Widget */}
              <div className="pt-6 border-t border-slate-100 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      timer
                    </span>
                    <span className="text-sm font-bold">Time Spent</span>
                  </div>
                  <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    12h 45m
                  </span>
                </div>

                {/* AI Pro Tips Card */}
                <div className="bg-[#5048e5]/5 dark:bg-[#5048e5]/10 rounded-lg p-4 border border-[#5048e5]/20">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="material-symbols-outlined text-[#5048e5] text-xl">
                      auto_awesome
                    </span>
                    <span className="text-xs font-black text-[#5048e5] uppercase">
                      Pro AI Tips
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed italic">
                    &quot;Based on the requirements, don&apos;t forget to
                    include your methodology section! Students who explain their
                    data cleaning steps typically score 15% higher.&quot;
                  </p>
                </div>
              </div>
            </div>

            {/* Grading Rubric Sneak Peek */}
            <div className="bg-white dark:bg-[#121121] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-5 space-y-4">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Quick Rubric
              </h4>
              <div className="space-y-3">
                {[
                  { label: "Data Cleaning", pts: "30 pts" },
                  { label: "Model Accuracy", pts: "40 pts" },
                  { label: "Report Quality", pts: "30 pts" },
                ].map((rubric) => (
                  <div key={rubric.label}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        {rubric.label}
                      </span>
                      <span className="text-xs font-bold text-[#5048e5]">
                        {rubric.pts}
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                      <div className="bg-[#5048e5] h-full w-[100%]"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 text-center bg-white dark:bg-[#121121]">
        <p className="text-sm text-slate-400">
          © 2024 EduLearn LMS. AI-Powered Education.{" "}
          <a className="text-[#5048e5] hover:underline ml-2" href="#">
            Support Center
          </a>
        </p>
      </footer>
    </div>
  );
}
