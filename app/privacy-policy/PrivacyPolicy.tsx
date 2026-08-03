import { siteConfig } from "../../lib/site";

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-16 md:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500">Last updated: July 01, 2026</p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          {/* Introduction */}
          <p className="text-gray-700 mb-6">
            This Privacy Policy describes Our policies and procedures on the
            collection, use and disclosure of Your information when You use the
            Service and tells You about Your privacy rights and how the law
            protects You.
          </p>

          <p className="text-gray-700 mb-8">
            We use Your Personal Data to provide and improve the Service. By
            using the Service, You agree to the collection and use of
            information in accordance with this Privacy Policy.
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
            For the purposes of this Privacy Policy:
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Account</strong>
                <span className="text-gray-700">
                  {" "}
                  means a unique account created for You to access our Service
                  or parts of our Service.
                </span>
              </div>
            </li>
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
                <strong className="text-gray-900">Company</strong>
                <span className="text-gray-700">
                  {" "}
                  (referred to as either &quot;the Company&quot;,
                  &quot;We&quot;, &quot;Us&quot; or &quot;Our&quot; in this
                  Privacy Policy) refers to {siteConfig.companyName}, {siteConfig.address} 
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Cookies</strong>
                <span className="text-gray-700">
                  {" "}
                  are small files that are placed on Your computer, mobile
                  device or any other device by a website, containing the
                  details of Your browsing history on that website among its
                  many uses.
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
                <strong className="text-gray-900">Personal Data</strong>
                <span className="text-gray-700">
                  {" "}
                  (or &quot;Personal Information&quot;) is any information that
                  relates to an identified or identifiable individual. We use
                  &quot;Personal Data&quot; and &quot;Personal Information&quot;
                  interchangeably unless a law uses a specific term.
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
                <strong className="text-gray-900">Service Provider</strong>
                <span className="text-gray-700">
                  {" "}
                  means any natural or legal person who processes the data on
                  behalf of the Company. It refers to third-party companies or
                  individuals employed by the Company to facilitate the Service,
                  to provide the Service on behalf of the Company, to perform
                  services related to the Service or to assist the Company in
                  analyzing how the Service is used.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">Usage Data</strong>
                <span className="text-gray-700">
                  {" "}
                  refers to data collected automatically, either generated by
                  the use of the Service or from the Service infrastructure
                  itself (for example, the duration of a page visit).
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

          {/* Collecting and Using Your Personal Data */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Collecting and Using Your Personal Data
          </h2>

          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Types of Data Collected
          </h3>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Personal Data
          </h4>
          <p className="text-gray-700 mb-4">
            While using Our Service, We may ask You to provide Us with certain
            personally identifiable information that can be used to contact or
            identify You. Personally identifiable information may include, but
            is not limited to:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-1">
            <li>Email address</li>
            <li>First name and last name</li>
            <li>Phone number</li>
          </ul>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Usage Data
          </h4>
          <p className="text-gray-700 mb-4">
            Usage Data is collected automatically when using the Service.
          </p>
          <p className="text-gray-700 mb-4">
            Usage Data may include information such as Your Device&apos;s
            Internet Protocol address (e.g. IP address), browser type, browser
            version, the pages of our Service that You visit, the time and date
            of Your visit, the time spent on those pages, unique device
            identifiers and other diagnostic data.
          </p>
          <p className="text-gray-700 mb-4">
            When You access the Service by or through a mobile device, We may
            collect certain information automatically, including, but not
            limited to, the type of mobile device You use, Your mobile
            device&apos;s unique ID, the IP address of Your mobile device, Your
            mobile operating system, the type of mobile Internet browser You
            use, unique device identifiers and other diagnostic data.
          </p>
          <p className="text-gray-700 mb-6">
            We may also collect information that Your browser sends whenever You
            visit Our Service or when You access the Service by or through a
            mobile device.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Tracking Technologies and Cookies
          </h4>
          <p className="text-gray-700 mb-4">
            We use Cookies and similar tracking technologies to track the
            activity on Our Service and store certain information. Tracking
            technologies We use include beacons, tags, and scripts to collect
            and track information and to improve and analyze Our Service. The
            technologies We use may include:
          </p>
          <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
            <li>
              <strong className="text-gray-900">
                Cookies or Browser Cookies.
              </strong>{" "}
              A cookie is a small file placed on Your Device. You can instruct
              Your browser to refuse all Cookies or to indicate when a Cookie is
              being sent. However, if You do not accept Cookies, You may not be
              able to use some parts of our Service.
            </li>
            <li>
              <strong className="text-gray-900">Web Beacons.</strong> Certain
              sections of our Service and our emails may contain small
              electronic files known as web beacons that permit the Company, for
              example, to count users who have visited those pages or opened an
              email and for other related website statistics.
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            Cookies can be &quot;Persistent&quot; or &quot;Session&quot;
            Cookies. Persistent Cookies remain on Your personal computer or
            mobile device when You go offline, while Session Cookies are deleted
            as soon as You close Your web browser.
          </p>

          <p className="text-gray-700 mb-4">
            Where required by law, we use non-essential cookies only with Your
            consent. You can withdraw or change Your consent at any time using
            Our cookie preferences tool or through Your browser/device settings.
          </p>

          <p className="text-gray-700 mb-4">
            We use both Session and Persistent Cookies for the purposes set out
            below:
          </p>

          <div className="space-y-6 mb-8">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">
                Necessary / Essential Cookies
              </h5>
              <p className="text-sm text-gray-600 mb-1">
                Type: Session Cookies
              </p>
              <p className="text-sm text-gray-600 mb-2">Administered by: Us</p>
              <p className="text-gray-700">
                Purpose: These Cookies are essential to provide You with
                services available through the Website and to enable You to use
                some of its features. They help to authenticate users and
                prevent fraudulent use of user accounts.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">
                Cookies Policy / Notice Acceptance Cookies
              </h5>
              <p className="text-sm text-gray-600 mb-1">
                Type: Persistent Cookies
              </p>
              <p className="text-sm text-gray-600 mb-2">Administered by: Us</p>
              <p className="text-gray-700">
                Purpose: These Cookies identify if users have accepted the use
                of cookies on the Website.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">
                Functionality Cookies
              </h5>
              <p className="text-sm text-gray-600 mb-1">
                Type: Persistent Cookies
              </p>
              <p className="text-sm text-gray-600 mb-2">Administered by: Us</p>
              <p className="text-gray-700">
                Purpose: These Cookies allow Us to remember choices You make
                when You use the Website, such as remembering your login details
                or language preference.
              </p>
            </div>
          </div>

          <p className="text-gray-700 mb-6">
            For more information about the cookies we use and your choices
            regarding cookies, please visit our Cookies Policy or the Cookies
            section of Our Privacy Policy.
          </p>

          {/* Use of Your Personal Data */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Use of Your Personal Data
          </h3>
          <p className="text-gray-700 mb-4">
            The Company may use Personal Data for the following purposes:
          </p>

          <ul className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  To provide and maintain our Service
                </strong>
                <span className="text-gray-700">
                  , including to monitor the usage of our Service.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  To manage Your Account:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  to manage Your registration as a user of the Service.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  For the performance of a contract:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  the development, compliance and undertaking of the purchase
                  contract for the products, items or services You have
                  purchased.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">To contact You:</strong>
                <span className="text-gray-700">
                  {" "}
                  by email, telephone calls, SMS, or other equivalent forms of
                  electronic communication.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">To provide You</strong>
                <span className="text-gray-700">
                  {" "}
                  with news, special offers, and general information about other
                  goods, services and events.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  To manage Your requests:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  To attend and manage Your requests to Us.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  For business transfers:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  We may use Your Personal Data to evaluate or conduct a merger,
                  divestiture, restructuring, reorganization, dissolution, or
                  other sale or transfer of some or all of Our assets.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">For other purposes</strong>
                <span className="text-gray-700">
                  : We may use Your information for other purposes, such as data
                  analysis, identifying usage trends, determining the
                  effectiveness of our promotional campaigns and to evaluate and
                  improve our Service.
                </span>
              </div>
            </li>
          </ul>

          <p className="text-gray-700 mb-4">
            We may share Your Personal Data in the following situations:
          </p>

          <ul className="space-y-4 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  With Service Providers:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  We may share Your Personal Data with Service Providers to
                  monitor and analyze the use of our Service, to contact You.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  For business transfers:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  We may share or transfer Your Personal Data in connection
                  with, or during negotiations of, any merger, sale of Company
                  assets, financing, or acquisition.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">With Affiliates:</strong>
                <span className="text-gray-700">
                  {" "}
                  We may share Your Personal Data with Our affiliates, in which
                  case we will require those affiliates to honor this Privacy
                  Policy.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">
                  With business partners:
                </strong>
                <span className="text-gray-700">
                  {" "}
                  We may share Your Personal Data with Our business partners to
                  offer You certain products, services or promotions.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">With other users:</strong>
                <span className="text-gray-700">
                  {" "}
                  If Our Service offers public areas, when You share Personal
                  Data or otherwise interact in the public areas with other
                  users.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary font-bold mt-1">•</span>
              <div>
                <strong className="text-gray-900">With Your consent</strong>
                <span className="text-gray-700">
                  : We may disclose Your Personal Data for any other purpose
                  with Your consent.
                </span>
              </div>
            </li>
          </ul>

          {/* Retention of Your Personal Data */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Retention of Your Personal Data
          </h3>
          <p className="text-gray-700 mb-4">
            The Company will retain Your Personal Data only for as long as is
            necessary for the purposes set out in this Privacy Policy. We will
            retain and use Your Personal Data to the extent necessary to comply
            with our legal obligations, resolve disputes, and enforce our legal
            agreements and policies.
          </p>

          <p className="text-gray-700 mb-4">
            Where possible, We apply shorter retention periods and/or reduce
            identifiability by deleting, aggregating, or anonymizing data. We
            apply different retention periods to different categories of
            Personal Data based on the purpose of processing and legal
            obligations:
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">
                Account Information
              </h5>
              <p className="text-gray-700">
                User Accounts: retained for the duration of your account
                relationship plus up to 24 months after account closure to
                handle any post-termination issues or resolve disputes.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">
                Customer Support Data
              </h5>
              <p className="text-gray-700">
                Support tickets and correspondence: up to 24 months from the
                date of ticket closure to resolve follow-up inquiries, track
                service quality, and defend against potential legal claims.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-xl">
              <h5 className="font-semibold text-gray-900 mb-2">Usage Data</h5>
              <p className="text-gray-700">
                Website analytics data: up to 24 months from the date of
                collection. Server logs: up to 24 months for security monitoring
                and troubleshooting purposes.
              </p>
            </div>
          </div>

          {/* Transfer of Your Personal Data */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Transfer of Your Personal Data
          </h3>
          <p className="text-gray-700 mb-4">
            Your information, including Personal Data, is processed at the
            Company&apos;s operating offices and in any other places where the
            parties involved in the processing are located. This information may
            be transferred to — and maintained on — computers located outside of
            Your state, province, country or other governmental jurisdiction.
          </p>

          <p className="text-gray-700 mb-6">
            Where required by applicable law, We will ensure that international
            transfers of Your Personal Data are subject to appropriate
            safeguards. The Company will take all steps reasonably necessary to
            ensure that Your data is treated securely and in accordance with
            this Privacy Policy.
          </p>

          {/* Delete Your Personal Data */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Delete Your Personal Data
          </h3>
          <p className="text-gray-700 mb-4">
            You have the right to delete or request that We assist in deleting
            the Personal Data that We have collected about You. Our Service may
            give You the ability to delete certain information about You from
            within the Service.
          </p>

          <p className="text-gray-700 mb-6">
            You may update, amend, or delete Your information at any time by
            signing in to Your Account, if you have one, and visiting the
            account settings section. You may also contact Us to request access
            to, correct, or delete any Personal Data that You have provided to
            Us.
          </p>

          {/* Disclosure of Your Personal Data */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Disclosure of Your Personal Data
          </h3>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Business Transactions
          </h4>
          <p className="text-gray-700 mb-4">
            If the Company is involved in a merger, acquisition or asset sale,
            Your Personal Data may be transferred. We will provide notice before
            Your Personal Data is transferred and becomes subject to a different
            Privacy Policy.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Law enforcement
          </h4>
          <p className="text-gray-700 mb-4">
            Under certain circumstances, the Company may be required to disclose
            Your Personal Data if required to do so by law or in response to
            valid requests by public authorities.
          </p>

          <h4 className="text-lg font-semibold text-gray-900 mt-6 mb-3">
            Other legal requirements
          </h4>
          <p className="text-gray-700 mb-4">
            The Company may disclose Your Personal Data in the good faith belief
            that such action is necessary to:
          </p>

          <ul className="list-disc pl-6 mb-8 text-gray-700 space-y-1">
            <li>Comply with a legal obligation</li>
            <li>Protect and defend the rights or property of the Company</li>
            <li>
              Prevent or investigate possible wrongdoing in connection with the
              Service
            </li>
            <li>
              Protect the personal safety of Users of the Service or the public
            </li>
            <li>Protect against legal liability</li>
          </ul>

          {/* Security of Your Personal Data */}
          <h3 className="text-xl font-semibold text-gray-900 mt-8 mb-4">
            Security of Your Personal Data
          </h3>
          <p className="text-gray-700 mb-8">
            The security of Your Personal Data is important to Us, but remember
            that no method of transmission over the Internet, or method of
            electronic storage is 100% secure. While We strive to use
            commercially reasonable means to protect Your Personal Data, We
            cannot guarantee its absolute security.
          </p>

          {/* Children's Privacy */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Children&apos;s Privacy
          </h2>
          <p className="text-gray-700 mb-4">
            Our Service does not address anyone under the age of 16. We do not
            knowingly collect personally identifiable information from anyone
            under the age of 16. If You are a parent or guardian and You are
            aware that Your child has provided Us with Personal Data, please
            contact Us.
          </p>

          <p className="text-gray-700 mb-8">
            If We become aware that We have collected Personal Data from anyone
            under the age of 16 without verification of parental consent, We
            take steps to remove that information from Our servers.
          </p>

          {/* Links to Other Websites */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Links to Other Websites
          </h2>
          <p className="text-gray-700 mb-4">
            Our Service may contain links to other websites that are not
            operated by Us. If You click on a third party link, You will be
            directed to that third party&apos;s site. We strongly advise You to
            review the Privacy Policy of every site You visit.
          </p>

          <p className="text-gray-700 mb-8">
            We have no control over and assume no responsibility for the
            content, privacy policies or practices of any third party sites or
            services.
          </p>

          {/* Changes to this Privacy Policy */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Changes to this Privacy Policy
          </h2>
          <p className="text-gray-700 mb-4">
            We may update Our Privacy Policy from time to time. We will notify
            You of any changes by posting the new Privacy Policy on this page.
          </p>

          <p className="text-gray-700 mb-4">
            We will let You know via email and/or a prominent notice on Our
            Service, prior to the change becoming effective and update the
            &quot;Last updated&quot; date at the top of this Privacy Policy.
          </p>

          <p className="text-gray-700 mb-8">
            You are advised to review this Privacy Policy periodically for any
            changes. Changes to this Privacy Policy are effective when they are
            posted on this page.
          </p>

          {/* Contact Us */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mt-12 mb-6">
            Contact Us
          </h2>
          <p className="text-gray-700 mb-4">
            If you have any questions about this Privacy Policy, You can contact
            us:
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
                href="tel:+911143757575"
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
                href={`${siteConfig.siteLink}/contact"`}
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
