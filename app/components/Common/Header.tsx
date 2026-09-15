"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  User,
  LogOut,
  ChevronDown,
  Menu,
  X,
  Briefcase,
  LayoutDashboard,
  Building2,
  Palmtree,
  Info,
  Phone,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

// Left-side links (with icons)
const PRIMARY_LINKS = [
  { href: "/hotels", label: "Stays", icon: Building2 },
  { href: "/holidays", label: "Holidays", icon: Palmtree },
];

// Right-side links (with icons)
const SECONDARY_LINKS = [
  { href: "/about", label: "About Us", icon: Info },
  { href: "/contact", label: "Contact Us", icon: Phone },
];

export default function Header() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const isAdmin = Boolean(user?.isAdmin);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    await logout();
    setIsUserMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        isScrolled
          ? "border-primary/10 bg-white/95 shadow-sm"
          : "border-transparent bg-white/90"
      }`}
    >
      <nav className="container mx-auto px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <div className="flex items-center gap-6 lg:gap-10">
          {/* Logo */}
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="relative h-9 w-32 sm:h-10 sm:w-36 lg:h-12 lg:w-40">
              <Image
                src="/logo.png"
                alt="Trip Tangy"
                fill
                sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 128px"
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav — all left aligned */}
          <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-2 xl:gap-3">
            {/* Primary links */}
            <ul className="flex items-center gap-2 xl:gap-3">
              {PRIMARY_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition xl:text-base ${
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-primary hover:bg-primary/5 hover:text-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? "text-secondary"
                            : "text-primary/60 group-hover:text-secondary"
                        }`}
                      />
                      <span className="whitespace-nowrap">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Divider */}
            <span className="mx-1 h-6 w-px bg-primary/10" />

            {/* Secondary links */}
            <ul className="flex items-center gap-2 xl:gap-3">
              {SECONDARY_LINKS.map((link) => {
                const isActive = pathname === link.href;
                const Icon = link.icon;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`group flex items-center gap-2 rounded-full px-4 py-2 text-[15px] font-semibold transition xl:text-base ${
                        isActive
                          ? "bg-secondary/10 text-secondary"
                          : "text-primary hover:bg-primary/5 hover:text-secondary"
                      }`}
                    >
                      <Icon
                        className={`h-4 w-4 transition-colors ${
                          isActive
                            ? "text-secondary"
                            : "text-primary/60 group-hover:text-secondary"
                        }`}
                      />
                      <span className="whitespace-nowrap">{link.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Push auth to the far right */}
            <div className="ml-auto">
              {user ? (
                <div className="relative" ref={userMenuRef}>
                  <button
                    onClick={() => setIsUserMenuOpen((v) => !v)}
                    className="flex cursor-pointer items-center gap-2 rounded-full border border-primary/10 bg-primary/5 py-1.5 pl-2 pr-3 text-primary transition hover:border-primary/20 hover:bg-primary/10"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                    <span className="text-sm font-semibold">
                      {user.name.split(" ")[0]}
                    </span>
                    <ChevronDown
                      className={`h-4 w-4 text-primary/50 transition-transform ${
                        isUserMenuOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-52 overflow-hidden rounded-2xl border border-primary/10 bg-white py-1.5 shadow-lg shadow-primary/10">
                      {isAdmin && (
                        <>
                          <Link
                            href="/admin/dashboard"
                            className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary/80 transition hover:bg-primary/5 hover:text-primary"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            <LayoutDashboard className="h-4 w-4 text-primary/40" />
                            Admin dashboard
                          </Link>
                          <div className="my-1 border-t border-primary/10" />
                        </>
                      )}
                      <Link
                        href="/profile"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary/80 transition hover:bg-primary/5 hover:text-primary"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User className="h-4 w-4 text-primary/40" />
                        My profile
                      </Link>
                      <Link
                        href="/bookings"
                        className="flex items-center gap-2.5 px-4 py-2.5 text-sm text-primary/80 transition hover:bg-primary/5 hover:text-primary"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <Briefcase className="h-4 w-4 text-primary/40" />
                        My bookings
                      </Link>
                      <div className="my-1 border-t border-primary/10" />
                      <button
                        onClick={handleLogout}
                        className="flex w-full cursor-pointer items-center gap-2.5 px-4 py-2.5 text-left text-sm text-accent transition hover:bg-accent/5"
                      >
                        <LogOut className="h-4 w-4" />
                        Log out
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    href="/login"
                    className="cursor-pointer rounded-full border border-primary/20 px-4 py-2 text-sm font-semibold text-primary transition hover:border-primary hover:bg-primary/5"
                  >
                    Log in
                  </Link>
                  <Link
                    href="/register"
                    className="cursor-pointer rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-secondary hover:shadow-md"
                  >
                    Create account
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile: avatar / login + hamburger — pushed to the right */}
          <div className="ml-auto flex items-center gap-3 lg:hidden">
            {user ? (
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                {user.name.charAt(0).toUpperCase()}
              </span>
            ) : (
              <Link
                href="/login"
                className="hidden cursor-pointer items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary sm:flex"
              >
                Log in
              </Link>
            )}

            <button
              onClick={() => setIsMenuOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-lg text-primary transition hover:bg-primary/5"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out lg:hidden ${
            isMenuOpen ? "mt-3 max-h-128 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="flex flex-col gap-1 border-t border-primary/10 pb-2 pt-3">
            {[...PRIMARY_LINKS, ...SECONDARY_LINKS].map((link) => {
              const isActive = pathname === link.href;
              const Icon = link.icon;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                      isActive
                        ? "bg-primary/5 text-secondary"
                        : "text-primary hover:bg-primary/5 hover:text-secondary"
                    }`}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Icon className="h-4 w-4" />
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="border-t border-primary/10 pb-3 pt-3">
            {user ? (
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-3 px-3 pb-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                  <p className="text-sm font-semibold text-primary">
                    {user.name}
                  </p>
                </div>

                {isAdmin && (
                  <>
                    <Link
                      href="/admin/dashboard"
                      className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-primary/80 hover:bg-primary/5"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <LayoutDashboard className="h-4 w-4" />
                      Admin dashboard
                    </Link>
                    <div className="my-1 border-t border-primary/10" />
                  </>
                )}

                <Link
                  href="/profile"
                  className="rounded-lg px-3 py-2.5 text-sm text-primary/80 hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My profile
                </Link>
                <Link
                  href="/bookings"
                  className="rounded-lg px-3 py-2.5 text-sm text-primary/80 hover:bg-primary/5"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My bookings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-left text-sm font-medium text-accent hover:bg-accent/5"
                >
                  <LogOut className="h-4 w-4" />
                  Log out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-1">
                <Link
                  href="/login"
                  className="w-full cursor-pointer rounded-full border-2 border-primary px-5 py-2.5 text-center text-sm font-semibold text-primary transition hover:bg-primary hover:text-white"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Log in
                </Link>
                <Link
                  href="/register"
                  className="w-full cursor-pointer rounded-full bg-primary px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:bg-secondary"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Create account
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}