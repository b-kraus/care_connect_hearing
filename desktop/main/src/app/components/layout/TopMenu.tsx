const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:ring-offset-black";

export default function TopMenu() {
  return (
    <header className="bg-black text-white">
      <div className="h-12 border-b border-[#FFD600]/30 flex items-center justify-between px-6">
        <div className="font-semibold">CareConnect Hearing</div>
        <div className="text-sm text-white/60">Device Ready</div>
      </div>

      <nav
        className="h-10 border-b border-[#FFD600]/20 flex items-center gap-8 px-6 text-sm"
        aria-label="Application menu"
      >
        <button className={`hover:text-[#FFD600] ${focusRing}`}>File</button>
        <button className={`hover:text-[#FFD600] ${focusRing}`}>Edit</button>
        <button className={`hover:text-[#FFD600] ${focusRing}`}>View</button>
        <button className={`hover:text-[#FFD600] ${focusRing}`}>Accessibility</button>
        <button className={`hover:text-[#FFD600] ${focusRing}`}>Help</button>
      </nav>
    </header>
  );
}