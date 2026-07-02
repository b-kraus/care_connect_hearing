import MainLayout from "../components/layout/MainLayout";

export default function ActiveAlert({ onNavigate }: { onNavigate?: (s: string) => void }) {
  return (
    <MainLayout currentView="alerts" onNavigate={onNavigate}>
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-[#FFD600]">Active Alert</span>
      </h1>
      <div className="max-w-2xl">
        <div className="bg-yellow-500/10 border-2 border-[#FFD600] rounded-xl p-8">
          <h2 className="text-2xl font-bold text-[#FFD600] mb-2">
            Take blue pill
          </h2>
          <p className="text-white/70 mb-2">6:00 PM — Set by Sarah</p>
          <p className="text-white/50 text-sm mb-6">
            WCAG 2.3.1: Flash rate under 3 per second
          </p>
          <button
            className="bg-[#FFD600] text-black font-bold px-8 py-3 rounded-lg text-lg"
            aria-label="Confirm alert"
          >
            CONFIRM
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
