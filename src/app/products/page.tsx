'use client';

import Link from "next/link";
import { useState, useMemo } from "react";
import { ProductCard } from "@/components/products/Product-card";
import { PRODUCTS, CATEGORIES } from "@/data/mock-data";
import { ChevronRight } from "lucide-react";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS;

    if (selectedCategory) {
      products = products.filter((p) => p.category === selectedCategory);
    }

    if (sortBy === "price-low") products = [...products].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") products = [...products].sort((a, b) => b.price - a.price);
    else if (sortBy === "popular") products = [...products].sort((a, b) => b.rating - a.rating);

    return products;
  }, [selectedCategory, sortBy]);

  return (
    <div className="min-h-screen bg-background dark:bg-gray-900">
      {/* Breadcrumb */}
      <div className="bg-background dark:bg-gray-800 border-b border-border dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground dark:text-gray-300">
            <Link href="/" className="hover:text-foreground dark:hover:text-white transition">
              Home
            </Link>
            <ChevronRight size={16} />
            <span className="font-semibold text-foreground dark:text-white">All Products</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-card dark:bg-gray-800 rounded-lg p-6 border border-border dark:border-gray-700 sticky top-24 space-y-8">
              {/* Categories */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-foreground dark:text-white">Categories</h3>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`text-left px-3 py-2 rounded transition ${
                      selectedCategory === null
                        ? "bg-primary text-primary-foreground font-semibold"
                        : "hover:bg-muted dark:hover:bg-gray-700 text-foreground dark:text-gray-200"
                    }`}
                  >
                    All Products
                  </button>
                  {CATEGORIES.map((category) => (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.name)}
                      className={`text-left px-3 py-2 rounded transition ${
                        selectedCategory === category.name
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted dark:hover:bg-gray-700 text-foreground dark:text-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h3 className="font-bold text-lg mb-4 text-foreground dark:text-white">Sort By</h3>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-3 py-2 rounded border border-input dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200"
                >
                  <option value="newest">Newest</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="popular">Most Popular</option>
                </select>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <section className="lg:col-span-3">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">All Products</h1>
              <p className="text-muted-foreground dark:text-gray-300">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => <ProductCard key={product.id} product={product} />)
              ) : (
                <div className="col-span-full text-center py-12">
                  <p className="text-muted-foreground dark:text-gray-300 text-lg">
                    No products found in this category.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
