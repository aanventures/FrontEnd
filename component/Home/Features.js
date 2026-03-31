"use client";
import React from "react";
import { Search, Scale, CheckCircle } from "lucide-react";

export default function Features() {
  const steps = [
    {
      title: "Search",
      desc: "Easily find flights, hotels, and cars",
      icon: <Search size={24} className="text-amber-700" />
    },
    {
      title: "Compare & Choose",
      desc: "Pick the best options for your trip",
      icon: <Scale size={24} className="text-amber-700" />
    },
    {
      title: "Book & Go",
      desc: "Complete your booking in seconds",
      icon: <CheckCircle size={24} className="text-amber-700" />
    }
  ];

  return (
    <section className="max-w-7xl mx-auto px-6">
      {/* Header - Adjusted margins for mobile */}
      <div className="text-center mb-10 md:mb-16">
        <h2 className="text-2xl md:text-4xl font-serif text-[#1A1A1A] mb-3 leading-tight">
          See why our travelers love Tripaango
        </h2>
        <p className="text-[#B38B59] text-[12px] md:text-sm font-bold uppercase tracking-wider">
          3 easy steps to plan your perfect trip
        </p>
      </div>

      <div className="relative">
        {/* Horizontal Connecting Line - Hidden on mobile, visible on desktop */}
        <div className="absolute top-6 left-0 w-full h-[1px] bg-gray-200 hidden md:block"></div>

        {/* Vertical Connecting Line - Visible ONLY on mobile for a "timeline" feel */}
        <div className="absolute left-1/2 top-0 w-[1px] h-full bg-gray-100 -translate-x-1/2 md:hidden"></div>

        {/* Steps Grid - Added gap control */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 relative z-10">
          {steps.map((step, idx) => (
            <div key={idx} className="flex flex-col items-center text-center group">
              {/* Icon Container - Smaller padding on mobile */}
              <div className="bg-[#FAF7F2] p-2.5 md:p-3 rounded-full mb-4 md:mb-6 border border-gray-100 shadow-sm transition-transform group-hover:scale-110">
                {step.icon}
              </div>
              
              <h4 className="text-lg md:text-xl font-serif font-bold text-[#1A1A1A] mb-2 md:mb-3">
                {step.title}
              </h4>
              
              <p className="text-gray-500 text-xs md:text-sm max-w-[180px] md:max-w-[200px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
      
      {/* Bottom Divider - Compact on mobile */}
      <div className="mt-12 md:mt-20 flex flex-col items-center">
         <div className="flex items-center gap-2 text-[9px] md:text-[10px] uppercase tracking-[0.2em] md:tracking-[0.3em] font-bold text-gray-400">
            <span>Powered by</span>
            <span className="text-amber-700 flex items-center gap-1">
                <span className="italic font-serif capitalize tracking-normal text-xs md:text-sm">AAN</span>VENTURES
            </span>
         </div>
         <div className="w-24 md:w-40 h-[1px] bg-gray-200 mt-6 md:mt-8"></div>
      </div>
    </section>
  );
}