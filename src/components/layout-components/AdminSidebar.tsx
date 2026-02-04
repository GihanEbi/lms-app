"use client";

import React from "react";
import Link from "next/link";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/src/context/SidebarContext";

export function AdminSidebar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const { isOpen, close } = useSidebar(); // Get state

  const navItems = [
    {
      label: "Dashboard",
      icon: "dashboard",
      href: "/users/admin/dashboard",
    },
    { label: "Courses", icon: "book", href: "/users/admin/courses" },
    {
      label: "Students",
      icon: "school",
      href: "/users/admin/students",
    },
    {
      label: "Instructors",
      icon: "group",
      href: "/users/admin/instructors",
    },
    {
      label: "Messages",
      icon: "message",
      href: "/users/admin/messages",
    },
    {
      label: "Schedule",
      icon: "calendar_today",
      href: "/users/admin/schedule",
    },
    {
      label: "Settings",
      icon: "settings",
      href: "/users/admin/settings",
    },
  ];

  return (
    <>
      {/* Mobile Overlay Backdrop */}
      <div
        className={`fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
        onClick={close}
      />

      {/* Sidebar Container */}
      <aside
        className={`
          fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-[#121121] border-r border-slate-200 dark:border-slate-800 
          flex flex-col h-full p-4 transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          md:translate-x-0
        `}
      >
        {/* Header / Logo */}
        <div className="flex items-center justify-between px-2 mb-8">
          <div className="flex items-center gap-3 text-[#5048e5]">
            <span className="material-symbols-outlined text-3xl font-bold">
              auto_stories
            </span>
            <h2 className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
              EduLearn
            </h2>
          </div>
          {/* Close button (Mobile only) */}
          <button
            onClick={close}
            className="md:hidden text-slate-400 hover:text-slate-600 dark:hover:text-white"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* User Profile Mini */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="relative">
            <div
              className="size-10 rounded-full border-2 border-[#5048e5]/20 bg-cover bg-center"
              style={{
                backgroundImage:
                  'url("https://ui-avatars.com/api/?name=Alex+Johnson&background=random")',
              }}
            ></div>
            <span className="absolute bottom-0 right-0 size-3 bg-green-500 border-2 border-white dark:border-[#121121] rounded-full"></span>
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold leading-tight text-slate-900 dark:text-white">
              Alex Johnson
            </span>
            <span className="text-[10px] text-slate-400 font-bold uppercase">
              Online
            </span>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all ${
                  isActive
                    ? "bg-[#5048e5] text-white shadow-lg shadow-[#5048e5]/20"
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800"
                }`}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span className="text-sm font-bold">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Actions */}
        <div className="mt-auto border-t border-slate-100 dark:border-slate-800 pt-4 flex flex-col gap-2">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 w-full text-left transition-colors"
          >
            <span className="material-symbols-outlined">
              {theme === "dark" ? "light_mode" : "dark_mode"}
            </span>
            <span className="text-sm font-bold">
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </span>
          </button>

          <Link
            href="/auth/admin/signin"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 w-full text-left transition-colors"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="text-sm font-bold">Logout</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
