"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ShieldCheck, Mail, CheckCircle2 } from "lucide-react";

export default function PrivacyPolicy() {
  const policySections = [
    {
      title: "Introduction",
      content:
        "Welcome to Tripaango. Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your information when you use our services.",
    },
    {
      title: "Information Collection",
      content:
        "We collect personal information such as your name, email, phone number, and payment details when you book trip through Tripaango. Additionally, we gather data related to your travel preferences and activities.",
    },
    {
      title: "Use of Information",
      content:
        "Your information is used to process bookings, provide customer support, send updates, and improve our services. We may also use your data to send promotional offers and travel-related content that may interest you.",
    },
    {
      title: "Data Security",
      content:
        "We implement robust security measures to protect your personal information from unauthorized access, alteration, or disclosure.",
    },
    {
      title: "Your Rights",
      content:
        "You have specific rights regarding your personal data to ensure transparency and control:",
      bullets: [
        "Access and update your personal information",
        "Request deletion of your data",
        "Opt-out of marketing communications",
      ],
    },
  ];

  return (
    <main className="bg-[#FAF7F2] min-h-screen font-montserrat text-slate-900 overflow-x-hidden pt-20">
      {/* 1. BRANDED HERO IMAGE - CENTERED CONTENT */}
      <section className="relative w-full h-[200px] md:h-[250px] bg-white flex items-center justify-center overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1557683316-973673baf926?auto=format&fit=crop&q=80&w=1600"
          alt="Privacy Header"
          fill
          className="object-cover opacity-60" // Kept high so it's bright
          priority
        />
        {/* Subtle Scrim for Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />

        {/* Back Button - Top Left Over Image */}
       

        {/* CENTERED HEADER CONTENT */}
        <header className="relative z-20 text-center px-6">
         

          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Privacy <span className="text-amber-500 not-italic">Policy</span>
          </h1>

          <p className="text-white/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-6">
            Last Updated: October 26, 2026
          </p>
        </header>

      </section>

      {/* 2. POLICY CONTENT AREA */}
      <section className="container mx-auto px-4 md:px-6 max-w-5xl py-12 md:py-20 relative z-30 pb-24">
        <div
          className="prose prose-slate prose-sm md:prose-base max-w-none 
            prose-headings:font-black prose-headings:tracking-tighter prose-headings:text-slate-900
            prose-p:text-slate-600 prose-p:leading-relaxed prose-p:font-medium"
        >
          {policySections.map((section, idx) => (
            <div key={idx} className="mb-12 last:mb-0 group">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-all duration-300 shadow-sm border border-slate-100">
                  <ShieldCheck size={20} strokeWidth={3} />
                </div>
                <h2 className="text-xl md:text-2xl font-black text-slate-900 m-0 tracking-tight">
                  {section.title}
                </h2>
              </div>

              {section.content && (
                <p className="pl-14 text-slate-600 leading-relaxed max-w-full md:max-w-[95%] font-medium">
                  {section.content}
                </p>
              )}

              {section.bullets && (
                <div className="pl-14 mt-4 space-y-3">
                  {section.bullets.map((bullet, bIdx) => (
                    <div key={bIdx} className="flex items-center gap-3">
                      <CheckCircle2
                        size={16}
                        className="text-amber-600"
                        strokeWidth={3}
                      />
                      <span className="text-slate-600 font-bold text-sm">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}
