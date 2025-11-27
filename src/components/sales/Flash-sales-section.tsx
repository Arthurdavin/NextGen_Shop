'use client';

import Link from 'next/link';
import { flashSalesProducts } from '@/data/mock-data';
import { ProductCard } from '@/components/products/Product-card';


export function FlashSalesSection() {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4">
              <div className="w-4 h-10 bg-primary rounded"></div>
              <h3 className="text-primary font-semibold">Today</h3>
            </div>
            <h2 className="text-3xl font-bold text-foreground mt-2">Explore Our Products</h2>
          </div>
          <Link href="/products" className="text-primary hover:underline font-semibold hidden md:block">
            View All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {flashSalesProducts.map((product) => (
            <ProductCard key={product.id} product={product} showDiscount={true} />
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-12 py-3 rounded hover:opacity-90 transition font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
