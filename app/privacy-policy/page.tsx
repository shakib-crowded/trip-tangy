import PrivacyPolicy from "./PrivacyPolicy";

export const metadata = {
  title: "Privacy Policy for Travel Website | Data Security & User Protection", 
  description: "Explore our privacy policy to know how we protect your personal information, ensure secure travel bookings, and maintain transparency in our services.",
  alternates: {
      canonical: "/privacy-policy",
    },
}

export default function Page(){
    return(
        <PrivacyPolicy/>
    )
}
