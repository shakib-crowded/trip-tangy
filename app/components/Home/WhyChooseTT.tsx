import Image from "next/image";

export default function WhyChooseTT() {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        <div className="w-full md:w-1/2">
          <Image
            src="/images/why_choose_tt.png"
            alt="Travel destination"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
            width="1500"
            height="1000"
          />
        </div>

        {/* Right Side - Heading and Paragraph */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Why Choose <span className="text-secondary">Trip Tangy</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Trip Tangy is one of India&apos;s fastest-growing travel agencies,
            offering affordable flight tickets, luxury hotel bookings,
            customized holiday packages — both domestic and international —
            along with expert Visa Assistance and comprehensive Travel
            Insurance. Unlike typical travel agencies that treat every client as
            just another booking, we believe in building lasting relationships.
            Whether you&apos;re flying from Delhi to Mumbai or planning a dream
            vacation abroad, you&apos;ll always be our first priority. Because
            travel isn&apos;t just about getting from one place to another —
            it&apos;s about creating experiences that stay with you forever. At
            Trip Tangy, we make sure every journey is one worth remembering.
          </p>
        </div>
      </div>
    </section>
  );
}
