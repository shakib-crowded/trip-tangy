import { siteConfig } from "../../lib/site";

export default function RefundPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Refund Policy
          </h1>
          <p className="text-gray-500">Last updated: July 01, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-gray-700 mb-6">
            This Refund Policy describes Our policies and procedures regarding refunds for travel bookings made through Our Service. This Policy applies to all bookings including tour packages (packages details are for showcase only; actual refund terms will be discussed with Our travel executive), flight tickets, and hotel reservations.
          </p>

          <p className="text-gray-700 mb-8">
            By making a booking with Us, You agree to the terms of this Refund Policy. Refund eligibility, amounts, and processing times vary based on the type of service, timing of cancellation, and the policies of Our third-party service providers (airlines, hotels, etc.). This Policy works in conjunction with Our Cancellation Policy and Payment Policy.
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
            For the purposes of this Refund Policy:
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
                  {" "}
                  (referred to as either &quot;the Company&quot;, &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this Policy) refers to {siteConfig.companyName}, {siteConfig.address}.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Credit Shell</strong>
                <span className="text-gray-700">
                  {" "}
                  means a credit balance held by Us or a third-party provider that can be used for future travel bookings instead of a cash refund.
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
                <strong className="text-gray-900">Non-Refundable Amount</strong>
                <span className="text-gray-700">
                  {" "}
                  means any portion of the booking amount that cannot be returned to You under any circumstances.
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
                <strong className="text-gray-900">Refund Eligibility</strong>
                <span className="text-gray-700">
                  {" "}
                  means the criteria that determine whether a Booking qualifies for a refund.
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
                  means a pre-arranged combination of travel services including but not limited to transportation, accommodation, and activities. Package details displayed on Our website are for showcase purposes only; actual refund terms will be discussed and confirmed with Our travel executive at the time of booking.
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

          {/* General Refund Terms */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            General Refund Terms
          </h2>

          <p className="text-gray-700 mb-4">
            The following general terms apply to all refunds:
          </p>

          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>Refunds are processed only after a valid cancellation request has been submitted and approved.</li>
            <li>Refund amounts are calculated based on the cancellation date and the policies of the respective third-party provider.</li>
            <li>Our service fees, cancellation processing fees, and payment gateway charges are generally non-refundable.</li>
            <li>Refunds will be issued using the original payment method used for the booking.</li>
            <li>If the original payment method is no longer valid, You must provide alternative bank details in writing.</li>
            <li>No refunds are provided for no-shows (failure to arrive for a service without prior cancellation).</li>
            <li>Partial refunds may be available for partially utilized services (subject to provider policies).</li>
          </ul>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-6 rounded-r-xl mb-8">
            <p className="text-amber-800 text-sm">
              <strong className="font-semibold">Important Note:</strong> Tour package refund terms are customized for each booking. Package details displayed on Our website are for showcase purposes only. Actual refund eligibility and amounts will be discussed and agreed upon with Our travel executive at the time of booking. Please obtain written confirmation of your package&apos;s refund terms.
            </p>
          </div>

          {/* Refund Eligibility */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Refund Eligibility
          </h2>

          <p className="text-gray-700 mb-4">
            Refund eligibility depends on the following factors:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Eligible for Refund</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>Cancellations made within the free cancellation window (where applicable)</li>
                <li>Cancellations made according to the provider&apos;s refundable fare rules</li>
                <li>Provider-initiated cancellations (airline or hotel cancels the service)</li>
                <li>Overpayments or duplicate payments</li>
                <li>Services not rendered as booked (subject to investigation)</li>
                <li>Valid medical or emergency cancellations with supporting documentation (at provider&apos;s discretion)</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Not Eligible for Refund</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li>No-show for any service (flight, hotel, transport, etc.)</li>
                <li>Non-refundable fare types (clearly disclosed at booking)</li>
                <li>Partial utilization of services (e.g., using outbound flight but not return)</li>
                <li>Cancellations made after the refund deadline</li>
                <li>Voluntary changes or downgrades</li>
                <li>Booking fees, service fees, and cancellation processing fees</li>
                <li>Payment gateway and convenience charges</li>
                <li>Visa fees and travel insurance premiums</li>
                <li>Force majeure events (unless provider offers exceptions)</li>
              </ul>
            </div>
          </div>

          {/* Flight Booking Refunds */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Flight Booking Refunds
          </h2>

          <p className="text-gray-700 mb-4">
            Flight refunds are governed by the airline&apos;s fare rules and cancellation policy.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Airline Refund Guidelines</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong className="text-gray-900">Fully Refundable Tickets:</strong> 100% refund of the base fare and taxes (minus any applicable service fees).</li>
                <li><strong className="text-gray-900">Partial Refund Tickets:</strong> Refund amount varies based on cancellation date and airline policy.</li>
                <li><strong className="text-gray-900">Non-Refundable Tickets:</strong> Base fare is non-refundable. Taxes may be refundable if the ticket is unused.</li>
                <li><strong className="text-gray-900">Airline-Initiated Cancellation:</strong> Full refund of the entire ticket amount, regardless of fare type.</li>
                <li><strong className="text-gray-900">Schedule Change:</strong> Free rebooking or full refund if the schedule change is significant (typically 2+ hours).</li>
                <li><strong className="text-gray-900">Death of Passenger:</strong> Full refund may be available with proper documentation (death certificate).</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Tax Refunds on Non-Refundable Tickets</h5>
              <p className="text-gray-700 mb-2">
                Even for non-refundable tickets, the following taxes may be refundable after the ticket goes unused:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Base Fare: Non-refundable</li>
                <li>Fuel Surcharge: Non-refundable (typically)</li>
                <li>Airport Taxes: May be refundable (₹500 - ₹5,000 depending on route)</li>
                <li>GST/Service Tax: Non-refundable</li>
                <li>Passenger Service Fees: May be refundable</li>
              </ul>
              <p className="text-gray-600 text-sm mt-3">
                Note: Tax refunds require filing a claim with the airline and may take 60-90 days to process.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Flight Refund Processing Timeline</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Airline Type</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Refund Processing Time</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">Domestic Airlines (India)</td>
                      <td className="py-2 px-3 text-gray-700">7 - 15 business days</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">International Airlines</td>
                      <td className="py-2 px-3 text-gray-700">15 - 30 business days</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">Low-Cost Carriers</td>
                      <td className="py-2 px-3 text-gray-700">20 - 45 business days</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">Tax Refund Claims</td>
                      <td className="py-2 px-3 text-gray-700">60 - 90 business days</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Hotel Booking Refunds */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Hotel Booking Refunds
          </h2>

          <p className="text-gray-700 mb-4">
            Hotel refunds depend on the property&apos;s cancellation policy and rate plan selected.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Hotel Refund Guidelines</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-2">
                <li><strong className="text-gray-900">Free Cancellation Rate:</strong> Full refund if cancelled before the policy deadline (typically 24-72 hours before check-in).</li>
                <li><strong className="text-gray-900">Non-Refundable Rate:</strong> No refund for any cancellation, regardless of timing.</li>
                <li><strong className="text-gray-900">Partial Prepayment Rate:</strong> Deposit may be non-refundable; balance refundable if cancelled on time.</li>
                <li><strong className="text-gray-900">Hotel-Initiated Cancellation:</strong> Full refund, including any deposits or prepayments.</li>
                <li><strong className="text-gray-900">Early Departure:</strong> No refund for unused nights unless hotel policy states otherwise.</li>
                <li><strong className="text-gray-900">No-Show:</strong> Full charge for the first night (or entire stay for prepaid bookings).</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Hotel Refund Processing Timeline</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Domestic Hotels: 7 - 14 business days</li>
                <li>International Hotels: 14 - 21 business days</li>
                <li>Refunds to credit cards may take an additional 3-7 days depending on the bank</li>
              </ul>
            </div>
          </div>

          {/* Tour Package Refunds */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Tour Package Refunds
          </h2>

          <div className="bg-blue-50 p-6 rounded-xl mb-6">
            <p className="text-blue-800 text-sm">
              <strong className="font-semibold">Important Disclosure:</strong> Package details displayed on Our website are for showcase purposes only. Refund terms for tour packages are not standardized and will be discussed and mutually agreed upon with Our travel executive at the time of booking. All refund commitments must be obtained in writing.
            </p>
          </div>

          <p className="text-gray-700 mb-4">
            For tour packages, refunds are calculated based on the specific components of the package, cancellation timing, and supplier policies.
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Indicative Package Refund Schedule</h5>
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Cancellation Notice</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Indicative Refund</th>
                      <th className="text-left py-2 px-3 font-semibold text-gray-900">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">45+ days before departure</td>
                      <td className="py-2 px-3 text-gray-700">75% - 90%</td>
                      <td className="py-2 px-3 text-gray-700">Less non-refundable deposits</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">30 - 44 days before departure</td>
                      <td className="py-2 px-3 text-gray-700">50% - 75%</td>
                      <td className="py-2 px-3 text-gray-700">Hotel cancellation fees apply</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">15 - 29 days before departure</td>
                      <td className="py-2 px-3 text-gray-700">25% - 50%</td>
                      <td className="py-2 px-3 text-gray-700">Airline & hotel fees apply</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">7 - 14 days before departure</td>
                      <td className="py-2 px-3 text-gray-700">10% - 25%</td>
                      <td className="py-2 px-3 text-gray-700">Significant supplier fees</td>
                    </tr>
                    <tr className="border-b border-gray-100">
                      <td className="py-2 px-3 text-gray-700">Less than 7 days / No-show</td>
                      <td className="py-2 px-3 text-gray-700">0% - 10%</td>
                      <td className="py-2 px-3 text-gray-700">Minimal or no refund</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-gray-500 mt-3">
                Note: This schedule is indicative only. Actual refund amounts depend on supplier cancellation policies, non-refundable deposits, and the specific terms confirmed with Our travel executive at the time of booking.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Package Refund Processing Timeline</h5>
              <p className="text-gray-700 mb-2">
                Package refunds involve multiple suppliers and typically take longer to process:
              </p>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Processing by Our team: 3 - 5 business days</li>
                <li>Supplier refund processing: 15 - 30 business days</li>
                <li>Total refund timeline: 20 - 45 business days</li>
                <li>Complex packages with international components: Up to 60 business days</li>
              </ul>
            </div>
          </div>

          {/* Credit Shell / Travel Credits */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Credit Shell & Travel Credits
          </h2>

          <p className="text-gray-700 mb-4">
            In some cases, airlines or hotels may offer travel credits instead of cash refunds. Our policy regarding such credits:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Airline Credits</h5>
              <p className="text-gray-700">
                Some airlines issue credit shells or travel vouchers for canceled bookings instead of cash refunds. These credits:
              </p>
              <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                <li>Typically have an expiration date (6 months to 1 year from issuance)</li>
                <li>May have blackout dates or booking restrictions</li>
                <li>Are usually non-transferable (only the original passenger can use them)</li>
                <li>Cannot be converted to cash by Us</li>
                <li>Will be managed directly between You and the airline</li>
              </ul>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Hotel Credits</h5>
              <p className="text-gray-700">
                Some hotels offer future travel credits for cancellations. These are subject to the hotel&apos;s specific terms and conditions, including expiration dates and usage restrictions.
              </p>
            </div>
          </div>

          {/* Refund Processing Fee */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Refund Processing Fee
          </h2>

          <p className="text-gray-700 mb-4">
            The following non-refundable fees apply to all refunds processed by Us:
          </p>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Our Service Fees (Non-Refundable)</h5>
              <ul className="list-disc pl-5 text-gray-700 space-y-1">
                <li>Flight cancellation refund processing fee: ₹500 - ₹1,000 per passenger</li>
                <li>Hotel cancellation refund processing fee: ₹300 - ₹600 per booking</li>
                <li>Tour package refund processing fee: ₹1,000 - ₹2,500 per booking</li>
                <li>Payment gateway charges (typically 1% - 2% of transaction value)</li>
                <li>Bank charges for chargebacks or refund reversals: As applicable</li>
              </ul>
              <p className="text-gray-600 text-sm mt-3">
                These fees are deducted from the refund amount before the balance is returned to You.
              </p>
            </div>
          </div>

          {/* Refund Process Flow */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Refund Process Flow
          </h2>

          <div className="space-y-4 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-3">Step-by-Step Refund Process</h5>
              <ol className="list-decimal pl-5 text-gray-700 space-y-3">
                <li><strong className="text-gray-900">Cancellation Request Submitted:</strong> You submit a written cancellation request via email to triptangy@gmail.com</li>
                <li><strong className="text-gray-900">Acknowledgment & Verification:</strong> We acknowledge receipt within 24-48 hours and verify booking details.</li>
                <li><strong className="text-gray-900">Cancellation Confirmation:</strong> We confirm cancellation with the third-party provider (airline/hotel/supplier).</li>
                <li><strong className="text-gray-900">Refund Calculation:</strong> We calculate the refundable amount based on provider&apos;s policy and deduct applicable fees.</li>
                <li><strong className="text-gray-900">Refund Confirmation:</strong> We notify You of the refund amount and expected timeline.</li>
                <li><strong className="text-gray-900">Provider Refund:</strong> Third-party provider processes the refund to Us (timeline varies).</li>
                <li><strong className="text-gray-900">We Refund You:</strong> Upon receiving the refund from the provider, We process Your refund within 5-7 business days.</li>
                <li><strong className="text-gray-900">Refund Complete:</strong> Refund reflects in Your account (additional bank processing time may apply).</li>
              </ol>
            </div>
          </div>

          {/* Refund Timeline Summary */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Refund Timeline Summary
          </h2>

          <div className="overflow-x-auto mb-8">
            <table className="min-w-full text-sm border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b">Booking Type</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b">Provider Processing</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b">Our Processing</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-900 border-b">Total Estimated Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">Domestic Flight</td>
                  <td className="py-2 px-4 text-gray-700">7 - 15 days</td>
                  <td className="py-2 px-4 text-gray-700">3 - 5 days</td>
                  <td className="py-2 px-4 text-gray-700">10 - 20 business days</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">International Flight</td>
                  <td className="py-2 px-4 text-gray-700">15 - 30 days</td>
                  <td className="py-2 px-4 text-gray-700">5 - 7 days</td>
                  <td className="py-2 px-4 text-gray-700">20 - 37 business days</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">Domestic Hotel</td>
                  <td className="py-2 px-4 text-gray-700">7 - 14 days</td>
                  <td className="py-2 px-4 text-gray-700">3 - 5 days</td>
                  <td className="py-2 px-4 text-gray-700">10 - 19 business days</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">International Hotel</td>
                  <td className="py-2 px-4 text-gray-700">14 - 21 days</td>
                  <td className="py-2 px-4 text-gray-700">5 - 7 days</td>
                  <td className="py-2 px-4 text-gray-700">19 - 28 business days</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">Tour Package</td>
                  <td className="py-2 px-4 text-gray-700">15 - 30 days</td>
                  <td className="py-2 px-4 text-gray-700">5 - 7 days</td>
                  <td className="py-2 px-4 text-gray-700">20 - 37 business days</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="py-2 px-4 text-gray-700">Tax Refund Claim</td>
                  <td className="py-2 px-4 text-gray-700">60 - 90 days</td>
                  <td className="py-2 px-4 text-gray-700">5 - 7 days</td>
                  <td className="py-2 px-4 text-gray-700">65 - 97 business days</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Partial Refunds */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Partial Refunds
          </h2>

          <p className="text-gray-700 mb-4">
            In certain situations, partial refunds may be available:
          </p>

          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li><strong className="text-gray-900">Partially Utilized Services:</strong> If You have used a portion of your booking (e.g., outbound flight but not return), only the unused portion may be refundable based on provider policy.</li>
            <li><strong className="text-gray-900">Group Bookings:</strong> Partial refunds for reduced group size are subject to group contract terms.</li>
            <li><strong className="text-gray-900">Upgraded Services:</strong> If You cancel an add-on or upgrade but keep the base service, the add-on may be refundable separately.</li>
            <li><strong className="text-gray-900">Medical Emergencies:</strong> Some providers may offer partial refunds with proper documentation, even outside standard policy.</li>
          </ul>

          {/* Non-Refundable Amounts */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Non-Refundable Amounts
          </h2>

          <p className="text-gray-700 mb-4">
            The following amounts are generally non-refundable under any circumstances:
          </p>

          <div className="bg-red-50 p-6 rounded-xl mb-8">
            <ul className="list-disc pl-5 text-red-800 space-y-2">
              <li>Our service fees and cancellation processing fees</li>
              <li>Payment gateway and convenience charges</li>
              <li>Visa processing and consular fees</li>
              <li>Travel insurance premiums</li>
              <li>Airline fuel surcharges (on non-refundable tickets)</li>
              <li>Non-refundable hotel deposits (clearly disclosed at booking)</li>
              <li>Third-party provider fees where the provider has a strict no-refund policy</li>
              <li>Any amount explicitly marked as &quot;non-refundable&quot; at the time of booking</li>
            </ul>
          </div>

          {/* Refund Status Tracking */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Refund Status Tracking
          </h2>

          <p className="text-gray-700 mb-4">
            You can track the status of your refund by:
          </p>

          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Checking your email for refund confirmation updates from Us</li>
            <li>Contacting Our customer support with your booking reference number</li>
            <li>Checking with your bank or payment provider for credit reflections</li>
            <li>Logging into your account on Our website (if applicable)</li>
          </ul>

          <p className="text-gray-700 mb-8">
            If your refund has exceeded the estimated timeline, please contact Us at <a href={`mailto:${siteConfig.email}`}className="text-primary hover:underline">{siteConfig.email}</a> with your booking reference number.
          </p>

          {/* Disputes & Chargebacks */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Disputes & Chargebacks
          </h2>

          <p className="text-gray-700 mb-4">
            If You dispute a charge or initiate a chargeback with your bank:
          </p>

          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-2">
            <li>Please contact Us first to resolve any concerns before initiating a chargeback.</li>
            <li>Chargebacks may delay any refund processing by 60-90 days.</li>
            <li>If a chargeback is filed for a valid charge, We reserve the right to pursue recovery of the amount.</li>
            <li>Chargeback fees imposed by the bank (typically ₹500 - ₹2,500) may be passed on to You if the chargeback is found to be invalid.</li>
            <li>We will provide all necessary documentation to the bank to support the validity of the charge.</li>
          </ul>

          {/* Travel Insurance Recommendation */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Travel Insurance Recommendation
          </h2>

          <div className="bg-green-50 border-l-4 border-green-500 p-6 rounded-r-xl mb-8">
            <p className="text-green-800 text-sm">
              <strong className="font-semibold">Strongly Recommended:</strong> We strongly recommend purchasing comprehensive travel insurance at the time of booking. Travel insurance can protect You against financial losses due to trip cancellations, interruptions, medical emergencies, lost baggage, and other unforeseen events. Our refund policy does not cover cancellations for reasons that would typically be covered by travel insurance (e.g., illness, injury, weather, etc.). Please review your travel insurance policy carefully for coverage details, exclusions, and claim procedures.
            </p>
          </div>

          {/* Changes to This Policy */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Changes to This Refund Policy
          </h2>

          <p className="text-gray-700 mb-4">
            We may update Our Refund Policy from time to time. We will notify You of any changes by posting the new Refund Policy on this page and updating the &quot;Last updated&quot; date at the top.
          </p>

          <p className="text-gray-700 mb-4">
            For Bookings made before a policy change, the Refund Policy in effect at the time of booking will apply unless otherwise required by law or agreed in writing.
          </p>

          <p className="text-gray-700 mb-8">
            You are advised to review this Refund Policy periodically for any changes. Changes are effective immediately upon posting.
          </p>


          {/* Contact Us */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Refund Policy or need assistance with a refund, You can contact us:
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