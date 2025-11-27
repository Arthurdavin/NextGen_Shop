"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/Button";

const NEXTGEN_RED = "#DC3545";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [formData, setFormData] = useState({ emailOrPhone: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword((prev) => !prev);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { emailOrPhone, password } = formData;

    if (!emailOrPhone || !password) {
      setError("Email/Phone and password are required");
      setLoading(false);
      return;
    }

    const isEmail = emailOrPhone.includes("@");
    const isPhone = /^\d+$/.test(emailOrPhone);

    if (!isEmail && !isPhone) {
      setError("Please enter a valid email or phone number");
      setLoading(false);
      return;
    }

    try {
      const success = login(emailOrPhone, password);
      if (success) router.push("/");
      else setError("Invalid login details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      
      {/* Login Card */}
      <div className="flex flex-col lg:flex-row w-full max-w-4xl backdrop-blur-md bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-2xl overflow-hidden border border-gray-200 dark:border-gray-700">
        
        {/* LEFT: Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center py-8 px-6 lg:py-10 lg:px-10">
          <div className="w-full max-w-sm space-y-6">
            <h1 className="text-2xl lg:text-3xl font-extrabold text-gray-900 dark:text-gray-50">
              Welcome Back
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-sm">
              Log in to your NextGen Shop account
            </p>

            {error && (
              <div className="bg-red-50 dark:bg-red-900 border border-red-500 text-red-600 px-4 py-2 rounded-md animate-shake">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <input
                type="text"
                name="emailOrPhone"
                value={formData.emailOrPhone}
                onChange={handleChange}
                placeholder="Email or Phone Number"
                className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 placeholder-gray-400 dark:placeholder-gray-500 shadow-sm focus:ring-2 focus:ring-red-500 focus:outline-none transition-all duration-200 pr-10"
                />
                <button
                  type="button"
                  onClick={togglePassword}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <Button
                  type="submit"
                  disabled={loading}
                  style={{ backgroundColor: NEXTGEN_RED }}
                  className="hover:bg-red-700 text-white font-semibold px-8 py-3 rounded-lg w-full sm:w-auto flex items-center justify-center gap-2 transition-all duration-200"
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  ) : "Log In"}
                </Button>
                <Link
                  href="/forgot-password"
                  className="text-sm font-semibold text-red-600 dark:text-red-400 hover:underline text-center"
                >
                  Forgot Password?
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* RIGHT: Image */}
        <div className="hidden lg:block lg:w-1/2 relative">
          <Image
            src="/logofooter.png"
            alt="Shopping illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
