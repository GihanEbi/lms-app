"use client";

import React, { useState } from "react";

export function PlayerAiChat() {
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
  const [input, setInput] = useState("");

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { role: "user", text: input }]);
    setInput("");
    // Mock AI response delay
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "That's a complex topic. Let me break it down..." },
      ]);
    }, 1000);
  };

  return (
    <aside className="w-[350px] flex-shrink-0 border-l border-[#e8e8f3] dark:border-[#2a293d] bg-white dark:bg-[#1a192e] flex flex-col h-full">
      {/* Tabs */}
      <div className="flex border-b border-[#e8e8f3] dark:border-[#2a293d] flex-shrink-0">
        <button className="flex-1 py-4 text-sm font-bold text-[#5048e5] border-b-2 border-[#5048e5] flex items-center justify-center gap-2">
          <span className="material-symbols-outlined text-lg">smart_toy</span>{" "}
          AI Mentor
        </button>
        <button className="flex-1 py-4 text-sm font-bold text-[#545095] dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-[#1e1d35] flex items-center justify-center gap-2 transition-colors">
          <span className="material-symbols-outlined text-lg">edit_note</span>{" "}
          Smart Notes
        </button>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 p-4 overflow-y-auto custom-scrollbar space-y-4">
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

        {/* Suggestions */}
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

        {/* Input */}
        <div className="p-4 border-t border-[#e8e8f3] dark:border-[#2a293d] flex-shrink-0">
          <form onSubmit={handleSend} className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
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
      </div>
    </aside>
  );
}
