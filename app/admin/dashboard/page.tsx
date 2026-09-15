// app/admin/dashboard/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import { PlusCircle, Hotel, Users, LayoutDashboard } from "lucide-react";
import { verifyAccessToken } from "@/lib/jwt";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

async function getAdminSession() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) return null;

  try {
    const payload = await verifyAccessToken(accessToken);
    await connectDB();
    const dbUser = await User.findById(payload.userId).select("isAdmin name");
    if (!dbUser?.isAdmin) return null;

    return { userId: payload.userId, name: dbUser.name };
  } catch {
    return null;
  }
}

export default async function AdminDashboardPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-8 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary">
          <LayoutDashboard className="h-5 w-5" />
        </span>
        <div>
          <h1 className="text-2xl font-bold text-primary">Admin dashboard</h1>
          <p className="text-sm text-primary/50">
            Welcome back, {session.name.split(" ")[0]}.
          </p>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Link
          href="/admin/dashboard/hotels/new"
          className="group flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition hover:border-secondary/30 hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/10 text-secondary">
            <PlusCircle className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-primary">Add a hotel</p>
            <p className="mt-1 text-sm text-primary/50">
              Create a new hotel listing with rooms, pricing, and photos.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/dashboard/hotels"
          className="group flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition hover:border-secondary/30 hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Hotel className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-primary">Manage hotels</p>
            <p className="mt-1 text-sm text-primary/50">
              Edit or remove existing hotel listings.
            </p>
          </div>
        </Link>

        <Link
          href="/admin/users"
          className="group flex flex-col gap-3 rounded-2xl border border-primary/10 bg-white p-5 shadow-sm transition hover:border-secondary/30 hover:shadow-md"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Users className="h-5 w-5" />
          </span>
          <div>
            <p className="font-semibold text-primary">Users</p>
            <p className="mt-1 text-sm text-primary/50">
              View registered users and manage admin access.
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}
