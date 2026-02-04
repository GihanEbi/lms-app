"use client";

import React, { useState } from "react";

export function PlayerRightPanel() {
  const [activeTab, setActiveTab] = useState<"mentor" | "notes">("notes");

  // --- Chat State (For Mentor Tab) ---
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi! I'm watching the lesson with you. Feel free to ask me to explain a concept or summarize what Dr. Chen just mentioned.",
    },
    { role: "user", text: "What's the difference between Sigmoid and ReLU?" },
    {
      role: "ai",
      text: "Great question! Sigmoid maps values to (0,1) which can cause 'vanishing gradients.' ReLU maps all negative values to zero and keeps positive values, allowing for faster training in deep networks.",
    },
  ]);

  const handleChatSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: chatInput }]);
    setChatInput("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "That's a complex topic. Let me break it down..." },
      ]);
    }, 1000);
  };

  return (
    <aside className="w-[400px] flex-shrink-0 border-l border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192e] flex flex-col h-full transition-colors duration-200">
      {/* --- Top Tabs --- */}
      <div className="flex items-center justify-between border-b border-[#e8e8f3] dark:border-[#2a293d] px-2 flex-shrink-0">
        <div className="flex">
          <button
            onClick={() => setActiveTab("mentor")}
            className={`py-4 px-4 text-sm font-bold flex items-center gap-2 transition-colors ${
              activeTab === "mentor"
                ? "text-[#5048e5] border-b-2 border-[#5048e5]"
                : "text-[#545095] dark:text-gray-400 hover:text-[#5048e5]"
            }`}
          >
            <span className="material-symbols-outlined text-lg">smart_toy</span>{" "}
            Mentor
          </button>
          <button
            onClick={() => setActiveTab("notes")}
            className={`py-4 px-4 text-sm font-bold flex items-center gap-2 transition-colors ${
              activeTab === "notes"
                ? "text-[#5048e5] border-b-2 border-[#5048e5]"
                : "text-[#545095] dark:text-gray-400 hover:text-[#5048e5]"
            }`}
          >
            <span className="material-symbols-outlined text-lg">edit_note</span>{" "}
            Smart Notes
          </button>
        </div>
        <button className="mr-3 px-3 py-1.5 rounded-lg bg-[#f6f6f8] dark:bg-[#2a293d] text-xs font-bold text-[#5048e5] border border-[#5048e5]/20 hover:bg-[#5048e5]/5 flex items-center gap-1.5 transition-colors">
          <span className="material-symbols-outlined text-base">ios_share</span>{" "}
          Export
        </button>
      </div>

      {/* --- Main Content Area --- */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {/* ======================= */}
        {/* VIEW: SMART NOTES       */}
        {/* ======================= */}
        {activeTab === "notes" && (
          <>
            {/* AI Status Bar */}
            <div className="p-4 bg-[#5048e5]/5 border-b border-[#5048e5]/10 flex items-center justify-between flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="size-2 bg-[#5048e5] rounded-full animate-pulse"></div>
                <span className="text-[11px] font-bold text-[#5048e5] uppercase tracking-wider">
                  AI Assistant Active
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] font-medium text-[#545095] dark:text-gray-400">
                  AI Summary
                </span>
                {/* Toggle Switch */}
                <button className="relative inline-flex h-5 w-9 items-center rounded-full bg-[#5048e5]">
                  <span className="inline-block h-3.5 w-3.5 transform rounded-full bg-white transition translate-x-4.5"></span>
                </button>
              </div>
            </div>

            {/* Scrollable Notes List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {/* Note Card 1: AI Snippet */}
              <div className="bg-[#5048e5]/5 border border-[#5048e5]/20 rounded-xl p-3 shadow-sm relative group transition-all hover:-translate-y-0.5">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black bg-[#5048e5] text-white px-1.5 py-0.5 rounded">
                      AI SNIPPET
                    </span>
                    <button className="text-xs font-bold text-[#5048e5] hover:underline font-mono">
                      [08:42]
                    </button>
                  </div>
                  <button className="text-[#545095] opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined text-lg">
                      close
                    </span>
                  </button>
                </div>
                <div className="bg-white dark:bg-[#25243d] rounded-lg p-2 border border-[#5048e5]/10">
                  <p className="text-[11px] font-bold text-[#5048e5] mb-1 uppercase tracking-tighter italic">
                    Key Definition
                  </p>
                  <p className="text-sm text-[#0f0e1b] dark:text-gray-200 leading-relaxed font-medium">
                    <span className="font-bold">
                      ReLU (Rectified Linear Unit):
                    </span>{" "}
                    f(x) = max(0, x). It helps mitigate the vanishing gradient
                    problem in deep networks.
                  </p>
                </div>
              </div>

              {/* Note Card 2: User Note */}
              <div className="bg-white dark:bg-[#1a192e] border border-[#e8e8f3] dark:border-[#2a293d] rounded-xl p-4 shadow-sm hover:shadow-md transition-all hover:-translate-y-0.5">
                <div className="flex items-center gap-2 mb-3">
                  <button className="text-xs font-bold text-[#5048e5] hover:bg-[#5048e5]/5 px-2 py-0.5 rounded font-mono bg-[#5048e5]/5 border border-[#5048e5]/10">
                    [04:15]
                  </button>
                  <span className="text-xs text-[#545095] dark:text-gray-500 font-medium">
                    2 minutes ago
                  </span>
                </div>
                <div className="prose prose-sm dark:prose-invert text-[#0f0e1b] dark:text-gray-300">
                  <p className="text-sm font-medium">
                    Focus on the difference between <strong>Sigmoid</strong> and{" "}
                    <strong>ReLU</strong> for hidden layers. Sigmoid is better
                    for output layers in binary classification.
                  </p>
                  <ul className="list-disc pl-4 mt-2 space-y-1 text-xs">
                    <li>Sigmoid: Range (0, 1)</li>
                    <li>ReLU: Range [0, ∞)</li>
                  </ul>
                </div>
              </div>

              {/* Note Card 3: Summary */}
              <div className="bg-gray-50 dark:bg-[#25243d] border-l-4 border-[#5048e5] rounded-r-xl p-4 shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="material-symbols-outlined text-[#5048e5] text-lg">
                    auto_awesome
                  </span>
                  <h4 className="text-xs font-bold text-[#5048e5] uppercase">
                    Lesson Summary
                  </h4>
                </div>
                <ul className="space-y-2">
                  <li className="flex gap-2 text-xs text-[#545095] dark:text-gray-300 leading-relaxed">
                    <span className="text-[#5048e5]">•</span> Neural network
                    layers consist of input, hidden, and output nodes.
                  </li>
                  <li className="flex gap-2 text-xs text-[#545095] dark:text-gray-300 leading-relaxed">
                    <span className="text-[#5048e5]">•</span> Forward
                    propagation calculates the dot product of weights and
                    inputs.
                  </li>
                </ul>
              </div>
            </div>

            {/* Input Area (Notes) */}
            <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192e] relative flex-shrink-0">
              {/* Floating Toolbar */}
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-white dark:bg-[#2a293d] px-2 py-1.5 rounded-full shadow-xl border border-[#e8e8f3] dark:border-[#3a3952] z-10">
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#333152] rounded-lg text-[#545095] dark:text-gray-400">
                  <span className="material-symbols-outlined text-lg">
                    format_bold
                  </span>
                </button>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#333152] rounded-lg text-[#545095] dark:text-gray-400">
                  <span className="material-symbols-outlined text-lg">
                    format_italic
                  </span>
                </button>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#333152] rounded-lg text-[#545095] dark:text-gray-400">
                  <span className="material-symbols-outlined text-lg">
                    format_list_bulleted
                  </span>
                </button>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-[#333152] rounded-lg text-[#545095] dark:text-gray-400">
                  <span className="material-symbols-outlined text-lg">
                    code
                  </span>
                </button>
                <div className="w-px h-4 bg-[#e8e8f3] dark:bg-[#3a3952] mx-1"></div>
                <button
                  className="p-1.5 hover:bg-[#5048e5]/10 rounded-lg text-[#5048e5]"
                  title="Add Smart Snippet"
                >
                  <span className="material-symbols-outlined text-lg">
                    brightness_auto
                  </span>
                </button>
              </div>

              {/* Text Area */}
              <div className="relative group">
                <textarea
                  className="min-h-[100px] w-full rounded-xl border border-[#d2d1e6] dark:border-[#2a293d] bg-[#f6f6f8] dark:bg-[#121121] p-3 text-sm focus:ring-2 focus:ring-[#5048e5]/20 focus:border-[#5048e5] transition-all outline-none resize-none placeholder:text-[#545095] dark:placeholder:text-gray-500 placeholder:opacity-60 text-slate-900 dark:text-white"
                  placeholder="Start typing your smart note..."
                ></textarea>
                <button className="absolute bottom-3 right-3 bg-[#5048e5] text-white text-xs font-bold py-2 px-4 rounded-lg shadow-lg shadow-[#5048e5]/20 hover:bg-[#5048e5]/90 transition-all flex items-center gap-2">
                  Save Note{" "}
                  <span className="material-symbols-outlined text-sm">
                    save
                  </span>
                </button>
              </div>

              {/* Footer Info */}
              <div className="mt-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#5048e5] text-base">
                    timer
                  </span>
                  <span className="text-[10px] font-bold text-[#545095] dark:text-gray-400 uppercase tracking-widest">
                    Auto-stamping at 08:42
                  </span>
                </div>
                <p className="text-[10px] text-[#545095] font-medium">
                  Cmd + Enter to save
                </p>
              </div>
            </div>
          </>
        )}

        {/* ======================= */}
        {/* VIEW: MENTOR CHAT       */}
        {/* ======================= */}
        {activeTab === "mentor" && (
          <>
            {/* Chat List */}
            <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div
                    className={`size-8 rounded-lg flex items-center justify-center flex-shrink-0 ${m.role === "ai" ? "bg-[#5048e5]/10 text-[#5048e5]" : "bg-cover"}`}
                    style={
                      m.role === "user"
                        ? {
                            backgroundImage:
                              'url("https://ui-avatars.com/api/?name=User&background=random")',
                          }
                        : {}
                    }
                  >
                    {m.role === "ai" && (
                      <span className="material-symbols-outlined text-sm">
                        smart_toy
                      </span>
                    )}
                  </div>
                  <div
                    className={`p-3 rounded-2xl text-sm ${
                      m.role === "ai"
                        ? "bg-[#f6f6f8] dark:bg-[#2a293d] rounded-tl-none text-[#0f0e1b] dark:text-gray-200"
                        : "bg-[#5048e5] rounded-tr-none text-white"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 pb-2 flex-shrink-0">
              <div className="flex flex-wrap gap-2 py-2">
                <button className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#5048e5]/30 text-[#5048e5] bg-[#5048e5]/5 hover:bg-[#5048e5]/10 transition-colors">
                  Summarize lesson
                </button>
                <button className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#5048e5]/30 text-[#5048e5] bg-[#5048e5]/5 hover:bg-[#5048e5]/10 transition-colors">
                  Explain Backprop
                </button>
                <button className="text-[11px] font-bold px-3 py-1.5 rounded-full border border-[#5048e5]/30 text-[#5048e5] bg-[#5048e5]/5 hover:bg-[#5048e5]/10 transition-colors">
                  Quiz me
                </button>
              </div>
            </div>

            {/* Chat Input */}
            <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2a293d] flex-shrink-0 bg-white dark:bg-[#1a192e]">
              <form onSubmit={handleChatSend} className="relative">
                <textarea
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleChatSend();
                    }
                  }}
                  className="w-full rounded-xl border-[#d2d1e6] dark:border-[#2a293d] bg-[#f6f6f8] dark:bg-[#121121] text-sm pr-12 py-3 focus:ring-[#5048e5] focus:border-[#5048e5] resize-none dark:text-white outline-none"
                  placeholder="Ask your AI mentor..."
                  rows={2}
                ></textarea>
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5048e5] hover:text-[#5048e5]/80"
                >
                  <span className="material-symbols-outlined">send</span>
                </button>
              </form>
              <p className="text-[10px] text-center text-[#545095] mt-2">
                EduLearn AI can make mistakes. Check important info.
              </p>
            </div>
          </>
        )}
      </div>
    </aside>
  );
}
