import MainLayout from "../components/layout/MainLayout";

export default function Settings() {
  return (
    <MainLayout>
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-[#FFD600]">Settings</span>
      </h1>
      <div className="space-y-8 max-w-2xl">
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Flash Speed</h2>
          <input type="range" min="1" max="5" defaultValue="3"
            className="w-full" aria-label="Flash speed" />
          <p className="text-white/50 text-sm mt-2">
            WCAG 2.3.1: Under 3 flashes per second
          </p>
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">Vibration Intensity</h2>
          <input type="range" min="1" max="5" defaultValue="3"
            className="w-full" aria-label="Vibration intensity" />
        </div>
        <div className="bg-white/5 border border-white/10 rounded-xl p-6">
          <h2 className="text-xl font-semibold mb-4">High Contrast</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked
              className="w-5 h-5" aria-label="Toggle high contrast" />
            <span>Enable high contrast mode</span>
          </label>
        </div>
      </div>
    </MainLayout>
  );
}
