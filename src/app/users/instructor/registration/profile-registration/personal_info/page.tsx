"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorRegistrationStep1() {
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Proceeding to step 2...");
    router.push('/users/instructor/registration/profile-registration/preferences');
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">
      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {/* --- Progress Steps --- */}
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-between">
            {/* Step 1: Active */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-[#5048e5] text-white flex items-center justify-center font-bold text-sm">
                1
              </div>
              <span className="text-xs font-bold text-[#5048e5]">
                Personal Info
              </span>
            </div>
            <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 mx-2 -mt-6"></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm">
                2
              </div>
              <span className="text-xs font-medium text-slate-500">
                Preferences
              </span>
            </div>
            <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 mx-2 -mt-6"></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-xs font-medium text-slate-500">
                Verification
              </span>
            </div>
            <div className="h-1 flex-1 bg-slate-200 dark:bg-slate-800 mx-2 -mt-6"></div>

            {/* Step 4 */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-500 flex items-center justify-center font-bold text-sm">
                4
              </div>
              <span className="text-xs font-medium text-slate-500">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-8">
          {/* --- Left Column: Registration Form --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              {/* Profile Photo Upload */}
              <div className="flex flex-col sm:flex-row items-center gap-8 mb-10 pb-10 border-b border-slate-100 dark:border-slate-800">
                <div className="relative group cursor-pointer">
                  <div className="size-24 rounded-full bg-slate-100 dark:bg-slate-800 border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center overflow-hidden group-hover:border-[#5048e5] transition-colors">
                    <span className="material-symbols-outlined text-slate-400 text-3xl group-hover:hidden">
                      add_a_photo
                    </span>
                    <div className="hidden group-hover:flex absolute inset-0 bg-black/40 items-center justify-center text-white text-[10px] font-bold">
                      UPLOAD
                    </div>
                  </div>
                </div>
                <div className="text-center sm:text-left">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    Profile Picture
                  </h3>
                  <p className="text-sm text-slate-500 max-w-sm mt-1">
                    A professional photo helps students connect with you.
                    Supported formats: JPG, PNG. Max 5MB.
                  </p>
                </div>
              </div>

              <form className="space-y-10" onSubmit={handleNext}>
                {/* Personal Details Section */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      person
                    </span>
                    Personal Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Full Name
                      </label>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        placeholder="e.g. Dr. Sarah Johnson"
                        type="text"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Email Address
                      </label>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        placeholder="sarah.j@university.edu"
                        type="email"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Phone Number
                      </label>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        placeholder="+1 (555) 000-0000"
                        type="tel"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Date of Birth
                      </label>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        type="date"
                      />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Physical Address
                      </label>
                      <textarea
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white resize-none"
                        placeholder="Street, City, State, ZIP Code"
                        rows={2}
                      ></textarea>
                    </div>
                  </div>
                </section>

                {/* Credentials Section */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      workspace_premium
                    </span>
                    Professional Credentials
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Highest Degree/Certification
                      </label>
                      <select className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white">
                        <option>Select Degree</option>
                        <option>PhD / Doctorate</option>
                        <option>Master&apos;s Degree</option>
                        <option>Bachelor&apos;s Degree</option>
                        <option>Professional Certificate</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Years of Teaching Experience
                      </label>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        min="0"
                        placeholder="e.g. 5"
                        type="number"
                      />
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Resume / CV
                      </label>
                      <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl p-8 text-center hover:border-[#5048e5] hover:bg-[#5048e5]/5 transition-all cursor-pointer group">
                        <span className="material-symbols-outlined text-slate-400 text-4xl mb-2 group-hover:text-[#5048e5] transition-colors">
                          upload_file
                        </span>
                        <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                          Drag and drop your CV here, or{" "}
                          <span className="text-[#5048e5] underline">
                            browse
                          </span>
                        </p>
                        <p className="text-xs text-slate-400 mt-1">
                          PDF, DOCX up to 10MB
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
              </form>
            </div>

            {/* Next Button */}
            <div className="flex justify-end pt-4">
              <button
                onClick={handleNext}
                className="bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] hover:opacity-90 text-white font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-[#5048e5]/20 active:scale-95"
              >
                Next: Teaching Preferences
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* --- Right Column: Sidebar Info --- */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Benefits Card */}
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Registration Benefits
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">
                      auto_awesome
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      AI-Assisted Course Creation
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Our AI helps you draft curricula and generate quizzes
                      based on your content.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-lg bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">public</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Global Student Reach
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Connect with thousands of learners from over 120 countries
                      automatically.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="size-10 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-600 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined">payments</span>
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      Competitive Revenue Share
                    </h4>
                    <p className="text-xs text-slate-500 mt-1">
                      Earn more with our industry-leading 85% instructor revenue
                      share model.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#f6f6f8] dark:bg-[#121121] rounded-xl border border-slate-100 dark:border-slate-700">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-amber-500 text-sm">
                    info
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">
                    Help Center
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Need help with your application? Chat with our Instructor
                  Success team.
                </p>
                <button className="mt-3 text-[#5048e5] text-xs font-bold hover:underline">
                  Start Chat
                </button>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-[#5048e5]/5 rounded-2xl border border-[#5048e5]/10 p-6 text-slate-600 dark:text-slate-400">
              <p className="text-sm italic leading-relaxed">
                &quot;Joining EduLearn was the best career move I made. The AI
                tools saved me 40+ hours in course design.&quot;
              </p>
              <div className="mt-4 flex items-center gap-3 not-italic">
                <div
                  className="size-8 rounded-full bg-slate-300 bg-cover bg-center"
                  style={{
                    backgroundImage:
                      'url("https://ui-avatars.com/api/?name=Michael+Chen&background=random")',
                  }}
                ></div>
                <div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    Prof. Michael Chen
                  </p>
                  <p className="text-[10px] text-slate-500">
                    Computer Science Instructor
                  </p>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* --- Footer --- */}
      <footer className="max-w-7xl mx-auto px-8 py-10 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-sm">
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
