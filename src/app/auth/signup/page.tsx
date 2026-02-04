"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"student" | "instructor">("student");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Add your registration API logic here (e.g., create user in DB)
    console.log(`Registering as ${role}`);

    // Conditional Routing based on Role
    if (role === "student") {
      router.push(
        "/users/student/registration/profile-registration/profile-info",
      );
    } else {
      router.push("/users/instructor/registration/profile-registration/personal_info");
    }
  };

  return (
    // 1. Outer Wrapper: Full screen background, centers the content
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f6f6f8] dark:bg-[#0a0a0c] p-4 lg:p-8">
      {/* 2. The Card: Fixed max-width, rounded corners, shadow */}
      <div className="w-full max-w-6xl bg-white dark:bg-[#121121] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row min-h-[700px]">
        {/* --- Left Side: Hero Section --- */}
        <div className="hidden lg:flex lg:w-1/2 relative flex-col justify-center px-12 py-12 text-white overflow-hidden bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)]">
          {/* Floating Icons */}
          <span className="material-symbols-outlined absolute text-[80px] text-white/10 top-10 left-10 select-none">
            school
          </span>
          <span className="material-symbols-outlined absolute text-[100px] text-white/10 bottom-10 right-10 select-none">
            menu_book
          </span>
          <span className="material-symbols-outlined absolute text-[60px] text-white/10 top-1/2 right-10 select-none">
            lightbulb
          </span>

          <div className="relative z-10">
            {/* Logo area */}
            <div className="flex items-center gap-3 mb-10">
              <div className="bg-white rounded-lg p-2 text-[#5048e5] shadow-lg">
                <span className="material-symbols-outlined text-3xl">
                  auto_stories
                </span>
              </div>
              <span className="text-2xl font-bold tracking-tight">
                EduLearn
              </span>
            </div>

            <h1 className="text-4xl xl:text-5xl font-black leading-tight mb-6">
              Master your future with AI-powered learning
            </h1>

            <p className="text-lg text-indigo-100 max-w-md mb-10">
              Join thousands of students and instructors on the most advanced
              LMS platform. Accelerate your career with personalized learning
              paths.
            </p>

            {/* Social Proof */}
            <div className="flex items-center gap-4">
              <div className="flex -space-x-4">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="size-10 rounded-full border-2 border-[#5048e5] bg-slate-200 overflow-hidden relative"
                  >
                    <img
                      src={`https://ui-avatars.com/api/?name=User+${i}&background=random`}
                      alt="user"
                      className="object-cover w-full h-full"
                    />
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium">
                Join 50k+ active learners
              </span>
            </div>
          </div>
        </div>

        {/* --- Right Side: Form Section --- */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-6 py-12 md:px-16 xl:px-20">
          <div className="flex flex-col gap-2 mb-8">
            <h2 className="text-[#0f0e1b] dark:text-white text-3xl font-black tracking-tight">
              Create an Account
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#5048e5] font-semibold hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>

          {/* Role Selection */}
          <div className="mb-8">
            <h3 className="text-[#0f0e1b] dark:text-white text-sm font-bold uppercase tracking-wider mb-4">
              I am a...
            </h3>
            <div className="flex gap-4">
              <button
                onClick={() => setRole("student")}
                type="button"
                className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === "student"
                    ? "border-[#5048e5] bg-[#5048e5]/5"
                    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#5048e5]/50"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${role === "student" ? "text-[#5048e5]" : "text-slate-400"}`}
                >
                  person
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Student
                </span>
              </button>

              <button
                onClick={() => setRole("instructor")}
                type="button"
                className={`flex-1 flex flex-col items-center justify-center gap-2 p-4 rounded-xl border-2 transition-all ${
                  role === "instructor"
                    ? "border-[#5048e5] bg-[#5048e5]/5"
                    : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#5048e5]/50"
                }`}
              >
                <span
                  className={`material-symbols-outlined ${role === "instructor" ? "text-[#5048e5]" : "text-slate-400"}`}
                >
                  co_present
                </span>
                <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                  Instructor
                </span>
              </button>
            </div>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Full Name
              </label>
              <input
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white transition-all"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Email Address
              </label>
              <input
                className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white transition-all"
                placeholder="example@email.com"
                type="email"
                required
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Password
              </label>
              <div className="relative">
                <input
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 px-4 py-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white transition-all"
                  placeholder="Create a strong password"
                  type="password"
                  required
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <span className="material-symbols-outlined text-[20px]">
                    visibility
                  </span>
                </button>
              </div>
              {/* Strength Indicator */}
              <div className="mt-2 flex gap-1 h-1.5 w-full">
                <div className="flex-1 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-green-500 rounded-full"></div>
                <div className="flex-1 bg-slate-200 dark:bg-slate-800 rounded-full"></div>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">
                Strength: <span className="text-green-500">Strong</span>
              </p>
            </div>

            <button
              className="w-full bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white rounded-lg px-6 py-4 text-base font-bold shadow-lg shadow-[#5048e5]/20 hover:scale-[1.01] active:scale-[0.99] transition-all mt-2"
              type="submit"
            >
              Create Account
            </button>
          </form>

          <div className="mt-auto pt-8 text-center text-slate-400 text-xs">
            © 2024 EduLearn AI Technologies. All rights reserved.
          </div>
        </div>
      </div>
    </div>
  );
}
