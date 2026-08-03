import { useState } from "react";
import { useSettings } from "../../hooks/useSettings";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { Button } from "../../components/ui/Button";


function Settings() {
 const {
  flashSpeed,
  setFlashSpeed,
  textSize,
  setTextSize,
  highContrast,
  setHighContrast,
 } = useSettings();
const [saved, setSaved] = useState(false);


  return (
    <DashboardLayout active="settings">
      <DashboardHeader
        title="settings"
        description="Customize accessibility preferences."
      />

      <div
        className={`max-w-2xl space-y-6 ${
          highContrast
            ? "[&>div]:border-white/40 [&>div]:bg-black"
            : "[&>div]:border-white/10"
        }`}
      >

        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Flash Speed
          </h2>

          <input
          type="range"
          min="1"
          max="5"
          value={flashSpeed}
          onChange={(e) => setFlashSpeed(Number(e.target.value))}
          className="w-full"
          aria-label="Flash speed"
        />

        <p className="mt-2 text-sm text-white/70">
          Current Speed: {flashSpeed}
        </p>

        <p className="mt-2 text-sm text-white/70">
          WCAG 2.3.1: Under 3 flashes per second
        </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="mb-4 text-xl font-semibold">
            Text Size
          </h2>

          <input
          type="range"
          min="1"
          max="5"
          value={textSize}
          onChange={(e) => setTextSize(Number(e.target.value))}
          className="w-full"
          aria-label="Text size"
        />

        <p className="mt-2 text-sm text-white/70">
          Current Size: {textSize}
        </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-surface p-6">
          <h2 className="mb-4 text-xl font-semibold">
            High Contrast
          </h2>

          <label className="flex items-center gap-3">
            <input
            type="checkbox"
            checked={highContrast}
            onChange={(e) => setHighContrast(e.target.checked)}
            className="w-5 h-5"
            aria-label="Toggle high contrast"
          />

            Enable High Contrast Mode
          </label>

          <p className="mt-3 text-sm text-white/70">
            Current Setting: {highContrast ? "Enabled" : "Disabled"}
          </p>
        </div>

        <Button
          size="lg"
          onClick={() => {
            setSaved(true);
            setTimeout(() => setSaved(false), 2000);
          }}
          >
          Save Changes
        </Button>
        {saved && <p className="text-green-500 font-semibold mt-2">Settings saved successfully!</p>}

      </div>
    </DashboardLayout>
  );
}

export default Settings;