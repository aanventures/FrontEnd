"use client";
import React from "react";
import Image from "next/image";
import { Users, Target, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-montserrat text-slate-900 pt-[90px]">
      
      {/* 1. COMPACT HERO SECTION */}
      <section className="relative h-[200px] md:h-[250px] w-full bg-slate-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?auto=format&fit=crop&q=80&w=1600"
          alt="Cityscape"
          fill={true}
          className="object-cover opacity-50"
          priority
        />
        
          {/* <div className="absolute inset-0 z-10 pointer-events-none">
            <div className="absolute top-[10%] left-[-10%] w-[120%] h-[100%] border-t border-amber-500/30 rounded-[100%]" />
          </div> */}

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            About  <span className="text-amber-500 not-italic">Us</span>
          </h1>
          {/* <p className="text-amber-500 font-black uppercase tracking-[0.2em] text-[9px] md:text-[10px] mt-3">
            Redefining the way you discover the world
          </p> */}
        </div>

        {/* <div className="absolute bottom-[-1px] left-0 w-full z-30 leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px]">
            <path d="M0 120L1440 120V60C1440 60 1140 0 720 0C300 0 0 60 0 60V120Z" fill="#FAF7F2" />
          </svg>
        </div> */}
      </section>

      {/* 2. CONTENT SECTION */}
      <main className="container mx-auto px-4 md:px-6 max-w-5xl py-10  md:py-20">
        
        {/* Intro Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-4xl font-black text-slate-900 mb-2 tracking-tighter">
            About Tripaango
          </h2>
          <div className="h-1 w-12 bg-amber-600 mx-auto rounded-full mb-4"></div>
          <p className="text-amber-700 font-black italic text-base md:text-lg max-w-xl mx-auto leading-tight">
            "Bringing the World Closer, One Journey at a Time"
          </p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:gap-14">
          
          {/* Who We Are */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
             <div className="shrink-0 w-16 h-16 bg-white shadow-lg shadow-slate-200 rounded-2xl flex items-center justify-center text-amber-600 border border-slate-100 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                <Users size={28} strokeWidth={2.5} />
             </div>
             <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight">Who We Are</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Tripaango is a travel comparison platform designed to make your journey planning easy and efficient. 
                  We bring together <span className="text-slate-900 font-black">flights, hotels, and car rentals</span> in one seamless experience, so you can save 
                  time, money, and effort.
                </p>
             </div>
          </div>

          {/* Our Mission */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
             <div className="shrink-0 w-16 h-16 bg-white shadow-lg shadow-slate-200 rounded-2xl flex items-center justify-center text-amber-600 border border-slate-100 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                <Target size={28} strokeWidth={2.5} />
             </div>
             <div className="text-center md:text-left">
                <h3 className="text-xl md:text-2xl font-black mb-2 tracking-tight">Our Mission</h3>
                <p className="text-slate-600 text-sm leading-relaxed font-medium">
                  Our mission is to empower travelers to make informed decisions by providing a <span className="text-slate-900 font-black">comprehensive, 
                  transparent, and user-friendly</span> comparison platform. We believe in making travel accessible 
                  and enjoyable for everyone.
                </p>
             </div>
          </div>

          {/* Why Choose Us */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start group">
             <div className="shrink-0 w-16 h-16 bg-white shadow-lg shadow-slate-200 rounded-2xl flex items-center justify-center text-amber-600 border border-slate-100 group-hover:bg-amber-600 group-hover:text-white transition-all duration-500">
                <ShieldCheck size={28} strokeWidth={2.5} />
             </div>
             <div className="text-center md:text-left w-full">
                <h3 className="text-xl md:text-2xl font-black mb-4 tracking-tight">Why Choose Tripaango</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Compare flights, hotels, and cars all in one place", 
                    "Real-time, unbiased price comparisons", 
                    "User-friendly and secure platform",
                    "Access to top worldwide travel sites"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3 bg-white p-3 rounded-xl border border-slate-100 shadow-sm">
                      <CheckCircle2 className="text-amber-600 shrink-0" size={16} strokeWidth={3} />
                      <span className="text-[13px] text-slate-700 font-black tracking-tight">{item}</span>
                    </div>
                  ))}
                </div>
             </div>
          </div>

        </div>
      </main>
    </div>
  );
}