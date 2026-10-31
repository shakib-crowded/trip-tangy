import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ArrowUpRight, Building2, LayoutDashboard, Users } from "lucide-react";
import { connectDB } from "@/lib/mongodb";
import { verifyAccessToken } from "@/lib/jwt";
import User from "@/models/User";

const navigation = [
  { href: "/admin/dashboard", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/dashboard/hotels", label: "Hotels", icon: Building2 },
  { href: "/admin/users", label: "Guests", icon: Users },
];

export default async function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) redirect("/");

  let userId: string;
  try {
    const payload = await verifyAccessToken(accessToken);
    userId = payload.userId;
  } catch {
    redirect("/");
  }

  await connectDB();
  const user = await User.findById(userId).select("isAdmin");
  if (!user?.isAdmin) redirect("/");

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="border-b border-slate-200 bg-white">
        <div className="container mx-auto flex flex-col gap-5 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-white shadow-sm shadow-primary/20">
              <Building2 className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-secondary">
                Trip Tangy · Operations
              </p>
              <p className="font-semibold text-primary">Stay management</p>
            </div>
          </div>

          <nav
            aria-label="Admin navigation"
            className="flex items-center gap-1 overflow-x-auto"
          >
            {navigation.map(({ href, label, icon: Icon }) => (
              <Link
                key={href}
                href={href}
                className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-primary/5 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
                {label}
              </Link>
            ))}
            <Link
              href="/hotels"
              className="ml-1 flex shrink-0 items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-primary transition hover:border-primary/30 hover:bg-primary/5"
            >
              View storefront
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </nav>
        </div>
      </div>
      {children}
    </div>
  );
}
