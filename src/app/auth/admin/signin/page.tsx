"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminSignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate admin login
    router.push("/users/admin/dashboard");
  };

  return (
    <main className="flex min-h-screen font-sans antialiased bg-white dark:bg-[#0a0a0c]">
      {/* --- Left Side: Admin Visual Hero --- */}
      <div className="hidden lg:flex w-1/2 relative bg-gradient-to-br from-[#1e1b4b] via-[#4338ca] to-[#7e22ce] overflow-hidden items-center justify-center p-12">
        {/* Animated Background Elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>

        {/* Floating Grid Pattern */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at 2px 2px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        ></div>

        <div className="relative z-10 w-full max-w-lg">
          <div className="space-y-8">
            {/* Glass Icon Display */}
            <div className="flex items-center gap-6">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 w-24 h-24 rounded-3xl flex items-center justify-center rotate-12 shadow-2xl">
                <span className="material-symbols-outlined text-4xl text-white/90">
                  auto_awesome
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md border border-white/20 w-16 h-16 rounded-2xl flex items-center justify-center -rotate-12 shadow-2xl mt-12">
                <span className="material-symbols-outlined text-2xl text-white/80">
                  security
                </span>
              </div>
            </div>

            {/* Content Glass Card */}
            <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2rem] shadow-2xl space-y-4">
              <div className="w-12 h-1 bg-white/40 rounded-full"></div>
              <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">
                Elevating Education through <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-purple-200">
                  Administrative Intelligence
                </span>
              </h2>
              <p className="text-blue-100/70 text-lg font-light tracking-wide">
                Experience the next generation of LMS management with our secure
                high-performance administrative portal.
              </p>
            </div>

            <div className="flex justify-end pr-12">
              <div className="bg-white/10 backdrop-blur-md border border-white/20 w-20 h-20 rounded-full flex items-center justify-center shadow-2xl">
                <span className="material-symbols-outlined text-3xl text-white/90">
                  monitoring
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* --- Right Side: Admin Form --- */}
      <div className="w-full lg:w-1/2 flex flex-col items-center justify-center p-8 md:p-16 lg:p-24 bg-white dark:bg-[#121121]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="mb-12 flex flex-col items-center lg:items-start">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-tr from-[#4f46e5] to-[#9333ea] rounded-xl flex items-center justify-center text-white shadow-lg">
                <span className="material-symbols-outlined">hub</span>
              </div>
              <span className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
                EduLearn
              </span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900 dark:text-white tracking-tight mb-2">
              Admin Portal
            </h1>
            <p className="text-slate-500 dark:text-slate-400 tracking-wide font-light">
              Enter your secure credentials to manage the platform.
            </p>
          </div>

          <form className="space-y-6" onSubmit={handleAdminLogin}>
            {/* Floating Label Input: Email */}
            <div className="relative group">
              <input
                type="email"
                id="email"
                required
                className="peer w-full px-4 pt-6 pb-2 bg-slate-50 dark:bg-slate-900 border-0 border-b-2 border-slate-200 dark:border-slate-800 focus:border-[#4f46e5] focus:ring-0 transition-all text-slate-900 dark:text-white placeholder-transparent outline-none"
                placeholder="Admin ID / Email"
              />
              <label
                htmlFor="email"
                className="absolute left-4 top-4 text-slate-400 text-base transition-all pointer-events-none tracking-wide peer-focus:top-2 peer-focus:left-4 peer-focus:text-xs peer-focus:text-[#4f46e5] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Admin ID / Email
              </label>
            </div>

            {/* Floating Label Input: Password */}
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                required
                className="peer w-full px-4 pt-6 pb-2 bg-slate-50 dark:bg-slate-900 border-0 border-b-2 border-slate-200 dark:border-slate-800 focus:border-[#4f46e5] focus:ring-0 transition-all text-slate-900 dark:text-white placeholder-transparent outline-none"
                placeholder="Password"
              />
              <label
                htmlFor="password"
                className="absolute left-4 top-4 text-slate-400 text-base transition-all pointer-events-none tracking-wide peer-focus:top-2 peer-focus:left-4 peer-focus:text-xs peer-focus:text-[#4f46e5] peer-focus:font-semibold peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:left-4 peer-[:not(:placeholder-shown)]:text-xs"
              >
                Password
              </label>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 bottom-3 text-slate-400 hover:text-[#4f46e5] transition-colors"
              >
                <span className="material-symbols-outlined text-xl">
                  {showPassword ? "visibility_off" : "visibility"}
                </span>
              </button>
            </div>

            <div className="flex items-center justify-between py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-slate-300 text-[#4f46e5] focus:ring-[#4f46e5]/20 transition-all"
                />
                <span className="text-sm text-slate-500 dark:text-slate-400 group-hover:text-slate-700 transition-colors">
                  Remember device
                </span>
              </label>
              <Link
                href="#"
                className="text-sm font-medium text-[#4f46e5] hover:text-[#9333ea] transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full group relative overflow-hidden bg-slate-900 dark:bg-slate-800 text-white font-semibold py-4 rounded-xl shadow-xl hover:shadow-[#4f46e5]/20 transition-all duration-300"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4f46e5] to-[#9333ea] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative flex items-center justify-center gap-2 tracking-wider">
                Sign In to Console
                <span className="material-symbols-outlined text-lg">
                  arrow_forward
                </span>
              </span>
            </button>
          </form>

          {/* Secure Footer Section */}
          <div className="mt-16 flex flex-col items-center lg:items-start gap-8">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
                Secure Login Active
              </span>
            </div>

            <p className="text-xs text-slate-400 font-light leading-loose tracking-wide text-center lg:text-left">
              Authorized access only. By signing in, you agree to our security
              protocols.
              <br className="hidden md:block" />© 2024 EduLearn AI LMS Admin.
              All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
