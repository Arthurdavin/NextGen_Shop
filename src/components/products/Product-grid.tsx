import { ProductCard } from '@/components/products/Product-card';
import type { Product } from '@/data/mock-data';
import Link from 'next/link';

interface ProductGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

export function ProductGrid({ products, title, subtitle }: ProductGridProps) {
  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-4 h-10 bg-primary rounded"></div>
              <h3 className="text-primary font-semibold">{subtitle}</h3>
            </div>
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          </div>
          <Link href="/products" className="text-primary hover:underline font-semibold hidden md:block">
            View All →
          </Link>
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* View all button for mobile */}
        <div className="mt-8 text-center md:hidden">
          <Link
            href="/products"
            className="inline-block bg-primary text-primary-foreground px-12 py-3 rounded hover:opacity-90 transition font-semibold"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
