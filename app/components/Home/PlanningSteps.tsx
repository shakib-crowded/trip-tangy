import { Check, Compass, Headphones } from "lucide-react";

export default function PlanningSteps() {
  const steps = [
    {
      number: "01",
      title: "Find your inspiration",
      description:
        "Browse destinations, stays, and holiday packages to see what feels right.",
      icon: Compass,
    },
    {
      number: "02",
      title: "Compare the details",
      description:
        "Review package prices, itineraries, inclusions, and exclusions before you decide.",
      icon: Check,
    },
    {
      number: "03",
      title: "Ask us a question",
      description:
        "Need help with your plans? Get in touch with the Trip Tangy team.",
      icon: Headphones,
    },
  ];

  return (
    <section className="bg-white px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Your next trip, made clearer
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            From first idea to feeling ready
          </h2>
          <p className="mt-3 text-sm leading-6 text-gray-600 sm:text-base">
            A little inspiration, the details that matter, and a real person to
            ask when you need one.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map(({ number, title, description, icon: Icon }) => (
            <article
              key={number}
              className="rounded-2xl border border-gray-100 bg-[#fbfaf8] p-6 sm:p-7"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-primary shadow-sm">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </span>
                <span className="text-sm font-semibold tracking-widest text-gray-300">
                  {number}
                </span>
              </div>
              <h3 className="mt-6 text-lg font-semibold text-primary">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-6 text-gray-500">
                {description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
