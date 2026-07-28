import React, { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AlertTriangle, Check, X, ChevronsRight } from "lucide-react";

interface EmergencyProps {
  onClose?: () => void;
}

export default function Emergency({ onClose }: EmergencyProps) {
  const navigate = useNavigate();
  const [isSent, setIsSent] = useState(false);
  const [sliderPos, setSliderPos] = useState(0); // Tracks percentage 0–100
  
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  // Return to Home action - now explicitly routes to /home
  const handleReturnHome = useCallback(() => {
    if (onClose) {
      onClose();
    } else {
      navigate("/home");
    }
  }, [onClose, navigate]);

  // Handle pointer/touch movement calculations
  const calculateProgress = useCallback((clientX: number) => {
    if (!trackRef.current) return 0;
    const track = trackRef.current.getBoundingClientRect();
    const knobWidth = 68;
    const padding = 8; // 4px padding on each side
    const maxOffset = track.width - knobWidth - padding;
    const relativeX = clientX - track.left - knobWidth / 2;

    const percentage = Math.max(0, Math.min(100, (relativeX / maxOffset) * 100));
    return percentage;
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging.current || isSent) return;
      
      const percentage = calculateProgress(clientX);
      setSliderPos(percentage);

      // Trigger activation threshold at 95%+
      if (percentage >= 95) {
        setIsSent(true);
        setSliderPos(100);
        isDragging.current = false;
      }
    },
    [calculateProgress, isSent]
  );

  // Event Listeners for Mouse and Touch
  useEffect(() => {
    const handleMouseUp = () => {
      if (!isDragging.current) return;
      isDragging.current = false;
      if (!isSent && sliderPos < 95) {
        setSliderPos(0); // Snap back to start if released early
      }
    };

    const handleMouseMove = (e: MouseEvent) => handleMove(e.clientX);
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches[0]) handleMove(e.touches[0].clientX);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchmove", handleTouchMove);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [sliderPos, isSent, handleMove]);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6 select-none animate-in fade-in duration-200">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-heading"
        className="w-full max-w-[850px] bg-[#0a0a0a] border border-red-500/30 rounded-[24px] flex flex-col overflow-hidden relative shadow-[0_0_50px_rgba(255,0,0,0.15)]"
      >
        {/* Top Accent Danger Border Line */}
        <div
          className={`h-1.5 w-full transition-colors duration-500 ${
            isSent ? "bg-emerald-500" : "bg-[#ff3b30]"
          }`}
        />

        {/* Modal Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/5">
          <div className="text-[#FFD600] font-bold text-lg tracking-wide">
            Care Connect Hearing
          </div>
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded border transition-colors ${
                isSent
                  ? "border-emerald-500/20 bg-emerald-950/30 text-emerald-400"
                  : "border-red-500/20 bg-red-950/30 text-red-400"
              }`}
            >
              {isSent ? "Emergency Active" : "Emergency Mode"}
            </span>
            <button
              onClick={handleReturnHome}
              aria-label="Close emergency panel"
              className="p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all border border-white/10 text-white/70 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Main Body */}
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 sm:p-12 max-w-2xl mx-auto min-h-[480px]">
          {!isSent ? (
            /* PRE-CONFIRMATION UI */
            <>
              <div className="w-20 h-20 rounded-full border border-red-500/30 bg-red-950/20 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_20px_rgba(239,68,68,0.2)]">
                <AlertTriangle className="w-9 h-9" />
              </div>

              <h1
                id="modal-heading"
                className="text-3xl sm:text-[40px] font-black text-[#FFD600] leading-tight mb-4 tracking-tight"
              >
                Send Emergency Alert?
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed mb-6">
                Emergency contacts and local services will be notified immediately with your location.
              </p>

              <div className="flex items-center gap-2 bg-[#d4af37]/5 border border-[#d4af37]/30 text-[#FFD600] font-bold tracking-widest text-xs uppercase px-4 py-2 rounded-lg mb-8">
                <span className="w-2 h-2 rounded-full bg-[#FFD600] animate-ping" />
                Awaiting Confirmation
              </div>

              <span className="text-xs font-bold tracking-[0.2em] text-white/60 uppercase mb-3">
                DRAG TO ACTIVATE SOS
              </span>

              {/* Interactive Slider Track */}
              <div
                ref={trackRef}
                className="w-full h-[76px] bg-red-950/20 border border-red-500/40 rounded-full relative p-1 flex items-center overflow-hidden mb-3"
              >
                {/* Active Progress Overlay */}
                <div 
                  className="absolute left-0 top-0 bottom-0 bg-red-600/20 transition-all duration-75 pointer-events-none"
                  style={{ width: `${sliderPos}%` }}
                />

                {/* Drag Handle Button */}
                <div
                  role="slider"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={Math.round(sliderPos)}
                  aria-label="Slide right to send emergency alert"
                  tabIndex={0}
                  onMouseDown={() => { isDragging.current = true; }}
                  onTouchStart={() => { isDragging.current = true; }}
                  style={{
                    transform: `translateX(${(sliderPos / 100) * (trackRef.current ? trackRef.current.clientWidth - 76 : 0)}px)`,
                  }}
                  className="w-[68px] h-[68px] bg-[#FFD600] hover:bg-[#ffe033] rounded-full flex items-center justify-center cursor-grab active:cursor-grabbing shadow-lg transition-transform duration-75 ease-out z-10 touch-none"
                >
                  <ChevronsRight className="w-8 h-8 text-black stroke-[3]" />
                </div>

                {/* Track Label */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full">
                  <span className="text-base sm:text-lg font-bold text-white tracking-wide opacity-90">
                    Slide right to send SOS
                  </span>
                </div>
              </div>

              {/* Slider Meta Tracking */}
              <div className="w-full flex justify-between text-xs font-bold text-white/60 tracking-wide px-2 mb-8">
                <span>Hold and drag →</span>
                <span>{Math.round(sliderPos)}%</span>
              </div>

              {/* Cancel Button */}
              <button
                onClick={handleReturnHome}
                className="w-full border-2 border-white/80 hover:border-white text-white font-bold py-4 px-6 rounded-xl hover:bg-white/10 active:scale-[0.99] transition-all flex items-center justify-center gap-2 text-lg"
              >
                <X className="w-5 h-5" /> Cancel Action
              </button>
            </>
          ) : (
            /* POST-TRANSMISSION UI */
            <>
              <div className="w-24 h-24 rounded-full border-2 border-emerald-500 bg-emerald-950/20 flex items-center justify-center text-emerald-400 mb-8 shadow-[0_0_30px_rgba(16,185,129,0.25)] animate-in zoom-in-75 duration-300">
                <Check className="w-12 h-12" strokeWidth={3} />
              </div>

              <h1
                id="modal-heading"
                className="text-3xl sm:text-[44px] font-black text-emerald-500 tracking-tight leading-none mb-4"
              >
                SOS Alert Sent
              </h1>
              <p className="text-lg sm:text-xl text-white/70 leading-relaxed max-w-md mb-8">
                Emergency services and your contacts have been notified. Help is on the way.
              </p>

              <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 font-bold tracking-wider text-xs uppercase px-5 py-2.5 rounded-lg mb-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                CONFIRMED — ALERT TRANSMITTED
              </div>

              {/* Return Home Button */}
              <button
                onClick={handleReturnHome}
                className="border border-white/20 hover:border-white/40 text-white font-medium text-base py-3.5 px-12 rounded-xl hover:bg-white/5 active:scale-[0.98] transition-all"
              >
                Return to Home
              </button>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-black border-t border-white/5 flex items-center justify-between text-xs text-white/60 font-medium px-6 select-none">
          <span>WCAG 2.1 AA · High-contrast mode</span>
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-white/40" /> GPS
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" /> Connected
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}