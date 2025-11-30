'use client';

import React, { useEffect } from 'react';
import { useAdminStore } from '@/lib/adminStore';
import AdminLayout from './layout';
import Link from 'next/link';

interface StatCardProps {
  title: string;
  value: number | string;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="p-6 bg-white dark:bg-gray-800 rounded shadow hover:shadow-lg transition-shadow flex flex-col items-start">
    <div className="text-sm text-gray-500 dark:text-gray-400">{title}</div>
    <div className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-gray-200">{value}</div>
  </div>
);

export default function AdminHome() {
  const { products, loadSeed } = useAdminStore();

  useEffect(() => {
    loadSeed();
  }, [loadSeed]);

  // Placeholder stats
  const stats = [
    { title: 'Total Products', value: products.length },
    { title: 'Orders', value: '—' },
    { title: 'Revenue', value: '—' },
  ];

  return (
    <AdminLayout>
      {/* Header / Action */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 dark:text-gray-200">
          Admin Dashboard
        </h2>
        <Link
          href="/admin/products"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors"
        >
          Manage Products
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </AdminLayout>
  );
}
