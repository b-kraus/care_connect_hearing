import { useNavigate } from "react-router-dom";
import {
  Bell, ClipboardList, MessageCircle,
  Settings, AlertTriangle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

function Home() {
  const navigate = useNavigate();
  const cards = [
    { title: "Active Alerts", desc: "Monitor real-time alerts", icon: Bell, path: "/alerts", status: "No active alerts" },
    { title: "Messages", desc: "Speech-to-text transcription", icon: MessageCircle, path: "/messages", status: "3 unread" },
    { title: "Settings", desc: "Accessibility preferences", icon: Settings, path: "/settings", status: "High contrast on" },
    { title: "Emergency SOS", desc: "Send emergency alert", icon: AlertTriangle, path: "/emergency", status: "Ready", danger: true },
  ];

  return (
    <DashboardLayout active="home">
      <h1 className="text-4xl font-bold mb-2">
        Welcome <span className="text-primary">Back!</span>
      </h1>
      <p className="text-white/60 mb-8">Quick access to alerts, messages, and settings.</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {cards.map((card) => (
          <button
            key={card.title}
            onClick={() => navigate(card.path)}
            className={`rounded-2xl border p-6 text-left transition-all hover:scale-[1.01] ${
              card.danger
                ? "border-red-500/50 bg-red-950/20 hover:bg-red-950/40"
                : "border-primary/30 bg-surface hover:bg-primary/10"
            }`}
            aria-label={card.title}
          >
            <card.icon className={`w-8 h-8 mb-4 ${card.danger ? "text-red-400" : "text-primary"}`} />
            <h2 className="text-xl font-bold mb-1">{card.title}</h2>
            <p className={`text-sm mb-2 ${card.danger ? "text-red-300" : "text-primary"}`}>{card.status}</p>
            <p className="text-white/50 text-sm">{card.desc}</p>
          </button>
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Home;
