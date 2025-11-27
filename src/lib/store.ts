'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem } from '@/types/product';

//
// ======================
//       AUTH STORE
// ======================
//

interface User {
  id: string;
  email: string;
  name: string;
  phone?: string;
  address?: string;
}

interface AuthStore {
  user: User | null;
  isLoggedIn: boolean;
  signup: (email: string, password: string, name: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,

      signup: (email, password, name) => {
        if (!email || !password || !name || password.length < 6) return false;

        const newUser: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name,
          phone: "",
          address: "",
        };

        set({ user: newUser, isLoggedIn: true });
        return true;
      },

      login: (email, password) => {
        if (!email || !password) return false;

        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email,
          name: email.split('@')[0],
          phone: "",
          address: "",
        };

        set({ user, isLoggedIn: true });
        return true;
      },

      logout: () => {
        set({ user: null, isLoggedIn: false });
      },

      updateUser: (updatedData) =>
        set((state) => ({
          user: state.user ? { ...state.user, ...updatedData } : null,
        })),
    }),
    {
      name: 'auth-store',
    }
  )
);

//
// ======================
//       CART STORE
// ======================
//

interface CartStore {
  items: CartItem[];
  addToCart: (product: CartItem) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartSubtotal: () => number;
  getCartCount: () => number;
}

export const useCart = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product) => {
        set((state) => {
          const existing = state.items.find((item) => item.id === product.id);

          if (existing) {
            return {
              items: state.items.map((item) =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + (product.quantity || 1) }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { ...product, quantity: product.quantity || 1 }],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item.id === productId ? { ...item, quantity } : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },

      clearCart: () => set({ items: [] }),

      getCartCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),

      getCartSubtotal: () =>
        get().items.reduce((sum, item) => sum + item.price * item.quantity, 0),

      getCartTotal: () => {
        const subtotal = get().getCartSubtotal();
        const shipping = subtotal > 100 ? 0 : 10;
        const tax = subtotal * 0.1;
        return subtotal + shipping + tax;
      },
    }),
    {
      name: 'cart-store',
    }
  )
);

//
// ======================
//     WISHLIST STORE
// ======================
//

interface WishlistStore {
  items: CartItem[];
  addToWishlist: (product: CartItem) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
}

export const useWishlist = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],

      addToWishlist: (product) => {
        set((state) => {
          const exists = state.items.find((item) => item.id === product.id);
          if (exists) return state;

          return {
            items: [...state.items, product],
          };
        });
      },

      removeFromWishlist: (productId) =>
        set((state) => ({
          items: state.items.filter((item) => item.id !== productId),
        })),

      isInWishlist: (productId) =>
        get().items.some((item) => item.id === productId),
    }),
    {
      name: 'wishlist-store',
    }
  )
);
