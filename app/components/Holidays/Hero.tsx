"use client"
export default function HolidaysHero() {
  return (
    <section
      className={`relative overflow-hidden bg-primary font-(family-name:--font-body)`}
    >
      {/* ---------- Background: dusk sky melting into a sunset ---------- */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, var(--color-primary) 0%, var(--color-ocean) 58%, var(--color-secondary) 100%)",
        }}
        aria-hidden="true"
      />
      <div
        className="glow absolute bottom-[6%] right-[18%] h-72 w-72 rounded-full bg-sun/60 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="glow absolute bottom-[10%] right-[22%] h-24 w-24 rounded-full"
        style={{
          background:
            "linear-gradient(135deg, var(--color-sun), var(--color-secondary))",
          boxShadow: "0 0 70px 14px rgba(255,138,0,0.4)",
          animationDelay: "0.8s",
        }}
        aria-hidden="true"
      />

      {/* Dusk sparkles, upper sky */}
      <SparkleField />

      {/* Palm-lined horizon */}
      <PalmSilhouetteRow />

      {/* ---------- Content ---------- */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 py-24 sm:py-28 lg:px-10 lg:py-32">
        <div className="mx-auto max-w-3xl text-center">
          <h1
            className="fade-up font-(family-name:--font-display) text-[2.5rem] font-semibold leading-[1.08] text-white sm:text-5xl lg:text-[3.6rem]"
            style={{ animationDelay: "0.15s" }}
          >
            Tell us the vibe,
            <br />
            <span className="text-secondary">we&rsquo;ll plan the trip.</span>
          </h1>

          <p
            className="fade-up mx-auto mt-6 max-w-md text-lg text-white/75"
            style={{ animationDelay: "0.25s" }}
          >
            Beaches, mountains, honeymoons or family trips — share where
            you&rsquo;re dreaming of and a Trip Tangy expert puts together a
            package that fits.
          </p>

          <form
            action="/holidays/search"
            method="GET"
            className="fade-up mt-8"
            style={{ animationDelay: "0.35s" }}
          >
            <div className="flex flex-col gap-3 rounded-2xl bg-white p-2 shadow-[0_20px_45px_-15px_rgba(10,42,107,0.55)] sm:flex-row sm:items-center sm:rounded-full">
              <div className="flex flex-1 items-center gap-3 px-4 py-2.5">
                <CompassIcon className="h-5 w-5 shrink-0 text-primary/40" />
                <input
                  type="text"
                  name="destination"
                  placeholder="Bali, Kashmir, Europe... or &lsquo;somewhere with mountains&rsquo;"
                  className="w-full bg-transparent text-sm text-primary placeholder:text-primary/40 focus:outline-none sm:text-base"
                  aria-label="Where are you dreaming of going?"
                />
              </div>
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-secondary px-6 py-3 text-sm font-semibold text-white transition hover:bg-secondary/90"
              >
                Get my itinerary
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

        .postcard {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-3deg);
          }
          50% {
            transform: translateY(-14px) rotate(1deg);
          }
        }

        .glow {
          animation: pulse 5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%,
          100% {
            opacity: 0.55;
          }
          50% {
            opacity: 0.9;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .fade-up,
          .postcard,
          .glow {
            animation: none !important;
            opacity: 1 !important;
          }
        }
      `}</style>
    </section>
  );
}

/* ---------- Decorative sky + horizon graphics ---------- */

function SparkleField() {
  const sparkles = [
    { x: "14%", y: "18%", size: 10, delay: "0s" },
    { x: "34%", y: "10%", size: 7, delay: "0.9s" },
    { x: "58%", y: "22%", size: 8, delay: "1.6s" },
    { x: "78%", y: "14%", size: 6, delay: "0.5s" },
  ];
  return (
    <div
      className="pointer-events-none absolute inset-0 z-1"
      aria-hidden="true"
    >
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="twinkle absolute text-sun/70"
          style={{
            left: s.x,
            top: s.y,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
          }}
        >
          <SparkleIcon className="h-full w-full" />
        </span>
      ))}
      <style jsx>{`
        .twinkle {
          animation: twinkle 3.2s ease-in-out infinite;
        }
        @keyframes twinkle {
          0%,
          100% {
            opacity: 0.25;
            transform: scale(0.85);
          }
          50% {
            opacity: 0.9;
            transform: scale(1.1);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .twinkle {
            animation: none !important;
            opacity: 0.6 !important;
          }
        }
      `}</style>
    </div>
  );
}

function PalmSilhouetteRow() {
  // Deterministic placement so SSR output never varies between renders.
  const palms = [
    { x: 60, s: 1.1, delay: "0s" },
    { x: 220, s: 0.8, delay: "0.6s" },
    { x: 430, s: 1.3, delay: "0.3s" },
    { x: 640, s: 0.9, delay: "0.9s" },
    { x: 900, s: 1.15, delay: "0.2s" },
    { x: 1120, s: 0.85, delay: "0.7s" },
    { x: 1320, s: 1.05, delay: "0.5s" },
  ];

  return (
    <div
      className="absolute inset-x-0 bottom-0 z-1 text-primary"
      aria-hidden="true"
    >
      <svg
        viewBox="0 0 1440 220"
        preserveAspectRatio="none"
        className="h-24 w-full sm:h-32 lg:h-40"
      >
        {palms.map((p, i) => (
          <g key={i} transform={`translate(${p.x} 200) scale(${p.s})`}>
            <g className="palm-sway" style={{ animationDelay: p.delay }}>
              <path
                d="M0 0 C-4 -30 2 -55 -2 -80"
                stroke="currentColor"
                strokeWidth="6"
                fill="none"
                strokeLinecap="round"
              />
              <g transform="translate(-2 -80)">
                <path
                  d="M0 0 C-25 -10 -45 2 -55 -14"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M0 0 C-15 -22 -10 -40 -22 -52"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M0 0 C10 -22 6 -40 18 -52"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
                <path
                  d="M0 0 C25 -10 45 2 55 -14"
                  stroke="currentColor"
                  strokeWidth="5"
                  fill="none"
                  strokeLinecap="round"
                />
              </g>
            </g>
          </g>
        ))}
      </svg>
      <style jsx>{`
        .palm-sway {
          transform-origin: 0px 0px;
          animation: sway 4.5s ease-in-out infinite;
        }
        @keyframes sway {
          0%,
          100% {
            transform: rotate(-2deg);
          }
          50% {
            transform: rotate(2deg);
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .palm-sway {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
}

/* ---------- Inline icons (kept local so this file has no extra deps) ---------- */

function CompassIcon({ className }: { className?: string }) {
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
      <circle cx="12" cy="12" r="9" />
      <path d="m14.5 9.5-2 5-3 1.5 2-5 3-1.5Z" />
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

function SparkleIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2l1.8 6.2L20 10l-6.2 1.8L12 18l-1.8-6.2L4 10l6.2-1.8L12 2Z" />
    </svg>
  );
}