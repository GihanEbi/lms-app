"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

export default function InstructorAssignmentsPage() {
  const router = useRouter();
  const [isOptionsOpen, setIsOptionsOpen] = useState(false);

  //   navigate to detail page

  const navigate = () => {
    router.push("/users/instructor/portal/assignments/submit-assginment");
  };

  // Mock Data based on HTML
  const assignments = [
    {
      id: 1,
      title: "Module 4 Quiz: Neural Networks",
      created: "Oct 12, 2023",
      course: "Intro to AI",
      dueDate: "Oct 28, 2023",
      dueTime: "11:59 PM",
      submitted: 120,
      total: 150,
      status: "Active",
      type: "quiz", // used for icon
      iconColor: "blue",
    },
    {
      id: 2,
      title: "Final Project Proposal",
      created: "Oct 05, 2023",
      course: "Machine Learning 101",
      dueDate: "Nov 05, 2023",
      dueTime: "11:59 PM",
      submitted: 12,
      total: 80,
      status: "Active",
      type: "description",
      iconColor: "amber",
    },
    {
      id: 3,
      title: "Midterm Exam Preparation",
      created: "Oct 24, 2023",
      course: "Deep Learning Specialization",
      dueDate: null,
      dueTime: null,
      submitted: 0,
      total: 0,
      status: "Draft",
      type: "edit_note",
      iconColor: "slate",
    },
    {
      id: 4,
      title: "Python Basics Assessment",
      created: "Sep 15, 2023",
      course: "Intro to Programming",
      dueDate: "Oct 01, 2023",
      dueTime: "11:59 PM",
      submitted: 210,
      total: 210,
      status: "Closed",
      type: "assignment_turned_in",
      iconColor: "red",
    },
  ];

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400";
      case "Draft":
        return "bg-slate-100 dark:bg-slate-800 text-slate-500";
      case "Closed":
        return "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300";
      default:
        return "bg-slate-100 text-slate-500";
    }
  };

  const getIconStyle = (color: string) => {
    switch (color) {
      case "blue":
        return "bg-blue-50 dark:bg-blue-900/20 text-[#5048e5]";
      case "amber":
        return "bg-amber-50 dark:bg-amber-900/20 text-amber-600";
      case "red":
        return "bg-red-50 dark:bg-red-900/20 text-red-600";
      default:
        return "bg-slate-50 dark:bg-slate-800 text-slate-500";
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-[#f6f6f8] dark:bg-[#121121] font-sans text-slate-900 dark:text-slate-100 relative">
      {/* --- Sticky Header --- */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-[#1a192e]/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-8 py-4 flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            My Assignments
          </h2>
        </div>
        <div className="flex items-center gap-4">
          <button
            className="flex items-center gap-2 px-5 py-2.5 bg-[linear-gradient(135deg,#5048e5_0%,#7C3AED_100%)] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#5048e5]/20 hover:scale-[1.02] transition-all"
            onClick={() => {
              router.push(
                "/users/instructor/portal/assignments/create-assignment",
              );
            }}
          >
            <span className="material-symbols-outlined !text-lg">
              add_circle
            </span>
            Create New Assignment
          </button>
        </div>
      </header>

      {/* --- Main Content --- */}
      <div className="p-8 max-w-[1400px] mx-auto">
        {/* Filters Row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="relative w-72">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                search
              </span>
              <input
                className="w-full bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none transition-all dark:text-white placeholder:text-slate-500"
                placeholder="Search by title..."
                type="text"
              />
            </div>
            <div className="flex items-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-1">
              <button className="px-4 py-1.5 text-xs font-bold rounded-md bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white transition-all">
                All
              </button>
              <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all">
                Drafts
              </button>
              <button className="px-4 py-1.5 text-xs font-bold rounded-md text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 transition-all">
                Active
              </button>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                Course:
              </span>
              <select className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white">
                <option>All Courses</option>
                <option>Intro to AI</option>
                <option>Machine Learning 101</option>
                <option>Neural Networks Fundamentals</option>
              </select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-tighter">
                Status:
              </span>
              <select className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 rounded-lg py-2 px-3 text-sm focus:border-[#5048e5] focus:ring-1 focus:ring-[#5048e5] outline-none dark:text-white">
                <option>All Status</option>
                <option>Active</option>
                <option>Draft</option>
                <option>Closed</option>
              </select>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-[#1a192e] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Assignment Title
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Course Name
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Submissions
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {assignments.map((assignment) => (
                <tr
                  key={assignment.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/20 transition-colors group"
                >
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-10 rounded flex items-center justify-center ${getIconStyle(assignment.iconColor)}`}
                      >
                        <span className="material-symbols-outlined">
                          {assignment.type}
                        </span>
                      </div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {assignment.title}
                        </p>
                        <p className="text-[11px] text-slate-500">
                          Created {assignment.created}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {assignment.course}
                    </span>
                  </td>
                  <td className="px-6 py-5">
                    {assignment.dueDate ? (
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-900 dark:text-white font-medium">
                          {assignment.dueDate}
                        </span>
                        <span className="text-[11px] text-slate-500 uppercase">
                          {assignment.dueTime}
                        </span>
                      </div>
                    ) : (
                      <div className="flex flex-col">
                        <span className="text-sm text-slate-400 italic">
                          Not set
                        </span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    {assignment.status !== "Draft" ? (
                      <div className="flex items-center gap-3">
                        <div className="flex-1 max-w-[80px] bg-slate-100 dark:bg-slate-800 rounded-full h-1.5 overflow-hidden">
                          <div
                            className={`h-full ${assignment.status === "Closed" ? "bg-emerald-500" : "bg-[#5048e5]"}`}
                            style={{
                              width: `${(assignment.submitted / assignment.total) * 100}%`,
                            }}
                          ></div>
                        </div>
                        <span className="text-sm font-bold text-slate-700 dark:text-slate-300">
                          {assignment.submitted}/{assignment.total}
                        </span>
                      </div>
                    ) : (
                      <span className="text-sm text-slate-400">---</span>
                    )}
                  </td>
                  <td className="px-6 py-5">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide ${getStatusStyle(assignment.status)}`}
                    >
                      {assignment.status}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button
                        className={`border text-xs font-bold px-4 py-1.5 rounded-lg transition-all ${
                          assignment.status === "Draft"
                            ? "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-[#5048e5] hover:bg-[#5048e5] hover:text-white hover:border-[#5048e5]"
                        }`}
                        disabled={assignment.status === "Draft"}
                        onClick={() => {
                          navigate();
                        }}
                      >
                        View Submissions
                      </button>
                      <button
                        onClick={() => setIsOptionsOpen(true)}
                        className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
                      >
                        more_vert
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <p className="text-xs text-slate-500 font-medium">
              Showing 4 of 28 total assignments
            </p>
            <div className="flex gap-2">
              <button
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 disabled:opacity-50 transition-colors"
                disabled
              >
                Previous
              </button>
              <button className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 transition-colors">
                Next
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* --- Options Modal --- */}
      {isOptionsOpen && (
        <div className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-[#1a192e] w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
            <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h4 className="font-bold text-slate-900 dark:text-white">
                Assignment Options
              </h4>
              <button
                onClick={() => setIsOptionsOpen(false)}
                className="material-symbols-outlined text-slate-400 hover:text-slate-600 dark:hover:text-slate-300"
              >
                close
              </button>
            </div>
            <div className="p-6 flex flex-col gap-2">
              <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <span className="material-symbols-outlined text-blue-500">
                  edit
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#5048e5]">
                    Edit Assignment
                  </p>
                  <p className="text-xs text-slate-500">
                    Modify content, dates, and settings
                  </p>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors group">
                <span className="material-symbols-outlined text-emerald-500">
                  content_copy
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-[#5048e5]">
                    Duplicate
                  </p>
                  <p className="text-xs text-slate-500">
                    Create a copy for another course
                  </p>
                </div>
              </button>
              <button className="flex items-center gap-3 w-full p-4 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors">
                <span className="material-symbols-outlined text-red-500">
                  delete
                </span>
                <div className="text-left">
                  <p className="text-sm font-bold text-red-600">
                    Delete Permanently
                  </p>
                  <p className="text-xs text-slate-400">
                    This action cannot be undone
                  </p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
