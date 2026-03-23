"use client";
import React from "react";
import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-serif text-[#3E3328]">
      {/* 1. HERO SECTION WITH ARCHED GOLD LINES */}
      <section className="relative h-[450px] w-full bg-[#020D32] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1600"
          alt="Cityscape"
          fill
          className="object-cover opacity-60"
          priority
        />
        {/* The Arched Gold Decorative Lines from Image */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[120%] h-[100%] border-t border-[#C9A67F]/40 rounded-[100%]" />
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-[100%] border-t border-[#C9A67F]/20 rounded-[100%]" />
        </div>

        <div className="relative z-20 container mx-auto px-10 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-medium text-white tracking-wide">About Us</h1>
        </div>

        {/* The Wave Divider */}
        <div className="absolute bottom-[-1px] left-0 w-full z-30">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[100px]">
            <path d="M0 120L1440 120V60C1440 60 1140 0 720 0C300 0 0 60 0 60V120Z" fill="#FAF7F2" />
            <path d="M0 60C300 60 720 0 720 0C1140 0 1440 60 1440 60" stroke="#B38D5B" strokeWidth="2" opacity="0.5" />
          </svg>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <main className="container mx-auto px-6 max-w-4xl py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-3">About Us</h2>
          <p className="text-[#B38D5B] italic text-xl">Bringing the World Closer, One Journey at a Time</p>
        </div>

        <div className="space-y-16">
          {/* Who We Are */}
          <div className="flex gap-6">
             <div className="shrink-0 w-14 h-14 bg-no-repeat bg-contain" 
                  style={{backgroundImage: `url('https://cdn-icons-png.flaticon.com/512/814/814513.png')`}}></div>
             <div>
                <h3 className="text-2xl font-bold mb-3">Who We Are</h3>
                <p className="text-[#5A5044] text-lg leading-relaxed">
                  Tripaango is a travel comparison platform designed to make your journey planning easy and efficient. 
                  We bring together flights, hotels, and car rentals in one seamless experience, so you can save 
                  time, money, and effort.
                </p>
             </div>
          </div>

          {/* Our Mission */}
          <div className="flex gap-6">
             <div className="shrink-0 w-14 h-14 bg-no-repeat bg-contain" 
                  style={{backgroundImage: `url('https://cdn-icons-png.flaticon.com/512/2822/2822699.png')`}}></div>
             <div>
                <h3 className="text-2xl font-bold mb-3">Our Mission</h3>
                <p className="text-[#5A5044] text-lg leading-relaxed">
                  Our mission is to empower travelers to make informed decisions by providing a comprehensive, 
                  transparent, and user-friendly comparison platform. We believe in making travel accessible 
                  and enjoyable for everyone.
                </p>
             </div>
          </div>

          {/* Why Choose Us */}
          <div className="flex gap-6">
             <div className="shrink-0 w-14 h-14 bg-no-repeat bg-contain" 
                  style={{backgroundImage: `url('https://cdn-icons-png.flaticon.com/512/1055/1055644.png')`}}></div>
             <div>
                <h3 className="text-2xl font-bold mb-4">Why Choose Tripaango</h3>
                <ul className="space-y-4">
                  {["Compare flights, hotels, and cars all in one place", 
                    "Get real-time, unbiased price comparisons across top travel sites", 
                    "Save time and money with our easy-to-use platform"].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-lg text-[#5A5044]">
                      <span className="text-[#B38D5B] text-xl">✔</span> {item}
                    </li>
                  ))}
                </ul>
             </div>
          </div>
        </div>
      </main>
    </div>
  );
}