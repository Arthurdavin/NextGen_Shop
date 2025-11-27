import { FlashSalesSection } from '@/components/sales/Flash-sales-section';
import { BrowseByCategory } from '@/components/categories/Browse-by-category';
import { CarouselGrid } from '@/components/products/Carousel-grid';
import { bestSellingProducts } from '@/data/mock-data';
import NewArrivalSection from '@/components/products/NewArrivalSection';
import IPhoneBannerSlider from '@/components/banner/IPhoneBannerSlider';
import MusicPromoBanner from '@/components/music/MusicPromoBanner';
import { BestSell } from '@/components/sales/BestSell';


export const metadata = {
  title: 'NextGen-Shop',
  description: 'Your Ultimate Online Store for Electronics and Gadgets',
};

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      
      <main>
        <div className="max-w-7xl mx-auto p-4">
          <IPhoneBannerSlider/>
        </div>
        <CarouselGrid products={bestSellingProducts} title="Flash Sales" subtitle="This Month" />
        <BrowseByCategory />
        <BestSell />
        <MusicPromoBanner />
        <FlashSalesSection />
        <NewArrivalSection />
      </main>
    </div>
  );
}
