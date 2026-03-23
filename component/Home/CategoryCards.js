"use client";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

const categories = [
  {
    title: "Flights",
    desc: "Find your perfect flight.",
    icon: "/images/flight-icon.jpg", 
    link: "/flights",
    btnText: "Explore Flights"
  },
  {
    title: "Hotels",
    desc: "Stay at top hotels worldwide.",
    icon: "/images/hotel-icon.jpg",
    link: "/hotels",
    btnText: "Browse Hotels"
  },
  {
    title: "Car Rentals",
    desc: "Drive your adventure with ease.",
    icon: "/images/car-rental-icon.jpg",
    link: "/cars",
    btnText: "View Car Rentals"
  }
];

export default function CategoryCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-16 relative z-10">
      {/* Subtitle - Smaller text on mobile */}
      <h2 className="text-center text-lg md:text-2xl font-serif text-[#4A3728] mb-6 md:mb-10 italic opacity-90 px-4">
        Find the perfect flight, stay, or ride — effortlessly.
      </h2>

      {/* Cards Grid - Spacing adjusted for mobile */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-md border border-white/80 rounded-[1.5rem] md:rounded-[2rem] p-5 md:p-8 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-md hover:-translate-y-1"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-3 md:mb-4">
              {/* Responsive Icon Size */}
              <div className="relative w-12 h-8 md:w-16 md:h-12">
                <Image 
                  src={cat.icon} 
                  alt={cat.title}
                  fill
                  className="object-contain"
                />
              </div>
              <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A]">
                {cat.title}
              </h3>
            </div>
            
            <p className="text-gray-500 text-xs md:text-sm mb-5 md:mb-8 font-medium">
              {cat.desc}
            </p>

            <Link
              href={cat.link}
              className="group flex items-center justify-between w-full max-w-[180px] md:max-w-[200px] px-5 py-2 border border-gray-200 rounded-full text-[10px] md:text-xs font-bold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <span>{cat.btnText}</span>
              <ChevronRight size={14} className="text-gray-400 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* "Powered by" Divider - Scaled down for mobile */}
      <div className="mt-10 md:mt-16 flex flex-col items-center">
         <div className="flex items-center gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-gray-400">
            <span>Powered by</span>
            <span className="text-amber-700 flex items-center gap-1">
                <span className="italic font-serif capitalize tracking-normal text-xs md:text-sm">AN</span>VENTURES
            </span>
         </div>
      </div>
    </section>
  );
}