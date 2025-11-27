/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store";
import Link from "next/link";
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AccountPage() {
  const router = useRouter();
  const { user, isLoggedIn, updateUser } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", address: "" });

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name ?? "",
        phone: user.phone ?? "",
        address: user.address ?? "",
      });
    }
  }, [user]);

  if (!isLoggedIn) return null;

  const handleSave = () => {
    updateUser({ ...user, ...form });
    setIsEditing(false);
  };

  return (
    <main className="min-h-[85vh] bg-gray-50 dark:bg-gray-900 flex items-start justify-center pt-10 pb-16">
      <div className="w-full max-w-5xl px-4">
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-2">
          My Account
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Manage your account information
        </p>

        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-6 lg:p-8 space-y-8">
          <div className="grid md:grid-cols-2 gap-8">

            {/* LEFT: Personal Info */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                Personal Information
              </h2>

              {!isEditing ? (
                <div className="space-y-4 text-gray-800 dark:text-gray-200">
                  <div>
                    <label className="text-sm font-medium text-gray-500 dark:text-gray-400 block mb-1">
                      Full Name
                    </label>
                    <p>{user?.name}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-red-500" />
                    <p>{user?.email}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={16} className="text-red-500" />
                    <p>{user?.phone || "Not provided"}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-red-500" />
                    <p>{user?.address || "Not provided"}</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <input
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Full Name"
                  />
                  <input
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="Phone Number"
                  />
                  <input
                    className="w-full p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-red-500 outline-none transition"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    placeholder="Address"
                  />
                </div>
              )}

              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="mt-4 w-full sm:w-auto bg-red-500 hover:bg-red-600 text-white rounded-lg px-6 py-2 transition"
                >
                  Edit Account
                </Button>
              ) : (
                <div className="flex flex-col sm:flex-row gap-4 mt-4">
                  <Button
                    onClick={handleSave}
                    className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white rounded-lg px-6 py-2 transition"
                  >
                    Save
                  </Button>
                  <Button
                    onClick={() => setIsEditing(false)}
                    className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white rounded-lg px-6 py-2 transition"
                  >
                    Cancel
                  </Button>
                </div>
              )}
            </div>

            {/* RIGHT: Stats */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-50">
                Account Statistics
              </h2>
              <div className="grid gap-4">
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Orders</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">0</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Total Spent</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">$0.00</p>
                </div>
                <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg text-center">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Member Since</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-50">Today</p>
                </div>
                <Link
                  href="/orders"
                  className="block mt-2 px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-900 dark:text-gray-50 text-center rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition"
                >
                  View Orders
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
