import { useEffect,useRef, useState } from "react";
import {
  ArrowLeft,
  Copy,
  FilePlus,
  Keyboard,
  Mic,
  Printer,
  Save,
  Scissors,
  Send,
  Trash2,
  Undo2,
  Redo2,
  User,
} from "lucide-react";

interface RecordingProps {
  onNavigate?: (screenName: string) => void;
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

const recentMessages = [
  {
    name: "Dr. Sarah Chen",
    preview: "Appointment reminder for Tuesday...",
    time: "2:41 PM",
    status: "sent",
  },
  {
    name: "Mom",
    preview: "Call me when you get a chance...",
    time: "11:08 AM",
    status: "sent",
  },
  {
    name: "James Okafor",
    preview: "The hearing aid settings need...",
    time: "Yesterday",
    status: "sent",
  },
  {
    name: "Audiology Clinic",
    preview: "Can we reschedule my Friday...",
    time: "Mon",
    status: "sent",
  },
  {
    name: "Emma Whitfield",
    preview: "Thanks for the recommendation...",
    time: "Jun 24",
    status: "sent",
  },
  {
    name: "Work — HR Dept.",
    preview: "Accommodation request form...",
    time: "Jun 22",
    status: "missed",
  },
  {
    name: "Transit Authority",
    preview: "Loop induction loop at station...",
    time: "Jun 20",
    status: "sent",
  },
];

export default function Recording({ onNavigate }: RecordingProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [message, setMessage] = useState(
    "Hello, I just wanted to let you know that I will need an interpreter for my appointment on Thursday. Please call the clinic ahead of time to arrange this."
  );
  const [announcement, setAnnouncement] = useState("Ready");

  useEffect(() => {
    if (!isRecording) return;

    const timer = window.setInterval(() => {
      setSeconds((value) => value + 1);
    }, 1000);

    return () => window.clearInterval(timer);
  }, [isRecording]);

  useEffect(() => {
    const handleShortcut = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();

        if (isRecording) {
          setIsRecording(false);
          setAnnouncement("Recording stopped");
        } else {
          onNavigate?.("home");
        }
      }

      if (event.altKey && event.key.toLowerCase() === "h") {
        event.preventDefault();
        onNavigate?.("home");
      }

      if (event.ctrlKey && event.key.toLowerCase() === "r") {
        event.preventDefault();
        setIsRecording(true);
        setAnnouncement("Recording started");
      }

      if (event.ctrlKey && event.key.toLowerCase() === "s") {
        event.preventDefault();
        setIsRecording(false);
        setAnnouncement("Message sent");
      }

      if (event.ctrlKey && event.key.toLowerCase() === "n") {
        event.preventDefault();
        setMessage("");
        setSeconds(0);
        setIsRecording(false);
        setAnnouncement("New message started");
      }

      if (event.key === "ArrowDown") {
        setSelectedIndex((value) => Math.min(value + 1, recentMessages.length - 1));
      }

      if (event.key === "ArrowUp") {
        setSelectedIndex((value) => Math.max(value - 1, 0));
      }
    };

    window.addEventListener("keydown", handleShortcut);
    return () => window.removeEventListener("keydown", handleShortcut);
  }, [isRecording, onNavigate]);

  const formattedTime = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(
    seconds % 60
  ).padStart(2, "0")}`;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col font-[DM_Sans,Inter,sans-serif]">
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      <header className="h-14 border-b border-white/10 flex items-center gap-8 px-5">
        <button
          type="button"
          onClick={() => {
            if (onNavigate) onNavigate("home");
          }}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg border border-[#FFD600]/40 text-white hover:bg-[#FFD600]/10 ${focusRing}`}
          aria-label="Return to Home"
        >
          <ArrowLeft className="w-5 h-5 text-[#FFD600]" aria-hidden />
          Home
          <kbd className="ml-2 px-2 py-1 rounded bg-white/10 border border-white/20 text-xs">
            Esc
          </kbd>
        </button>

        <strong className="text-[#FFD600]">CareConnect Hearing</strong>

        <nav className="flex items-center gap-6 text-white/80" aria-label="Application menu">
          <button type="button" className={focusRing}>
            File
          </button>
          <button type="button" className={focusRing}>
            Edit
          </button>
          <button type="button" className={focusRing}>
            View
          </button>
          <button type="button" className={focusRing}>
            Help
          </button>
        </nav>

        <div className="ml-auto flex items-center gap-2 text-green-400 font-bold">
          <span className="w-3 h-3 rounded-full bg-green-500" />
          Device Ready
        </div>
      </header>

      <section className="h-14 border-b border-white/10 flex items-center gap-5 px-5 text-white/70">
        <ToolbarButton icon={<FilePlus />} label="New" shortcut="Ctrl + N" />
        <ToolbarButton icon={<Save />} label="Save" shortcut="Ctrl + S" />
        <ToolbarButton icon={<Printer />} label="Print" shortcut="Ctrl + P" />
        <div className="h-6 border-l border-white/10" />
        <ToolbarButton icon={<Scissors />} label="Cut" shortcut="Ctrl + X" />
        <ToolbarButton icon={<Copy />} label="Copy" shortcut="Ctrl + C" />
        <ToolbarButton icon={<Undo2 />} label="Undo" shortcut="Ctrl + Z" />
        <ToolbarButton icon={<Redo2 />} label="Redo" shortcut="Ctrl + Y" />
      </section>

      <div className="flex flex-1 min-h-0">
        <aside className="w-[360px] border-r border-[#FFD600]/20 overflow-auto">
          <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
            <h2 className="text-sm tracking-[0.25em] text-white/60 font-bold">
              RECENT MESSAGES
            </h2>
            <span className="bg-[#FFD600] text-black rounded-md px-3 py-1 font-bold">7</span>
          </div>

          <div role="listbox" aria-label="Recent messages">
            {recentMessages.map((item, index) => (
              <button
                type="button"
                key={item.name}
                onClick={() => setSelectedIndex(index)}
                className={`w-full flex items-center gap-4 px-5 py-4 text-left border-b border-white/5 ${focusRing} ${
                  selectedIndex === index
                    ? "bg-blue-600/20 border-l-4 border-l-blue-500"
                    : "hover:bg-white/5 border-l-4 border-l-transparent"
                }`}
              >
                <User className="w-4 h-4 text-white/30" aria-hidden />
                <span className="flex-1 min-w-0">
                  <span className="block font-bold text-[#FFD600] truncate">{item.name}</span>
                  <span className="block text-sm text-white/45 truncate">{item.preview}</span>
                </span>
                <span className="text-xs text-white/40">{item.time}</span>
              </button>
            ))}
          </div>

          <div className="p-5">
            <button
              type="button"
              onClick={() => {
                setMessage("");
                setSeconds(0);
                setIsRecording(false);
                setAnnouncement("New message started");
              }}
              className={`w-full border border-[#FFD600]/40 text-[#FFD600] rounded-lg py-3 font-bold hover:bg-[#FFD600]/10 ${focusRing}`}
            >
              + New Message
            </button>
          </div>
        </aside>

        <main className="flex-1 flex flex-col min-w-0">
          <div className="h-16 border-b border-white/10 px-8 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Mic className="w-5 h-5 text-[#FFD600]" aria-hidden />
              <h1 className="text-xl font-bold">Record Message</h1>
            </div>
            <div className="text-white/45">Thu, Jul 2, 2026</div>
          </div>

          <div className="h-16 border-b border-white/10 px-8 flex items-center gap-4">
            <span className="text-white/50 tracking-widest text-sm">TO:</span>
            <span className="text-lg font-semibold">{recentMessages[selectedIndex].name}</span>
          </div>

          <section className="flex-1 p-8 flex flex-col">
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              aria-label="Message text"
              className={`flex-1 w-full resize-none bg-transparent text-[#FFD600] text-5xl leading-relaxed font-mono outline-none placeholder:text-[#FFD600]/30 ${focusRing}`}
              placeholder="Record or type message here..."
            />

            <div className="text-right text-white/35 text-sm">{message.length} chars</div>
          </section>

          <div className="h-32 border-t border-white/10 px-8 flex items-center justify-between">
            <div className="flex items-center gap-5">
              <span className="flex items-center gap-2 text-white/55">
                <span
                  className={`w-3 h-3 rounded-full ${
                    isRecording ? "bg-red-500 animate-pulse" : "bg-white/20"
                  }`}
                />
                {isRecording ? "Recording" : "Ready"}
              </span>

              <span className="px-4 py-2 rounded-lg border border-white/15 font-mono text-white/70">
                {formattedTime}
              </span>
            </div>

            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  setIsRecording(true);
                  setAnnouncement("Recording started");
                }}
                className={`px-8 py-4 rounded-xl bg-blue-600 text-white font-bold flex items-center gap-3 shadow-lg shadow-blue-900/30 ${focusRing}`}
              >
                <Mic className="w-5 h-5" aria-hidden />
                Start Recording
                <kbd className="ml-2 px-2 py-1 rounded bg-white/15 text-sm">Ctrl+R</kbd>
              </button>

              <button
                type="button"
                disabled={!isRecording}
                onClick={() => {
                  setIsRecording(false);
                  setAnnouncement("Recording stopped");
                }}
                className={`px-8 py-4 rounded-xl border border-white/15 font-bold disabled:opacity-40 disabled:cursor-not-allowed ${focusRing}`}
              >
                Stop Recording
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsRecording(false);
                  setAnnouncement("Message sent");
                }}
                className={`px-8 py-4 rounded-xl bg-green-700 text-white font-bold flex items-center gap-3 ${focusRing}`}
              >
                <Send className="w-5 h-5" aria-hidden />
                Send
                <kbd className="ml-2 px-2 py-1 rounded bg-white/15 text-sm">Ctrl+S</kbd>
              </button>

              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setSeconds(0);
                  setIsRecording(false);
                  setAnnouncement("Message cleared");
                }}
                className={`px-8 py-4 rounded-xl border border-white/15 text-white/70 font-bold flex items-center gap-3 hover:bg-white/5 ${focusRing}`}
              >
                <Trash2 className="w-5 h-5" aria-hidden />
                Clear
                <kbd className="ml-2 px-2 py-1 rounded bg-white/10 text-sm">Esc</kbd>
              </button>
            </div>

            <div className="hidden xl:flex items-center gap-1 text-[#FFD600]/60" aria-hidden>
              <span className="w-1 h-4 bg-[#FFD600]/30 rounded" />
              <span className="w-1 h-7 bg-[#FFD600]/50 rounded" />
              <span className="w-1 h-5 bg-[#FFD600]/30 rounded" />
              <span className="w-1 h-8 bg-[#FFD600]/70 rounded" />
              <span className="w-1 h-3 bg-[#FFD600]/30 rounded" />
              <span className="w-1 h-6 bg-[#FFD600]/50 rounded" />
            </div>
          </div>
        </main>
      </div>

      <footer className="border-t border-[#FFD600]/30 px-5 py-3 flex items-center gap-6 text-sm text-white/70">
        <Keyboard className="w-5 h-5 text-[#FFD600]" aria-hidden />
        <strong className="text-[#FFD600]">Keyboard Shortcuts</strong>
        <span>Ctrl+N New</span>
        <span>Ctrl+R Record</span>
        <span>Ctrl+S Send</span>
        <span>↑↓ Navigate Messages</span>
        <span>Tab / Shift+Tab Move Focus</span>
        <span>Esc Stop or Home</span>
        <span>Alt+H Home</span>
      </footer>
    </div>
  );
}

function ToolbarButton({
  icon,
  label,
  shortcut,
}: {
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}) {
  return (
    <button
      type="button"
      className={`flex items-center gap-2 hover:text-[#FFD600] ${focusRing}`}
    >
      <span className="text-[#FFD600] [&>svg]:w-4 [&>svg]:h-4">{icon}</span>
      <span>{label}</span>
      <kbd className="ml-1 px-2 py-0.5 rounded bg-white/10 border border-white/15 text-xs">
        {shortcut}
      </kbd>
    </button>
  );
}