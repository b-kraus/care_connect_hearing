import { useNavigate } from "react-router-dom";
import {
  Bell,
  MessageCircle,
  Settings,
  AlertTriangle,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import DashboardCard from "../../components/dashboard/DashboardCard";


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
          <DashboardCard
            key={card.title}
            title={card.title}
            description={card.desc}
            status={card.status}
            icon={card.icon}
            danger={card.danger}
            onClick={() => navigate(card.path)}
          />
        ))}
      </div>
    </DashboardLayout>
  );
}

export default Home;
