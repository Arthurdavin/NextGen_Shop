'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useAdminStore } from '@/lib/adminStore';
import type { Product } from '@/types/product';


export default function AdminProducts() {
  // ✅ Hooks must be at top level
  const { products, deleteProduct } = useAdminStore();
 // example of top-level state

  return (
    <div className="p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
          Products
        </h2>
        <Link
          href="/admin/products/add"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
        >
          + New Product
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded shadow">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead className="bg-gray-50 dark:bg-gray-700">
            <tr>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">ID</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Image</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Name</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Category</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Price</th>
              <th className="px-4 py-2 text-left text-gray-700 dark:text-gray-200">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.length > 0 ? (
              products.map((p: Product) => (
                <tr
                  key={p.id}
                  className="border-t border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{p.id}</td>
                  <td className="px-4 py-3">
                    <Image
                      src={p.image ?? '/placeholder.png'}
                      alt={p.name ?? 'Product image'}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/placeholder.png';
                      }}
                    />
                  </td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{p.name}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">{p.category}</td>
                  <td className="px-4 py-3 text-gray-800 dark:text-gray-200">${p.price.toFixed(2)}</td>
                  <td className="px-4 py-3 space-x-2">
                    <Link
                      href={`/admin/products/edit/${p.id}`}
                      className="px-2 py-1 text-sm bg-yellow-100 rounded hover:bg-yellow-200 dark:bg-yellow-600 dark:text-gray-100 dark:hover:bg-yellow-500"
                      title="Edit Product"
                    >
                      Edit
                    </Link>
                    <button
                      onClick={() => {
                        if (confirm('Delete product?')) deleteProduct(p.id);
                      }}
                      className="px-2 py-1 text-sm bg-red-100 rounded hover:bg-red-200 dark:bg-red-600 dark:text-gray-100 dark:hover:bg-red-500"
                      title="Delete Product"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-500 dark:text-gray-400">
                  No products yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
