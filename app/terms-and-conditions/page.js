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
    <main className="bg-[#FAF7F2] min-h-screen font-montserrat text-slate-900 overflow-x-hidden pt-20">
      
      {/* 1. BRANDED HERO IMAGE - CENTERED CONTENT */}
      <section className="relative w-full h-[200px] md:h-[250px] bg-slate-900 flex items-center justify-center overflow-hidden">
             <Image
                 src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1600"
                 alt="Privacy Header"
                 fill
                 className="object-cover opacity-60" // Kept high so it's bright
                 priority
               />
        
        {/* Subtle Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />
       

        {/* CENTERED HEADER CONTENT */}
        <header className="relative z-20 text-center px-6">
        

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Terms &{" "}
            <span className="text-amber-500 not-italic">Conditions</span>
          </h1>
          
          <p className="text-white/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-6">
            Effective Date: October 26, 2026
          </p>
        </header>

       
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

    
      </section>
    </main>
  );
}