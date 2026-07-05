import React, { useState } from "react";
import { ArrowLeft, CheckCircle2, XCircle } from "lucide-react";
import MainLayout from "../components/layout/MainLayout";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export interface LogItem {
  id: number;
  title: string;
  time: string;
  date: string;
  section: "TODAY" | "YESTERDAY" | "HISTORICAL";
  status: "confirmed" | "missed";
}

interface LogsProps {
  onNavigate?: (screenName: string) => void;
  onEmergency?: () => void;
  // Passing custom logs from a shared state context or parent allows immediate state updates!
  customLogs?: LogItem[]; 
}

const initialLogs: LogItem[] = [
  // TODAY section (Synchronized with July 5, 2026 timestamp matching image_62e83e.png)
  { id: 1, title: "Metoprolol Succinate (Take blue pill)", time: "05:20 PM", date: "July 5", section: "TODAY", status: "confirmed" },
  { id: 2, title: "Morning walk reminder", time: "8:30 AM", date: "July 5", section: "TODAY", status: "missed" },
  { id: 3, title: "Drink water", time: "7:00 AM", date: "July 5", section: "TODAY", status: "confirmed" },
  // YESTERDAY section
  { id: 4, title: "Take white pill", time: "9:00 PM", date: "July 4", section: "YESTERDAY", status: "confirmed" },
  { id: 5, title: "Doctor's appointment", time: "3:00 PM", date: "July 4", section: "YESTERDAY", status: "confirmed" },
  { id: 6, title: "Evening walk", time: "7:30 PM", date: "July 4", section: "YESTERDAY", status: "missed" },
  { id: 7, title: "Take blue pill", time: "6:00 PM", date: "July 4", section: "YESTERDAY", status: "confirmed" },
  // HISTORICAL section
  { id: 8, title: "Take blue pill", time: "6:00 PM", date: "July 3", section: "HISTORICAL", status: "confirmed" },
  { id: 9, title: "Drink water", time: "1:00 PM", date: "July 3", section: "HISTORICAL", status: "confirmed" },
  { id: 10, title: "Morning walk reminder", time: "8:30 AM", date: "July 3", section: "HISTORICAL", status: "missed" },
];

