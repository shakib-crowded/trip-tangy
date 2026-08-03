import Link from "next/link";
import { siteConfig } from "../../lib/site";

export default function TermsConditions(){

  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Terms and Conditions
          </h1>
          <p className="text-gray-500">Last updated: July 01, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-gray-700 mb-8">
            Please read these terms and conditions carefully before using Our
            Service.
          </p>

          {/* Interpretation and Definitions */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Interpretation and Definitions
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Interpretation
          </h3>
          <p className="text-gray-700 mb-6">
            The words whose initial letters are capitalized have meanings
            defined under the following conditions. The following definitions
            shall have the same meaning regardless of whether they appear in
            singular or in plural.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Definitions
          </h3>
          <p className="text-gray-700 mb-4">
            For the purposes of these Terms and Conditions:
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Affiliate</strong>
                <span className="text-gray-700">
                  {" "}
                  means an entity that controls, is controlled by, or is under
                  common control with a party, where &quot;control&quot; means
                  ownership of 50% or more of the shares, equity interest or
                  other securities entitled to vote for election of directors or
                  other managing authority.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Country</strong>
                <span className="text-gray-700"> refers to: Delhi, India</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Company</strong>
                <span className="text-gray-700">
                  {" "}
                  (referred to as either &quot;the Company&quot;,
                  &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in these
                  Terms and Conditions) refers to {siteConfig.companyName}, {siteConfig.address}.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Device</strong>
                <span className="text-gray-700">
                  {" "}
                  means any device that can access the Service such as a
                  computer, a cell phone or a digital tablet.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Service</strong>
                <span className="text-gray-700"> refers to the Website.</span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Terms and Conditions</strong>
                <span className="text-gray-700">
                  {" "}
                  (also referred to as &quot;Terms&quot;) mean these Terms and
                  Conditions, including any documents expressly incorporated by
                  reference, which govern Your access to and use of the Service
                  and form the entire agreement between You and the Company
                  regarding the Service.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  Third-Party Social Media Service
                </strong>
                <span className="text-gray-700">
                  {" "}
                  means any services or content (including data, information,
                  products or services) provided by a third party that is
                  displayed, included, made available, or linked to through the
                  Service.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Website</strong>
                <span className="text-gray-700">
                  {" "}
                  refers to {siteConfig.companyName}, accessible from{" "}
                </span>
                <a
                  href={siteConfig.siteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-accent transition-colors"
                >
                  {siteConfig.siteLink}
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">You</strong>
                <span className="text-gray-700">
                  {" "}
                  means the individual accessing or using the Service, or the
                  company, or other legal entity on behalf of which such
                  individual is accessing or using the Service, as applicable.
                </span>
              </div>
            </li>
          </ul>

          {/* Acknowledgment */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Acknowledgment
          </h2>
          <p className="text-gray-700 mb-4">
            These are the Terms and Conditions governing the use of this Service
            and the agreement between You and the Company. These Terms and
            Conditions set out the rights and obligations of all users regarding
            the use of the Service.
          </p>

          <p className="text-gray-700 mb-4">
            Your access to and use of the Service is conditioned on Your
            acceptance of and compliance with these Terms and Conditions. These
            Terms and Conditions apply to all visitors, users and others who
            access or use the Service.
          </p>

          <p className="text-gray-700 mb-4">
            By accessing or using the Service You agree to be bound by these
            Terms and Conditions. If You disagree with any part of these Terms
            and Conditions then You may not access the Service.
          </p>

          <p className="text-gray-700 mb-4">
            You represent that you are over the age of 18. The Company does not
            permit those under 18 to use the Service.
          </p>

          <p className="text-gray-700 mb-8">
            Your access to and use of the Service is also subject to Our{" "}
            <Link
              href="/privacy-policy"
              className="text-primary hover:text-accent transition-colors"
            >
              Privacy Policy
            </Link>
            , which describes how We collect, use, and disclose personal
            information. Please read Our Privacy Policy carefully before using
            Our Service.
          </p>

          {/* Links to Other Websites */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Links to Other Websites
          </h2>
          <p className="text-gray-700 mb-4">
            Our Service may contain links to third-party websites or services
            that are not owned or controlled by the Company.
          </p>

          <p className="text-gray-700 mb-4">
            The Company has no control over, and assumes no responsibility for,
            the content, privacy policies, or practices of any third-party
            websites or services. You further acknowledge and agree that the
            Company shall not be responsible or liable, directly or indirectly,
            for any damage or loss caused or alleged to be caused by or in
            connection with the use of or reliance on any such content, goods or
            services available on or through any such websites or services.
          </p>

          <p className="text-gray-700 mb-6">
            We strongly advise You to read the terms and conditions and privacy
            policies of any third-party websites or services that You visit.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Links from a Third-Party Social Media Service
          </h3>
          <p className="text-gray-700 mb-4">
            The Service may display, include, make available, or link to content
            or services provided by a Third-Party Social Media Service. A
            Third-Party Social Media Service is not owned or controlled by the
            Company, and the Company does not endorse or assume responsibility
            for any Third-Party Social Media Service.
          </p>

          <p className="text-gray-700 mb-8">
            You acknowledge and agree that the Company shall not be responsible
            or liable, directly or indirectly, for any damage or loss caused or
            alleged to be caused by or in connection with Your access to or use
            of any Third-Party Social Media Service, including any content,
            goods, or services made available through them. Your use of any
            Third-Party Social Media Service is governed by that Third-Party
            Social Media Service&apos;s terms and privacy policies.
          </p>

          {/* Termination */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Termination
          </h2>
          <p className="text-gray-700 mb-4">
            We may terminate or suspend Your access immediately, without prior
            notice or liability, for any reason whatsoever, including without
            limitation if You breach these Terms and Conditions.
          </p>

          <p className="text-gray-700 mb-8">
            Upon termination, Your right to use the Service will cease
            immediately.
          </p>

          {/* Limitation of Liability */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Limitation of Liability
          </h2>
          <p className="text-gray-700 mb-4">
            Notwithstanding any damages that You might incur, the entire
            liability of the Company and any of its suppliers under any
            provision of these Terms and Your exclusive remedy for all of the
            foregoing shall be limited to the amount actually paid by You
            through the Service or 100 USD if You haven&apos;t purchased
            anything through the Service.
          </p>

          <p className="text-gray-700 mb-4">
            To the maximum extent permitted by applicable law, in no event shall
            the Company or its suppliers be liable for any special, incidental,
            indirect, or consequential damages whatsoever (including, but not
            limited to, damages for loss of profits, loss of data or other
            information, for business interruption, for personal injury, loss of
            privacy arising out of or in any way related to the use of or
            inability to use the Service, third-party software and/or
            third-party hardware used with the Service, or otherwise in
            connection with any provision of these Terms), even if the Company
            or any supplier has been advised of the possibility of such damages
            and even if the remedy fails of its essential purpose.
          </p>

          <p className="text-gray-700 mb-8">
            Some states do not allow the exclusion of implied warranties or
            limitation of liability for incidental or consequential damages,
            which means that some of the above limitations may not apply. In
            these states, each party&apos;s liability will be limited to the
            greatest extent permitted by law.
          </p>

          {/* "AS IS" and "AS AVAILABLE" Disclaimer */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; Disclaimer
          </h2>
          <p className="text-gray-700 mb-4">
            The Service is provided to You &quot;AS IS&quot; and &quot;AS
            AVAILABLE&quot; and with all faults and defects without warranty of
            any kind. To the maximum extent permitted under applicable law, the
            Company, on its own behalf and on behalf of its Affiliates and its
            and their respective licensors and service providers, expressly
            disclaims all warranties, whether express, implied, statutory or
            otherwise, with respect to the Service, including all implied
            warranties of merchantability, fitness for a particular purpose,
            title and non-infringement, and warranties that may arise out of
            course of dealing, course of performance, usage or trade practice.
            Without limitation to the foregoing, the Company provides no
            warranty or undertaking, and makes no representation of any kind
            that the Service will meet Your requirements, achieve any intended
            results, be compatible or work with any other software,
            applications, systems or services, operate without interruption,
            meet any performance or reliability standards or be error free or
            that any errors or defects can or will be corrected.
          </p>

          <p className="text-gray-700 mb-4">
            Without limiting the foregoing, neither the Company nor any of the
            company&apos;s provider makes any representation or warranty of any
            kind, express or implied: (i) as to the operation or availability of
            the Service, or the information, content, and materials or products
            included thereon; (ii) that the Service will be uninterrupted or
            error-free; (iii) as to the accuracy, reliability, or currency of
            any information or content provided through the Service; or (iv)
            that the Service, its servers, the content, or e-mails sent from or
            on behalf of the Company are free of viruses, scripts, trojan
            horses, worms, malware, timebombs or other harmful components.
          </p>

          <p className="text-gray-700 mb-8">
            Some jurisdictions do not allow the exclusion of certain types of
            warranties or limitations on applicable statutory rights of a
            consumer, so some or all of the above exclusions and limitations may
            not apply to You. But in such a case the exclusions and limitations
            set forth in this section shall be applied to the greatest extent
            enforceable under applicable law.
          </p>

          {/* Governing Law */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Governing Law
          </h2>
          <p className="text-gray-700 mb-8">
            The laws of the Country, excluding its conflicts of law rules, shall
            govern these Terms and Your use of the Service. Your use of the
            Application may also be subject to other local, state, national, or
            international laws.
          </p>

          {/* Disputes Resolution */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Disputes Resolution
          </h2>
          <p className="text-gray-700 mb-8">
            If You have any concern or dispute about the Service, You agree to
            first try to resolve the dispute informally by contacting the
            Company.
          </p>

          {/* For European Union (EU) Users */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            For European Union (EU) Users
          </h2>
          <p className="text-gray-700 mb-8">
            If You are a European Union consumer, you will benefit from any
            mandatory provisions of the law of the country in which You are
            resident.
          </p>

          {/* United States Legal Compliance */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            United States Legal Compliance
          </h2>
          <p className="text-gray-700 mb-8">
            You represent and warrant that (i) You are not located in a country
            that is subject to the United States government embargo, or that has
            been designated by the United States government as a &quot;terrorist
            supporting&quot; country, and (ii) You are not listed on any United
            States government list of prohibited or restricted parties.
          </p>

          {/* Severability and Waiver */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Severability and Waiver
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Severability
          </h3>
          <p className="text-gray-700 mb-4">
            If any provision of these Terms is held to be unenforceable or
            invalid, such provision will be changed and interpreted to
            accomplish the objectives of such provision to the greatest extent
            possible under applicable law and the remaining provisions will
            continue in full force and effect.
          </p>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Waiver
          </h3>
          <p className="text-gray-700 mb-8">
            Except as provided herein, the failure to exercise a right or to
            require performance of an obligation under these Terms shall not
            affect a party&apos;s ability to exercise such right or require such
            performance at any time thereafter nor shall the waiver of a breach
            constitute a waiver of any subsequent breach.
          </p>

          {/* Translation Interpretation */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Translation Interpretation
          </h2>
          <p className="text-gray-700 mb-8">
            These Terms and Conditions may have been translated if We have made
            them available to You on our Service. You agree that the original
            English text shall prevail in the case of a dispute.
          </p>

          {/* Changes to These Terms and Conditions */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Changes to These Terms and Conditions
          </h2>
          <p className="text-gray-700 mb-4">
            We reserve the right, at Our sole discretion, to modify or replace
            these Terms at any time. If a revision is material We will make
            reasonable efforts to provide at least 30 days&apos; notice prior to
            any new terms taking effect. What constitutes a material change will
            be determined at Our sole discretion.
          </p>

          <p className="text-gray-700 mb-8">
            By continuing to access or use Our Service after those revisions
            become effective, You agree to be bound by the revised terms. If You
            do not agree to the new terms, in whole or in part, please stop
            using the Service.
          </p>

          {/* Contact Us */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about these Terms and Conditions, You can
            contact us:
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
    )
}