import Link from "next/link";
import { Building2, Palmtree } from "lucide-react";

type TravelModeSwitchProps = {
  activeMode?: "hotels" | "holidays";
};

const modes = [
  { href: "/hotels", label: "Hotels", mode: "hotels", icon: Building2 },
  { href: "/holidays", label: "Holidays", mode: "holidays", icon: Palmtree },
] as const;

export default function TravelModeSwitch({
  activeMode,
}: TravelModeSwitchProps) {
  return (
    <nav
      aria-label="Choose hotels or holidays"
      className="mb-8 inline-flex rounded-2xl border border-white/20 bg-white/10 p-1.5 shadow-lg shadow-black/10 backdrop-blur-xl"
    >
      {modes.map(({ href, label, mode, icon: Icon }) => {
        const isActive = activeMode === mode;

        return (
          <Link
            key={mode}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={`group inline-flex min-h-12 items-center gap-2.5 rounded-xl px-4 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:px-5 ${
              isActive
                ? "bg-white text-primary shadow-md shadow-black/10"
                : "text-white/80 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon
              aria-hidden="true"
              className={`h-4 w-4 transition-colors ${
                isActive
                  ? "text-secondary"
                  : "text-white/70 group-hover:text-white"
              }`}
            />
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
