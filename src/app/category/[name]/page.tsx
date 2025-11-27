import { ProductCard } from '@/components/products/Product-card';
import { PRODUCTS, categories } from '@/data/mock-data';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { use } from 'react';

interface CategoryPageProps {
  params: Promise<{
    name: string;
  }>;
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const { name } = use(params);  // ✅ FIX: unwrap params
  const decodedCategoryName = decodeURIComponent(name);

  const categoryIcon =
    categories.find((c) => c.name === decodedCategoryName)?.icon || '📦';

  const filteredProducts = PRODUCTS.filter(
    (product) => product.category === decodedCategoryName
  );

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main>
        {/* Breadcrumb */}
        <div className="bg-background border-b border-border">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-muted-foreground hover:text-foreground">
                Home
              </Link>
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
              <span className="text-foreground font-medium">
                {decodedCategoryName}
              </span>
            </div>
          </div>
        </div>

        {/* Category Header */}
        <div className="bg-background py-12 border-b border-border">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex items-center gap-6 mb-4">
              <div className="text-6xl">{categoryIcon}</div>
              <div>
                <h1 className="text-4xl font-bold text-foreground mb-2">
                  {decodedCategoryName}
                </h1>
                <p className="text-muted-foreground">
                  {filteredProducts.length} products found
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="bg-background py-12">
          <div className="max-w-7xl mx-auto px-4">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No products found in this category
                </p>
                <Link
                  href="/"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2 rounded hover:opacity-90 transition"
                >
                  Browse All Products
                </Link>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
