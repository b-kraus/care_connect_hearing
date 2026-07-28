import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Headphones, ArrowRight } from "lucide-react";

const onboardingSlides = [
  {
    title: "Welcome to\nCareConnect",
    body: "Your all-in-one companion for personalized hearing care and accessible communication.",
    icon: Headphones,
    iconBg: "rgba(255, 214, 0, 0.15)",
    accent: "#FFD600",
  },
  {
    title: "Real-time\nAssistance",
    body: "Get instant access to tools and emergency support right when you need them.",
    icon: Headphones,
    iconBg: "rgba(255, 214, 0, 0.15)",
    accent: "#FFD600",
  },
];

export default function OnboardingScreen() {
  const navigate = useNavigate();
  const [current, setCurrent] = useState(0);
  const slide = onboardingSlides[current];
  const isLast = current === onboardingSlides.length - 1;

  function handleNext() {
    if (isLast) {
      navigate("/login");
    } else {
      setCurrent((c) => c + 1);
    }
  }

  return (
    <div className="min-h-screen w-full bg-[#0a0a0a] flex flex-col justify-between select-none overflow-x-hidden">
      {/* Top Navigation Bar */}
      <header className="w-full max-w-4xl mx-auto flex items-center justify-between px-6 pt-8 pb-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#FFD600] rounded-full flex items-center justify-center flex-shrink-0">
            <Headphones size={20} className="text-[#111111]" strokeWidth={2.5} />
          </div>
          <span className="text-white font-bold text-lg tracking-tight">
            CareConnect
          </span>
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-4">
          <Link
            to="/home"
            className="text-[#FFD600] text-sm font-semibold hover:opacity-80 active:opacity-60 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1"
            aria-label="Go to home screen"
          >
            Go to Home
          </Link>
          <div className="w-px h-4 bg-white/20" aria-hidden="true" />
          <Link
            to="/login"
            className="text-[#8e8e93] text-sm font-semibold hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] rounded px-1"
            aria-label="Sign in"
          >
            Sign In
          </Link>
        </div>
      </header>

      {/* Main Slide Body */}
      <main className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center px-6 py-8">
        <div 
          key={current} 
          className="flex flex-col items-start transition-all duration-300 ease-in-out animate-in fade-in slide-in-from-right-4"
        >
          {/* Icon Badge */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center mb-8 sm:mb-10"
            style={{ backgroundColor: slide.iconBg }}
            aria-hidden="true"
          >
            <slide.icon size={52} style={{ color: slide.accent }} strokeWidth={1.75} />
          </div>

          {/* Heading */}
          <h1 className="font-bold text-white leading-[1.1] tracking-tight whitespace-pre-line mb-4 text-4xl sm:text-5xl md:text-6xl">
            {slide.title}
          </h1>

          {/* Body Text */}
          <p className="text-[#8e8e93] text-lg sm:text-xl leading-relaxed max-w-lg">
            {slide.body}
          </p>
        </div>
      </main>

      {/* Bottom Section: Progress Indicators & Action Button */}
      <footer className="w-full max-w-4xl mx-auto px-6 pb-12 pt-4 flex flex-col gap-6">
        {/* Progress Dots */}
        <div className="flex items-center gap-2">
          {onboardingSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Go to slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === current ? "w-10 bg-[#FFD600]" : "w-5 bg-white/25"
              }`}
            />
          ))}
        </div>

        {/* Next / Get Started CTA Button */}
        <button
          onClick={handleNext}
          className="w-full h-14 sm:h-16 bg-[#FFD600] text-[#111111] rounded-2xl font-bold text-lg flex items-center justify-center gap-2 hover:bg-[#F0C800] active:bg-[#E0BB00] transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
        >
          {isLast ? "Get Started" : "Continue"}
          <ArrowRight size={22} strokeWidth={2.5} />
        </button>
      </footer>

      {/* Quick Help Button */}
      <button
        className="fixed bottom-6 right-6 w-11 h-11 rounded-full bg-[#1c1c1e] border border-white/10 text-[#8e8e93] font-bold text-base flex items-center justify-center hover:text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD600] z-20 shadow-lg"
        aria-label="Help"
      >
        ?
      </button>
    </div>
  );
}