import Image from "next/image";

export default function FlightsWithTT() {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/images/flight_discounts_banner.png"
            alt="Flight Dicount Banner"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
            width="1500"
            height="1000"
          />
        </div>

        {/* Right Side - Heading and Paragraph */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Flights with <span className="text-secondary">Trip Tangy</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Book cheap flights with Trip Tangy and experience a smarter way to
            travel. Whether you&apos;re searching for low-cost domestic flights
            across India or the best deals on international airfare, we&apos;ve
            got you covered. We compare hundreds of airlines — including budget
            carriers and premium airlines — to find you the lowest flight fares
            without compromising on comfort or convenience. Need a last-minute
            flight ticket or planning well in advance? Our travel experts are
            available to assist you every step of the way, from seat selection
            to baggage guidance. At Trip Tangy, booking your next flight is not
            just fast and affordable — it&apos;s completely hassle-free.
          </p>
        </div>
      </div>
    </section>
  );
}
