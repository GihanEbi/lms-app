import React from "react";
import { StudentRegHeader } from "@/src/components/onboarding/student-reg-header";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#0a0a0c] transition-colors duration-200 flex flex-col font-sans">
      {/* The Header is now part of the layout */}
      <StudentRegHeader />

      {/* The page content will be rendered here */}
      {children}
    </div>
  );
}
