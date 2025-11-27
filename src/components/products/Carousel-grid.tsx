'use client';

import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductCard } from '@/components/products/Product-card';
import type { Product } from '@/data/mock-data';

interface CarouselGridProps {
  products: Product[];
  title: string;
  subtitle?: string;
}

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 33,
    minutes: 18,
    seconds: 54,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        else if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        else if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        else if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ label, value }: { label: string; value: number }) => (
    <div className="text-center">
      <div className="bg-primary text-primary-foreground rounded px-3 py-2 text-lg font-bold">
        {String(value).padStart(2, '0')}
      </div>
      <p className="text-muted-foreground text-xs mt-1">{label}</p>
    </div>
  );

  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <TimeUnit label="Days" value={timeLeft.days} />
      <span className="text-primary font-bold">:</span>
      <TimeUnit label="Hours" value={timeLeft.hours} />
      <span className="text-primary font-bold">:</span>
      <TimeUnit label="Mins" value={timeLeft.minutes} />
      <span className="text-primary font-bold">:</span>
      <TimeUnit label="Secs" value={timeLeft.seconds} />
    </div>
  );
}

export function CarouselGrid({ products, title, subtitle }: CarouselGridProps) {
  const scrollContainer = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollContainer.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 1);
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener('resize', checkScroll);
    return () => window.removeEventListener('resize', checkScroll);
  }, []);

  // Scroll exactly one card at a time
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainer.current) {
      const card = scrollContainer.current.querySelector<HTMLDivElement>('.snap-center');
      if (!card) return;

      const cardWidth = card.offsetWidth + parseInt(getComputedStyle(card).marginRight); // include gap
      scrollContainer.current.scrollBy({
        left: direction === 'left' ? -cardWidth : cardWidth,
        behavior: 'smooth',
      });

      setTimeout(checkScroll, 300);
    }
  };

  return (
    <section className="bg-background py-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4 md:gap-0">
          <div>
            {subtitle && (
              <div className="flex items-center gap-4 mb-2">
                <div className="w-4 h-10 bg-primary rounded"></div>
                <h3 className="text-primary font-semibold">{subtitle}</h3>
              </div>
            )}
            <h2 className="text-3xl font-bold text-foreground">{title}</h2>
          </div>
          <CountdownTimer />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-primary/80 dark:bg-gray-800 hover:bg-primary/90 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full transition"
          >
            <ChevronLeft size={24} className="text-foreground dark:text-red-500" />
          </button>

          {/* Scrollable Products with snap */}
          <div
            ref={scrollContainer}
            onScroll={checkScroll}
            className="flex gap-4 sm:gap-6 overflow-x-auto pb-2 scroll-smooth scrollbar-hide snap-x snap-mandatory"
            style={{ scrollBehavior: 'smooth', scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product) => (
              <div key={product.id} className="shrink-0 w-64 sm:w-72 md:w-80 flex-none snap-center">
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          {/* Right Arrow */}
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-primary/80 dark:bg-gray-800 hover:bg-primary/90 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed p-2 rounded-full transition"
          >
            <ChevronRight size={24} className="text-foreground dark:text-red-500" />
          </button>
        </div>
      </div>
    </section>
  );
}
