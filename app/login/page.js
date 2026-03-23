"use client";
import LoginForm from "@/component/Login/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main className="min-h-screen bg-[#FAF7F2] font-serif overflow-hidden relative">
      {/* 1. BRANDED HERO BACKGROUND */}
      <section className="absolute top-0 left-0 w-full h-[450px] bg-[#020D32] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&q=80&w=1600"
          alt="Travel background"
          fill
          className="object-cover opacity-40"
          priority
        />
        {/* The Signature Arched Gold Lines */}
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[120%] h-[100%] border-t border-[#C9A67F]/30 rounded-[100%]" />
          <div className="absolute top-[20%] left-[-10%] w-[120%] h-[100%] border-t border-[#C9A67F]/10 rounded-[100%]" />
        </div>

        {/* The Gold Wave Transition */}
        <div className="absolute bottom-[-1px] left-0 w-full z-30">
          <svg
            viewBox="0 0 1440 120"
            preserveAspectRatio="none"
            className="w-full h-[100px]"
          >
            <path
              d="M0 120L1440 120V60C1440 60 1140 0 720 0C300 0 0 60 0 60V120Z"
              fill="#FAF7F2"
            />
            <path
              d="M0 60C300 60 720 0 720 0C1140 0 1440 60 1440 60"
              stroke="#B38D5B"
              strokeWidth="2"
              opacity="0.4"
            />
          </svg>
        </div>
      </section>

      {/* 2. FORM CONTAINER */}
      <section className="relative z-40 container mx-auto px-6 pt-32 pb-20 flex flex-col items-center">
        <div className="mb-8 text-center">
          <h1 className="text-white text-4xl md:text-5xl font-light mb-2">
            Welcome Back
          </h1>
          <p className="text-[#C9A67F] italic text-lg">
            Your next adventure starts here
          </p>
        </div>

        <div className="w-full flex justify-center">
          <LoginForm />
        </div>
      </section>
    </main>
  );
}
