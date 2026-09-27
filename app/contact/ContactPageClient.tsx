// app/contact/ContactPageClient.tsx
"use client";

import { ContactForm } from "@/app/components/Contact/ContactForm";
import { Map, Mail, Phone, Clock, ArrowRight, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { siteConfig } from "../../lib/site";

interface ContactMethod {
  label: string;
  value: string;
  href: string;
  external: boolean;
  icon: LucideIcon;
  description: string;
}

const contactMethods: ContactMethod[] = [
  {
    label: "Visit Us",
    value: siteConfig.address,
    href: `https://maps.google.com/?q=${siteConfig.address}`,
    external: true,
    icon: Map,
    description: "Find us at our headquarters"
  },
  {
    label: "Email Us",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}?subject=Inquiry%20About%20Trip%20Services`,
    external: false,
    icon: Mail,
    description: "We reply within 4 hours"
  },
  {
    label: "Call or WhatsApp",
    value: siteConfig.phone,
    href: `https://wa.me/${siteConfig.whatsapp}`,
    external: true,
    icon: Phone,
    description: "Available 8 AM - 8 PM IST"
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};


export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-white via-white to-secondary/5">
      <div className="container mx-auto px-4 py-16 max-w-6xl">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary mb-4 tracking-tight">
            Let&apos;s Start Your
            <span className="block text-transparent bg-clip-text bg-linear-to-r from-secondary to-accent">
              Journey Together
            </span>
          </h1>
          <p className="text-primary/60 max-w-2xl mx-auto text-base leading-relaxed">
            We&apos;re here to help you plan the perfect trip. Whether you have a question 
            about destinations, need a custom itinerary, or just want to say hello.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-3 gap-6 mb-16"
        >
          {contactMethods.map((method: ContactMethod) => (
            <motion.a
              key={method.label}
              href={method.href}
              target={method.external ? "_blank" : undefined}
              rel={method.external ? "noopener noreferrer" : undefined}
              whileHover={{ 
                y: -8,
                transition: { duration: 0.2 }
              }}
              className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 p-8 border border-primary/10 hover:border-secondary/30"
            >
              {/* Decorative gradient line */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-linear-to-r from-secondary to-accent rounded-t-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative">
                {/* Icon with animated background */}
                <div className="relative w-14 h-14 rounded-2xl bg-secondary/10 group-hover:bg-secondary/15 transition-all duration-300 flex items-center justify-center mb-4">
                  <method.icon className="w-6 h-6 text-secondary group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-sm font-semibold text-primary/40 uppercase tracking-wider mb-1">
                  {method.label}
                </h3>
                <p className="text-base font-semibold text-primary mb-2 leading-snug">
                  {method.value}
                </p>
                <p className="text-sm text-primary/50">
                  {method.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute top-8 right-8 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-1">
                  <ArrowRight className="w-4 h-4 text-secondary" />
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Main Content: Form & Info */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid lg:grid-cols-5 gap-8"
        >
          {/* Form Section */}
          <div className="lg:col-span-3 bg-white rounded-3xl shadow-lg shadow-primary/5 p-8 sm:p-10 border border-primary/10">
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-primary mb-2">
                Send Us a Message
              </h2>
              <p className="text-primary/60">
                Tell us about your dream trip and we&apos;ll make it happen
              </p>
            </div>
            <ContactForm />
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-3xl shadow-lg shadow-primary/5 p-8 border border-primary/10">
              <h3 className="text-lg font-semibold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-secondary" />
                Working Hours
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Monday - Friday</span>
                  <span className="font-medium text-primary">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Saturday</span>
                  <span className="font-medium text-primary">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-primary/60">Sunday</span>
                  <span className="font-medium text-primary">Closed</span>
                </div>
              </div>
            </div>

            <div className="bg-linear-to-br from-secondary to-accent rounded-3xl p-8 text-white">
              <h3 className="text-lg font-semibold mb-3">
                Why Choose Us?
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-1.5 shrink-0" />
                  <span>Expert travel advisors with local knowledge</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-1.5 shrink-0" />
                  <span>Custom itineraries tailored to your style</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-1.5 shrink-0" />
                  <span>24/7 support during your journey</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-white/80 mt-1.5 shrink-0" />
                  <span>Best price guarantee on all bookings</span>
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Footer CTA */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-primary/40">
            Ready to explore? Let&apos;s create your perfect journey together.
          </p>
        </motion.div>
      </div>
    </div>
  );
}