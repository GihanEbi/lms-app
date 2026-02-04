import React from "react";

export default function PlayerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-[#0f0e1b] dark:text-white transition-colors duration-200 flex flex-col overflow-hidden">
      {children}
    </div>
  );
}
