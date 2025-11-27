"use client";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function MusicPromoBanner() {
  // Set your target date/time
  const targetDate = new Date();
  targetDate.setDate(targetDate.getDate() + 5); // 5 days from now
  targetDate.setHours(targetDate.getHours() + 23);
  targetDate.setMinutes(targetDate.getMinutes() + 59);
  targetDate.setSeconds(targetDate.getSeconds() + 35);

  const calculateTimeLeft = () => {
    const now = new Date().getTime();
    const distance = targetDate.getTime() - now;

    return {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((distance / 1000 / 60) % 60),
      seconds: Math.floor((distance / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  type TimeUnitProps = {
    value: number;
    label: string;
  };

  const TimeUnit: React.FC<TimeUnitProps> = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="bg-white text-black rounded-full w-14 h-14 flex items-center justify-center font-semibold text-lg">
        {String(value).padStart(2, "0")}
      </div>
      <span className="text-xs mt-1 text-white opacity-80">{label}</span>
    </div>
  );

  return (
    <div className="w-full bg-black text-white">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-0 items-center">
          {/* Left Content */}
          <div className="px-8 md:px-16 py-12 md:py-16 space-y-8">
            <div className="text-green-500 font-semibold text-sm">
              Categories
            </div>

            <h1 className="text-4xl md:text-5xl font-semibold leading-tight">
              Enhance Your
              <br />
              Music Experience
            </h1>

            {/* Timer */}
            <div className="flex gap-4">
              <TimeUnit value={timeLeft.days} label="Days" />
              <TimeUnit value={timeLeft.hours} label="Hours" />
              <TimeUnit value={timeLeft.minutes} label="Minutes" />
              <TimeUnit value={timeLeft.seconds} label="Seconds" />
            </div>

            <Link href="/products">
              <button className="bg-green-500 hover:bg-green-600 text-white font-medium px-10 py-3.5 rounded transition-colors duration-200">
                Buy Now!
              </button>
            </Link>
          </div>

          {/* Right Content */}
          <div className="relative bg-gradient-to-br from-gray-50 to-gray-200 flex-1 flex items-center justify-center min-h-[300px] md:min-h-[400px] p-0">
            <Image
              src="/Jbl.png"
              alt="Music Experience"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
