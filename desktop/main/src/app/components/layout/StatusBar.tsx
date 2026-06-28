import { Clock, ShieldCheck } from "lucide-react";

export default function StatusBar() {
  return (
    <footer className="h-10 border-t border-[#FFD600]/30 bg-black text-white px-8 flex items-center justify-between text-sm">
      <div className="flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-[#FFD600]" />
        <span>All systems normal</span>
      </div>

      <div className="flex items-center gap-2 text-white/70">
        <Clock className="w-4 h-4" />
        <span>{new Date().toLocaleTimeString()}</span>
      </div>
    </footer>
  );
}