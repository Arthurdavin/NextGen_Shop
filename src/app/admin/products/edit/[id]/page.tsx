'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAdminStore } from '@/lib/adminStore';

interface ProductForm {
  name: string;
  price: string;
  category: string;
  image: string;
  description: string;
}

export default function EditProductPage() {
  const params = useSearchParams();
  const idParam = params?.get('id');
  const routeIdFromPath =
    typeof window !== 'undefined' ? window.location.pathname.split('/').pop() : undefined;
  const id = Number(idParam ?? routeIdFromPath);

  const getById = useAdminStore((s) => s.getById);
  const updateProduct = useAdminStore((s) => s.updateProduct);

  // Initialize state with default empty values
  const [form, setForm] = useState<ProductForm>({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
  });

  const router = useRouter();

  useEffect(() => {
    const product = getById(id);

    // Wrap in setTimeout to avoid synchronous state update warning
    setTimeout(() => {
      if (product) {
        setForm({
          name: product.name ?? '',
          price: String(product.price ?? ''),
          category: product.category ?? '',
          image: product.image ?? '',
          description: product.description ?? '',
        });
      } else {
        setForm({
          name: '',
          price: '',
          category: '',
          image: '',
          description: '',
        });
      }
    }, 0);
  }, [id, getById]);

  function handleChange<K extends keyof ProductForm>(key: K, value: string) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    updateProduct(id, {
      name: form.name,
      price: Number(form.price),
      category: form.category,
      image: form.image,
      description: form.description,
    });
    router.push('/admin/products');
  }

  const fields: (keyof ProductForm)[] = ['name', 'price', 'category', 'image'];

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
        Edit Product #{id}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-white dark:bg-gray-800 p-6 rounded shadow"
      >
        {fields.map((field) => (
          <div key={field}>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">
              {field.charAt(0).toUpperCase() + field.slice(1)}
            </label>
            <input
              type={field === 'price' ? 'number' : 'text'}
              step={field === 'price' ? '0.01' : undefined}
              value={form[field] || ''}
              onChange={(e) => handleChange(field, e.target.value)}
              className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
              placeholder={field === 'image' ? '/images/photo.jpg or https://...' : ''}
            />
          </div>
        ))}

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Description</label>
          <textarea
            value={form.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded px-3 py-2"
            rows={4}
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="submit"
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600"
          >
            Save
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
