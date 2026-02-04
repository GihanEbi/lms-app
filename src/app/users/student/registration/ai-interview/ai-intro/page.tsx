"use client";

import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AIIntroPage() {
  const router = useRouter();

  const handleStart = () => {
    // Navigate to the actual chat/interview page
    router.push("/users/student/registration/ai-interview/interview");
  };

  const handleSkip = () => {
    // Navigate to dashboard
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#0a0a0c] text-slate-900 dark:text-white flex flex-col font-sans transition-colors duration-200">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center py-16 px-6">
        <div className="max-w-[800px] w-full flex flex-col items-center gap-12 text-center">
          {/* Hero Section */}
          <div className="flex flex-col items-center gap-6">
            <div className="relative">
              <div className="size-32 rounded-full bg-[#5048e5]/10 flex items-center justify-center border-4 border-white dark:border-[#121121] shadow-xl p-2">
                <div className="size-full rounded-full bg-white dark:bg-[#121121] flex items-center justify-center overflow-hidden">
                  <span className="material-symbols-outlined text-[#5048e5] text-6xl">
                    smart_toy
                  </span>
                </div>
              </div>
              <div className="absolute -top-2 -right-2 bg-white dark:bg-[#1e1d2e] px-3 py-1 rounded-full shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Online
                </span>
              </div>
            </div>

            <div className="space-y-3">
              <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900 dark:text-white">
                Meet Your AI Learning Partner
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto leading-relaxed">
                Let&apos;s personalize your learning experience to match your
                goals, schedule, and preferred style.
              </p>
            </div>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
            {[
              {
                label: "Conversation",
                icon: "chat_bubble",
                desc: "A quick chat about your academic background and goals.",
                colorClass:
                  "text-[#5048e5] bg-[#5048e5]/5 dark:bg-[#5048e5]/10",
              },
              {
                label: "Analysis",
                icon: "psychology",
                desc: "AI identifies your learning gaps and strengths instantly.",
                colorClass:
                  "text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20",
              },
              {
                label: "Personal Plan",
                icon: "auto_awesome",
                desc: "Receive a tailor-made roadmap designed for your success.",
                colorClass:
                  "text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20",
              },
            ].map((step) => (
              <div
                key={step.label}
                className="flex flex-col items-center gap-4 p-6 rounded-2xl bg-white dark:bg-[#121121] border border-slate-200 dark:border-slate-800 shadow-sm transition-all hover:shadow-md hover:-translate-y-1"
              >
                <div
                  className={`size-14 rounded-xl flex items-center justify-center ${step.colorClass}`}
                >
                  <span className="material-symbols-outlined text-3xl">
                    {step.icon}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold mb-2 text-slate-900 dark:text-white">
                    {step.label}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="w-full flex flex-col items-center gap-6 pt-4">
            <button
              onClick={handleStart}
              className="w-full max-w-[340px] flex items-center justify-center gap-3 px-8 py-5 rounded-full bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white text-lg font-bold shadow-xl shadow-[#5048e5]/20 hover:scale-[1.02] active:scale-[0.98] transition-all group"
            >
              Start the Interview
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
                arrow_forward
              </span>
            </button>

            <button
              onClick={handleSkip}
              className="text-slate-500 dark:text-slate-400 font-medium hover:text-[#5048e5] dark:hover:text-[#5048e5] transition-colors text-sm"
            >
              Maybe Later
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="p-8 flex justify-center text-center bg-[#f6f6f8] dark:bg-[#0a0a0c]">
        <p className="text-xs text-slate-400 max-w-md leading-relaxed">
          The interview takes about 3-5 minutes. Your privacy is protected and
          data is used only for personalization.
        </p>
      </footer>
    </div>
  );
}
