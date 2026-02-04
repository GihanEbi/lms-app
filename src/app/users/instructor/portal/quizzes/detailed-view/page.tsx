"use client";

import React from "react";
import Link from "next/link";

export default function StudentQuizReviewPage() {
  const questions = [
    {
      id: 1,
      text: 'What is the correct syntax to output "Hello World" in Python?',
      studentAnswer: 'print("Hello World")',
      correctAnswer: 'print("Hello World")',
      isCorrect: true,
      feedback: "",
    },
    {
      id: 2,
      text: "Which of the following is a valid variable name in Python?",
      studentAnswer: "2_variable",
      correctAnswer: "my_variable_1",
      isCorrect: false,
      feedback:
        'Hi Sarah, remember that in Python, variable names cannot start with a number. They must start with a letter or an underscore character. Review the "PEP 8" style guide for variable naming conventions.',
    },
    {
      id: 3,
      text: "What is the output of: `print(type([1, 2, 3]))`?",
      studentAnswer: "<class 'tuple'>",
      correctAnswer: "<class 'list'>",
      isCorrect: false,
      feedback:
        "It looks like you confused list brackets [] with tuple parentheses (). Lists use square brackets and are mutable, while tuples use round parentheses and are immutable.",
    },
  ];

  const questionNav = [
    "correct",
    "incorrect",
    "incorrect",
    "correct",
    "correct",
    "incorrect",
    "correct",
    "correct",
    "correct",
    "incorrect",
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/instructor/quizzes/1/results"
              className="size-10 flex items-center justify-center rounded-full border border-slate-200 dark:border-slate-700 text-slate-600 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </Link>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                  Sarah Chen
                </h2>
                <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 rounded text-xs font-bold uppercase">
                  Student
                </span>
              </div>
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Python Basics Quiz • Attempt #1
              </p>
            </div>
          </div>
          <div className="flex items-center gap-8">
            <div className="text-center">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Score
              </p>
              <p className="text-lg font-black text-amber-600">68/100</p>
            </div>
            <div className="text-center border-l border-slate-200 dark:border-slate-700 pl-8">
              <p className="text-[10px] font-bold text-slate-400 uppercase">
                Time Taken
              </p>
              <p className="text-lg font-black text-slate-900 dark:text-white">
                24m 10s
              </p>
            </div>
            <button className="bg-[#5048e5] text-white px-6 py-2.5 rounded-xl text-sm font-bold shadow-sm shadow-[#5048e5]/20 hover:bg-[#433cc7] transition-colors">
              Submit Review
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="flex flex-1 p-8 gap-8">
        {/* Left Column: Questions List */}
        <div className="flex-1 space-y-6">
          {questions.map((q, index) => (
            <div
              key={q.id}
              className={`bg-white dark:bg-[#1a192e] rounded-2xl border shadow-sm p-6 overflow-hidden ${
                q.isCorrect
                  ? "border-slate-200 dark:border-slate-800"
                  : "border-slate-200 dark:border-slate-800 border-l-4 border-l-rose-500"
              }`}
            >
              <div className="flex justify-between items-start mb-4">
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-500 text-xs font-bold rounded-full">
                  Question {index + 1}
                </span>
                <div
                  className={`flex items-center gap-1 font-bold text-xs uppercase ${
                    q.isCorrect ? "text-emerald-500" : "text-rose-500"
                  }`}
                >
                  <span className="material-symbols-outlined !text-lg">
                    {q.isCorrect ? "check_circle" : "cancel"}
                  </span>
                  {q.isCorrect ? "Correct" : "Incorrect"}
                </div>
              </div>

              <h3 className="text-slate-900 dark:text-white font-semibold mb-6">
                {q.text}
              </h3>

              <div className="space-y-3 mb-6">
                {/* Student Answer */}
                <div
                  className={`p-4 rounded-xl border flex items-center justify-between ${
                    q.isCorrect
                      ? "border-emerald-100 bg-emerald-50/50 dark:bg-emerald-900/10 dark:border-emerald-900/30"
                      : "border-rose-100 bg-rose-50/50 dark:bg-rose-900/10 dark:border-rose-900/30"
                  }`}
                >
                  <span
                    className={`text-sm font-medium ${
                      q.isCorrect
                        ? "text-emerald-700 dark:text-emerald-400"
                        : "text-rose-700 dark:text-rose-400"
                    }`}
                  >
                    {q.studentAnswer}
                  </span>
                  <span
                    className={`text-[10px] font-bold uppercase ${
                      q.isCorrect ? "text-emerald-600" : "text-rose-600"
                    }`}
                  >
                    Student Answer
                  </span>
                </div>

                {/* Correct Answer (Only shown if incorrect) */}
                {!q.isCorrect && (
                  <div className="p-4 rounded-xl border border-slate-100 bg-slate-50 dark:bg-slate-800/50 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      {q.correctAnswer}
                    </span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase">
                      Correct Answer
                    </span>
                  </div>
                )}
              </div>

              {/* AI Feedback Box (Only if incorrect or has feedback) */}
              {!q.isCorrect && (
                <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-4 border border-blue-100 dark:border-blue-900/30">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="material-symbols-outlined text-blue-500 !text-xl">
                      auto_awesome
                    </span>
                    <span className="text-xs font-bold text-blue-600 uppercase">
                      AI Feedback Suggestion
                    </span>
                  </div>
                  <textarea
                    className="w-full bg-white dark:bg-slate-800 border-blue-200 dark:border-blue-800 rounded-lg p-3 text-sm text-slate-600 dark:text-slate-300 focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none min-h-[100px]"
                    placeholder="Type feedback for the student..."
                    defaultValue={q.feedback}
                  ></textarea>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right Column: Navigation & Comments */}
        <div className="w-80 hidden xl:block">
          <div className="sticky top-[100px] space-y-6">
            {/* Navigation Grid */}
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                Question Navigation
              </h4>
              <div className="grid grid-cols-5 gap-2">
                {questionNav.map((status, i) => (
                  <button
                    key={i}
                    className={`size-10 rounded-lg font-bold text-sm flex items-center justify-center border-2 ${
                      status === "correct"
                        ? "bg-emerald-500 text-white border-emerald-500"
                        : i === 2 // Example of 'current' or focused question style
                          ? "bg-rose-500 text-white border-[#5048e5]"
                          : "bg-rose-500 text-white border-rose-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-between gap-4">
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-emerald-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Correct
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="size-3 rounded-full bg-rose-500"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase">
                    Incorrect
                  </span>
                </div>
              </div>
            </div>

            {/* Overall Comments */}
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm p-5">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">
                Overall Instructor Comments
              </h4>
              <div className="border border-slate-200 dark:border-slate-700 rounded-xl overflow-hidden">
                <div className="flex items-center gap-1 p-2 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                  {[
                    "format_bold",
                    "format_italic",
                    "format_list_bulleted",
                    "link",
                  ].map((icon) => (
                    <button
                      key={icon}
                      className="size-8 flex items-center justify-center rounded hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-500"
                    >
                      <span className="material-symbols-outlined !text-lg">
                        {icon}
                      </span>
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full bg-white dark:bg-[#1a192e] border-none p-3 text-sm text-slate-600 dark:text-slate-300 focus:ring-0 min-h-[150px] outline-none resize-none"
                  placeholder="Add overall assessment notes here..."
                  defaultValue={`Great attempt, Sarah. You have a good grasp of the basic syntax, but we need to focus more on data structures like lists and dictionaries. \nI've left specific feedback on those questions. Let's discuss these in our next 1-on-1.`}
                ></textarea>
              </div>
              <p className="text-[10px] text-slate-400 mt-2">
                Visible to the student upon publishing results.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
