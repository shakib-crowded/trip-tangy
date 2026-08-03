"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard,
  User,
  Briefcase,
  LogOut,
  Loader2,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/bookings", label: "My Bookings", icon: Briefcase },
  { href: "/profile", label: "My Profile", icon: User },
];

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace("/");
    }
  }, [isLoading, user, router]);

  if (isLoading || !user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
        <div className="flex flex-col items-center gap-4">
          <div className="rounded-full bg-primary/10 p-5">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>

          <div className="text-center">
            <p className="text-lg font-medium text-gray-900">Loading...</p>
            <p className="text-sm text-gray-500">
              Please wait while we prepare everything.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-64 shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 lg:sticky lg:top-24">
              <div className="flex items-center gap-3 px-2 pb-4 mb-2 border-b border-gray-100">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white text-lg font-semibold shrink-0">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-primary truncate">
                    {user.name}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>

              <nav className="flex lg:flex-col gap-1 overflow-x-auto lg:overflow-visible">
                {NAV_ITEMS.map((item) => {
                  const isActive = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition ${
                        isActive
                          ? "bg-primary text-white"
                          : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                      }`}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {item.label}
                    </Link>
                  );
                })}
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap text-red-600 hover:bg-red-50 transition cursor-pointer"
                >
                  <LogOut className="h-4 w-4 shrink-0" />
                  Logout
                </button>
              </nav>
            </div>
          </aside>

          {/* Page content */}
          <main className="flex-1 min-w-0">{children}</main>
        </div>
      </div>
    </div>
  );
}
