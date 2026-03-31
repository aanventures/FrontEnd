"use client";
import LoginForm from "@/component/Login/LoginForm";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] font-montserrat overflow-x-hidden relative">
      
      {/* 1. BRANDED HERO BACKGROUND - TALLER & BOLDER */}
      <section className="absolute top-0 left-0 w-full h-[500px] md:h-[600px] bg-[#6e83ca] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600"
          alt="Travel background"
          fill
          className="object-cover opacity-30 scale-105"
          priority
        />
        
        {/* Dark Scrim for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent z-10" />

        {/* The Signature Arched Gold Lines */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[120%] h-[100%] border-t border-amber-500/20 rounded-[100%]" />
          <div className="absolute top-[18%] left-[-10%] w-[120%] h-[100%] border-t border-amber-500/10 rounded-[100%]" />
        </div>

        {/* The Wave Transition */}
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

      {/* 2. FORM & HEADER CONTAINER */}
      <section className="relative z-40 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center">
        
        {/* Back Button */}
        {/* <div className="mb-10 w-full max-w-md flex justify-start">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/80 hover:text-amber-500 transition-all font-black uppercase text-[10px] tracking-[0.3em] bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10"
          >
            <ArrowLeft size={14} strokeWidth={3} /> Home
          </Link>
        </div> */}

        {/* <div className="mb-12 text-center">
          <h1 className="text-white text-3xl md:text-5xl font-black tracking-tighter uppercase italic leading-none m-0">
            Welcome <span className="text-amber-500 not-italic">Back</span>
          </h1>
          <p className="text-amber-500 font-black uppercase tracking-[0.3em] text-[10px] md:text-xs mt-6">
            Your next adventure starts here
          </p>
        </div> */}

        {/* LoginForm Component */}
        <div className="w-full flex justify-center transform md:-translate-y-4">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}