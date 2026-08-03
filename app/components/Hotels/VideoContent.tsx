export default function VideoContent() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold text-primary mb-2 text-center">
        Hotels
      </h1>
      <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
        Book the Luxurious Hotels Through TripTangy
      </p>

      {/* Video Section - Fixed */}
      <div className="relative w-full mb-12 aspect-video ">
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="/images/hotel_poster.jpg"
          className="absolute inset-0 w-full h-full object-cover rounded-3xl"
        >
          <source src="/videos/luxurious_hotel.mp4" type="video/mp4" />
        </video>
      </div>
    </div>
  );
}
