import React, { useState, useRef, useEffect } from "react";
import { AlertTriangle, Check, X } from "lucide-react";

interface EmergencyProps {
  onClose: () => void;
}

export default function Emergency({ onClose }: EmergencyProps) {
  const [isSent, setIsSent] = useState(false);
  const [sliderPos, setSliderPos] = useState(0); // tracks value from 0 to 100
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Tracks dragging position across the custom slider track boundary
  const handleMove = (clientX: number) => {
    if (!isDragging.current || !trackRef.current || isSent) return;
    const track = trackRef.current.getBoundingClientRect();
    const maxOffset = track.width - 76; // track width minus knob diameter (68px + 8px padding)
    const relativeX = clientX - track.left - 38; // centers pointer focus inside the thumb knob
    
    const percentage = Math.max(0, Math.min(100, (relativeX / maxOffset) * 100));
    setSliderPos(percentage);

    // If slid over 98%, trigger transmission view
    if (percentage >= 98) {
      setIsSent(true);
      setSliderPos(100);
      isDragging.current = false;
    }
  };

  useEffect(() => {
    const handleMouseUp = () => {
      isDragging.current = false;
      if (!isSent && sliderPos < 98) {
        setSliderPos(0); // Snap back to start if let go prematurely
      }
    };
    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [sliderPos, isSent]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-6 select-none animate-fade-in">
      {/* 
        Modal Viewframe Main Core Box Container 
        - role="dialog" & aria-modal="true" resolve the 'region' issues.
        - aria-labelledby dynamically labels the region via the contextual h1 title.
      */}
      <div 
        role="dialog" 
        aria-modal="true"
        aria-labelledby="modal-heading"
        className="w-full max-w-[850px] bg-[#0a0a0a] border border-[#ff3333]/30 rounded-[24px] flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(255,0,0,0.15)]"
      >
        
        {/* Top Accent Danger Border Line */}
        <div className={`h-1.5 w-full transition-colors duration-500 ${isSent ? "bg-emerald-500" : "bg-[#ff3b30]"}`} />

        {/* Modal Header Panel */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="text-[#FFD600] font-bold text-lg tracking-wide">Care Connect Hearing</div>
          <div className="flex items-center gap-3">
            <span className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded border ${
              isSent ? "border-emerald-500/20 bg-emerald-950/30 text-emerald-400" : "border-red-500/20 bg-red-950/30 text-red-400"
            }`}>
              {isSent ? "Emergency Active" : "Emergency Mode"}
            </span>
            {/* Added aria-label to clear 'button-name' compliance audit */}
            <button 
              onClick={onClose} 
              aria-label="Close emergency panel"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10"
            >
              <X className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>

        {/* Central Display Block Frame Row */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-12 max-w-2xl mx-auto min-h-[480px]">
          {!isSent ? (
            /* ──────────────── PRE-CONFIRMATION UI ──────────────── */
            <>
              <div className="w-20 h-20 rounded-full border border-red-500/30 bg-red-950/10 flex items-center justify-center text-red-500 mb-6">
                <AlertTriangle className="w-9 h-9" />
              </div>

              <h1 id="modal-heading" className="text-[40px] font-black text-[#FFD600] leading-tight mb-4 tracking-tight">
                Send Emergency Alert?
              </h1>
              <p className="text-xl text-white/70 leading-relaxed mb-6">
                Emergency contacts and local services will be notified immediately with your location.
              </p>

              <div className="flex items-center gap-2 bg-[#d4af37]/5 border border-[#d4af37]/30 text-[#FFD600] font-bold tracking-widest text-xs uppercase px-4 py-2 rounded-lg mb-10">
                <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-ping" />
                Awaiting Confirmation
              </div>

              <span className="text-xs font-bold tracking-[0.2em] text-white/70 uppercase mb-3">
                DRAG TO ACTIVATE SOS
              </span>

              {/* Slider Track Wrapper */}
              <div ref={trackRef} className="w-full h-[76px] bg-red-950/20 border border-red-500/40 rounded-full relative p-1 flex items-center overflow-hidden mb-3">
                {/* Drag Handle Button */}
                <div 
                  onMouseDown={() => { isDragging.current = true; }}
                  style={{ transform: `translateX(${sliderPos * 6.74}px)` }}
                  className="w-[68px] h-[68px] bg-[#FFD600] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-transform duration-75 ease-out z-10"
                >
                  <span className="font-mono text-black font-extrabold text-xl tracking-tighter select-none" aria-hidden="true">❯❯❯</span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full">
                  <span className="text-lg font-bold text-white tracking-wide">Slide right to send SOS</span>
                </div>
              </div>

              {/* Slider Meta Tracking Information Row */}
              <div className="w-full flex justify-between text-xs font-bold text-white/70 tracking-wide px-2 mb-8">
                <span>Hold and drag →</span>
                <span>{Math.round(sliderPos)}%</span>
              </div>

              {/* Cancel Action Row */}
              <button onClick={onClose} className="w-full border-2 border-white/80 hover:border-white text-white font-bold py-4 px-6 rounded-xl hover:bg-white/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-lg">
                <X className="w-5 h-5" /> Cancel Action
              </button>
            </>
          ) : (
            /* ──────────────── POST-TRANSMISSION UI ──────────────── */
            <>
              <div className="w-24 h-24 rounded-full border-2 border-emerald-500 bg-emerald-950/10 flex items-center justify-center text-emerald-400 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.2)]">
                <Check className="w-12 h-12" strokeWidth={2.5} />
              </div>

              <h1 id="modal-heading" className="text-[44px] font-black text-emerald-500 tracking-tight leading-none mb-4">
                SOS Alert Sent
              </h1>
              <p className="text-xl text-white/70 leading-relaxed max-w-md mb-8">
                Emergency services and your contacts have been notified. Help is on the way.
              </p>

              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-bold tracking-wider text-xs uppercase px-5 py-2.5 rounded-lg mb-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CONFIRMED — ALERT TRANSMITTED
              </div>

              {/* Close Button element to leave overlay view */}
              <button onClick={onClose} className="border border-white/20 hover:border-white/40 text-white/90 font-medium text-base py-3 px-12 rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all">
                Close
              </button>
            </>
          )}
        </div>

        {/* 
          Modal Accessibility Status Bar Footer
          - Kept as a generic <div> structure block to avoid duplicate contentinfo / unique landmark validation errors.
        */}
        <div className="p-4 bg-black border-t border-white/5 flex items-center justify-between text-xs text-white/70 font-medium px-6 select-none">
          <span>WCAG 2.1 AA · High-contrast mode</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-white/40" /> GPS</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Connected</span>
          </div>
        </div>

      </div>
    </div>
  );
}