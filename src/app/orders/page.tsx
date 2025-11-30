'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/store';
import Link from 'next/link';
import { Package } from 'lucide-react';

export default function OrdersPage() {
  const router = useRouter();
  const { isLoggedIn } = useAuth();

  useEffect(() => {
    if (!isLoggedIn) router.push('/login');
  }, [isLoggedIn, router]);

  if (!isLoggedIn)
    return (
      <div className="min-h-[85vh] flex items-center justify-center text-gray-700 dark:text-gray-200">
        Redirecting...
      </div>
    );

  return (
    <main className="min-h-[85vh] bg-gray-50 dark:bg-gray-900 flex items-start justify-center pt-10 pb-16">
      <div className="w-full max-w-4xl px-4">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-50 mb-1">
            My Orders
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Track and manage your orders
          </p>
        </div>

        {/* Empty State */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-md p-10 text-center space-y-4">
          <Package size={48} className="mx-auto text-red-500 opacity-60" />
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-50">
            No orders yet
          </h2>
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            You have not placed any orders yet.
          </p>
          <Link
            href="/"
            className="inline-block mt-2 px-8 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg font-semibold transition"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
