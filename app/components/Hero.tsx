"use client";

type IconProps = { className?: string };

export function Hero() {
  return (
    <section
      className={`relative overflow-hidden bg-primary font-(family-name:--font-body)`}
    >
      {/* ---------- Background: dusk sky sinking into the sea ---------- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-primary) 0%, var(--color-primary) 38%, var(--color-ocean) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Sun glow, low on the horizon */}
      <div
        className="sun-glow absolute right-[6%] top-[46%] h-64 w-64 rounded-full bg-sun/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute right-[11%] top-[50%] h-20 w-20 rounded-full"
        style={{
          background: "linear-gradient(135deg, var(--color-sun), var(--color-secondary))",
          boxShadow: "0 0 70px 12px rgba(255,200,61,0.45)",
        }}
        aria-hidden="true"
      />

      {/* Shoreline */}
      <div className="absolute inset-x-0 bottom-0 text-island" aria-hidden="true">
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="h-20 w-full sm:h-28 lg:h-36"
        >
          <path
            fill="currentColor"
            d="M0,96 C240,150 480,20 720,52 C960,84 1200,142 1440,88 L1440,180 L0,180 Z"
          />
        </svg>
        <svg
          viewBox="0 0 1440 180"
          preserveAspectRatio="none"
          className="absolute inset-x-0 top-0 -mt-0.5 h-20 w-full text-ocean-light/40 sm:h-28 lg:h-36"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            d="M0,96 C240,150 480,20 720,52 C960,84 1200,142 1440,88"
          />
        </svg>
      </div>

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 px-6 py-24 sm:py-28 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:px-10 lg:py-32">
        {/* Left: message + product entry points */}
        <div>
          <p
            className="fade-up mb-5 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-ocean-light"
            style={{ animationDelay: "0.05s" }}
          >
            Made for how India travels
          </p>

          <h1
            className="fade-up font-(family-name:--font-display) text-[2.6rem] font-semibold leading-[1.05] text-white sm:text-6xl lg:text-[4rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Your next trip,
            <br />
            <span className="text-secondary">with a little tang.</span>
          </h1>

          <p
            className="fade-up mt-6 max-w-md text-lg text-white/75"
            style={{ animationDelay: "0.25s" }}
          >
            Flights, hotels and holiday packages — planned fast, priced fair,
            and picked with taste.
          </p>
        </div>

        {/* Right: signature visual — a boarding pass, not a chat bubble */}
        <div className="relative hidden lg:block">
          <svg
            className="pointer-events-none absolute -left-20 top-[28%] h-40 w-72"
            viewBox="0 0 280 160"
            fill="none"
            aria-hidden="true"
          >
            <path
              className="flight-path"
              d="M4 138C64 42 148 8 264 18"
              stroke="var(--color-ocean-light)"
              strokeWidth="2"
              strokeDasharray="6 9"
              strokeLinecap="round"
            />
          </svg>

          <div
            className="boarding-pass-card mx-auto w-75 rounded-[28px] bg-white p-6"
            style={{ boxShadow: "0 30px 60px -15px rgba(10,42,107,0.5)" }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-[0.15em] text-primary">
                Trip Tangy
              </span>
              <PlaneIcon className="h-4 w-4 rotate-45 text-secondary" />
            </div>

            <div className="mt-6 flex items-center justify-between">
              <div>
                <p className="font-(family-name:--font-display) text-2xl font-bold text-primary">
                  DEL
                </p>
                <p className="text-[11px] text-primary/50">Delhi</p>
              </div>
              <div className="relative mx-3 h-px flex-1 border-t-2 border-dashed border-ocean/40">
                <PlaneIcon className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-90 text-ocean" />
              </div>
              <div className="text-right">
                <p className="font-(family-name:--font-display) text-2xl font-bold text-primary">
                  GOI
                </p>
                <p className="text-[11px] text-primary/50">Goa</p>
              </div>
            </div>

            <div className="my-5 border-t border-dashed border-primary/15" />

            <div className="grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-[10px] uppercase text-primary/40">Dep</p>
                <p className="text-xs font-semibold text-primary">06:45</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-primary/40">Arr</p>
                <p className="text-xs font-semibold text-primary">08:55</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-primary/40">Gate</p>
                <p className="text-xs font-semibold text-primary">12</p>
              </div>
              <div>
                <p className="text-[10px] uppercase text-primary/40">Seat</p>
                <p className="text-xs font-semibold text-primary">14A</p>
              </div>
            </div>

            <div
              className="mt-5 h-6 w-full rounded-sm opacity-70"
              style={{
                background:
                  "repeating-linear-gradient(90deg, var(--color-primary) 0px, var(--color-primary) 2px, transparent 2px, transparent 5px)",
              }}
              aria-hidden="true"
            />
          </div>
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

        .flight-path {
          stroke-dashoffset: 420;
          animation: draw 2.2s ease-out 0.5s forwards;
        }
        @keyframes draw {
          to {
            stroke-dashoffset: 0;
          }
        }

        .boarding-pass-card {
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

        .sun-glow {
          animation: pulse 4.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.85;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up,
          .flight-path,
          .boarding-pass-card,
          .sun-glow {
            animation: none !important;
            opacity: 1 !important;
            stroke-dashoffset: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------- Inline icons (kept local so this file has no extra deps) ---------- */

function PlaneIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M21 3 3 10.5l7.5 3L13.5 21 21 3Z" />
      <path d="M10.5 13.5 21 3" />
    </svg>
  );
}