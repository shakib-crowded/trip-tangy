"use client";

import Image from "next/image";
import Link from "next/link";
import {
  socialLinks,
  ourServices,
  contactInfo,
} from "../../../public/data/footer";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 sm:pt-16 pb-8 sm:pb-12">
        {/* Footer Top - Logo & Description */}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12 mb-8 sm:mb-12 pb-8 border-b border-gray-800">
          {/* Logo & Social Section */}
          <div className="sm:col-span-2 lg:col-span-4 text-center sm:text-left">
            <Link
              href="/"
              className="inline-block mb-4 hover:opacity-80 transition-opacity"
            >
              <Image
                src="/transparent-logo.png"
                alt="Trip Tangy"
                width={666}
                height={375}
                style={{ width: "120px", height: "auto" }}
                priority
                className="mx-auto sm:mx-0"
              />
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-6 max-w-md mx-auto sm:mx-0">
              Trip Tangy is a leading travel agency offering flight bookings,
              hotel reservations, and holiday booking services worldwide.
            </p>
            <div className="flex items-center justify-center sm:justify-start space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className={`transition-all duration-300 hover:scale-110 hover:-translate-y-0.5 ${social.color}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-4 relative text-center sm:text-left">
              Contact Us
              <span className="absolute bottom-0 left-1/2 sm:left-0 w-8 h-0.5 bg-primary mt-1 transform -translate-x-1/2 sm:translate-x-0"></span>
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 group justify-center sm:justify-start">
                <svg
                  className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
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
                <span className="text-sm text-gray-400 hover:text-white transition-colors break-all sm:break-normal">
                  {contactInfo.phone}
                </span>
              </li>
              <li className="flex items-start gap-3 group justify-center sm:justify-start">
                <svg
                  className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
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
                <span className="text-sm text-gray-400 hover:text-white transition-colors break-all sm:break-normal">
                  {contactInfo.email}
                </span>
              </li>
              <li className="flex items-start gap-3 group justify-center sm:justify-start">
                <svg
                  className="w-5 h-5 text-primary mt-0.5 shrink-0 group-hover:scale-110 transition-transform"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="text-sm text-gray-400 hover:text-white transition-colors text-center sm:text-left">
                  {contactInfo.address}
                </span>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="sm:col-span-1 lg:col-span-3">
            <h3 className="text-white font-semibold text-lg mb-4 relative text-center sm:text-left">
              Our Services
              <span className="absolute bottom-0 left-1/2 sm:left-0 w-8 h-0.5 bg-primary mt-1 transform -translate-x-1/2 sm:translate-x-0"></span>
            </h3>
            <ul className="space-y-3 text-center sm:text-left">
              {ourServices.map((service) => (
                <li key={service.label}>
                  <Link
                    href={service.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                  >
                    {service.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="sm:col-span-2 lg:col-span-2">
            <h3 className="text-white font-semibold text-lg mb-4 relative text-center sm:text-left">
              Quick Links
              <span className="absolute bottom-0 left-1/2 sm:left-0 w-8 h-0.5 bg-primary mt-1 transform -translate-x-1/2 sm:translate-x-0"></span>
            </h3>
            <ul className="space-y-3 text-center sm:text-left">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-gray-400 hover:text-white transition-colors hover:translate-x-1 inline-block"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom - Policy Links */}
        <div className="flex flex-col space-y-4">
          <div className="flex flex-wrap justify-center sm:justify-between items-center gap-4">
            <p className="text-sm text-gray-400 text-center sm:text-left">
              &copy; {currentYear}{" "}
              <span className="text-white font-medium">Trip Tangy</span>. All
              rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              <Link
                href="/privacy-policy"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link
                href="/terms-conditions"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Terms and Conditions
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link
                href="/cancellation-policy"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Cancellation
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link
                href="/payment-policy"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Payment
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link
                href="/refund-policy"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Refund
              </Link>
              <span className="text-gray-600 hidden sm:inline">|</span>
              <Link
                href="/sitemap.xml"
                className="text-xs sm:text-sm text-gray-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

/*

Developed and Maintained By: 

    * * *     *     *        *         *     *      * * *     * * * *
   *          *     *      *   *       *   *          *       *      *
    * * *     * * * *     * * * *      * *            *       * * * *
         *    *     *    *       *     *   *          *       *      *
    * * *     *     *   *         *    *     *      * * *     * * * *
    
*/
