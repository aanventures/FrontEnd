"use client";
import React from "react";
import Image from "next/image";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-serif text-[#3E3328]">
      {/* 1. HERO SECTION */}
      <section className="relative h-[450px] w-full bg-[#020D32] overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1600"
          alt="New York"
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 z-10 pointer-events-none">
          <div className="absolute top-[10%] left-[-10%] w-[120%] h-[100%] border-t border-[#C9A67F]/40 rounded-[100%]" />
        </div>
        <div className="relative z-20 container mx-auto px-10 h-full flex flex-col justify-center">
          <h1 className="text-5xl font-medium text-white tracking-wide">
            Contact Us
          </h1>
        </div>
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
              opacity="0.5"
            />
          </svg>
        </div>
      </section>

      {/* 2. CONTACT LAYOUT */}
      <main className="container mx-auto px-6 max-w-6xl py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-2">Contact Us</h2>
          <p className="text-[#B38D5B] italic text-xl">
            We're Here to Help You
          </p>
        </div>

        <div className="flex flex-col lg:flex-row bg-[#EFE9E1] rounded-2xl overflow-hidden shadow-sm border border-[#DED4C7]">
          {/* Form Side */}
          <div className="lg:w-1/2 p-8 md:p-12">
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-white border border-[#DED4C7] p-4 rounded-lg outline-none"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-white border border-[#DED4C7] p-4 rounded-lg outline-none"
              />
              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-white border border-[#DED4C7] p-4 rounded-lg outline-none"
              />
              <textarea
                placeholder="Message"
                rows="5"
                className="w-full bg-white border border-[#DED4C7] p-4 rounded-lg outline-none resize-none"
              />
              <div className="flex justify-center">
                <button className="bg-[#D19D5A] hover:bg-[#B38D5B] text-white font-bold py-3 px-12 rounded-lg shadow-md transition-all active:scale-95">
                  Send Message
                </button>
              </div>
            </form>
          </div>

          {/* Info Side with Empire State Image overlay */}
          <div className="lg:w-1/2 relative p-12 text-white flex flex-col justify-center">
            <Image
              src="https://images.unsplash.com/photo-1534430480872-3498386e7a56?auto=format&fit=crop&q=80&w=800"
              alt="Empire State"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/40 z-0" />

            <div className="relative z-10 space-y-10">
              <h3 className="text-3xl font-bold">Get In Touch</h3>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 bg-[url('https://cdn-icons-png.flaticon.com/512/484/484167.png')] bg-contain"></span>
                  <p className="text-lg">
                    1234 Travelers Lane, Suite 567,
                    <br />
                    New Delhi, India
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-[url('https://cdn-icons-png.flaticon.com/512/597/597177.png')] bg-contain invert"></span>
                  <p className="text-lg">+91 9876543210</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="w-6 h-6 bg-[url('https://cdn-icons-png.flaticon.com/512/542/542689.png')] bg-contain invert"></span>
                  <p className="text-lg">support@tripaango.com</p>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-6 h-6 bg-[url('https://cdn-icons-png.flaticon.com/512/3105/3105071.png')] bg-contain invert"></span>
                  <div>
                    <p className="font-bold">Support Timing</p>
                    <p className="text-sm">Mon - Fri: 9:00 AM - 6:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
