import { siteConfig } from "../../lib/site";

export default function CancellationPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Cancellation Policy
          </h1>
          <p className="text-gray-500">Last updated: July 01, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-gray-700 mb-6">
            This Cancellation Policy describes Our policies and procedures regarding the cancellation of travel bookings made through Our Service. This Policy applies to all bookings including tour packages (packages details are for showcase only; actual price and cancellation terms will be discussed with Our travel executive), flight tickets, and hotel reservations.
          </p>

          <p className="text-gray-700 mb-8">
            By making a booking with Us, You agree to the terms of this Cancellation Policy. Please read this Policy carefully before confirming any booking. Cancellation charges and refund eligibility vary based on the type of service, timing of cancellation, and the policies of Our third-party service providers (airlines, hotels, etc.).
          </p>

          {/* Interpretation and Definitions */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Interpretation and Definitions
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Interpretation
          </h3>
          <p className="text-gray-700 mb-6">
            The words whose initial letters are capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Definitions
          </h3>
          <p className="text-gray-700 mb-4">
            For the purposes of this Cancellation Policy:
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Booking</strong>
                <span className="text-gray-700">
                  {" "}
                  means any reservation or purchase made through Our Service for travel-related services including tour packages, flights, and hotels.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Company</strong>
                <span className="text-gray-700">
                  {" "} (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Policy) refers to {siteConfig.companyName}, {siteConfig.address}.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Cancellation Request</strong>
                <span className="text-gray-700">
                  {" "}
                  means a formal request submitted by You to cancel a confirmed Booking.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Flight Booking</strong>
                <span className="text-gray-700">
                  {" "}
                  means any reservation for air travel made through Our Service.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Hotel Booking</strong>
                <span className="text-gray-700">
                  {" "}
                  means any reservation for accommodation made through Our Service.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Non-Refundable Booking</strong>
                <span className="text-gray-700">
                  {" "}
                  means a Booking that, once confirmed, cannot be canceled for a refund unless otherwise specified by applicable law or the service provider&apos;s policy.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Refund</strong>
                <span className="text-gray-700">
                  {" "}
                  means the amount returned to You following a valid cancellation, subject to applicable deductions and processing fees.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Service</strong>
                <span className="text-gray-700">
                  {" "}
                  refers to the Website and any travel booking services provided through it.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Third-Party Provider</strong>
                <span className="text-gray-700">
                  {" "}
                  means airlines, hotels, consolidators, and other travel service providers whose products We facilitate.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Tour Package</strong>
                <span className="text-gray-700">
                  {" "}
                  means a pre-arranged combination of travel services including but not limited to transportation, accommodation, and activities. Package details displayed on Our website are for showcase purposes only; actual prices and cancellation terms will be discussed and confirmed with Our travel executive at the time of booking.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">You</strong>
                <span className="text-gray-700">
                  {" "}
                  means the individual accessing or using the Service, or the company or other legal entity on whose behalf such individual is making a Booking.
                </span>
              </div>
            </li>
          </ul>

          {/* General Cancellation Terms */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            General Cancellation Terms
          </h2>

          <p className="text-gray-700 mb-4">
            The following general terms apply to all cancellations:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>All cancellation requests must be submitted in writing via email to <strong className="text-gray-900">{siteConfig.email}</strong> or through Our official contact channels.</li>
            <li>Cancellation requests are processed based on the date and time of receipt, not the date of travel.</li>
            <li>Refunds, if applicable, will be processed using the original payment method used for the Booking.</li>
            <li>Processing fees, service charges, and payment gateway fees are generally non-refundable.</li>
            <li>Third-party provider policies (airlines, hotels, etc.) will supersede Our policy where they are more restrictive or specific.</li>
            <li>No-shows (failure to check-in or arrive for a service without prior cancellation) are typically non-refundable.</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-8">
            <p className="text-amber-800 text-sm">
              <strong className="font-semibold">Important Note:</strong> Tour package details displayed on Our website are for showcase purposes only. Actual package prices, inclusions, and specific cancellation terms will be discussed and mutually agreed upon with Our travel executive at the time of booking. Please obtain written confirmation of your package&apos;s cancellation terms at the time of booking.
            </p>
          </div>

          {/* Flight Booking Cancellation */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Flight Booking Cancellation
          </h2>

          <p className="text-gray-700 mb-4">
            Flight cancellations are subject to the specific fare rules of the airline with which You are booked. Different fare types (Saver, Flex, Business, etc.) have different cancellation policies.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Standard Flight Cancellation Guidelines</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong className="text-gray-900">Cancellation within 24 hours of booking:</strong> If Your flight booking was made at least 7 days before departure, You may be eligible for a full refund within 24 hours of booking. This is subject to airline participation.</li>
                <li><strong className="text-gray-900">Cancellation after 24 hours:</strong> Applicable airline cancellation fees will apply. These vary by airline, route, and fare class.</li>
                <li><strong className="text-gray-900">Non-refundable tickets:</strong> Many discounted fares are non-refundable but may retain value for future travel (minus change fees) or provide tax refunds.</li>
                <li><strong className="text-gray-900">Airline-initiated cancellations:</strong> If an airline cancels Your flight, You are generally entitled to a full refund or rebooking at no additional cost.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Our Service Fees for Flight Cancellations</h5>
              <p className="text-gray-700 mb-2">
                In addition to airline cancellation charges, We may levy a service fee for processing flight cancellations:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Domestic flight cancellation processing fee: ₹500 - ₹1,000 per passenger</li>
                <li>International flight cancellation processing fee: ₹1,000 - ₹2,500 per passenger</li>
                <li>These fees are non-refundable even if the airline refunds the ticket amount</li>
              </ul>
            </div>
          </div>

          {/* Hotel Booking Cancellation */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Hotel Booking Cancellation
          </h2>

          <p className="text-gray-700 mb-4">
            Hotel cancellation policies vary significantly based on the property, rate plan selected, and booking dates. Please refer to Your hotel confirmation email for specific cancellation deadlines.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Common Hotel Cancellation Windows</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong className="text-gray-900">Free Cancellation:</strong> Many hotels offer free cancellation up to 24-72 hours before check-in. Cancelling within this window may result in charges.</li>
                <li><strong className="text-gray-900">Non-Refundable Rates:</strong> Prepaid, non-refundable bookings cannot be canceled for a refund, regardless of timing.</li>
                <li><strong className="text-gray-900">Peak Season / Event Periods:</strong> Hotels may impose stricter cancellation policies (e.g., 14-30 days notice required) during high-demand periods.</li>
                <li><strong className="text-gray-900">Early Checkout / No-Show:</strong> Checking out before the scheduled departure date or failing to arrive may result in forfeiture of the remaining nights&apos; charges.</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Our Service Fees for Hotel Cancellations</h5>
              <p className="text-gray-700">
                We charge a cancellation processing fee of ₹500 per hotel booking, which is non-refundable and applies regardless of whether the hotel waives its cancellation fees.
              </p>
            </div>
          </div>

          {/* Tour Package Cancellation */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Tour Package Cancellation
          </h2>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <p className="text-blue-800 text-sm">
              <strong className="font-semibold">Important Disclosure:</strong> Package details displayed on Our website are for showcase and inspirational purposes only. Actual package prices, inclusions, and cancellation terms are not finalized until You speak directly with one of Our travel executives. All package bookings are customized and subject to individual negotiation and written confirmation.
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            For tour packages, cancellation terms are determined at the time of booking based on the specific components of the package (flights, hotels, transport, activities, etc.). The following represent typical terms, but Your specific package may vary:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Indicative Tour Package Cancellation Schedule</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Cancellation Notice</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Indicative Refund</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">45+ days before departure</td>
                      <td className="py-2 px-3 text-gray-700">75% - 90% of package cost (less non-refundable deposits)</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">30 - 44 days before departure</td>
                      <td className="py-2 px-3 text-gray-700">50% - 75% of package cost</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">15 - 29 days before departure</td>
                      <td className="py-2 px-3 text-gray-700">25% - 50% of package cost</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">7 - 14 days before departure</td>
                      <td className="py-2 px-3 text-gray-700">10% - 25% of package cost</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">Less than 7 days / No-show</td>
                      <td className="py-2 px-3 text-gray-700">0% - 10% of package cost</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Note: These percentages are indicative only. Actual refund amounts depend on supplier cancellation policies, non-refundable deposits, and the specific terms confirmed with Our travel executive at the time of booking.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Package Cancellation Service Fee</h5>
              <p className="text-gray-700">
                We charge a package cancellation processing fee of ₹1,000 - ₹2,500 per booking, depending on the complexity of the package. This fee is non-refundable and covers administrative costs, supplier communications, and refund processing.
              </p>
            </div>
          </div>

          {/* Refund Process */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Refund Process
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Refund Timelines
          </h3>
          <p className="text-gray-700 mb-4">
            Refund processing times vary depending on the type of Booking and the third-party provider:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Flight Refunds</h5>
              <p className="text-gray-700">
                Airline refunds typically take <strong>7-20 business days</strong> to process, though some airlines may take up to <strong>60-90 days</strong> for international or complex cases. Once We receive the refund from the airline, We will process Your portion within <strong>5-7 business days</strong>.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Hotel Refunds</h5>
              <p className="text-gray-700">
                Hotel refunds typically take <strong>7-14 business days</strong> to reflect in Your account, depending on the hotel&apos;s payment processor and Your bank&apos;s policies.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Package Refunds</h5>
              <p className="text-gray-700">
                Package refunds may take <strong>14-30 business days</strong> due to the involvement of multiple suppliers (airlines, hotels, transport companies, etc.). We will keep You informed of the status throughout the process.
              </p>
            </div>
          </div>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Refund Method
          </h3>
          <p className="text-gray-700 mb-4">
            Refunds will be credited using the same payment method used for the original Booking. This includes:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li>Credit/Debit Card (refund to the same card)</li>
            <li>Bank Transfer / UPI (refund to the same account)</li>
            <li>Wallet (refund to the same wallet)</li>
            <li>Cash (refund processed via bank transfer or cheque)</li>
          </ul>

          <p className="text-gray-700 mb-8">
            Please note that depending on Your bank or payment provider, it may take additional time for the refund to appear in Your statement. We are not responsible for delays caused by third-party financial institutions.
          </p>

          {/* Non-Refundable Items */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Non-Refundable Items
          </h2>

          <p className="text-gray-700 mb-4">
            The following items are generally non-refundable under any circumstances:
          </p>

          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Visa processing fees and consular charges</li>
            <li>Travel insurance premiums</li>
            <li>Payment gateway and convenience fees</li>
            <li>Our service fees and cancellation processing fees</li>
            <li>Airport taxes on non-refundable tickets (may be refundable in some jurisdictions)</li>
            <li>Third-party service fees where the provider has a strict no-refund policy</li>
            <li>Any non-refundable deposits clearly disclosed at the time of booking</li>
          </ul>

          {/* Exceptional Circumstances */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Exceptional Circumstances
          </h2>

          <p className="text-gray-700 mb-4">
            We understand that unforeseen events may require changes to travel plans. The following circumstances may be considered for flexible cancellation terms:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Medical Emergencies</h5>
              <p className="text-gray-700">
                In the event of a serious medical emergency affecting You or an immediate family member, We will work with suppliers to request exceptions to standard cancellation policies. Supporting documentation (hospital admission records, doctor&apos;s certificate) is required. Approval is at the sole discretion of each supplier.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Natural Disasters & Government Advisories</h5>
              <p className="text-gray-700">
                If a natural disaster, pandemic, or government-issued travel advisory affects Your destination, We will follow the policies established by airlines, hotels, and other suppliers. Many suppliers offer flexible rebooking or travel credits during such events.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Travel Insurance Recommendation</h5>
              <p className="text-gray-700">
                We strongly recommend purchasing comprehensive travel insurance at the time of booking. Travel insurance can protect You against cancellation fees due to covered reasons including illness, injury, death of a family member, weather-related delays, and other unforeseen circumstances. We are not liable for any losses that could have been covered by travel insurance.
              </p>
            </div>
          </div>

          {/* How to Cancel */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            How to Submit a Cancellation Request
          </h2>

          <p className="text-gray-700 mb-4">
            To cancel a Booking, please follow these steps:
          </p>

          <ol className="list-decimal pl-6 mb-8 text-gray-700 space-y-3">
            <li>Send a cancellation request via email to <strong className="text-gray-900">{siteConfig.email}</strong> with the subject line &quot;Cancellation Request - [Your Booking Reference Number]&quot;</li>
            <li>Include Your full name, booking reference number, travel dates, and reason for cancellation (if any)</li>
            <li>You will receive an acknowledgment within 24-48 hours</li>
            <li>We will process Your request and inform You of applicable cancellation fees and refund amount</li>
            <li>Upon Your confirmation to proceed, We will initiate the cancellation and refund process</li>
          </ol>

          <p className="text-gray-700 mb-8">
            <strong className="text-gray-900">Important:</strong> The effective date of cancellation is the date and time We receive Your written request. Phone calls alone are not accepted as formal cancellation requests unless followed by written confirmation.
          </p>

          {/* Changes to This Policy */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Changes to This Cancellation Policy
          </h2>

          <p className="text-gray-700 mb-4">
            We may update Our Cancellation Policy from time to time. We will notify You of any changes by posting the new Cancellation Policy on this page and updating the &quot;Last updated&quot; date at the top.
          </p>

          <p className="text-gray-700 mb-4">
            For Bookings made before a policy change, the Cancellation Policy in effect at the time of booking will apply unless otherwise required by law or agreed in writing.
          </p>

          <p className="text-gray-700 mb-8">
            You are advised to review this Cancellation Policy periodically for any changes. Changes are effective immediately upon posting.
          </p>

          
          {/* Contact Us */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Cancellation Policy or need assistance with a cancellation, You can contact us:
          </p>

          <ul className="space-y-3 mb-8">
            <li className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {siteConfig.email}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <a
                href={`tel:${siteConfig.whatsapp}`}
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {siteConfig.phone}
              </a>
            </li>
            <li className="flex items-center gap-3">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
              </svg>
              <a
                href={`${siteConfig.siteLink}/contact`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-700 hover:text-primary transition-colors"
              >
                {siteConfig.siteLink}/contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}