'use client';

import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import Image from "next/image";

export default function TestFooter() {
  return (
    <footer className="bg-black text-white pt-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 pb-12 border-b border-gray-800 text-center md:text-left">

          {/* Logo */}
          <div className="col-span-2 md:col-span-1 mb-8 md:mb-0 flex flex-col items-center md:items-start">
            <Image
              src="/logofooter.png"
              alt="NextGen shop Logo"
              width={800}
              height={800}
              className="object-contain w-90 mx-auto md:mx-0"
            />
          </div>

          {/* Quick Links */}
          <div className="items-center md:items-start">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li>
                <Link href="/" className="hover:text-red-500">Home</Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-red-500">Products</Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-red-500">About</Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-red-500">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Account */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Account</h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><Link href="/account" className="hover:text-red-500">My Account</Link></li>
              <li><Link href="/login" className="hover:text-red-500">Login / Register</Link></li>
              <li><Link href="/cart" className="hover:text-red-500">Cart</Link></li>
              <li><Link href="/wishlist" className="hover:text-red-500">Wishlist</Link></li>
              <li><Link href="/shop" className="hover:text-red-500">Shop</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-5">Support</h3>
            <div className="flex flex-col space-y-3 text-sm text-gray-400">
              <a href="https://www.cstad.edu.kh/" className="hover:text-red-500">ISTAD</a>
              <a href="mailto:NextGenshop@gmail.com" className="hover:text-red-500">NextGenshop@gmail.com</a>
              <a href="tel:+88581528714" className="hover:text-red-500">+885 81 528 714</a>
            </div>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow us</h3>

            <div className="flex justify-center md:justify-start space-x-4 mb-6">
              <a href="https://www.facebook.com/share/1HH3eGX4ZV/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-red-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>

            <p className="text-sm font-medium">Subscribe</p>
            <p className="text-xs text-gray-400 mb-4 hidden md:block">
              Get 10% off your first order
            </p>

            <div className="relative w-full">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-black text-white text-sm py-3 pl-4 pr-12 border border-red-700 focus:border-red-500 rounded-lg"
              />
              <button className="absolute right-0 top-0 h-full p-3 hover:text-red-500">
                <Send className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="py-6 text-center text-xs text-gray-500">
          © Copyright Rimel 2025. All rights reserved
        </div>
      </div>
    </footer>
  );
}
