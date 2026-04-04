"use client";
import React from "react";
import Image from "next/image";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";

export default function ContactUs() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] font-montserrat text-slate-900 pt-[90px]">
      
      {/* 1. REFINED HERO SECTION */}
      <section className="relative  h-[200px] md:h-[250px] w-full bg-slate-900 overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&q=80&w=1600"
          alt="Contact Hero"
          fill
          className="object-cover opacity-50"
          priority
        />
        
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/20 to-transparent z-10" />

        <div className="relative z-20 container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tighter uppercase italic">
            Contact <span className="text-amber-500 not-italic">Us</span>
          </h1>
          <p className="text-amber-500 font-black uppercase tracking-[0.2em] text-[10px] md:text-xs mt-3">
            We're here to guide your next adventure
          </p>
        </div>

      
      </section>

      {/* 2. CONTACT CONTENT */}
      <main className="container mx-auto px-4 md:px-6 max-w-6xl py-12 md:py-20">
        
        <div className="flex flex-col lg:flex-row bg-white rounded-[2rem] overflow-hidden shadow-xl shadow-slate-200/60 border border-slate-100">
          
          {/* LEFT: FORM SIDE */}
          <div className="lg:w-1/2 p-8 md:p-14">
            <div className="mb-8">
                <h2 className="text-2xl md:text-4xl font-black text-slate-900 tracking-tighter mb-3">
                    Send a Message
                </h2>
                <div className="h-1 w-12 bg-amber-600 rounded-full"></div>
            </div>

            <form className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Full Name</label>
                    <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-[13px] placeholder:text-slate-300"
                    />
                </div>
                <div className="space-y-1.5">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Email Address</label>
                    <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-[13px] placeholder:text-slate-300"
                    />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Subject</label>
                <input
                    type="text"
                    placeholder="How can we help?"
                    className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-[13px] placeholder:text-slate-300"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-1">Your Message</label>
                <textarea
                    placeholder="Tell us about your travel plans..."
                    rows="4"
                    className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl outline-none focus:ring-2 focus:ring-amber-500 transition-all font-medium text-[13px] placeholder:text-slate-300 resize-none"
                />
              </div>

              <button className="w-full md:w-auto bg-amber-600 hover:bg-slate-900 text-white font-black uppercase tracking-widest py-4 px-10 rounded-xl shadow-lg shadow-amber-600/20 transition-all active:scale-95 flex items-center justify-center gap-2.5 text-[11px]">
                Send Message <Send size={14} />
              </button>
            </form>
          </div>

          {/* RIGHT: INFO SIDE */}
          <div className="lg:w-1/2 relative p-10 md:p-14 text-white flex flex-col justify-between">
            <Image
              src="https://images.unsplash.com/photo-1534430480872-3498386e7a56?auto=format&fit=crop&q=80&w=800"
              alt="Empire State"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-slate-900/85 z-0 backdrop-blur-[1px]" />

            <div className="relative z-10 space-y-10">
              <div>
                <h3 className="text-2xl md:text-3xl font-black tracking-tighter mb-1.5">Visit Our Office</h3>
                <p className="text-amber-500 font-bold text-[10px] uppercase tracking-widest">Connect with our experts</p>
              </div>

              <div className="space-y-7">
                <div className="flex items-start gap-5 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Location</p>
                    <p className="text-sm font-semibold leading-relaxed">
                        1234 Travelers Lane, Suite 567,<br />
                        New Delhi, India
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <Phone size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Call Us</p>
                    <p className="text-sm font-semibold">+91 9876543210</p>
                  </div>
                </div>

                <div className="flex items-center gap-5 group">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-amber-500 group-hover:bg-amber-600 group-hover:text-white transition-all">
                    <Mail size={18} />
                  </div>
                  <div>
                    <p className="text-[9px] font-black uppercase tracking-widest text-white/40 mb-0.5">Email Support</p>
                    <p className="text-sm font-semibold">support@tripaango.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Support Hours Card */}
            <div className="relative z-10 bg-white/5 border border-white/10 p-5 rounded-xl backdrop-blur-md flex items-center gap-4 mt-8 lg:mt-0">
               <div className="text-amber-500"><Clock size={24} strokeWidth={2.5} /></div>
               <div>
                  <p className="font-black text-[9px] uppercase tracking-widest">Support Timing</p>
                  <p className="text-white/60 text-xs font-semibold">Mon - Fri: 9:00 AM - 6:00 PM</p>
               </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}