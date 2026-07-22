import type { LucideIcon } from "lucide-react";

type DashboardCardProps = {
  title: string;
  description: string;
  status: string;
  icon: LucideIcon;
  onClick: () => void;
  danger?: boolean;
};

export default function DashboardCard({
  title,
  description,
  status,
  icon: Icon,
  onClick,
  danger = false,
}: DashboardCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`${title}. ${status}. ${description}`}
      className={`rounded-2xl border p-6 text-left transition-all hover:scale-[1.01]
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/50
        ${
          danger
            ? "border-red-500/50 bg-red-950/20 hover:bg-red-950/40"
            : "border-primary/30 bg-surface hover:bg-primary/10"
        }`}
    >
      <Icon
        aria-hidden="true"
        className={`mb-4 h-8 w-8 ${
          danger ? "text-red-400" : "text-primary"
        }`}
      />

      <h2 className="mb-1 text-xl font-bold">
        {title}
      </h2>

      <p
        className={`mb-2 text-sm ${
          danger ? "text-red-300" : "text-primary"
        }`}
      >
        {status}
      </p>

      <p className="text-sm text-white/50">
        {description}
      </p>
    </button>
  );
}