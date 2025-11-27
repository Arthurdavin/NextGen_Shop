"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

import { Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useAuth } from "@/lib/store";
import { Button } from "@/components/ui/Button";
import { FaGoogle } from "react-icons/fa";

const NEXTGEN_RED = "#DB4437";

export default function SignUpPage() {
  const router = useRouter();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    emailOrPhone: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { name, emailOrPhone, password } = formData;

    if (!name || !emailOrPhone || !password) {
      setError("All fields are required");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const email = emailOrPhone.includes("@") ? emailOrPhone : "";

    try {
      const success = signup(email, password, name);
      if (success) router.push("/");
      else setError("Failed to create account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white dark:bg-gray-900 p-4 sm:p-6">
      
      {/* Back Button */}
      <div className="w-full max-w-4xl mb-6">
        <Link href="/">
          <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2 px-4 py-2">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="flex w-full max-w-4xl bg-white dark:bg-card rounded-xl shadow-xl overflow-hidden flex-col lg:flex-row">
        
        {/* LEFT — FORM */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8 sm:p-12">
          <div className="w-full max-w-sm space-y-6">
            
            <h1 className="text-2xl font-semibold text-foreground mb-1">
              Create an account
            </h1>
            <p className="text-sm text-muted-foreground mb-6">
              Enter your details below
            </p>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-700 px-4 py-3 rounded-md mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-400 dark:border-gray-600 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 transition"
              />

              <input
                type="text"
                name="emailOrPhone"
                placeholder="Email or Phone Number"
                value={formData.emailOrPhone}
                onChange={handleChange}
                className="w-full py-2 border-b border-gray-400 dark:border-gray-600 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 transition"
              />

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full py-2 border-b border-gray-400 dark:border-gray-600 bg-transparent text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-red-500 transition pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-0 inset-y-0 flex items-center pr-1 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>

              <Button
                type="submit"
                disabled={loading}
                style={{ backgroundColor: NEXTGEN_RED }}
                className="w-full hover:opacity-90 text-white font-semibold py-3 rounded-md transition"
              >
                {loading ? "Creating Account..." : "Create account"}
              </Button>
            </form>

            {/* Google Sign Up */}
            <button className="w-full flex items-center justify-center mt-5 border border-gray-300 bg-white text-gray-700 font-medium py-3 rounded-md hover:bg-gray-50 transition shadow-sm">
              <FaGoogle className="w-5 h-5 mr-2 text-red-500" />
              Sign up with Google
            </button>

            {/* Login Link */}
            <div className="text-center mt-6 text-muted-foreground text-sm">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-gray-600 hover:text-red-500 transition"
              >
                Log in
              </Link>
            </div>
          </div>
        </div>

        {/* RIGHT — ILLUSTRATION */}
        <div className="hidden lg:flex lg:w-1/2 relative">
          <Image
            src="/logofooter.png"
            alt="Signup illustration"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </div>
  );
}
