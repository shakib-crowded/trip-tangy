import TermsConditions from "./TermsConditions";

export const metadata = {
  title: "Terms of Service | Travel Agency Booking & Refund Policy Guide", 
  description: "Read our travel terms and conditions for booking policies, cancellations, refunds, and payment terms. Transparent guidelines for a secure travel experience.", 
  alternates: {
      canonical: "/terms-conditions",
  }
}

export default function Page() {
  return (
    <TermsConditions/>
  );
}
