"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "instructor">("student");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (role === "instructor") {
      router.push("/users/instructor/portal/dashboard");
      return;
    }
    router.push("/users/student/portal/dashboard");
  };

  return (
    // 1. Outer Wrapper: Centers the card on the screen
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f6f8] dark:bg-[#0a0a0c] p-4 lg:p-8 font-sans">
      {/* 2. The Card: Max width, rounded, shadowed */}
      <div className="w-full max-w-6xl bg-white dark:bg-[#121121] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[650px]">
        {/* --- Left Side: Visual/Hero Section --- */}
        <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden flex-col justify-center items-center text-white p-12 bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)]">
          {/* Floating Background Icons */}
          <div className="absolute top-10 left-10 opacity-20 transform -rotate-12 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[80px]">
              school
            </span>
          </div>
          <div className="absolute bottom-20 right-10 opacity-20 transform rotate-12 select-none pointer-events-none">
            <span className="material-symbols-outlined text-[100px]">
              psychology
            </span>
          </div>

          {/* Content */}
          <div className="relative z-10 text-center max-w-md">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="bg-white p-2 rounded-lg text-[#5048e5] shadow-lg">
                <span className="material-symbols-outlined text-3xl">
                  auto_stories
                </span>
              </div>
              <h1 className="text-3xl font-bold tracking-tight">EduLearn</h1>
            </div>

            <h2 className="text-4xl font-bold mb-6">
              Empower your learning journey with AI.
            </h2>
            <p className="text-lg text-indigo-100">
              Join thousands of students and instructors in the world&apos;s
              most advanced AI-powered LMS platform.
            </p>

            {/* Features Box */}
            <div className="mt-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-6 text-left space-y-4 shadow-xl">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 min-w-[2.5rem] rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">
                    verified
                  </span>
                </div>
                <div>
                  <p className="font-semibold">Smart Insights</p>
                  <p className="text-indigo-100 text-xs">
                    Personalized learning paths for every student.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 min-w-[2.5rem] rounded-full bg-white/20 flex items-center justify-center">
                  <span className="material-symbols-outlined text-sm">hub</span>
                </div>
                <div>
                  <p className="font-semibold">Instructor Hub</p>
                  <p className="text-indigo-100 text-xs">
                    Powerful tools to manage and scale your courses.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* --- Right Side: Login Form --- */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12 md:px-12 bg-white dark:bg-[#121121]">
          <div className="w-full max-w-[440px]">
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-3xl font-black text-slate-900 dark:text-white mb-2 tracking-tight">
                Welcome Back
              </h2>
              <p className="text-slate-500 dark:text-slate-400">
                Please enter your details to sign in.
              </p>
            </div>

            {/* Role Toggle */}
            <div className="mb-8 border-b border-slate-200 dark:border-slate-800">
              <div className="flex w-full">
                <button
                  onClick={() => setRole("student")}
                  className={`flex-1 border-b-[3px] pb-3 font-bold text-sm transition-all ${
                    role === "student"
                      ? "border-[#5048e5] text-[#5048e5]"
                      : "border-transparent text-slate-400 hover:text-[#5048e5]"
                  }`}
                >
                  Student
                </button>
                <button
                  onClick={() => setRole("instructor")}
                  className={`flex-1 border-b-[3px] pb-3 font-bold text-sm transition-all ${
                    role === "instructor"
                      ? "border-[#5048e5] text-[#5048e5]"
                      : "border-transparent text-slate-400 hover:text-[#5048e5]"
                  }`}
                >
                  Instructor
                </button>
              </div>
            </div>

            <form className="space-y-5" onSubmit={handleLogin}>
              <div className="flex flex-col gap-2">
                <label className="text-slate-900 dark:text-white text-sm font-semibold">
                  Email Address
                </label>
                <input
                  className="w-full h-12 px-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all"
                  placeholder="name@company.com"
                  type="email"
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex justify-between items-center">
                  <label className="text-slate-900 dark:text-white text-sm font-semibold">
                    Password
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-[#5048e5] text-sm font-semibold hover:underline"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    className="w-full h-12 px-4 pr-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all"
                    placeholder="••••••••"
                    type="password"
                    required
                  />
                  <button
                    type="button"
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer hover:text-slate-600"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      visibility
                    </span>
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2 py-1">
                <input
                  id="remember"
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                />
                <label
                  className="text-sm text-slate-500 dark:text-slate-400 cursor-pointer"
                  htmlFor="remember"
                >
                  Remember me for 30 days
                </label>
              </div>

              <button
                className="w-full h-12 rounded-lg bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white font-bold text-base shadow-lg shadow-[#5048e5]/20 hover:opacity-90 active:scale-[0.99] transition-all"
                type="submit"
              >
                Sign In
              </button>

              <div className="relative flex py-4 items-center">
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
                <span className="mx-4 text-slate-400 text-sm">
                  or continue with
                </span>
                <div className="flex-grow border-t border-slate-200 dark:border-slate-800"></div>
              </div>

              <button
                type="button"
                className="w-full h-12 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-white font-semibold text-sm hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center justify-center gap-3"
              >
                <img
                  className="w-5 h-5"
                  src="https://www.gstatic.com/images/branding/product/1x/gsa_512dp.png"
                  alt="Google"
                />
                Sign in with Google
              </button>
            </form>

            <p className="mt-8 text-center text-sm text-slate-500">
              New to EduLearn?{" "}
              <Link
                href="/auth/signup"
                className="text-[#5048e5] font-bold hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
