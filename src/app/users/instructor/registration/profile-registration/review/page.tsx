"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorRegistrationStep4() {
  const router = useRouter();

  const handleSubmit = () => {
    // Submit logic here
    console.log("Application Submitted!");
    router.push("/users/instructor/portal/dashboard");
  };

  const handleBack = () => {
    router.push(
      "/users/instructor/registration/profile-registration/verification",
    );
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <main className="max-w-4xl mx-auto p-6 md:p-8">
        {/* --- Progress Steps --- */}
        <div className="mb-12">
          <div className="flex items-center justify-between">
            {/* Step 1: Completed */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Personal Info
              </span>
            </div>
            <div className="h-1 flex-1 bg-emerald-500 mx-2 -mt-6"></div>

            {/* Step 2: Completed */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Professional
              </span>
            </div>
            <div className="h-1 flex-1 bg-emerald-500 mx-2 -mt-6"></div>

            {/* Step 3: Completed */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-emerald-500 text-white flex items-center justify-center font-bold text-sm">
                <span className="material-symbols-outlined text-sm">check</span>
              </div>
              <span className="text-xs font-medium text-slate-500">
                Verification
              </span>
            </div>
            <div className="h-1 flex-1 bg-emerald-500 mx-2 -mt-6"></div>

            {/* Step 4: Active */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-[#5048e5] text-white flex items-center justify-center font-bold text-sm ring-4 ring-[#5048e5]/20">
                4
              </div>
              <span className="text-xs font-bold text-[#5048e5]">Review</span>
            </div>
          </div>
        </div>

        {/* --- Title --- */}
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">
            Review Your Application
          </h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-lg mx-auto">
            Please review all your information carefully before submitting. You
            can edit any section by clicking the edit icon.
          </p>
        </div>

        <div className="space-y-6">
          {/* Card 1: Personal Info */}
          <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative">
            <button className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-[#5048e5] hover:bg-[#5048e5]/5 transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5048e5]">
                person
              </span>
              Personal Information
            </h3>
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
              <div className="relative">
                <img
                  alt="Profile"
                  className="size-24 rounded-2xl object-cover ring-4 ring-slate-100 dark:ring-slate-800"
                  src="https://ui-avatars.com/api/?name=Alexander+Mitchell&background=random"
                />
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 text-white p-1 rounded-full border-2 border-white dark:border-[#1a192e]">
                  <span className="material-symbols-outlined text-sm block">
                    verified
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4 flex-1 w-full">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Full Name
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    Alexander Mitchell
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Email Address
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    a.mitchell@example.com
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Phone Number
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    +1 (555) 0123-4567
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Location
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    San Francisco, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Professional Background */}
          <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative">
            <button className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-[#5048e5] hover:bg-[#5048e5]/5 transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5048e5]">
                work
              </span>
              Professional Background
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Core Expertise
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    Machine Learning &amp; Artificial Intelligence
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Years of Teaching Experience
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    8 Years
                  </p>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Uploaded Curriculum Vitae (CV)
                  </span>
                  <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      description
                    </span>
                    <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                      CV_Mitchell_2023.pdf
                    </span>
                    <span className="text-[10px] text-slate-400 ml-auto uppercase font-bold">
                      PDF • 1.2MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Teaching Preferences */}
          <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative">
            <button className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-[#5048e5] hover:bg-[#5048e5]/5 transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5048e5]">
                menu_book
              </span>
              Teaching Preferences
            </h3>
            <div className="space-y-6">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                  Selected Subjects
                </span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[
                    "Python Basics",
                    "Neural Networks",
                    "Data Visualization",
                    "Natural Language Processing",
                  ].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-[#5048e5]/10 text-[#5048e5] text-xs font-bold rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Weekly Availability Preview
                  </span>
                  <div className="grid grid-cols-7 gap-1 mt-2">
                    <div
                      className="h-6 bg-emerald-500 rounded-sm"
                      title="Monday: Available"
                    ></div>
                    <div
                      className="h-6 bg-emerald-500 rounded-sm"
                      title="Tuesday: Available"
                    ></div>
                    <div
                      className="h-6 bg-slate-100 dark:bg-slate-800 rounded-sm"
                      title="Wednesday: Unavailable"
                    ></div>
                    <div
                      className="h-6 bg-emerald-500 rounded-sm"
                      title="Thursday: Available"
                    ></div>
                    <div
                      className="h-6 bg-emerald-500 rounded-sm"
                      title="Friday: Available"
                    ></div>
                    <div
                      className="h-6 bg-slate-100 dark:bg-slate-800 rounded-sm"
                      title="Saturday: Unavailable"
                    ></div>
                    <div
                      className="h-6 bg-slate-100 dark:bg-slate-800 rounded-sm"
                      title="Sunday: Unavailable"
                    ></div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2">
                    Estimated 24 hours per week
                  </p>
                </div>
                <div>
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 block">
                    Student Capacity Limit
                  </span>
                  <p className="text-slate-900 dark:text-white font-medium">
                    Up to 25 Students / Session
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Verification */}
          <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm relative">
            <button className="absolute top-6 right-6 p-2 rounded-lg text-slate-400 hover:text-[#5048e5] hover:bg-[#5048e5]/5 transition-colors">
              <span className="material-symbols-outlined">edit</span>
            </button>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
              <span className="material-symbols-outlined text-[#5048e5]">
                verified_user
              </span>
              Verification Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="size-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-slate-400">
                    badge
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    Government ID.jpg
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Identity Verification
                  </p>
                </div>
                <button className="text-xs font-bold text-[#5048e5] hover:underline">
                  View File
                </button>
              </div>
              <div className="flex items-center gap-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800">
                <div className="size-10 bg-white dark:bg-slate-900 rounded-lg flex items-center justify-center shadow-sm">
                  <span className="material-symbols-outlined text-slate-400">
                    workspace_premium
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    Phd_ComputerScience.pdf
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Academic Credential
                  </p>
                </div>
                <button className="text-xs font-bold text-[#5048e5] hover:underline">
                  View File
                </button>
              </div>
            </div>
            <div className="mt-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-100 dark:border-emerald-500/20 flex items-start gap-3">
              <span className="material-symbols-outlined text-emerald-500 mt-0.5">
                check_circle
              </span>
              <div>
                <p className="text-sm font-semibold text-emerald-900 dark:text-emerald-400">
                  Background Check Authorized
                </p>
                <p className="text-xs text-emerald-700 dark:text-emerald-500/80">
                  Digitally signed as Alexander Mitchell on Oct 14, 2023
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Action Buttons --- */}
        <div className="mt-12 space-y-4">
          <button
            onClick={handleSubmit}
            className="w-full bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] hover:opacity-90 text-white font-bold py-4 px-8 rounded-xl transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#5048e5]/20 text-lg group active:scale-[0.99]"
          >
            Submit Application
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              send
            </span>
          </button>

          <button
            onClick={handleBack}
            className="w-full bg-transparent text-slate-500 dark:text-slate-400 font-bold py-3 px-8 rounded-xl transition-all flex items-center justify-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800/50"
          >
            <span className="material-symbols-outlined text-sm">
              arrow_back
            </span>
            Back to Verification
          </button>
        </div>

        <div className="mt-12 p-6 text-center border-t border-slate-200 dark:border-slate-800">
          <p className="text-xs text-slate-400 leading-relaxed">
            By submitting this application, you agree to EduLearn&apos;s
            Instructor Agreement and verify that all information provided is
            accurate and truthful. We typically process applications within 48
            hours.
          </p>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-7xl mx-auto px-8 py-10 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
        <p>© 2023 EduLearn LMS Platform. All rights reserved.</p>
        <div className="flex gap-6">
          <Link href="#" className="hover:text-[#5048e5]">
            Privacy Policy
          </Link>
          <Link href="#" className="hover:text-[#5048e5]">
            Terms of Service
          </Link>
          <Link href="#" className="hover:text-[#5048e5]">
            Instructor Agreement
          </Link>
        </div>
      </footer>
    </div>
  );
}
