import { useState, useRef, useEffect, useCallback, KeyboardEvent } from "react";
import { Bell, Zap, Eye, Volume2, Settings, CheckCircle2, Monitor, ArrowRight, HelpCircle, ChevronLeft } from "lucide-react";
import Home from "./screens/Home.tsx";
import Logs from "./screens/Logs.tsx";
const STEPS = ["Welcome", "Alert Style", "Display", "Complete", "Home"] as const;

const features = [
  { icon: Eye,     label: "High Contrast", desc: "Enhanced color ratios for low vision" },
  { icon: Zap,     label: "Visual Flash",  desc: "Screen flashes on incoming alerts" },
  { icon: Volume2, label: "Large Text",    desc: "Scaled typography throughout the app" },
];

const ALERT_STYLES = [
  { id: "flash",  icon: Zap,     label: "Visual Flash",   desc: "Screen flashes for alerts" },
  { id: "banner", icon: Bell,    label: "Banner Only",    desc: "Persistent top-of-screen banner" },
  { id: "both",   icon: Monitor, label: "Flash + Banner", desc: "Maximum visibility" },
];

const TEXT_SIZES = ["Small", "Medium", "Large", "X-Large"];

const HELP_ITEMS = [
  { icon: Zap,      title: "Visual Flash",          body: "When an alert arrives, your screen briefly flashes to draw your attention — no sound required." },
  { icon: Eye,      title: "High Contrast",          body: "Text and UI elements are displayed with enhanced color ratios so content is easier to read in any lighting." },
  { icon: Volume2,  title: "Large Text",             body: "All text across the app is scaled up for comfortable reading without needing to zoom or squint." },
  { icon: Bell,     title: "Alert Banners",          body: "Important notifications appear as prominent banners at the top of the screen, so nothing gets missed." },
  { icon: Settings, title: "Changing Settings Later",body: "Every preference you configure during setup can be changed at any time inside the Settings screen — nothing is permanent." },
];

/* ── Shared focus-ring class ─────────────────────────────────────── */
const ring = "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-background";

