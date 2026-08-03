import CancellationPolicy from "./CancellationPolicy";


export const metadata = {
  title: "Cancellation Policy for Travel Bookings | Flight, Hotel & Package Cancellation", 
  description: "Understand our cancellation policy for flights, hotels, and tour packages. Learn about refund timelines, cancellation fees, and your rights when booking with us.",
  alternates: {
      canonical: "/cancellation-policy",
    },
}

export default function page(){
    return(
        <CancellationPolicy/>
    )
}