"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import { Eye, EyeOff, User, Mail, Phone, Lock, Loader2, ShieldCheck, ArrowRight, LogIn } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import Field from "@/app/components/Common/FormField";

export default function RegisterPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { register, verifyOtp, resendOtp } = useAuth();

  const [step, setStep] = useState<"form" | "otp">("form");
  const [pendingEmail, setPendingEmail] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // --- OTP step state ---
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(0);

  useEffect(() => {
    if (resendCooldown <= 0) return;
    const timer = setInterval(() => setResendCooldown((s) => s - 1), 1000);
    return () => clearInterval(timer);
  }, [resendCooldown]);

  useEffect(() => {
    const verifyEmail = searchParams.get("verify");
    if (verifyEmail) {
      setPendingEmail(verifyEmail);
      setStep("otp");
      setResendCooldown(60);
    }
  }, [searchParams]);

  const validate = () => {
    const nextErrors = { name: "", email: "", phone: "", password: "", confirmPassword: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      nextErrors.name = "Full name is required";
      isValid = false;
    } else if (formData.name.trim().length < 2) {
      nextErrors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!formData.email) {
      nextErrors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      nextErrors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!formData.phone) {
      nextErrors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/.test(formData.phone)) {
      nextErrors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!formData.password) {
      nextErrors.password = "Password is required";
      isValid = false;
    } else if (formData.password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(formData.password)) {
      nextErrors.password = "Add an uppercase, a lowercase and a number";
      isValid = false;
    }

    if (!formData.confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (formData.confirmPassword !== formData.password) {
      nextErrors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setErrors(nextErrors);
    return isValid;
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    setIsLoading(false);

    if (result.success && result.requiresOtp) {
      setPendingEmail(result.email || formData.email);
      setStep("otp");
      setResendCooldown(60);
    } else if (!result.success) {
      setErrors((prev) => ({ ...prev, email: result.message || "Registration failed" }));
    }
  };

  const handleVerifyOtp = async (e: FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      setOtpError("Enter the 6-digit code");
      return;
    }
    setOtpError("");
    setIsVerifying(true);
    const result = await verifyOtp(pendingEmail, otp);
    setIsVerifying(false);

    if (result.success) {
      const redirectTo = searchParams.get("redirect") || "/";
      router.push(redirectTo);
    } else {
      setOtpError(result.message || "Verification failed");
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;
    setIsResending(true);
    const result = await resendOtp(pendingEmail);
    setIsResending(false);
    setOtpError(result.success ? "" : result.message || "Could not resend code");
    if (result.success) setResendCooldown(60);
  };

  if (step === "otp") {
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-primary/5 via-white to-primary/10 px-4 py-12">
        <div className="w-full max-w-md">
          <div className="relative overflow-hidden rounded-2xl border border-primary/10 bg-white shadow-xl shadow-primary/5">
            {/* Subtle top accent bar */}
            <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/60 via-primary to-primary/60" />
            
            <div className="px-8 pb-1 pt-9">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary ring-4 ring-primary/5">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-primary">Verify your email</h1>
              <p className="mt-1.5 text-sm leading-relaxed text-primary/50">
                We sent a code to <span className="font-medium text-primary/70">{pendingEmail}</span>
              </p>
            </div>

            <div className="px-8 pb-9 pt-6">
              <form onSubmit={handleVerifyOtp} noValidate className="space-y-5">
                <div>
                  <label htmlFor="otp" className="mb-2 block text-sm font-medium text-primary/70">
                    Verification code
                  </label>
                  <input
                    id="otp"
                    inputMode="numeric"
                    maxLength={6}
                    autoFocus
                    value={otp}
                    onChange={(e) => {
                      setOtp(e.target.value.replace(/\D/g, "").slice(0, 6));
                      if (otpError) setOtpError("");
                    }}
                    disabled={isVerifying}
                    placeholder="••••••"
                    className="w-full rounded-xl border border-primary/15 bg-primary/2 px-4 py-3.5 text-center text-2xl font-semibold tracking-[0.5em] text-primary outline-none transition-all duration-200 placeholder:text-primary/20 focus:border-primary/40 focus:bg-white focus:ring-4 focus:ring-primary/5 disabled:opacity-60"
                  />
                  {otpError && <p className="mt-2 text-xs font-medium text-red-500">{otpError}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isVerifying || otp.length !== 6}
                  className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-secondary hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                >
                  {isVerifying ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify & continue
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>
              </form>

              <div className="mt-7 flex items-center gap-3">
                <div className="h-px flex-1 bg-primary/10" />
                <span className="text-xs font-medium uppercase tracking-wider text-primary/30">or</span>
                <div className="h-px flex-1 bg-primary/10" />
              </div>

              <div className="mt-5 space-y-2 text-center">
                <p className="text-sm text-primary/60">
                  Didn&rsquo;t get the code?{" "}
                  {resendCooldown > 0 ? (
                    <span className="font-medium text-primary/40">Resend in {resendCooldown}s</span>
                  ) : (
                    <button
                      type="button"
                      onClick={handleResend}
                      disabled={isResending}
                      className="font-semibold text-primary transition hover:text-secondary disabled:opacity-60"
                    >
                      {isResending ? "Sending..." : "Resend code"}
                    </button>
                  )}
                </p>
                <p className="text-xs text-primary/40">
                  Wrong email?{" "}
                  <button
                    type="button"
                    onClick={() => setStep("form")}
                    className="font-medium text-primary/60 underline decoration-primary/20 underline-offset-2 transition hover:text-secondary hover:decoration-secondary/40"
                  >
                    Edit details
                  </button>
                </p>
              </div>
            </div>
          </div>

          {/* Login shortcut at the bottom */}
          <div className="mt-6 text-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-primary/50 transition hover:text-primary"
            >
              <LogIn className="h-3.5 w-3.5" />
              Already have an account? Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-linear-to-br from-primary/5 via-white to-primary/10 px-4 py-12">
      <div className="w-full max-w-5xl">
        <div className="grid overflow-hidden rounded-3xl border border-primary/10 bg-white shadow-2xl shadow-primary/5 lg:grid-cols-5">
          {/* Left decorative panel */}
          <div className="relative hidden overflow-hidden bg-primary lg:col-span-2 lg:flex lg:flex-col lg:justify-between">
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,var(--tw-gradient-stops))] from-secondary/30 via-primary to-primary" />
            <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-80 w-80 rounded-full bg-secondary/20 blur-3xl" />
            
            <div className="relative z-10 p-10">
              <h2 className="mt-8 text-3xl font-bold leading-tight text-white">
                Start your journey with Trip Tangy
              </h2>
              <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/60">
                Create an account and unlock personalized travel planning, exclusive deals, and seamless booking.
              </p>
            </div>
          </div>

          {/* Right form panel */}
          <div className="lg:col-span-3">
            <div className="px-8 pb-2 pt-8 lg:px-10 lg:pt-10">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold tracking-tight text-primary">Create account</h1>
                  <p className="mt-1 text-sm text-primary/50">Fill in your details to get started.</p>
                </div>
                <Link
                  href="/login"
                  className="hidden items-center gap-1.5 rounded-lg border border-primary/15 px-3.5 py-2 text-xs font-semibold text-primary/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary sm:inline-flex"
                >
                  <LogIn className="h-3.5 w-3.5" />
                  Log in
                </Link>
              </div>
            </div>

            <div className="px-8 pb-8 pt-6 lg:px-10 lg:pb-10">
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field
                    id="register-name"
                    label="Full name"
                    icon={User}
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    disabled={isLoading}
                    placeholder="Your name"
                  />
                  <Field
                    id="register-phone"
                    label="Phone number"
                    icon={Phone}
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    error={errors.phone}
                    disabled={isLoading}
                    placeholder="+91 98765 43210"
                  />
                </div>

                <Field
                  id="register-email"
                  label="Email address"
                  icon={Mail}
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  disabled={isLoading}
                  placeholder="you@example.com"
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Field
                      id="register-password"
                      label="Password"
                      icon={Lock}
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
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
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      }
                    />
                    {!errors.password && (
                      <p className="mt-1.5 text-[11px] leading-tight text-primary/40">
                        6+ chars, uppercase, lowercase & number.
                      </p>
                    )}
                  </div>

                  <Field
                    id="register-confirm-password"
                    label="Confirm password"
                    icon={Lock}
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    error={errors.confirmPassword}
                    disabled={isLoading}
                    placeholder="••••••••"
                    trailing={
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        disabled={isLoading}
                        className="text-primary/35 transition hover:text-primary/70 disabled:opacity-50"
                        tabIndex={-1}
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    }
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-200 hover:bg-secondary hover:shadow-primary/30 disabled:cursor-not-allowed disabled:opacity-60 disabled:shadow-none"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Creating account...
                    </>
                  ) : (
                    <>
                      Create account
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

                <p className="pt-1 text-center text-[11px] leading-relaxed text-primary/40">
                  By continuing, you agree to Trip Tangy&rsquo;s{" "}
                  <Link href="/terms-conditions" className="font-medium text-primary/60 underline decoration-primary/20 underline-offset-2 transition hover:text-secondary">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy-policy" className="font-medium text-primary/60 underline decoration-primary/20 underline-offset-2 transition hover:text-secondary">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            </div>

            {/* Mobile login link */}
            <div className="border-t border-primary/8 px-8 py-5 sm:hidden">
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-primary/15 py-3 text-sm font-semibold text-primary/70 transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
              >
                <LogIn className="h-4 w-4" />
                Already have an account? Log in
              </Link>
            </div>

            {/* Desktop bottom login prompt */}
            <div className="hidden border-t border-primary/8 px-10 py-5 sm:block">
              <p className="text-center text-sm text-primary/50">
                Already have an account?{" "}
                <Link
                  href="/login"
                  className="font-semibold text-primary underline decoration-primary/20 underline-offset-2 transition hover:text-secondary hover:decoration-secondary/40"
                >
                  Log in instead
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}