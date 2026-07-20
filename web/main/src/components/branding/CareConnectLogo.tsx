import { Ear } from "lucide-react";

import { cn } from "../../lib/utils";

type CareConnectLogoProps = {
  className?: string;
  compact?: boolean;
};

function CareConnectLogo({
  className,
  compact = false,
}: CareConnectLogoProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-3",
        className,
      )}
    >
      <div
        className="
          flex h-11 w-11 shrink-0 items-center justify-center
          rounded-md bg-primary text-black
        "
        aria-hidden="true"
      >
        <Ear size={24} strokeWidth={2.25} />
      </div>

      {!compact && (
        <div className="text-left leading-tight">
          <p className="text-lg font-bold text-text">
            CareConnect
          </p>

          <p className="text-xs font-semibold uppercase tracking-wide text-primary">
            Hearing
          </p>
        </div>
      )}
    </div>
  );
}

export default CareConnectLogo;