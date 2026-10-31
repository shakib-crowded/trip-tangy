import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function FrequentlyAskedQuestions() {
  const questions = [
    {
      question: "Where can I see what a holiday package includes?",
      answer:
        "Open a package to review its itinerary, inclusions, exclusions, duration, and price before making a decision.",
    },
    {
      question: "Can I ask about a trip before booking?",
      answer:
        "Yes. Visit our contact page to send the Trip Tangy team your question and travel details.",
    },
    {
      question: "Are flights included in holiday packages?",
      answer:
        "Package inclusions vary. Check the inclusions and exclusions listed on each package page for the details of that trip.",
    },
  ];

  return (
    <section className="bg-[#f7f4ef] px-5 py-16 sm:px-8 lg:py-20">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-secondary">
            Good to know
          </p>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            A few helpful answers
          </h2>
          <p className="mt-3 max-w-md text-sm leading-6 text-gray-600 sm:text-base">
            Have something else in mind? We&apos;re happy to help you find the
            right information.
          </p>
          <Link
            href="/contact"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:text-secondary"
          >
            Contact our team{" "}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="divide-y divide-gray-200 rounded-2xl border border-gray-200 bg-white px-5 sm:px-7">
          {questions.map(({ question, answer }) => (
            <details key={question} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-left text-sm font-semibold text-primary marker:hidden">
                {question}
                <span className="text-xl font-normal text-secondary transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 max-w-2xl pr-8 text-sm leading-6 text-gray-600">
                {answer}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}