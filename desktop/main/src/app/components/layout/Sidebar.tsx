import {
  AlertTriangle,
  Bell,
  ClipboardList,
  Home,
  MessageCircle,
  Mic,
  Settings,
} from "lucide-react";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

interface SidebarProps {
  currentView?: "home" | "logs" | string;
  onNavigate?: (screenName: string) => void;
}

export default function Sidebar({ currentView = "home", onNavigate }: SidebarProps) {
  return (
    <aside className="w-80 border-r border-[#FFD600]/30 p-7 flex flex-col bg-black text-white">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-14 h-14 rounded-2xl bg-[#FFD600] text-black flex items-center justify-center">
          <Bell className="w-8 h-8" aria-hidden />
        </div>

        <div>
          <div className="text-2xl font-bold">CareConnect</div>
          <div className="tracking-[0.25em] text-[#FFD600] text-sm">
            HEARING
          </div>
        </div>
      </div>

      <nav className="flex flex-col gap-3" aria-label="Main navigation">
        {/* HOME BUTTON */}
        <button 
          onClick={() => onNavigate && onNavigate("home")}
          className={`flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-lg transition-all ${focusRing} ${
            currentView === "home"
              ? "bg-[#FFD600] text-black"
              : "hover:bg-[#FFD600]/10 text-white"
          }`}
        >
          <Home className={`w-6 h-6 ${currentView === "home" ? "text-black" : "text-[#FFD600]"}`} aria-hidden />
          Home
        </button>

        {/* ALERT LOGS BUTTON */}
        <button 
          onClick={() => onNavigate && onNavigate("logs")}
          className={`flex items-center gap-4 px-5 py-4 rounded-xl font-bold text-lg transition-all ${focusRing} ${
            currentView === "logs"
              ? "bg-[#FFD600] text-black"
              : "hover:bg-[#FFD600]/10 text-white"
          }`}
        >
          <ClipboardList className={`w-6 h-6 ${currentView === "logs" ? "text-black" : "text-[#FFD600]"}`} aria-hidden />
          Alert Logs
        </button>

        <button onClick={() => onNavigate && onNavigate("messages")} className={`flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-[#FFD600]/10 text-left ${focusRing}`}>
          <MessageCircle className="w-6 h-6 text-[#FFD600]" aria-hidden />
          Messages
        </button>

        <button onClick={() => onNavigate && onNavigate("recording")} className={`flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-[#FFD600]/10 text-left ${focusRing}`}>
          <Mic className="w-6 h-6 text-[#FFD600]" aria-hidden />
          Hearing Recording
        </button>

        <button onClick={() => onNavigate && onNavigate("settings")} className={`flex items-center gap-4 px-5 py-4 rounded-xl hover:bg-[#FFD600]/10 text-left ${focusRing}`}>
          <Settings className="w-6 h-6 text-[#FFD600]" aria-hidden />
          Settings
        </button>
      </nav>

      <div className="my-8 border-t border-white/15" />

      <button className={`flex items-center gap-4 px-5 py-4 rounded-xl border border-red-500 text-red-400 hover:bg-red-950/50 font-semibold text-left ${focusRing}`}>
        <AlertTriangle className="w-6 h-6" aria-hidden />
        Emergency SOS
      </button>

      <div className="mt-auto pt-8 border-t border-white/15">
        <div className="text-sm text-white/60">CareConnect User</div>
        <div className="text-lg font-semibold">Profile</div>
      </div>
    </aside>
  );
}