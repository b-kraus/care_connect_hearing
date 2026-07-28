import type { ReactNode } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  ClipboardList,
  Home,
  MessageCircle,
  Settings,
  AlertTriangle,
  Menu,
  Activity, // Added Activity icon for status
} from "lucide-react";

type Props = {
  children: ReactNode;
  active?: string;
};

function DashboardLayout({ children, active = "home" }: Props) {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const nav = [
    { id: "home", label: "Home", icon: Home, path: "/home" },
    { id: "alerts", label: "Alerts", icon: ClipboardList, path: "/alerts" },
    { id: "messages", label: "Messages", icon: MessageCircle, path: "/messages" },
    { id: "status", label: "Status", icon: Activity, path: "/status" }, // Fixed status icon
    { id: "emergency", label: "Emergency", icon: AlertTriangle, path: "/emergency" },
    { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
  ];

  return (
    <div className="min-h-screen bg-background text-text flex">
      {/* Sidebar */}
      <aside
        className={`fixed md:static z-40 h-full w-64 border-r border-primary/30 p-6 flex flex-col bg-background transition-transform ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
        }`}
      >
        <div className="flex items-center gap-3 mb-8">
          <Bell className="w-8 h-8 text-primary" />
          <div>
            <div className="text-xl font-bold">CareConnect</div>
            <div className="text-primary text-xs tracking-widest">HEARING</div>
          </div>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col gap-2">
          {nav.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                navigate(item.path);
                setSidebarOpen(false);
              }}
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

        {/* Bottom Emergency Shortcut */}
        <div className="mt-auto pt-6 border-t border-white/10">
          <button
            onClick={() => {
              navigate("/emergency");
              setSidebarOpen(false);
            }}
            className="flex items-center gap-3 px-4 py-3 rounded-xl border border-red-500 text-red-400 hover:bg-red-950/50 w-full"
            aria-label="Emergency SOS"
          >
            <AlertTriangle className="w-5 h-5" />
            Emergency SOS
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        <header className="md:hidden flex items-center gap-4 p-4 border-b border-white/10">
          <button onClick={() => setSidebarOpen(true)} aria-label="Open menu">
            <Menu className="w-6 h-6 text-primary" />
          </button>
          <span className="font-bold text-lg">CareConnect</span>
        </header>

        <main className="flex-1 p-4 md:p-8 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;