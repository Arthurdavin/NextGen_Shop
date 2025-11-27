'use client';

import Link from 'next/link';
import { categories } from '@/data/mock-data';

export function BrowseByCategory() {
  return (
    <section className="bg-background py-16 border-b border-border">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-4 h-10 bg-primary rounded"></div>
            <h3 className="text-primary font-semibold">Categories</h3>
          </div>
          <h2 className="text-3xl font-bold text-foreground mb-12">Browse By Category</h2>
        </div>

        {/* Category grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/category/${category.name}`}
              className="group flex flex-col items-center justify-center p-6 bg-card rounded border border-border hover:bg-primary hover:border-primary transition cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition">{category.icon}</div>
              <p className="text-foreground text-sm text-center font-medium group-hover:text-primary-foreground">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
