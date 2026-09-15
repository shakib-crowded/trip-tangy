"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, type ChangeEvent, type FormEvent } from "react";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Loader2,
  ArrowRight,
  UserPlus,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Field from "@/app/components/Common/FormField";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [loginData, setLoginData] = useState(() => {
    if (typeof window === "undefined") {
      return { email: "", password: "", rememberMe: false };
    }
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";
    return {
      email: savedEmail && savedRememberMe ? savedEmail : "",
      password: "",
      rememberMe: Boolean(savedEmail && savedRememberMe),
    };
  });
  const [errors, setErrors] = useState({ email: "", password: "" });

  const validate = () => {
    const nextErrors = { email: "", password: "" };
    let isValid = true;

    if (!loginData.email) {
      nextErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      nextErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!loginData.password) {
      nextErrors.password = "Password is required";
      isValid = false;
    } else if (loginData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name !== "rememberMe" && errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const result = await login(loginData.email, loginData.password);
    setIsLoading(false);

    if (result.success) {
      if (loginData.rememberMe) {
        localStorage.setItem("rememberedEmail", loginData.email);
        localStorage.setItem("rememberMe", "true");
      } else {
        localStorage.removeItem("rememberedEmail");
        localStorage.removeItem("rememberMe");
      }

      const redirectTo = searchParams.get("returnUrl") || "/";
      router.push(redirectTo);
    } else if (result.requiresOtp && result.email) {
      router.push(`/register?verify=${encodeURIComponent(result.email)}`);
    } else {
      setErrors((prev) => ({
        ...prev,
        password: result.message || "Login failed",
      }));
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-primary/5 via-white to-primary/10 px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl shadow-primary/5 lg:grid-cols-5">
          {/* Left decorative panel */}
          <div className="relative hidden overflow-hidden bg-primary lg:col-span-2 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,var(--tw-gradient-stops))] from-secondary/30 via-primary to-primary" />
            <div className="absolute -left-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -right-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />

            <div className="relative z-10 p-10">
              <h2 className="mt-8 text-3xl font-bold leading-tight text-white">
                Welcome back to Trip Tangy
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Pick up right where you left off — your trips, bookings, and
                saved plans are waiting.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-3">
            <div className="px-8 pb-2 pt-8 lg:px-10 lg:pt-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-primary">
                    Welcome back
                  </h1>
                  <p className="mt-1 text-sm text-primary/50">
                    Log in to manage your trips and bookings.
                  </p>
                </div>
                <Link
                  href="/register"
                  className="hidden items-center gap-1.5 rounded-lg border border-primary/15 px-3.5 py-2 text-xs font-semibold text-primary/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:inline-flex"
                >
                  <UserPlus className="h-3.5 w-3.5" />
                  Sign up
                </Link>
              </div>
            </div>

            <div className="px-8 pb-8 pt-6 lg:px-10 lg:pb-10">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <Field
                  id="login-email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  name="email"
                  value={loginData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isLoading}
                  placeholder="you@example.com"
                />

                <Field
                  id="login-password"
                  label="Password"
                  icon={Lock}
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={loginData.password}
                  onChange={handleChange}
                  error={errors.password}
                  disabled={isLoading}
                  placeholder="••••••••"
                  trailing={
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      disabled={isLoading}
                      className="text-primary/35 transition hover:text-primary/70 disabled:opacity-50"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  }
                />

                <div className="flex items-center justify-between pt-1">
                  <label className="flex cursor-pointer items-center gap-2 text-sm text-primary/70 select-none">
                    <input
                      type="checkbox"
                      name="rememberMe"
                      checked={loginData.rememberMe}
                      onChange={handleChange}
                      disabled={isLoading}
                      className="h-4 w-4 cursor-pointer rounded border-primary/30 text-primary accent-primary focus:ring-primary/30 disabled:opacity-50"
                    />
                    Remember me
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-secondary hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Signing in...
                    </>
                  ) : (
                    <>
                      Log in
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Mobile signup button */}
            <div className="border-t border-primary/8 px-8 py-5 sm:hidden">
              <Link
                href="/register"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/15 py-3 text-sm font-semibold text-primary/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <UserPlus className="h-4 w-4" />
                New to Trip Tangy? Create an account
              </Link>
            </div>

            {/* Desktop bottom signup prompt */}
            <div className="hidden border-t border-primary/8 px-10 py-5 sm:block">
              <p className="text-center text-sm text-primary/50">
                New to Trip Tangy?{" "}
                <Link
                  href="/register"
                  className="font-semibold text-primary underline decoration-primary/20 underline-offset-2 transition hover:text-secondary hover:decoration-secondary/40"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
