import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaLinkedin,
  FaPinterest,
} from "react-icons/fa6";
import { SiThreads } from "react-icons/si";
import { FaXTwitter } from "react-icons/fa6";
import { siteConfig } from "@/lib/site";

export const ourServices = [
  { label: "Stays", href: "/hotels" },
  { label: "Holidays", href: "/holidays" },
];

export const socialLinks = [
  {
    name: "Instagram",
    icon: FaInstagram,
    href: siteConfig.social.instagram,
    color: "hover:text-pink-600",
  },
  {
    name: "Facebook",
    icon: FaFacebook,
    href: siteConfig.social.facebook,
    color: "hover:text-blue-600",
  },
  {
    name: "YouTube",
    icon: FaYoutube,
    href: siteConfig.social.youtube,
    color: "hover:text-red-600",
  },
  {
    name: "LinkedIn",
    icon: FaLinkedin,
    href: siteConfig.social.linkedin,
    color: "hover:text-blue-700",
  },
  {
    name: "X (Twitter)",
    icon: FaXTwitter,
    href: siteConfig.social.x,
    color: "hover:text-black dark:hover:text-white",
  },
  {
    name: "Pinterest",
    icon: FaPinterest,
    href: siteConfig.social.pinterest,
    color: "hover:text-red-700",
  },
  {
    name: "Threads",
    icon: SiThreads,
    href: siteConfig.social.threads,
    color: "hover:text-black dark:hover:text-white",
  },
];

export const contactInfo = {
  phone: siteConfig.phone,
  email: siteConfig.email,
  address: siteConfig.address,
};
