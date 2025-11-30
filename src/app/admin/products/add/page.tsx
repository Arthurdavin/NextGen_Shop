'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAdminStore } from '@/lib/adminStore';

export default function AddProductPage() {
  const addProduct = useAdminStore((s) => s.addProduct);
  const router = useRouter();
  const [form, setForm] = useState({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // simple validation
    if (!form.name || !form.price) {
      alert('Name and price required');
      return;
    }

    addProduct({
      name: form.name,
      price: Number(form.price),
      category: form.category || 'Uncategorized',
      image: form.image || '/placeholder.png',
      description: form.description || '',
    } as any);

    router.push('/admin/products');
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">Add Product</h2>

      <form className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Name</label>
          <input
            value={form.name}
            onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
            placeholder="Product name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Price</label>
          <input
            value={form.price}
            onChange={(e) => setForm((s) => ({ ...s, price: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
            placeholder="123.45"
            type="number"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Category</label>
          <input
            value={form.category}
            onChange={(e) => setForm((s) => ({ ...s, category: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
            placeholder="Category"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Image URL</label>
          <input
            value={form.image}
            onChange={(e) => setForm((s) => ({ ...s, image: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
            placeholder="/images/photo.jpg or https://..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={form.description}
            onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          >
            Create
          </button>
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
