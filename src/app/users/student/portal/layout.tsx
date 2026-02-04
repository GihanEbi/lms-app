import React from "react";
import { Sidebar } from "@/src/components/layout-components/Sidebar";
import { Navbar } from "@/src/components/layout-components/Navbar";
import { SidebarProvider } from "@/src/context/SidebarContext";
import { AiChatWidget } from "@/src/components/ai/AiChatWidget";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-[#f6f6f8] dark:bg-[#0a0a0c] font-sans text-slate-900 dark:text-slate-100 transition-colors duration-200">
        {/* Sidebar (handles its own responsive state) */}
        <Sidebar />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:ml-64 min-w-0">
          <Navbar />
          <main className="flex-1 overflow-y-auto">{children}</main>
        </div>
        {/* --- AI Chat Widget (Placed here) --- */}
        <AiChatWidget />
      </div>
    </SidebarProvider>
  );
}
