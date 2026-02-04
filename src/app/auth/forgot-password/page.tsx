"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function ForgotPasswordPage() {
  const [sent, setSent] = useState(false);

  return (
    // Outer Wrapper: Full screen, background colors matching previous pages
    <div className="min-h-screen flex flex-col bg-[#f6f6f8] dark:bg-[#0a0a0c] font-sans relative overflow-hidden text-slate-900 dark:text-white">
      {/* Background Blobs (Decoration) */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-[#5048e5]/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-[#5048e5]/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Header */}
      {/* <header className="w-full flex items-center justify-between border-b border-slate-200 dark:border-white/10 px-6 lg:px-40 py-4 bg-white/50 dark:bg-[#121121]/50 backdrop-blur-sm z-10">
        <div className="flex items-center gap-3 text-[#5048e5]">
          <div className="bg-[#5048e5] text-white p-1.5 rounded-md">
            <span className="material-symbols-outlined text-xl font-bold block">
              auto_stories
            </span>
          </div>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
            EduLearn
          </h2>
        </div>
        <Link
          href="/auth/signin"
          className="px-4 py-2 bg-[#5048e5] text-white text-sm font-bold rounded-lg shadow-sm hover:bg-[#433cc7] transition-colors"
        >
          Sign In
        </Link>
      </header> */}

      {/* Main Content: Centered */}
      <main className="flex-1 flex flex-col items-center justify-center p-6 z-20">
        <div className="w-full max-w-[500px] flex flex-col gap-4">
          {/* Back Navigation */}
          <Link
            href="/auth/signin"
            className="flex items-center gap-2 text-[#5048e5] text-sm font-medium hover:underline group w-fit"
          >
            <span className="material-symbols-outlined text-lg group-hover:-translate-x-1 transition-transform">
              arrow_back
            </span>
            Back to Sign In
          </Link>

          {/* The Card */}
          <div className="bg-white dark:bg-[#121121] shadow-xl rounded-xl p-8 md:p-12 border border-slate-100 dark:border-white/5">
            {!sent ? (
              <div className="flex flex-col items-center">
                {/* Icon */}
                <div className="w-16 h-16 bg-[#5048e5]/10 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-[#5048e5] text-4xl">
                    key
                  </span>
                </div>

                {/* Text */}
                <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-black text-center pb-2">
                  Forgot your password?
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-center pb-8">
                  No worries, enter your email address and we&apos;ll send you
                  AI-curated reset instructions.
                </p>

                {/* Form */}
                <form
                  className="w-full space-y-6"
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSent(true);
                  }}
                >
                  <div className="flex flex-col gap-2">
                    <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold">
                      Email address
                    </label>
                    <div className="relative">
                      <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 select-none">
                        mail
                      </span>
                      <input
                        className="w-full h-14 pl-12 pr-4 rounded-lg border border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-slate-900/50 focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        placeholder="Enter your email"
                        required
                        type="email"
                      />
                    </div>
                  </div>
                  <button
                    className="w-full h-14 bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white font-bold rounded-lg shadow-lg shadow-[#5048e5]/20 hover:scale-[1.01] active:scale-[0.99] transition-all"
                    type="submit"
                  >
                    Send Reset Link
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex flex-col items-center py-4">
                {/* Success State */}
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mb-6">
                  <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">
                    check_circle
                  </span>
                </div>
                <h1 className="text-slate-900 dark:text-white tracking-tight text-3xl font-bold text-center pb-2">
                  Email sent!
                </h1>
                <p className="text-slate-500 dark:text-slate-400 text-center pb-8">
                  We&apos;ve sent a password recovery link to your email. Please
                  check your inbox.
                </p>
                <button
                  onClick={() => setSent(false)}
                  className="w-full h-14 border-2 border-[#5048e5] text-[#5048e5] font-bold rounded-lg hover:bg-[#5048e5]/5 transition-all"
                >
                  Try another email
                </button>
              </div>
            )}
          </div>

          {/* AI Tip Box */}
          <div className="flex items-start gap-3 bg-[#5048e5]/5 dark:bg-[#5048e5]/10 p-4 rounded-xl border border-[#5048e5]/10">
            <span className="material-symbols-outlined text-[#5048e5] shrink-0">
              auto_awesome
            </span>
            <p className="text-xs text-[#5048e5] dark:text-indigo-300 leading-relaxed">
              <strong>AI Security Tip:</strong> Always use a unique password
              with at least 12 characters, including symbols and numbers.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="py-6 px-10 text-center border-t border-slate-200 dark:border-white/5 bg-white dark:bg-[#121121]">
        <p className="text-slate-400 text-xs">
          © 2024 EduLearn AI Platform. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
