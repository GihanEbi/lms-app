"use client";

import React, { useState, useRef, useEffect } from "react";

// --- Types ---
interface Message {
  id: string;
  role: "user" | "ai";
  text: string;
  timestamp: Date;
}

// --- Mock AI Service ---
// Replace this with your actual API call to OpenAI/Gemini later
const simulateAiResponse = async (userText: string): Promise<string> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const responses = [
        "That's a great question about the course material.",
        "I can help you schedule that study session.",
        "Check the resources tab for the PDF you are looking for.",
        "Based on your grades, I recommend reviewing Module 3.",
        "I'm your EduLearn AI. How can I assist you further?",
      ];
      const randomResponse =
        responses[Math.floor(Math.random() * responses.length)];
      resolve(randomResponse);
    }, 1500); // 1.5s delay to simulate thinking
  });
};

export function AiChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "ai",
      text: "Hi there! 👋 I am your personal AI Tutor. How can I help you with your studies today?",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, isOpen]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputValue.trim()) return;

    // 1. Add User Message
    const userMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      text: inputValue,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    try {
      // 2. Get AI Response
      const responseText = await simulateAiResponse(userMsg.text);

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        text: responseText,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (error) {
      console.error("AI Error", error);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col items-end gap-4 font-sans">
      {/* --- Chat Window --- */}
      {isOpen && (
        <div className="w-[350px] h-[500px] bg-white dark:bg-[#1a242e] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 fade-in duration-300">
          {/* Header */}
          <div className="h-16 bg-[#5048e5] p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 text-white">
              <div className="size-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <span className="material-symbols-outlined text-lg">
                  smart_toy
                </span>
              </div>
              <div>
                <h3 className="font-bold text-sm leading-tight">EduLearn AI</h3>
                <p className="text-[10px] text-white/80 flex items-center gap-1">
                  <span className="size-1.5 bg-green-400 rounded-full animate-pulse"></span>{" "}
                  Online
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#f6f6f8] dark:bg-[#121121]">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex w-full ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#5048e5] text-white rounded-br-none"
                      : "bg-white dark:bg-[#1a242e] text-slate-800 dark:text-slate-200 border border-slate-100 dark:border-slate-700 rounded-bl-none"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-[#1a242e] border border-slate-100 dark:border-slate-700 p-3 rounded-2xl rounded-bl-none shadow-sm flex items-center gap-1">
                  <span className="size-1.5 bg-slate-400 rounded-full animate-bounce"></span>
                  <span className="size-1.5 bg-slate-400 rounded-full animate-bounce delay-100"></span>
                  <span className="size-1.5 bg-slate-400 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-3 bg-white dark:bg-[#1a242e] border-t border-slate-200 dark:border-slate-700 shrink-0">
            <form
              onSubmit={handleSendMessage}
              className="flex items-center gap-2 bg-[#f6f6f8] dark:bg-[#121121] rounded-full px-4 py-2 border border-slate-200 dark:border-slate-700 focus-within:border-[#5048e5] focus-within:ring-1 focus-within:ring-[#5048e5] transition-all"
            >
              <input
                className="flex-1 bg-transparent border-none outline-none text-sm text-slate-900 dark:text-white placeholder-slate-400"
                placeholder="Ask me anything..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="text-[#5048e5] hover:text-[#4038b5] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <span className="material-symbols-outlined text-xl">send</span>
              </button>
            </form>
            <div className="text-center mt-2">
              <p className="text-[10px] text-slate-400">
                AI can make mistakes. Verify important info.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* --- Toggle Button (FAB) --- */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`size-14 rounded-full shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-105 active:scale-95 ${
          isOpen
            ? "bg-slate-700 text-white rotate-90"
            : "bg-[#5048e5] text-white hover:bg-[#433cc7]"
        }`}
      >
        {isOpen ? (
          <span className="material-symbols-outlined text-2xl">close</span>
        ) : (
          <span className="material-symbols-outlined text-3xl">smart_toy</span>
        )}
      </button>
    </div>
  );
}