/* ── Step indicator ──────────────────────────────────────────────── */
function StepIndicator({ current }: { current: number }) {
  return (
    <nav aria-label="Setup progress">
      <ol className="flex items-center gap-2" role="list">
        {STEPS.map((label, i) => (
          <li key={label} className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <div
                aria-current={i === current ? "step" : undefined}
                aria-label={`Step ${i + 1}: ${label}${i < current ? " – completed" : i === current ? " – current" : ""}`}
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-300 ${
                  i < current
                    ? "bg-primary text-primary-foreground"
                    : i === current
                    ? "bg-primary text-primary-foreground ring-2 ring-primary/30"
                    : "bg-accent text-muted-foreground"
                }`}
              >
                {i < current ? <CheckCircle2 className="w-3.5 h-3.5" aria-hidden /> : i + 1}
              </div>
              <span className={`text-xs font-medium hidden sm:block ${i === current ? "text-foreground" : "text-muted-foreground"}`}>
                {label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div aria-hidden className={`h-px w-8 transition-all duration-500 ${i < current ? "bg-primary" : "bg-border"}`} />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/* ── Help screen ─────────────────────────────────────────────────── */
function HelpScreen({ onBack, headingRef }: { onBack: () => void; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  /* Escape key closes help */
  useEffect(() => {
    const handler = (e: globalThis.KeyboardEvent) => { if (e.key === "Escape") onBack(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onBack]);

  return (
    <div className="flex flex-col gap-6" role="region" aria-labelledby="help-heading">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          aria-label="Go back to Welcome"
          className={`flex items-center justify-center w-9 h-9 rounded-lg border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-all duration-150 ${ring}`}
        >
          <ChevronLeft className="w-4 h-4" aria-hidden />
        </button>
        <div>
          <h2 id="help-heading" ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-foreground outline-none">
            Help &amp; Explanations
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">What each setting means</p>
        </div>
      </div>

      <ul className="flex flex-col gap-3" role="list">
        {HELP_ITEMS.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-start gap-4 p-4 rounded-xl bg-accent border border-border">
            <div aria-hidden className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0 mt-0.5">
              <Icon className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-sm font-semibold text-foreground">{title}</span>
              <span className="text-xs text-muted-foreground leading-relaxed">{body}</span>
            </div>
          </li>
        ))}
      </ul>

      <button
        onClick={onBack}
        className={`w-full border border-border text-foreground font-medium py-3 px-6 rounded-xl hover:bg-accent active:scale-[0.98] transition-all duration-150 ${ring} flex items-center justify-center gap-2`}
      >
        <ChevronLeft className="w-4 h-4" aria-hidden />
        Back to Welcome
        <span className="sr-only">(or press Escape)</span>
      </button>
    </div>
  );
}

/* ── Welcome step ────────────────────────────────────────────────── */
function WelcomeStep({
  onNext, onSkip, onHelp, headingRef,
}: {
  onNext: () => void; onSkip: () => void; onHelp: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <h1 id="step-heading" ref={headingRef} tabIndex={-1} className="text-3xl font-bold text-foreground leading-tight outline-none">
          Welcome to<br />
          <span className="text-primary">Care Connect Hearing</span>
        </h1>
        <p className="text-muted-foreground text-base leading-relaxed max-w-sm">
          Large text, high contrast, and visual alerts are already on.
          You can adjust everything later in Settings.
        </p>
      </div>

      {/* Example Alert Preview – decorative, not interactive */}
      <div
        role="img"
        aria-label="Example alert: visual flash active"
        className="rounded-xl border border-primary/40 bg-accent p-4 flex items-center gap-4"
      >
        <div aria-hidden className="w-12 h-12 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
          <Bell className="w-6 h-6 text-primary" />
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold text-foreground text-sm">Example Alert</span>
          <span className="text-xs text-muted-foreground flex items-center gap-1.5" aria-hidden>
            <Zap className="w-3 h-3 text-primary" />
            Visual flash
          </span>
        </div>
        <div className="ml-auto" aria-hidden>
          <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">Active</span>
        </div>
      </div>

      <div className="flex flex-col gap-3" role="group" aria-label="Setup options">
        <button
          onClick={onNext}
          className={`w-full bg-primary text-primary-foreground font-semibold py-3.5 px-6 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/40 active:bg-blue-700 active:scale-[0.98] transition-all duration-150 ${ring} flex items-center justify-center gap-2`}
        >
          Start Guided Setup
          <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
        <button
          onClick={onSkip}
          className={`w-full border border-border text-foreground font-medium py-3.5 px-6 rounded-xl hover:bg-accent active:scale-[0.98] transition-all duration-150 ${ring}`}
        >
          Use Default Settings
        </button>
        <button
          onClick={onHelp}
          aria-haspopup="dialog"
          className={`w-full border border-primary/40 text-foreground font-medium py-3.5 px-6 rounded-xl hover:bg-accent active:scale-[0.98] transition-all duration-150 ${ring} flex items-center justify-center gap-2`}
        >
          <HelpCircle className="w-4 h-4 text-primary" aria-hidden />
          Help
        </button>
      </div>
    </div>
  );
}

/* ── Alert style step — roving tabindex radio group ─────────────── */
function AlertStyleStep({ onNext, onBack, headingRef }: { onNext: () => void; onBack: () => void; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  const [selectedIdx, setSelectedIdx] = useState(2); // "both" default
  const optionRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleOptionKey = useCallback((e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") {
      e.preventDefault();
      next = (i + 1) % ALERT_STYLES.length;
    } else if (e.key === "ArrowUp" || e.key === "ArrowLeft") {
      e.preventDefault();
      next = (i - 1 + ALERT_STYLES.length) % ALERT_STYLES.length;
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = ALERT_STYLES.length - 1;
    } else {
      return;
    }
    setSelectedIdx(next);
    optionRefs.current[next]?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-foreground outline-none">Alert Style</h2>
        <p id="alert-style-desc" className="text-muted-foreground text-sm leading-relaxed">
          Choose how you want to be notified when an alert arrives.
          Use arrow keys to navigate options.
        </p>
      </div>

      <div
        role="radiogroup"
        aria-labelledby="step-heading"
        aria-describedby="alert-style-desc"
        className="flex flex-col gap-3"
      >
        {ALERT_STYLES.map(({ id, icon: Icon, label, desc }, i) => {
          const isSelected = selectedIdx === i;
          return (
            <button
              key={id}
              ref={(el) => { optionRefs.current[i] = el; }}
              role="radio"
              aria-checked={isSelected}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedIdx(i)}
              onKeyDown={(e) => handleOptionKey(e, i)}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all duration-200 text-left ${ring} ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-border bg-accent hover:border-primary/30 hover:bg-accent/80"
              }`}
            >
              <div aria-hidden className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${isSelected ? "bg-primary/20" : "bg-secondary"}`}>
                <Icon className={`w-5 h-5 ${isSelected ? "text-primary" : "text-muted-foreground"}`} />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="font-semibold text-sm text-foreground">{label}</span>
                <span className="text-xs text-muted-foreground">{desc}</span>
              </div>
              {isSelected && <CheckCircle2 aria-hidden className="w-5 h-5 text-primary ml-auto shrink-0" />}
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className={`flex-1 border border-border text-foreground font-medium py-3 px-6 rounded-xl hover:bg-accent transition-all duration-150 ${ring}`}>
          Back
        </button>
        <button onClick={onNext} className={`flex-[2] bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/40 active:bg-blue-700 active:scale-[0.98] transition-all duration-150 ${ring} flex items-center justify-center gap-2`}>
          Continue
          <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ── Display step ────────────────────────────────────────────────── */
function DisplayStep({ onNext, onBack, headingRef }: { onNext: () => void; onBack: () => void; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  const [textSizeIdx, setTextSizeIdx] = useState(2);
  const [highContrast, setHighContrast] = useState(true);
  const sizeRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const handleSizeKey = useCallback((e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    let next = i;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      next = Math.min(i + 1, TEXT_SIZES.length - 1);
    } else if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      next = Math.max(i - 1, 0);
    } else if (e.key === "Home") {
      e.preventDefault();
      next = 0;
    } else if (e.key === "End") {
      e.preventDefault();
      next = TEXT_SIZES.length - 1;
    } else {
      return;
    }
    setTextSizeIdx(next);
    sizeRefs.current[next]?.focus();
  }, []);

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-foreground outline-none">Display Settings</h2>
        <p className="text-muted-foreground text-sm">Adjust visual preferences for your comfort.</p>
      </div>

      <div className="flex flex-col gap-6">
        {/* Text Size radio group */}
        <div className="flex flex-col gap-3">
          <span id="text-size-label" className="text-sm font-semibold text-foreground">Text Size</span>
          <div
            role="radiogroup"
            aria-labelledby="text-size-label"
            aria-describedby="text-size-hint"
            className="grid grid-cols-4 gap-2"
          >
            {TEXT_SIZES.map((size, i) => {
              const isSelected = textSizeIdx === i;
              return (
                <button
                  key={size}
                  ref={(el) => { sizeRefs.current[i] = el; }}
                  role="radio"
                  aria-checked={isSelected}
                  tabIndex={isSelected ? 0 : -1}
                  onClick={() => setTextSizeIdx(i)}
                  onKeyDown={(e) => handleSizeKey(e, i)}
                  className={`py-2 px-3 rounded-lg text-xs font-medium transition-all duration-150 ${ring} ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-accent border border-border text-muted-foreground hover:border-primary/30"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>
          <p id="text-size-hint" className="sr-only">Use left and right arrow keys to change text size.</p>
          <div
            aria-live="polite"
            aria-atomic="true"
            className="rounded-lg bg-accent border border-border p-4 text-center transition-all"
            style={{ fontSize: `${0.8 + textSizeIdx * 0.15}rem` }}
          >
            <span className="text-foreground font-medium">Preview text at {TEXT_SIZES[textSizeIdx]} size</span>
          </div>
        </div>

        {/* High Contrast toggle */}
        <div className="flex items-center justify-between p-4 rounded-xl bg-accent border border-border">
          <div className="flex flex-col gap-0.5" id="contrast-label">
            <span className="text-sm font-semibold text-foreground">High Contrast Mode</span>
            <span className="text-xs text-muted-foreground">Enhances color ratios for readability</span>
          </div>
          <button
            role="switch"
            aria-checked={highContrast}
            aria-labelledby="contrast-label"
            onClick={() => setHighContrast(!highContrast)}
            className={`relative w-12 h-6 rounded-full transition-all duration-300 ${ring} ${
              highContrast ? "bg-primary" : "bg-secondary border border-border"
            }`}
          >
            <div aria-hidden className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow transition-all duration-300 ${highContrast ? "left-6" : "left-0.5"}`} />
            <span className="sr-only">{highContrast ? "On" : "Off"}</span>
          </button>
        </div>
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className={`flex-1 border border-border text-foreground font-medium py-3 px-6 rounded-xl hover:bg-accent transition-all duration-150 ${ring}`}>
          Back
        </button>
        <button onClick={onNext} className={`flex-[2] bg-primary text-primary-foreground font-semibold py-3 px-6 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/40 active:bg-blue-700 active:scale-[0.98] transition-all duration-150 ${ring} flex items-center justify-center gap-2`}>
          Finish Setup
          <CheckCircle2 className="w-4 h-4" aria-hidden />
        </button>
      </div>
    </div>
  );
}

/* ── Complete step ───────────────────────────────────────────────── */
function CompleteStep({
  onRestart,
  onOpen,
  headingRef,
}: {
  onRestart: () => void;
  onOpen: () => void;
  headingRef: React.RefObject<HTMLHeadingElement | null>;
}) {
  return (
    <div className="flex flex-col items-center gap-8 text-center py-4">
      <div aria-hidden className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/40 flex items-center justify-center">
        <CheckCircle2 className="w-10 h-10 text-primary" />
      </div>
      <div className="flex flex-col gap-3">
        <h2 id="step-heading" ref={headingRef} tabIndex={-1} className="text-2xl font-bold text-foreground outline-none">
          You&apos;re all set!
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
          Care Connect Hearing is configured for you. Head to Settings any time to adjust these preferences.
        </p>
      </div>
      <div className="w-full flex flex-col gap-3">
        <button onClick={onOpen} className={`w-full bg-primary text-primary-foreground font-semibold py-3.5 px-6 rounded-xl hover:bg-blue-600 hover:text-white hover:shadow-lg hover:shadow-blue-600/40 active:bg-blue-700 active:scale-[0.98] transition-all duration-150 ${ring} flex items-center justify-center gap-2`}>
          Open Care Connect
          <ArrowRight className="w-4 h-4" aria-hidden />
        </button>
        <button
          onClick={onRestart}
          className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${ring} rounded px-2 py-1`}
        >
          Restart setup
        </button>
      </div>
    </div>
  );
}

/* ── Root App ────────────────────────────────────────────────────── */
export default function App() {
  const [step, setStep] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  
  // Custom navigation state tracker for views past the onboarding sequence
  const [currentView, setCurrentView] = useState<"onboarding" | "home" | "logs">("onboarding");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);

  /* Move focus to heading whenever the active view changes */
  useEffect(() => {
    headingRef.current?.focus();
  }, [step, showHelp, currentView]);

  const next = () => setStep((s) => Math.min(s + 1, STEPS.length - 1));
  const back = () => setStep((s) => Math.max(s - 1, 0));

  if (currentView === "home") {
  return <Home onNavigate={(screen) => setCurrentView(screen as "home" | "logs")} />;
}

if (currentView === "logs") {
  return <Logs onNavigate={(screen) => setCurrentView(screen as "home" | "logs")} />;
}

if (step === 4) {
  // If they somehow refreshed here, ensure they are set to home view
  setCurrentView("home");
  return <Home onNavigate={(screen) => setCurrentView(screen as "home" | "logs")} />;
}

return (
    <>
      {/* Skip link — WCAG 2.4.1 */}
      <a
        href="#main-content"
        className={`sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:bg-background focus:text-foreground focus:px-4 focus:py-2 focus:rounded-lg focus:border focus:border-border focus:shadow-lg ${ring}`}
      >
        Skip to main content
      </a>

      {/* Live region — announces step changes to screen readers */}
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {showHelp ? "Help screen" : `Step ${step + 1} of ${STEPS.length}: ${STEPS[step]}`}
      </div>

      <div className="min-h-screen bg-background flex items-center justify-center p-4 font-[DM_Sans,Inter,sans-serif]">
        <div className="w-full max-w-5xl flex rounded-2xl overflow-hidden shadow-2xl border border-border min-h-[600px]">

          {/* Left Panel — decorative, no interactive elements */}
          <div className="hidden lg:flex flex-col w-[420px] shrink-0 bg-card border-r border-border p-10 relative overflow-hidden" aria-hidden="true">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-primary/5 blur-3xl pointer-events-none" />
            <div className="absolute -bottom-16 -right-16 w-64 h-64 rounded-full bg-primary/8 blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col h-full">
              <div className="flex items-center gap-3 mb-10">
                <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                  <Bell className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="font-bold text-foreground text-lg">Care Connect</span>
              </div>
              <div className="flex flex-col gap-3 mb-10">
                <h2 className="text-2xl font-bold text-foreground leading-snug">
                  Designed for how<br />
                  <span className="text-primary">you hear the world</span>
                </h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Accessibility first alerts that keep you connected everywhere
                </p>
              </div>
              <div className="flex flex-col gap-4">
                {features.map(({ icon: Icon, label, desc }) => (
                  <div key={label} className="flex items-start gap-3">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-sm font-semibold text-foreground">{label}</span>
                      <span className="text-xs text-muted-foreground">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-auto pt-8 flex items-center gap-2 text-xs text-muted-foreground">
                <Settings className="w-3 h-3" />
                <span>All settings are adjustable after setup</span>
              </div>
            </div>
          </div>

          {/* Right Panel — main interactive region */}
          <main id="main-content" ref={mainRef} className="flex-1 flex flex-col bg-background p-8 lg:p-12" aria-label="Onboarding wizard">

            {/* Step indicator — hidden on help screen */}
            {!showHelp && (
              <div className="mb-8 flex flex-col gap-2">
                <StepIndicator current={step} />
                <span className="text-xs text-muted-foreground hidden sm:block" aria-hidden>
                  Step {step + 1} of {STEPS.length}
                </span>
              </div>
            )}

            {/* Keyboard hint bar */}
            <div className="mb-4 hidden sm:flex items-center gap-4 text-xs text-muted-foreground/60 select-none" aria-hidden>
              <span><kbd className="px-1 py-0.5 rounded border border-border font-mono text-[10px]">Tab</kbd> navigate</span>
              <span><kbd className="px-1 py-0.5 rounded border border-border font-mono text-[10px]">Enter</kbd> select</span>
              <span><kbd className="px-1 py-0.5 rounded border border-border font-mono text-[10px]">↑↓</kbd> options</span>
              {showHelp && <span><kbd className="px-1 py-0.5 rounded border border-border font-mono text-[10px]">Esc</kbd> close help</span>}
            </div>

            <div className="flex-1 flex flex-col justify-center">
              {showHelp && (
                <HelpScreen onBack={() => setShowHelp(false)} headingRef={headingRef} />
              )}
              {!showHelp && step === 0 && (
                <WelcomeStep onNext={next} onSkip={() => setStep(STEPS.length - 1)} onHelp={() => setShowHelp(true)} headingRef={headingRef} />
              )}
              {!showHelp && step === 1 && (
                <AlertStyleStep onNext={next} onBack={back} headingRef={headingRef} />
              )}
              {!showHelp && step === 2 && (
                <DisplayStep onNext={next} onBack={back} headingRef={headingRef} />
              )}
              {!showHelp && step === 3 && (
                <CompleteStep onRestart={() => setStep(0)} onOpen={() => setStep(4)} headingRef={headingRef} />
              )}
            </div>

            {/* Mobile logo footer */}
            <div className="lg:hidden flex items-center justify-center gap-2 mt-8 pt-6 border-t border-border" aria-hidden>
              <div className="w-6 h-6 rounded-lg bg-primary flex items-center justify-center">
                <Bell className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <span className="text-sm font-semibold text-muted-foreground">Care Connect Hearing</span>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
