"use client";

import React, { useState } from "react";

export default function MessagesPage() {
  const [activeTab, setActiveTab] = useState<"all" | "instructors" | "groups">(
    "all",
  );
  const [input, setInput] = useState("");

  // State to handle mobile view switching
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);

  // Helper to open chat on mobile
  const handleChatSelect = () => {
    setIsMobileChatOpen(true);
  };

  // Helper to go back to list on mobile
  const handleBackToList = () => {
    setIsMobileChatOpen(false);
  };

  return (
    <div className="flex h-[calc(100vh-64px)] bg-[#f6f7f8] dark:bg-[#111921] font-sans text-slate-900 dark:text-slate-100 overflow-hidden relative">
      {/* 
        LEFT COLUMN: Conversation List 
        - W-full on mobile (takes full width)
        - Hidden on mobile if chat is open
        - Fixed width on desktop (md:w-[320px])
        - Always visible on desktop (md:flex)
      */}
      <aside
        className={`
          flex-col border-r border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1a242e] flex-shrink-0 transition-all
          ${isMobileChatOpen ? "hidden md:flex" : "flex w-full"} 
          md:w-[320px]
        `}
      >
        <div className="p-4 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Messages</h1>
            <button className="flex items-center justify-center p-2 rounded-lg bg-[#197fe6]/10 text-[#197fe6] hover:bg-[#197fe6]/20 transition-colors">
              <span className="material-symbols-outlined">edit_square</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">
              search
            </span>
            <input
              className="w-full pl-10 pr-4 py-2 bg-[#f6f7f8] dark:bg-slate-800 border-none rounded-xl text-sm placeholder:text-slate-500 focus:ring-2 focus:ring-[#197fe6]/50 outline-none"
              placeholder="Search conversations"
            />
          </div>

          {/* Filter Tabs */}
          <div className="flex border-b border-slate-100 dark:border-slate-800">
            {["all", "instructors", "groups"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as any)}
                className={`flex-1 py-2 text-sm capitalize ${activeTab === tab ? "font-bold border-b-2 border-[#197fe6] text-[#197fe6]" : "font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"}`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 custom-scrollbar">
          {/* Active Item - Added onClick */}
          <div
            onClick={handleChatSelect}
            className="flex items-center gap-3 p-3 rounded-xl bg-[#197fe6]/5 border border-[#197fe6]/10 cursor-pointer mb-1"
          >
            <div className="relative shrink-0">
              <div
                className="size-12 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://ui-avatars.com/api/?name=Emily+Chen&background=random")',
                }}
              ></div>
              <div className="absolute bottom-0 right-0 size-3.5 rounded-full bg-green-500 border-2 border-white dark:border-[#1a242e]"></div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-slate-900 dark:text-white truncate">
                  Dr. Emily Chen
                </p>
                <span className="text-[10px] text-[#197fe6] font-medium">
                  10:24 AM
                </span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                The lecture notes are attached...
              </p>
            </div>
          </div>

          {/* Other Item - Added onClick */}
          <div
            onClick={handleChatSelect}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors mb-1"
          >
            <div className="relative shrink-0">
              <div
                className="size-12 rounded-full bg-cover bg-center"
                style={{
                  backgroundImage:
                    'url("https://ui-avatars.com/api/?name=Marcus+Wright&background=random")',
                }}
              ></div>
              <div className="absolute bottom-0 right-0 size-3.5 rounded-full bg-slate-300 border-2 border-white dark:border-[#1a242e]"></div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  Marcus Wright
                </p>
                <span className="text-[10px] text-slate-400">9:45 AM</span>
              </div>
              <p className="text-xs text-slate-900 dark:text-slate-300 font-semibold truncate">
                Hey, did you see the new assignment?
              </p>
            </div>
            <div className="shrink-0">
              <div className="size-5 rounded-full bg-red-500 text-[10px] text-white flex items-center justify-center font-bold">
                2
              </div>
            </div>
          </div>

          {/* Group Item - Added onClick */}
          <div
            onClick={handleChatSelect}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors mb-1"
          >
            <div className="relative shrink-0">
              <div className="size-12 rounded-full bg-[#197fe6]/10 flex items-center justify-center text-[#197fe6]">
                <span className="material-symbols-outlined">groups</span>
              </div>
            </div>
            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  Bio Study Group
                </p>
                <span className="text-[10px] text-slate-400">Yesterday</span>
              </div>
              <p className="text-xs text-slate-500 truncate">
                Sarah: Let&apos;s meet at 5PM
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* 
        CENTER COLUMN: Main Chat Window 
        - Hidden on mobile unless chat is open
        - Always visible on desktop (md:flex)
        - w-full on mobile when active
      */}
      <section
        className={`
          flex-1 flex-col bg-slate-50 dark:bg-[#111921] relative min-w-0
          ${isMobileChatOpen ? "flex w-full absolute inset-0 z-20" : "hidden md:flex md:static"}
        `}
      >
        {/* Chat Header */}
        <header className="h-16 shrink-0 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-[#1a242e]/80 backdrop-blur-md flex items-center justify-between px-4 md:px-6 z-10">
          <div className="flex items-center gap-3">
            {/* Back Button (Mobile Only) */}
            <button
              onClick={handleBackToList}
              className="md:hidden p-1 mr-1 text-slate-500 hover:text-[#197fe6]"
            >
              <span className="material-symbols-outlined">arrow_back</span>
            </button>

            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Dr. Emily Chen
                </h3>
                <span className="px-2 py-0.5 rounded-full bg-[#197fe6]/10 text-[#197fe6] text-[10px] font-bold uppercase tracking-wider">
                  Instructor
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="size-1.5 rounded-full bg-green-500 animate-pulse"></div>
                <p className="text-xs text-slate-500">
                  Advanced Biology 101 •{" "}
                  <span className="italic">typing...</span>
                </p>
              </div>
            </div>
          </div>
          {/* <div className="flex items-center gap-2 md:gap-4">
            <button className="text-slate-400 hover:text-[#197fe6] transition-colors p-2">
              <span className="material-symbols-outlined">videocam</span>
            </button>
            <button className="text-slate-400 hover:text-[#197fe6] transition-colors p-2">
              <span className="material-symbols-outlined">call</span>
            </button>
            <button className="text-slate-400 hover:text-[#197fe6] transition-colors xl:hidden p-2">
              <span className="material-symbols-outlined">info</span>
            </button>
          </div> */}
        </header>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 custom-scrollbar">
          <div className="flex justify-center">
            <span className="px-3 py-1 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-tighter">
              Today, Oct 24
            </span>
          </div>

          {/* Received Message */}
          <div className="flex items-start gap-3 max-w-[90%] md:max-w-[85%]">
            <div
              className="size-8 rounded-full bg-cover bg-center shrink-0"
              style={{
                backgroundImage:
                  'url("https://ui-avatars.com/api/?name=Emily+Chen&background=random")',
              }}
            ></div>
            <div className="flex flex-col gap-1">
              <div className="bg-white dark:bg-[#1a242e] p-4 rounded-xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  Hello! I&apos;ve reviewed your latest submission. The
                  methodology looks solid, but I&apos;ve added some notes on the
                  data visualization part.
                </p>
              </div>
              <span className="text-[10px] text-slate-400 ml-1">10:15 AM</span>
            </div>
          </div>

          {/* Sent Message */}
          <div className="flex flex-col items-end gap-1">
            <div className="flex items-start gap-3 max-w-[90%] md:max-w-[85%] flex-row-reverse">
              <div className="flex flex-col gap-1 items-end">
                <div className="bg-gradient-to-br from-[#197fe6] to-[#4a9eff] text-white p-4 rounded-xl rounded-tr-none shadow-md">
                  <p className="text-sm leading-relaxed">
                    Thank you, Dr. Chen! I&apos;ll take a look right away. Are
                    the notes in the PDF you mentioned?
                  </p>
                </div>
                <div className="flex items-center gap-1 mr-1">
                  <span className="text-[10px] text-slate-400">10:20 AM</span>
                  <span className="material-symbols-outlined text-[#197fe6] text-[14px]">
                    done_all
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Thread Reply (Received) */}
          <div className="flex items-start gap-3 max-w-[90%] md:max-w-[85%]">
            <div
              className="size-8 rounded-full bg-cover bg-center shrink-0"
              style={{
                backgroundImage:
                  'url("https://ui-avatars.com/api/?name=Emily+Chen&background=random")',
              }}
            ></div>
            <div className="flex flex-col gap-1">
              <div className="bg-white dark:bg-[#1a242e] p-4 rounded-xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700">
                {/* Reply Context */}
                <div className="border-l-2 border-[#197fe6] bg-[#197fe6]/5 p-2 mb-3 rounded-r-md">
                  <p className="text-[10px] text-[#197fe6] font-bold">
                    You replied
                  </p>
                  <p className="text-xs text-slate-500 truncate italic">
                    &quot;Are the notes in the PDF you mentioned?&quot;
                  </p>
                </div>
                <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                  Yes, exactly. I&apos;ve attached the marked-up PDF below for
                  your reference. Let me know if you have questions about the
                  revised Chart 3.
                </p>
              </div>

              {/* Attachment Card */}
              <div className="mt-2 w-full sm:w-72 bg-white dark:bg-[#1a242e] rounded-xl border border-slate-100 dark:border-slate-700 p-3 flex items-center gap-3 shadow-sm hover:border-[#197fe6]/30 transition-all cursor-pointer group">
                <div className="size-10 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined">
                    picture_as_pdf
                  </span>
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                    Feedback_Methods_v2.pdf
                  </p>
                  <p className="text-[10px] text-slate-500">
                    2.4 MB • PDF Document
                  </p>
                </div>
                <span className="material-symbols-outlined text-slate-400 group-hover:text-[#197fe6] transition-colors">
                  download
                </span>
              </div>
              <span className="text-[10px] text-slate-400 ml-1">10:24 AM</span>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 md:p-6 bg-white dark:bg-[#1a242e] border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col gap-2 bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-2">
            {/* Toolbar */}
            <div className="flex items-center gap-1 px-2 border-b border-slate-200 dark:border-slate-700 pb-2 mb-1 overflow-x-auto no-scrollbar">
              {["format_bold", "format_italic", "link"].map((icon) => (
                <button
                  key={icon}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {icon}
                  </span>
                </button>
              ))}
              <div className="w-px h-4 bg-slate-300 dark:bg-slate-600 mx-1 shrink-0"></div>
              {["format_list_bulleted", "code"].map((icon) => (
                <button
                  key={icon}
                  className="p-1.5 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-500 shrink-0"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {icon}
                  </span>
                </button>
              ))}
            </div>

            {/* Text Input */}
            <div className="flex items-end gap-2 md:gap-3 px-2">
              <button className="mb-2 p-1.5 text-slate-400 hover:text-[#197fe6] transition-colors">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent border-none focus:ring-0 text-sm resize-none py-2 max-h-32 min-h-[40px] placeholder:text-slate-400 dark:text-white outline-none"
                placeholder="Write a message..."
              ></textarea>
              <div className="flex items-center gap-2 mb-1.5">
                <button className="p-1.5 text-slate-400 hover:text-[#197fe6] transition-colors hidden sm:block">
                  <span className="material-symbols-outlined">
                    sentiment_satisfied
                  </span>
                </button>
                <button className="bg-[#197fe6] hover:bg-[#197fe6]/90 text-white size-9 flex items-center justify-center rounded-xl shadow-lg shadow-[#197fe6]/20 transition-all">
                  <span className="material-symbols-outlined text-[20px]">
                    send
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 
        Right Column: Info Panel 
        - Hidden on mobile/tablet (default xl:flex)
        - You could toggle this on mobile with another state if desired
      */}
      <aside className="hidden xl:flex w-[320px] flex-col border-l border-[#e7edf3] dark:border-slate-800 bg-white dark:bg-[#1a242e] overflow-y-auto custom-scrollbar flex-shrink-0">
        <div className="p-6 flex flex-col items-center text-center">
          <div
            className="size-24 rounded-3xl border-4 border-slate-50 dark:border-slate-800 shadow-xl bg-cover bg-center mb-4"
            style={{
              backgroundImage:
                'url("https://ui-avatars.com/api/?name=Emily+Chen&background=random")',
            }}
          ></div>
          <h4 className="text-lg font-bold text-slate-900 dark:text-white">
            Dr. Emily Chen
          </h4>
          <p className="text-xs text-slate-500 font-medium mb-1">
            Senior Lecturer, Biology Dept.
          </p>
          <p className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded-md uppercase font-bold tracking-widest">
            Faculty Member
          </p>
        </div>

        <div className="px-6 space-y-6">
          {/* About/Context */}
          <div className="space-y-2">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Course Information
            </h5>
            <div className="bg-[#f6f7f8] dark:bg-[#111921] p-3 rounded-xl border border-slate-100 dark:border-slate-800">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                Advanced Biology 101
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Status: Active Participant
              </p>
            </div>
          </div>

          {/* Shared Media */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
                Shared Photos
              </h5>
              <button className="text-[10px] text-[#197fe6] font-bold hover:underline">
                View All
              </button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div
                className="aspect-square rounded-lg bg-cover bg-center bg-slate-200"
                style={{
                  backgroundImage:
                    'url("https://picsum.photos/200/200?random=1")',
                }}
              ></div>
              <div
                className="aspect-square rounded-lg bg-cover bg-center bg-slate-200"
                style={{
                  backgroundImage:
                    'url("https://picsum.photos/200/200?random=2")',
                }}
              ></div>
              <div
                className="relative aspect-square rounded-lg bg-cover bg-center bg-slate-200"
                style={{
                  backgroundImage:
                    'url("https://picsum.photos/200/200?random=3")',
                }}
              >
                <div className="absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                  +12
                </div>
              </div>
            </div>
          </div>

          {/* Files */}
          <div className="space-y-3">
            <h5 className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
              Files & Documents
            </h5>
            <div className="space-y-2">
              <div className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="size-8 bg-blue-100 dark:bg-blue-900/30 text-blue-600 rounded flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    description
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                    Syllabus_2024.pdf
                  </p>
                  <p className="text-[10px] text-slate-500">1.2 MB</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer border border-transparent hover:border-slate-100 dark:hover:border-slate-700">
                <div className="size-8 bg-green-100 dark:bg-green-900/30 text-green-600 rounded flex items-center justify-center shrink-0">
                  <span className="material-symbols-outlined text-[18px]">
                    table_chart
                  </span>
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-semibold truncate text-slate-800 dark:text-slate-200">
                    Grade_Rubric.xlsx
                  </p>
                  <p className="text-[10px] text-slate-500">45 KB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Settings */}
          <div className="pt-4 space-y-4 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined text-[20px]">
                  notifications_off
                </span>
                <span className="text-sm font-medium">Mute notifications</span>
              </div>
              <input
                type="checkbox"
                className="toggle-checkbox rounded-full text-[#197fe6]"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3 text-slate-600 dark:text-slate-300">
                <span className="material-symbols-outlined text-[20px]">
                  push_pin
                </span>
                <span className="text-sm font-medium">Pin conversation</span>
              </div>
              <input
                type="checkbox"
                className="toggle-checkbox rounded-full text-[#197fe6]"
                defaultChecked
              />
            </div>
            <button className="w-full flex items-center gap-3 text-red-500 hover:text-red-600 transition-colors py-1">
              <span className="material-symbols-outlined text-[20px]">
                block
              </span>
              <span className="text-sm font-medium">Block Participant</span>
            </button>
          </div>
        </div>
        <div className="h-12 shrink-0"></div>
      </aside>
    </div>
  );
}
