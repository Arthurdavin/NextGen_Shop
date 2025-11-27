'use client';

import Link from 'next/link';
import { flashSalesProducts } from '@/data/mock-data';
import { ProductCard } from '@/components/products/Product-card';

export function BestSell() {
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
            <h2 className="text-3xl font-bold text-foreground mt-2">Best Selling Products</h2>
          </div>
          <Link
            href="/products"
            className="text-primary hover:underline font-semibold hidden md:block"
          >
            View All →
          </Link>
        </div>

        {/* Product grid - show only first 4 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {flashSalesProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} showDiscount={true} />
          ))}
        </div>
      </div>
    </section>
  );
}
