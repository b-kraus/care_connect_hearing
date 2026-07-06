import { useRef, useState } from "react";
import MainLayout from "../components/layout/MainLayout";

const settingsSections = [
  "Display & Text",
  "Alert Flash",
  "Notifications",
  "About",
];

export default function Settings({
  onNavigate,
}: {
  onNavigate?: (s: string) => void;
}) {
  const [activeSection, setActiveSection] = useState("Display & Text");
  const [textSize, setTextSize] = useState(18);
  const [flashSpeed, setFlashSpeed] = useState("Medium");
  const [flashColor, setFlashColor] = useState("Yellow");

  const [highContrast, setHighContrast] = useState(true);
  const [boldText, setBoldText] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [screenFlash, setScreenFlash] = useState(true);
  const [bannerAlerts, setBannerAlerts] = useState(true);
  const [isTestingFlash, setIsTestingFlash] = useState(false);

  const sidebarRefs = useRef<Array<HTMLButtonElement | null>>([]);

 const handleSidebarKeyDown = (
  event: React.KeyboardEvent<HTMLButtonElement>,
  index: number
) => {
  let nextIndex = index;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      nextIndex = (index + 1) % settingsSections.length;
      sidebarRefs.current[nextIndex]?.focus();
      break;

    case "ArrowUp":
      event.preventDefault();
      nextIndex =
        (index - 1 + settingsSections.length) % settingsSections.length;
      sidebarRefs.current[nextIndex]?.focus();
      break;

    case "Home":
      event.preventDefault();
      sidebarRefs.current[0]?.focus();
      break;

    case "End":
      event.preventDefault();
      sidebarRefs.current[settingsSections.length - 1]?.focus();
      break;

    case "Enter":
    case " ":
      event.preventDefault();
      setActiveSection(settingsSections[index]);
      break;
  }
};

  const Toggle = ({
    checked,
    onChange,
    label,
  }: {
    checked: boolean;
    onChange: () => void;
    label: string;
  }) => (
    <button
      type="button"
      onClick={onChange}
      aria-label={label}
      aria-pressed={checked}
      className={`w-16 h-8 rounded-full border-2 flex items-center px-1 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
        checked
          ? "bg-[#FFD600] border-[#FFD600] justify-end"
          : "bg-black border-[#FFD600]/70 justify-start"
      }`}
    >
      <span
        className={`w-6 h-6 rounded-full ${
          checked ? "bg-black" : "bg-white/40"
        }`}
      />
    </button>
  );

  return (
    <MainLayout currentView="settings" onNavigate={onNavigate}>
      <h1 className="text-4xl font-bold mb-1">
        <span className="text-[#FFD600]">Settings</span>
      </h1>
      <p className="text-white/50 mb-6">
        All changes apply immediately — no save required.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-6 max-w-6xl">
        <aside
          className="bg-white/5 border border-[#FFD600]/20 rounded-2xl p-4"
          aria-label="Settings sections"
        >
          <nav
            className="space-y-2"
            role="tablist"
            aria-label="Settings sections"
            aria-orientation="vertical"
          >
            {settingsSections.map((section, index) => {
              const isActive = activeSection === section;

              return (
                <button
                  key={section}
                  ref={(element) => {
                    sidebarRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  id={`settings-tab-${index}`}
                  aria-selected={isActive}
                  aria-controls={`settings-panel-${index}`}
                  tabIndex={isActive ? 0 : -1}
                  onClick={() => setActiveSection(section)}
                  onKeyDown={(event) => handleSidebarKeyDown(event, index)}
                  className={`w-full text-left px-4 py-3 rounded-xl font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    isActive
                      ? "bg-[#FFD600]/10 text-[#FFD600] border border-[#FFD600]/40"
                      : "text-[#FFD600] hover:bg-white/10"
                  }`}
                >
                  {section}
                </button>
              );
            })}
          </nav>
        </aside>

        <section className="space-y-6">
          {activeSection === "Display & Text" && (
            <div className="border border-[#FFD600]/40 rounded-2xl overflow-hidden bg-white/5">
              <div className="bg-white/10 px-6 py-5 border-b border-[#FFD600]/30">
                <h2 className="text-2xl font-bold text-[#FFD600]">
                  Display & Text Size
                </h2>
              </div>

              <div className="p-6 space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-[#FFD600]">
                    Text Size
                  </h3>
                  <p className="text-white/60 mb-4">
                    Adjust body text size across the entire application
                  </p>

                  <div className="flex items-center gap-4">
                    <button
                      type="button"
                      onClick={() => setTextSize(Math.max(14, textSize - 1))}
                      className="bg-[#FFD600] text-black text-3xl font-bold px-5 py-3 rounded-xl"
                      aria-label="Decrease text size"
                    >
                      −
                    </button>

                    <input
                      type="range"
                      min="14"
                      max="28"
                      value={textSize}
                      onChange={(e) => setTextSize(Number(e.target.value))}
                      className="w-full"
                      aria-label="Text size"
                    />

                    <button
                      type="button"
                      onClick={() => setTextSize(Math.min(28, textSize + 1))}
                      className="bg-[#FFD600] text-black text-3xl font-bold px-5 py-3 rounded-xl"
                      aria-label="Increase text size"
                    >
                      +
                    </button>
                  </div>

                  <div className="flex justify-between text-white/40 text-sm mt-2">
                    <span>14px Min</span>
                    <span className="text-[#FFD600] font-bold">
                      {textSize}px
                    </span>
                    <span>28px Max</span>
                  </div>

                  <div className="mt-4 border border-dashed border-[#FFD600]/30 rounded-xl p-5 bg-black">
                    <p className="text-white/40 uppercase text-sm">
                      Live Preview
                    </p>
                    <p
                      className="text-[#FFD600] mt-2"
                      style={{ fontSize: textSize }}
                    >
                      Your next appointment is Thursday at 10:30 am.
                    </p>
                    <p className="text-[#FFD600]/80 text-sm mt-1">
                      Dr. Sarah Chen — Audiology Clinic, Level 3
                    </p>
                  </div>
                </div>

                <div className="space-y-0 border-t border-[#FFD600]/20">
                  <div className="flex items-center justify-between py-5 border-b border-[#FFD600]/20">
                    <div>
                      <h3 className="text-xl font-bold text-[#FFD600]">
                        High Contrast Mode
                      </h3>
                      <p className="text-white/60">
                        Black background with yellow text recommended for low
                        vision
                      </p>
                    </div>
                    <Toggle
                      checked={highContrast}
                      onChange={() => setHighContrast(!highContrast)}
                      label="Toggle high contrast"
                    />
                  </div>

                  <div className="flex items-center justify-between py-5 border-b border-[#FFD600]/20">
                    <div>
                      <h3 className="text-xl font-bold text-[#FFD600]">
                        Bold Text
                      </h3>
                      <p className="text-white/60">
                        Increase font weight across all text in the app
                      </p>
                    </div>
                    <Toggle
                      checked={boldText}
                      onChange={() => setBoldText(!boldText)}
                      label="Toggle bold text"
                    />
                  </div>

                  <div className="flex items-center justify-between py-5">
                    <div>
                      <h3 className="text-xl font-bold text-[#FFD600]">
                        Reduce Motion
                      </h3>
                      <p className="text-white/60">
                        Minimise transitions and animation effects
                      </p>
                    </div>
                    <Toggle
                      checked={reduceMotion}
                      onChange={() => setReduceMotion(!reduceMotion)}
                      label="Toggle reduce motion"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

              {activeSection === "Alert Flash" && (
      <div className="border border-[#FFD600]/40 rounded-2xl overflow-hidden bg-white/5">
        <div className="bg-white/10 px-6 py-5 border-b border-[#FFD600]/30">
          <h2 className="text-2xl font-bold text-[#FFD600]">
            Alert Flash Settings
          </h2>
        </div>

        <div className="p-6 space-y-6">
          <div
            className={`border border-[#FFD600]/30 rounded-xl p-8 bg-black text-center transition ${
              isTestingFlash ? "bg-[#FFD600] text-black" : "text-white/50"
            }`}
            aria-live="polite"
          >
            <div className="text-4xl mb-2">⚡</div>
            <p className="font-bold">Flash Preview Area</p>
            <p className="text-sm mt-1">Tap “Test Flash” to preview</p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FFD600] mb-3">
              Flash Speed
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              {[
                ["Slow", "0.5 Hz"],
                ["Medium", "1 Hz"],
                ["Fast", "2 Hz"],
              ].map(([speed, hz]) => (
                <button
                  key={speed}
                  type="button"
                  onClick={() => setFlashSpeed(speed)}
                  className={`rounded-xl border py-5 font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    flashSpeed === speed
                      ? "bg-[#FFD600] text-black border-[#FFD600]"
                      : "text-[#FFD600] border-[#FFD600]/40 hover:bg-[#FFD600]/10"
                  }`}
                  aria-pressed={flashSpeed === speed}
                >
                  <span className="block text-lg">{speed}</span>
                  <span className="block text-sm opacity-80">{hz}</span>
                </button>
              ))}
            </div>

            <p className="text-white/40 text-sm mt-3">
              WCAG 2.3.1: Flashing is limited below 3 flashes per second to reduce
              seizure and discomfort risk.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-bold text-[#FFD600] mb-3">
              Flash Colour
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                ["Yellow", "bg-[#FFD600]"],
                ["White", "bg-white"],
                ["Red", "bg-red-500"],
                ["Blue", "bg-blue-500"],
              ].map(([color, swatchClass]) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => setFlashColor(color)}
                  className={`rounded-xl border py-4 font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${
                    flashColor === color
                      ? "border-[#FFD600] text-[#FFD600] bg-[#FFD600]/10"
                      : "border-[#FFD600]/30 text-white/70 hover:bg-white/10"
                  }`}
                  aria-pressed={flashColor === color}
                >
                  <span
                    className={`mx-auto mb-2 block h-5 w-5 rounded-full border border-white/40 ${swatchClass}`}
                  />
                  <span>{color}</span>
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              setIsTestingFlash(true);
              window.setTimeout(() => setIsTestingFlash(false), 400);
            }}
            className="w-full bg-[#FFD600] text-black font-bold py-4 rounded-xl transition hover:brightness-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            ⚡ Test Flash Alert
          </button>
        </div>
      </div>
    )}

          {activeSection === "Notifications" && (
            <div className="border border-[#FFD600]/40 rounded-2xl overflow-hidden bg-white/5">
              <div className="bg-white/10 px-6 py-5 border-b border-[#FFD600]/30">
                <h2 className="text-2xl font-bold text-[#FFD600]">
                  Notification Preferences
                </h2>
              </div>

              <div className="p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-[#FFD600]/20 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#FFD600]">
                      Screen Flash
                    </h3>
                    <p className="text-white/60">
                      Full-screen colour flash when an alert arrives
                    </p>
                  </div>
                  <Toggle
                    checked={screenFlash}
                    onChange={() => setScreenFlash(!screenFlash)}
                    label="Toggle screen flash"
                  />
                </div>

                <div className="flex items-center justify-between border-b border-[#FFD600]/20 pb-5">
                  <div>
                    <h3 className="text-xl font-bold text-[#FFD600]">
                      Banner Alerts
                    </h3>
                    <p className="text-white/60">
                      Persistent on-screen banners with text and colour
                    </p>
                  </div>
                  <Toggle
                    checked={bannerAlerts}
                    onChange={() => setBannerAlerts(!bannerAlerts)}
                    label="Toggle banner alerts"
                  />
                </div>

                <h3 className="uppercase tracking-widest text-white/50 font-bold">
                  Alert Types
                </h3>

                {[
                  ["Missed Appointment", "Missed", "border-red-500"],
                  ["Confirmed Appointment", "Confirmed", "border-green-500"],
                  ["Awaiting Confirmation", "Awaiting", "border-yellow-500"],
                  ["Upcoming Reminder", "Reminder", "border-blue-500"],
                ].map(([title, tag, border]) => (
                  <div
                    key={title}
                    className={`flex items-center justify-between border ${border} rounded-xl p-4 bg-white/5`}
                  >
                    <div>
                      <h4 className="text-[#FFD600] font-bold text-lg">
                        {title}
                      </h4>
                      <span className="text-xs border border-current rounded-full px-2 py-1 text-white/70">
                        {tag}
                      </span>
                    </div>
                    <Toggle
                      checked={true}
                      onChange={() => {}}
                      label={`Toggle ${title}`}
                    />
                  </div>
                ))}

                <div className="border border-[#FFD600]/30 rounded-xl p-4 text-white/60">
                  Every colour indicator is paired with a text label — meets{" "}
                  <span className="text-[#FFD600] font-bold">WCAG 1.4.1</span>{" "}
                  Use of Colour.
                </div>

                <div className="border border-red-500 rounded-xl p-4 text-white">
                  ⚠ Emergency alerts always use maximum flash speed regardless
                  of the flash speed setting above.
                </div>
              </div>
            </div>
          )}

          {activeSection === "About" && (
            <div className="border border-[#FFD600]/40 rounded-2xl overflow-hidden bg-white/5">
              <div className="bg-white/10 px-6 py-5 border-b border-[#FFD600]/30">
                <h2 className="text-2xl font-bold text-[#FFD600]">
                  About Care Connect Hearing
                </h2>
              </div>

              <div className="p-6 space-y-4 text-white/70">
                <p>
                  Care Connect Hearing supports accessible communication between
                  caregivers, patients, and medical staff.
                </p>
                <p>
                  This settings page focuses on hearing-accessible alerts,
                  readable text, high contrast display options, and clear visual
                  notifications.
                </p>
                <p className="text-[#FFD600] font-bold">Version 2.4.1</p>
              </div>
            </div>
          )}
        </section>
      </div>
    </MainLayout>
  );
}