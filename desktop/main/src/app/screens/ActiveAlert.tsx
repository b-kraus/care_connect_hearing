import React, { useState, useEffect } from "react";
import MainLayout from "../components/layout/MainLayout";

interface ActiveAlertProps {
  onNavigate?: (screenName: string) => void;
  onConfirm?: () => void;
}

export default function ActiveAlert({ onNavigate, onConfirm }: ActiveAlertProps) {
  const [currentTime, setCurrentTime] = useState("05:20:49 PM");

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        })
      );
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <MainLayout currentView="alerts" onNavigate={onNavigate}>
      <div className="min-h-screen bg-black text-[#FFD600] font-sans p-2 flex flex-col justify-between">
        
        <header className="border-b border-zinc-800 pb-3 flex justify-between items-center text-xs tracking-wider">
          <div className="flex items-center gap-2 font-bold">
            <span className="text-sm">🔗</span> CARE CONNECT HEARING
          </div>
          <div className="text-zinc-500 font-medium">Medication Management System v3.2</div>
          <div className="flex gap-2 text-zinc-600">
            <span>➖</span> <span>🔲</span> <span>❌</span>
          </div>
        </header>

        <main className="grid grid-cols-12 gap-6 my-auto pt-4">
          {/* LEFT SIDEBAR PANEL */}
          <section className="col-span-3 flex flex-col gap-6">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Patient</h3>
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4">
                <span className="text-lg text-zinc-400 mb-1">👤</span>
                <h2 className="text-xl font-bold text-[#FFD600]">Margaret Holloway</h2>
                <p className="text-xs text-zinc-400 mt-1">DOB: 14 Mar 1948</p>
                <p className="text-xs text-zinc-500">ID: #CCH-00847</p>
              </div>
            </div>

            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Schedule</h3>
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-zinc-400 text-xs">🕒 Scheduled</span>
                  <span className="font-bold">08:00 AM</span>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800/50 pt-2">
                  <span className="text-zinc-400 text-xs">Overdue by</span>
                  <span className="font-bold text-orange-500">14 min</span>
                </div>
                <div className="flex items-center justify-between border-t border-zinc-800/50 pt-2">
                  <span className="text-zinc-400 text-xs">Next dose</span>
                  <span className="font-bold text-zinc-400">08:00 PM</span>
                </div>
              </div>
            </div>
          </section>

          {/* CENTER FLASHING ALERTS AREA */}
          <section className="col-span-6 flex flex-col items-center justify-center text-center px-4 relative">
            <div className="flex items-center gap-6 mb-2">
              <span className="text-3xl animate-[pulse_1.2s_infinite]">⚠️</span>
              <h1 className="text-5xl font-black tracking-tight text-[#FFD600]">ALERT: TAKE MEDICATION</h1>
              <span className="text-3xl animate-[pulse_1.2s_infinite]">⚠️</span>
            </div>
            <p className="text-zinc-400 font-semibold tracking-wide text-sm mb-12">Visual Flash Active</p>

            <div className="relative flex items-center justify-center w-64 h-64 mb-8">
              <div className="absolute inset-0 border border-[#FFD600]/20 rounded-full animate-[ping_2.5s_infinite]" />
              <div className="absolute inset-4 border-2 border-[#FFD600]/40 rounded-full animate-[pulse_1.5s_infinite]" />
              <div className="absolute inset-12 bg-black border-4 border-[#FFD600] rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,214,0,0.25)]">
                <div className="w-14 h-7 border-[3px] border-[#FFD600] rounded-full rotate-[-45deg] flex divide-x-[3px] divide-[#FFD600]">
                  <div className="flex-1" />
                  <div className="flex-1" />
                </div>
              </div>
            </div>

            <h2 className="text-4xl font-extrabold text-white mb-2">Metoprolol Succinate</h2>
            <p className="text-zinc-400 text-lg mb-8">Extended-Release • 50 mg • 1 tablet</p>

            <button 
              onClick={onConfirm}
              className="border-2 border-orange-500 bg-orange-500/5 hover:bg-orange-500/20 active:scale-[0.97] transition text-orange-400 px-12 py-4 rounded-xl font-bold tracking-widest text-sm flex items-center gap-3 uppercase shadow-[0_0_20px_rgba(249,115,22,0.15)]"
              aria-label="Confirm alert medication ingestion"
            >
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
              CONFIRM ALERT
            </button>
          </section>

          {/* RIGHT SIDEBAR CLOCK & METRICS */}
          <section className="col-span-3 flex flex-col gap-6">
            <div>
              <h3 className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-2">Current Time</h3>
              <div className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-5 text-center min-h-[140px] flex flex-col items-center justify-center">
                <div className="text-4xl font-black text-[#FFD600] font-mono">{currentTime.split(" ")[0]}</div>
                <div className="text-xl font-bold text-[#FFD600] mt-0.5">{currentTime.split(" ")[1]}</div>
                <p className="text-[11px] text-zinc-500 mt-2">Sunday, July 5, 2026</p>
              </div>
            </div>
          </section>
        </main>

        <footer className="border-t border-zinc-900 pt-2 text-[10px] text-zinc-600 flex justify-between">
          <span>Instructions</span>
          <span>Help / Accessibility Support Interface ❓</span>
        </footer>
      </div>
    </MainLayout>
  );
}