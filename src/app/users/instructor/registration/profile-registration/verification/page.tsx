"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function InstructorRegistrationStep3() {
  const router = useRouter();

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Proceeding to step 4 (Review)...");
    router.push('/users/instructor/registration/profile-registration/review');
  };

  const handleBack = () => {
    router.push("/users/instructor/registration/profile-registration/preferences");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100">

      <main className="max-w-7xl mx-auto p-6 md:p-8">
        {/* --- Progress Steps --- */}
        <div className="mb-10 max-w-4xl mx-auto">
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
                Preferences
              </span>
            </div>
            <div className="h-1 flex-1 bg-emerald-500 mx-2 -mt-6"></div>

            {/* Step 3: Active */}
            <div className="flex flex-col items-center gap-2 flex-1">
              <div className="size-8 rounded-full bg-[#5048e5] text-white flex items-center justify-center font-bold text-sm">
                3
              </div>
              <span className="text-xs font-bold text-[#5048e5]">
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
          {/* --- Left Column: Verification Form --- */}
          <div className="col-span-12 lg:col-span-8 space-y-8">
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-8 shadow-sm">
              <form className="space-y-12" onSubmit={handleNext}>
                {/* Identity Verification */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      badge
                    </span>
                    Identity Verification
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Upload a government-issued photo ID to verify your identity.
                    This is required for secure instructor payments.
                  </p>
                  <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-8 text-center transition-all hover:border-[#5048e5] hover:bg-[#5048e5]/5 cursor-pointer">
                    <span className="material-symbols-outlined text-4xl text-slate-300 dark:text-slate-600 mb-2">
                      cloud_upload
                    </span>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      Click to upload or drag and drop
                    </p>
                    <p className="text-xs text-slate-500 mt-1">
                      Passport, Driver&apos;s License, or National ID Card
                    </p>
                    <p className="text-[10px] text-slate-400 mt-4 uppercase font-bold tracking-widest">
                      Supported: JPG, PNG, PDF (Max 5MB)
                    </p>
                  </div>
                </section>

                {/* Credential Verification */}
                <section>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      workspace_premium
                    </span>
                    Credential Verification
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    Provide documentation of your educational background and
                    professional certifications.
                  </p>
                  <div className="space-y-6">
                    <div className="border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-6 text-center transition-all hover:border-[#5048e5] hover:bg-[#5048e5]/5 cursor-pointer">
                      <div className="flex items-center justify-center gap-4">
                        <span className="material-symbols-outlined text-2xl text-slate-400">
                          upload_file
                        </span>
                        <div className="text-left">
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            Upload Certificate or License
                          </p>
                          <p className="text-xs text-slate-500">
                            Diplomas, teaching certificates, etc.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Professional License Number (Optional)
                      </label>
                      <input
                        className="w-full bg-[#f6f6f8] dark:bg-[#121121] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                        placeholder="e.g. LIC-123456789"
                        type="text"
                      />
                    </div>
                  </div>
                </section>

                {/* Background Check */}
                <section className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#5048e5]">
                      fact_check
                    </span>
                    Background Check
                  </h3>
                  <p className="text-sm text-slate-500 mb-6">
                    As part of our commitment to student safety, we conduct
                    standard background checks on all new instructors.
                  </p>
                  <div className="space-y-6">
                    <label className="flex items-start gap-3 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="mt-1 size-5 rounded border-slate-300 text-[#5048e5] focus:ring-[#5048e5]"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-400 group-hover:text-slate-900 dark:group-hover:text-slate-200 transition-colors">
                        I authorize EduLearn to conduct a secure background
                        check. I understand this information will be handled
                        confidentially and in accordance with privacy laws.
                      </span>
                    </label>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        Digital Signature
                      </label>
                      <div className="relative">
                        <input
                          className="w-full bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-4 text-lg italic font-serif focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white"
                          placeholder="Type your full legal name"
                          type="text"
                        />
                        <span className="absolute right-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-slate-400 uppercase">
                          E-Signature
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        By typing your name, you agree that this acts as your
                        legal signature.
                      </p>
                    </div>
                  </div>
                </section>
              </form>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4">
              <button
                onClick={handleBack}
                className="bg-white dark:bg-[#1a192e] border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-3 hover:bg-slate-50 dark:hover:bg-slate-800"
              >
                <span className="material-symbols-outlined">arrow_back</span>
                Previous Step
              </button>
              <button
                onClick={handleNext}
                className="bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] hover:opacity-90 text-white font-bold py-3.5 px-8 rounded-xl transition-all flex items-center gap-3 shadow-lg shadow-[#5048e5]/20 active:scale-95"
              >
                Next: Final Review
                <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>

          {/* --- Right Column: Sidebar Info --- */}
          <aside className="col-span-12 lg:col-span-4 space-y-6">
            {/* Verification FAQ */}
            <div className="bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-6">
                Verification FAQ
              </h3>
              <div className="space-y-6">
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Why is this needed?
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Verification helps maintain a high standard of trust in our
                    marketplace and ensures instructors are qualified to teach
                    their chosen subjects.
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    How long does it take?
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Our compliance team typically reviews and approves
                    submissions within{" "}
                    <span className="font-bold text-[#5048e5]">
                      24-48 hours
                    </span>
                    .
                  </p>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    Is my data secure?
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    All documents are encrypted and stored in SOC2-compliant
                    servers. We never share your personal ID with students or
                    third parties.
                  </p>
                </div>
              </div>

              <div className="mt-8 p-4 bg-[#5048e5]/5 dark:bg-[#5048e5]/10 rounded-xl border border-[#5048e5]/10">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#5048e5] text-sm">
                    support_agent
                  </span>
                  <span className="text-[10px] font-black uppercase text-slate-500 tracking-wider">
                    Need Help?
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400">
                  Struggling with document uploads? Contact our onboarding
                  concierge.
                </p>
                <button className="mt-3 text-[#5048e5] text-xs font-bold hover:underline">
                  Chat with Support
                </button>
              </div>
            </div>

            {/* Verified Badge */}
            <div className="bg-slate-900 rounded-2xl p-6 text-white overflow-hidden relative">
              <div className="relative z-10">
                <span className="material-symbols-outlined text-emerald-400 mb-2">
                  verified_user
                </span>
                <h4 className="text-sm font-bold mb-1">
                  Global Standard Verified
                </h4>
                <p className="text-[10px] text-slate-400">
                  Compliant with international teaching standards and data
                  protection regulations.
                </p>
              </div>
              <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-white/5 text-8xl pointer-events-none select-none">
                shield_person
              </span>
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
