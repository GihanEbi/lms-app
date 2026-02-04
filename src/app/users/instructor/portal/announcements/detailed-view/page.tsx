"use client";

import React from "react";
import Link from "next/link";

export default function AnnouncementAudiencePage() {
  const viewedStudents = [
    {
      name: "Alex Rivers",
      email: "alex.rivers@edu.com",
      viewedAt: "Oct 24, 2023",
      time: "10:45 AM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA_p97Mgx88mANurNmUZOL9pTmYFUgTZZowf9izhrP0D1xIIxaguzTTIzUix9Mfs-KtA5s0K9oWwwtLhddJdLBjgI9svsXubIP5_IGfpuyZFblLyQ0nrGDI_7Hn3vLInioqyxAmy4xX9lJZlk15oIIYQqeqtdgxFkGq9soI6y3QFk_Ncbtd7i24dVM4FRYSUFq_u5GG1bvGInnOkf86pLlWDv7y2A-Z6edFKYff3VD_vzXRol9oxo4yEzI7da7NhxtyVRSaHeCPaVY",
    },
    {
      name: "Sarah Jenkins",
      email: "sarah.j@edu.com",
      viewedAt: "Oct 24, 2023",
      time: "09:12 AM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuA9tQevKtMCVoZigGrHqt7gNrpeZLq5n7NAM9c5TVSBPFIWyJjcWJdK8rO90h0Vsayqx-8GpjF5CTqgAC1jGsBIKBiIZh26vWMEwZbijRvm9BjVA8544pvurkRPxraXJWBEzlXTPRlTBKeWLo32TM0ZxAWlwxn_L63OmLOVpMdyz3N01J7ny8jKm3T_B1_FuNbal2McjUyTmGX9MAhlcUbzUu3eA7Xt6THK_ZzyFOq2ySUToFEx8TfnBWFVkfqz3SUemEdYxeFAboM",
    },
    {
      name: "Michael Chen",
      email: "m.chen@edu.com",
      viewedAt: "Oct 23, 2023",
      time: "11:58 PM",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDlG-HFX6O3YCxDY1lUNpeNhmyrRlSVGvWhPOUv_mkmaYAKY-49Zcqw3FKKAaNrNn70kfkIkbNwdk7OW9nk2ltsd58udWgFyBQy3J2JorKh2sX7V8Dq9W97SggLDlP7j1172UofhmebqZ2o9E0OmgNKMwqayfaQUsMA_DgWFA1d4oqz6mgmcv9n3zV_kGb3D32qFQD4GeUTaJfDi-TgXwniHGXzZpj4w78Bwk-9xDXEYwGgIlPxMCQu5J48X8hdKeR8rQ9oL-OTC5o",
    },
  ];

  const notViewedStudents = [
    {
      name: "Elena Gilbert",
      email: "e.gilbert@edu.com",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuAq5lnZScKr7W_0gIXDEDYua8wZ6TzYZuzhKtEvouQaUSqZLOKbmgDkH_PWIf7c8Rk75Ih9_57qvZxEfcu3Lm2OpRaFZcCB05mc5KhMKrnvsD9vkaiway98ufaQ_egSzeZIx_QXAm0n0oNH0dyZxvuYHXhwyrD1pbiORNAov7YquDkHj8ik0xQ8eeBEXczKOgbWO7VdNmkQwLzIaHX21Nu95Gfbtk1kixgfkAEeTfvoOnOR54G9pQJrXAuiXAs7fkuChtwUxgbrnlw",
    },
    {
      name: "Marcus Wright",
      email: "m.wright@edu.com",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuDPXOdyKcq1laE3iw78xYzkyeilp5yRXZgtJySalfqhPbkmpshYK1W2UzyMxOS8y99skgkvd05B-gulGGplo-kZ6jHmeU5x4RDZL0Q39Zx7aiC3bgRKs58zYaSfXZoKN6nIgD77wisCZHKd-kUaAJEPO_TZ3y-SzTKx3w8oypGuTXJL67nlkvY4hJ2paxIArdRFxqgCbL_KI0kTz2H8O8f-ECRQWlJg5yMggpfiCDCI3pkFSdMavAVr3EOqgy6ut4ahS8-ZKXOFuAM",
    },
    {
      name: "Jessica Alba",
      email: "j.alba@edu.com",
      image:
        "https://lh3.googleusercontent.com/aida-public/AB6AXuBKnohSR7tzdxxd8fvN9Zo9ioavk_QW2E6ojWFyqJkCr4lT23jCRM533CyMdL8-o6KlBgbvr2ADvDEGkx6l35aGZwQLKrlyopkUOASIRKzX6AWx_UGaSRHa7v0iuBQbNKd-ZSoK5gKKWCUB9dYginbA-n0Z53w_JlXyAleyGE2NGIw6YHK15XEAILktgsex1mZtm_danH728GtXH3JFDgsQN1mz58u6FPHhczRfByrPdwSJxrGbNX89pzg1AffHRVMzXjV0tBsEq8I",
    },
  ];

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100 flex flex-col">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Upcoming Midterm Exam Schedule &amp; Preparation
            </h2>
            <p className="text-sm text-slate-500 font-medium">
              Course: CS402 - Artificial Intelligence Foundations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-2 hover:bg-slate-50 transition-colors">
              <span className="material-symbols-outlined !text-lg">
                file_download
              </span>
              Export Report
            </button>
          </div>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="p-8 flex-1 pb-32">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
              Total Students
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                124
              </h3>
              <span className="text-sm font-medium text-slate-400 mb-1">
                Students enrolled
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-emerald-500 uppercase tracking-wider mb-2">
              Total Viewed
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                98
              </h3>
              <span className="text-sm font-bold text-emerald-500 mb-1">
                79.0%
              </span>
            </div>
          </div>
          <div className="bg-white dark:bg-[#1a192e] p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <p className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2">
              Not Yet Viewed
            </p>
            <div className="flex items-end gap-2">
              <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none">
                26
              </h3>
              <span className="text-sm font-bold text-amber-500 mb-1">
                21.0%
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column: Viewed */}
          <div className="flex flex-col h-full bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1a192e] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-emerald-500">
                  visibility
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Viewed (98)
                </h3>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-lg">
                  search
                </span>
                <input
                  className="pl-9 pr-4 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs w-48 focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none"
                  placeholder="Search students..."
                  type="text"
                />
              </div>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-wider font-bold text-slate-400 sticky top-0">
                  <tr>
                    <th className="px-6 py-3">Student</th>
                    <th className="px-6 py-3">Viewed At</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {viewedStudents.map((student, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-8 rounded-full bg-slate-200 border border-slate-100 bg-cover bg-center"
                            style={{
                              backgroundImage: `url('${student.image}')`,
                            }}
                          ></div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                              {student.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                            {student.viewedAt}
                          </span>
                          <span className="text-[10px] text-slate-400">
                            {student.time}
                          </span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column: Not Viewed */}
          <div className="flex flex-col h-full bg-white dark:bg-[#1a192e] rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
            <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-[#1a192e] flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-amber-500">
                  visibility_off
                </span>
                <h3 className="font-bold text-slate-900 dark:text-white">
                  Not Viewed (26)
                </h3>
              </div>
              <button className="bg-[#5048e5] text-white text-xs font-bold px-4 py-2 rounded-lg hover:bg-[#5048e5]/90 transition-all flex items-center gap-2 shadow-sm">
                <span className="material-symbols-outlined !text-sm">mail</span>
                Send Reminder to All
              </button>
            </div>
            <div className="flex-1 overflow-y-auto max-h-[600px] custom-scrollbar">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-slate-800/50 text-[10px] uppercase tracking-wider font-bold text-slate-400 sticky top-0">
                  <tr>
                    <th className="px-6 py-3">Student</th>
                    <th className="px-6 py-3 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-50 dark:divide-slate-800">
                  {notViewedStudents.map((student, i) => (
                    <tr
                      key={i}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className="size-8 rounded-full bg-slate-200 border border-slate-100 bg-cover bg-center"
                            style={{
                              backgroundImage: `url('${student.image}')`,
                            }}
                          ></div>
                          <div>
                            <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                              {student.name}
                            </p>
                            <p className="text-[10px] text-slate-500">
                              {student.email}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="p-2 text-slate-400 hover:text-[#5048e5] transition-colors hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg">
                          <span className="material-symbols-outlined !text-lg">
                            notifications_active
                          </span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* --- Footer Actions --- */}
      <footer className="fixed bottom-0 right-0 w-full bg-white/90 dark:bg-[#1a192e]/90 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between z-40">
        <div className="flex items-center gap-4">
          <Link
            href="/instructor/announcements"
            className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-colors"
          >
            Back to List
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 transition-colors">
            Print List
          </button>
          <button className="px-8 py-2.5 text-sm font-bold text-white bg-[#5048e5] rounded-xl hover:bg-[#5048e5]/90 transition-all shadow-lg shadow-[#5048e5]/25">
            Download Detailed PDF
          </button>
        </div>
      </footer>
    </div>
  );
}
