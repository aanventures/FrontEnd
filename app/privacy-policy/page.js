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
    <main className="bg-[#FAF7F2] min-h-screen font-montserrat text-slate-900 overflow-x-hidden">
      {/* 1. BRANDED HERO IMAGE - CENTERED CONTENT */}
      <section className="relative w-full h-[60vh] md:h-[75vh] bg-white flex items-center justify-center overflow-hidden">
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
          <div className="flex items-center justify-center mb-6">
            <span className="bg-amber-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-lg">
              Security & Trust
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black text-white tracking-tighter uppercase italic leading-none m-0">
            Privacy <span className="text-amber-500 not-italic">Policy</span>
          </h1>

          <p className="text-white/70 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-6">
            Last Updated: October 26, 2026
          </p>
        </header>

        {/* Wave Transition */}
        <div className="absolute bottom-[-1px] left-0 w-full z-30 leading-[0]">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-[60px] md:h-[100px]"
          >
            <path
              d="M0 120L1440 120V60C1440 60 1140 0 720 0C300 0 0 60 0 60V120Z"
              fill="#FAF7F2"
            />
          </svg>
        </div>
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

        {/* 3. CONTACT FOOTER */}
        <div className="mt-16 pt-12 border-t border-slate-100 text-center">
          <div className="bg-slate-900 p-8 md:p-12 rounded-[2rem] text-white shadow-2xl relative overflow-hidden">
            <Mail
              size={120}
              className="absolute -right-10 -bottom-10 text-white/5 rotate-12"
            />

            <ShieldCheck
              size={40}
              className="mx-auto mb-6 text-amber-500"
              strokeWidth={2.5}
            />
            <h3 className="text-2xl md:text-3xl font-black mb-3 tracking-tighter">
              Your Data is Secure
            </h3>
            <p className="text-slate-400 text-xs md:text-sm font-bold max-w-md mx-auto mb-10 uppercase tracking-wide">
              For detailed information or specific data requests, please reach
              out to our dedicated privacy team.
            </p>
            <a
              href="mailto:support@tripaango.com"
              className="inline-block bg-amber-600 text-white px-12 py-4 rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-white hover:text-slate-900 transition-all shadow-xl shadow-amber-600/20 active:scale-95"
            >
              Contact Privacy Team
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
