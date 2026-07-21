import DashboardLayout from "../../components/layout/DashboardLayout";

function Settings() {
  return (
    <DashboardLayout active="settings">
      <h1 className="text-4xl font-bold mb-6">
        <span className="text-primary">Settings</span>
      </h1>
      <div className="max-w-2xl space-y-6">
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Flash Speed</h2>
          <input type="range" min="1" max="5" defaultValue="3"
            className="w-full" aria-label="Flash speed" />
          <p className="text-white/40 text-sm mt-2">
            WCAG 2.3.1: Under 3 flashes per second
          </p>
        </div>
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">Text Size</h2>
          <input type="range" min="1" max="5" defaultValue="3"
            className="w-full" aria-label="Text size" />
        </div>
        <div className="bg-surface border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">High Contrast</h2>
          <label className="flex items-center gap-3 cursor-pointer">
            <input type="checkbox" defaultChecked
              className="w-5 h-5" aria-label="Toggle high contrast" />
            <span>Enable high contrast mode</span>
          </label>
        </div>
        <button
          className="bg-primary text-black font-bold px-8 py-3 rounded-xl text-lg"
          aria-label="Save settings"
        >
          Save Changes
        </button>
      </div>
    </DashboardLayout>
  );
}

export default Settings;
