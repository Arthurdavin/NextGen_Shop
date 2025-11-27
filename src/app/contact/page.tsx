"use client";
import { Mail, Phone } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="w-full px-6 py-12 max-w-7xl mx-auto">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-12">

        {/* LEFT SIDE — Contact Info */}
        <div className="space-y-8">

          {/* Call Us */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition
                          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-3">
              <Phone className="w-8 h-8 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Call To Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">We are available 24/7, 7 days a week.</p>
            <p className="font-semibold mt-2 text-gray-800 dark:text-gray-100">Phone: +8801611112222</p>
          </div>

          {/* Write Us */}
          <div className="p-6 border rounded-xl shadow-sm hover:shadow-md transition
                          bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <div className="flex items-center gap-4 mb-3">
              <Mail className="w-8 h-8 text-red-600" />
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Write To Us</h2>
            </div>
            <p className="text-gray-600 dark:text-gray-300">Fill out our form and we will contact you within 24 hours.</p>
            <p className="mt-3 font-semibold text-gray-800 dark:text-gray-100">Email: customer@exclusive.com</p>
            <p className="font-semibold text-gray-800 dark:text-gray-100">Email: support@exclusive.com</p>
          </div>

        </div>

        {/* RIGHT SIDE — Contact Form */}
        <div className="md:col-span-2">
          <form className="grid grid-cols-1 md:grid-cols-3 gap-4 
                           bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm
                           border border-gray-200 dark:border-gray-700">

            <input
              type="text"
              placeholder="Your Name *"
              className="border p-3 rounded-md w-full focus:ring-1 focus:ring-red-600 focus:outline-none
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              required
            />

            <input
              type="email"
              placeholder="Your Email *"
              className="border p-3 rounded-md w-full focus:ring-1 focus:ring-red-600 focus:outline-none
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              required
            />

            <input
              type="text"
              placeholder="Your Phone *"
              className="border p-3 rounded-md w-full focus:ring-1 focus:ring-red-600 focus:outline-none
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
              required
            />

            <textarea
              placeholder="Your Message"
              className="border p-3 rounded-md w-full md:col-span-3 h-52 focus:ring-1 focus:ring-red-600 focus:outline-none
                         bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600"
            />

            <button
              type="submit"
              className="bg-red-600 text-white px-6 py-3 rounded-md w-fit md:col-span-3 hover:bg-red-700 transition"
            >
              Send Message
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}
