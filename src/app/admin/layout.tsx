'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Menu, Home } from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex bg-gray-50 dark:bg-gray-900">
      {/* Overlay for mobile */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-30 z-30 transition-opacity lg:hidden ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setSidebarOpen(false)}
      />

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transform lg:translate-x-0 transition-transform z-40 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <Link href="/admin" className="flex items-center gap-2">
            <Home size={20} className="text-gray-800 dark:text-gray-200" />
            <h1 className="text-lg font-bold text-gray-800 dark:text-gray-200">NextGen Admin</h1>
          </Link>
          <p className="text-sm text-gray-500 dark:text-gray-400">Product management</p>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/admin"
                className="block px-3 py-2 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products"
                className="block px-3 py-2 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Products
              </Link>
            </li>
            <li>
              <Link
                href="/admin/products/add"
                className="block px-3 py-2 rounded bg-blue-600 text-white hover:opacity-95 dark:bg-blue-500 dark:hover:bg-blue-600"
              >
                + Add Product
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:pl-64">
        {/* Mobile header */}
        <header className="lg:hidden flex items-center justify-between p-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          {/* Left button: opens sidebar */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Menu size={24} />
          </button>

          {/* Middle / Title */}
          <Link href="/admin" className="text-lg font-semibold text-gray-800 dark:text-gray-200">
            Admin Panel
          </Link>

          {/* Right button: go home (optional) */}
          <Link
            href="/admin"
            className="p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
            title="Go Home"
          >
            <Home size={24} />
          </Link>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
