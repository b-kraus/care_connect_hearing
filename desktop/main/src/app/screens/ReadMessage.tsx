import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  Eye,
  FilePlus,
  Keyboard,
  MessageCircle,
  Mic,
  Pencil,
  Search,
  Volume2,
} from "lucide-react";

interface ReadMessageProps {
  onNavigate?: (screen: string) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-[#121212]";

const conversations = [
  { name: "Dr. Martinez", time: "10:42 AM", preview: "Incoming call transcription", initial: "D" },
  { name: "Care Support Line", time: "Yesterday", preview: "Your hearing aid order has ...", initial: "C" },
  { name: "Family — Mom", time: "Yesterday", preview: "Dinner Sunday at 6, are yo...", initial: "F" },
  { name: "Work — HR Dept", time: "Mon", preview: "Annual review rescheduled to J...", initial: "W" },
  { name: "Audiologist Office", time: "Dec 18", preview: "Follow-up results are ready", initial: "A" },
  { name: "Rideshare Confirm", time: "Dec 17", preview: "Your driver is 3 minutes away", initial: "R" },
  { name: "Insurance — Aetna", time: "Dec 16", preview: "Claim #4421 has been proces...", initial: "I" },
  { name: "Pharmacy Alert", time: "Dec 15", preview: "Prescription ready for pickup", initial: "P" },
];

export default function ReadMessage({ onNavigate }: ReadMessageProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isListening, setIsListening] = useState(false);
  const [readMode, setReadMode] = useState(false);
  const [amplified, setAmplified] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onNavigate?.("home");
      }

      if (event.altKey && event.key.toLowerCase() === "h") {
        event.preventDefault();
        onNavigate?.("home");
      }

      if (event.ctrlKey && event.key.toLowerCase() === "f") {
        event.preventDefault();
        searchRef.current?.focus();
      }

      if (event.ctrlKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        setReadMode((value) => !value);
      }

      if (event.ctrlKey && event.key.toLowerCase() === "a") {
        event.preventDefault();
        setAmplified((value) => !value);
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((value) => Math.min(value + 1, conversations.length - 1));
      }

      if (event.key === "ArrowUp") {
        setSelectedIndex((value) => Math.max(value - 1, 0));
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [onNavigate]);

