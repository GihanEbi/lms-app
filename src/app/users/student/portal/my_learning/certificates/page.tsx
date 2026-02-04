"use client";

import React from "react";
import { Inter, Cinzel, Great_Vibes } from "next/font/google";

// Load fonts
const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const cinzel = Cinzel({ subsets: ["latin"], variable: "--font-cinzel" });
const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

export default function CertificatePage() {
  return (
    <div
      className={`min-h-screen bg-[#f8fafc] dark:bg-[#0f172a] font-sans text-slate-900 dark:text-slate-100 p-6 lg:p-8 overflow-y-auto ${inter.variable} ${cinzel.variable} ${greatVibes.variable}`}
    >
      {/* Top Navigation / Breadcrumb Area (Local to page) */}
      <div className="max-w-7xl mx-auto mb-6 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="text-xl font-bold tracking-tight">
            Certificate Details
          </h2>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold shadow-sm hover:bg-slate-50 transition-all">
            <span className="material-symbols-outlined text-lg">print</span>{" "}
            Print
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto">
        {/* --- Left Column: The Certificate --- */}
        <div className="flex-1 flex flex-col gap-8">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-8 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
            {/* Certificate Visual Container */}
            <div
              className="w-full aspect-[1.414/1] flex flex-col items-center justify-center p-4 sm:p-12 text-center text-slate-800 relative"
              style={{
                backgroundColor: "#fcfaf2",
                backgroundImage:
                  "radial-gradient(#e5e7eb 0.5px, transparent 0.5px)",
                backgroundSize: "20px 20px",
                border: "20px solid transparent",
                borderImage:
                  "url(\"data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M40 0L45 35L80 40L45 45L40 80L35 45L0 40L35 35L40 0Z' fill='%23C5A059'/%3E%3C/svg%3E\") 30 stretch",
              }}
            >
              {/* Header */}
              <div className="mb-6">
                <span
                  className="material-symbols-outlined text-6xl text-[#C5A059] mb-2"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  workspace_premium
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-widest text-[#5048e5] uppercase">
                  Certificate of Completion
                </h3>
                <p className="text-sm font-medium tracking-widest text-slate-500 mt-2">
                  THIS IS TO CERTIFY THAT
                </p>
              </div>

              {/* Name */}
              <div className="mb-6 w-full">
                <h2 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 border-b-2 border-[#C5A059]/30 pb-2 px-4 sm:px-12 inline-block">
                  Alex Johnson
                </h2>
                <p className="text-sm font-medium text-slate-500 mt-4 max-w-md mx-auto">
                  has successfully completed the intensive curriculum for
                </p>
              </div>

              {/* Course Title */}
              <div className="mb-10">
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#5048e5] italic">
                  Practical Machine Learning for Data Science
                </h4>
                <p className="text-xs font-bold text-slate-400 mt-2 uppercase tracking-tighter">
                  Verified Professional Track • 48 Instructional Hours
                </p>
              </div>

              {/* Footer Signatures */}
              <div className="w-full flex justify-between items-end px-4 sm:px-12 mt-4">
                <div className="text-center">
                  <div className="font-signature text-2xl sm:text-3xl text-slate-800 border-b border-slate-400 pb-1 mb-1">
                    Emily Chen
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Prof. Emily Chen
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Lead Instructor, EduLearn AI
                  </p>
                </div>

                <div className="relative hidden sm:block">
                  <div className="size-24 rounded-full border-4 border-[#C5A059]/40 flex items-center justify-center relative">
                    <div className="absolute inset-0 animate-pulse bg-[#C5A059]/5 rounded-full"></div>
                    <div className="text-center">
                      <p className="text-[8px] font-bold text-[#C5A059] uppercase leading-none">
                        Official
                      </p>
                      <span
                        className="material-symbols-outlined text-3xl text-[#C5A059]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        verified_user
                      </span>
                      <p className="text-[8px] font-bold text-[#C5A059] uppercase leading-none">
                        Seal
                      </p>
                    </div>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 text-center">
                    Issued Oct 24, 2023
                  </p>
                </div>

                <div className="text-center">
                  <div className="font-bold text-lg sm:text-xl text-slate-800 border-b border-slate-400 pb-1 mb-1">
                    EDL-992-04X
                  </div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Certificate ID
                  </p>
                  <p className="text-[10px] text-slate-400">
                    Authenticated via Blockchain
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <button className="flex items-center gap-2 px-8 py-3 bg-[#5048e5] text-white rounded-xl font-bold text-sm shadow-lg shadow-[#5048e5]/20 hover:scale-[1.02] transition-all">
              <span className="material-symbols-outlined text-lg">
                download
              </span>
              Download PDF
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-[#0077b5] text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-500/20 hover:scale-[1.02] transition-all">
              <span className="material-symbols-outlined text-lg">share</span>
              Share to LinkedIn
            </button>
            <button className="flex items-center gap-2 px-8 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white rounded-xl font-bold text-sm hover:bg-slate-50 dark:hover:bg-slate-700 transition-all">
              <span className="material-symbols-outlined text-lg">
                verified
              </span>
              Verify Authenticity
            </button>
          </div>
        </div>

        {/* --- Right Column: Insights & Recommendations --- */}
        <aside className="w-full lg:w-80 shrink-0 space-y-6">
          {/* AI Performance Insights */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="size-10 rounded-lg bg-[#5048e5]/10 text-[#5048e5] flex items-center justify-center">
                <span className="material-symbols-outlined">auto_awesome</span>
              </div>
              <h3 className="font-bold text-sm">AI Performance Insights</h3>
            </div>

            <div className="space-y-4">
              <div className="p-3 bg-slate-50 dark:bg-slate-800/50 rounded-xl">
                <div className="flex justify-between items-center mb-1">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    Overall Mastery
                  </p>
                  <span className="text-xs font-bold text-[#5048e5]">94%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full">
                  <div
                    className="h-full bg-[#5048e5] rounded-full"
                    style={{ width: "94%" }}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                    Quiz Rank
                  </p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    Top 3%
                  </p>
                </div>
                <div className="p-3 border border-slate-100 dark:border-slate-800 rounded-xl text-center">
                  <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">
                    Practical
                  </p>
                  <p className="text-lg font-bold text-emerald-500">Exceeds</p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed italic border-l-2 border-[#5048e5]/30 pl-3">
                &quot;Alex demonstrated exceptional proficiency in neural
                network optimization, particularly in the module on Transformer
                architectures.&quot;
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">
            <h3 className="font-bold text-sm mb-4">What&apos;s Next for You</h3>
            <div className="space-y-4">
              {/* Course 1 */}
              <div className="group cursor-pointer">
                <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                  <img
                    alt="Recommended course"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDOWPTwkNaaRQQ0xplbXJaPwomxcRlUuIrtb7H1AqTT3gKn575bODxfpRInyYyS0S1iEDvo7p8139-ipB2hhvyDiqMVsdGVyaUJVCUF8_6jKjtcgl9x1IoUM7mBPrUx9paKJvV4VnGJLrPKMYcmpBbmhySOJMaO50gkzk_1lJIjcVGEs2ht7gnC-b17qK2mAtgW91RYAc_1XoArotjoMaAosE-8NB-xMLQHNqZQDF9JPzgTcyvy0SUwE8_jN4cC0jdqqJSU1FLJ43w"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  Advanced Deep Learning Architecture
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-[#5048e5] px-1.5 py-0.5 bg-[#5048e5]/10 rounded">
                    Recommended
                  </span>
                  <span className="text-[10px] text-slate-500">
                    24h content
                  </span>
                </div>
              </div>

              {/* Course 2 */}
              <div className="group cursor-pointer">
                <div className="relative h-24 rounded-xl overflow-hidden mb-2">
                  <img
                    alt="Recommended course"
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVZcShOG2UWEO1fYk2nB21fQ6Yzpjz57KmAFtMwZw6H715oVL3WIg_F0nCq-IsY9Pt0pu0Gfublx1nrcCvT9hvbl7Pk71bPy27yV-fecTvNMelYRD_slWIQ54AcILT6MyUPYdTR6wFp8wcs5yFWpK2t9nK2efhopn8rKXHnpjcAjhjd4wcDdqtCBQ87-5Nl10L865dAYE77owHPcULpSweo2f2-YooKWFuPm7Uzw-2I1QYlSv2QMM5lJSbzlj4zLY_wD7LsD_Jj8E"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                </div>
                <p className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                  MLOps: Scaling for Production
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] font-bold text-slate-500 px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded">
                    Intermediate
                  </span>
                  <span className="text-[10px] text-slate-500">
                    18h content
                  </span>
                </div>
              </div>

              <button className="w-full py-2.5 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-500 hover:text-[#5048e5] hover:border-[#5048e5] transition-all">
                Explore All Advanced Paths
              </button>
            </div>
          </div>

          {/* Mentor Widget */}
          <div className="bg-gradient-to-br from-[#5048e5] to-indigo-600 rounded-2xl p-6 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h4 className="font-bold text-sm mb-2">Need Career Advice?</h4>
              <p className="text-xs text-white/80 mb-4">
                Schedule a session with an industry expert to discuss how this
                certification impacts your career path.
              </p>
              <button className="w-full py-2 bg-white text-[#5048e5] rounded-lg text-xs font-bold hover:bg-white/90 transition-colors">
                Book Mentor Session
              </button>
            </div>
            <span className="material-symbols-outlined absolute -right-4 -bottom-4 text-8xl text-white/10 -rotate-12 select-none">
              rocket_launch
            </span>
          </div>
        </aside>
      </div>
    </div>
  );
}
