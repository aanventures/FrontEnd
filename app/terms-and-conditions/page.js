"use client";
import React from "react";

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-20 font-serif">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#020D32] mb-4">Terms & Conditions</h1>
        <p className="text-[#B39371] font-medium mb-12 uppercase tracking-widest text-sm">
          Effective Date: March 24, 2026
        </p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Tripaango platform, you agree to be bound by these Terms and Conditions. 
              If you do not agree with any part of these terms, you must not use our services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">2. Booking & Cancellations</h2>
            <div className="bg-[#020D32] text-white p-6 rounded-xl space-y-4">
              <p className="text-sm">
                <strong className="text-[#C9A67F]">Fares:</strong> All prices are subject to availability and can change without notice until a booking is confirmed.
              </p>
              <p className="text-sm">
                <strong className="text-[#C9A67F]">Cancellations:</strong> Cancellation policies vary by airline and hotel provider. Tripaango acts as an intermediary; users must adhere to the specific provider's refund policies.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">3. User Responsibilities</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Users must provide accurate and truthful information during the booking process.</li>
              <li>Users are responsible for maintaining the confidentiality of their account credentials.</li>
              <li>Users must ensure they possess valid travel documents (passports, visas) for their destinations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">4. Limitation of Liability</h2>
            <p>
              Tripaango is a travel search engine and intermediary. We are not liable for flight delays, 
              cancellations, accidents, or injuries occurring during travel booked through our platform. 
              All disputes regarding travel service quality must be directed to the respective service provider.
            </p>
          </section>

          <section className="border-t border-gray-200 pt-10 text-center">
            <p className="text-sm text-gray-500 italic">
              Thank you for choosing Tripaango. Safe travels!
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}