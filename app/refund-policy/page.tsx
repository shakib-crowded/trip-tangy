import RefundPolicy from "./RefundPolicy"

export const metadata = {
  title: "Refund Policy for Travel Bookings | Flight, Hotel & Package Refunds", 
  description: "Understand our refund policy for flight cancellations, hotel bookings, and tour packages. Learn about refund timelines, processing fees, and eligibility criteria.",
  alternates: {
      canonical: "/refund-policy",
    },
}


export default function Page(){
    return(
        <RefundPolicy/>
    )
}