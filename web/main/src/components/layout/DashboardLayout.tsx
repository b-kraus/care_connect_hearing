import type { ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell, ClipboardList, Home, MessageCircle,
  Settings, AlertTriangle,
} from "lucide-react";

type Props = {
  children: ReactNode;
  active?: string;
};

function DashboardLayout({ children, active = "home" }: Props) {
  const navigate = useNavigate();
  const nav = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "alerts", label: "Alerts", icon: ClipboardList, path: "/alerts" },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-text flex">
      <aside className="w-64 border-r border-primary/30 p-6 flex flex-col">
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-primary" />
          <div>
            <div className="text-xl font-bold">CareConnect</div>
            <div className="text-primary text-xs tracking-widest">HEARING</div>
          </div>
        </div>
        <nav className="flex flex-col gap-2">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-left font-semibold transition-all ${
                active === item.id
                  ? "bg-primary text-black"
                  : "hover:bg-primary/10"
              }`}
              aria-label={item.label}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </button>
          ))}
        </nav>
        <div className="mt-auto pt-6 border-t border-white/10">
          <button
            onClick={() => navigate("/emergency")}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-950/50 w-full"
            aria-label="Emergency SOS"
          >
            <AlertTriangle className="w-5 h-5" />
            Emergency SOS
          </button>
        </div>
      </aside>
      <main className="flex-1 p-8 overflow-auto">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;
