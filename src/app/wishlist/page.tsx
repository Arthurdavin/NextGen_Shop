'use client';

import Link from "next/link";
import { useAuth, useWishlist, useCart } from "@/lib/store";
import { Heart, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import CardLogin from "@/components/banner/CardLogin";

export default function WishlistPage() {
  const { isLoggedIn } = useAuth();
  const { items, removeFromWishlist } = useWishlist();
  const { addToCart } = useCart();

  if (!isLoggedIn) {
    return <CardLogin />;
  }

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <Link href="/" className="inline-flex items-center">
          <Button className="bg-destructive hover:bg-destructive/90 text-destructive-foreground flex items-center gap-2">
            <ArrowLeft size={18} />
            Back to Home
          </Button>
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-foreground dark:text-white mb-8">
          My Wishlist ({items.length})
        </h1>

        {items.length === 0 ? (
          <div className="text-center py-16">
            <Heart
              size={48}
              className="mx-auto text-muted-foreground dark:text-gray-400 mb-4 opacity-50"
            />
            <h2 className="text-xl font-semibold text-foreground dark:text-white mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-muted-foreground dark:text-gray-400 mb-6">
              Add products to your wishlist to save them for later
            </p>
            <Link href="/">
              <Button className="bg-accent hover:bg-accent/90 text-white">
                Continue Shopping
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {items.map((product) => (
              <div
                key={product.id}
                className="bg-card dark:bg-gray-800 border border-border dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <div className="aspect-square bg-secondary dark:bg-gray-700 flex items-center justify-center relative group">
                  <Image
                    src={
                      product.image ||
                      "/placeholder.svg?height=250&width=250&query=product"
                    }
                    alt={product.title}
                    className="w-full h-full object-cover"
                    width={250}
                    height={250}
                  />
                  <button
                    onClick={() => removeFromWishlist(product.id)}
                    className="absolute top-3 right-3 bg-foreground dark:bg-gray-200 text-background dark:text-gray-900 p-2 rounded-full hover:bg-accent dark:hover:bg-red-600 transition"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-foreground dark:text-white mb-2 line-clamp-2">
                    {product.title}
                  </h3>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-destructive">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-muted-foreground dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      addToCart({
                        ...product,
                        quantity: 1,
                        inStock: true,
                      });
                      removeFromWishlist(product.id);
                    }}
                    className="w-full bg-accent hover:bg-accent/90 text-white font-semibold py-2 rounded-lg transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart size={18} />
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
