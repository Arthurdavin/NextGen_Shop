'use client';

import { X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function CardLogin() {
  const router = useRouter();

  const handleClose = () => {
    router.push('/');
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center p-4 z-50">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      ></div>

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-gray-900 rounded-xl shadow-2xl max-w-lg w-full p-8 border border-gray-200 dark:border-gray-700 animate-in zoom-in duration-300">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-500 dark:text-gray-300 hover:text-gray-700 dark:hover:text-white transition duration-150 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Logo */}
        <Image
          src="/nextgen-shop.png"
          alt="NextGen Shop Logo"
          width={400}
          height={200}
          className="mx-auto mb-6"
        />

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mt-4 mb-4">
          You need to log in first
        </h2>

        {/* Subtitle */}
        <p className="text-sm text-center text-gray-500 dark:text-gray-400 mb-8 px-4 leading-relaxed">
          Please login or register to view your cart or wishlist on NextGen Shop.
        </p>

        {/* Buttons */}
        <div className="flex flex-row justify-center gap-4 flex-wrap">
          <Link href="/login">
            <button className="flex-1 min-w-[120px] max-w-xs py-3 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              Login
            </button>
          </Link>

          <Link href="/signup">
            <button className="flex-1 min-w-[120px] max-w-xs py-3 px-6 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-200 transform hover:scale-[1.02] active:scale-[0.98]">
              Register
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
