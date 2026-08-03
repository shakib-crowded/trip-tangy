import Image from "next/image";

export default function HotelsWithTT() {
  return (
    <section className="py-12 px-4 md:px-8 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8">
        {/* Left Side - Image */}
        <div className="w-full md:w-1/2">
          <Image
            src="/images/hotel_discounts_banner.png"
            alt="Hotel Discounts Banner"
            className="rounded-2xl shadow-lg w-full h-auto object-cover"
            width="1500"
            height="1000"
          />
        </div>

        {/* Right Side - Heading and Paragraph */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Hotels with <span className="text-secondary">Trip Tangy</span>
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed">
            Find and book the perfect hotel with Trip Tangy — from
            budget-friendly stays to 5-star luxury resorts, we have options for
            every traveler and every budget. Whether you&apos;re planning a romantic
            getaway, a family vacation, a corporate stay, or a solo adventure,
            our curated collection of hotels across India and worldwide ensures
            you always wake up somewhere worth it. We partner with thousands of
            verified hotels, resorts, and homestays to bring you the best room
            rates, exclusive deals, and flexible cancellation options. No hidden
            charges, no last-minute surprises — just seamless hotel bookings
            backed by real travel experts who are always just a call away.
          </p>
        </div>
      </div>
    </section>
  );
}
