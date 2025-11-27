"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import Link from "next/link";

import "swiper/css";
import "swiper/css/pagination";

export default function IPhoneBannerSlider() {
  const banners = [
    {
      id: 1,
      title: "iPhone 14 Series",
      subtitle: "Up to 10% off Voucher",
      image: "/iphone14pro.png",
    },
    {
      id: 2,
      title: "iPhone 14 Pro",
      subtitle: "Special Discount Today",
      image: "/ipone14pro.png",
    },
    {
      id: 3,
      title: "iPhone 14 Pro Max",
      subtitle: "Limited Stock Offer",
      image: "/smartphone.jpg",
    },
  ];

  return (
    <div className="w-full">
      <Swiper
        modules={[Pagination, Autoplay]}
        pagination={{ clickable: true }}
        autoplay={{ delay: 3000 }}
        loop={true}
        className="rounded-xl overflow-hidden"
      >
        {banners.map((b) => (
          <SwiperSlide key={b.id}>
            <div className="relative w-full h-[260px] md:h-[360px] lg:h-[420px] bg-black text-white">
              {/* AUTO OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent z-10" />

              {/* IMAGE */}
              <Image
                src={b.image}
                alt="iPhone Banner"
                fill
                className="object-contain object-right"
                priority
              />

              {/* LEFT CONTENT */}
              <div className="absolute z-20 top-1/2 -translate-y-1/2 left-8 md:left-16 space-y-4">
                <p className="text-sm opacity-80">📱 {b.title}</p>

                <h1 className="text-3xl md:text-4xl font-bold leading-tight">
                  {b.subtitle.split("<br/>")[0]}
                  <br />
                  {b.subtitle.split("<br/>")[1]}
                </h1>

                <Link href="/products">
                  <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-10 py-3.5 rounded transition-colors duration-200">
                    Shop now
                  </button>
                </Link>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
