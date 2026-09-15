// app/admin/users/page.tsx
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  Shield,
  ShieldOff,
  User as UserIcon,
} from "lucide-react";
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

async function getUsers() {
  await connectDB();
  // Exclude password from the query for safety
  const users = await User.find({})
    .select("-password")
    .sort({ createdAt: -1 })
    .lean();

  return users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    email: user.email,
    phone: user.phone,
    isAdmin: user.isAdmin,
    createdAt: user.createdAt,
  }));
}

function formatDate(date: Date | string) {
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export default async function AdminUsersPage() {
  const session = await getAdminSession();
  if (!session) {
    redirect("/");
  }

  const users = await getUsers();

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8 flex items-center gap-3">
        <Link
          href="/admin/dashboard"
          className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary/10 text-primary transition hover:bg-primary/20"
          aria-label="Back to dashboard"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-primary">Users</h1>
          <p className="text-sm text-primary/50">
            {users.length} registered {users.length === 1 ? "user" : "users"}
          </p>
        </div>
      </div>

      {users.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-primary/20 bg-white p-10 text-center">
          <p className="text-primary/60">No users found.</p>
        </div>
      ) : (
        <>
          {/* Desktop table */}
          <div className="hidden overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-sm md:block">
            <table className="w-full text-left text-sm">
              <thead className="border-b border-primary/10 bg-primary/5 text-primary/70">
                <tr>
                  <th className="px-5 py-3 font-semibold">Name</th>
                  <th className="px-5 py-3 font-semibold">Email</th>
                  <th className="px-5 py-3 font-semibold">Phone</th>
                  <th className="px-5 py-3 font-semibold">Role</th>
                  <th className="px-5 py-3 font-semibold">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-primary/5">
                {users.map((user) => (
                  <tr key={user._id} className="transition hover:bg-primary/2">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <UserIcon className="h-4 w-4" />
                        </span>
                        <span className="font-medium text-primary">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-primary/70">{user.email}</td>
                    <td className="px-5 py-4 text-primary/70">{user.phone}</td>
                    <td className="px-5 py-4">
                      {user.isAdmin ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                          <Shield className="h-3.5 w-3.5" />
                          Admin
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary/60">
                          <ShieldOff className="h-3.5 w-3.5" />
                          User
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-primary/70">
                      {formatDate(user.createdAt)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="grid gap-4 md:hidden">
            {users.map((user) => (
              <div
                key={user._id}
                className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <UserIcon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="font-semibold text-primary">{user.name}</p>
                      <p className="text-xs text-primary/50">
                        Joined {formatDate(user.createdAt)}
                      </p>
                    </div>
                  </div>
                  {user.isAdmin ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-secondary/10 px-2.5 py-1 text-xs font-medium text-secondary">
                      <Shield className="h-3.5 w-3.5" />
                      Admin
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-2.5 py-1 text-xs font-medium text-primary/60">
                      <ShieldOff className="h-3.5 w-3.5" />
                      User
                    </span>
                  )}
                </div>

                <div className="mt-4 space-y-2 border-t border-primary/5 pt-4 text-sm">
                  <div className="flex items-center gap-2 text-primary/70">
                    <Mail className="h-4 w-4 text-primary/40" />
                    <span className="truncate">{user.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-primary/70">
                    <Phone className="h-4 w-4 text-primary/40" />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
