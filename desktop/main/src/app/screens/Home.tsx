import {
  AlertTriangle,
  ArrowRight,
  Bell,
  ClipboardList,
  MessageCircle,
  Mic,
  Settings,
} from "lucide-react";

import MainLayout from "../components/layout/MainLayout";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

interface HomeProps {
  // Pass down whatever screen-switching function your app uses (e.g., setScreen, onNavigate, etc.)
  onNavigate?: (screenName: "home" | "logs") => void;
}

export default function Home({ onNavigate }: HomeProps) {
  return (
    <MainLayout currentView="home" onNavigate={onNavigate}>
      <div className="mb-10">
        <h1 className="text-5xl font-bold mb-4">
          Welcome <span className="text-[#FFD600]">Back!</span>
        </h1>

        <p className="text-xl text-white/75 max-w-3xl leading-relaxed">
          Quick access to alerts, messages, recordings, and accessibility
          settings.
        </p>
      </div>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-7">
        <DashboardCard
          icon={<Bell className="w-8 h-8" />}
          title="Active Alert"
          status="No active alerts"
          description="System monitoring in real time."
        />

        <DashboardCard
          icon={<ClipboardList className="w-8 h-8" />}
          title="Alert Logs"
          status="12 recent alerts"
          description="Review confirmed, missed, and past alerts."
          onClick={() => {
            // When clicked, invoke navigation function if it exists
            if (onNavigate) onNavigate("logs");
          }}
        />

        <DashboardCard
          icon={<MessageCircle className="w-8 h-8" />}
          title="Read Message"
          status="3 unread messages"
          description="Open accessible message and transcription view."
        />

        <DashboardCard
          icon={<Mic className="w-8 h-8" />}
          title="Hearing Recording"
          status="Microphone ready"
          description="Record or review hearing-related messages."
        />

        <DashboardCard
          icon={<Settings className="w-8 h-8" />}
          title="Settings"
          status="High contrast enabled"
          description="Adjust display, text size, alert flash, and notifications."
        />

        <DashboardCard
          icon={<AlertTriangle className="w-8 h-8" />}
          title="Emergency SOS"
          status="Emergency access"
          description="Open emergency action screen."
          danger
        />
      </section>
    </MainLayout>
  );
}

function DashboardCard({
  icon,
  title,
  status,
  description,
  danger = false,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  status: string;
  description: string;
  danger?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`min-h-64 rounded-2xl border p-8 text-left transition-all hover:scale-[1.01] ${focusRing} ${
        danger
          ? "border-red-500/70 bg-red-950/30 text-red-100"
          : "border-[#FFD600]/40 bg-white/[0.03] text-white hover:bg-[#FFD600]/10"
      }`}
    >
      <div
        className={`w-16 h-16 rounded-full border flex items-center justify-center mb-7 ${
          danger
            ? "border-red-500 text-red-400"
            : "border-[#FFD600] text-[#FFD600]"
        }`}
        aria-hidden="true"
      >
        {icon}
      </div>

      <h2 className="text-3xl font-bold mb-3">{title}</h2>

      <p
        className={
          danger
            ? "text-red-300 font-semibold mb-3"
            : "text-[#FFD600] font-semibold mb-3"
        }
      >
        {status}
      </p>

      <p className="text-lg text-white/70 leading-relaxed max-w-sm">
        {description}
      </p>

      <ArrowRight
        className={`w-8 h-8 mt-8 ml-auto ${
          danger ? "text-red-400" : "text-[#FFD600]"
        }`}
        aria-hidden="true"
      />
    </button>
  );
}