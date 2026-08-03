export default function VideoContent(){
    return(
        <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-primary mb-2 text-center">
          Flights
        </h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Get cheap flight tickets from TripTangy.
        </p>

        {/* Video Section - Fixed */}
        <div className="relative w-full mb-12 aspect-video ">
          <video
            autoPlay
            loop
            muted
            playsInline
            poster="/images/flight_poster.jpg"
            className="absolute inset-0 w-full h-full object-cover rounded-3xl"
          >
            <source src="/videos/flight_take_off.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    )
}