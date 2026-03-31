"use client";
import React from "react";
import Link from "next/link";
import { ChevronRight, Plane, Hotel, Car } from "lucide-react";

const categories = [
  {
    title: "Flights",
    desc: "Find your perfect flight.",
    // Swapped image for Lucide Component
    icon: <Plane className="w-6 h-6 md:w-8 md:h-8 text-amber-700" />, 
    link: "/flights",
    btnText: "Explore Flights"
  },
  {
    title: "Hotels",
    desc: "Stay at top hotels worldwide.",
    icon: <Hotel className="w-6 h-6 md:w-8 md:h-8 text-amber-700" />,
    link: "/hotels",
    btnText: "Browse Hotels"
  },
  {
    title: "Car Rentals",
    desc: "Drive your adventure with ease.",
    icon: <Car className="w-6 h-6 md:w-8 md:h-8 text-amber-700" />,
    link: "/cars",
    btnText: "View Car Rentals"
  }
];

export default function CategoryCards() {
  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 -mt-8 md:-mt-10 relative  font-montserrat">
      {/* Subtitle */}
      <h1 className="text-center text-lg md:text-2xl font-serif text-[#4A3728] mb-6 md:mb-10 italic opacity-90 px-4">
        Find the perfect flight, stay, or ride — effortlessly.
      </h1>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 lg:gap-8">
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-md border border-white/80 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 shadow-sm flex flex-col items-center text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            {/* Modern Icon Container */}
            <div className="mb-4 md:mb-6 p-3 md:p-4 bg-amber-50 rounded-2xl text-amber-700">
              {cat.icon}
            </div>
            
            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#1A1A1A] mb-2">
              {cat.title}
            </h3>
            
            <p className="text-gray-500 text-xs md:text-sm mb-6 md:mb-8 font-medium">
              {cat.desc}
            </p>

            <Link
              href={cat.link}
              className="group flex items-center justify-between w-full max-w-[180px] md:max-w-[200px] px-6 py-3 border border-gray-200 rounded-full text-[10px] md:text-xs font-bold text-gray-700 hover:bg-amber-700 hover:text-white hover:border-amber-700 transition-all duration-300"
            >
              <span>{cat.btnText}</span>
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        ))}
      </div>

      {/* Powered by Section */}
      <div className="mt-10 md:mt-16 flex flex-col items-center">
         <div className="flex items-center gap-2 text-[8px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-gray-400">
            <span>Powered by</span>
            <span className="text-amber-700 flex items-center gap-1">
                <span className="italic font-serif capitalize tracking-normal text-xs md:text-sm">AAN</span>VENTURES
            </span>
         </div>
      </div>
    </section>
  );
}