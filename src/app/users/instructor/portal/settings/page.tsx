"use client";

import React from "react";

export default function SettingsPage() {
  return (
    <div className="flex h-full flex-col bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 overflow-hidden relative">
      {/* Main Content Scrollable Area */}
      <div className="flex-1 overflow-y-auto bg-[#f6f6f8] dark:bg-[#121121]">
        <div className="max-w-3xl mx-auto px-6 py-10 pb-24">
          <div className="mb-8">
            <h2 className="text-3xl font-bold tracking-tight mb-2 text-slate-900 dark:text-white">
              Account Settings
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Manage your profile, preferences, and account security.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-slate-200 dark:border-slate-800 mb-8 overflow-x-auto whitespace-nowrap">
            <button className="px-6 py-3 text-sm font-bold text-[#5048e5] border-b-2 border-[#5048e5]">
              Profile
            </button>
            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Account Security
            </button>
            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              Notifications
            </button>
            <button className="px-6 py-3 text-sm font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-colors">
              AI Preferences
            </button>
          </div>

          <div className="space-y-12">
            {/* Profile Section */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                  Public Profile
                </h3>
                <p className="text-sm text-slate-500">
                  This information will be visible to your instructors and
                  classmates.
                </p>
              </div>
              <div className="space-y-8">
                <div className="flex items-center gap-6">
                  <div className="relative group">
                    <div className="size-24 rounded-2xl overflow-hidden border-2 border-[#5048e5]/10">
                      <div
                        className="w-full h-full bg-cover bg-center"
                        style={{
                          backgroundImage:
                            'url("https://ui-avatars.com/api/?name=Alex+Johnson&background=random")',
                        }}
                      ></div>
                    </div>
                    <button className="absolute -bottom-2 -right-2 size-8 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center text-[#5048e5] hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-lg">
                        edit
                      </span>
                    </button>
                  </div>
                  <div>
                    <p className="text-sm font-bold mb-1 text-slate-900 dark:text-white">
                      Profile Picture
                    </p>
                    <p className="text-xs text-slate-500 mb-3">
                      JPG, GIF or PNG. Max size of 2MB.
                    </p>
                    <div className="flex items-center gap-3">
                      <button className="px-4 py-1.5 bg-[#5048e5] text-white text-xs font-bold rounded-lg hover:opacity-90 transition-opacity">
                        Upload New
                      </button>
                      <button className="px-4 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 text-xs font-bold rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="full-name"
                      className="text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                      Full Name
                    </label>
                    <input
                      id="full-name"
                      type="text"
                      defaultValue="Alex Johnson"
                      className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                      Email Address
                    </label>
                    <input
                      id="email"
                      type="email"
                      defaultValue="alex.johnson@edulearn.edu"
                      readOnly
                      className="w-full bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed outline-none"
                    />
                    <p className="text-[11px] text-slate-400">
                      Institutional email addresses cannot be changed.
                    </p>
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="bio"
                      className="text-sm font-bold text-slate-700 dark:text-slate-300"
                    >
                      Bio
                    </label>
                    <textarea
                      id="bio"
                      rows={4}
                      defaultValue="Sophomore Computer Science student with a focus on AI and ethics. Passionate about leveraging technology for social impact."
                      className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all"
                      placeholder="Tell us about your academic interests..."
                    ></textarea>
                    <p className="text-[11px] text-slate-400">
                      Brief description for your profile. 200 characters max.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-slate-200 dark:border-slate-800" />

            {/* AI Preferences Section */}
            <section className="space-y-6">
              <div className="flex flex-col gap-1">
                <h3 className="text-lg font-bold flex items-center gap-2 text-slate-900 dark:text-white">
                  <span
                    className="material-symbols-outlined text-[#5048e5]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    auto_awesome
                  </span>
                  AI Preferences
                </h3>
                <p className="text-sm text-slate-500">
                  Customize how our AI tutor helps you learn.
                </p>
              </div>

              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden divide-y divide-slate-100 dark:divide-slate-800">
                {/* Preference Item 1 */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Personalized Learning Recommendations
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      The AI analyzes your performance to suggest specific study
                      materials and practice problems tailored to your needs.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5048e5]"></div>
                  </label>
                </div>

                {/* Preference Item 2 */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Smart Study Reminders
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Receive AI-generated nudges based on upcoming deadlines
                      and your historical study patterns to help you stay on
                      track.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5048e5]"></div>
                  </label>
                </div>

                {/* Preference Item 3 */}
                <div className="p-6 flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      Automatic Transcription
                    </p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                      Automatically transcribe and summarize your recorded
                      lectures for easier review and keyword searching.
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#5048e5]"></div>
                  </label>
                </div>
              </div>
            </section>

            {/* Danger Zone */}
            <section className="space-y-4 pt-4">
              <h3 className="text-lg font-bold text-red-600">Danger Zone</h3>
              <div className="bg-red-50 dark:bg-red-900/10 border border-red-200 dark:border-red-900/30 rounded-2xl p-6 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-red-600">
                    Delete Account
                  </p>
                  <p className="text-xs text-red-600/80">
                    Permanently remove your account and all associated data.
                  </p>
                </div>
                <button className="px-4 py-2 bg-red-600 text-white text-xs font-bold rounded-lg hover:bg-red-700 transition-colors">
                  Delete Account
                </button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Actions */}
      <div className="absolute bottom-0 left-0 right-0 bg-white/80 dark:bg-[#1a242e]/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 p-4 flex justify-end z-10">
        <div className="max-w-3xl w-full mx-auto flex justify-end gap-3 px-2">
          <button className="px-6 py-2.5 text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
            Cancel
          </button>
          <button className="px-8 py-2.5 bg-[#5048e5] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#5048e5]/20 hover:opacity-90 transition-opacity">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
