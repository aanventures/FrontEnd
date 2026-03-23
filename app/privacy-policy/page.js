"use client";
import React from "react";

export default function PrivacyPolicy() {
  const lastUpdated = "March 24, 2026";

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-32 pb-20 font-serif">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-[#020D32] mb-4">Privacy Policy</h1>
        <p className="text-[#B39371] font-medium mb-12 uppercase tracking-widest text-sm">
          Last Updated: {lastUpdated}
        </p>

        <div className="space-y-10 text-slate-700 leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">1. Introduction</h2>
            <p>
              Welcome to Tripaango. We value your privacy and are committed to protecting your personal data. 
              This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website 
              and use our services, including flight, hotel, and car bookings.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">2. Information We Collect</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Personal Identifiers:</strong> Name, email address, phone number, and physical address.</li>
              <li><strong>Booking Data:</strong> Flight details, hotel preferences, and travel itinerary.</li>
              <li><strong>Payment Information:</strong> We use secure third-party processors; we do not store full credit card numbers on our servers.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, and usage patterns collected via cookies.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">3. How We Use Your Data</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 mt-4 space-y-2">
              <li>Process and confirm your travel bookings.</li>
              <li>Send itinerary updates and administrative notifications.</li>
              <li>Improve our platform’s user experience and search engine.</li>
              <li>Comply with legal obligations and prevent fraudulent transactions.</li>
            </ul>
          </section>

          <section className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm">
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">4. Data Security</h2>
            <p>
              We implement industry-standard Security (SSL/TLS) encryption to protect your data during transmission. 
              However, no method of transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#020D32] mb-4">5. Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact our data protection officer at:
              <br />
              <span className="text-[#B39371] font-bold mt-2 inline-block">privacy@tripaango.com</span>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}