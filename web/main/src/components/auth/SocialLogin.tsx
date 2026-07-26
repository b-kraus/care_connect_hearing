import type { LucideIcon } from "lucide-react";

type SocialLoginProps = {
  icon: LucideIcon;
  provider: string;
  onClick?: () => void;
};

function SocialLogin({
  icon: Icon,
  provider,
  onClick,
}: SocialLoginProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        flex
        w-full
        items-center
        justify-center
        gap-3
        rounded-full
        border
        border-white/10
        bg-surface
        px-4
        py-3
        text-base
        font-medium
        text-text
        transition-colors
        hover:border-primary
        hover:bg-white/5
        focus-visible:outline
        focus-visible:outline-2
        focus-visible:outline-offset-2
        focus-visible:outline-primary
      "
    >
      <Icon size={20} className="shrink-0" />

      <span>Continue with {provider}</span>
    </button>
  );
}

export default SocialLogin;