export default function Logs({ onNavigate, onEmergency, customLogs }: LogsProps) {
  const [filter, setFilter] = useState<"all" | "confirmed" | "missed">("all");
  
  // Use custom logs if supplied from parent state machine, otherwise fallback safely
  const activeLogs = customLogs || initialLogs;

  // Calculate totals dynamically
  const totalCount = activeLogs.length;
  const confirmedCount = activeLogs.filter((log) => log.status === "confirmed").length;
  const missedCount = activeLogs.filter((log) => log.status === "missed").length;

  // Filter logs based on selection
  const filteredLogs = activeLogs.filter((log) => {
    if (filter === "all") return true;
    return log.status === filter;
  });

  // Dynamic Grouping section arrays
  const sections: ("TODAY" | "YESTERDAY" | "HISTORICAL")[] = ["TODAY", "YESTERDAY", "HISTORICAL"];

  return (
    <MainLayout currentView="logs" onNavigate={onNavigate} onEmergency={onEmergency}>
       {/* Top Header Navigation bar match from image_62e83e.png styling */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6 mb-8">
        <div className="flex items-center gap-4">
          <button
            onClick={() => {
              if (onNavigate) onNavigate("home");
            }}
            className={`p-3 bg-white/[0.05] hover:bg-white/[0.1] text-[#FFD600] rounded-xl border border-white/10 transition-all ${focusRing}`}
            aria-label="Back to dashboard"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 bg-[#FFD600] rounded-lg flex items-center justify-center font-bold text-black text-xs">
              🔗
            </div>
            <span className="text-sm tracking-wider font-semibold uppercase text-white/60">
              Care Connect Hearing
            </span>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-[#FFD600] tracking-tight absolute left-1/2 -translate-x-1/2 hidden md:block">
          Alert History
        </h1>
        <div className="w-24"></div>
      </div>

      {/* Filter Row Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setFilter("all")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all border ${focusRing} ${
              filter === "all"
                ? "bg-[#FFD600] text-black border-[#FFD600]"
                : "bg-white/[0.02] text-white border-white/10 hover:bg-white/[0.06]"
            }`}
          >
            All <span className={`text-sm px-2 py-0.5 rounded-full ${filter === "all" ? "bg-black/10 text-black" : "bg-white/10 text-white/70"}`}>{totalCount}</span>
          </button>

          <button
            onClick={() => setFilter("confirmed")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all border ${focusRing} ${
              filter === "confirmed"
                ? "bg-emerald-500 text-white border-emerald-500"
                : "bg-white/[0.02] text-emerald-400 border-emerald-500/20 hover:bg-emerald-500/10"
            }`}
          >
            <CheckCircle2 className="w-5 h-5" />
            Confirmed{" "}
            <span className={`text-sm px-2 py-0.5 rounded-full ${filter === "confirmed" ? "bg-white/20 text-white" : "bg-emerald-500/10 text-emerald-300"}`}>
              {confirmedCount}
            </span>
          </button>

          <button
            onClick={() => setFilter("missed")}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-lg transition-all border ${focusRing} ${
              filter === "missed"
                ? "bg-red-500 text-white border-red-500"
                : "bg-white/[0.02] text-red-400 border-red-500/20 hover:bg-red-500/10"
            }`}
          >
            <XCircle className="w-5 h-5" />
            Missed{" "}
            <span className={`text-sm px-2 py-0.5 rounded-full ${filter === "missed" ? "bg-white/20 text-white" : "bg-red-500/10 text-red-300"}`}>
              {missedCount}
            </span>
          </button>
        </div>

        <div className="text-white/50 text-base font-medium">
          Showing {filteredLogs.length} of {totalCount} entries
        </div>
      </div>

      {/* Log Section List Rendering */}
      <div className="space-y-10">
        {sections.map((section) => {
          const sectionItems = filteredLogs.filter((item) => item.section === section);
          if (sectionItems.length === 0) return null;

          return (
            <div key={section} className="space-y-4">
              <div className="flex items-center justify-between gap-4 text-xs font-bold tracking-widest text-[#FFD600]/60 uppercase">
                <span className="whitespace-nowrap">{section === "HISTORICAL" ? "JULY 3" : section}</span>
                <div className="w-full h-[1px] bg-white/10"></div>
                <span className="whitespace-nowrap text-white/40">
                  {sectionItems.length} {sectionItems.length === 1 ? "alert" : "alerts"}
                </span>
              </div>

              <div className="grid grid-cols-1 gap-3">
                {sectionItems.map((log) => {
                  const isConfirmed = log.status === "confirmed";
                  return (
                    <div
                      key={log.id}
                      className={`flex items-center justify-between p-5 rounded-xl border transition-all ${
                        isConfirmed
                          ? "border-emerald-500/20 bg-emerald-950/10 hover:bg-emerald-950/20 text-white"
                          : "border-red-500/20 bg-red-950/10 hover:bg-red-950/20 text-white"
                      }`}
                    >
                      <div className="flex items-center gap-5">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                            isConfirmed
                              ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                              : "border-red-500/40 bg-red-500/10 text-red-400"
                          }`}
                        >
                          {isConfirmed ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                        </div>

                        <div>
                          <h2 className="text-2xl font-bold tracking-wide text-white/90">
                            {log.title}
                          </h2>
                          <p className="text-sm font-semibold text-white/40 mt-1">
                            {log.time}, {log.date}
                          </p>
                        </div>
                      </div>

                      <div
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl border text-sm font-bold tracking-wide uppercase ${
                          isConfirmed
                            ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                            : "border-red-500/30 bg-red-500/10 text-red-400"
                        }`}
                      >
                        {isConfirmed ? (
                          <>
                            <CheckCircle2 className="w-4 h-4" /> Confirmed
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4" /> Missed
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </MainLayout>
  );
}