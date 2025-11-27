'use client';
import Link from "next/link";
import { useState, useMemo, useEffect } from "react";
import { ProductCard } from "@/components/products/Product-card";
import { PRODUCTS, CATEGORIES } from "@/data/mock-data";
import { ChevronRight, ChevronDown } from "lucide-react";

export default function AllProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("newest");
  const [isMobile, setIsMobile] = useState(false);

  // Detect if the screen is mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 1024); // Below lg breakpoint
    };

    checkIsMobile();
    window.addEventListener("resize", checkIsMobile);
    return () => window.removeEventListener("resize", checkIsMobile);
  }, []);

  const filteredProducts = useMemo(() => {
    let products = PRODUCTS;
    
    // On mobile, always show all products unless a specific category is explicitly selected
    if (!isMobile || selectedCategory !== null) {
      if (selectedCategory) {
        products = products.filter((p) => p.category === selectedCategory);
      }
    }

    if (sortBy === "price-low") products = [...products].sort((a, b) => a.price - b.price);
    else if (sortBy === "price-high") products = [...products].sort((a, b) => b.price - a.price);
    else if (sortBy === "popular") products = [...products].sort((a, b) => b.rating - a.rating);
    
    return products;
  }, [selectedCategory, sortBy, isMobile]);

  const handleAllProductsClick = () => {
    setSelectedCategory(null);
  };

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
          {/* Sidebar - Only visible on desktop */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="bg-card dark:bg-gray-800 rounded-lg p-6 border border-border dark:border-gray-700 sticky top-24 space-y-8">
              <div>
                <h3 className="font-bold text-lg mb-4 text-foreground dark:text-white">Categories</h3>
                <div className="flex flex-col space-y-2">
                  <button
                    onClick={handleAllProductsClick}
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

          {/* Mobile Controls */}
          <div className="lg:hidden col-span-1">
            <div className="bg-card dark:bg-gray-800 rounded-lg p-6 border border-border dark:border-gray-700 mb-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-foreground dark:text-white">
                    Showing all {filteredProducts.length} products
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="flex-1 px-3 py-2 rounded border border-input dark:border-gray-600 bg-background dark:bg-gray-700 text-foreground dark:text-gray-200"
                  >
                    <option value="newest">Sort: Newest</option>
                    <option value="price-low">Sort: Price Low to High</option>
                    <option value="price-high">Sort: Price High to Low</option>
                    <option value="popular">Sort: Most Popular</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <section className="lg:col-span-3 w-full">
            <div className="mb-6">
              <h1 className="text-4xl font-bold text-foreground dark:text-white mb-2">All Products</h1>
              <p className="text-muted-foreground dark:text-gray-300">
                Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? "s" : ""}
              </p>
            </div>

            {/* Mobile Category Selection - Optional dropdown */}
            <div className="lg:hidden mb-6">
              <details className="bg-card dark:bg-gray-800 rounded-lg border border-border dark:border-gray-700">
                <summary className="flex justify-between items-center p-4 cursor-pointer list-none">
                  <span className="font-medium text-foreground dark:text-white">
                    Filter by Category
                  </span>
                  <ChevronDown className="w-5 h-5 transition-transform duration-200" />
                </summary>
                <div className="p-4 pt-2 space-y-2 max-h-60 overflow-y-auto">
                  <button
                    onClick={handleAllProductsClick}
                    className={`w-full text-left px-3 py-2 rounded transition ${
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
                      className={`w-full text-left px-3 py-2 rounded transition ${
                        selectedCategory === category.name
                          ? "bg-primary text-primary-foreground font-semibold"
                          : "hover:bg-muted dark:hover:bg-gray-700 text-foreground dark:text-gray-200"
                      }`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </details>
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