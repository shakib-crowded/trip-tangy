export default function HotelsHero() {
  return (
    <section
      className={`relative overflow-hidden bg-primary font-(family-name:--font-body)`}
    >
      {/* ---------- Background: dusk sky settling into a lit-up city ---------- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary) 42%, var(--color-island) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="glow absolute left-[8%] top-[18%] h-72 w-72 rounded-full bg-ocean/30 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="glow absolute right-[14%] top-[8%] h-56 w-56 rounded-full bg-sun/20 blur-3xl"
        aria-hidden="true"
        style={{ animationDelay: "1.2s" }}
      />

      {/* City skyline, lights on */}
      <SkylineGraphic />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10 lg:py-32">
        {/* Left: message + search - now centered */}
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="fade-up font-(family-name:--font-display) text-[2.5rem] font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.6rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Just tell us where.
            <br />
            <span className="text-secondary">We&rsquo;ll sort the stay.</span>
          </h1>

          <p
            className="fade-up mx-auto mt-6 max-w-md text-lg text-white/75"
            style={{ animationDelay: "0.25s" }}
          >
            Search by hotel name, city or neighbourhood. Dates and room details
            come right after you&rsquo;ve found the one.
          </p>

          {/* Single-field search — name / location / keyword only */}
          <form
            action="/hotels/results"
            method="GET"
            className="fade-up mt-8"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-[0_20px_45px_-15px_rgba(10,42,107,0.55)] sm:flex-row sm:items-center sm:rounded-full">
              <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                <SearchIcon className="h-5 w-5 shrink-0 text-primary/40" />
                <input
                  type="text"
                  name="q"
                  placeholder="Enter a destination or hotel name"
                  className="w-full bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none sm:text-base"
                  aria-label="Hotel name, city or landmark"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
              >
                Search hotels
                <ArrowIcon className="h-4 w-4" />
              </button>
            </div>
          </form>
        </div>
      </div>

      <style jsx>{`
        .fade-up {
          animation: fadeUp 0.7s ease-out both;
        }
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .keycard {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-2deg);
          }
          50% {
            transform: translateY(-14px) rotate(1deg);
          }
        }

        .tap-pulse::before {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 9999px;
          border: 1.5px solid var(--color-sun);
          opacity: 0;
          animation: tap 2.6s ease-out infinite;
        }
        @keyframes tap {
          0% {
            opacity: 0.6;
            transform: scale(0.7);
          }
          70% {
            opacity: 0;
            transform: scale(1.5);
          }
          100% {
            opacity: 0;
            transform: scale(1.5);
          }
        }

        .glow {
          animation: pulse 5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 0.9;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up,
          .keycard,
          .tap-pulse::before,
          .glow {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------- Skyline graphic (bottom of hero) ---------- */

function SkylineGraphic() {
  // Deterministic building + window layout so SSR output never varies.
  const buildings = [
    { x: 0, w: 140, h: 90, lit: [10, 40, 25, 60] },
    { x: 150, w: 90, h: 130, lit: [15, 45, 75, 30, 95] },
    { x: 250, w: 160, h: 70, lit: [20, 55, 90] },
    { x: 420, w: 110, h: 150, lit: [10, 35, 65, 100, 125] },
    { x: 540, w: 130, h: 100, lit: [18, 48, 78] },
    { x: 680, w: 95, h: 170, lit: [12, 40, 70, 100, 140] },
    { x: 785, w: 150, h: 85, lit: [22, 52] },
    { x: 945, w: 120, h: 140, lit: [14, 44, 74, 104] },
    { x: 1075, w: 100, h: 105, lit: [16, 46, 76] },
    { x: 1185, w: 145, h: 160, lit: [10, 38, 66, 94, 122] },
    { x: 1330, w: 110, h: 95, lit: [12, 42, 72] },
  ];

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-1 text-primary/90"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="h-28 w-full sm:h-36 lg:h-44"
      >
        {buildings.map((b, i) => (
          <g key={i}>
            <rect
              x={b.x}
              y={200 - b.h}
              width={b.w}
              height={b.h}
              fill="currentColor"
            />
            {b.lit.map((offset, j) => (
              <rect
                key={j}
                x={b.x + 14 + (j % 3) * 22}
                y={200 - b.h + offset}
                width="9"
                height="12"
                className={j % 4 === 0 ? "window-blink" : undefined}
                fill={
                  j % 3 === 0
                    ? "var(--color-sun)"
                    : j % 3 === 1
                      ? "var(--color-secondary)"
                      : "var(--color-ocean-light)"
                }
                opacity={0.85}
              />
            ))}
          </g>
        ))}
      </svg>
      <style jsx>{`
        .window-blink {
          animation: blink 3.4s ease-in-out infinite;
        }
        @keyframes blink {
          0%,
          100% {
            opacity: 0.85;
          }
          50% {
            opacity: 0.25;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .window-blink {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Inline icons (kept local so this file has no extra deps) ---------- */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
