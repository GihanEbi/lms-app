"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface UserData {
  fullName: string;
  email: string;
  education: string;
  fieldOfStudy: string;
  learningStyle: "Visual" | "Auditory" | "Kinesthetic";
  studyTime: "Morning" | "Afternoon" | "Evening" | "Night";
}

export default function Step3PreferencesPage() {
  const router = useRouter();

  // Local state to simulate data aggregation
  const [userData, setUserData] = useState<UserData>({
    fullName: "John Doe",
    email: "john.doe@example.com",
    education: "Undergraduate",
    fieldOfStudy: "Computer Science",
    learningStyle: "Visual",
    studyTime: "Morning",
  });

  const handleUpdate = (updates: Partial<UserData>) => {
    setUserData((prev) => ({ ...prev, ...updates }));
  };

  const handleBack = () => {
    router.push("/users/student/registration/profile-registration/academic");
  };

  const handleComplete = () => {
    console.log("Finalizing registration:", userData);
    // Navigate to ai intro
    router.push("/users/student/registration/ai-interview/ai-intro");
  };

  const steps = [
    { label: "Profile Info", status: "completed", icon: "check_circle" },
    { label: "Academic", status: "completed", icon: "check_circle" },
    { label: "Preferences", status: "active", icon: "radio_button_checked" },
    { label: "Complete", status: "pending", icon: "circle" },
  ];

  return (
    <>
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center py-6 md:py-10 px-4 w-full">
        <div className="max-w-[1000px] w-full bg-white dark:bg-[#121121] rounded-xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 md:p-8">
          {/* Responsive Progress Bar */}
          <div className="flex items-start justify-between w-full mb-8 sm:mb-12 relative px-2">
            {/* Connector Line (Visual only) */}
            <div className="absolute top-3 left-4 right-4 h-0.5 bg-slate-100 dark:bg-slate-800 -z-10 hidden sm:block" />

            {steps.map((step, index) => (
              <div
                key={index}
                className="flex flex-col items-center gap-1.5 z-10 bg-white dark:bg-[#121121] px-1"
              >
                <span
                  className={`material-symbols-outlined text-2xl ${
                    step.status === "active" || step.status === "completed"
                      ? "text-[#5048e5] font-bold"
                      : "text-slate-300 dark:text-slate-700"
                  }`}
                >
                  {step.icon}
                </span>

                {/* 
                   Responsiveness Logic: 
                   - Always show the label if it's the ACTIVE step.
                   - Hide labels for inactive steps on mobile.
                   - Show all labels on small screens and up.
                */}
                <p
                  className={`text-[10px] font-bold uppercase tracking-widest whitespace-nowrap ${
                    step.status === "active"
                      ? "text-[#5048e5] block"
                      : step.status === "completed"
                        ? "text-[#5048e5] hidden sm:block"
                        : "text-slate-400 dark:text-slate-600 hidden sm:block"
                  }`}
                >
                  {step.label}
                </p>
              </div>
            ))}
          </div>

          {/* Title Section */}
          <div className="text-center mb-8 sm:mb-10">
            <h1 className="text-slate-900 dark:text-white text-2xl sm:text-3xl font-black pb-2">
              Personalize Your Experience
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
              Finalize your settings to help our AI tailor the curriculum for
              you.
            </p>
          </div>

          {/* Learning Style Section */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              How do you learn best?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  label: "Visual",
                  icon: "visibility",
                  desc: "Images & Videos",
                },
                {
                  label: "Auditory",
                  icon: "headphones",
                  desc: "Listening & Speaking",
                },
                {
                  label: "Kinesthetic",
                  icon: "pan_tool",
                  desc: "Hands-on Practice",
                },
              ].map((style) => (
                <button
                  key={style.label}
                  onClick={() =>
                    handleUpdate({ learningStyle: style.label as any })
                  }
                  className={`flex flex-col gap-3 rounded-xl p-5 text-left transition-all border-2 ${
                    userData.learningStyle === style.label
                      ? "border-[#5048e5] bg-[#5048e5]/5"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-[#5048e5]/30"
                  }`}
                >
                  <div className="flex justify-between w-full">
                    <span
                      className={`material-symbols-outlined text-3xl ${
                        userData.learningStyle === style.label
                          ? "text-[#5048e5]"
                          : "text-slate-400"
                      }`}
                    >
                      {style.icon}
                    </span>
                    {userData.learningStyle === style.label && (
                      <span className="material-symbols-outlined text-[#5048e5]">
                        check_circle
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white">
                      {style.label}
                    </h3>
                    <p className="text-slate-500 dark:text-slate-400 text-xs mt-1">
                      {style.desc}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Study Time Section */}
          <section className="mb-8 sm:mb-10">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              Preferred Study Time
            </h2>
            <div className="flex flex-wrap gap-3">
              {[
                { label: "Morning", icon: "light_mode" },
                { label: "Afternoon", icon: "wb_sunny" },
                { label: "Evening", icon: "dark_mode" },
                { label: "Night", icon: "star" },
              ].map((time) => (
                <button
                  key={time.label}
                  onClick={() => handleUpdate({ studyTime: time.label as any })}
                  className={`flex items-center gap-2 px-5 py-3 rounded-lg border transition-all font-medium text-sm ${
                    userData.studyTime === time.label
                      ? "border-[#5048e5] bg-[#5048e5] text-white shadow-md shadow-[#5048e5]/20"
                      : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {time.icon}
                  </span>
                  {time.label}
                </button>
              ))}
            </div>
          </section>

          {/* Review Section */}
          <section>
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-4">
              Review Information
            </h2>
            <div className="space-y-3">
              {[
                {
                  label: "Personal Profile",
                  icon: "person",
                  items: [
                    { l: "Full Name", v: userData.fullName },
                    { l: "Email", v: userData.email },
                  ],
                },
                {
                  label: "Academic Background",
                  icon: "school",
                  items: [
                    { l: "Education Level", v: userData.education },
                    { l: "Major", v: userData.fieldOfStudy },
                  ],
                },
                {
                  label: "Preferences",
                  icon: "settings",
                  items: [
                    { l: "Learning Style", v: userData.learningStyle },
                    { l: "Schedule", v: userData.studyTime },
                  ],
                },
              ].map((section) => (
                <div
                  key={section.label}
                  className="border border-slate-200 dark:border-slate-800 rounded-lg bg-slate-50 dark:bg-slate-900/50 overflow-hidden"
                >
                  <div className="flex items-center justify-between p-3 border-b border-slate-200 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-[#5048e5] text-[20px]">
                        {section.icon}
                      </span>
                      <span className="font-semibold text-sm text-slate-900 dark:text-white">
                        {section.label}
                      </span>
                    </div>
                    <button className="text-[#5048e5] text-xs font-bold hover:underline uppercase tracking-wide">
                      Edit
                    </button>
                  </div>
                  <div className="p-3 grid grid-cols-2 gap-4 text-sm">
                    {section.items.map((it) => (
                      <div key={it.l}>
                        <p className="text-slate-500 dark:text-slate-400 text-xs">
                          {it.l}
                        </p>
                        <p className="font-medium text-slate-900 dark:text-slate-200">
                          {it.v}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>

      {/* Sticky Action Footer */}
      <footer className="bg-white dark:bg-[#121121] border-t border-slate-200 dark:border-slate-800 px-4 sm:px-6 lg:px-10 py-4 sm:py-6 sticky bottom-0 w-full shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="max-w-[1000px] mx-auto flex items-center justify-between">
          {/* Back Button */}
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-slate-500 font-bold hover:text-slate-800 dark:hover:text-white transition-colors px-3 sm:px-4 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-sm"
          >
            <span className="material-symbols-outlined text-lg">
              arrow_back
            </span>
            Back
          </button>

          {/* Complete Button */}
          <button
            onClick={handleComplete}
            className="flex items-center justify-center gap-2 h-12 px-6 sm:px-8 rounded-lg bg-[linear-gradient(135deg,#4F46E5_0%,#7C3AED_100%)] text-white font-bold shadow-lg shadow-[#5048e5]/20 hover:-translate-y-0.5 active:scale-[0.99] transition-all text-sm"
          >
            Complete Registration{" "}
            <span className="material-symbols-outlined text-lg">
              check_circle
            </span>
          </button>
        </div>
      </footer>
    </>
  );
}
