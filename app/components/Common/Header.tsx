"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import {
  X,
  Eye,
  EyeOff,
  User,
  Mail,
  Phone,
  Lock,
  Loader2,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const NAV_LINKS = [
  { href: "/flights", label: "Flights" },
  { href: "/hotels", label: "Hotels" },
  { href: "/holidays", label: "Holidays" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/blog", label: "Blog" },
];

type AuthMode = "login" | "register";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>("login");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Error states
  const [loginErrors, setLoginErrors] = useState({
    email: "",
    password: "",
  });

  const [registerErrors, setRegisterErrors] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef<HTMLDivElement>(null);

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

  // Load saved credentials on component mount
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    const savedRememberMe = localStorage.getItem("rememberMe") === "true";

    if (savedEmail && savedRememberMe) {
      setLoginData((prev) => ({
        ...prev,
        email: savedEmail,
        rememberMe: true,
      }));
    }
  }, []);

  // Validation functions
  const validateLogin = () => {
    let isValid = true;
    const errors = { email: "", password: "" };

    if (!loginData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!loginData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  const validateRegister = () => {
    let isValid = true;
    const errors = {
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    };

    if (!registerData.name.trim()) {
      errors.name = "Full name is required";
      isValid = false;
    } else if (registerData.name.trim().length < 2) {
      errors.name = "Name must be at least 2 characters";
      isValid = false;
    }

    if (!registerData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(registerData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!registerData.phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (
      !/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(
        registerData.phone,
      )
    ) {
      errors.phone = "Please enter a valid phone number";
      isValid = false;
    }

    if (!registerData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (registerData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    } else if (
      !/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/.test(registerData.password)
    ) {
      errors.password =
        "Password must contain at least one uppercase, one lowercase, and one number";
      isValid = false;
    }

    if (!registerData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
      isValid = false;
    } else if (registerData.confirmPassword !== registerData.password) {
      errors.confirmPassword = "Passwords do not match";
      isValid = false;
    }

    setRegisterErrors(errors);
    return isValid;
  };

  const { user, login, register, logout } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateLogin()) return;

    setIsLoading(true);
    const result = await login(loginData.email, loginData.password);
    setIsLoading(false);

    if (result.success) {
      setIsAuthModalOpen(false);
      setLoginData({ email: "", password: "", rememberMe: false });
      setLoginErrors({ email: "", password: "" });
    } else {
      setLoginErrors((prev) => ({
        ...prev,
        password: result.message || "Login failed",
      }));
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateRegister()) return;

    setIsLoading(true);
    const result = await register({
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      password: registerData.password,
    });
    setIsLoading(false);

    if (result.success) {
      setIsAuthModalOpen(false);
      setRegisterData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } else {
      setRegisterErrors((prev) => ({
        ...prev,
        email: result.message || "Registration failed",
      }));
    }
  };
  // Handle input changes
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    const val = type === "checkbox" ? checked : value;
    setLoginData((prev) => ({ ...prev, [name]: val }));

    // Clear error on typing
    if (
      name !== "rememberMe" &&
      loginErrors[name as keyof typeof loginErrors]
    ) {
      setLoginErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterData((prev) => ({ ...prev, [name]: value }));
    // Clear error on typing
    if (registerErrors[name as keyof typeof registerErrors]) {
      setRegisterErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const openAuthModal = (mode: AuthMode) => {
    setAuthMode(mode);
    setIsAuthModalOpen(true);
    setIsMenuOpen(false);
    // Reset loading state when opening modal
    setIsLoading(false);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
    setIsLoading(false);
    setLoginErrors({ email: "", password: "" });
    setRegisterErrors({
      name: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    });
  };

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-50">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className="relative h-9 w-32 sm:h-10 sm:w-36 lg:h-12 lg:w-40">
                <Image
                  src="/new"
                  alt="TripTangy Logo"
                  fill
                  sizes="(min-width: 1024px) 160px, (min-width: 640px) 144px, 128px"
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:gap-6 xl:gap-8">
              <ul className="flex items-center gap-5 xl:gap-7 font-semibold text-primary">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="whitespace-nowrap text-[15px] xl:text-base transition hover:text-secondary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="flex items-center gap-3">
                {user ? (
                  <div className="relative" ref={userMenuRef}>
                    <button
                      onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                      className="flex items-center gap-2 rounded-full bg-primary/10 pl-2 pr-3 py-1.5 text-primary hover:bg-primary/20 transition cursor-pointer"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white text-sm font-semibold">
                        {user.name.charAt(0).toUpperCase()}
                      </span>
                      <span className="text-sm font-semibold">
                        {user.name.split(" ")[0]}
                      </span>
                      <ChevronDown className="h-4 w-4" />
                    </button>

                    {isUserMenuOpen && (
                      <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white shadow-lg border border-gray-100 py-1 z-50">
                        <Link
                          href="/profile"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/bookings"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          My Bookings
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 cursor-pointer"
                        >
                          <LogOut className="h-4 w-4" /> Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => openAuthModal("login")}
                      className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary cursor-pointer"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => openAuthModal("register")}
                      className="rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white cursor-pointer"
                    >
                      Create Account
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Controls */}
            <div className="flex items-center gap-2 lg:hidden">
              <button
                onClick={() => openAuthModal("login")}
                className="hidden items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-secondary sm:flex cursor-pointer"
              >
                Login
              </button>

              <button
                onClick={toggleMenu}
                className="flex h-10 w-10 items-center justify-center text-primary hover:bg-gray-100 rounded-lg transition"
                aria-label="Toggle Menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu */}
          <div
            className={`lg:hidden transition-all duration-300 ease-in-out ${
              isMenuOpen
                ? "max-h-125 opacity-100"
                : "max-h-0 opacity-0 overflow-hidden"
            }`}
          >
            <ul className="flex flex-col gap-1 border-t border-gray-100 pt-3 pb-4 font-medium text-primary">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block rounded-md px-2 py-2.5 transition hover:bg-gray-50 hover:text-secondary"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li className="pt-2 flex flex-col gap-2">
                <button
                  onClick={() => openAuthModal("login")}
                  className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-secondary cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => openAuthModal("register")}
                  className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-primary px-5 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-white cursor-pointer"
                >
                  Create Account
                </button>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      {/* Auth Modal */}
      {isAuthModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-999 flex items-center justify-center p-4 animate-in fade-in duration-200"
          onClick={closeAuthModal}
        >
          <div
            className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-bold text-primary">
                {authMode === "login" ? "Welcome Back" : "Create Account"}
              </h2>
              <button
                onClick={closeAuthModal}
                className="p-2 hover:bg-gray-100 rounded-full transition"
                aria-label="Close modal"
                disabled={isLoading}
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {authMode === "login" ? (
                // Login Form
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <label
                      htmlFor="login-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="login-email"
                        type="email"
                        name="email"
                        value={loginData.email}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          loginErrors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {loginErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {loginErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="login-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="login-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={loginData.password}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          loginErrors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {loginErrors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {loginErrors.password}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                      <input
                        type="checkbox"
                        name="rememberMe"
                        checked={loginData.rememberMe}
                        onChange={handleLoginChange}
                        disabled={isLoading}
                        className="rounded border-gray-300 text-primary focus:ring-primary cursor-pointer disabled:opacity-50"
                      />
                      Remember me
                    </label>
                    <button
                      type="button"
                      disabled={isLoading}
                      className="text-sm text-primary hover:text-secondary transition disabled:opacity-50"
                      onClick={() => {
                        // Add forgot password logic here
                        console.log("Forgot password clicked");
                      }}
                    >
                      Forgot password?
                    </button>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Signing in...
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Don&apos;t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("register")}
                      disabled={isLoading}
                      className="text-primary font-semibold hover:text-secondary transition disabled:opacity-50"
                    >
                      Create Account
                    </button>
                  </p>
                </form>
              ) : (
                // Registration Form
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label
                      htmlFor="register-name"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="register-name"
                        type="text"
                        name="name"
                        value={registerData.name}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          registerErrors.name
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="Your Name"
                      />
                    </div>
                    {registerErrors.name && (
                      <p className="mt-1 text-sm text-red-500">
                        {registerErrors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="register-email"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="register-email"
                        type="email"
                        name="email"
                        value={registerData.email}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          registerErrors.email
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="you@example.com"
                      />
                    </div>
                    {registerErrors.email && (
                      <p className="mt-1 text-sm text-red-500">
                        {registerErrors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="register-phone"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Phone Number
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="register-phone"
                        type="tel"
                        name="phone"
                        value={registerData.phone}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          registerErrors.phone
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="+91 9999999999"
                      />
                    </div>
                    {registerErrors.phone && (
                      <p className="mt-1 text-sm text-red-500">
                        {registerErrors.phone}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="register-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Create Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="register-password"
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={registerData.password}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          registerErrors.password
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {registerErrors.password && (
                      <p className="mt-1 text-sm text-red-500">
                        {registerErrors.password}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="register-confirm-password"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        id="register-confirm-password"
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={registerData.confirmPassword}
                        onChange={handleRegisterChange}
                        disabled={isLoading}
                        className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 transition ${
                          registerErrors.confirmPassword
                            ? "border-red-500 focus:ring-red-500"
                            : "border-gray-300"
                        } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                        placeholder="••••••••"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        disabled={isLoading}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </div>
                    {registerErrors.confirmPassword && (
                      <p className="mt-1 text-sm text-red-500">
                        {registerErrors.confirmPassword}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-primary text-white py-2.5 rounded-lg font-semibold hover:bg-secondary transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        Creating account...
                      </>
                    ) : (
                      "Create Account"
                    )}
                  </button>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setAuthMode("login")}
                      disabled={isLoading}
                      className="text-primary font-semibold hover:text-secondary transition disabled:opacity-50"
                    >
                      Sign In
                    </button>
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
