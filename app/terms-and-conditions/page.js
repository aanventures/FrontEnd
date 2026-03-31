"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  FileSignature,
  MessageCircleQuestion,
  CheckCircle2,
} from "lucide-react";

export default function TermsConditions() {
  const termsSections = [
    {
      title: "Introduction",
      content:
        "By using Tripaango, you agree to our terms and conditions outlined below. Please read them carefully before making any bookings.",
    },
    {
      title: "Booking & Payment",
      content:
        "All bookings require accurate personal information and full payment at the time of booking. Prices and availability are subject to change until the booking is confirmed.",
    },
    {
      title: "Cancellation & Refunds",
      content:
        "Cancellation policies vary by service provider. Please review our cancellation and refund policies before booking. Refunds are processed according to the specific terms of each booking.",
    },
    {
      title: "User Responsibilities",
      content:
        "Users must provide accurate and complete information when booking trips. Users are responsible for obtaining any necessary travel documents and ensuring compliance with the laws of their destination.",
    },
    {
      title: "Limitation of Liability",
      content:
        "Tripaango is not liable for any losses, damages, or injuries resulting from using our services. Our liability limited to the amount paid to the specific booking in question.",
    },
  ];

  return (
    <main className="bg-[#FAF7F2] min-h-screen font-montserrat text-slate-900 overflow-x-hidden">
      
      {/* 1. BRANDED HERO IMAGE - CENTERED CONTENT */}
      <section className="relative w-full h-[60vh] md:h-[75vh] bg-slate-900 flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&q=80&w=1600"
          alt="Legal Header"
          fill
          className="object-cover opacity-40"
          priority
        />
        
        {/* Subtle Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />

        {/* Back Button - Top Left Over Image */}
        <div className="absolute top-32 left-6 md:left-12 z-30">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-all font-black uppercase text-[10px] tracking-[0.3em] bg-black/20 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Back to Home
          </Link>
        </div>

        {/* CENTERED HEADER CONTENT */}
        <header className="relative z-20 text-center px-6">
        

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none m-0">
            Terms &{" "}
            <span className="text-amber-500 not-italic">Conditions</span>
          </h1>
          
          <p className="text-white/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-6">
            Effective Date: October 26, 2026
          </p>
        </header>

        {/* Wave Transition (Optional, keeps the design consistent with other pages) */}
        <div className="absolute bottom-[-1px] left-0 w-full z-30 leading-[0]">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[60px] md:h-[100px]">
            <path d="M0 120L1440 120V60C1440 60 1140 0 720 0C300 0 0 60 0 60V120Z" fill="#FAF7F2" />
          </svg>
        </div>
      </section>

      {/* 2. TERMS CONTENT AREA */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl py-12 md:py-20 relative z-30 pb-24">
        <div className="prose prose-slate prose-sm md:prose-base max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium"
        >
          {termsSections.map((section, idx) => (
            <div key={idx} className="mb-12 last:mb-0 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                  <CheckCircle2 size={20} strokeWidth={3} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 m-0 tracking-tight">
                  {section.title}
                </h2>
              </div>
              <p className="pl-14 text-slate-600 leading-relaxed max-w-full md:max-w-[95%] font-medium">
                {section.content}
              </p>
            </div>
          ))}
        </div>

        {/* 3. HELP FOOTER */}
        <div className="mt-16 pt-12 border-t border-slate-100 text-center">
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
            <FileSignature
              size={120}
              className="absolute -right-10 -bottom-10 text-white/5 rotate-12"
            />

            <MessageCircleQuestion
              size={40}
              className="mx-auto mb-6 text-amber-500"
              strokeWidth={2.5}
            />
            <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter">
              Need Clarification?
            </h3>
            <p className="text-slate-400 text-xs md:text-sm font-bold max-w-md mx-auto mb-10 uppercase tracking-wide">
              If you have any questions regarding these terms, please contact
              us before proceeding with your booking.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-amber-600 text-white px-12 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-amber-600/20 active:scale-95"
            >
              Contact Support Team
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}