  return (
    <div className="min-h-screen bg-[#121212] text-white flex flex-col font-[DM_Sans,Inter,sans-serif]">
      <header className="h-14 border-b border-white/10 flex items-center gap-8 px-5">
        <button
          onClick={() => onNavigate?.("home")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FFD600]/40 text-white hover:bg-[#FFD600]/10 ${focusRing}`}
          aria-label="Return to Home"
        >
          <ArrowLeft className="w-5 h-5 text-[#FFD600]" />
          Home
          <kbd className="ml-2 px-2 py-1 rounded bg-[#262626] border border-white/20 text-xs">Esc</kbd>
        </button>

        <strong className="text-[#FFD600]">CareConnect Hearing</strong>

        <nav className="flex items-center gap-6 text-white/90" aria-label="Application menu">
          <button className={focusRing}>File</button>
          <button className={focusRing}>Edit</button>
          <button className={focusRing}>View</button>
          <button className={focusRing}>Help</button>
        </nav>

        <div className="ml-auto flex items-center gap-2 text-green-400 font-bold">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          READY
        </div>
      </header>

      <section className="h-20 border-b border-white/10 flex items-center gap-4 px-5">
        <ToolbarButton icon={<FilePlus />} label="New Message" shortcut="Ctrl + N" />
        <ToolbarButton icon={<Pencil />} label="Compose" shortcut="Ctrl + E" />
        <ToolbarButton icon={<Search />} label="Search" shortcut="Ctrl + F" onClick={() => searchRef.current?.focus()} />
        <ToolbarButton icon={<Eye />} label="Read Mode" shortcut="Ctrl + R" active={readMode} onClick={() => setReadMode(!readMode)} />
        <ToolbarButton icon={<Volume2 />} label="Amplify" shortcut="Ctrl + A" active={amplified} onClick={() => setAmplified(!amplified)} />
      </section>

      <div className="flex flex-1 min-h-0">
        <aside className="w-[360px] border-r border-[#FFD600]/20 p-5 overflow-auto">
          <div className="flex items-center justify-between mb-5">
            <h2 className="flex items-center gap-3 text-[#FFD600] tracking-widest font-bold">
              <MessageCircle className="w-5 h-5" />
              CONVERSATIONS
            </h2>
            <span className="bg-[#FFD600] text-black rounded-full px-3 py-1 font-bold">2</span>
          </div>

          <input
            ref={searchRef}
            placeholder="Search messages..."
            aria-label="Search messages"
            className={`w-full mb-4 bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white placeholder:text-white/80 ${focusRing}`}
          />

          <ul aria-label="Conversation list" className="space-y-2 list-none p-0 m-0">
            {conversations.map((item, index) => (
              <li key={item.name}>
                <button
                  onClick={() => setSelectedIndex(index)}
                  aria-current={selectedIndex === index ? "true" : undefined}
                  className={`w-full flex items-center gap-4 p-4 rounded-xl text-left ${focusRing} ${
                    selectedIndex === index
                      ? "bg-blue-600/30 border border-blue-500"
                      : "hover:bg-white/5"
                  }`}
                >
                  <span className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center font-bold">
                    {item.initial}
                  </span>
                  <span className="flex-1">
                    <span className="block font-bold">{item.name}</span>
                    <span className="block text-sm text-white/75">{item.preview}</span>
                  </span>
                  <span className="text-sm text-white/70">{item.time}</span>
                </button>
              </li>
            ))}
          </ul>
        </aside>

        <main className="flex-1 p-8 flex flex-col">
          <div className="mb-6">
            <h1 className="text-3xl font-bold">
              {conversations[selectedIndex].name}
              <span className="text-white/80"> › Read Message</span>
            </h1>
            <p className="text-white/70 mt-2">Today, 10:42 AM · Incoming call transcription</p>
          </div>

          <section
            aria-live="polite"
            className={`flex-1 border border-[#FFD600]/50 rounded-2xl p-8 bg-[#1a1a1a] shadow-xl ${
              amplified ? "text-5xl" : "text-4xl"
            }`}
          >
            <p className="text-[#FFD600] font-mono leading-relaxed">
              {isListening
                ? "Listening... transcription will appear here as speech is detected."
                : 'Press “Start Listening” to begin transcription…'}
            </p>
          </section>

          <div className="mt-6 flex items-center justify-between">
            <div className="text-white/70">
              <span className={`inline-block w-3 h-3 rounded-full mr-2 ${isListening ? "bg-green-500" : "bg-white/30"}`} />
              {isListening ? "Listening" : "Idle"}
            </div>

            <div className="flex gap-4">
              <button
                onClick={() => setIsListening(true)}
                className={`px-8 py-4 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-3 ${focusRing}`}
              >
                <Mic className="w-5 h-5" />
                Start Listening
                {/* FIXED: Changed to a deep slate navy background bg-[#0f172a] to perfectly pass white-text contrast verification */}
                <kbd className="ml-2 px-2 py-1 rounded bg-[#0f172a] text-sm text-white">Space</kbd>
              </button>

              <button
                onClick={() => setIsListening(false)}
                disabled={!isListening}
                className={`px-8 py-4 rounded-xl border border-white/15 font-bold disabled:opacity-40 ${focusRing}`}
              >
                Stop Listening
              </button>

              <button className={`px-8 py-4 rounded-xl border border-white/15 font-bold ${focusRing}`}>
                Mute
                <kbd className="ml-2 px-2 py-1 rounded bg-[#262626] text-sm">M</kbd>
              </button>
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-[#FFD600]/30 p-4 flex items-center gap-6 text-sm text-white/80">
        <Keyboard className="w-5 h-5 text-[#FFD600]" />
        <strong className="text-[#FFD600]">Keyboard Shortcuts</strong>
        <span>Ctrl+N New</span>
        <span>Ctrl+E Compose</span>
        <span>Ctrl+F Search</span>
        <span>Ctrl+R Read Mode</span>
        <span>Ctrl+A Amplify</span>
        <span>↑↓ Navigate</span>
        <span>Enter Open</span>
        <span>Esc Home</span>
        <span>Alt+H Home</span>
      </footer>
    </div>
  );
}

function ToolbarButton({
  icon,
  label,
  shortcut,
  active = false,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  shortcut: string;
  active?: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-3 px-5 py-3 rounded-xl border transition-all ${
        active
          ? "border-blue-500 bg-blue-600/20"
          : "border-white/15 hover:bg-white/5"
      } ${focusRing}`}
    >
      <span className="text-[#FFD600] [&>svg]:w-6 [&>svg]:h-6">{icon}</span>
      <span className="font-semibold">{label}</span>
      <kbd className="ml-2 px-2 py-1 rounded bg-[#262626] border border-white/20 text-sm">
        {shortcut}
      </kbd>
    </button>
  );
}