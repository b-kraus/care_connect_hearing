import { useState } from "react";
import { Mic, MicOff } from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";

const conversations = [
  { id: 1, from: "Dr. Martinez", preview: "Thursday appointment confirmed", time: "10:42 AM", unread: true },
  { id: 2, from: "Care Support Line", preview: "Your hearing aid order has...", time: "Yesterday", unread: true },
  { id: 3, from: "Mom", preview: "Call me when you get a chance...", time: "Yesterday", unread: false },
  { id: 4, from: "Audiology Clinic", preview: "Follow-up results are ready", time: "Jun 18", unread: false },
];

function Messages() {
  const [listening, setListening] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <DashboardLayout active="messages">
      <h1 className="mb-2 text-4xl font-bold">
        <span className="text-primary">Messages</span>
      </h1>
      <p className="text-white/60 mb-6">
        Speech-to-text conversations for hearing-loss users.
      </p>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h2 className="text-lg font-semibold mb-3">Conversations</h2>
          {conversations.map(c => (
            <button
              key={c.id}
              onClick={() => setSelected(c.id)}
              className={`w-full text-left p-4 rounded-xl transition-all ${
                selected === c.id
                  ? "bg-primary/20 border border-primary"
                  : "bg-surface border border-white/10 hover:bg-primary/10"
              }`}
              aria-label={`Message from ${c.from}`}
            >
              <div className="flex justify-between">
                <span className="font-bold">{c.from}</span>
                <span className="text-white/40 text-xs">{c.time}</span>
              </div>
              <p className="text-white/50 text-sm mt-1">{c.preview}</p>
              {c.unread && <span className="inline-block w-2 h-2 bg-primary rounded-full mt-2" />}
            </button>
          ))}
        </div>
        <div className="lg:col-span-2">
          <div className="bg-surface border border-white/10 rounded-2xl p-8 min-h-[300px] mb-4">
            <p className="text-primary text-2xl leading-relaxed">
              {listening
                ? "Listening... transcribed text will appear here."
                : selected
                  ? "Select a conversation and press Start Listening."
                  : "Select a conversation to view."}
            </p>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className={`w-3 h-3 rounded-full ${listening ? "bg-green-500" : "bg-white/30"}`} />
            <span className="text-white/60 text-sm">{listening ? "Listening..." : "Idle"}</span>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setListening(true)}
              className="flex items-center gap-2 bg-info text-white font-bold px-6 py-3 rounded-xl"
              aria-label="Start listening"
            >
              <Mic className="w-5 h-5" />
              Start Listening
            </button>
            <button
              onClick={() => setListening(false)}
              className="flex items-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-xl"
              aria-label="Stop listening"
            >
              <MicOff className="w-5 h-5" />
              Stop Listening
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Messages;
