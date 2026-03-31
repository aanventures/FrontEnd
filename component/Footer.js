"use client";
import Link from "next/link";
import Image from "next/image";
import {
  Facebook,
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
  ArrowUpRight,
  Plane,
  Hotel,
  Car,
} from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", href: "/about-us" },
      { name: "Our Team", href: "/team" },
      { name: "Contact", href: "/contact" },
      { name: "Blog", href: "/blog" },
    ],
    services: [
      { name: "Book Flights", href: "/flights", icon: Plane },
      { name: "Hotel Bookings", href: "/hotels", icon: Hotel },
      { name: "Car Rentals", href: "/cars", icon: Car },
      // { name: "Luxury Villas", href: "/search?type=Villa" },
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Privacy Policy", href: "/privacy-policy" },
      { name: "Terms of Service", href: "/terms-and-conditions" },
      { name: "Cancellation Policy", href: "/cancellation" },
    ],
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-12 md:pt-20 pb-8 ">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* --- Top Section --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 md:gap-12 pb-12 md:pb-16 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6 text-center sm:text-left">
            <Link
              href="/"
              className="group flex flex-col items-start leading-tight"
            >
              <img
                src="/images/logo2.png"
                alt="Tripaango Logo"
                className="h-8 md:h-10 w-auto object-contain mx-auto sm:mx-0"
              />
              <span className="text-[7px] md:text-[9px] uppercase tracking-[0.25em] text-white/50 font-medium mt-2 mx-auto sm:mx-0">
                Discover, Relax, and Go Beyond
              </span>
            </Link>
            <div className="space-y-4">
              {/* Logo here */}
              <p className="text-slate-400 text-[13px] leading-relaxed max-w-sm mx-auto sm:mx-0 font-medium">
                Tripaango is your ultimate travel comparison partner. We
                aggregate the world's leading flights, hotels, and rentals into
                one seamless experience, ensuring you always find the best
                journey at the right price.
              </p>
            </div>
            <div className="flex justify-center sm:justify-start gap-4 pt-2">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-9 h-9 rounded-full border border-slate-700 flex items-center justify-center hover:bg-[#C29263] hover:border-[#C29263] hover:text-white transition-all duration-300"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-5 md:mb-6 text-[10px] md:text-xs uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-[#C29263] transition-colors flex items-center justify-center sm:justify-start group"
                  >
                    {link.name}
                    <ArrowUpRight
                      size={12}
                      className="ml-1 opacity-0 group-hover:opacity-100 -translate-y-0.5 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Updated Services Column */}
          <div className="text-center sm:text-left">
            <h4 className="text-white font-bold mb-5 md:mb-6 text-[10px] md:text-xs uppercase tracking-widest">
              Services
            </h4>
            <ul className="space-y-3 md:space-y-4">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm font-medium hover:text-[#C29263] transition-colors flex items-center justify-center sm:justify-start gap-2"
                  >
                    {link.icon && (
                      <link.icon size={14} className="text-[#C29263]" />
                    )}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="space-y-6 text-center sm:text-left">
            <h4 className="text-white font-bold mb-5 md:mb-6 text-[10px] md:text-xs uppercase tracking-widest">
              Contact Us
            </h4>
            <div className="space-y-4 md:space-y-5 text-sm font-medium">
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-2 sm:gap-3">
                <MapPin size={18} className="text-[#C29263] shrink-0 mt-0.5" />
                <span className="leading-relaxed text-slate-400">
                  123 Bengaluru,
                  <br />
                  Karnataka, India
                </span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <Phone size={18} className="text-[#C29263] shrink-0" />
                <span className="text-slate-400">+91 9999999999</span>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3">
                <Mail size={18} className="text-[#C29263] shrink-0" />
                <span className="text-slate-400">support@tripaango.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Newsletter Section --- */}
        <div className="py-10 md:py-12 flex flex-col lg:flex-row items-center justify-between gap-6 md:gap-8 border-b border-slate-800/50">
          <div className="text-center lg:text-left space-y-2">
            <h3 className="text-lg md:text-xl font-bold text-white">
              Subscribe to our newsletter
            </h3>
            <p className="text-slate-400 text-sm font-medium">
              Get latest deals and travel tips weekly.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row w-full lg:w-auto max-w-md gap-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-slate-800/50 border border-slate-700 rounded-lg px-6 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C29263]/20 focus:border-[#C29263]/50 transition-all text-center sm:text-left"
            />
            <button className="bg-[#C29263] hover:bg-[#A67C52] text-white px-8 py-3 rounded-lg font-bold text-sm transition-all active:scale-95 shadow-lg">
              Subscribe
            </button>
          </div>
        </div>

        {/* --- Bottom Section --- */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          <p className="text-[10px] md:text-[11px] font-bold text-slate-500 uppercase tracking-widest text-center">
            © {currentYear} tripaango.com. All rights reserved.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {footerLinks.support.slice(1, 3).map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
