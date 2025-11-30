'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product } from '@/types/product';
import { PRODUCTS as seedProducts } from '@/data/mock-data';

interface AdminState {
  products: Product[];
  loadSeed: () => void;
  addProduct: (p: Omit<Product, 'id'>) => void;
  updateProduct: (id: number, updates: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getById: (id: number) => Product | undefined;
}

export const useAdminStore = create<AdminState>()(
  persist(
    (set, get) => ({
      products: [],

      loadSeed: () => {
        const current = get().products;
        if (!current || current.length === 0) {
          const seeded = (seedProducts ?? []).map((p: any, index: number) => ({
            ...p,
            id: typeof p.id === 'number' ? p.id : index + 1,
          }));
          set({ products: seeded });
        }
      },

      addProduct: (data) =>
        set((state) => {
          const nextId =
            state.products.length === 0
              ? 1
              : Math.max(...state.products.map((p) => Number(p.id))) + 1;

          const newProduct: Product = {
            ...data,
            id: nextId,
          };
          return { products: [newProduct, ...state.products] };
        }),

      updateProduct: (id, updates) =>
        set((state) => ({
          products: state.products.map((p) =>
            Number(p.id) === Number(id) ? { ...p, ...updates } : p
          ),
        })),

      deleteProduct: (id) =>
        set((state) => ({
          products: state.products.filter((p) => Number(p.id) !== Number(id)),
        })),

      getById: (id) =>
        get().products.find((p) => Number(p.id) === Number(id)),
    }),
    {
      name: 'admin-products-store',
      partialize: (state) => ({ products: state.products }),
    }
  )
);
